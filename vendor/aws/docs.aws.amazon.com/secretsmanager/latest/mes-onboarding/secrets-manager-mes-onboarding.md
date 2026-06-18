

# Secrets Manager managed external secrets partner onboarding guide
<a name="secrets-manager-mes-onboarding"></a>

This guide provides the information you need to become a partner with AWS Secrets Manager managed external secrets. When you integrate with managed external secrets, your customers can securely manage their credentials through AWS. 

## Why integrate with Secrets Manager
<a name="mes-why"></a>

When you integrate with Secrets Manager, your customers get the following advantages:
+ **Unified third-party secret management** – Secrets Manager provides a standardized, predefined format for storing your software secrets to streamline the management of credentials. This approach reduces the complexity and overhead of custom credential management strategies for your customers.
+ **Managed rotation** – Secrets Manager handles the credential rotation process by default. This provides automatic, compliance-driven secret rotation with no operational overhead. Customers no longer need to create custom Lambda functions or manual processes.
+ **Seamless integration** – Native partner integrations provide visibility and transparent lifecycle management for all of your secrets. You get: 
  + Comprehensive security controls managed with AWS Identity and Access Management permissions.
  + Automated workflows that reduce manual intervention and human error.
  + Flexibility to manage secrets across AWS and other environments.
  + Transparent secret management workflows for visibility and compliance.

## Terminology
<a name="mes-terminology"></a>

The following terms are used throughout this guide to describe managed external secrets concepts and the onboarding process.

Secrets  
Secrets refer to sensitive credentials, API keys, OAuth tokens, and configuration data used by third-party software applications that integrate with AWS services. These secrets are critical for secure authentication and communication between systems, and require careful management to prevent unauthorized access.

AWS Secrets Manager  
A secure service for centrally managing and retrieving credentials and other secrets.

Managed external secrets  
A specialized secret type in Secrets Manager for third-party software credentials.

Third-party software vendor  
Third-party companies that develop and sell software products compatible with AWS.

AWS Partner Network (APN)  
A global AWS program providing support to software vendors and service providers.

Secret rotation  
Automated process of periodically updating secret values to enhance security.

Rotation configuration  
Technical specifications defining how secret rotation is done.

Rotation schedule  
How often secrets are automatically rotated.

Single user rotation  
A rotation method that updates credentials for one secret for one user at a time.

Alternating users rotations  
A rotation method that maintains two sets of active credentials for zero downtime updates. The rotation process rotates one secret, the application can rely on the other secret to avoid disruption.

Service endpoint  
The specific URL where third-party software accepts API calls for secret management.

JSON format  
The format used to define secret structures.