import http from 'k6/http';
import { check, sleep } from 'k6';
import { options, BASE_URL, TEST_DATA, registrationSuccessRate, registrationDuration, validationDuration, concurrentRegistrationDuration } from '../../config/performance.config';
import { faker } from '@faker-js/faker';

// Smoke Test: Basic Registration Performance
export function basicRegistration() {
  const startTime = new Date().getTime();
  const response = http.post(`${BASE_URL}/api/register`, JSON.stringify(TEST_DATA.valid), {
    headers: { 'Content-Type': 'application/json' },
  });

  registrationSuccessRate.add(response.status === 200);
  registrationDuration.add(new Date().getTime() - startTime);

  check(response, {
    'status is 200': (r) => r.status === 200,
    'response time < 2000ms': (r) => r.timings.duration < 2000,
  });

  sleep(1);
}

// Sanity Test: Validation Performance
export function validationPerformance() {
  const startTime = new Date().getTime();
  const response = http.post(`${BASE_URL}/api/register/validate`, JSON.stringify(TEST_DATA.invalid), {
    headers: { 'Content-Type': 'application/json' },
  });

  validationDuration.add(new Date().getTime() - startTime);

  check(response, {
    'status is 400': (r) => r.status === 400,
    'response time < 1000ms': (r) => r.timings.duration < 1000,
    'has validation errors': (r) => Boolean(r.body) && JSON.parse(r.body as string).errors.length > 0,
  });

  sleep(1);
}

// Regression Test: Concurrent Registration Performance
export function concurrentRegistration() {
  const startTime = new Date().getTime();
  const payload = {
    ...TEST_DATA.valid,
    email: faker.internet.email(), // Unique email for each request
  };

  const response = http.post(`${BASE_URL}/api/register`, JSON.stringify(payload), {
    headers: { 'Content-Type': 'application/json' },
  });

  concurrentRegistrationDuration.add(new Date().getTime() - startTime);

  check(response, {
    'status is 200 or 409': (r) => r.status === 200 || r.status === 409,
    'response time < 3000ms': (r) => r.timings.duration < 3000,
  });

  sleep(1);
}

// Load Test: High Volume Registration
export function highVolumeRegistration() {
  const payload = {
    ...TEST_DATA.valid,
    email: faker.internet.email(),
  };

  const response = http.post(`${BASE_URL}/api/register`, JSON.stringify(payload), {
    headers: { 'Content-Type': 'application/json' },
  });

  check(response, {
    'status is 200': (r) => r.status === 200,
    'response time < 2000ms': (r) => r.timings.duration < 2000,
  });

  sleep(0.5); // Shorter sleep for higher volume
}

// Stress Test: System Under Load
export function stressTest() {
  const payload = {
    ...TEST_DATA.valid,
    email: faker.internet.email(),
  };

  const response = http.post(`${BASE_URL}/api/register`, JSON.stringify(payload), {
    headers: { 'Content-Type': 'application/json' },
  });

  check(response, {
    'status is 200 or 429': (r) => r.status === 200 || r.status === 429,
    'response time < 5000ms': (r) => r.timings.duration < 5000,
  });

  sleep(0.2); // Minimal sleep for stress testing
}

// Default function that runs all tests
export default function() {
  basicRegistration();
  validationPerformance();
  concurrentRegistration();
  highVolumeRegistration();
  stressTest();
} 