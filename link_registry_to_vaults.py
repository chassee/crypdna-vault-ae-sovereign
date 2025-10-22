import json
import os

def link_registry_to_vaults():
    vaults_dir = "vaults"
    adapter_registry_path = "credit_adapters/adapter_registry.json"

    if not os.path.exists(adapter_registry_path):
        print(f"Error: Adapter registry not found at {adapter_registry_path}")
        return

    print(f"Linking {adapter_registry_path} to Vault metadata...")

    for region_code in os.listdir(vaults_dir):
        region_path = os.path.join(vaults_dir, region_code)
        if os.path.isdir(region_path):
            config_path = os.path.join(region_path, "ui", "config.json")
            if os.path.exists(config_path):
                try:
                    with open(config_path, "r") as f:
                        config_data = json.load(f)

                    # Add or update the reference to the adapter registry
                    config_data["credit_adapter_registry_path"] = f"../../{adapter_registry_path}"

                    with open(config_path, "w") as f:
                        json.dump(config_data, f, indent=2)
                    print(f"Updated {config_path} with registry link.")
                except json.JSONDecodeError:
                    print(f"Error: Could not decode JSON from {config_path}")
                except Exception as e:
                    print(f"An error occurred while processing {config_path}: {e}")
            else:
                print(f"Warning: {config_path} not found for region {region_code}. Skipping.")

    print("Finished linking adapter registry to Vault metadata.")

if __name__ == "__main__":
    link_registry_to_vaults()

