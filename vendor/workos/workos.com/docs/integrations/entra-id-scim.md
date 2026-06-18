# Entra ID SCIM (formerly Azure AD)

## Introduction

This guide outlines how to synchronize your application's Entra ID directories using SCIM.

To synchronize an organization's users and groups provisioned for your application, you'll need to provide the organization with two pieces of information:

- An [Endpoint](https://workos.com/docs/glossary/endpoint) that Entra ID will make requests to.
- A [Bearer Token](https://workos.com/docs/glossary/bearer-token) for Entra ID to authenticate its endpoint requests.

Both of these are available in your Endpoint's Settings in the [WorkOS Dashboard](https://dashboard.workos.com/).

> Steps 2, 3, and 4 below will need to be carried out by IT contacts when configuring your application in their Entra ID instance.

***

## (1) Set up your Directory Sync endpoint

Sign in to your WorkOS Dashboard and select "Organizations" from the left hand navigation bar.

Select the organization you'll be configuring a new Directory Sync for.

Click "Add Directory".

![A screenshot showing where to add a new directory in the WorkOS dashboard.](https://images.workoscdn.com/images/cf3a5ae2-4add-47ca-887e-d4d78c33d786.png?auto=format\&fit=clip\&q=50)

Select "Entra ID" from the dropdown, and enter the organization name.

Then, click "Create Directory."

![A screenshot showing the "Create Directory" menu in the WorkOS dashboard.](https://images.workoscdn.com/images/6244ecf4-65a0-4421-b984-d513704ef882.png?auto=format\&fit=clip\&q=50)

> We have support for whitelabeled URLs for Directory Sync endpoints. [Contact us](mailto:support@workos.com) for more info!

Your Entra ID directory sync has now been created successfully with an Endpoint and Bearer Token.

![A screenshot showing the Azure SCIM endpoint and bearer token in the WorkOS dashboard.](https://images.workoscdn.com/images/38a98a55-96fa-403d-86f8-cfb313cd51e5.png?auto=format\&fit=clip\&q=50)

***

## (2) Select or create your Azure application

Sign in to the Entra ID Admin Center Dashboard. Select "Enterprise applications" from the list of Azure services.

![A screenshot showing where to select "Enterprise applications" in the Azure Active Directory Admin Center Dashboard](https://images.workoscdn.com/images/25d08d2e-48b8-49b0-b8e9-d57641606b57.png?auto=format\&fit=clip\&q=50)

If your application is already created, select it from the list of applications and move to Step 3.

![A screenshot showing where to select the application of choice in the All Applications menu in Azure.](https://images.workoscdn.com/images/7430b6b1-2d16-4df1-b11a-a51d51bc4725.png?auto=format\&fit=clip\&q=50)

If you haven't created a SCIM application in Azure, select "New Application".

![A screenshot showing where to select a new application in the All Applications menu in Azure.](https://images.workoscdn.com/images/8e9587aa-e259-4175-952c-bebe476457a2.png?auto=format\&fit=clip\&q=50)

Select "Create your own application" and continue.

![A screenshot showing where to select "Create your own application" in the All Applications menu in Azure.](https://images.workoscdn.com/images/ef501e51-ca06-47ef-a731-f509960fbf70.png?auto=format\&fit=clip\&q=50)

Give your application a descriptive name, and select the "Integrate any other application you don't find in the gallery (Non-gallery)" option, then click "Create".

![A screenshot showing where to configure the name of a new application in Azure.](https://images.workoscdn.com/images/cbd435b0-2313-4922-9fa3-87de57b39de8.png?auto=format\&fit=clip\&q=50)

***

## (3) Configure your integration

Select "Provisioning" from the "Manage" section found in the navigation menu.

![A screenshot showing where to select "Provisioning" from the "Manage" section in Azure.](https://images.workoscdn.com/images/39c18ede-837f-4735-8fa7-6cc3eb855776.png?auto=format\&fit=clip\&q=50)

Click the "Get Started" button.

![A screenshot showing where to select "Get Started" in the "Provisioning" menu in Azure.](https://images.workoscdn.com/images/e7d7e41f-1dec-4119-a3c4-fcc349a39eb5.png?auto=format\&fit=clip\&q=50)

Select the "Automatic" Provisioning Mode from the dropdown menu.

In the "Admin Credentials" section, copy and paste the Endpoint from your [WorkOS Dashboard](https://dashboard.workos.com/) in the "Tenant URL" field.

Then, copy and paste the Bearer Token from your [WorkOS Dashboard](https://dashboard.workos.com/) into the Secret Token field.

Click "Test Connection" to receive confirmation that your connection has been set up correctly. Then, select "Save" to persist the credentials.

![A screenshot showing where to configure the provisioning mode and credentials in Azure.](https://images.workoscdn.com/images/22d127dc-6834-4a84-b579-c7ae045cd339.png?auto=format\&fit=clip\&q=50)

***

## (4) Set and enable Attribute mappings

Expand the "Mappings" section.

![A screenshot showing where to expand "Mappings" in Azure.](https://images.workoscdn.com/images/f78bb399-3ab3-4822-a6bf-e8e96db93cdd.png?auto=format\&fit=clip\&q=50)

Make sure the group and user attribute mappings are enabled, and are mapping the correct fields. The default mapping should work, but your specific Azure setup may require you to add a custom mapping.

![A screenshot showing where to ensure User attribute mappings are enabled in Azure.](https://images.workoscdn.com/images/ab0daea3-dda3-4e3d-9199-9d30a710fdb2.png?auto=format\&fit=clip\&q=50)

Make sure that you are mapping `objectId` to `externalId` within the Attribute Mapping section.

![A screenshot showing where to ensure object ID is mapped to external ID in the Attribute Mapping section in Azure.](https://images.workoscdn.com/images/389cb8cc-9bfd-4f0b-b623-1304cf863c64.png?auto=format\&fit=clip\&q=50)

***

## (5) Assign users and groups to your application

In order for your users and groups to be synced, you will need to assign them to your Entra ID SCIM Application. Select "Users and groups" from the "Manage" section of the navigation menu.

![A screenshot showing where to navigate to "Users and groups" from the "Manage" section in Azure.](https://images.workoscdn.com/images/d4f01d7f-6dc4-46c6-a524-a6c5fe47cf7a.png?auto=format\&fit=clip\&q=50)

Select "Add user/group" from the top menu.

![A screenshot showing where to select "Add user/group" in the Users and groups menu in Azure.](https://images.workoscdn.com/images/68717808-6ca4-47ff-8bc0-690f3bfffe0e.png?auto=format\&fit=clip\&q=50)

Select "None selected" under the "Users and Groups". In the menu, select the users and groups that you want to add to the SCIM application, and click "Select".

![A screenshot showing where to select users for a SCIM application in Azure.](https://images.workoscdn.com/images/b6e2c4f6-ef9b-4881-8d9c-a23ae55a1490.png?auto=format\&fit=clip\&q=50)

Select "Assign" to add the selected users and groups to your SCIM application.

![A screenshot showing where to assign the selected users for the SCIM application in Azure.](https://images.workoscdn.com/images/e2f7221f-9789-4288-bd66-5450d150db0b.png?auto=format\&fit=clip\&q=50)

***

## (6) Turn on provisioning for your SCIM application

In the Provisioning menu, confirm the "Provisioning Status" is set to "On" and that the "Scope" is set to "Sync only assigned users and groups".

![A screenshot showing where to ensure that the "Provisioning Status" is "On" and "Scope" is set to "Sync only assigned users and groups" in Azure.](https://images.workoscdn.com/images/67041f59-27dc-4026-b6a2-c43568c59dfd.png?auto=format\&fit=clip\&q=50)

Begin provisioning users and groups and witness realtime changes in your [WorkOS Dashboard](https://dashboard.workos.com/).

A detailed guide to integrate the WorkOS API with your application can be found [here](https://workos.com/docs/directory-sync)

***

## Configuring user attribute mappings

For any non-standard attributes used by the application, some configuration may be required in Microsoft Entra. Below is a guide on configuring user attribute mappings, so they propagate via SCIM.

### (1) Viewing application attributes

From your Microsoft Entra SCIM application, navigate to the Manage → Provisioning page. Expand the Mappings section and click "Provision Microsoft Entra ID Users".

![Microsoft Entra enterprise application provisioning tab](https://images.workoscdn.com/images/cb7b0eb7-8ff7-452e-b3c5-14eede22c4da.png?auto=format\&fit=clip\&q=50)

This will display a list of attribute mappings and settings:

![Microsoft Entra attribute mapping settings](https://images.workoscdn.com/images/472657ed-812c-4f3a-b57d-601e573adf48.png?auto=format\&fit=clip\&q=50)

### (2) Adding or editing an attribute

To add a missing attribute, click the "Add New Mapping" button at the bottom left of the mappings list. To edit an existing attribute, click the "Edit" button next to the existing attribute you'd like to edit.

![Microsoft Entra add new mapping button](https://images.workoscdn.com/images/2319dab9-6392-4a7f-9988-fe8cf5260301.png?auto=format\&fit=clip\&q=50)

To configure the mapping, select the source and target attribute from the dropdowns, and ensure "Apply this mapping" is set to "Always".

For example, to map division, the source attribute has been selected as `employeeOrgData.division` and the target attribute has been selected as `urn:ietf:params:scim:schemas:extension:enterprise:2.0:User:division`.

![Microsoft Entra configure mapping dialog](https://images.workoscdn.com/images/984c0ffe-0d18-4f04-a69b-d4e09b4a51d3.png?auto=format\&fit=clip\&q=50)

These new attribute mappings will now propagate to your application when the next SCIM push occurs.

***

## Provisioning on demand

By default, Entra ID SCIM 2.0 directories sync changes on a scheduled time interval, typically every 40 minutes. For use cases where more immediate provisioning or deprovisioning of users, groups, or group memberships is needed, Entra ID provides [provisioning on demand](https://learn.microsoft.com/en-us/entra/identity/app-provisioning/provision-on-demand?pivots=app-provisioning).

To provision on demand, from the enterprise application navigate to the "Provisioning" tab and click "Provision on demand".

![Entra ID provision on demand button](https://images.workoscdn.com/images/de50df7b-4088-4e95-a711-ad04e43474c5.png?auto=format\&fit=clip\&q=50)

To provision a user, select the user from the dropdown and click "Provision".

![Entra ID provision user on demand](https://images.workoscdn.com/images/121aaa24-d160-40a4-824f-44cc2a5ff84d.png?auto=format\&fit=clip\&q=50)

To provision a group or group membership, select the group from the dropdown, and select "View members only". Then select the group memberships to provision and click "Provision".

![Entra ID provision group memberships on demand](https://images.workoscdn.com/images/34167704-985a-4b0b-b110-89e19d618b37.png?auto=format\&fit=clip\&q=50)

Upon clicking "Provision", SCIM requests will immediately be sent to the application. To deprovision a user, group, or group membership, remove it from the Entra application and follow the above provisioning on demand steps.

***

## Frequently asked questions

### No email addresses are coming through for users from Entra. How do I get emails for my Entra users?

For cloud-managed users, Entra ID pulls the email from the `mail` attribute in Exchange. If your customer doesn't have this set up, they will need to configure attribute mapping in their SCIM app in Entra in order to provision users with WorkOS. They can use [this tutorial from Microsoft](https://learn.microsoft.com/en-us/entra/identity/app-provisioning/customize-application-attributes). They'll want to map a known email attribute, such as UPN, to the `emails[type eq "work"].value` SCIM attribute. For directories with synchronized-users, they will need to map the `userPrincipalName` attribute into the `emails[type eq "work"].value` SCIM attribute.

### Sometimes, reactivating "suspended" users does not re-add them to their Entra groups. Why is that and how can I fix it?

When a user is deleted from the entire directory, instead of only being deprovisioned from the SCIM app, the user may be soft-deleted (their state is set as "suspended"). Reactivating these suspended users will not send SCIM requests to re-add the user to the groups. To do so, the IT contact will need to select the "Restart Provisioning" button for the SCIM app in Azure.

![A screenshot showing where to restart provisioning in Entra.](https://images.workoscdn.com/images/757f8920-da4b-46ac-90b0-9780b150eb62.png?auto=format\&fit=clip\&q=50)

### Can profile images be accessed with Entra ID SCIM?

Entra ID's SCIM provisioning does not support transmitting image.

### Why do I receive a `dsync.user.updated` event after `dsync.user.created`?

Entra ID sends a newly provisioned user over to WorkOS in two separate actions. WorkOS will then send these actions as two individual events to your app. This is expected behavior.

### How often do Entra ID SCIM 2.0 directories perform a sync?

By default, Entra ID SCIM 2.0 directories sync changes on a scheduled time interval, typically every 40 minutes. For more details, please refer to Entra ID's [official documentation](https://learn.microsoft.com/en-us/entra/identity/app-provisioning/application-provisioning-when-will-provisioning-finish-specific-user#how-long-will-it-take-to-provision-users).

[Provisioning on demand](https://workos.com/docs/integrations/entra-id-scim/provisioning-on-demand) is also available, which can sync select users, groups, or group memberships in real-time.

### What is the `idp_id` for directory groups from Entra ID?

Entra ID provides a unique object identifier for each group through the SCIM `externalId` field. This is persisted as the `idp_id` for [directory groups](https://workos.com/docs/reference/directory-sync/directory-group) in WorkOS.
