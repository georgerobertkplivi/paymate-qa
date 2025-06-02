import { Page, Locator } from '@playwright/test';

export class LoginPage {
  readonly page: Page;
  readonly emailInput: Locator;
  readonly passwordInput: Locator;
  readonly rememberMeCheckbox: Locator;
  readonly loginButton: Locator;
  readonly forgotPasswordLink: Locator;
  readonly resetEmailInput: Locator;
  readonly resetSubmitButton: Locator;
  readonly dashboard: Locator;
  readonly errorMessage: Locator;
  readonly resetSuccess: Locator;
  readonly accountLocked: Locator;
  readonly emailError: Locator;
  readonly sessionExpired: Locator;

  constructor(page: Page) {
    this.page = page;
    this.emailInput = page.locator('[data-testid="email"]');
    this.passwordInput = page.locator('[data-testid="password"]');
    this.rememberMeCheckbox = page.locator('[data-testid="remember-me"]');
    this.loginButton = page.locator('[data-testid="login-button"]');
    this.forgotPasswordLink = page.locator('[data-testid="forgot-password"]');
    this.resetEmailInput = page.locator('[data-testid="reset-email"]');
    this.resetSubmitButton = page.locator('[data-testid="reset-submit"]');
    this.dashboard = page.locator('.dashboard');
    this.errorMessage = page.locator('[data-testid="error-message"]');
    this.resetSuccess = page.locator('[data-testid="reset-success"]');
    this.accountLocked = page.locator('[data-testid="account-locked"]');
    this.emailError = page.locator('[data-testid="email-error"]');
    this.sessionExpired = page.locator('[data-testid="session-expired"]');
  }

  async goto() {
    await this.page.goto('/login');
  }

  async login(email: string, password: string, rememberMe?: boolean) {
    await this.emailInput.fill(email);
    await this.passwordInput.fill(password);
    if (rememberMe) {
      await this.rememberMeCheckbox.check();
    }
    await this.loginButton.click();
  }

  async clickForgotPassword() {
    await this.forgotPasswordLink.click();
  }

  async resetPassword(email: string) {
    await this.resetEmailInput.fill(email);
    await this.resetSubmitButton.click();
  }
} 