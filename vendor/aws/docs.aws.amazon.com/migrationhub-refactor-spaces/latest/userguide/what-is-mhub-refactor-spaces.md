

AWS Migration Hub Refactor Spaces is no longer open to new customers as of November 7, 2025. For capabilities similar to AWS Migration Hub Refactor Spaces, explore [AWS Transform](https://aws.amazon.com/transform).

# What is AWS Migration Hub Refactor Spaces?
<a name="what-is-mhub-refactor-spaces"></a>

AWS Migration Hub Refactor Spaces is the starting point for incremental application refactoring to microservices in AWS. Refactor Spaces helps reduce the undifferentiated heavy lifting of building and operating AWS infrastructure for incremental refactoring. You can use Refactor Spaces to help reduce risk when you develop applications into microservices or extend existing applications with new features written in microservices. 

A Refactor Spaces environment provides the infrastructure, multi-account networking, and routing that you need to modernize incrementally. With Refactor Spaces environments, you can transparently add new services to an external HTTPS endpoint and incrementally route traffic to the new services. Refactor Spaces bridges networking across AWS accounts so that legacy and new services can communicate while they maintain the independence of separate accounts.

Refactor Spaces creates these resources in your account. This gives you the flexibility to apply your own configurations, like API Gateway custom domains, after Refactor Spaces creates them.

Refactor Spaces provides an application that models the Strangler Fig pattern for incremental refactoring. A Refactor Spaces application orchestrates Amazon API Gateway, Network Load Balancer, and resource-based AWS Identity and Access Management (IAM) policies so that you can transparently add new services to an external HTTP endpoint. For more information about the Strangler Fig pattern, see [Strangler Fig Application](https://martinfowler.com/bliki/StranglerFigApplication.html). 

You can also incrementally route traffic to the new services. Refactor Spaces periodically resolves Domain Name System (DNS) names for these services. This keeps underlying architecture changes hidden from your application consumers. 

**Topics**
+ [Are you a first-time Refactor Spaces user?](#first-time-user)
+ [Pricing](#pricing)
+ [Refactor Spaces concepts](welcome-concepts.md)
+ [How Refactor Spaces works](how-it-works.md)

## Are you a first-time Refactor Spaces user?
<a name="first-time-user"></a>

If you are a first-time user of Refactor Spaces, we recommend that you begin by reading the following sections:
+ [Refactor Spaces concepts](welcome-concepts.md)
+ [How Refactor Spaces works](how-it-works.md)
+ [Setting up](setting-up.md)
+ [Getting started with Refactor Spaces](getting-started.md)

## Pricing
<a name="pricing"></a>

All Refactor Spaces orchestrated resources (for example, Transit Gateway) are provisioned in your AWS account. Therefore, you pay for usage of Refactor Spaces plus any costs associated with provisioned resources. You are charged for Refactor Spaces usage based on the number of hours that you run your refactor environments and API requests to Refactor Spaces. For more information, see [AWS Migration Hub pricing](https://aws.amazon.com/migration-hub/pricing/).