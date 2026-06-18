---
title: Splunk
description: This tutorial explains how to analyze Cloudflare Logs using the Cloudflare App for Splunk.
image: https://developers.cloudflare.com/core-services-preview.png
---

> Documentation Index  
> Fetch the complete documentation index at: https://developers.cloudflare.com/analytics/llms.txt  
> Use this file to discover all available pages before exploring further.

[Skip to content](#%5Ftop) 

# Splunk

This tutorial explains how to analyze [Cloudflare Logs ↗](https://www.cloudflare.com/products/cloudflare-logs/) using the [Cloudflare App for Splunk ↗](https://splunkbase.splunk.com/app/4501/).

## Prerequisites

Before sending your Cloudflare log data to Splunk, ensure that you:

* Have an existing Splunk Enterprise or Cloud account
* Have a Cloudflare Enterprise account
* Consult the [Splunk documentation ↗](https://splunkbase.splunk.com/app/4501/) for the Cloudflare App

## Task 1 - Install and Configure the Cloudflare App for Splunk

To install the [Cloudflare App for Splunk ↗](https://splunkbase.splunk.com/app/4501/):

1. Log in to your Splunk instance.
2. Under **Apps** \> **Find More Apps**, search for _Cloudflare App for Splunk._
3. Click **Install**.
![Splunk website with Apps menu expanded and Search & Reporting menu item along with Cloudflare App for Splunk](https://developers.cloudflare.com/_astro/splunk-cloudflare-app-for-splunk.CSImDJTK_Z1O8qyE.webp) 
1. Restart and reopen your Splunk instance.
2. Edit the `cloudflare:json` source type in the Cloudflare App for Splunk. To edit the source type:  
   1. Click the **Settings** dropdown and select **Source types**.  
   2. Uncheck **Show only popular** and search for _cloudflare_.  
   3. Click **Edit** and change the Regex expression to `([\r\n]+)`.  
   4. Save your edits.
3. Create an index on Splunk to store the HTTP Event logs. To create an index:  
   1. Open the setup screen by clicking the **Settings** dropdown, then click **Indexes**.  
   2. Select **New Index**. Note that the **Indexes** page also gives you the status of all your existing indexes so that you can see whether you're about to use up your licensed amount of space.  
   3. Name the index **cloudflare**, which is the default index that the Cloudflare App will use.
4. Set up the HTTP Event Collector (HEC) on Splunk. To create an HEC:  
   1. Click the **Settings** dropdown and select **Data inputs**.  
   2. Click **+Add new** and follow the wizard. When prompted, submit the following responses:  
         * Name: Cloudflare  
         * Source Type: Select > "cloudflare:json"  
         * App Context: Cloudflare App for Splunk (cloudflare)  
         * Index: cloudflare  
   3. At the end of the wizard you will see a **Token Value**. This token authorizes the Cloudflare Logpush job to send data to your Splunk instance. If you forget to copy it now, Splunk allows you to get the value at any time.
5. Verify whether Splunk is using a self-signed certificate. You'll need this information when creating the Logpush job.
6. Determine the endpoint to use to send the data to. The endpoint should be:

```

"<protocol>://input-<host>:<port>/<endpoint>" or "<protocol>://http-inputs-<host>:<port>/<endpoint>"


```

Where:

* `protocol`: HTTP or HTTPS
* `input`: `input` or `http-inputs` based on whether you have a self-service or managed cloud plan
* `host`: The hostname of your Splunk instance. The easiest way to determine the hostname is to look at the URL you went to when you logged in to Splunk.
* `port`: 443 or 8088
* `endpoint`: services/collector/raw

For example: `https://prd-p-0qk3h.splunkcloud.com:8088/services/collector/raw`. Refer to the [Splunk Documentation ↗](https://docs.splunk.com/Documentation/SplunkCloud/latest/Data/UsetheHTTPEventCollector) for more details and examples.

**Post Installation Notes**

You can change the **Index Name** after the initial configuration by clicking on the **Settings** dropdown and navigating to **Advanced search**. There you can select **Search macros** and look for the Cloudflare App for Splunk.

![Splunk interface highlighting Apps menu and Manage Apps option along with Enable Acceleration checkbox](https://developers.cloudflare.com/_astro/splunk-settings-advanced-search-search-macros.Bt1szjjM_WDiER.webp) 

The Cloudflare App for Splunk comes with a custom Cloudflare Data Model that has an acceleration time frame of 1 day but is not accelerated by default. If you enable [Data Model acceleration ↗](https://docs.splunk.com/Documentation/Splunk/latest/Knowledge/Acceleratedatamodels), we recommend that the Data Model is only accelerated for 1 or 7 days to ensure there are no adverse effects within your Splunk environment.

Enable or disable acceleration after the initial configuration by accessing the app Set up page by clicking the **Apps** dropdown, then **Manage Apps** \> **Cloudflare Set Up**.

![Splunk Advanced Search page highlighted Search macros and Advanced search](https://developers.cloudflare.com/_astro/splunk-apps-manage-apps-cloudflare-set-up-enable-data-model-acceleration.KQW0iwYr_4acu7.webp) 

You can also manually configure Data Models by going to **Settings** \> **Data models**. Learn more about data model acceleration in the [Splunk documentation ↗](https://docs.splunk.com/Documentation/Splunk/latest/Knowledge/Acceleratedatamodels).

## Task 2 - Make the API call to create the Logpush job

Create the Logpush job by following the instructions on [Enable Logpush to Splunk](https://developers.cloudflare.com/logs/logpush/logpush-job/enable-destinations/splunk/). The API call creates a Logpush job but does not enable it.

Enable the Logpush job through the Cloudflare dashboard or through the API by following the instructions on [Enable Logpush to Splunk](https://developers.cloudflare.com/logs/logpush/logpush-job/enable-destinations/splunk/). To enable through the dashboard:

1. Navigate to the Cloudflare dashboard and select **Analytics & Logs** \> **Logs**.
2. Select **Edit** and select the fields referenced in the Dashboard section below to fully populate all tables and graphs.
3. Enable the Logpush job by toggling on the switch next to the Edit link. Data takes a few minutes to populate.

To validate that you are receiving data, search `index=cloudflare` in Splunk.

## Task 3 - View the Dashboards

You can analyze Cloudflare logs with the thirteen (13) dashboards listed below.

You can use filters within these dashboards to help narrow the analysis by date and time, device type, country, user agent, client IP, hostname, and more to further help with debugging and tracing.

### About the Dashboards

The following dashboards outlined below are available as part of the Cloudflare App for Splunk.

#### Cloudflare - Snapshot

![Splunk dashboard with Web Traffic Overview metrics](https://developers.cloudflare.com/_astro/splunk-cloudflare-snapshot-dashboard.Du4lsJw__hYMt8.webp) 

#### Cloudflare - Reliability

![Splunk dashboard with a high level summary of Reliability metrics](https://developers.cloudflare.com/_astro/splunk-cloudflare-reliability-summary-dashboard.C1py_8XX_Zupzyv.webp) ![Splunk dashboard with a detailed summary of Reliability metrics](https://developers.cloudflare.com/_astro/splunk-cloudflare-reliability-detailed-dashboard.jeSlAQnq_1qkyMx.webp) 

#### Cloudflare - Security

![Splunk dashboard with an overview of Security metrics](https://developers.cloudflare.com/_astro/splunk-cloudflare-security-overview.D-c4Punh_Z1C8EgV.webp) ![Splunk dashboard with an overview of Security metrics for WAF](https://developers.cloudflare.com/_astro/splunk-cloudflare-security-waf-dashboard.DTZrF-bl_lB5WH.webp) ![Splunk dashboard with an overview of Security metrics for Rate Limiting](https://developers.cloudflare.com/_astro/splunk-cloudflare-security-rate-limiting-dashboard.CRoUKWVc_ZVMcdn.webp) ![Splunk dashboard with a high level summary of Security metrics for Bots](https://developers.cloudflare.com/_astro/splunk-cloudflare-security-bot-summary-dashboard.S5k4rphZ_19QyUS.webp) ![Splunk dashboard with a detailed summary of Security metrics for Bots](https://developers.cloudflare.com/_astro/splunk-cloudflare-security-bots-detailed-dashboard.x_RSBUYB_T6P0y.webp) 

#### Cloudflare - Performance

![Splunk dashboard with Performance metrics for Requests and Cache](https://developers.cloudflare.com/_astro/splunk-cloudflare-performance-requests-and-cache-dashboard.CzCMXwsS_Z2rsU7q.webp) ![Splunk dashboard with Performance metrics for Bandwidth](https://developers.cloudflare.com/_astro/splunk-cloudflare-performance-bandwidth-dashboard.B0Io0qTc_257Rz.webp) 

_Hostname, Content Type, Request Methods, Connection Type_: Get insights into your most popular hostnames, most requested content types, breakdown of request methods, and connection type.

![Splunk dashboard with Cloudflare Performance metrics including for Hostname, Content Type, Request Methods, Connection Type](https://developers.cloudflare.com/_astro/splunk-cloudflare-performance-hostname-dashboard.BNc0Yvsw_ZRXqjX.webp) ![Splunk dashboard with Cloudflare Performance metrics for Static vs. Dynamic Content](https://developers.cloudflare.com/_astro/splunk-cloudflare-performance-static-vs-dynamic-dashboard.Dx9F5klY_ZXDTlD.webp) 

### Filters

All dashboard have a set of filters that you can apply to the entire dashboard, as shown in the following example. Filters are applied across the entire dashboard.

![Available dashboard filters from the Splunk dashboard](https://developers.cloudflare.com/_astro/splunk-filters.D7I8q-lv_ZQe0Nh.webp) 

You can use filters to drill down and examine the data at a granular level. Filters include client country, client device type, client IP, client request host, client request URI, client request user agent, edge response status, origin IP, and origin response status.

The default time interval is set to 24 hours. Note that for correct calculations filter will need to exclude Worker subrequests (**WorkerSubrequest** \= _false_) and purge requests (**ClientRequestMethod** is not _PURGE_).

Available Filters:

* Time Range (EdgeStartTimestamp)
* Client Country
* Client Device type
* Client IP
* Client Request Host
* Client Request URI
* Client Request User Agent
* Edge response status
* Origin IP
* Origin Response Status
* RayID
* Worker Subrequest
* Client Request Method

## Debugging tips

### Incomplete dashboards

The Splunk Cloudflare App relies on data from the Cloudflare Enterprise Logs fields outlined below. Depending on which fields you have enabled, certain dashboards might not populate fully.

If that is the case, verify and test the Cloudflare App filters below each dashboard (these filters are the same across all dashboards). You can delete any filters that you do not need, even if such filters include data fields already contained in your logs.

Also, you could compare the list of fields you are getting in Cloudflare Logs with the fields listed in **Splunk** \> **Settings** \> **Data Model** \> **Cloudflare**.

The available fields are:

* CacheCacheStatus
* CacheResponseBytes
* CacheResponseStatus (deprecated)
* ClientASN
* ClientCountry
* ClientDeviceType
* ClientIP
* ClientIPClass
* ClientRequestBytes
* ClientRequestHost
* ClientRequestMethod
* ClientRequestPath
* ClientRequestProtocol
* ClientRequestReferer
* ClientRequestURI
* ClientRequestUserAgent
* ClientSSLCipher
* ClientSSLProtocol
* ClientSrcPort
* EdgeColoCode
* EdgeColoID
* EdgeEndTimestamp
* EdgePathingOp
* EdgePathingSrc
* EdgePathingStatus
* EdgeRequestHost
* EdgeResponseBytes
* EdgeResponseContentType
* EdgeResponseStatus
* EdgeServerIP
* EdgeStartTimestamp
* OriginIP
* OriginResponseStatus
* OriginResponseTime
* OriginSSLProtocol
* RayID
* SecurityAction
* SecurityActions
* SecurityRuleDescription
* SecurityRuleID
* SecurityRuleIDs
* SecuritySources
* WAFFlags
* WAFMatchedVar
* WorkerSubrequest
* ZoneID

```json
{"@context":"https://schema.org","@type":"TechArticle","@id":"https://developers.cloudflare.com/analytics/analytics-integrations/splunk/#page","headline":"Splunk · Cloudflare Analytics docs","description":"This tutorial explains how to analyze Cloudflare Logs using the Cloudflare App for Splunk.","url":"https://developers.cloudflare.com/analytics/analytics-integrations/splunk/","inLanguage":"en","image":"https://developers.cloudflare.com/core-services-preview.png","dateModified":"2026-05-05","publisher":{"@type":"Organization","name":"Cloudflare","url":"https://www.cloudflare.com/"},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"}}
{"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"item":{"@id":"/directory/","name":"Directory"}},{"@type":"ListItem","position":2,"item":{"@id":"/analytics/","name":"Analytics"}},{"@type":"ListItem","position":3,"item":{"@id":"/analytics/analytics-integrations/","name":"Analytics integrations"}},{"@type":"ListItem","position":4,"item":{"@id":"/analytics/analytics-integrations/splunk/","name":"Splunk"}}]}
```
