import json
import os

regions_data_path = "/home/ubuntu/regions_data.json"

def create_credit_adapters():
    print("Creating USA D&B tradeline and global placeholder adapter files...")

    try:
        with open(regions_data_path, "r") as f:
            regions_data = json.load(f)
    except FileNotFoundError:
        print(f"Error: {regions_data_path} not found. Cannot create credit adapters.")
        return
    except json.JSONDecodeError:
        print(f"Error: Could not decode JSON from {regions_data_path}. Check file format.")
        return

    # 1. Create USA D&B tradeline
    us_tradeline_data = {
        "adapter_name": "Dun & Bradstreet (D&B)",
        "region": "US",
        "status": "live",
        "schema_version": "1.0",
        "endpoint": "https://api.dnb.com/v1/tradeline",
        "api_key_env_var": "DNB_API_KEY",
        "mapping": {
            "vault_id": "duns_number",
            "cardholder_name": "legal_business_name",
            "dna_score": "paydex_score",
            "available_balance": "credit_limit",
            "pending_balance": "outstanding_balance",
            "tradeline_items": [
                {"vault_field": "tradeline_item_id", "dnb_field": "tradeline_id"},
                {"vault_field": "tradeline_type", "dnb_field": "type"},
                {"vault_field": "tradeline_amount", "dnb_field": "amount"},
                {"vault_field": "tradeline_status", "dnb_field": "status"}
            ]
        },
        "compliance_note": "Fully compliant with US financial regulations (e.g., FCRA)."
    }
    with open("credit_adapters/us_adapter.json", "w") as f:
        json.dump(us_tradeline_data, f, indent=2)
    print("Created credit_adapters/us_adapter.json (D&B Live).")

    # 2. Generate placeholder adapter files for all other regions
    for region_code in regions_data.keys():
        if region_code.lower() == "us": # Skip US as it's already live
            continue

        adapter_data = {
            "adapter_name": f"Credit Bureau ({region_code.upper()})",
            "region": region_code.upper(),
            "status": "locked",
            "schema_version": "1.0",
            "endpoint": "",
            "api_key_env_var": "",
            "mapping": {},
            "compliance_note": "Local regulations require specific approval before activation."
        }
        adapter_file_path = os.path.join("credit_adapters", f"{region_code.lower()}_adapter.json")
        with open(adapter_file_path, "w") as f:
            json.dump(adapter_data, f, indent=2)
        print(f"Created {adapter_file_path}")

    print("Global placeholder adapter files created.")

if __name__ == "__main__":
    create_credit_adapters()

