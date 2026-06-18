

# What is Amazon Elastic VMware Service?
<a name="what-is-evs"></a>

You can use Amazon Elastic VMware Service (Amazon EVS) to deploy and run a VMware Cloud Foundation (VCF) environment directly on EC2 bare metal instances within Amazon Virtual Private Cloud (VPC).

**Topics**
+ [Features of Amazon EVS](#servicename-feature-overview)
+ [Get started with Amazon EVS](#get-started-evs)
+ [Accessing Amazon EVS](#accessing-evs)
+ [Concepts and components of Amazon EVS](concepts.md)
+ [Amazon EVS architecture](architecture.md)

## Features of Amazon EVS
<a name="servicename-feature-overview"></a>

The following are key features of Amazon EVS:

 **Simplify and accelerate your migration to AWS **   
Remove migration friction and ensure operational consistency with subscription portability and automated deployment of VMware Cloud Foundation (VCF) in the cloud. Extend on-premises networks and migrate workloads without having to change IP addresses, retrain staff, or re-write operational runbooks.

 **Retain control of your VMware architecture in the cloud**   
Keep complete control over your VMware architecture and optimize a virtualization stack that meets the unique demands of your applications, including add-ons and third-party solutions.

 **Self-manage or leverage AWS Partners for a managed experience**   
Unlock choice and flexibility to self-manage, or leverage the expertise of AWS Partners to manage and operate your VCF environment on AWS to meet your business goals across talent, time, and costs.

 **Scale and protect your business from disruptions**   
Enhance scalability on the most secure, scalable, and resilient cloud for migrating and operating your VMware-based workloads.

 **Embrace AWS innovation to transform your applications and infrastructure**   
As an AWS-native service, Amazon EVS simplifies extending and expanding your VMware environment with 200\+ services (including managed databases, analytics, serverless and containers, and generative AI) to transform your business.

## Get started with Amazon EVS
<a name="get-started-evs"></a>

To create your first Amazon EVS environment, see [Getting started with Amazon Elastic VMware Service](getting-started.md). In general, getting started with Amazon EVS involves completing the following steps.

1. Complete prerequisites. For more information, see [Setting up Amazon Elastic VMware Service](setting-up.md).

1. Create an Amazon EVS environment. During environment creation, Amazon EVS creates the required VLAN subnets using the CIDR ranges that you specify and adds hosts to the environment.

1. Customize VCF. Configure your environment in the vSphere user interface according to your needs. This may include setting up logins, policies, monitoring, and more.

1. Connect and migrate. Connect your environment to your on-premises data center and migrate your VCF workloads to Amazon EVS.

## Accessing Amazon EVS
<a name="accessing-evs"></a>

You can define and configure your Amazon EVS deployments using the following interfaces:
+ Amazon EVS console - Provides a web interface to create Amazon EVS environments.
+  AWS CLI - Provides commands for a broad set of AWS services and is supported on Windows, macOS, and Linux. For more information, see [AWS Command Line Interface](https://aws.amazon.com/cli).
+  AWS CloudFormation - Provides a specification for each resource type, such as `AWS::EVS::Environment`. You create a template using the resource specification, and CloudFormation takes care of provisioning and configuring the resources for you.