# Deploy Lions Share FCU Calculator via GitHub to Netlify

## 🚀 **GitHub to Netlify Deployment (Recommended)**

Since you can't download directly from Bolt, let's use GitHub for deployment - this is actually better because you get automatic updates!

## 📋 **Step-by-Step Process**

### **1. Push to GitHub (If Not Already Done)**
If this project isn't on GitHub yet:
1. **Create a new repository** on GitHub.com
2. **Copy the repository URL** (e.g., `https://github.com/yourusername/lions-share-calculator.git`)
3. **In Bolt terminal**, run these commands:
   ```bash
   git init
   git add .
   git commit -m "Initial commit - Lions Share FCU Calculator"
   git remote add origin YOUR_GITHUB_URL_HERE
   git push -u origin main
   ```

### **2. Connect GitHub to Netlify**
1. **Go to**: https://app.netlify.com
2. **Sign up/Login** (use your GitHub account for easy connection)
3. **Click "Add new site"** → **"Import an existing project"**
4. **Choose "Deploy with GitHub"**
5. **Select your repository** from the list
6. **Netlify auto-detects settings** from `netlify.toml` file

### **3. Configure Build Settings (Auto-Detected)**
Netlify will automatically use:
- **Build command**: `npm run build:netlify`
- **Publish directory**: `dist`
- **Node version**: 18

### **4. Add Environment Variables**
In Netlify Dashboard → Site Settings → Environment Variables:
```
VITE_GOOGLE_SHEETS_API_KEY=your_google_api_key_here
VITE_GOOGLE_SHEET_ID=your_google_sheet_id_here
```

### **5. Deploy!**
- **Click "Deploy site"**
- **Wait 2-3 minutes** for build to complete
- **Get your live URL** with SSL automatically enabled!

## 🎯 **Your New URLs**

**Temporary Netlify URL:**
```
https://amazing-name-123456.netlify.app
```

**For iframe embedding:**
```html
<iframe 
    src="https://your-site-name.netlify.app/calculator.html" 
    width="100%" 
    height="600px" 
    frameborder="0" 
    title="Lions Share FCU Calculator">
</iframe>
```

## ✅ **Benefits of GitHub → Netlify**

- ✅ **Automatic SSL** - HTTPS enabled immediately
- ✅ **Auto-deployments** - Updates when you push to GitHub
- ✅ **Branch previews** - Test changes before going live
- ✅ **Custom domains** - Easy to add `calculator.lionsharecu.org`
- ✅ **Version control** - Full history of changes
- ✅ **Collaboration** - Team members can contribute

## 🔒 **SSL & Security Features**

- ✅ **Free SSL certificate** - Auto-provisioned and renewed
- ✅ **HTTPS redirects** - All HTTP traffic redirected to HTTPS
- ✅ **Security headers** - XSS protection, iframe permissions
- ✅ **Global CDN** - Fast loading worldwide

## 🚨 **Migration Checklist**

- [ ] Project pushed to GitHub
- [ ] Connected to Netlify
- [ ] Environment variables set
- [ ] First deployment successful
- [ ] SSL certificate active (🔒 in browser)
- [ ] Calculator loads at new URL
- [ ] Update iframe embeds on your website

## 💡 **Next Steps**

1. **Test your new URL** - Make sure calculator works
2. **Set up custom domain** - `calculator.lionsharecu.org`
3. **Update your website** - Replace old Bolt URL with new Netlify URL
4. **Enjoy better performance** and professional hosting!

This method is actually better than Netlify Drop because you get automatic deployments and version control!