import dotenv from 'dotenv';

dotenv.config();

export const TestData = {
  users: {
    valid: {
      email: process.env.TEST_VALID_EMAIL || 'test@example.com',
      password: process.env.TEST_VALID_PASSWORD || 'Test123!',
      firstName: process.env.TEST_FIRST_NAME || 'John',
      lastName: process.env.TEST_LAST_NAME || 'Doe'
    },
    invalid: {
      email: process.env.TEST_INVALID_EMAIL || 'invalid@email.com',
      password: process.env.TEST_INVALID_PASSWORD || 'wrongpassword',
      weakPassword: process.env.TEST_WEAK_PASSWORD || '123456',
      invalidPhone: process.env.TEST_INVALID_PHONE || '123'
    }
  },
  transactions: {
    amounts: {
      valid: process.env.TEST_VALID_AMOUNT || '100.00',
      insufficient: process.env.TEST_INSUFFICIENT_AMOUNT || '999999.00',
      minimum: process.env.TEST_MINIMUM_AMOUNT || '0.50',
      maximum: process.env.TEST_MAXIMUM_AMOUNT || '10000.00'
    },
    currencies: {
      default: process.env.TEST_DEFAULT_CURRENCY || 'USD',
      alternative: process.env.TEST_ALTERNATIVE_CURRENCY || 'EUR'
    }
  },
  timeouts: {
    session: parseInt(process.env.TEST_SESSION_TIMEOUT || '3600000'),
    pageLoad: parseInt(process.env.TEST_PAGE_LOAD_TIMEOUT || '30000')
  }
}; 