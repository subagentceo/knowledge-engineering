# VMware

## Introduction

Each SSO Identity Provider requires specific information to create and configure a new [Connection](https://workos.com/docs/glossary/connection). Often, the information required to create a Connection will differ by Identity Provider.

***

## What WorkOS provides

WorkOS provides the [SP Metadata](https://workos.com/docs/glossary/sp-metadata) link. It's readily available in your Connection Settings in the [WorkOS Dashboard](https://dashboard.workos.com/).

![A screenshot showing where to find the SP Metadata in the WorkOS dashboard.](https://images.workoscdn.com/images/e253ad08-a85b-4586-bf8c-970059eb286c.png?auto=format\&fit=clip\&q=50)

***

## What you'll need

Next, you will provide the Metadata URL from VMware.

Normally, this information will come from the organization's IT Management team when they set up your application's SAML 2.0 configuration in their VMware admin dashboard. But, should that not be the case during your setup, here's how to obtain it.

***

## (1) Create a new SaaS Application

In your Workspace ONE Catalog, click "New". Give your application a descriptive name.

![A screenshot showing how to create new application in VMware.](https://images.workoscdn.com/images/576ed672-e030-4f1e-936e-c04d33ff7dfd.png?auto=format\&fit=clip\&q=50)

***

## (2) Basic SAML Configuration

Click the "Configuration" tab from the left sidebar.

Copy the SP Metadata Link from your VMware connection in the WorkOS dashboard and paste it in the URL/XML field under Configuration in Workspace One.

![A screenshot showing where to input WorkOS SP metadata when configuring VMware application.](https://images.workoscdn.com/images/6d7bace5-a513-4782-ac18-8327b5e364a3.png?auto=format\&fit=clip\&q=50)

***

## (3) Advanced SAML Configuration

Continue scrolling and expand "Advanced Properties".

![A screenshot showing where to find "Advanced Properties" dropdown in VMware application.](https://images.workoscdn.com/images/dc6d711a-104c-4cd6-bca7-dff852dbb2c9.png?auto=format\&fit=clip\&q=50)

Enable "Sign Assertion" and "Include Assertion Signature".

![A screenshot showing where to enable "Sign Assertion" and "Include Assertion Signature" in VMware application.](https://images.workoscdn.com/images/98b0a17a-51a4-41c4-87be-1ffadfce96aa.png?auto=format\&fit=clip\&q=50)

***

## (4) Configure Attribute Map

Continue scrolling until "Custom Attribute Mapping".

![A screenshot showing where to find "Custom Attribute Mapping" in VMware application.](https://images.workoscdn.com/images/d35112ac-5d76-47c4-aa6c-436321d30b06.png?auto=format\&fit=clip\&q=50)

Fill in the following attribute mappings and select "Next" until you are prompted to "Save".

- `id` → `${user.objectGUID}`
- `firstName` → `${user.firstName}`
- `lastName` → `${user.lastName}`
- `email` → `${user.email}`

![A screenshot showing how to configure attribute mappings in VMware application.](https://images.workoscdn.com/images/2ef20a4a-9095-4c35-85b8-cf4e16c79da9.png?auto=format\&fit=clip\&q=50)

Some VMware configurations use `user.ExternalId` instead of `user.objectGUID`. In this case, you would map the id attribute to `user.ExternalId`.

### Role Assignment (optional)

With [identity provider role assignment](https://workos.com/docs/sso/identity-provider-role-assignment), users can receive roles within your application based on their group memberships. To return this information in the attribute statement, map the groups in your identity provider to a SAML attribute named `groups`.

> Finish role assignment set-up by navigating to the SSO connection page in the *Organization* section of the [WorkOS Dashboard](https://dashboard.workos.com/). Create SSO groups by referencing the IdP Group ID. Then, assign roles to these SSO groups so group members are automatically granted roles within your application.

***

## (5) Upload Metadata URL

After saving your SaaS Application, click "Settings" then "SAML Metadata". Click on "Copy URL" next to "Identity Provider (IdP) metadata".

![A screenshot showing where to find metadata URL in VMware application.](https://images.workoscdn.com/images/f99932ab-8828-4b78-a044-0c19c35859dd.png?auto=format\&fit=clip\&q=50)

Back in the WorkOS Dashboard, click on "Edit Metadata Configuration" in the "Metadata Configuration" section of the Connection.

![A screenshot showing where to edit the IdP metadata URL in the WorkOS dashboard.](https://images.workoscdn.com/images/d743c922-1517-4dd2-80ab-cab5e4a9c53f.png?auto=format\&fit=clip\&q=50)

Finally, input the Metadata URL and click "Save Metadata Configuration". Your Connection will then be linked and good to go!

![A screenshot showing how to configure IdP metadata URL in the WorkOS dashboard.](https://images.workoscdn.com/images/30130529-4132-45f6-aa33-70d8760612fd.png?auto=format\&fit=clip\&q=50)
