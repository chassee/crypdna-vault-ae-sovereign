
import fs from 'fs/promises';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const VAULTS_PATH = path.join(__dirname, '..', 'vaults');
const ADAPTER_REGISTRY_PATH = path.join(__dirname, '..', 'adapter_registry.json');

async function loadJsonFile(filePath) {
    try {
        const data = await fs.readFile(filePath, 'utf8');
        return JSON.parse(data);
    } catch (error) {
        if (error.code === 'ENOENT') {
            return {}; // Return empty object if file not found
        } else {
            throw error;
        }
    }
}

async function saveJsonFile(filePath, data) {
    await fs.writeFile(filePath, JSON.stringify(data, null, 4), 'utf8');
}

async function activateAdapter(region, bureau) {
    console.log(`Activating credit adapter for region: ${region}, bureau: ${bureau}`);
    const vaultConfigPath = path.join(VAULTS_PATH, region, 'config.json');
    const vaultConfig = await loadJsonFile(vaultConfigPath);
    vaultConfig.active_credit_adapter = bureau;
    await saveJsonFile(vaultConfigPath, vaultConfig);
    console.log(`Vault config for ${region} updated to activate ${bureau}.`);
}

async function monitorAdapterRegistry() {
    console.log('Monitoring adapter registry for changes...');
    const registry = await loadJsonFile(ADAPTER_REGISTRY_PATH);

    for (const adapter of registry) {
        if (adapter.status === 'active') {
            const vaultConfigPath = path.join(VAULTS_PATH, adapter.region, 'config.json');
            const vaultConfig = await loadJsonFile(vaultConfigPath);

            if (vaultConfig.active_credit_adapter !== adapter.bureau) {
                console.log(`Detected activation for ${adapter.region} - ${adapter.bureau}. Triggering activation...`);
                await activateAdapter(adapter.region, adapter.bureau);
            } else {
                console.log(`Adapter for ${adapter.region} - ${adapter.bureau} already active in vault config.`);
            }
        }
    }
    console.log('Adapter registry monitoring complete.');
}

monitorAdapterRegistry().catch(console.error);

