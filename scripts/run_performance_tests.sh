#!/bin/bash

# Colors for output
GREEN='\033[0;32m'
RED='\033[0;31m'
NC='\033[0m' # No Color

# Check if K6 is installed
if ! command -v k6 &> /dev/null; then
    echo -e "${RED}Error: k6 is not installed. Please install it first.${NC}"
    echo "Installation guide: https://k6.io/docs/getting-started/installation"
    exit 1
fi

# Default values
ENV=${1:-"TEST"}
API_URL=${2:-"http://localhost:3000"}

# Validate environment
if [[ "$ENV" != "TEST" && "$ENV" != "STAGING" ]]; then
    echo -e "${RED}Error: Invalid environment. Use TEST or STAGING${NC}"
    exit 1
fi

echo -e "${GREEN}Running performance tests in $ENV environment${NC}"
echo "API URL: $API_URL"

# Run K6 tests
k6 run \
    --env API_URL=$API_URL \
    --out json=results/performance_${ENV}_$(date +%Y%m%d_%H%M%S).json \
    src/tests/performance/registration_performance.spec.ts

# Check if tests passed
if [ $? -eq 0 ]; then
    echo -e "${GREEN}Performance tests completed successfully${NC}"
else
    echo -e "${RED}Performance tests failed${NC}"
    exit 1
fi 