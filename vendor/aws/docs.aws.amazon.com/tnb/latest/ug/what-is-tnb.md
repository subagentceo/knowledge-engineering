

# What is AWS Telco Network Builder?
<a name="what-is-tnb"></a>

AWS Telco Network Builder (AWS TNB) is an AWS service that provides communication service providers (CSPs) with an efficient way to deploy, manage, and scale 5G networks on AWS infrastructure.

With AWS TNB, you deploy scalable and secure 5G networks in the AWS Cloud using an image of your network in an automated manner. You don't need to learn new technologies, decide which compute service to use, or know how to provision and configure AWS resources.

Instead, you describe your network's infrastructure and provide the software images of network functions from your independent software vendor (ISV) partners. AWS TNB integrates with third-party service orchestrators and AWS services to automatically provision the necessary AWS infrastructure, deploy containerized network functions, and configure networking and access management to create a fully operational network service.

The following diagram illustrates the logical integrations between AWS TNB and service orchestrators to deploy network functions by using European Telecommunications Standards Institute (ETSI)-based standard interfaces.

![AWS TNB deploys network functions and integrates with service orchestrators.](http://docs.aws.amazon.com/tnb/latest/ug/images/tnb-basic-architecture.png)


**Topics**
+ [New to AWS?](#new-to-aws)
+ [Who is AWS TNB for?](#who-is-tnb-for)
+ [AWS TNB features](#why-use-tnb)
+ [Accessing AWS TNB](#accessing-tnb)
+ [Pricing for AWS TNB](#pricing-tnb)
+ [What's next](#whats-next-tnb)

## New to AWS?
<a name="new-to-aws"></a>

If you are new to AWS products and services, begin learning more with the following resources:
+ [Introduction to AWS](https://aws.amazon.com/what-is-aws/)
+ [Getting started with AWS](https://aws.amazon.com/getting-started/)

## Who is AWS TNB for?
<a name="who-is-tnb-for"></a>

AWS TNB is for CSPs looking to take advantage of the cost-efficiencies, agility, and elasticity the AWS Cloud offers without writing and maintaining custom scripts and configurations to design, deploy, and manage network services. AWS TNB automatically provisions the necessary AWS infrastructure, deploys containerized network functions, and configures networking and access management to create fully operational network services based on the CSP-defined network service descriptors, and the network functions that the CSP wants to deploy.

## AWS TNB features
<a name="why-use-tnb"></a>

The following are some of the reasons that a CSP would want to use AWS TNB:

**Helps simplify tasks**  
Provide more efficiency to your network operations, such as deploying new services, updating and upgrading network functions, and changing network infrastructure topologies.

**Integrates with orchestrators**  
AWS TNB integrates with popular third-party service orchestrators that are ETSI-compliant.

**Scales**  
You can configure AWS TNB to scale underlying AWS resources to meet traffic demand, more efficiently perform network function updates, roll out network infrastructure topology changes, and reduce deployment time of new 5G services from days to hours.

**Inspects and monitors AWS resources**  
AWS TNB lets you Inspect and monitor the AWS resources that support your network on a single dashboard, such as Amazon VPC, Amazon EC2, and Amazon EKS.

**Supports service templates**  
AWS TNB allows you to create service templates for all telecom workloads (RAN, Core, IMS). You can create a new service definition, reuse an existing template, or integrate with a continuous integration and continuous delivery (CI/CD) pipeline to publish a new definition.

**Tracks changes to network deployments**  
When you change the underlying configuration of a network function deployment, for example, changing the instance type of an Amazon EC2 instance type, you can track the changes in a repeatable and scalable manner. Doing so manually would require managing the state of the network, creating and deleting resources, and paying attention to the order of the changes needed. When you use AWS TNB to manage the lifecycle of your network function, you only make the changes to your network service descriptors describing the network function. AWS TNB will then automatically make the required changes in the correct order.

**Simplifies the network function lifecycle**  
You can manage the first and all subsequent versions of a network function and specify when to upgrade. You can also manage your RAN, Core, IMS, and network applications in the same way. 

## Accessing AWS TNB
<a name="accessing-tnb"></a>

You can create, access, and manage your AWS TNB resources using any of the following interfaces:
+ **AWS TNB console** — Provides a web interface for managing your network.
+ **AWS TNB API** — Provides a RESTful API for performing AWS TNB actions. For more information see [AWS TNB API Reference](https://docs.aws.amazon.com/tnb/latest/APIReference/Welcome.html)
+ **AWS Command Line Interface (AWS CLI)** — Provides commands for a broad set of AWS services, including AWS TNB. It's supported on Windows, macOS, and Linux. For more information, see the [AWS Command Line Interface User Guide](https://docs.aws.amazon.com/cli/latest/userguide/).
+ **AWS SDKs** – Provides language-specific APIs and completes many of the connection details. These include calculating signatures, handling request retries, and error handling. For more information, see [AWS SDKs](https://aws.amazon.com/developer/tools/).

## Pricing for AWS TNB
<a name="pricing-tnb"></a>

AWS TNB helps CSPs automate the deployment and management of their telecom networks on AWS. You pay for the following two dimensions when you use AWS TNB:
+ By managed network function item (MNFI) hours.
+ By number of API requests.

You also incur additional charges as you use other AWS services in conjunction with AWS TNB. For more information, see [AWS TNB Pricing](https://aws.amazon.com/tnb/pricing/).

To view your bill, go to the **Billing and Cost Management Dashboard** in the [AWS Billing and Cost Management console](https://console.aws.amazon.com/billing/). Your bill contains links to usage reports that provide additional details about your bill. For more information about AWS account billing, see [AWS Account Billing](https://docs.aws.amazon.com/awsaccountbilling/latest/aboutv2/).

If you have questions concerning AWS billing, accounts, and events, [contact AWS Support](https://aws.amazon.com/contact-us/).

AWS Trusted Advisor is a service that you can use to help optimize the costs, security, and performance of your AWS environment. For more information, see [AWS Trusted Advisor](https://aws.amazon.com/premiumsupport/technology/trusted-advisor/).

## What's next
<a name="whats-next-tnb"></a>

For more information about how to get started with AWS TNB, see the following topics:
+ [Setting up AWS TNB](setting-up.md) – Complete the prerequisite steps.
+ [Getting started with AWS TNB](getting-started.md) – Deploy your first network function, such as Centralized Unit (CU), Access and Mobility Management Function (AMF), User Plane Function (UPF), or a complete 5G Core.