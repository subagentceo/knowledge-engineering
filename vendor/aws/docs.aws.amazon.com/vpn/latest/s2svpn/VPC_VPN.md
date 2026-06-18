

# What is AWS Site-to-Site VPN?
<a name="VPC_VPN"></a>

By default, an instance that you launch within an Amazon VPC can't communicate with a local (AWS Cloud) network and a remote device — for example, this might be a site or an on-premises device. You can enable access to your remote devices from your VPC by creating an AWS Site-to-Site VPN (Site-to-Site VPN) connection, and configuring routing to pass traffic through the connection.

Although the term *VPN connection* is a general term, in this documentation, a VPN connection refers to the connection between your VPC and your own on-premises network. Site-to-Site VPN supports Internet Protocol security (IPsec) VPN connections.

**Topics**
+ [Concepts](#concepts)
+ [Site-to-Site VPN features](#s2svpn-features)
+ [Site-to-Site VPN limitations](#site-to-site-limitations)
+ [Site-to-Site VPN resources](#site-site-tools)
+ [Pricing](#pricing)

## Concepts
<a name="concepts"></a>

The following are the key concepts for Site-to-Site VPN:
+ **VPN connection**: A secure connection between your on-premises equipment and your VPCs.
+ **VPN tunnel**: An encrypted link where data can pass from the customer network to or from AWS.

  Each VPN connection includes two VPN tunnels which you can simultaneously use for high availability.
+ **Customer gateway**: An AWS resource which provides information to AWS about your customer gateway device. 
+ **Customer gateway device**: A physical device or software application on your side of the Site-to-Site VPN connection.
+ **Target gateway**: A generic term for the VPN endpoint on the Amazon side of the Site-to-Site VPN connection.
+ **Virtual private gateway**: A virtual private gateway is the VPN endpoint on the Amazon side of your Site-to-Site VPN connection that can be attached to a single VPC.
+ **Transit gateway**: A transit hub that can be used to interconnect multiple VPCs and on-premises networks, and as a VPN endpoint for the Amazon side of the Site-to-Site VPN connection.
+ **Large Bandwidth Tunnel **: A tunnel configuration that supports up to 5 Gbps bandwidth per tunnel, compared to the standard 1.25 Gbps. Available for VPN connections attached to Transit Gateway or Cloud WAN.

## Site-to-Site VPN features
<a name="s2svpn-features"></a>

The following features are supported on AWS Site-to-Site VPN connections:
+ Internet Key Exchange version 2 (IKEv2)
+ NAT traversal
+ 4-byte ASN in the range of 1–2147483647 for Virtual Private Gateway (VGW) configuration. See [Customer gateway options for your AWS Site-to-Site VPN connection](cgw-options.md) for more information.
+ 2-byte ASN for Customer Gateway (CGW) in the range of 1–65535. See [Customer gateway options for your AWS Site-to-Site VPN connection](cgw-options.md) for more information.
+ CloudWatch metrics
+ Reusable IP addresses for your customer gateways
+ Additional encryption options; including AES 256-bit encryption, SHA-2 hashing, and additional Diffie-Hellman groups
+ Configurable tunnel options
+ Custom private ASN for the Amazon side of a BGP session
+ Private Certificate from a subordinate CA from AWS Private Certificate Authority
+ Support for IPv6 support for AWS Site-to-Site VPN
  + IPv6 for inner tunnel IP addresses (packet IP)
  + IPv6 for outer tunnel IP addresses (tunnel IP) on Transit Gateway and Cloud WAN
+ Full IPv6 migration support with the following combinations:
  + IPv6 outer tunnel IP with IPv6 inner packet IP (IPv6-in-IPv6)
  + IPv6 outer tunnel IP with IPv4 inner packet IP (IPv4-in-IPv6)

## Site-to-Site VPN limitations
<a name="site-to-site-limitations"></a>

A Site-to-Site VPN connection has the following limitations.
+ IPv6 traffic is not supported for VPN connections on a virtual private gateway. IPv6 for outer tunnel IPs is only supported on Transit Gateway and Cloud WAN.
+ An Site-to-Site VPN connection does not support Path MTU Discovery.
+ A single Site-to-Site VPN connection cannot support both IPv4 and IPv6 traffic simultaneously. You need separate VPN connections to transport IPv4 and IPv6 packets.
+ Private IP VPN connections do not support IPv6 addresses for outer tunnel IPs.
+ You cannot modify an existing IPv4 VPN connection to use IPv6. You must delete the existing connection and create a new one.

In addition, take the following into consideration when you use Site-to-Site VPN.
+ When connecting your VPCs to a common on-premises network, we recommend that you use non-overlapping CIDR blocks for your networks.

## Site-to-Site VPN resources
<a name="site-site-tools"></a>

You can create, access, and manage your Site-to-Site VPN resources using any of the following interfaces:
+ **AWS Management Console**— Provides a web interface that you can use to access your Site-to-Site VPN resources.
+ **AWS Command Line Interface (AWS CLI)** — Provides commands for a broad set of AWS services, including Amazon VPC, and is supported on Windows, macOS, and Linux. the AWS Site-to-Site VPN command lines are included in the larger EC2 command line reference 
  + For general information about the command line interface, see [AWS Command Line Interface](https://aws.amazon.com/cli/).
  + For the list of available EC2 commands, including the Site-to-Site VPN commands, see [EC2 Command Line Reference](https://docs.aws.amazon.com/cli/latest/reference/ec2/).
**Note**  
The command line reference does not differentiate between the Site-to-Site VPN commands and the larger set of EC2 commands
+ **AWS SDKs** — Provide language-specific APIs and takes care of many of the connection details, such as calculating signatures, handling request retries, and error handling. For more information, see [AWS SDKs](https://aws.amazon.com/developer/tools/).
+ **Query API**— Provides low-level API actions that you call using HTTPS requests. Using the Query API is the most direct way to access Amazon VPC, but it requires that your application handle low-level details such as generating the hash to sign the request, and error handling. For more information, see the [Amazon EC2 API Reference](https://docs.aws.amazon.com/AWSEC2/latest/APIReference/).

## Pricing
<a name="pricing"></a>

You are charged for each VPN connection hour that your VPN connection is provisioned and available. For more information, see [AWS Site-to-Site VPN and Accelerated Site-to-Site VPN Connection pricing](https://aws.amazon.com/vpn/pricing/#AWS_Site-to-Site_VPN_and_Accelerated_Site-to-Site_VPN_Connection_Pricing).

You are charged for data transfer out from Amazon EC2 to the internet. For more information, see [Data Transfer](https://aws.amazon.com/ec2/pricing/on-demand/#Data_Transfer) on the Amazon EC2 On-Demand Pricing page.

When you create an accelerated VPN connection, we create and manage two accelerators on your behalf. You are charged an hourly rate and data transfer costs for each accelerator. For more information, see [AWS Global Accelerator pricing](https://aws.amazon.com/global-accelerator/pricing/).

There are no additional charges for using IPv6 addresses with your Site-to-Site VPN VPN connections.