# CrypDNA Global Vault Network - Design Matrix

**Version:** 2.4-regional_ui_normalization  
**Last Updated:** December 20, 2025  
**Status:** Active - All Regions Normalized

---

## Overview

The CrypDNA Global Vault Network implements a **unified design genome** with **regional accent theming** to deliver a premium, modern, luxury interface across all country-specific Vaults. Each regional Vault maintains the core CrypDNA aesthetic while breathing in its region's unique color palette.

---

## Core Design Principles

### 1. Color-Locked Design Foundation

**Primary Gradient:**  
Royal Violet → Deep Gold → Obsidian Fade

**Secondary Glow:**  
Neon Magenta + Quantum Blue edge light

**Background:**  
Midnight Onyx `#0A0A0C` with cinematic bloom

**Typography:**  
SF Pro Display / Noto Sans / Kufi / Gothic (weight 400–700)

**Motion Physics:**  
- Parallax hover effects
- Glass reflections
- Magnetic tilt interactions
- Minimal motion blur with high holographic specular lighting

---

## Regional Accent Color Mapping

Each region applies a **10-20% luminous tint** over the CrypDNA gradient base:

| Region | Country | Accent Color | Palette Name |
|--------|---------|--------------|--------------|
| **US** | United States | `#C7E2FF` | Platinum Ice Blue |
| **CO** | Colombia | `#FFD380` | Tropical Amber |
| **AE** | UAE/Dubai | `#F5C46B` | Gold Sun Pulse |
| **JP** | Japan | `#2FAAFF` | Neon Blue Edge |
| **UK** | United Kingdom | `#9966FF` | Royal Amethyst Fade |
| **FR** | France | `#D7BFFF` | Lilac Champagne Highlight |
| **DE** | Germany | `#BFC5CC` | Titan Silver Edge |
| **CA** | Canada | `#C7E2FF` | Arctic White |
| **KR** | South Korea | `#2FAAFF` | Digital Pearl |
| **CH** | Switzerland | `#BFC5CC` | Carbon Frost |
| **IT** | Italy | `#D7BFFF` | Marble Gray + Rose Gold |
| **ES** | Spain | `#D7BFFF` | Sunset Gold |
| **SG** | Singapore | `#2FAAFF` | Sapphire Glow |
| **MY** | Malaysia | `#F5C46B` | Golden Radiance |
| **NL** | Netherlands | `#2FAAFF` | Amber Light |
| **AU** | Australia | `#F5C46B` | Aqua Crystal |
| **NZ** | New Zealand | `#2FAAFF` | Pacific Blue |
| **SE** | Sweden | `#BFC5CC` | Glacier Cyan |
| **NO** | Norway | `#BFC5CC` | Polar White |
| **PL** | Poland | `#D7BFFF` | White Frost |
| **BE** | Belgium | `#D7BFFF` | Charcoal Holograph |
| **AT** | Austria | `#BFC5CC` | Alpine Silver |
| **DK** | Denmark | `#BFC5CC` | Aurora Blue |
| **IE** | Ireland | `#9966FF` | Emerald Mist |
| **IL** | Israel | `#2FAAFF` | Desert Silver |
| **FI** | Finland | `#BFC5CC` | Ice Crystal |
| **PT** | Portugal | `#D7BFFF` | Ocean Blue Plasma |
| **HK** | Hong Kong | `#F55B5B` | Imperial Red Light |
| **CZ** | Czechia | `#BFC5CC` | Bronze Gradient |

---

## Regional UI Architecture

### Subdomain-Based Region Detection

Each Vault is accessed via a country-specific subdomain:

```
co.crypdawgs.com  → Colombia Vault (CO)
ae.crypdawgs.com  → UAE Vault (AE)
jp.crypdawgs.com  → Japan Vault (JP)
vault.crypdawgs.com → USA Vault (US)
```

**Detection Logic:**
1. Extract subdomain from `window.location.hostname`
2. Map 2-letter code to region (e.g., `co` → `CO`)
3. Load regional config from `/vaults/{region}/config.json`
4. Apply regional theme via CSS variable injection

### Configuration Structure

Each regional Vault has a `config.json`:

