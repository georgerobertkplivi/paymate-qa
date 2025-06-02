// @ts-ignore
import http from 'k6/http';
// @ts-ignore
import { check, sleep, group } from 'k6';
// @ts-ignore
import { Rate, Trend } from 'k6/metrics';
import { faker } from '@faker-js/faker';
import { ApiEndpoints } from '../api/endpoints/ApiEndpoints';

// Custom metrics
const registrationSuccessRate = new Rate('registration_success_rate');
const registrationDuration = new Trend('registration_duration');
const validationErrorRate = new Rate('validation_error_rate');

declare const __ENV: {
  BASE_URL?: string;
  VUS?: string;
  DURATION?: string;
};

// Performance test configuration
export const options = {
  stages: [
    { duration: '1m', target: 50 },  // Ramp up to 50 users
    { duration: '3m', target: 50 },  // Stay at 50 users
    { duration: '1m', target: 100 }, // Ramp up to 100 users
    { duration: '3m', target: 100 }, // Stay at 100 users
    { duration: '1m', target: 0 },   // Ramp down to 0 users
  ],
  thresholds: {
    'registration_success_rate': ['rate>0.95'],  // 95% success rate required
    'registration_duration': ['p(95)<2000'],     // 95% of requests under 2s
    'validation_error_rate': ['rate<0.05'],      // Less than 5% validation errors
    'http_req_duration': ['p(95)<3000'],         // 95% of requests under 3s
    'http_req_failed': ['rate<0.1'],             // Less than 10% failed requests
  },
};

interface TestData {
  email: string;
  password: string;
  firstName: string;
  lastName: string;
  phone: string;
}

// Test data generation
function generateTestData(): TestData {
  return {
    email: faker.internet.email(),
    password: faker.internet.password({ length: 12, memorable: true }),
    firstName: faker.person.firstName(),
    lastName: faker.person.lastName(),
    phone: faker.phone.number(),
  };
}

// Main test function
export default function () {
  const baseUrl = __ENV.BASE_URL || 'http://localhost:3000';
  const testData = generateTestData();

  // Registration flow
  group('Registration Flow', function () {
    // Step 1: Initial registration
    const registrationStart = Date.now();
    const registerUrl = `${baseUrl}${ApiEndpoints.AUTH.REGISTER}`;
    const registerPayload = JSON.stringify({
      email: testData.email,
      password: testData.password,
      firstName: testData.firstName,
      lastName: testData.lastName,
      phone: testData.phone,
    });
    const registerParams = { 
      headers: { 'Content-Type': 'application/json' },
      tags: { name: 'registration' }
    };

    const registerRes = http.post(registerUrl, registerPayload, registerParams);
    registrationDuration.add(Date.now() - registrationStart);

    // Check registration response
    const registrationSuccess = check(registerRes, {
      'registration successful': (r: any) => r.status === 200,
      'response has token': (r: any) => JSON.parse(r.body).token !== undefined,
      'response time OK': (r: any) => r.timings.duration < 2000,
    });

    registrationSuccessRate.add(registrationSuccess);

    // Step 2: Verify email (simulated)
    if (registrationSuccess) {
      const verifyUrl = `${baseUrl}${ApiEndpoints.AUTH.VERIFY_EMAIL}`;
      const verifyPayload = JSON.stringify({ email: testData.email });
      const verifyRes = http.post(verifyUrl, verifyPayload, registerParams);

      check(verifyRes, {
        'verification successful': (r: any) => r.status === 200,
      });
    }

    // Step 3: Attempt duplicate registration (negative test)
    const duplicateRes = http.post(registerUrl, registerPayload, registerParams);
    const validationError = check(duplicateRes, {
      'duplicate registration rejected': (r: any) => r.status === 400,
    });

    validationErrorRate.add(validationError);
  });

  // Think time between iterations
  sleep(Math.random() * 3 + 1);
} 