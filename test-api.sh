#!/bin/bash

# Demo script to test the API functionality
echo "=== Resume Ecosystem API Demo ==="

BASE_URL="http://localhost:3000"

echo "1. Health Check"
curl -s "$BASE_URL/health" | jq

echo -e "\n2. Register User"
REGISTER_RESPONSE=$(curl -s -X POST "$BASE_URL/api/auth/register" \
  -H "Content-Type: application/json" \
  -d '{"email":"demo@example.com","password":"password123","firstName":"John","lastName":"Doe"}')

TOKEN=$(echo $REGISTER_RESPONSE | jq -r '.token')
echo $REGISTER_RESPONSE | jq

echo -e "\n3. Add Internship Achievement"
curl -s -X POST "$BASE_URL/api/resume/achievements" \
  -H "Authorization: Bearer $TOKEN" \
  -H "Content-Type: application/json" \
  -d '{"type":"internship","title":"Software Engineer Intern","organization":"Tech Corp","description":"Built REST APIs","skills":["JavaScript","Node.js","MongoDB"],"startDate":"2024-01-01","endDate":"2024-03-01"}' | jq

echo -e "\n4. Add Project Achievement"
curl -s -X POST "$BASE_URL/api/resume/achievements" \
  -H "Authorization: Bearer $TOKEN" \
  -H "Content-Type: application/json" \
  -d '{"type":"project","title":"E-commerce Platform","organization":"Personal","description":"Full-stack web application","skills":["React","Express","PostgreSQL"],"startDate":"2024-02-01","endDate":"2024-04-01"}' | jq

echo -e "\n5. Generate Resume Summary"
curl -s -X POST "$BASE_URL/api/resume/generate" \
  -H "Authorization: Bearer $TOKEN" | jq

echo -e "\n6. Get Complete Resume Data"
curl -s -X GET "$BASE_URL/api/resume" \
  -H "Authorization: Bearer $TOKEN" | jq
