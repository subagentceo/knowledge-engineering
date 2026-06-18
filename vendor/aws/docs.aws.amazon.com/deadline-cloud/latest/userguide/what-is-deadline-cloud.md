

# What is AWS Deadline Cloud?
<a name="what-is-deadline-cloud"></a>

Deadline Cloud is an AWS service you can use to create and manage rendering projects and jobs on Amazon Elastic Compute Cloud (Amazon EC2) instances directly from digital content creation pipelines and workstations.

Deadline Cloud provides console interfaces, local applications, command line tools, and an API. With Deadline Cloud, you can create, manage, and monitor farms, fleets, jobs, user groups, and storage. You can also specify hardware capabilities, create environments for specific workloads, and integrate the content creation tools that your production requires into your Deadline Cloud pipeline.

Deadline Cloud provides a unified interface to manage all of your rendering projects in one place. You can manage users, assign projects to them, and grant permissions for job roles. 

**Topics**
+ [Features of Deadline Cloud](#deadline-cloud-features)
+ [Concepts and terminology for Deadline Cloud](concepts-terminology.md)
+ [Getting started with Deadline Cloud](#how-to-get-started-with-deadline-cloud)
+ [Accessing Deadline Cloud](#accessing-deadline-cloud)
+ [Related services](#related-services)
+ [How Deadline Cloud works](how-it-works.md)
+ [Integrate Deadline Cloud into your pipeline](pipeline-integration.md)

## Features of Deadline Cloud
<a name="deadline-cloud-features"></a>

Here are some of the key ways Deadline Cloud can help you run and manage visual compute workloads:
+ Quickly create your farms, queues, and fleets. Monitor their status, and gain insights into the operation of your farm and jobs.
+ Centrally manage Deadline Cloud users and groups, and assign permissions.
+ Manage sign-in security for project users and external identity providers with AWS IAM Identity Center.
+ Securely manage access to project resources with AWS Identity and Access Management (IAM) policies and roles.
+ Use tags to organize and quickly find project resources.
+ Manage project resource usage and estimated costs for your project.
+ Provide a wide range of compute management options to support rendering in the cloud or in person.

## Getting started with Deadline Cloud
<a name="how-to-get-started-with-deadline-cloud"></a>

Use Deadline Cloud to quickly create a render farm with default settings and resources, such as Amazon EC2 instance configuration and Amazon Simple Storage Service (Amazon S3) buckets.

You can also define the settings and resources when you create a render farm. This method takes more time than using the default settings and resources but gives you more control.

After you're familiar with Deadline Cloud [ Concepts and terminology](https://docs.aws.amazon.com//deadline-cloud/latest/userguide/concepts-terminology.html), see [Getting started](https://docs.aws.amazon.com//deadline-cloud/latest/userguide/getting-started.html) for step-by-step instructions for creating your farm, adding users, and links to helpful information.

## Accessing Deadline Cloud
<a name="accessing-deadline-cloud"></a>

You can access Deadline Cloud in any of the following ways:
+ **Deadline Cloud console**– Access the console in a browser to create a farm and its resources, and manage user access. For more information, see [Getting started](https://docs.aws.amazon.com//deadline-cloud/latest/userguide/getting-started.html).
+ **Deadline Cloud monitor**– Manage your render jobs, including updating priorities and job statuses. Monitor your farm and view logs and job status. For users with Owner permissions, the Deadline Cloud monitor also provides access to explore usage and create budgets. The Deadline Cloud monitor is available as both a web browser and a desktop application.
+ **AWS SDK and AWS CLI**– Use the AWS Command Line Interface (AWS CLI) to call the Deadline Cloud API operations from the command line on your local system. For more information, see [ Set up a developer workstation](https://docs.aws.amazon.com//deadline-cloud/latest/userguide/getting-started-dev.html).

## Related services
<a name="related-services"></a>

Deadline Cloud works with the following AWS services:
+ **Amazon CloudWatch**– With CloudWatch, you can monitor your projects and associated AWS resources. For more information, see [Monitoring with CloudWatch](https://docs.aws.amazon.com/deadline-cloud/latest/developerguide/monitoring-cloudwatch.html) in the *Deadline Cloud Developer Guide*.
+ **Amazon EC2**–This AWS service provides virtual servers that run your applications in the cloud. You can configure your projects to use Amazon EC2 instances for your workloads. For more information, see [Amazon EC2 instances](https://docs.aws.amazon.com/AWSEC2/latest/UserGuide/ec2-instances-and-amis.html).
+ **Amazon EC2 Auto Scaling**– With Auto Scaling, you can automatically increase or decrease the number of instances as the demand on your instances changes. Auto Scaling helps to make sure that you're running your desired number of instances, even if an instance fails. If you enable Auto Scaling with Deadline Cloud, instances that are launched by Auto Scaling are automatically registered with the workload. Likewise, instances that are terminated by Auto Scaling are automatically de-registered from the workload. For more information, see the [ Amazon EC2 Auto Scaling User Guide](https://docs.aws.amazon.com/autoscaling/ec2/userguide/what-is-amazon-ec2-auto-scaling.html).
+ **AWS PrivateLink**– AWS PrivateLink provides private connectivity between virtual private clouds (VPCs), AWS services, and your on-premises networks, without exposing your traffic to the public internet. AWS PrivateLink makes it easy to connect services across different accounts and VPCs. For more information, see [AWS PrivateLink](https://docs.aws.amazon.com/vpc/latest/privatelink/what-is-privatelink.html).
+ **Amazon S3**– Amazon S3 is an object storage service. Deadline Cloud uses Amazon S3 buckets to store job attachments. For more information, see the [Amazon S3 User Guide](https://docs.aws.amazon.com/AmazonS3/latest/userguide/Welcome.html).
+ **IAM Identity Center**– IAM Identity Center is an AWS service where you can provide users with single sign-on access to all their assigned accounts and applications from one place. You can also centrally manage multi-account access and user permissions to all of your accounts in AWS Organizations. For more information, see [AWS IAM Identity Center FAQs](https://aws.amazon.com/single-sign-on/faqs).