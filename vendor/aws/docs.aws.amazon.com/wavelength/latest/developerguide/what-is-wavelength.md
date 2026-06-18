

# What is AWS Wavelength?
<a name="what-is-wavelength"></a>

*AWS Wavelength* enables developers to build applications that require edge computing infrastructure to deliver low latency to mobile devices and end users or increase the resiliency of their existing edge applications. Wavelength deploys standard AWS compute and storage services to the edge of communications service providers' (CSP) networks. You can extend a virtual private cloud (VPC) to one or more Wavelength Zones. You can then use AWS resources such as Amazon Elastic Compute Cloud (Amazon EC2) instances to run the applications that require low latency or edge resiliency within the Wavelength Zone, while seamlessly communicating back to your existing AWS services deployed in the parent [AWS Region](https://docs.aws.amazon.com/global-infrastructure/latest/regions/aws-regions-availability-zones.html).

For more information, see [AWS Wavelength](https://aws.amazon.com/wavelength/).

## Wavelength concepts
<a name="concepts"></a>

The following are the key concepts:
+ **Wavelength** — A new type of AWS infrastructure designed to run workloads that require low latency or edge resiliency.
+ **Wavelength Zone** — A zone in the carrier location where the Wavelength infrastructure is deployed. Wavelength Zones are associated with an AWS Region. A Wavelength Zone is a logical extension of the Region, and is managed by the control plane in the Region. 
+ **VPC** — A customer virtual private cloud (VPC) that spans Availability Zones, Local Zones, and Wavelength Zones, and has deployed resources such as Amazon EC2 instances in the subnets that are associated with the zones.
+ **Wavelength subnet** — A subnet that you create in a Wavelength Zone. You can create one or more subnets, and then run and manage AWS services, such as Amazon EC2 instances, in the subnet.
+ **Carrier gateway** — A carrier gateway serves two purposes. It allows inbound traffic from a carrier network in a specific location, and allows outbound traffic to the carrier network and internet.
+ **Network Border Group** — A unique set of Availability Zones, Local Zones, or Wavelength Zones from which AWS advertises IP addresses.
+ **Wavelength application** — An application that you run on an AWS resource in a Wavelength Zone.

## AWS resources on Wavelength
<a name="services"></a>

You can create Amazon EC2 instances, Amazon EBS volumes, and Amazon VPC subnets and carrier gateways in Wavelength Zones. You can also use the following:
+ Amazon EC2 Auto Scaling
+ Amazon EKS clusters
+ Amazon ECS clusters
+ Amazon EC2 Systems Manager
+ Amazon CloudWatch
+ AWS CloudTrail
+ CloudFormation
+ Application Load Balancer in select Wavelength Zones. For a list of these Zones, see [Load balancing](https://docs.aws.amazon.com/wavelength/latest/developerguide/architecture.html#architecture-load-balancing).

The services in Wavelength are part of a VPC that is connected over a reliable connection to an AWS Region for easy access to services running in Regional subnets.

## Working with Wavelength
<a name="wavelength-interfaces"></a>

You can create, access, and manage your EC2 resources, Wavelength Zones, and carrier gateways using any of the following interfaces:
+ **AWS Management Console**— Provides a web interface that you can use to access your Wavelength resources.
+ **AWS Command Line Interface (AWS CLI)** — Provides commands for a broad set of AWS services, including Amazon VPC, and is supported on Windows, macOS, and Linux. The services you use in Wavelength continue to use their own namespace, for example Amazon EC2 uses the "ec2" namespace, and Amazon EBS uses the "ebs" namespace. For more information, see [AWS Command Line Interface](https://aws.amazon.com/cli/).
+ **AWS SDKs** — Provides language-specific APIs and takes care of many of the connection details, such as calculating signatures, handling request retries, and handling errors. For more information, see [AWS SDKs](http://aws.amazon.com/tools/#SDKs).

When you use any of the interfaces for your Wavelength Zones, use the parent Region.

## Pricing
<a name="pricing"></a>

For more information, see [AWS Wavelength Pricing](https://aws.amazon.com/wavelength/pricing/).