

# What is AWS Transfer Family?
<a name="what-is-aws-transfer-family"></a>

AWS Transfer Family is a secure transfer service that enables you to transfer files into and out of AWS storage services. Transfer Family is part of the AWS Cloud platform. AWS Transfer Family offers fully managed support for the transfer of files over SFTP, AS2, FTPS, FTP, and web browser-based transfers directly into and out of AWS storage services. You can seamlessly migrate, automate, and monitor your file transfer workflows by maintaining existing client-side configurations for authentication, access, and firewalls—so nothing changes for your customers, partners, and internal teams, or their applications. See [Getting started with AWS](https://aws.amazon.com/getting-started/) to learn more and to start building cloud applications with Amazon Web Services.

AWS Transfer Family supports transferring data from or to the following AWS storage services.
+ Amazon Simple Storage Service (Amazon S3) storage. For information about Amazon S3, see [Getting started with Amazon Simple Storage Service](https://docs.aws.amazon.com/AmazonS3/latest/userguide/GetStartedWithS3.html).
+ Amazon Elastic File System (Amazon EFS) Network File System (NFS) file systems. For information about Amazon EFS, see [What is Amazon Elastic File System?](https://docs.aws.amazon.com/efs/latest/ug/whatisefs.html)

AWS Transfer Family supports transferring data over the following protocols:
+ Secure File Transfer Protocol (SFTP): version 3

  The official IETF document is here: [SSH File Transfer Protocol draft-ietf-secsh-filexfer-02.txt](https://tools.ietf.org/html/draft-ietf-secsh-filexfer-02).
+ File Transfer Protocol Secure (FTPS)
+ File Transfer Protocol (FTP)
+ Applicability Statement 2 (AS2)
+ Browser-based transfers

**Note**  
 For FTP and FTPS data connections, the port range that Transfer Family uses to establish the data channel is 8192–8200.

File transfer protocols are used in data exchange workflows across different industries such as financial services, healthcare, advertising, and retail, among others. Transfer Family simplifies the migration of file transfer workflows to AWS.

The following are some common use cases for using Transfer Family with Amazon S3:
+ Data lakes in AWS for uploads from third parties such as vendors and partners.
+ Subscription-based data distribution with your customers.
+ Internal transfers within your organization.

The following are some common use cases for using Transfer Family with Amazon EFS:
+ Data distribution
+ Supply chain
+ Content management
+ Web serving applications

The following are some common use cases for using Transfer Family with AS2: 
+ Workflows with compliance requirements that rely on having data protection and security features built into the protocol
+ Supply chain logistics
+ Payments workflows
+ Business-to-business (B2B) transactions
+ Integrations with enterprise resource planning (ERP) and customer relationship management (CRM) systems

The following are some common use cases for using Transfer Family web apps:
+ Simplified access to data in Amazon S3 to a wider and diverse range of business users
+ Centralized data access management for your workforce
+ Visualization of Amazon S3 Access Grants through a managed interface

With Transfer Family, you get access to a file transfer protocol-enabled server in AWS (or a managed file transfer web interface), without the need to run any server infrastructure. You can use this service to migrate your file transfer-based workflows to AWS while maintaining your end users' clients and configurations as is. For servers, you first associate your hostname with the server endpoint, then add your users and provision them with the right level of access. After you do this, your users' transfer requests are serviced directly out of your Transfer Family server endpoint.

For Transfer Family web apps, determine your configuration settings and apply optional customizations. After you do this, your users can log in and directly transfer data to and from Amazon S3.

Transfer Family provides the following benefits:
+ A fully managed service that scales in real time to meet your needs.
+ You don't need to modify your applications or run any file transfer protocol infrastructure.
+ With your data in durable Amazon S3 storage, you can use native AWS services for processing, analytics, reporting, auditing, and archival functions.
+ With Amazon EFS as your data store, you get a fully managed elastic file system for use with AWS Cloud services and on-premises resources. Amazon EFS is built to scale on demand to petabytes without disrupting applications, growing and shrinking automatically as you add and remove files. This helps eliminate the need to provision and manage capacity to accommodate growth.
+ A fully managed, serverless File Transfer Workflow service that makes it easy to set up, run, automate, and monitor processing of files uploaded using AWS Transfer Family.
+ There are no upfront costs, and you pay only for the use of the service.

In the following sections, you can find a description of the different features of Transfer Family, a getting started tutorial, detailed instructions on how to set up the different protocol enabled servers, how to use different types of identity providers, and the service's API reference.

To get started with Transfer Family, see the following:
+ [How AWS Transfer Family works](#how-aws-transfer-works)
+ [Prerequisites](setting-up.md)
+ [Getting started with AWS Transfer Family server endpoints](getting-started.md)
+ [Transfer Family web apps](web-app.md)

## How AWS Transfer Family works
<a name="how-aws-transfer-works"></a>

AWS Transfer Family is a fully managed AWS service that you can use to transfer files into and out of Amazon Simple Storage Service (Amazon S3) storage or Amazon Elastic File System (Amazon EFS) file systems over the following protocols or web browser:
+ Secure File Transfer Protocol (SFTP): version 3

  The official IETF document is here: [SSH File Transfer Protocol draft-ietf-secsh-filexfer-02.txt](https://tools.ietf.org/html/draft-ietf-secsh-filexfer-02).
+ File Transfer Protocol Secure (FTPS)
+ File Transfer Protocol (FTP)
+ Applicability Statement 2 (AS2)
+ Browser-based transfers

 AWS Transfer Family supports up to 3 Availability Zones and is backed by an auto scaling, redundant fleet for your connection and transfer requests. For an example on how to build for higher redundancy and minimize network latency by using Latency-based routing, see the blog post [Minimize network latency with your AWS transfer for SFTP servers](https://aws.amazon.com/blogs/storage/minimize-network-latency-with-your-aws-transfer-for-sftp-servers/). 

 Transfer Family Managed File Transfer Workflows (MFTW) is a fully managed, serverless File Transfer Workflow service that makes it easy to set up, run, automate, and monitor processing of files uploaded using AWS Transfer Family. Customers can use MFTW to automate various processing steps such as copying, tagging, scanning, filtering, compressing/decompressing, and encrypting/decrypting the data that's transferred using Transfer Family. This provides end to end visibility for tracking and auditability. For more details, see [AWS Transfer Family managed workflows](transfer-workflows.md). 

AWS Transfer Family supports any standard file transfer protocol client. Some commonly used clients are the following:
+ [OpenSSH](https://www.openssh.com/) – A Macintosh and Linux command line utility.
+ [WinSCP](https://winscp.net/eng/download.php) – A Windows-only graphical client.
+  [Cyberduck](https://cyberduck.io/) – A Linux, Macintosh, and Microsoft Windows graphical client.
+ [FileZilla](https://filezilla-project.org/) – A Linux, Macintosh, and Windows graphical client.

AWS offers the following Transfer Family workshops.
+ Build a file transfer solution that leverages AWS Transfer Family for managed SFTP/FTPS endpoints and Amazon Cognito and DynamoDB for user management. You can view the details for this workshop [here](https://catalog.workshops.aws/transfer-family-sftp/en-US).
+ Build a Transfer Family endpoint with AS2 enabled, and a Transfer Family AS2 connector You can view the details for this workshop [here](https://catalog.workshops.aws/transfer-family-as2/en-US).
+ Build a solution that provides prescriptive guidance and a hands on lab on how you can build a scalable and secure file transfer architecture on AWS without needing to modify existing applications or manage server infrastructure. You can view the details for this workshop [here](https://catalog.workshops.aws/basic-security-workshop-transfer-family/en-US).

## Blog posts relevant for Transfer Family
<a name="transfer-blog-post-history"></a>

The following table lists the blog posts that contain useful information for Transfer Family customers. The table is in reverse chronological order, so that the most recent posts are at the beginning of the table.


| Blog post title and link | Date | 
| --- | --- | 
|  [Deploy Okta as a custom identity provider for AWS Transfer Family](https://aws.amazon.com/blogs/storage/deploy-okta-as-a-custom-identity-provider-for-aws-transfer-family/) | August 11, 2025 | 
| [Automating paper-to-electronic healthcare claims processing with AWS](https://aws.amazon.com/blogs/storage/automating-paper-to-electronic-healthcare-claims-processing-with-aws/) | May 29, 2025 | 
| [ How to use AWS Transfer Family and GuardDuty for malware protection](https://aws.amazon.com/blogs/security/how-to-use-aws-transfer-family-and-guardduty-for-malware-protection/) | April 30, 2025 | 
| [How FICO modernizes file transfers with ETL automation using AWS Transfer Family](https://aws.amazon.com/blogs/storage/how-fico-modernizes-file-transfers-with-etl-automation-using-aws-transfer-family/) | April 24, 2025 | 
| [Announcing AWS Transfer Family web apps for fully managed Amazon S3 file transfers](https://aws.amazon.com/blogs/aws/announcing-aws-transfer-family-web-apps-for-fully-managed-amazon-s3-file-transfers/) | December 1, 2024 | 
| [Six tips to improve the security of your AWS Transfer Family server](https://aws.amazon.com/blogs/security/six-tips-to-improve-the-security-of-your-aws-transfer-family-server/) | September 24, 2024 | 
|  [Simplify Active Directory authentication with a custom identity provider for AWS Transfer Family](https://aws.amazon.com/blogs/storage/simplify-active-directory-authentication-with-a-custom-identity-provider-for-aws-transfer-family/)  |  August 12, 2024  | 
| [Architecting secure and compliant managed file transfers with AWS Transfer Family SFTP connectors and PGP encryption](https://aws.amazon.com/blogs/storage/architecting-secure-and-compliant-managed-file-transfers-with-aws-transfer-family-sftp-connectors-and-pgp-encryption/) | May 16, 2024 | 
| [Using Amazon Cognito as an identity provider with AWS Transfer Family and Amazon S3](https://aws.amazon.com/blogs/storage/using-amazon-cognito-as-an-identity-provider-with-aws-transfer-family-and-amazon-s3/) | May 14, 2024 | 
| [How Transfer Family can help you build a secure, compliant managed file transfer solution](https://aws.amazon.com/blogs/security/how-transfer-family-can-help-you-build-a-secure-compliant-managed-file-transfer-solution/) | January 3, 2024 | 
| [Detect malware threats using AWS Transfer Family](https://aws.amazon.com/blogs/storage/detect-malware-threats-using-aws-transfer-family/) | July 20, 2023 | 
| [Extending SAP workloads with AWS Transfer Family](https://aws.amazon.com/blogs/storage/extending-sap-workloads-with-aws-transfer-family/) | July 13, 2023 | 
| [Encrypt and decrypt files with PGP and AWS Transfer Family](https://aws.amazon.com/blogs/storage/encrypt-and-decrypt-files-with-pgp-and-aws-transfer-family/) | June 21, 2023 | 
| [Authenticating to AWS Transfer Family with Azure Active Directory and AWS Lambda](https://aws.amazon.com/blogs/storage/authenticating-to-aws-transfer-family-with-azure-active-directory-and-aws-lambda/) | December 15, 2022 | 
| [Customize file delivery notifications using AWS Transfer Family managed workflows](https://aws.amazon.com/blogs/storage/customize-file-delivery-notifications-using-aws-transfer-family-managed-workflows/)  | October 14, 2022 | 
| [Building a cloud-native file transfer platform using AWS Transfer Family workflows](https://aws.amazon.com/blogs/architecture/building-a-cloud-native-file-transfer-platform-using-aws-transfer-family-workflows/) | January 5, 2022 | 
| [Enabling user self-service key management with AAWS Transfer Family and AWS Lambda](https://aws.amazon.com/blogs/storage//enabling-user-self-service-key-management-with-aws-transfer-family-and-aws-lambda/). | December 17, 2021 | 
| [Enhance data access control with AWS Transfer Family and Amazon S3](https://aws.amazon.com/blogs/storage/enhance-data-access-control-with-aws-transfer-family-and-amazon-s3-access-points/) | October 5, 2021 | 
| [Improve throughput for internet facing file transfers using AWS Global Accelerator and AWS Transfer Family services](https://aws.amazon.com/blogs/networking-and-content-delivery/improve-data-delivery-throughput-for-internet-facing-file-transfer-workloads-using-aws-global-accelerator-and-aws-transfer-family-services/)  | June 7, 2021 | 
| [Securing AWS Transfer Family with AWS Web Application Firewall and Amazon API Gateway](https://aws.amazon.com/blogs/storage/update-your-aws-transfer-family-server-endpoint-type-from-vpc_endpoint-to-vpc/) | May 5, 2021 | 
| [Securing AWS Transfer Family with AWS Web Application Firewall and Amazon API Gateway](https://aws.amazon.com/blogs/storage/securing-aws-transfer-family-with-aws-web-application-firewall-and-amazon-api-gateway/) | January 15, 2021 | 
| [AWS Transfer Family support for Amazon Elastic File System](https://aws.amazon.com/blogs/aws/new-aws-transfer-family-support-for-amazon-elastic-file-system/) | January 7, 2021 | 
| [Enable password authentication for AWS Transfer Family using AWS Secrets Manager](https://aws.amazon.com/blogs/storage/enable-password-authentication-for-aws-transfer-family-using-aws-secrets-manager-updated/) | November 5, 2020 | 
| [Centralize data access using AWS Transfer Family and AWS Storage Gateway](https://aws.amazon.com/blogs/storage/centralize-data-access-using-aws-transfer-family-and-aws-storage-gateway/) | June 22, 2020 | 
| [Using Amazon EFS for AWS Lambda in your serverless applications](https://aws.amazon.com/blogs/compute/using-amazon-efs-for-aws-lambda-in-your-serverless-applications) | June 18, 2020 | 
| [Use IP allow list to secure your AWS Transfer Family servers](https://aws.amazon.com/blogs//storage/use-ip-allow-list-to-secure-your-aws-transfer-for-sftp-servers/) | April 8, 2020 | 
| [Minimize network latency with your AWS transfer for SFTP servers](https://aws.amazon.com/blogs/storage/minimize-network-latency-with-your-aws-transfer-for-sftp-servers/) | February 19, 2020 | 
| [Lift and Shift migration of SFTP servers to AWS](https://aws.amazon.com/blogs/storage/lift-and-shift-migration-of-sftp-servers-to-aws/) | February 12, 2020 | 
| [Simplify your AWS SFTP Structure with chroot and logical directories](https://aws.amazon.com/blogs/storage/simplify-your-aws-sftp-structure-with-chroot-and-logical-directories/) | September 26, 2019 | 
| [Using Okta as an identity provider with AWS Transfer Family](https://aws.amazon.com/blogs/storage/using-okta-as-an-identity-provider-with-aws-transfer-for-sftp/) | May 30, 2019 | 