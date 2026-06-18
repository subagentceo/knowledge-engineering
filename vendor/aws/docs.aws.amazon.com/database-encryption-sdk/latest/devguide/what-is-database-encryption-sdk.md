

# What is the AWS Database Encryption SDK?
<a name="what-is-database-encryption-sdk"></a>


****  

|  | 
| --- |
| Our client-side encryption library was renamed to the AWS Database Encryption SDK. This developer guide still provides information on the [DynamoDB Encryption Client](legacy-dynamodb-encryption-client.md). | 

The AWS Database Encryption SDK is a set of software libraries that enable you to include client-side encryption in your database design. The AWS Database Encryption SDK provides record-level encryption solutions. You specify which fields are encrypted and which fields are included in the signatures that ensure the authenticity of your data. Encrypting your sensitive data in transit and at rest helps ensure that your plaintext data isn’t available to any third party, including AWS. The AWS Database Encryption SDK is provided free of charge under the Apache 2.0 license.

This developer guide provides a conceptual overview of the AWS Database Encryption SDK, including an [introduction to its architecture](concepts.md), details about [how it protects your data](how-it-works.md), how it differs from [server-side encryption](client-server-side.md), and guidance on [selecting critical components for your application](configure.md) to help you get started.

The AWS Database Encryption SDK supports Amazon DynamoDB with *attribute*-level encryption.

The AWS Database Encryption SDK has the following benefits:

**Designed especially for database applications**  
You don’t need to be a cryptography expert to use the AWS Database Encryption SDK. The implementations include helper methods that are designed to work with your existing applications.   
After you create and configure the required components, the encryption client transparently encrypts and signs your records when you add them to a database, and verifies and decrypts them when you retrieve them.

**Includes secure encryption and signing**  
The AWS Database Encryption SDK includes secure implementations that encrypt the field values in each record using a unique data encryption key, and then sign the record to protect it against unauthorized changes, such as adding or deleting fields, or swapping encrypted values.

**Uses cryptographic materials from any source**  
The AWS Database Encryption SDK uses [keyrings](concepts.md#keyring-concept) to generate, encrypt, and decrypt the unique data encryption key that protects your record. Keyrings determine the [wrapping keys](concepts.md#wrapping-key) that encrypt that data key.   
You can use wrapping keys from any source, including cryptography services, such as [AWS Key Management Service](https://docs.aws.amazon.com/kms/latest/developerguide/) (AWS KMS) or [AWS CloudHSM](https://docs.aws.amazon.com/cloudhsm/latest/userguide/). The AWS Database Encryption SDK doesn't require an AWS account or any AWS service.

**Support for cryptographic materials caching**  
The [AWS KMS Hierarchical keyring](use-hierarchical-keyring.md) is a cryptographic materials caching solution that reduces the number of AWS KMS calls by using AWS KMS protected *branch keys* persisted in an Amazon DynamoDB table, and then locally caching branch key materials used in encrypt and decrypt operations. It allows you to protect your cryptographic materials under a symmetric encryption KMS key without calling AWS KMS every time you encrypt or decrypt a record. The AWS KMS Hierarchical keyring is a good choice for applications that need to minimize calls to AWS KMS.

**Searchable encryption**  
You can design databases that can search encrypted records without decrypting the entire database. Depending on your threat model and query requirements, you can use [searchable encryption](searchable-encryption.md) to perform exact match searches or more customized complex queries on your encrypted database.

**Support for multitenant database schemas**  
The AWS Database Encryption SDK enables you to protect data stored in databases with a shared schema by isolating each tenant with distinct encryption materials. If you have multiple users performing encrypt operations within your database, use one of the AWS KMS keyrings to provide each user with a distinct key to use in their cryptographic operations. For more information, see [Working with multitenant databases](configure.md#config-multitenant-databases).

**Support for seamless schema updates**  
When you configure the AWS Database Encryption SDK, you provide [cryptographic actions](concepts.md#crypt-actions) that tell the client which fields to encrypt and sign, which fields to sign (but not encrypt), and which to ignore. After you have used the AWS Database Encryption SDK to protect your records, you can still [make changes to your data model](ddb-update-data-model.md). You can update your cryptographic actions, such as adding or removing encrypted fields, in a single deployment.

## Developed in open-source repositories
<a name="dbesdk-repos"></a>

The AWS Database Encryption SDK is developed in open-source repositories on GitHub. You can use these repositories to view the code, read and submit issues, and find information that is specific to your implementation. 

**The AWS Database Encryption SDK for DynamoDB**
+ The [aws-database-encryption-sdk-dynamodb](https://github.com/aws/aws-database-encryption-sdk-dynamodb/) repository on GitHub supports the latest versions of the AWS Database Encryption SDK for DynamoDB in Java, .NET, and Rust.

  The AWS Database Encryption SDK for DynamoDB is a product of [Dafny](https://github.com/dafny-lang/dafny/blob/master/README.md), a verification-aware language in which you write specifications, the code to implement them, and the proofs to test them. The result is a library that implements the features of the AWS Database Encryption SDK for DynamoDB in a framework that assures functional correctness.

## Support and maintenance
<a name="support"></a>

The AWS Database Encryption SDK uses the same [maintenance policy](https://docs.aws.amazon.com/sdkref/latest/guide/maint-policy.html) that the AWS SDK and Tools use, including its versioning and lifecycle phases. As a best practice, we recommend that you use the latest available version of the AWS Database Encryption SDK for your database implementation, and upgrade as new versions are released. The life-cycle and support phase of each version may vary among programming languages. For example, a given version of the AWS Database Encryption SDK might be in the general availability (full support) phase in one programming language, but the end-of-support phase in a different programming language. To find the life-cycle phase of AWS Database Encryption SDK versions for your programming language, see the [SUPPORT\_POLICY.rst](https://github.com/aws/aws-database-encryption-sdk-dynamodb/tree/main/SUPPORT_POLICY.rst) file in the AWS Database Encryption SDK repository.

For more information, see the [AWS SDKs and Tools maintenance policy](https://docs.aws.amazon.com/sdkref/latest/guide/maint-policy.html) in the AWS SDKs and Tools Reference Guide.

## Sending feedback
<a name="feedback"></a>

We welcome your feedback\! If you have a question or comment, or an issue to report, please use the following resources.

If you discover a potential security vulnerability in the AWS Database Encryption SDK, please [notify AWS security](https://aws.amazon.com/security/vulnerability-reporting/). Do not create a public GitHub issue.

To provide feedback on this documentation, use the feedback link on any page.

## Sign up for an AWS account
<a name="sign-up-for-aws"></a>

To get started with AWS, you need an AWS account. For information about creating an AWS account, see [Getting started with an AWS account](https://docs.aws.amazon.com//accounts/latest/reference/getting-started.html) in the *AWS Account Management Reference Guide*.