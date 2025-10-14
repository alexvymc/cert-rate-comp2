# Custom Domain Setup Guide for Lions Share FCU Calculator

## 🎯 Recommended Domain Options

Choose one of these subdomains for your calculator:
- `calculator.lionsharecu.org` ⭐ **Recommended**
- `rates.lionsharecu.org`
- `compare.lionsharecu.org`
- `tools.lionsharecu.org`

## 📋 Step-by-Step Setup

### Step 1: Add Domain in Netlify

1. **Login to Netlify** (https://app.netlify.com)
2. **Go to your site** (`symphonious-zuccutto-a89338`)
3. **Click "Domain settings"**
4. **Click "Add custom domain"**
5. **Enter your domain** (e.g., `calculator.lionsharecu.org`)
6. **Click "Verify"**

### Step 2: Configure DNS Records

Add this DNS record to your domain provider (whoever manages `lionsharecu.org`):

```
Type: CNAME
Name: calculator
Value: symphonious-zuccutto-a89338.netlify.app
TTL: 3600 (or Auto)
```

### Step 3: DNS Provider Instructions

#### **GoDaddy**
1. Login to GoDaddy account
2. Go to "My Products" → "DNS"
3. Click "Add" → Select "CNAME"
4. Host: `calculator`
5. Points to: `symphonious-zuccutto-a89338.netlify.app`
6. TTL: 1 Hour
7. Save

#### **Cloudflare**
1. Login to Cloudflare dashboard
2. Select your domain (`lionsharecu.org`)
3. Go to "DNS" → "Records"
4. Click "Add record"
5. Type: CNAME
6. Name: `calculator`
7. Target: `symphonious-zuccutto-a89338.netlify.app`
8. Proxy status: DNS only (gray cloud)
9. Save

#### **AWS Route 53**
1. Go to AWS Console → Route 53
2. Click "Hosted zones"
3. Select `lionsharecu.org`
4. Click "Create record"
5. Record name: `calculator`
6. Record type: CNAME
7. Value: `symphonious-zuccutto-a89338.netlify.app`
8. Create records

#### **Namecheap**
1. Login to Namecheap account
2. Go to Domain List → Manage
3. Advanced DNS tab
4. Add New Record
5. Type: CNAME Record
6. Host: `calculator`
7. Value: `symphonious-zuccutto-a89338.netlify.app`
8. TTL: Automatic
9. Save

### Step 4: Wait for DNS Propagation

- **Time**: Usually 5-60 minutes
- **Check status**: Use https://dnschecker.org
- **Test**: Try visiting `https://calculator.lionsharecu.org`

### Step 5: SSL Certificate (Automatic)

Netlify will automatically:
- ✅ Provision SSL certificate
- ✅ Enable HTTPS
- ✅ Redirect HTTP to HTTPS

**Timeline**: Usually 1-24 hours after DNS is active

### Step 6: Update Your Iframe Code

Once your domain is active, update your iframe:

```html
<iframe 
    src="https://calculator.lionsharecu.org/" 
    width="100%" 
    height="600px" 
    frameborder="0" 
    title="Lions Share FCU Calculator">
</iframe>
```

## 🔍 Troubleshooting

### DNS Not Propagating?
- Wait up to 24 hours for full propagation
- Clear your browser cache
- Try incognito/private browsing mode
- Use different DNS checker tools

### SSL Certificate Issues?
- Ensure DNS is fully propagated first
- Check Netlify domain settings for SSL status
- Contact Netlify support if SSL doesn't activate within 24 hours

### Calculator Not Loading?
- Verify the CNAME points to the correct Netlify URL
- Check browser console for any errors
- Ensure iframe permissions are set correctly

## 📞 Need Help?

If you encounter issues:
1. **Check Netlify docs**: https://docs.netlify.com/domains-https/
2. **Contact your DNS provider** for DNS record help
3. **Netlify support**: Available through their dashboard

## ✅ Final Checklist

- [ ] Custom domain added in Netlify
- [ ] CNAME record added to DNS
- [ ] DNS propagation complete
- [ ] SSL certificate active
- [ ] Calculator loads at custom domain
- [ ] Iframe code updated on your website
- [ ] All functionality tested

Your calculator will be accessible at your professional custom domain!