

# Amazon EC2 instance types
<a name="instance-types"></a>

**End of sale notice**  
The **U-9tb1**, **U-12tb1**, **U-18tb1**, and **U-24tb1** instance types are no longer available for new instance launches. If your workload requires a high-memory instance, we recommend that you use a U7i instance type instead.

When you launch an EC2 instance, the *instance type* that you specify determines the hardware of the host computer used for your instance. Each instance type offers different compute, memory, and storage capabilities, and is grouped in an instance family based on these capabilities. Select an instance type based on the requirements of the application or software that you plan to run on your instance.

Amazon EC2 dedicates some resources of the host computer, such as CPU, memory, and instance storage, to a particular instance. Amazon EC2 shares other resources of the host computer, such as the network and the disk subsystem, among instances. If each instance on a host computer tries to use as much of one of these shared resources as possible, each receives an equal share of that resource. However, when a resource is underused, an instance can consume a higher share of that resource while it's available.

Each instance type provides higher or lower minimum performance from a shared resource. For example, instance types with high I/O performance have a larger allocation of shared resources. Allocating a larger share of shared resources also reduces the variance of I/O performance. For most applications, moderate I/O performance is more than enough. However, for applications that require greater or more consistent I/O performance, consider an instance type with higher I/O performance.

For pricing information, see [Amazon EC2 Pricing](https://aws.amazon.com/ec2/pricing/).

**Topics**
+ [Current generation instances](#current-gen-instances)
+ [Previous generation instances](#previous-gen-instances)
+ [Instance performance](#instance-performance)

## Current generation instances
<a name="current-gen-instances"></a>

For the best performance, we recommend that you use the following instance types when you launch new instances. For more information, see [Amazon EC2 Instance Types](https://aws.amazon.com/ec2/instance-types/).
+ [**General purpose: **](gp.md)M5 \| M5a \| M5ad \| M5d \| M5dn \| M5n \| M5zn \| M6a \| M6g \| M6gd \| M6i \| M6id \| M6idn \| M6in \| M7a \| M7g \| M7gd \| M7i \| M7i-flex \| M8a \| M8azn \| M8g \| M8gb \| M8gd \| M8gn \| M8i \| M8id \| M8i-flex \| M8in \| M8idn \| M8ine \| M8ib \| M8idb \| M9g \| M9gd \| Mac1 \| Mac2 \| Mac2-m1ultra \| Mac2-m2 \| Mac2-m2pro \| Mac-m4 \| Mac-m4pro \| Mac-m4max \| T2 \| T3 \| T3a \| T4g
+ [**Compute optimized: **](co.md)C5 \| C5a \| C5ad \| C5d \| C5n \| C6a \| C6g \| C6gd \| C6gn \| C6i \| C6id \| C6in \| C7a \| C7g \| C7gd \| C7gn \| C7i \| C7i-flex \| C8a \| C8g \| C8gb \| C8gd \| C8gn \| C8i \| C8id \| C8i-flex \| C8in \| C8ine \| C8ib
+ [**Memory optimized: **](mo.md)R5 \| R5a \| R5ad \| R5b \| R5d \| R5dn \| R5n \| R6a \| R6g \| R6gd \| R6i \| R6id \| R6idn \| R6in \| R7a \| R7g \| R7gd \| R7i \| R7iz \| R8a \| R8g \| R8gb \| R8gd \| R8gn \| R8i \| R8id \| R8i-flex \| R8in \| R8idn \| R8ib \| R8idb \| U-3tb1 \| U-6tb1 \| U-9tb1 \| U-12tb1 \| U-18tb1 \| U-24tb1 \| U7i-6tb \| U7i-8tb \| U7i-12tb \| U7in-16tb \| U7in-24tb \| U7in-32tb \| U7inh-32tb \| X1 \| X1e \| X2gd \| X2idn \| X2iedn \| X2iezn \| X8g \| X8aedz \| X8i \| z1d
+ [**Storage optimized: **](so.md)D2 \| D3 \| D3en \| H1 \| I3 \| I3en \| I4g \| I4i \| I7i \| I7ie \| I8g \| I8ge \| Im4gn \| Is4gen
+ [**Accelerated computing: **](ac.md)DL1 \| DL2q \| F2 \| G4ad \| G4dn \| G5 \| G5g \| G6 \| G6e \| G6f \| Gr6 \| Gr6f \| G7e \| Inf1 \| Inf2 \| P4d \| P4de \| P5 \| P5e \| P5en \| P6-B200 \| P6-B300 \| P6e-GB200 \| Trn1 \| Trn1n \| Trn2 \| Trn2u \| VT1
+ [**High-performance computing: **](hpc.md)Hpc6a \| Hpc6id \| Hpc7a \| Hpc7g \| Hpc8a

## Previous generation instances
<a name="previous-gen-instances"></a>

Amazon Web Services offers previous generation instance types for users who have optimized their applications around them and have yet to upgrade. We encourage you to use current generation instance types to get the best performance, but we continue to support the following previous generation instance types. For more information about which current generation instance type would be a suitable upgrade, see [ Previous Generation Instances](https://aws.amazon.com/ec2/previous-generation/).
+ **General purpose**: A1 \| M1 \| M2 \| M3 \| M4 \| T1
+ **Compute optimized**: C1 \| C3 \| C4
+ **Memory optimized**: R3 \| R4
+ **Storage optimized**: I2
+ **Accelerated computing**: G3 \| P3 \| P3dn

## Instance performance
<a name="instance-performance"></a>

**Fixed performance instances**  
Fixed performance instances provide fixed CPU resources. These instances can deliver and sustain full CPU performance at any time, and for as long as a workload needs it. If you need consistently high CPU performance for applications such as video encoding, high volume websites, or HPC applications, we recommend that you use fixed performance instances.

**Burstable performance instances**  
Burstable performance (`T`) instances provide a baseline level of CPU performance with the ability to burst above the baseline. The baseline CPU is designed to meet the needs of the majority of general purpose workloads, such as large-scale micro-services, web servers, small and medium databases, data logging, code repositories, virtual desktops, and development and test environments.

The baseline utilization and ability to burst are governed by CPU credits. Each burstable performance instance continuously earns credits when it stays below the CPU baseline, and continuously spends credits when it bursts above the baseline. For more information, see [Burstable performance instances](https://docs.aws.amazon.com/AWSEC2/latest/UserGuide/burstable-performance-instances.html) in the *Amazon EC2 User Guide*.

**Flex instances**  
C7i-flex, C8i-flex, M7i-flex, M8i-flex, R8i-flex instances offer a balance of compute, memory, and network resources, and they provide the most cost-effective way to run a broad spectrum of general purpose applications. These instances provide reliable CPU resources to deliver a baseline CPU performance of 40 percent, which is designed to meet the compute requirements for a majority of general purpose workloads. When more performance is needed, these instances provide the ability to exceed the baseline CPU performance and deliver up to 100 percent CPU performance for 95 percent of the time over a 24-hour window.

Flex instances running at a high CPU utilization that is consistently above the baseline for long periods of time might see a gradual reduction in the maximum burst CPU throughput. For more information, see the following:
+ [C7i-flex instances](https://aws.amazon.com/ec2/instance-types/c7i/)
+ [C8i-flex instances](https://aws.amazon.com/ec2/instance-types/c8i/)
+ [M7i-flex instances](https://aws.amazon.com/ec2/instance-types/m7i/)
+ [M8i-flex instances](https://aws.amazon.com/ec2/instance-types/m8i/)
+ [R8i-flex instances](https://aws.amazon.com/ec2/instance-types/r8i/)