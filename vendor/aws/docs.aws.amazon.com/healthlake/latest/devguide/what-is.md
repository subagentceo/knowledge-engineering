

# What is AWS HealthLake?
<a name="what-is"></a>

AWS HealthLake is a HIPAA eligible service for storing, analyzing, and sharing health data in the cloud using the Fast Healthcare Interoperability Resources (FHIR) R4 specification. HealthLake use cases include:
+ **Enterprise health data** – Manage and share FHIR R4 health data directly from AWS Cloud while preserving high performance and availability.
+ **Healthcare interoperability** – Support customer conformance with 21st Century Cures Act for patient access through a fully managed FHIR data store.
+ **Natural language processing (NLP)** – Utilize integrated NLP models to extract meaningful medical information from unstructured health data.
+ **Multimodal analysis** – Combine HealthLake data with AWS HealthImaging data and AWS HealthOmics data to deliver insights for precision medicine.

![Architecture diagram showing AWS HealthLake processes and integrations with other AWS services.](http://docs.aws.amazon.com/healthlake/latest/devguide/images/ahl-overview-architecture-diagram.png)


**Topics**
+ [Important notice](#what-is-important-notice)
+ [Features](#what-is-features)
+ [Related services](#what-is-related-services)
+ [Accessing](#what-is-accessing)
+ [HIPAA](#what-is-hipaa)
+ [Pricing](#what-is-pricing)

## Important notice
<a name="what-is-important-notice"></a>

AWS HealthLake is not a substitute for professional medical advice, diagnosis, or treatment, and is not intended to cure, treat, mitigate, prevent, or diagnose any disease or health condition. You are responsible for instituting human review as part of any use of AWS HealthLake, including in association with any third-party product intended to inform clinical decision-making. **AWS HealthLake should only be used in patient care or clinical scenarios after review by trained medical professionals applying sound medical judgment.**



## Features of AWS HealthLake
<a name="what-is-features"></a>

AWS HealthLake provides the following features.

**Import FHIR R4 health data**  
With the HealthLake native import action, you can easily migrate your FHIR data from an Amazon S3 bucket to an HealthLake data store, including clinical notes, lab reports, insurance claims, and more. HealthLake supports the FHIR R4 specification for health care data exchange. If needed, you can work with an [AWS HealthLake Partner](https://aws.amazon.com/healthlake/partners/) to convert your health data to FHIR R4 format.

**Store health data in a secure, compliant, and auditable manner**  
A HealthLake data store helps index health data so it can be queried. The data store creates a complete view of each patient’s medical history in chronological order and facilitates information exchange using the FHIR R4 specification. And it's always running to keep your index up to date, offering you the ability to search the information anytime using standard FHIR R4 interactions with durable primary storage and index scaling.

**Leverage transactional FHIR server**  
Leverage FHIR APIs for standard resource validation, SMART on FHIR authorization, and Bulk data FHIR API export capabilities to support unifying and analyzing your data to reduce operational costs and improve decision making. HealthLake supports customer conformity to the latest ONC and CMS regulatory standards including: HL7 FHIR R4 APIs, FHIR Bulk Data Access, US Core IG STU, HL7 SMART App Launch Framework IG, OAuth 2.0, and OpenID Connect.

**Transform unstructured medical data using NLP**  
Integrated medical natural language processing (NLP) transforms all raw medical text data in a HealthLake data store to understand and extract meaningful information from unstructured healthcare data. With integrated medical NLP, you can automatically extract entities, entity relationships, entity traits, and protected health information (PHI) from your medical text. The NLP-extracted entities are stored as native FHIR R4 resources within a HealthLake data store and can be accessed through FHIR R4 APIs or Amazon Athena (SQL).

## Related AWS services
<a name="what-is-related-services"></a>

AWS HealthLake features tight integration with other AWS services. A knowledge of the following services is useful to fully leverage HealthLake.
+ [AWS Identity and Access Management](https://aws.amazon.com/iam/) – Use IAM to securely manage identities and access to HealthLake resources.
+ [Amazon Simple Storage Service](https://aws.amazon.com/s3/) – Use Amazon S3 as a staging area to import DICOM data into HealthLake.
+ [AWS CloudTrail](https://aws.amazon.com/cloudtrail/) – Use CloudTrail to track HealthLake user activity and API usage.
+ [Amazon CloudWatch](https://aws.amazon.com/cloudwatch/) – Use CloudWatch to observe and monitor HealthLake resources.
+ [AWS CloudFormation](https://aws.amazon.com/cloudformation/) – Use CloudFormation to implement infrastructure as code (IaC) templates to create resources in HealthLake.
+ [AWS PrivateLink](https://aws.amazon.com/privatelink/) – Use Amazon VPC to establish connectivity between HealthLake and [Amazon Virtual Private Cloud](https://aws.amazon.com/vpc/) without exposing data to the internet.
+ [Amazon EventBridge](https://aws.amazon.com/eventbridge/) – Use EventBridge to create scalable, event-driven applications by creating rules that route HealthLake events to targets.
+ [AWS Lake Formation](https://aws.amazon.com/lake-formation/) – Use Lake Formation to centrally govern, secure, and share HealthLake data for analytics and machine learning.
+ [Amazon Athena](https://aws.amazon.com/athena/) – Use Athena to query HealthLake data with SQL to allow for deeper analysis.

## Accessing AWS HealthLake
<a name="what-is-accessing"></a>

You can access AWS HealthLake using the AWS Management Console, AWS Command Line Interface and the AWS SDKs. This guide provides procedural instructions for the AWS Management Console and code examples for the AWS CLI and AWS SDKs.

**AWS Command Line Interface (AWS CLI)**  
The AWS CLI provides commands for a broad set of AWS products, and is supported on Windows, Mac, and Linux. For more information, see the [https://docs.aws.amazon.com/cli/latest/userguide/](https://docs.aws.amazon.com/cli/latest/userguide/).

**AWS SDKs**  
AWS SDKs provide libraries, code examples, and other resources for software developers. These libraries provide basic functions that automate tasks such as cryptographically signing your requests, retrying requests, and handling error responses. For more information, see [Tools to Build on AWS](https://aws.amazon.com/developer/tools/).

**AWS Management Console**  
The AWS Management Console provides a web-based user interface for managing HealthLake and its associated resources. If you've signed up for an AWS account, you can sign in to the [HealthLake Console](https://console.aws.amazon.com/healthlake/home#).

## HIPAA eligibility and data security
<a name="what-is-hipaa"></a>

This is a HIPAA Eligible Service. For more information about AWS, U.S. Health Insurance Portability and Accountability Act of 1996 (HIPAA), and using AWS services to process, store, and transmit protected health information (PHI), see [HIPAA Overview](https://aws.amazon.com/compliance/hipaa-compliance/).

Connections to HealthLake containing PHI and personally identifiable information (PII) must be encrypted. By default, all connections to HealthLake use HTTPS over TLS. HealthLake stores encrypted customer content and operates according to the [AWS Shared Responsibility Model](https://aws.amazon.com/compliance/shared-responsibility-model/).

## Pricing
<a name="what-is-pricing"></a>

For HealthLake pricing information, see [AWS HealthLake pricing](https://aws.amazon.com/healthlake/pricing/). To estimate costs, use the [ HealthLake pricing calculator](https://calculator.aws/#/addService/HealthLake).