# Export Data from Flex Insights via API

> \[!IMPORTANT]
>
> Flex Insights (also known as Historical Reporting) is currently available as a public beta release and the information contained in the Flex Insights documentation is subject to change. This means that some features are not yet implemented and others may be changed before the product is declared as generally available. Public beta products are not covered by a Twilio SLA.
>
> Any reference to "Historical Reporting", "Flex Insights API", "Flex Insights Historical Reporting", or "Flex Insights Historical Reporting API" in the Flex Insights documentation refers to Flex Insights.

Learn how to export reports from within Insights to store the data in a warehouse of your own with this guide.

The export process consists of the following steps:

* [Log in to the API to retrieve a Super Secret Token (SST)](/docs/flex/developer/insights/api/general-usage)
* [Retrieve a Temporary Token (TT)](/docs/flex/developer/insights/api/general-usage) used for subsequent API calls
* [Export the report](#export-the-raw-report)
* [Log out](/docs/flex/developer/insights/api/general-usage#log-out)

## Prerequisites

Before you start exporting data you will need to have:

* a [provisioned Flex Insights Workspace](https://help.twilio.com/articles/360010705874-Getting-Started-with-Flex-Insights)
* the credentials of a user with access to the Insights Workspace
* a table report that contains data you need to export
* REST API client support for cookies that are used to pass authentication tokens

## API Authentication

Ensure that you are authenticated against the Flex Insights API by having a valid TT (*temporary token*).

The procedure is detailed at [API General Usage](/docs/flex/developer/insights/api/general-usage)

## Export the raw report

Exporting the raw report is useful for getting machine-friendly data from any report created from your [Flex Insights Analytics Portal](https://analytics.ytica.com). You will need the ID of the workspace and ID of the report object to export the data.

**Workspace ID**: Log in to the [Analytics Portal](https://analytics.ytica.com) and check the URL in the browser address bar. For example:

![Browser tab showing Flex Insights Demo with Reports selected.](https://docs-resources.prod.twilio.com/ff761fd89a818acaef1ad691356b956aa2f95d13011a7c7e6777d941664e5f0a.png)

The workspace ID is the string appearing between the `#s=/gdc/workspaces/` segment and the vertical bar. In this case, the workspace ID qx8vgewnj2hyemje8f6bkrkbyqk8psrf.

**Object ID:** Within Analytics Portal navigate to the report you'd like to export, and check the URL in the address bar. It may look like this:

![Object ID.](https://docs-resources.prod.twilio.com/71eed2e910b89d4819c002e3ce50efab71ff61521b7db16bab5fcb1b184107c2.png)

**Object ID** is the numerical expression at the very end of the URL and is typically preceded by `obj/` segment. In the example above, **Object ID** is 643040.

> \[!WARNING]
>
> The maximum report size for raw exports is **1GB**. Exporting a report of this size may take minutes.

Flex Insights - Get link of the raw report

```bash
curl --location --request POST 'https://analytics.ytica.com/gdc/app/projects/{workspace_id}/execute/raw' \
--header 'Accept: application/json' \
--header 'Content-Type: application/json' \
--header 'Cookie: GDCAuthTT=XXXXX-XXXXX-XXXXX' \
--data-raw '{
  "report_req": {
    "report": "/gdc/md/{workspace_id}/obj/{object_id}"
  }
}'
```

```json
{
  "uri": "/gdc/projects/{workspace_id}/execute/raw/{download_id}"
}
```

## Download the report

Download the report by using URI from previous export.

> \[!NOTE]
>
> If you receive 202 response from API, it means that the request is accepted, but not ready to be delivered (still computing or preparing the CSV).\
> Since the export API can take several seconds, or minutes in edge cases, depending on the volume of data and number of columns, you need to add a retry in case the server returns 202. The data is only ready to download when the server returns 200.

Flex Insights - Download the report

```bash
curl --location --request GET 'https://analytics.ytica.com/{URI}' \
--header 'Cookie: GDCAuthTT=XXXXX-XXXXX-XXXXX'
```

```json
# CSV format
Agent,Date,Amount
Jack,02/15,45
Emma,02/16,123
Ludwig,02/25,13
```
