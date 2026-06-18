

# Welcome
<a name="Welcome"></a>

Welcome to the * AWS Data Exchange API Reference*. AWS Data Exchange is a service that helps AWS customers to exchange data in the AWS Cloud. You can use the AWS Data Exchange API operations in the AWS Cloud.

As a subscriber, you can view and access the data sets that you have an entitlement to through a subscription. You can use the API operations to download (export) or copy your entitled data sets to Amazon Simple Storage Service (Amazon S3) for use across a variety of AWS analytics and machine learning services.

As a provider, you can create and manage your data sets that you want to publish to a product. You can download (export) or copy your assets or revisions to Amazon S3 or a signed URL. In addition, providers can import assets from an Amazon API Gateway API or import assets from an Amazon Redshift datashare.

A *data set* in AWS Data Exchange is a collection of data that can be changed or updated over time. Data sets can be updated using revisions, which represent a new version or incremental change to a data set. A revision contains one or more assets.

An *asset* in AWS Data Exchange is a piece of data. The asset can be one of the following:
+ A structured data file, an image file, or some other data file that is stored as an Amazon S3 object.
+ An Amazon Redshift datashare. Datashares are created in Amazon Redshift based on an existing database within a cluster that contain schemas, tables, views, or user-defined functions.
+ A REST API that you created in Amazon API Gateway.
+ An Amazon S3 access point that allows read-only access to an Amazon S3 bucket or subset of a bucket.
+ An AWS Lake Formation data permission (Preview).

As a subscriber, you can view and access the data sets that you have an entitlement to through a subscription. You can use the API operations to export or copy your entitled data sets for use across a variety of AWS analytics and machine learning services, or download them locally.

As a provider, you can create and manage your data sets that you want to publish to a product. Providers can import assets locally, from an Amazon Simple Storage Service (Amazon S3) bucket, an Amazon API Gateway API, from an Amazon Redshift datashare, or from an AWS Lake Formation data permission (Preview).

 *Jobs* are asynchronous import or export operations used to create or copy assets.

To learn more about these and other AWS Data Exchange concepts, procedures, best practices, and AWS Marketplace integration, see the [AWS Marketplace Catalog API Reference](https://docs.aws.amazon.com/marketplace-catalog/latest/api-reference/welcome.html) and the [AWS Data Exchange User Guide](https://docs.aws.amazon.com/data-exchange/latest/userguide/what-is.html).

**Note**  
Currently, the `SendApiAsset` operation is not supported for AWS SDKs for Java or Swift.

 **Data sets and products** 

You can manage and interact with data sets by using the AWS Data Exchange API operations. You can perform product publishing and product subscription tasks through the AWS Marketplace Catalog API or the AWS Data Exchange console. For more information, see the [AWS Data Exchange User Guide](https://docs.aws.amazon.com/data-exchange/latest/userguide/what-is.html).

 **API access control** 

You use [AWS Identity and Access Management](https://docs.aws.amazon.com/IAM/latest/UserGuide/introduction.html) (IAM) to create IAM roles and assign policies that grant limited permissions to end users. The policies define the actions that the role can take on your data sets, revisions, assets, and associated jobs in the AWS Data Exchange API. For example, you can define roles such as engineering, marketing, and pricing. A user in your organization who has been added to the engineering role might be granted permissions to import an asset from Amazon S3 but can't finalize a revision for your data set.

For more information about AWS Data Exchange permissions, including managed policies, and a permissions reference for AWS Data Exchange actions and resources, see [Identity and Access Management in AWS Data Exchange](https://docs.aws.amazon.com/data-exchange/latest/userguide/auth-access.html) in the * AWS Data Exchange User Guide*.

 **Endpoints and AWS Regions ** 

For information about AWS Regions and endpoints that are supported for AWS Data Exchange, see [AWS Data Exchange endpoints and quotas](https://docs.aws.amazon.com/general/latest/gr/dataexchange.html#dataexchange_region) in the * AWS General Reference *.

 **Service quotas** 

For information about the quotas for using AWS Data Exchange, see [AWS Data Exchange endpoints and quotas](https://docs.aws.amazon.com/general/latest/gr/dataexchange.html#quotas-dataexchange) in the * AWS General Reference *.

This document was last published on June 17, 2026. 