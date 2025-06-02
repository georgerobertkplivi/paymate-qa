#!/bin/bash

# Validate parameters
if [ -z "$1" ] || [ -z "$2" ]; then
    echo "Error: Test suite and environment not specified"
    echo "Usage: ./run_test_suite.sh <TEST_SUITE> <ENVIRONMENT>"
    echo "Test Suites:"
    echo "  - Smoke    (Critical path tests)"
    echo "  - Sanity   (Basic functionality tests)"
    echo "  - Regression (All tests)"
    echo "Environments: TEST_ENV, STAGING_ENV"
    exit 1
fi

# Set API base URL based on environment
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

# Map test suite to test files
case "$1" in
    "Smoke")
        # Critical path tests
        TEST_FILES=(
            "src/tests/ui/login.spec.ts"
            "src/tests/ui/registration.spec.ts"
            "src/tests/api/cleanup.spec.ts"
        )
        ;;
    "Sanity")
        # Basic functionality tests
        TEST_FILES=(
            "src/tests/ui/login.spec.ts"
            "src/tests/ui/registration.spec.ts"
            "src/tests/ui/send-money.spec.ts"
            "src/tests/ui/transaction-history.spec.ts"
            "src/tests/api/cleanup.spec.ts"
        )
        ;;
    "Regression")
        # All tests
        TEST_FILES=(
            "src/tests/**/*.spec.ts"
            "src/performance/*.k6.ts"
        )
        ;;
    *)
        echo "Error: Invalid test suite. Use one of: Smoke, Sanity, Regression"
        exit 1
        ;;
esac

# Run tests
echo "Running $1 tests in $2 environment..."
for test_file in "${TEST_FILES[@]}"; do
    echo "Running tests in $test_file..."
    if [[ $test_file == *.k6.ts ]]; then
        k6 run $test_file
    else
        npx playwright test $test_file --reporter=list,allure-playwright
    fi
done

# Generate Allure report
if [[ "$1" != "Smoke" ]]; then
    echo "Generating Allure report..."
    npx allure generate --clean ./allure-results && npx allure open ./allure-report
fi 