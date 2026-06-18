---
title: Enable Amazon Kinesis
description: Learn about enable amazon kinesis in Cloudflare Logs.
image: https://developers.cloudflare.com/core-services-preview.png
---

> Documentation Index  
> Fetch the complete documentation index at: https://developers.cloudflare.com/logs/llms.txt  
> Use this file to discover all available pages before exploring further.

[Skip to content](#%5Ftop) 

# Enable Amazon Kinesis

Logpush supports [Amazon Kinesis ↗](https://aws.amazon.com/kinesis/) as a destination for all datasets. Each Kinesis record that Logpush sends will contain a batch of GZIP-compressed data in newline-delimited JSON format (by default), or in the format specified in the [output\_options](https://developers.cloudflare.com/logs/logpush/logpush-job/log-output-options/) parameter when the job was created.

## Configure Kinesis using STS Assume Role (recommended)

1. Create an IAM Role for Cloudflare Logpush to Assume with the following trust relationship:

```

{

    "Version": "2012-10-17",

    "Statement": [

        {

            "Effect": "Allow",

            "Principal": {

                "AWS": [

                    "arn:aws:iam::391854517948:user/cloudflare-logpush"

                ]

            },

            "Action": "sts:AssumeRole"

        }

    ]

}


```

1. Ensure that the IAM role has permissions to perform the `PutRecord` action on your Kinesis stream. Replace `<AWS_REGION>`, `<YOUR_AWS_ACCOUNT_ID>` and `<STREAM_NAME>` with your own values:

```

{

    "Version": "2012-10-17",

    "Statement": [

        {

            "Effect": "Allow",

            "Action": "kinesis:PutRecord",

            "Resource": "arn:aws:kinesis:<AWS_REGION>:<YOUR_AWS_ACCOUNT_ID>:stream/<STREAM_NAME>"

        }

    ]

}


```

1. Create a Logpush job, using the following format for the `destination_conf` field:

Terminal window

```

kinesis://<STREAM_NAME>?region=<AWS_REGION>&sts-assume-role-arn=arn:aws:iam::<YOUR_AWS_ACCOUNT_ID>:role/<IAM_ROLE_NAME>


```

1. (optional) When using STS Assume Role, you can include `sts-external-id` as a `destination_conf` parameter so it is included in your Logpush job's requests to Kinesis. Refer to [Securely Using External ID for Accessing AWS Accounts Owned by Others ↗](https://aws.amazon.com/blogs/apn/securely-using-external-id-for-accessing-aws-accounts-owned-by-others/) for more information.

Terminal window

```

kinesis://<STREAM_NAME>?region=<AWS_REGION>&sts-assume-role-arn=arn:aws:iam::<YOUR_AWS_ACCOUNT_ID>:role/<IAM_ROLE_NAME>&sts-external-id=<EXTERNAL_ID>


```

### STS Assume Role example

Terminal window

```

$ curl https://api.cloudflare.com/client/v4/zones/$ZONE_TAG/logpush/jobs \

-H 'Authorization: Bearer <API_TOKEN>' \

-H 'Content-Type: application/json' -d '{

  "name": "kinesis",

  "destination_conf": "kinesis://<STREAM_NAME>?region=<AWS_REGION>&sts-assume-role-arn=arn:aws:iam::<YOUR_AWS_ACCOUNT_ID>:role/<IAM_ROLE_NAME>",

  "dataset": "http_requests",

  "enabled": true

}'


```

## Configure Kinesis using IAM Access Keys

When configuring your Logpush job using IAM Access Keys, ensure that the IAM user has permission to perform the `PutRecord` action on your Kinesis stream:

Terminal window

```

kinesis://<STREAM_NAME>?region=<AWS_REGION>&access-key-id=<AWS_ACCESS_KEY_ID>&secret-access-key=<AWS_SECRET_ACCESS_KEY>


```

### IAM Access Key example

Terminal window

```

$ curl https://api.cloudflare.com/client/v4/zones/$ZONE_TAG/logpush/jobs \

-H 'Authorization: Bearer <API_TOKEN>' \

-H 'Content-Type: application/json' -d '{

  "name": "kinesis",

  "destination_conf": "kinesis://<STREAM_NAME>?region=<AWS_REGION>&access-key-id=<AWS_ACCESS_KEY_ID>&secret-access-key=<AWS_SECRET_ACCESS_KEY>",

  "dataset": "http_requests",

  "enabled": true

}'


```

```json
{"@context":"https://schema.org","@type":"TechArticle","@id":"https://developers.cloudflare.com/logs/logpush/logpush-job/enable-destinations/kinesis/#page","headline":"Enable Amazon Kinesis · Cloudflare Logs docs","description":"Learn about enable amazon kinesis in Cloudflare Logs.","url":"https://developers.cloudflare.com/logs/logpush/logpush-job/enable-destinations/kinesis/","inLanguage":"en","image":"https://developers.cloudflare.com/core-services-preview.png","dateModified":"2026-04-23","publisher":{"@type":"Organization","name":"Cloudflare","url":"https://www.cloudflare.com/"},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"}}
{"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"item":{"@id":"/directory/","name":"Directory"}},{"@type":"ListItem","position":2,"item":{"@id":"/logs/","name":"Logs"}},{"@type":"ListItem","position":3,"item":{"@id":"/logs/logpush/","name":"Logpush"}},{"@type":"ListItem","position":4,"item":{"@id":"/logs/logpush/logpush-job/","name":"Logpush job setup"}},{"@type":"ListItem","position":5,"item":{"@id":"/logs/logpush/logpush-job/enable-destinations/","name":"Enable destinations"}},{"@type":"ListItem","position":6,"item":{"@id":"/logs/logpush/logpush-job/enable-destinations/kinesis/","name":"Enable Amazon Kinesis"}}]}
```
