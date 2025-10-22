
import express from 'express';
import bodyParser from 'body-parser';
import crypto from 'crypto';
import { createClient } from '@supabase/supabase-js';
import fs from 'fs/promises';
import path from 'path';
import { fileURLToPath } from 'url';
import dotenv from 'dotenv';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Supabase setup
const supabaseUrl = process.env.SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_KEY;
const supabase = createClient(supabaseUrl, supabaseKey);

// Communication mode configuration
const EMAIL_ENABLED = process.env.EMAIL_ENABLED === 'true';
const COMMUNICATION_MODE = process.env.COMMUNICATION_MODE || 'Apollo_Smartlead';

console.log(`🚀 Vault Bridge initialized in ${COMMUNICATION_MODE} mode`);
console.log(`📧 Email sending: ${EMAIL_ENABLED ? 'ENABLED' : 'DISABLED'}`);

// Middleware to verify Shopify webhooks
const verifyShopifyWebhook = (req, res, next) => {
    const hmac = req.get('X-Shopify-Hmac-Sha256');
    const body = req.rawBody;
    const generatedHash = crypto
        .createHmac('sha256', process.env.SHOPIFY_WEBHOOK_SECRET)
        .update(body)
        .digest('base64');

    if (generatedHash === hmac) {
        next();
    } else {
        console.log('⚠️ Webhook verification failed!');
        res.sendStatus(401);
    }
};

app.use(bodyParser.json({ verify: (req, res, buf) => { req.rawBody = buf; } }));

// Health check endpoint
app.get('/health', (req, res) => {
    res.json({ status: 'ok', mode: COMMUNICATION_MODE, email_enabled: EMAIL_ENABLED });
});

