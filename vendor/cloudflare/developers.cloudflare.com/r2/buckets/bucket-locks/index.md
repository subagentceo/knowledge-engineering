---
title: Bucket locks
description: Prevent deletion and overwriting of R2 objects by enabling bucket lock retention policies.
image: https://developers.cloudflare.com/dev-products-preview.png
---

> Documentation Index  
> Fetch the complete documentation index at: https://developers.cloudflare.com/r2/llms.txt  
> Use this file to discover all available pages before exploring further.

[Skip to content](#%5Ftop) 

# Bucket locks

Bucket locks prevent the deletion and overwriting of objects in an R2 bucket for a specified period — or indefinitely. When enabled, bucket locks enforce retention policies on your objects, helping protect them from accidental or premature deletions.

## Get started with bucket locks

Before getting started, you will need:

* An existing R2 bucket. If you do not already have an existing R2 bucket, refer to [Create buckets](https://developers.cloudflare.com/r2/buckets/create-buckets/).
* (API only) An API token with [permissions](https://developers.cloudflare.com/r2/api/tokens/#permissions) to edit R2 bucket configuration.

### Enable bucket lock via dashboard

1. In the Cloudflare dashboard, go to the **R2 object storage** page.  
[ Go to **Overview** ](https://dash.cloudflare.com/?to=/:account/r2/overview)
2. Select the bucket you would like to add bucket lock rule to.
3. Switch to the **Settings** tab, then scroll down to the **Bucket lock rules** card.
4. Select **Add rule** and enter the rule name, prefix, and retention period.
5. Select **Save changes**.

### Enable bucket lock via Wrangler

1. Install [npm ↗](https://docs.npmjs.com/getting-started).
2. Install [Wrangler, the Developer Platform CLI](https://developers.cloudflare.com/workers/wrangler/install-and-update/).
3. Log in to Wrangler with the [wrangler login command](https://developers.cloudflare.com/workers/wrangler/commands/general/#login).
4. Add a bucket lock rule to your bucket by running the [r2 bucket lock add command](https://developers.cloudflare.com/workers/wrangler/commands/r2/#r2-bucket-lock-add).

Terminal window

```

npx wrangler r2 bucket lock add <BUCKET_NAME> [OPTIONS]


```

Alternatively, you can set the entire bucket lock configuration for a bucket from a JSON file using the [r2 bucket lock set command](https://developers.cloudflare.com/workers/wrangler/commands/r2/#r2-bucket-lock-set).

Terminal window

```

npx wrangler r2 bucket lock set <BUCKET_NAME> --file <FILE_PATH>


```

The JSON file should be in the format of the request body of the [put bucket lock configuration API](https://developers.cloudflare.com/api/resources/r2/subresources/buckets/subresources/locks/methods/update/).

### Enable bucket lock via API

For information about getting started with the Cloudflare API, refer to [Make API calls](https://developers.cloudflare.com/fundamentals/api/how-to/make-api-calls/). For information on required parameters and more examples of how to set bucket lock configuration, refer to the [API documentation](https://developers.cloudflare.com/api/resources/r2/subresources/buckets/subresources/locks/methods/update/).

Below is an example of setting a bucket lock configuration (a collection of rules):

Terminal window

```

curl -X PUT "https://api.cloudflare.com/client/v4/accounts/<ACCOUNT_ID>/r2/buckets/<BUCKET_NAME>/lock" \

    -H "Authorization: Bearer <API_TOKEN>" \

    -H "Content-Type: application/json" \

    -d '{

        "rules": [

            {

                "id": "lock-logs-7d",

                "enabled": true,

                "prefix": "logs/",

                "condition": {

                    "type": "Age",

                    "maxAgeSeconds": 604800

                }

            },

            {

                "id": "lock-images-indefinite",

                "enabled": true,

                "prefix": "images/",

                "condition": {

                    "type": "Indefinite"

                }

            }

        ]

    }'


```

This request creates two rules:

* `lock-logs-7d`: Objects under the `logs/` prefix are retained for 7 days (604800 seconds).
* `lock-images-indefinite`: Objects under the `images/` prefix are locked indefinitely.

Note

If your bucket is setup with [jurisdictional restrictions](https://developers.cloudflare.com/r2/reference/data-location/#jurisdictional-restrictions), you will need to pass a `cf-r2-jurisdiction` request header with that jurisdiction. For example, `cf-r2-jurisdiction: eu`.

## Get bucket lock rules for your R2 bucket

### Dashboard

1. In the Cloudflare dashboard, go to the **R2 object storage** page.  
[ Go to **Overview** ](https://dash.cloudflare.com/?to=/:account/r2/overview)
2. Select the bucket you would like to add bucket lock rule to.
3. Switch to the **Settings** tab, then scroll down to the **Bucket lock rules** card.

### Wrangler

To list bucket lock rules, run the [r2 bucket lock list command](https://developers.cloudflare.com/workers/wrangler/commands/r2/#r2-bucket-lock-list):

Terminal window

```

npx wrangler r2 bucket lock list <BUCKET_NAME>


```

### API

For more information on required parameters and examples of how to get bucket lock rules, refer to the [API documentation](https://developers.cloudflare.com/api/resources/r2/subresources/buckets/subresources/locks/methods/get/).

## Remove bucket lock rules from your R2 bucket

### Dashboard

1. In the Cloudflare dashboard, go to the **R2 object storage** page.  
[ Go to **Overview** ](https://dash.cloudflare.com/?to=/:account/r2/overview)
2. Select the bucket you would like to add bucket lock rule to.
3. Switch to the **Settings** tab, then scroll down to the **Bucket lock rules** card.
4. Locate the rule you want to remove, select the `...` icon next to it, and then select **Delete**.

### Wrangler

To remove a bucket lock rule, run the [r2 bucket lock remove command](https://developers.cloudflare.com/workers/wrangler/commands/r2/#r2-bucket-lock-remove):

Terminal window

```

npx wrangler r2 bucket lock remove <BUCKET_NAME> --id <RULE_ID>


```

### API

To remove bucket lock rules via API, exclude them from your updated configuration and use the [put bucket lock configuration API](https://developers.cloudflare.com/api/resources/r2/subresources/buckets/subresources/locks/methods/update/).

## Bucket lock rules

A bucket lock configuration can include up to 1,000 rules. Each rule specifies which objects it covers (via prefix) and how long those objects must remain locked. You can:

* Lock objects for a specific duration. For example, 90 days.
* Retain objects until a certain date. For example, until January 1, 2026.
* Keep objects locked indefinitely.

If multiple rules apply to the same prefix or object key, the strictest (longest) retention requirement takes precedence.

## Notes

* Rules without prefix apply to all objects in the bucket.
* Rules apply to both new and existing objects in the bucket.
* Bucket lock rules take precedence over [lifecycle rules](https://developers.cloudflare.com/r2/buckets/object-lifecycles/). For example, if a lifecycle rule attempts to delete an object at 30 days but a bucket lock rule requires it be retained for 90 days, the object will not be deleted until the 90-day requirement is met.
* A bucket cannot be emptied while any bucket lock rules are configured. Remove all lock rules before [emptying a bucket](https://developers.cloudflare.com/r2/buckets/delete-buckets/#empty-a-bucket). Bucket lock rules also apply when [deleting folders](https://developers.cloudflare.com/r2/objects/delete-objects/) from the dashboard.

```json
{"@context":"https://schema.org","@type":"TechArticle","@id":"https://developers.cloudflare.com/r2/buckets/bucket-locks/#page","headline":"Bucket locks · Cloudflare R2 docs","description":"Prevent deletion and overwriting of R2 objects by enabling bucket lock retention policies.","url":"https://developers.cloudflare.com/r2/buckets/bucket-locks/","inLanguage":"en","image":"https://developers.cloudflare.com/dev-products-preview.png","dateModified":"2026-04-30","publisher":{"@type":"Organization","name":"Cloudflare","url":"https://www.cloudflare.com/"},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"}}
{"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"item":{"@id":"/directory/","name":"Directory"}},{"@type":"ListItem","position":2,"item":{"@id":"/r2/","name":"R2"}},{"@type":"ListItem","position":3,"item":{"@id":"/r2/buckets/","name":"Buckets"}},{"@type":"ListItem","position":4,"item":{"@id":"/r2/buckets/bucket-locks/","name":"Bucket locks"}}]}
```
