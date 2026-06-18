

# What is AWS Client VPN?
<a name="what-is"></a>

AWS Client VPN is a managed client-based VPN service that enables you to securely access your AWS resources and resources in your on-premises network. With Client VPN, you can access your resources from any location using an OpenVPN-based VPN client.



**Topics**
+ [Features of Client VPN](#what-is-features)
+ [Components of Client VPN](#what-is-components)
+ [Working with Client VPN](#what-is-access)
+ [Pricing for Client VPN](#what-is-pricing)
+ [Rules and best practices](what-is-best-practices.md)

## Features of Client VPN
<a name="what-is-features"></a>

Client VPN offers the following features and functionality:
+ **Secure connections** — Establishes encrypted TLS connections from any location through the OpenVPN client, ensuring data privacy and integrity.
+ **Managed service** — Eliminates the operational burden of deploying and maintaining third-party remote access VPN solutions through complete AWS management.
+ **High availability and elasticity** — Dynamically scales to accommodate varying numbers of users connecting to your AWS and on-premises resources without manual intervention.
+ **Authentication** — Supports multiple authentication methods including Active Directory integration, federated authentication, and certificate-based authentication for flexible identity management.
+ **Granular control** — Implements precise security controls through network-based access rules configurable at the Active Directory group level and security group-based access control.
+ **Ease of use** — Provides unified access to both AWS and on-premises resources through a single VPN tunnel, simplifying the end-user experience.
+ **Manageability** — Offers comprehensive visibility through detailed connection logs and real-time management capabilities, including the ability to monitor and terminate active client connections when necessary.
+ **Deep integration** — Seamlessly integrates with existing AWS services, including AWS Directory Service and Amazon VPC, enhancing your cloud infrastructure's connectivity capabilities.
+ **Flexible network architecture** — Supports both VPC subnet associations and direct Transit Gateway attachments. For more information, see [Transit Gateway integration with Client VPN](cvpn-tgw.md).
+ **IPv6 support** — Enables full IPv6 connectivity for Client VPN endpoints, supporting connections to IPv6 resources in your VPCs and from clients on IPv6 networks for modern networking requirements.

## Components of Client VPN
<a name="what-is-components"></a>

The following are the key concepts for Client VPN:

**Client VPN endpoint**  
The Client VPN endpoint is the resource that you create and configure to enable and manage client VPN sessions. It's the termination point for all client VPN sessions.

**Target network**  
A target network is the network that you associate with a Client VPN endpoint. You can associate VPC subnets or attach directly to an AWS Transit Gateway. For more information about Transit Gateway integration, see [Transit Gateway integration with Client VPN](cvpn-tgw.md).

**Route**  
Each Client VPN endpoint has a route table that describes the available destination network routes. Each route in the route table specifies the path for traffic to specific resources or networks.

**Authorization rules**  
An authorization rule restricts the users who can access a network. For a specified network, you configure the Active Directory or identity provider (IdP) group that is allowed access. Only users belonging to this group can access the specified network. By default, there are no authorization rules and you must configure authorization rules to enable users to access resources and networks. 

**Client**  
The end user connecting to the Client VPN endpoint to establish a VPN session. End users need to download an OpenVPN client and use the Client VPN configuration file that you created to establish a VPN session.

**Client CIDR range**  
An IP address range from which to assign client IP addresses. Each connection to the Client VPN endpoint is assigned a unique IP address from the client CIDR range. For IPv4 traffic, you choose the client CIDR range, for example, `10.2.0.0/16`. For IPv6 traffic, AWS Client VPN automatically assigns the client CIDR range.

**Client VPN ports**  
AWS Client VPN supports ports 443 and 1194 for both TCP and UDP. The default is port 443.

**Client VPN network interfaces**  
When you associate a subnet with your Client VPN endpoint, we create Client VPN network interfaces in that subnet. Traffic that's sent to the VPC from the Client VPN endpoint is sent through a Client VPN network interface. For IPv4 traffic, source network address translation (SNAT) is applied, where the source IP address from the client CIDR range is translated to the Client VPN network interface IP address. For IPv6 traffic, SNAT is not applied, providing enhanced visibility into the connected user's IP address.

**Connection logging**  
You can enable connection logging for your Client VPN endpoint to log connection events. You can use this information to run forensics, analyze how your Client VPN endpoint is being used, or debug connection issues.

**Self-service portal**  
Client VPN provides a self-service portal as a web page to end users to download the latest version of the AWS VPN Desktop Client and the latest version of the Client VPN endpoint configuration file, which contains the settings required to connect to their endpoint. The Client VPN endpoint administrator can enable or disable the self-service portal for the Client VPN endpoint. Self-service portal is a Global service backed by service stacks in the following Regions: US East (N. Virginia), Asia Pacific (Tokyo), Europe (Ireland), and AWS GovCloud (US-West).

**Endpoint IP address type**  
The IP address type for the Client VPN endpoint, which can be IPv4, IPv6, or dual-stack (both IPv4 and IPv6). 

**Traffic IP address type**  
The IP address type for traffic flowing through the Client VPN endpoint, which can be IPv4, IPv6, or dual-stack (both IPv4 and IPv6). This determines the type of inner traffic (the actual payload or original traffic that is tunneled through the VPN connection), client CIDR ranges, subnet association, routes, and rules per endpoint.

## Working with Client VPN
<a name="what-is-access"></a>

You can work with Client VPN in any of the following ways:

**AWS Management Console**  
The console provides a web-based user interface for Client VPN.   
The console provides a web-based user interface for Client VPN with two setup methods:   
+ Quickstart setup: Streamlined endpoint creation with AWS-recommended defaults
+ Standard setup: Full control over all configuration options
 If you've signed up for an AWS account, you can sign into the [Amazon VPC](https://console.aws.amazon.com/vpc/) console and select Client VPN in the navigation pane.

**AWS Command Line Interface (AWS CLI)**  
The AWS CLI provides direct access to the Client VPN public APIs. It is supported on Windows, macOS, and Linux. For more information about getting started with the AWS CLI, see the [AWS Command Line Interface User Guide](https://docs.aws.amazon.com/cli/latest/userguide/). For more information about the commands for Client VPN, see the [EC2 section](https://docs.aws.amazon.com/cli/latest/reference/ec2/) of the *Amazon EC2 Command Line Reference*.

**AWS Tools for Windows PowerShell**  
AWS provides commands for a broad set of AWS offerings for those who script in the PowerShell environment. For more information about getting started with the AWS Tools for Windows PowerShell, see the [AWS Tools for Windows PowerShell User Guide](https://docs.aws.amazon.com/powershell/latest/userguide/). For more information about the cmdlets for Client VPN, see the [AWS Tools for Windows PowerShell Cmdlet Reference](https://docs.aws.amazon.com/powershell/latest/reference/).

**Query API**  
The Client VPN HTTPS Query API gives you programmatic access to Client VPN and AWS. The HTTPS Query API lets you issue HTTPS requests directly to the service. When you use the HTTPS API, you must include code to digitally sign requests using your credentials. For more information, see the [AWS Client VPN actions](https://docs.aws.amazon.com/AWSEC2/latest/APIReference/OperationList-query-cvpn.html).

## Pricing for Client VPN
<a name="what-is-pricing"></a>

You are charged for each endpoint association and each VPN connection on an hourly basis. There is no additional cost for using IPv6 or dual-stack endpoints; they are charged at the same rate as IPv4 endpoints. For more information, see [AWS Client VPN pricing](https://aws.amazon.com/vpn/pricing/#AWS_Client_VPN_pricing).

You are charged for data transfer out from Amazon EC2 to the internet. For more information, see [Data Transfer](https://aws.amazon.com/ec2/pricing/on-demand/#Data_Transfer) on the Amazon EC2 On-Demand Pricing age.

If you enable connection logging for your Client VPN endpoint, you must create a CloudWatch Logs log group in your account. Charges apply for using log groups. For more information, see [Amazon CloudWatch pricing](https://aws.amazon.com/cloudwatch/pricing/) (under **Paid tier**, choose **Logs**).

If you enable the client connect handler for your Client VPN endpoint, you must create and invoke a Lambda function. Charges apply for invoking Lambda functions. For more information, see [AWS Lambda pricing](https://aws.amazon.com/lambda/pricing/).

Client VPN endpoints are associated with a target network, which is a subnet in a VPC. If this VPC has an Internet Gateway, we associate Elastic IP addresses with the Client VPN elastic network interfaces (ENIs). These Elastic IP addresses are charged as in-use public IPv4 addresses. For more information, see the Public IPv4 Address tab on the [VPC pricing page](https://aws.amazon.com/vpc/pricing/). 

**Note**  
Client VPN endpoints require Elastic IP addresses when associated with a VPC subnet that has an Internet Gateway because these EIPs enable direct internet connectivity for VPN clients. When connecting through a Client VPN endpoint, they need a public IP address to communicate with internet resources. Elastic IPs serve this purpose by providing a consistent, public-facing endpoint. These EIPs are attached to the Client VPN elastic network interfaces (ENIs) and are essential for maintaining stable, secure internet access for VPN clients while ensuring proper routing of traffic. Since these Elastic IP addresses are allocated and actively used for the Client VPN service, AWS charges them as in-use public IPv4 addresses, following their standard pricing model for allocated and associated EIPs.