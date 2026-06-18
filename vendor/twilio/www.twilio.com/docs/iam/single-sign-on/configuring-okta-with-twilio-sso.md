# Configuring Okta with Twilio SSO

> \[!NOTE]
>
> Single Sign-On is available to all Twilio Editions customers. Learn more about [Editions](https://www.twilio.com/en-us/editions).

This guide covers configuring your Okta Identity Provider with Twilio for SSO login to **Twilio Console**. If you are looking to Configure SSO for [Twilio Flex](/docs/flex) or [SendGrid](https://docs.sendgrid.com/), refer to the configuration guides for them:

* [Configuring Okta with Twilio Flex SSO](/docs/flex/admin-guide/setup/sso-configuration/okta)
* [Configuring Okta with Sendgrid SSO](https://docs.sendgrid.com/ui/account-and-settings/sso-okta)

Before proceeding with SSO Configuration make sure that you have satisfied all of the [prerequisites](/docs/iam/single-sign-on#prerequisites).

## Step 1: Create a new SSO Profile in the Twilio Admin Center

Go to Admin Center and click on the **Single Sign-On** option in the navigation bar as shown below

![Admin Center with Single Sign-On link highlighted in navigation.](https://docs-resources.prod.twilio.com/0a2ff86a2608e9cff1d2c33ecd39116a9701fa0e774527d2a5a15993b83c45b3.png)

Create a new SSO Profile by clicking the '**Create new SSO Profile** ' button. You will land on the below screen where you can copy or download the SP Metadata.

![Twilio SSO setup page for Okta with fields for Audience URL, ACS URL, and optional Recipient and Destination URLs.](https://docs-resources.prod.twilio.com/6c5f2607aa62c2fc234dcb7e82f927caa61e1028089d1c5d176ca5c01c7585ae.png)

Keep this tab open as you will need to copy and paste the Entity ID and Single Sign On URL values in Okta

## Step 2: Create a new SAML Application Integration in Okta

In a new tab open your **Okta Admin** console, go to Applications and click on '**Create App Integration** '

![Okta Applications page with Create App Integration button highlighted.](https://docs-resources.prod.twilio.com/8b31e55bcb1ed682bf38acb958d59db77a7376e95d396bca6852e0b44800f2de.png)

You will see a popup as shown below. Select the sign-in method as 'SAML 2.0' and click Next

![Okta new app integration with SAML 2.0 selected for sign-in method.](https://docs-resources.prod.twilio.com/5e9007d1939dcf99416a135776cf846bbcf35d90be59e3ffded90b5a1aa68512.png)

In the next screen, enter an appropriate name for the App you are configuring. This name should be such that your users can recognize and search for it from their Okta home page. You should also upload the Twilio logo from [here](https://www.twilio.com/company/brand).

![Okta Create SAML Integration with Twilio Console SSO app name input.](https://docs-resources.prod.twilio.com/7b30ad4c72f564167b4f08601b766ac7bb9b732f30184f6c49fd0dd0a0b44ad9.png)

## Step 3: Configuring SAML settings in your App Integration

To configure the SAML settings, follow the below process -

* First copy and paste the values for the Single sign-on URL (SSO URL) and Audience URI from the other tab where you have the SSO Profile in Twilio Admin Center.

  * Paste the 'Audience URL/Entity ID' value from the Twilio SSO Profile in the 'Audience URI (SP Entity ID)' field of Okta App Integration
  * Paste the 'Assertion consumer service (ACS)/ SSO URL' value from the Twilio SSO Profile in the 'Single sign-on URL' field of Okta App Integration
* Keep the checkbox 'Use this for Recipient and Destination URL' selected. Also, keep the 'Default Relay State' blank.
* Next select '**EmailAddress** ' as the Name ID Format and select '**Email** ' as the Application username. This configuration tells Okta that the application(Twilio Console) uses the email address of the users as the username (i.e. unique identifier).

![Okta settings showing response and assertion signature as signed, and assertion encryption as unencrypted.](https://docs-resources.prod.twilio.com/3e93090b6bac76ba9ff2d8497e3c7b116b14b5aa1fd7ec481b5d0ff689bf11bb.png)

For the next step, click on '**Show Advanced Settings** '.

* In the advanced settings, make sure that the **Response** and **Assertion Signature** are selected as '**Signed** '.
* The **Assertion Encryption** should be kept as '**Unencrypted** '.
* You don't need to make any other changes in this section.

![Okta-Configure SAML SP Metadata 2.](https://docs-resources.prod.twilio.com/2b4b043848d3242b14c9f027b487eadd551069ccb1fc66811dbfc8a3e46404a2.png)

Upon clicking next, you will see the feedback step as shown below - you can click 'Finish' without entering anything.

![Okta form for configuring SAML with options for customer type and app integration details.](https://docs-resources.prod.twilio.com/d642b053f7aa7da43b3d724bc15c45eaabef692a4195b0cac84e698ba41aa86f.png)

Upon clicking 'Finish' you will land on the below screen. Click on the '**View Setup Instructions** ' to view the Identity Provider metadata.

![Okta settings page for Twilio Console SSO with SAML 2.0 setup instructions highlighted.](https://docs-resources.prod.twilio.com/69b5ad2dc4c1fb7801aab6511da7a2aba364fe1ddadc36bb42a016bdd29c6797.png)

You will see the IdP metadata in a new tab as shown below. Keep this tab open as you will need to copy and paste the values from here into the Twilio Admin Center in the next step.

![Okta configuration showing Identity Provider URL, Issuer, and X.509 certificate for Twilio SSO.](https://docs-resources.prod.twilio.com/538f9955ddbae4e96d2a9d38ff86f4c30f4210bbbb9d8225d4723078ba4380f3.png)

## Step 4: Configure your IdP Metadata into the SSO Profile created in Twilio

Go to the tab where you have the Twilio SSO Profile opened. Confirm that you have configured the Signing Option and NameID settings in your IdP and click on Continue

![Azure SSO profile configuration with Twilio metadata and download XML option.](https://docs-resources.prod.twilio.com/aaf3dbf83a0b0d75e98c4733c8c7d1f85dcf6035b4c75de51b6c049700d68a0b.png)

In the next step, please update the friendly name of the SSO Profile to an appropriate value that you can recognize and select '**Okta** ' as the Identity Provider from the dropdown.

![SSO profile configuration with Okta selected as the identity provider in Twilio Admin Center.](https://docs-resources.prod.twilio.com/2eb353eabafa0a5583d12839a25326209b81d7558534dd19a32f31773ece2e0f.png)

Upon selecting the Identity Provider you will see the IdP metadata fields as shown below. Copy and paste the corresponding values from the Okta Setup Instructions page that is open in another tab.

![Configure SAML metadata for Okta as Identity Provider in Twilio Admin Center.](https://docs-resources.prod.twilio.com/64daaded722d81da3f57c2fd6f36043a3a2087896c67b8f6485dacf22da70551.png)

After configuring these 3 values from your Okta Application into the Twilio SSO Profile, click the 'Save & Continue' button to save the SSO Profile and proceed to the next step to [test the SSO Connection](/docs/iam/single-sign-on/test-the-sso-connection).

## Additional Resources

[Okta's documentation for creating a SAML App Integration](https://developer.okta.com/docs/guides/build-sso-integration/saml2/main/)
