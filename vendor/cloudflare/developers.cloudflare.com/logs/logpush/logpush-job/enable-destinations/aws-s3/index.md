---
title: Enable Amazon S3
description: Push Cloudflare logs to Amazon S3.
image: https://developers.cloudflare.com/core-services-preview.png
---

> Documentation Index  
> Fetch the complete documentation index at: https://developers.cloudflare.com/logs/llms.txt  
> Use this file to discover all available pages before exploring further.

[Skip to content](#%5Ftop) 

# Enable Amazon S3

Cloudflare Logpush supports pushing logs directly to Amazon S3 via the Cloudflare dashboard or via API. Customers that use AWS GovCloud locations should use our **S3-compatible endpoint** and not the **Amazon S3 endpoint**.

## Manage via the Cloudflare dashboard

1. In the Cloudflare dashboard, go to the **Logpush** page at the account or or domain (also known as zone) level.  
For account: [ Go to **Logpush** ](https://dash.cloudflare.com/?to=/:account/logs)  
For domain (also known as zone): [ Go to **Logpush** ](https://dash.cloudflare.com/?to=/:account/:zone/analytics/logs)
2. Depending on your choice, you have access to [account-scoped datasets](https://developers.cloudflare.com/logs/logpush/logpush-job/datasets/account/) and [zone-scoped datasets](https://developers.cloudflare.com/logs/logpush/logpush-job/datasets/zone/), respectively.
3. Select **Create a Logpush job**.
1. In **Select a destination**, choose **Amazon S3**.
2. Enter or select the following destination information:  
   * **Bucket** \- S3 bucket name  
   * **Path** \- bucket location within the storage container  
   * **Organize logs into daily subfolders** (recommended)  
   * **Bucket region**  
   * If your policy requires [AWS SSE-S3 AES256 Server Side Encryption ↗](https://docs.aws.amazon.com/AmazonS3/latest/userguide/serv-side-encryption.html).  
   * For **Grant Cloudflare access to upload files to your bucket**, make sure your bucket has a [policy ↗](https://docs.aws.amazon.com/AmazonS3/latest/userguide/example-policies-s3.html#iam-policy-ex0) (if you did not add it already):  
         * Copy the JSON policy, then go to your bucket in the Amazon S3 console and paste the policy in **Permissions** \> **Bucket Policy** and select **Save**.

When you are done entering the destination details, select **Continue**.

1. To prove ownership, Cloudflare will send a file to your designated destination. To find the token, select the **Open** button in the **Overview** tab of the ownership challenge file, then paste it into the Cloudflare dashboard to verify your access to the bucket. Enter the **Ownership Token** and select **Continue**.
2. Select the dataset to push to the storage service.
3. In the next step, you need to configure your logpush job:  
   * Enter the **Job name**.  
   * Under **If logs match**, you can select the events to include and/or remove from your logs. Refer to [Filters](https://developers.cloudflare.com/logs/logpush/logpush-job/filters/) for more information. Not all datasets have this option available.  
   * In **Send the following fields**, you can choose to either push all logs to your storage destination or selectively choose which logs you want to push.
4. In **Advanced Options**, you can:  
   * Choose the format of timestamp fields in your logs (`RFC3339` (default), `Unix`, or `UnixNano`).  
   * Select a [sampling rate](https://developers.cloudflare.com/logs/logpush/logpush-job/api-configuration/#sampling-rate) for your logs or push a randomly-sampled percentage of logs.  
   * Enable redaction for `CVE-2021-44228`. This option will replace every occurrence of `${` with `x{`.
5. Select **Submit** once you are done configuring your logpush job.

## Create and get access to an S3 bucket

Cloudflare uses Amazon Identity and Access Management (IAM) to gain access to your S3 bucket. The Cloudflare IAM user needs `PutObject` permission for the bucket.

Logs are written into that bucket as gzipped objects using the S3 Access Control List (ACL)`Bucket-owner-full-control` permission.

For illustrative purposes, imagine that you want to store logs in the bucket `burritobot`, in the `logs` directory. The S3 URL would then be `s3://burritobot/logs`.

Ensure **Log Share** permissions are enabled, before attempting to read or configure a Logpush job. For more information refer to the [Roles section](https://developers.cloudflare.com/logs/logpush/permissions/#roles).

  
To enable Logpush to Amazon S3:

1. Create an S3 bucket. Refer to [instructions from Amazon ↗](https://docs.aws.amazon.com/AmazonS3/latest/gsg/CreatingABucket.html).  
Note  
Buckets in China regions (`cn-north-1`, `cn-northwest-1`) are currently not supported.
2. Edit and paste the policy below into **S3** \> **Bucket** \> **Permissions** \> **Bucket Policy**, replacing the `Resource` value with your own bucket path. The `AWS` `Principal` is owned by Cloudflare and should not be changed.

```

{

  "Id": "<POLICY_ID>",

  "Version": "2012-10-17",

  "Statement": [

    {

      "Sid": "Stmt1506627150918",

      "Action": ["s3:PutObject"],

      "Effect": "Allow",

      "Resource": "arn:aws:s3:::burritobot/logs/*",

      "Principal": {

        "AWS": ["arn:aws:iam::391854517948:user/cloudflare-logpush"]

      }

    }

  ]

}


```

Note

Logpush uses multipart upload for S3\. Aborted uploads will result in incomplete files remaining in your bucket. To minimize your storage costs, Amazon recommends configuring a lifecycle rule using the `AbortIncompleteMultipartUpload` action. Refer to [Uploading and copying objects using multipart upload ↗](https://docs.aws.amazon.com/AmazonS3/latest/dev/mpuoverview.html#mpu-abort-incomplete-mpu-lifecycle-config).

```json
{"@context":"https://schema.org","@type":"TechArticle","@id":"https://developers.cloudflare.com/logs/logpush/logpush-job/enable-destinations/aws-s3/#page","headline":"Enable Logpush to Amazon S3 · Cloudflare Logs docs","description":"Push Cloudflare logs to Amazon S3.","url":"https://developers.cloudflare.com/logs/logpush/logpush-job/enable-destinations/aws-s3/","inLanguage":"en","image":"https://developers.cloudflare.com/core-services-preview.png","dateModified":"2026-04-23","publisher":{"@type":"Organization","name":"Cloudflare","url":"https://www.cloudflare.com/"},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"}}
{"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"item":{"@id":"/directory/","name":"Directory"}},{"@type":"ListItem","position":2,"item":{"@id":"/logs/","name":"Logs"}},{"@type":"ListItem","position":3,"item":{"@id":"/logs/logpush/","name":"Logpush"}},{"@type":"ListItem","position":4,"item":{"@id":"/logs/logpush/logpush-job/","name":"Logpush job setup"}},{"@type":"ListItem","position":5,"item":{"@id":"/logs/logpush/logpush-job/enable-destinations/","name":"Enable destinations"}},{"@type":"ListItem","position":6,"item":{"@id":"/logs/logpush/logpush-job/enable-destinations/aws-s3/","name":"Enable Amazon S3"}}]}
```
