# Exporting Events

## Exporting Events

You may need to export Audit Log Events in large chunks. WorkOS supports exporting events as CSV files through both the Dashboard and API.

Exports are scoped to a single organization within a specified date range. Events from the past three months can be included in the export. You may define additional filters such as `actions`, `actors`, and `targets`.

### Creating an export through the Dashboard

Exports can be manually created under the Organization page when viewing Audit Log Events by selecting "Export CSV" from the "Actions" dropdown. Set your filters and select "Generate CSV file".

![A screenshot showing how to generate an Audit Log export in the WorkOS Dashboard.](https://images.workoscdn.com/images/a5386939-652f-4cbb-aa88-7159e2ffc1dd.png?auto=format\&fit=clip\&q=50)

### Creating an export through the API

#### Create an Export

Once the export has been created, fetch the export at a later time to access the `url` of the generated CSV file.

> The URL will expire after 10 minutes. If the export is needed again at a later time, refetching the export will regenerate the URL.

#### Fetch Export

If the `state` of the export is still `pending`, poll the export until it is ready for download.
