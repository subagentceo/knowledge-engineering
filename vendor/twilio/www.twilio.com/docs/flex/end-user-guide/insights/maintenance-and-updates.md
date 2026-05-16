# Flex Insights Maintenance and Updates

> \[!IMPORTANT]
>
> Flex Insights (also known as Historical Reporting) is currently available as a public beta release and the information contained in the Flex Insights documentation is subject to change. This means that some features are not yet implemented and others may be changed before the product is declared as generally available. Public beta products are not covered by a Twilio SLA.
>
> Any reference to "Historical Reporting", "Flex Insights API", "Flex Insights Historical Reporting", or "Flex Insights Historical Reporting API" in the Flex Insights documentation refers to Flex Insights.

## Maintenance

There is a reserved weekly maintenance window on Saturdays in the following zoned times:

* Pacific Time - 1AM to 7AM
* Eastern Time - 4AM to 10AM
* UK Time - 9AM to 3PM
* Central European Time - 10AM to 4PM

During these times Flex Insights may not be accessible. Not all the maintenance windows are necessarily used every week - however, if you have some processes dependent on Flex Insights, make sure you take the maintenance window into consideration.

## Updates

Updates are rolled out during the maintenance window. We roll out updates when they are ready and the interval between updates may range from a few days to several weeks.

You do not have to take any action - updates happen automatically.

> \[!WARNING]
>
> It is not possible to opt-out from scheduled Flex Insights updates.

Updates cover the following:

* User interface and features
* [Analytics Data Model](/docs/flex/end-user-guide/insights/data-model)

  * Measures, reports, and dashboards created on top of the updated measures may change the values they display in case the changes are aimed at bug fixes.
  * Updates aim to make the data richer and provide support for new features and more analytics options.
* Built-in measures

  * Measures, reports, and dashboards created on top of updated measures may change display values.
  * Updates aim to make measures more accurate as more data becomes available in the data sources.
* Built-in reports

  * Dashboards containing the built-in reports may look slightly different after an update.
  * Updates aim to improve clarity and show more valuable data.
* Built-in dashboards.

## Impact on your custom content

Built-in measures, reports, and dashboards are *not* editable.

If you want to keep your dashboards, reports, or metrics from being updated you can create a copy of them. Note that even copied dashboards and reports that depend on built-in reports and measures get updated if the underlying content is updated.

Mind the following update examples:

* Custom dashboards containing built-in reports that are updated

  * The dashboard will preserve layout and filters.
  * Updated reports in the dashboard will be updated.
* Custom reports built on top of built-in measures

  * The report will have the same colors and layout.
  * The value shown in the report may change depending on your data.
* Custom measures built on top of built-in measures

  * The measure may change value depending on your data.

> \[!WARNING]
>
> If you want to have a dashboard or a report absolutely static you have to copy also the underlying content down to the *measures* level. However, we do **not** recommend this approach as updates may contain important fixes.

To create custom dashboards, reports and measures please contact your Account Manager.
