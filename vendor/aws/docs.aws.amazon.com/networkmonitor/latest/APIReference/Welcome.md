

# Welcome
<a name="Welcome"></a>

Network Synthetic Monitor is feature of Network Monitoring in Amazon CloudWatch that provides visibility into the performance of network flows for your workloads, between instances in VPC subnets, as well as to and from AWS. Network Synthetic Monitor can also identify if a network issue for your workload is caused by the AWS network or is within your own company network. To configure Network Synthetic Monitor, you choose source VPCs and subnets from the AWS network that you operate within, and then, destination IP addresses from your on-premises network. Using these sources and destinations, Network Synthetic Monitor creates a monitor with all the source and destination combinations, each of which is called a probe. These probes monitor your network traffic, to help you identify where network issues might be affecting your traffic, and if the cause is an AWS network impairment.

You can create a monitor in any subnet that belongs to a VPC owned by your account. Network Synthetic Monitor doesn’t support creating resources across accounts. 

For more information, see [ Using Network Synthetic Monitor](https://docs.aws.amazon.com/AmazonCloudWatch/latest/monitoring/what-is-network-monitor.html) in the *Amazon CloudWatch User Guide*.

This document was last published on June 17, 2026. 