import { Page, Locator } from '@playwright/test';
import { TRANSACTION_HISTORY_LOCATORS } from '../constants/locators';

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
    this.transactionList = page.locator(TRANSACTION_HISTORY_LOCATORS.TRANSACTION_LIST);
    this.filterButton = page.locator(TRANSACTION_HISTORY_LOCATORS.FILTER_BUTTON);
    this.dateRangePicker = page.locator(TRANSACTION_HISTORY_LOCATORS.DATE_RANGE_PICKER);
    this.transactionTypeFilter = page.locator(TRANSACTION_HISTORY_LOCATORS.TRANSACTION_TYPE_FILTER);
    this.searchInput = page.locator(TRANSACTION_HISTORY_LOCATORS.TRANSACTION_SEARCH);
    this.exportButton = page.locator(TRANSACTION_HISTORY_LOCATORS.EXPORT_TRANSACTIONS);
    this.paginationControls = page.locator(TRANSACTION_HISTORY_LOCATORS.PAGINATION_CONTROLS);
  }

  async goto() {
    await this.page.goto('/transactions');
  }

  async filterByDateRange(startDate: string, endDate: string) {
    await this.filterButton.click();
    await this.dateRangePicker.click();
    await this.page.locator(TRANSACTION_HISTORY_LOCATORS.START_DATE).fill(startDate);
    await this.page.locator(TRANSACTION_HISTORY_LOCATORS.END_DATE).fill(endDate);
    await this.page.locator(TRANSACTION_HISTORY_LOCATORS.APPLY_DATE_FILTER).click();
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
    await this.page.locator(TRANSACTION_HISTORY_LOCATORS.EXPORT_FORMAT(format)).click();
  }

  async getTransactionDetails(index: number) {
    const transaction = this.transactionList.locator(TRANSACTION_HISTORY_LOCATORS.TRANSACTION_ITEM(index));
    return {
      amount: await transaction.locator(TRANSACTION_HISTORY_LOCATORS.TRANSACTION_AMOUNT).textContent(),
      type: await transaction.locator(TRANSACTION_HISTORY_LOCATORS.TRANSACTION_TYPE).textContent(),
      date: await transaction.locator(TRANSACTION_HISTORY_LOCATORS.TRANSACTION_DATE).textContent(),
      status: await transaction.locator(TRANSACTION_HISTORY_LOCATORS.TRANSACTION_STATUS).textContent(),
    };
  }

  async goToPage(pageNumber: number) {
    await this.paginationControls.locator(TRANSACTION_HISTORY_LOCATORS.PAGE_NUMBER(pageNumber)).click();
  }

  async getTotalTransactions(): Promise<number> {
    const countText = await this.page.locator(TRANSACTION_HISTORY_LOCATORS.TOTAL_TRANSACTIONS).textContent();
    return parseInt(countText?.replace(/[^0-9]/g, '') || '0', 10);
  }
} 