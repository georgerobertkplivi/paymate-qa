import { ApiEndpoints } from './endpoints/ApiEndpoints';

// Handles all API interactions for user-related operations
export class UserApi {
  private token: string = '';

  // Authenticates user and stores JWT token
  async login(email: string, password: string): Promise<void> {
    const response = await fetch(ApiEndpoints.AUTH.LOGIN, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email, password }),
    });

    if (!response.ok) {
      throw new Error(`Login failed: ${response.statusText}`);
    }

    const data = await response.json();
    this.token = data.token;
  }

  // Returns headers with auth token for API requests
  private getHeaders(): HeadersInit {
    return {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${this.token}`,
    };
  }

  // Fetches all user transactions
  async getTransactions() {
    return fetch(ApiEndpoints.USER.TRANSACTIONS, {
      method: 'GET',
      headers: this.getHeaders(),
    });
  }

  // Deletes a specific transaction
  async deleteTransaction(transactionId: string) {
    return fetch(`${ApiEndpoints.USER.TRANSACTIONS}/${transactionId}`, {
      method: 'DELETE',
      headers: this.getHeaders(),
    });
  }

  // Gets user profile data
  async getUserProfile() {
    return fetch(ApiEndpoints.USER.PROFILE, {
      method: 'GET',
      headers: this.getHeaders(),
    });
  }

  // Resets user profile to default state
  async resetUserProfile() {
    return fetch(ApiEndpoints.USER.RESET_PROFILE, {
      method: 'POST',
      headers: this.getHeaders(),
    });
  }

  // Resets all user filters and preferences
  async resetFiltersAndPreferences() {
    return fetch(ApiEndpoints.USER.RESET_FILTERS, {
      method: 'POST',
      headers: this.getHeaders(),
    });
  }

  // Gets current filter settings
  async getFiltersAndPreferences() {
    return fetch(ApiEndpoints.USER.FILTERS, {
      method: 'GET',
      headers: this.getHeaders(),
    });
  }
} 