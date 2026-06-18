

# What is ARC?
<a name="what-is-route53-recovery"></a>

Amazon Application Recovery Controller (ARC) helps you prepare for and complete faster recovery for applications running on the AWS Global Cloud Infrastructure.

ARC provides the following capabilities:
+ *Multi-Availability Zone (AZ) recovery*, including zonal shift and zonal autoshift, which enable you to recover from single AZ impairments by temporarily shifting traffic from an impaired AZ to a healthy AZ.
+ *Multi-Region recovery*, which includes routing control and Region switch for Regional application recovery, and readiness check for application monitoring.

## Multi-Availability Zone recovery
<a name="what-is-route53-recovery.az"></a>

*Zonal shift*

You can use ARC zonal shift to quickly isolate and recover from single Availability Zone (AZ) impairments. Zonal shift temporarily shifts traffic for a supported resource away from an impaired AZ to healthy AZs in the same AWS Region. Starting a zonal shift helps your application recover quickly, for example, from a developer's bad code deployment or from an AWS impairment in a single AZ. Shifting traffic away from the impaired AZ reduces the impact for clients who are using your application in the impaired AZ.

You can start a zonal shift for any supported resource in your account in an AWS Region. Zonal shifts are manual and temporary. When you start a zonal shift, you must specify an (extendable) expiration of up to three days. To enable zonal shift for supported resources, refer to [Supported resources](arc-zonal-shift.resource-types.md).

*Zonal autoshift*

ARC zonal autoshift authorizes AWS to shift traffic away from an impaired AZ for supported resources, on your behalf, to healthy AZs in the same AWS Region. AWS starts a zonal autoshift when internal telemetry indicates that there is an impairment in one AZ in an AWS Region that could potentially impact customers. The internal telemetry incorporates metrics from multiple sources, including the AWS network, and the Amazon EC2 and Elastic Load Balancing services.

Zonal autoshifts are temporary. AWS ends a zonal autoshift when the internal telemetry indicators show that there is no longer an issue or potential issue.

To learn more about these capabilities, see the following chapters:
+ [Zonal shift in ARC](arc-zonal-shift.md)
+ [Zonal autoshift in ARC](arc-zonal-autoshift.md)

## Multi-Region recovery
<a name="what-is-route53-recovery.region"></a>

*Region switch*

Region switch in ARC provides a centralized, automated, and observable solution for multi-Region application recovery. Region switch helps you to plan and coordinate recovery for your applications across AWS Regions, to help ensure business continuity and reduce operational overhead. 

You can use Region switch to orchestrate large-scale, complex recovery tasks for your application resources, across multiple AWS account. If an AWS Region becomes impaired, the plans that you create by using Region switch can fail over or switch your resources to another Region, so that your application can continue to operate, in a healthy AWS Region.

*Routing control*

ARC's extremely reliable routing controls enable multi-Region recovery so that your applications can failover Domain Name System DNS traffic across AWS Regions.

If your application is designed to operate out of multiple AWS Regions, you can use ARC *routing control* to failover between Regions. Routing control enables you to failover traffic from an impaired AWS Region to a healthy AWS Region, so that you can ensure that your application maintains availability. Routing control includes safety rules, which help protect you from unintended outcomes by imposing guardrails that you define. For example, you can impose a safety rule that only one of your application replicas, active or standby, is enabled and in use. 

*Readiness check *

ARC readiness check continually monitors AWS resource quotas, capacity, and network routing policies, and can notify you about changes that may affect your ability to failover to a replica application and recover from Region impairment. Continual readiness checks ensure that you can maintain your multi-Region applications in a state that is scaled and configured to handle failover traffic. Readiness check is useful when you first configure ARC, and during normal application operation. Readiness check is not intended to be used in the critical path for failover during an event.

To learn more about these capabilities, see the following chapters:
+ [Region switch in ARC](region-switch.md)
+ [Routing control in ARC](routing-control.md)
+ [Readiness check in ARC](recovery-readiness.md)