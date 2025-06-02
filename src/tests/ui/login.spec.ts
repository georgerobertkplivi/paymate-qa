import { test, expect } from '@playwright/test';
import { LoginPage } from '../../ui/pages/LoginPage';
import { LoginData } from '../../data/ui/LoginData';
import { TestData } from '../../config/testData';
import allure from 'allure-playwright';

test.describe('Login Flow', () => {
  let loginPage: LoginPage;
  let loginData: LoginData;

  test.beforeEach(async ({ page }) => {
    loginPage = new LoginPage(page);
    loginData = new LoginData();
    await loginPage.goto();
  });

  // Smoke Tests
  test('should login successfully with valid credentials @smoke', async ({ page }) => {
    await loginPage.login(TestData.users.valid.email, TestData.users.valid.password);
    await expect(loginPage.dashboard).toBeVisible();
  });

  test('should show error with invalid credentials @smoke', async ({ page }) => {
    await loginPage.login(TestData.users.invalid.email, TestData.users.invalid.password);
    await expect(loginPage.errorMessage).toBeVisible();
  });

  // Sanity Tests
  test('should remember user credentials @sanity', async ({ page }) => {
    await loginPage.login(TestData.users.valid.email, TestData.users.valid.password, true);
    await page.reload();
    await expect(loginPage.dashboard).toBeVisible();
  });

  test('should handle password reset flow @sanity', async ({ page }) => {
    await loginPage.clickForgotPassword();
    await loginPage.resetPassword(TestData.users.valid.email);
    await expect(loginPage.resetSuccess).toBeVisible();
  });

  // Regression Tests
  test('should handle multiple failed login attempts @regression', async ({ page }) => {
    for (let i = 0; i < 5; i++) {
      await loginPage.login(TestData.users.invalid.email, TestData.users.invalid.password);
    }
    await expect(loginPage.accountLocked).toBeVisible();
  });

  test('should validate email format @regression', async ({ page }) => {
    await loginPage.login('invalid-email', TestData.users.valid.password);
    await expect(loginPage.emailError).toBeVisible();
  });

  test('should handle session timeout @regression', async ({ page }) => {
    await loginPage.login(TestData.users.valid.email, TestData.users.valid.password);
    await page.waitForTimeout(TestData.timeouts.session);
    await page.reload();
    await expect(loginPage.sessionExpired).toBeVisible();
  });
}); 