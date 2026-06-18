---
title: Sentinel
description: Ingest Cloudflare logs into Microsoft Sentinel.
image: https://developers.cloudflare.com/core-services-preview.png
---

> Documentation Index  
> Fetch the complete documentation index at: https://developers.cloudflare.com/analytics/llms.txt  
> Use this file to discover all available pages before exploring further.

[Skip to content](#%5Ftop) 

# Sentinel

Cloudflare has integrations with Microsoft Sentinel to make analyzing your Cloudflare data easier and in a centralized space. Cloudflare has two versions of this connector available. We recommend utilizing the latest Codeless Connector integration as it provides easier setup, cost management, and integrates with [Sentinel Data Lake ↗](https://learn.microsoft.com/en-us/azure/sentinel/datalake/sentinel-lake-overview).

**[Sentinel CCF Solution ↗](https://marketplace.microsoft.com/en-us/product/azure-application/cloudflare.azure-sentinel-solution-cloudflare-ccf?tab=Overview)** (recommended): The Codeless Connector Framework (CCF) provides partners, advanced users, and developers the ability to create custom connectors for ingesting data to Microsoft Sentinel.

**[Sentinel Function Based Connector ↗](https://azuremarketplace.microsoft.com/en-us/marketplace/apps/cloudflare.cloudflare%5Fsentinel?tab=Overview)**: The Cloudflare connector for Microsoft Sentinel uses [Azure Functions ↗](https://azure.microsoft.com/en-us/products/functions) to process security logs from Cloudflare's Logpush service and ingest them directly into the SIEM platform.

This guide provides clear, step-by-step instructions for integrating Cloudflare logs with the new CCF connector for Microsoft Sentinel using Azure Blob Storage. By following these steps, you will be able to securely collect, store, and analyse your Cloudflare logs within Microsoft Sentinel, enhancing your organisation's security monitoring and incident response capabilities.

## Step 1: Prerequisites

* Azure Subscription with permission to create and manage resources (Contributor/Owner role recommended).
* Microsoft Sentinel Workspace already set up in your Azure environment.
* Azure Storage Account with a Blob container for storing Cloudflare logs.
* Cloudflare Account with access to the domain whose logs you wish to export, and permission to configure Logpush jobs.

## Step 2: Set up a logpush job

1. Log in to the [Cloudflare dashboard ↗](https://dash.cloudflare.com/), and select your account and domain.
2. Go to **Analytics** \> **Logs** and select **Logpush**.
3. Select **Create Logpush Job**. Choose the log type you want to export (for example, **HTTP requests**).
4. For the destination, select **Azure Blob Storage**.
5. Enter your Azure Blob Storage details:  
   * SAS Token (Shared Access Signature)  
To generate a SAS token from the Azure portal, first navigate to your storage account. Under the **Data Storage** section, select **Containers** and choose the relevant container. Within the settings, locate and select **Shared access signature**. Configure the required permissions, such as `write` and `create`, and specify the start and expiration dates for the token. Once configured, generate the SAS token accordingly.
6. Save and activate the Logpush job.

For complete details, refer to the [Cloudflare Logpush to Azure documentation](https://developers.cloudflare.com/logs/logpush/logpush-job/enable-destinations/azure/).

## Step 3: Configure Azure and deploy the Data Connector in Microsoft Sentinel

1. Log in to the Azure Portal and go to your **Microsoft Sentinel** workspace.
2. Select **Content Hub** in the navigation bar and search for **Cloudflare**.
3. Select the **Cloudflare** solution from the results.
4. Select **Install** in the right pane.
5. In your **Sentinel workspace**, go to **Data connectors**.
6. Search for the **Cloudflare connector** (may appear as **Cloudflare (using Azure Blob Storage)**).
7. Select the connector to configure it.
![Azure portal](https://developers.cloudflare.com/_astro/azure-portal.DumVF0xP_1Jxd4n.webp) 

## Step 4: Fill out required fields

When configuring the Cloudflare data connector, you will need to provide the following information:

* Blob container URL

To obtain the container URL within your Azure storage account, access the Azure Portal and navigate to your storage account. Under **Data Storage**, select **Containers**, then choose the relevant container receiving logs from Cloudflare. The container properties section will display the URL link.

* Resource group name for the storage account
* Storage account location
* Subscription ID
* Event grid topic name (only if reconfiguring; not needed for initial setup)

After entering all information, select **Connect**.

Ensure all fields are correctly filled to enable seamless log ingestion.

![Configuration fields](https://developers.cloudflare.com/_astro/configuration.ypRscF1K_pXKb5.webp) 

## Step 5: Complete deployment

1. Select **Apply changes** or **Connect** to finalise the connector setup.
2. Monitor the Data connectors page in Sentinel to confirm that the Cloudflare connector status is **Connected**.
3. Verify that Cloudflare logs are appearing in your Sentinel workspace under **Log Analytics** \> **Logs**.
4. If logs are not appearing, review your Blob Storage permissions, Cloudflare Logpush configuration, and Sentinel connector settings.
![Data connectors](https://developers.cloudflare.com/_astro/data-connectors.By58rEfp_2e4kQf.webp) 

By following these steps, you have successfully integrated Cloudflare logs with Microsoft Sentinel using Azure Blob Storage. This integration enables advanced security analytics and incident response capabilities for your Cloudflare-protected environments. If you encounter issues, review each configuration step, check permissions, and review Microsoft's official documentation.

![Cloudflare traffic overview](https://developers.cloudflare.com/_astro/traffic-overview.C9qSRy0T_iH49l.webp) 

## Supported Logs

We support the following fields to be utilized within the Sentinel Connectors (CCF & Function based). You can push all log fields to Azure using our logpush function as described in [Enable Microsoft Azure](https://developers.cloudflare.com/logs/logpush/logpush-job/enable-destinations/azure/) documentation.

Parser fields

ClientDeviceType  
Source  
ClientSSLCipher  
ClientTlsCipher  
ClientSSLProtocol  
ClientTlsProtocol  
FirewallMatchesActions  
Event  
FirewallMatchesRuleIDs  
RuleID  
ClientRequestBytes  
ClientBytes  
ClientSrcPort  
ClientPort  
EdgeResponseBytes  
OriginBytes  
BotScore  
BotScoreSrc  
CacheCacheStatus  
CacheResponseBytes  
CacheResponseStatus  
CacheTieredFill  
ClientASN  
ClientCountry  
ClientIP  
ClientIPClass  
ClientRequestHost  
ClientRequestMethod  
ClientRequestPath  
ClientRequestProtocol  
ClientRequestReferer  
ClientRequestURI  
ClientRequestUserAgent  
ClientXRequestedWith  
EdgeColoCode  
EdgeColoID  
EdgeEndTimestamp  
EdgePathingOp  
EdgePathingSrc  
EdgePathingStatus  
EdgeRateLimitAction  
EdgeRateLimitID  
EdgeRequestHost  
EdgeResponseCompressionRatio  
EdgeResponseContentType  
EdgeResponseStatus  
EdgeServerIP  
EdgeStartTimestamp  
FirewallMatchesSources  
OriginIP  
OriginResponseBytes  
OriginResponseHTTPExpires  
OriginResponseHTTPLastModified  
OriginResponseStatus  
OriginResponseTime  
OriginSSLProtocol  
ParentRayID  
RayID  
SecurityLevel  
WAFAction  
WAFFlags  
WAFMatchedVar  
WAFProfile  
WAFRuleID  
WAFRuleMessage  
WorkerCPUTime  
WorkerStatus  
WorkerSubrequest  
WorkerSubrequestCount  
ZoneID  
Application  
ClientMatchedIpFirewall  
ClientProto  
ClientTcpRtt  
ClientTlsClientHelloServerName  
ClientTlsStatus  
ColoCode  
ConnectTimestamp  
DisconnectTimestamp  
IpFirewall  
OriginPort  
OriginProto  
OriginTcpRtt  
OriginTlsCipher  
OriginTlsFingerprint  
OriginTlsMode  
OriginTlsProtocol  
OriginTlsStatus  
ProxyProtocol  
Status  
Timestamp  
ClientASNDescription  
ClientRefererHost  
ClientRefererPath  
ClientRefererQuery  
ClientRefererScheme  
ClientRequestQuery  
ClientRequestScheme  
Datetime  
Kind  
MatchIndex  
OriginatorRayID  
TimeGenerated  

WorkBook fields

ClientCountry\_s  
ClientDeviceType\_s  
ClientIP\_s  
ClientIPClass\_s  
ClientRequestMethod\_s  
ClientRequestProtocol\_s  
ClientRequestReferer\_s  
ClientRequestURI\_s  
ClientRequestUserAgent\_s  
EdgePathingOp\_s  
EdgePathingSrc\_s  
EdgePathingStatus\_s  
EdgeResponseContentType\_s  
threat  
TimeGenerated  
EdgePathingSrc\_s  
EdgePathingOp\_s  
EdgePathingStatus\_s  
EdgeResponseStatus\_d  
OriginResponseStatus\_d  
TimeGenerated  

Analytic rules

ClientIPClass  
SrcIpAddr  
ClientRequestURI  
HttpUserAgentOriginal  
HttpRequestMethod  
TimeGenerated  
SrcGeoCountry  
ClientRequestURI  
HttpRequestMethod  
HttpStatusCode  
DstBytes  
SrcBytes  
WAFRuleID  
WAFRuleMessage  
WAFAction  

Hunting queries

TimeGenerated  
HttpStatusCode  
SrcIpAddr  
ClientRequestURI  
ClientTlsStatus  
HttpUserAgentOriginal  
OriginTlsStatus  
NetworkRuleName  
EdgeRequestHost  
SrcGeoCountry  
EdgeResponseStatus  
ClientCountry  
ClientDeviceType  
status  
OriginResponseStatus  
WorkerSubrequest  
http\_method  
dest\_ip  
dest\_host  
uri\_path  
http\_user\_agent  
status  
src\_ip  
OriginResponseStatus  
RayID  
WorkerSubrequest  
http\_method  
bytes\_out  
bytes\_cached\_requests  
threat  
ClientRequestProtocol  
http\_referrer  
ClientIPClass  
cf\_http\_status\_codes  
http\_content\_type  
cf\_http\_status\_codes  
cached\_requests  
CacheCacheStatus  
ClientASN  
EdgePathingSrc  
EdgePathingOp  
EdgePathingStatus  
ClientRequestUserAgent  
SecurityAction  
SecurityRuleID  
SecurityRuleDescription  

## Resources

[Download Cloudflare's CCF Sentinel Solution ↗](https://marketplace.microsoft.com/en-us/product/azure-application/cloudflare.azure-sentinel-solution-cloudflare-ccf?tab=Overview)  
[Microsoft Data Lake Overview ↗](https://learn.microsoft.com/en-us/azure/sentinel/datalake/sentinel-lake-overview)  
[About the CCF Platform ↗](https://learn.microsoft.com/en-us/azure/sentinel/create-codeless-connector)

```json
{"@context":"https://schema.org","@type":"TechArticle","@id":"https://developers.cloudflare.com/analytics/analytics-integrations/sentinel/#page","headline":"Sentinel · Cloudflare Analytics docs","description":"Ingest Cloudflare logs into Microsoft Sentinel.","url":"https://developers.cloudflare.com/analytics/analytics-integrations/sentinel/","inLanguage":"en","image":"https://developers.cloudflare.com/core-services-preview.png","dateModified":"2026-04-23","publisher":{"@type":"Organization","name":"Cloudflare","url":"https://www.cloudflare.com/"},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"}}
{"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"item":{"@id":"/directory/","name":"Directory"}},{"@type":"ListItem","position":2,"item":{"@id":"/analytics/","name":"Analytics"}},{"@type":"ListItem","position":3,"item":{"@id":"/analytics/analytics-integrations/","name":"Analytics integrations"}},{"@type":"ListItem","position":4,"item":{"@id":"/analytics/analytics-integrations/sentinel/","name":"Sentinel"}}]}
```
