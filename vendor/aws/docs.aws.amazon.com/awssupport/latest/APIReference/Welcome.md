

# Welcome
<a name="Welcome"></a>

The * AWS Support API Reference* is intended for programmers who need detailed information about the Support operations and data types. You can use the API to manage your support cases programmatically. The AWS Support API uses HTTP methods that return results in JSON format.

**Note**  
You must have a Business, Enterprise On-Ramp, or Enterprise Support plan to use the AWS Support API. 
If you call the AWS Support API from an account that doesn't have a Business, Enterprise On-Ramp, or Enterprise Support plan, the `SubscriptionRequiredException` error message appears. For information about changing your support plan, see [AWS Support](http://aws.amazon.com/premiumsupport/).

You can also use the Support API to access features for [AWS Trusted Advisor](http://aws.amazon.com/premiumsupport/trustedadvisor/). You can return a list of checks and their descriptions, get check results, specify checks to refresh, and get the refresh status of checks.

You can manage your support cases with the following Support API operations:
+ The [CreateCase](API_CreateCase.md), [DescribeCases](API_DescribeCases.md), [DescribeAttachment](API_DescribeAttachment.md), and [ResolveCase](API_ResolveCase.md) operations create Support cases, retrieve information about cases, and resolve cases.
+ The [DescribeCommunications](API_DescribeCommunications.md), [AddCommunicationToCase](API_AddCommunicationToCase.md), and [AddAttachmentsToSet](API_AddAttachmentsToSet.md) operations retrieve and add communications and attachments to AWS Support cases.
+ The [DescribeServices](API_DescribeServices.md) and [DescribeSeverityLevels](API_DescribeSeverityLevels.md) operations return AWS service names, service codes, service categories, and problem severity levels. You use these values when you call the [CreateCase](API_CreateCase.md) operation.

You can also use the AWS Support API to call the Trusted Advisor operations. For more information, see [AWS Trusted Advisor](https://docs.aws.amazon.com/awssupport/latest/user/trusted-advisor.html) in the * AWS Support User Guide*.

For authentication of requests, Support uses [Signature Version 4 Signing Process](https://docs.aws.amazon.com/general/latest/gr/signature-version-4.html).

For more information about this service and the endpoints to use, see [About the AWS Support API](https://docs.aws.amazon.com/awssupport/latest/user/about-support-api.html) in the * AWS Support User Guide*.

This document was last published on June 12, 2026. 