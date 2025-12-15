
/**
 * Apollo-Smartlead Configuration
 * 
 * This configuration defines how the CrypDNA Vault Network communicates with customers
 * through Apollo and Smartlead campaigns instead of direct email.
 */

export const apolloSmartleadConfig = {
    // Communication Mode
    mode: 'Apollo_Smartlead',
    
    // Apollo Configuration
    apollo: {
        enabled: true,
        apiKey: process.env.APOLLO_API_KEY || '',
        baseUrl: 'https://api.apollo.io/v1',
        campaigns: {
            vaultWelcome: 'vault_welcome_campaign',
            credentialDelivery: 'vault_credential_delivery',
            regionSpecific: {
                JP: 'vault_welcome_jp',
                AE: 'vault_welcome_ae',
                NG: 'vault_welcome_ng',
                BR: 'vault_welcome_br',
                default: 'vault_welcome_global',
            },
        },
    },
    
    // Smartlead Configuration
    smartlead: {
        enabled: true,
        apiKey: process.env.SMARTLEAD_API_KEY || '',
        baseUrl: 'https://api.smartlead.ai/v1',
        campaigns: {
            vaultOnboarding: 'vault_onboarding',
            credentialSync: 'vault_credential_sync',
            regionSpecific: {
                JP: 'smartlead_jp_onboarding',
                AE: 'smartlead_ae_onboarding',
                NG: 'smartlead_ng_onboarding',
                BR: 'smartlead_br_onboarding',
                default: 'smartlead_global_onboarding',
            },
        },
    },
    
    // Supabase Configuration (for credential storage)
    supabase: {
        credentialTable: 'vault_credentials',
        transactionTable: 'vault_transactions',
        userTable: 'vault_users',
    },
    
    // Regional Routing
    regions: {
        JP: {
            vaultUrl: 'https://jp.crypdawgs.com',
            apolloCampaign: 'vault_welcome_jp',
            smartleadCampaign: 'smartlead_jp_onboarding',
        },
        AE: {
            vaultUrl: 'https://dubai.crypdawgs.com',
            apolloCampaign: 'vault_welcome_ae',
            smartleadCampaign: 'smartlead_ae_onboarding',
        },
        NG: {
            vaultUrl: 'https://ng.crypdawgs.com',
            apolloCampaign: 'vault_welcome_ng',
            smartleadCampaign: 'smartlead_ng_onboarding',
        },
        BR: {
            vaultUrl: 'https://br.crypdawgs.com',
            apolloCampaign: 'vault_welcome_br',
            smartleadCampaign: 'smartlead_br_onboarding',
        },
        default: {
            vaultUrl: 'https://usa.crypdawgs.com',
            apolloCampaign: 'vault_welcome_global',
            smartleadCampaign: 'smartlead_global_onboarding',
        },
    },
    
    // Dashboard Configuration
    dashboard: {
        logsFile: 'billing_connectors/dashboard_logs.jsonl',
        mappingFile: 'billing_connectors/shopify_map.json',
        credentialsCacheFile: 'billing_connectors/vault_credentials_cache.json',
    },
    
    // Logging Configuration
    logging: {
        enabled: true,
        level: 'info', // 'debug', 'info', 'warn', 'error'
        format: 'json',
    },
};

/**
 * Webhook Payload Structure for Apollo/Smartlead Integration
 */
export const webhookPayloadTemplate = {
    event: 'vault_access_provisioned',
    timestamp: new Date().toISOString(),
    data: {
        vault_user_id: 'uuid',
        email: 'customer@example.com',
        name: 'Customer Name',
        country: 'US',
        order_id: 'shopify_order_id',
        login_url: 'https://region.crypdawgs.com/login',
        communication_mode: 'Apollo_Smartlead',
        apollo_campaign: 'vault_welcome_global',
        smartlead_campaign: 'smartlead_global_onboarding',
    },
};

export default apolloSmartleadConfig;

