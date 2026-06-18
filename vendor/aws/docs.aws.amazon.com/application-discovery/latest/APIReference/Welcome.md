

# Welcome
<a name="Welcome"></a>

 AWS Application Discovery Service (Application Discovery Service) helps you plan application migration projects. It automatically identifies servers, virtual machines (VMs), and network dependencies in your on-premises data centers. For more information, see the [AWS Application Discovery Service FAQ](http://aws.amazon.com/application-discovery/faqs/). 

Application Discovery Service offers three ways of performing discovery and collecting data about your on-premises servers:
+  **Agentless discovery** using AWS Application Discovery Service Agentless Collector (Agentless Collector), which doesn't require you to install an agent on each host.
  + Agentless Collector gathers server information regardless of the operating systems, which minimizes the time required for initial on-premises infrastructure assessment.
  + Agentless Collector doesn't collect information about network dependencies, only agent-based discovery collects that information. 
+  **Agent-based discovery** using the AWS Application Discovery Agent (Application Discovery Agent) collects a richer set of data than agentless discovery, which you install on one or more hosts in your data center.
  +  The agent captures infrastructure and application information, including an inventory of running processes, system performance information, resource utilization, and network dependencies.
  + The information collected by agents is secured at rest and in transit to the Application Discovery Service database in the AWS cloud. For more information, see [AWS Application Discovery Agent](https://docs.aws.amazon.com/application-discovery/latest/userguide/discovery-agent.html).
+  ** AWS Partner Network (APN) solutions** integrate with Application Discovery Service, enabling you to import details of your on-premises environment directly into AWS Migration Hub (Migration Hub) without using Agentless Collector or Application Discovery Agent.
  + Third-party application discovery tools can query AWS Application Discovery Service, and they can write to the Application Discovery Service database using the public API.
  + In this way, you can import data into Migration Hub and view it, so that you can associate applications with servers and track migrations.

 **Working With This Guide** 

This API reference provides descriptions, syntax, and usage examples for each of the actions and data types for Application Discovery Service. The topic for each action shows the API request parameters and the response. Alternatively, you can use one of the AWS SDKs to access an API that is tailored to the programming language or platform that you're using. For more information, see [AWS SDKs](http://aws.amazon.com/tools/#SDKs).

**Note**  
Remember that you must set your Migration Hub home Region before you call any of these APIs.
You must make API calls for write actions (create, notify, associate, disassociate, import, or put) while in your home Region, or a `HomeRegionNotSetException` error is returned.
API calls for read actions (list, describe, stop, and delete) are permitted outside of your home Region.
Although it is unlikely, the Migration Hub home Region could change. If you call APIs outside the home Region, an `InvalidInputException` is returned.
You must call `GetHomeRegion` to obtain the latest Migration Hub home Region.

This guide is intended for use with the [AWS Application Discovery Service User Guide](https://docs.aws.amazon.com/application-discovery/latest/userguide/).

**Important**  
All data is handled according to the [AWS Privacy Policy](https://aws.amazon.com/privacy/). You can operate Application Discovery Service offline to inspect collected data before it is shared with the service.

This document was last published on June 17, 2026. 