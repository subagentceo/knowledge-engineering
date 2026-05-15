

# What is AWS Billing Conductor?
<a name="what-is-billingconductor"></a>

AWS Billing Conductor is a custom billing service for AWS Channel Partners (Partners) and organizations that have *chargeback* requirements. For Partners, chargebacks are a prerequisite to getting paid by their customers. For direct customers, showback or, chargeback activities ensure that the business allocates the costs of a specific team, business unit, subsidiary or affiliate company, to the correct internal budget or profit and loss (P&L) statement.

To achieve these activities, Billing Conductor enables users to create a second version of their costs to share with their customers or account owners. The second version of cloud cost data comes from your Billing Conductor configuration (pricing plans, pricing rules, and custom line items).

This data is called pro forma cost data, which represents costs for accounts in billing groups. These Billing Conductor resources can include a subset of accounts in an AWS Organizations (standard billing group) when using Billing Conductor as a standalone service, or an entire AWS Organizations (billing transfer billing group) when using Billing Conductor with billing transfer.

Pro forma data exists in a separate domain (pro forma) from your billable cost data (standard billable). While billable cost data uses AWS-determined pricing, pro forma data is accessible through billing views.

The primary billing view for accounts or AWS Organizations in billing groups shows only pro forma data. The account that configures the Billing Conductor pricing resources gains access to the billing view that shows the pro forma data displayed to accounts or AWS Organizations in billing groups.

**Note**  
Customers will observe cost differences between *billable costs* (matching the AWS invoice) and *pro forma costs* (matching the Billing Conductor configuration) throughout the month. However, usage values will match at the end of each month, once the AWS invoice is issued.

Defining pro forma costs enables customers to model their costs uniformly to match one of the following use cases: 

1. Customer agreements, which can be a Partner use case negotiated outside of AWS

1. Internal accounting practices, often an organization-specific use case

Billing Conductor configurations don't affect customers’ existing invoices from AWS or billing configurations (for example, sharing of credits or commitment-based discounts like Reserved Instances or Savings Plans).

You can analyze pro forma costs from either a management account of a standalone AWS Organizations or from a bill transfer account that manages multiple AWS Organizations bills.
+ Analyze margins (the difference between pro forma costs and billable costs for the same set of accounts) within Billing Conductor
+ Use to analyze cost data using either billing group views or billing transfer views
+ Analyze cost data by using `Billing Group` views or `Billing Transfer` views on the Bills page
+ Create a for each `Billing Group` view and `Billing Transfer` view
+ View reservation and Savings Plans coverage and utilization reports that reflect `Billing Group` and `Billing Transfer` views

Billing Conductor managed accounts and AWS Organizations can analyze pro forma costs in AWS Cost Explorer, Cost and Usage Reports, the Billing dashboard, and the billing details page. Managed accounts and AWS Organizations in billing groups can create budgets to monitor their pro forma spend and receive alerts when they exceed, or are forecasted to exceed, their desired pro forma spending limit.

