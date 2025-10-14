import React, { useState } from 'react';
import { Settings, Plus, Edit, Trash2, Save, X } from 'lucide-react';
import { CertificateRate } from '../types/rates';
import { createCertificateRate, updateCertificateRate } from '../services/ratesService';

interface AdminPanelProps {
  certificates: CertificateRate[];
  onRefresh: () => void;
}

interface CertificateFormData {
  certificate_name: string;
  term_months: string;
  minimum_deposit: string;
  dividend_rate: string;
  apy: string;
  is_specialty: string;
  special_features: string;
}

export const AdminPanel: React.FC<AdminPanelProps> = ({ certificates, onRefresh }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [showAddForm, setShowAddForm] = useState(false);
  const [formData, setFormData] = useState<CertificateFormData>({
    certificate_name: '',
    term_months: '',
    minimum_deposit: '',
    dividend_rate: '',
    apy: '',
    is_specialty: 'false',
    special_features: ''
  });

  const resetForm = () => {
    setFormData({
      certificate_name: '',
      term_months: '',
      minimum_deposit: '',
      dividend_rate: '',
      apy: '',
      is_specialty: 'false',
      special_features: ''
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      if (editingId) {
        // For Google Sheets, direct editing is recommended
        alert('For updates, please edit the Google Sheet directly. This ensures data integrity.');
        return;
      } else {
        await createCertificateRate(formData);
      }
      resetForm();
      setEditingId(null);
      setShowAddForm(false);
      onRefresh();
    } catch (error) {
      console.error('Error saving certificate:', error);
      alert('Error saving certificate. Please check your Google Sheets configuration.');
    }
  };

  const handleEdit = (cert: CertificateRate) => {
    setFormData({
      certificate_name: cert.name,
      term_months: cert.term.split(' ')[0],
      minimum_deposit: cert.minimumDeposit.toString(),
      dividend_rate: cert.rate.toString(),
      apy: cert.apy.toString(),
      is_specialty: cert.isSpecialty.toString(),
      special_features: cert.specialFeatures || ''
    });
    setEditingId(cert.id);
    setShowAddForm(true);
  };

  if (!import.meta.env.VITE_GOOGLE_SHEETS_API_KEY) {
    return null; // Don't show admin panel if Google Sheets is not configured
  }

  return (
    <div className="fixed bottom-4 right-4 z-50">
      {!isOpen ? (
        <button
          onClick={() => setIsOpen(true)}
          className="bg-blue-600 hover:bg-blue-700 text-white p-3 rounded-full shadow-lg transition-colors"
          title="Admin Panel"
        >
          <Settings className="h-6 w-6" />
        </button>
      ) : (
        <div className="bg-white rounded-lg shadow-xl border max-w-4xl max-h-96 overflow-hidden">
          <div className="flex items-center justify-between p-4 border-b">
            <h3 className="font-semibold text-gray-800">Certificate Rate Management</h3>
            <button
              onClick={() => setIsOpen(false)}
              className="text-gray-500 hover:text-gray-700"
            >
              <X className="h-5 w-5" />
            </button>
          </div>
          
          <div className="p-4 max-h-80 overflow-y-auto">
            <div className="flex justify-between items-center mb-4">
              <h4 className="font-medium">Current Certificates</h4>
              <div className="text-xs text-gray-500 mb-2">
                <p>💡 <strong>Tip:</strong> New certificates are added to your Google Sheet automatically!</p>
                <p>For updates, edit the Google Sheet directly for best results.</p>
              </div>
              <button
                onClick={() => {
                  resetForm();
                  setEditingId(null);
                  setShowAddForm(true);
                }}
                className="flex items-center px-3 py-1 bg-green-600 text-white rounded text-sm hover:bg-green-700"
              >
                <Plus className="h-4 w-4 mr-1" />
                Add New
              </button>
            </div>

            {showAddForm && (
              <form onSubmit={handleSubmit} className="mb-6 p-4 border rounded-lg bg-gray-50">
                <div className="grid grid-cols-2 gap-4 mb-4">
                  <input
                    type="text"
                    placeholder="Certificate Name"
                    value={formData.certificate_name}
                    onChange={(e) => setFormData({...formData, certificate_name: e.target.value})}
                    className="px-3 py-2 border rounded text-sm"
                    required
                  />
                  <input
                    type="number"
                    placeholder="Term (months)"
                    value={formData.term_months}
                    onChange={(e) => setFormData({...formData, term_months: e.target.value})}
                    className="px-3 py-2 border rounded text-sm"
                    required
                  />
                  <input
                    type="number"
                    placeholder="Minimum Deposit"
                    value={formData.minimum_deposit}
                    onChange={(e) => setFormData({...formData, minimum_deposit: e.target.value})}
                    className="px-3 py-2 border rounded text-sm"
                    required
                  />
                  <input
                    type="number"
                    step="0.01"
                    placeholder="Dividend Rate (%)"
                    value={formData.dividend_rate}
                    onChange={(e) => setFormData({...formData, dividend_rate: e.target.value})}
                    className="px-3 py-2 border rounded text-sm"
                    required
                  />
                  <input
                    type="number"
                    step="0.01"
                    placeholder="APY (%)"
                    value={formData.apy}
                    onChange={(e) => setFormData({...formData, apy: e.target.value})}
                    className="px-3 py-2 border rounded text-sm"
                    required
                  />
                  <select
                    value={formData.is_specialty}
                    onChange={(e) => setFormData({...formData, is_specialty: e.target.value})}
                    className="px-3 py-2 border rounded text-sm"
                  >
                    <option value="false">Standard Certificate</option>
                    <option value="true">Specialty Certificate</option>
                  </select>
                </div>
                <textarea
                  placeholder="Special Features (optional)"
                  value={formData.special_features}
                  onChange={(e) => setFormData({...formData, special_features: e.target.value})}
                  className="w-full px-3 py-2 border rounded text-sm mb-4"
                  rows={2}
                />
                <div className="flex gap-2">
                  <button
                    type="submit"
                    className="flex items-center px-3 py-1 bg-blue-600 text-white rounded text-sm hover:bg-blue-700"
                  >
                    <Save className="h-4 w-4 mr-1" />
                    {editingId ? 'Update' : 'Create'}
                  </button>
                  <button
                    type="button"
                    onClick={() => {
                      setShowAddForm(false);
                      setEditingId(null);
                      resetForm();
                    }}
                    className="px-3 py-1 bg-gray-500 text-white rounded text-sm hover:bg-gray-600"
                  >
                    Cancel
                  </button>
                </div>
              </form>
            )}

            <div className="space-y-2">
              {certificates.map((cert) => (
                <div key={cert.id} className="flex items-center justify-between p-3 border rounded">
                  <div>
                    <div className="font-medium text-sm">{cert.name}</div>
                    <div className="text-xs text-gray-600">
                      {cert.term} • {cert.apy.toFixed(2)}% APY • ${cert.minimumDeposit.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })} min
                    </div>
                  </div>
                  <button
                    onClick={() => handleEdit(cert)}
                    className="p-1 text-blue-600 hover:text-blue-800"
                  >
                    <Edit className="h-4 w-4" />
                  </button>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};