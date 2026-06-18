---
title: Delete buckets
description: Empty all objects from an R2 bucket and permanently delete it.
image: https://developers.cloudflare.com/dev-products-preview.png
---

> Documentation Index  
> Fetch the complete documentation index at: https://developers.cloudflare.com/r2/llms.txt  
> Use this file to discover all available pages before exploring further.

[Skip to content](#%5Ftop) 

# Delete buckets

To delete an R2 bucket, you must first remove all objects from it. Once the bucket is empty, you can delete it.

## Empty a bucket

Emptying a bucket deletes every object inside it. The bucket itself and its configuration (lifecycle rules, CORS, event notifications, custom domains) are preserved.

Objects removed during this process cannot be recovered. If your bucket has [bucket lock rules](https://developers.cloudflare.com/r2/buckets/bucket-locks/), you must remove them before emptying the bucket.

You can empty a bucket in various ways.

### Dashboard

The dashboard provides an **Empty Bucket** action that handles this for you, regardless of how many objects the bucket contains. For large buckets, the operation runs in the background and the dashboard displays progress until all objects have been removed.

1. In the Cloudflare dashboard, go to the **R2 object storage** page.  
[ Go to **Overview** ](https://dash.cloudflare.com/?to=/:account/r2/overview)
2. Select the bucket you want to empty.
3. Go to the **Settings** tab.
4. Scroll to the **Empty Bucket** section.
5. Select **Empty**.
6. Confirm the action in the dialog that appears.

Warning

Emptying a bucket is irreversible. All objects in the bucket are permanently deleted.

### Object lifecycle rules

You can configure an [object lifecycle rule](https://developers.cloudflare.com/r2/buckets/object-lifecycles/) that expires all objects in the bucket.

1. Add a lifecycle rule with no prefix filter and an expiration of 1 day.
2. Wait for the rule to take effect. Objects are typically removed within 24 hours, but large buckets may take longer.
3. After the bucket is empty, remove the lifecycle rule.

Note

Objects uploaded while the lifecycle rule is active are also subject to expiration. Remove the rule as soon as the bucket is empty to avoid deleting new objects.

#### Wrangler

Add a lifecycle rule that expires all objects after 1 day:

Terminal window

```

npx wrangler r2 bucket lifecycle add <BUCKET_NAME> --expire-days 1


```

After the bucket is empty, remove the rule:

Terminal window

```

npx wrangler r2 bucket lifecycle remove <BUCKET_NAME> --id <RULE_ID>


```

For the full list of lifecycle commands, refer to [Wrangler R2 commands](https://developers.cloudflare.com/workers/wrangler/commands/r2/#r2-bucket-lifecycle-add).

You can also configure lifecycle rules using the S3 API or the dashboard. For more information, refer to [Object lifecycles](https://developers.cloudflare.com/r2/buckets/object-lifecycles/).

### Other approaches

You can also write a script that lists and deletes objects in batches using the [S3 API](https://developers.cloudflare.com/r2/api/s3/api/) or [Workers API](https://developers.cloudflare.com/r2/api/workers/workers-api-usage/), or use [rclone](https://developers.cloudflare.com/r2/examples/rclone/) to remove objects from the command line.

## Delete a bucket

Once a bucket is empty, you can permanently delete it. Deleting a bucket removes the bucket and all of its configuration, including lifecycle rules, CORS settings, event notifications, and custom domains.

You can delete a bucket in various ways.

### Dashboard

1. In the Cloudflare dashboard, go to the **R2 object storage** page.  
[ Go to **Overview** ](https://dash.cloudflare.com/?to=/:account/r2/overview)
2. Select the bucket you want to delete.
3. Go to the **Settings** tab.
4. Scroll to the **Delete Bucket** section. If the bucket is not empty, select **Empty Bucket** first to clear all objects.
5. Select **Delete**.
6. Confirm the action in the dialog that appears.

### Wrangler

Use the [r2 bucket delete](https://developers.cloudflare.com/workers/wrangler/commands/r2/#r2-bucket-delete) command to delete an empty bucket:

Terminal window

```

npx wrangler r2 bucket delete <BUCKET_NAME>


```

The command fails if the bucket still contains objects. Empty the bucket before running this command.

### API

Use the [delete bucket API endpoint](https://developers.cloudflare.com/api/resources/r2/subresources/buckets/methods/delete/) to delete an empty bucket:

Terminal window

```

curl -X DELETE "https://api.cloudflare.com/client/v4/accounts/<ACCOUNT_ID>/r2/buckets/<BUCKET_NAME>" \

  -H "Authorization: Bearer <API_TOKEN>"


```

If the bucket is in a [jurisdiction](https://developers.cloudflare.com/r2/reference/data-location/#jurisdictional-restrictions), include the `cf-r2-jurisdiction` header:

Terminal window

```

curl -X DELETE "https://api.cloudflare.com/client/v4/accounts/<ACCOUNT_ID>/r2/buckets/<BUCKET_NAME>" \

  -H "Authorization: Bearer <API_TOKEN>" \

  -H "cf-r2-jurisdiction: eu"


```

## Behavior

* A bucket must be completely empty before it can be deleted. Attempting to delete a bucket that contains objects returns an error.
* You cannot empty a bucket that has [bucket lock rules](https://developers.cloudflare.com/r2/buckets/bucket-locks/). Remove all lock rules before emptying the bucket.
* [Event notifications](https://developers.cloudflare.com/r2/buckets/event-notifications/) configured on the bucket are removed when the bucket is deleted.
* If you use a [custom domain](https://developers.cloudflare.com/r2/buckets/public-buckets/#custom-domains) with the bucket, remove the domain association before or after deletion to avoid dangling DNS records.

## Related resources

[ Delete objects ](https://developers.cloudflare.com/r2/objects/delete-objects/) Delete individual objects or folders from an R2 bucket. 

[ Bucket locks ](https://developers.cloudflare.com/r2/buckets/bucket-locks/) Prevent accidental deletion by setting retention policies on objects. 

[ Object lifecycles ](https://developers.cloudflare.com/r2/buckets/object-lifecycles/) Automatically expire objects after a specified period instead of emptying manually. 

[ Create buckets ](https://developers.cloudflare.com/r2/buckets/create-buckets/) Create a new R2 bucket after deleting an existing one. 

```json
{"@context":"https://schema.org","@type":"TechArticle","@id":"https://developers.cloudflare.com/r2/buckets/delete-buckets/#page","headline":"Delete buckets · Cloudflare R2 docs","description":"Empty all objects from an R2 bucket and permanently delete it.","url":"https://developers.cloudflare.com/r2/buckets/delete-buckets/","inLanguage":"en","image":"https://developers.cloudflare.com/dev-products-preview.png","dateModified":"2026-04-30","publisher":{"@type":"Organization","name":"Cloudflare","url":"https://www.cloudflare.com/"},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"}}
{"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"item":{"@id":"/directory/","name":"Directory"}},{"@type":"ListItem","position":2,"item":{"@id":"/r2/","name":"R2"}},{"@type":"ListItem","position":3,"item":{"@id":"/r2/buckets/","name":"Buckets"}},{"@type":"ListItem","position":4,"item":{"@id":"/r2/buckets/delete-buckets/","name":"Delete buckets"}}]}
```
