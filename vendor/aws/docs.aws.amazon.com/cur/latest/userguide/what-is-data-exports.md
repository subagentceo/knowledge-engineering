

# What is AWS Data Exports?
<a name="what-is-data-exports"></a>

AWS Data Exports enables you to create billing and cost management data exports and carbon emissions data exports using basic SQL, and visualize data by integrating with Amazon QuickSight.

You can create exports using the AWS Billing and Cost Management console, AWS CLI, or AWS SDK. In the console, you can use custom column selections. In the AWS CLI or AWS SDK, you can write SQL queries, select columns, filter rows, and rename columns. This allows you to select only the data you want to process, remove any sensitive cost information, and control the output schema of your exports.

There are five export types:
+ **Standard data export**, with four different tables to choose from:
  + Cost and Usage Report 2.0 (CUR 2.0)
**Note**  
Cost and Usage Report 2.0 (CUR 2.0) is the new and recommended way to receive your detailed AWS cost and usage data. CUR 2.0 has several improvements over the previous Cost and Usage Reports (CUR). For more information, see [Migrating from CUR to CUR 2.0 in Data Exports](https://docs.aws.amazon.com/cur/latest/userguide/dataexports-migrate.html).
  + Cost optimization recommendations (from Cost Optimization Hub)
  + FOCUS 1.2 with AWS columns
  + FOCUS 1.0 with AWS columns
  + Carbon emissions
+ **Cost and usage dashboard**: An export and integration to Amazon QuickSight to deploy a pre-built cost and usage dashboard.
+ **Legacy data export**: An export of the Legacy Cost and Usage Reports (CUR). However, Legacy CUR is accessed with a different set of actions (see [CUR actions reference](https://docs.aws.amazon.com/aws-cost-management/latest/APIReference/API_Operations_AWS_Cost_and_Usage_Report_Service.html)) compared to the Data Exports actions (see [Data Exports actions reference](https://docs.aws.amazon.com/aws-cost-management/latest/APIReference/API_Operations_AWS_Billing_and_Cost_Management_Data_Exports.html)).

Data Exports includes the following benefits:
+ Create recurring exports with the most granular data available, and store them in Amazon S3.
+ Customize your data exports with SQL queries using column selections and row filters.
+ Create exports with consistent schemas including only the columns you want.
+ Remove sensitive cost data or charges associated with certain linked AWS account IDs.
+ Reduce the size of your exports by selecting only the columns or rows that you need.
+ Automate exporting of cost data and carbon footprint data to support downstream analysis.

**To get started with Data Exports**

1. Open the Billing and Cost Management console at [https://console.aws.amazon.com/costmanagement/](https://console.aws.amazon.com/costmanagement/).

1. In the navigation pane, choose **Data Exports**.

From the **Data Exports** page, you can create new exports, manage existing exports, and create an export that integrates with Amazon QuickSight and deploys a pre-built cost and usage dashboard.

You can also access [AWS Sustainability](https://docs.aws.amazon.com/sustainability/latest/userguide) and the [AWS Usage Report](https://docs.aws.amazon.com/cur/latest/userguide/usage-report.html) from the **Data Exports** page.