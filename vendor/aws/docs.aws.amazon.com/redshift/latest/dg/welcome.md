

 Amazon Redshift will no longer support the creation of new Python UDFs starting Patch 198. Existing Python UDFs will continue to function until June 30, 2026. For more information, see the [ blog post ](https://aws.amazon.com/blogs/big-data/amazon-redshift-python-user-defined-functions-will-reach-end-of-support-after-june-30-2026/). 

# Introduction to Amazon Redshift
<a name="welcome"></a>

Welcome to the *Amazon Redshift Database Developer Guide*. This guide focuses on helping you understand how to use Amazon Redshift to create and manage a data warehouse. If you work with databases as a designer, software developer, or administrator, this guide gives you the information you need to design, build, query, and maintain your data warehouse.

Amazon Redshift is a fully managed, petabyte-scale data warehouse service in the cloud. Amazon Redshift Serverless lets you access and analyze data without the usual configurations of a provisioned data warehouse. Resources are automatically provisioned and data warehouse capacity is intelligently scaled to deliver fast performance for even the most demanding and unpredictable workloads. You don't incur charges when the data warehouse is idle, so you only pay for what you use. Regardless of the size of the dataset, you can load data and start querying right away in the Amazon Redshift query editor v2 or in your favorite business intelligence (BI) tool. Enjoy the best price performance and familiar SQL features in an easy-to-use, zero administration environment.

**Topics**
+ [Prerequisites for using Amazon Redshift](#c-dev-guide-prereqs)
+ [Amazon Redshift architecture](c_redshift_system_overview.md)
+ [Sample database](c_sampledb.md)

## Prerequisites for using Amazon Redshift
<a name="c-dev-guide-prereqs"></a>

This topic describes prerequisites you need to use Amazon Redshift.

Before you use this guide, you should read [Get started with Redshift Serverless data warehouses](https://docs.aws.amazon.com/redshift/latest/gsg/new-user-serverless.html), which goes over how to complete the following tasks.<a name="ul_vpv_yd1_n3"></a>
+ Create a data warehouse with Amazon Redshift Serverless.
+ Loading in sample data with Amazon Redshift query editor v2
+ Loading in data from Amazon S3.

You should also know how to use your SQL client and should have a fundamental understanding of the SQL language.