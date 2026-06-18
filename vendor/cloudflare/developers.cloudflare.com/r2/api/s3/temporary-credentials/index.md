---
title: Temporary credentials
description: Learn about temporary credentials in r2.
image: https://developers.cloudflare.com/dev-products-preview.png
---

> Documentation Index  
> Fetch the complete documentation index at: https://developers.cloudflare.com/r2/llms.txt  
> Use this file to discover all available pages before exploring further.

[Skip to content](#%5Ftop) 

# Temporary credentials

Temporary credentials are short-lived, scoped S3 credentials derived from an existing [R2 API token](https://developers.cloudflare.com/r2/api/tokens/). They authenticate with AWS Signature Version 4, the same as a long-lived token, but include a session token and expire automatically. The session token is sent with every request via the `X-Amz-Security-Token` header; all S3-compatible clients expose this as a standard session token credential field.

Use temporary credentials to delegate access without issuing a long-lived token. For example, granting a mobile client read access to a single prefix for 15 minutes, or issuing per-request upload credentials scoped to one object.

## Choosing an approach

R2 supports two patterns for time-limited access. They overlap but have different trade-offs:

| Pattern                                                                       | Grants                                                                                                         | Good for                                                                                                                   |
| ----------------------------------------------------------------------------- | -------------------------------------------------------------------------------------------------------------- | -------------------------------------------------------------------------------------------------------------------------- |
| Temporary credentials (this page)                                             | Multiple S3 operations, scoped to a bucket and a set of permitted operations, and optionally to specific paths | Callers that use a standard S3 client or SDK to perform multiple operations in a scoped session                            |
| [Presigned URLs](https://developers.cloudflare.com/r2/api/s3/presigned-urls/) | A single S3 operation on a single object                                                                       | Granting direct HTTP access to a single object without an S3 client, such as a browser upload or a shareable download link |

## Generate temporary credentials

### Via the Temporary Credentials API

The [Temporary Credentials API](https://developers.cloudflare.com/api/resources/r2/subresources/temporary%5Fcredentials/methods/create/) accepts a parent API token, the bucket name, and optional scoping parameters, and returns a new access key ID, secret access key, and session token. Cloudflare signs the session token on your behalf.

Use this method when you want Cloudflare to manage the signing flow for you.

For a runnable walkthrough, refer to [Authenticate against R2 with temporary credentials](https://developers.cloudflare.com/r2/examples/authenticate-r2-temp-credentials/).

### Locally (client-side signing)

You can also generate temporary credentials locally by signing a JWT with your parent API token's secret access key and using it as the session token.

Use this method when:

* You are issuing many short-lived credentials and want to avoid per-mint API latency.
* You need to mint credentials in an environment that cannot reach the Cloudflare API.
* You want to scope credentials by S3 action (see [Scope by action](#actions)), which is currently supported via local signing only.

Signing happens in three steps:

1. Build a JWT payload that identifies the bucket and the scope of access.
2. Sign the JWT with HS256 using your parent secret access key.
3. Derive the temporary secret access key by taking the SHA-256 hex digest of the signed JWT. Encode the session token as `base64("jwt/" + <signed-jwt>)`.

The parent access key ID is reused as the temporary access key ID.

A complete, runnable example is available in [Authenticate against R2 with temporary credentials](https://developers.cloudflare.com/r2/examples/authenticate-r2-temp-credentials/).

## Scope of a credential

Every temporary credential is bound to a single bucket and a set of permitted operations. You can optionally restrict the credential further to specific paths within the bucket.

A temporary credential cannot exceed the permissions of its parent token.

### Bucket

A temporary credential is bound to exactly one bucket, identified by name. Cross-bucket access is not supported within a single credential.

### Permitted operations

Specify permitted operations using `scope` (passed as `permission` to the API) or `actions`. You must provide at least one.

#### Scope

`scope` is a preset category of operations. Refer to [Permissions](https://developers.cloudflare.com/r2/api/tokens/#permissions) for full definitions.

| Scope             | Allows                                                                                            |
| ----------------- | ------------------------------------------------------------------------------------------------- |
| object-read-only  | Read and list objects in the bucket.                                                              |
| object-read-write | Read, write, and list objects in the bucket.                                                      |
| admin-read-only   | Read and list objects, view bucket configuration, and read from the data catalog.                 |
| admin-read-write  | Read, write, and list objects, edit bucket configuration, and read and write to the data catalog. |

#### Actions

`actions` is an explicit list of permitted S3 operations.

For example, `actions: ["GetObject", "HeadObject"]` grants read of individual objects but denies `ListObjectsV2`, even though the broader `object-read-only` scope would allow listing.

Note

`actions` is currently supported via [local signing](#locally-client-side-signing) only. Support in the Temporary Credentials API is coming soon.

Valid actions:

| Category  | Actions                                                                                                 |
| --------- | ------------------------------------------------------------------------------------------------------- |
| Read      | HeadObject, GetObject, GetBucketLocation, ListObjectsV1, ListObjectsV2, ListMultipartUploads, ListParts |
| Write     | PutObject, DeleteObject, DeleteObjects, CopyObject                                                      |
| Multipart | CreateMultipartUpload, UploadPart, UploadPartCopy, AbortMultipartUpload, CompleteMultipartUpload        |

### Paths

Restrict access to specific prefixes or objects within the bucket. Omit these fields to grant access to the entire bucket, subject to the permitted operations.

**Temporary Credentials API:** pass `prefixes` and `objects` as top-level fields on the request body.

JSONC

```

{

  "prefixes": ["uploads/user-123/"],

  "objects": ["shared/manifest.json"]

}


```

**Local signing:** set `paths.prefixPaths` and `paths.objectPaths` on the JWT payload.

JSONC

```

{

  "paths": {

    "prefixPaths": ["uploads/user-123/"],

    "objectPaths": ["shared/manifest.json"]

  }

}


```

* `prefixes` / `prefixPaths`: keys starting with any listed prefix.
* `objects` / `objectPaths`: exact object keys.

## Using temporary credentials

Any S3-compatible client that supports session tokens will accept R2 temporary credentials. Pass all three values (access key ID, secret access key, session token) using the client's standard credential fields.

* [ JavaScript ](#tab-panel-9725)
* [ Python ](#tab-panel-9726)
* [ Environment variables ](#tab-panel-9727)

TypeScript

```

import { AwsClient } from "aws4fetch";


const R2_URL = `https://${ACCOUNT_ID}.r2.cloudflarestorage.com`;


const client = new AwsClient({

  accessKeyId: ACCESS_KEY_ID,

  secretAccessKey: SECRET_ACCESS_KEY,

  sessionToken: SESSION_TOKEN,

  service: "s3",

});


const response = await client.fetch(`${R2_URL}/my-bucket/image.png`);


```

Python

```

import boto3


s3 = boto3.client(

    service_name="s3",

    endpoint_url="https://<ACCOUNT_ID>.r2.cloudflarestorage.com",

    aws_access_key_id="<ACCESS_KEY_ID>",

    aws_secret_access_key="<SECRET_ACCESS_KEY>",

    aws_session_token="<SESSION_TOKEN>",

    region_name="auto",

)


```

Most AWS SDKs and the AWS CLI read credentials from these environment variables by default:

Terminal window

```

AWS_ACCESS_KEY_ID=<ACCESS_KEY_ID>

AWS_SECRET_ACCESS_KEY=<SECRET_ACCESS_KEY>

AWS_SESSION_TOKEN=<SESSION_TOKEN>


```

## Security considerations

Treat temporary credentials as bearer tokens. Anyone in possession of all three values can perform the allowed operations until the credential expires.

* **Scope as narrowly as possible.** Set paths and permission scope so the credential can only do what the caller needs.
* **Use short TTLs.** Set `ttlSeconds` to the shortest value that fits your use case. A credential that lives for 15 minutes has a smaller blast radius than one that lives for a day.
* **A temporary credential cannot exceed its parent.** If you revoke the parent API token, all temporary credentials derived from it stop working immediately.
* **Never ship your parent secret access key to a client.** Local signing must happen in a trusted environment (such as your backend or a Worker).

## Related resources

[ Authenticate against R2 with temporary credentials ](https://developers.cloudflare.com/r2/examples/authenticate-r2-temp-credentials/) End-to-end examples for both the Temporary Credentials API and local JWT signing. 

[ Presigned URLs ](https://developers.cloudflare.com/r2/api/s3/presigned-urls/) Grant single-operation access to a specific object without issuing credentials. 

[ R2 API tokens ](https://developers.cloudflare.com/r2/api/tokens/) Create the parent token that temporary credentials derive from. 

[ Error codes ](https://developers.cloudflare.com/r2/api/error-codes/) Authentication and authorization error codes returned by R2. 

```json
{"@context":"https://schema.org","@type":"TechArticle","@id":"https://developers.cloudflare.com/r2/api/s3/temporary-credentials/#page","headline":"Temporary credentials · Cloudflare R2 docs","description":"Learn about temporary credentials in r2.","url":"https://developers.cloudflare.com/r2/api/s3/temporary-credentials/","inLanguage":"en","image":"https://developers.cloudflare.com/dev-products-preview.png","dateModified":"2026-04-24","publisher":{"@type":"Organization","name":"Cloudflare","url":"https://www.cloudflare.com/"},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"}}
{"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"item":{"@id":"/directory/","name":"Directory"}},{"@type":"ListItem","position":2,"item":{"@id":"/r2/","name":"R2"}},{"@type":"ListItem","position":3,"item":{"@id":"/r2/api/","name":"API"}},{"@type":"ListItem","position":4,"item":{"@id":"/r2/api/s3/","name":"S3"}},{"@type":"ListItem","position":5,"item":{"@id":"/r2/api/s3/temporary-credentials/","name":"Temporary credentials"}}]}
```
