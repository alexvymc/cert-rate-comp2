# Push Lions Share FCU Calculator to GitHub

## 🚀 **Step-by-Step GitHub Setup**

### **1. Create GitHub Repository**
1. **Go to**: https://github.com
2. **Sign in** to your GitHub account (or create one if needed)
3. **Click the "+" icon** in top right → **"New repository"**
4. **Repository name**: `lions-share-fcu-calculator`
5. **Description**: `Certificate rate comparison calculator for Lions Share FCU`
6. **Make it Public** (so Netlify can access it)
7. **Don't initialize** with README (we already have files)
8. **Click "Create repository"**

### **2. Copy Your Repository URL**
After creating, you'll see a page with commands. Copy the HTTPS URL that looks like:
```
https://github.com/yourusername/lions-share-fcu-calculator.git
```

### **3. Connect and Push (Run These Commands)**
```bash
# Add your GitHub repository as the remote origin
git remote add origin https://github.com/yourusername/lions-share-fcu-calculator.git

# Push your code to GitHub
git push -u origin main
```

### **4. Verify Upload**
- **Refresh your GitHub repository page**
- **You should see all your files** uploaded
- **Look for**: src/, public/, package.json, netlify.toml, etc.

## 🎯 **Next: Deploy to Netlify**

Once your code is on GitHub:

### **1. Go to Netlify**
- **Visit**: https://app.netlify.com
- **Sign up/Login** (use your GitHub account for easy connection)

### **2. Import Project**
- **Click "Add new site"** → **"Import an existing project"**
- **Choose "Deploy with GitHub"**
- **Select your repository**: `lions-share-fcu-calculator`

### **3. Auto-Deploy**
- **Netlify detects settings** from `netlify.toml`
- **Build command**: `npm run build:netlify` (auto-detected)
- **Publish directory**: `dist` (auto-detected)
- **Click "Deploy site"**

### **4. Add Environment Variables**
In Netlify Dashboard → Site Settings → Environment Variables:
```
VITE_GOOGLE_SHEETS_API_KEY=your_google_api_key_here
VITE_GOOGLE_SHEET_ID=your_google_sheet_id_here
```

## ✅ **What You'll Get**

- ✅ **Live URL with SSL**: `https://your-site-name.netlify.app`
- ✅ **Automatic HTTPS** - Green padlock in browser
- ✅ **Auto-deployments** - Updates when you push to GitHub
- ✅ **Custom domain ready** - Can add `calculator.lionsharecu.org`

## 🔗 **Your New Calculator URLs**

**Main calculator**:
```html
<iframe src="https://your-site-name.netlify.app/calculator.html" width="100%" height="600px" frameborder="0" title="Calculator"></iframe>
```

**Embed version**:
```html
<iframe src="https://your-site-name.netlify.app/embed.html" width="100%" height="600px" frameborder="0" title="Calculator"></iframe>
```

Ready to create your GitHub repository?