---
title: Use Cloudflare R2 as a Zero Trust log destination
description: This tutorial covers how to build a Cloudflare R2 bucket to store Zero Trust logs. It also shows how to connect the bucket to the Zero Trust Logpush service.
image: https://developers.cloudflare.com/zt-preview.png
---

> Documentation Index  
> Fetch the complete documentation index at: https://developers.cloudflare.com/cloudflare-one/llms.txt  
> Use this file to discover all available pages before exploring further.

[Skip to content](#%5Ftop) 

# Use Cloudflare R2 as a Zero Trust log destination

**Last reviewed:**  over 2 years ago 

Note

Only available on Zero Trust Enterprise plans.

This tutorial covers how to build a [Cloudflare R2 bucket](https://developers.cloudflare.com/r2/buckets/) to store logs, and how to connect the bucket to the Zero Trust [Logpush service](https://developers.cloudflare.com/cloudflare-one/insights/logs/logpush/) to store logs persistently and export them into other tools.

## Before you begin

* Ensure Cloudflare R2 and the Zero Trust Logpush integration are included in your plan. For more information, contact your account team.

## Create a Cloudflare R2 bucket

1. In the [Cloudflare dashboard ↗](https://dash.cloudflare.com/), go to the **R2 Overview** page.  
[ Go to **Overview** ](https://dash.cloudflare.com/?to=/:account/r2/overview)
2. Select **Create bucket**.
3. Enter an identifiable name for the bucket, then select **Create bucket**.

## Create an R2 API token

1. Return to **R2**, then select **Manage R2 API tokens**.
2. Select **Create API token**.
3. In **Permissions**, select **Object Read & Write**.
4. In **Specify bucket(s)**, choose _Apply to specific buckets only_. Select the bucket you created.
5. Configure other token settings to your preferences.
6. Select **Create API Token**.
7. Copy the **Access Key ID**, **Secret Access Key**, and endpoint URL values. You will not be able to access these values again.
8. Select **Finish**.

## Connect a Zero Trust Logpush job

1. In [Cloudflare One ↗](https://one.dash.cloudflare.com/), go to **Insights** \> **Logs**. Select **Manage Logpush**.
2. Select **Connect a service**.
3. Choose which data sets and fields you want to send to your bucket. Select **Next**.
4. Select **S3 Compatible**.
5. In **S3 Compatible Bucket Path**, enter the name of your bucket.
6. In **Bucket region**, enter `auto`.
7. Enter the values for **Access Key ID**, **Secret Access Key**, and **Endpoint URL** in their corresponding fields.
8. Select **Push**. If prompted, you do not need to prove ownership with a token challenge.

The Logpush job will send the selected Zero Trust logs to your R2 bucket.

```json
{"@context":"https://schema.org","@type":"TechArticle","@id":"https://developers.cloudflare.com/cloudflare-one/tutorials/r2-logs/#page","headline":"Use Cloudflare R2 as a Zero Trust log destination · Cloudflare One docs","description":"This tutorial covers how to build a Cloudflare R2 bucket to store Zero Trust logs. It also shows how to connect the bucket to the Zero Trust Logpush service.","url":"https://developers.cloudflare.com/cloudflare-one/tutorials/r2-logs/","inLanguage":"en","image":"https://developers.cloudflare.com/zt-preview.png","dateModified":"2026-03-02","publisher":{"@type":"Organization","name":"Cloudflare","url":"https://www.cloudflare.com/"},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"},"keywords":["Logging"]}
{"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"item":{"@id":"/directory/","name":"Directory"}},{"@type":"ListItem","position":2,"item":{"@id":"/cloudflare-one/","name":"Cloudflare One"}},{"@type":"ListItem","position":3,"item":{"@id":"/cloudflare-one/tutorials/","name":"Tutorials"}},{"@type":"ListItem","position":4,"item":{"@id":"/cloudflare-one/tutorials/r2-logs/","name":"Use Cloudflare R2 as a Zero Trust log destination"}}]}
```
