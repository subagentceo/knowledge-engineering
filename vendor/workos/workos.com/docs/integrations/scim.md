# SCIM

## Introduction

To set up a SCIM v2.0 directory sync connection, you'll need to provide the organization's IT team with specific configuration details from WorkOS. This allows their SCIM server to synchronize users and groups with your application.

***

## What WorkOS provides

When setting up a SCIM directory sync connection, WorkOS provides two key pieces of information that you'll need to share with the organization:

- [Endpoint](https://workos.com/docs/glossary/endpoint): The URL where the SCIM server will send requests
- [Bearer Token](https://workos.com/docs/glossary/bearer-token): Authentication credentials for the endpoint requests

Both of these are available in the **Directory details** section of the directory sync connection in the [WorkOS Dashboard](https://dashboard.workos.com/). The endpoint is shown as soon as the directory is created, and bearer tokens are generated on demand from the **Bearer tokens** card on the same page.

![The WorkOS Dashboard showing the directory details card with the endpoint and the Bearer tokens card below it](https://images.workoscdn.com/images/1ae8c088-07d6-4512-9abf-1adec38f6b0b.png?auto=format\&fit=clip\&q=50)

These settings enable the organization's SCIM server to securely send user and group data to your application through WorkOS.

> IT contacts can also generate, rotate, and revoke bearer tokens themselves from the [Admin Portal](https://workos.com/docs/admin-portal). See [Bearer token rotation](https://workos.com/docs/admin-portal/token-rotation) for details.

***

## What you will need

The organization's IT team will handle the SCIM server configuration on their end. You simply need to provide them with the endpoint URL and bearer token from the WorkOS Dashboard.

Typically, the organization's IT team will use these values to configure your application within their SCIM server or identity provider admin dashboard.

***

## (1) Set up your directory sync endpoint

Login to the [WorkOS Dashboard](https://dashboard.workos.com/).

In the left navigation menu, select the **Organizations** tab. Select the appropriate organization for which you will enable a SCIM directory sync connection.

On the organization's page, scroll down to the **Directory Sync** section. Click **Configure manually**.

![WorkOS Dashboard showing directory sync card with configure manually button highlighted](https://images.workoscdn.com/images/ebf08eb3-a698-4498-adde-1b551ab0f519.png?auto=format\&fit=clip\&q=50)

Select **Custom SCIM v2.0** as the directory type. Input an appropriate name for the connection. Click **Create Directory**.

![The WorkOS Dashboard with a create directory dialog showing directory type and name inputs](https://images.workoscdn.com/images/aa5a17d9-0990-4af6-a61f-1640658650e1.png?auto=format\&fit=clip\&q=50)

The directory sync connection will now display the endpoint for the SCIM server. To create a bearer token, click **Generate token** on the **Bearer tokens** card. The token is shown once at creation time — copy it before closing the dialog.

> We have support for custom labeled URLs for directory sync endpoints. [Contact us](mailto:support@workos.com) for more info!

***

## (2) Provide SCIM configuration to the organization

Copy the **Endpoint** from the **Directory details** section and the bearer token you generated in the previous step.

Provide these values to the organization's IT team so they can configure the application within their SCIM server or identity provider admin dashboard:

- **Endpoint URL**: The destination where their SCIM server will send user and group data
- **Bearer Token**: Authentication credentials for secure communication

Once the organization has configured these values in their SCIM server, your application will be ready to receive real-time user and group synchronization.

> Need to rotate or revoke a token later? See [Bearer token rotation](https://workos.com/docs/admin-portal/token-rotation) for the full self-serve flow, including how IT contacts can manage tokens directly from the Admin Portal.

***

## (3) Assign users and groups to your application

Now, whenever the organization assigns users or groups to your application in their directory, you'll receive real-time dashboard updates based on changes in their system.

A detailed guide to integrate the WorkOS API with your application can be found [here](https://workos.com/docs/directory-sync)
