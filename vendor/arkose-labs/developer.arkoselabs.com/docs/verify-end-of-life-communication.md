# Verify End of Life Communication

> 🚧
>
> **Arkose Labs Verify API versions, V1 and V2 End of Life, as communicated already, was on June 1st 2023. We will be shutting down Verify V1 and V2 on July 1 2024. Arkose Labs Verify V3 API version is reaching End of Life on August 1 2024 and the service will no longer be available after this date.**

## Why is this change happening?

Over the past couple of years, we have built and enhanced the latest version of the Verify API, v4, to provide the best customer experience. This includes security, stability, latency, and feature enhancements.

## How does the Verify V4 migration work?

Verify V4 migration started around Q2 2022 and so far 85% of our customer traffic has already been migrated to Verify V4.

Below are the steps to migrate to Verify V4

* Change the request URL of your Verify calls to point to your custom V4 URL.
* Update your integration to correctly parse the new response schema format and its additional fields as  specified in our [Calling Verify v4 API](https://developer.arkoselabs.com/docs/calling-verify-v4-api) document.

## What do I need to do?

If you do not already have a custom V4 URL, talk to your CSM about getting one.

## What will be the impact for our users and our company?

* **Improved latency:** Verify V4 responds 3.5x faster than previous versions on average. Depending on your  current implementation, latency improvements may differ.
* **Better security:** V4’s custom URL ability supports TLS 1.2 and TLS 1.3, which is quickly becoming the industry standard for  HTTP transport layer security.
* **Arkose Insights:** Arkose Insights, a new soon-to-be-launched feature, will be available exclusively on Verify v4 and will constitute enriched insights about a session that can be used by you to directly influence a downstream decision, enrich an existing decision-making workflow, or create a new workflow to reduce fraud.
* **Support for latest features:** Future new features will only be added to V4.
* **Improved observability and stability:** V4 was designed and written with a particular focus on improving  Verify’s observability, stability, and scalability.

## What will come after the End of Life phase?

Customers who are still on Verify V1 & V2  versions **must migrate to V4 by June 1st, 2023**. Also, Verify API version, V3 will no longer accept any request for feature enhancements.

## Who do I talk to if I have questions?

Please reach out to your CSM if you have any questions migrating to Verify V4.