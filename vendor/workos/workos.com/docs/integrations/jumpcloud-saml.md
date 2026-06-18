# JumpCloud SAML

## Introduction

Each SSO Identity Provider requires specific information to create and configure a new [Connection](https://workos.com/docs/glossary/connection). Often, the information required to create a Connection will differ by Identity Provider.

To create a JumpCloud SAML Connection, you'll need to upload a JumpCloud Metadata file.

***

## What WorkOS provides

WorkOS provides the [ACS URL](https://workos.com/docs/glossary/acs-url) and [SP Entity ID](https://workos.com/docs/glossary/sp-entity-id). They're readily available in your Connection Settings in the [WorkOS Dashboard](https://dashboard.workos.com/).

![A screenshot of the "Service Provider Details" of a JumpCloud Connection in the WorkOS Dashboard.](https://images.workoscdn.com/images/77d299b3-4e00-4259-9580-3a5d47518f7a.png?auto=format\&fit=clip\&q=50)

The ACS URL is the location an Identity Provider redirects its authentication response to. In JumpCloud's case, the ACS URL and Entity ID need to be set by the organization when configuring your application in their JumpCloud instance.

Specifically, the ACS URL and Entity ID will need to be set in the "Single Sign-On Configuration" section of the SAML app. You will input the ACS URL for "ACS URL" and the Entity ID as both "IdP Entity ID" and "SP Entity ID":

![A screenshot highlighting the fields "IdP Entity ID", "SP Entity ID" and "ACS URL" in the JumpCloud dashboard.](https://images.workoscdn.com/images/5897416a-465f-4e71-a2f8-2c12329338b9.png?auto=format\&fit=clip\&q=50)

***

## What you'll need

In order to integrate you'll need the JumpCloud Metadata file. Here's how to obtain it:

***

## (1) Log in

Log in to the JumpCloud admin dashboard, select "SSO" on the left and select your Application.

![A screenshot highlighting the SSO tab and app selection in the JumpCloud dashboard.](https://images.workoscdn.com/images/e144fd63-e8a0-40e3-9d6d-db113396b7f8.png?auto=format\&fit=clip\&q=50)

***

## (2) Configure Attribute Mapping

In the "User Attributes" section of the Single Sign-On Configuration page for the SAML app, add the following field-value parameter pairs:

- `id` → `email`
- `email` → `email`
- `firstName` → `firstname`
- `lastName` → `lastname`

![A screenshot showing user attribute mapping in the JumpCloud dashboard.](https://images.workoscdn.com/images/47100088-c7b5-4352-96e1-9709f7808b6b.png?auto=format\&fit=clip\&q=50)

### Role Assignment (optional)

With [identity provider role assignment](https://workos.com/docs/sso/identity-provider-role-assignment), users can receive roles within your application based on their group memberships. To return this information in the attribute statement, follow the guidance below.

In the "Group Attributes" section, select the checkbox to "include group attribute", and then set the attribute name to `groups`.

![A screenshot showing 'Group Attributes' in the JumpCloud Admin Console.](https://images.workoscdn.com/images/b6f9fdc0-c660-41ce-8f8e-a99a8c5a4cf0.png?auto=format\&fit=clip\&q=50)

> Finish role assignment set-up by navigating to the SSO connection page in the *Organization* section of the [WorkOS Dashboard](https://dashboard.workos.com/). Create SSO groups by referencing the IdP Group ID. Then, assign roles to these SSO groups so group members are automatically granted roles within your application.

### Check "Sign Assertion"

Be sure to check the "Sign Assertion" box shown below.

![A screenshot highlighting the checked "Sign Assertion" box in the JumpCloud dashboard.](https://images.workoscdn.com/images/e4cca1f9-3f24-45d6-80f7-3ef318eb4ba2.png?auto=format\&fit=clip\&q=50)

***

## (3) Upload Metadata File

Be sure to check "Declare Redirect Endpoint".

![A screenshot highlighting the checked "Declare Redirect Endpoint" box in the JumpCloud dashboard.](https://images.workoscdn.com/images/3a24425c-dd94-4b86-8b3a-f476b6f55665.png?auto=format\&fit=clip\&q=50)

> NOTE: The "Declare Redirect Endpoint" setting needs to be enabled prior to exporting the IdP metadata below as this will alter the metadata.

Click the "Export Metadata" button under "JumpCloud Metadata". This will download an XML metadata file.

![A screenshot highlighting the "Export Metadata" button in the JumpCloud dashboard.](https://images.workoscdn.com/images/abd1a6ff-ec7b-427b-b7d5-0813af0107ee.png?auto=format\&fit=clip\&q=50)

In the Connection Settings of the WorkOS Dashboard, click "Edit Metadata Configuration".

![A screenshot highlighting the "Edit Metadata Configuration" button in the WorkOS Dashboard.](https://images.workoscdn.com/images/ead92f35-be05-431f-a987-e4a71745eb3f.png?auto=format\&fit=clip\&q=50)

In the modal that pops up, upload the JumpCloud Metadata file and then select "Save Metadata Configuration".

![A screenshot showing the "XML File Metadata Configuration" modal in the WorkOS Dashboard.](https://images.workoscdn.com/images/060d5353-64ca-426a-a4f2-1b9290aad3f5.png?auto=format\&fit=clip\&q=50)

Once the file has uploaded, your Connection will then be linked and good to go!
