

# What is AWS Cloud WAN?
<a name="what-is-cloudwan"></a>

AWS Cloud WAN is a managed wide-area networking (WAN) service that you can use to build, manage, and monitor a unified global network that connects resources running across your cloud and on-premises environments. It provides a central dashboard from which you can connect on-premises branch offices, data centers, and Amazon Virtual Private Clouds (VPCs) across the AWS global network. You can use simple network policies to centrally configure and automate network management and security tasks, and get a complete view of your global network. For key concepts and terms about global and core networks, see [Global and core network key concepts](#cloudwan-concepts-key).

**Note**  
AWS Cloud WAN is designed to work with a core network. You can create a core network at the time you create your global network, or you can create one later on. If you want to create a global network without using a core network, use AWS Global Networks for Transit Gateways. For more information, see the [https://docs.aws.amazon.com/network-manager/latest/tgwnm/what-are-global-networks.html](https://docs.aws.amazon.com/network-manager/latest/tgwnm/what-are-global-networks.html).

There are a number of ways you can work with AWS Cloud WAN to create and maintain your core network, policies, segments, and attachments:
+ **AWS Management console**

  The AWS Management console provides a web interface for you to create your global and core networks, policy versions, segments, and attachments. For more information on using the console to create and maintain your global and core networks, see [Quick start: Create a global and core network](cloudwan-getting-started.md). 
+ **AWS Command Line Interface (AWS CLI)**

  Provides command-line support for a broad set of AWS services using the command line. For more information, see the [Amazon EC2 command line reference](https://docs.aws.amazon.com/cli/latest/reference/ec2/index.html), which includes AWS Transit Gateway and Amazon VPC, and the [AWS Global Networks for Transit Gateways command line reference](https://docs.aws.amazon.com/cli/latest/reference/networkmanager/index.html).
+ ****AWS** SDKs**

  Provides language-specific API operations and takes care of a number of connection details, such as calculating signatures, handling request retries, and handling errors. For more information, see the *[AWS Global Networks for Transit Gateways API Reference](https://awscli.amazonaws.com/v2/documentation/api/latest/reference/networkmanager/index.html)*.
+ ****Query API****

  Provides low-level API actions using HTTPS requests. Using the Query API is the most direct way to access Amazon VPC, but it requires that your application handle low-level details such as generating the hash to sign the request, and handling errors. For more information, see the [*Amazon EC2 API Reference*.](https://docs.aws.amazon.com/AWSEC2/latest/APIReference/)

## Global and core network key concepts
<a name="cloudwan-concepts-key"></a>

The following are the key concepts for AWS Cloud WAN:
+ **Global network **

  A single, private network that acts as the high-level container for your network objects. A global network can contain both AWS Transit Gateways and other AWS Cloud WAN core networks. These can be seen in the Network Manager console.
+ **Core network** 

  The part of your global network managed by AWS. This includes Regional connection points and attachments, such as VPNs, VPCs, and Transit Gateway Connects. Your core network operates in the Regions that are defined in your core network policy document.
+ **Core network policy**

  A core network policy document is a single document applied to your core network that captures your intent and deploys it for you. The core network policy is a declarative language that defines segments, AWS Region routing, and how attachments should map to segments. With a core network policy, you can describe your intent for access control and traffic routing, and AWS Cloud WAN handles the configuration details. Some examples of advanced architectures that you can create with policy include creating a segment for shared services (for example, service directories or authentication services), providing internet access through a firewall for a segment, automatically assigning VPCs to segments based on tags, and defining which AWS Regions a segment is available in.

  Over time you might find that you want to make adjustments or additions to your core network policy. With a policy, you can make any changes or additions to your core network and apply those changes through an updated JSON policy. You can do this using either the visual editor on the console, or through an included JSON editor. You can maintain multiple versions of a policy, although only one policy can be in effect. At any time, you can update your core network to use a new policy or revert to a previous version.
+ **Attachments **

  Attachments are any connections or resources that you want to add to your core network. Supported attachments include VPCs, VPNs, Transit Gateway route table attachments, and Connect attachments.
+ **Core network edge**

  The Regional connection point managed by AWS in each Region, as defined in the core network policy. Every attachment connects to a core network edge. This is also known as an AWS Transit Gateway, and it inherits many of the same properties.

  In your core network policy document, you define the AWS Region where you want connectivity. At any time, you can add or remove AWS Regions using the policy document. For each AWS Region that you define in the policy document, AWS Cloud WAN then creates a core network edge router in the specified Region. All core network edges in your core network create full-mesh peering with each other to form a highly resilient network. Traffic across the AWS global network uses redundant connections and multiple paths.
+ **Network segments**

  Segments are dedicated routing domains, which means that by default, only attachments within the same segment can communicate. You can define segment actions that share routes across segments in the core network policy. In a traditional network, a segment is similar to a globally consistent Virtual Routing and Forwarding (VRF) table, or a Layer 3 IP VPN over an MPLS network.

  AWS Cloud WAN supports built-in segmentation, which means that you can more easily manage network isolation across your AWS and on-premises locations. Using network segments, you can divide your global network into separate isolated networks. For example, you might want to isolate traffic between different parts of your business, such as between retail sites or IT networks. 

  You can create a segment and define whether resources that ask for access require approval. You can also define explicit route filters to be applied before those routes can be attached to a segment. Each attachment connects to one segment. Each segment will create a dedicated routing domain. You can create multiple network segments within your global network. Resources connected to the same segment can only communicate within the segment. Optionally, resources in the same segment can be isolated from each other, with access only to shared services. With segments, AWS maintains a consistent configuration across AWS Regions for you, instead of you needing to synchronize configuration across every device in your network.
+ **Segment actions and attachment policies**

  Segment actions define how routing works between segments. After you create a segment, you can choose to map attachments to the segments either by explicitly mapping a resource to a segment (for example, "`VpcId: "vpc-2f09a348`) or by creating and using attachment policies. Instead of manually associating a segment to each attachment, attachments are tagged. Those tags are then associated with the applicable segment. When attachments are mapped to segments, you can choose how routes are shared between segments. For example, you might want to share access to a VPN across multiple segments, or allow access between two types of branch offices. You can also choose to configure centralized internet routing for a segment, or route traffic between segments through a firewall.
+ **Core network owner** and **Attachment owner**

  When creating a core network within a global network, the user that creates the core network automatically becomes the owner of the core network. A core network owner has full control and visibility over all parts of the AWS Cloud WAN network. The core network owner can then share a core network across accounts or across an organization using AWS Resource Access Manager. For more information, see [Shared AWS Cloud WAN core network](cloudwan-share-network.md). The account to which the core network is shared becomes an attachment owner. An attachment owner has permission only to create connections, attachments, or tags, but no permission for any core network tasks. A core network owner can also be an attachment owner.

  A core network owner can:
  + Create, update, restore, delete, or share a Cloud WAN network.
  + Create, update, download, run, delete, or restore core network policy versions.
  + Create, update, or delete core network attachments.
  + Accept or reject core network attachments.
  + Create, update, or remove attachment tags.
  + Visualize policy change sets.
  + Visualize maps of your network topology, including network resources such as attachments, sites, and devices.
  + Track network events, routes, and performance.
  + Create sites, links, devices, and other transit gateway associations.

  An attachment owner can:
  + Create, update, or delete VPC attachments.
  + Add, update, or remove attachment tags.
+ **Peering**

  You can interconnect your core network edge and transit gateway in the same AWS Region using a peering connection. You can create one or more route table attachments over a peering connection to peer a transit gateway route table through a Cloud WAN network segment, allowing you to deploy end-to-end network segmentation across your transit gateway and Cloud WAN-based networks.

## AWS PrivateLink support
<a name="cloudwan-privatelink"></a>

Cloud WAN supports AWS PrivateLink. PrivateLink allows you to create an endpoint connecting Cloud WAN and your VPCs privately without the need for using an internet gateway or any NAT devices to communicate with your VPCs. 

Costs associated with using PrivateLink are separate from any Cloud WAN costs you might incur. For more information, see [AWS PrivateLink pricing](https://aws.amazon.com/privatelink/pricing/). 

**Note**  
PrivateLink only supports IPv6 dual-stack endpoints.
Support for PrivateLink through Cloud WAN is currently available only in the us-west-2 and us-gov-west-1 Regions.

For more information on PrivateLink, see the [https://docs.aws.amazon.com/vpc/latest/privatelink/what-is-privatelink.html](https://docs.aws.amazon.com/vpc/latest/privatelink/what-is-privatelink.html).

## IPv6 support
<a name="cloudwan-ipv6"></a>

Cloud WAN supports Internet Protocol version 6 (IPv6) on dual-stack endpoints. Backwards compatibility is supported for IPv4 endpoints. For example, `networkmanager.us-west-2.api.aws`. 

## Home Region
<a name="cloudwan-home-region"></a>

The home Region is the AWS Region where data related to your use of your AWS Cloud WAN core network is aggregated and stored. Cloud WAN aggregates and stores this information in the home Region to provide you with a central dashboard with visualized insights into your global network by creating maps of your network topology. Currently, Cloud WAN only supports US West (Oregon) as the home Region. 

Cloud WAN uses Amazon Location Service to create maps of your global network. For more information about Amazon Location Service, see [Amazon Location Service](https://aws.amazon.com/location/).

**Important**  
Cloud WAN aggregates and stores Regional usage data associated with the core network edges specified in your core network policy from the AWS Regions you're using to the US West (Oregon) Region. 
When it has been established, you can't change the home Region.

AWS aggregates and stores this Regional usage data from the AWS Regions that you are using to US West (Oregon), using Amazon Simple Queue Service (SQS) and Amazon Simple Storage Service (S3). This data includes but is not limited to:
+ Topology data for registered transit gateways
+ Event data for transit gateways and VPNs
+ Transit gateway IDs for registering transit gateways into a global network
+ (Optional) Location data related to your device and site registrations
+ (Optional) Provider and link data related to your link registrations
+ (Optional) IP address and CIDR ranges used in Cloud WAN and transit gateway Connect peers

All movement and data aggregation occurs over a secure and encrypted channel and stored with encryption at rest. 

## Region availability
<a name="cloudwan-available-regions"></a>

AWS Cloud WAN is available in the following AWS Regions:


| AWS Region | Description | 
| --- | --- | 
| us-east-1 | US East (N. Virginia) | 
| us-east-2 | US East (Ohio) | 
| us-west-1 | US West (N. California) | 
| us-west-2 | US West (Oregon) | 
| af-south-1 | Africa (Cape Town) | 
| ap-east-2 | Asia Pacific (Taipei) | 
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
| ap-southeast-6 | Asia Pacific (New Zealand) | 
| ap-southeast-7 | Asia Pacific (Thailand) | 
| ca-central-1 | Canada (Central) | 
| ca-west-1 | Canada West (Calgary) | 
| eu-central-1 | Europe (Frankfurt) | 
| eu-central-2 | Europe (Zurich) | 
| eu-north-1 | Europe (Stockholm) | 
| eu-west-1 | Europe (Ireland) | 
| eu-west-2 | Europe (London) | 
| eu-west-3 | Europe (Paris) | 
| eu-south-1 | Europe (Milan) | 
| eu-south-2 | Europe (Spain) | 
| il-central-1 | Israel (Tel Aviv) | 
| me-central-1 | Middle East (UAE) | 
| me-south-1 | Middle East (Bahrain) | 

AWS Cloud WAN is also available in the following AWS Regions in the GovCloud partition:


| AWS Region | Description | 
| --- | --- | 
| us-gov-west-1 | AWS GovCloud (US-West) | 
| us-gov-east-1 | AWS GovCloud (US-East) | 

## Cloud WAN pricing
<a name="cloudwan-available-pricing"></a>

For information about Cloud WAN pricing, see [AWS Cloud WAN Pricing](https://aws.amazon.com/cloud-wan/pricing/).