// Centralized configuration for all API endpoints
export class ApiEndpoints {
  // Base URL for API requests, defaults to production if not set
  private static readonly BASE_URL = process.env.API_BASE_URL || 'https://api.paymate.com';

  // Authentication-related endpoints
  static readonly AUTH = {
    LOGIN: `${ApiEndpoints.BASE_URL}/auth/login`,
    REGISTER: `${ApiEndpoints.BASE_URL}/auth/register`,
    LOGOUT: `${ApiEndpoints.BASE_URL}/auth/logout`,
    VERIFY_EMAIL: `${ApiEndpoints.BASE_URL}/auth/verify-email`,
  };

  // User-related endpoints
  static readonly USER = {
    PROFILE: `${ApiEndpoints.BASE_URL}/user/profile`,
    SETTINGS: `${ApiEndpoints.BASE_URL}/user/settings`,
    PASSWORD: `${ApiEndpoints.BASE_URL}/user/password`,
    TRANSACTIONS: `${ApiEndpoints.BASE_URL}/user/transactions`,
    RESET_PROFILE: `${ApiEndpoints.BASE_URL}/user/reset-profile`,
    RESET_FILTERS: `${ApiEndpoints.BASE_URL}/user/reset-filters`,
    FILTERS: `${ApiEndpoints.BASE_URL}/user/filters`,
  };
} 