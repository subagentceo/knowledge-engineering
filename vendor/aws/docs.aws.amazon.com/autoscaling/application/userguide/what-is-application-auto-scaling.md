

# What is Application Auto Scaling?
<a name="what-is-application-auto-scaling"></a>

Application Auto Scaling is a web service for developers and system administrators who need a solution for automatically scaling their scalable resources for individual AWS services beyond [Amazon EC2 Auto Scaling](https://docs.aws.amazon.com/autoscaling/ec2/userguide/what-is-amazon-ec2-auto-scaling.html). With Application Auto Scaling, you can configure automatic scaling for the following resources: 
+ WorkSpaces Applications fleets
+ Aurora replicas
+ Amazon Comprehend document classification and entity recognizer endpoints
+ DynamoDB tables and global secondary indexes
+ Amazon ECS services
+ ElastiCache replication groups (Redis OSS and Valkey) and Memcached clusters 
+ Amazon EMR clusters
+ Amazon Keyspaces (for Apache Cassandra) tables
+ Lambda function provisioned concurrency
+ Amazon Managed Streaming for Apache Kafka (MSK) broker storage
+ Amazon Neptune clusters
+ SageMaker AI endpoint variants
+ SageMaker AI inference components
+ SageMaker AI Serverless provisioned concurrency
+ Spot Fleet requests
+ Pool of Amazon WorkSpaces
+ Custom resources provided by your own applications or services. For more information, see the [GitHub repository](https://github.com/aws/aws-auto-scaling-custom-resource). 

To see the regional availability for any of the AWS services listed above, see the [Region table](https://aws.amazon.com/about-aws/global-infrastructure/regional-product-services/).

For information about scaling your fleet of Amazon EC2 instances using Auto Scaling groups, see the [Amazon EC2 Auto Scaling User Guide](https://docs.aws.amazon.com/autoscaling/ec2/userguide/). 

## Features of Application Auto Scaling
<a name="features"></a>

Application Auto Scaling allows you to automatically scale your scalable resources according to conditions that you define.
+ **Target tracking scaling** – Scale a resource based on a target value for a specific CloudWatch metric.
+ **Step scaling** – Scale a resource based on a set of scaling adjustments that vary based on the size of the alarm breach.
+ **Scheduled scaling** – Scale a resource one time only or on a recurring schedule.
+ **Predictive scaling** – Scale a resource proactively to match anticipated load based on historical data.

## Work with Application Auto Scaling
<a name="access"></a>

You can configure scaling using the following interfaces depending on the resource that you are scaling:
+ **AWS Management Console** – Provides a web interface that you can use to configure scaling. Sign up for an AWS account and sign into the AWS Management Console. Then, open the service console for one of the resources listed in the introduction. For example, to scale a Lambda function, open the AWS Lambda console. Ensure that you open the console in the same AWS Region as the resource that you want to work with.
**Note**  
Console access is not available for all resources. For more information, see [AWS services that you can use with Application Auto Scaling](integrated-services-list.md).
+ **AWS Command Line Interface (AWS CLI)** – Provides commands for a broad set of AWS services, and is supported on Windows, macOS, and Linux. To get started, see [AWS Command Line Interface](https://docs.aws.amazon.com/cli/). For a list of commands, see [application-autoscaling](https://docs.aws.amazon.com/cli/latest/reference/application-autoscaling/) in the *AWS CLI Command Reference*.
+ **AWS Tools for Windows PowerShell** – Provides commands for a broad set of AWS products for those who script in the PowerShell environment. To get started, see the [AWS Tools for PowerShell User Guide](https://docs.aws.amazon.com/powershell/latest/userguide/). For more information, see the [AWS Tools for PowerShell Cmdlet Reference](https://docs.aws.amazon.com/powershell/latest/reference/Index.html).
+ **AWS SDKs** – Provides language-specific API operations and takes care of many of the connection details, such as calculating signatures, handling request retries, and handling errors. For more information, see [Tools to Build on AWS](https://aws.amazon.com/developer/tools/).
+ **HTTPS API** – Provides low-level API actions that you call using HTTPS requests. For more information, see the [Application Auto Scaling API Reference](https://docs.aws.amazon.com/autoscaling/application/APIReference/).
+ **CloudFormation** – Supports configuring scaling using a CloudFormation template. For more information, see [Configure Application Auto Scaling resources using AWS CloudFormation](creating-resources-with-cloudformation.md).

To connect programmatically to an AWS service, you use an endpoint. For information about endpoints for calls to Application Auto Scaling, see [Application Auto Scaling endpoints and quotas](https://docs.aws.amazon.com/general/latest/gr/as-app.html) in the *AWS General Reference*. 