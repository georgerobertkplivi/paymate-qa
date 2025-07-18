export const DASHBOARD_LOCATORS = {
  BALANCE_AMOUNT: '[data-testid="balance-amount"]',
  SEND_MONEY_BUTTON: '[data-testid="send-money-button"]',
  REQUEST_MONEY_BUTTON: '[data-testid="request-money-button"]',
  RECENT_TRANSACTIONS: '[data-testid="recent-transactions"]',
  QUICK_ACTIONS_MENU: '[data-testid="quick-actions-menu"]',
  NOTIFICATIONS_BELL: '[data-testid="notifications-bell"]',
  PROFILE_MENU: '[data-testid="profile-menu"]',
  TRANSACTION_LIST: '[data-testid="transaction-list"]',
  TRANSACTION_ITEM: '[data-testid="transaction-item"]',
  FILTERED_RESULTS: '[data-testid="filtered-results"]',
  RESET_FILTERS: '[data-testid="reset-filters"]',
  DELETE_TRANSACTION: '[data-testid="delete-transaction"]',
  CONFIRM_DELETE: '[data-testid="confirm-delete"]',
  DELETE_SUCCESS: '[data-testid="delete-success"]',
  SUCCESS_MESSAGE: '[data-testid="success-message"]',
  ERROR_MESSAGE: '[data-testid="error-message"]',
  SCHEDULE_SUCCESS: '[data-testid="schedule-success"]',
  NEXT_PAGE: '[data-testid="next-page"]',
  PAGE_INDICATOR: '[data-testid="page-2"]',
  EXPORT_BUTTON: '[data-testid="export-button"]',
  CONFIRM_EXPORT: '[data-testid="confirm-export"]',
  ACTIVE_FILTERS: '[data-testid="active-filters"]',
  AMOUNT_INPUT: '[data-testid="amount-input"]',
  RECIPIENT_INPUT: '[data-testid="recipient-input"]',
  NOTE_INPUT: '[data-testid="note-input"]',
  CURRENCY_SELECT: '[data-testid="currency-select"]',
  SCHEDULE_DATE: '[data-testid="schedule-date"]',
  SEND_MONEY_SUBMIT: '[data-testid="send-money-submit"]',
  REQUESTER_INPUT: '[data-testid="requester-input"]',
  REQUEST_MONEY_SUBMIT: '[data-testid="request-money-submit"]',
  VIEW_ALL_TRANSACTIONS: '[data-testid="view-all-transactions"]',
  NOTIFICATIONS_LIST: '[data-testid="notifications-list"]',
  QUICK_ACTION: (action: string) => `[data-testid="quick-action-${action}"]`,
  START_DATE: '[data-testid="start-date"]',
  END_DATE: '[data-testid="end-date"]',
  APPLY_DATE_FILTER: '[data-testid="apply-date-filter"]',
  TYPE_FILTER: '[data-testid="type-filter"]',
  SEARCH_INPUT: '[data-testid="search-input"]',
  SEARCH_BUTTON: '[data-testid="search-button"]'
};

export const TRANSACTION_HISTORY_LOCATORS = {
  TRANSACTION_LIST: '[data-testid="transaction-list"]',
  FILTER_BUTTON: '[data-testid="filter-button"]',
  DATE_RANGE_PICKER: '[data-testid="date-range-picker"]',
  TRANSACTION_TYPE_FILTER: '[data-testid="transaction-type-filter"]',
  TRANSACTION_SEARCH: '[data-testid="transaction-search"]',
  EXPORT_TRANSACTIONS: '[data-testid="export-transactions"]',
  PAGINATION_CONTROLS: '[data-testid="pagination-controls"]',
  START_DATE: '[data-testid="start-date"]',
  END_DATE: '[data-testid="end-date"]',
  APPLY_DATE_FILTER: '[data-testid="apply-date-filter"]',
  EXPORT_FORMAT: (format: string) => `[data-testid="export-${format}"]`,
  TRANSACTION_ITEM: (index: number) => `[data-testid="transaction-item-${index}"]`,
  TRANSACTION_AMOUNT: '[data-testid="transaction-amount"]',
  TRANSACTION_TYPE: '[data-testid="transaction-type"]',
  TRANSACTION_DATE: '[data-testid="transaction-date"]',
  TRANSACTION_STATUS: '[data-testid="transaction-status"]',
  PAGE_NUMBER: (page: number) => `[data-testid="page-${page}"]`,
  TOTAL_TRANSACTIONS: '[data-testid="total-transactions"]'
};

export const REGISTRATION_LOCATORS = {
  EMAIL: '[data-testid="email"]',
  PASSWORD: '[data-testid="password"]',
  FIRST_NAME: '[data-testid="firstName"]',
  LAST_NAME: '[data-testid="lastName"]',
  PHONE: '[data-testid="phone"]',
  REGISTER_BUTTON: '[data-testid="register-button"]',
  REGISTRATION_SUCCESS: '[data-testid="registration-success"]',
  VALIDATION_ERROR: '[data-testid="validation-error"]',
  PASSWORD_STRENGTH_ERROR: '[data-testid="password-strength-error"]',
  EMAIL_EXISTS_ERROR: '[data-testid="email-exists-error"]',
  PHONE_ERROR: '[data-testid="phone-error"]',
  CONCURRENT_REGISTRATION_ERROR: '[data-testid="concurrent-registration-error"]'
};

export const LOGIN_LOCATORS = {
  EMAIL: '[data-testid="email"]',
  PASSWORD: '[data-testid="password"]',
  REMEMBER_ME: '[data-testid="remember-me"]',
  LOGIN_BUTTON: '[data-testid="login-button"]',
  FORGOT_PASSWORD: '[data-testid="forgot-password"]',
  RESET_EMAIL: '[data-testid="reset-email"]',
  RESET_SUBMIT: '[data-testid="reset-submit"]',
  DASHBOARD: '.dashboard',
  ERROR_MESSAGE: '[data-testid="error-message"]',
  RESET_SUCCESS: '[data-testid="reset-success"]',
  ACCOUNT_LOCKED: '[data-testid="account-locked"]',
  EMAIL_ERROR: '[data-testid="email-error"]',
  SESSION_EXPIRED: '[data-testid="session-expired"]'
}; 