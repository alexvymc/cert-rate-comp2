export interface CertificateRate {
  id: string;
  name: string;
  term: string;
  minimumDeposit: number;
  apy: number;
  rate: number;
  isSpecialty: boolean;
  specialFeatures?: string;
}

export interface ComparisonRate {
  id: string;
  institutionName: string;
  rate: number;
  apy: number;
  color: string;
}

export interface ComparisonResult {
  principal: number;
  termMonths: number;
  rates: ComparisonRate[];
  calculations: {
    [rateId: string]: {
      interestEarned: number;
      maturityValue: number;
      monthlyCompounding: number[];
    };
  };
}

export interface CalculationResult {
  principal: number;
  interestEarned: number;
  maturityValue: number;
  monthlyCompounding: number[];
}