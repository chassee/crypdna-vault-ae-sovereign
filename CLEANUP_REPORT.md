# CrypDNA Vault Repository Cleanup Report

## Phase 1: Discovery & Analysis

### Current State Assessment

#### Function Systems Found:
1. **Supabase Edge Functions** (OUTDATED - TO BE REMOVED)
   - `/supabase/functions/validate-token/index.ts` - Deno-based token validation
   - `/supabase/functions/shopify-order-paid/index.ts` - Shopify webhook handler
   - `/supabase/config.toml` - Supabase configuration
   - `/supabase/.temp/` - Temporary CLI files

2. **Netlify Functions** (CURRENT - TO BE FIXED)
   - `/netlify/functions/validate_token/index.ts` - STUB (needs implementation)
   - `/netlify/functions/create_invite/index.ts` - STUB (needs implementation)
   - `/netlify/functions/recalc_prestige/index.ts` - STUB (needs implementation)
   - `/netlify/functions/upload_verification/index.ts` - (to be checked)
   - `/netlify/functions/identity_card/index.ts` - (to be checked)

#### Frontend Function Callers Found:
1. **InviteRewards.tsx** (Line 48)
   - Currently calls: `supabase.functions.invoke('generate-invite-code', ...)`
   - Should call: Netlify function `create_invite`

2. **PrestigePanel.tsx** (Line 36)
   - Currently calls: `supabase.functions.invoke('update-rank', ...)`
   - Should call: Netlify function `recalc_prestige`

3. **VaultVerification.tsx**
   - Uses direct Supabase storage upload (CORRECT - no function needed)
   - No function invocation found

#### Environment Variables:
- **Main .env**: Contains only Supabase credentials
  - VITE_SUPABASE_URL
  - VITE_SUPABASE_ANON_KEY
  - VITE_SUPABASE_PROJECT_ID
  - VITE_SUPABASE_PUBLISHABLE_KEY
  - **MISSING**: VITE_NETLIFY_FUNCTIONS_URL

- **server/.env**: Server-side configuration (not used by frontend)

## Phase 2: Actions Required

### 1. Remove Supabase Edge Functions
- [ ] Delete `/supabase/functions/` directory
- [ ] Delete `/supabase/.temp/` directory
- [ ] Delete `/supabase/config.toml`
- [ ] Keep `/supabase/migrations/` (database schema)

### 2. Implement Netlify Functions
- [ ] Migrate validate-token logic from Supabase to Netlify
- [ ] Implement create_invite function
- [ ] Implement recalc_prestige function
- [ ] Verify upload_verification function
- [ ] Verify identity_card function
- [ ] Convert all from Deno to Node.js/TypeScript

### 3. Fix Frontend Callers
- [ ] Update InviteRewards.tsx to use Netlify function
- [ ] Update PrestigePanel.tsx to use Netlify function
- [ ] Add VITE_NETLIFY_FUNCTIONS_URL to .env

### 4. Clean Unused Folders
- [ ] Scan for duplicate/unused directories
- [ ] Remove empty folders
- [ ] Consolidate scattered files

### 5. Fix Imports & Types
- [ ] Remove Deno imports from Netlify functions
- [ ] Add Node.js/Netlify handler types
- [ ] Ensure TypeScript compilation

---

*Report generated: Phase 2 - Identification Complete*
