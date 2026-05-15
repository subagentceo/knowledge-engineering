# Using WorkOS with On-prem Customers

## Introduction

WorkOS can be used with both cloud and on-prem deployments. This guide explains the considerations needed to use WorkOS features with on-prem deployment strategies. For example, many SaaS companies offer enterprise solutions where their infrastructure can be deployed to a customer's cloud or data center.

When using an on-prem deployment strategy, two key considerations are:

- Deploying a static API key to each customer's installation to isolate access to their team only
- Ensuring your customer's network can send and receive requests from the WorkOS API

Outside of these considerations, WorkOS integration for on-prem customers functions in the same way as in cloud deployments.

![diagram showing on-prem configuration using WorkOS](https://images.workoscdn.com/images/17460e43-790f-4791-93ee-f0b001ef5eae.png?auto=format\&fit=clip\&q=50)

## Using a static API key for each customer's deployment

Since a full deployment of your software is being deployed to your customer's environment, each deployment requires its own unique WorkOS API key. This can be accomplished by creating a separate environment in your WorkOS dashboard for each on-prem customer.

Each WorkOS workspace comes with Staging and Production environments by default. To create a new environment for an on-prem customer:

- Reach out to the WorkOS support team at [support@workos.com](mailto:support@workos.com)
- Provide the name you'd like to use for the new environment and specify that it should be a production environment

![diagram showing different environments in the WorkOS dashboard](https://images.workoscdn.com/images/2e280efe-011f-4583-9c67-1fedd60f0071.png?auto=format\&fit=clip\&q=50)

The support team will create the environment, which will then be available in the environments dropdown menu in your WorkOS workspace.

To retrieve the client ID and API key for this environment, navigate to the [API Keys section](https://dashboard.workos.com/api-keys) of the WorkOS dashboard where the values are available to download.

## Allowing WorkOS Traffic Through Firewalls

A common challenge with on-premise deployments is coordinating which traffic will be allowed by the firewall. Several strategies exist for allowing traffic to and from WorkOS to communicate with an on-prem deployment.

### Strategy 1: Configure Firewall Rules or ACLs

The most common approach is to deploy your application with the WorkOS integration to your customer's on-prem environment configured the same as you would for cloud application users, then have the firewall rules or access control lists (ACLs) set to allow WorkOS API traffic.

WorkOS uses Cloudflare to ensure security and reliability. If you need to allowlist IP addresses for redirect requests, you can use the IP ranges listed in the [Cloudflare documentation](https://www.cloudflare.com/ips/).

![diagram showing different environments in the WorkOS dashboard](https://images.workoscdn.com/images/23e605b6-2b82-41be-a93b-664d07b07d0a.png?auto=format\&fit=clip\&q=50)

#### Firewall Ingress Rules (Incoming Traffic)

Ingress rules control external traffic entering your network. Some features of WorkOS require requests originating from our APIs directly to the on-prem installation, such as authentication callbacks, action callbacks, and webhooks.

Events can also be ingested with the Events API, which is the preferred method for event delivery in an on-prem deployment scenario since those requests will originate from your on-prem application infrastructure.

- All requests use HTTPS on port 443

- All authentication requests originate from [Cloudflare's published IP ranges](https://www.cloudflare.com/ips/)

- All outbound requests for [Actions Webhooks](https://workos.com/docs/authkit/actions) and [event and log streaming](https://workos.com/docs/events/observability/datadog) will originate from the following IP ranges:
  - 3.217.146.166
  - 23.21.184.92
  - 34.204.154.149
  - 44.213.245.178
  - 44.215.236.82
  - 50.16.203.9
  - 52.1.251.34
  - 52.21.49.187
  - 174.129.36.47

- Requests will require an external domain name that resolves to the installation's host

#### Firewall Egress Rules (Outgoing Traffic)

Egress rules manage traffic leaving your network to external services.

Key aspects include:

- All requests leave the on-prem network over HTTPS on port 443
- All traffic is handled on Cloudflare's published IP ranges

##### Best Practices

- Apply the principle of least privilege
- Log and monitor cross-boundary traffic
- Regularly audit firewall rules

Implement a workflow of starting with restrictive default deny rules, then carefully opening only necessary ports and protocols to ensure that your integration with WorkOS is secure.

### Strategy 2: Use ngrok for Network Traffic Management

Another approach is to use a service like [ngrok](https://ngrok.com/) to manage traffic to and from the WorkOS API instead of modifying firewall rules. This approach allows you to implement WorkOS authentication without adjusting firewall configurations.

With ngrok, you can:

- Create secure tunnels from the public internet to your on-premise deployment
- Receive webhook events from WorkOS directly to your local development environment
- Implement WorkOS AuthKit, SSO and Directory Sync features in environments with restrictive network policies

Implementation involves installing the ngrok client on your application server, establishing a tunnel to your application's local port, and configuring your WorkOS integration to use the ngrok-provided public URL.

![diagram showing a WorkOS on-prem configuration using ngrok ](https://images.workoscdn.com/images/42766c0c-741c-460f-818f-6bb4875634ca.png?auto=format\&fit=clip\&q=50)

This approach requires configuration of third-party software and additional cost. ngrok offers different pricing tiers based on your needs, with paid plans providing features like persistent URLs, IP restrictions, and additional security controls essential for production environments.

## Air-Gapped Environments

For customers operating in air-gapped environments with no external network connectivity, cloud-based authentication services like WorkOS cannot be utilized as they require API connectivity.

However, many organizations with air-gapped environments have established security protocols that permit the deployment of approved third-party software within their isolated networks, as their security architecture already provides robust authentication mechanisms internally.

In these scenarios, we recommend a dual-implementation approach:

- Continue leveraging WorkOS for authentication in cloud-based and network-connected on-premises deployments
- Develop a specialized deployment package for air-gapped environments that:
  - Integrates with the customer's existing internal authentication infrastructure
  - Maintains feature parity while operating independently of external services
  - Adheres to the security policies specific to air-gapped environments

This approach allows you to maintain a consistent product experience across different deployment scenarios while accommodating the strict security requirements of air-gapped customers.
