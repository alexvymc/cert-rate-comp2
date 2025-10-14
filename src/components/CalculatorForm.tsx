import React, { useState, useEffect } from 'react';
import { CertificateRate } from '../types/rates';
import { calculateCertificateEarnings } from '../services/ratesService';
import { Calculator, DollarSign, Star } from 'lucide-react';

interface CalculatorFormProps {
  selectedCertificate: CertificateRate | null;
}

export const CalculatorForm: React.FC<CalculatorFormProps> = ({ selectedCertificate }) => {
  const [principal, setPrincipal] = useState<string>('10000');
  const [results, setResults] = useState<any>(null);

  useEffect(() => {
    if (selectedCertificate && principal) {
      const principalAmount = parseFloat(principal.replace(/,/g, ''));
      if (principalAmount >= selectedCertificate.minimumDeposit) {
        const termInMonths = parseInt(selectedCertificate.term.split(' ')[0]);
        const calculationResults = calculateCertificateEarnings(
          principalAmount,
          selectedCertificate.apy,
          termInMonths
        );
        setResults(calculationResults);
      } else {
        setResults(null);
      }
    }
  }, [selectedCertificate, principal]);

  const handlePrincipalChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.replace(/[^\d]/g, '');
    const formatted = value ? parseInt(value).toLocaleString() : '';
    setPrincipal(formatted);
  };

  if (!selectedCertificate) {
    return (
      <div className="bg-white rounded-lg shadow-md p-6">
        <div className="text-center py-8">
          <Calculator className="h-12 w-12 text-gray-400 mx-auto mb-4" />
          <p className="text-gray-500">Please select a certificate to calculate earnings</p>
        </div>
      </div>
    );
  }

  const principalAmount = parseFloat(principal.replace(/,/g, '')) || 0;
  const isValidAmount = principalAmount >= selectedCertificate.minimumDeposit;

  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <h2 className="text-xl font-semibold text-gray-800 mb-6 flex items-center">
        <Calculator className="h-5 w-5 text-emerald-600 mr-2" />
        Calculate Your Earnings
      </h2>

      <div className="space-y-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Initial Deposit Amount
          </label>
          <div className="relative">
            <DollarSign className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
            <input
              type="text"
              value={principal}
              onChange={handlePrincipalChange}
              className={`w-full pl-10 pr-4 py-3 border rounded-lg text-lg font-semibold ${
                isValidAmount ? 'border-gray-300 focus:border-blue-500' : 'border-red-300 focus:border-red-500'
              } focus:outline-none focus:ring-2 focus:ring-blue-200`}
              placeholder="10,000"
            />
          </div>
          {!isValidAmount && principalAmount > 0 && (
            <p className="text-sm text-red-600 mt-1">
              Minimum deposit required: ${selectedCertificate.minimumDeposit.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
            </p>
          )}
        </div>

        {selectedCertificate && (
          <div className={`rounded-lg p-4 ${selectedCertificate.isSpecialty ? 'bg-amber-50 border border-amber-200' : 'bg-gray-50'}`}>
            <h3 className="font-semibold text-gray-800 mb-2">Selected Certificate Details</h3>
            {selectedCertificate.isSpecialty && (
              <div className="flex items-center mb-2">
                <Star className="h-4 w-4 text-amber-500 mr-1 fill-current" />
                <span className="text-sm font-medium text-amber-700">Specialty Certificate</span>
              </div>
            )}
            <div className="grid grid-cols-2 gap-4 text-sm">
              <div>
                <span className="text-gray-600">Term:</span>
                <span className="ml-2 font-semibold">{selectedCertificate.term}</span>
              </div>
              <div>
                <span className="text-gray-600">Dividend Rate:</span>
                <span className={`ml-2 font-semibold ${selectedCertificate.isSpecialty ? 'text-amber-600' : 'text-emerald-600'}`}>{selectedCertificate.rate.toFixed(2)}%</span>
              </div>
              <div>
                <span className="text-gray-600">APY:</span>
                <span className={`ml-2 font-semibold ${selectedCertificate.isSpecialty ? 'text-amber-600' : 'text-emerald-600'}`}>{selectedCertificate.apy.toFixed(2)}%</span>
              </div>
            </div>
            {selectedCertificate.specialFeatures && (
              <div className="mt-3 pt-3 border-t border-amber-200">
                <span className="text-gray-600 text-sm font-medium">Special Features:</span>
                <p className="text-sm text-gray-700 mt-1">{selectedCertificate.specialFeatures}</p>
              </div>
            )}
          </div>
        )}

        {results && isValidAmount && (
          <div className="space-y-4">
            <h3 className="font-semibold text-gray-800 text-lg">Earnings Projection</h3>
            
            <div className="grid md:grid-cols-3 gap-4">
              <div className="bg-blue-50 rounded-lg p-4 text-center">
                <div className="text-2xl font-bold text-blue-700">
                  ${principalAmount.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                </div>
                <div className="text-sm text-blue-600 font-medium">Initial Deposit</div>
              </div>
              
              <div className="bg-emerald-50 rounded-lg p-4 text-center">
                <div className="text-2xl font-bold text-emerald-700">
                  ${results.interestEarned.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                </div>
                <div className="text-sm text-emerald-600 font-medium">Interest Earned</div>
              </div>
              
              <div className="bg-purple-50 rounded-lg p-4 text-center">
                <div className="text-2xl font-bold text-purple-700">
                  ${results.maturityValue.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                </div>
                <div className="text-sm text-purple-600 font-medium">Maturity Value</div>
              </div>
            </div>

            <div className="mt-6 p-4 bg-gradient-to-r from-emerald-50 to-blue-50 rounded-lg border border-emerald-200">
              <p className="text-center text-gray-700">
                <span className="font-semibold">Your earnings:</span> After {selectedCertificate.term}, 
                your ${principalAmount.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })} will grow to{' '}
                <span className="font-bold text-emerald-700">${results.maturityValue.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</span>
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};