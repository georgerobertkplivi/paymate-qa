import { test, expect } from '@playwright/test';
import { UserApi } from '../../api/UserApi';
import { LoginData } from '../../data/ui/LoginData';

test.describe('API Cleanup Tests', () => {
  let userApi: UserApi;
  let loginData: LoginData;

  test.beforeEach(async () => {
    userApi = new UserApi();
    loginData = new LoginData();
    await userApi.login(loginData.email, loginData.password);
  });

  test('should clean up all test transactions', async () => {
    await test.step('Get all transactions', async () => {
      const response = await userApi.getTransactions();
      expect(response.status).toBe(200);
      const transactions = await response.json();
      
      if (transactions.length > 0) {
        await test.step('Delete each transaction', async () => {
          for (const transaction of transactions) {
            const deleteResponse = await userApi.deleteTransaction(transaction.id);
            expect(deleteResponse.status).toBe(200);
          }
        });
      }
    });
  });

  test('should clean up test user data', async () => {
    await test.step('Get user profile', async () => {
      const response = await userApi.getUserProfile();
      expect(response.status).toBe(200);
      const userData = await response.json();
      
      if (userData.testData) {
        await test.step('Reset user profile', async () => {
          const resetResponse = await userApi.resetUserProfile();
          expect(resetResponse.status).toBe(200);
        });
      }
    });
  });

  test('should clean up test filters and preferences', async () => {
    await test.step('Reset all filters and preferences', async () => {
      const response = await userApi.resetFiltersAndPreferences();
      expect(response.status).toBe(200);
    });
  });

  test('should verify cleanup was successful', async () => {
    await test.step('Verify no test transactions remain', async () => {
      const response = await userApi.getTransactions();
      expect(response.status).toBe(200);
      const transactions = await response.json();
      expect(transactions.length).toBe(0);
    });

    await test.step('Verify user profile is clean', async () => {
      const response = await userApi.getUserProfile();
      expect(response.status).toBe(200);
      const userData = await response.json();
      expect(userData.testData).toBeFalsy();
    });

    await test.step('Verify filters are reset', async () => {
      const response = await userApi.getFiltersAndPreferences();
      expect(response.status).toBe(200);
      const filters = await response.json();
      expect(filters).toEqual({
        dateRange: { start: '', end: '' },
        transactionType: 'all',
        searchQuery: ''
      });
    });
  });
}); 