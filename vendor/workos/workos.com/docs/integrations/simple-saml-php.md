# SimpleSAMLphp

## Introduction

Each SSO Identity Provider requires specific information to create and configure a new [Connection](https://workos.com/docs/glossary/connection). Often, the information required to create a Connection will differ by Identity Provider.

To create a SimpleSAMLphp SAML Connection, you'll need the Identity Provider Metadata URL that is available from the organization's SimpleSAMLphp instance.

***

## What WorkOS provides

WorkOS provides the [ACS URL](https://workos.com/docs/glossary/acs-url), the [SP Metadata](https://workos.com/docs/glossary/sp-metadata) Link and the [SP Entity ID](https://workos.com/docs/glossary/sp-entity-id). They are readily available in your Connection Settings in the [WorkOS Dashboard](https://dashboard.workos.com/).

![A screenshot showing where to find the ACS URL, SP Metadata and SP Entity ID in the WorkOS dashboard.](https://images.workoscdn.com/images/e2c962f1-2fe9-470f-af1f-684fe651fcbc.png?auto=format\&fit=clip\&q=50)

The ACS URL is the location an Identity Provider redirects its authentication response to. The SP Metadata link contains a metadata file that the organization can use to set up the SAML integration. The SP Entity ID is a URI used to identify the issuer of a SAML request, response, or assertion.

***

## What you'll need

In order to integrate, you'll need the [IdP Metadata URL](https://workos.com/docs/glossary/idp-metadata).

Normally, this will come from the organization's IT Management team when they set up your application's SAML configuration in their SimpleSAMLphp instance. But, should that not be the case during your setup, here's how to obtain it.

***

## (1) Configure SAML Application with Service Provider Details

Follow the [SimpleSAMLphp documentation](https://simplesamlphp.org/docs/stable/simplesamlphp-idp.html) to set up SimpleSAMLphp as an Identity Provider and add a new SP.

Copy and paste the ACS URL and SP Entity ID into the corresponding fields for Service Provider configuration. You can find more on how to structure this under "Adding SPs to the IdP" in the SimpleSAMLphp documentation linked above.

The necessary SP metadata can also be found in the SP metadata URL provided in the WorkOS Dashboard.

***

## (2) Configure SAML Attributes

You will need to send the following 4 required attributes in the SAML Response: `firstName`, `lastName`, `email`, and `id`.

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

Obtain the IdP Metadata URL. As noted in the ["Adding this IdP to other SPs" section of the SimpleSAMLphp documentation](https://simplesamlphp.org/docs/stable/simplesamlphp-idp.html), the IdP metadata URL should be available from `/saml2/idp/metadata.php`.

![A screenshot showing where to edit the IdP metadata URL in the WorkOS dashboard.](https://images.workoscdn.com/images/07f6f9a0-4331-4124-b90e-dc8d24f7e2ea.png?auto=format\&fit=clip\&q=50)

Alternatively, you can manually configure the connection by providing the IdP URI (Entity ID), [IdP SSO URL](https://workos.com/docs/glossary/idp-sso-url) and X.509 Certificate.

![A screenshot showing how to switch to manual IdP metadata configuration in the WorkOS dashboard.](https://images.workoscdn.com/images/07c47c03-354d-4df4-bdb9-bc25573aeb25.png?auto=format\&fit=clip\&q=50)

![A screenshot showing how to manually configure the IdP metadata in the WorkOS dashboard.](https://images.workoscdn.com/images/d838649f-ee75-429e-94b2-c1693294b81c.png?auto=format\&fit=clip\&q=50)

Your Connection will then be Active and good to go!
