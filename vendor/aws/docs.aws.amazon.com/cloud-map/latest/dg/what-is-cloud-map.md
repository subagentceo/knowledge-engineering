

# What Is AWS Cloud Map?
<a name="what-is-cloud-map"></a>

AWS Cloud Map is a fully managed solution that you can use to map logical names to the backend services and resources that your applications depend on. It also helps your applications discover resources using one of the AWS SDKs, RESTful API calls, or DNS queries. AWS Cloud Map serves only healthy resources, which can be Amazon DynamoDB (DynamoDB) tables, Amazon Simple Queue Service (Amazon SQS) queues, any higher-level application services that are built using Amazon Elastic Compute Cloud (Amazon EC2) instances or Amazon Elastic Container Service (Amazon ECS) tasks, and more.

## Components of AWS Cloud Map
<a name="what-is-cloud-map-components"></a>

Namespace  
To get started, you first create a AWS Cloud Map namespace that functions as a way to group services for an application. A namespace identifies the name that you want to use to locate your resources and also specifies how you want to locate resources: using AWS Cloud Map [DiscoverInstances](https://docs.aws.amazon.com/cloud-map/latest/api/API_DiscoverInstances.html) API calls, DNS queries in a VPC, or public DNS queries. In most cases, a namespace contains all the services for an application, such as a billing application. For more information, see [AWS Cloud Map namespaces](working-with-namespaces.md).

Service  
After creating a namespace, you create an AWS Cloud Map service for each type of resource for which you want to use AWS Cloud Map to locate endpoints. For example, you might create services for web servers and database servers.  
A service is a template that AWS Cloud Map uses when your application adds another resource, such as another web server. If you chose to locate resources using DNS when you created the namespace, a service contains information about the types of records that you want to use to locate the web server. A service also indicates whether you want to check the health of the resource and whether you want to use Amazon Route 53 health checks or a third-party health checker. For more information, see [AWS Cloud Map services](working-with-services.md).

Service instance  
When your application adds a resource, you can call the AWS Cloud Map [RegisterInstance](https://docs.aws.amazon.com/cloud-map/latest/api/API_RegisterInstance.html) API action in the code, which creates a AWS Cloud Map service instance in a service. The service instance contains information about how your application can locate the resource, whether using DNS or using the AWS Cloud Map [DiscoverInstances](https://docs.aws.amazon.com/cloud-map/latest/api/API_DiscoverInstances.html) API action.  
When your application needs to connect to a resource, it calls [DiscoverInstances](https://docs.aws.amazon.com/cloud-map/latest/api/API_DiscoverInstances.html) or utilizes public or private DNS queries by specifying the namespace and service that are associated with the resource. AWS Cloud Map returns information about how to locate one or more resources. If you specified health checking when you created the service, AWS Cloud Map returns only healthy instances. For more information, see [AWS Cloud Map service instances](working-with-instances.md).

## Accessing AWS Cloud Map
<a name="welcome-accessing-cloud-map"></a>

You can access AWS Cloud Map in the following ways:
+ **AWS Management Console** – The procedures throughout this guide explain how to use the AWS Management Console to perform tasks.
+ **AWS SDKs** – If you're using a programming language that AWS provides an SDK for, you can use an SDK to access AWS Cloud Map. SDKs simplify authentication, integrate easily with your development environment, and provide access to AWS Cloud Map commands. For more information, see [Tools for Amazon Web Services](https://aws.amazon.com/developer/tools/).
+ **AWS Command Line Interface** – For more information, see [Get started with the AWS CLI](https://docs.aws.amazon.com/cli/latest/userguide/cli-chap-getting-started.html) in the *AWS Command Line Interface User Guide*.
+ **AWS Tools for Windows PowerShell** – For more information, see [Get started with the AWS Tools for Windows PowerShell](https://docs.aws.amazon.com/powershell/latest/userguide/pstools-getting-started.html) in the *AWS Tools for PowerShell User Guide*.
+ **AWS Cloud Map API** – If you're using a programming language that an SDK isn't available for, see the [AWS Cloud Map API Reference](https://docs.aws.amazon.com/cloud-map/latest/api/) for information about API actions and about how to make API requests.
**Note**  
**IPv6 Client Support** – As of June 22nd, 2023 in all new regions, any commands sent to AWS Cloud Map from `IPv6` clients are routed to a new **dualstack endpoint** (`servicediscovery.<region>.api.aws`). AWS Cloud Map `IPv6`-only networks are reachable for both **legacy** (`servicediscovery.<region>.amazonaws.com`) and **dualstack endpoint**s in the following regions that were released prior to June 22nd, 2023:  
US East (Ohio) – us-east-2
US East (N. Virginia) – us-east-1
US West (N. California) – us-west-1
US West (Oregon) – us-west-2
Africa (Cape Town) – af-south-1
Asia Pacific (Hong Kong) – ap-east-1
Asia Pacific (Hyderabad) – ap-south-2
Asia Pacific (Jakarta) – ap-southeast-3
Asia Pacific (Melbourne) – ap-southeast-4
Asia Pacific (Mumbai) – ap-south-1
Asia Pacific (Osaka) – ap-northeast-3
Asia Pacific (Seoul) – ap-northeast-2
Asia Pacific (Singapore) – ap-southeast-1
Asia Pacific (Sydney) – ap-southeast-2
Asia Pacific (Tokyo) – ap-northeast-1
Canada (Central) – ca-central-1
Europe (Frankfurt) – eu-central-1
Europe (Ireland) – eu-west-1
Europe (London) – eu-west-2
Europe (Milan) – eu-south-1
Europe (Paris) – eu-west-3
Europe (Spain) – eu-south-2
Europe (Stockholm) – eu-north-1
Europe (Zurich) – eu-central-2
Middle East (Bahrain) – me-south-1
Middle East (UAE) – me-central-1
South America (São Paulo) – sa-east-1
AWS GovCloud (US-East) – us-gov-east-1
AWS GovCloud (US-West) – us-gov-west-1

## AWS Identity and Access Management
<a name="IAMRoute53"></a>

AWS Cloud Map integrates with AWS Identity and Access Management (IAM), a service that your organization can use to do the following actions:
+ Create users and groups under your organization's AWS account
+ Share your AWS account resources among the users in the account in an efficient manner
+ Assign unique security credentials to each user
+ Granularly control user access to services and resources

For example, you can use IAM with AWS Cloud Map to control which users in your AWS account can create a new namespace or register instances.

For general information about IAM, see the following resources:
+ [Identity and Access Management for AWS Cloud Map](security-iam.md)
+ [AWS Identity and Access Management](https://aws.amazon.com/iam/)
+ [IAM User Guide](https://docs.aws.amazon.com/IAM/latest/UserGuide/)

## AWS Cloud Map Pricing
<a name="cloud-map-pricing"></a>

AWS Cloud Map pricing is based on resources that you register in the service registry and API calls that you make to discover them. With AWS Cloud Map there are no upfront payments, and you only pay for what you use.

Optionally, you can enable DNS-based discovery for the resources with IP addresses. You can also enable health checking for your resources using Amazon Route 53 health checks, whether you're discovering instances using API calls or DNS queries. You will incur additional charges related to Route 53 DNS and health check usage.

For more information, see [AWS Cloud Map Pricing](https://aws.amazon.com/cloud-map/pricing/).

## AWS Cloud Map and AWS Cloud Compliance
<a name="compliance"></a>

For information about AWS Cloud Map compliance with various security compliance regulations and audits standards, see the following pages:
+ [AWS Cloud Compliance](https://aws.amazon.com/compliance/)
+ [AWS Services in Scope by Compliance Program](https://aws.amazon.com/compliance/services-in-scope/)