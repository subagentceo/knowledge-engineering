---
title: Object lifecycles
description: Configure retention and storage class transition rules for objects in R2 buckets.
image: https://developers.cloudflare.com/dev-products-preview.png
---

> Documentation Index  
> Fetch the complete documentation index at: https://developers.cloudflare.com/r2/llms.txt  
> Use this file to discover all available pages before exploring further.

[Skip to content](#%5Ftop) 

# Object lifecycles

Object lifecycles determine the retention period of objects uploaded to your bucket and allow you to specify when objects should transition from Standard storage to Infrequent Access storage.

A lifecycle configuration is a collection of lifecycle rules that define actions to apply to objects during their lifetime.

For example, you can create an object lifecycle rule to delete objects after 90 days, or you can set a rule to transition objects to Infrequent Access storage after 30 days.

## Behavior

* Objects will typically be removed from a bucket within 24 hours of the `x-amz-expiration` value.
* When a lifecycle configuration is applied that deletes objects, newly uploaded objects' `x-amz-expiration` value immediately reflects the expiration based on the new rules, but existing objects may experience a delay. Most objects will be transitioned within 24 hours but may take longer depending on the number of objects in the bucket. While objects are being migrated, you may see old applied rules from the previous configuration.
* An object is no longer billable once it has been deleted.
* Buckets have a default lifecycle rule to expire multipart uploads seven days after initiation.
* When an object is transitioned from Standard storage to Infrequent Access storage, a [Class A operation](https://developers.cloudflare.com/r2/pricing/#class-a-operations) is incurred.
* When rules conflict and specify both a storage class transition and expire transition within a 24-hour period, the expire (or delete) lifecycle transition takes precedence over transitioning storage class.

## Configure lifecycle rules for your bucket

When you create an object lifecycle rule, you can specify which prefix you would like it to apply to.

* Note that object lifecycles currently has a 1000 rule maximum.
* Managing object lifecycles is a bucket-level action, and requires an API token with the [Workers R2 Storage Write](https://developers.cloudflare.com/r2/api/tokens/#permission-groups) permission group.

### Dashboard

1. In the Cloudflare dashboard, go to the **R2 object storage** page.  
[ Go to **Overview** ](https://dash.cloudflare.com/?to=/:account/r2/overview)
2. Locate and select your bucket from the list.
3. From the bucket page, select **Settings**.
4. Under **Object Lifecycle Rules**, select **Add rule**.
5. Fill out the fields for the new rule.
6. When you are done, select **Save changes**.

### Wrangler

1. Install [npm ↗](https://docs.npmjs.com/getting-started).
2. Install [Wrangler, the Developer Platform CLI](https://developers.cloudflare.com/workers/wrangler/install-and-update/).
3. Log in to Wrangler with the [wrangler login command](https://developers.cloudflare.com/workers/wrangler/commands/general/#login).
4. Add a lifecycle rule to your bucket by running the [r2 bucket lifecycle add command](https://developers.cloudflare.com/workers/wrangler/commands/r2/#r2-bucket-lifecycle-add).

Terminal window

```

npx wrangler r2 bucket lifecycle add <BUCKET_NAME> [OPTIONS]


```

Alternatively you can set the entire lifecycle configuration for a bucket from a JSON file using the [r2 bucket lifecycle set command](https://developers.cloudflare.com/workers/wrangler/commands/r2/#r2-bucket-lifecycle-set).

Terminal window

```

npx wrangler r2 bucket lifecycle set <BUCKET_NAME> --file <FILE_PATH>


```

The JSON file should be in the format of the request body of the [put object lifecycle configuration API](https://developers.cloudflare.com/api/resources/r2/subresources/buckets/subresources/lifecycle/methods/update/).

### S3 API

Below is an example of configuring a lifecycle configuration (a collection of lifecycle rules) with different sets of rules for different potential use cases.

Configure the S3 client to interact with R2

```

const client = new S3({

  endpoint: "https://<account_id>.r2.cloudflarestorage.com",

  credentials: {

    accessKeyId: "<access_key_id>",

    secretAccessKey: "<access_key_secret>",

  },

  region: "auto",

});


```

Set the lifecycle configuration for a bucket

```

await client

  .putBucketLifecycleConfiguration({

    Bucket: "testBucket",

    LifecycleConfiguration: {

      Rules: [

        // Example: deleting objects on a specific date

        // Delete 2019 documents in 2024

        {

          ID: "Delete 2019 Documents",

          Status: "Enabled",

          Filter: {

            Prefix: "2019/",

          },

          Expiration: {

            Date: new Date("2024-01-01"),

          },

        },

        // Example: transitioning objects to Infrequent Access storage by age

        // Transition objects older than 30 days to Infrequent Access storage

        {

          ID: "Transition Objects To Infrequent Access",

          Status: "Enabled",

          Transitions: [

            {

              Days: 30,

              StorageClass: "STANDARD_IA",

            },

          ],

        },

        // Example: deleting objects by age

        // Delete logs older than 90 days

        {

          ID: "Delete Old Logs",

          Status: "Enabled",

          Filter: {

            Prefix: "logs/",

          },

          Expiration: {

            Days: 90,

          },

        },

        // Example: abort all incomplete multipart uploads after a week

        {

          ID: "Abort Incomplete Multipart Uploads",

          Status: "Enabled",

          AbortIncompleteMultipartUpload: {

            DaysAfterInitiation: 7,

          },

        },

        // Example: abort user multipart uploads after a day

        {

          ID: "Abort User Incomplete Multipart Uploads",

          Status: "Enabled",

          Filter: {

            Prefix: "useruploads/",

          },

          AbortIncompleteMultipartUpload: {

            // For uploads matching the prefix, this rule will take precedence

            // over the one above due to its earlier expiration.

            DaysAfterInitiation: 1,

          },

        },

      ],

    },

  })

  .promise();


```

## Get lifecycle rules for your bucket

### Wrangler

To get the list of lifecycle rules associated with your bucket, run the [r2 bucket lifecycle list command](https://developers.cloudflare.com/workers/wrangler/commands/r2/#r2-bucket-lifecycle-list).

Terminal window

```

npx wrangler r2 bucket lifecycle list <BUCKET_NAME>


```

### S3 API

JavaScript

```

import S3 from "aws-sdk/clients/s3.js";


// Configure the S3 client to talk to R2.

const client = new S3({

  endpoint: "https://<account_id>.r2.cloudflarestorage.com",

  credentials: {

    accessKeyId: "<access_key_id>",

    secretAccessKey: "<access_key_secret>",

  },

  region: "auto",

});


// Get lifecycle configuration for bucket

console.log(

  await client

    .getBucketLifecycleConfiguration({

      Bucket: "bucketName",

    })

    .promise(),

);


```

## Delete lifecycle rules from your bucket

### Dashboard

1. In the Cloudflare dashboard, go to the **R2 object storage** page.  
[ Go to **Overview** ](https://dash.cloudflare.com/?to=/:account/r2/overview)
2. Locate and select your bucket from the list.
3. From the bucket page, select **Settings**.
4. Under **Object lifecycle rules**, select the rules you would like to delete.
5. When you are done, select **Delete rule(s)**.

### Wrangler

To remove a specific lifecycle rule from your bucket, run the [r2 bucket lifecycle remove command](https://developers.cloudflare.com/workers/wrangler/commands/r2/#r2-bucket-lifecycle-remove).

Terminal window

```

npx wrangler r2 bucket lifecycle remove <BUCKET_NAME> --id <RULE_ID>


```

### S3 API

JavaScript

```

import S3 from "aws-sdk/clients/s3.js";


// Configure the S3 client to talk to R2.

const client = new S3({

  endpoint: "https://<account_id>.r2.cloudflarestorage.com",

  credentials: {

    accessKeyId: "<access_key_id>",

    secretAccessKey: "<access_key_secret>",

  },

  region: "auto",

});


// Delete lifecycle configuration for bucket

await client

  .deleteBucketLifecycle({

    Bucket: "bucketName",

  })

  .promise();


```

```json
{"@context":"https://schema.org","@type":"TechArticle","@id":"https://developers.cloudflare.com/r2/buckets/object-lifecycles/#page","headline":"Object lifecycles · Cloudflare R2 docs","description":"Configure retention and storage class transition rules for objects in R2 buckets.","url":"https://developers.cloudflare.com/r2/buckets/object-lifecycles/","inLanguage":"en","image":"https://developers.cloudflare.com/dev-products-preview.png","dateModified":"2026-04-21","publisher":{"@type":"Organization","name":"Cloudflare","url":"https://www.cloudflare.com/"},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"}}
{"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"item":{"@id":"/directory/","name":"Directory"}},{"@type":"ListItem","position":2,"item":{"@id":"/r2/","name":"R2"}},{"@type":"ListItem","position":3,"item":{"@id":"/r2/buckets/","name":"Buckets"}},{"@type":"ListItem","position":4,"item":{"@id":"/r2/buckets/object-lifecycles/","name":"Object lifecycles"}}]}
```
