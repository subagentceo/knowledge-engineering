---
title: Sippy
description: Incrementally migrate objects to R2 on-demand as they are requested, reducing egress fees.
image: https://developers.cloudflare.com/dev-products-preview.png
---

> Documentation Index  
> Fetch the complete documentation index at: https://developers.cloudflare.com/r2/llms.txt  
> Use this file to discover all available pages before exploring further.

[Skip to content](#%5Ftop) 

# Sippy

Sippy is a data migration service that allows you to copy data from other cloud providers to R2 as the data is requested, without paying unnecessary cloud egress fees typically associated with moving large amounts of data.

Migration-specific egress fees are reduced by leveraging requests within the flow of your application where you would already be paying egress fees to simultaneously copy objects to R2.

## How it works

When enabled for an R2 bucket, Sippy implements the following migration strategy across [Workers](https://developers.cloudflare.com/r2/api/workers/), [S3 API](https://developers.cloudflare.com/r2/api/s3/), and [public buckets](https://developers.cloudflare.com/r2/buckets/public-buckets/):

* When an object is requested, it is served from your R2 bucket if it is found.
* If the object is not found in R2, the object will simultaneously be returned from your source storage bucket and copied to R2.
* All other operations, including put and delete, continue to work as usual.

## When is Sippy useful?

Using Sippy as part of your migration strategy can be a good choice when:

* You want to start migrating your data, but you want to avoid paying upfront egress fees to facilitate the migration of your data all at once.
* You want to experiment by serving frequently accessed objects from R2 to eliminate egress fees, without investing time in data migration.
* You have frequently changing data and are looking to conduct a migration while avoiding downtime. Sippy can be used to serve requests while [Super Slurper](https://developers.cloudflare.com/r2/data-migration/super-slurper/) can be used to migrate your remaining data.

If you are looking to migrate all of your data from an existing cloud provider to R2 at one time, we recommend using [Super Slurper](https://developers.cloudflare.com/r2/data-migration/super-slurper/).

## Get started with Sippy

Before getting started, you will need:

* An existing R2 bucket. If you don't already have one, refer to [Create buckets](https://developers.cloudflare.com/r2/buckets/create-buckets/).
* [API credentials](https://developers.cloudflare.com/r2/data-migration/sippy/#create-credentials-for-storage-providers) for your source object storage bucket.
* (Wrangler only) Cloudflare R2 Access Key ID and Secret Access Key with read and write permissions. For more information, refer to [Authentication](https://developers.cloudflare.com/r2/api/tokens/).

### Enable Sippy via the Dashboard

1. In the Cloudflare dashboard, go to the **R2 object storage** page.  
[ Go to **Overview** ](https://dash.cloudflare.com/?to=/:account/r2/overview)
2. Select the bucket you'd like to migrate objects to.
3. Switch to the **Settings** tab, then scroll down to the **On Demand Migration** card.
4. Select **Enable** and enter details for the AWS / GCS bucket you'd like to migrate objects from. The credentials you enter must have permissions to read from this bucket. Cloudflare also recommends scoping your credentials to only allow reads from this bucket.
5. Select **Enable**.

### Enable Sippy via Wrangler

#### Set up Wrangler

To begin, install [npm ↗](https://docs.npmjs.com/getting-started). Then [install Wrangler, the Developer Platform CLI](https://developers.cloudflare.com/workers/wrangler/install-and-update/).

#### Enable Sippy on your R2 bucket

Log in to Wrangler with the [wrangler login command](https://developers.cloudflare.com/workers/wrangler/commands/general/#login). Then run the [r2 bucket sippy enable command](https://developers.cloudflare.com/workers/wrangler/commands/r2/#r2-bucket-sippy-enable):

Terminal window

```

npx wrangler r2 bucket sippy enable <BUCKET_NAME>


```

This will prompt you to select between supported object storage providers and lead you through setup.

### Enable Sippy via API

For information on required parameters and examples of how to enable Sippy, refer to the [API documentation](https://developers.cloudflare.com/api/resources/r2/subresources/buckets/subresources/sippy/methods/update/). For information about getting started with the Cloudflare API, refer to [Make API calls](https://developers.cloudflare.com/fundamentals/api/how-to/make-api-calls/).

Note

If your bucket is setup with [jurisdictional restrictions](https://developers.cloudflare.com/r2/reference/data-location/#jurisdictional-restrictions), you will need to pass a `cf-r2-jurisdiction` request header with that jurisdiction. For example, `cf-r2-jurisdiction: eu`.

### View migration metrics

When enabled, Sippy exposes metrics that help you understand the progress of your ongoing migrations.

| Metric                   | Description                                                                                                                                                    |
| ------------------------ | -------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Requests served by Sippy | The percentage of overall requests served by R2 over a period of time. A higher percentage indicates that fewer requests need to be made to the source bucket. |
| Data migrated by Sippy   | The amount of data that has been copied from the source bucket to R2 over a period of time. Reported in bytes.                                                 |

To view current and historical metrics:

1. In the Cloudflare dashboard, go to the **R2 object storage** page.  
[ Go to **Overview** ](https://dash.cloudflare.com/?to=/:account/r2/overview)
2. Select your bucket.
3. Select the **Metrics** tab.

You can optionally select a time window to query. This defaults to the last 24 hours.

## Disable Sippy on your R2 bucket

### Dashboard

1. In the Cloudflare dashboard, go to the **R2 object storage** page.  
[ Go to **Overview** ](https://dash.cloudflare.com/?to=/:account/r2/overview)
2. Select the bucket you'd like to disable Sippy for.
3. Switch to the **Settings** tab and scroll down to the **On Demand Migration** card.
4. Press **Disable**.

### Wrangler

To disable Sippy, run the [r2 bucket sippy disable command](https://developers.cloudflare.com/workers/wrangler/commands/r2/#r2-bucket-sippy-disable):

Terminal window

```

npx wrangler r2 bucket sippy disable <BUCKET_NAME>


```

### API

For more information on required parameters and examples of how to disable Sippy, refer to the [API documentation](https://developers.cloudflare.com/api/resources/r2/subresources/buckets/subresources/sippy/methods/delete/).

## Supported cloud storage providers

Cloudflare currently supports copying data from the following cloud object storage providers to R2:

* Amazon S3
* Google Cloud Storage (GCS)

## R2 API interactions

When Sippy is enabled, it changes the behavior of certain actions on your R2 bucket across [Workers](https://developers.cloudflare.com/r2/api/workers/), [S3 API](https://developers.cloudflare.com/r2/api/s3/), and [public buckets](https://developers.cloudflare.com/r2/buckets/public-buckets/).

| Action       | New behavior                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                        |
| ------------ | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| GetObject    | Calls to GetObject will first attempt to retrieve the object from your R2 bucket. If the object is not present, the object will be served from the source storage bucket and simultaneously uploaded to the requested R2 bucket.Additional considerations:Modifications to objects in the source bucket will not be reflected in R2 after the initial copy. Once an object is stored in R2, it will not be re-retrieved and updated.Only user-defined metadata that is prefixed by x-amz-meta- in the HTTP response will be migrated. Remaining metadata will be omitted.For larger objects (greater than 199 MiB), multiple GET requests may be required to fully copy the object to R2.If there are multiple simultaneous GET requests for an object which has not yet been fully copied to R2, Sippy may fetch the object from the source storage bucket multiple times to serve those requests. |
| HeadObject   | Behaves similarly to GetObject, but only retrieves object metadata. Will not copy objects to the requested R2 bucket.                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                               |
| PutObject    | No change to behavior. Calls to PutObject will add objects to the requested R2 bucket.                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                              |
| DeleteObject | No change to behavior. Calls to DeleteObject will delete objects in the requested R2 bucket.Additional considerations:If deletes to objects in R2 are not also made in the source storage bucket, subsequent GetObject requests will result in objects being retrieved from the source bucket and copied to R2.                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                     |

Actions not listed above have no change in behavior. For more information, refer to [Workers API reference](https://developers.cloudflare.com/r2/api/workers/workers-api-reference/) or [S3 API compatibility](https://developers.cloudflare.com/r2/api/s3/api/).

## Create credentials for storage providers

### Amazon S3

To copy objects from Amazon S3, Sippy requires access permissions to your bucket. While you can use any AWS Identity and Access Management (IAM) user credentials with the correct permissions, Cloudflare recommends you create a user with a narrow set of permissions.

To create credentials with the correct permissions:

1. Log in to your AWS IAM account.
2. Create a policy with the following format and replace `<BUCKET_NAME>` with the bucket you want to grant access to:  
```  
{  
  "Version": "2012-10-17",  
  "Statement": [  
    {  
      "Effect": "Allow",  
      "Action": ["s3:ListBucket*", "s3:GetObject*"],  
      "Resource": [  
        "arn:aws:s3:::<BUCKET_NAME>",  
        "arn:aws:s3:::<BUCKET_NAME>/*"  
      ]  
    }  
  ]  
}  
```
3. Create a new user and attach the created policy to that user.

You can now use both the Access Key ID and Secret Access Key when enabling Sippy.

### Google Cloud Storage

To copy objects from Google Cloud Storage (GCS), Sippy requires access permissions to your bucket. Cloudflare recommends using the Google Cloud predefined `Storage Object Viewer` role.

To create credentials with the correct permissions:

1. Log in to your Google Cloud console.
2. Go to **IAM & Admin** \> **Service Accounts**.
3. Create a service account with the predefined `Storage Object Viewer` role.
4. Go to the **Keys** tab of the service account you created.
5. Select **Add Key** \> **Create a new key** and download the JSON key file.

You can now use this JSON key file when enabling Sippy via Wrangler or API.

## Caveats

### ETags

While R2's ETag generation is compatible with S3's during the regular course of operations, ETags are not guaranteed to be equal when an object is migrated using Sippy. Sippy makes autonomous decisions about the operations it uses when migrating objects to optimize for performance and network usage. It may choose to migrate an object in multiple parts, which affects [ETag calculation](https://developers.cloudflare.com/r2/objects/upload-objects/#etags).

For example, a 320 MiB object originally uploaded to S3 using a single `PutObject` operation might be migrated to R2 via multipart operations. In this case, its ETag on R2 will not be the same as its ETag on S3\. Similarly, an object originally uploaded to S3 using multipart operations might also have a different ETag on R2 if the part sizes Sippy chooses for its migration differ from the part sizes this object was originally uploaded with.

Relying on matching ETags before and after the migration is therefore discouraged.

```json
{"@context":"https://schema.org","@type":"TechArticle","@id":"https://developers.cloudflare.com/r2/data-migration/sippy/#page","headline":"Sippy · Cloudflare R2 docs","description":"Incrementally migrate objects to R2 on-demand as they are requested, reducing egress fees.","url":"https://developers.cloudflare.com/r2/data-migration/sippy/","inLanguage":"en","image":"https://developers.cloudflare.com/dev-products-preview.png","dateModified":"2026-04-21","publisher":{"@type":"Organization","name":"Cloudflare","url":"https://www.cloudflare.com/"},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"}}
{"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"item":{"@id":"/directory/","name":"Directory"}},{"@type":"ListItem","position":2,"item":{"@id":"/r2/","name":"R2"}},{"@type":"ListItem","position":3,"item":{"@id":"/r2/data-migration/","name":"Data migration"}},{"@type":"ListItem","position":4,"item":{"@id":"/r2/data-migration/sippy/","name":"Sippy"}}]}
```
