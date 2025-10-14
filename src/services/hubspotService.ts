// HubSpot API service for managing certificate rates
export interface HubSpotCompanyRecord {
  id: string;
  properties: {
    name: string;
    description: string;
    certificate_term: string;
    certificate_minimum: string;
    certificate_rate: string;
    certificate_apy: string;
    certificate_specialty: string;
    certificate_features?: string;
    hs_lastmodifieddate: string;
  };
}

const HUBSPOT_BASE_URL = 'https://api.hubapi.com';
const ACCESS_TOKEN = import.meta.env.VITE_HUBSPOT_ACCESS_TOKEN;

// Using Companies object to store certificate rates
const CERTIFICATE_OBJECT_TYPE = 'companies';

export class HubSpotService {
  private async makeRequest(endpoint: string, options: RequestInit = {}) {
    const url = `${HUBSPOT_BASE_URL}${endpoint}`;
    const headers = {
      'Authorization': `Bearer ${ACCESS_TOKEN}`,
      'Content-Type': 'application/json',
      ...options.headers,
    };

    const response = await fetch(url, {
      ...options,
      headers,
    });

    if (!response.ok) {
      throw new Error(`HubSpot API error: ${response.status} ${response.statusText}`);
    }

    return response.json();
  }

  // Fetch all certificate rates from HubSpot Companies
  async getCertificateRates(): Promise<HubSpotCompanyRecord[]> {
    try {
      const endpoint = `/crm/v3/objects/${CERTIFICATE_OBJECT_TYPE}`;
      const params = new URLSearchParams({
        properties: 'name,description,certificate_term,certificate_minimum,certificate_rate,certificate_apy,certificate_specialty,certificate_features,hs_lastmodifieddate',
        limit: '100'
      });

      const response = await this.makeRequest(`${endpoint}?${params}`);
      return response.results || [];
    } catch (error) {
      console.error('Error fetching certificate rates from HubSpot:', error);
      throw error;
    }
  }

  // Create a new certificate rate record
  async createCertificateRate(certificateData: Omit<HubSpotCompanyRecord['properties'], 'hs_lastmodifieddate'>) {
    try {
      const endpoint = `/crm/v3/objects/${CERTIFICATE_OBJECT_TYPE}`;
      const data = {
        properties: {
          ...certificateData,
        }
      };

      return await this.makeRequest(endpoint, {
        method: 'POST',
        body: JSON.stringify(data),
      });
    } catch (error) {
      console.error('Error creating certificate rate in HubSpot:', error);
      throw error;
    }
  }

  // Update an existing certificate rate record
  async updateCertificateRate(recordId: string, certificateData: Partial<HubSpotCompanyRecord['properties']>) {
    try {
      const endpoint = `/crm/v3/objects/${CERTIFICATE_OBJECT_TYPE}/${recordId}`;
      const data = {
        properties: {
          ...certificateData,
        }
      };

      return await this.makeRequest(endpoint, {
        method: 'PATCH',
        body: JSON.stringify(data),
      });
    } catch (error) {
      console.error('Error updating certificate rate in HubSpot:', error);
      throw error;
    }
  }

  // Delete a certificate rate record
  async deleteCertificateRate(recordId: string) {
    try {
      const endpoint = `/crm/v3/objects/${CERTIFICATE_OBJECT_TYPE}/${recordId}`;
      return await this.makeRequest(endpoint, {
        method: 'DELETE',
      });
    } catch (error) {
      console.error('Error deleting certificate rate from HubSpot:', error);
      throw error;
    }
  }
}

export const hubspotService = new HubSpotService();