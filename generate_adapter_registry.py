import json
import os

def generate_adapter_registry():
    registry = []
    credit_adapters_dir = "credit_adapters"

    if not os.path.exists(credit_adapters_dir):
        print(f"Error: Directory {credit_adapters_dir} not found.")
        return

    for filename in os.listdir(credit_adapters_dir):
        if filename.endswith("_adapter.json"):
            filepath = os.path.join(credit_adapters_dir, filename)
            try:
                with open(filepath, "r") as f:
                    adapter_data = json.load(f)
                
                region = adapter_data.get("region", "N/A")
                bureau = adapter_data.get("adapter_name", "N/A")
                status = adapter_data.get("status", "N/A")
                endpoint = adapter_data.get("endpoint", "")

                registry.append({
                    "region": region,
                    "bureau": bureau,
                    "status": status,
                    "endpoint_placeholder": endpoint
                })
            except json.JSONDecodeError:
                print(f"Error: Could not decode JSON from {filepath}")
            except Exception as e:
                print(f"An error occurred while processing {filepath}: {e}")
    
    registry_path = os.path.join(credit_adapters_dir, "adapter_registry.json")
    with open(registry_path, "w") as f:
        json.dump(registry, f, indent=2)
    print(f"Generated {registry_path}")

if __name__ == "__main__":
    generate_adapter_registry()

