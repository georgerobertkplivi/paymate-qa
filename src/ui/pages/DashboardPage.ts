import { Page, Locator } from '@playwright/test';

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
    this.balanceAmount = page.locator('[data-testid="balance-amount"]');
    this.sendMoneyButton = page.locator('[data-testid="send-money-button"]');
    this.requestMoneyButton = page.locator('[data-testid="request-money-button"]');
    this.recentTransactionsList = page.locator('[data-testid="recent-transactions"]');
    this.quickActionsMenu = page.locator('[data-testid="quick-actions-menu"]');
    this.notificationsBell = page.locator('[data-testid="notifications-bell"]');
    this.profileMenu = page.locator('[data-testid="profile-menu"]');
    this.transactionList = page.locator('[data-testid="transaction-list"]');
    this.transactionItem = page.locator('[data-testid="transaction-item"]');
    this.filteredResults = page.locator('[data-testid="filtered-results"]');
    this.resetFiltersButton = page.locator('[data-testid="reset-filters"]');
    this.deleteTransactionButton = page.locator('[data-testid="delete-transaction"]');
    this.confirmDeleteButton = page.locator('[data-testid="confirm-delete"]');
    this.deleteSuccessMessage = page.locator('[data-testid="delete-success"]');
    this.successMessage = page.locator('[data-testid="success-message"]');
    this.errorMessage = page.locator('[data-testid="error-message"]');
    this.scheduleSuccessMessage = page.locator('[data-testid="schedule-success"]');
    this.nextPageButton = page.locator('[data-testid="next-page"]');
    this.pageIndicator = page.locator('[data-testid="page-2"]');
    this.exportButton = page.locator('[data-testid="export-button"]');
    this.confirmExportButton = page.locator('[data-testid="confirm-export"]');
    this.activeFilters = page.locator('[data-testid="active-filters"]');
  }

  async goto() {
    await this.page.goto('/dashboard');
  }

  async getBalance(): Promise<string> {
    return await this.balanceAmount.textContent() || '0';
  }

  async sendMoney(amount: string, recipient: string, note?: string, currency?: string, scheduleDate?: Date) {
    await this.sendMoneyButton.click();
    await this.page.locator('[data-testid="amount-input"]').fill(amount);
    await this.page.locator('[data-testid="recipient-input"]').fill(recipient);
    if (note) {
      await this.page.locator('[data-testid="note-input"]').fill(note);
    }
    if (currency) {
      await this.page.locator('[data-testid="currency-select"]').selectOption(currency);
    }
    if (scheduleDate) {
      await this.page.locator('[data-testid="schedule-date"]').fill(scheduleDate.toISOString().split('T')[0]);
    }
    await this.page.locator('[data-testid="send-money-submit"]').click();
  }

  async requestMoney(amount: string, requester: string, note?: string) {
    await this.requestMoneyButton.click();
    await this.page.locator('[data-testid="amount-input"]').fill(amount);
    await this.page.locator('[data-testid="requester-input"]').fill(requester);
    if (note) {
      await this.page.locator('[data-testid="note-input"]').fill(note);
    }
    await this.page.locator('[data-testid="request-money-submit"]').click();
  }

  async viewTransactionHistory() {
    await this.page.locator('[data-testid="view-all-transactions"]').click();
  }

  async checkNotifications() {
    await this.notificationsBell.click();
    return await this.page.locator('[data-testid="notifications-list"]').isVisible();
  }

  async openProfileMenu() {
    await this.profileMenu.click();
  }

  async isQuickActionAvailable(action: string): Promise<boolean> {
    await this.quickActionsMenu.click();
    return await this.page.locator(`[data-testid="quick-action-${action}"]`).isVisible();
  }

  async filterByDateRange(startDate: Date, endDate: Date) {
    await this.page.locator('[data-testid="start-date"]').fill(startDate.toISOString().split('T')[0]);
    await this.page.locator('[data-testid="end-date"]').fill(endDate.toISOString().split('T')[0]);
    await this.page.locator('[data-testid="apply-date-filter"]').click();
  }

  async filterByType(type: string) {
    await this.page.locator('[data-testid="type-filter"]').selectOption(type);
  }

  async searchTransactions(query: string) {
    await this.page.locator('[data-testid="search-input"]').fill(query);
    await this.page.locator('[data-testid="search-button"]').click();
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