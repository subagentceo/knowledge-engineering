

# What is AWS Data Exchange?
<a name="what-is"></a>

AWS Data Exchange is a service that helps AWS customers easily share and manage data entitlements from other organizations at scale.

As a data receiver, you can track and manage all of your data grants and AWS Marketplace data subscriptions in one place. When you have access to an AWS Data Exchange data set, you can use compatible AWS or partner analytics and machine learning to extract insights from it. For information about purchasing data products from AWS Marketplace, see [Subscribing to AWS Data Exchange data products on AWS Data Exchange](subscribe-to-data-sets.md).

For data senders, AWS Data Exchange eliminates the need to build and maintain any data delivery and entitlement infrastructure. Anyone with an AWS account can create and send data grants to data receivers. To sell your data as a product in AWS Marketplace, make sure that you follow the guidelines to determine eligibility. For more information, see [Providing AWS Data Exchange data products on AWS Marketplace](providing-data-sets.md).

In addition, anyone, with or without an AWS account, can find and use publicly available data sets that are part of the [Open Data on AWS](https://aws.amazon.com/opendata/) program. For more information, see [Using Open Data on AWS data sets with AWS Data Exchange](open-data.md).

**Topics**
+ [What is a data grant in AWS Data Exchange](#data-exchange-data-grant)
+ [What is an AWS Marketplace data product?](#data-exchange-products)
+ [Supported data sets](#supported-data-sets)
+ [Accessing AWS Data Exchange](#how-to-access)
+ [Supported Regions](#supported-regions)
+ [Related services](#related-services)

## What is a data grant in AWS Data Exchange
<a name="data-exchange-data-grant"></a>

A data grant is the unit of exchange in AWS Data Exchange that is created by a data sender in order to grant a data receiver access to a data set. When a data sender creates a data grant, a grant request is sent to the data receiver's AWS account. A data receiver accepts the data grant to gain access to the underlying data.

**A grant has the following parts:**
+ **Data set** – A data set in AWS Data Exchange is a resource curated by the sender. It contains the data assets a receiver will gain access to after accepting a data grant. AWS Data Exchange supports five types of data sets: Files, API, Amazon Redshift, Amazon S3, and AWS Lake Formation (Preview).
+ **Data grant details** – This information includes a name and description of the data grant that will be visible to data receivers.
+ **Recipient access details** – This information includes the receiver’s AWS account ID and specifies how long the receiver should have access to the data.

## What is an AWS Marketplace data product?
<a name="data-exchange-products"></a>

A product is the unit of exchange in AWS Marketplace that is published by a provider and made available for use to subscribers. A data product is a product that includes AWS Data Exchange data sets. When a data provider publishes a data product, that product is listed in the AWS Marketplace product catalog after being reviewed by AWS against our guidelines and terms and conditions. Each product published is uniquely identified by its product ID.

A data product has the following parts:
+ **Product details** – This information includes name, descriptions (both short and long), data samples, a logo image, and support contact information. Providers complete the product details.
  + For more information as a subscriber, see [Product subscriptions in AWS Data Exchange](product-subscriptions.md). 
  + For more information as a provider, see [Product best practices in AWS Data Exchange](product-details.md).
+ **Product offers** – Oﬀers define the terms that subscribers are agreeing to when they subscribe to a product. To make a product available in the public AWS Marketplace Catalog, providers must define a public offer. This offer includes prices and durations, data subscription agreement, refund policy, and the option to create custom offers.
  + For more information as a subscriber, see [Accepting private products and offers in AWS Data Exchange](subscribe-to-private-offer.md) and [Accepting Bring Your Own Subscription (BYOS) offers in AWS Data Exchange](subscribe-to-byos-offer.md)
  + For more information as a provider, see [Creating an offer for AWS Data Exchange products](prepare-offers.md).
+ **Data sets** – A product can contain one or more data sets. A data set in AWS Data Exchange is a resource curated by the data provider and contains the data assets a receiver will gain access to after accepting a data grant. AWS Data Exchange supports five types of data sets: Files, API, Amazon Redshift, Amazon S3, and AWS Lake Formation (Preview).
  + For more information as a subscriber, see [Data sets and revisions](product-subscriptions.md#product-sub-revisions).
  + For more information as a provider, see [Data in AWS Data Exchange](data-sets.md).

## Supported data sets
<a name="supported-data-sets"></a>

AWS Marketplace takes a responsible approach to facilitating data transactions by promoting transparency through use of the service. AWS Marketplace reviews permitted data types, restricting products that are not permitted. Providers are limited to distributing data sets that meet the legal eligibility requirements set forth in the Terms and Conditions for AWS Marketplace Sellers.

For more information about permitted data types, see [Publishing guidelines for AWS Data Exchange](publishing-guidelines.md).

**Important**  
As an AWS customer, you are encouraged to conduct your own additional due-diligence to ensure compliance with any applicable data privacy laws. If you suspect that a product or other resources on AWS Data Exchange are being used for abusive or illegal purposes, report it using the [Report Amazon AWS abuse form](https://support.aws.amazon.com/#/contacts/report-abuse).

## Accessing AWS Data Exchange
<a name="how-to-access"></a>

### Data receivers
<a name="how-to-access-sub"></a>

As a data receiver, you can view all of your current, pending, and expired data grants from the AWS Data Exchange console.

You can also discover and subscribe to new third-party data sets available through AWS Data Exchange from the [AWS Marketplace catalog](https://aws.amazon.com/marketplace/search/results?category=d5a43d97-558f-4be7-8543-cce265fe6d9d&FULFILLMENT_OPTION_TYPE=DATA_EXCHANGE&filters=FULFILLMENT_OPTION_TYPE).

### Data senders and providers
<a name="how-to-access-pro"></a>

As a data sender or provider, you can access AWS Data Exchange through the following options:
+ Directly through the [AWS Data Exchange console](https://console.aws.amazon.com/dataexchange) (**Publish data**)
+ Data providers with data products available in AWS Marketplace can access programmatically using the following APIs:
  + **AWS Data Exchange API** – Use the API operations to create, view, update, and delete data sets and revisions. You can also use these API operations to import and export assets to and from those revisions. For more information, see the [AWS Data Exchange API Reference](https://docs.aws.amazon.com/data-exchange/latest/apireference).
  + **AWS Marketplace Catalog API** – Use the API operations to view and update data products published to AWS Marketplace. For more information, see the [AWS Marketplace Catalog API Reference](https://docs.aws.amazon.com/marketplace/latest/APIReference/API_Operations_AWS_Marketplace_Catalog_Service.html).

## Supported Regions
<a name="supported-regions"></a>

AWS Data Exchange data grants, subscriptions, data sets, revisions, and assets are Region resources that can be managed programmatically or through the AWS Data Exchange console in supported Regions. Data products published to AWS Marketplace are available in a single product catalog. Subscribers can see the same catalog regardless of which supported AWS Region they are using. 

The following regions are supported:
+ US East (N. Virginia)
+ US East (Ohio)
+ US West (Oregon)
+ US West (N. California)
+ EU (Ireland)
+ EU (Frankfurt)
+ EU (London)
+ Asia Pacific (Singapore)
+ Asia Pacific (Tokyo)
+ Asia Pacific (Sydney)
+ Asia Pacific (Seoul)

**Note**  
For more information about supported regions, see the [Global Infrastructure Region Table](https://aws.amazon.com/about-aws/global-infrastructure/regional-product-services/).

## Related services
<a name="related-services"></a>

The following services are related to AWS Data Exchange:
+ **Amazon S3** – AWS Data Exchange allows providers to import and store data files from their Amazon S3 buckets. Data recipients can export these files to Amazon S3 programmatically. AWS Data Exchange also enables recipients to directly access and use providers' Amazon S3 buckets. For more information, see [What is Amazon S3?](https://docs.aws.amazon.com/AmazonS3/latest/dev/Welcome.html) in the *Amazon Simple Storage Service User Guide*.
+ **Amazon API Gateway** – Another supported asset type for data sets is APIs. Data recipients can call the API programmatically, call the API from the AWS Data Exchange console, or download the OpenAPI specification file. For more information, see [What is Amazon API Gateway?](https://docs.aws.amazon.com/apigateway/latest/developerguide/welcome.html) in the *Amazon API Gateway Developer Guide*. 
+ **Amazon Redshift** – AWS Data Exchange supports Amazon Redshift data sets. Data recipients can get read-only access to query the data in Amazon Redshift without extracting, transforming, and loading data. For more information, see [Getting started with Amazon Redshift](https://docs.aws.amazon.com/redshift/latest/gsg/getting-started.html) in the *Amazon Redshift Getting Started Guide* and [Amazon Redshift system overview](https://docs.aws.amazon.com/redshift/latest/dg/welcome.html) in the *Amazon Redshift Database Developer Guide*.
+ **AWS Marketplace** – AWS Data Exchange allows data sets to be published as products in AWS Marketplace. AWS Data Exchange data providers must be registered as AWS Marketplace sellers, and can use the AWS Marketplace Management Portal or the AWS Marketplace Catalog API. For information about becoming an AWS Marketplace subscriber, see [What Is AWS Marketplace?](https://docs.aws.amazon.com/marketplace/latest/buyerguide/what-is-marketplace.html) in the *AWS Marketplace Buyer Guide*. For information about becoming an AWS Marketplace seller, see [What Is AWS Marketplace?](https://docs.aws.amazon.com/marketplace/latest/userguide/what-is-marketplace.html) in the *AWS Marketplace Seller Guide.* 
+ **AWS Lake Formation** – AWS Data Exchange supports AWS Lake Formation data permission data sets (Preview). Data recipients get access to data stored in a data provider's AWS Lake Formation data lake and can query, transform, and share access to this data from their own AWS Lake Formation data set. For more information, see [AWS Lake Formation](https://docs.aws.amazon.com//lake-formation/latest/dg/what-is-lake-formation.html#service-integrations).