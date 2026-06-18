# Okta SCIM

## Introduction

This guide outlines how to synchronize your application's Okta directories using SCIM.

To synchronize an organization's users and groups provisioned for your application, you'll need to provide the organization with two pieces of information:

- An [Endpoint](https://workos.com/docs/glossary/endpoint) that Okta will make requests to.
- A [Bearer Token](https://workos.com/docs/glossary/bearer-token) for Okta to authenticate its endpoint requests.

After completing step 1 below, both of these are available in your Endpoint's Settings in the [WorkOS Dashboard](https://dashboard.workos.com/).

> The rest of the steps below will need to be carried out by the organization when configuring your application in their Okta instance.

***

## (1) Set up your Directory Sync endpoint

Login to your WorkOS Dashboard and select "Organizations" from the left hand navigation bar.

Select the organization you'll be configuring a new Directory Sync with.

Scroll to the "User provisioning" section. Then, click "Configure manually" within the "Directory Sync" section.

![A screenshot showing where to click "Configure manually" in the WorkOS dashboard.](https://images.workoscdn.com/images/a700462c-afd2-4c12-a6cb-59bfc0d34c13.png?auto=format\&fit=clip\&q=50)

Select "Okta" from the Directory Provider dropdown and provide the Name for the Directory Sync connection. Then, click "Create Directory".

![A screenshot showing where to name and create an Okta directory in the WorkOS dashboard.](https://images.workoscdn.com/images/7e564f43-2328-4c0d-a9ab-b7cf3ec7dbeb.png?auto=format\&fit=clip\&q=50)

You'll see WorkOS has created the Endpoint and Bearer Token which you will provide to Okta in the steps below.

![A screenshot showing the Okta directory details in the WorkOS dashboard.](https://images.workoscdn.com/images/de45d3de-7ffc-46e0-b61c-4e8b1b9fce2e.png?auto=format\&fit=clip\&q=50)

> We have support for custom labeled URLs for Directory Sync endpoints. [Contact us](mailto:support@workos.com) for more info!

***

## (2) Select or create your Okta application

Log in to [Okta](https://login.okta.com/), go to the Okta admin dashboard and select "Applications" in the navigation bar.

![A screenshot showing where to select "Applications" in Okta.](https://images.workoscdn.com/images/81f7f92f-9cc1-441d-b270-6a7c794122c1.png?auto=format\&fit=clip\&q=50)

If your application is already created, select it from the list of applications and move to Step 3.

![A screenshot showing where to select an already created application in Okta.](https://images.workoscdn.com/images/98447a34-3e6a-404d-8419-b9f105657d1d.png?auto=format\&fit=clip\&q=50)

If you haven't created a SCIM application in Okta, select "Browse App Catalog".

![A screenshot showing where to select "Browse App Catalog" in Okta.](https://images.workoscdn.com/images/312382ac-4381-4a9b-9407-3bd5d1655a3e.png?auto=format\&fit=clip\&q=50)

From your Okta Application dashboard, search for "SCIM 2.0 Test App (OAuth Bearer Token)" and select the corresponding result.

![A screenshot showing where to search for "SCIM 2.0 Test App (OAuth Bearer Token)" in the App Integration Catalog in Okta.](https://images.workoscdn.com/images/12e0e6f9-1de0-49f7-95ba-960c0512387c.png?auto=format\&fit=clip\&q=50\&w=1080)

On the following page, click "Add Integration".

![A screenshot showing where to click "Add" in the SCIM 2.0 Test App (OAuth Bearer Token) overview page in Okta.](https://images.workoscdn.com/images/553af5dc-242b-4cf5-86e1-fe570f7b7acf.png?auto=format\&fit=clip\&q=50\&w=1200)

Enter a descriptive App name, then click "Next".

![A screenshot showing where to enter a name in the "Application label" field in Okta.](https://images.workoscdn.com/images/18c46d9e-e177-46b4-a462-c302b284daed.png?auto=format\&fit=clip\&q=50\&w=1080)

Many applications will work with the default configuration that is set on your new application. If you require any additional configuration for your directory such as configuring Attribute Statements, do so on the Sign-On Options page. Click "Done" to complete creating your application.

***

## (3) Configure your Okta provisioning API integration

In your application's Enterprise Okta admin panel, click the "Provisioning" tab. Then, click "Configure API Integration".

![A screenshot showing where to navigate to the "Provisioning" tab to click "Configure API Integration" in Okta.](https://images.workoscdn.com/images/b78d814a-b58d-47df-9523-0bff7e7b2a42.png?auto=format\&fit=clip\&q=50\&w=1080)

Check "Enable API Integration". After that, copy and paste the Endpoint from your [WorkOS Dashboard](https://dashboard.workos.com/) in the SCIM 2.0 Base URL field.

Then, copy and paste the Bearer Token from your [WorkOS Dashboard](https://dashboard.workos.com/) into the OAuth Bearer Token field.

Click "Test API Credentials", and then click "Save".

![A screenshot showing where to configure the provisioning credentials in the "Provisioning" tab in Okta.](https://images.workoscdn.com/images/dbeae5e9-e0b8-402a-9330-4a9eaf82f05b.png?auto=format\&fit=clip\&q=50)

The provisioning tab will now show a new suite of options which we'll utilize in the next Guide Section to continue provisioning your application.

***

## (4) Select options to provision to your application

In the "To App" navigation section, check to enable:

- Create Users
- Update User Attributes
- Deactivate Users

Click "Save".

![A screenshot showing where to enable "Create Users", "Update User Attributes", and "Deactivate Users" in the "To App" tab in Okta.](https://images.workoscdn.com/images/a148a5b7-9685-4034-b871-7f0908764617.png?auto=format\&fit=clip\&q=50\&w=1080)

***

## (5) Assign users and groups to your application

To assign users to the SCIM Application, navigate to the "Assignments" tab, from the "Assign" dropdown, select "Assign to People".

![A screenshot showing where to select "Assign to People" in the "Assign" dropdown in the "Assignments" tab in Okta.](https://images.workoscdn.com/images/ad17bd85-3a0c-4bda-b2af-001c3451ea75.png?auto=format\&fit=clip\&q=50\&w=1080)

Select users you'd like to provision and select "Assign".

![A screenshot showing where to select "Assign" for specific users in Okta.](https://images.workoscdn.com/images/24edda3d-d8ea-4b4c-8bc4-23ff389baca9.png?auto=format\&fit=clip\&q=50\&w=1080)

When you click "Assign" a lengthy form will open where you can populate all of the user's metadata. Confirm the metadata fields, scroll down to the bottom, and press "Save and Go Back". Repeat this for all users and select "Done".

![A screenshot showing where to select "Save and Go Back" to complete user assignment in Okta.](https://images.workoscdn.com/images/f91bc47f-f734-453a-8bba-f3cf92d13c9e.png?auto=format\&fit=clip\&q=50\&w=1080)

To push groups in order to sync group membership, navigate to the "Push Groups" tab, from the "Push Groups" dropdown, select: "Find groups by name".

![A screenshot showing where to select "Find groups by name" in the "Push Groups" dropdown in the "Push Groups" tab in Okta.](https://images.workoscdn.com/images/0640cdd8-631e-4f7c-9483-c3f00f93be2f.png?auto=format\&fit=clip\&q=50\&w=1080)

Search for the group you'd like to push and select it. Make sure the box is checked for "Push Immediately" and click "Save".

![A screenshot showing where to search for groups to push in the "Push Groups" tab in Okta.](https://images.workoscdn.com/images/5ac81a96-1849-4c5b-8833-fa6a110e3da9.png?auto=format\&fit=clip\&q=50\&w=1080)

In the WorkOS dashboard, you should now see the users and groups synced over.

![A screenshot showing a successfully synced user from an Okta directory in the WorkOS dashboard.](https://images.workoscdn.com/images/3bcbe3b4-e17c-40ac-8dcd-f098b52d8e8a.png?auto=format\&fit=clip\&q=50)

A detailed guide to integrate the WorkOS API with your application can be found [here](https://workos.com/docs/directory-sync)

***

## Configuring user attribute mappings

For any non-standard attributes used by the application, some configuration may be required in Okta. Below is a guide on configuring user attribute mappings, so they propagate via SCIM.

### (1) Viewing application attributes

From the Okta administrator portal, navigate to Directory → Profile Editor, and find the application for which you'd like to edit mappings.

![Okta profile editor](https://images.workoscdn.com/images/6c58b92b-233c-4329-af2e-d024d7715081.png?auto=format\&fit=clip\&q=50)

Clicking into the application will bring you to a Profile Editor page:

![Okta application profile editor](https://images.workoscdn.com/images/b68c705c-b08d-4d7c-a923-41e0cf7cbfed.png?auto=format\&fit=clip\&q=50)

You'll likely see several attributes listed, which are scoped to the application. If you see an attribute listed you're looking to map to an application, there's no need to create a new attribute and you can skip to [step 3](https://workos.com/docs/integrations/okta-scim/configuring-user-attribute-mappings/3-mapping-an-attribute).

### (2) Adding an attribute

If a desired attribute is missing from your application, click the "Add Attribute" button to create a new attribute.

![Okta profile editor add attribute](https://images.workoscdn.com/images/34a7d5da-885c-481a-b44d-60f631c7711c.png?auto=format\&fit=clip\&q=50)

Enter a display name and variable name of your choosing, and ensure the external name matches the key required by the third-party application. For example, if the third-party application pulls the manager value from `manager.value`, the external name should be `manager.value`.

For attributes included as part of the SCIM enterprise extension, enter the external namespace as `urn:ietf:params:scim:schemas:extension:enterprise:2.0:User`.

![Okta add attribute dialog](https://images.workoscdn.com/images/d4a7cff9-0226-4462-ab11-c086b4b4533e.png?auto=format\&fit=clip\&q=50)

Once you've entered the required information, click "Save".

### (3) Mapping an attribute

To map Okta user profile attributes to your application users, click on the "Mappings" button.

![Okta profile editor mappings](https://images.workoscdn.com/images/542ba367-6147-4ea5-bb18-4d55e13232ea.png?auto=format\&fit=clip\&q=50)

Mappings can be bidirectional, either from the application to the Okta user or from the Okta user to the application. This guide will focus on mapping from the Okta user to the application. Click the "Okta User to (name of application)" tab.

![Okta to application mapping tab](https://images.workoscdn.com/images/de8218c4-b96b-4761-85e9-6843b200e445.png?auto=format\&fit=clip\&q=50)

Find the name of the attribute you'd like to map in the right column. In the corresponding row's left column, enter the name of the Okta user profile attribute you'd like to map over. For example, if you're looking to map manager email in the application, select `managerId` in the left column.

![Okta mapping select attribute](https://images.workoscdn.com/images/97fafcf8-0845-4e09-8699-7ec5560255ce.png?auto=format\&fit=clip\&q=50)

Ensure the apply mappings setting is set to "Apply mapping on user create and update".

![Okta apply mappings selection](https://images.workoscdn.com/images/d1a3c86a-36e9-49ba-bf5a-7538c0992aa5.png?auto=format\&fit=clip\&q=50)

Once your mappings are configured, click "Save Mappings" and "Apply updates now". These new attribute mappings will now propagate to the application.

## Frequently asked questions

### A user appears in a group they are no longer a member of in Okta, why? How can I fix this situation?

There is a known issue in Okta where push group membership removals are not sent via SCIM when the affected user is deactivated or unassigned from the app. This commonly happens when a single group is used for both assignment and push, since removing a user triggers deactivation causing the membership removal event to never be sent. The IT admin can fix it by clicking "Push now" on the affected group in the Push Groups tab.

### How often do the Okta SCIM 2.0 directories perform a sync?

The Okta SCIM 2.0 directory syncs events in real time.

### Why is a user suspended in Okta still active in WorkOS?

Suspending a User in Okta will only affect their login and will not alter their status in any connected applications.

Deactivating or Deleting a User in Okta will result in a `inactive` status in connected applications (i.e., WorkOS).

For more details, please refer to Okta's official documentation
[User Suspension](https://help.okta.com/en-us/content/topics/users-groups-profiles/usgp-suspend.htm)
[User Deactivation and Deletion](https://help.okta.com/en-us/content/topics/users-groups-profiles/usgp-deactivate-user-account.htm).

### What is the `idp_id` for directory groups from Okta?

Okta only provides a group display name as a group identifier, so this display name is persisted as the `idp_id` and `name` for [directory groups](https://workos.com/docs/reference/directory-sync/directory-group) in WorkOS.
