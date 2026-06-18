

# AWS Security Platform as a Service - Multi-cloud security operations console
<a name="aws-security-platform-as-a-service"></a>


|  |  | 
| --- |--- |
| AWS experience | Intermediate | 
| Time to complete | 2 hours | 
| Cost to complete | See services for specific pricing details. | 
| Services used | [Amazon OpenSearch Service](https://aws.amazon.com/opensearch-service/), [Amazon Security Lake](https://aws.amazon.com/security-lake/), [Amazon GuardDuty](https://aws.amazon.com/guardduty/), [Amazon Inspector](https://aws.amazon.com/inspector/), [AWS Systems Manager](https://aws.amazon.com/systems-manager/), and [AWS Security Hub CSPM](https://aws.amazon.com/security-hub/)  | 
| Last updated | January 12, 2026 | 

## Overview
<a name="overview"></a>

This tutorial shows you how to implement a complete AWS Security Platform as a Service (PaaS) that provides a unified security operations console. You'll learn to integrate Cloud Security Posture Management (CSPM), Security Information and Event Management (SIEM), and Cloud Workload Protection Platform (CWPP) capabilities through a single interface with multi-cloud support.

This tutorial focuses on [Microsoft Azure](https://azure.microsoft.com/) and [Google Cloud Platform](https://cloud.google.com/) integration, but you can apply the same approach to any cloud provider or on-premises.

### What you will accomplish
<a name="what-you-will-accomplish"></a>
+ Monitor security across multiple cloud providers from a single console
+ Detect threats and vulnerabilities in real time
+ Maintain compliance posture across your multi-cloud infrastructure
+ Respond to security incidents efficiently with centralized analytics

### Prerequisites
<a name="prerequisites"></a>

For this tutorial, you'll need:
+ An AWS account with administrator-level access: If you don't already have one, follow the [Setting Up Your AWS Environment](https://aws.amazon.com/getting-started/guides/setup-environment/) getting started guide for a quick overview
+ Active subscriptions to Microsoft Azure and Google Cloud Platform
+ [AWS CLI](https://docs.aws.amazon.com/cli/latest/userguide/install-cliv2.html) installed
  + See [Installing or updating the latest version of the AWS CLI](https://docs.aws.amazon.com/cli/latest/userguide/getting-started-install.html)
+ Node.js: Version 18.x or later
  + Download from [nodejs.org](https://nodejs.org/en/download)
+ AWS CDK: Installed globally 
  + Installation command: `npm install -g aws-cdk`
+ Security Lake: Preconfigured Amazon Security Lake instance with an Amazon S3 bucket
  + See [Getting started with Amazon Security Lake](https://docs.aws.amazon.com/security-lake/latest/userguide/getting-started.html)
+ AWS Lake Formation: Admin role configured for Security Lake operations
+ AWS Identity and Access Management (IAM) permissions: Sufficient permissions to create Lambda functions, SQS queues, KMS keys, and IAM roles

Azure integration requirements:
+ Azure Event Hub namespace and connection strings
+ Microsoft Defender for Cloud continuous export configured
+ Service principal with appropriate permissions

Google Cloud integration requirements:
+ Google Cloud Pub/Sub subscription configured
+ Service account credentials with Security Command Center permissions
+ Organization-level or project-level access