You can configure billing groups, pricing plans, pricing rules, and custom line items in the [Billing Conductor console](https://console.aws.amazon.com/billingconductor) or by using the [Billing Conductor API](https://docs.aws.amazon.com/billingconductor/latest/APIReference/Welcome.html).

For more information about AWS Billing Conductor service quotas, see [Quotas and restrictions](limits.md). For more information about billing transfer, see [Transfer billing management to external accounts](https://docs.aws.amazon.com/awsaccountbilling/latest/aboutv2/orgs_transfer_billing.html).

## Features in AWS Billing Conductor
<a name="abc-features"></a>

You can use the AWS Billing Conductor features to do the following:

**Group accounts in standard billing groups**  
Organize accounts into Billing Conductor billing groups to view aggregated pro forma costs that model your AWS Organizations structure to reflect your business financial organization.

**Assign AWS Organizations to billing transfer billing group**  
When using billing transfer, you can use Billing Conductor to create billing groups that map one-to-one with an AWS Organizations so that the entire organization (including the management account) can view the pro forma costs data exclusively.

**Custom pricing**  
Set global or specific markups or discounts, and control Free Tier access.

**Charges and credits**  
Add one-time or recurring flat or percentage-based charges or credits to billing groups.

**Pro forma analysis**  
Analyze costs based on pricing configurations in the Billing console. Accounts and AWS Organizations in your billing groups can visualize, forecast, and create custom reports of their pro forma costs in AWS Cost Explorer. Accounts and AWS Organizations in the billing groups can view Reservation and Savings Plans coverage and utilization reports that reflects their pro forma costs. When using Billing Conductor as a standalone service, you designate a primary account for each billing group. This primary account has a cross-account view of all costs accrued by accounts in the billing group, while non-primary accounts see only their own costs. For Billing Conductor users who opt in to billing transfer, the primary account defaults to the management account of the AWS Organizations that's transferring its bills (bill source account).

**Reporting**  
Configure Cost and Usage Reports for each billing group.

**Rate analysis**  
Compare the applied rates to actual AWS rates with the billing group margin report.

**Budget**  
Accounts and AWS Organizations in billing groups can create budgets to monitor their pro forma spend and be alerted when they exceed, or they are forecasted to exceed, their desired pro forma spending limit.

**Email Notification**  
You may receive email notifications when your AWS Billing Conductor configurations change. For example, when the primary account leaves AWS Organizations, or when a new linked account joins AWS Organizations and is automatically associated to a billing group.

## Pricing for AWS Billing Conductor
<a name="abc-pricing"></a>

For more information about pricing, see [AWS Billing Conductor Pricing](https://aws.amazon.com/aws-cost-management/aws-billing-conductor/pricing/). Billing Conductor is free for all billing transfer users for transfer billing billing groups. Any standard billing groups are charged.

## Related services
<a name="abc-related"></a>

****AWS Billing****  
The AWS Billing is the portal for all AWS customers, from students and startup companies to large enterprises. You can use the console to see the resources that are running in your AWS accounts, manage billing preferences, and access billing artifacts that are needed to make payments to AWS. The AWS Billing console also provides a high-level explanation of the spending for your account, and serves as the entry point for enrolling in products in the AWS Cost Management products.  
For more information, see the *[AWS Billing User Guide](https://docs.aws.amazon.com/awsaccountbilling/latest/aboutv2/)*.

**AWS Cost Explorer**  
You can use the Cost Explorer interface to visualize, understand, and manage your AWS costs and usage over time. Get started quickly by creating custom reports that analyze cost and usage data. Analyze your data at a high level (for example, total costs and usage across all accounts), or dive deeper into your cost and usage data to identify trends, pinpoint cost drivers, and detect anomalies.  
For more information, see the following topics:  
+ [Performing ad hoc analysis on pro forma costs in AWS Cost Explorer](ad-hoc-cost-explorer-analysis.md)
+ [Analyzing your costs with AWS Cost Explorer](https://docs.aws.amazon.com/cost-management/latest/userguide/ce-what-is.html) in the *AWS Cost Management User Guide*

****AWS Cost and Usage Reports****  
The AWS Cost and Usage Reports (AWS CUR) contain the most comprehensive set of cost and usage data available. You can use Cost and Usage Reports to publish your AWS billing reports to an Amazon Simple Storage Service (Amazon S3) bucket that you own. You can receive reports that break down your costs by the hour or day, by product or product resource, or by tags that you define yourself.   
AWS updates the report in your bucket once a day in comma-separated values (CSV) or Apache Parquet format. You can view the reports using spreadsheet software such as Microsoft Excel or Apache OpenOffice Calc. You can also access them from an application using the Amazon S3 or Amazon Athena APIs.   
AWS Cost and Usage Reports track your AWS usage and provide estimated charges associated with your account. Each report contains line items for each unique combination of AWS products, usage type, and operation that you use in your AWS account.

****AWS Identity and Access Management (IAM)****  
The AWS Billing Conductor service is integrated with AWS Identity and Access Management (IAM). You can use IAM with AWS Billing Conductor to ensure that other people who work in your account have only as much access as they need to get their job done.  
You also use IAM to control access to all of your AWS resources. This includes but is not limited to your billing information. It's important that you familiarize yourself with the basic concepts and best practices of IAM before you get too far along with setting up the structure of your AWS account.  
For more information about how to work with IAM, see [What Is IAM?](https://docs.aws.amazon.com/IAM/latest/UserGuide/IAM_Concepts.html) and [Security Best Practices in IAM](https://docs.aws.amazon.com/IAM/latest/UserGuide/IAMBestPractices.html) in the *IAM User Guide*. 

****AWS Organizations (Consolidated billing)****  
AWS products and services can accommodate every size of company, from small startups to enterprises. If your company is large or likely to grow, you might want to set up multiple AWS accounts that reflect your company's structure. For example, you can have one account for the entire company and accounts for each employee, or an account for the entire company with IAM users for each employee. You can have an account for the entire company, accounts for each department or team within the company, and accounts for each employee.  
If you create multiple accounts, you can use the consolidated billing feature of AWS Organizations to combine all your member accounts under one management account and receive a single bill. For more information, see [Consolidated billing for Organizations](https://docs.aws.amazon.com/awsaccountbilling/latest/aboutv2/consolidated-billing.html) in the *AWS Billing User Guide*.

****Billing transfer****  
Billing transfer decouples billing and financial management from security and governance management. This enables a single AWS Organizations to get centralized access to costs data and AWS invoices across multiple organizations.  
To centralize billing while maintaining security management autonomy, billing transfer allows a management account to designate an external management account to manage and pay for its consolidated bill. To set up billing transfer, an external account (bill transfer account) sends a billing transfer invitation to a management account (bill source account). After the invitation is accepted, the external account becomes the bill transfer account and manages payment for the bill source account's consolidated bill, starting on the date specified in the invitation.  
For more information, see [Transfer billing management to external accounts](https://docs.aws.amazon.com/awsaccountbilling/latest/aboutv2/orgs_transfer_billing.html).

****Billing views****  
A billing view helps you manage and control access to cost management data within your AWS environment. With billing views, cost management data is represented as an AWS resource. Through resource-based policies, you can configure what data is accessible to an account when using AWS Billing and Cost Management tools.  
Each billing view is identified by a unique Amazon Resource Name (ARN), which you can reference in identity-based policies to perform specific IAM actions on the cost management data contained in that billing view.  
For more information, see [Controlling cost management data access with Billing View](https://docs.aws.amazon.com/cost-management/latest/userguide/billing-view.html).