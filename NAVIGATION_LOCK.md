# 🔒 CrypDNA Vault Navigation Lock

## ⚠️ CRITICAL: DO NOT MODIFY WITHOUT AUTHORIZATION

This document establishes the **permanent, hard-locked configuration** for the CrypDNA Vault bottom navigation across **ALL regions and deployments**.

---

## 🎯 Navigation Order (IMMUTABLE)

The bottom navigation **MUST** follow this exact order (left → right):

| Position | Tab ID     | Icon        | Label    | Purpose                                      |
|----------|------------|-------------|----------|----------------------------------------------|
| 1        | `balances` | Wallet      | Balance  | Financial overview, balances, tradelines     |
| 2        | `drops`    | Rocket      | Drops    | Limited releases, exclusive items            |
| 3        | **`id`**   | **CreditCard** | **ID** | **Prestige Rank, CrypDNA Card, Invite Rewards** |
| 4        | `activity` | Activity    | Activity | Credit monitoring, transaction history       |
| 5        | `about`    | Info        | Info     | About, support, documentation                |

---

## 🚫 PROHIBITED MODIFICATIONS

### ❌ DO NOT:
- Remove or replace the **ID tab** under any circumstances
- Add **Neuro**, **Waves**, **Brain**, or any experimental tabs to bottom navigation
- Change the navigation order
- Implement feature flags that conditionally swap tabs
- Create region-specific navigation overrides
- Use environment variables to control navigation structure

### ✅ ID Tab is CORE VAULT IDENTITY
The ID tab displays:
- **Prestige Rank** (user status and progression)
- **CrypDNA Card** (identity verification)
- **Invite Rewards** (referral system)

This is **NOT** an experimental feature. This is a **permanent brand surface**.

---

## 🧪 Neuro/Waves Policy

**Neuro** and **Waves** features belong **ONLY** in:
- NeuroTech Laboratory section (Alpha/Coming Soon)
- Future features modules
- Experimental tabs (NOT bottom navigation)

**Neuro/Waves MUST NEVER:**
- Appear in bottom navigation
- Replace the ID tab
- Override core navigation on any region

---

## 🌍 Regional Deployment Policy

This navigation configuration applies **identically** to:
- `vault.crypdawgs.com` (USA)
- `ae.crypdawgs.com` (Dubai)
- `jp.crypdawgs.com` (Japan)
- `uk.crypdawgs.com` (United Kingdom)
- **ALL 27+ regional vault subdomains**

**No region** should show different navigation. **No exceptions.**

---

## 🔧 Implementation Files

The following files enforce this lock:

### Primary Navigation Components
- **`src/components/MobileFloatingNav.tsx`**
  - Mobile bottom navigation (floating pill)
  - Hard-locked `navItems` array
  - Explicit protection comments

- **`src/pages/VaultDashboard.tsx`**
  - Desktop tab navigation
  - Hard-locked `TabKey` type
  - Hard-locked `TabsList` and `TabsContent`

### Type Safety
```typescript
type TabKey = 'balances' | 'drops' | 'id' | 'activity' | 'about';
```
**DO NOT** add `'neuro'`, `'waves'`, or `'crypbots'` to this type.

---

## 🛡️ Regression Protection

### Code Comments
All navigation files contain explicit warning comments:
```typescript
// ═══════════════════════════════════════════════════════════════════════════════
// 🔒 VAULT BOTTOM NAVIGATION — HARD-LOCKED CONFIGURATION
// ═══════════════════════════════════════════════════════════════════════════════
// ⚠️  DO NOT REMOVE OR REPLACE THE ID TAB — CORE VAULT IDENTITY
// ⚠️  DO NOT ADD NEURO/WAVES TO BOTTOM NAVIGATION — ALPHA FEATURE ONLY
// ⚠️  DO NOT MODIFY THIS ORDER WITHOUT EXPLICIT AUTHORIZATION
```

### Enforcement Checklist
Before any navigation changes, verify:
- [ ] ID tab remains in position 3
- [ ] No Neuro/Waves tabs in bottom navigation
- [ ] Navigation order unchanged
- [ ] No feature flags controlling navigation
- [ ] No environment-based conditionals
- [ ] All regions use identical navigation

---

## 📋 Change Request Process

If navigation changes are required:

1. **Document the business justification**
2. **Get explicit approval from product leadership**
3. **Update this NAVIGATION_LOCK.md file**
4. **Update all affected components**
5. **Test across ALL regional deployments**
6. **Commit with clear explanation**

**DO NOT** make navigation changes without following this process.

---

## 🔍 Verification

To verify navigation integrity:

```bash
# Check navigation configuration
grep -r "navItems\|TabKey" src/components/MobileFloatingNav.tsx src/pages/VaultDashboard.tsx

# Verify no Neuro/Waves in navigation
grep -r "neuro\|Neuro\|waves\|Waves" src/components/MobileFloatingNav.tsx src/pages/VaultDashboard.tsx

# Should return NO matches
```

---

## 📅 Last Updated
**Date:** December 16, 2025  
**Commit:** `fix/vault-navigation-hard-lock`  
**Author:** CrypDNA Engineering Team  
**Status:** 🔒 **LOCKED AND ENFORCED**

---

## ⚖️ License & Ownership
© 2025 CrypDNA. All rights reserved.  
This navigation structure is proprietary and protected.
