#!/bin/bash

export ACM_CERTIFICATE_ARN="arn"
export AWS_ACCOUNT_ID="123456789"
export AWS_ACCESS_KEY_ID="abc123"
export AWS_REGION="local"
export AWS_SECRET_ACCESS_KEY="abc123"
export DOMAIN_NAME="localhost:5173"

serverless offline start --reloadHandler --stage dev