// Google Sheets API service for managing certificate rates
export interface SheetRow {
  certificateName: string;
  termMonths: number;
  minimumDeposit: number;
  dividendRate: number;
  apy: number;
  isSpecialty: boolean;
  specialFeatures?: string;
  lastUpdated?: string;
}

const GOOGLE_SHEETS_API_KEY = import.meta.env.VITE_GOOGLE_SHEETS_API_KEY;
const GOOGLE_SHEET_ID = import.meta.env.VITE_GOOGLE_SHEET_ID;
const GOOGLE_API_BASE_URL = 'https://sheets.googleapis.com/v4/spreadsheets';

export class GoogleSheetsService {
  private async makeRequest(endpoint: string, options: RequestInit = {}) {
    const url = `${GOOGLE_API_BASE_URL}/${GOOGLE_SHEET_ID}${endpoint}`;
    const params = new URLSearchParams({
      key: GOOGLE_SHEETS_API_KEY,
    });

    const response = await fetch(`${url}?${params}`, {
      ...options,
      headers: {
        'Content-Type': 'application/json',
        ...options.headers,
      },
    });

    if (!response.ok) {
      throw new Error(`Google Sheets API error: ${response.status} ${response.statusText}`);
    }

    return response.json();
  }

  // Fetch certificate rates from Google Sheets
  async getCertificateRates(): Promise<SheetRow[]> {
    try {
      const range = 'A2:H1000'; // Skip header row, use default sheet
      const endpoint = `/values/${encodeURIComponent(range)}`;
      
      const response = await this.makeRequest(endpoint);
      
      if (!response.values || response.values.length === 0) {
        return [];
      }

      return response.values
        .filter((row: string[]) => row[0] && row[0].trim()) // Filter out empty rows
        .map((row: string[], index: number) => ({
          id: `sheet-row-${Date.now()}-${index}`, // Unique ID with timestamp
          certificateName: row[0] || '',
          termMonths: parseInt(row[1]) || 0,
          minimumDeposit: parseFloat(row[2]) || 0,
          dividendRate: parseFloat(row[3]) || 0,
          apy: parseFloat(row[4]) || 0,
          isSpecialty: (row[5] || '').toLowerCase() === 'true',
          specialFeatures: row[6] || '',
          lastUpdated: row[7] || ''
        }));
    } catch (error) {
      if (error instanceof Error && error.message.includes('403')) {
        if (error.message.includes('referer') || error.message.includes('Requests from referer')) {
          throw new Error('API key has referrer restrictions. Please add "http://localhost:*" and "https://localhost:*" to your API key restrictions, or remove all restrictions.');
        } else {
          throw new Error('Google Sheet not publicly accessible. Please ensure your Google Sheet is set to "Anyone with the link can view".');
        }
      }
      if (error instanceof Error && error.message.includes('400')) {
        throw new Error('Invalid sheet range or format. Please check your sheet structure.');
      }
      console.error('Error fetching certificate rates from Google Sheets:', error);
      throw error;
    }
  }

  // Create the header row in the sheet (one-time setup)
  async createHeaderRow(): Promise<void> {
    const headers = [
      'Certificate Name',
      'Term (Months)',
      'Minimum Deposit',
      'Dividend Rate (%)',
      'APY (%)',
      'Is Specialty',
      'Special Features',
      'Last Updated'
    ];

    try {
      const range = 'Certificate_Rates!A1:H1';
      const endpoint = `/values/${encodeURIComponent(range)}`;
      
      await this.makeRequest(endpoint, {
        method: 'PUT',
        body: JSON.stringify({
          values: [headers]
        }),
      });
    } catch (error) {
      console.error('Error creating header row:', error);
      throw error;
    }
  }

  // Add a new certificate rate (requires service account authentication)
  async addCertificateRate(certificateData: Omit<SheetRow, 'id' | 'lastUpdated'>): Promise<void> {
    try {
      const range = 'Certificate_Rates!A:H';
      const endpoint = `/values/${encodeURIComponent(range)}:append`;
      
      const row = [
        certificateData.certificateName,
        certificateData.termMonths.toString(),
        certificateData.minimumDeposit.toString(),
        certificateData.dividendRate.toString(),
        certificateData.apy.toString(),
        certificateData.isSpecialty.toString(),
        certificateData.specialFeatures || '',
        new Date().toISOString()
      ];

      await this.makeRequest(`${endpoint}?valueInputOption=RAW`, {
        method: 'POST',
        body: JSON.stringify({
          values: [row]
        }),
      });
    } catch (error) {
      console.error('Error adding certificate rate to Google Sheets:', error);
      throw error;
    }
  }
}

export const googleSheetsService = new GoogleSheetsService();