# Google Sheets Setup Guide for Lions Share FCU Certificate Calculator

## Step 1: Create the Google Sheet

1. **Go to Google Sheets**: https://sheets.google.com
2. **Create a new sheet** and name it: `Lions Share Certificate Rates`
3. **Set up the header row** (Row 1) with these exact column names:

| A | B | C | D | E | F | G | H |
|---|---|---|---|---|---|---|---|
| Certificate Name | Term (Months) | Minimum Deposit | Dividend Rate (%) | APY (%) | Is Specialty | Special Features | Last Updated |

## Step 2: Add Sample Data

Copy and paste this sample data starting from Row 2:

```
6 Month Certificate	6	500	3.78	3.85	false		
18 Month Certificate	18	500	3.88	3.95	false		
36 Month Certificate	36	500	3.70	3.76	false		
48 Month Certificate	48	500	3.25	3.30	false		
Save-To-Win Certificate	12	25	3.45	3.50	true	Quarterly prize drawings for savers	
Add-On Certificate	12	500	3.93	4.00	true	Add more funds anytime during the term	
Bump-Up Certificate	24	500	3.64	3.70	true	Option to raise rate once per term if rates increase	
Mini Jumbo Certificate	60	10000	3.30	3.35	true	Higher minimum deposit for premium rates	
```

## Step 3: Make Sheet Public

1. **Click "Share"** button (top right)
2. **Change access** to "Anyone with the link can view"
3. **Copy the link** - it will look like:
   `https://docs.google.com/spreadsheets/d/1ABC123xyz.../edit`
4. **Extract the Sheet ID** from the URL (the part between `/d/` and `/edit`)

## Step 4: Set Up Google API

### Create Google Cloud Project
1. Go to: https://console.cloud.google.com/
2. Click "Create Project" or select existing project
3. Name it: "Lions Share Certificate Calculator"

### Enable Google Sheets API
1. Go to "APIs & Services" → "Library"
2. Search for "Google Sheets API"
3. Click on it and press "Enable"

### Create API Key
1. Go to "APIs & Services" → "Credentials"
2. Click "Create Credentials" → "API Key"
3. **Copy the API key** (keep it secure!)
4. Optional: Click "Restrict Key" and limit to Google Sheets API only

## Step 5: Configure Environment Variables

Create a `.env` file in your project root:

```env
VITE_GOOGLE_SHEETS_API_KEY=your_api_key_here
VITE_GOOGLE_SHEET_ID=your_sheet_id_here
```

## Step 6: Test the Integration

1. Start your development server: `npm run dev`
2. The calculator should now load rates from your Google Sheet
3. Try editing a rate in the sheet - it should update in the calculator within seconds

## Column Details

- **Certificate Name**: Display name (e.g., "6 Month Certificate")
- **Term (Months)**: Number only (e.g., 6, 12, 24)
- **Minimum Deposit**: Dollar amount without $ sign (e.g., 500, 1000)
- **Dividend Rate (%)**: Percentage without % sign (e.g., 3.78)
- **APY (%)**: Percentage without % sign (e.g., 3.85)
- **Is Specialty**: Type "true" or "false" (lowercase)
- **Special Features**: Text description for specialty certificates
- **Last Updated**: Auto-filled by admin panel, or manual date

## Managing Rates

### Method 1: Direct Sheet Editing (Recommended)
- Edit the Google Sheet directly
- Changes appear immediately in calculator
- No technical knowledge required

### Method 2: Admin Panel
- Click gear icon in calculator
- Add new certificates through the form
- Updates require direct sheet editing

## Troubleshooting

**Calculator shows mock data instead of sheet data:**
- Check that API key is correct in `.env` file
- Verify sheet ID is correct
- Ensure sheet is publicly viewable
- Check browser console for error messages

**API quota exceeded:**
- Google Sheets API allows 100 requests per 100 seconds
- For normal use, this should never be an issue
- If needed, implement caching or request batching

## Security Notes

- API key only allows reading public sheets
- No write access through API key alone
- Sheet must be public for read-only access
- For write access, service account setup required

## Next Steps

Once set up, staff can:
1. Update rates by editing the Google Sheet
2. Add new certificate types using the admin panel
3. View real-time changes in the calculator
4. Track all changes through Google Sheets version history