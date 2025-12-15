# CrypDNA Vault - Netlify Deployment Guide

## Quick Deploy Checklist

### 1. Connect Repository to Netlify
- Go to [Netlify Dashboard](https://app.netlify.com)
- Click "Add new site" → "Import an existing project"
- Connect to GitHub and select `chassee/crypdna-vault-genesis`

### 2. Configure Build Settings
Netlify should auto-detect these from `netlify.toml`, but verify:

```
Build command: npm run build
Publish directory: dist
Functions directory: netlify/functions
```

### 3. Set Environment Variables
In Netlify Dashboard → Site Settings → Environment Variables, add:

```bash
# Required - Frontend
VITE_SUPABASE_URL=https://jkrwyotrdlucyynnotpd.supabase.co
VITE_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imprcnd5b3RyZGx1Y3l5bm5vdHBkIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTEzMjM0NzUsImV4cCI6MjA2Njg5OTQ3NX0.NaGZ56xkvIIHj7XjeZbPTg6wHtkvihycvNa4Kzb51FQ
VITE_NETLIFY_FUNCTIONS_URL=https://vault.crypdawgs.com/.netlify/functions

# Required - Backend Functions (SECRET - Get from Supabase Dashboard)
SUPABASE_SERVICE_ROLE_KEY=your_service_role_key_here
```

**⚠️ IMPORTANT**: The `SUPABASE_SERVICE_ROLE_KEY` is NOT in the repository for security. Get it from:
- Supabase Dashboard → Project Settings → API → service_role key (secret)

### 4. Configure Custom Domain
- Netlify Dashboard → Domain Settings → Add custom domain
- Add: `vault.crypdawgs.com`
- Configure DNS:
  ```
  CNAME vault.crypdawgs.com → [your-site].netlify.app
  ```

### 5. Deploy
- Click "Deploy site"
- Wait for build to complete (~2-3 minutes)
- Verify deployment at your Netlify URL

### 6. Test Functions
After deployment, test each function:

#### Test validate_token
```bash
curl -X POST https://vault.crypdawgs.com/.netlify/functions/validate_token \
  -H "Content-Type: application/json" \
  -d '{"token":"test-token"}'
```

#### Test create_invite
```bash
curl -X POST https://vault.crypdawgs.com/.netlify/functions/create_invite \
  -H "Content-Type: application/json" \
  -d '{"user_id":"your-user-id"}'
```

#### Test recalc_prestige
```bash
curl -X POST https://vault.crypdawgs.com/.netlify/functions/recalc_prestige \
  -H "Content-Type: application/json" \
  -d '{"user_id":"your-user-id"}'
```

### 7. Verify Frontend Integration
- Open `https://vault.crypdawgs.com`
- Log in as a user
- Test "Generate Invite Link" button
- Test "Recalculate Rank" button
- Verify both work without errors

---

## Function Endpoints

All functions are available at:
```
https://vault.crypdawgs.com/.netlify/functions/{function_name}
```

### Available Functions:
1. **validate_token** - Validates signup tokens
2. **create_invite** - Generates invite codes
3. **recalc_prestige** - Recalculates user rank
4. **upload_verification** - Placeholder (not used)
5. **identity_card** - Placeholder (not used)

---

## Troubleshooting

### Function Returns 500 Error
- Check Netlify Function Logs: Dashboard → Functions → [function name] → Logs
- Verify `SUPABASE_SERVICE_ROLE_KEY` is set correctly
- Check Supabase URL is accessible

### Function Returns 404
- Verify function exists in `netlify/functions/` directory
- Check `netlify.toml` has correct functions directory
- Redeploy site

### CORS Errors
- All functions already have CORS headers configured
- If issue persists, check browser console for specific error
- Verify request is using correct Content-Type header

### Frontend Can't Call Functions
- Check browser console for network errors
- Verify `VITE_NETLIFY_FUNCTIONS_URL` is set in Netlify environment variables
- Check if fallback URL `https://vault.crypdawgs.com/.netlify/functions` is correct

---

## Monitoring

### Netlify Function Logs
- Dashboard → Functions → Select function → View logs
- Shows all invocations, errors, and console.log output

### Supabase Logs
- Supabase Dashboard → Logs
- Shows database queries and errors

---

## Rollback Plan

If deployment fails:
1. Go to Netlify Dashboard → Deploys
2. Find last working deployment
3. Click "Publish deploy" to rollback

---

## Next Steps After Deployment

1. **Test all user flows**
   - Signup with Shopify token
   - Generate invite code
   - Recalculate rank
   - Upload verification documents

2. **Monitor function performance**
   - Check cold start times
   - Monitor error rates
   - Review function logs

3. **Set up alerts**
   - Netlify → Notifications → Deploy notifications
   - Supabase → Project Settings → Notifications

4. **Consider enhancements**
   - Add rate limiting to functions
   - Implement function-level logging (Sentry)
   - Add monitoring (LogRocket, Datadog)

---

**Deployment Status**: Ready for Production ✅  
**Last Updated**: November 24, 2025
