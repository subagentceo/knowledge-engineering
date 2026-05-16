# Building with Flex Insights

> \[!IMPORTANT]
>
> Flex Insights (also known as Historical Reporting) is currently available as a public beta release and the information contained in the Flex Insights documentation is subject to change. This means that some features are not yet implemented and others may be changed before the product is declared as generally available. Public beta products are not covered by a Twilio SLA.
>
> Any reference to "Historical Reporting", "Flex Insights API", "Flex Insights Historical Reporting", or "Flex Insights Historical Reporting API" in the Flex Insights documentation refers to Flex Insights.

Flex Insights offers you tools to [enhance your Flex Insights integration](/docs/flex/developer/insights/enhance-integration) and export data into your own data warehouses.

## Setting Up Your Development Environment

Consider using separate Twilio accounts for Development and Production when building with Flex Insights. You can start with an account dedicated to development of the new features, and once your implementation matures enough, you can create a production account that your agents and supervisors use on a day-to-day basis.

Test usage in production accounts skews your business KPIs in long term historical reporting. During development and testing you will typically need nonexistent Agents, Queues and other objects, and your usage pattern during the test period will likely be very different from your production environment.

Flex Insights is designed to preserve a verbatim record of what has happened in your Contact Center, and retroactively modifying the data may require engagement of Twilio staff. You can learn more about [development environments](https://en.wikipedia.org/wiki/Deployment_environment) on Wikipedia.

## Next Steps

* Learn how to [authenticate the Flex Insights API](/docs/flex/developer/insights/api/general-usage)
* Start [exporting data from Flex Insights](/docs/flex/developer/insights/api/export-data)
* Learn how to use Flex Insights with the [End User Guides](/docs/flex/end-user-guide/insights)
