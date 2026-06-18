# SAML

## Introduction

To set up a SAML connection on behalf of an organization, you'll need the identity provider metadata or manual configuration details from the organization's IT team.

***

## What WorkOS provides

When setting up a SAML connection, WorkOS provides three key pieces of information in the **Service Provider Details** section for an SSO connection within the [WorkOS Dashboard](https://dashboard.workos.com/):

- [SP Entity ID](https://workos.com/docs/glossary/sp-entity-id): A unique identifier that represents your application in SAML communications
- [ACS URL](https://workos.com/docs/glossary/acs-url): The endpoint where identity providers send authentication responses
- [SP Metadata](https://workos.com/docs/glossary/sp-metadata): A configuration file containing all necessary SAML settings

![WorkOS Settings](https://images.workoscdn.com/images/bc0ebb05-e918-4217-8435-bfd1c73dd1f6.png?auto=format\&fit=clip\&q=80)

These settings are required to configure a SAML integration. The **ACS URL** serves as the destination for authentication responses, while the **SP Entity ID** uniquely identifies your application in SAML requests and responses. The **SP Metadata** URL provides a complete configuration file that simplifies the setup process for the organization.

***

## What you will need

You will need to obtain one of the following from the organization:

- [Identity Provider Metadata URL](https://workos.com/docs/glossary/idp-metadata): Configuration URL containing SAML metadata (preferred)
- Manual configuration details: SSO URL, Entity ID, and X.509 Certificate (if metadata URL is not available)

Typically, the organization's IT team will provide these values when they configure your application in their identity provider admin dashboard. However, if you need to guide them through the process, the following sections will help.

***

## (1) Configure Service Provider Details

For SSO to properly function, the organization needs to create and configure a SAML application in their identity provider.

Copy the **ACS URL** and **SP Entity ID** from the **Service Provider Details** section in the WorkOS Dashboard.

Instruct IT contacts to paste these values into the corresponding fields in their identity provider's admin dashboard. Alternatively, they can use the service provider metadata URL to automatically configure the SAML connection if their identity provider supports metadata-based configuration.

***

## (2) Obtain identity provider metadata

After the organization creates a SAML application, their identity provider will provide either a metadata URL or manual configuration details.

If they have a metadata URL, in the WorkOS Dashboard, navigate to the **Identity Provider Configuration** section. Click **Edit Configuration**.

![Open Identity Provider Configuration in WorkOS Dashboard](https://images.workoscdn.com/images/a33cc226-7167-4450-8879-9f123fc8ffeb.png?auto=format\&fit=clip\&q=80)

Paste the metadata URL from the organization's IT team into the input field. Your connection will be automatically configured once the metadata is processed.

![Upload identity provider metadata URL to WorkOS Dashboard](https://images.workoscdn.com/images/4d25d1a1-57a0-464d-95d7-a33eb85d2e0f.png?auto=format\&fit=clip\&q=80)

If the organization's identity provider doesn't provide a metadata URL, you'll need to manually configure the connection by clicking the **Switch to Manual Configuration** option and entering the SSO URL, Entity ID, and X.509 Certificate provided by their IT team.

![Switch to Manual Configuration](https://images.workoscdn.com/images/7384d9b7-b918-4778-ac1f-2b389cf73241.png?auto=format\&fit=clip\&q=80)

![Manually configure connection in WorkOS Dashboard](https://images.workoscdn.com/images/37eaf62e-dd9f-41b0-9e91-221256318298.png?auto=format\&fit=clip\&q=80)

***

## (3) Configure attribute mapping

The organization's SAML provider needs to include specific attributes in the SAML response. Instruct them to configure their SAML application to include the following attributes in the Attribute Statement:

- `id`: Maps to the `idp_id` attribute in WorkOS user profiles
- `email`: Maps to the `email` attribute in WorkOS user profiles
- `firstName`: Maps to the `first_name` attribute in WorkOS user profiles
- `lastName`: Maps to the `last_name` attribute in WorkOS user profiles

### Role assignment (optional)

With [identity provider role assignment](https://workos.com/docs/sso/identity-provider-role-assignment), users can receive roles within your application based on their group memberships. To enable this functionality, instruct the organization to add a `groups` attribute to the SAML response that maps to a list of the user's group memberships.

> Finish role assignment set-up by navigating to the SSO connection page in the **Organizations** section of the [WorkOS Dashboard](https://dashboard.workos.com/). Create SSO groups by referencing the IdP Group ID. Then, assign roles to these SSO groups so group members are automatically granted roles within your application.
