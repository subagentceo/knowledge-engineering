

# What is AWS Outposts?
<a name="what-is-outposts"></a>

AWS Outposts is a family of fully managed solutions delivering AWS infrastructure, AWS services, APIs, and tools to customer premises. Outposts is available in a variety of form factors, from 1U and 2U Outposts servers to 42U Outposts racks. With Outposts, you can run the supported AWS services locally and connect to a broad range of services available in the [AWS Region](https://docs.aws.amazon.com/global-infrastructure/latest/regions/aws-regions-availability-zones.html). AWS Outposts supports workloads that require low latency, local data processing, data residency, and migration with local network and system interdependencies.

Second-generation Outposts racks are configured for faster processing, higher memory capacity, and increased network bandwidth than AWS Outposts racks. You start with a single compute rack paired with a network rack and then add compute racks according to business needs.

The second-generation Outposts racks support:
+ Network rack with built-in resiliency and independent scaling of compute and networking
+ Specialized Amazon EC2 instances with accelerated networking for ultra-low latency and high throughput workloads

## Amazon EC2 instances supported
<a name="instances"></a>

Second-generation Outposts racks currently support the following Amazon EC2 instances for a broad range of on-premises workloads:
+ General purpose [https://aws.amazon.com/ec2/instance-types/m7i/](https://aws.amazon.com/ec2/instance-types/m7i/),[https://aws.amazon.com/ec2/instance-types/m8i/](https://aws.amazon.com/ec2/instance-types/m8i/)
+ Compute optimized [https://aws.amazon.com/ec2/instance-types/c7i/](https://aws.amazon.com/ec2/instance-types/c7i/),[https://aws.amazon.com/ec2/instance-types/c8i/](https://aws.amazon.com/ec2/instance-types/c8i/)
+ Memory optimized [https://aws.amazon.com/ec2/instance-types/r7i/](https://aws.amazon.com/ec2/instance-types/r7i/),[https://aws.amazon.com/ec2/instance-types/r8i/](https://aws.amazon.com/ec2/instance-types/r8i/)

## Simplified network scaling and configuration
<a name="scaling-configuration"></a>

Second-generation Outposts racks have a network rack that serves as a traffic aggregation layer for all connected compute and storage racks allowing you to:
+ Scale your compute resources independently from your networking infrastructure, giving you more ﬂexibility and cost eﬃciency as your workloads grow.
+ Easily architect for high availability using the second-generation rack's built-in resiliency features that handles device failures.
+ Define your local gateway (LGW) network configurations, including IP addresses, Virtual LAN (VLAN) and Border Gateway Protocol (BGP) settings, through the API and AWS Outposts console.

## Specialized Amazon EC2 instances with accelerated networking
<a name="scaling-configuration"></a>

Second-generation Outposts racks support specialized Amazon EC2 instances with accelerated networking. These instances are built for the latency-sensitive, compute-intensive, and throughput-intensive mission-critical workloads on-premises. In addition to the Outpost logical network, these instances feature a secondary physical network with network accelerator cards connected to top of rack (TOR) switches.

The second-generation racks support the following specialized, bare-metal Amazon EC2 instances:
+ Ultra-low latency with deterministic performance **bmn-sf2e**
+ High throughput and low latency **bmn-cx2**

## AWS Outposts racks generations
<a name="compare-racks"></a>

The following table lists the differences between the first-generation and second-generation Outposts racks: 


|  | First-generation Outposts racks | Second-generation Outposts racks | 
| --- | --- | --- | 
| **Compute** | M5, C5, R5, G4dn | M7i, C7i, R7i, Bmn-sf2e, Bmn-cx2 | 
| **Networking** | [See the AWS documentation website for more details](http://docs.aws.amazon.com/outposts/latest/network-userguide/what-is-outposts.html)  | [See the AWS documentation website for more details](http://docs.aws.amazon.com/outposts/latest/network-userguide/what-is-outposts.html)  | 
| **Locally supported services** | Amazon EC2, Amazon EBS, Amazon S3, Amazon EBS snapshots, Amazon EKS, Amazon ECS, Route 53 Resolver, Amazon RDS, Amazon EMR, AWS IoT Greengrass, Application Load Balancers, Amazon ElastiCache, Elastic Disaster Recovery | Amazon EC2, Amazon EBS, Amazon EKS, Amazon ECS, Amazon RDS, Amazon EMR, AWS IoT Greengrass, Application Load Balancers | 
| **Power** | Supported power configurations: 5 kVA, 10 kVA, or 15 kVA | Supported power configurations: 10 kVA, 15 kVA, 30 kVA | 
| **Minimum footprint** | One compute rack | Two racks: one compute and one network | 

## Key concepts
<a name="concepts"></a>

These are the key concepts:
+ **Outpost site** – The customer-managed physical buildings where AWS will install your Outpost. A site must meet the facility, networking, and power requirements for your Outpost.
+ **Outpost capacity** – Compute and storage resources available on the Outpost. You can view and manage the capacity for your Outpost from the AWS Outposts console.
+ **Outpost equipment** – Physical hardware that provides access to the AWS Outposts service. The hardware includes racks, servers, switches, and cabling owned and managed by AWS.
+ **Outposts racks** – An Outpost form factor that is an industry-standard 42U rack. Outposts racks include rack-mountable servers, switches, a network patch panel, a power shelf and blank panels.
+ **Network racks** – Designed for networking, a network rack has a traffic aggregation layer for all connected compute and storage racks allowing you to decouple compute scaling from networking. This enables cost-efficient scaling of your on-premises workloads based on specific workload needs. The network rack also comes with built-in resiliency to handle network device failures, making it easier for you to architect for high availability of your Outposts network. In addition, you can define the local gateway (LGW) network configurations, including IP addresses, Virtual LAN (VLAN) and Border Gateway Protocol (BGP) settings, through the API and console.
+ **Outposts servers** – An Outpost form factor that is an industry-standard 1U or 2U server, which can be installed in a standard EIA-310D 19 compliant 4 post rack. Outposts servers provide local compute and networking services to sites that have limited space or smaller capacity requirements.
+ **Outpost owner** – The account owner for the account that places the AWS Outposts order. After AWS engages with the customer, the owner may include additional points of contact. AWS will communicate with the contacts to clarify orders, installation appointments, and hardware maintenance and replacement. Contact [AWS Support Center](https://console.aws.amazon.com/support/home#/) if the contact information changes. 
+ **Service link** – Network route that enables communication between your Outpost and its associated AWS Region. Each Outpost is an extension of an Availability Zone and its associated Region.
+ **Local gateway (LGW)** – A logical interconnect virtual router that enables communication between an Outposts rack and your on-premises network. 

## Supported AWS services by AWS Region
<a name="second-gen-rack-service-available"></a>

AWS Outposts supports AWS services based on the AWS Region in which your Outpost operates. To determine the supported services, view your Region in the respective geographic area:

**Topics**
+ [North America](#service-north-america)
+ [Asia Pacific](#service-asia-pacific)
+ [Europe](#service-europe)

### North America
<a name="service-north-america"></a>

The following table indicates AWS Outposts support for AWS services in North America Regions.


| AWS Region | Application Load Balancer | Amazon EBS | Amazon EC2 | Amazon ECS | Amazon EKS | Amazon EMR | AWS IoT Greengrass | Amazon RDS SQL, MySQL, PostgreSQL, and Oracle | 
| --- | --- | --- | --- | --- | --- | --- | --- | --- | 
| US East (N. Virginia) | Yes | Yes | Yes | Yes | Yes | Yes | Yes | Yes | 
| US East (Ohio) | Yes | Yes | Yes | Yes | Yes | Yes | Yes | Yes | 
| US West (N. California) | Yes | Yes | Yes | Yes | Yes | Yes | Yes | Yes | 
| US West (Oregon) | Yes | Yes | Yes | Yes | Yes | Yes | Yes | Yes | 
| Canada (Central) | Yes | Yes | Yes | Yes | Yes | Yes | Yes | Yes | 

### Asia Pacific
<a name="service-asia-pacific"></a>

The following table indicates AWS Outposts support for AWS services in Asia Pacific Regions.


| AWS Region | Application Load Balancer | Amazon EBS | Amazon EC2 | Amazon ECS | Amazon EKS | Amazon EMR | AWS IoT Greengrass | Amazon RDS SQL, MySQL, PostgreSQL, and Oracle | 
| --- | --- | --- | --- | --- | --- | --- | --- | --- | 
| Asia Pacific (Singapore) | Yes | Yes | Yes | Yes | Yes | Yes | Yes | Yes | 

### Europe
<a name="service-europe"></a>

The following table indicates AWS Outposts support for AWS services in Europe Regions.


| AWS Region | Application Load Balancer | Amazon EBS | Amazon EC2 | Amazon ECS | Amazon EKS | Amazon EMR | AWS IoT Greengrass | Amazon RDS SQL, MySQL, PostgreSQL, and Oracle | 
| --- | --- | --- | --- | --- | --- | --- | --- | --- | 
| Europe (London) | Yes | Yes | Yes | Yes | Yes | Yes | Yes | Yes | 

## Pricing
<a name="pricing"></a>

Pricing is based on your order details. When you place an order, you can choose from a variety of Outpost configurations, each providing a combination of Amazon EC2 instance types and storage options. You also choose a contract term and a payment option. Pricing includes delivery, installation, infrastructure service maintenance, software patches and upgrades, and rack removal.

For pricing based on location, configuration, and payment option, see: [Outposts racks pricing](https://aws.amazon.com/outposts/rack/pricing/)

You are billed for shared resources and any data transfer from the AWS Region to the Outpost. You are also billed for data transfers that AWS performs to maintain availability and security.