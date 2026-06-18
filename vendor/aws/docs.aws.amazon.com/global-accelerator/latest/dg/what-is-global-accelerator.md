

# What is AWS Global Accelerator?
<a name="what-is-global-accelerator"></a>

AWS Global Accelerator is a service in which you create *accelerators* to improve the performance of your applications for local and global users. Depending on the type of accelerator you choose, you can gain additional benefits: 
+ With a standard accelerator, you can improve availability of your internet applications that are used by a global audience. With a standard accelerator, Global Accelerator directs traffic over the AWS global network to endpoints in the nearest Region to the client. 
+ With a custom routing accelerator, you can map one or more users to a specific destination among many destinations.

Global Accelerator is a global service that supports endpoints in multiple AWS Regions. To determine if Global Accelerator or other services are currently supported in a specific AWS Region, see the [AWS Regional Services List](https://aws.amazon.com/about-aws/global-infrastructure/regional-product-services/).

By default, Global Accelerator provides you with static IP addresses that you associate with your accelerator. The static IP addresses are anycast from the AWS edge network. For IPv4, Global Accelerator provides two static IPv4 addresses. For dual-stack, Global Accelerator provides a total of four addresses: two static IPv4 addresses and two static IPv6 addresses. For IPv4, instead of using the addresses that Global Accelerator provides, you can configure these entry points to be IPv4 addresses from your own IP address ranges that you bring to Global Accelerator (BYOIP). 

**Important**  
The static IP addresses remain assigned to your accelerator for as long as it exists, even if you disable the accelerator and it no longer accepts or routes traffic. However, when you *delete* an accelerator, you lose the static IP addresses that are assigned to it, so you can no longer route traffic by using them. You can use IAM policies, like tag-based permissions with Global Accelerator, to limit the users who have permissions to delete an accelerator. For more information, see [ABAC with Global Accelerator](security_iam_service-with-iam.md#security_iam_service-with-iam-tags).

For standard accelerators, Global Accelerator uses the AWS global network to route traffic to the optimal regional endpoint based on health, client location, and policies that you configure, which increases the availability of your applications. Endpoints for standard accelerators can be Network Load Balancers, Application Load Balancers, Amazon EC2 instances, or Elastic IP addresses that are located in one AWS Region or multiple Regions.

The service reacts instantly to changes in health or configuration to ensure that internet traffic from clients is always directed to healthy endpoints. Global Accelerator also respects traffic redirection or blocking by several other AWS services: 
+ Global Accelerator respects ARC traffic redirection for supported endpoints, to reroute traffic from a potentially impaired Availability Zone with a zonal shift or zonal autoshift. For more information, see [ Multi-AZ recovery in Amazon Application Recovery Controller (ARC)](https://docs.aws.amazon.com/r53recovery/latest/dg/multi-az.html).
+ Global Accelerator respects VPC Block Public Access, including both modes (bidirectional and ingress-only). When the feature is enabled for an AWS account, Global Accelerator does not serve traffic in the Region for the VPC, except for excluded VPCs and subnets, if any. Note, however, that egress-only exclusions are still blocked for excluded VPCs and subnets. VPC and subnet exclusions must allow ingress traffic. For more information, see [ Block public access to VPCs and subnets](https://docs.aws.amazon.com/vpc/latest/userguide/security-vpc-bpa.html).

Custom routing accelerators only support Amazon VPC (VPC) subnet endpoint types and route traffic to private IP addresses in that subnet.

**Topics**
+ [Components](introduction-components.md)
+ [AWS Regions](preserve-client-ip-address.regions.md)
+ [How it works](introduction-how-it-works.md)
+ [IP address ranges](introduction-ip-ranges.md)
+ [Use cases](introduction-benefits-of-migrating.md)
+ [Speed Comparison Tool](introduction-speed-comparison-tool.md)
+ [How to get started](introduction-get-started.md)
+ [Tagging](tagging-in-global-accelerator.md)
+ [Pricing](introduction-pricing.md)