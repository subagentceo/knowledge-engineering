

# What is AWS Outposts?
<a name="what-is-outposts"></a>

AWS Outposts is a fully managed service that extends AWS infrastructure, services, APIs, and tools to customer premises. By providing local access to AWS managed infrastructure, AWS Outposts enables customers to build and run applications on premises using the same programming interfaces as in [AWS Regions](https://docs.aws.amazon.com/global-infrastructure/latest/regions/aws-regions-availability-zones.html), while using local compute and storage resources for lower latency and local data processing needs.

An Outpost is a pool of AWS compute and storage capacity deployed at a customer site. AWS operates, monitors, and manages this capacity as part of an AWS Region. You can create subnets on your Outpost and specify them when you create AWS resources such as EC2 instances and subnets. Instances in Outpost subnets communicate with other instances in the AWS Region using private IP addresses, all within the same VPC.

**Note**  
You can't connect an Outpost to another Outpost or Local Zone that is within the same VPC.

For more information, see the [AWS Outposts product page](https://aws.amazon.com/outposts/).

## Key concepts
<a name="concepts"></a>

These are the key concepts for AWS Outposts.
+ **Outpost site** – The customer-managed physical buildings where AWS will install your Outpost. A site must meet the facility, networking, and power requirements for your Outpost.
+ **Outpost capacity** – Compute and storage resources available on the Outpost. You can view and manage the capacity for your Outpost from the AWS Outposts console. AWS Outposts supports self-service capacity management that you can define at the Outposts level to reconfigure all of the assets in an Outposts or specifically for each individual asset. An Outpost asset can be a single server within an Outposts rack or an Outposts server.
+ **Outpost equipment** – Physical hardware that provides access to the AWS Outposts service. The hardware includes racks, servers, switches, and cabling owned and managed by AWS.
+ **Outposts racks** – An Outpost form factor that is an industry-standard 42U rack. Outposts racks include rack-mountable servers, switches, a network patch panel, a power shelf and blank panels.
+ **Outposts servers** – An Outpost form factor that is an industry-standard 1U or 2U server, which can be installed in a standard EIA-310D 19 compliant 4 post rack. Outposts servers provide local compute and networking services to sites that have limited space or smaller capacity requirements.
+ **Outpost owner** – The account owner for the account that places the AWS Outposts order. After AWS engages with the customer, the owner may include additional points of contact. AWS will communicate with the contacts to clarify orders, installation appointments, and hardware maintenance and replacement. Contact [AWS Support Center](https://console.aws.amazon.com/support/home#/) if the contact information changes. 
+ **Service link** – Network route that enables communication between your Outpost and its associated AWS Region. Each Outpost is an extension of an Availability Zone and its associated Region.
+ **Local gateway (LGW)** – A logical interconnect virtual router that enables communication between an Outposts rack and your on-premises network. 
+ **Local network interface** – A network interface that enables communication from an Outposts server and your on-premises network.

## AWS resources on Outposts
<a name="services"></a>

You can create the following resources on your Outpost to support low-latency workloads that must run in close proximity to on-premises data and applications:


**Compute**  

| Resource type | Racks | Servers | 
| --- | --- | --- | 
| [Amazon EC2 instances](https://docs.aws.amazon.com/AWSEC2/latest/UserGuide/using-regions-availability-zones.html#outposts-instances) |   ![](http://docs.aws.amazon.com/outposts/latest/server-userguide/images/icon-yes.png) Yes  |   ![](http://docs.aws.amazon.com/outposts/latest/server-userguide/images/icon-yes.png) Yes  | 
| [Amazon ECS clusters](https://docs.aws.amazon.com/AmazonECS/latest/developerguide/using-outposts.html) |   ![](http://docs.aws.amazon.com/outposts/latest/server-userguide/images/icon-yes.png) Yes  |  ![](http://docs.aws.amazon.com/outposts/latest/server-userguide/images/icon-yes.png) Yes | 
| [Amazon EKS nodes](https://docs.aws.amazon.com/eks/latest/userguide/eks-outposts.html) |   ![](http://docs.aws.amazon.com/outposts/latest/server-userguide/images/icon-yes.png) Yes  |  ![](http://docs.aws.amazon.com/outposts/latest/server-userguide/images/icon-no.png) No | 


**Database and analytics**  

| Resource type | Racks | Servers | 
| --- | --- | --- | 
| [Amazon ElastiCache nodes](https://docs.aws.amazon.com/AmazonElastiCache/latest/dg/ElastiCache-Outposts.html) (Redis cluster, Memcached cluster) |   ![](http://docs.aws.amazon.com/outposts/latest/server-userguide/images/icon-yes.png) Yes  |  ![](http://docs.aws.amazon.com/outposts/latest/server-userguide/images/icon-no.png) No | 
| [Amazon EMR clusters](https://docs.aws.amazon.com/emr/latest/ManagementGuide/emr-plan-outposts.html) |   ![](http://docs.aws.amazon.com/outposts/latest/server-userguide/images/icon-yes.png) Yes  |  ![](http://docs.aws.amazon.com/outposts/latest/server-userguide/images/icon-no.png) No | 
| [Amazon RDS DB instances](https://docs.aws.amazon.com/AmazonRDS/latest/UserGuide/rds-on-outposts.html) |   ![](http://docs.aws.amazon.com/outposts/latest/server-userguide/images/icon-yes.png) Yes  |  ![](http://docs.aws.amazon.com/outposts/latest/server-userguide/images/icon-no.png) No | 


**Networking**  

| Resource type | Racks | Servers | 
| --- | --- | --- | 
| [App Mesh Envoy proxy](https://docs.aws.amazon.com/app-mesh/latest/userguide/app-mesh-on-outposts.html) |   ![](http://docs.aws.amazon.com/outposts/latest/server-userguide/images/icon-yes.png) Yes  |   ![](http://docs.aws.amazon.com/outposts/latest/server-userguide/images/icon-yes.png) Yes  | 
| [Application Load Balancers](https://docs.aws.amazon.com/elasticloadbalancing/latest/application/application-load-balancers.html#subnets-load-balancer) |   ![](http://docs.aws.amazon.com/outposts/latest/server-userguide/images/icon-yes.png) Yes  |  ![](http://docs.aws.amazon.com/outposts/latest/server-userguide/images/icon-no.png) No | 
| [Amazon VPC subnets](https://docs.aws.amazon.com/vpc/latest/userguide/Extend_VPCs.html#outposts) |   ![](http://docs.aws.amazon.com/outposts/latest/server-userguide/images/icon-yes.png) Yes  |   ![](http://docs.aws.amazon.com/outposts/latest/server-userguide/images/icon-yes.png) Yes  | 
| [Amazon Route 53](https://docs.aws.amazon.com/Route53/latest/DeveloperGuide/outpost-resolver.html) |   ![](http://docs.aws.amazon.com/outposts/latest/server-userguide/images/icon-yes.png) Yes  |  ![](http://docs.aws.amazon.com/outposts/latest/server-userguide/images/icon-no.png) No | 


**Storage**  

| Resource type | Racks | Servers | 
| --- | --- | --- | 
| [Amazon EBS volumes](https://docs.aws.amazon.com/AWSEC2/latest/UserGuide/using-regions-availability-zones.html#outposts-volumes) |   ![](http://docs.aws.amazon.com/outposts/latest/server-userguide/images/icon-yes.png) Yes  |  ![](http://docs.aws.amazon.com/outposts/latest/server-userguide/images/icon-no.png) No | 
| [Amazon S3 buckets](https://docs.aws.amazon.com/AmazonS3/latest/s3-outposts/S3onOutposts.html)  |   ![](http://docs.aws.amazon.com/outposts/latest/server-userguide/images/icon-yes.png) Yes  |  ![](http://docs.aws.amazon.com/outposts/latest/server-userguide/images/icon-no.png) No | 


**Other AWS services**  

| Service | Racks | Servers | 
| --- | --- | --- | 
| AWS IoT Greengrass |   ![](http://docs.aws.amazon.com/outposts/latest/server-userguide/images/icon-yes.png) Yes  |   ![](http://docs.aws.amazon.com/outposts/latest/server-userguide/images/icon-yes.png) Yes  | 

## Pricing
<a name="pricing"></a>

Pricing is based on your order details. When you place an order, you can choose from a variety of Outpost configurations, each providing a combination of Amazon EC2 instance types and storage options. You also choose a contract term and a payment option. Pricing includes the following:
+ **Outposts racks** - Delivery, installation, infrastructure service maintenance, software patches and upgrades, and rack removal.
+ **Outposts servers** - Delivery, infrastructure service maintenance, and software patches and upgrades. You are responsible for the installation and packing the server for return.

You are billed for shared resources and any data transfer from the AWS Region to the Outpost. You are also billed for data transfers that AWS performs to maintain availability and security.

For pricing based on location, configuration, and payment option, see:
+ [Outposts racks pricing](https://aws.amazon.com/outposts/rack/pricing/)
+ [Outposts servers pricing](https://aws.amazon.com/outposts/servers/pricing/)