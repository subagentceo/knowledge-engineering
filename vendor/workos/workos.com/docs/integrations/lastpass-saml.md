# LastPass

## Introduction

Each SSO Identity Provider requires specific information to create and configure a new [Connection](https://workos.com/docs/glossary/connection). Often, the information required to create a Connection will differ by Identity Provider.

To create a LastPass SAML Connection, you'll need an IdP Metadata XML file.

Start by logging in to your WorkOS dashboard and browse to the "Organizations" tab on the left hand navigation bar.

Select the organization you'd like to configure a LastPass SAML Connection for, and select "Manually Configure Connection" under "Identity Provider".

![A screenshot showing where to find "Manually Configure Connection" in the WorkOS Dashboard.](https://images.workoscdn.com/images/ff2ce096-00e1-4d34-8523-23a01ebf4642.png?auto=format\&fit=clip\&q=50)

Select "LastPass SAML" from the Identity Provider dropdown, enter a descriptive name for the connection, and then select the "Create Connection" button.

![A screenshot showing "Create Connection" details in the WorkOS Dashboard.](https://images.workoscdn.com/images/5866a365-5f51-4f58-9124-a4c0653831a5.png?auto=format\&fit=clip\&q=50)

***

## What WorkOS provides

WorkOS provides the [ACS URL](https://workos.com/docs/glossary/acs-url), [SP Entity ID](https://workos.com/docs/glossary/sp-entity-id), and [SP Metadata URL](https://workos.com/docs/glossary/sp-metadata). They're readily available in your Connection Settings in the [WorkOS Dashboard](https://dashboard.workos.com/).

![A screenshot showing where to find the ACS URL, SP Metadata, and SP Entity ID in the WorkOS Dashboard.](https://images.workoscdn.com/images/93089510-e362-47c9-9844-4eefd70e18ca.png?auto=format\&fit=clip\&q=50)

***

## What you'll need

Next, provide the [IdP Metadata](https://workos.com/docs/glossary/idp-metadata) file. Normally, this information will come from your enterprise customer's IT Management team when they set up your application's SAML 2.0 configuration in their LastPass admin console. But, should that not be the case during your setup, the next steps will show you how to obtain it.

***

## (1) Select or create your application

Log in to [LastPass](https://admin.lastpass.com/applications/saml), go to the admin console and select "Applications" on the top navigation. Then select "SSO apps" from the left side navigation. If your application is already created, select it from the list of applications and move to Step 2. Otherwise, select "Add app".

![A screenshot showing "Add app" in the "SSO apps" section of the Applications tab in the LastPass admin dashboard.](https://images.workoscdn.com/images/e6cc5fbc-e802-4cd4-b3d6-786c31ee7db2.png?auto=format\&fit=clip\&q=50)

In the modal that pops up, click on "Add an unlisted app".

![A screenshot showing the selection of "Add an Unlisted App" for the creation of a new SSO app.](https://images.workoscdn.com/images/fad2dc44-73a1-4b98-b8bb-ee02e7293dfd.png?auto=format\&fit=clip\&q=50)

Give your SAML App a descriptive name and select "Continue".

![A screenshot showing how to add the name for a new SSO app.](https://images.workoscdn.com/images/839575b4-8b1c-45e5-ab10-8fcc509fc1be.png?auto=format\&fit=clip\&q=50)

***

## (2) Initial SAML Application Setup

Under the "Set up LastPass" section of the "Configure app" modal, input the ACS URL from the WorkOS Dashboard Connection details under "ACS". Then click on "Advanced Settings".

![A screenshot showing where to add the ACS URL during the configuration app step in LastPass SAML Settings.](https://images.workoscdn.com/images/01e69cb0-8c93-474f-ad15-6cde111ac699.png?auto=format\&fit=clip\&q=50)

Under "Entity ID", input the SP Entity ID from the WorkOS Dashboard Connection details. Next, under "SAML signature method", select "SHA256".

![A screenshot showing where to add the Entity ID during the configuration app step in LastPass SAML Settings.](https://images.workoscdn.com/images/4b80975b-c0bb-4efd-80dd-3a3c52836ec5.png?auto=format\&fit=clip\&q=50)

Under "Signing and encryption", ensure that you have at least selected "Sign assertion". Then, click on "Add SAML attribute".

![A screenshot showing to select "Sign assertion" checkbox option for "Signing and encryption" in LastPass SAML Settings.](https://images.workoscdn.com/images/0e2a022f-444b-468b-91ad-cb2078142425.png?auto=format\&fit=clip\&q=50)

***

## (3) Configure SAML Application

Map the following four attributes as shown below, and select "Save & assign users".

- First Name → `firstName`
- Last Name → `lastName`
- Email → `email`
- User ID → `id`

![A screenshot showing hot to add Attribute Mapping for a LastPass SAML app.](https://images.workoscdn.com/images/3e75c892-a7cc-4167-9e45-c046232c1231.png?auto=format\&fit=clip\&q=50)

### Role Assignment (optional)

With [identity provider role assignment](https://workos.com/docs/sso/identity-provider-role-assignment), users can receive roles within your application based on their group memberships. To return this information in the attribute statement, add a new SAML attribute for the "Groups" field and input `groups` as the attribute name, as shown below. Then, select "Save & assign users".

![A screenshot showing how to add a groups attribute to a LastPass SAML app.](https://images.workoscdn.com/images/611cd4d7-715b-423c-b110-323f00d7ad8c.png?auto=format\&fit=clip\&q=50)

> Finish role assignment set-up by navigating to the SSO connection page in the *Organization* section of the [WorkOS Dashboard](https://dashboard.workos.com/). Create SSO groups by referencing the IdP Group ID. Then, assign roles to these SSO groups so group members are automatically granted roles within your application.

***

## (4) Add Users and Groups to SAML Application

On the "Users, groups & roles" page, click on "Assign users, groups & roles".

![A screenshot showing to select "Assign users, groups & roles" for your LastPass SAML app.](https://images.workoscdn.com/images/cec59ee3-85f1-45cd-8ed5-03dfef194de9.png?auto=format\&fit=clip\&q=50)

Search and select any users or groups that you would like to provision to this SAML app. Then, click "Assign".

![A screenshot showing to select Users and Groups in LastPass.](https://images.workoscdn.com/images/fc3fd859-1092-45a8-922f-38b4619863d8.png?auto=format\&fit=clip\&q=50)

Click on "Save & continue".

![A screenshot showing where to save and move to next steps in LastPass.](https://images.workoscdn.com/images/4b775f48-9045-4122-8c9c-4770370edd4b.png?auto=format\&fit=clip\&q=50)

***

## (5) Upload Metadata file

Back on the "SSO apps" tab of the LastPass admin console, select the SAML app that you just created.

!A screenshot showing where how to select SAML App in LastPass.]\(https://images.workoscdn.com/images/99a9a771-02bc-4817-b576-414bafa2d6f2.png?auto=format\&fit=clip\&q=50)

On the "Configure app" modal, click on "Expand" to the right of "Set up app".

![A screenshot showing how to expand Set Up App in LastPass.](https://images.workoscdn.com/images/e717af8d-f5aa-4629-ae38-d5d0376d57dd.png?auto=format\&fit=clip\&q=50)

At the bottom of the "Set up app" section, click on "Download metadata (XML)". Save the downloaded XML metadata somewhere accessible.

![A screenshot showing where to download Metadata File in LastPass.](https://images.workoscdn.com/images/bbd5f4bc-8386-4650-9559-f072b265d71b.png?auto=format\&fit=clip\&q=50)

In the Connection settings in the WorkOS Dashboard, click "Edit Metadata Configuration".

![A screenshot showing where to edit Metadata Configuration in WorkOS Dashboard.](https://images.workoscdn.com/images/c485258c-6762-4ea7-9999-a2a43767de23.png?auto=format\&fit=clip\&q=50)

Upload the XML metadata file from LastPass into the "Metadata File" field and select "Save Metadata Configuration".

![A screenshot showing a successful upload of the Metadata File in WorkOS Dashboard.](https://images.workoscdn.com/images/dd796b97-442e-4b74-a6ae-c5f2642b717a.png?auto=format\&fit=clip\&q=50)

Your Connection will then be linked and good to go!
