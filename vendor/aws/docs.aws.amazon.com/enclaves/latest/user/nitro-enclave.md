

# What is Nitro Enclaves?
<a name="nitro-enclave"></a>

AWS Nitro Enclaves is an Amazon EC2 feature that allows you to create isolated execution environments, called *enclaves*, from Amazon EC2 instances. Enclaves are separate, hardened, and highly-constrained virtual machines. They provide only secure local socket connectivity with their parent instance. They have no persistent storage, interactive access, or external networking. Users cannot SSH into an enclave, and the data and applications inside the enclave cannot be accessed by the processes, applications, or users (root or admin) of the parent instance. Using Nitro Enclaves, you can secure your most sensitive data, such as personally identifiable information (PII), and your data processing applications.

![Overview](http://docs.aws.amazon.com/enclaves/latest/user/images/enclave-overview.png)


**Note**  
Nitro Enclaves is processor agnostic and it is supported on most Intel, AMD, and AWS Graviton-based Amazon EC2 instance types built on the AWS Nitro System.

Nitro Enclaves also supports an attestation feature, which allows you to verify an enclave's identity and ensure that only authorized code is running inside it. Nitro Enclaves is integrated with the AWS Key Management Service, which provides built-in support for attestation and enables you to prepare and protect your sensitive data for processing inside enclaves. Nitro Enclaves can also be used with other key management services.

Nitro Enclaves use the same Nitro Hypervisor technology that provides CPU and memory isolation for Amazon EC2 instances in order to isolate the vCPUs and memory for an enclave from a parent instance. The Nitro Hypervisor ensures that the parent instance has no access to the isolated vCPUs and memory of the enclave.

To learn more about creating your first enclave using a sample enclave application, see [Getting started with the Hello Enclaves sample application](getting-started.md).

**Topics**
+ [Learn more](#learn-more)
+ [Requirements](#nitro-enclave-reqs)
+ [Considerations](#nitro-enclave-considerations)
+ [Pricing](#nitro-enclave-pricing)
+ [Related services](#nitro-enclave-related)

## Learn more
<a name="learn-more"></a>
+ To learn about the concepts used in Nitro Enclaves, see [Nitro Enclaves concepts](nitro-enclave-concepts.md).
+ To get started with your first enclave using a sample enclave application, see [Getting started with the Hello Enclaves sample application](getting-started.md).
+ To learn about using the AWS Nitro Enclaves CLI to manage the lifecycle of enclaves, see [Nitro Enclaves Command Line Interface](nitro-enclave-cli.md).
+ To learn about developing custom enclave applications and the AWS Nitro Enclaves SDK, see [Nitro Enclaves application development](developing-applications.md).
+ To learn about multiple enclaves, see [Working with multiple enclaves](multiple-enclaves.md).

## Requirements
<a name="nitro-enclave-reqs"></a>

Nitro Enclaves has the following requirements:
+ **Parent instance requirements:**
  + The parent instance must use one of the following instance types and a Linux or Windows (2016 or later) operating system.

------
#### [ General purpose ]    
[See the AWS documentation website for more details](http://docs.aws.amazon.com/enclaves/latest/user/nitro-enclave.html)

------
#### [ Compute optimized ]    
[See the AWS documentation website for more details](http://docs.aws.amazon.com/enclaves/latest/user/nitro-enclave.html)

------
#### [ Memory optimized ]    
[See the AWS documentation website for more details](http://docs.aws.amazon.com/enclaves/latest/user/nitro-enclave.html)

------
#### [ Storage optimized ]    
[See the AWS documentation website for more details](http://docs.aws.amazon.com/enclaves/latest/user/nitro-enclave.html)

------
#### [ Accelerated computing ]    
[See the AWS documentation website for more details](http://docs.aws.amazon.com/enclaves/latest/user/nitro-enclave.html)

------
+ **Enclave requirements:**
  + The enclave must run a Linux operating system.

## Considerations
<a name="nitro-enclave-considerations"></a>

Keep the following in mind when using Nitro Enclaves:
+ Nitro Enclaves is supported in all AWS Regions, including the AWS GovCloud (US) Regions.
+ You can create up to four individual enclaves per parent instance.
+ Enclaves can communicate only with the parent instance. Enclaves running on the same or different parent instances cannot communicate with each other.
+ Enclaves are active only while their parent instance is in the `running` state. If the parent instance is stopped or terminated, its enclaves are terminated.
+ You cannot enable hibernation and enclaves on the same instance.
+ Nitro Enclaves is not supported on Outposts.
+ Nitro Enclaves is not supported in Local Zones or Wavelength Zones.

## Pricing
<a name="nitro-enclave-pricing"></a>

There are no additional charges for using Nitro Enclaves. You are billed the standard charges for the Amazon EC2 instance and for the other AWS services that you use.

## Related services
<a name="nitro-enclave-related"></a>

Nitro Enclaves is integrated with the following AWS services:

**AWS Key Management Service**  
AWS Key Management Service (KMS) makes it easy for you to create and manage cryptographic keys and control their use across a wide range of AWS services and in your applications. Nitro Enclaves integrates with AWS KMS and it allows you to perform selected KMS operations from the enclave using the [AWS Nitro Enclaves SDK](https://github.com/aws/aws-nitro-enclaves-sdk-c). These operations can be tied to the [cryptographic attestation](set-up-attestation.md) process of Nitro Enclaves by setting a AWS KMS key policy to ensure that the operation works only when the measurements of the enclave match the KMS key policy. For more information, see [AWS KMS condition keys for Nitro Enclaves](https://docs.aws.amazon.com/kms/latest/developerguide/policy-conditions.html#conditions-nitro-enclaves) in the *AWS Key Management Service Developer Guide*.

**AWS Certificate Manager**  
AWS Certificate Manager (ACM) is a service that lets you easily provision, manage, and deploy public and private Secure Sockets Layer/Transport Layer Security (SSL/TLS) certificates for use with AWS services and your internal connected resources. SSL/TLS certificates are used to secure network communications and to establish the identity of websites over the internet, as well as resources on private networks. ACM removes the time-consuming manual process of purchasing, uploading, and renewing SSL/TLS certificates. For more information, see [AWS Certificate Manager for Nitro Enclaves](nitro-enclave-refapp.md).