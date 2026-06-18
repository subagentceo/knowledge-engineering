---
title: CLI
description: Use R2 from the command line with Wrangler, rclone, or AWS CLI.
image: https://developers.cloudflare.com/dev-products-preview.png
---

> Documentation Index  
> Fetch the complete documentation index at: https://developers.cloudflare.com/r2/llms.txt  
> Use this file to discover all available pages before exploring further.

[Skip to content](#%5Ftop) 

# CLI

Manage R2 buckets and objects directly from your terminal. Use CLI tools to automate tasks and manage objects.

| Tool                                                                  | Best for                                                                 |
| --------------------------------------------------------------------- | ------------------------------------------------------------------------ |
| [Wrangler](https://developers.cloudflare.com/workers/wrangler/)       | Single object operations and managing bucket settings with minimal setup |
| [rclone](https://developers.cloudflare.com/r2/examples/rclone/)       | Bulk object operations, migrations, and syncing directories              |
| [AWS CLI](https://developers.cloudflare.com/r2/examples/aws/aws-cli/) | Existing AWS workflows or familiarity with AWS CLI                       |

## 1\. Create a bucket

A bucket stores your objects in R2\. To create a new R2 bucket:

* [ Wrangler CLI ](#tab-panel-9769)
* [ Dashboard ](#tab-panel-9770)

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

CLI tools that use the S3 API ([AWS CLI](https://developers.cloudflare.com/r2/examples/aws/aws-cli/), [rclone](https://developers.cloudflare.com/r2/examples/rclone/)) require an Access Key ID and Secret Access Key. If you are using [Wrangler](https://developers.cloudflare.com/workers/wrangler/), you can skip this step.

1. In the Cloudflare dashboard, go to **R2**.
2. Select **Manage R2 API tokens**.
3. Select **Create API token**.
4. Choose **Object Read & Write** permission and select the buckets you want to access.
5. Select **Create API Token**.
6. Copy the **Access Key ID** and **Secret Access Key**. Store these securely — you cannot view the secret again.

## 3\. Set up a CLI tool

* [ Wrangler ](#tab-panel-9766)
* [ rclone ](#tab-panel-9767)
* [ AWS CLI ](#tab-panel-9768)

[Wrangler](https://developers.cloudflare.com/r2/reference/wrangler-commands/) is the Cloudflare Workers CLI. It authenticates with your Cloudflare account directly, so no API credentials needed.

1. Install Wrangler:  
 npm  yarn  pnpm  bun  
```  
npm i -D wrangler  
```  
```  
yarn add -D wrangler  
```  
```  
pnpm add -D wrangler  
```  
```  
bun add -d wrangler  
```
2. Log in to your Cloudflare account:  
Terminal window  
```  
wrangler login  
```

[rclone](https://developers.cloudflare.com/r2/examples/rclone/) is ideal for bulk uploads, migrations, and syncing directories.

1. [Install rclone ↗](https://rclone.org/install/) (version 1.59 or later).
2. Configure a new remote:  
Terminal window  
```  
rclone config  
```
3. Create new remote by selecting `n`.
4. Name your remote `r2`
5. Select **Amazon S3 Compliant Storage Providers** as the storage type.
6. Select **Cloudflare R2** as the provider.
7. Select whether you would like to enter AWS credentials manually, or get it from the runtime environment.
8. Enter your Access Key ID and Secret Access Key when prompted.
9. Select the region to connect to (optional).
10. Provide your S3 API endpoint.

The [AWS CLI](https://developers.cloudflare.com/r2/examples/aws/aws-cli/) works with R2 by specifying a custom endpoint.

1. [Install the AWS CLI ↗](https://docs.aws.amazon.com/cli/latest/userguide/getting-started-install.html) for your operating system.
2. Configure your credentials:  
Terminal window  
```  
aws configure  
```
3. When prompted, enter:  
   * **AWS Access Key ID**: Your R2 Access Key ID  
   * **AWS Secret Access Key**: Your R2 Secret Access Key  
   * **Default region name**: `auto`  
   * **Default output format**: `json` (or press Enter to skip)

## 4\. Upload and download objects

(Optional) Create a test file to upload. Run this command in the directory where you plan to run the CLI commands:

Terminal window

```

echo 'Hello, R2!' > myfile.txt


```

* [ Wrangler ](#tab-panel-9763)
* [ rclone ](#tab-panel-9764)
* [ AWS CLI ](#tab-panel-9765)

Terminal window

```

# Upload myfile.txt to my-bucket

wrangler r2 object put my-bucket/myfile.txt --file ./myfile.txt


# Download myfile.txt and save it as downloaded.txt

wrangler r2 object get my-bucket/myfile.txt --file ./downloaded.txt


```

Refer to the [Wrangler R2 commands](https://developers.cloudflare.com/r2/reference/wrangler-commands/) for all available operations.

Terminal window

```

# Upload myfile.txt to my-bucket

rclone copy myfile.txt r2:my-bucket/


# Download myfile.txt from my-bucket to the current directory

rclone copy r2:my-bucket/myfile.txt .


```

Refer to the [rclone documentation](https://developers.cloudflare.com/r2/examples/rclone/) for more configuration options.

Terminal window

```

# Upload myfile.txt to my-bucket

aws s3 cp myfile.txt s3://my-bucket/ --endpoint-url https://<ACCOUNT_ID>.r2.cloudflarestorage.com


# Download myfile.txt from my-bucket to current directory

aws s3 cp s3://my-bucket/myfile.txt ./ --endpoint-url https://<ACCOUNT_ID>.r2.cloudflarestorage.com


# List all objects in my-bucket

aws s3 ls s3://my-bucket/ --endpoint-url https://<ACCOUNT_ID>.r2.cloudflarestorage.com


```

Refer to the [AWS CLI documentation](https://developers.cloudflare.com/r2/examples/aws/aws-cli/) for more examples.

## Next steps

[ Presigned URLs ](https://developers.cloudflare.com/r2/api/s3/presigned-urls/) Generate temporary URLs for private object access. 

[ Public buckets ](https://developers.cloudflare.com/r2/buckets/public-buckets/) Serve files directly over HTTP with a public bucket. 

[ CORS ](https://developers.cloudflare.com/r2/buckets/cors/) Configure CORS for browser-based uploads. 

[ Object lifecycles ](https://developers.cloudflare.com/r2/buckets/object-lifecycles/) Set up lifecycle rules to automatically delete old objects. 

```json
{"@context":"https://schema.org","@type":"TechArticle","@id":"https://developers.cloudflare.com/r2/get-started/cli/#page","headline":"CLI · Cloudflare R2 docs","description":"Use R2 from the command line with Wrangler, rclone, or AWS CLI.","url":"https://developers.cloudflare.com/r2/get-started/cli/","inLanguage":"en","image":"https://developers.cloudflare.com/dev-products-preview.png","dateModified":"2026-04-21","publisher":{"@type":"Organization","name":"Cloudflare","url":"https://www.cloudflare.com/"},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"}}
{"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"item":{"@id":"/directory/","name":"Directory"}},{"@type":"ListItem","position":2,"item":{"@id":"/r2/","name":"R2"}},{"@type":"ListItem","position":3,"item":{"@id":"/r2/get-started/","name":"Get started"}},{"@type":"ListItem","position":4,"item":{"@id":"/r2/get-started/cli/","name":"CLI"}}]}
```
