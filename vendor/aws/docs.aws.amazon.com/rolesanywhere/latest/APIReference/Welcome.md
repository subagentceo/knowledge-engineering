

# Welcome
<a name="Welcome"></a>

 AWS Identity and Access Management Roles Anywhere provides a secure way for your workloads such as servers, containers, and applications that run outside of AWS to obtain temporary AWS credentials. Your workloads can use the same IAM policies and roles you have for native AWS applications to access AWS resources. Using IAM Roles Anywhere eliminates the need to manage long-term credentials for workloads running outside of AWS.

 To use IAM Roles Anywhere, your workloads must use X.509 certificates issued by their certificate authority (CA). You register the CA with IAM Roles Anywhere as a trust anchor to establish trust between your public key infrastructure (PKI) and IAM Roles Anywhere. If you don't manage your own PKI system, you can use AWS Private Certificate Authority to create a CA and then use that to establish trust with IAM Roles Anywhere. 

This guide describes the IAM Roles Anywhere operations that you can call programmatically. For more information about IAM Roles Anywhere, see the [IAM Roles Anywhere User Guide](https://docs.aws.amazon.com/rolesanywhere/latest/userguide/introduction.html).

This document was last published on June 17, 2026. 