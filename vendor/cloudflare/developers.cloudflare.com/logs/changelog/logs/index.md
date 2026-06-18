---
title: Logs
description: View changelog entries for Cloudflare Logs.
image: https://developers.cloudflare.com/core-services-preview.png
---

> Documentation Index  
> Fetch the complete documentation index at: https://developers.cloudflare.com/logs/llms.txt  
> Use this file to discover all available pages before exploring further.

[Skip to content](#%5Ftop) 

# Logs

[ Subscribe to RSS ](https://developers.cloudflare.com/changelog/rss/logs.xml) 

## 2026-06-01

  
**New Turnstile Events Logpush dataset in Cloudflare Logs**   

Cloudflare has updated [Logpush datasets](https://developers.cloudflare.com/logs/logpush/logpush-job/datasets/):

#### New datasets

* **Turnstile Events**: A new dataset with fields including `ASN`, `Action`, `BrowserMajor`, `BrowserName`, `ClientIP`, `CountryCode`, `EventType`, `Hostname`, `OSMajor`, `OSName`, `Sitekey`, `Timestamp`, and `UserAgent`.

For the complete field definitions for each dataset, refer to [Logpush datasets](https://developers.cloudflare.com/logs/logpush/logpush-job/datasets/).

## 2026-05-29

  
**Updated fields across multiple Logpush datasets in Cloudflare Logs**   

Cloudflare has updated [Logpush datasets](https://developers.cloudflare.com/logs/logpush/logpush-job/datasets/):

#### Updated fields in existing datasets

* **DEX Device State Events** (added): `DeviceRegistrationProfileID`.
* **Gateway HTTP** (added): `AddedHeaders`, `DeletedHeaders`, and `SetHeaders`.
* **HTTP requests** (added): `MatchedRules`.

For the complete field definitions for each dataset, refer to [Logpush datasets](https://developers.cloudflare.com/logs/logpush/logpush-job/datasets/).

## 2026-05-13

  
**New Logpush datasets and updated fields across multiple Logpush datasets in Cloudflare Logs**   

Cloudflare has updated [Logpush datasets](https://developers.cloudflare.com/logs/logpush/logpush-job/datasets/):

#### New datasets

* **Email Security Post-Delivery Events**: A new dataset with fields including `AlertID`, `CompletedAt`, `Destination`, `FinalDisposition`, `Folder`, `From`, `FromName`, `MessageID`, `MessageTimestamp`, `MicrosoftTenantID`, `Operation`, `PostfixID`, `Reasons`, `Recipient`, `RequestedAt`, `RequestedBy`, `RequestedDisposition`, `Status`, `Subject`, `Success`, and `To`.
* **Magic Network Monitoring Flow Logs**: A new dataset with fields including `AWSVPCFlowJSON`, `Bits`, `DestinationAS`, `DestinationAddress`, `DestinationPort`, `DeviceID`, `EgressBits`, `EgressPackets`, `Ethertype`, `FlowProtocol`, `FlowTimestamp`, `NumFlows`, `PacketID`, `Packets`, `Protocol`, `RuleIDs`, `SampleRate`, `SampleRateType`, `SamplerAddress`, `SourceAS`, `SourceAddress`, `SourcePort`, `TcpFlags`, and `Timestamp`.

#### Updated fields in existing datasets

* **Firewall events** (added): `AISecurityInjectionScore`, `AISecurityPIICategories`, `AISecurityTokenCount`, and `AISecurityUnsafeTopicCategories`.
* **HTTP requests** (added): `AISecurityInjectionScore`, `AISecurityPIICategories`, `AISecurityTokenCount`, `AISecurityUnsafeTopicCategories`, and `Subrequests`.

For the complete field definitions for each dataset, refer to [Logpush datasets](https://developers.cloudflare.com/logs/logpush/logpush-job/datasets/).

## 2026-04-21

  
**Logpush subrequest merging for HTTP requests**   

When a Cloudflare Worker intercepts a visitor request, it can dispatch additional outbound fetch calls called subrequests. By default, each subrequest generates its own log entry in Logpush, resulting in multiple log lines per visitor request. With subrequest merging enabled, subrequest data is embedded as a nested array field on the parent log record instead.

#### What's new

* New subrequest\_merging field on Logpush jobs — Set "merge\_subrequests": true when creating or updating an http\_requests Logpush job to enable the feature.
* New Subrequests log field — When subrequest merging is enabled, a Subrequests field (`array\<object\>`) is added to each parent request log record. Each element in the array contains the standard http\_requests fields for that subrequest.

#### Limitations

* Applies to the http\_requests (zone-scoped) dataset only.
* A maximum of 50 subrequests are merged per parent request. Subrequests beyond this limit are passed through unmodified as individual log entries.
* Subrequests must complete within 5 minutes of the visitor request. Subrequests that exceed this window are passed through unmodified.
* Subrequests that do not qualify appear as separate log entries — no data is lost.
* Subrequest merging is being gradually rolled out and is not yet available on all zones. Contact your account team for concerns or to ensure it is enabled for your zone.
* For more information, refer to [Subrequests](https://developers.cloudflare.com/logs/logpush/logpush-job/subrequests/).

## 2026-04-20

  
**Cloudflare Pipelines as a Logpush destination**   

Logpush has traditionally been great at delivering Cloudflare logs to a variety of destinations in JSON format. While JSON is flexible and easily readable, it can be inefficient to store and query at scale.

With this release, you can now send your logs directly to [Pipelines](https://developers.cloudflare.com/pipelines/) to ingest, transform, and store your logs in [R2](https://developers.cloudflare.com/r2/) as Parquet files or Apache Iceberg tables managed by [R2 Data Catalog](https://developers.cloudflare.com/r2/data-catalog/). This makes the data footprint more compact and more efficient at querying your logs instantly with [R2 SQL](https://developers.cloudflare.com/r2-sql/) or any other query engine that supports Apache Iceberg or Parquet.

#### Transform logs before storage

Pipelines SQL runs on each log record in-flight, so you can reshape your data before it is written. For example, you can drop noisy fields, redact sensitive values, or derive new columns:

```

INSERT INTO http_logs_sink

SELECT

  ClientIP,

  EdgeResponseStatus,

  to_timestamp_micros(EdgeStartTimestamp) AS event_time,

  upper(ClientRequestMethod) AS method,

  sha256(ClientIP) AS hashed_ip

FROM http_logs_stream

WHERE EdgeResponseStatus >= 400;


```

Pipelines SQL supports string functions, regex, hashing, JSON extraction, timestamp conversion, conditional expressions, and more. For the full list, refer to the [Pipelines SQL reference](https://developers.cloudflare.com/pipelines/sql-reference/).

#### Get started

To configure Pipelines as a Logpush destination, refer to [Enable Cloudflare Pipelines](https://developers.cloudflare.com/logs/logpush/logpush-job/enable-destinations/pipelines/).

## 2026-04-15

  
**New TenantID and Firewall for AI fields in Logpush datasets**   

Cloudflare has added new fields to multiple [Logpush datasets](https://developers.cloudflare.com/logs/logpush/logpush-job/datasets/):

#### TenantID field

The following Gateway and Zero Trust datasets now include a `TenantID` field:

* **[Gateway DNS](https://developers.cloudflare.com/logs/logpush/logpush-job/datasets/account/gateway%5Fdns/#tenantid)**: Identifies the tenant ID of the DNS request, if it exists.
* **[Gateway HTTP](https://developers.cloudflare.com/logs/logpush/logpush-job/datasets/account/gateway%5Fhttp/#tenantid)**: Identifies the tenant ID of the HTTP request, if it exists.
* **[Gateway Network](https://developers.cloudflare.com/logs/logpush/logpush-job/datasets/account/gateway%5Fnetwork/#tenantid)**: Identifies the tenant ID of the network session, if it exists.
* **[Zero Trust Network Sessions](https://developers.cloudflare.com/logs/logpush/logpush-job/datasets/account/zero%5Ftrust%5Fnetwork%5Fsessions/#tenantid)**: Identifies the tenant ID of the network session, if it exists.

#### Firewall for AI fields

The following datasets now include [Firewall for AI](https://developers.cloudflare.com/api-shield/security/volumetric-abuse-detection/#firewall-for-ai) fields:

* **[Firewall Events](https://developers.cloudflare.com/logs/logpush/logpush-job/datasets/zone/firewall%5Fevents/)**:  
   * `FirewallForAIInjectionScore`: The score indicating the likelihood of a prompt injection attack in the request.  
   * `FirewallForAIPIICategories`: List of PII categories detected in the request.  
   * `FirewallForAITokenCount`: The number of tokens in the request.  
   * `FirewallForAIUnsafeTopicCategories`: List of unsafe topic categories detected in the request.
* **[HTTP Requests](https://developers.cloudflare.com/logs/logpush/logpush-job/datasets/zone/http%5Frequests/)**:  
   * `FirewallForAIInjectionScore`: The score indicating the likelihood of a prompt injection attack in the request.  
   * `FirewallForAIPIICategories`: List of PII categories detected in the request.  
   * `FirewallForAITokenCount`: The number of tokens in the request.  
   * `FirewallForAIUnsafeTopicCategories`: List of unsafe topic categories detected in the request.

For the complete field definitions for each dataset, refer to [Logpush datasets](https://developers.cloudflare.com/logs/logpush/logpush-job/datasets/).

## 2026-04-14

  
**Logpush to BigQuery — Cloudflare dashboard support**   

You can now configure Logpush jobs to Google BigQuery directly from the Cloudflare dashboard, in addition to the existing API-based setup.

Previously, setting up a BigQuery Logpush destination required using the Logpush API. Now you can create and manage BigQuery Logpush jobs from the **Logpush** page in the Cloudflare dashboard by selecting **Google BigQuery** as the destination and entering your Google Cloud project ID, dataset ID, table ID, and service account credentials.

For more information, refer to [Enable Logpush to Google BigQuery](https://developers.cloudflare.com/logs/logpush/logpush-job/enable-destinations/bigquery/).

## 2026-04-06

  
**New ResponseTimeMs field in Gateway DNS Logpush dataset**   

Cloudflare has added a new field to the [Gateway DNS](https://developers.cloudflare.com/logs/logpush/logpush-job/datasets/account/gateway%5Fdns/#responsetimems) Logpush dataset:

* **ResponseTimeMs**: Total response time of the DNS request in milliseconds.

For the complete field definitions, refer to [Gateway DNS dataset](https://developers.cloudflare.com/logs/logpush/logpush-job/datasets/account/gateway%5Fdns/).

## 2026-04-02

  
**BigQuery as Logpush destination**   

Cloudflare Logpush now supports **BigQuery** as a native destination.

Logs from Cloudflare can be sent to [Google Cloud BigQuery ↗](https://cloud.google.com/bigquery) via [Logpush](https://developers.cloudflare.com/logs/logpush/). The destination can be configured through the Logpush UI in the Cloudflare dashboard or by using the [Logpush API](https://developers.cloudflare.com/api/resources/logpush/subresources/jobs/).

For more information, refer to the [Destination Configuration](https://developers.cloudflare.com/logs/logpush/logpush-job/enable-destinations/bigquery/) documentation.

## 2026-03-25

  
**Logpush — More granular timestamps**   

Logpush now supports higher-precision timestamp formats for log output. You can configure jobs to output timestamps at millisecond or nanosecond precision. This is available in both the Logpush UI in the Cloudflare dashboard and the [Logpush API](https://developers.cloudflare.com/api/resources/logpush/subresources/jobs/).

To use the new formats, set `timestamp_format` in your Logpush job's `output_options`:

* `rfc3339ms` — `2024-02-17T23:52:01.123Z`
* `rfc3339ns` — `2024-02-17T23:52:01.123456789Z`

Default timestamp formats apply unless explicitly set. The dashboard defaults to `rfc3339` and the API defaults to `unixnano`.

For more information, refer to the [Log output options](https://developers.cloudflare.com/logs/logpush/logpush-job/log-output-options/) documentation.

## 2026-03-09

  
**New MCP Portal Logs dataset and new fields across multiple Logpush datasets in Cloudflare Logs**   

Cloudflare has added new fields across multiple [Logpush datasets](https://developers.cloudflare.com/logs/logpush/logpush-job/datasets/):

#### New dataset

* **MCP Portal Logs**: A new dataset with fields including `ClientCountry`, `ClientIP`, `ColoCode`, `Datetime`, `Error`, `Method`, `PortalAUD`, `PortalID`, `PromptGetName`, `ResourceReadURI`, `ServerAUD`, `ServerID`, `ServerResponseDurationMs`, `ServerURL`, `SessionID`, `Success`, `ToolCallName`, `UserEmail`, and `UserID`.

#### New fields in existing datasets

* **DEX Application Tests**: `HTTPRedirectEndMs`, `HTTPRedirectStartMs`, `HTTPResponseBody`, and `HTTPResponseHeaders`.
* **DEX Device State Events**: `ExperimentalExtra`.
* **Firewall Events**: `FraudUserID`.
* **Gateway HTTP**: `AppControlInfo` and `ApplicationStatuses`.
* **Gateway DNS**: `InternalDNSDurationMs`.
* **HTTP Requests**: `FraudEmailRisk`, `FraudUserID`, and `PayPerCrawlStatus`.
* **Network Analytics Logs**: `DNSQueryName`, `DNSQueryType`, and `PFPCustomTag`.
* **WARP Toggle Changes**: `UserEmail`.
* **WARP Config Changes**: `UserEmail`.
* **Zero Trust Network Session Logs**: `SNI`.

For the complete field definitions for each dataset, refer to [Logpush datasets](https://developers.cloudflare.com/logs/logpush/logpush-job/datasets/).

## 2025-12-11

  
**SentinelOne as Logpush destination**   

Cloudflare Logpush now supports **SentinelOne** as a native destination.

Logs from Cloudflare can be sent to [SentinelOne AI SIEM ↗](https://www.sentinelone.com/) via [Logpush](https://developers.cloudflare.com/logs/logpush/). The destination can be configured through the Logpush UI in the Cloudflare dashboard or by using the [Logpush API](https://developers.cloudflare.com/api/resources/logpush/subresources/jobs/).

For more information, refer to the [Destination Configuration](https://developers.cloudflare.com/logs/logpush/logpush-job/enable-destinations/sentinelone/) documentation.

## 2025-11-11

  
**Logpush Health Dashboards**   

We’re excited to introduce **Logpush Health Dashboards**, giving customers real-time visibility into the status, reliability, and performance of their [Logpush](https://developers.cloudflare.com/logs/logpush/) jobs. Health dashboards make it easier to detect delivery issues, monitor job stability, and track performance across destinations. The dashboards are divided into two sections:

* **Upload Health**: See how much data was successfully uploaded, where drops occurred, and how your jobs are performing overall. This includes data completeness, success rate, and upload volume.
* **Upload Reliability** – Diagnose issues impacting stability, retries, or latency, and monitor key metrics such as retry counts, upload duration, and destination availability.
![Health Dashboard](https://developers.cloudflare.com/_astro/Health-Dashboard.CP0mV0IW_Z1GdXr6.webp) 

Health Dashboards can be accessed from the Logpush page in the Cloudflare dashboard at the account or zone level, under the Health tab. For more details, refer to our [**Logpush Health Dashboards**](https://developers.cloudflare.com/logs/logpush/logpush-health) documentation, which includes a comprehensive troubleshooting guide to help interpret and resolve common issues.

## 2025-11-05

  
**Logpush Permission Update for Zero Trust Datasets**   

[Permissions](https://developers.cloudflare.com/logs/logpush/permissions/) for managing Logpush jobs related to [Zero Trust datasets](https://developers.cloudflare.com/logs/logpush/logpush-job/datasets/account/) (Access, Gateway, and DEX) have been updated to improve data security and enforce appropriate access controls.

To view, create, update, or delete Logpush jobs for Zero Trust datasets, users must now have both of the following permissions:

* Logs Edit
* Zero Trust: PII Read

Note

Update your UI, API or Terraform configurations to include the new permissions. Requests to Zero Trust datasets will fail due to insufficient access without the additional permission.

## 2025-10-27

  
**Azure Sentinel Connector**   

Logpush now supports integration with [Microsoft Sentinel ↗](https://www.microsoft.com/en-us/security/business/siem-and-xdr/microsoft-sentinel).The new Azure Sentinel Connector built on Microsoft’s Codeless Connector Framework (CCF), is now available. This solution replaces the previous Azure Functions-based connector, offering significant improvements in security, data control, and ease of use for customers. Logpush customers can send logs to Azure Blob Storage and configure this new Sentinel Connector to ingest those logs directly into Microsoft Sentinel.

This upgrade significantly streamlines log ingestion, improves security, and provides greater control:

* Simplified Implementation: Easier for engineering teams to set up and maintain.
* Cost Control: New support for Data Collection Rules (DCRs) allows you to filter and transform logs at ingestion time, offering potential cost savings.
* Enhanced Security: CCF provides a higher level of security compared to the older Azure Functions connector.
* Data Lake Integration: Includes native integration with Data Lake.

Find the new solution [here ↗](https://marketplace.microsoft.com/en-us/product/azure-application/cloudflare.azure-sentinel-solution-cloudflare-ccf?tab=Overview) and refer to the [Cloudflare's developer documentation ↗](https://developers.cloudflare.com/analytics/analytics-integrations/sentinel/#supported-logs:~:text=WorkBook%20fields,-Analytic%20rules)for more information on the connector, including setup steps, supported logs and Microsoft's resources.

## 2025-08-22

  
**Dedicated Egress IP for Logpush**   

Cloudflare Logpush can now deliver logs from using fixed, dedicated egress IPs. By routing Logpush traffic through a Cloudflare zone enabled with [Aegis IP](https://developers.cloudflare.com/smart-shield/configuration/dedicated-egress-ips/), your log destination only needs to allow Aegis IPs making setup more secure.

Highlights:

* Fixed egress IPs ensure your destination only accepts traffic from known addresses.
* Works with any supported Logpush destination.
* Recommended to use a dedicated zone as a proxy for easier management.

To get started, work with your Cloudflare account team to provision Aegis IPs, then configure your Logpush job to deliver logs through the proxy zone. For full setup instructions, refer to the [Logpush documentation](https://developers.cloudflare.com/logs/logpush/logpush-job/enable-destinations/egress-ip/).

## 2025-08-13

  
**IBM Cloud Logs as Logpush destination**   

Cloudflare Logpush now supports IBM Cloud Logs as a native destination.

Logs from Cloudflare can be sent to [IBM Cloud Logs ↗](https://www.ibm.com/products/cloud-logs) via [Logpush](https://developers.cloudflare.com/logs/logpush/). The setup can be done through the Logpush UI in the Cloudflare Dashboard or by using the [Logpush API](https://developers.cloudflare.com/api/resources/logpush/subresources/jobs/). The integration requires IBM Cloud Logs HTTP Source Address and an IBM API Key. The feature also allows for filtering events and selecting specific log fields.

For more information, refer to [Destination Configuration](https://developers.cloudflare.com/logs/logpush/logpush-job/enable-destinations/ibm-cloud-logs/) documentation.

## 2025-04-18

  
**Custom fields raw and transformed values support**   

Custom Fields now support logging both **raw and transformed values** for request and response headers in the HTTP requests dataset.

These fields are configured per zone and apply to all Logpush jobs in that zone that include request headers, response headers. Each header can be logged in only one format—either raw or transformed—not both.

By default:

* Request headers are logged as raw values
* Response headers are logged as transformed values

These defaults can be overridden to suit your logging needs.

Note

Transformed and raw values for request and response headers are available **only via the API** and cannot be set through the UI.

For more information refer to [Custom fields](https://developers.cloudflare.com/logs/logpush/logpush-job/custom-fields/) documentation

## 2025-03-06

  
**One-click Logpush Setup with R2 Object Storage**   

We’ve streamlined the [Logpush](https://developers.cloudflare.com/logs/logpush/) setup process by integrating R2 bucket creation directly into the Logpush workflow!

Now, you no longer need to navigate multiple pages to manually create an R2 bucket or copy credentials. With this update, you can seamlessly **configure a Logpush job to R2 in just one click**, reducing friction and making setup faster and easier.

This enhancement makes it easier for customers to adopt Logpush and R2.

For more details refer to our [Logs](https://developers.cloudflare.com/logs/logpush/logpush-job/enable-destinations/r2/) documentation.

## 2024-10-08

  
**New fields added to Gateway-related datasets in Cloudflare Logs**   

Cloudflare has introduced new fields to two Gateway-related datasets in Cloudflare Logs:

* **Gateway HTTP**: `ApplicationIDs`, `ApplicationNames`, `CategoryIDs`, `CategoryNames`, `DestinationIPContinentCode`, `DestinationIPCountryCode`, `ProxyEndpoint`, `SourceIPContinentCode`, `SourceIPCountryCode`, `VirtualNetworkID`, and `VirtualNetworkName`.
* **Gateway Network**: `ApplicationIDs`, `ApplicationNames`, `DestinationIPContinentCode`, `DestinationIPCountryCode`, `ProxyEndpoint`, `SourceIPContinentCode`, `SourceIPCountryCode`, `TransportProtocol`, `VirtualNetworkID`, and `VirtualNetworkName`.

```json
{"@context":"https://schema.org","@type":"BlogPosting","@id":"https://developers.cloudflare.com/logs/changelog/logs/#page","headline":"Logs · Cloudflare Logs docs","description":"View changelog entries for Cloudflare Logs.","url":"https://developers.cloudflare.com/logs/changelog/logs/","inLanguage":"en","image":"https://developers.cloudflare.com/core-services-preview.png","dateModified":"2026-04-23","publisher":{"@type":"Organization","name":"Cloudflare","url":"https://www.cloudflare.com/"},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"}}
{"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"item":{"@id":"/directory/","name":"Directory"}},{"@type":"ListItem","position":2,"item":{"@id":"/logs/","name":"Logs"}},{"@type":"ListItem","position":3,"item":{"@id":"/logs/changelog/","name":"Changelog"}},{"@type":"ListItem","position":4,"item":{"@id":"/logs/changelog/logs/","name":"Logs"}}]}
```
