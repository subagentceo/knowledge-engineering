# CAS SAML

## Introduction

Each SSO Identity Provider requires specific information to create and configure a new [Connection](https://workos.com/docs/glossary/connection). Often, the information required to create a Connection will differ by Identity Provider.

To create a CAS SAML Connection, you'll need the Identity Provider Metadata URL that is available from your customer's CAS SAML instance.

***

## What WorkOS provides

WorkOS provides the [ACS URL](https://workos.com/docs/glossary/acs-url), the [SP Metadata](https://workos.com/docs/glossary/sp-metadata) link and the [SP Entity ID](https://workos.com/docs/glossary/sp-entity-id). They are readily available in your Connection Settings in the [WorkOS Dashboard](https://dashboard.workos.com/).

![A screenshot highlighting the "Service Provider Details" of a CAS SAML connection in the WorkOS Dashboard.](https://images.workoscdn.com/images/68f2825e-7787-4100-b7d5-8339ed75b6be.png?auto=format\&fit=clip\&q=50)

The ACS URL is the location an Identity Provider redirects its authentication response to. The SP Metadata link contains a metadata file that the organization can use to set up the SAML integration. The SP Entity ID is a URI used to identify the issuer of a SAML request, response, or assertion.

***

## What you'll need

In order to integrate you'll need the [IdP Metadata URL](https://workos.com/docs/glossary/idp-metadata).

Normally, this will come from the organization's IT Management team when they set up your application's SAML 2.0 configuration in their CAS instance. But, should that not be the case during your setup, here's how to obtain it.

***

## (1) Enter Service Provider Details

Copy and paste the "ACS URL" and "SP Entity ID" into the corresponding fields for Service Provider details and configuration. For some setups, you can use the metadata found at the SP Metadata link to configure the SAML connection.

***

## (2) Obtain Identity Provider Metadata

Copy the IdP Metadata URL from your CAS SAML settings and upload it to your WorkOS Connection settings. Your Connection will then be linked and good to go!

![A screenshot highlighting the "URL Metadata Configuration" input of a CAS SAML Connection in the WorkOS Dashboard.](https://images.workoscdn.com/images/a32e166f-ab97-47f1-988d-6799b303160f.png?auto=format\&fit=clip\&q=50)

Alternatively, you can manually configure the connection by providing the IdP URI (Entity ID), [IdP SSO URL](https://workos.com/docs/glossary/idp-sso-url) and X.509 Certificate.

![A screenshot highlighting the "Switch to Manual Configuration" button on the URL Metadata Configuration modal of a CAS SAML connection in the WorkOS Dashboard.](https://images.workoscdn.com/images/4b40807d-0f4c-4b0f-81a5-05f832b88b25.png?auto=format\&fit=clip\&q=50)

![A screenshot showing the input fields for manual configuration of a CAS SAML connection in the WorkOS Dashboard.](https://images.workoscdn.com/images/0eb372eb-551f-4ad8-8d89-9519ce10dfbe.png?auto=format\&fit=clip\&q=50)

***

## (3) Configure Attribute Mapping

At minimum, the Attribute Statement in the SAML Response should include `id`, `email`, `firstName`, and `lastName` attributes.

### Role Assignment (optional)

With [identity provider role assignment](https://workos.com/docs/sso/identity-provider-role-assignment), users can receive roles within your application based on their group memberships. To return this information in the attribute statement, map the groups in your identity provider to a SAML attribute named `groups`.

Once your SAML app is configured to return groups, navigate to the SSO connection page in the *Organization* section of the [WorkOS Dashboard](https://dashboard.workos.com/). Create SSO groups by referencing the IdP Group ID. Then, assign roles to these SSO groups so group members are automatically granted roles within your application.
