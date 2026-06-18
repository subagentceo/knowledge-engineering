# OneLogin SCIM

## Introduction

This guide outlines how to synchronize your application's OneLogin directories using SCIM.

To synchronize an organization's users and groups provisioned for your application, you'll need to provide the organization with two pieces of information:

- An [Endpoint](https://workos.com/docs/glossary/endpoint) that OneLogin will make requests to.
- A [Bearer Token](https://workos.com/docs/glossary/bearer-token) for OneLogin to authenticate its endpoint requests.

Both of these are available in your Endpoint's Settings in the [WorkOS Dashboard](https://dashboard.workos.com/).

> Steps 2, 3, and 4 below will need to be carried out by the organization when configuring your application in their OneLogin instance.

***

## (1) Set up your directory sync endpoint

Login to your WorkOS Dashboard and select "Organizations" from the left hand navigation bar.

Select the Organization you'll be configuring a new Directory Sync for.

Click "Add Directory".

![A screenshot showing where to find "Add Directory" in the WorkOS Dashboard.](https://images.workoscdn.com/images/2c4f3933-c473-458b-97be-ea22c70f84f0.png?auto=format\&fit=clip\&q=50)

Select "OneLogin" from the dropdown and enter the organization name.

Then, click "Create Directory."

![A screenshot showing "Create Directory" details in the WorkOS Dashboard.](https://images.workoscdn.com/images/0e8ef0ef-5030-46c1-a0fa-65540bc67dc5.png?auto=format\&fit=clip\&q=50)

Your OneLogin directory sync has now been created successfully with an Endpoint and Bearer Token.

![A screenshot showing where to find the "Endpoint" and "Bearer Token" for an organization in the WorkOS Dashboard.](https://images.workoscdn.com/images/7bad6045-0611-4c6d-8d11-754f3d878bbb.png?auto=format\&fit=clip\&q=50)

> We have support for custom labeled URLs for Directory Sync endpoints. [Contact us](mailto:support@workos.com) for more info!

***

## (2) Select or create your OneLogin application

Log in to the OneLogin admin dashboard, select the "Applications" tab at the top. If the application has already been created, select it and move to step 3. Otherwise, select "Add App".

![A screenshot showing where to select "Add App" in OneLogin](https://images.workoscdn.com/images/c5f77445-e09f-4e21-8911-a240e6deee26.png?auto=format\&fit=clip\&q=50)

Search for "SCIM" in the text field and select the Application with type "SCIM Provisioner with SAML (SCIM V2 Enterprise)".

![A screenshot showing where to search for "SCIM" and select the application "SCIM Provisioner with SAML (SCIM V2 Enterprise)"](https://images.workoscdn.com/images/a47d721e-db6f-490b-b3e0-9ac284bd3464.png?auto=format\&fit=clip\&q=50)

Give your Application a descriptive Display Name and hit "Save".

![A screenshot showing where to add a "Display Name" to your App in OneLogin](https://images.workoscdn.com/images/4dd4042a-847e-4fde-b835-750a2f0c5644.png?auto=format\&fit=clip\&q=50)

***

## (3) Configure your integration

Within the SCIM Application, select the "Configuration" tab on the left.

Copy and paste the Endpoint from your [WorkOS Dashboard](https://dashboard.workos.com/) into the "SCIM Base URL" field.

Then, copy and paste the Bearer Token from your [WorkOS Dashboard](https://dashboard.workos.com/) into the "SCIM Bearer Token" field.

Hit "Enable" under "API Status" and then hit "Save".

![A screenshot showing where to select the "Configure" tab and input your "SCIM Base URL" and "SCIM Bearer Token" in your SCIM App in OneLogin](https://images.workoscdn.com/images/12411c31-4662-4da1-9e94-7348e46ddc50.png?auto=format\&fit=clip\&q=50)

Select the "Provisioning" tab on the left. Check the "Enable provisioning" box and hit "Save".

![A screenshot showing where to select "Provisioning" tab select "Enable Provisioning" in OneLogin](https://images.workoscdn.com/images/94f76ad5-30ad-4d65-a3c7-6a18ec0e0683.png?auto=format\&fit=clip\&q=50\&w=2048)

Select the "Parameters" tab on the left. Then select "Groups".

![A screenshot showing where to select the "Parameters" then select the "Groups" in OneLogin SCIM App](https://images.workoscdn.com/images/54c10855-69e5-4484-8ccd-44f2fe89baf3.png?auto=format\&fit=clip\&q=50)

In the modal that pops up, check the box next to "Include in User Provisioning" and hit "Save".

![A screenshot showing how to select "Include in User Provisioning" in the "Parameters" tab in OneLogin](https://images.workoscdn.com/images/09795f59-f7c0-4b04-97d5-9044fb05d987.png?auto=format\&fit=clip\&q=50)

***

## (4) Assign users and groups to your application

In order for your users and groups to be synced, you will need to assign them to your OneLogin Application. Select "Users" from the top navigation menu.

Next, find a user you'd like to provision to the SCIM app. Within that user profile, select the "Applications" tab on the left. Then, click the "+" symbol.

![A screenshot showing where to select "+" in the "Applications" tab in OneLogin](https://images.workoscdn.com/images/ee1e01fa-26f3-49e1-8515-3fedfbdee14b.png?auto=format\&fit=clip\&q=50)

Select the appropriate app and hit "Continue".

![A screenshot showing how to select SCIM App to assign OneLogin User](https://images.workoscdn.com/images/f00d45d9-7128-43dd-8bdb-cc48e7eebf7b.png?auto=format\&fit=clip\&q=50)

Select "Save" in the next modal to confirm the change.

![A screenshot showing how to save User Assignment in OneLogin](https://images.workoscdn.com/images/e9e5ef85-5efb-4b71-8283-e8d570f3103e.png?auto=format\&fit=clip\&q=50)

There are many ways to provision groups in OneLogin. Below is one method that we recommend, but other methods can be used.

In the top navigation, Select "Users" and then "Roles" from the dropdown. Select "New Role".

![A screenshot showing how to create a "New Role" in OneLogin](https://images.workoscdn.com/images/ecb269b5-bfe0-41f7-b73f-11a152ac0197.png?auto=format\&fit=clip\&q=50)

Give the Role a name (this will be the name of the group), select the appropriate SCIM application, and hit "Save".

![A screenshot showing how to configure and save the "Role" in OneLogin](https://images.workoscdn.com/images/9924f509-c60a-47b5-ae30-017c361d1b55.png?auto=format\&fit=clip\&q=50)

Click the "Users" tab for the role. Search for any users you'd like to assign to that role and hit "Add To Role". Then hit "Save".

![A screenshot showing how to add Users to "Role" in OneLogin](https://images.workoscdn.com/images/b4a4be2a-f75f-4dfe-adb9-dea585be0fce.png?auto=format\&fit=clip\&q=50\&w=2048)

Click "Save" in the next modal to confirm.

![A screenshot showing where to click "Save" assignments to "Role" in OneLogin](https://images.workoscdn.com/images/0a6ebdb2-3896-4481-8e11-ca9f1a23ecd0.png?auto=format\&fit=clip\&q=50\&w=2048)

Navigate back to your SCIM app and click on the "Rules" tab on the left. Then, hit "Add Rule".

![A screenshot showing the "Rule" tab where you can then click "Add Rule" in OneLogin](https://images.workoscdn.com/images/317311e1-4fac-487f-a30e-2aeeb6e0d30a.png?auto=format\&fit=clip\&q=50\&w=2048)

Give your Rule a name. Under "Actions", select "Set Groups in your-app-name". Then, set it to "For each role with value that matches your-role-name". Hit "Save".

![A screenshot showing how to configure a "New Mapping" in OneLogin](https://images.workoscdn.com/images/02d19425-34e2-45b3-bb64-bc3962714493.png?auto=format\&fit=clip\&q=50)

Within your SCIM app under the "Users" tab, you may then need to click on any "Pending" notifications to confirm the update for users.

![A screenshot showing how to confirm updates for Users under the "Users" tab in OneLogin](https://images.workoscdn.com/images/3aa55536-48e8-4322-9e5e-7227c4099f9c.png?auto=format\&fit=clip\&q=50)

Begin provisioning users and groups and witness realtime changes in your [WorkOS Dashboard](https://dashboard.workos.com/).

![A screenshot showing a linked Directory in the WorkOS Dashboard](https://images.workoscdn.com/images/d33ff319-a791-4ed0-9df4-e7fba02bcce5.png?auto=format\&fit=clip\&q=50)

A detailed guide to integrate the WorkOS API with your application can be found [here](https://workos.com/docs/directory-sync)

## Frequently asked questions

### When a group is removed, I don't see a `dsync.group.deleted` or `dsync.group.user_removed` events - is this expected?

It is a known issue with OneLogin SCIM that when a group is removed from the application, any user that is *only* provisioned through that group will be "inactive" but otherwise no indication is received that the group has changed.

The users of the group must be cleaned up before the group itself is removed from the SCIM application.
