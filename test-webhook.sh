#!/bin/bash

# Test webhook with a sample PDF URL
# Replace YOUR_WEBHOOK_SECRET with your actual secret from .env

WEBHOOK_SECRET="YOUR_WEBHOOK_SECRET_HERE"
WEBHOOK_URL="http://localhost:3000/api/webhook/report"  # Change to your deployed URL

# Test with a public PDF
curl -X POST "$WEBHOOK_URL" \
  -H "Authorization: Bearer $WEBHOOK_SECRET" \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Test User - '$(date +%H:%M:%S)'",
    "email": "test-'$(date +%s)'@example.com",
    "score": 95,
    "clientPdfUrl": "https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf"
  }' \
  -w "\nHTTP Status: %{http_code}\n" \
  -v

echo ""
echo "Check:"
echo "1. Vercel logs for [webhook/report] messages"
echo "2. Supabase Storage 'reports' bucket for new file"
echo "3. Supabase 'assessments' table for new row with Supabase URL"
