const API_BASE_URL = 'https://api.paymate-simulated.com';

export const ENDPOINTS = {
  DASHBOARD: '/dashboard',
  LOGIN: '/login',
  REGISTER: '/register',
  TRANSACTIONS: '/transactions',
  PROFILE: '/profile',
  SETTINGS: '/settings',
  NOTIFICATIONS: '/notifications',
  SEND_MONEY: '/send-money',
  REQUEST_MONEY: '/request-money',
  TRANSACTION_HISTORY: '/transaction-history',
  EXPORT: '/export',
  RESET_PASSWORD: '/reset-password',
  VERIFY_EMAIL: '/verify-email',
  TWO_FACTOR: '/2fa',
  SECURITY_SETTINGS: '/security-settings',
  PAYMENT_METHODS: '/payment-methods',
  CURRENCY_SETTINGS: '/currency-settings',
  API: {
    LOGIN: `${API_BASE_URL}/api/auth/login`,
    REGISTER: `${API_BASE_URL}/api/auth/register`,
    LOGOUT: `${API_BASE_URL}/api/auth/logout`,
    RESET_PASSWORD: `${API_BASE_URL}/api/auth/reset-password`,
    VERIFY_EMAIL: `${API_BASE_URL}/api/auth/verify-email`,
    SEND_MONEY: `${API_BASE_URL}/api/transactions/send`,
    REQUEST_MONEY: `${API_BASE_URL}/api/transactions/request`,
    TRANSACTIONS: `${API_BASE_URL}/api/transactions`,
    PROFILE: `${API_BASE_URL}/api/user/profile`,
    SETTINGS: `${API_BASE_URL}/api/user/settings`,
    NOTIFICATIONS: `${API_BASE_URL}/api/notifications`,
    EXPORT: `${API_BASE_URL}/api/export`,
    CURRENCIES: `${API_BASE_URL}/api/currencies`,
    PAYMENT_METHODS: `${API_BASE_URL}/api/payment-methods`
  }
}; 