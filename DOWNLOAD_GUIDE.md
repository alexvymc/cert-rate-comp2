# Download Project for Netlify Drop Deployment

## 🎯 **Quick Download Steps**

### **Option 1: Download from Bolt (Easiest)**
1. **Look for the download button** in the Bolt interface (usually in the top toolbar)
2. **Click "Download"** - this will download a ZIP file of your entire project
3. **Extract the ZIP file** to your computer
4. **Open the extracted folder** - this is your project folder

### **Option 2: If No Download Button**
1. **Right-click in the file explorer** (left sidebar in Bolt)
2. **Look for "Download" or "Export"** option
3. **Download as ZIP file**
4. **Extract on your computer**

## 📁 **After Downloading**

### **1. Extract and Navigate**
```
your-downloaded-project/
├── src/
├── public/
├── package.json
├── netlify.toml
├── dist/ (if already built)
└── ...other files
```

### **2. Build the Project**
Open terminal/command prompt in the project folder and run:
```bash
npm install
npm run build
```

### **3. Find Your `dist` Folder**
After building, you'll see:
```
your-project/
├── dist/          ← This is what you drag to Netlify!
│   ├── _redirects
│   ├── _headers
│   ├── calculator.html
│   ├── embed.html
│   └── ...
└── ...other files
```

## 🚀 **Deploy to Netlify Drop**
1. **Go to**: https://app.netlify.com/drop
2. **Drag the `dist` folder** (not the whole project, just the `dist` folder)
3. **Wait for upload** - you'll get a live URL with SSL!

## 💡 **Alternative: Direct GitHub Deploy**
If you have this project in GitHub:
1. **Go to**: https://app.netlify.com
2. **Click "Add new site"** → "Import an existing project"
3. **Connect GitHub** and select your repository
4. **Auto-deploy** with build settings from `netlify.toml`

## 🔍 **Can't Find Download Button?**
If you can't find a download option in Bolt:
1. **Copy all files manually** to a new local project
2. **Use GitHub** - push to GitHub, then deploy from there
3. **Ask for help** - let me know what interface you're seeing

Your calculator will be live with SSL in just a few minutes once you get the files downloaded and built!