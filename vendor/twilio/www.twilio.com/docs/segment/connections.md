# Connections Overview

Connections is Segment's core product offering: you can collect event data from your mobile apps, websites, and servers with one API, then pull in contextual data from cloud apps like your CRM, payment systems, and internal databases to build a unified picture of your customers.

## Sources

In Segment, you create a source (or more than one!) for each website or app you want to track. We **highly recommend** creating a Source for each unique source of data (each site, app, or server), though this isn't required.

Sources belong to a workspace, and the URL for a source looks something like this:
`https://segment.com/<my-workspace>/sources/<my-source-name>/`

You can create new sources using the button in the workspace view. Each source you create has a write key, which is used to send data to that source. For example, to load [`analytics.js`, the Segment JavaScript library](/docs/segment/connections/sources/catalog/libraries/website/javascript/) on your page, the snippet on the [Quickstart Guide](/docs/segment/connections/sources/catalog/libraries/website/javascript/quickstart/) includes:

```js
analytics.load("YOUR_WRITE_KEY");
```

Learn more about Sources from the [Sources overview page](/docs/segment/connections/sources/).

## Destinations

Destinations are business tools or apps that you can connect to the data flowing through Segment. Some of Segment's most popular destinations are Google Analytics, Mixpanel, Kissmetrics, Customer.io, Intercom, and KeenIO.

All of these tools run on the same data: who are your customers and what are they doing? But each tool requires that you send that data in a slightly different format, which means that you'd have to write code to track all of this information, again and again, for each tool, on each page of your app or website.

Enter Segment. Do it once.

Segment eliminates this process by introducing an abstraction layer. You send your data to Segment, and Segment understands how to translate it so we can send it along to any destination. You enable destinations from the catalog in the Segment App, and user data immediately starts flowing into those tools. No extra code required!

Segment supports many categories of destinations, from advertising to marketing, email to customer support, CRM to user testing, and even data warehouses. You can view a complete list of available [destinations](/docs/segment/connections/destinations/catalog/) or check out the [destination page](/docs/segment/connections/destinations/) for a searchable list broken down by category.

## Warehouses

A warehouse is a central repository of data collected from one or more sources. This is what commonly comes to mind when you think about a relational database: structured data that fits neatly into rows and columns.

In Segment, a Warehouse is a special type of destination. Instead of streaming data to the destination all the time, we load data to them in bulk at regular intervals. When we load data, we insert and update events and objects, and automatically adjust their schema to fit the data you've sent to Segment.

### Reverse ETL

With [Reverse ETL (Extract, Transform, Load)](/docs/segment/connections/reverse-etl/), your data warehouse acts as your source, enabling you to send data from your warehouse to your destinations.

## Information on Sources and Destinations pages

The Sources and Destinations pages allow each user to decide what information appears in their personal view for each page.

On both pages, you can click the stack icon in the upper right-hand corner of the table to see and select Source properties to show. You can select up to five columns of properties.

The following information is available for Sources:

* Status
* Environment
* Destinations
* Type
* Category
* Created At
* Created By

On the Destinations page, you can choose among the following properties:

* Status
* Created At
* Type
* Sources
* Category

You can then sort or filter each column to just the values you care about, by clicking on the arrow next to each displayed column.

## FAQs

### My source was disabled and it wasn't done by anyone in my workspace

Sources without any enabled destinations are auto-disabled after 14 days. However, the workspace owner is notified by email before Segment disables the source. Data that flows into Segment but does not flow to any downstream tools is not valuable to you and unnecessarily takes up space.

Segment understands there may be cases to keep a source active. If you'd like to add your sources to an exception list, you can do so by filling out this [Airtable form](https://airtable.com/shr7V9LFDZh31cYWW).

### Can I request Segment add an integration tool?

Yes, you can [submit an integration request](https://segment.com/requests/integrations/).
