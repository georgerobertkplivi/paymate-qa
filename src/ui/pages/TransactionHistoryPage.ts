import { Page, Locator } from '@playwright/test';

export class TransactionHistoryPage {
  readonly page: Page;
  readonly transactionList: Locator;
  readonly filterButton: Locator;
  readonly dateRangePicker: Locator;
  readonly transactionTypeFilter: Locator;
  readonly searchInput: Locator;
  readonly exportButton: Locator;
  readonly paginationControls: Locator;

  constructor(page: Page) {
    this.page = page;
    this.transactionList = page.locator('[data-testid="transaction-list"]');
    this.filterButton = page.locator('[data-testid="filter-button"]');
    this.dateRangePicker = page.locator('[data-testid="date-range-picker"]');
    this.transactionTypeFilter = page.locator('[data-testid="transaction-type-filter"]');
    this.searchInput = page.locator('[data-testid="transaction-search"]');
    this.exportButton = page.locator('[data-testid="export-transactions"]');
    this.paginationControls = page.locator('[data-testid="pagination-controls"]');
  }

  async goto() {
    await this.page.goto('/transactions');
  }

  async filterByDateRange(startDate: string, endDate: string) {
    await this.filterButton.click();
    await this.dateRangePicker.click();
    await this.page.locator('[data-testid="start-date"]').fill(startDate);
    await this.page.locator('[data-testid="end-date"]').fill(endDate);
    await this.page.locator('[data-testid="apply-date-filter"]').click();
  }

  async filterByType(type: 'all' | 'sent' | 'received' | 'pending') {
    await this.filterButton.click();
    await this.transactionTypeFilter.selectOption(type);
  }

  async searchTransaction(query: string) {
    await this.searchInput.fill(query);
    await this.searchInput.press('Enter');
  }

  async exportTransactions(format: 'csv' | 'pdf') {
    await this.exportButton.click();
    await this.page.locator(`[data-testid="export-${format}"]`).click();
  }

  async getTransactionDetails(index: number) {
    const transaction = this.transactionList.locator(`[data-testid="transaction-item-${index}"]`);
    return {
      amount: await transaction.locator('[data-testid="transaction-amount"]').textContent(),
      type: await transaction.locator('[data-testid="transaction-type"]').textContent(),
      date: await transaction.locator('[data-testid="transaction-date"]').textContent(),
      status: await transaction.locator('[data-testid="transaction-status"]').textContent(),
    };
  }

  async goToPage(pageNumber: number) {
    await this.paginationControls.locator(`[data-testid="page-${pageNumber}"]`).click();
  }

  async getTotalTransactions(): Promise<number> {
    const countText = await this.page.locator('[data-testid="total-transactions"]').textContent();
    return parseInt(countText?.replace(/[^0-9]/g, '') || '0', 10);
  }
} 