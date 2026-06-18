

# What is recovery readiness in Amazon Application Recovery Controller (ARC)?
<a name="what-is-recovery-readiness"></a>

Welcome to the Recovery Readiness API Reference Guide for Amazon Application Recovery Controller (ARC).

Recovery Readiness API actions support the readiness check feature of ARC. This API Reference Guide provides information about the API actions that you use to model your application with ARC. Next, you add readiness checks so that you can ensure that your application is always properly scaled and configured to handle failover traffic. 

To set up recovery readiness in ARC, you model your application with structures that enable ARC to continually inspect your application resources and routing policies to make sure that your application's redundant failure-containment units, or replicas, are always ready for failover.

The first step is to create a *recovery group* that represents your application. Each recovery group includes *cells* for each individual failure-containment unit or *replica* of your application – for example, for each Regional or zonal version of the application. Then you create *resource sets* for each resource type and associate *readiness checks* with them. Finally, you associate the resources with the cells in your recovery group so that you can check the readiness status of your individual replicas.

With recovery groups and readiness checks, you can monitor the readiness status for each replica of your application—for example, in different AWS Regions—to determine how ready your application is to fail over from one replica to another. You can also monitor readiness details for resources at different levels and in different ways, such as checking the readiness of each type of resource. Or, you can view the readiness status of a resource in a specific cell (Availability Zone or Region). 

By adding readiness checks, you can monitor the readiness status of your application and resources, for example, by using API calls. In addition, creating readiness checks enables ARC to take some corrective actions for you, to help make sure that your application and resources are ready for you to quickly reroute traffic to a failover application replica, if needed. After you create resource sets and set up readiness checks, ARC continually (once every minute) runs readiness checks on your resources. These checks inspect your resources to ensure that your provisioned capacities match, across all resource sets, and where possible, ARC takes corrective action. For more information, see the [Amazon Application Recovery Controller Developer Guide](https://docs.aws.amazon.com/r53recovery/latest/dg/).

After you create readiness checks, you can monitor and manage recovery readiness. You can also set up cross-account authorization in ARC to make it easier to set up and monitor distributed resources from one AWS account.

ARC is a global service that supports endpoints in multiple AWS Regions but you must specify the US West (Oregon) Region when you work with readiness and recovery control configuration resources, for example, to create readiness checks or routing controls.

For more information about ARC, see the following:
+ For more information about creating resilient applications and preparing for recovery readiness with ARC, see the [Amazon Application Recovery Controller Developer Guide](https://docs.aws.amazon.com/r53recovery/latest/dg/).
+ For more information setting up routing control in ARC to route around failures, see the [Recovery Control Configuration API Reference Guide for Amazon Application Recovery Controller](https://docs.aws.amazon.com/recovery-cluster/latest/api/) and the [Routing Control API Reference Guide for Amazon Application Recovery Controller](https://docs.aws.amazon.com/routing-control/latest/APIReference/).