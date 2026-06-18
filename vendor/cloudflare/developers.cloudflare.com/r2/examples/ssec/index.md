---
title: Use SSE-C
description: The following tutorial shows some snippets for how to use Server-Side Encryption with Customer-Provided Keys (SSE-C) on Cloudflare R2.
image: https://developers.cloudflare.com/dev-products-preview.png
---

> Documentation Index  
> Fetch the complete documentation index at: https://developers.cloudflare.com/r2/llms.txt  
> Use this file to discover all available pages before exploring further.

[Skip to content](#%5Ftop) 

# Use SSE-C

**Last reviewed:**  over 1 year ago 

The following tutorial shows some snippets for how to use Server-Side Encryption with Customer-Provided Keys (SSE-C) on R2.

## Before you begin

* When using SSE-C, make sure you store your encryption key(s) in a safe place. In the event you misplace them, Cloudflare will be unable to recover the body of any objects encrypted using those keys.
* While SSE-C does provide MD5 hashes, this hash can be used for identification of keys only. The MD5 hash is not used in the encryption process itself.

## Workers

* [  TypeScript ](#tab-panel-9761)
* [  JavaScript ](#tab-panel-9762)

TypeScript

```

interface Environment {

  R2: R2Bucket

  /**

   * In this example, your SSE-C is stored as a hexadecimal string (preferably a secret).

   * The R2 API also supports providing an ArrayBuffer directly, if you want to generate/

   * store your keys dynamically.

  */

  SSEC_KEY: string

}

export default {

  async fetch(req: Request, env: Env) {

    const { SSEC_KEY, R2 } = env;

    const { pathname: filename } = new URL(req.url);

    switch(req.method) {

      case "GET": {

        const maybeObj = await env.BUCKET.get(filename, {

          onlyIf: req.headers,

          ssecKey: SSEC_KEY,

        });

        if(!maybeObj) {

          return new Response("Not Found", {

            status: 404

          });

        }

        const headers = new Headers();

        maybeObj.writeHttpMetadata(headers);

        return new Response(body, {

          headers

        });

      }

      case 'POST': {

        const multipartUpload = await env.BUCKET.createMultipartUpload(filename, {

          httpMetadata: req.headers,

          ssecKey: SSEC_KEY,

        });

        /**

         * This example only provides a single-part "multipart" upload.

         * For multiple parts, the process is the same(the key must be provided)

         * for every part.

        */

        const partOne = await multipartUpload.uploadPart(1, req.body, ssecKey);

        const obj = await multipartUpload.complete([partOne]);

        const headers = new Headers();

        obj.writeHttpMetadata(headers);

        return new Response(null, {

          headers,

          status: 201

        });

      }

      case 'PUT': {

        const obj = await env.BUCKET.put(filename, req.body, {

          httpMetadata: req.headers,

          ssecKey: SSEC_KEY,

        });

        const headers = new Headers();

        maybeObj.writeHttpMetadata(headers);

        return new Response(null, {

          headers,

          status: 201

        });

      }

      default: {

        return new Response("Method not allowed", {

          status: 405

        });

      }

    }

  }

}


```

JavaScript

```

/**

   * In this example, your SSE-C is stored as a hexadecimal string(preferably a secret).

   * The R2 API also supports providing an ArrayBuffer directly, if you want to generate/

   * store your keys dynamically.

*/

export default {

  async fetch(req, env) {

    const { SSEC_KEY, R2 } = env;

    const { pathname: filename } = new URL(req.url);

    switch(req.method) {

      case "GET": {

        const maybeObj = await env.BUCKET.get(filename, {

          onlyIf: req.headers,

          ssecKey: SSEC_KEY,

        });

        if(!maybeObj) {

          return new Response("Not Found", {

            status: 404

          });

        }

        const headers = new Headers();

        maybeObj.writeHttpMetadata(headers);

        return new Response(body, {

          headers

        });

      }

      case 'POST': {

        const multipartUpload = await env.BUCKET.createMultipartUpload(filename, {

          httpMetadata: req.headers,

          ssecKey: SSEC_KEY,

        });

        /**

         * This example only provides a single-part "multipart" upload.

         * For multiple parts, the process is the same(the key must be provided)

         * for every part.

        */

        const partOne = await multipartUpload.uploadPart(1, req.body, ssecKey);

        const obj = await multipartUpload.complete([partOne]);

        const headers = new Headers();

        obj.writeHttpMetadata(headers);

        return new Response(null, {

          headers,

          status: 201

        });

      }

      case 'PUT': {

        const obj = await env.BUCKET.put(filename, req.body, {

          httpMetadata: req.headers,

          ssecKey: SSEC_KEY,

        });

        const headers = new Headers();

        maybeObj.writeHttpMetadata(headers);

        return new Response(null, {

          headers,

          status: 201

        });

      }

      default: {

        return new Response("Method not allowed", {

          status: 405

        });

      }

    }

  }

}


```

## S3-API

* [  @aws-sdk/client-s3 ](#tab-panel-9760)

TypeScript

```

import {

  UploadPartCommand,

  PutObjectCommand, S3Client,

  CompleteMultipartUploadCommand,

  CreateMultipartUploadCommand,

  type UploadPartCommandOutput

} from "@aws-sdk/client-s3";


const s3 = new S3Client({

  endpoint: process.env.R2_ENDPOINT,

  credentials: {

    accessKeyId: process.env.R2_ACCESS_KEY_ID,

    secretAccessKey: process.env.R2_SECRET_ACCESS_KEY,

  },

});


const SSECustomerAlgorithm = "AES256";

const SSECustomerKey = process.env.R2_SSEC_KEY;

const SSECustomerKeyMD5 = process.env.R2_SSEC_KEY_MD5;


await s3.send(

  new PutObjectCommand({

    Bucket: "your-bucket",

    Key: "single-part",

    Body: "BeepBoop",

    SSECustomerAlgorithm,

    SSECustomerKey,

    SSECustomerKeyMD5,

  }),

);


const multi = await s3.send(

  new CreateMultipartUploadCommand({

    Bucket: "your-bucket",

    Key: "multi-part",

    SSECustomerAlgorithm,

    SSECustomerKey,

    SSECustomerKeyMD5,

  }),

);

const UploadId = multi.UploadId;


const parts: UploadPartCommandOutput[] = [];


parts.push(

  await s3.send(

    new UploadPartCommand({

      Bucket: "your-bucket",

      Key: "multi-part",

      UploadId,

      //   filledBuf()` generates some random data.

      // Replace with a function/body of your choice.

      Body: filledBuf(),

      PartNumber: 1,

      SSECustomerAlgorithm,

      SSECustomerKey,

      SSECustomerKeyMD5,

    }),

  ),

);

