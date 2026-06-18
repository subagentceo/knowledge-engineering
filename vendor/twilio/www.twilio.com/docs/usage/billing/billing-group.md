# Billing Groups

The Billing Group ID is a unique key that identifies a specific Twilio Billing Group. It is characterized by its alphanumeric format and always begins with the prefix `commerce_billingprofile_`. Beyond its role as an identifier, it serves as a secure credential that acts as a username for administrative and API-driven tasks.

A Billing Group provides a structured framework to manage multiple Twilio accounts under a single umbrella. This architecture facilitates three core functional advantages:

* **Shared Pricing:** Apply consistent pricing models across all sub-accounts within the group.
* **Consolidated Invoicing:** Receive a single, unified bill for all accounts, simplifying accounts payable workflows.
* **Unified Payment Methods:** Maintain a single set of payment methods for the entire group, reducing administrative overhead.

## Find your Billing Group ID in OneConsole

Twilio provides a centralized administrative hub designed for billing and account management within OneConsole. Accessing your Billing Group ID requires navigating through this interface to find the specific profile linked to your organization.

To locate your ID, follow these steps:

1. Log in to the [Twilio OneConsole](https://1console.twilio.com/).
2. Locate the sidebar navigation (left-hand rail) and click the **Billing** icon.
3. Select **Billing Dashboard** and then **Overview** from the resulting menu to enter the billing management area.
4. Navigate to the **Billing Groups** list, which displays all groups associated with your organization.

When viewing the list of Billing Groups, look for the specific group name you wish to analyze. The Billing Group ID — the string beginning with `commerce_billingprofile_` — is displayed directly below the Billing Group name. Once located, this ID can be used as a programmatic key for automated data retrieval.

## Retrieve usage data with the API

By integrating usage data directly into internal systems, organizations can track and monitor costs dynamically rather than waiting for end-of-month statements.

### Endpoint

Usage data is retrieved through the following API endpoint:

```text
POST /v2/Usage/BillingGroups/{billingGroupId}/Records
```

Replace `{billingGroupId}` with the specific `commerce_billingprofile_` string retrieved from the Console. This ensures the API correctly identifies the billing entity for which you are requesting records.

### Example request

```text
POST /v2/Usage/BillingGroups/commerce_billingprofile_EXAMPLE123/Records
```

### Request parameters

By utilizing request parameters, you can isolate specific cost drivers, filter by product categories, and define exact timeframes to avoid data noise.

> \[!NOTE]
>
> The `timePeriod` parameter is an alternative to `startDate` and `endDate`. Don't use them in the same request.

| Parameter           | Type                                                       | Description                                                          |
| ------------------- | ---------------------------------------------------------- | -------------------------------------------------------------------- |
| `startDate`         | Date (`YYYY-MM-DD`)                                        | Filter usage from this date (inclusive). Max range is 365 days.      |
| `endDate`           | Date (`YYYY-MM-DD`)                                        | Filter usage to this date (inclusive). Max range is 365 days.        |
| `timePeriod`        | Enum: `YESTERDAY`, `THIS_MONTH`, `LAST_MONTH`, `THIS_YEAR` | A predefined filter as an alternative to custom start and end dates. |
| `productCategory`   | String                                                     | Isolate usage data for a specific Twilio product category.           |
| `aggregationPeriod` | Enum: `DAILY`, `MONTHLY`                                   | Define how records are grouped within the requested range.           |
| `pageSize`          | Integer                                                    | Limit the number of items returned in a single response.             |

The `aggregationPeriod` is a critical tool for financial granularity. Use `DAILY` aggregation to identify specific usage spikes or trends within a month (vital for spotting anomalies). Use `MONTHLY` for a high-level executive view of spend.

## Understand the response

The value of the Usage API lies in its structured output, which maps technical usage metrics directly to actual costs. The response provides a clear breakdown of what was used, when it was used, and the associated price.

The API returns records with the following properties:

| Property          | Description                                                                            |
| ----------------- | -------------------------------------------------------------------------------------- |
| `asOf`            | The latest date/time for the records, formatted as `YYYY-MM-DD` in UTC.                |
| `productName`     | A human-readable name of the Twilio product (for example, Outbound MMS).               |
| `productCategory` | The category for the product.                                                          |
| `startDate`       | The first date for which usage is included (UTC, `YYYY-MM-DD`).                        |
| `endDate`         | The last date for which usage is included (UTC, `YYYY-MM-DD`).                         |
| `usage`           | The volume used (`amount`) and the metric (`unit`, for example, segments, messages).   |
| `price`           | The total cost (`amount`) and the ISO 4217 currency code (for example, USD, GBP, EUR). |

### Pagination

For organizations with high volume, the `meta` section of the response is vital for data management. It includes `pageSize` to define the limit of the current view, along with `previousToken` and `nextToken`. These tokens allow systems to iterate through large datasets to ensure no usage records are missed during ingestion.

### Example response

```json
{
  "asOf": "2025-01-31",
  "records": [
    {
      "productName": "United States-Outbound-LC-MMS",
      "productCategory": "united-states-outbound-lc-mms",
      "startDate": "2025-01-01",
      "endDate": "2025-01-31",
      "usage": {
        "amount": "66505",
        "unit": "segments"
      },
      "price": {
        "amount": 100.5,
        "currency": "USD"
      }
    }
  ],
  "meta": {
    "key": "items",
    "pageSize": 20,
    "previousToken": "eyJzdGFydE9uIjoiMjAyNi0wMy0wNSIsImVuZE9uIjoiMjAyNi0wMy0wNSIsInBhZ2UiOiIyIiwicGFnZVNpemUiOiIxMDAifQ",
    "nextToken": "eyJzdGFydE9uIjoiMjAyNi0wMy0wNSIsImVuZE9uIjoiMjAyNi0wMy0wNSIsInBhZ2UiOiIzIiwicGFnZVNpemUiOiIxMDAifQ"
  }
}
```

> \[!WARNING]
>
> Usage API data is an estimate. Actual billed usage is reflected on your invoice or usage statement after month-end.

## Product catalog

While Usage Records provide a retrospective look at what your organization has already consumed, proactive scaling requires visibility into the full suite of available services. There is a fundamental distinction between these two resources:

* **Usage Records:** Retrospective data that captures historical consumption and costs for products you have actively deployed.
* **Product Catalog:** A prospective resource that offers visibility into the full range of Twilio offerings, including services your organization has not yet used. For more details on available `productCategory` values, refer to the Product Catalog documentation.

## Related resources

* [Twilio Billing Group ID: A Guide to Consolidated Billing and Usage Analytics](https://help.twilio.com/articles/49506588886299-Twilio-Billing-Group-ID-A-Guide-to-Consolidated-Billing-and-Usage-Analytics) — Detailed walkthrough of Billing Group IDs, the Usage API, and analytics on the Twilio Help Center.
