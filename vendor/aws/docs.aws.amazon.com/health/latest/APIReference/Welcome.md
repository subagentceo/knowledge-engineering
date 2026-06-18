

# Welcome
<a name="Welcome"></a>

The AWS Health API provides access to the AWS Health information that appears in the [AWS Health Dashboard](https://health.aws.amazon.com/health/home). You can use the API operations to get information about events that might affect your AWS services and resources.

You must have an AWS Business Support\+, AWS Enterprise Support, or AWS Unified Operations plan from [AWS Support](http://aws.amazon.com/premiumsupport/) to use the AWS Health API. If you're in an AWS Region that doesn't offer one of these AWS Support plans, or if you haven't transitioned to one of these plans, you can use the AWS Health API with a Business, Enterprise On-Ramp, or Enterprise Support plan. If you call the AWS Health API from an AWS account that isn't enrolled in one of these plans, then you receive a `SubscriptionRequiredException` error.

For API access, you need an access key ID and a secret access key. Use temporary credentials instead of long-term access keys when possible. Temporary credentials include an access key ID, a secret access key, and a security token that indicates when the credentials expire. For more information, see [Best practices for managing AWS access keys](https://docs.aws.amazon.com/general/latest/gr/aws-access-keys-best-practices.html) in the * AWS General Reference*.

You can use the AWS Health endpoint health.us-east-1.amazonaws.com (HTTPS) to call the AWS Health API operations. AWS Health supports a multi-Region application architecture and has two regional endpoints in an active-passive configuration. You can use the high availability endpoint example to determine which AWS Region is active, so that you can get the latest information from the API. For more information, see [Accessing the AWS Health API](https://docs.aws.amazon.com/health/latest/ug/health-api.html) in the * AWS Health User Guide*.

**Note**  
You can get started with the AWS Health API by using [AWS Health Aware](http://aws.amazon.com/blogs/mt/aws-health-aware-customize-aws-health-alerts-for-organizational-and-personal-aws-accounts/) - a low-cost application that you can use to send health events to Slack, JIRA, ServiceNow and more.

For authentication of requests, AWS Health uses the [Signature Version 4 Signing Process](https://docs.aws.amazon.com/general/latest/gr/signature-version-4.html).

If your AWS account is part of AWS Organizations, you can use the AWS Health organizational view feature. This feature provides a centralized view of AWS Health events across all accounts in your organization. You can aggregate AWS Health events in real time to identify accounts in your organization that are affected by an operational event or get notified of security vulnerabilities. Use the organizational view API operations to enable this feature and return event information. For more information, see [Aggregating AWS Health events](https://docs.aws.amazon.com/health/latest/ug/aggregate-events.html) in the * AWS Health User Guide*.

**Note**  
When you use the AWS Health API operations to return AWS Health events, see the following recommendations:  
Use the [eventScopeCode](https://docs.aws.amazon.com/health/latest/APIReference/API_Event.html#AWSHealth-Type-Event-eventScopeCode) parameter to specify whether to return AWS Health events that are public or account-specific.
Use pagination to view all events from the response. For example, if you call the `DescribeEventsForOrganization` operation to get all events in your organization, you might receive several page results. Specify the `nextToken` in the next request to return more results.

This document was last published on June 17, 2026. 