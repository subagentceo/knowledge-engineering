# PingOne SAML

## Introduction

Each SSO Identity Provider requires specific information to create and configure a new [Connection](https://workos.com/docs/glossary/connection). Often, the information required to create a Connection will differ by Identity Provider.

To create a PingOne SAML Connection, you'll need two pieces of information: an [SP Metadata URL](https://workos.com/docs/glossary/sp-metadata) from WorkOS, and an [IdP Metadata URL](https://workos.com/docs/glossary/idp-metadata) from PingOne.

***

## What WorkOS provides

WorkOS provides the SP Metadata URL. It is readily available in your Connection settings in the [WorkOS Dashboard](https://dashboard.workos.com/).

![A screenshot showing where to find the SP Metadata URL in the WorkOS Dashboard.](https://images.workoscdn.com/images/30a33416-afd5-4c8a-b629-392fb4666ef3.png?auto=format\&fit=clip\&q=50)

The SP Metadata link contains a metadata file the organization can use to set up the SAML integration. In PingOne's case, the SP Metadata URL needs to be set by the organization when configuring your application in their PingOne instance.

Specifically, the SP Metadata URL will need to be set on the SAML Configuration page:

![A screenshot showing where the SP Metadata URL needs to be set in the PingOne settings.](https://images.workoscdn.com/images/01d0b62a-de8b-426e-a89e-f94a4f4fc721.png?auto=format\&fit=clip\&q=50)

***

## What you'll need

Next, provide the PingOne IdP Metadata URL.

Normally, this information will come from the organization's IT Management team when they set up your application's SAML 2.0 configuration in their PingOne admin dashboard. However, should that not be the case during your setup, here's how to obtain them:

***

## (1) Log In and Select Your Application

In the PingOne Admin Console, select "Applications" (under "Connections") in the side menu. Then, select your application.

![A screenshot showing where to select a SAML app in PingOne.](https://images.workoscdn.com/images/5eecf339-0475-441c-af8b-4f7bab95d8f4.png?auto=format\&fit=clip\&q=50)

***

## (2) Configure Attribute Mapping

In the "Attribute Mapping" section of the PingOne SAML app, add the following field-value parameter pairs:

- `email` → `Email Address`
- `firstName` → `Given Name`
- `id` → `User ID`
- `lastName` → `Family Name`

![A screenshot showing where to configure SAML attributes in PingOne.](https://images.workoscdn.com/images/1ad40d3f-dea4-4ebc-af6f-85bfc81cce30.png?auto=format\&fit=clip\&q=50)

### Role Assignment (optional)

With [identity provider role assignment](https://workos.com/docs/sso/identity-provider-role-assignment), users can receive roles within your application based on their group memberships. To return this information in the attribute statement, follow the guidance below.

Select the `+ Add` button once. To return the names of all groups a user is a member of, add "groups" in the "Attributes" column mapped to the "Group Names" PingOne attribute. Click "Save".

## ![A screenshot showing where to configure SAML groups attribute in PingOne.](https://images.workoscdn.com/images/750a99c5-ac7b-40b2-86fe-bb579c151606.png?auto=format\&fit=clip\&q=50)

Add a new `groups` attribute mapped to the "Group Names" PingOne attribute.

> Finish role assignment set-up by navigating to the SSO connection page in the *Organization* section of the [WorkOS Dashboard](https://dashboard.workos.com/). Create SSO groups by referencing the IdP Group ID. Then, assign roles to these SSO groups so group members are automatically granted roles within your application.

***

## (3) Obtain Identity Provider Metadata

In the "Configuration" tab, copy the "IdP Metadata URL". You'll need this in the next step. Enable the SAML app to allow users to authenticate.

![A screenshot showing where to copy the IdP Metadata URL from in PingOne.](https://images.workoscdn.com/images/e6e6f666-d67e-4a96-b1be-d9bf015e8d62.png?auto=format\&fit=clip\&q=50)

***

## (4) Upload IdP Metadata URL

Finally, upload the IdP Metadata URL you saved earlier in your WorkOS Connection settings. Your Connection will then be linked and good to go!

![A screenshot showing where to upload the IdP Metadata URL in the WorkOS Dashboard.](https://images.workoscdn.com/images/0eccd480-bbb3-4ee3-8c9a-d0c65934fd15.png?auto=format\&fit=clip\&q=50)
