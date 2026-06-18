

# Welcome
<a name="Welcome"></a>

A load balancer distributes incoming traffic across targets, such as your EC2 instances. This enables you to increase the availability of your application. The load balancer also monitors the health of its registered targets and ensures that it routes traffic only to healthy targets. You configure your load balancer to accept incoming traffic by specifying one or more listeners, which are configured with a protocol and port number for connections from clients to the load balancer. You configure a target group with a protocol and port number for connections from the load balancer to the targets, and with health check settings to be used when checking the health status of the targets.

Elastic Load Balancing supports the following types of load balancers: Application Load Balancers, Network Load Balancers, Gateway Load Balancers, and Classic Load Balancers. This reference covers the following load balancer types:
+ Application Load Balancer - Operates at the application layer (layer 7) and supports HTTP and HTTPS.
+ Network Load Balancer - Operates at the transport layer (layer 4) and supports TCP, TLS, UDP, and QUIC.
+ Gateway Load Balancer - Operates at the network layer (layer 3).

For more information, see the [Elastic Load Balancing User Guide](https://docs.aws.amazon.com/elasticloadbalancing/latest/userguide/).

To get started, complete the following tasks:

1. Create a load balancer using [CreateLoadBalancer](API_CreateLoadBalancer.md).

1. Create target groups using [CreateTargetGroup](API_CreateTargetGroup.md).

1. Register targets with the target groups using [RegisterTargets](API_RegisterTargets.md).

1. Create listeners for your load balancer using [CreateListener](API_CreateListener.md).

To delete a load balancer and its related resources, complete the following tasks:

1. Delete the load balancer using [DeleteLoadBalancer](API_DeleteLoadBalancer.md).

1. Delete the target group using [DeleteTargetGroup](API_DeleteTargetGroup.md).

All Elastic Load Balancing operations are idempotent, which means that they complete at most one time. If you repeat an operation, it succeeds.

This document was last published on June 17, 2026. 