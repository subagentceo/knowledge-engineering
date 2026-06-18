

# What is Service Quotas?
<a name="intro"></a>

With Service Quotas, you can view and manage your quotas for AWS services from a central location. Quotas, also referred to as limits in AWS services, are the maximum values for the resources, actions, and items in your AWS account. Each AWS service defines its quotas and establishes default values for those quotas. If your business needs aren't met by the default limit of service resources or operations that apply to an AWS account, resource, or an AWS Region, you might need to increase your service quota values. Service Quotas enables you to look up your service quotas and to request increases. Support might approve, deny, or partially approve your requests.

**Topics**
+ [Features of Service Quotas](#features)
+ [Terminology in Service Quotas](#intro_getting-started)
+ [Accessing Service Quotas](#access)

## Features of Service Quotas
<a name="features"></a>

Service Quotas provides the following features:

**View your service quotas**  
The Service Quotas console provides quick access to the AWS default quota values for your account, across all AWS Regions. When you select a service in the Service Quotas console, you see the service's quotas and if that quota is adjustable at the AWS account level. *Applied quotas* are overrides, or increases for a specific quota, over the AWS default value. 

**Request a service quota increase**  
To see if a quota is adjustable, go into the console, navigate to AWS services, and select the service from the list. From the service's details page, view the **Adjustable** column.   
Each adjustable quota says at which level the quota can be increased. For service quotas that are adjustable at the *account* level, you can use Service Quotas to request a quota increase.   
You can also increase certain quotas at the *resource* level.   
To request a quota increase in the Service Quotas console, select the service and the specific quota, and then choose **Request quota increase**. Increases do take some time to review, process, and approve. You can also use Service Quotas API operations or the AWS CLI tools to request service quota increases. 

**View current utilization of resources**  
After your account becomes active for a period of time, you can view a graph of your resource utilization.

**Service Quotas Automatic Management**  
[Service Quotas Automatic Management](automatic-management.md), once started, allows AWS to monitor service quotas usage and send you notifications when quotas before you run out of your allocated quotas.

## Terminology in Service Quotas
<a name="intro_getting-started"></a>

The following terms are important for understanding Service Quotas and how it works.

**service quota**  
The maximum number of service resources or operations that apply to an AWS account or an AWS Region. The number of AWS Identity and Access Management (IAM) roles per account is an example of an account-based quota. The number of virtual private clouds (VPCs) per Region is an example of a Region-based quota. To determine whether a service quota is Region-specific, check the description of the service quota.

**adjustable value**  
A quota value that can be increased.

**applied quota**  
The updated quota value after a quota increase.

**default value**  
The initial quota value established by AWS.

**global quota**  
A service quota applied at an account level. Global quotas are available in all AWS Regions. You can request an increase to a global quota only from US East (N. Virginia) for Public AWS partition, AWS GovCloud (US-West) for AWS GovCloud (US) Regions, and China (Beijing) for AWS China Regions. 

**usage**  
The number of resources or operations in use for a service quota.

**utilization**  
The percentage of a service quota in use. For example, if the quota value is 200 resources and 150 resources are in use, then the utilization is 75 percent.

**quota context info**  
A structure that describes the context for a resource-level quota. For resource-level quotas, such as `Instances per OpenSearch Service Domain`, you can apply the quota value at the resource-level for each OpenSearch Service Domain in your AWS account. Together the attributes of this structure help you understand how the quota is implemented by AWS and how you can manage it.

**context ID**  
Specifies the resource, or resources, to which the quota applies. The value for this field is either an Amazon Resource Name (ARN) or \*. If the value is an ARN, the quota value applies to that resource. If the value is \*, then the quota value applies to all resources of that specific type.

**context scope**  
Specifies the scope to which the quota value is applied.

**context scope type**  
Specifies the resource type to which the quota can be applied.

**quota applied at level**  
Filters an API response to return applied quota values at either the account level, resource level, or all levels.

**quota requested at level**  
Filters an API response to return quota requests at either the account level, resource level, or all levels.

## Accessing Service Quotas
<a name="access"></a>

You can work with Service Quotas in the following ways:

**AWS Management Console**  
[The Service Quotas console](https://console.aws.amazon.com/servicequotas/home?region=us-east-1#!/dashboard) is a browser-based interface that you can use to view and manage your service quotas. You can perform almost any task that's related to your service quotas by using the console. You can access Service Quotas from any AWS Management Console page by choosing it on the top navigation bar, or by searching for Service Quotas in the AWS Management Console.

**AWS Command Line Interface tools**  
By using the AWS Command Line Interface tools, you can issue commands at your system's command line to perform Service Quotas and other AWS tasks. This can be a faster and more convenient approach than using the console. The command line tools also are useful if you want to build scripts that perform AWS tasks.  
AWS provides two sets of command line tools: the [AWS Command Line Interface](https://aws.amazon.com/cli/)  and the [AWS Tools for Windows PowerShell](https://aws.amazon.com/powershell/). For information about installing and using the AWS CLI, see the [AWS Command Line Interface User Guide](https://docs.aws.amazon.com/cli/latest/userguide/). For information about installing and using the Tools for Windows PowerShell, see the [AWS Tools for PowerShell User Guide](https://docs.aws.amazon.com/powershell/latest/userguide/).  
You need AWS CLI version 2.13.20 or higher to view and manage resource-level quotas such as `Instances per domain` for Amazon OpenSearch Service.

**AWS SDKs**  
The AWS SDKs consist of libraries and sample code for various programming languages and platforms (for example, [Java](https://aws.amazon.com/sdk-for-java/), [Python](https://aws.amazon.com/sdk-for-python/), [Ruby](https://aws.amazon.com/sdk-for-ruby/), [.NET](https://aws.amazon.com/sdk-for-net/), [iOS and Android](https://aws.amazon.com/mobile/resources/), and [others](https://aws.amazon.com/tools/#sdk)). The SDKs include tasks such as cryptographically signing requests, managing errors, and retrying requests automatically. For more information about the AWS SDKs, including how to download and install them, see [Tools for Amazon Web Services](https://aws.amazon.com/tools/#SDKs).