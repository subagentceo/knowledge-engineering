---
title: Authenticate against R2 with temporary credentials
description: Authenticate against R2 with temporary credentials.
image: https://developers.cloudflare.com/dev-products-preview.png
---

> Documentation Index  
> Fetch the complete documentation index at: https://developers.cloudflare.com/r2/llms.txt  
> Use this file to discover all available pages before exploring further.

[Skip to content](#%5Ftop) 

# Authenticate against R2 with temporary credentials

**Last reviewed:**  2 months ago 

The following examples show how to generate R2 [temporary credentials](https://developers.cloudflare.com/r2/api/s3/temporary-credentials/) via both the Temporary Credentials API and local client-side signing, and how to use the resulting credentials with an S3 client.

## Prerequisites

* A parent [R2 API token](https://developers.cloudflare.com/r2/api/tokens/) with at least the permissions you plan to delegate. Never ship parent credentials to a client.
* Your Cloudflare [account ID](https://developers.cloudflare.com/fundamentals/account/find-account-and-zone-ids/).
* An S3 client that supports session tokens. The examples below use [aws4fetch ↗](https://www.npmjs.com/package/aws4fetch).

## Generate via the Temporary Credentials API

Call the [Temporary Credentials API](https://developers.cloudflare.com/api/resources/r2/subresources/temporary%5Fcredentials/methods/create/) from a trusted server, then use the returned credentials with any S3 client.

Terminal window

```

curl https://api.cloudflare.com/client/v4/accounts/<ACCOUNT_ID>/r2/temp-access-credentials \

  --header "Authorization: Bearer <PARENT_API_TOKEN>" \

  --header "Content-Type: application/json" \

  --data '{

    "bucket": "my-bucket",

    "parentAccessKeyId": "<PARENT_ACCESS_KEY_ID>",

    "permission": "object-read-only",

    "ttlSeconds": 900,

    "objects": ["reports/2026-q1.pdf"]

  }'


```

The response wraps the credentials in a `result` object:

```

{

  "result": {

    "accessKeyId": "<accessKeyId>",

    "secretAccessKey": "<secretAccessKey>",

    "sessionToken": "<sessionToken>"

  },

  "errors": [],

  "messages": [],

  "success": true

}


```

## Generate locally (client-side signing)

This example uses [jose ↗](https://www.npmjs.com/package/jose) to sign the JWT and [aws4fetch ↗](https://www.npmjs.com/package/aws4fetch) to issue signed requests.

 npm  yarn  pnpm  bun 

```
npm i jose aws4fetch
```

```
yarn add jose aws4fetch
```

```
pnpm add jose aws4fetch
```

```
bun add jose aws4fetch
```

The following helper signs a JWT with your parent secret access key and derives the temporary secret access key and session token:

temp-credentials.ts

```

import { SignJWT } from "jose";


type R2Scope =

  | "object-read-only"

  | "object-read-write"

  | "admin-read-only"

  | "admin-read-write";


export interface TempCredentialOptions {

  scope: R2Scope;

  // Optional: narrow the credential to specific S3 operations.

  actions?: string[];

  // Time-to-live in seconds. Defaults to 1 hour.

  ttlSeconds?: number;

  // Optional: restrict access to specific prefixes or objects.

  paths?: { prefixPaths?: string[]; objectPaths?: string[] };

}


export async function createTempCredentials(

  endpoint: string,

  accountId: string,

  parentAccessKeyId: string,

  parentSecretAccessKey: string,

  bucket: string,

  opts: TempCredentialOptions,

): Promise<{

  accessKeyId: string;

  secretAccessKey: string;

  sessionToken: string;

}> {

  const ttl = opts.ttlSeconds ?? 3600;


  const claims: Record<string, unknown> = {

    bucket,

    scope: opts.scope,

  };


  if (opts.actions !== undefined && opts.actions.length > 0) {

    claims.actions = opts.actions;

  }


  if (opts.paths !== undefined) {

    claims.paths = {

      prefixPaths: opts.paths.prefixPaths ?? [],

      objectPaths: opts.paths.objectPaths ?? [],

    };

  }


  // Sign the JWT with the parent secret access key. R2 validates this signature.

  const jwt = await new SignJWT(claims)

    .setProtectedHeader({ alg: "HS256", typ: "JWT" })

    .setSubject(accountId)

    .setIssuer(parentAccessKeyId)

    .setAudience(new URL(endpoint).host)

    .setIssuedAt()

    .setExpirationTime(`${ttl}s`)

    .sign(new TextEncoder().encode(parentSecretAccessKey));


  // The temporary secret access key is the SHA-256 hex digest of the signed JWT.

  const digest = await crypto.subtle.digest(

    "SHA-256",

    new TextEncoder().encode(jwt),

  );

  const secretAccessKey = Array.from(new Uint8Array(digest))

    .map((b) => b.toString(16).padStart(2, "0"))

    .join("");


  return {

    // Reuse the parent access key ID as the temporary access key ID.

    accessKeyId: parentAccessKeyId,

    secretAccessKey,

    // The session token is base64("jwt/" + signed JWT).

    sessionToken: btoa(`jwt/${jwt}`),

  };

}


```

The following example returns a credential that is valid for 15 minutes and can only `GetObject` and `HeadObject` under the `data/` prefix:

TypeScript

```

import { createTempCredentials } from "./temp-credentials";


const R2_URL = `https://${ACCOUNT_ID}.r2.cloudflarestorage.com`;


const creds = await createTempCredentials(

  R2_URL,

  ACCOUNT_ID,

  PARENT_ACCESS_KEY_ID,

  PARENT_SECRET_ACCESS_KEY,

  "my-bucket",

  {

    scope: "object-read-only",

    actions: ["GetObject", "HeadObject"],

    ttlSeconds: 900,

    paths: { prefixPaths: ["data/"] },

  },

);


```

## Use the credentials

Once you have a temporary credential, usage is the same regardless of how it was generated. Pass the three values to your S3 client and issue requests. The following example uses credentials scoped to the `data/` prefix to demonstrate one permitted and one rejected request:

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


// Allowed: object under the data/ prefix.

const ok = await client.fetch(`${R2_URL}/my-bucket/data/file.bin`);

console.log(ok.status); // 200


// Rejected with 403 AccessDenied because the object is outside the data/ prefix.

const denied = await client.fetch(`${R2_URL}/my-bucket/other/file.bin`);

console.log(denied.status); // 403


```

## Related resources

* [Temporary credentials](https://developers.cloudflare.com/r2/api/s3/temporary-credentials/): concept reference and scoping model.
* [R2 API tokens](https://developers.cloudflare.com/r2/api/tokens/): create the parent token.
* [Error codes](https://developers.cloudflare.com/r2/api/error-codes/#authentication-and-authorization-errors): authentication error reference.

```json
{"@context":"https://schema.org","@type":"TechArticle","@id":"https://developers.cloudflare.com/r2/examples/authenticate-r2-temp-credentials/#page","headline":"Authenticate against R2 with temporary credentials · Cloudflare R2 docs","description":"Authenticate against R2 with temporary credentials.","url":"https://developers.cloudflare.com/r2/examples/authenticate-r2-temp-credentials/","inLanguage":"en","image":"https://developers.cloudflare.com/dev-products-preview.png","dateModified":"2026-04-24","publisher":{"@type":"Organization","name":"Cloudflare","url":"https://www.cloudflare.com/"},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"}}
{"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"item":{"@id":"/directory/","name":"Directory"}},{"@type":"ListItem","position":2,"item":{"@id":"/r2/","name":"R2"}},{"@type":"ListItem","position":3,"item":{"@id":"/r2/examples/","name":"Examples"}},{"@type":"ListItem","position":4,"item":{"@id":"/r2/examples/authenticate-r2-temp-credentials/","name":"Authenticate against R2 with temporary credentials"}}]}
```
