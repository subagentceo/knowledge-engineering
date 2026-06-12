

# Welcome
<a name="Welcome"></a>

This is the *Amazon EC2 Auto Scaling API Reference*. Amazon EC2 Auto Scaling is designed to automatically launch and terminate EC2 instances based on user-defined scaling policies, scheduled actions, and health checks. This guide describes the Amazon EC2 Auto Scaling operations that you can call programmatically. For more information about Amazon EC2 Auto Scaling, see the [Amazon EC2 Auto Scaling User Guide](https://docs.aws.amazon.com/autoscaling/ec2/userguide/what-is-amazon-ec2-auto-scaling.html).

**Note**  
To configure Amazon EC2 instances that are launched by your Auto Scaling group, you can specify a launch template or a launch configuration. We recommend that you use Amazon EC2 launch templates. Launch configurations are included as part of the same API as Auto Scaling groups, but launch templates offer more features. For more information, see [Launch templates](https://docs.aws.amazon.com/autoscaling/ec2/userguide/launch-templates.html) in the *Amazon EC2 Auto Scaling User Guide*.

To get started, complete the following tasks:

1. Create a launch template using [CreateLaunchTemplate](https://docs.aws.amazon.com/AWSEC2/latest/APIReference/API_CreateLaunchTemplate.html).

1. Create an Auto Scaling group using [CreateAutoScalingGroup](https://docs.aws.amazon.com/autoscaling/ec2/APIReference/API_CreateAutoScalingGroup.html).

To make programmatic API calls, you can also use one of the AWS SDKs, which consist of libraries and sample code for various programming languages and platforms. The SDKs provide a convenient way to create programmatic access to Amazon EC2 Auto Scaling. For example, the SDKs take care of cryptographically signing requests, managing errors, and retrying requests automatically. For information about the AWS SDKs, including how to download and install them, see the [AWS SDKs](http://aws.amazon.com/tools/#SDKs).

 **API request rate** 

Amazon EC2 Auto Scaling uses the token bucket algorithm to implement API throttling. With this algorithm, your account has a bucket that holds a specific number of tokens. The number of tokens in the bucket represents your throttling limit at any given second. Amazon EC2 Auto Scaling throttles API requests based on a shared API bucket. For example, calls to the [DescribeAutoScalingGroups](https://docs.aws.amazon.com/autoscaling/ec2/APIReference/API_DescribeAutoScalingGroups.html) and [DescribeScheduledActions](https://docs.aws.amazon.com/autoscaling/ec2/APIReference/API_DescribeScheduledActions.html) API operations use tokens from the same bucket. Throttling means that Amazon EC2 Auto Scaling rejects a request because the request exceeds the service's limit for the number of requests per second. When a request is throttled, Amazon EC2 Auto Scaling returns a `RateExceeded` error. 

The [DescribeAutoScalingGroups](https://docs.aws.amazon.com/autoscaling/ec2/APIReference/API_DescribeAutoScalingGroups.html) API operation might be throttled when retrieving details for an Auto Scaling group that contains many instances. By default, this operation returns details for all instances in the group. To help prevent throttling, you can set the `IncludeInstances` parameter to `false` to exclude instance details from the response.

 **Additional information** 
+ To specify a custom Amazon Machine Image (AMI) in your launch template, you must first create your AMI from a customized instance. For information on creating a custom AMI, see [Create an AMI](https://docs.aws.amazon.com/AWSEC2/latest/UserGuide/create-ami.html) in the *Amazon EC2 User Guide*.
+ For information about the permissions that are required for Amazon EC2 Auto Scaling, see [ IAM permissions for Amazon EC2 Auto Scaling](https://docs.aws.amazon.com/autoscaling/ec2/userguide/security-iam.html).
+ For information about how to provide network connectivity for instances in an Auto Scaling group, see [Provide network connectivity for your Auto Scaling instances using Amazon VPC](https://docs.aws.amazon.com/autoscaling/ec2/userguide/asg-in-vpc.html) in the *Amazon EC2 Auto Scaling User Guide*.

This document was last published on June 12, 2026. 