# ⚡ QUICK FIX: 3 Ways to Deploy and Stop the Errors

## Why You're Getting Errors

The error **"Failed to send a request to the Edge Function"** happens because:

1. ✅ **GitHub has the NEW code** (using Netlify Functions) - This is correct!
2. ❌ **vault.crypdawgs.com has the OLD code** (trying to call deleted Supabase Functions) - This needs to be updated!

**Solution**: Redeploy your site so it uses the new code from GitHub.

---

## 🚀 Option 1: Netlify Dashboard (Easiest - 2 minutes)

1. Go to **https://app.netlify.com**
2. Find your **crypdna-vault-genesis** site
3. Click **"Deploys"** tab
4. Click **"Trigger deploy"** → **"Deploy site"**
5. Wait 2-3 minutes for build to complete
6. ✅ **Done!** Test your site

---

## 🔧 Option 2: Netlify CLI (If you have it installed)

```bash
# Login to Netlify
netlify login

# Link to your site (if not linked)
netlify link

# Deploy to production
netlify deploy --prod
```

---

## 🔌 Option 3: Connect GitHub to Netlify (If not connected)

If your site isn't auto-deploying from GitHub:

1. Go to **https://app.netlify.com**
2. Click **"Add new site"** → **"Import an existing project"**
3. Choose **GitHub**
4. Select **chassee/crypdna-vault-genesis**
5. Netlify auto-detects settings from `netlify.toml` ✅
6. Add these environment variables:
   ```
   VITE_SUPABASE_URL=https://jkrwyotrdlucyynnotpd.supabase.co
   VITE_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imprcnd5b3RyZGx1Y3l5bm5vdHBkIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTEzMjM0NzUsImV4cCI6MjA2Njg5OTQ3NX0.NaGZ56xkvIIHj7XjeZbPTg6wHtkvihycvNa4Kzb51FQ
   VITE_NETLIFY_FUNCTIONS_URL=https://vault.crypdawgs.com/.netlify/functions
   SUPABASE_SERVICE_ROLE_KEY=[Get from Supabase Dashboard → Settings → API]
   ```
7. Click **"Deploy site"**
8. Configure custom domain: **vault.crypdawgs.com**

---

## ✅ How to Verify It Worked

After deployment:

1. **Clear browser cache** (Ctrl+Shift+Delete or Cmd+Shift+Delete)
2. Go to **https://vault.crypdawgs.com**
3. Log in
4. Click **"Recalculate Rank"** button
5. Click **"Generate Invite Link"** button

**Expected Result:**
- ✅ No "Edge Function" errors
- ✅ Buttons work correctly
- ✅ Functions call `/.netlify/functions/` endpoints

---

## 🔍 Still Getting Errors?

### Check 1: Browser Cache
- Hard refresh: **Ctrl+F5** (Windows) or **Cmd+Shift+R** (Mac)
- Or clear all browser cache

### Check 2: Deployment Completed
- Check Netlify dashboard shows "Published" status
- Check deployment logs for any errors

### Check 3: Environment Variables
- Verify all 4 environment variables are set in Netlify
- Especially `SUPABASE_SERVICE_ROLE_KEY` (this is secret, not in .env)

### Check 4: Function Endpoints
- Open browser console (F12)
- Try clicking "Recalculate Rank"
- Should see fetch to: `https://vault.crypdawgs.com/.netlify/functions/recalc_prestige`
- NOT: `https://jkrwyotrdlucyynnotpd.supabase.co/functions/v1/...`

---

## 📞 Need Help?

If you're still stuck, check:

1. **Netlify deployment logs** - Shows build errors
2. **Netlify function logs** - Shows runtime errors
3. **Browser console (F12)** - Shows frontend errors

---

## What Changed (Already in GitHub)

✅ `InviteRewards.tsx` - Uses Netlify `/create_invite` function  
✅ `PrestigePanel.tsx` - Uses Netlify `/recalc_prestige` function  
✅ All 5 Netlify Functions - Production ready (491 lines of code)  
✅ Removed Supabase Edge Functions - No longer needed  

**All code is ready - just needs deployment!**

---

**Last Updated**: November 24, 2025
