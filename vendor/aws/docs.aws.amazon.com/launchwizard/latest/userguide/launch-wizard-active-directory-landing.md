

# AWS Launch Wizard for Active Directory
<a name="launch-wizard-active-directory-landing"></a>

AWS Launch Wizard for Active Directory is a service that applies [AWS cloud application best practices](https://docs.aws.amazon.com/wellarchitected/latest/framework/welcome.html) to guide you through setting up a new Active Directory infrastructure, or adding domain controllers to an existing infrastructure either in the AWS Cloud or on premises. The deployment environment includes various resources such as a new or existing VPC, security groups, and AWS Identity and Access Management (IAM) roles. You can set up a new Active Directory infrastructure with domain controllers on Amazon EC2 instances, add domain controllers on Amazon EC2 instances to extend your existing Active Directory infrastructure, or use AWS Directory Service for Microsoft Active Directory for a managed service experience.

Launch Wizard reduces the time that it takes to set up an Active Directory infrastructure and deploy self-managed domain controllers to the cloud or on premises. You input your domain controller requirements, including number of nodes and connectivity, on the service console, and AWS Launch Wizard identifies the right AWS resources to deploy your self-managed domain controllers. AWS Launch Wizard provides an estimated cost of deployment, and gives you the ability to modify your resources and instantly view the updated cost assessment. When you approve, AWS Launch Wizard provisions and configures the selected resources in a few hours to create fully-functioning, production-ready domain controllers. 

After you deploy your self-managed domain controllers, they are ready to use and can be accessed on the Amazon Elastic Compute Cloud (Amazon EC2) console. 

## Supported operating systems
<a name="launch-wizard-ad-os"></a>

AWS Launch Wizard for Active Directory supports the Windows Server 2022 operating system.

## Features of AWS Launch Wizard
<a name="launch-wizard-ad-features"></a>

**Topics**
+ [Simple application deployment](#launch-wizard-ad-features-app-deployment)
+ [AWS resource selection](#launch-wizard-ad-features-resource-selection)
+ [Cost estimation](#launch-wizard-ad-features-cost)
+ [SNS notification](#launch-wizard-ad-features-sns)
+ [Early input validation](#launch-wizard-ad-features-input-validation)
+ [Application resource groups for easy discoverability](#launch-wizard-ad-features-resource-groups)

### Simple application deployment
<a name="launch-wizard-ad-features-app-deployment"></a>

AWS Launch Wizard makes it efficient for you to deploy self-managed domain controllers and AWS Directory Service for Microsoft Active Directory on AWS. When you enter the domain controller requirements, AWS Launch Wizard deploys the necessary AWS resources for a production-ready environment. This means that you do not have to manage separate infrastructure pieces or spend time provisioning and configuring your domain controllers. 

### AWS resource selection
<a name="launch-wizard-ad-features-resource-selection"></a>

Launch Wizard considers the number of Active Directory users to determine the best instance type, EBS volumes, and other resources for your domain controllers. You can modify the recommended defaults. 

### Cost estimation
<a name="launch-wizard-ad-features-cost"></a>

Launch Wizard provides a cost estimate for the complete deployment that is itemized for each individual resource being deployed. The estimated cost automatically updates each time you change a resource type configuration in the wizard. However, the provided estimates are only for general comparisons. They are based on on-Demand costs and actual costs may be lower.

### SNS notification
<a name="launch-wizard-ad-features-sns"></a>

You can provide an [ SNS topic](https://docs.aws.amazon.com/sns/latest/dg/welcome.html) that allows Launch Wizard to send you notifications and alerts about the status of a deployment.

### Early input validation
<a name="launch-wizard-ad-features-input-validation"></a>

You can take advantage of your existing infrastructure, such as VPC or security groups, with Launch Wizard. This may lead to deployment failures if your existing infrastructure does not meet certain deployment prerequisites. If these requirements are not met, the deployment will fail. If you are in a later stage of a deployment, this failure can take more than an hour to detect. To detect these types of issues early in the application deployment process, Launch Wizard's validation framework verifies key infrastructure specifications before provisioning. Verification takes approximately 15 minutes. If necessary, you can take appropriate actions to adjust your VPC configuration. 

**Note**  
Some validations, such as for Active Directory credentials, require Application Wizard to launch a t2.large EC2 instance in your account for a few minutes. After it runs the necessary validations, Launch Wizard terminates the instance.

### Application resource groups for easy discoverability
<a name="launch-wizard-ad-features-resource-groups"></a>

Launch Wizard creates a resource group for all of the AWS resources created for your domain controllers. You can manage the resources through the Amazon EC2 console or with Systems Manager. When you access Systems Manager through Launch Wizard, the resources are automatically filtered for you based on your resource group.

## Components
<a name="launch-wizard-ad-components"></a>

Self-managed domain controllers deployed with Launch Wizard include the following components:
+ A **virtual private cloud (VPC)** configured with [public and private subnets](https://docs.aws.amazon.com/vpc/latest/userguide/what-is-amazon-vpc.html#what-is-vpc-subnet) across two Availability Zones. A public subnet is a subnet whose traffic is routed to an internet gateway. If a subnet does not have a route to the internet gateway, then it is a private subnet. The VPC provides the network infrastructure for your domain controller environment.
+ **Amazon EC2 instances** on which to provision your domain controllers.
+ An **internet gateway** to provide access to the internet.
+ In the public subnets, **network address translation (NAT) gateways** for outbound internet access. If you are deploying in your preexisting VPC, Launch Wizard uses the existing NAT gateway in your VPC. For more information about NAT gateways, see [NAT Gateways](https://docs.aws.amazon.com/vpc/latest/userguide/vpc-nat-gateway.html).
+ **Elastic IP addresses** associated with the NAT gateway and RDGW instances. For more information about Elastic IP addresses, see [Elastic IP Addresses](https://docs.aws.amazon.com/AWSEC2/latest/UserGuide/elastic-ip-addresses-eip.html).
+ **CloudFormation** templates and **PowerShell** configuration scripts to perform the domain controller configuration steps.
+ **Security groups** to ensure the secure flow of traffic between the instances deployed in the VPC. For more information, see [Security Groups for Your VPC](https://docs.aws.amazon.com/vpc/latest/userguide/VPC_SecurityGroups.html).
+ **AWS Secrets Manager** to protect secrets required to generate and store your Active Directory Administrator credentials. 
+ **Amazon CloudWatch Logs** to monitor, store, and access your log files produced by CloudFormation.
+ Amazon Kinesis Agent for Microsoft Windows to gather, parse, transform, and stream logs, events, and metrics to Amazon CloudWatch Logs. For more information, see [What Is Amazon Kinesis Agent for Microsoft Windows?](https://docs.aws.amazon.com/kinesis-agent-windows/latest/userguide/what-is-kinesis-agent-windows.html)

## Requirements
<a name="launch-wizard-ad-requirements"></a>

Your account must be configured as specified in the following table to deploy self-managed domain controllers using Launch Wizard.

To add domain controllers to an existing infrastructure, you must create a [VPC peering](https://docs.aws.amazon.com/vpc/latest/peering/what-is-vpc-peering.html) connection between the two VPCs for an existing Active Directory in AWS. If you are using an existing Active Directory on premises, you must use [AWS Direct Connect](https://docs.aws.amazon.com/directconnect/latest/UserGuide/Welcome.html). To ensure that instances in the VPCs can communicate with each other, you can use either Direct Connect or [VPC Private Link](https://docs.aws.amazon.com/vpc/latest/userguide/endpoint-services-overview.html). For more information about VPC connectivity, see [VPN connections](https://docs.aws.amazon.com/vpc/latest/userguide/vpn-connections.html).



- ** Virtual private clouds (VPCs) **
  - 1

- **VPC security groups**
  - 3

- **AWS Identity and Access Management (IAM) roles**
  - 2

- **General purpose EC2 instances**
  - Existing VPC: 1
  - New Active Directory infrastructure: 2

- **AWS Secrets Manager secrets**
  - 2



If you have an existing environment that uses these resources and you think that deploying domain controllers in this environment using Launch Wizard may exceed your default quotas, you can [request service quota increases](https://console.aws.amazon.com/servicequotas) for these resources. For default quotas, see [AWS service quotas](https://docs.aws.amazon.com/general/latest/gr/aws_service_limits.html).

## Related services
<a name="lw-ad-related-services"></a>

**Topics**
+ [CloudFormation](#launch-wizard-ad-related-services-cloudformation)
+ [Amazon Simple Notification Service (SNS)](#launch-wizard-ad-related-services-sns)
+ [Amazon CloudWatch Logs](#launch-wizard-ad-related-services-cloudwatch-logs)
+ [AWS Secrets Manager](#launch-wizard-ad-related-services-secrets-manager)

### CloudFormation
<a name="launch-wizard-ad-related-services-cloudformation"></a>

[CloudFormation](https://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/Welcome.html) is a service for modeling and setting up your AWS resources, enabling you to spend more time focusing on your applications that run in AWS . You create a template that describes all of the AWS resources that you want to use (for example, EC2 instances), and CloudFormation provisions and configures those resources for you. With Launch Wizard, you don’t have to sift through CloudFormation templates to deploy your application. Instead, Launch Wizard combines infrastructure provisioning and configuration (with an CloudFormation template and PowerShell scripts) to provision a new Active Directory infrastructure or additional domain controllers in your account. For more information, see the * [AWS CloudFormation User Guide](https://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/)*.

### Amazon Simple Notification Service (SNS)
<a name="launch-wizard-ad-related-services-sns"></a>

[Amazon Simple Notification Service](https://docs.aws.amazon.com/sns/latest/dg/welcome.html) (Amazon SNS) is a highly available, durable, secure, fully managed publish/subscribe messaging service that provides topics for high-throughput, push-based, many-to-many messaging. Using Amazon SNS topics, your publisher systems can fan out messages to a large number of subscriber endpoints and send notifications to end users using mobile push, SMS, and email. You can use Amazon SNS topics for your Launch Wizard deployments to stay up to date on deployment progress. For more information, see the [https://docs.aws.amazon.com/sns/latest/dg/welcome.html](https://docs.aws.amazon.com/sns/latest/dg/welcome.html).

### Amazon CloudWatch Logs
<a name="launch-wizard-ad-related-services-cloudwatch-logs"></a>

[Amazon CloudWatch Logs](https://docs.aws.amazon.com/AmazonCloudWatch/latest/logs/WhatIsCloudWatchLogs.html) enables you to centralize the logs from all of your systems, applications, and AWS services that you use, in a single, highly scalable service. You can then easily view them, search them for specific error codes or patterns, filter them based on specific fields, or archive them securely for future analysis. Amazon CloudWatch Logs enables you to see all of your logs, regardless of their source, as a single and consistent flow of events ordered by time, and you can query them and sort them based on other dimensions, group them by specific fields, create custom computations with a powerful query language, and visualize log data in dashboards. Launch Wizard streams provisioning logs from all of the AWS log sources that you can view on the CloudWatch console.

### AWS Secrets Manager
<a name="launch-wizard-ad-related-services-secrets-manager"></a>

With [AWS Secrets Manager](https://docs.aws.amazon.com/secretsmanager/) you can replace hard-coded credentials in your code, including passwords, with an API call to Secrets Manager to programmatically retrieve the secret. This helps ensure the secret can't be compromised by someone examining your code. Also, you can configure Secrets Manager to automatically rotate the secret for you according to a specified schedule. Launch Wizard uses Secrets Manager to join your domain controllers to Active Directory and promote them.