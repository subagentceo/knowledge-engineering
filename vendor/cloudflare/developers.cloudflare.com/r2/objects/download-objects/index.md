---
title: Download objects
description: Download objects from R2 using the dashboard, Workers API, S3 API, or CLI tools.
image: https://developers.cloudflare.com/dev-products-preview.png
---

> Documentation Index  
> Fetch the complete documentation index at: https://developers.cloudflare.com/r2/llms.txt  
> Use this file to discover all available pages before exploring further.

[Skip to content](#%5Ftop) 

# Download objects

You can download objects from R2 using the dashboard, Workers API, S3 API, or command-line tools.

## Download via dashboard

1. In the Cloudflare dashboard, go to the **R2 object storage** page.  
[ Go to **Overview** ](https://dash.cloudflare.com/?to=/:account/r2/overview)
2. Select your bucket.
3. Locate the object you want to download.
4. Select **...** for the object and click **Download**.

## Download via Workers API

Use R2 [bindings](https://developers.cloudflare.com/workers/runtime-apis/bindings/) in Workers to download objects:

TypeScript

```

export default {

  async fetch(request: Request, env: Env, ctx: ExecutionContext) {

    const object = await env.MY_BUCKET.get("image.png");

    return new Response(object.body);

  },

} satisfies ExportedHandler<Env>;


```

For complete documentation, refer to [Workers API](https://developers.cloudflare.com/r2/api/workers/workers-api-usage/).

## Download via S3 API

Use S3-compatible SDKs to download objects. You'll need your [account ID](https://developers.cloudflare.com/fundamentals/account/find-account-and-zone-ids/) and [R2 API token](https://developers.cloudflare.com/r2/api/tokens/).

* [ JavaScript ](#tab-panel-9783)
* [ Python ](#tab-panel-9784)

TypeScript

```

import { S3Client, GetObjectCommand } from "@aws-sdk/client-s3";


const S3 = new S3Client({

  region: "auto", // Required by SDK but not used by R2

  // Provide your Cloudflare account ID

  endpoint: `https://<ACCOUNT_ID>.r2.cloudflarestorage.com`,

  // Retrieve your S3 API credentials for your R2 bucket via API tokens (see: https://developers.cloudflare.com/r2/api/tokens)

  credentials: {

    accessKeyId: '<ACCESS_KEY_ID>',

    secretAccessKey: '<SECRET_ACCESS_KEY>',

  },

});


const response = await S3.send(

  new GetObjectCommand({

    Bucket: "my-bucket",

    Key: "image.png",

  }),

);


```

Python

```

import boto3


s3 = boto3.client(

  service_name="s3",

  # Provide your Cloudflare account ID

  endpoint_url=f"https://{ACCOUNT_ID}.r2.cloudflarestorage.com",

  # Retrieve your S3 API credentials for your R2 bucket via API tokens (see: https://developers.cloudflare.com/r2/api/tokens)

  aws_access_key_id=ACCESS_KEY_ID,

  aws_secret_access_key=SECRET_ACCESS_KEY,

  region_name="auto", # Required by SDK but not used by R2

)


response = s3.get_object(Bucket="my-bucket", Key="image.png")

image_data = response["Body"].read()


```

Refer to R2's [S3 API documentation](https://developers.cloudflare.com/r2/api/s3/api/) for all S3 API methods.

### Presigned URLs

For client-side downloads where users download directly from R2, use presigned URLs. Your server generates a temporary download URL that clients can use without exposing your API credentials.

1. Your application generates a presigned GET URL using an S3 SDK
2. Send the URL to your client
3. Client downloads directly from R2 using the presigned URL

For details on generating and using presigned URLs, refer to [Presigned URLs](https://developers.cloudflare.com/r2/api/s3/presigned-urls/).

## Download via Wrangler

Use [Wrangler](https://developers.cloudflare.com/workers/wrangler/install-and-update/) to download objects. Run the [r2 object get command](https://developers.cloudflare.com/workers/wrangler/commands/r2/#r2-object-get):

Terminal window

```

wrangler r2 object get test-bucket/image.png


```

The file will be downloaded into the current working directory. You can also use the `--file` flag to set a new name for the object as it is downloaded, and the `--pipe` flag to pipe the download to standard output (stdout).

```json
{"@context":"https://schema.org","@type":"TechArticle","@id":"https://developers.cloudflare.com/r2/objects/download-objects/#page","headline":"Download objects · Cloudflare R2 docs","description":"Download objects from R2 using the dashboard, Workers API, S3 API, or CLI tools.","url":"https://developers.cloudflare.com/r2/objects/download-objects/","inLanguage":"en","image":"https://developers.cloudflare.com/dev-products-preview.png","dateModified":"2026-04-21","publisher":{"@type":"Organization","name":"Cloudflare","url":"https://www.cloudflare.com/"},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"}}
{"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"item":{"@id":"/directory/","name":"Directory"}},{"@type":"ListItem","position":2,"item":{"@id":"/r2/","name":"R2"}},{"@type":"ListItem","position":3,"item":{"@id":"/r2/objects/","name":"Objects"}},{"@type":"ListItem","position":4,"item":{"@id":"/r2/objects/download-objects/","name":"Download objects"}}]}
```
