# Guest Mode v1 - Isolated Feature Layer

## Overview
This folder contains 5 self-contained UI screens for CrypDNA Vault Guest Mode. These are **visual prototypes only** with no backend integration, authentication, or routing logic.

## Status
🔒 **Isolated & Non-Destructive**
- No existing files were modified
- No API calls or Supabase queries
- No authentication logic
- No routing changes
- Safe to preview without affecting live Member experience

## Components

### 1. GuestLandingScreen.jsx
**Purpose:** Entry point for Guest Mode  
**Features:** 
- Welcome message and value proposition
- Single "Enter as Guest" CTA
- Feature highlights grid
- Uses global theme tokens (primary, accent, background, etc.)

**Usage Example:**
```jsx
import GuestLandingScreen from '@/vault_experience_layers/guest_mode_v1/GuestLandingScreen';

// In your router or preview page:
<GuestLandingScreen />
```

### 2. PrestigeRankIntro.jsx
**Purpose:** Explain prestige ranking system  
**Features:**
- Static progress bar (35% mock progress)
- 4 tier cards (Initiate, Verified, Elite, Legend)
- Visual tier progression
- Benefits breakdown per tier

**Usage Example:**
```jsx
import PrestigeRankIntro from '@/vault_experience_layers/guest_mode_v1/PrestigeRankIntro';

<PrestigeRankIntro />
```

### 3. ReferralKeyGate.jsx
**Purpose:** Referral code input screen  
**Features:**
- Code input with validation states
- Fake validation (accepts any code starting with "CRYP")
- Animated feedback (validating → valid/invalid)
- Benefits preview grid
- Skip option

**Usage Example:**
```jsx
import ReferralKeyGate from '@/vault_experience_layers/guest_mode_v1/ReferralKeyGate';

<ReferralKeyGate />
```

### 4. VaultIdentityCardPreview.jsx
**Purpose:** Preview of CrypDNA identity card  
**Features:**
- 3D flippable card (click to flip)
- Front: Card design with chip, number, holder name
- Back: CVV, DNA score, credit limit, member ID
- All data is placeholder/mock
- Feature benefits grid

**Usage Example:**
```jsx
import VaultIdentityCardPreview from '@/vault_experience_layers/guest_mode_v1/VaultIdentityCardPreview';

<VaultIdentityCardPreview />
```

### 5. TierUnlockRewardsShowcase.jsx
**Purpose:** Visual showcase of tier rewards  
**Features:**
- 4 tier cards with reward lists
- Progression timeline
- Comparison table
- Locked/unlocked states
- Premium benefits preview

**Usage Example:**
```jsx
import TierUnlockRewardsShowcase from '@/vault_experience_layers/guest_mode_v1/TierUnlockRewardsShowcase';

<TierUnlockRewardsShowcase />
```

## Design System
All components use semantic tokens from:
- `src/index.css` (CSS variables)
- `tailwind.config.ts` (Tailwind theme)

### Colors Used
- `background` - Main background
- `foreground` - Main text
- `primary` - Primary brand color
- `accent` - Accent color
- `muted` - Muted text/backgrounds
- `card` - Card backgrounds
- `border` - Border colors

### Typography
- Font families from global theme
- Responsive text sizes
- Bold weights for headers

## Next Steps (Future Integration)
When ready to integrate Guest Mode into the live app:

1. **Add Routing:**
   ```jsx
   // In App.tsx or router config
   import GuestLandingScreen from '@/vault_experience_layers/guest_mode_v1/GuestLandingScreen';
   
   <Route path="/guest" element={<GuestLandingScreen />} />
   <Route path="/guest/ranks" element={<PrestigeRankIntro />} />
   // etc.
   ```

2. **Wire Navigation:**
   Replace `console.log()` calls with `navigate()` calls

3. **Add State Management:**
   Connect to actual user data, progress tracking, etc.

4. **Backend Integration:**
   Add API calls for referral validation, tier progression, etc.

## File Structure
```
vault_experience_layers/
└── guest_mode_v1/
    ├── GuestLandingScreen.jsx
    ├── PrestigeRankIntro.jsx
    ├── ReferralKeyGate.jsx
    ├── VaultIdentityCardPreview.jsx
    ├── TierUnlockRewardsShowcase.jsx
    └── README.md (this file)
```

## Confirmation
✅ **No existing files were modified**  
✅ **No dependencies added**  
✅ **No Supabase/Auth integration**  
✅ **All components are self-contained**  
✅ **Uses existing design system tokens**  
✅ **Safe to preview and test independently**

---

**Created:** October 2025  
**Status:** Visual Prototype  
**Integration:** Pending
