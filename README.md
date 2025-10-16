# Lions Share FCU Certificate Calculator

A modern, responsive certificate calculator for Lions Share Federal Credit Union that helps members calculate earnings on share certificates with real-time rate data.

## Features

- **Dynamic Rate Management**: Rates are managed via Google Sheets for easy updates
- **Interactive Calculator**: Real-time earnings calculations with detailed breakdowns
- **Responsive Design**: Works perfectly on desktop, tablet, and mobile devices
- **Professional UI**: Clean, credit union-appropriate design with accessibility features
- **Admin Panel**: Staff can add new certificate types directly through the interface

## Google Sheets Integration

This calculator uses Google Sheets as a database for certificate rates, providing:
- ✅ **Free** - No database costs
- ✅ **Easy Management** - Staff can update rates in familiar spreadsheet interface
- ✅ **Real-time Updates** - Changes appear immediately in the calculator
- ✅ **Version History** - Google Sheets tracks all changes automatically
- ✅ **Collaborative** - Multiple staff members can manage rates

## Setup Instructions

### 1. Google Sheets Setup

1. **Create a Google Sheet** with the name "Lions Share Certificate Rates"
2. **Set up the header row** (Row 1) with these columns:
   - A1: Certificate Name
   - B1: Term (Months)
   - C1: Minimum Deposit
   - D1: Dividend Rate (%)
   - E1: APY (%)
   - F1: Is Specialty
   - G1: Special Features
   - H1: Last Updated

3. **Add sample data** (Row 2 example):
   - A2: 6 Month Certificate
   - B2: 6
   - C2: 500
   - D2: 3.78
   - E2: 3.85
   - F2: false
   - G2: (leave empty for standard certificates)
   - H2: (will be auto-filled)

4. **Make the sheet public** or set up API access:
   - File → Share → Change to "Anyone with the link can view"
   - Copy the Sheet ID from the URL: `https://docs.google.com/spreadsheets/d/1u7Mrgf7V-x46x8021hS2vQJpnWcGpof2KYCa2C1IqAc/edit?usp=sharing`

### 2. Google API Setup

1. **Go to Google Cloud Console**: https://console.cloud.google.com/
2. **Create a new project** or select existing one
3. **Enable Google Sheets API**:
   - Go to "APIs & Services" → "Library"
   - Search for "Google Sheets API"
   - Click "Enable"
4. **Create API Key**:
   - Go to "APIs & Services" → "Credentials"
   - Click "Create Credentials" → "API Key"
   - Copy the API key

### 3. Environment Configuration

Create a `.env` file in the project root:

```env
VITE_GOOGLE_SHEETS_API_KEY=your_google_api_key_here
VITE_GOOGLE_SHEET_ID=your_google_sheet_id_here
```

### 4. Install and Run

```bash
npm install
npm run dev
```

## Managing Certificate Rates

### Via Google Sheets (Recommended)
1. Open your Google Sheet
2. Add/edit rows with certificate information
3. Changes appear immediately in the calculator (may take a few seconds)

### Via Admin Panel
1. Click the gear icon in the bottom-right corner
2. Add new certificates using the form
3. For updates, edit the Google Sheet directly

## Sheet Column Details

- **Certificate Name**: Display name (e.g., "6 Month Certificate")
- **Term (Months)**: Certificate term as a number (e.g., 6, 12, 24)
- **Minimum Deposit**: Minimum deposit amount as a number (e.g., 500)
- **Dividend Rate (%)**: The dividend rate as a percentage (e.g., 3.78)
- **APY (%)**: Annual Percentage Yield as a percentage (e.g., 3.85)
- **Is Specialty**: true/false - whether this is a specialty certificate
- **Special Features**: Description of special features (for specialty certificates)
- **Last Updated**: Automatically filled when using the admin panel

## Deployment

### Netlify Deployment with SSL

This application is fully optimized for Netlify deployment with automatic SSL:

#### Quick Deployment:
1. **Push to GitHub** (if not already done)
2. **Connect to Netlify**: https://app.netlify.com → "Add new site" → "Import existing project"
3. **Auto-configuration**: Netlify detects settings from `netlify.toml`
4. **Set environment variables** in Netlify dashboard
5. **Deploy** - Your site will be live with SSL in minutes!

#### Build Settings (auto-configured):
   - Build command: `npm run build`
   - Publish directory: `dist`
   - Node version: 18
   - SSL: Automatic with custom domains

#### Environment Variables:
   Set these in your Netlify dashboard under Site Settings → Environment Variables:
   ```
   VITE_GOOGLE_SHEETS_API_KEY=your_google_api_key_here
   VITE_GOOGLE_SHEET_ID=your_google_sheet_id_here
   ```

#### SSL & Custom Domain:
- **Automatic SSL** - HTTPS enabled by default
- **Custom domain**: `calculator.lionsharecu.org` (recommended)
- **DNS setup**: Simple CNAME record
- **Certificate**: Auto-provisioned and renewed

#### Your New URLs:
```html
<!-- With custom domain (recommended) -->
<iframe src="https://calculator.lionsharecu.org/calculator.html" width="100%" height="600px" frameborder="0" title="Calculator"></iframe>

<!-- With Netlify domain -->
<iframe src="https://your-site-name.netlify.app/calculator.html" width="100%" height="600px" frameborder="0" title="Calculator"></iframe>
```

See `NETLIFY_DEPLOYMENT.md` for detailed setup instructions.

## Migration from Bolt Hosting

If you're migrating from `https://lions-share-fcu-fina-kg3t.bolt.host/`:
1. Deploy to Netlify following the steps above
2. Update all iframe embeds to use the new Netlify URL
3. Set up custom domain for professional branding
4. Enjoy better performance, SSL security, and reliability!

## Technical Stack

- **React 18** with TypeScript
- **Tailwind CSS** for styling
- **Lucide React** for icons
- **Google Sheets API** for data management
- **Vite** for development and building

## Browser Support

- Chrome/Edge 88+
- Firefox 85+
- Safari 14+
- Mobile browsers (iOS Safari, Chrome Mobile)

## Embedding the Calculator

You have two options for embedding this calculator on your website:

### Option 1: Full-Screen Standalone Version (Recommended)

Use this for a dedicated calculator page or full-width embedding:

```html
<iframe 
    src="https://lions-share-fcu-fina-kg3t.bolt.host/calculator.html" 
    width="100%" 
    height="100vh" 
    frameborder="0" 
    style="border: none; margin: 0; padding: 0;">
</iframe>
```

### Option 2: Compact Embed Version

Use this for embedding within existing page content:
```html
<iframe 
    src="https://lions-share-fcu-fina-kg3t.bolt.host/embed.html" 
    width="100%" 
    height="800" 
    frameborder="0" 
    style="border: none; border-radius: 8px; box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);">
</iframe>
```

### Embedding Options

- **Full-Screen**: Use `/calculator.html` for maximum space utilization
- **Compact**: Use `/embed.html` for embedding within existing content
- **Responsive**: Both versions adapt to container width
- **Height**: 
  - Full-screen: Use `height="100vh"` or specific pixel height
  - Compact: Minimum 800px recommended

### Example with Custom Container

```html
<div style="width: 100%; height: 600px; border-radius: 8px; overflow: hidden;">
    <iframe 
        src="https://lions-share-fcu-fina-kg3t.bolt.host/calculator.html" 
        width="100%" 
        height="100%" 
        frameborder="0" 
        style="border: none; margin: 0; padding: 0;">
    </iframe>
</div>
```

## License

This project is created for Lions Share Federal Credit Union. All rights reserved.