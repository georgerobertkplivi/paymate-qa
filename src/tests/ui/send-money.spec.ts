import { test, expect } from '@playwright/test';
import { DashboardPage } from '../../ui/pages/DashboardPage';
import { LoginPage } from '../../ui/pages/LoginPage';
import { LoginData } from '../../data/ui/LoginData';
import { TestData } from '../../config/testData';
import { faker } from '@faker-js/faker';

test.describe('Send Money Flow', () => {
  let loginPage: LoginPage;
  let dashboardPage: DashboardPage;
  let loginData: LoginData;
  let createdTransactions: Array<{ amount: string; recipient: string }> = [];

  test.beforeEach(async ({ page }) => {
    loginPage = new LoginPage(page);
    dashboardPage = new DashboardPage(page);
    loginData = new LoginData();
    
    await loginPage.goto();
    await loginPage.login(TestData.users.valid.email, TestData.users.valid.password);
    await expect(loginPage.dashboard).toBeVisible();
  });

  test.afterEach(async ({ page }) => {
    if (createdTransactions.length > 0) {
      await test.step('Clean up created transactions', async () => {
        await dashboardPage.viewTransactionHistory();
        for (const transaction of createdTransactions) {
          await dashboardPage.deleteTransaction();
          await expect(dashboardPage.deleteSuccessMessage).toBeVisible();
        }
      });
      createdTransactions = [];
    }
  });

  // Smoke Tests
  test('should send money successfully to a valid recipient @smoke', async ({ page }) => {
    const amount = TestData.transactions.amounts.valid;
    const recipient = faker.internet.email();
    const note = 'Test payment';

    await dashboardPage.sendMoney(amount, recipient, note);
    await expect(dashboardPage.successMessage).toBeVisible();
    createdTransactions.push({ amount, recipient });
  });

  test('should handle insufficient balance scenario @smoke', async ({ page }) => {
    const largeAmount = TestData.transactions.amounts.insufficient;
    const recipient = faker.internet.email();

    await dashboardPage.sendMoney(largeAmount, recipient);
    await expect(dashboardPage.errorMessage).toContainText('Insufficient balance');
  });

  // Sanity Tests
  test('should validate minimum transfer amount @sanity', async ({ page }) => {
    const smallAmount = TestData.transactions.amounts.minimum;
    const recipient = faker.internet.email();

    await dashboardPage.sendMoney(smallAmount, recipient);
    await expect(dashboardPage.errorMessage).toContainText('Minimum amount');
  });

  test('should handle maximum transfer limit @sanity', async ({ page }) => {
    const maxAmount = TestData.transactions.amounts.maximum;
    const recipient = faker.internet.email();

    await dashboardPage.sendMoney(maxAmount, recipient);
    await expect(dashboardPage.errorMessage).toContainText('Maximum limit');
  });

  // Regression Tests
  test('should handle special characters in notes @regression', async ({ page }) => {
    const amount = TestData.transactions.amounts.valid;
    const recipient = faker.internet.email();
    const note = 'Test payment #123!@#$%^&*()';

    await dashboardPage.sendMoney(amount, recipient, note);
    await expect(dashboardPage.successMessage).toBeVisible();
    createdTransactions.push({ amount, recipient });
  });

  test('should handle multiple currencies @regression', async ({ page }) => {
    const amount = TestData.transactions.amounts.valid;
    const recipient = faker.internet.email();
    const currency = TestData.transactions.currencies.alternative;

    await dashboardPage.sendMoney(amount, recipient, '', currency);
    await expect(dashboardPage.successMessage).toBeVisible();
    createdTransactions.push({ amount, recipient });
  });

  test('should handle scheduled transfers @regression', async ({ page }) => {
    const amount = TestData.transactions.amounts.valid;
    const recipient = faker.internet.email();
    const scheduleDate = new Date(Date.now() + 86400000); // Tomorrow

    await dashboardPage.sendMoney(amount, recipient, '', TestData.transactions.currencies.default, scheduleDate);
    await expect(dashboardPage.scheduleSuccessMessage).toBeVisible();
    createdTransactions.push({ amount, recipient });
  });
}); 