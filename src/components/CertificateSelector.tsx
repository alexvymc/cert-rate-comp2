import React from 'react';
import { CertificateRate } from '../types/rates';
import { TrendingUp, Clock, DollarSign, Star, Info } from 'lucide-react';

interface CertificateSelectorProps {
  certificates: CertificateRate[];
  selectedCertificate: CertificateRate | null;
  onSelect: (certificate: CertificateRate) => void;
  loading: boolean;
}

export const CertificateSelector: React.FC<CertificateSelectorProps> = ({
  certificates,
  selectedCertificate,
  onSelect,
  loading
}) => {
  if (loading) {
    return (
      <div className="bg-white rounded-lg shadow-md p-6">
        <h2 className="text-xl font-semibold text-gray-800 mb-4">Loading Rates...</h2>
        <div className="animate-pulse space-y-3">
          {[1, 2, 3].map((i) => (
            <div key={i} className="h-16 bg-gray-200 rounded-lg"></div>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <h2 className="text-xl font-semibold text-gray-800 mb-6 flex items-center">
        <TrendingUp className="h-5 w-5 text-emerald-600 mr-2" />
        Select a Share Certificate
      </h2>
      
      <div className="mb-6">
        <div className="grid grid-cols-2 gap-4 text-sm">
          <div className="flex items-center">
            <div className="w-3 h-3 bg-blue-500 rounded-full mr-2"></div>
            <span className="text-gray-600">Standard Certificates</span>
          </div>
          <div className="flex items-center">
            <Star className="w-3 h-3 text-amber-500 mr-2" />
            <span className="text-gray-600">Specialty Certificates</span>
          </div>
        </div>
      </div>
      
      <div className="grid gap-4">
        {certificates.map((cert) => (
          <button
            key={cert.id}
            onClick={() => onSelect(cert)}
            className={`p-4 rounded-lg border-2 transition-all duration-200 text-left hover:shadow-md relative ${
              selectedCertificate?.id === cert.id
                ? cert.isSpecialty 
                  ? 'border-amber-500 bg-amber-50 shadow-md'
                  : 'border-blue-500 bg-blue-50 shadow-md'
                : cert.isSpecialty
                  ? 'border-amber-200 hover:border-amber-400'
                  : 'border-gray-200 hover:border-blue-300'
            }`}
          >
            {cert.isSpecialty && (
              <div className="absolute top-2 right-2">
                <Star className="h-4 w-4 text-amber-500 fill-current" />
              </div>
            )}
            <div className="flex justify-between items-start">
              <div>
                <h3 className="font-semibold text-gray-800 text-lg pr-6">{cert.name}</h3>
                <div className="flex items-center text-gray-600 mt-1">
                  <Clock className="h-4 w-4 mr-1" />
                  <span className="text-sm">{cert.term}</span>
                </div>
              </div>
              <div className="text-right">
                <div className="flex items-center space-x-3">
                  <div className="text-right">
                    <div className="text-2xl font-bold text-blue-600">
                      {cert.rate.toFixed(2)}%
                    </div>
                    <div className="text-xs text-gray-500">Dividend Rate</div>
                  </div>
                  <div className="h-12 w-px bg-gray-300"></div>
                  <div className="text-right">
                    <div className={`text-2xl font-bold ${cert.isSpecialty ? 'text-amber-600' : 'text-emerald-600'}`}>
                      {cert.apy.toFixed(2)}%
                    </div>
                    <div className="text-sm text-gray-500">APY</div>
                  </div>
                </div>
              </div>
            </div>
            <div className="flex items-center text-gray-600 mt-2">
              <DollarSign className="h-4 w-4 mr-1" />
              <span className="text-sm">Min. deposit: ${cert.minimumDeposit.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</span>
            </div>
            {cert.specialFeatures && (
              <div className="flex items-start text-gray-600 mt-2 pt-2 border-t border-gray-200">
                <Info className="h-4 w-4 mr-1 mt-0.5 flex-shrink-0" />
                <span className="text-sm">{cert.specialFeatures}</span>
              </div>
            )}
          </button>
        ))}
      </div>
    </div>
  );
};