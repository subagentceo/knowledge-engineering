# Duo

## Introduction

Each SSO Identity Provider requires specific information to create and configure a new [Connection](https://workos.com/docs/glossary/connection). Often, the information required to create a Connection will differ by Identity Provider.

To create a Duo SAML Connection, you'll need three pieces of information: an [ACS URL](https://workos.com/docs/glossary/acs-url) (provide by WorkOS), an [SP Entity ID](https://workos.com/docs/glossary/sp-entity-id) (provided by WorkOS), and the [Metadata URL](https://workos.com/docs/glossary/idp-metadata) (provided by Duo).

Duo is also unique in that it requires a 3rd party IdP to federate the authentication. This means that along with the three pieces of information, you'll also need to configure a Single Sign-On Authentication Source and a Cloud Application in your Duo Workspace.

The high level overview of the authentication flow:

Your App → WorkOS → Duo → Your SSO IdP → Duo → WorkOS → Your App

![A flowchart showing the authentication flow of Duo using WorkOS.](https://images.workoscdn.com/docs/integrations/sso/duo-saml/v1/duo-saml-1.png?auto=format\&fit=clip\&q=50)

***

## (1) Create a new Duo SAML Connection in WorkOS

Navigate to the Organization in your WorkOS Dashboard under which you would like to set up this new SSO Connection. Click "Manually Configure Connection" and select Duo SAML from the list of SSO Identity Providers. You'll want to select "Duo SAML" as the Identity Provider and give the Connection a descriptive name. Once this is filled out, click "Create Connection".

![A screenshot showing how to create a Duo SAML connection in the WorkOS dashboard.](https://images.workoscdn.com/images/cfd42823-38c8-4994-b05c-b7c3609d1755.png?auto=format\&fit=clip\&q=50)

Take note of the Connection Details as you'll need to enter those in Duo later on. This page is also where you'll enter the Metadata URL in a later step.

![A screenshot showing where to access Service Provider details in the connection settings.](https://images.workoscdn.com/images/98f72b30-9e6b-4e96-be86-176939471b6b.png?auto=format\&fit=clip\&q=50)

***

## (2) Select or create your application

WorkOS will allow you to use any Duo supported IdP to handle the Federated authentication. Since each IdP will have different ways of setting up the SSO connection between Duo and the IdP, please refer to the [documentation that Duo provides to configure a Duo SSO Connection](https://duo.com/docs/sso#enable-duo-single-sign-on).

***

## (3) Create a Cloud Application in Duo

After configuring the Duo SSO Connection with the IdP of your choice, the next step is to create a Cloud Application in Duo. This app will handle the connection between WorkOS and Duo.

Navigate to the Duo Admin Panel and click on Applications on the left sidebar.

Click "Protect an Application" and locate the entry for "Generic SAML Service Provider" with a protection type of "2FA with SSO hosted by Duo (Single Sign-On)" in the applications list. Click *Protect* to the far-right to start configuring "Generic SAML Service Provider".

![A screenshot showing how to create a Cloud App in Duo.](https://images.workoscdn.com/images/8404f0a8-a56f-4c58-b03e-d0ec48ef66b8.png?auto=format\&fit=clip\&q=50)

Next, configure the Generic Service Provider settings. There are pieces of information on this page that need to come from WorkOS and your Duo SSO Connection, and also information to copy and enter in the WorkOS Connection.

Start by gathering the Metadata URL to enter in the WorkOS Duo SAML Connection that you created in the prior step.

![A screenshot showing where to copy the IdP Metadata URL in Duo.](https://images.workoscdn.com/images/250ed44e-4044-441e-ab02-a045ed011cb2.png?auto=format\&fit=clip\&q=50)

***

## (4) Enter Duo SAML Settings in your WorkOS Dashboard

Navigate to your WorkOS Duo SAML Connection and paste the Metadata URL in to the Metadata field.

You won't see the connection flip to Active yet as there is still some configuration to do on the Duo side.

![A screenshot showing how to add the IdP metadata in the WorkOS dashboard.](https://images.workoscdn.com/images/73a827e1-fa4f-4399-a1e6-3589abd0874a.png?auto=format\&fit=clip\&q=50)

From the WorkOS Connection page you are currently on, copy the ACS URL value from the field just above the SAML Settings.

![A screenshot highlighting the ACS URL in the WorkOS dashboard.](https://images.workoscdn.com/images/45ce0799-449b-417e-8f2b-08cdaacdfea6.png?auto=format\&fit=clip\&q=50)

Navigate to the Duo Applications Generic Service Provider configuration settings and paste the ACS URL in the Assertion Consumer Service (ACS) URL field under the Service Provider section.

![A screenshot showing where to input the ACS URL in Duo settings.](https://images.workoscdn.com/images/d7bff970-44e9-4320-b675-53d54d2ab4c9.png?auto=format\&fit=clip\&q=50)

Next, copy the SP Entity ID value from the WorkOS Connection page.

![A screenshot highlighting the Entity ID in the WorkOS dashboard.](https://images.workoscdn.com/images/5dfd097f-1027-48af-9cdc-6ad2fd97f3d3.png?auto=format\&fit=clip\&q=50)

Paste the SP Entity ID into the Entity ID field under the Service Provider section in the Duo Applications Generic Service Provider configuration.

You may leave the Single Logout URL, Service Provider Login URL, and Default Relay State fields empty.

![A screenshot showing where to input the Entity ID in Duo settings.](https://images.workoscdn.com/images/5938b3ee-95a7-4dcf-aa2a-9e064d8c8311.png?auto=format\&fit=clip\&q=50)

Scroll down on this page to the SAML Response section. Ensure that the NameID format has the id that you'd like to use for the unique identifier selected and matches the NameID attribute that you'd like to use as the value. If you're using email as the unique ID, the options would look like the below.

![A screenshot showing how to configure SAML Response NameID in Duo.](https://images.workoscdn.com/images/e2ae9786-2a3f-4408-9c15-b33ba4c34f39.png?auto=format\&fit=clip\&q=50)

Ensure the Signature algorithm is SHA256 and that the Signing options have both Sign response and Sign assertion selected.

![A screenshot showing where to configure the SAML Response Signing.](https://images.workoscdn.com/images/c491cab0-5abe-4b63-89cc-c5b8dbed9657.png?auto=format\&fit=clip\&q=50)

Next make sure that you are mapping the attributes which WorkOS requires: `id`, `email`, `firstName`, and `lastName`. In the Map Attributes section enter these on the right side under SAML Response Attribute. on the left side, click the empty field box and select the pre-populated values that look like `<Email Address>`. Duo will automatically grab the corresponding fields and map them to the expected values.

You can map any values you like, but WorkOS requires that these four values are included in SAML responses. If your users don't have a last name value for instance, you could map Display Name or any other value to `lastName`, but `lastName` still needs to be included or WorkOS will reject the SAML Response.

Here's an example of the attribute mappings:

![A screenshot showing where to configure SAML Attribute Mapping in Duo.](https://images.workoscdn.com/images/dc4517d1-7f02-4199-a06e-e3d31ac56b76.png?auto=format\&fit=clip\&q=50)

### Role Assignment (optional)

With [identity provider role assignment](https://workos.com/docs/sso/identity-provider-role-assignment), users can receive roles within your application based on their group memberships. To return this information in the attribute statement, follow the guidance below.

In the "Role Attributes" section, enter `groups` as the "Attribute name". Then map the role names to their corresponding Duo groups. In the example below, the "Admins" role is mapped to the Admins group and the "Developers" role is mapped to the Developers group.

![A screenshot showing how to configure a groups attribute in Duo.](https://images.workoscdn.com/images/a13b9af3-65fc-4595-acd6-ecc3bc026fc3.png?auto=format\&fit=clip\&q=50)

> Finish role assignment set-up by navigating to the SSO connection page in the *Organization* section of the [WorkOS Dashboard](https://dashboard.workos.com/). Create SSO groups by referencing the IdP Group ID. Then, assign roles to these SSO groups so group members are automatically granted roles within your application.

### Save your changes

You may leave all of the other fields as their defaults. Scroll to the very bottom of the page and click the Save button.

![A screenshot highlighting the finished SAML Configuration in Duo.](https://images.workoscdn.com/images/dbe959a3-41eb-4dca-b1bd-69f1a389b10e.png?auto=format\&fit=clip\&q=50)

***

## (5) Verify Connection Status in WorkOS

Navigate back to the WorkOS dashboard. After a minute or two you should see the Connection become Active as indicated by the green badge next to the connection name.

![A screenshot highlighting active status of the Duo connection.](https://images.workoscdn.com/images/9d79fcfe-386d-4bd7-a69d-e8e0578f0352.png?auto=format\&fit=clip\&q=50)
