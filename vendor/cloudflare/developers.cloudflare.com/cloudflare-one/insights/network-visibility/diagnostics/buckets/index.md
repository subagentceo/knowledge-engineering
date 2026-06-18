---
title: Buckets
description: Configure cloud storage buckets for full packet captures.
image: https://developers.cloudflare.com/zt-preview.png
---

> Documentation Index  
> Fetch the complete documentation index at: https://developers.cloudflare.com/cloudflare-one/llms.txt  
> Use this file to discover all available pages before exploring further.

[Skip to content](#%5Ftop) 

# Buckets

Before you can begin a full packet capture, you must configure a cloud storage bucket where Cloudflare can write the captured traffic data. Setting up a bucket is not required for sample packet captures, which complete immediately and can be downloaded directly from the API.

You can configure an Amazon S3 or Google Cloud Platform bucket to use as a target. You can also [use R2](#r2) as a target using the API.

## Set up a bucket

Learn how to set up a bucket for use with full packet captures.

* [ Dashboard ](#tab-panel-7192)
* [ API ](#tab-panel-7193)

1. In the [Cloudflare One ↗](https://one.dash.cloudflare.com) dashboard, go to **Network visibility** \> **Diagnostics**.
2. Select the **Buckets** tab > **Add a bucket**.
3. Select a bucket service and select **Next**.
4. Enter the information related to your bucket for your service provider.
5. When you are done, select **Next**.

The **Prove ownership** step of the **Bucket configuration** displays.

Before you can begin using a bucket, you must first enable destinations. Follow the destination setup steps for your provider, then return here to validate ownership.

Refer to the [Amazon S3](https://developers.cloudflare.com/logs/logpush/logpush-job/enable-destinations/aws-s3/#create-and-get-access-to-an-s3-bucket) or [Google Cloud Storage](https://developers.cloudflare.com/logs/logpush/logpush-job/enable-destinations/google-cloud-storage/#create-and-get-access-to-a-gcs-bucket) documentation and follow the steps for those specific services.

Next, validate the bucket and confirm ownership.

## Validate a bucket

After the initial bucket setup, you need to confirm you have access to the bucket via an ownership challenge. This verification prevents Cloudflare from writing capture data to a bucket you do not control. After you validate your bucket, you can begin using it to collect full packet captures.

* [ Dashboard ](#tab-panel-7194)
* [ API ](#tab-panel-7195)

1. From the **Prove ownership** step of the **Bucket configuration**, locate the **Ownership token** field.
2. Find the ownership challenge file that Cloudflare placed in your bucket, copy its contents, and enter them in the **Ownership token** field.
3. When you are done, select **Create**. The **Packet captures** page displays.

The **Buckets** tab displays a list of the buckets associated with your account. Refer to the **Status** column to see the status of your bucket configuration.

The `bucket` field should be the URI of the bucket. For Amazon S3, the `bucket` field is in the form `s3://<bucket-name>/<directory>?region=<bucket-region>`, and for Google Cloud Storage the form is `gs://<bucket-name>/<directory>`.

Ownership challenge request example

```

curl https://api.cloudflare.com/client/v4/accounts/{account_id}/pcaps/ownership \

--header "X-Auth-Email: <EMAIL>" \

--header "X-Auth-Key: <API_KEY>" \

--header "Content-Type: application/json" \

--data '{

  "destination_conf": "'${bucket}'"

}'


```

The response has a `"filename"` parameter which contains the content of the `ownership-challenge` text. Find the file in your bucket and copy the contents of the file.

Ownership challenge response example

```

{

  "result": {

    "id": "cc20c2d6c62e11ecbe646b173af3b6b9",

    "status": "pending",

    "submitted": "2022-04-22T18:54:13.397413Z",

    "validated": "",

    "destination_conf": "gs://bucket-test", // Ensure you use a bucket that you created and registered in the Cloudflare dashboard.

    "filename": "ownership-challenge-1234.txt"

  },

  "success": true,

  "errors": [],

  "messages": []

}


```

Validate the bucket by inserting the copied text in the `ownership_text` below:

Bucket validation example

```

curl https://api.cloudflare.com/client/v4/accounts/{account_id}/pcaps/ownership/validate \

--header "X-Auth-Email: <EMAIL>" \

--header "X-Auth-Key: <API_KEY>" \

--header "Content-Type: application/json" \

--data '{

  "destination_conf": "'${bucket}'",

  "ownership_challenge": "'${ownership_text}'"

}'


```

Bucket validation response

```

{

  "result": {

    "id": "cc20c2d6c62e11ecbe646b173af3b6b9",

    "status": "success",

    "submitted": "2022-04-22T18:54:13.397413Z",

    "validated": "2022-04-27T14:54:46.440548Z",

    "destination_conf": "gs://<bucket-name>", // Ensure you use a bucket that you created and registered in the Cloudflare dashboard

    "filename": "ownership-challenge-1234.txt"

  },

  "success": true,

  "errors": [],

  "messages": []

}


```

If the `status` shows `success`, the bucket is configured and ready to use.

The bucket status displays one of the following options:

* **Success:** The bucket is fully verified and ready to use.
* **Pending:** The challenge response was initiated but is pending verification. Bucket verification can take five to ten minutes to finish processing.
* **Failed:** The bucket could not be validated. If this occurs, verify that Cloudflare has write access to your bucket and that you submitted the correct contents of the ownership challenge file.

## List configured buckets

View a list of all buckets configured on your account.

* [ Dashboard ](#tab-panel-7196)
* [ API ](#tab-panel-7197)

1. In the [Cloudflare One ↗](https://one.dash.cloudflare.com) dashboard, go to _**Insights** \> Network visibility_ \> **Diagnostics**.
2. Select the **Buckets** tab.

The list of buckets associated with your account displays.

Bucket list request example

```

curl https://api.cloudflare.com/client/v4/accounts/{account_id}/pcaps/ownership \

--header "X-Auth-Email: <EMAIL>" \

--header "X-Auth-Key: <API_KEY>"


```

Bucket list response example

```

{

  "result": [

    {

      "id": "9a993aa6c58711ec89d3037647342e63",

      "status": "success",

      "submitted": "2022-04-26T16:58:24.550762Z",

      "validated": "2022-04-26T17:01:18.426458Z",

      "destination_conf": "s3://test-bucket?region=us-east-1",

      "filename": "ownership-challenge-1234.txt"

    }

  ],

  "success": true,

  "errors": [],

  "messages": []

}


```

To learn how to collect packet captures, refer to [Collect packet captures](https://developers.cloudflare.com/cloudflare-network-firewall/packet-captures/collect-pcaps/).

## R2

You can also use [Cloudflare R2](https://developers.cloudflare.com/r2/) as a storage destination for packet captures. R2 bucket configuration is available through the API only.

Note

When you validate an R2 bucket, exclude the `access-key-id` and `secret-access-key` parameters from the `destination_conf` URL. Only include them in the initial registration request.

### Create bucket and API token

1. In the Cloudflare dashboard, go to the **R2** page.  
[ Go to **Overview** ](https://dash.cloudflare.com/?to=/:account/r2/overview)
2. Select **Create bucket**.
3. Give your bucket a name > **Create bucket**.
4. Go to the R2 Overview page, and select **Manage R2 API Tokens**.
5. Select **Create API Token**.
6. In **Permissions**, choose **Object Read & Write**. Make sure you also select **Apply to specific buckets only**, and select the bucket you have created for PCAPs from the drop-down menu.
7. Select **Create API Token**.
8. Make sure you copy the **Secret Access Key** and **Access Key ID** values, as you will need them for the next step.

### Create initial request

Create your initial request to R2:

Terminal window

```

curl https://api.cloudflare.com/client/v4/accounts/{account_id}/pcaps/ownership \

--header "X-Auth-Email: <EMAIL>" \

--header "X-Auth-Key: <API_KEY>" \

--header "Content-Type: application/json" \

--data '{

  "destination_conf": "r2://<BUCKET_NAME>?account-id=<ACCOUNT_ID>&access-key-id=<R2_ACCESS_KEY_ID>&secret-access-key=<R2_SECRET_ACCESS_KEY>"

}'


```

The [response](https://developers.cloudflare.com/api/resources/magic%5Ftransit/subresources/pcaps/subresources/ownership/methods/create/) has a `"filename"` parameter with the name of a file that Cloudflare wrote to your R2 bucket. You need to download it for the next step. Example:

```

{

  "errors": [],

  "messages": [],

  "result": {

    "destination_conf": "<YOUR_R2_BUCKET>",

    "filename": "ownership-challenge-9883874ecac311ec8475433579a6bf5f.txt",

    "id": "9883874ecac311ec8475433579a6bf5f",

    "status": "success",

    "submitted": "2020-01-01T08:00:00Z",

    "validated": "2020-01-01T08:00:00Z"

  },

  "success": true

}


```

### Validate bucket ownership

Refer to the [Validate a bucket](#validate-a-bucket) API instructions for more details on the entire process to [validate your R2 bucket](https://developers.cloudflare.com/api/resources/magic%5Ftransit/subresources/pcaps/subresources/ownership/methods/validate/). When specifying the R2 destination for this validation, exclude the secret and access keys from the URL.

```json
{"@context":"https://schema.org","@type":"TechArticle","@id":"https://developers.cloudflare.com/cloudflare-one/insights/network-visibility/diagnostics/buckets/#page","headline":"Buckets · Cloudflare One docs","description":"Configure cloud storage buckets for full packet captures.","url":"https://developers.cloudflare.com/cloudflare-one/insights/network-visibility/diagnostics/buckets/","inLanguage":"en","image":"https://developers.cloudflare.com/zt-preview.png","dateModified":"2026-04-29","publisher":{"@type":"Organization","name":"Cloudflare","url":"https://www.cloudflare.com/"},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"},"keywords":["S3"]}
{"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"item":{"@id":"/directory/","name":"Directory"}},{"@type":"ListItem","position":2,"item":{"@id":"/cloudflare-one/","name":"Cloudflare One"}},{"@type":"ListItem","position":3,"item":{"@id":"/cloudflare-one/insights/","name":"Insights"}},{"@type":"ListItem","position":4,"item":{"@id":"/cloudflare-one/insights/network-visibility/","name":"Network visibility"}},{"@type":"ListItem","position":5,"item":{"@id":"/cloudflare-one/insights/network-visibility/diagnostics/","name":"Diagnostics"}},{"@type":"ListItem","position":6,"item":{"@id":"/cloudflare-one/insights/network-visibility/diagnostics/buckets/","name":"Buckets"}}]}
```
