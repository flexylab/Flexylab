# Railway Deployment Guide

## Required Environment Variables

Before deploying to Railway, you **MUST** set these environment variables in your Railway project:

### 1. Go to your Railway Project
- Visit https://railway.app
- Select the "Flexylab" project
- Go to the "Variables" tab

### 2. Add these variables:

```
RESEND_API_KEY=re_PtT2wQmG_4tBhsHSgUTBd1EpesVK4ERDu
MONGODB_URI=mongodb+srv://flexylab:flexylab123@cluster0.mongodb.net/flexylab?retryWrites=true&w=majority
JWT_SECRET=your-super-secret-jwt-key-change-this-in-production-make-it-long-and-random
NODE_ENV=production
```

### 3. Common Issues

**Error: "Build failed after 1 minute"**
- Make sure all 4 environment variables are set
- Check that the values don't have extra spaces
- Redeploy after setting variables

**Error: "Cannot connect to MongoDB"**
- Verify MONGODB_URI is correct
- Check that MongoDB cluster allows Railway IP (should be 0.0.0.0/0)

**Error: "Cannot send email"**
- Verify RESEND_API_KEY is correct
- Check that the domain flexylab.shop is verified in Resend dashboard

## Deployment Steps

1. Connect your GitHub repo (already done)
2. Set all environment variables above
3. Push to main branch (auto-deploys)
4. Check the Deployments tab for logs

## Custom Domain Setup

After successful deployment:
1. Go to Railway project Settings
2. Under "Custom Domain" add `flexylab.shop`
3. Add the Railway DNS record to your Namecheap DNS settings
4. Wait for DNS to propagate (5-10 minutes)
