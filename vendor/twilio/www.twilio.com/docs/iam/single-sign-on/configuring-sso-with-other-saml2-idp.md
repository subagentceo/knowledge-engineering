# Configuring SSO with any other SAML2.0 Identity Provider

> \[!NOTE]
>
> Single Sign-On is available to all Twilio Editions customers. Learn more about [Editions](https://www.twilio.com/en-us/editions).

This guide covers configuring your SAML 2.0 Identity Provider with Twilio for SSO login to **Twilio Console**. If you are looking to Configure SSO for [Twilio Flex](/docs/flex) or [SendGrid](https://docs.sendgrid.com/), refer to the configuration guides for them:

* [Configuring Okta with Twilio Flex SSO](/docs/flex/admin-guide/setup/sso-configuration/okta)
* [Configuring Okta with Sendgrid SSO](https://docs.sendgrid.com/ui/account-and-settings/sso-okta)

Before proceeding with SSO Configuration make sure that you have satisfied all of the [prerequisites](/docs/iam/single-sign-on#prerequisites).

## Step 1: Create a new SSO Profile in the Twilio Admin Center

Go to Admin Center and click on the **Single Sign-On** option in the navigation bar as shown below

![Admin Center with Single Sign-On link highlighted in navigation.](https://docs-resources.prod.twilio.com/0a2ff86a2608e9cff1d2c33ecd39116a9701fa0e774527d2a5a15993b83c45b3.png)

Create a new SSO Profile by clicking the '**Create new SSO Profile** ' button. You will land on the below screen where you can copy or download the SP Metadata.

![Twilio SSO setup page for Okta with fields for Audience URL, ACS URL, and optional Recipient and Destination URLs.](https://docs-resources.prod.twilio.com/6c5f2607aa62c2fc234dcb7e82f927caa61e1028089d1c5d176ca5c01c7585ae.png)

Keep this tab open as you will need these values to configure a SAML application in your IdP

## Step 2: Create a new SAML Application or App Integration in your Identity Provider

You will need to create an application or integration that will enable your users to be able to log in to the Twilio Console via SAML single sign-on.

If your IdP supports multiple login methods for the application then please make sure to select SAML 2.0 as the login method.

Provide an appropriate name to the Application and if your IdP supports then upload [Twilio Logo](https://www.twilio.com/company/brand) so that your users can recognize and use the application.

## Step 3: Configuring SAML settings in your Application or App Integration

For your IdP to recognize Twilio SSO you will need to copy and paste the following values from the Twilio SSO Profile you created in Step 1 -

1. **Audience URI/Entity ID**: this value will be used by your IdP to specify the entity or audience the SAML Assertion is intended for
2. **Assertion Consumer Service (ACS) URL or Single sign-on (SSO) URL**: This is the Twilio URL where your IdP should send the SAML Response
3. **Recipient and Destination URLs**: If your IdP requires these values to be configured separately then populate the same value as ACS/SSO URL in these fields as well
4. **Default Relay State**: should be left blank

Apart from the above, you'll also need to configure NameID and Signing Option settings in your IdP -

1. **NameID**: The NameID format should be **EmailAddress** and its value should be configured to the email address attribute of your users.
2. **Signing Option**: You should configure your IdP to send **'Signed' SAML Response** as well as **'Signed' SAML Assertion** to Twilio.
3. **Encryption**: Twilio SSO does not support encrypted SAML response. So make sure that your IdP is configured to send **unencrypted** SAML responses.

## Step 4: Configure your IdP Metadata into the SSO Profile created in Twilio

Go to the tab where you have the Twilio SSO Profile opened. Confirm that you have configured the Signing Option and NameID settings in your IdP and click on Continue

![Azure SSO profile configuration with Twilio metadata and download XML option.](https://docs-resources.prod.twilio.com/aaf3dbf83a0b0d75e98c4733c8c7d1f85dcf6035b4c75de51b6c049700d68a0b.png)

In the next step, please update the friendly name of the SSO Profile to an appropriate value that you can recognize.

Then select the Identity Provider from the dropdown. If your Identity Provider is not there in the dropdown then select 'Other/Generic SAML 2.0'

![SSO profile configuration with Okta selected as the identity provider in Twilio Admin Center.](https://docs-resources.prod.twilio.com/2eb353eabafa0a5583d12839a25326209b81d7558534dd19a32f31773ece2e0f.png)

Upon selecting the Identity Provider you will see the IdP metadata fields as shown below.

![Configure Identity Provider's metadata with SAML 2.0, select 'Other/Generic SAML 2.0 provider'.](https://docs-resources.prod.twilio.com/7dc4e4b1704cfd42114bb98f6195464d9f0b8efb9b9fe3369185485cb5a5482f.png)

You will need to copy and paste the following values from your SAML Application in your Identity Provider -

1. **Issuer ID/URL**: This is also known as 'Identity Provider Issuer', 'Issuer' or 'Identifier' in some IdPs. This issuer value will be sent by the IdP in SAML assertion and Twilio will verify that the value configured here matches the value present in the SAML assertion.
2. **Single sign-on URL**: This is also known as 'SAML Endpoint', 'Login URL' or 'IdP SSO URL'. This is the URL where Twilio will send the SAML requests for authenticating users in the SP-initiated login flow
3. **X.509 Signing Certificate (Public Key)**: This should be the public key of the certificate that will be used to sign the SAML Response and Assertions for the SAML application you have configured in your IdP.

Once you have configured the 3 values, you can click on 'Save & Continue' to save the configured SSO profile and proceed to the next step to [test the SSO connection](/docs/iam/single-sign-on/test-the-sso-connection).
