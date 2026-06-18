# Shibboleth Generic SAML

## Introduction

These instructions are for connecting to Shibboleth using the [generic SAML 2.0 configuration](https://shibboleth.atlassian.net/wiki/spaces/IDP4/pages/1265631694/SAML2SSOConfiguration). If the organization requires the [UnsolicitedSSOConfiguration](https://shibboleth.atlassian.net/wiki/spaces/IDP4/pages/1265631696/UnsolicitedSSOConfiguration) instead, please use the [Shibboleth Unsolicited SAML provider documentation](https://workos.com/docs/integrations/shibboleth-unsolicited-saml).

Each SSO Identity Provider requires specific information to create and configure a new [connection](https://workos.com/docs/glossary/connection). Often, the information required to create a connection will differ by Identity Provider.

To create a Shibboleth Generic SAML connection, you'll need the Identity Provider metadata that is available from the organization's Shibboleth instance.

Start by logging in to your WorkOS dashboard and browse to the "Organizations" tab on the left hand navigation bar.

Select the organization you wish to configure a Shibboleth Generic SAML connection for, and select "Manually Configure Connection" under "Identity Provider".

![A screenshot showing where to find "Manually Configure Connection" in the WorkOS Dashboard.](https://images.workoscdn.com/images/f07dc8e4-e97c-4bd0-9dbd-14915cd46e40.png?auto=format\&fit=clip\&q=50)

Select "Shibboleth Generic SAML" from the Identity Provider dropdown, enter a descriptive name for the connection, and then select the "Create Connection" button.

![A screenshot showing "Create Connection" details in the WorkOS Dashboard.](https://images.workoscdn.com/images/640b70d1-60ce-48c7-865f-2441325a078c.png?auto=format\&fit=clip\&q=50)

***

## What WorkOS provides

Once you've created your connection, WorkOS provides the [ACS URL](https://workos.com/docs/glossary/acs-url), [SP Metadata](https://workos.com/docs/glossary/sp-metadata) link, and [SP Entity ID](https://workos.com/docs/glossary/sp-entity-id). It's readily available in your connection settings in the [WorkOS Dashboard](https://dashboard.workos.com/).

![A screenshot showing where to find the ACS URL, SP Metadata and SP Entity ID in the WorkOS Dashboard.](https://images.workoscdn.com/images/efd8ea95-9dbd-4a18-b961-7d9d1b4bc3ce.png?auto=format\&fit=clip\&q=50)

The ACS URL is the location an Identity Provider redirects its authentication response to. The SP Metadata link contains a metadata file that the organization can use to set up the Shibboleth Generic SAML integration.

The SP Entity ID is a URI used to identify the issuer of a SAML request and the audience of a SAML response. In this case, the SP Entity ID is used to communicate that WorkOS will be the party performing SAML requests to the organization's Shibboleth instance, and that WorkOS is the intended audience of the SAML responses from the Shibboleth instance.

***

## What you'll need

In order to integrate you'll need the Shibboleth IdP metadata.

Normally, this information will come from the organization's IT Management team when they set up your application's Shibboleth configuration. But, should that not be the case during your setup, here's how to obtain them.

***

## (1) Enter Service Provider Details

Copy and Paste the "ACS URL" and "SP Entity ID" into the corresponding fields for Service Provider details and configuration. For some Shibboleth setups, you can use the metadata found at the SP Metadata link to configure the Shibboleth connection.

***

## (2) Obtain Identity Provider Metadata

Download the IdP metadata from the Shibboleth instance. Refer to the [Shibboleth documentation](https://shibboleth.atlassian.net/wiki/spaces/CONCEPT/pages/928645275/MetadataForIdP) for more information on this metadata file. Keep in mind where the file was saved, as we'll be uploading it later to configure the Connection.

***

## (3) Configure Attribute Mapping

At a minimum, the Attribute Statement in the SAML Response should include `id`, `email`, `firstName`, and `lastName` attributes. Refer to the [Shibboleth documentation](https://shibboleth.atlassian.net/wiki/spaces/CONCEPT/pages/928645122/SAMLAttributeNaming) for more information on adding and mapping attributes.

### Role Assignment (optional)

With [identity provider role assignment](https://workos.com/docs/sso/identity-provider-role-assignment), users can receive roles within your application based on their group memberships. To return this information in the attribute statement, map the groups in your identity provider to a SAML attribute named `groups`.

Once your SAML app is configured to return groups, navigate to the SSO connection page in the *Organization* section of the [WorkOS Dashboard](https://dashboard.workos.com/). Create SSO groups by referencing the IdP Group ID. Then, assign roles to these SSO groups so group members are automatically granted roles within your application.

***

## (4) Upload Metadata File

In the connection settings in the WorkOS Dashboard, click "Edit Metadata Configuration".

![A screenshot showing where to edit the IdP metadata URL in the WorkOS Dashboard.](https://images.workoscdn.com/images/8fb3610f-15a3-4e10-8441-50121bd32609.png?auto=format\&fit=clip\&q=50)

Upload the XML metadata file from Shibboleth into the "Metadata File" field and select "Save Metadata Configuration". Your connection will then be linked and good to go!

![A screenshot showing where to upload and how to save the IdP metadata URL in the WorkOS Dashboard.](https://images.workoscdn.com/images/d9745f3c-4b3f-4e43-aea2-1b21e7160909.png?auto=format\&fit=clip\&q=50)