parts.push(

  await s3.send(

    new UploadPartCommand({

      Bucket: "your-bucket",

      Key: "multi-part",

      UploadId,

      //   filledBuf()` generates some random data.

      // Replace with a function/body of your choice.

      Body: filledBuf(),

      PartNumber: 2,

      SSECustomerAlgorithm,

      SSECustomerKey,

      SSECustomerKeyMD5,

    }),

  ),

);

await s3.send(

  new CompleteMultipartUploadCommand({

    Bucket: "your-bucket",

    Key: "multi-part",

    UploadId,

    MultipartUpload: {

      Parts: parts.map(({ ETag }, PartNumber) => ({

        ETag,

        PartNumber: PartNumber + 1,

      })),

    },

    SSECustomerAlgorithm,

    SSECustomerKey,

    SSECustomerKeyMD5,

  }),

);


const HeadObjectOutput = await s3.send(

  new HeadObjectCommand({

    Bucket: "your-bucket",

    Key: "multi-part",

    SSECustomerAlgorithm,

    SSECustomerKey,

    SSECustomerKeyMD5,

  }),

);


const GetObjectOutput = await s3.send(

  new GetObjectCommand({

    Bucket: "your-bucket",

    Key: "single-part",

    SSECustomerAlgorithm,

    SSECustomerKey,

    SSECustomerKeyMD5,

  }),

);


```

```json
{"@context":"https://schema.org","@type":"TechArticle","@id":"https://developers.cloudflare.com/r2/examples/ssec/#page","headline":"Use SSE-C · Cloudflare R2 docs","description":"The following tutorial shows some snippets for how to use Server-Side Encryption with Customer-Provided Keys (SSE-C) on Cloudflare R2.","url":"https://developers.cloudflare.com/r2/examples/ssec/","inLanguage":"en","image":"https://developers.cloudflare.com/dev-products-preview.png","dateModified":"2026-04-21","publisher":{"@type":"Organization","name":"Cloudflare","url":"https://www.cloudflare.com/"},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"}}
{"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"item":{"@id":"/directory/","name":"Directory"}},{"@type":"ListItem","position":2,"item":{"@id":"/r2/","name":"R2"}},{"@type":"ListItem","position":3,"item":{"@id":"/r2/examples/","name":"Examples"}},{"@type":"ListItem","position":4,"item":{"@id":"/r2/examples/ssec/","name":"Use SSE-C"}}]}
```
