# AWS Serverless

Build, deploy, test, and debug serverless applications on AWS directly from your editor. This plugin equips Claude with deep knowledge of AWS Lambda, API Gateway, EventBridge, and Step Functions, along with an MCP server that enables direct interaction with your AWS serverless resources. It supports project scaffolding with SAM CLI and CDK, event-driven architecture design, multi-environment deployments, and CI/CD pipeline setup.

The plugin includes three specialized skills. The core **AWS Lambda** skill covers full-lifecycle serverless development — from initializing projects and configuring event sources (DynamoDB, SQS, Kinesis, Kafka) to performance tuning, cold-start mitigation, and observability with CloudWatch and X-Ray. The **AWS Serverless Deployment** skill handles infrastructure-as-code generation, SAM template validation, container-based local testing, and production deployment workflows. The **AWS Lambda Durable Functions** skill enables building resilient, long-running multi-step applications with automatic state persistence, saga patterns, and human-in-the-loop callbacks.

Defaults to TypeScript and CDK, but supports Python, JavaScript, CloudFormation, and SAM — just ask. Requires AWS CLI credentials and SAM CLI to be installed.

**How to use:** The plugin's skills activate automatically based on context. Try prompts like "Create a new Lambda function triggered by an SQS queue", "Deploy my serverless app using SAM", "Set up an EventBridge rule to route events to my Lambda", "Build a durable function workflow with retry and checkpoint logic", or "Help me debug cold starts in my Lambda function".
