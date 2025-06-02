import { test, expect } from '@playwright/test';
import { RegistrationPage } from '../../ui/pages/RegistrationPage';
import { TestData } from '../../config/testData';
import { faker } from '@faker-js/faker';

test.describe('Registration Flow', () => {
  let registrationPage: RegistrationPage;

  test.beforeEach(async ({ page }) => {
    registrationPage = new RegistrationPage(page);
    await registrationPage.goto();
  });

  // Smoke Tests
  test('should register successfully with valid data @smoke', async ({ page }) => {
    const userData = {
      email: faker.internet.email(),
      password: TestData.users.valid.password,
      firstName: TestData.users.valid.firstName,
      lastName: TestData.users.valid.lastName
    };
    await registrationPage.register(userData);
    await expect(registrationPage.registrationSuccess).toBeVisible();
  });

  test('should show validation errors for required fields @smoke', async ({ page }) => {
    await registrationPage.submitEmptyForm();
    await expect(registrationPage.validationError).toBeVisible();
  });

  // Sanity Tests
  test('should validate password strength @sanity', async ({ page }) => {
    await registrationPage.fillPassword(TestData.users.invalid.weakPassword);
    await expect(registrationPage.passwordStrengthError).toBeVisible();
  });

  test('should handle duplicate email registration @sanity', async ({ page }) => {
    await registrationPage.register({ 
      email: TestData.users.invalid.email, 
      password: TestData.users.valid.password,
      firstName: TestData.users.valid.firstName,
      lastName: TestData.users.valid.lastName
    });
    await expect(registrationPage.emailExistsError).toBeVisible();
  });

  // Regression Tests
  test('should handle special characters in name fields @regression', async ({ page }) => {
    const userData = {
      email: faker.internet.email(),
      password: TestData.users.valid.password,
      firstName: 'John-Doe',
      lastName: "O'Connor"
    };
    await registrationPage.register(userData);
    await expect(registrationPage.registrationSuccess).toBeVisible();
  });

  test('should validate phone number format @regression', async ({ page }) => {
    await registrationPage.fillPhoneNumber(TestData.users.invalid.invalidPhone);
    await expect(registrationPage.phoneError).toBeVisible();
  });

  test('should handle concurrent registration attempts @regression', async ({ page }) => {
    const userData = {
      email: faker.internet.email(),
      password: TestData.users.valid.password,
      firstName: TestData.users.valid.firstName,
      lastName: TestData.users.valid.lastName
    };
    await Promise.all([
      registrationPage.register(userData),
      registrationPage.register(userData)
    ]);
    await expect(registrationPage.concurrentRegistrationError).toBeVisible();
  });
}); 