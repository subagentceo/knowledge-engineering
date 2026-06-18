

# Welcome
<a name="Welcome"></a>

This is the API Reference for AWS Network Firewall. This guide is for developers who need detailed information about the Network Firewall API actions, data types, and errors. 

The REST API requires you to handle connection details, such as calculating signatures, handling request retries, and error handling. For general information about using the AWS REST APIs, see [AWS APIs](https://docs.aws.amazon.com/general/latest/gr/aws-apis.html). 

To view the complete list of AWS Regions where Network Firewall is available, see [Service endpoints and quotas](https://docs.aws.amazon.com/general/latest/gr/network-firewall.html) in the * AWS General Reference*. 

To access Network Firewall using the IPv4 REST API endpoint: `https://network-firewall.<region>.amazonaws.com ` 

To access Network Firewall using the Dualstack (IPv4 and IPv6) REST API endpoint: `https://network-firewall.<region>.aws.api ` 

Alternatively, you can use one of the AWS SDKs to access an API that's tailored to the programming language or platform that you're using. For more information, see [AWS SDKs](http://aws.amazon.com/tools/#SDKs).

For descriptions of Network Firewall features, including and step-by-step instructions on how to use them through the Network Firewall console, see the [Network Firewall Developer Guide](https://docs.aws.amazon.com/network-firewall/latest/developerguide/).

Network Firewall is a stateful, managed, network firewall and intrusion detection and prevention service for Amazon Virtual Private Cloud (Amazon VPC). With Network Firewall, you can filter traffic at the perimeter of your VPC. This includes filtering traffic going to and coming from an internet gateway, NAT gateway, or over VPN or Direct Connect. Network Firewall uses rules that are compatible with Suricata, a free, open source network analysis and threat detection engine. AWS Network Firewall supports Suricata version 7.0.8. For information about Suricata, see the [Suricata website](https://suricata.io/) and the [Suricata User Guide](https://suricata.readthedocs.io/en/suricata-7.0.8/). 

You can use Network Firewall to monitor and protect your VPC traffic in a number of ways. The following are just a few examples: 
+ Allow domains or IP addresses for known AWS service endpoints, such as Amazon S3, and block all other forms of traffic.
+ Use custom lists of known bad domains to limit the types of domain names that your applications can access.
+ Perform deep packet inspection on traffic entering or leaving your VPC.
+ Use stateful protocol detection to filter protocols like HTTPS, regardless of the port used.

To enable Network Firewall for your VPCs, you perform steps in both Amazon VPC and in Network Firewall. For information about using Amazon VPC, see [Amazon VPC User Guide](https://docs.aws.amazon.com/vpc/latest/userguide/).

To start using Network Firewall, do the following: 

1. (Optional) If you don't already have a VPC that you want to protect, create it in Amazon VPC. 

1. In Amazon VPC, in each Availability Zone where you want to have a firewall endpoint, create a subnet for the sole use of Network Firewall. 

1. In Network Firewall, define the firewall behavior as follows: 

   1. Create stateless and stateful rule groups, to define the components of the network traffic filtering behavior that you want your firewall to have. 

   1. Create a firewall policy that uses your rule groups and specifies additional default traffic filtering behavior. 

1. In Network Firewall, create a firewall and specify your new firewall policy and VPC subnets. Network Firewall creates a firewall endpoint in each subnet that you specify, with the behavior that's defined in the firewall policy.

1. In Amazon VPC, use ingress routing enhancements to route traffic through the new firewall endpoints.

After your firewall is established, you can add firewall endpoints for new Availability Zones by following the prior steps for the Amazon VPC setup and firewall subnet definitions. You can also add endpoints to Availability Zones that you're using in the firewall, either for the same VPC or for another VPC, by following the prior steps for the Amazon VPC setup, and defining the new VPC subnets as VPC endpoint associations. 

This document was last published on June 17, 2026. 