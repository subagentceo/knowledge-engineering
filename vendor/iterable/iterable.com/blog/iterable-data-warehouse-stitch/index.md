# How to Pipe Iterable Data to a Data Warehouse Using Stitch - Iterable

## How to Pipe Iterable Data to a Data Warehouse Using Stitch

**Published by**

April 10, 2019

![Iterable + Stitch](https://iterable.com/wp-content/uploads/2026/04/041019_Stitch_768x512.png)

As you already know, Iterable is the growth marketing platform that enables brands to create, execute, and optimize campaigns to power world-class customer engagement across email, push, SMS, in-app and more with unparalleled data flexibility. Many Iterable users also use other SaaS tools for things like analytics, billing, CRM, and support.

Since marketers are data-driven, chances are they’ll want to combine data from all of their cloud platforms and internal databases to surface insights and improve their performance—but how?

The best tactic is to create a data warehouse that consolidates all of your data in a single location. Most businesses nowadays use cloud data warehouses for that purpose.

To populate the data warehouse, you can extract the data you have in SaaS applications and on-premises databases and load it using an ETL (extract, transform, load) tool. Once the data is available, analysts can use it to create reports.

![Iterable + Stitch diagram](https://iterable.com/wp-content/uploads/2019/04/Stitch-image01-1024x173.png)

In this post, we’ll walk through the process of connecting Iterable, a data warehouse, and a business intelligence (BI) tool to create reports.

### Three Tiers of the Data Analytics Architecture

Data sources like Iterable form a foundation for a data analytics stack that comprises three tiers: ETL software, data warehouse, and business intelligence (BI) software.

Stitch provides a simple, powerful ETL service for businesses of all sizes. Signup is simple—you can be moving data from one or more sources to a data warehouse in five minutes.

The last few years have seen the emergence of cloud-native data warehouses like Amazon Redshift, Google BigQuery, and Snowflake. Because they run on cloud infrastructure that scales quickly and cost-effectively to meet performance demands, they can handle transformation using the same hardware on which the data warehouse runs.

Finally, to unlock the value of your data, you can connect a BI or data visualization tool to your data warehouse and create reports that analyze data from multiple sources, which you can share via browser-based dashboards.

### Setting Up a Data Warehouse

Let’s set up a three-tiered data analytics stack, starting with the data warehouse. If you don’t already have a data warehouse, choose one that meets your needs.

If you choose Redshift, BigQuery, Snowflake, or one of the other destinations Stitch supports, you can also follow the setup steps for your data warehouse in the Stitch documentation.

### Setting Up Stitch for ETL

The next step is setting up an ETL pipeline to move data from your sources to the data warehouse. Stitch makes extracting data from a source and loading it into a data warehouse easy.

To get started, visit the signup page, enter your email address, then enter your name and a password.

![Signup for a Stitch account](https://iterable.com/wp-content/uploads/2019/04/Stitch-image02.png)

##### Add an integration

Next, add Iterable as an integration within Stitch. Click on the Iterable icon to get started:

![Add Iterable as an integration within Stitch](https://iterable.com/wp-content/uploads/2019/04/Stitch-image03-1024x516.png)

Enter a name for the integration. This is the name that will display on the Stitch Dashboard for the integration; it’ll also be used to create the schema in your destination.

![Configure your Iterable + Stitch integration](https://iterable.com/wp-content/uploads/2019/04/Stitch-image04.png)

When you click Save, Stitch will generate a webhook token URL.

![Stitch webhook token](https://iterable.com/wp-content/uploads/2019/04/Stitch-image05.png)

Click the Copy button to copy it, then switch back to your Iterable account. Click Integrations > Webhooks. In the Endpoint field, paste the webhook URL, then click Create Webhook.

After the webhook is saved, click the Edit button to the far right to select the events you want to track.

Your changes will be saved automatically, and all future events of the types you’ve selected will be replicated to your data warehouse—but first, you have to connect the data warehouse you set up to Stitch as a destination.

##### Add a destination

![Select a destination for your data](https://iterable.com/wp-content/uploads/2019/04/Stitch-image06-1024x749.png)

Suppose you’ve chosen an Amazon Redshift data warehouse.

Clicking on the Redshift icon brings you to a screen where you can enter your credentials.

![Connect to Amazon Redshift](https://iterable.com/wp-content/uploads/2019/04/Stitch-image07.png)

Now all the pieces are in place, and the data is ready to flow.

![Success! Your data pipeline has been created](https://iterable.com/wp-content/uploads/2019/04/Stitch-image08.png)

When you visit your Stitch dashboard, you’ll see that your integration is marked, “Active, Continuously Replicated.”

From the dashboard, you can also do things like adding integrations from other data sources. The Stitch documentation walks through the process for each one.  

##### Connect BI software to your data warehouse

The final stage of the process is connecting an analytics platform to your data warehouse.

If you don’t already use BI software, you have dozens to choose from, including such popular options as Looker, Tableau, Microsoft Power BI, and Google Data Studio.

### You’re Set With Stitch

That’s all there is to it. Using an ETL tool like Stitch to move data from Iterable and other sources into a data warehouse lets you leverage the power of BI tools to correlate and report on all of your valuable data.

To learn more about Iterable’s growth marketing platform, take a product tour.