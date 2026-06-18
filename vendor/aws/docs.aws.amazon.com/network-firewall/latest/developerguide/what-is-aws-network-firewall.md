

# What is AWS Network Firewall?
<a name="what-is-aws-network-firewall"></a>

AWS Network Firewall is a stateful, managed, network firewall and intrusion detection and prevention service for your virtual private cloud (VPC) that you create in Amazon Virtual Private Cloud (Amazon VPC). With Network Firewall, you can filter traffic at the perimeter of your VPC. This includes filtering traffic going to and coming from an internet gateway, NAT gateway, or over VPN or Direct Connect. 

Network Firewall uses the open source intrusion prevention system (IPS), Suricata, for stateful inspection, and supports Suricata compatible rules. For more information, see [Working with stateful rule groups in AWS Network Firewall](stateful-rule-groups-ips.md).

**Note**  
This section and others that describe Suricata-based concepts are not intended to replace or duplicate information from the Suricata documentation. For more Suricata-specific information, see the [Suricata documentation](https://docs.suricata.io/en/suricata-7.0.8/).

You can use Network Firewall to monitor and protect your Amazon VPC traffic in a number of ways, including the following: 
+ Pass traffic through only from known AWS service domains or IP address endpoints, such as Amazon S3.
+ Use custom lists of known bad domains to limit the types of domain names that your applications can access.
+ Perform deep packet inspection on traffic entering or leaving your VPC.
+ Use stateful protocol detection to filter protocols like HTTPS, independent of the port used.

To enable Network Firewall for a VPC, you perform steps in both Amazon VPC and in Network Firewall. For information about managing your Amazon Virtual Private Cloud VPC, see the [Amazon Virtual Private Cloud User Guide](https://docs.aws.amazon.com/vpc/latest/userguide). For more information about how Network Firewall works, see [How AWS Network Firewall works](how-it-works.md). 

Network Firewall is supported by AWS Firewall Manager. You can use Firewall Manager to centrally configure and manage your firewalls across your accounts and applications in AWS Organizations. You can manage firewalls for multiple accounts using a single account in Firewall Manager. For more information, see [AWS Firewall Manager](https://docs.aws.amazon.com/waf/latest/developerguide/fms-chapter.html) in the *AWS WAF, AWS Firewall Manager, and AWS Shield Advanced Developer Guide*.

**Topics**
+ [AWS Network Firewall​ AWS resources](#aws-resources)
+ [AWS Network Firewall concepts](#concepts)
+ [Accessing AWS Network Firewall](#accessing)
+ [Regions and endpoints for AWS Network Firewall](#regions-and-endpoints)
+ [Pricing for AWS Network Firewall](#pricing)
+ [AWS Network Firewall quotas](#what-it-is-quotas)
+ [AWS Network Firewall additional resources](#info-resources)

## AWS Network Firewall​ AWS resources
<a name="aws-resources"></a>

Network Firewall manages the following AWS resource types: 
+ **Firewall** – Provides traffic filtering logic for a VPC. The Firewall defines the primary VPC to protect and a primary subnet to use for a firewall endpoint in each Availability Zone. 
+ **VpcEndpointAssociation** – Provides additional firewall endpoints for a Firewall, in the primary VPC and other VPCs. 
+ **FirewallPolicy** – Defines rules and other settings for a firewall to use to filter incoming and outgoing traffic in a VPC. 
+ **RuleGroup** – Defines a set of rules to match against VPC traffic, and the actions to take when Network Firewall finds a match. Network Firewall uses stateless and stateful rule group types, each with its own Amazon Resource Name (ARN).

## AWS Network Firewall concepts
<a name="concepts"></a>

AWS Network Firewall is a firewall service for Amazon Virtual Private Cloud (Amazon VPC). For information about managing your Amazon Virtual Private Cloud VPC, see the [Amazon Virtual Private Cloud User Guide](https://docs.aws.amazon.com/vpc/latest/userguide). 

The following are the key concepts for Network Firewall: 
+ **Virtual private cloud (VPC)** – A virtual network dedicated to your AWS account. 
+ **Internet gateway** – A gateway that you attach to a VPC to enable communication between resources in the VPC and the internet.
+ **Subnet** – A range of IP addresses in a VPC. Network Firewall creates firewall endpoints in subnets inside your VPC, to filter network traffic. In a VPC architecture that uses Network Firewall, the firewall endpoints sit between your protected subnets and locations outside your VPC.
+ **Firewall subnet** – A subnet that you've designated for exclusive use by Network Firewall for a firewall endpoint. A firewall endpoint can't filter traffic coming into or going out of the subnet in which it resides, so don't use your firewall subnets for anything other than Network Firewall.
+ **Route table** – A set of rules, called routes, that are used to determine where network traffic is directed. You modify your VPC route tables in Amazon VPC to direct traffic through your firewalls for filtering.
+ **Network Firewall *firewall*** – An AWS resource that provides traffic filtering logic, and that defines the primary VPC to protect and a subnet in each Availability Zone for that VPC to use for firewall endpoints. 
+ **Network Firewall *VPC endpoint association*** – An AWS resource that defines a firewall endpoint in addition to the primary endpoints that the firewall defines, and uses the firewall's traffic filtering logic and other settings. A VPC endpoint association can be for the firewall's VPC or for another VPC. 
+ **Network Firewall *firewall policy*** – An AWS resource that defines rules and other settings for a firewall to use to filter incoming and outgoing traffic in a VPC. 
+ **Network Firewall *rule group*** – An AWS resource that defines a set of rules to match against VPC traffic, and the actions to take when Network Firewall finds a match. 
+ **Stateless rules** – Criteria for inspecting a single network traffic packet, without the context of the other packets in the traffic flow, the direction of flow, or any other information that's not provided by the packet itself. 
+ **Stateful rules** – Criteria for inspecting network traffic packets in the context of their traffic flow. 
+ **Flows** – Network traffic that is monitored by a firewall, either by stateful or stateless rules. For traffic to be considered part of a flow, it must share Destination, DestinationPort, Direction, Protocol, Source, and SourcePort with other traffic. Flows that are processed by the firewall are tracked in the firewall state table and are visible in flow logs.
+ **Firewall state table** – Table where Network Firewall tracks and maintains information about network traffic flows. The firewall state table only tracks flows that are processed by stateful rules. When traffic matches the criteria in a stateful rule, the firewall creates a flow entry in the firewall state table. These entries persist until they are either removed using a flow flush operation, naturally terminate, or time out due to inactivity. You can manage the firewall state table using specific operations. This is also known as the firewall table or state table.

  For information, see [Flow operations in your firewall](firewall-flow-operations.md).

## Accessing AWS Network Firewall
<a name="accessing"></a>

You can create, access, and manage your firewall, firewall policy, and rule group resources in Network Firewall using any of the following methods:
+ **AWS Management Console** – Provides a web interface for managing the service. The procedures throughout this guide explain how to use the AWS Management Console to perform tasks for Network Firewall. You can access the AWS Management Console at [https://aws.amazon.com/console](https://aws.amazon.com/console/). To access Network Firewall using the console:

  ```
  https://{{<region>}}.console.aws.amazon.com/network-firewall/home
  ```
+ **AWS Command Line Interface (AWS CLI)** – Provides commands for a broad set of AWS services, including Network Firewall. The CLI is supported on Windows, macOS, and Linux. For more information, see the [AWS Command Line Interface User Guide](https://docs.aws.amazon.com/cli/latest/userguide/). To access Network Firewall using the CLI endpoint:

  ```
  aws network-firewall
  ```
+ **AWS Network Firewall API** – Provides a RESTful API. The REST API requires you to handle connection details, such as calculating signatures, handling request retries, and handling errors. For more information, see [AWS APIs](https://docs.aws.amazon.com/general/latest/gr/aws-apis.html) and the [AWS Network Firewall API Reference](https://docs.aws.amazon.com/network-firewall/latest/APIReference/). To access Network Firewall, use the following REST API endpoint:

  ```
  https://network-firewall.{{<region>}}.amazonaws.com 
  ```
+ **AWS SDKs** – Provide language-specific APIs. If you're using a programming language that AWS provides an SDK for, you can use the SDK to access AWS Network Firewall. The SDKs handle many of the connection details, such as calculating signatures, handling request retries, and handling errors. They integrate easily with your development environment, and provide easy access to Network Firewall commands. For more information, see [Tools for Amazon Web Services](https://aws.amazon.com/tools).
+ **AWS CloudFormation** – Helps you model and set up your Amazon Web Services resources so that you can spend less time managing those resources and more time focusing on your applications that run in AWS. You create a template that describes all the AWS resources that you want and CloudFormation takes care of provisioning and configuring those resources for you. For more information, see [Network Firewall resource type reference](https://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/AWS_NetworkFirewall.html) in the *AWS CloudFormation User Guide*.
+ **AWS Tools for Windows PowerShell** – Let developers and administrators manage their AWS services and resources in the PowerShell scripting environment. For more information, see the [AWS Tools for PowerShell User Guide](https://docs.aws.amazon.com/powershell/latest/userguide/).

## Regions and endpoints for AWS Network Firewall
<a name="regions-and-endpoints"></a>

To view the complete list of AWS Regions where Network Firewall is available, see [Service endpoints and quotas](https://docs.aws.amazon.com/general/latest/gr/network-firewall.html) in the *AWS General Reference*. 

 **IPv4 endpoints** 

```
https://network-firewall.{{<region>}}.amazonaws.com
```

 **Dual-stack (IPv4 and IPv6) endpoints** 

Dual-stack endpoints support both IPv4 and IPv6 traffic. When you make a request to a dual-stack endpoint, the endpoint URL resolves to an IPv6 or IPv4 address, depending on the protocol used by your network and client.

```
https://network-firewall.{{<region>}}.api.aws
```

## Pricing for AWS Network Firewall
<a name="pricing"></a>

For detailed information about pricing for Network Firewall, see [AWS Network Firewall pricing](https://aws.amazon.com/network-firewall/pricing/).

Some configurations can incur additional costs, on top of the basic costs for using Network Firewall. For example, if you use a firewall endpoint in one Availability Zone to filter traffic from another zone, you can incur cross-zone traffic charges. If you enable logging, you incur additional charges according to factors such as the logging destination that you use and the amount of traffic that you choose to log. 

## AWS Network Firewall quotas
<a name="what-it-is-quotas"></a>

AWS Network Firewall defines maximum settings and other quotas on the number of Network Firewall resources that you can use. You can request an increase for some of these quotas. For more information, see [AWS Network Firewall quotas](quotas.md).

## AWS Network Firewall additional resources
<a name="info-resources"></a>

To get a hands-on introduction to AWS Network Firewall, complete [Getting started with AWS Network Firewall](getting-started.md). 

Use the following resources to get additional information and guidance for using AWS Network Firewall. 
+ **[AWS discussion forums](https://forums.aws.amazon.com/)** – A community-based forum for discussing technical questions related to this and other AWS services. 
+ **[Getting started resource center](https://aws.amazon.com/getting-started/)** – Information to help you get started building on AWS.
+ **[Support center](https://console.aws.amazon.com/support/home#/)** – The home page for AWS Support.
+ **[Contact Us](https://aws.amazon.com/contact-us/)** – A central contact point for inquiries concerning billing, accounts, and events.