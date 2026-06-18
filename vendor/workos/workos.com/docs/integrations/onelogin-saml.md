# OneLogin SAML

## Introduction

Each SSO Identity Provider requires specific information to create and configure a new [Connection](https://workos.com/docs/glossary/connection). Often, the information required to create a Connection will differ by Identity Provider.

To create an OneLogin SAML Connection, you'll need three pieces of information: an [ACS URL](https://workos.com/docs/glossary/acs-url), an [SP Entity ID](https://workos.com/docs/glossary/sp-entity-id), and the [OneLogin SAML Metadata file](https://workos.com/docs/glossary/idp-metadata).

Start by logging into your [WorkOS Dashboard](https://dashboard.workos.com/) and selecting "Organizations" from the left hand navigation bar.

Click on the organization you'd like to configure a OneLogin SAML connection for and select "Manually Configure Connection".

![A screenshot showing where to find "Manually Configure Connection" for an Organization in the WorkOS Dashboard.](https://images.workoscdn.com/images/9013d473-bfeb-4078-865b-7d40bc853748.png?auto=format\&fit=clip\&q=50)

Select "OneLogin SAML" from the Identity Provider dropdown, enter a descriptive name for the connection, and then select the "Create Connection" button.

![A screenshot showing how to create a connection in the WorkOS Dashboard.](https://images.workoscdn.com/images/15df7299-f83b-4f48-be6b-b2ab6bfe228c.png?auto=format\&fit=clip\&q=50)

***

## What WorkOS provides

WorkOS provides the [ACS URL](https://workos.com/docs/glossary/acs-url) and [SP Entity ID](https://workos.com/docs/glossary/sp-entity-id). They are readily available in your Connection Settings in the [WorkOS Dashboard](https://dashboard.workos.com/).

The ACS URL is the location an Identity Provider redirects its authentication response to. In OneLogin's case, it needs to be set by the organization when configuring your application in their OneLogin instance.

The SP Entity ID is a URI used to identify the issuer of a SAML request and the audience of a SAML response. In this case, the SP Entity ID is used to communicate that WorkOS will be the party performing SAML requests to the organization's OneLogin instance, and that WorkOS is the intended audience of the SAML responses from the OneLogin instance.

![A screenshot showing where to find the ACS URL and SP Entity ID in the WorkOS Dashboard.](https://images.workoscdn.com/images/5b7bc86b-bdcb-4ac5-a76a-a508e2d6ec0a.png?auto=format\&fit=clip\&q=50)

***

## What you'll need

Next, provide the [OneLogin SAML Metadata file](https://workos.com/docs/glossary/idp-metadata).

Normally, this will come from the organization's IT Management team when they set up your application's SAML 2.0 configuration in their OneLogin admin dashboard. But, should that not be the case during your setup, the next steps will show you how to obtain it.

![A screenshot showing the "Edit Metadata Configuration" button in the WorkOS Dashboard.](https://images.workoscdn.com/images/017ac221-c3bf-40bd-8606-a04c1d41c377.png?auto=format\&fit=clip\&q=50)

***

## (1) Log in

Log in to [OneLogin](https://app.onelogin.com/login), go to the admin dashboard, and select "Applications" in the navigation bar.

![A screenshot showing the "Applications" button in the OneLogin Dashboard.](https://images.workoscdn.com/images/6d7cdbdf-29aa-4076-aeb3-1d055a6e76ce.png?auto=format\&fit=clip\&q=50)

***

## (2) Select your application

Select your application from the list of applications.

![A screenshot showing your application selection in the OneLogin Dashboard.](https://images.workoscdn.com/images/0d165d03-b73d-4e39-a85d-c81d27affd60.png?auto=format\&fit=clip\&q=50)

***

## (3) Configure application

Select "Configuration" from the left-hand navigation:

- Enter the SP Entity ID as the Audience (EntityID) e.g. `https://auth.workos.com/wz5SpShhRIcSEyMM`
- Enter the ACS URL as the Recipient e.g. `https://auth.workos.com/sso/saml/acs/wz5SpShhRIcSEyMM`
- Enter your ACS URL Validator e.g. `^https:\/\/auth\.workos\.com\/sso\/saml\/acs\/wz5SpShhRIcSEyMM$`
- Enter your ACS URL e.g. `https://auth.workos.com/sso/saml/acs/wz5SpShhRIcSEyMM`
- Enter your application's login URL

![A screenshot showing how to configure URLs in your OneLogin SAML Application within the OneLogin Dashboard.](https://images.workoscdn.com/images/c9c6e8c0-fece-49c0-a72f-9bb9e087cb66.png?auto=format\&fit=clip\&q=50)

- Select "Service Provider" from the "SAML Initiator" dropdown menu
- Select "Assertion" from the "SAML Signature Element" dropdown menu

![A screenshot showing SAML Configuration in the SAML Application within the OneLogin Dashboard.](https://images.workoscdn.com/images/6beae398-67d7-4a3e-91cd-52e669af9ffa.png?auto=format\&fit=clip\&q=50)

***

## (4) Set up attribute mapping parameters

Select "Parameters" from the left-hand navigation and add the following field-value parameter pairs:

- `email` → `Email`
- `firstName` → `First Name`
- `id` → `UUID`
- `lastName` → `Last Name`

Check the "Include in SAML assertion" flag for each pair.

![A screenshot showing how to configure SAML Attribute Mapping in OneLogin Dashboard.](https://images.workoscdn.com/images/de9efebf-5767-4547-8877-02560c185b5b.png?auto=format\&fit=clip\&q=50)

### Role Assignment (optional)

With [identity provider role assignment](https://workos.com/docs/sso/identity-provider-role-assignment), users can receive roles within your application based on their group memberships. To return this information in the attribute statement, follow the guidance below.

Add a new parameter, and set the "Field name" to `groups`. Under "Flags", click the checkboxes for both "Include in SAML assertion" and "Multi-value parameter".

![A screenshot showing where to add a groups parameter in the OneLogin Dashboard.](https://images.workoscdn.com/images/c29bb81b-3d04-4adf-8dd9-944f7ccbbc14.png?auto=format\&fit=clip\&q=50)

Map the `groups` field to the attribute in OneLogin containing a user's group membership, such as "MemberOf", shown in the example below. For more information on sending group information, refer to the [OneLogin documentation](https://onelogin.service-now.com/support?id=kb_article\&sys_id=6561990adb5374101c167e77f496191d).

![A screenshot showing how to map the groups parameter in the OneLogin Dashboard.](https://images.workoscdn.com/images/a70cf3c0-3d41-41d7-9c30-ee81ad497acb.png?auto=format\&fit=clip\&q=50)

> Finish role assignment set-up by navigating to the SSO connection page in the *Organization* section of the [WorkOS Dashboard](https://dashboard.workos.com/). Create SSO groups by referencing the IdP Group ID. Then, assign roles to these SSO groups so group members are automatically granted roles within your application.

***

## (5) Upload Metadata File

Select "SSO" from the left-hand navigation.

Select the "More Actions" dropdown and click on "SAML Metadata". This will download an XML metadata file.

![A screenshot showing how to download Metadata File in OneLogin Dashboard.](https://images.workoscdn.com/images/9a6cfe8d-62a7-4d2a-a1af-d57b3c02eb2e.png?auto=format\&fit=clip\&q=50)

In the Connection Settings of the WorkOS Dashboard, click "Edit Metadata Configuration".

![A screenshot showing the "Edit Metadata Configuration" button in the WorkOS Dashboard. ](https://images.workoscdn.com/images/017ac221-c3bf-40bd-8606-a04c1d41c377.png?auto=format\&fit=clip\&q=50)

In the modal that pops up, upload the OneLogin Metadata file and then select "Save Metadata Configuration".

![A screenshot showing the pop-up after clicking the "Edit Metadata Configuration" button in the WorkOS Dashboard.](https://images.workoscdn.com/images/cb8e0b46-b7e0-47e4-81cf-20601612b31e.png?auto=format\&fit=clip\&q=50)

Once the file has uploaded, your Connection will then be linked and good to go!
