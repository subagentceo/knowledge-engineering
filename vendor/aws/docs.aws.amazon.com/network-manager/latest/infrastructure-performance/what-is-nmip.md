

# What is Infrastructure Performance for AWS Network Manager?
<a name="what-is-nmip"></a>

Infrastructure Performance allows you to obtain near real-time and historical network latency across AWS Regions and across or within Availability Zones for a specified time period. However, network performance data is not available prior to Oct 26 2022 00:00:00 GMT\+000. Performance metrics are aggregated according to a time period that you choose. Network performance results are returned for that time period, showing whether the performance was healthy or if there was any performance degradation. This can help you to more easily evaluate whether network performance might affect your applications. Infrastructure Performance also supports publishing metrics as subscriptions to Amazon CloudWatch, allowing you to view performance metrics in CloudWatch. There is no cost associated with using Infrastructure Performance. However, you might incur charges when using subscriptions to view performance in CloudWatch. For more information about CloudWatch pricing guidelines, see [Amazon CloudWatch pricing](https://aws.amazon.com/cloudwatch/pricing/).

**Note**  
Infrastructure Performance is designed to give you an overview showing whether network performance is normal or degraded. It does not provide details about the specific causes of degradation, such as a hardware failure.

Infrastructure Performance works in the following geographical areas:
+ **Availability zones** — Generate network performance metrics between two Availability Zones or within a single Availability Zone.
+ **Regions** — Generate network performance metrics to see performance between two Regions. 

  You can use the Region metrics to evaluate a Region expansion strategy. Infrastructure Performance can help you gather information needed to understand network performance between Regions where you currently have a presence, and Regions that you're exploring expanding into. For example, you might have a presence in `us-west-2` and are looking to expand into `eu-central-`1. Use Infrastructure Performance to check the latency between these two Regions to help you make a more informed choice for Region expansion. For a list of the Regions that support Infrastructure Performance, see [Region availability](how-nmip-works.md#nmip-regions).

**Note**  
Infrastructure Performance does not incorporate performance metrics for paths through VPC networking resources, such as transit gateways, NAT gateways, VPC endpoints, Elastic Load Balancing, or Amazon EC2 network interfaces.