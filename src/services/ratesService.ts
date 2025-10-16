import { CertificateRate } from '../types/rates';
import { googleSheetsService, SheetRow } from './googleSheetsService';

// Current rates from lionsharecu.org/rates-fees as of latest update
// In production, this would fetch from their API or scrape their rates page  
export const mockCertificateRates: CertificateRate[] = [
  // Standard Share Certificates
  {
    id: 'cert-6mo',
    name: '6 Month Certificate',
    term: '6 months',
    minimumDeposit: 500,
    apy: 3.85,
    rate: 3.78,
    isSpecialty: false
  },
  {
    id: 'cert-18mo',
    name: '18 Month Certificate',
    term: '18 months',
    minimumDeposit: 500,
    apy: 4.05,
    rate: 3.99,
    isSpecialty: false
  },
  {
    id: 'cert-36mo',
    name: '36 Month Certificate',
    term: '36 months',
    minimumDeposit: 500,
    apy: 3.85,
    rate: 3.8,
    isSpecialty: false
  },
  {
    id: 'cert-48mo',
    name: '48 Month Certificate',
    term: '48 months',
    minimumDeposit: 500,
    apy: 3.55,
    rate: 3.5,
    isSpecialty: false
  },
  // Specialty Share Certificates
  {
    id: 'save-to-win-12mo',
    name: 'Save-To-Win Certificate',
    term: '12 months',
    minimumDeposit: 25,
    apy: 3.55,
    rate: 3.5,
    isSpecialty: true,
    specialFeatures: 'Quarterly prize drawings for savers'
  },
  {
    id: 'add-on-12mo',
    name: 'Add-On Certificate',
    term: '12 months',
    minimumDeposit: 500,
    apy: 4.05,
    rate: 3.99,
    isSpecialty: true,
    specialFeatures: 'Add more funds anytime during the term'
  },
  {
    id: 'bump-up-24mo',
    name: 'Bump-Up Certificate',
    term: '24 months',
    minimumDeposit: 500,
    apy: 3.75,
    rate: 3.7,
    isSpecialty: true,
    specialFeatures: 'Option to raise rate once per term if rates increase'
  },
  {
    id: 'mini-jumbo-60mo',
    name: 'Mini Jumbo Certificate',
    term: '60 months',
    minimumDeposit: 10000,
    apy: 3.55,
    rate: 3.5,
    isSpecialty: true,
    specialFeatures: 'Higher minimum deposit for premium rates'
  }
];

// Convert Google Sheets row to CertificateRate
const convertSheetRowToCertificate = (row: SheetRow & { id: string }): CertificateRate => {
  return {
    id: row.id,
    name: row.certificateName,
    term: `${row.termMonths} months`,
    minimumDeposit: row.minimumDeposit,
    apy: row.apy,
    rate: row.dividendRate,
    isSpecialty: row.isSpecialty,
    specialFeatures: row.specialFeatures || undefined
  };
};

export const fetchCertificateRates = async (): Promise<CertificateRate[]> => {
  console.log('fetchCertificateRates called');
  console.log('API Key exists:', !!import.meta.env.VITE_GOOGLE_SHEETS_API_KEY);
  console.log('Sheet ID exists:', !!import.meta.env.VITE_GOOGLE_SHEET_ID);

  try {
    // Try to fetch from Google Sheets first
    if (import.meta.env.VITE_GOOGLE_SHEETS_API_KEY && import.meta.env.VITE_GOOGLE_SHEET_ID) {
      console.log('Attempting to fetch from Google Sheets...');
      const sheetRows = await googleSheetsService.getCertificateRates();
      console.log('Received sheet rows:', sheetRows);

      if (sheetRows.length > 0) {
        const converted = sheetRows.map(convertSheetRowToCertificate);
        console.log('Converted to certificates:', converted);
        return converted;
      }
    } else {
      console.log('Missing API credentials, using mock data');
    }
  } catch (error) {
    if (error instanceof Error && error.message.includes('not publicly accessible')) {
      console.warn('Google Sheet sharing issue - using mock data. To fix: Go to your Google Sheet → Share → Change to "Anyone with the link can view"');
    } else {
      console.warn('Failed to fetch from Google Sheets, using mock data:', error);
    }
  }

  // Fallback to mock data
  console.log('Using mock certificate rates');
  await new Promise(resolve => setTimeout(resolve, 500));
  return mockCertificateRates;
};

// Helper functions for admin panel (Google Sheets)
export const createCertificateRate = async (certificateData: {
  certificate_name: string;
  term_months: string;
  minimum_deposit: string;
  dividend_rate: string;
  apy: string;
  is_specialty: string;
  special_features: string;
}) => {
  const sheetData = {
    certificateName: certificateData.certificate_name,
    termMonths: parseInt(certificateData.term_months),
    minimumDeposit: parseFloat(certificateData.minimum_deposit),
    dividendRate: parseFloat(certificateData.dividend_rate),
    apy: parseFloat(certificateData.apy),
    isSpecialty: certificateData.is_specialty === 'true',
    specialFeatures: certificateData.special_features
  };
  
  return await googleSheetsService.addCertificateRate(sheetData);
};

export const updateCertificateRate = async (recordId: string, certificateData: {
  certificate_name: string;
  term_months: string;
  minimum_deposit: string;
  dividend_rate: string;
  apy: string;
  is_specialty: string;
  special_features: string;
}) => {
  // For Google Sheets, updates would require more complex logic
  // For now, we'll throw an error suggesting manual update
  throw new Error('Updates via admin panel require direct Google Sheets editing. Please update the spreadsheet directly.');
};

export const calculateCertificateEarnings = (
  principal: number,
  dividendRate: number,
  termInMonths: number
): {
  interestEarned: number;
  maturityValue: number;
  monthlyCompounding: number[];
} => {
  const monthlyRate = dividendRate / 100 / 12;
  const monthlyCompounding: number[] = [];
  let currentBalance = principal;
  
  for (let month = 1; month <= termInMonths; month++) {
    currentBalance = currentBalance * (1 + monthlyRate);
    monthlyCompounding.push(Number(currentBalance.toFixed(2)));
  }
  
  const maturityValue = Number(currentBalance.toFixed(2));
  const interestEarned = Number((maturityValue - principal).toFixed(2));
  
  return {
    interestEarned,
    maturityValue,
    monthlyCompounding
  };
};