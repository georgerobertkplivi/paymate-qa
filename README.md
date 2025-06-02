# Paymate QA Automation Framework

## Overview
Automated UI, API, and performance testing framework using Playwright, K6, and Allure. Supports multiple environments and comprehensive test data management.

For detailed test strategy and approach, see [Test Strategy Document](docs/test-strategy.md).

## Project Structure
```
src/
  tests/
    ui/          # UI test suites
    api/         # API test suites
    performance/ # K6 performance tests
  ui/
    pages/       # Page Object Models
  api/
    endpoints/   # API endpoints
  data/
    ui/          # UI test data
    api/         # API test data
  utils/         # Shared utilities
  config/        # Configuration files
scripts/         # Test execution scripts
```

## Setup
1. Install dependencies:
   ```bash
   npm install
   ```
2. Install Playwright browsers:
   ```bash
   npx playwright install
   ```
3. Install K6 (for performance):
   ```bash
   sudo apt install k6
   ```

## Running Tests

### Environment Selection
Tests can be run in two environments:
- `TEST_ENV`: Test environment
- `STAGING_ENV`: Staging environment

### Test Suites
Three test suite options are available:
1. **Smoke Tests** (Critical path)
   - Login
   - Registration
   - Basic API cleanup

2. **Sanity Tests** (Basic functionality)
   - All Smoke tests
   - Send Money
   - Transaction History

3. **Regression Tests** (Full suite)
   - All UI tests
   - All API tests
   - Performance tests

### Test Execution
Run test suites:
```bash
# Smoke tests
./scripts/run_test_suite.sh Smoke TEST_ENV
./scripts/run_test_suite.sh Smoke STAGING_ENV

# Sanity tests
./scripts/run_test_suite.sh Sanity TEST_ENV
./scripts/run_test_suite.sh Sanity STAGING_ENV

# Regression tests
./scripts/run_test_suite.sh Regression TEST_ENV
./scripts/run_test_suite.sh Regression STAGING_ENV
```

### Individual Test Execution
Run specific test files:
```bash
./scripts/run_test.sh Registration TEST_ENV
./scripts/run_test.sh Login STAGING_ENV
./scripts/run_test.sh SendMoney TEST_ENV
./scripts/run_test.sh TransactionHistory STAGING_ENV
./scripts/run_test.sh Cleanup TEST_ENV
```

### Performance Tests
Run performance tests:
```bash
# Default (TEST environment)
./scripts/run_performance_tests.sh

# With custom environment and API URL
./scripts/run_performance_tests.sh STAGING https://staging-api.example.com
```

Performance test metrics:
- Registration success rate > 95%
- Registration duration < 2s (95th percentile)
- Validation duration < 1s (95th percentile)
- Concurrent registration duration < 3s (95th percentile)
- HTTP request duration < 2s (95th percentile)
- Failed requests < 1%

### Test Data Cleanup
Clean up test data for specific environment:
```bash
./scripts/run_delete_test_data.sh TEST_ENV
./scripts/run_delete_test_data.sh STAGING_ENV
```

## Features
- Environment-specific test execution
- Multiple test suite options
- Automatic test data cleanup
- Page Object Model implementation
- API endpoint management
- Random test data generation
- Allure reporting integration
- K6 performance testing
- Custom performance metrics
- JSON test results export

## Reporting
Allure reports are generated automatically after test execution. View reports:
```bash
npx allure open ./allure-report
```

Performance test results are saved in JSON format:
```
results/performance_TEST_20240321_123456.json
results/performance_STAGING_20240321_123456.json
```

## CI/CD
See `.github/workflows/qa.yml` for GitHub Actions integration.

## Test Cases
- See `test-cases.csv` for test case documentation.

--- 