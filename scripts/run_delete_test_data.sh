#!/bin/bash

# Validate environment parameter
if [ -z "$1" ]; then
    echo "Error: Environment not specified"
    echo "Usage: ./run_delete_test_data.sh <ENVIRONMENT>"
    echo "Environments: TEST_ENV, STAGING_ENV"
    exit 1
fi

# Set API base URL based on environment
case "$1" in
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

# Run cleanup tests
echo "Running cleanup tests for $1 environment..."
npx playwright test src/tests/api/cleanup.spec.ts 