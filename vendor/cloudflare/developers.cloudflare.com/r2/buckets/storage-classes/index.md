---
title: Storage classes
description: Choose between R2 Standard and Infrequent Access storage to optimize cost and access patterns.
image: https://developers.cloudflare.com/dev-products-preview.png
---

> Documentation Index  
> Fetch the complete documentation index at: https://developers.cloudflare.com/r2/llms.txt  
> Use this file to discover all available pages before exploring further.

[Skip to content](#%5Ftop) 

# Storage classes

Storage classes allow you to trade off between the cost of storage and the cost of accessing data. Every object stored in R2 has an associated storage class.

All storage classes share the following characteristics:

* Compatible with Workers API, S3 API, and public buckets.
* 99.999999999% (eleven 9s) of annual durability.
* No minimum object size.

## Available storage classes

| Storage class     | Minimum storage duration | Data retrieval fees (processing) | Egress fees (data transfer to Internet) |
| ----------------- | ------------------------ | -------------------------------- | --------------------------------------- |
| Standard          | None                     | None                             | None                                    |
| Infrequent Access | 30 days                  | Yes                              | None                                    |

For more information on how storage classes impact pricing, refer to [Pricing](https://developers.cloudflare.com/r2/pricing/).

### Standard storage

Standard storage is designed for data that is accessed frequently. This is the default storage class for new R2 buckets unless otherwise specified.

#### Example use cases

* Website and application data
* Media content (e.g., images, video)
* Storing large datasets for analysis and processing
* AI training data
* Other workloads involving frequently accessed data

### Infrequent Access storage

Infrequent Access storage is ideal for data that is accessed less frequently. This storage class offers lower storage cost compared to Standard storage, but includes [retrieval fees](https://developers.cloudflare.com/r2/pricing/#data-retrieval) and a 30 day [minimum storage duration](https://developers.cloudflare.com/r2/pricing/#minimum-storage-duration) requirement.

Note

For objects stored in Infrequent Access storage, you will be charged for the object for the minimum storage duration even if the object was deleted, moved, or replaced before the specified duration.

#### Example use cases

* Long-term data archiving (for example, logs and historical records needed for compliance)
* Data backup and disaster recovery
* Long tail user-generated content

## Set default storage class for buckets

By setting the default storage class for a bucket, all objects uploaded into the bucket will automatically be assigned the selected storage class unless otherwise specified. Default storage class can be changed after bucket creation in the Dashboard.

To learn more about creating R2 buckets, refer to [Create new buckets](https://developers.cloudflare.com/r2/buckets/create-buckets/).

## Set storage class for objects

### Specify storage class during object upload

To learn more about how to specify the storage class for new objects, refer to the [Workers API](https://developers.cloudflare.com/r2/api/workers/) and [S3 API](https://developers.cloudflare.com/r2/api/s3/) documentation.

### Use object lifecycle rules to transition objects to Infrequent Access storage

Note

Once an object is stored in Infrequent Access, it cannot be transitioned to Standard Access using lifecycle policies.

To learn more about how to transition objects from Standard storage to Infrequent Access storage, refer to [Object lifecycles](https://developers.cloudflare.com/r2/buckets/object-lifecycles/).

## Change storage class for objects

You can change the storage class of an object which is already stored in R2 using the [CopyObject API ↗](https://docs.aws.amazon.com/AmazonS3/latest/API/API%5FCopyObject.html).

Use the `x-amz-storage-class` header to change between `STANDARD` and `STANDARD_IA`.

An example of switching an object from `STANDARD` to `STANDARD_IA` using `aws cli` is shown below:

Terminal window

```

aws s3api copy-object \

  --endpoint-url https://<ACCOUNT_ID>.r2.cloudflarestorage.com \

  --bucket bucket-name \

  --key path/to/object.txt \

  --copy-source /bucket-name/path/to/object.txt \

  --storage-class STANDARD_IA


```

* Refer to [aws CLI](https://developers.cloudflare.com/r2/examples/aws/aws-cli/) for more information on using `aws CLI`.
* Refer to [object-level operations](https://developers.cloudflare.com/r2/api/s3/api/#object-level-operations) for the full list of object-level API operations with R2-compatible S3 API.

```json
{"@context":"https://schema.org","@type":"TechArticle","@id":"https://developers.cloudflare.com/r2/buckets/storage-classes/#page","headline":"Storage classes · Cloudflare R2 docs","description":"Choose between R2 Standard and Infrequent Access storage to optimize cost and access patterns.","url":"https://developers.cloudflare.com/r2/buckets/storage-classes/","inLanguage":"en","image":"https://developers.cloudflare.com/dev-products-preview.png","dateModified":"2026-04-21","publisher":{"@type":"Organization","name":"Cloudflare","url":"https://www.cloudflare.com/"},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"}}
{"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"item":{"@id":"/directory/","name":"Directory"}},{"@type":"ListItem","position":2,"item":{"@id":"/r2/","name":"R2"}},{"@type":"ListItem","position":3,"item":{"@id":"/r2/buckets/","name":"Buckets"}},{"@type":"ListItem","position":4,"item":{"@id":"/r2/buckets/storage-classes/","name":"Storage classes"}}]}
```
