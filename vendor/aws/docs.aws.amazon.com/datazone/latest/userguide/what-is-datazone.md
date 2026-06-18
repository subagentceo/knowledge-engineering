

# What is Amazon DataZone?
<a name="what-is-datazone"></a>

Amazon DataZone is a data management service that makes it faster and easier for you to catalog, discover, share, and govern data stored across AWS, on-premises, and third-party sources. With Amazon DataZone, administrators who oversee organization’s data assets can manage and govern access to data using fine-grained controls. These controls help ensure access with the right level of privileges and context. Amazon DataZone makes it easy for engineers, data scientists, product managers, analysts, and business users to share and access data throughout an organization so they can discover, use, and collaborate to derive data-driven insights.

Amazon DataZone helps you deliver data to end users directly and simplifies your architecture by integrating data management services, including Amazon Redshift, Amazon Athena, Amazon QuickSight, AWS Glue, AWS Lake Formation, on-premises sources, third-party sources, and more.

**Topics**
+ [What Can I Do with Amazon DataZone?](#use-service-for-what)
+ [How Amazon DataZone supports and integrates with other AWS services?](#support-integration-with-other-services)
+ [How can I access Amazon DataZone?](#accessing-datazone)

## What Can I Do with Amazon DataZone?
<a name="use-service-for-what"></a>

With Amazon DataZone, you can do the following:
+ **Govern data access across organizational boundaries.** With Amazon DataZone, you can help ensure that the right data is accessed by the right user for the right purpose, in accordance with your organization’s security regulations, without relying on individual credentials. You can also provide transparency on data asset usage and approve data subscriptions with a governed workflow. You can also monitor data assets across projects through usage auditing capabilities.
+ **Connect data workers through shared data and tools to drive business insights.** With Amazon DataZone, you can increase business team’s efficiency by collaborating seamlessly across teams and providing self-service access to data and analytics tools. You can use business terms to search, share, and access cataloged data stored in AWS, on-premises, or with third-party providers. And you can learn more about the data that you want to use by using Amazon DataZone business glossaries.
+  **Automate data discovery and cataloging with machine learning.** With Amazon DataZone, you can reduce the time spent on manual entry of data attributes into the business data catalog. Richer data in the data catalog also improves the searching experience.

## How Amazon DataZone supports and integrates with other AWS services?
<a name="support-integration-with-other-services"></a>

Amazon DataZone supports three types of integrations with other AWS services:
+ Producer data sources - you can publish data assets to the Amazon DataZone catalog from the data stored in AWS Glue Data Catalog and Amazon Redshift tables and views. You can also manually publish objects from Amazon Simple Storage Service (S3) to the Amazon DataZone catalog.
+ Consumer tools - you can use Amazon Athena or Amazon Redshift query editors to access and analyze your data assets.
+ Access control and fulfillment - Amazon DataZone supports granting access to AWS Lake Formation managed AWS Glue tables and Amazon Redshift tables and views. For all other data assets, Amazon DataZone publishes standard events related to your actions (e.g., approval given to a subscription request) to Amazon EventBridge. You can use these standard events to integrate with other AWS services or third-party solutions for custom integrations.

## How can I access Amazon DataZone?
<a name="accessing-datazone"></a>

You can access Amazon DataZone in any of the following ways:
+ Amazon SageMaker management console or Amazon DataZone console

  You can use the Amazon SageMaker management console or Amazon DataZone management console to access and conﬁgure your Amazon DataZone domains, blueprints, and users. For more information, see [https://console.aws.amazon.com/datazone](https://console.aws.amazon.com/datazone). This console is also used to create the Amazon DataZone data portal.
+ Amazon DataZone data portal

  The Amazon DataZone data portal is a browser-based web application where you can catalog, discover, govern, share, and analyze data in a self-service fashion. The data portal can authenticate you with credentials from your identity provider through AWS IAM Identity Center (successor to AWS SSO), or with your IAM credentials. You can obtain the data portal URL by accessing the Amazon DataZone console at [https://console.aws.amazon.com/datazone](https://console.aws.amazon.com/datazone).
+ Amazon DataZone HTTPS API

  You can access Amazon DataZone programmatically by using the Amazon DataZone HTTPS API, which lets you issue HTTPS requests directly to the service. For more information, see the [Amazon DataZone API Reference](https://docs.aws.amazon.com/datazone/latest/APIReference/Welcome.html). 