import React, { useState, useMemo, useEffect } from 'react';
import { ComparisonRate, ComparisonResult, CertificateRate } from '../types/rates';
import { Calculator, DollarSign, Plus, X, TrendingUp, Award } from 'lucide-react';
import { fetchCertificateRates } from '../services/ratesService';

const RATE_COLORS = [
  '#3B82F6', // Blue
  '#10B981', // Emerald
  '#F59E0B', // Amber
  '#EF4444', // Red
  '#8B5CF6', // Purple
  '#06B6D4', // Cyan
  '#F97316', // Orange
  '#84CC16', // Lime
];

export const ComparisonCalculator: React.FC = () => {
  const [principal, setPrincipal] = useState<string>('10000');
  const [termMonths, setTermMonths] = useState<string>('12');
  const [rates, setRates] = useState<ComparisonRate[]>([
    {
      id: '1',
      institutionName: 'Lions Share FCU',
      rate: 4.25,
      apy: 4.34,
      color: RATE_COLORS[0]
    },
    {
      id: '2',
      institutionName: 'Bank A',
      rate: 3.50,
      apy: 3.56,
      color: RATE_COLORS[1]
    }
  ]);
  const [lionsShareRates, setLionsShareRates] = useState<CertificateRate[]>([]);
  const [isLoadingRates, setIsLoadingRates] = useState(true);

  useEffect(() => {
    const loadRates = async () => {
      try {
        const fetchedRates = await fetchCertificateRates();
        setLionsShareRates(fetchedRates);
      } catch (error) {
        console.error('Failed to load certificate rates:', error);
      } finally {
        setIsLoadingRates(false);
      }
    };
    loadRates();
  }, []);

  const calculateEarnings = (principal: number, apy: number, termMonths: number) => {
    const monthlyRate = apy / 100 / 12;
    const monthlyCompounding: number[] = [];
    let currentBalance = principal;
    
    for (let month = 1; month <= termMonths; month++) {
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

  const results = useMemo(() => {
    const principalAmount = parseFloat(principal.replace(/,/g, '')) || 0;
    const term = parseInt(termMonths) || 0;
    
    if (principalAmount <= 0 || term <= 0 || rates.length === 0) {
      return null;
    }
    
    const calculations: ComparisonResult['calculations'] = {};
    
    rates.forEach(rate => {
      calculations[rate.id] = calculateEarnings(principalAmount, rate.apy, term);
    });
    
    return {
      principal: principalAmount,
      termMonths: term,
      rates,
      calculations
    };
  }, [principal, termMonths, rates]);

  const handlePrincipalChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.replace(/[^\d]/g, '');
    const formatted = value ? parseInt(value).toLocaleString() : '';
    setPrincipal(formatted);
  };

  const addRate = () => {
    if (rates.length < RATE_COLORS.length) {
      const newRate: ComparisonRate = {
        id: Date.now().toString(),
        institutionName: `Institution ${rates.length + 1}`,
        rate: 3.00,
        apy: 3.04,
        color: RATE_COLORS[rates.length]
      };
      setRates([...rates, newRate]);
    }
  };

  const removeRate = (id: string) => {
    if (rates.length > 1) {
      setRates(rates.filter(rate => rate.id !== id));
    }
  };

  const updateRate = (id: string, field: keyof ComparisonRate, value: string | number) => {
    setRates(rates.map(rate => 
      rate.id === id ? { ...rate, [field]: value } : rate
    ));
  };

  const bestRate = results ? rates.reduce((best, current) => 
    results.calculations[current.id].interestEarned > results.calculations[best.id].interestEarned ? current : best
  ) : null;

  const worstRate = results ? rates.reduce((worst, current) => 
    results.calculations[current.id].interestEarned < results.calculations[worst.id].interestEarned ? current : worst
  ) : null;

  const difference = results && bestRate && worstRate ? 
    results.calculations[bestRate.id].interestEarned - results.calculations[worstRate.id].interestEarned : 0;

  return (
    <div className="space-y-8">
      {/* Input Section */}
      <div className="bg-white rounded-lg shadow-md p-6">
        <h2 className="text-xl font-semibold text-gray-800 mb-6 flex items-center">
          <Calculator className="h-5 w-5 text-blue-600 mr-2" />
          Comparison Settings
        </h2>

        <div className="grid md:grid-cols-2 gap-6 mb-6">
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
                className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg text-lg font-semibold focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-200"
                placeholder="10,000"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Certificate Term (Months)
            </label>
            <select
              value={termMonths}
              onChange={(e) => setTermMonths(e.target.value)}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg text-lg font-semibold focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-200"
            >
              <option value="3">3 Months</option>
              <option value="6">6 Months</option>
              <option value="9">9 Months</option>
              <option value="12">12 Months</option>
              <option value="18">18 Months</option>
              <option value="24">24 Months</option>
              <option value="36">36 Months</option>
              <option value="48">48 Months</option>
              <option value="60">60 Months</option>
            </select>
          </div>
        </div>

        {/* Rates Input */}
        <div>
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold text-gray-800">Institution Rates</h3>
            <button
              onClick={addRate}
              disabled={rates.length >= RATE_COLORS.length}
              className="flex items-center px-3 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <Plus className="h-4 w-4 mr-1" />
              Add Rate
            </button>
          </div>

          <div className="space-y-4">
            {rates.map((rate, index) => (
              <div key={rate.id} className="flex items-center space-x-4 p-4 border border-gray-200 rounded-lg">
                <div 
                  className="w-4 h-4 rounded-full flex-shrink-0"
                  style={{ backgroundColor: rate.color }}
                ></div>
                
                <div className="flex-1 grid grid-cols-1 md:grid-cols-3 gap-4">
                  <input
                    type="text"
                    value={rate.institutionName}
                    onChange={(e) => updateRate(rate.id, 'institutionName', e.target.value)}
                    className="px-3 py-2 border border-gray-300 rounded focus:border-blue-500 focus:outline-none"
                    placeholder="Institution Name"
                  />
                  
                  {rate.institutionName === 'Lions Share FCU' ? (
                    <div className="md:col-span-2">
                      <select
                        value={`${rate.rate}-${rate.apy}`}
                        onChange={(e) => {
                          const selectedRate = lionsShareRates.find(r =>
                            `${r.rate}-${r.apy}` === e.target.value
                          );
                          if (selectedRate) {
                            updateRate(rate.id, 'rate', selectedRate.rate);
                            updateRate(rate.id, 'apy', selectedRate.apy);
                            // Auto-update term to match the certificate
                            const termMonths = parseInt(selectedRate.term);
                            setTermMonths(termMonths.toString());
                          }
                        }}
                        className="w-full px-3 py-2 border border-gray-300 rounded focus:border-blue-500 focus:outline-none"
                        disabled={isLoadingRates}
                      >
                        <option value="">{isLoadingRates ? 'Loading rates...' : 'Select a Lions Share Certificate'}</option>
                        {lionsShareRates.map((lsRate, idx) => {
                          const termMonths = parseInt(lsRate.term);
                          return (
                            <option key={idx} value={`${lsRate.rate}-${lsRate.apy}`}>
                              {lsRate.name} - {lsRate.rate}% Rate / {lsRate.apy}% APY ({termMonths} mo)
                            </option>
                          );
                        })}
                      </select>
                    </div>
                  ) : (
                    <>
                      <div className="relative">
                        <input
                          type="number"
                          step="0.01"
                          value={rate.rate}
                          onChange={(e) => updateRate(rate.id, 'rate', parseFloat(e.target.value) || 0)}
                          className="w-full px-3 py-2 pr-8 border border-gray-300 rounded focus:border-blue-500 focus:outline-none"
                          placeholder="Rate"
                        />
                        <span className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500">%</span>
                      </div>
                      
                      <div className="relative">
                        <input
                          type="number"
                          step="0.01"
                          value={rate.apy}
                          onChange={(e) => updateRate(rate.id, 'apy', parseFloat(e.target.value) || 0)}
                          className="w-full px-3 py-2 pr-12 border border-gray-300 rounded focus:border-blue-500 focus:outline-none"
                          placeholder="APY"
                        />
                        <span className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500">APY</span>
                      </div>
                    </>
                  )}
                </div>

                {rates.length > 1 && (
                  <button
                    onClick={() => removeRate(rate.id)}
                    className="p-2 text-red-600 hover:text-red-800 transition-colors"
                  >
                    <X className="h-4 w-4" />
                  </button>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Results Section */}
      {results && (
        <div className="space-y-6">
          {/* Summary Cards */}
          <div className="grid md:grid-cols-3 gap-6">
            <div className="bg-white rounded-lg shadow-md p-6 text-center">
              <div className="text-2xl font-bold text-blue-700 mb-2">
                ${results.principal.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
              </div>
              <div className="text-sm text-gray-600">Initial Deposit</div>
            </div>

            <div className="bg-white rounded-lg shadow-md p-6 text-center">
              <div className="text-2xl font-bold text-emerald-700 mb-2">
                {results.termMonths} months
              </div>
              <div className="text-sm text-gray-600">Certificate Term</div>
            </div>

            <div className="bg-white rounded-lg shadow-md p-6 text-center">
              <div className="text-2xl font-bold text-purple-700 mb-2">
                ${difference.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
              </div>
              <div className="text-sm text-gray-600">Potential Extra Earnings</div>
            </div>
          </div>

          {/* Comparison Results */}
          <div className="bg-white rounded-lg shadow-md p-6">
            <h3 className="text-xl font-semibold text-gray-800 mb-6 flex items-center">
              <TrendingUp className="h-5 w-5 text-emerald-600 mr-2" />
              Earnings Comparison
            </h3>

            <div className="space-y-4">
              {rates
                .sort((a, b) => results.calculations[b.id].interestEarned - results.calculations[a.id].interestEarned)
                .map((rate, index) => {
                  const calc = results.calculations[rate.id];
                  const isBest = rate.id === bestRate?.id;
                  const isWorst = rate.id === worstRate?.id;
                  
                  return (
                    <div 
                      key={rate.id} 
                      className={`p-4 rounded-lg border-2 ${
                        isBest ? 'border-emerald-500 bg-emerald-50' : 
                        isWorst ? 'border-red-300 bg-red-50' : 
                        'border-gray-200 bg-gray-50'
                      }`}
                    >
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-3">
                          <div 
                            className="w-4 h-4 rounded-full"
                            style={{ backgroundColor: rate.color }}
                          ></div>
                          <div>
                            <div className="flex items-center space-x-2">
                              <h4 className="font-semibold text-gray-800">{rate.institutionName}</h4>
                              {isBest && <Award className="h-4 w-4 text-emerald-600" />}
                            </div>
                            <div className="text-sm text-gray-600">
                              {rate.rate.toFixed(2)}% Rate • {rate.apy.toFixed(2)}% APY
                            </div>
                          </div>
                        </div>
                        
                        <div className="text-right">
                          <div className="grid grid-cols-2 gap-6">
                            <div>
                              <div className="text-lg font-bold text-emerald-700">
                                ${calc.interestEarned.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                              </div>
                              <div className="text-xs text-gray-500">Interest Earned</div>
                            </div>
                            <div>
                              <div className="text-lg font-bold text-blue-700">
                                ${calc.maturityValue.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                              </div>
                              <div className="text-xs text-gray-500">Maturity Value</div>
                            </div>
                          </div>
                        </div>
                      </div>
                      
                      {!isBest && bestRate && (
                        <div className="mt-2 pt-2 border-t border-gray-200">
                          <div className="text-sm text-gray-600">
                            You could earn <span className="font-semibold text-red-600">
                              ${(results.calculations[bestRate.id].interestEarned - calc.interestEarned).toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })} more
                            </span> with the best rate
                          </div>
                        </div>
                      )}
                    </div>
                  );
                })}
            </div>
          </div>

          {/* Key Insights */}
          {bestRate && worstRate && difference > 0 && (
            <div className="bg-gradient-to-r from-emerald-50 to-blue-50 rounded-lg p-6 border border-emerald-200">
              <h3 className="text-lg font-semibold text-gray-800 mb-3">💡 Key Insights</h3>
              <div className="space-y-2 text-gray-700">
                <p>
                  • <strong>{bestRate.institutionName}</strong> certificate would earn <strong>${difference.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })} more</strong> than <strong>{worstRate.institutionName}</strong> certificate
                </p>
                <p>
                  • Show members how they could earn <strong>${difference.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })} more</strong> by choosing Lions Share FCU over competitors
                </p>
                <p>
                  • Use this <strong>{((difference / results.calculations[worstRate.id].interestEarned) * 100).toFixed(1)}%</strong> earnings advantage as a selling point to attract new members
                </p>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
};