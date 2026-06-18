# Oracle SAML

## Introduction

Each SSO Identity Provider requires specific information to create and configure a new [connection](https://workos.com/docs/glossary/connection). Often, the information required to create a connection will differ by Identity Provider.

To create an Oracle SAML connection, you'll need the Identity Provider Metadata URL that is available from the organization's Oracle SAML instance.

***

## What WorkOS provides

WorkOS provides the [ACS URL](https://workos.com/docs/glossary/acs-url) and the [SP Entity ID](https://workos.com/docs/glossary/sp-entity-id). They are readily available in your connection Settings in the [WorkOS Dashboard](https://dashboard.workos.com/).

![A screenshot showing where to obtain the SP Entity ID and ACS URL in the WorkOS Dashboard.](https://images.workoscdn.com/images/c1b55179-b848-40c5-b56f-dc15eb325a34.png?auto=format\&fit=clip\&q=50)

The ACS URL is the location an Identity Provider redirects its authentication response to. The SP Entity ID is a URI used to identify the issuer of a SAML request, response, or assertion.

***

## What you'll need

In order to integrate you'll need the IdP Metadata URL.

Normally, this will come from the organization's IT management team when they set up your application's SAML configuration in their Oracle instance. But, should that not be the case during your setup, here's how to obtain it.

***

## (1) Configure SAML Application with Service Provider Details

Follow the [Oracle Cloud documentation](https://docs.oracle.com/en/cloud/paas/identity-cloud/uaids/add-saml-application.html) to create a new SAML application.

Copy and paste the ACS URL and SP Entity ID into the corresponding fields for Service Provider details and configuration.

In the Advanced Settings of the SSO Configuration page, ensure that you select Signed SSO for Assertion and Response, and Include Signing Certificate in Signature.

***

## (2) Configure SAML Attributes

Expand the Attribute Configuration section on the SSO Configuration page and add the following 4 required attributes: `firstName`, `lastName`, `email`, and `id`.

Ensure the following attribute mapping is set:

- A user's first name → `firstName`
- A user's last name → `lastName`
- A user's email address → `email`
- A unique identifier representing a user → `id`

### Role Assignment (optional)

With [identity provider role assignment](https://workos.com/docs/sso/identity-provider-role-assignment), users can receive roles within your application based on their group memberships. To return this information in the attribute statement, map the groups in your identity provider to a SAML attribute named `groups`.

> Finish role assignment set-up by navigating to the SSO connection page in the *Organization* section of the [WorkOS Dashboard](https://dashboard.workos.com/). Create SSO groups by referencing the IdP Group ID. Then, assign roles to these SSO groups so group members are automatically granted roles within your application.

***

## (3) Obtain Identity Provider Metadata

Obtain the IdP Metadata URL following the [instructions from Oracle](https://docs.oracle.com/en/cloud/paas/identity-cloud/uaids/access-saml-metadata.html).

![A screenshot showing where the IdP Metadata URL is entered in the WorkOS Dashboard.](https://images.workoscdn.com/images/52e3e5ff-d0da-481e-8e40-a614a9c964a5.png?auto=format\&fit=clip\&q=50)

Alternatively, you can manually configure the connection by providing the IdP URI (Entity ID), [IdP SSO URL](https://workos.com/docs/glossary/idp-sso-url) and X.509 Certificate.

![A screenshot showing the manual configuration details in the WorkOS Dashboard](https://images.workoscdn.com/images/94f7c669-02a8-4d30-9e4f-86ae58b0f318.png?auto=format\&fit=clip\&q=50)

Your connection will then be Active and good to go!
