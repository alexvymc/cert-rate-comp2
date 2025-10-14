import React, { useState, useEffect } from 'react';
import { Header } from './components/Header';
import { ComparisonCalculator } from './components/ComparisonCalculator';

function App() {
  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      
      <div className="max-w-6xl mx-auto px-4 py-8">
        <div className="mb-8 text-center">
          <h2 className="text-3xl font-bold text-gray-800 mb-4">
            Certificate Rate Comparison Calculator
          </h2>
          <p className="text-gray-600 text-lg max-w-3xl mx-auto">
            Compare certificate rates from different financial institutions to see how much more you could earn. 
            Enter your deposit amount, term, and rates to see the difference in earnings.
          </p>
        </div>

        <ComparisonCalculator />
      </div>
    </div>
  );
}

export default App;