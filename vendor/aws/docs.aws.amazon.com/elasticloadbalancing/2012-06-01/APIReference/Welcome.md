

# Welcome
<a name="Welcome"></a>

A load balancer can distribute incoming traffic across your EC2 instances. This enables you to increase the availability of your application. The load balancer also monitors the health of its registered instances and ensures that it routes traffic only to healthy instances. You configure your load balancer to accept incoming traffic by specifying one or more listeners, which are configured with a protocol and port number for connections from clients to the load balancer and a protocol and port number for connections from the load balancer to the instances.

Elastic Load Balancing supports the following types of load balancers: Application Load Balancers, Network Load Balancers, Gateway Load Balancers, and Classic Load Balancers. This reference covers the 2012-06-01 API, which supports Classic Load Balancers.

For more information, see the [Elastic Load Balancing User Guide](https://docs.aws.amazon.com/elasticloadbalancing/latest/userguide/).

To get started, create a load balancer with one or more listeners using [CreateLoadBalancer](API_CreateLoadBalancer.md). Register your instances with your load balancer using [RegisterInstancesWithLoadBalancer](API_RegisterInstancesWithLoadBalancer.md).

All Elastic Load Balancing operations are idempotent, which means that they complete at most one time. If you repeat an operation, it succeeds.

This document was last published on June 17, 2026. 