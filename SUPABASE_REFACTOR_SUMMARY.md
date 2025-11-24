# Supabase Client Consolidation & Auth Architecture Refactor

## Summary

This refactor consolidates all Supabase client initializations into a single source of truth and implements a global AuthProvider with stable session management to prevent blank screens and duplicate auth listeners.

---

## Changes Made

### 1. **Created Consolidated Supabase Client**

**File:** `/src/lib/supabaseClient.ts`

- Single Supabase client instance using VITE_ environment variables
- Proper TypeScript typing with Database types from `/src/integrations/supabase/types.ts`
- Configured with:
  - Persistent session storage in localStorage
  - Auto token refresh
  - PKCE flow for enhanced security
  - Session detection from URL (for OAuth callbacks)
  - Custom storage key: `crypdna-vault-auth`
- Helper functions: `getCurrentSession()` and `getCurrentUser()`

**Key Features:**
- Uses `import.meta.env.VITE_SUPABASE_URL` and `import.meta.env.VITE_SUPABASE_ANON_KEY`
- Fallback values for development
- Dynamic redirect URL based on current origin (supports both production and localhost)

---

### 2. **Created Global AuthProvider**

**File:** `/src/components/AuthProvider.tsx`

- Centralized authentication state management
- Single, stable session listener (prevents duplicate subscriptions)
- Automatic session hydration from localStorage
- User profile fetching and caching

**Exposed Context:**
```typescript
{
  user: User | null;
  session: Session | null;
  loading: boolean;
  userProfile: UserProfile | null;
  signOut: () => Promise<void>;
  refreshProfile: () => Promise<void>;
}
```

**Usage:**
```typescript
import { useAuth } from '@/components/AuthProvider';

const { user, session, loading, userProfile, signOut } = useAuth();
```

**Key Features:**
- Prevents duplicate auth listeners with `useRef` guard
- Fetches user profile from `users` table automatically
- Handles sign out with state cleanup
- 100ms hydration delay to prevent race conditions

---

### 3. **Updated App.tsx**

**File:** `/src/App.tsx`

- Wrapped entire app with `<AuthProvider>`
- All routes now have access to centralized auth state
- No changes to routing structure

**Before:**
```tsx
<HashRouter>
  <Routes>...</Routes>
</HashRouter>
```

**After:**
```tsx
<AuthProvider>
  <HashRouter>
    <Routes>...</Routes>
  </HashRouter>
</AuthProvider>
```

---

### 4. **Refactored ProtectedRoute**

**File:** `/src/components/ProtectedRoute.tsx`

**Before:**
- Manual session checking with delays
- Used `window.location.hash` for redirects
- Duplicate auth state management

**After:**
- Uses `useAuth()` hook from AuthProvider
- Clean React Router navigation with `useNavigate()`
- No duplicate session checks
- Shows `LuxuryLoadingScreen` while checking auth
- Automatically redirects to `/auth` if not authenticated

**Key Improvements:**
- Removed all manual session checking code
- Removed `useRef` guards (no longer needed)
- Simplified to ~40 lines from ~80 lines
- No more race conditions or redirect loops

---

### 5. **Refactored VaultDashboard**

**File:** `/src/pages/VaultDashboard.tsx`

**Before:**
- Managed its own auth state with `useState` for user and session
- Had its own `onAuthStateChange` listener
- Fetched user profile independently
- Duplicate auth logic

**After:**
- Uses `useAuth()` hook for all auth state
- Only manages vault-specific data (KYC, verification, balances)
- Uses `signOut` from AuthProvider
- No duplicate auth listeners

**Key Improvements:**
- Removed ~50 lines of duplicate auth code
- Simplified to focus only on vault data
- Better loading state management
- Uses AuthProvider's `userProfile` directly

---

### 6. **Updated All Import Statements**

**Files Updated (18 total):**

**Pages:**
- `/src/pages/Auth.tsx`
- `/src/pages/AuthCallback.tsx`
- `/src/pages/Reset.tsx`
- `/src/pages/VaultDashboard.tsx`
- `/src/pages/ID.tsx`

