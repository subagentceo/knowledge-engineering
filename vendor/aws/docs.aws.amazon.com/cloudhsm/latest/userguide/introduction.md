

# What is AWS CloudHSM?
<a name="introduction"></a>

AWS CloudHSM combines the benefits of the AWS cloud with the security of hardware security modules (HSMs). A hardware security module (HSM) is a computing device that processes cryptographic operations and provides secure storage for cryptographic keys. With AWS CloudHSM, you have complete control over high availability HSMs that are in the AWS Cloud, have low-latency access, and a secure root of trust that automates HSM management (including backups, provisioning, configuration, and maintenance). 

AWS CloudHSM offers customers a variety of benefits:

**Access to FIPS and non-FIPS clusters**  
AWS CloudHSM offers clusters in two modes: *FIPS* and *non-FIPS*. In FIPS mode, only Federal Information Processing Standard (FIPS) validated keys and algorithms can be used. Non-FIPS mode offers all the keys and algorithms that are supported by AWS CloudHSM, regardless of FIPS approval. For more information, see [AWS CloudHSM cluster modes](cluster-hsm-types.md).

**HSMs are general purpose, single tenant, and either FIPS 140-2 level-3 or FIPS 140-3 level-3 validated for clusters in FIPS mode**  
AWS CloudHSM uses general purpose HSMs that provide more flexibility when compared to the fully-managed AWS services that have predetermined algorithms and key lengths for your application. We offer HSMs that are standards-compliant, single-tenant, and are either FIPS 140-2 level-3 or FIPS 140-3 level-3 validated for clusters in FIPS mode. For customers with use cases outside the restrictions of FIPS 140-2 or FIPS 140-3 level-3 validation, AWS CloudHSM also offers clusters in non-FIPS mode. See [AWS CloudHSM clusters](clusters.md) for more information.

**E2E encryption is not visible to AWS**  
Because your data plane is end-to-end (E2E) encrypted and not visible to AWS, you control your own user management (outside of IAM roles). The trade off for this control is you have more responsibility than if you used a managed AWS service. 

**Full control of your keys, algorithms, and application development**  
AWS CloudHSM gives you full control of the algorithms and keys you use. You can generate, store, import, export, manage, and use cryptographic keys (including, session keys, token keys, symmetric keys and asymmetric key pairs). Additionally, AWS CloudHSM SDKs give you full control over application development, application language, threading, and where your applications physically exist.

**Migrate your cryptographic workloads to the cloud**  
Customers migrating public key infrastructure that use Public Key Cryptography Standards \#11 (PKCS \#11), Java Cryptographic Extension (JCE), Cryptography API: Next Generation (CNG), or Key Storage Provider (KSP) can migrate to AWS CloudHSM with fewer changes to their application.

To learn more about what you can do with AWS CloudHSM, see the following topics. When you are ready to get started with AWS CloudHSM, see [Getting started](getting-started.md). 

**Note**  
If you want a managed service for creating and controlling your encryption keys but you don't want or need to operate your own HSMs, consider using [AWS Key Management Service](https://aws.amazon.com/kms/).  
If you are looking for an elastic service that manages payment HSMs and keys for payment processing applications in the cloud, consider using [AWS Payment Cryptography](https://aws.amazon.com/payment-cryptography/). 

**Topics**
+ [Use cases](use-cases.md)
+ [How it works](whatis-concepts.md)
+ [Pricing for AWS CloudHSM](pricing.md)