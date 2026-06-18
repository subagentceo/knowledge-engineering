# NetIQ

## Introduction

Each SSO Identity Provider requires specific information to create and configure a new [Connection](https://workos.com/docs/glossary/connection). Often, the information required to create a Connection will differ by Identity Provider.

To create a NetIQ SAML Connection, you'll need the Identity Provider metadata that is available from the organization's NetIQ instance.

Start by logging in to your WorkOS dashboard and browse to the "Organizations" tab on the left hand navigation bar.

Select the organization you'd like to configure an NetIQ SAML Connection for, and select "Manually Configure Connection" under "Identity Provider".

![A screenshot showing where to find "Manually Configure Connection" in the WorkOS Dashboard.](https://images.workoscdn.com/images/c6f1423d-020f-4560-aed0-ca4895b5fbc1.png?auto=format\&fit=clip\&q=50)

Select "NetIQ SAML" from the Identity Provider dropdown, enter a descriptive name for the connection, and then select the "Create Connection" button.

![A screenshot showing "Create Connection" details in the WorkOS Dashboard.](https://images.workoscdn.com/images/5c854a7c-0180-45de-aeda-8b52d8275b75.png?auto=format\&fit=clip\&q=50)

***

## What WorkOS provides

WorkOS provides the [ACS URL](https://workos.com/docs/glossary/acs-url), the [SP Metadata](https://workos.com/docs/glossary/sp-metadata) link and the [SP Entity ID](https://workos.com/docs/glossary/sp-entity-id). They are readily available in your Connection Settings in the [WorkOS Dashboard](https://dashboard.workos.com/).

![A screenshot showing where to find the ACS URL and SP Entity ID in the WorkOS Dashboard.](https://images.workoscdn.com/images/e102db99-be9d-4aa5-b250-a690ce57d16e.png?auto=format\&fit=clip\&q=50)

The ACS URL is the location an Identity Provider redirects its authentication response to. The SP Metadata link contains a metadata file that the organization can use to set up the SAML integration. The SP Entity ID is a URI used to identify the issuer of a SAML request, response, or assertion.

***

## What you'll need

In order to integrate you'll need the [IdP Metadata URL](https://workos.com/docs/glossary/idp-metadata).

Normally, this will come from the organization's IT Management team when they set up your application's SAML 2.0 configuration in their NetIQ instance. But, should that not be the case during your setup, here's how to obtain it.

***

## (1) Enter Service Provider Details

Copy and paste the "ACS URL" and "SP Entity ID" into the corresponding fields for Service Provider details and configuration. For some setups, you can use the metadata found at the SP Metadata link to configure the SAML connection.

***

## (2) Obtain Identity Provider Metadata

Copy the IdP Metadata URL from your NetIQ SAML settings and upload it to your WorkOS Connection settings. Your Connection will then be linked and good to go!

![A screenshot showing where to place the NetIQ IdP Metadata URL in the WorkOS Dashboard.](https://images.workoscdn.com/images/e26ae490-1f53-4d88-8c0e-50bb8ed2be64.png?auto=format\&fit=clip\&q=50)

Alternatively, you can manually configure the connection by providing the IdP URI (Entity ID), [IdP SSO URL](https://workos.com/docs/glossary/idp-sso-url) and X.509 Certificate.

![A screenshot showing where to switch to Manual Configuration in the connections detail page.](https://images.workoscdn.com/images/20ea5490-7344-43f4-95bb-129e3aa44595.png?auto=format\&fit=clip\&q=50)

![A screenshot showing to click "Save Configuration" upon entering the Metadata data.](https://images.workoscdn.com/images/1a39b96e-3564-43b2-82e7-082f74ff4713.png?auto=format\&fit=clip\&q=50)

***

## (3) Configure Attribute Mapping

At minimum, the Attribute Statement in the SAML Response should include `id`, `email`, `firstName`, and `lastName` attributes.

### Role Assignment (optional)

With [identity provider role assignment](https://workos.com/docs/sso/identity-provider-role-assignment), users can receive roles within your application based on their group memberships. To return this information in the attribute statement, map the groups in your identity provider to a SAML attribute named `groups` to return this information in the attribute statement.

Once your SAML app is configured to return groups, navigate to the SSO connection page in the *Organization* section of the [WorkOS Dashboard](https://dashboard.workos.com/). Create SSO groups by referencing the IdP Group ID. Then, assign roles to these SSO groups so group members are automatically granted roles within your application.
