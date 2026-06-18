# CyberArk SCIM

## Introduction

This guide outlines how to synchronize your application's CyberArk directories using SCIM.

To synchronize an organization's users and groups provisioned for your application, you'll need to provide the organization with two pieces of information:

- An [Endpoint](https://workos.com/docs/glossary/endpoint) that CyberArk will make requests to.
- A [Bearer Token](https://workos.com/docs/glossary/bearer-token) for CyberArk to authenticate its endpoint requests.

After completing step 1 below, both of these are available in your Endpoint's Settings in the [WorkOS Dashboard](https://dashboard.workos.com/).

> The rest of the steps below will need to be carried out by the organization when configuring your application in their CyberArk instance.

***

## (1) Set up your directory in the WorkOS Dashboard

In your WorkOS Dashboard, select or create an Organization. Then select "Manually Configure Directory".

![A screenshot showing where to select "Manually Configure Directory" in the WorkOS dashboard.](https://images.workoscdn.com/images/2865e608-6524-4bd6-8f35-070de0d6cf2b.png?auto=format\&fit=clip\&q=50)

Select "CyberArk" as the Directory Provider and add a descriptive name for the directory sync connection.

![A screenshot showing the proper configuration of the "Create Directory" modal in the WorkOS dashboard.](https://images.workoscdn.com/images/ea86a861-c18c-4d8b-ad92-5942f11a98c7.png?auto=format\&fit=clip\&q=50)

On the Directory Sync connection settings page, save the Endpoint and the Bearer Token. You'll input these in the CyberArk settings.

![A screenshot showing the Endpoint and Bearer Token in the WorkOS dashboard.](https://images.workoscdn.com/images/f77f41f5-8641-4452-b933-3a2d3f2351c5.png?auto=format\&fit=clip\&q=50)

> We have support for whitelabeled URLs for Directory Sync endpoints. [Contact us](mailto:support@workos.com) for more info!

***

## (2) Select or create your CyberArk application

CyberArk supports SCIM provisioning in the context of a SAML app. The usual set up is to enable SAML first, following [our docs here](https://workos.com/docs/integrations/cyberark-saml).

Log in to the CyberArk Admin Portal, and navigate to your SAML app. Open the "Provisioning" tab, and select the box to "Enable provisioning for this application".

![A screenshot showing where to enable the "Enable provisioning for this application" setting in the CyberArk dashboard.](https://images.workoscdn.com/images/83b18d01-90d6-4cf2-8866-84c2046cd1f5.png?auto=format\&fit=clip\&q=50)

Click "Yes" in the confirmation modal.

![A screenshot showing where to select "Yes" in the confirmation modal in the CyberArk dashboard.](https://images.workoscdn.com/images/38f35897-4fb6-47d0-9445-53b0405b8809.png)

Enter the Endpoint from the WorkOS Dashboard into the "SCIM Service URL" field, and enter the Bearer Token from the WorkOS Dashboard into the corresponding field in the Provisioning tab. Select "Verify" to save these credentials.

![A screenshot showing where to input the WorkOS Endpoint as the "SCIM Service URL" and the Bearer Token in the CyberArk dashboard.](https://images.workoscdn.com/images/2bee64a8-cbb8-4d31-9f35-4f2bb3c237bd.png)

Once the credentials have been verified, more options will be appear below. Deselect "Do not de-provision (deactivate or delete) users in target application" as seen below.

![A screenshot showing which checkboxes to disable in the CyberArk dashboard.](https://images.workoscdn.com/images/f8e6980a-76f7-4cf5-a5c5-958dae8268ba.png)

***

## (3) Configure your role mappings in CyberArk

Users assigned to the SAML app will be synced, and roles mapped will be synced as groups. The roles are mapped on the Provisioning settings page, by selecting the "Add" button.

![A screenshot showing where to select "Add" in the CyberArk dashboard.](https://images.workoscdn.com/images/8a6039da-ccc0-493d-9888-40337e70da74.png)

In the role mapping modal, select the role you'd like to map, and then create a destination group. The name will be what you see as the group name in directory sync. All users assigned to that role will be members of the mapped group. Select "Done".

![A screenshot showing how to configure the "Role" and "Destination Group" settings in the "Role Mapping" modal of the CyberArk dashboard.](https://images.workoscdn.com/images/34f5f6cf-5011-4540-a911-d68d583e8411.png)

After the role mapping is completed, click "Save". The SCIM configuration part of the setup is complete.

***

## (4) Trigger the directory sync run in CyberArk

In CyberArk, navigate to the Settings → Users → Outbound Provisioning page. Under Synchronizations, start the sync. You can also set up scheduled syncs here.

![A screenshot showing where to select "Start Sync" in the "Outbound Provisioning" settings in the CyberArk dashboard.](https://images.workoscdn.com/images/fe15e2da-4312-4b22-9750-6d9657d569f2.png)

In the CyberArk SCIM directory in the WorkOS dashboard, select the "Users" tab and you will now see the users and groups synced over.

![A screenshot showing the populated "Users" tab in the CyberArk SCIM directory in the WorkOS dashboard.](https://images.workoscdn.com/images/fd7f1d1b-4390-44e5-9aa6-95308d911829.png)

A detailed guide to integrate the WorkOS API with your application can be found [here](https://workos.com/docs/directory-sync)

## Frequently asked questions

### When a group is removed, I don't see a `dsync.group.deleted` or `dsync.group.user_removed` events - is this expected?

Instead of individually assigning users to a SCIM application, CyberArk SCIM requires that users are assigned to the application through group membership.

It is a known issue with CyberArk SCIM that when a group is removed from the app, no indication is received that the group has changed.

The users of the group must be cleaned up before the group itself is removed from the SCIM application.
