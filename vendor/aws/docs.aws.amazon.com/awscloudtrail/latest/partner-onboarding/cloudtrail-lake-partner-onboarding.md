

AWS CloudTrail Lake will no longer be open to new customers starting May 31, 2026. If you would like to use CloudTrail Lake, sign up prior to that date. Existing customers can continue to use the service as normal. For more information, see [CloudTrail Lake availability change](https://docs.aws.amazon.com/awscloudtrail/latest/userguide/cloudtrail-lake-service-availability-change.html).

# Onboarding partner events to AWS CloudTrail Lake
<a name="cloudtrail-lake-partner-onboarding"></a>

AWS CloudTrail Lake logs activities across all AWS accounts and Regions, and across a customer's entire IT infrastructure. Customers can configure CloudTrail Lake to log events from any source, immutably store the events for auditing and compliance, and use standard, SQL-based queries to filter and analyze their event logs. CloudTrail Lake accepts activity logs from AWS Partner Network partner solutions, offering customers a comprehensive view of their activity information in the CloudTrail Lake console, or by using API commands.

This guide is for AWS Partners who want to explore creating an integration with CloudTrail Lake, or want to know how to onboard their applications and solutions to CloudTrail Lake, and let their customers integrate their activity events into CloudTrail Lake.

**Topics**
+ [How integrations with CloudTrail Lake add value](#lake-partner-onboarding-value)
+ [Terminology](#lake-partner-onboarding-terminology)
+ [How partner integration works](#lake-partner-onboarding-how-works)
+ [Onboard to AWS CloudTrail Lake](lake-partner-onboarding-tasks.md)
+ [Understanding the CloudTrail Lake event schema](lake-onboarding-cloudtrail-event-schema.md)
+ [Learn more about CloudTrail Lake](lake-partner-onboarding-learning.md)

## How integrations with CloudTrail Lake add value
<a name="lake-partner-onboarding-value"></a>

As an AWS Partner, an integration with CloudTrail Lake can add value for you in the following ways:
+ **Modern, consolidated solution for audit logging for your customers:** Today, audit and security professionals get trusted records of AWS activity from CloudTrail. CloudTrail users need a similar experience for other application audit information, regardless of the source. Partner integrations centralize audit logging, and extend CloudTrail benefits, such as immutable storage for 7 years and a query interface for analysis, to partner solutions, simplifying audit and compliance processes for our common customers.
+ **Discovery for partners:** CloudTrail promotes partners with integrations in CloudTrail console, including links to partner AWS Marketplace listings.

## Terminology
<a name="lake-partner-onboarding-terminology"></a>

The following terms are helpful in understanding how a CloudTrail Lake integration works.

**Event data store**  
CloudTrail Lake lets you run SQL-based queries on your events. Events are aggregated into event data stores, which are immutable collections of events based on criteria that you select by applying [advanced event selectors](https://docs.aws.amazon.com/awscloudtrail/latest/userguide/cloudtrail-lake-concepts.html#adv-event-selectors). You can keep the event data in an event data store for up to 3,653 days (about 10 years) if you choose the **One-year extendable retention pricing** option, or up to 2,557 days (about 7 years) if you choose the **Seven-year retention pricing** option. The selectors that you apply to an event data store control which events persist and are available for you to query. For non-AWS sources, including partner sources, customers create an event data store to log activity events using the CloudTrail console or API. The event type in the console is **Events from integrations**. In the API, the `eventCategory` value is `ActivityAuditLog`.

**Channel**  
A partner-specific resource that AWS customers create as part of the integration process in CloudTrail Lake. Channels let customers map event sources to destinations. Channels for onboarded partner events have the partner solution set as the source, and event data stores to which customers want to deliver partner events set as destinations. To finish the integration process, customers provide the partner with an Amazon Resource Name (ARN) of the channel. The partner solution uses the channel to send events to CloudTrail Lake.

**Resource policy**  
A permissions policy that is attached to the channel resource and identifies who has access to the channel. 

**Direct integration**  
CloudTrail supports two integration types: direct and solution. With a direct integration, the partner calls the `PutAuditEvents` API to deliver events to the event data store for the customer's AWS account. 

**Solution integration**  
CloudTrail supports two integration types: direct and solution. With a solution integration, the application runs in the customer's AWS account and the application calls the `PutAuditEvents` API to deliver events to the event data store for the customer's AWS account. 

## How partner integration works
<a name="lake-partner-onboarding-how-works"></a>

The following diagram shows how an AWS customer configures event integration with an onboarded partner. The diagram assumes that the person who is responsible for managing the AWS account also manages the partner application. The process is described following the diagram.

![An overview of how the AWS Partner Network onboarding process with CloudTrail Lake works.](http://docs.aws.amazon.com/awscloudtrail/latest/partner-onboarding/images/cloudtrail-lake-partner-onboarding.png)


1. The AWS customer [creates an event data store](https://docs.aws.amazon.com/awscloudtrail/latest/userguide/event-data-store-integration-events.html).

1. The AWS customer starts partner integration in the CloudTrail Lake integration page of the AWS Management Console, and finishes the workflow. The workflow creates a channel for the partner and attaches a resource policy to the channel. A channel ARN is a unique connection between a partner and an AWS customer’s account.

1. The customer provides the partner application with the channel ARN.

1. The customer performs an auditable activity that generates an event in the partner application.

1. The partner sends the audit event to CloudTrail Lake by calling the [`PutAuditEvents` API](https://docs.aws.amazon.com/awscloudtraildata/latest/APIReference/API_PutAuditEvents.html), and using it to pass the `eventData` content from the customer's activity, the channel ARN, and the external ID (if included in the resource policy).

1. CloudTrail Lake checks the resource policy to verify that the partner's permissions are valid. If the partner's permissions are valid, CloudTrail Lake ingests the activity events.