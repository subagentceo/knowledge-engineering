

# What is Direct Connect?
<a name="Welcome"></a>

Direct Connect links your internal network to an Direct Connect location over a standard Ethernet fiber-optic cable. One end of the cable is connected to your router, the other to an Direct Connect router. With this connection, you can create *virtual interfaces* directly to public AWS services (for example, to Amazon S3) or to Amazon VPC, bypassing internet service providers in your network path. An Direct Connect location provides access to AWS in the Region with which it is associated. You can use a single connection in a public Region or AWS GovCloud (US) to access public AWS services in all other public Regions. 
+ For a list of Direct Connect locations you can connect to, see [AWS Direct Connect Locations](https://aws.amazon.com/directconnect/locations/).
+ For answers to questions about Direct Connect, see the [Direct Connect FAQ](https://aws.amazon.com/directconnect/faqs/#AWS_Transit_Gateway_support/).

The following diagram shows a high-level overview of how Direct Connect interfaces with your network. 

![Direct Connect](http://docs.aws.amazon.com/directconnect/latest/UserGuide/images/dx-vifs.png)


**Topics**
+ [Direct Connect components](#overview-components)
+ [Network requirements](#overview_requirements)
+ [Supported Direct Connect virtual interface types](#dx-vif-types)
+ [Pricing for Direct Connect](#Paying)
+ [Access to remote AWS Regions](remote_regions.md)
+ [Routing policies and BGP communities](routing-and-bgp.md)

## Direct Connect components
<a name="overview-components"></a>

The following are the key components that you use for Direct Connect:

**Connections**  
Create a *connection* in an Direct Connect location to establish a network connection from your premises to an AWS Region. For more information, see [Direct Connect dedicated and hosted connections](WorkingWithConnections.md). 

**Virtual interfaces**  
Create a *virtual interface* to enable access to AWS services. A public virtual interface enables access to public services, such as Amazon S3. A private virtual interface enables access to your VPC. The types of supported interfaces are described below in [Supported Direct Connect virtual interface types](#dx-vif-types). For more details about the supported interfaces, see [Direct Connect virtual interfaces and hosted virtual interfaces](WorkingWithVirtualInterfaces.md) and [Prerequisites for virtual interfaces](WorkingWithVirtualInterfaces.md#vif-prerequisites).

## Network requirements
<a name="overview_requirements"></a>

To use Direct Connect in an Direct Connect location, your network must meet one of the following conditions:
+ Your network is colocated with an existing Direct Connect location. For more information about available Direct Connect locations, see [AWS Direct Connect Product Details](https://aws.amazon.com/directconnect/details). 
+ You are working with an Direct Connect partner who is a member of the AWS Partner Network (APN). For information, see [APN Partners Supporting AWS Direct Connect](https://aws.amazon.com//directconnect/partners/).
+ You are working with an independent service provider to connect to Direct Connect.

In addition, your network must meet the following conditions:
+ Your network must use single-mode fiber with a 1000BASE-LX (1310 nm) transceiver for 1 gigabit Ethernet, a 10GBASE-LR (1310 nm) transceiver for 10 gigabit, a 100GBASE-LR4 for 100 gigabit Ethernet, or a 400GBASE-LR4 for 400 Gbps Ethernet.
+ Depending on the AWS Direct Connect endpoint serving your connection, on-premises device auto-negotiation might need to be enabled or disabled for any dedicated connection. If a virtual interface remains down when a Direct Connect connection is up, see [Troubleshoot layer 2 (data link) issues](ts-layer-2.md).
+ 802.1Q VLAN encapsulation must be supported across the entire connection, including intermediate devices.
+ Your device must support Border Gateway Protocol (BGP) and BGP MD5 authentication.
+ (Optional) You can configure Bidirectional Forwarding Detection (BFD) on your network. Asynchronous BFD is automatically enabled for each Direct Connect virtual interface. It's automatically enabled for Direct Connect virtual interfaces, but does not take effect until you configure it on your router. For more information, see [Enable BFD for a Direct Connect connection](https://aws.amazon.com/premiumsupport/knowledge-center/enable-bfd-direct-connect/). 

Direct Connect supports both the IPv4 and IPv6 communication protocols. IPv6 addresses provided by public AWS services are accessible through Direct Connect public virtual interfaces.

Direct Connect supports an Ethernet frame size of 1522 or 9023 bytes (14 bytes Ethernet header \+ 4 bytes VLAN tag \+ bytes for the IP datagram \+ 4 bytes FCS) at the link layer. You can set the MTU of your private virtual interfaces. For more information, see [MTUs for private virtual interfaces or transit virtual interfaces](WorkingWithVirtualInterfaces.md#set-jumbo-frames-vif).

## Supported Direct Connect virtual interface types
<a name="dx-vif-types"></a>

AWS Direct Connect supports the following three virtual interface (VIF) types:
+ **Private virtual interface**

  This type of interface is used to access an Amazon Virtual Private Cloud (VPC) using private IP addresses. With a private virtual interface you can 
  + Connect directly to a single VPC per private virtual interface to access those resources using private IPs in the same Region.
  + Connect a private virtual interface to a Direct Connect gateway to access multiple virtual private gateways across any account and AWS Region (except the AWS China Regions).
+ **Public virtual interface**

  This type of virtual interface is used to access all AWS public services using public IP addresses. With a public virtual interface you can connect to all AWS public IP addresses and services globally.
+ **Transit virtual interface**

  This type of interface is used to access one or more Amazon VPC Transit Gateways associated with Direct Connect gateways. With a transit virtual interface you connect multiple Amazon VPC Transit Gateways across multiple accounts and AWS Regions (except the AWS China Regions). 
**Note**  
There are limits to the number of different types of associations between a Direct Connect gateway and a virtual interface. For more information about specific limits, see the [Direct Connect quotas](limits.md) page.

For more information about virtual interfaces, see [Direct Connect virtual interfaces and hosted virtual interfaces](WorkingWithVirtualInterfaces.md).

## Pricing for Direct Connect
<a name="Paying"></a>

AWS Direct Connect has two billing elements: port hours and outbound data transfer. Port hour pricing is determined by capacity and connection type (dedicated connection or hosted connection). 

Data Transfer Out charges for private interfaces and transit virtual interfaces are allocated to the AWS account responsible for the Data Transfer. There are no additional charges to use a multi-account AWS Direct Connect gateway.

For publicly addressable AWS resources (for example, Amazon S3 buckets, Classic EC2 instances, or EC2 traffic that goes through an internet gateway), if the outbound traffic is destined for public prefixes owned by the same AWS payer account and actively advertised to AWS through an Direct Connect public virtual Interface, the Data Transfer Out (DTO) usage is metered toward the resource owner at Direct Connect data transfer rate.

For more information, see [AWS Direct Connect Pricing](https://aws.amazon.com/directconnect/pricing/).