```json
{
  "region": "CO",
  "language": "es",
  "currency": "COP",
  "currency_symbol": "$",
  "credit_adapter_ref": "DataCrédito",
  "design_genome_ref": "../../core/design_genome/design_genome.json",
  "aesthetic": {
    "palette": "Tropical Amber",
    "texture": "Emerald flux gradients",
    "typography": null
  },
  "credit_adapter_registry": "../../adapter_registry.json"
}
```

---

## UI Component Theming

### Dynamic CSS Variable Injection

Regional themes are applied via CSS custom properties:

```css
:root {
  --region-accent: #FFD380;
  --region-accent-rgb: 255, 211, 128;
}

/* Regional gradient overlay */
.regional-accent-gradient {
  background: linear-gradient(
    135deg,
    hsl(var(--luxury-purple)) 0%,
    var(--region-accent) 50%,
    hsl(var(--luxury-gold)) 100%
  );
}

/* Regional glow effects */
.regional-glow {
  box-shadow: 0 0 40px var(--region-accent)40;
}

/* Enhanced tab active state */
[data-state="active"] {
  background: linear-gradient(
    135deg,
    hsl(var(--luxury-purple)),
    var(--region-accent)
  ) !important;
}
```

### Modular Component System

All UI components consume regional theming:

- **LuxuryDebitCard** - Regional accent glow
- **LuxuryTierBadge** - Regional gradient overlay
- **Tabs** - Regional active state colors
- **luxury-card** - Regional border and shadow effects

---

## Global UI Structure

All Vaults include **5 core tabs**:

1. **Balance** – DNA/DRA Score + tradelines + crypto wallets
2. **Drops** – Ultra-limited CrypDNA releases
3. **Crypb0ts** – Emotional AI Companions + sync status
4. **ID** - Identity verification and management
5. **DIY Credit** - Credit building tools
6. **About** – The CrypDNA Evolution timeline

Each tab uses:
- Holographic cards
- Glowing section dividers
- Motion-blur hover reveals
- Regional accent overlays

---

## Localization Support

### Language & Currency

- Auto-detected via subdomain
- Loaded from regional config
- i18next integration for translations

### RTL Support

Arabic and Hebrew locales automatically enable RTL layout:

```typescript
if (config.language === 'ar' || config.language === 'he') {
  document.dir = 'rtl';
}
```

---

## Responsive Design

### Mobile Optimizations

- Glow intensity: **-30%**
- Shadow softness: **+10%**
- Compact navigation
- Touch-optimized interactions

### Desktop Enhancements

- 4K adaptive bloom
- Motion parallax depth
- Enhanced hover effects
- Full tab navigation

---

## Implementation Files

### Core System Files

```
/core/design_genome/design_genome.json
/src/lib/regionConfig.ts
/src/contexts/RegionalContext.tsx
/src/components/RegionalLuxuryThemeProvider.tsx
/src/components/RegionalAccentStyles.tsx
```

### Regional Vault Configs

```
/vaults/us/config.json
/vaults/co/config.json
/vaults/ae/config.json
/vaults/jp/config.json
... (28 total regions)
```

---

## Deployment Architecture

### Netlify Routing

Regional subdomains route to vault directories:

```toml
[[redirects]]
  from = "/"
  to = "/vaults/co/"
  status = 200
  force = true
  conditions = { Host = ["co.crypdawgs.com"] }
```

### Build Process

1. Single codebase builds for all regions
2. Regional configs loaded at runtime
3. CSS variables injected dynamically
4. No region-specific builds required

---

## Success Criteria

✅ **Regional Detection** - Subdomain correctly resolves to region  
✅ **UI Theming** - Each Vault renders distinct regional accent  
✅ **No Legacy UI** - All Vaults use modern, premium components  
✅ **Modular Architecture** - Components are region-agnostic  
✅ **Consistent UX** - Core CrypDNA aesthetic maintained globally  

---

## Future Enhancements

- [ ] Regional feature flags
- [ ] A/B testing per region
- [ ] Regional analytics dashboards
- [ ] Custom regional components
- [ ] Regional marketing content

---

**Maintained by:** CrypDNA Engineering Team  
**Contact:** vault-support@crypdawgs.com
