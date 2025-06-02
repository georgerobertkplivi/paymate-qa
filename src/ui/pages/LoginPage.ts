import { Page, Locator } from '@playwright/test';
import { LOGIN_LOCATORS } from '../constants/locators';

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
    this.emailInput = page.locator(LOGIN_LOCATORS.EMAIL);
    this.passwordInput = page.locator(LOGIN_LOCATORS.PASSWORD);
    this.rememberMeCheckbox = page.locator(LOGIN_LOCATORS.REMEMBER_ME);
    this.loginButton = page.locator(LOGIN_LOCATORS.LOGIN_BUTTON);
    this.forgotPasswordLink = page.locator(LOGIN_LOCATORS.FORGOT_PASSWORD);
    this.resetEmailInput = page.locator(LOGIN_LOCATORS.RESET_EMAIL);
    this.resetSubmitButton = page.locator(LOGIN_LOCATORS.RESET_SUBMIT);
    this.dashboard = page.locator(LOGIN_LOCATORS.DASHBOARD);
    this.errorMessage = page.locator(LOGIN_LOCATORS.ERROR_MESSAGE);
    this.resetSuccess = page.locator(LOGIN_LOCATORS.RESET_SUCCESS);
    this.accountLocked = page.locator(LOGIN_LOCATORS.ACCOUNT_LOCKED);
    this.emailError = page.locator(LOGIN_LOCATORS.EMAIL_ERROR);
    this.sessionExpired = page.locator(LOGIN_LOCATORS.SESSION_EXPIRED);
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