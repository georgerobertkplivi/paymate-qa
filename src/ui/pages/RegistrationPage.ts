import { Page, Locator } from '@playwright/test';
import { REGISTRATION_LOCATORS } from '../constants/locators';

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
    this.emailInput = page.locator(REGISTRATION_LOCATORS.EMAIL);
    this.passwordInput = page.locator(REGISTRATION_LOCATORS.PASSWORD);
    this.firstNameInput = page.locator(REGISTRATION_LOCATORS.FIRST_NAME);
    this.lastNameInput = page.locator(REGISTRATION_LOCATORS.LAST_NAME);
    this.phoneInput = page.locator(REGISTRATION_LOCATORS.PHONE);
    this.registerButton = page.locator(REGISTRATION_LOCATORS.REGISTER_BUTTON);
    this.registrationSuccess = page.locator(REGISTRATION_LOCATORS.REGISTRATION_SUCCESS);
    this.validationError = page.locator(REGISTRATION_LOCATORS.VALIDATION_ERROR);
    this.passwordStrengthError = page.locator(REGISTRATION_LOCATORS.PASSWORD_STRENGTH_ERROR);
    this.emailExistsError = page.locator(REGISTRATION_LOCATORS.EMAIL_EXISTS_ERROR);
    this.phoneError = page.locator(REGISTRATION_LOCATORS.PHONE_ERROR);
    this.concurrentRegistrationError = page.locator(REGISTRATION_LOCATORS.CONCURRENT_REGISTRATION_ERROR);
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