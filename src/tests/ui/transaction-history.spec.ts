import { test, expect } from '@playwright/test';
import { DashboardPage } from '../../ui/pages/DashboardPage';
import { LoginPage } from '../../ui/pages/LoginPage';
import { LoginData } from '../../data/ui/LoginData';
import { faker } from '@faker-js/faker';

test.describe('Transaction History Flow', () => {
  let loginPage: LoginPage;
  let dashboardPage: DashboardPage;
  let loginData: LoginData;
  let createdFilters: string[] = [];

  test.beforeEach(async ({ page }) => {
    loginPage = new LoginPage(page);
    dashboardPage = new DashboardPage(page);
    loginData = new LoginData();
    
    await loginPage.goto();
    await loginPage.login(loginData.email, loginData.password);
    await expect(page.locator('.dashboard')).toBeVisible();
  });

  test.afterEach(async ({ page }) => {
    if (createdFilters.length > 0) {
      await test.step('Reset filters', async () => {
        await dashboardPage.viewTransactionHistory();
        await dashboardPage.resetFilters();
        createdFilters = [];
      });
    }
  });

  // Smoke Tests
  test('should display transaction history @smoke', async ({ page }) => {
    await dashboardPage.viewTransactionHistory();
    await expect(dashboardPage.transactionList).toBeVisible();
    await expect(dashboardPage.transactionItem).toHaveCount(10);
  });

  test('should filter transactions by date range @smoke', async ({ page }) => {
    const startDate = new Date(Date.now() - 7 * 24 * 60 * 60 * 1000); // 7 days ago
    const endDate = new Date();

    await dashboardPage.viewTransactionHistory();
    await dashboardPage.filterByDateRange(startDate, endDate);
    createdFilters.push('date-range');
    
    await expect(dashboardPage.filteredResults).toBeVisible();
  });

  // Sanity Tests
  test('should filter transactions by type @sanity', async ({ page }) => {
    await dashboardPage.viewTransactionHistory();
    await dashboardPage.filterByType('sent');
    createdFilters.push('type');
    
    await expect(dashboardPage.filteredResults).toBeVisible();
    await expect(page.locator('[data-testid="transaction-type"]')).toContainText('Sent');
  });

  test('should search transactions by amount @sanity', async ({ page }) => {
    const searchAmount = '100.00';
    
    await dashboardPage.viewTransactionHistory();
    await dashboardPage.searchTransactions(searchAmount);
    createdFilters.push('search');
    
    await expect(dashboardPage.filteredResults).toBeVisible();
    await expect(page.locator('[data-testid="transaction-amount"]')).toContainText(searchAmount);
  });

  // Regression Tests
  test('should handle pagination @regression', async ({ page }) => {
    await dashboardPage.viewTransactionHistory();
    await dashboardPage.nextPageButton.click();
    
    await expect(dashboardPage.pageIndicator).toBeVisible();
    await expect(dashboardPage.transactionItem).toHaveCount(10);
  });

  test('should export transaction history @regression', async ({ page }) => {
    await dashboardPage.viewTransactionHistory();
    const download = await dashboardPage.exportTransactions();
    expect(download.suggestedFilename()).toMatch(/transactions-\d{4}-\d{2}-\d{2}\.csv/);
  });

  test('should handle multiple filter combinations @regression', async ({ page }) => {
    const startDate = new Date(Date.now() - 30 * 24 * 60 * 60 * 1000); // 30 days ago
    const endDate = new Date();
    const searchAmount = '50.00';

    await dashboardPage.viewTransactionHistory();
    await dashboardPage.filterByDateRange(startDate, endDate);
    await dashboardPage.filterByType('received');
    await dashboardPage.searchTransactions(searchAmount);
    createdFilters.push('multiple-filters');
    
    await expect(dashboardPage.filteredResults).toBeVisible();
    await expect(dashboardPage.activeFilters).toHaveCount(3);
  });
}); 