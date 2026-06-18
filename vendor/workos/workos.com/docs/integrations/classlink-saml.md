# ClassLink

## Introduction

Each SSO Identity Provider requires specific information to create and configure a new [Connection](https://workos.com/docs/glossary/connection). Often, the information required to create a Connection will differ by Identity Provider.

To create a ClassLink SAML Connection, you'll need the Identity Provider Metadata URL that is available from the organization's ClassLink SAML instance.

Start by logging in to your WorkOS dashboard and browse to the "Organizations" tab on the left hand navigation bar.

Select the organization you'd like to configure a ClassLink SAML Connection for, and select "Manually Configure Connection" under "Identity Provider".

![A screenshot showing the "Manual Configure Connection" option in the WorkOS Dashboard.](https://images.workoscdn.com/images/fe7f0470-1d95-4708-b364-6dfea9e94e59.png?auto=format\&fit=clip\&q=50)

Select "ClassLink SAML" from the Identity Provider dropdown, enter a descriptive name for the connection, and then select the "Create Connection" button.

![A screenshot showing a ClassLink connection being created in the WorkOS Dashboard.](https://images.workoscdn.com/images/20fabb8d-91a2-4f7d-965f-837f886a8481.png?auto=format\&fit=clip\&q=50)

***

## What WorkOS provides

WorkOS provides the [ACS URL](https://workos.com/docs/glossary/acs-url), the [SP Metadata](https://workos.com/docs/glossary/sp-metadata) link and the [SP Entity ID](https://workos.com/docs/glossary/sp-entity-id). They are readily available in your Connection Settings in the [Developer Dashboard](https://dashboard.workos.com/).

The SP Metadata link contains a metadata file that the organization can use to set up the SAML integration.

![A screenshot showing the Service Provider Details provided by WorkOS for a ClassLink connection in the WorkOS Dashboard.](https://images.workoscdn.com/images/46a922ac-10d2-424a-9b10-762702f8fc05.png?auto=format\&fit=clip\&q=50)

***

## What you'll need

In order to integrate you'll need the [IdP Metadata URL](https://workos.com/docs/glossary/idp-metadata).

Normally, this will come from the organization's IT Management team when they set up your application's SAML 2.0 configuration in their ClassLink instance. Here's how to obtain them:

***

## (1) Select or create your application

Login to the ClassLink Management Console (CMC), click Single Sign-On and select SAML Console.

Click ADD NEW or COPY EXISTING. Copy Existing contains pre-configured SAML apps which need to be updated to fit your unique settings.

![A screenshot showing where to select "Add Application" in the ClassLink console.](https://images.workoscdn.com/images/2adb6c82-eeb2-4fee-9eb1-cd1655d08e35.png?auto=format\&fit=clip\&q=50)

***

## (2) Initial SAML Application Setup

Edit the new application by click the three dots menu icon, and then selecting Edit.

![A screenshot showing where to edit the ClassLink application.](https://images.workoscdn.com/images/70877547-fcac-40ec-a98f-87f5333ad59f.png?auto=format\&fit=clip\&q=50)

Update the Metadata URL in the ClassLink application settings with the SP Metadata URL provided to you by WorkOS.

![A screenshot showing where to enter the SP Metadata URL in the ClassLink application settings.](https://images.workoscdn.com/images/d97393b1-5066-4f48-a6e4-bb5cf1a2c6c8.png?auto=format\&fit=clip\&q=50)

***

## (3) Configure SAML Application

Under the "Attribute Mapping" section of the SAML app, map the following four attributes as shown below, and the select "Update".

- `id` → `Login id`
- `email` → `Email`
- `firstName` → `Given Name`
- `lastName` → `Family Name`

![A screenshot showing how to input user attribute mapping in the ClassLink dashboard.](https://images.workoscdn.com/images/a6f3d9da-cb06-4eda-a243-f3fb84f9df76.png?auto=format\&fit=clip\&q=50)

### Role Assignment (optional)

With [identity provider role assignment](https://workos.com/docs/sso/identity-provider-role-assignment), users can receive roles within your application based on their group memberships. To return this information in the attribute statement, map the groups in your identity provider to a SAML attribute named `groups`.

> Finish role assignment set-up by navigating to the SSO connection page in the *Organization* section of the [WorkOS Dashboard](https://dashboard.workos.com/). Create SSO groups by referencing the IdP Group ID. Then, assign roles to these SSO groups so group members are automatically granted roles within your application.

## (4) Upload Metadata URL

Copy the IdP Metadata URL from your ClassLink SAML settings and upload it to your WorkOS Connection settings.

![A screenshot highlighting where the ClassLink Metadata URL is located in the ClassLink console.](https://images.workoscdn.com/images/a75ed9fa-3b21-469b-93e4-3b8483da3717.png?auto=format\&fit=clip\&q=50)

In the Connection settings in the WorkOS Dashboard, click "Edit Metadata Configuration".

![A screenshot highlighting the "Edit Metadata Configuration" button in a Connection details view in the WorkOS Dashboard.](https://images.workoscdn.com/images/c03dd1dc-84b3-4909-bee5-61249280e35f.png?auto=format\&fit=clip\&q=50)

Paste the Metadata URL from ClassLink into the "Metadata URL" field and select "Save Metadata Configuration".

![A screenshot showing how to input the Metadata URL into the Connection in the WorkOS Dashboard.](https://images.workoscdn.com/images/88884c90-bb7d-4f18-9a7c-bb7c7ad1fee2.png?auto=format\&fit=clip\&q=50)

Your Connection will then be linked and good to go!
