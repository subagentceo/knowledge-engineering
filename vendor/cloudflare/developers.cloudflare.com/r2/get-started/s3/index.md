---
title: S3
description: Use R2 with S3-compatible SDKs like boto3 and the AWS SDK.
image: https://developers.cloudflare.com/dev-products-preview.png
---

> Documentation Index  
> Fetch the complete documentation index at: https://developers.cloudflare.com/r2/llms.txt  
> Use this file to discover all available pages before exploring further.

[Skip to content](#%5Ftop) 

# S3

R2 provides support for a [S3-compatible API](https://developers.cloudflare.com/r2/api/s3/api/), which means you can use any S3 SDK, library, or tool to interact with your buckets. If you have existing code that works with S3, you can use it with R2 by changing the endpoint URL.

## 1\. Create a bucket

A bucket stores your objects in R2\. To create a new R2 bucket:

* [ Wrangler CLI ](#tab-panel-9773)
* [ Dashboard ](#tab-panel-9774)

1. Log in to your Cloudflare account:  
Terminal window  
```  
npx wrangler login  
```
2. Create a bucket named `my-bucket`:  
Terminal window  
```  
npx wrangler r2 bucket create my-bucket  
```  
If prompted, select the account you want to create the bucket in.
3. Verify the bucket was created:  
Terminal window  
```  
npx wrangler r2 bucket list  
```

1. In the Cloudflare Dashboard, go to **R2 object storage**.  
[ Go to **Overview** ](https://dash.cloudflare.com/?to=/:account/r2/overview)
2. Select **Create bucket**.
3. Enter a name for your bucket.
4. Select a [location](https://developers.cloudflare.com/r2/reference/data-location) for your bucket and a [default storage class](https://developers.cloudflare.com/r2/buckets/storage-classes/).
5. Select **Create bucket**.

## 2\. Generate API credentials

To use the S3 API, you need to generate [credentials](https://developers.cloudflare.com/r2/api/tokens/) and get an Access Key ID and Secret Access Key:

1. Go to the [Cloudflare Dashboard ↗](https://dash.cloudflare.com/).
2. Select **Storage & databases > R2 > Overview**.
3. Select **Manage** in API Tokens.
4. Select **Create Account API token** or **Create User API token**
5. Choose **Object Read & Write** permission and **Apply to specific buckets only** to select the buckets you want to access.
6. Select **Create API Token**.
7. Copy the **Access Key ID** and **Secret Access Key**. Store these securely as you cannot view the secret again.

You also need your S3 API endpoint URL which you can find at the bottom of the Create API Token confirmation page once you have created your token, or on the R2 Overview page:

```

https://<ACCOUNT_ID>.r2.cloudflarestorage.com


```

## 3\. Use an AWS SDK

The following examples show how to use Python and JavaScript SDKs. For other languages, refer to [S3-compatible SDK examples](https://developers.cloudflare.com/r2/examples/aws/) for [Go](https://developers.cloudflare.com/r2/examples/aws/aws-sdk-go/), [Java](https://developers.cloudflare.com/r2/examples/aws/aws-sdk-java/), [PHP](https://developers.cloudflare.com/r2/examples/aws/aws-sdk-php/), [Ruby](https://developers.cloudflare.com/r2/examples/aws/aws-sdk-ruby/), and [Rust](https://developers.cloudflare.com/r2/examples/aws/aws-sdk-rust/).

* [ Python (boto3) ](#tab-panel-9771)
* [ JavaScript ](#tab-panel-9772)

1. Install [boto3 ↗](https://boto3.amazonaws.com/v1/documentation/api/latest/index.html):  
Terminal window  
```  
pip install boto3  
```
2. Create a test file to upload:  
Terminal window  
```  
echo 'Hello, R2!' > myfile.txt  
```
3. Use your credentials to create an S3 client and interact with your bucket:  
Python  
```  
import boto3  
s3 = boto3.client(  
    service_name='s3',  
    # Provide your R2 endpoint: https://<ACCOUNT_ID>.r2.cloudflarestorage.com  
    endpoint_url='https://<ACCOUNT_ID>.r2.cloudflarestorage.com',  
    # Provide your R2 Access Key ID and Secret Access Key  
    aws_access_key_id='<ACCESS_KEY_ID>',  
    aws_secret_access_key='<SECRET_ACCESS_KEY>',  
    region_name='auto',  # Required by boto3, not used by R2  
)  
# Upload a file  
s3.upload_file('myfile.txt', 'my-bucket', 'myfile.txt')  
print('Uploaded myfile.txt')  
# Download a file  
s3.download_file('my-bucket', 'myfile.txt', 'downloaded.txt')  
print('Downloaded to downloaded.txt')  
# List objects  
response = s3.list_objects_v2(Bucket='my-bucket')  
for obj in response.get('Contents', []):  
    print(f"Object: {obj['Key']}")  
```
4. Save this as `example.py` and run it:  
Terminal window  
```  
python example.py  
```  
```  
Uploaded myfile.txt  
Downloaded to downloaded.txt  
Object: myfile.txt  
```

Refer to [boto3 examples](https://developers.cloudflare.com/r2/examples/aws/boto3/) for more operations.

1. Install the [@aws-sdk/client-s3 ↗](https://www.npmjs.com/package/@aws-sdk/client-s3) package:  
Terminal window  
```  
npm install @aws-sdk/client-s3  
```
2. Use your credentials to create an S3 client and interact with your bucket:  
JavaScript  
```  
import {  
  S3Client,  
  PutObjectCommand,  
  GetObjectCommand,  
  ListObjectsV2Command,  
} from "@aws-sdk/client-s3";  
const s3 = new S3Client({  
  region: "auto", // Required by AWS SDK, not used by R2  
  // Provide your R2 endpoint: https://<ACCOUNT_ID>.r2.cloudflarestorage.com  
  endpoint: "https://<ACCOUNT_ID>.r2.cloudflarestorage.com",  
  credentials: {  
    // Provide your R2 Access Key ID and Secret Access Key  
    accessKeyId: "<ACCESS_KEY_ID>",  
    secretAccessKey: "<SECRET_ACCESS_KEY>",  
  },  
});  
// Upload a file  
await s3.send(  
  new PutObjectCommand({  
    Bucket: "my-bucket",  
    Key: "myfile.txt",  
    Body: "Hello, R2!",  
  }),  
);  
console.log("Uploaded myfile.txt");  
// Download a file  
const response = await s3.send(  
  new GetObjectCommand({  
    Bucket: "my-bucket",  
    Key: "myfile.txt",  
  }),  
);  
const content = await response.Body.transformToString();  
console.log("Downloaded:", content);  
// List objects  
const list = await s3.send(  
  new ListObjectsV2Command({  
    Bucket: "my-bucket",  
  }),  
);  
console.log(  
  "Objects:",  
  list.Contents.map((obj) => obj.Key),  
);  
```
3. Save this as `example.mjs` and run it:  
Terminal window  
```  
node example.mjs  
```  
```  
Uploaded myfile.txt  
Downloaded: Hello, R2!  
Objects: [ 'myfile.txt' ]  
```

Refer to [AWS SDK for JavaScript examples](https://developers.cloudflare.com/r2/examples/aws/aws-sdk-js-v3/) for more operations.

## Next steps

[ Presigned URLs ](https://developers.cloudflare.com/r2/api/s3/presigned-urls/) Generate temporary URLs for private object access. 

[ Public buckets ](https://developers.cloudflare.com/r2/buckets/public-buckets/) Serve files directly over HTTP with a public bucket. 

[ CORS ](https://developers.cloudflare.com/r2/buckets/cors/) Configure CORS for browser-based uploads. 

[ Object lifecycles ](https://developers.cloudflare.com/r2/buckets/object-lifecycles/) Set up lifecycle rules to automatically delete old objects. 

```json
{"@context":"https://schema.org","@type":"TechArticle","@id":"https://developers.cloudflare.com/r2/get-started/s3/#page","headline":"S3 · Cloudflare R2 docs","description":"Use R2 with S3-compatible SDKs like boto3 and the AWS SDK.","url":"https://developers.cloudflare.com/r2/get-started/s3/","inLanguage":"en","image":"https://developers.cloudflare.com/dev-products-preview.png","dateModified":"2026-04-21","publisher":{"@type":"Organization","name":"Cloudflare","url":"https://www.cloudflare.com/"},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"}}
{"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"item":{"@id":"/directory/","name":"Directory"}},{"@type":"ListItem","position":2,"item":{"@id":"/r2/","name":"R2"}},{"@type":"ListItem","position":3,"item":{"@id":"/r2/get-started/","name":"Get started"}},{"@type":"ListItem","position":4,"item":{"@id":"/r2/get-started/s3/","name":"S3"}}]}
```
