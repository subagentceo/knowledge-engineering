

# What is Traffic Mirroring?
<a name="what-is-traffic-mirroring"></a>

Traffic Mirroring is an Amazon VPC feature that you can use to copy network traffic from an elastic network interface of type `interface`. You can then send the traffic to out-of-band security and monitoring appliances for:
+ Content inspection
+ Threat monitoring
+ Troubleshooting

The security and monitoring appliances can be deployed as individual instances, or as a fleet of instances behind either a Network Load Balancer or a Gateway Load Balancer with a UDP listener. Traffic Mirroring supports filters and packet truncation, so that you can extract only the traffic of interest, using the monitoring tools of your choice.

## Traffic Mirroring concepts
<a name="concepts"></a>

The following are the key concepts for Traffic Mirroring:
+ **Source** — The network interface to monitor.
+ **Filter** — A set of rules that defines the traffic that is mirrored.
+ **Target** — The destination for mirrored traffic.
+ **Session** — Establishes a relationship between a source, a filter, and a target.

## Work with Traffic Mirroring
<a name="access-traffic-mirroring"></a>

You can create, access, and manage your traffic mirror resources using any of the following:
+ **AWS Management Console**— Provides a web interface that you can use to access your traffic mirror resources.
+ **AWS Command Line Interface (AWS CLI)** — Provides commands for a broad set of AWS services, including Amazon VPC. The AWS CLI is supported on Windows, macOS, and Linux. For more information, see [AWS Command Line Interface](https://aws.amazon.com/cli/).
+ **AWS SDKs** — Provide language-specific APIs. The AWS SDKs take care of many of the connection details, such as calculating signatures, handling request retries, and handling errors. For more information, see [AWS SDKs](https://aws.amazon.com/developer/tools/).
+ **Query API**— Provides low-level API actions that you call using HTTPS requests. Using the Query API is the most direct way to access Amazon VPC. However, it requires that your application handle low-level details such as generating the hash to sign the request and handling errors. For more information, see [Amazon VPC actions](https://docs.aws.amazon.com/AWSEC2/latest/APIReference/OperationList-query-vpc.html) in the *Amazon EC2 API Reference*.

## Traffic Mirroring benefits
<a name="traffic-mirroring-benefits"></a>

Traffic Mirroring offers the following benefits:
+ **Simplified operation** — Mirror any range of your VPC traffic without having to manage packet forwarding agents on your EC2 instances.
+ **Enhanced security** — Capture packets at the elastic network interface, which cannot be disabled or tampered with from a user space.
+ **Increased monitoring options** — Send your mirrored traffic to any security device.

## Regional availability
<a name="regions"></a>

Traffic Mirroring is available in all Regions.

## Supported instance types
<a name="supported-instance-types"></a>

Instance types in the following instance families are supported as Traffic Mirroring source.

### Virtualized instances
<a name="w2aab5c17b5"></a>

Virtualized instance types in the following instance families are supported as Traffic Mirroring source:
+ **General purpose:** A1 \| M4 \| M5 \| M5a \| M5ad \| M5d \| M5dn \| M5n \| M5zn \| M6a \| M6g \| M6gd \| M6i \| M6id \| M6idn \| M6in \| M7a \| M7g \| M7gd \| M7i \| M7i-flex \| Mac1 \| Mac2 \| Mac2-m1ultra \| Mac2-m2 \| Mac2-m2pro \| T3 \| T3a \| T4g
+ **Compute optimized:** C4 \| C5 \| C5a \| C5ad \| C5d \| C5n \| C6a \| C6g \| C6gd \| C6gn \| C6i \| C6id \| C6in \| C7a \| C7g \| C7gd \| C7i \| C7i-flex
+ **Memory optimized:** R4 \| R5 \| R5a \| R5ad \| R5b \| R5d \| R5dn \| R5n \| R6a \| R6g \| R6gd \| R6i \| R6id \| R6idn \| R6in \| R7a \| R7g \| R7gd \| R7i \| R7iz \| U-3tb1 \| U-6tb1 \| U-9tb1 \| U-12tb1 \| U-18tb1 \| U-24tb1 \| U7i-6tb \| U7i-8tb \| U7i-12tb \| U7in-16tb \| U7in-24tb \| U7in-32tb \| U7inh-32tb \| X1 \| X1e \| X2gd \| X2idn \| X2iedn \| X2iezn \| z1d
+ **Storage optimized:** D2 \| D3 \| D3en \| H1 \| I3 \| I3en \| I4g \| I4i \| I7i \| Im4gn \| Is4gen
+ **Accelerated computing:** DL1 \| DL2q \| F2 \| G3 \| G4ad \| G4dn \| G5 \| G5g \| G6 \| G6e \| G6f \| Gr6 \| Gr6f \| Inf1 \| Inf2 \| P3 \| P3dn \| P4d \| P4de \| P5 \| P5e \| Trn1 \| Trn1n \| VT1
+ **High-performance computing:** Hpc6a \| Hpc6id \| Hpc7a

### Bare metal instances
<a name="w2aab5c17b9"></a>

Bare metal instance types in the following instance families are supported as Traffic Mirroring source:
+ **General purpose:** M5 \| M5d \| M6g \| M6gd \| Mac1 \| Mac2 \| Mac2-m1ultra \| Mac2-m2 \| Mac2-m2pro \| A1
+ **Compute optimized:** C5 \| C5d \| C6g \| C6gd
+ **Memory optimized:** R5 \| R5b \| R5d \| R6g \| R6gd \| X2gd \| z1d
+ **Storage optimized:** I3
+ **Accelerated computing:** G5g
+ **Previous generation:** A1

**Note**  
Only Nitro v2 bare-metal instances are supported as Traffic Mirroring source. Bare metal instances of any other Nitro version are not supported as Traffic Mirroring source.

## Pricing
<a name="pricing"></a>

You are charged on an hourly basis for each active traffic mirror session. You'll continue to be charged for Traffic Mirroring until you [delete all active traffic mirror sessions](create-traffic-mirroring-session.md). For example, you'll still be charged in the following scenarios:
+ You detached the network interface from the mirror source
+ You stopped or terminated the mirror source
+ You changed the instance type of the mirror source to an unsupported instance type

 [Data transfer charges apply](https://docs.aws.amazon.com/cur/latest/userguide/cur-data-transfers-charges.html). If your traffic mirroring targets are behind a gateway or network load balancer, data processing for the load balancing services also applies. 

For information about pricing for Traffic Mirroring, see **Network Analysis** on the [Amazon VPC pricing](https://aws.amazon.com/vpc/pricing/) page.