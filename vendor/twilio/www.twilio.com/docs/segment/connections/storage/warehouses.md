# Data Warehouses

* FREE: ✓
* TEAM: ✓
* BUSINESS: ✓
* ADDON: x

Free and Team plan workspaces can have 1 warehouse. Business plans can have more than one, and include custom sync schedules and filtering.

See the [available plans](https://segment.com/pricing), or [contact Support](https://segment.com/help/contact/)

## What's a warehouse?

A warehouse is a central repository of data collected from one or more sources. This is what commonly comes to mind when you think about a relational database: structured data that fits neatly into rows and columns.

In Segment, a Warehouse is a special type of destination. Instead of streaming data to the destination all the time, we load data to them in bulk at regular intervals. When we load data, we insert and update events and objects, and automatically adjust their schema to fit the data you've sent to Segment.

When selecting and building a data warehouse, consider three questions:

1. **What type of data will be collected?**
2. **How many data sources will there be?**
3. **How will the data be used?**

Relational databases are useful when you know in advance the information you want to collect and how you want to link that information. This is usually the type of database used in the world of user analytics. For instance, a users table might be populated with the columns `name`, `email_address`, or `plan_name`.

Examples of data warehouses include Amazon [Redshift](/docs/segment/connections/storage/catalog/redshift/), Google [BigQuery](/docs/segment/connections/storage/catalog/bigquery/), and [Postgres](/docs/segment/connections/storage/catalog/postgres/).

When Segment loads data into your warehouse, each sync goes through two steps:

1. **Ping:** Segment servers connect to your warehouse. For Redshift warehouses, Segment also runs a query to determine how many slices a cluster has. Common reasons a sync might fail at this step include a blocked VPN or IP, a warehouse that isn't set to be publicly accessible, or an issue with user permissions or credentials.
2. **Load:** Segment de-duplicates the transformed data and loads it into your warehouse. If you have queries set up in your warehouse, they run after the data is loaded into your warehouse.

> \[!NOTE]
>
> They've moved: [Warehouse Schemas](/docs/segment/connections/storage/warehouses/schema).

[Analytics Academy: When to use SQL for analysis](https://segment.com/academy/intro/when-to-use-sql-for-analysis/?referrer=docs)

When your existing analytics tools can't answer your questions, it's time to level-up and use SQL for analysis.

### Learn more

[How do I send custom data to my warehouse?](/docs/segment/connections/storage/warehouses/faq/#what-if-i-want-to-add-custom-data-to-my-warehouse)

[How do I give users permissions to my warehouse?](/docs/segment/connections/storage/warehouses/add-warehouse-users/)

Check out the [Frequently Asked Questions about Warehouses](/docs/segment/connections/storage/warehouses/faq/) page and [a list of helpful SQL queries to get you started with Redshift ](/docs/segment/connections/storage/warehouses/redshift-useful-sql).

## FAQs

[How do I decide between Redshift, Postgres, and BigQuery?](/docs/segment/connections/storage/warehouses/choose-warehouse/)

[What do you recommend for Postgres: Amazon or Heroku?](/docs/segment/connections/storage/warehouses/choose-warehouse/)

[How do I give users permissions?](/docs/segment/connections/storage/warehouses/add-warehouse-users/)

[What are the limitations of Redshift clusters and warehouses connectors?](/docs/segment/connections/storage/warehouses/redshift-faq/)

[Where do I find my source slug?](/docs/segment/connections/storage/warehouses/faq/#how-do-i-find-my-source-slug)

### Setting up a warehouse

[How do I create a user, grant usage on a schema and then grant the privileges that the user will need to interact with that schema?](/docs/segment/connections/storage/warehouses/add-warehouse-users/)

[Which IPs should I allowlist?](/docs/segment/connections/storage/warehouses/faq/#which-ips-should-i-whitelist)

[Will Segment sync my historical data?](/docs/segment/connections/storage/warehouses/faq/#will-segment-sync-my-historical-data)

[Can I load in my own data into my warehouse?](/docs/segment/connections/storage/warehouses/faq/#what-if-i-want-to-add-custom-data-to-my-warehouse)

[Can I control what data is sent to my warehouse?](/docs/segment/connections/storage/warehouses/faq/#can-i-control-what-data-is-sent-to-my-warehouse)

### Managing a warehouse

[How fresh is the data in my warehouse?](/docs/segment/connections/storage/warehouses/faq/#how-fresh-is-the-data-in-segment-warehouses)

[Can I add, tweak, or delete some of the tables?](/docs/segment/connections/storage/warehouses/faq/#can-we-add-tweak-or-delete-some-of-the-tables)

[Can I transform or clean up old data to new formats or specs?](/docs/segment/connections/storage/warehouses/faq/#can-we-transform-or-clean-up-old-data-to-new-formats-or-specs)

[What are common errors and how do I debug them?](/docs/segment/connections/storage/warehouses/warehouse-errors/)

[How do I speed up my Redshift queries?](/docs/segment/connections/storage/warehouses/redshift-tuning/)

### Analyzing with SQL

[How do I forecast LTV with SQL and Excel for e-commerce businesses?](/docs/segment/guides/how-to-guides/forecast-with-sql/)

[How do I measure the ROI of my Marketing Campaigns?](/docs/segment/guides/how-to-guides/measure-marketing-roi/)
