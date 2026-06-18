

# What is AWS Global Networks for Transit Gateways?
<a name="what-are-global-networks"></a>

AWS Global Networks for Transit Gateways enables you to create one or more global networks and then centrally manage those global networks across AWS accounts, Regions, and on-premises locations. 

**Note**  
If you want to create a core network within one of your global networks you'll use AWS Cloud WAN to create, manage, and monitor that core network. For more information on creating a global network with a core network, see the [AWS Cloud WAN User Guide](https://docs.aws.amazon.com/network-manager/latest/cloudwan/what-is-cloudwan.html).

## Global networks concepts
<a name="concepts"></a>

The following are the key concepts when using global networks to manage transit gateways.
+ **Global network** — A single, private network that acts as the high-level container for your network objects. A global network can contain both AWS Transit Gateways and, if you're using AWS Cloud WAN, other Cloud WAN core networks. You can see these through the AWS Network Manager console.
+ **Device** — Represents a physical or a virtual appliance in an on-premises network, data center, AWS Cloud, or other cloud providers.
+ **Connection** — Represents connectivity between two devices. The connection can be between a physical or virtual appliance and a third-party virtual appliance inside a VPC, or it can be between physical appliances in an on-premises network.
+ **Link** — Represents a single internet connection from a site.
+ **Site** — Represents a physical on-premises location. It could be a branch, office, store, campus, or a data center.

### Home Region
<a name="cloudwan-home-region"></a>

The home Region is the AWS Region where data related to your use of your AWS Global Networks for Transit Gateways global network is aggregated and stored. Global networks aggregates and stores this information in the home Region to provide you with a central dashboard with visualized insights into your global network. Currently, global networks only supports US West (Oregon) as the home Region. 

**Important**  
Global networks aggregates and stores regional usage data associated with the transit gateways specified from the AWS Regions you're using to the US West (Oregon) Region. 
Global networks aggregates and stores regional usage data associated with the transit gateways from the AWS GovCloud (US) Regions to the AWS GovCloud (US-West) Region.
Once established, you can't change the home Region.

We aggregate and store this regional usage data from the AWS Regions you are using to US West (Oregon) using Amazon Simple Queue Service (SQS) and Amazon Simple Storage Service (S3). This data includes but is not limited to:
+ Topology data for registered transit gateways
+ Event data for transit gateways and VPNs 
+ Transit gateway IDs for registering transit gateways into a global network
+ (Optional) Location data related to your device and site registrations
+ (Optional) Provider and link data related to your link registrations
+ (Optional) IP address and CIDR ranges used in transit gateway Connect peers

All movement and data aggregation occurs over a secure and encrypted channel and stored with encryption at rest. 

AWS Global Networks for Transit Gateways uses Amazon Location Service to create maps of your global network. For more information about Amazon Location Service, see [Amazon Location Service](https://aws.amazon.com/location/).

## AWS PrivateLink support
<a name="nm-privatelink"></a>

Network Manager supports AWS PrivateLink to create private connectivity between Network Manager and your VPCs. Using PrivateLink, you can establish secure and private connectivity without the need for using an internet gateway or any NAT devices to communicate with your VPCs. 

While there is no price charge for using Network Manager, there is a price charge for using PrivateLink. See for more information.

**Note**  
PrivateLink only supports IPv6 dual-stack endpoints.
Support for PrivateLink through Network Manager is currently available only in the us-west-2 and us-gov-west-1 Regions.

For more information on PrivateLink, see the [https://docs.aws.amazon.com/vpc/latest/privatelink/what-is-privatelink.html](https://docs.aws.amazon.com/vpc/latest/privatelink/what-is-privatelink.html).

## IPv6 support
<a name="nm-ipv6"></a>

Network Manager supports Internet Protocol version 6 (IPv6) on dual-stack endpoints. Backwards compatibility is supported for IPv4 endpoints. For example, `networkmanager.us-west-2.api.aws`. 

## Region availability
<a name="nm-available-regions"></a>

AWS Global Networks for Transit Gateways is available in the following AWS Regions:


| AWS Region | Description | 
| --- | --- | 
| af-south-1 | Africa (Cape Town) | 
| ap-east-1 | Asia Pacific (Hong Kong) | 
| ap-northeast-1 | Asia Pacific (Tokyo) | 
| ap-northeast-2 | Asia Pacific (Seoul) | 
| ap-northeast-3 | Asia Pacific (Osaka) | 
| ap-south-1 | Asia Pacific (Mumbai) | 
| ap-south-2 | Asia Pacific (Hyderabad) | 
| ap-southeast-1 | Asia Pacific (Singapore) | 
| ap-southeast-2 | Asia Pacific (Sydney) | 
| ap-southeast-3 | Asia Pacific (Jakarta) | 
| ap-southeast-4 | Asia Pacific (Melbourne) | 
| ap-southeast-5 | Asia Pacific (Malaysia) | 
| ca-central-1 | Canada (Central) | 
| ca-west-1 | Canada West (Calgary) | 
| eu-central-1 | Europe (Frankfurt) | 
| eu-central-2 | Europe (Zurich) | 
| eu-north-1 | Europe (Stockholm) | 
| eu-south-1 | Europe (Milan) | 
| eu-south-2 | Europe (Spain) | 
| eu-west-1 | Europe (Ireland) | 
| eu-west-2 | Europe (London) | 
| eu-west-3 | Europe (Paris) | 
| il-central-1 | Israel (Tel Aviv) | 
| me-central-1 | Middle East (UAE) | 
| me-south-1 | Middle East (Bahrain) | 
| sa-east-1 | South America (São Paulo) | 
| us-east-1 | US East (N. Virginia) | 
| us-east-2 | US East (Ohio) | 
| us-west-1 | US West (N. California) | 
| us-west-2 | US West (Oregon) | 
| us-gov-east-1 | AWS GovCloud (US-East) | 
| us-gov-west-1 | AWS GovCloud (US-West) | 

## How to get started with global networks for transit gateways
<a name="nm-how-to-get-started"></a>

Use the following resources to help you use global networks:
+ [How AWS Global Networks for Transit Gateways works](how-gnw-works.md)
+ [Get started](gnw-getting-started.md)
+ [Access transit gateway network dashboards using AWS Network Manager](nm-monitoring-console.md)

## Pricing
<a name="nm-pricing"></a>

There are no additional fees for using global networks to manage transit gateways networks. You are charged the standard fees for the network resources that you manage in your global network (such as transit gateways). For more information about pricing, see [AWS Transit Gateway pricing](https://aws.amazon.com/transit-gateway/pricing/).