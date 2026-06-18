# Storing into AWS S3

## Overview

You can write your Video Recordings and Compositions to your Amazon Web Services (AWS) S3 bucket, rather than Twilio's cloud.

> \[!WARNING]
>
> Once you activate external S3 storage, Twilio will stop storing Programmable Video audio/video recordings into the Twilio cloud. It will be your responsibility to manage the security and lifecycle of your recorded content.

Use this feature when you need to meet compliance requirements that exclude reliance on third-party storage.

## Compose Recordings only from Twilio Cloud

Video Recordings and Video Compositions have separate S3 storage settings that you can configure independently per account.

You can't compose Recordings stored in AWS S3 because Twilio needs direct access to create the Composition. To compose your Recordings, store them in Twilio's cloud. After you create the Composition, you can permanently delete the original Recordings using the Twilio Video Recordings API.

## Prerequisites

To configure external S3 storage, you will need the following:

* **The AWS S3 bucket URL:** The URL for the AWS S3 bucket.
* **The AWS credentials:** The access key ID and secret access key for an AWS Identity and Access Management (IAM) user with write access to the bucket.

### Create an AWS S3 bucket and obtain its URL

[Amazon Simple Storage Service (Amazon S3)](https://aws.amazon.com/s3) lets you store and retrieve data from anywhere on the web. In Amazon S3, objects are stored into "buckets". Buckets are virtual folders where objects can be written, read, and deleted.

#### Step 1: Create an AWS S3 bucket

Follow the AWS instruction to [create a general-purpose bucket](https://docs.aws.amazon.com/AmazonS3/latest/user-guide/create-bucket.html). Twilio does not require any specific bucket configuration. You can use any bucket configuration that works for your application.

Note down the following details:

* **`bucket-name`**: Must follow the [DNS naming rules](https://docs.aws.amazon.com/AmazonS3/latest/dev/BucketRestrictions.html#bucketnamingrules).
* **`bucket-region`**: The AWS region where your S3 bucket is located.

#### Step 2: Get your AWS S3 bucket URL

Follow the AWS instructions to [access your bucket](https://docs.aws.amazon.com/AmazonS3/latest/dev/UsingBucket.html#access-bucket-intro). We recommend that you use the virtual-host-style URL based on the scheme:

```bash
https://bucket-name.s3-aws-region-code.amazonaws.com
```

Replace `bucket-name` with your bucket name and `aws-region-code` with the AWS region code corresponding to your `bucket-region`. To find your `aws-region-code`, see the [AWS region code list](https://docs.aws.amazon.com/AWSEC2/latest/UserGuide/using-regions-availability-zones.html).

After completing this step, you should have an AWS S3 Bucket URL like the following example:

```bash
https://my-new-bucket.s3-us-east-2.amazonaws.com
```

### Create an IAM user and get its credentials

You can use [IAM](https://aws.amazon.com/iam/) to control access to your AWS services and resources. You need to create an IAM user that can access your AWS resources.

#### Step 1: Create an IAM user

Follow the AWS instruction to [create an IAM user](https://docs.aws.amazon.com/IAM/latest/UserGuide/id_users_create.html#id_users_create_console).

In the IAM console, do the following:

* For **Access type**, select **Programmatic access**.
* Under **Permissions**, select **Attach existing policies directly** and click the **Create policy** button to configure the user permissions.

#### Step 2: Create a custom policy

Choose the JSON editor and create a policy document with write permissions. You can use the following JSON snippet as a template for the policy document.

Replace `my_bucket_name` with your actual `bucket-name`, and `/folder/for/storage/` with the path where you want Twilio to store your recordings within your bucket.

For your specified path:

* `/` is a valid path.
* Make sure to include the `*` wildcard at the end.

After creating the policy, return to the original browser tab and click **Refresh** to see the policy you created. You can then select it and complete the IAM user creation.

```bash
{
    "Version": "2012-10-17",
    "Statement": [
        {
            "Sid": "UploadUserDenyEverything",
            "Effect": "Deny",
            "NotAction": "*",
            "Resource": "*"
        },
        {
            "Sid": "UploadUserAllowPutObject",
            "Effect": "Allow",
            "Action": [
                "s3:PutObject"
            ],
            "Resource": [
                "arn:aws:s3:::my_bucket_name/folder/for/storage/*"
            ]
        }
    ]
}
```

#### Step 3: Save the IAM user credentials

After the user is created, Amazon provides you its credentials. This includes:

* Access key ID
* Secret access key

Store these values securely for later use along with the S3 path where you granted Twilio write permissions (for example, `/folder/for/storage/`).

## Configure Twilio with your AWS credentials

1. Go to the [Twilio Console AWS Credentials](https://www.twilio.com/console/video/tools/credentials/aws) page and click **Create new AWS Credential**.
2. On the popup that opens, provide the **Friendly Name** you want, along with your IAM user's **AWS Access Key Id** and the **AWS Access Secret Key**, then click **Create**.

![AWS credentials creation form with fields for friendly name, access key ID, and secret key.](https://docs-resources.prod.twilio.com/542698cc5a841651b73fba1fc42e56fdc14d8cf1bdc62cf0348dc8a5aaeba841.png)

3. On the **Credentials** page, find the AWS credential you just created. Note down the AWS Credential **SID** that has the format `CRxx`.

![AWS credential management screen in Twilio console showing a credential entry with name, SID, type, and creation date.](https://docs-resources.prod.twilio.com/6311db0350b80acde5b43dc21998955946496a4c5c801730c0c1df8cde4a8ae5.png)

## Configure Twilio to store into the S3 bucket

> \[!NOTE]
>
> When you activate this feature in either Recordings or Compositions, a `.txt` test file is created into your bucket. Twilio uses that file to verify that the write permissions you provided are working. You can remove the file safely if you want.

### Store Recordings into the S3 bucket

You have two options to enable Recordings S3 storage.

**Option 1: Enable S3 Recordings storage using the Twilio Console**

1. Open the Twilio Console for your account or project.
2. Go to [**Video > Manage > Recording settings**](https://www.twilio.com/console/video/recordings/settings).
3. Enable **External S3 Buckets** and specify the **AWS Credential** you created and the **AWS S3 Bucket URL**.
4. Click **Save**.

All recordings created thereafter will be stored in the specified S3 bucket.

**Option 2: Enable S3 Recordings storage using the Recording Settings API**

You can use the [Twilio Recording Settings API](/docs/video/api/external-s3-recordings) to store recordings in an external AWS S3 bucket.

### Store Compositions into the S3 bucket

You have two options to enable Compositions S3 storage.

**Option 1: Enable S3 Compositions storage using the Twilio Console**

1. Open the Twilio Console for your account or project.
2. Go to [**Video > Manage > Composition settings**](https://www.twilio.com/console/video/compositions/settings).
3. Enable **External S3 Buckets**, select the **AWS credential**, and enter the **External S3 Bucket URL**.
4. Click **Save**.

All compositions created thereafter will be stored in the specified S3 bucket.

**Option 2: Enable S3 Compositions storage using the Recording Settings API**

You can use the [Twilio Composition Settings API](/docs/video/api/external-s3-compositions) to store compositions in an external AWS S3 bucket.

## Upload to buckets with server-side encryption (SSE)

Amazon S3 buckets support [SSE](https://docs.aws.amazon.com/AmazonS3/latest/dev/serv-side-encryption.html), which encrypts all data written to disk at the object level.

To store your Twilio Recordings and Compositions in an encrypted S3 bucket, you must use [SSE with AWS KMS keys (SSE-KMS )](https://docs.aws.amazon.com/AmazonS3/latest/dev/UsingKMSEncryption.html).

To use SSE-KMS with Twilio, you must grant access to the KMS key in your policy document. When updating your policy document, do the following:

* Replace the `Resource` ARN parameter in `UploadUserAllowPutObject` with the target `bucket-name` and path, see [Create a custom policy](#step-2-create-a-custom-policy) for more details.
* Replace the `Resource` ARN parameter in `AccessToKmsForEncryption` with the actual KMS ARN using the syntax specified in the [official AWS documentation](https://docs.aws.amazon.com/general/latest/gr/aws-arns-and-namespaces.html#arn-syntax-kms).
* Make sure that the KMS key and the bucket are in the same region. Learn more about [AWS Key Management Service](https://aws.amazon.com/kms/faqs/#What_geographic_region_are_my_keys_stored_in?).

The following example shows how to configure the policy:

```bash
{
    "Version": "2012-10-17",
    "Statement": [
        {
            "Sid": "UploadUserDenyEverything",
            "Effect": "Deny",
            "NotAction": "*",
            "Resource": "*"
        },
        {
            "Sid": "UploadUserAllowPutObject",
            "Effect": "Allow",
            "Action": [
                "s3:PutObject"
            ],
            "Resource": [
                "arn:aws:s3:::my_bucket_name/folder/for/storage/*"
            ]
        },
        {
            "Sid": "AccessToKmsForEncryption",
            "Effect": "Allow",
            "Action": [
                "kms:Encrypt",
                "kms:Decrypt",
                "kms:ReEncrypt*",
                "kms:GenerateDataKey*",
                "kms:DescribeKey"
            ],
            "Resource": [
                "arn:aws:kms:region:account-id:key/key-id"
            ]
        }
    ]
}
```

## Limitations

Twilio Video S3 bucket names can include only 7-bit ASCII characters. Non-ASCII characters, such as `ü`, `ç`, and `é`, aren't permitted.
