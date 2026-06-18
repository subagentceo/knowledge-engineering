

# Welcome
<a name="Welcome"></a>

 AWS Resource Explorer is a resource search and discovery service. By using Resource Explorer, you can explore your resources using an internet search engine-like experience. Examples of resources include Amazon Relational Database Service (Amazon RDS) instances, Amazon Simple Storage Service (Amazon S3) buckets, or Amazon DynamoDB tables. You can search for your resources using resource metadata like names, tags, and IDs. Resource Explorer can search across all of the AWS Regions in your account in which you turn the service on, to simplify your cross-Region workloads.

Resource Explorer scans the resources in each of the AWS Regions in your AWS account in which you turn on Resource Explorer. Resource Explorer [creates and maintains an index](https://docs.aws.amazon.com/resource-explorer/latest/userguide/getting-started-terms-and-concepts.html#term-index) in each Region, with the details of that Region's resources.

You can [search across all of the indexed Regions in your account](https://docs.aws.amazon.com/resource-explorer/latest/userguide/manage-aggregator-region.html) by designating one of your AWS Regions to contain the aggregator index for the account. When you [promote a local index in a Region to become the aggregator index for the account](https://docs.aws.amazon.com/resource-explorer/latest/userguide/manage-aggregator-region-turn-on.html), Resource Explorer automatically replicates the index information from all local indexes in the other Regions to the aggregator index. Therefore, the Region with the aggregator index has a copy of all resource information for all Regions in the account where you turned on Resource Explorer. As a result, views in the aggregator index Region include resources from all of the indexed Regions in your account.

For more information about AWS Resource Explorer, including how to enable and configure the service, see the [AWS Resource Explorer User Guide](https://docs.aws.amazon.com/resource-explorer/latest/userguide/).

**Note**  
The example HTTP query requests and responses in this guide are displayed with the [JSON](https://json.org) formatted across multiple lines for readability. The actual query responses from the Resource Explorer service do not include this extra whitespace.

 **We want your feedback about this documentation** 

Our goal is to help you get everything you can from Resource Explorer. If this guide helps you to do that, then let us know. If the guide isn't helping you, then we want to hear from you so we can address the issue. Use the **Feedback** link that's in the upper-right corner of every page. That sends your comments directly to the writers of this guide. We review every submission, looking for opportunities to improve the documentation. Thank you in advance for your help\!

This document was last published on June 17, 2026. 