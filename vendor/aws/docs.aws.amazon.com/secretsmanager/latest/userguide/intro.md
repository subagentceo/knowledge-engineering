

# What is AWS Secrets Manager?
<a name="intro"></a>

AWS Secrets Manager helps you manage, retrieve, and rotate database credentials, application credentials, OAuth tokens, API keys, and other secrets throughout their lifecycles. Many AWS services store and use secrets in Secrets Manager.

Secrets Manager helps you improve your security posture, because you no longer need hard-coded credentials in application source code. Storing the credentials in Secrets Manager helps avoid possible compromise by anyone who can inspect your application or the components. You replace hard-coded credentials with a runtime call to the Secrets Manager service to retrieve credentials dynamically when you need them.

With Secrets Manager, you can configure an automatic rotation schedule for your secrets. This enables you to replace long-term secrets with short-term ones, significantly reducing the risk of compromise. Since the credentials are no longer stored with the application, rotating credentials no longer requires updating your applications and deploying changes to application clients.

For other types of secrets you might have in your organization:
+ AWS credentials – We recommend [AWS Identity and Access Management](https://docs.aws.amazon.com/IAM/latest/UserGuide/introduction.html).
+ Encryption keys – We recommend [AWS Key Management Service](https://docs.aws.amazon.com/kms/latest/developerguide/overview.html).
+ SSH keys – We recommend [Amazon EC2 Instance Connect](https://docs.aws.amazon.com/AWSEC2/latest/UserGuide/Connect-using-EC2-Instance-Connect.html).
+ Private keys and certificates – We recommend [AWS Certificate Manager](https://docs.aws.amazon.com/acm/latest/userguide/acm-overview.html).

## Get started with Secrets Manager
<a name="get-started"></a>

If you are new to Secrets Manager, start with one of the following tutorials:
+ [Move hardcoded secrets to AWS Secrets Manager](hardcoded.md)
+ [Move hardcoded database credentials to AWS Secrets Manager](hardcoded-db-creds.md)
+ [Set up alternating users rotation for AWS Secrets Manager](tutorials_rotation-alternating.md)
+ [Set up single user rotation for AWS Secrets Manager](tutorials_rotation-single.md)

Other tasks you can do with secrets:
+ [Manage secrets](managing-secrets.md)
+ [Control access to your secrets](auth-and-access.md)
+ [Get secrets](retrieving-secrets.md)
+ [Rotate secrets](rotating-secrets.md)
+ [Monitor secrets](monitoring.md)
+ [Monitor secrets for compliance](configuring-awsconfig-rules.md)
+ [Create secrets in AWS CloudFormation](cloudformation.md)

## Compliance with standards
<a name="compliance"></a>

AWS Secrets Manager has undergone auditing for the multiple standards and can be part of your solution when you need to obtain compliance certification. For more information, see [Compliance validation for AWS Secrets Manager](secretsmanager-compliance.md).

## Pricing
<a name="asm_pricing"></a>

When you use Secrets Manager, you pay only for what you use, with no minimum or setup fees. There is no charge for secrets that are marked for deletion. For the current complete pricing list, see [AWS Secrets Manager Pricing](https://aws.amazon.com/secrets-manager/pricing). To monitor your costs, see [Monitor Secrets Manager costs](monitor-secretsmanager-costs.md).

You can use the AWS managed key `aws/secretsmanager` that Secrets Manager creates to encrypt your secrets for free. If you create your own KMS keys to encrypt your secrets, AWS charges you at the current AWS KMS rate. For more information, see [AWS Key Management Service Pricing](https://aws.amazon.com/kms/pricing).

When you turn on automatic rotation (except [managed rotation](rotate-secrets_managed.md)), Secrets Manager uses an AWS Lambda function to rotate the secret, and you are charged for the rotation function at the current Lambda rate. For more information, see [AWS Lambda Pricing](https://aws.amazon.com//lambda/pricing/). 

If you enable AWS CloudTrail on your account, you can obtain logs of the API calls that Secrets Manager sends out. Secrets Manager logs all events as management events. AWS CloudTrail stores the first copy of all management events for free. However, you can incur charges for Amazon S3 for log storage and for Amazon SNS if you enable notification. Also, if you set up additional trails, the additional copies of management events can incur costs. For more information, see [AWS CloudTrail pricing](https://aws.amazon.com/cloudtrail/pricing).

You can use cost allocation tags in Secrets Manager to track and categorize expenses associated with specific secrets or projects. For more information, see [Tagging secrets in AWS Secrets Manager](managing-secrets_tagging.md) in this guide and [Using AWS cost allocation tags](https://docs.aws.amazon.com/awsaccountbilling/latest/aboutv2/cost-alloc-tags.html) in the AWS Billing User Guide.