app.post('/shopify/webhooks/orders_paid', verifyShopifyWebhook, async (req, res) => {
    const order = req.body;

    if (!order || !order.customer || !order.customer.email) {
        console.error('❌ Invalid order data received:', order);
        return res.status(400).send('Invalid order data');
    }

    const customerName = `${order.customer.first_name || ''} ${order.customer.last_name || ''}`.trim();
    const customerEmail = order.customer.email;
    const customerCountry = order.customer.default_address?.country_code || 'US';
    const orderId = order.id;
    const totalPrice = parseFloat(order.total_price);
    const currency = order.currency;

    console.log(`\n✅ Payment received for order ${orderId}`);
    console.log(`   Customer: ${customerName} (${customerEmail})`);
    console.log(`   Country: ${customerCountry}`);
    console.log(`   Amount: ${totalPrice} ${currency}`);

    try {
        // 1. Create Vault account silently
        let vaultUserId;
        try {
            const { data: user, error: authError } = await supabase.auth.signUp({
                email: customerEmail,
                password: Math.random().toString(36).slice(-10),
            });

            if (authError && !authError.message.includes('already registered')) {
                throw authError;
            }

            vaultUserId = user?.user?.id;
            if (!vaultUserId) {
                const { data: existingUser } = await supabase
                    .from('vault_users')
                    .select('id')
                    .eq('email', customerEmail)
                    .single();
                vaultUserId = existingUser?.id;
            }
        } catch (error) {
            console.error('❌ Vault account creation error:', error.message);
            throw error;
        }

        // 2. Store user in vault_users table
        const { error: insertUserError } = await supabase
            .from('vault_users')
            .upsert({
                id: vaultUserId,
                email: customerEmail,
                name: customerName,
                country: customerCountry,
                created_at: new Date().toISOString(),
            });

        if (insertUserError) throw insertUserError;
        console.log(`   ✓ Vault user created: ${vaultUserId}`);

        // 3. Store transaction in vault_transactions
        const { error: insertTransactionError } = await supabase
            .from('vault_transactions')
            .insert({
                order_id: orderId,
                vault_user_id: vaultUserId,
                amount: totalPrice,
                currency: currency,
                status: 'paid',
                payment_gateway: order.gateway || 'shopify',
                created_at: new Date().toISOString(),
            });

        if (insertTransactionError) throw insertTransactionError;
        console.log(`   ✓ Transaction logged in Supabase`);

        // 4. Log order ID <-> Vault ID mapping
        const billingConnectorsDir = path.join(__dirname, '..', 'billing_connectors');
        await fs.mkdir(billingConnectorsDir, { recursive: true });
        const shopifyMapPath = path.join(billingConnectorsDir, 'shopify_map.json');

        let shopifyMap = {};
        try {
            const mapData = await fs.readFile(shopifyMapPath, 'utf8');
            shopifyMap = JSON.parse(mapData);
        } catch (err) {
            if (err.code !== 'ENOENT') throw err;
        }

        shopifyMap[orderId] = {
            vault_user_id: vaultUserId,
            email: customerEmail,
            country: customerCountry,
            created_at: new Date().toISOString(),
        };

        await fs.writeFile(shopifyMapPath, JSON.stringify(shopifyMap, null, 4), 'utf8');
        console.log(`   ✓ Order mapping logged: ${orderId} → ${vaultUserId}`);

        // 5. Determine regional login URL
        let loginUrl = 'https://usa.crypdawgs.com/login';
        switch (customerCountry.toUpperCase()) {
            case 'JP':
                loginUrl = 'https://jp.crypdawgs.com/login';
                break;
            case 'AE':
                loginUrl = 'https://dubai.crypdawgs.com/login';
                break;
            case 'NG':
                loginUrl = 'https://ng.crypdawgs.com/login';
                break;
            case 'BR':
                loginUrl = 'https://br.crypdawgs.com/login';
                break;
        }
        console.log(`   ✓ Regional route: ${loginUrl}`);

        // 6. Store credentials in Supabase (for Apollo/Smartlead to retrieve)
        const { error: credError } = await supabase
            .from('vault_credentials')
            .insert({
                vault_user_id: vaultUserId,
                email: customerEmail,
                login_url: loginUrl,
                communication_mode: COMMUNICATION_MODE,
                created_at: new Date().toISOString(),
            });

        if (credError && !credError.message.includes('duplicate')) {
            console.warn('⚠️ Could not store credentials:', credError.message);
        } else {
            console.log(`   ✓ Credentials stored for ${COMMUNICATION_MODE}`);
        }

        // 7. Log to internal dashboard (no user email)
        const dashboardLog = {
            timestamp: new Date().toISOString(),
            order_id: orderId,
            vault_user_id: vaultUserId,
            customer_email: customerEmail,
            customer_name: customerName,
            country: customerCountry,
            amount: totalPrice,
            currency: currency,
            login_url: loginUrl,
            communication_mode: COMMUNICATION_MODE,
            status: 'provisioned',
        };

        const dashboardLogsDir = path.join(__dirname, '..', 'billing_connectors');
        const dashboardLogsPath = path.join(dashboardLogsDir, 'dashboard_logs.jsonl');
        await fs.appendFile(dashboardLogsPath, JSON.stringify(dashboardLog) + '\n', 'utf8');
        console.log(`   ✓ Dashboard log recorded`);

        console.log(`\n🎉 Vault access provisioned for ${customerEmail}`);
        console.log(`📡 Communication: ${COMMUNICATION_MODE}`);
        console.log(`---\n`);

        res.json({
            success: true,
            message: 'Vault access provisioned',
            mode: COMMUNICATION_MODE,
            vault_user_id: vaultUserId,
        });

    } catch (error) {
        console.error('❌ Error processing order webhook:', error.message);
        res.status(500).json({
            success: false,
            error: 'Error processing order',
            message: error.message,
        });
    }
});

app.listen(PORT, () => {
    console.log(`\n🚀 CrypDNA Vault Bridge Server running on port ${PORT}`);
    console.log(`📡 Communication Mode: ${COMMUNICATION_MODE}`);
    console.log(`📧 Email Enabled: ${EMAIL_ENABLED}`);
    console.log(`🔗 Webhook endpoint: POST /shopify/webhooks/orders_paid`);
    console.log(`💚 Health check: GET /health\n`);
});

