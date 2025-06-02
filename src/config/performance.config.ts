import { Rate, Trend } from 'k6/metrics';
import { Options } from 'k6/options';
import { faker } from '@faker-js/faker';

// Custom metrics
export const registrationSuccessRate = new Rate('registration_success_rate');
export const registrationDuration = new Trend('registration_duration');
export const validationDuration = new Trend('validation_duration');
export const concurrentRegistrationDuration = new Trend('concurrent_registration_duration');

// Test configuration
export const options: Options = {
  stages: [
    { duration: '1m', target: 50 },  // Ramp up to 50 users
    { duration: '3m', target: 50 },  // Stay at 50 users
    { duration: '1m', target: 0 },   // Ramp down to 0 users
  ],
  thresholds: {
    'registration_success_rate': ['rate>0.95'],  // 95% success rate
    'registration_duration': ['p(95)<2000'],    // 95% of requests under 2s
    'validation_duration': ['p(95)<1000'],      // 95% of validations under 1s
    'concurrent_registration_duration': ['p(95)<3000'], // 95% of concurrent requests under 3s
    'http_req_duration': ['p(95)<2000'],        // 95% of HTTP requests under 2s
    'http_req_failed': ['rate<0.01'],           // Less than 1% failed requests
  },
};

// Test data
export const BASE_URL = __ENV.API_URL || 'http://localhost:3000';
export const TEST_DATA = {
  valid: {
    email: faker.internet.email(),
    password: 'Test123!',
    firstName: 'John',
    lastName: 'Doe'
  },
  invalid: {
    email: 'invalid-email',
    password: '123',
    firstName: '',
    lastName: ''
  }
}; 