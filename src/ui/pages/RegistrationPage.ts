import { Page, Locator } from '@playwright/test';

interface UserData {
  email: string;
  password: string;
  firstName: string;
  lastName: string;
  phoneNumber?: string;
}

export class RegistrationPage {
  readonly page: Page;
  readonly emailInput: Locator;
  readonly passwordInput: Locator;
  readonly firstNameInput: Locator;
  readonly lastNameInput: Locator;
  readonly phoneInput: Locator;
  readonly registerButton: Locator;
  readonly registrationSuccess: Locator;
  readonly validationError: Locator;
  readonly passwordStrengthError: Locator;
  readonly emailExistsError: Locator;
  readonly phoneError: Locator;
  readonly concurrentRegistrationError: Locator;

  constructor(page: Page) {
    this.page = page;
    this.emailInput = page.locator('[data-testid="email"]');
    this.passwordInput = page.locator('[data-testid="password"]');
    this.firstNameInput = page.locator('[data-testid="firstName"]');
    this.lastNameInput = page.locator('[data-testid="lastName"]');
    this.phoneInput = page.locator('[data-testid="phone"]');
    this.registerButton = page.locator('[data-testid="register-button"]');
    this.registrationSuccess = page.locator('[data-testid="registration-success"]');
    this.validationError = page.locator('[data-testid="validation-error"]');
    this.passwordStrengthError = page.locator('[data-testid="password-strength-error"]');
    this.emailExistsError = page.locator('[data-testid="email-exists-error"]');
    this.phoneError = page.locator('[data-testid="phone-error"]');
    this.concurrentRegistrationError = page.locator('[data-testid="concurrent-registration-error"]');
  }

  async goto() {
    await this.page.goto('/register');
  }

  async register(userData: UserData) {
    await this.emailInput.fill(userData.email);
    await this.passwordInput.fill(userData.password);
    await this.firstNameInput.fill(userData.firstName);
    await this.lastNameInput.fill(userData.lastName);
    if (userData.phoneNumber) {
      await this.phoneInput.fill(userData.phoneNumber);
    }
    await this.registerButton.click();
  }

  async submitEmptyForm() {
    await this.registerButton.click();
  }

  async fillPassword(password: string) {
    await this.passwordInput.fill(password);
  }

  async fillPhoneNumber(phone: string) {
    await this.phoneInput.fill(phone);
  }
} 