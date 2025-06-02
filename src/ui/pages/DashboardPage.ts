import { Page, Locator } from '@playwright/test';
import { DASHBOARD_LOCATORS } from '../constants/locators';

export class DashboardPage {
  readonly page: Page;
  readonly balanceAmount: Locator;
  readonly sendMoneyButton: Locator;
  readonly requestMoneyButton: Locator;
  readonly recentTransactionsList: Locator;
  readonly quickActionsMenu: Locator;
  readonly notificationsBell: Locator;
  readonly profileMenu: Locator;
  readonly transactionList: Locator;
  readonly transactionItem: Locator;
  readonly filteredResults: Locator;
  readonly resetFiltersButton: Locator;
  readonly deleteTransactionButton: Locator;
  readonly confirmDeleteButton: Locator;
  readonly deleteSuccessMessage: Locator;
  readonly successMessage: Locator;
  readonly errorMessage: Locator;
  readonly scheduleSuccessMessage: Locator;
  readonly nextPageButton: Locator;
  readonly pageIndicator: Locator;
  readonly exportButton: Locator;
  readonly confirmExportButton: Locator;
  readonly activeFilters: Locator;

  constructor(page: Page) {
    this.page = page;
    this.balanceAmount = page.locator(DASHBOARD_LOCATORS.BALANCE_AMOUNT);
    this.sendMoneyButton = page.locator(DASHBOARD_LOCATORS.SEND_MONEY_BUTTON);
    this.requestMoneyButton = page.locator(DASHBOARD_LOCATORS.REQUEST_MONEY_BUTTON);
    this.recentTransactionsList = page.locator(DASHBOARD_LOCATORS.RECENT_TRANSACTIONS);
    this.quickActionsMenu = page.locator(DASHBOARD_LOCATORS.QUICK_ACTIONS_MENU);
    this.notificationsBell = page.locator(DASHBOARD_LOCATORS.NOTIFICATIONS_BELL);
    this.profileMenu = page.locator(DASHBOARD_LOCATORS.PROFILE_MENU);
    this.transactionList = page.locator(DASHBOARD_LOCATORS.TRANSACTION_LIST);
    this.transactionItem = page.locator(DASHBOARD_LOCATORS.TRANSACTION_ITEM);
    this.filteredResults = page.locator(DASHBOARD_LOCATORS.FILTERED_RESULTS);
    this.resetFiltersButton = page.locator(DASHBOARD_LOCATORS.RESET_FILTERS);
    this.deleteTransactionButton = page.locator(DASHBOARD_LOCATORS.DELETE_TRANSACTION);
    this.confirmDeleteButton = page.locator(DASHBOARD_LOCATORS.CONFIRM_DELETE);
    this.deleteSuccessMessage = page.locator(DASHBOARD_LOCATORS.DELETE_SUCCESS);
    this.successMessage = page.locator(DASHBOARD_LOCATORS.SUCCESS_MESSAGE);
    this.errorMessage = page.locator(DASHBOARD_LOCATORS.ERROR_MESSAGE);
    this.scheduleSuccessMessage = page.locator(DASHBOARD_LOCATORS.SCHEDULE_SUCCESS);
    this.nextPageButton = page.locator(DASHBOARD_LOCATORS.NEXT_PAGE);
    this.pageIndicator = page.locator(DASHBOARD_LOCATORS.PAGE_INDICATOR);
    this.exportButton = page.locator(DASHBOARD_LOCATORS.EXPORT_BUTTON);
    this.confirmExportButton = page.locator(DASHBOARD_LOCATORS.CONFIRM_EXPORT);
    this.activeFilters = page.locator(DASHBOARD_LOCATORS.ACTIVE_FILTERS);
  }

  async goto() {
    await this.page.goto('/dashboard');
  }

  async getBalance(): Promise<string> {
    return await this.balanceAmount.textContent() || '0';
  }

  async sendMoney(amount: string, recipient: string, note?: string, currency?: string, scheduleDate?: Date) {
    await this.sendMoneyButton.click();
    await this.page.locator(DASHBOARD_LOCATORS.AMOUNT_INPUT).fill(amount);
    await this.page.locator(DASHBOARD_LOCATORS.RECIPIENT_INPUT).fill(recipient);
    if (note) {
      await this.page.locator(DASHBOARD_LOCATORS.NOTE_INPUT).fill(note);
    }
    if (currency) {
      await this.page.locator(DASHBOARD_LOCATORS.CURRENCY_SELECT).selectOption(currency);
    }
    if (scheduleDate) {
      await this.page.locator(DASHBOARD_LOCATORS.SCHEDULE_DATE).fill(scheduleDate.toISOString().split('T')[0]);
    }
    await this.page.locator(DASHBOARD_LOCATORS.SEND_MONEY_SUBMIT).click();
  }

  async requestMoney(amount: string, requester: string, note?: string) {
    await this.requestMoneyButton.click();
    await this.page.locator(DASHBOARD_LOCATORS.AMOUNT_INPUT).fill(amount);
    await this.page.locator(DASHBOARD_LOCATORS.REQUESTER_INPUT).fill(requester);
    if (note) {
      await this.page.locator(DASHBOARD_LOCATORS.NOTE_INPUT).fill(note);
    }
    await this.page.locator(DASHBOARD_LOCATORS.REQUEST_MONEY_SUBMIT).click();
  }

  async viewTransactionHistory() {
    await this.page.locator(DASHBOARD_LOCATORS.VIEW_ALL_TRANSACTIONS).click();
  }

  async checkNotifications() {
    await this.notificationsBell.click();
    return await this.page.locator(DASHBOARD_LOCATORS.NOTIFICATIONS_LIST).isVisible();
  }

  async openProfileMenu() {
    await this.profileMenu.click();
  }

  async isQuickActionAvailable(action: string): Promise<boolean> {
    await this.quickActionsMenu.click();
    return await this.page.locator(DASHBOARD_LOCATORS.QUICK_ACTION(action)).isVisible();
  }

  async filterByDateRange(startDate: Date, endDate: Date) {
    await this.page.locator(DASHBOARD_LOCATORS.START_DATE).fill(startDate.toISOString().split('T')[0]);
    await this.page.locator(DASHBOARD_LOCATORS.END_DATE).fill(endDate.toISOString().split('T')[0]);
    await this.page.locator(DASHBOARD_LOCATORS.APPLY_DATE_FILTER).click();
  }

  async filterByType(type: string) {
    await this.page.locator(DASHBOARD_LOCATORS.TYPE_FILTER).selectOption(type);
  }

  async searchTransactions(query: string) {
    await this.page.locator(DASHBOARD_LOCATORS.SEARCH_INPUT).fill(query);
    await this.page.locator(DASHBOARD_LOCATORS.SEARCH_BUTTON).click();
  }

  async deleteTransaction() {
    await this.deleteTransactionButton.first().click();
    await this.confirmDeleteButton.click();
  }

  async resetFilters() {
    await this.resetFiltersButton.click();
  }

  async exportTransactions() {
    await this.exportButton.click();
    const downloadPromise = this.page.waitForEvent('download');
    await this.confirmExportButton.click();
    return downloadPromise;
  }
} 