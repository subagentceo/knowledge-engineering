

# What is AWS HealthImaging?
<a name="what-is"></a>

AWS HealthImaging is a HIPAA eligible service that empowers health care providers, life science organizations, and their software partners to store, analyze, and share medical images in the cloud at petabyte scale. HealthImaging use cases include:
+ **Enterprise imaging** – Store and stream your medical imaging data directly from AWS Cloud while preserving low-latency performance and high availability.
+ **Long-term image archival** – Save cost on long-term image archival while maintaining subsecond image retrieval access.
+ **AI/ML development** – Run artificial intelligence and machine learning (AI/ML) inference over your imaging archive with support from other tools and services.
+ **Multimodal analysis** – Combine your clinical imaging data with AWS HealthLake (health data) and AWS HealthOmics (omics data) to deliver insights for precision medicine.

![Architecture diagram showing an overview of AWS HealthImaging processes and interactions with related AWS services.](http://docs.aws.amazon.com/healthimaging/latest/devguide/images/hi-overview.png)


AWS HealthImaging provides access to image data (e.g. X-Ray, CT, MRI, Ultrasound) so that medical imaging applications built in the cloud can achieve performance previously only possible on-premises. With HealthImaging, you reduce infrastructure costs by running your medical imaging applications at scale from a single, authoritative copy of each medical image in AWS Cloud.

**Topics**
+ [Important notice](#what-is-important-notice)
+ [Features](#what-is-features)
+ [Related services](#what-is-related-services)
+ [Accessing](#what-is-accessing)
+ [HIPAA](#what-is-hipaa)
+ [Pricing](#what-is-storage-pricing)

## Important notice
<a name="what-is-important-notice"></a>

AWS HealthImaging is not a substitute for professional medical advice, diagnosis, or treatment, and is not intended to cure, treat, mitigate, prevent, or diagnose any disease or health condition. You are responsible for instituting human review as part of any use of AWS HealthImaging, including in association with any third-party product intended to inform clinical decision-making. **AWS HealthImaging should only be used in patient care or clinical scenarios after review by trained medical professionals applying sound medical judgment.**



## Features of AWS HealthImaging
<a name="what-is-features"></a>

AWS HealthImaging provides the following features.

**Developer-friendly DICOM metadata**  
AWS HealthImaging simplifies application development by returning DICOM metadata in a developer-friendly format. After importing your imaging data, individual metadata attributes are accessible using human-friendly keywords rather than unfamiliar group/element hexadecimal numbers. Patient, Study, and Series level DICOM elements are [normalized](metadata-normalization.md), eliminating the need for application developers to deal with inconsistencies between SOP Instances. In addition, metadata attribute values are directly accessible in native runtime types.

**SIMD-accelerated image decoding**  
AWS HealthImaging returns image frames (pixel data) encoded as High Throughput JPEG 2000 (HTJ2K) images, an advanced image compression codec. HTJ2K takes advantage of single instruction multiple data (SIMD) on modern processors to deliver new levels of performance. HTJ2K is an order of magnitude faster than JPEG2000 and at least twice as fast as all other DICOM transfer syntaxes. WASM-SIMD can be utilized to bring this extreme speed to zero footprint web viewers. For more information, see [Supported transfer syntaxes](supported-transfer-syntaxes.md).

**Pixel data verification**  
AWS HealthImaging provides built-in pixel data verification by checking the lossless encoding and decoding state of every image during import. For more information, see [Pixel data verification](pixel-data-verification.md).

**Industry-leading performance**  
AWS HealthImaging sets a new standard for image loading performance thanks to its efficient metadata encoding, lossless compression, and progressive resolution data access. Efficient metadata encoding enables image viewers and AI algorithms to understand the contents of a DICOM study without having to load the image data. Images load faster without any compromise in image quality thanks to advanced image compression. Progressive resolution enables even faster image loading for thumbnails, regions of interest, and low-resolution mobile devices.

**Scalable DICOM imports**  
AWS HealthImaging imports leverage modern cloud native technologies to import multiple DICOM studies in parallel. Historical archives can be imported quickly without impacting clinical workloads for new data. For information about supported SOP instances and transfer syntaxes, see [DICOM](reference-dicom.md).

**Service managed DICOM data hierarchy**  
AWS HealthImaging automatically organizes DICOM P10 data on import by Patient, Study, and Series level DICOM data elements. The service organizes this DICOM data into image sets that correspond to DICOM series, simplifying post import workflows. The Study and Series level organization is maintained as new data is imported.

**DICOMweb API compatibility**  
AWS HealthImaging offers DICOMweb conformant APIs to simplify integrations and enable interoperability with existing applications. The service also offers cloud-native APIs that enable actions not supported by the DICOMweb standard, like metadata update operations.

## Related AWS services
<a name="what-is-related-services"></a>

AWS HealthImaging features tight integration with other AWS services. A knowledge of the following services is useful to fully leverage HealthImaging.
+ [AWS Identity and Access Management](https://aws.amazon.com/iam/) – Use IAM to securely manage identities and access to HealthImaging resources.
+ [Amazon Simple Storage Service](https://aws.amazon.com/s3/) – Use Amazon S3 as a staging area to import DICOM data into HealthImaging.
+ [Amazon CloudWatch](https://aws.amazon.com/cloudwatch/) – Use CloudWatch to observe and monitor HealthImaging resources.
+ [AWS CloudTrail](https://aws.amazon.com/cloudtrail/) – Use CloudTrail to track HealthImaging user activity and API usage.
+ [AWS CloudFormation](https://aws.amazon.com/cloudformation/) – Use CloudFormation to implement infrastructure as code (IaC) templates to create resources in HealthImaging.
+ [AWS PrivateLink](https://aws.amazon.com/privatelink/) – Use Amazon VPC to establish connectivity between HealthImaging and [Amazon Virtual Private Cloud](https://aws.amazon.com/vpc/) without exposing data to the internet.
+ [Amazon EventBridge](https://aws.amazon.com/eventbridge/) – Use EventBridge to create scalable, event-driven applications by creating rules that route HealthImaging events to targets.

## Accessing AWS HealthImaging
<a name="what-is-accessing"></a>

You can access AWS HealthImaging using the AWS Management Console, AWS Command Line Interface and the AWS SDKs. This guide provides procedural instructions for the AWS Management Console and code examples for the AWS CLI and AWS SDKs.

**AWS Management Console**  
The AWS Management Console provides a web-based user interface for managing HealthImaging and its associated resources. If you've signed up for an AWS account, you can sign in to the [HealthImaging console](https://console.aws.amazon.com/medical-imaging/home#).

**AWS Command Line Interface (AWS CLI)**  
The AWS CLI provides commands for a broad set of AWS products, and is supported on Windows, Mac, and Linux. For more information, see the [https://docs.aws.amazon.com/cli/latest/userguide/](https://docs.aws.amazon.com/cli/latest/userguide/).

**AWS SDKs**  
AWS SDKs provide libraries, code examples, and other resources for software developers. These libraries provide basic functions that automate tasks such as cryptographically signing your requests, retrying requests, and handling error responses. For more information, see [Tools to Build on AWS](https://aws.amazon.com/developer/tools/).

**HTTP requests**  
You can call HealthImaging actions using HTTP requests, but you must specify different endpoints depending on the type of actions being used. For more information, see [Supported API actions for HTTP requests](endpoints-quotas.md#supported-runtime-apis).

## HIPAA eligibility and data security
<a name="what-is-hipaa"></a>

This is a HIPAA Eligible Service. For more information about AWS, U.S. Health Insurance Portability and Accountability Act of 1996 (HIPAA), and using AWS services to process, store, and transmit protected health information (PHI), see [HIPAA Overview](https://aws.amazon.com/compliance/hipaa-compliance/).

Connections to HealthImaging containing PHI and personally identifiable information (PII) must be encrypted. By default, all connections to HealthImaging use HTTPS over TLS. HealthImaging stores encrypted customer content and operates according to the [AWS Shared Responsibility Model](https://aws.amazon.com/compliance/shared-responsibility-model/).

For information about compliance, see [Compliance validation for AWS HealthImaging](compliance-validation.md).

## Pricing
<a name="what-is-storage-pricing"></a>

HealthImaging helps you automate the lifecycle management of clinical data with intelligent tiering. For more information, see [Cost Optimization](cost-optimization.md).

For general pricing information, see [AWS HealthImaging pricing](https://aws.amazon.com/healthimaging/pricing/). To estimate costs, use the [AWS HealthImaging pricing calculator](https://calculator.aws/#/addService/healthimaging/).