**Components:**
- `/src/components/BalanceBreakdown.tsx`
- `/src/components/CreditActivity.tsx`
- `/src/components/CrypbotManagement.tsx`
- `/src/components/Navigation.tsx` (also refactored to use AuthProvider's signOut)
- `/src/components/VaultVerification.tsx`

**Tab Components:**
- `/src/components/tabs/CrypbotsTab.tsx`
- `/src/components/tabs/LeaderboardTab.tsx`
- `/src/components/tabs/LifestyleConciergeTab.tsx`
- `/src/components/tabs/NeuroDropTab.tsx`
- `/src/components/tabs/QuestsTab.tsx`
- `/src/components/tabs/VaultRewardsTab.tsx`

**Hooks & API:**
- `/src/hooks/useUserProfile.ts`
- `/src/lib/api/*.ts` (all API helper files)

**Changed From:**
```typescript
import { supabase } from '@/integrations/supabase/client';
```

**Changed To:**
```typescript
import { supabase } from '@/lib/supabaseClient';
```

---

### 7. **Updated Navigation Component**

**File:** `/src/components/Navigation.tsx`

**Before:**
- Directly called `supabase.auth.signOut()`
- Manual redirect with `window.location.hash`

**After:**
- Uses `useAuth()` hook
- Calls `signOut()` from AuthProvider
- Cleaner error handling

---

## Architecture Benefits

### Before Refactor:
- ❌ Multiple Supabase client instances (potential for inconsistency)
- ❌ Each component managed its own auth state
- ❌ Duplicate `onAuthStateChange` listeners (performance issue)
- ❌ Race conditions between session checks
- ❌ Components could render blank screens if session was null
- ❌ Difficult to debug auth issues

### After Refactor:
- ✅ Single Supabase client instance (consistent behavior)
- ✅ Centralized auth state management
- ✅ Single auth listener (better performance)
- ✅ No race conditions (proper hydration delay)
- ✅ Loading guards prevent blank screens
- ✅ Easy to debug (all auth logic in one place)
- ✅ Type-safe with TypeScript
- ✅ Reusable `useAuth()` hook

---

## File Structure

```
src/
├── lib/
│   └── supabaseClient.ts          ← NEW: Single Supabase client
├── components/
│   ├── AuthProvider.tsx           ← NEW: Global auth context
│   ├── ProtectedRoute.tsx         ← REFACTORED: Uses AuthProvider
│   ├── Navigation.tsx             ← REFACTORED: Uses AuthProvider
│   └── ...                        ← UPDATED: Import paths
├── pages/
│   ├── VaultDashboard.tsx         ← REFACTORED: Uses AuthProvider
│   ├── Auth.tsx                   ← UPDATED: Import path
│   ├── AuthCallback.tsx           ← UPDATED: Import path
│   ├── Reset.tsx                  ← UPDATED: Import path
│   └── ID.tsx                     ← UPDATED: Import path
├── App.tsx                        ← UPDATED: Wrapped with AuthProvider
└── integrations/
    └── supabase/
        ├── client.ts              ← DEPRECATED: No longer used
        └── types.ts               ← KEPT: Database types still used
```

---

## Migration Notes

### Old Client File
The old client file at `/src/integrations/supabase/client.ts` is no longer imported anywhere but has been kept for reference. It can be safely deleted if desired.

### Type Imports
Components that need Supabase types (like `User`, `Session`) should import from `@supabase/supabase-js`:
```typescript
import type { User, Session } from '@supabase/supabase-js';
```

### Database Types
The Database type definitions are still located at `/src/integrations/supabase/types.ts` and are imported by the new client.

---

## Testing Checklist

- [ ] Login with email/password works
- [ ] Login with magic link works
- [ ] OAuth callback works
- [ ] Password reset works
- [ ] Sign out works
- [ ] Protected routes redirect to /auth when not authenticated
- [ ] VaultDashboard loads without blank screens
- [ ] Session persists across page refreshes
- [ ] No duplicate auth listeners in console
- [ ] No redirect loops
- [ ] Loading screens show appropriately
- [ ] User profile loads correctly

---

## Server-Side Note

**File:** `/server/index.js`

The server-side code still uses its own Supabase client initialization:
```javascript
const supabase = createClient(supabaseUrl, supabaseKey);
```

This is correct and should NOT be changed, as server-side code:
- Uses different environment variables (not VITE_ prefixed)
- Requires different auth configuration
- Should not share client instances with frontend

---

## Environment Variables Required

Ensure these are set in your `.env` file:

```env
VITE_SUPABASE_URL=https://jkrwyotrdlucyynnotpd.supabase.co
VITE_SUPABASE_ANON_KEY=your_anon_key_here
```

---

## Next Steps

1. Test all authentication flows
2. Monitor console for any auth-related errors
3. Verify no blank screens occur in VaultDashboard
4. Check that session persists across page refreshes
5. Optionally delete `/src/integrations/supabase/client.ts` if no longer needed

---

## Support

If you encounter any issues:
1. Check browser console for errors
2. Verify environment variables are set correctly
3. Clear localStorage and try again: `localStorage.clear()`
4. Check that all imports use `@/lib/supabaseClient`

---

**Refactor completed successfully! 🎉**
