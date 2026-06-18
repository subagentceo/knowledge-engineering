# Google SAML

## Introduction

Each SSO Identity Provider requires specific information to create and configure a new [connection](https://workos.com/docs/glossary/connection). Often, the information required to create a connection will differ by Identity Provider.

To create a Google SAML connection, you'll need three pieces of information: an [ACS URL](https://workos.com/docs/glossary/acs-url), a [SP Entity ID](https://workos.com/docs/glossary/sp-entity-id), and an [IdP Metadata URL](https://workos.com/docs/glossary/idp-metadata).

Start by logging into your [WorkOS Dashboard](https://dashboard.workos.com/) and selecting "Organizations" from the left hand navigation bar.

Click on the organization you'd like to configure a Google SAML connection for and select "Manually Configure Connection".

![A screenshot showing where to find "Manually Configure Connection" for an Organization in the WorkOS Dashboard.](https://images.workoscdn.com/images/26e7f2ca-7d61-4f02-9a67-f3bfbc254ba3.png?auto=format\&fit=clip\&q=50)

Select "Google Workspace SAML" from the Identity Provider dropdown, enter a descriptive name for the connection, and then select the "Create Connection" button.

![A screenshot showing how to create a connection in the WorkOS Dashboard.](https://images.workoscdn.com/images/7f2f8f2b-22d1-443c-a692-5eb7fa506042.png?auto=format\&fit=clip\&q=50)

***

## What WorkOS provides

WorkOS provides the ACS URL and the SP Entity ID. It's readily available in your Connection Settings in the [WorkOS Dashboard](https://dashboard.workos.com/).

![A screenshot showing where to find the ACS URL and SP Entity ID in the WorkOS Dashboard.](https://images.workoscdn.com/images/1d07cb61-b23a-4894-ab9b-fd97d5bc6d6b.png?auto=format\&fit=clip\&q=50)

The ACS URL is the location an Identity Provider redirects its authentication response to. In Google's case, it needs to be set by the organization when configuring your application in their Google admin dashboard.

The SP Entity ID is a URI used to identify the issuer of a SAML request, response, or assertion. In this case, the entity ID is used to communicate that WorkOS will be the party performing SAML requests to the organization's Google instance.

Specifically, the ACS URL will need to be set as the "ACS URL" and the SP Entity ID will need to be set as the "Entity ID" in the "Service Provider Details" step of the Google SAML setup.

***

## What you'll need

In order to integrate you'll need the metadata XML file from Google.

Normally, this information will come from the organization's IT Management team when they set up your application's SAML 2.0 configuration in their Google admin dashboard. But, should that not be the case during your setup, here's how to obtain it.

***

## (1) Log in

Log in to the Google Admin dashboard, select "Apps" from the sidebar menu, and then select "Web and Mobile Apps" from the following list. If your application is already created, select it from the list of applications and move to Step 7. If you haven't created a SAML application, select "Add App" and then "Add custom SAML app".

![A screenshot showing where to find "Add custom SAML app" in the Google Dashboard.](https://images.workoscdn.com/images/1a0abd99-4e2c-403f-89b9-a3fd11d6fb9a.png?auto=format\&fit=clip\&q=50)

***

## (2) Enter Your App's Information

Give the app a descriptive name and upload an icon, if applicable. Click "Continue".

![A screenshot showing where to add app name in the Google Dashboard.](https://images.workoscdn.com/images/89ae0c9e-becf-4076-8178-7d4535eac778.png?auto=format\&fit=clip\&q=50)

***

## (3) Obtain Identity Provider Details

Select the "Download Metadata" button to download the metadata file. Save this file, as you'll upload it to the WorkOS Dashboard in Step 7. Click "Continue".

![A screenshot showing where to find "Download Metadata" in the Google Dashboard.](https://images.workoscdn.com/images/92b16c09-8b06-4b8b-b4a0-2f441fd3d878.png?auto=format\&fit=clip\&q=50)

***

## (4) Enter Service Provider Details

Copy and the "ACS URL" from your WorkOS Dashboard and paste it into the "ACS URL" field, and copy the "SP Entity ID" from your WorkOS Dashboard and paste it into the "Entity ID" field in the Google SAML "Service provider details" modal. Select "Continue."

![A screenshot showing where to enter "Entity ID" and "ACS URL" in the Google Dashboard.](https://images.workoscdn.com/images/946113dc-812e-446d-b466-32eec2b27629.png?auto=format\&fit=clip\&q=50)

***

## (5) Configure Attribute Mapping

Provide the following Attribute Mappings and select "Finish".

Google SAML does not provide the option to map a user's id attribute claim.

![A screenshot showing completed Attribute Mappings in the Google Dashboard.](https://images.workoscdn.com/images/dcf0968a-346c-4a58-bd76-8e0a87d92d66.png?auto=format\&fit=clip\&q=50)

### Role Assignment (optional)

With [identity provider role assignment](https://workos.com/docs/sso/identity-provider-role-assignment), users can receive roles within your application based on their group memberships. To return this information in the attribute statement, follow the guidance below.

Scroll down to the "Group membership" section. Add any groups you'd like to send under "Google groups", and set the "App attribute" to "groups". Then, select "Finish".

![A screenshot showing how to add a group attribute in the Google dashboard.](https://images.workoscdn.com/images/b7a6e5f7-aaf1-4756-9fc9-04f70f1c8a67.png?auto=format\&fit=clip\&q=50)

> Finish role assignment set-up by navigating to the SSO connection page in the *Organization* section of the [WorkOS Dashboard](https://dashboard.workos.com/). Create SSO groups by referencing the IdP Group ID. Then, assign roles to these SSO groups so group members are automatically granted roles within your application.

***

## (6) Configure User Access

In the created SAML app's landing page, select the "User Access Section".

![A screenshot showing where to find the "User Access Section" in the Google Dashboard.](https://images.workoscdn.com/images/57080072-5a42-4463-897b-2382c643082a.png?auto=format\&fit=clip\&q=50)

Turn this service ON for the correct organizational units in your Google Directory setup. Save any changes.

Google may take up to 24 hours to propagate these changes. The connection in WorkOS will be inactive until then.

***

## (7) Upload Metadata File

If you haven't already downloaded the metadata file, select your SAML application, and click "Download Metadata". In the modal, again click "Download Metadata".

![A screenshot showing where to find "Download Metadata" in the Google Dashboard.](https://images.workoscdn.com/images/7e1a8f1f-fb44-435d-961a-d71eff48d207.png?auto=format\&fit=clip\&q=50)

In the connection Settings of the WorkOS Dashboard, click "Edit Metadata Configuration".

![A screenshot showing the "Edit Metadata Configuration" button in the WorkOS Dashboard.](https://images.workoscdn.com/images/afe34aca-df4f-4005-b71e-bf528916a491.png?auto=format\&fit=clip\&q=50)

In the modal, upload the Google Metadata file and then select "Save Metadata Configuration". Once the file is uploaded into WorkOS, your connection will then be linked and good to go!

![A screenshot showing a linked Google SAML connection in the WorkOS Dashboard.](https://images.workoscdn.com/images/9c497a05-f823-4c51-ab54-e5b6feed53fa.png?auto=format\&fit=clip\&q=50)

***

## Frequently asked questions

### Where is the Relay State in Google SAML?

Within the Google SAML setup, there will be a field called "Start URL" which is referred to as the Relay State.
