

# Systems Manager Automation Runbook Reference
<a name="automation-runbook-reference"></a>

To help you get started quickly, AWS Systems Manager provides predefined runbooks. These runbooks are maintained by Amazon Web Services, AWS Support, and AWS Config. The Runbook Reference describes each of the predefined runbooks provided by Systems Manager, Support, and AWS Config.

**Important**  
If you run an automation workflow that invokes other services by using an AWS Identity and Access Management (IAM) service role, be aware that the service role must be configured with permission to invoke those services. This requirement applies to all AWS Automation runbooks (`AWS-*` runbooks) such as the `AWS-ConfigureS3BucketLogging`, `AWS-CreateDynamoDBBackup`, and `AWS-RestartEC2Instance` runbooks, to name a few. This requirement also applies to any custom Automation runbooks you create that invoke other AWS services by using actions that call other services. For example, if you use the `aws:executeAwsApi`, `aws:createStack`, or `aws:copyImage` actions, then you must configure the service role with permission to invoke those services. You can enable permissions to other AWS services by adding an IAM inline policy to the role. For more information, see [Add an Automation inline policy to invoke other AWS services](https://docs.aws.amazon.com/systems-manager/latest/userguide/automation-permissions.html#automation-role-add-inline-policy).

This reference includes topics that describe each of the Systems Manager runbooks that are owned by AWS, AWS Support, and AWS Config. Runbooks are organized by the relevant AWS service. Each page provides an explanation of the required and optional parameters that you can specify when using the runbook. Each page also lists the steps in the runbook and the output of the automation, if any. 

 This reference does *not* include a separate page for runbooks that require approval such as the `AWS-CreateManagedLinuxInstanceWithApproval` or `AWS-StopEC2InstanceWithApproval` runbook. Any runbook name that includes `WithApproval`, means the runbook includes the [https://docs.aws.amazon.com/systems-manager/latest/userguide/automation-action-approve.html](https://docs.aws.amazon.com/systems-manager/latest/userguide/automation-action-approve.html) action. This action temporarily pauses an automation until designated principals either approve or reject the action. After the required number of approvals is reached, the automation resumes. 

For information about running automations, see [Running a simple automation](https://docs.aws.amazon.com/systems-manager/latest/userguide/automation-working-executing.html). For information about running automations on multiple targets, see [Running automations that use targets and rate controls](https://docs.aws.amazon.com/systems-manager/latest/userguide/automation-working-targets-and-rate-controls.html).

**Topics**
+ [View runbook content](#view-automation-json)
+ [API Gateway](automation-ref-abp.md)
+ [AWS Batch](automation-ref-batch.md)
+ [CloudFormation](automation-ref-cfn.md)
+ [CloudFront](automation-ref-cf.md)
+ [CloudTrail](automation-ref-ct.md)
+ [CloudWatch](automation-ref-cw.md)
+ [Amazon DocumentDB](automation-ref-docdb.md)
+ [CodeBuild](automation-ref-acb.md)
+ [AWS CodeDeploy](automation-ref-acd.md)
+ [AWS Config](automation-ref-cc.md)
+ [Connect Customer](automation-ref-con.md)
+ [AWS Directory Service](automation-ref-ads.md)
+ [AWS AppSync](automation-ref-apsy.md)
+ [Amazon Athena](automation-ref-ate.md)
+ [DynamoDB](automation-ref-ddb.md)
+ [AWS Database Migration Service](automation-ref-dms.md)
+ [Amazon EBS](automation-ref-ebs.md)
+ [Amazon EC2](automation-ref-ec2.md)
+ [Amazon ECS](automation-ref-ecs.md)
+ [Amazon EFS](automation-ref-efs.md)
+ [Amazon EKS](automation-ref-eks.md)
+ [Elastic Beanstalk](automation-ref-aeb.md)
+ [Elastic Load Balancing](automation-ref-elb.md)
+ [Amazon EMR](automation-ref-emr.md)
+ [Amazon OpenSearch Service](automation-ref-opensearch.md)
+ [EventBridge](automation-ref-ev.md)
+ [AWS Glue](automation-ref-glu.md)
+ [Amazon FSx](automation-ref-fsx.md)
+ [GuardDuty](automation-ref-gdu.md)
+ [IAM](automation-ref-iam.md)
+ [Incident Detection and Response](automation-ref-idr.md)
+ [Amazon Kinesis Data Streams](automation-ref-aks.md)
+ [AWS KMS](automation-ref-kms.md)
+ [Lambda](automation-ref-lam.md)
+ [Amazon Managed Workflows for Apache Airflow](automation-ref-mwaa.md)
+ [Neptune](automation-ref-neptune.md)
+ [Amazon RDS](automation-ref-rds.md)
+ [Amazon Redshift](automation-ref-rs.md)
+ [Amazon S3](automation-ref-s3.md)
+ [Amazon SES](automation-ref-ses.md)
+ [SageMaker AI](automation-ref-sm.md)
+ [Secrets Manager](automation-ref-asm.md)
+ [Security Hub CSPM](automation-ref-ash.md)
+ [AWS Shield](automation-ref-shd.md)
+ [Amazon SNS](automation-ref-sns.md)
+ [Amazon SQS](automation-ref-sqs.md)
+ [Step Functions](automation-ref-sfn.md)
+ [Systems Manager](automation-ref-sys.md)
+ [Third-party](automation-ref-third-party.md)
+ [Amazon VPC](automation-ref-vpc.md)
+ [AWS WAF](automation-ref-waf.md)
+ [Amazon WorkSpaces](automation-ref-wsp.md)
+ [X-Ray](automation-ref-xray.md)

## View runbook content
<a name="view-automation-json"></a>

You can view the content for runbooks in the Systems Manager console.

**To view runbook content**

1. Open the AWS Systems Manager console at [https://console.aws.amazon.com/systems-manager/](https://console.aws.amazon.com/systems-manager/).

1. In the navigation pane, choose **Documents**.

   -or-

   If the AWS Systems Manager home page opens first, choose the menu icon (![Horizontal black and white striped pattern forming a simple geometric design.](http://docs.aws.amazon.com/systems-manager-automation-runbooks/latest/userguide/images/menu-icon-small.png)) to open the navigation pane, and then choose **Documents** in the navigation pane.

1. In the **Categories** section, choose **Automation documents**.

1.  Choose a runbook, and then choose **View details**. 

1.  Choose the **Content** tab. 