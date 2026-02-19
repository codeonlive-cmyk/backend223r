# VLE Lambda Verification Function

## Overview
This Lambda function evaluates user submissions for course topics and provides intelligent feedback.

## Deployment Steps

### 1. Create Lambda Function in AWS Console

1. Go to AWS Lambda Console
2. Click "Create function"
3. Choose "Author from scratch"
4. Function name: `vle-verification-function`
5. Runtime: Node.js 18.x or later
6. Architecture: x86_64
7. Click "Create function"

### 2. Upload Function Code

**Option A: Direct Upload**
1. Copy the contents of `verificationFunction.js`
2. Paste into the Lambda code editor
3. Click "Deploy"

**Option B: ZIP Upload**
```bash
cd lambda
zip -r function.zip verificationFunction.js
# Upload via AWS Console or CLI
```

**Option C: AWS CLI**
```bash
aws lambda create-function \
  --function-name vle-verification-function \
  --runtime nodejs18.x \
  --role arn:aws:iam::YOUR_ACCOUNT_ID:role/lambda-execution-role \
  --handler verificationFunction.handler \
  --zip-file fileb://function.zip
```

### 3. Configure Lambda Settings

**Memory**: 256 MB (sufficient for text processing)
**Timeout**: 30 seconds
**Environment Variables**: None required

### 4. Create IAM Role

The Lambda function needs basic execution permissions:

```json
{
  "Version": "2012-10-17",
  "Statement": [
    {
      "Effect": "Allow",
      "Action": [
        "logs:CreateLogGroup",
        "logs:CreateLogStream",
        "logs:PutLogEvents"
      ],
      "Resource": "arn:aws:logs:*:*:*"
    }
  ]
}
```

### 5. Test the Function

Test event:
```json
{
  "submission": "Python is a high-level programming language. It uses indentation for code blocks. For example:\n```python\ndef hello():\n    print('Hello World')\n```\nThis demonstrates function definition and string output.",
  "skillId": 1,
  "skillName": "Python Basics",
  "topicTitle": "Python Basics",
  "topicDescription": "Learn Python syntax and fundamentals"
}
```

Expected response:
```json
{
  "statusCode": 200,
  "body": "{\"status\":\"pass\",\"feedback\":\"✅ Verification Passed!...\",\"score\":100}"
}
```

### 6. Update Backend Configuration

In your backend `.env` file:
```env
USE_LAMBDA=true
LAMBDA_FUNCTION_NAME=vle-verification-function
AWS_REGION=us-east-1
AWS_ACCESS_KEY_ID=your_access_key
AWS_SECRET_ACCESS_KEY=your_secret_key
```

### 7. Grant Backend Permissions

The EC2 instance or backend service needs permission to invoke Lambda:

**IAM Policy for Backend:**
```json
{
  "Version": "2012-10-17",
  "Statement": [
    {
      "Effect": "Allow",
      "Action": "lambda:InvokeFunction",
      "Resource": "arn:aws:lambda:REGION:ACCOUNT_ID:function:vle-verification-function"
    }
  ]
}
```

## Testing Locally

You can test the Lambda function locally:

```javascript
import { handler } from './verificationFunction.js';

const testEvent = {
  submission: "Your test submission here...",
  skillId: 1,
  skillName: "Python Basics",
  topicTitle: "Python Basics",
  topicDescription: "Learn Python"
};

const result = await handler(testEvent);
console.log(JSON.parse(result.body));
```

## Monitoring

View logs in CloudWatch:
```bash
aws logs tail /aws/lambda/vle-verification-function --follow
```

## Cost Estimation

- **Requests**: First 1M requests/month are free
- **Compute**: First 400,000 GB-seconds free
- **Typical cost**: $0.20 per 1M requests after free tier

For a learning platform with 1000 active users:
- ~10,000 verifications/month
- Cost: ~$0.002/month (essentially free)

## Upgrading to AI-Powered Verification

To use GPT/Claude for verification:

1. Add API key to Lambda environment variables
2. Update function to call AI API
3. Increase timeout to 60 seconds
4. Increase memory to 512 MB

Example with OpenAI:
```javascript
import OpenAI from 'openai';

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY
});

const completion = await openai.chat.completions.create({
  model: "gpt-3.5-turbo",
  messages: [
    {
      role: "system",
      content: "You are a technical instructor evaluating student submissions."
    },
    {
      role: "user",
      content: `Evaluate this submission for "${topicTitle}":\n\n${submission}`
    }
  ]
});
```

## Troubleshooting

**Lambda not responding:**
- Check CloudWatch logs
- Verify IAM permissions
- Test with AWS Console test feature

**Backend can't invoke Lambda:**
- Verify AWS credentials in .env
- Check IAM policy for lambda:InvokeFunction
- Ensure function name matches

**Verification always fails:**
- Check Lambda logs for errors
- Verify payload format
- Test with simple submission
