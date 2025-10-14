# Netlify Deployment Guide for Lions Share FCU Calculator

## 🚀 Quick Deployment Steps

### Step 1: Connect to Netlify

1. **Go to Netlify**: https://app.netlify.com
2. **Sign up/Login** with GitHub account
3. **Click "Add new site"** → "Import an existing project"
4. **Connect GitHub** and select your repository
5. **Deploy settings** (auto-detected from netlify.toml):
   - Build command: `npm run build:netlify`
   - Publish directory: `dist`
   - Node version: 18

### Step 2: Set Environment Variables

In Netlify Dashboard → Site Settings → Environment Variables, add:

```
VITE_GOOGLE_SHEETS_API_KEY=your_google_api_key_here
VITE_GOOGLE_SHEET_ID=your_google_sheet_id_here
```

### Step 3: Custom Domain Setup (Optional but Recommended)

#### Option 1: Use Netlify Subdomain
Your site will be available at: `https://your-site-name.netlify.app`

#### Option 2: Custom Domain (Recommended)
1. **In Netlify Dashboard**:
   - Go to Site Settings → Domain Management
   - Click "Add custom domain"
   - Enter: `calculator.lionsharecu.org`

2. **DNS Configuration**:
   Add this CNAME record to your DNS provider:
   ```
   Type: CNAME
   Name: calculator
   Value: your-site-name.netlify.app
   TTL: 3600
   ```

3. **SSL Certificate**:
   - Netlify automatically provisions SSL certificates
   - Usually active within 24 hours
   - Forces HTTPS redirects automatically

## 🔗 Iframe Embed Codes

### After Netlify Deployment:

**With Netlify domain:**
```html
<iframe 
    src="https://your-site-name.netlify.app/calculator.html" 
    width="100%" 
    height="600px" 
    frameborder="0" 
    title="Lions Share FCU Calculator">
</iframe>
```

**With custom domain (recommended):**
```html
<iframe 
    src="https://calculator.lionsharecu.org/calculator.html" 
    width="100%" 
    height="600px" 
    frameborder="0" 
    title="Lions Share FCU Calculator">
</iframe>
```

## ✅ SSL Security Features

- **Automatic HTTPS** - All traffic encrypted
- **HTTP to HTTPS redirects** - Configured in netlify.toml
- **Security headers** - XSS protection, content type sniffing prevention
- **Iframe permissions** - Properly configured for embedding
- **HSTS headers** - HTTP Strict Transport Security enabled

## 🔧 Build Configuration

The `netlify.toml` file includes:
- ✅ **Build optimization** - Copies all necessary files
- ✅ **SPA routing** - Handles React Router
- ✅ **Security headers** - Production-ready security
- ✅ **Iframe embedding** - Allows calculator embedding
- ✅ **HTTPS enforcement** - Automatic SSL redirects

## 📊 Netlify Benefits

- **Global CDN** - Fast loading worldwide
- **Automatic deployments** - Deploy on git push
- **Branch previews** - Test changes before going live
- **Form handling** - Built-in form processing
- **Analytics** - Traffic and performance insights
- **Edge functions** - Serverless capabilities

## 🚨 Migration Checklist

- [ ] Repository connected to Netlify
- [ ] Environment variables configured
- [ ] First deployment successful
- [ ] Calculator loads at new URL
- [ ] SSL certificate active (HTTPS working)
- [ ] Custom domain configured (if using)
- [ ] Iframe embeds updated on your website
- [ ] Old Bolt hosting URL redirected/updated

## 🆘 Troubleshooting

**Build fails?**
- Check that all dependencies are in package.json
- Verify Node version is 18
- Check build logs in Netlify dashboard

**Calculator not loading?**
- Verify environment variables are set
- Check browser console for errors
- Ensure Google Sheets API is working

**SSL not working?**
- Wait up to 24 hours for certificate provisioning
- Verify DNS is properly configured
- Check domain settings in Netlify dashboard

Your calculator will be live with SSL security and professional hosting!