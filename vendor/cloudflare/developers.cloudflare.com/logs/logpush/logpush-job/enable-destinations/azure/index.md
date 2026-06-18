---
title: Enable Microsoft Azure
description: Push Cloudflare logs to Microsoft Azure Blob Storage.
image: https://developers.cloudflare.com/core-services-preview.png
---

> Documentation Index  
> Fetch the complete documentation index at: https://developers.cloudflare.com/logs/llms.txt  
> Use this file to discover all available pages before exploring further.

[Skip to content](#%5Ftop) 

# Enable Microsoft Azure

Cloudflare Logpush supports pushing logs directly to Microsoft Azure via the Cloudflare dashboard or via API.

Note

The [Microsoft Sentinel](https://developers.cloudflare.com/analytics/analytics-integrations/sentinel/) integration for Cloudflare is available in two connector versions.

## Manage via the Cloudflare dashboard

1. In the Cloudflare dashboard, go to the **Logpush** page at the account or or domain (also known as zone) level.  
For account: [ Go to **Logpush** ](https://dash.cloudflare.com/?to=/:account/logs)  
For domain (also known as zone): [ Go to **Logpush** ](https://dash.cloudflare.com/?to=/:account/:zone/analytics/logs)
2. Depending on your choice, you have access to [account-scoped datasets](https://developers.cloudflare.com/logs/logpush/logpush-job/datasets/account/) and [zone-scoped datasets](https://developers.cloudflare.com/logs/logpush/logpush-job/datasets/zone/), respectively.
3. Select **Create a Logpush job**.
1. In **Select a destination**, choose **Microsoft Azure**.
2. Enter or select the following destination details:  
   * **SAS URL** \- a pre-signed URL that grants access to Azure Storage resources. Refer to [Azure storage documentation ↗](https://learn.microsoft.com/en-us/azure/storage/storage-explorer/vs-azure-tools-storage-manage-with-storage-explorer?tabs=macos#shared-access-signature-sas-url) for more information on generating a SAS URL using Azure Storage Explorer. The service must be set to Blob-only (`ss=b`), and the resource type must be set to Object-only (`srt=o`).  
   * **Path** \- bucket location within the storage container  
   * **Organize logs into daily subfolders** (recommended)

When you are done entering the destination details, select **Continue**.

1. Select the dataset to push to the storage service.
2. In the next step, you need to configure your logpush job:  
   * Enter the **Job name**.  
   * Under **If logs match**, you can select the events to include and/or remove from your logs. Refer to [Filters](https://developers.cloudflare.com/logs/logpush/logpush-job/filters/) for more information. Not all datasets have this option available.  
   * In **Send the following fields**, you can choose to either push all logs to your storage destination or selectively choose which logs you want to push.
3. In **Advanced Options**, you can:  
   * Choose the format of timestamp fields in your logs (`RFC3339` (default), `Unix`, or `UnixNano`).  
   * Select a [sampling rate](https://developers.cloudflare.com/logs/logpush/logpush-job/api-configuration/#sampling-rate) for your logs or push a randomly-sampled percentage of logs.  
   * Enable redaction for `CVE-2021-44228`. This option will replace every occurrence of `${` with `x{`.
4. Select **Submit** once you are done configuring your logpush job.

## Create and get access to a Blob Storage container

Cloudflare uses a shared access signature (SAS) token to gain access to your Blob Storage container. You will need to provide `Write` permission and an expiration period of at least five years, which will allow you to not worry about the SAS token expiring.

Ensure **Log Share** permissions are enabled, before attempting to read or configure a Logpush job. For more information refer to the [Roles section](https://developers.cloudflare.com/logs/logpush/permissions/#roles).

  
To enable Logpush to Azure:

1. Create a Blob Storage container. Refer to [instructions from Azure ↗](https://docs.microsoft.com/en-us/azure/storage/blobs/storage-quickstart-blobs-portal).
2. Create a [shared access signature (SAS) ↗](https://learn.microsoft.com/en-us/azure/storage/common/storage-sas-overview) to secure and restrict access to your blob storage container. Use [Storage Explorer ↗](https://learn.microsoft.com/en-us/azure/storage/storage-explorer/vs-azure-tools-storage-manage-with-storage-explorer) to navigate to your container and right click to create a signature. Set the signature to expire at least five years from now and only provide write permission.
3. Provide the SAS URL when prompted by the Logpush API or UI.

Note

Logpush will stop pushing logs if your SAS token expires, which is why an expiration period of at least five years is required. The renewal for your SAS token needs to be done via API, updating the `destination_conf` parameter in your Logpush job.

## Troubleshooting Azure destinations

### signedResourceTypes error

When configuring an Azure destination, the SAS (Shared Access Signature) token must be set to a blob container with write-only permissions. The service must be Blob-only (`ss=b`), and the resource type must be Object-only (`srt=o`).

If the SAS token uses different settings, you will receive the following error:

```

signedResourceTypes must be Object only (srt=o)


```

To resolve this error, regenerate your SAS token using [Storage Explorer ↗](https://learn.microsoft.com/en-us/azure/storage/storage-explorer/vs-azure-tools-storage-manage-with-storage-explorer) with the correct permissions:

* Service: Blob-only (`ss=b`)
* Resource type: Object-only (`srt=o`)
* Permissions: Write-only
* Expiration: At least five years from now

```json
{"@context":"https://schema.org","@type":"TechArticle","@id":"https://developers.cloudflare.com/logs/logpush/logpush-job/enable-destinations/azure/#page","headline":"Enable Logpush to Microsoft Azure · Cloudflare Logs docs","description":"Push Cloudflare logs to Microsoft Azure Blob Storage.","url":"https://developers.cloudflare.com/logs/logpush/logpush-job/enable-destinations/azure/","inLanguage":"en","image":"https://developers.cloudflare.com/core-services-preview.png","dateModified":"2026-04-23","publisher":{"@type":"Organization","name":"Cloudflare","url":"https://www.cloudflare.com/"},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"}}
{"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"item":{"@id":"/directory/","name":"Directory"}},{"@type":"ListItem","position":2,"item":{"@id":"/logs/","name":"Logs"}},{"@type":"ListItem","position":3,"item":{"@id":"/logs/logpush/","name":"Logpush"}},{"@type":"ListItem","position":4,"item":{"@id":"/logs/logpush/logpush-job/","name":"Logpush job setup"}},{"@type":"ListItem","position":5,"item":{"@id":"/logs/logpush/logpush-job/enable-destinations/","name":"Enable destinations"}},{"@type":"ListItem","position":6,"item":{"@id":"/logs/logpush/logpush-job/enable-destinations/azure/","name":"Enable Microsoft Azure"}}]}
```
