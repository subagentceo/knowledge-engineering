

# What is Oracle Database@AWS?
<a name="what-is-odb"></a>

Oracle Database@AWS is an offering that enables you to access Oracle Exadata infrastructure and Oracle Autonomous Database Serverless managed by Oracle Cloud Infrastructure (OCI) inside AWS data centers. You can migrate your Oracle Exadata workloads, deploy serverless Oracle Autonomous Databases, establish low-latency connectivity with applications running on AWS, and integrate with AWS services. You get a single invoice through AWS Marketplace, which counts towards AWS commitments and Oracle Support rewards.

The following diagram shows a high-level overview of an OCI region tied to an AWS data center that hosts Oracle Exadata infrastructure. Within an AWS Availability Zone (AZ), you can establish one or more peering connections (up to 45) between your Amazon VPCs and the private network that is tied to the data center. By peering these networks, application servers in the VPCs can access Oracle databases running on the Oracle Exadata infrastructure.

![Access Oracle databases that run on Oracle Exadata infrastructure hosted in an AWS data center with connectivity paths and service components.](http://docs.aws.amazon.com/odb/latest/UserGuide/images/ODB-ovw.png)


## Features of Oracle Database@AWS
<a name="servicename-feature-overview"></a>

With Oracle Database@AWS, you benefit from the following features:

**Migration of Oracle Exadata database workloads to AWS**  
With Oracle Database@AWS, you can easily migrate your Oracle Exadata workloads to Oracle Exadata Database Service on Dedicated Infrastructure or Oracle Autonomous Database on Dedicated Exadata Infrastructure within AWS. The migration offers minimal changes, full feature availability, architectural compatibility, and the same performance as on-premises Exadata deployments. You can use standard Oracle database migration tools such as Recovery Manager (RMAN), Oracle Data Guard, transportable tablespaces, Oracle Data Pump, Oracle GoldenGate, AWS Database Migration Service, and Oracle Zero Downtime Migration.

**Fully managed serverless Oracle Autonomous Database**  
Oracle Autonomous Database Serverless (ADB-S) provides a fully managed, serverless Oracle Autonomous Database that auto-scales compute and storage based on workload demand. No infrastructure provisioning is required—you go from subscription to a running database without creating Exadata infrastructure or VM clusters. ADB-S is available via public offer on AWS Marketplace in addition to private offer.

**Reduced application latency**  
You can establish low-latency connectivity between Oracle Exadata and applications running on AWS. Proximity to applications hosted in AWS ensures minimal network delays and improved performance.

**Innovation through data unification**  
You can generate deeper insights and develop new innovation by using zero-ETL integrations to unify your data across Oracle and AWS for analytics, machine learning, and generative AI. With zero-ETL integration using Amazon Redshift, you can enable near real-time analysis and machine learning (ML) on transactional data stored in Oracle Database@AWS.

**Simplified management and operations**  
You can benefit from a unified experience between Oracle and AWS with collaborative support, purchasing, management, and operations. Your usage of Oracle Database services qualifies for your existing AWS commitments and Oracle license benefits, such as Oracle Support Rewards. You can use familiar AWS tools and interfaces to purchase, provision, and manage your Oracle Database@AWS resources. You can provision and manage your resources using AWS APIs, CLI, or SDKs. The AWS APIs call the corresponding OCI APIs necessary to provision and manage the resources.

**Seamless integration with AWS services**  
You can integrate with other AWS services and applications running in the same environment. For example, Oracle Database@AWS integrates with Amazon EC2, Amazon VPC, and IAM. You can also integrate Oracle Database@AWS with AWS services such as Amazon CloudWatch for monitoring and Amazon EventBridge for event management. For database backups, you can use Amazon S3, which is designed to exceed 11 9s of durability.

## Related AWS services
<a name="related-services"></a>

Oracle Database@AWS works with the following services to improve the availability and scalability of your Oracle database applications:
+ **Amazon EC2** — Provides virtual servers that function as Oracle application servers. You can configure your load balancer to route traffic to your EC2 application servers. For more information, see the [Amazon EC2 User Guide](https://docs.aws.amazon.com/AWSEC2/latest/UserGuide/).
+ **Amazon Virtual Private Cloud (VPC)** — Enables you to launch AWS resources in a logically isolated virtual network that you've defined. Oracle Exadata infrastructure resides in a special network called the ODB network that you can peer to a VPC. You can then run application servers in your VPC and access your Exadata databases. For more information, see the [Amazon VPC User Guide](https://docs.aws.amazon.com/vpc/latest/userguide/).
+ **Amazon VPC Lattice** — Provides native access to AWS services such as Amazon S3 and Oracle managed backups from the ODB network. For more information, see the [What is Amazon VPC Lattice?](https://docs.aws.amazon.com/vpc-lattice/latest/ug/what-is-vpc-lattice.html).
+ **Amazon CloudWatch** — Provides a monitoring service for Oracle Database@AWS. OCI gathers metric data about your Oracle Exadata system and sends it to CloudWatch. For more information, see [Monitoring Oracle Database@AWS with Amazon CloudWatch](monitoring-cloudwatch.md).
+ **AWS Identity and Access Management (IAM)** — Helps you securely control access to Oracle Database@AWS resources for your users. Use IAM to control who can use your AWS resources (authentication) and what resources users can use in which ways (authorization). For more information, see [Identity and access management for Oracle Database@AWS](security-iam.md).
+ **AWS analytics services** — Provide a broad and cost-effective set of analytics services to help you gain insights faster from your Exadata database. Each service is purpose-built for a wide range of analytics use cases such as interactive analysis, big data processing, data warehousing, real-time analytics, operational analytics, dashboards, and visualizations. For more information, see [Analytics on AWS](https://aws.amazon.com/big-data/datalakes-and-analytics/).

## Accessing Oracle Database@AWS
<a name="acessing-servicename"></a>

You can create, access, and manage Oracle Database@AWS using the AWS Management Console. It provides a web interface that you can use to access Oracle Database@AWS.

## Pricing for Oracle Database@AWS
<a name="odb-pricing"></a>

You can purchase Oracle Database@AWS offerings from AWS Marketplace. You first contact an Oracle sales representative. Oracle then makes the offer available to you in AWS Marketplace based on the private pricing agreement. Your AWS bill shows charges based on your usage. 

There are no data transfer charges when your Oracle application and Oracle database are hosted in the same Availability Zone (AZ). Standard data transfer charges apply for communication between AZs.

When using Oracle Database@AWS managed integrations such as zero-ETL, Oracle managed backups, and Amazon S3, standard data processing charges for sharing and accessing resources through VPC Lattice apply. There is no hourly charge for Oracle Database@AWS managed integrations. For more information, see [Amazon VPC Lattice pricing](https://aws.amazon.com/vpc/lattice/pricing/).

## What's next?
<a name="what-is.whats-next"></a>

You're now ready to begin creating your Oracle Database@AWS resources.

1. Learn about how Oracle Database@AWS works. For more information, see [How Oracle Database@AWS works](how-it-works.md).
**Note**  
If you're familiar with AWS and Oracle Exadata and want to get started right away, skip this step.

1. Request a private offer or accept a public offer for Oracle Database@AWS through the AWS Management Console. For more information, see [Request a private offer for Oracle Database@AWS](setting-up.md#sign-up-for-odb).
**Note**  
For Autonomous Database Serverless, you can accept a public offer on AWS Marketplace without contacting an Oracle sales representative.

1. Create your Oracle Database@AWS resources:
   + For Oracle Exadata Database Service on Dedicated Infrastructure or Autonomous Database on Dedicated Exadata Infrastructure, create your ODB network, Oracle Exadata infrastructure, and Exadata VM clusters using the AWS console. Create your Exadata databases using OCI tools.
   + For Autonomous Database Serverless, create an ODB network and then create an Autonomous Database directly from the Oracle Database@AWS console. No Exadata infrastructure or VM cluster provisioning is required.

   For more information, see [Getting started with Oracle Database@AWS](getting-started.md).

1. Share your resources across accounts with AWS Resource Access Manager (AWS RAM). For more information, see [Working with shared Oracle Database@AWS resources in a trusted account](working-with-shared-resources.md).