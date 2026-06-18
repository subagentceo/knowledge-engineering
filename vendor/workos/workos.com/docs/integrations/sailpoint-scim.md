# SailPoint SCIM

## Introduction

To set up a SailPoint SCIM v2.0 directory sync connection, you'll need to provide the organization's IT team with specific configuration details from WorkOS. This allows their SailPoint SCIM server to synchronize users and groups with your application.

***

## What WorkOS provides

When setting up a SailPoint SCIM directory sync connection, WorkOS provides two key pieces of information that you'll need to share with the organization:

- [Endpoint](https://workos.com/docs/glossary/endpoint): The URL where the SailPoint SCIM server will send requests
- [Bearer Token](https://workos.com/docs/glossary/bearer-token): Authentication credentials for the endpoint requests

Both of these are available in the **Directory details** section of the directory sync connection in the [WorkOS Dashboard](https://dashboard.workos.com/).

![The WorkOS dashboard, highlights the directory details card with filled endpoint and bearer token inputs](https://images.workoscdn.com/images/1ae8c088-07d6-4512-9abf-1adec38f6b0b.png?auto=format\&fit=clip\&q=50)

These settings enable the organization's SailPoint SCIM server to securely send user and group data to your application through WorkOS.

***

## What you will need

The organization's IT team will handle the SailPoint SCIM server configuration on their end. You simply need to provide them with the endpoint URL and bearer token from the WorkOS Dashboard.

Typically, the organization's IT team will use these values to configure your application within their SailPoint SCIM server or identity provider admin dashboard.

***

## (1) Set up your directory sync endpoint

Login to the [WorkOS Dashboard](https://dashboard.workos.com/).

In the left navigation menu, select the **Organizations** tab. Select the appropriate organization for which you will enable a SailPoint SCIM directory sync connection.

On the organization's page, scroll down to the **Directory Sync** section. Click **Configure manually**.

![WorkOS Dashboard showing directory sync card with configure manually button highlighted](https://images.workoscdn.com/images/ebf08eb3-a698-4498-adde-1b551ab0f519.png?auto=format\&fit=clip\&q=50)

Select **SailPoint** as the directory type. Input an appropriate name for the connection. Click **Create Directory**.

![The WorkOS Dashboard with a create directory dialog showing directory type and name inputs](https://images.workoscdn.com/images/aa5a17d9-0990-4af6-a61f-1640658650e1.png?auto=format\&fit=clip\&q=50)

The directory sync connection will now display the endpoint for the SailPoint SCIM server and the bearer token.

> We have support for custom labeled URLs for directory sync endpoints. [Contact us](mailto:support@workos.com) for more info!

***

## (2) Provide SailPoint SCIM configuration to the organization

Copy the **Endpoint** and **Bearer Token** from the **Directory details** section on the directory page of the WorkOS Dashboard.

Provide these values to the organization's IT team so they can configure the application within their SailPoint SCIM server or identity provider admin dashboard:

- **Endpoint URL**: The destination where their SailPoint SCIM server will send user and group data
- **Bearer Token**: Authentication credentials for secure communication

Once the organization has configured these values in their SailPoint SCIM server, your application will be ready to receive real-time user and group synchronization.

***

## (3) Assign users and groups to your application

Now, whenever the organization assigns users or groups to your application in their directory, you'll receive real-time dashboard updates based on changes in their system.

A detailed guide to integrate the WorkOS API with your application can be found [here](https://workos.com/docs/directory-sync).
