# Single Sign On

> \[!NOTE]
>
> Single Sign-On is available to all Twilio Editions customers. Learn more about [Editions](https://www.twilio.com/en-us/editions).

Single Sign-On (SSO) lets your users log in to the Twilio Console using their corporate identity provider (IdP) credentials, such as Azure Active Directory, Okta, or OneLogin.

## What are the benefits of SSO?

SSO provides the following security and compliance benefits:

* You have a single source for authenticating your users through the IdP. You can also manage security and compliance policies, such as password policies and mandatory two-factor authentication, in one place.
* When users leave your organization, you only need to remove them from one place.

## How does Twilio Console SSO work?

SSO for the Twilio Console supports the SAML (Security Assertion Markup Language) 2.0 standard. After you configure SSO, Twilio acts as a service provider (SP) and lets users log in through IdP-initiated or SP-initiated flows.

* You must create a user in Twilio before they can log in with SSO. You can create users manually, through [Bulk User Import](/docs/iam/organizations/managed-users#import-users), or by using the [SCIM API](/docs/iam/scim) to automate provisioning from your IdP.
* Twilio uses the user's email address as the unique identifier (NameID in SAML terminology) and expects the NameID value in the SAML assertion to match it.
* When SSO is enforced, a user can only log in with SSO. They can't log in with their password.
* Twilio SSO handles authentication only. It doesn't manage account access or user roles. To manage these, use the Twilio Console or the Admin Center.

## Supported features

Twilio Console SSO supports the following features:

* **SP-initiated login with Proof Key for Code Exchange (PKCE)**: Twilio SSO supports SP-initiated login, where the user starts the login process by visiting the Twilio Console and entering their email address. PKCE secures user authentication to Twilio. Any IdP-initiated login attempts to the Twilio Console (when a user clicks the Twilio app, link, or tile from your IdP) are converted to SP-initiated and then authenticate the user by sending a SAML authentication request to your IdP.
* **SSO enforcement for users based on domains**: You can enforce SSO for users based on their email domains. When you select domains and enforce SSO on them:
  * All existing managed users belonging to those domains become SSO-enforced.
  * Any new managed users created for these domains are also SSO-enforced. Users must set up their password during the initial login, but subsequent logins require SSO.
  * After SSO is enforced for a user, they can only log in with SSO.
* **Activate or deactivate SSO for specific managed users**: If you have specific users who need to log in without SSO, you can deactivate SSO for them in the Admin Center and activate it again as needed.
* **Multiple SSO profiles**: If you have more than one IdP that you want to configure with Twilio, you can create multiple SSO profiles.

## Limitations

SSO doesn't manage the following:

* Role assignments or account-level permissions. Use the Twilio Console or the Admin Center to manage these.
* Just-in-time (JIT) user provisioning. Use the SCIM API for automated provisioning instead.

## Configuring SSO for Twilio Console

> \[!NOTE]
>
> The following configuration steps are for the self-service SSO product in the Admin Center.
>
> If you use the legacy SSO configuration process (which requires Twilio Support), see [Legacy Console SSO](/docs/iam/single-sign-on/legacy-twilio-console-sso) instead.

### Prerequisites

Before you start, make sure you have the following:

* An identity provider that supports SAML 2.0.
* A [Twilio Organization](/docs/iam/organizations) with access to the Admin Center as an Organization [Administrator](/docs/iam/organizations#organization-roles).
* A Twilio Edition that includes Single Sign-On, with the feature turned on for your Twilio Organization.
* [Verified domains](/docs/iam/organizations/domains) for your users' email addresses.
* Your existing users added or imported as [managed users](/docs/iam/organizations/managed-users) in your Organization. You can use [Bulk User Import](/docs/iam/organizations/managed-users#import-users) to find and import all existing users from your domain, or use the [SCIM API](/docs/iam/scim) to automate provisioning.

The SSO configuration process involves the following phases:

* Add the Twilio SP metadata to your IdP and configure your IdP metadata in Twilio.
* Test the SSO connection to verify that everything works correctly.
* Select the verified domains for which you want to enforce SSO.

### Configuration guides

Follow the configuration guide for your identity provider. If your IdP isn't listed, use the [Other SAML 2.0 Identity Providers](/docs/iam/single-sign-on/configuring-sso-with-other-saml2-idp) guide.

> \[!NOTE]
>
> To turn on signed SAML, contact your Account Executive. To support signed requests, update your IdP settings and upload the certificate that the Twilio team shared with you.

* [Azure Active Directory](/docs/iam/single-sign-on/configuring-azure-active-directory-with-twilio-sso)
* [Okta](/docs/iam/single-sign-on/configuring-okta-with-twilio-sso)
* [Other SAML 2.0 Identity Providers](/docs/iam/single-sign-on/configuring-sso-with-other-saml2-idp)

## Activate or deactivate SSO for specific managed users

You must set up an SSO profile before you can activate or deactivate SSO for specific managed users. See [Configuring SSO for Twilio Console](#configuring-sso-for-twilio-console) if you haven't configured an SSO profile yet.

1. Go to the [Admin Center](https://www.twilio.com/console/admin).
2. Click **Users**.

   ![Twilio sidebar menu with options like Admin Center and Single sign-on.](https://docs-resources.prod.twilio.com/d3bddbafec9005c4951273182c81c48901af925a6381a1f31abdafb10951df48.png)
3. Click the name of the user for whom you want to activate or deactivate SSO.
4. Select **Enabled** or **Disabled** for the user.
5. In the confirmation dialog, select the checkbox and confirm that you want to change the SSO setting.

   ![Prompt to acknowledge changes before deactivating single sign-on with checkbox to confirm.](https://docs-resources.prod.twilio.com/43a17705c68ba2c1292293a23379c67b4add74da8c54a46c378336db0bffc342.png)
6. Click **Save**.

   ![Single sign-on enabled with options to save, cancel, remove, or delete user.](https://docs-resources.prod.twilio.com/c8dd59e330a94577199672766a58ad322ac1bf1af747aa17369a485ee53c917b.png)

## Automated user provisioning with SCIM

Twilio supports automated user provisioning and deprovisioning through the [SCIM API](/docs/iam/scim). You can integrate your IdP with the SCIM API to automatically create, update, and deactivate users in Twilio when you make changes in your IdP. For setup instructions, see the [SCIM API overview](/docs/iam/scim).
