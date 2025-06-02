#!/bin/bash

# Validates required parameters for test execution
if [ -z "$1" ] || [ -z "$2" ]; then
    echo "Error: Test suite and environment not specified"
    echo "Usage: ./run_test.sh <TEST_SUITE> <ENVIRONMENT>"
    echo "Test Suites:"
    echo "  - Registration"
    echo "  - Login"
    echo "  - SendMoney"
    echo "  - TransactionHistory"
    echo "  - Cleanup"
    echo "  - All"
    echo "Environments: TEST_ENV, STAGING_ENV"
    exit 1
fi

# Sets API base URL based on selected environment
case "$2" in
    "TEST_ENV")
        export API_BASE_URL="https://test-api.paymate.com"
        ;;
    "STAGING_ENV")
        export API_BASE_URL="https://staging-api.paymate.com"
        ;;
    *)
        echo "Error: Invalid environment. Use TEST_ENV or STAGING_ENV"
        exit 1
        ;;
esac

# Maps test suite name to corresponding test file
case "$1" in
    "Registration")
        TEST_PATH="src/tests/ui/registration.spec.ts"
        ;;
    "Login")
        TEST_PATH="src/tests/ui/login.spec.ts"
        ;;
    "SendMoney")
        TEST_PATH="src/tests/ui/send-money.spec.ts"
        ;;
    "TransactionHistory")
        TEST_PATH="src/tests/ui/transaction-history.spec.ts"
        ;;
    "Cleanup")
        TEST_PATH="src/tests/api/cleanup.spec.ts"
        ;;
    "All")
        TEST_PATH="src/tests/**/*.spec.ts"
        ;;
    *)
        echo "Error: Invalid test suite. Use one of: Registration, Login, SendMoney, TransactionHistory, Cleanup, All"
        exit 1
        ;;
esac

# Executes the selected test suite
echo "Running $1 tests in $2 environment..."
npx playwright test $TEST_PATH

run_ui_test() {
  npx playwright test src/tests/ui/$1.spec.ts --reporter=list,allure-playwright
}

run_api_test() {
  npx playwright test src/tests/api/$1.spec.ts --reporter=list,allure-playwright
}

run_performance_test() {
  k6 run src/performance/$1.k6.ts
}

generate_allure_report() {
  npx allure generate --clean ./allure-results && npx allure open ./allure-report
}

case $TEST_TYPE in
  registration)
    run_ui_test registration
    generate_allure_report
    ;;
  login)
    run_ui_test login
    generate_allure_report
    ;;
  all)
    npx playwright test src/tests/ui --reporter=list,allure-playwright
    generate_allure_report
    ;;
  api)
    npx playwright test src/tests/api --reporter=list,allure-playwright
    generate_allure_report
    ;;
  performance)
    run_performance_test registration
    ;;
  *)
    echo "Usage: $0 {registration|login|all|api|performance}"
    exit 1
    ;;
esac 