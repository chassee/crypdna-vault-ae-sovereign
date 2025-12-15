# 🚨 URGENT: Deploy Updated Code to Fix Errors

## The Problem

Your live site at **vault.crypdawgs.com** is still running the **OLD code** that tries to call Supabase Edge Functions (which we just deleted). That's why you're seeing:

```
Error: Failed to send a request to the Edge Function
```

The **new code** is in GitHub and works correctly, but it hasn't been deployed to production yet.

---

## The Solution: Redeploy Your Site

### Option 1: Automatic Deployment (If Connected to Netlify)

If your site is already connected to Netlify with auto-deploy enabled:

1. **Netlify should auto-deploy** when we pushed to GitHub
2. Check your Netlify dashboard: https://app.netlify.com
3. Look for a deployment in progress or recently completed
4. If no deployment triggered, manually trigger one:
   - Go to your site in Netlify Dashboard
   - Click "Deploys" tab
   - Click "Trigger deploy" → "Deploy site"

### Option 2: Manual Deployment via Netlify CLI

If you have Netlify CLI installed:

```bash
cd /path/to/crypdna-vault-genesis
netlify deploy --prod
```

### Option 3: Connect Repository to Netlify (If Not Connected)

If the site isn't connected to Netlify yet:

1. Go to https://app.netlify.com
2. Click "Add new site" → "Import an existing project"
3. Connect to GitHub
4. Select `chassee/crypdna-vault-genesis`
5. Netlify will auto-detect settings from `netlify.toml`
6. Add environment variables:
   ```
   VITE_SUPABASE_URL=https://jkrwyotrdlucyynnotpd.supabase.co
   VITE_SUPABASE_ANON_KEY=eyJhbGc...
   VITE_NETLIFY_FUNCTIONS_URL=https://vault.crypdawgs.com/.netlify/functions
   SUPABASE_SERVICE_ROLE_KEY=[get from Supabase Dashboard]
   ```
7. Deploy!

### Option 4: Deploy via Another Platform

If you're using a different platform (Vercel, Render, etc.):

1. Trigger a redeploy from that platform's dashboard
2. Make sure the build command is `npm run build`
3. Make sure the publish directory is `dist`
4. Make sure environment variables are set

---

## How to Verify Deployment Worked

After deployment completes:

1. **Clear your browser cache** (important!)
2. Go to https://vault.crypdawgs.com
3. Log in and try clicking:
   - "Recalculate Rank" button
   - "Generate Invite Link" button
4. **No more "Edge Function" errors** should appear
5. Check browser console (F12) - should see fetch calls to `/.netlify/functions/`

---

## What Changed in the New Code

The new code uses **Netlify Functions** instead of Supabase Edge Functions:

**Old (causing errors):**
```typescript
const { data, error } = await supabase.functions.invoke('update-rank', {
  body: { user_id: user.id }
});
```

**New (fixed):**
```typescript
const functionsUrl = import.meta.env.VITE_NETLIFY_FUNCTIONS_URL || 'https://vault.crypdawgs.com/.netlify/functions';
const response = await fetch(`${functionsUrl}/recalc_prestige`, {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({ user_id: user.id })
});
```

---

## Files That Changed (Already in GitHub)

✅ `src/components/InviteRewards.tsx` - Now calls Netlify function  
✅ `src/components/PrestigePanel.tsx` - Now calls Netlify function  
✅ `netlify/functions/create_invite/index.ts` - Production ready  
✅ `netlify/functions/recalc_prestige/index.ts` - Production ready  
✅ `netlify/functions/validate_token/index.ts` - Production ready  
✅ `.env` - Added VITE_NETLIFY_FUNCTIONS_URL  
✅ `netlify.toml` - Netlify configuration  

All changes are committed and pushed to GitHub (commits `402c309` and `6b03e6a`).

---

## Need Help?

If you're not sure how your site is deployed:

1. Check if you have a Netlify account at https://app.netlify.com
2. Check if you have a Vercel account at https://vercel.com/dashboard
3. Check your domain registrar's DNS settings to see where `vault.crypdawgs.com` points
4. Look for deployment webhooks in GitHub repo settings

---

## Expected Result After Deployment

✅ No more "Edge Function" errors  
✅ "Recalculate Rank" button works  
✅ "Generate Invite Link" button works  
✅ All functions call `/.netlify/functions/` endpoints  
✅ Site works exactly like in your screenshots  

---

**Status**: Code is ready in GitHub, just needs deployment to production.

**Last Updated**: November 24, 2025
