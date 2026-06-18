

# Introduction to the cryptographic details of AWS KMS
<a name="intro"></a>

AWS Key Management Service (AWS KMS) provides a web interface to generate and manage cryptographic keys and operates as a cryptographic service provider for protecting data. AWS KMS offers traditional key management services integrated with AWS services to provide a consistent view of customers’ keys across AWS, with centralized management and auditing. This whitepaper provides a detailed description of the cryptographic operations of AWS KMS to assist you in evaluating the features offered by the service.

AWS KMS includes a web interface through the AWS Management Console, command line interface, and RESTful API operations to request cryptographic operations of a distributed fleet of FIPS 140-3 validated hardware security modules (HSMs)[[1](kms-bibliography.md#fips-hsms)]. The AWS KMS HSM is a multichip standalone hardware cryptographic appliance designed to provide dedicated cryptographic functions to meet the security and scalability requirements of AWS KMS. You can establish your own HSM-based cryptographic hierarchy under keys that you manage as AWS KMS keys. These keys are made available only on the HSMs and only in memory for the necessary time needed to process your cryptographic request. You can create multiple KMS keys, each represented by its key ID. Only under AWS IAM roles and accounts administered by each customer can customer KMS keys be created, deleted, or used to encrypt, decrypt, sign, or verify data. You can define access controls on who can manage and/or use KMS keys by creating a policy that is attached to the key. Such policies allow you to define application-specific uses for your keys for each API operation.

In addition, most AWS services support encryption of data at rest using KMS keys. This capability allows customers to control how and when AWS services can access encrypted data by controlling how and when KMS keys can be accessed. 

![AWS KMS architecture.](http://docs.aws.amazon.com/kms/latest/cryptographic-details/images/KMS-Architecture.png)


AWS KMS is a tiered service consisting of web-facing AWS KMS hosts and a tier of HSMs. The grouping of these tiered hosts forms the AWS KMS stack. All requests to AWS KMS must be made over the Transport Layer Security protocol (TLS) and terminate on an AWS KMS host. AWS KMS hosts only allow TLS with a ciphersuite that provides perfect [forward secrecy](http://dx.doi.org/10.6028/NIST.SP.800-52r2). AWS KMS authenticates and authorizes your requests using the same credential and policy mechanisms of AWS Identity and Access Management (IAM) that are available for all other AWS API operations.