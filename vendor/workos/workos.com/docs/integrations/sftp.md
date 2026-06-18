# SFTP

## Introduction

To set up an SFTP (Secure File Transfer Protocol) directory sync connection, you'll need to provide the organization's IT team with specific configuration details from WorkOS. This allows them to upload CSV files containing user and group information via SFTP.

WorkOS maintains a receiving SFTP server that the organization's HRIS provider or SFTP client can connect to.

If the organization's HRIS has a built-in SFTP client, SFTP will allow them to automatically sync their data and ensure their data is always up to date. An SFTP integration allows for provider-agnostic ingestion of employee data into your product ecosystem.

Once the integration is set up, WorkOS automatically creates and hosts an SFTP folder for the organization's HRIS provider to upload files at a regular cadence.

An SFTP integration has the following advantages:

- Works with any system that has the ability to export CSVs
- Has an easy integration path for an organization comfortable working with CSVs and SFTP
- Allows a custom cadence of updates for your customer

Your application interfaces with an SFTP directory the same as with other directories; receiving [events](https://workos.com/docs/events) when the directory is created or updated:

***

## What WorkOS provides

When setting up an SFTP directory sync connection, WorkOS provides two key pieces of information that you'll need to share with the organization:

- **SFTP Server URL**: The location where the organization will upload user and group CSV files
- **Username**: Authentication credentials for SFTP access

These are available in your directory's settings in the [WorkOS Dashboard](https://dashboard.workos.com/) once the connection is configured.

![SFTP directory details in the WorkOS Dashboard.](https://images.workoscdn.com/images/46c63f08-579e-4e60-8cb6-b20d6f95ff8b.png?auto=format\&fit=clip\&q=50)

The SFTP server uses public key authentication, providing secure file transfer capabilities for user and group data synchronization.

***

## What you will need

The organization will need to provide a public key for authentication and prepare their user and group data in the required CSV format.

You will need to obtain from the organization:

- **Public Key**: For SFTP authentication (maximum key length is 2048 bytes; supported keys are: `ED25519`, `RSA`, and `ECDSA`)

The organization will need to export their users and groups as CSV files with the structure below.

### `users.csv`

This file is required.

| Field | Status | Description |
| --- | --- | --- |
| `user_id` | Required | A unique ID representing the user |
| `first_name` | Required | The first name of the user |
| `last_name` | Required | The last name of the user |
| `email` | Required | The primary work email for the user |
| `username` | Optional | A unique human readable user name |
| `job_title` | Optional | The job title of the user |
| `employee_type` | Optional | The type of employee |
| `employment_start_date` | Optional | The date the user started working |
| `display_name` | Optional | The display name of the user |
| `department_name` | Optional | The name of the department the user belongs to |
| `manager_name` | Optional | The name of the user's manager |
| `manager_email` | Optional | The email of the user's manager |
| `manager_id` | Optional | The identifier of the user's manager from the directory provider |
| `division_name` | Optional | The name of the division the user belongs to |
| `cost_center_name` | Optional | The name of the cost center the user belongs to |
| `work_address_street` | Optional | Work street address |
| `work_address_locality` | Optional | Work city |
| `work_address_region` | Optional | Work state |
| `work_address_postal_code` | Optional | Work postal/zip code |
| `work_address_country` | Optional | Work country |

### `user_groups.csv`

This file is *optional*.

| Field | Status | Description |
| --- | --- | --- |
| `group_name` | Required | The name of the group |
| `user_id` | Required | The ID of the user. Must match the user_id on the users.csv file |

### `groups.csv`

This file is *optional*. Additional metadata may be also included in this file.

| Field | Status | Description |
| --- | --- | --- |
| `group_name` | Required | The name of the group. Must match the group_name on the user_groups.csv file |

***

## (1) Set up your directory sync endpoint

Login to the [WorkOS Dashboard](https://dashboard.workos.com/).

In the left navigation menu, select the **Organizations** tab. Select the appropriate organization for which you will enable a SFTP directory sync connection.

On the organization's page, scroll down to the **Directory Sync** section. Click **Configure manually**.

![WorkOS Dashboard showing directory sync card with configure manually button highlighted](https://images.workoscdn.com/images/ebf08eb3-a698-4498-adde-1b551ab0f519.png?auto=format\&fit=clip\&q=50)

Select **SFTP** as the directory type. Input an appropriate name for the connection. Click **Create Directory**.

![The WorkOS Dashboard with a create directory dialog](https://images.workoscdn.com/images/e1010105-9c22-4d20-88d0-8b316df97ad2.png?auto=format\&fit=clip\&q=50)

***

## (2) Configure SFTP authentication

Obtain the public key from the organization's admin that will be used for SFTP authentication.

From the directory page in the WorkOS Dashboard, in the **Directory details** section click the **Update Directory** button.

![A screenshot showing where to find "Update directory" for an Organization in the WorkOS Dashboard.](https://images.workoscdn.com/images/d0847fd0-b9c9-4ec2-aa1e-b69c6aac1fa5.png?auto=format\&fit=clip\&q=50)

Paste the organization's public key into the input field.

The SSH public key format should include the key type (e.g. `ssh-rsa`, `ssh-ed25519`), base64 encoded body, and an optional comment, with spaces between each element. For example, `ssh-rsa AAAABB1 keycomment`.

RSA, ECDSA, and ED25519 keys are accepted:

- For RSA keys, the key type is `ssh-rsa`.
- For ED25519 keys, the key type is `ssh-ed25519`.
- For ECDSA keys, the key type is either `ecdsa-sha2-nistp256`, `ecdsa-sha2-nistp384`, or `ecdsa-sha2-nistp521`, depending on the size of the key generated.

![A screenshot showing how to update SFTP directory details in the WorkOS Dashboard.](https://images.workoscdn.com/images/77a535f1-87d4-410f-bd7c-09a4535e53c2.png?auto=format\&fit=clip\&q=50)

***

## (3) Provide SFTP configuration to the organization

After adding the public key, WorkOS generates a username. You will see the green **Linked** icon appear.

Copy the **Username** and SFTP server URL from the WorkOS Dashboard.

Share these values with the organization so they can configure their SFTP client:

- **SFTP Server**: `sftp.workos.com`
- **Username**: The generated username from the WorkOS Dashboard
- **Authentication**: Their private key (corresponding to the public key you uploaded)

Instruct the organization to upload their CSV files using these credentials.

***

## (4) Confirm users and groups are synced

Now, whenever your customer uploads updated CSV files via SFTP, you'll receive updates based on the changes in their directory data.

The **Users** tab within the SFTP connection displays synced users.

A detailed guide to integrate the WorkOS API with your application can be found [here](https://workos.com/docs/directory-sync)

## SFTP Security

### How is my organization's data protected in transit?

SFTP uses SSH (Secure Shell protocol) to symmetrically encrypt traffic after an asymmetric key negotiation for authentication.

Our solution leverages the [AWS Transfer Family](https://docs.aws.amazon.com/transfer/latest/userguide/how-aws-transfer-works.html), so that we can support a common, secure protocol (SSH) with modern, isolated data storage (AWS S3).

We leverage the default security policy ([security-policy-transfer-2020-06](https://docs.aws.amazon.com/transfer/latest/userguide/security-policies.html#security-policy-transfer-2020-06)) for the choice of SSH cipher-suites, which determines the strength of cryptographic protection for data in transit.

### How is my organization's data protected at rest?

As the data is stored in an AWS S3 bucket the default (since January 2023) is that it is encrypted at rest ([SSE-S3](https://docs.aws.amazon.com/AmazonS3/latest/userguide/bucket-encryption.html)).
The symmetric encryption used is AES-256, more information is available in [the FAQ](https://docs.aws.amazon.com/AmazonS3/latest/userguide/default-encryption-faq.html).

### How does WorkOS isolate one of my organization's data from the other?

Each of the organizations you onboard will [create an SSH key pair](https://workos.com/docs/integrations/sftp/what-you-will-need), this consists of a public key, and a private key. They will retain the private key, ensuring that only they can authenticate. The public key uploaded to WorkOS will be used to authenticate the organization's connection via SFTP.

Each of your organizations is mapped to a distinct S3 bucket based on an internal (cryptographically random) identifier for the SSH key pair.

### When does WorkOS dispose of the data and how is this done?

In either of the following events your organization's data, and the S3 bucket will be deleted:

1. You off-board the organization from your product/service.
2. You no longer use the WorkOS Directory Sync service.

***

## Frequently asked questions

### How often do SFTP directories perform a sync?

SFTP directories will sync automatically whenever file changes are detected and every 30 minutes following the initial synchronization.
