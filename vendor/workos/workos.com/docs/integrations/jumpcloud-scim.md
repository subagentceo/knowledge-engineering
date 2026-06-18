# JumpCloud SCIM

## Introduction

This guide outlines how to synchronize your application's JumpCloud directories using SCIM.

To synchronize an organization's users and groups provisioned for your application, you'll need to provide the organization with two pieces of information:

- An [Endpoint](https://workos.com/docs/glossary/endpoint) that JumpCloud will make requests to.
- A [Bearer Token](https://workos.com/docs/glossary/bearer-token) for JumpCloud to authenticate its endpoint requests.

Both of these are available in your Endpoint's Settings in the [WorkOS Dashboard](https://dashboard.workos.com/).

> Steps 2, 3, and 4 below will need to be carried out by the organization when configuring your application in their JumpCloud instance.

***

## (1) Set up your Directory Sync endpoint

Login to your WorkOS Dashboard and select "Organizations" from the left hand navigation bar.

Select the organization you'll be configuring a new Directory Sync for.

Under "Actions" click "Add Directory".

![A screenshot highlighting the "Add Directory" option within an Organization in the WorkOS Dashboard.](https://images.workoscdn.com/images/5411a8c2-cc56-4593-bc7c-c21c84443dfc.png?auto=format\&fit=clip\&q=50)

Select "JumpCloud" from the dropdown, and enter the organization name.

Then, click "Create Directory."

![A screenshot highlighting the "Create Directory" modal for creating a JumpCloud directory in the WorkOS Dashboard.](https://images.workoscdn.com/images/6aaf218c-8d81-4ed6-aa8f-682dd3235dc2.png?auto=format\&fit=clip\&q=50)

Your JumpCloud directory sync has now been created successfully with an Endpoint and Bearer Token.

![A screenshot highlighting the "Directory Details" for a JumpCloud directory in the WorkOS Dashboard.](https://images.workoscdn.com/images/eaad1aef-522e-4f01-a298-3a6b093aa8a1.png?auto=format\&fit=clip\&q=50)

> We have support for custom labeled URLs for Directory Sync endpoints. [Contact us](mailto:support@workos.com) for more info!

***

## (2) Select or create your JumpCloud application

Log in to the JumpCloud admin dashboard, select "SSO" on the left and select your Application.

![Select or Create JumpCloud App](https://images.workoscdn.com/images/26901dbc-8236-46b4-a46f-8c828152fe60.png?auto=format\&fit=clip\&q=50)

If you haven't created an application, you'll need to first create a custom SAML application in JumpCloud. JumpCloud only supports configuring SCIM provisioning in an existing SAML application. You can use our JumpCloud SAML documentation to configure your SAML application before moving on to SCIM provisioning.

***

## (3) Configure your integration

Select "Identity Management" from the top navigation menu.

![A screenshot highlighting the "SSO" tab and app selection in the JumpCloud admin dashboard.](https://images.workoscdn.com/images/58194668-19eb-4b3b-b07d-a5023d05e766.png?auto=format\&fit=clip\&q=50)

Scroll down to the "Configuration settings" section. Make sure SCIM 2.0 is selected as the SCIM version.

Copy and paste the Endpoint from your [WorkOS Dashboard](https://dashboard.workos.com/) in the "Base URL" field.

Then, copy and paste the Bearer Token from your [WorkOS Dashboard](https://dashboard.workos.com/) into the "Token Key" field.

Next, test the connection to confirm the configuration settings.

![A screenshot highlighting the "Base URL" and "Token Key" input fields in the JumpCloud admin dashboard.](https://images.workoscdn.com/images/6096c0db-b7f6-45ea-aa44-b1f53f167d12.png?auto=format\&fit=clip\&q=50)

After you receive a success message for the configuration, make sure the Group Management toggle is "On", and then activate the settings.

![A screenshot highlight the "Group Management" field toggled on in the JumpCloud admin dashboard.](https://images.workoscdn.com/images/aa71e757-ec72-4f72-9551-cd43e72cf44b.png?auto=format\&fit=clip\&q=50)

After the activation step is successful, save the configuration.

![A screenshot highlighting the "Save" button in the JumpCloud admin dashboard.](https://images.workoscdn.com/images/3a8a81bc-e204-4368-b281-6aec5666b817.png?auto=format\&fit=clip\&q=50)

***

## (4) Assign users and groups to your application

In order for your users and groups to be synced, you will need to assign them to your JumpCloud Application. Select "User Groups" from the top navigation menu.

Select the groups of users you would like to sync and save your changes.

![A screenshot highlighting the User Groups tab in the JumpCloud admin dashboard.](https://images.workoscdn.com/images/505e3ec4-0f83-4e68-a384-1d056f674b23.png?auto=format\&fit=clip\&q=50)

Begin provisioning users and groups and witness realtime changes in your [WorkOS Dashboard](https://dashboard.workos.com/).

A detailed guide to integrate the WorkOS API with your application can be found [here](https://workos.com/docs/directory-sync)

## Frequently asked questions

### When a group is disconnected from the SCIM application in JumpCloud, I still see users that are a part of that disconnected group in WorkOS and my application – is this expected?

Instead of individually assigning users to a SCIM application, JumpCloud SCIM requires that users are assigned to the application through group membership.

To reflect valid user membership in your application, users should be removed from a group while the group is connected to the SCIM application rather than removing them directly from the application.

To remove an entire group, the group can be deleted from the JumpCloud User Management area while it is connected to the SCIM application.

### What is the `idp_id` for directory groups from JumpCloud?

JumpCloud provides a unique identifier for each group through the SCIM `externalId` field. This is persisted as the `idp_id` for [directory groups](https://workos.com/docs/reference/directory-sync/directory-group) in WorkOS.
