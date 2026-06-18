

# What is AWS Supply Chain?
<a name="what-is-service"></a>

AWS Supply Chain is a cloud-based supply chain management application that works with your existing enterprise resource planning (ERP) and supply chain management systems. Using AWS Supply Chain, you can connect and extract your inventory, supply, and demand related data from existing ERP or supply chain systems into one unified AWS Supply Chain data model.

![Introduction to AWS Supply Chain](http://docs.aws.amazon.com/connect-decisions/legacy/userguide/images/features.png)


**Topics**
+ [Features of AWS Supply Chain](#servicename-feature-overview)
+ [Signing into AWS Supply Chain](#signing-in)
+ [User permissions](#user-profiles)

## Features of AWS Supply Chain
<a name="servicename-feature-overview"></a>

AWS Supply Chain supports the following features:
+ **Data Lake** – The AWS Supply Chain data lake simplifies the process of aggregating data from your supply chain systems in one place, using an extensible data model built for supply chain management. The data lake consumes data from any structured data source, including your existing ERP and supply chain management systems. To connect to any of the other Warehouse management systems, you can use the Amazon S3 connector. Once the data source is connected, you can review and confirm the data mapping between your data source to AWS Supply Chain's data model. Once the data fields are mapped, you can start importing your data from your data source. For more information, see [Data lake](data-connections.md).
+ **Insights** – AWS Supply Chain insights uses the supply chain data in the data lake to automatically generate insights of potential supply chain risks (for example, stockouts, excess stocks, lead time deviations). After the data is imported, AWS Supply Chain automatically computes the projected inventory based on the inventory snapshots, open orders,in-transit shipments, and demand from outbound orders and forecast. AWS Supply Chain proactively alerts inventory managers of potential inventory risks that include both below and above the stock levels stored in inventory policy and provides rebalance recommendations to resolve stockouts. Inventory managers are also alerted when there are consistent lead time deviations by a vendor and recommends updating contractual lead times to avoid such deviations in the future. For more information, see [Insights](insights.md).
+ **Order Planning and Tracking** – You can use Order Planning and Tracking to view work order status, expected time of arrival (ETA) predictions, delivery risk and recommendations for each work order. For more information, see [Order Planning and Tracking](work-order.md).
+ **Demand planning** – You can use AWS Supply Chain Demand Planning to create demand forecasts, adjust the forecasts according to market conditions, and allow demand planners to collaborate across teams. For more information, see [Demand Planning](demand-planning.md).
+ **Supply planning** – You can use Supply planning to plan and forecast purchases of raw materials, components, and finished goods. Supply planning supports two types of supply plans, *Auto replenishment* and *Manufacturing plans*. For more information, see [Supply Planning](supply-planning.md).
+ **N-Tier Visibility** – N-Tier Visibility extends visibility and insights beyond your organization to your external trading partners. For more information, see [N-Tier Visibility](partner.md).
+ **Sustainability** – You can invite partners by using the AWS Supply Chain data lake connectors and by mapping the partner information to Partners or Partner's point-of-contact from Amazon S3 or other ERP systems. For more information, see [Sustainability](sustainability.md).

## Signing into AWS Supply Chain
<a name="signing-in"></a>

AWS Supply Chain has a web-based client so you can access your AWS Supply Chain account from a web browser. To get started with the AWS Supply Chain, you need a broadband internet connection and one of the web browsers listed in the following table.


| Browser | Supported Versions | 
| --- | --- | 
| Google Chrome | Latest three versions. | 
| Mozilla Firefox Extended Support Release (ESR) | All versions are supported until the version's [end-of-life date](https://support.mozilla.org/en-US/kb/firefox-esr-release-cycle). For more information, see the [Firefox ESR release calendar](https://whattrainisitnow.com/calendar).  | 
| Mozilla Firefox | Latest three versions. | 
| Microsoft Edge and Edge Chromium | Version 84 and later. | 
| Safari | Safari 10 or later on macOS. | 

Your AWS Supply Chain system administrator provides you with a unique AWS Supply Chain web client URL. To recover a lost or forgotten password, contact your administrator.

**Note**  
The AWS Supply Chain dashboard is customized according to your permission role. For more information, see [User permissions](#user-profiles).

1. In your web browser, enter the **web client URL** provided by your AWS Supply Chain administrator. For example, https://alias.awsapps.com.

1. For **Username** and **Password**, enter your **AWS IAM Identity Center SSO credentials** (formerly known as AWS SSO). 

1. Choose **Sign In**.

## User permissions
<a name="user-profiles"></a>

AWS Supply Chain supports the following default user permission roles. Additionally, you can create custom user permission roles that include multiple permission roles. You can also add specific locations and products.
+ **Administrator** – Access to create, view, and manage all data and user permissions.
+ **Data Analyst** – Access to create, view, and manage all data connections.
+ **Inventory Manager** – Access to create, view, and manage Insights.
+ **Planner** – Access to create, view, and manage forecasts and overrides, and also publish demand plans.
+ **Partner Data Manager** – Access to manage and view partners, manage and view data requests, and view sustainability data.
+ **Supply Planner** – Access to manage and view supply plans.