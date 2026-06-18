# Configuring Azure Active Directory with Twilio SSO

> \[!NOTE]
>
> Single Sign-On is available to all Twilio Editions customers. Learn more about [Editions](https://www.twilio.com/en-us/editions).

This guide covers your Azure ActiveDirectory Identity Provider with Twilio for SSO login to **Twilio Console**. If you are looking to Configure SSO for Twilio Flex or SendGrid, please refer to the configuration guides for them:

* [Configure Azure Active Directory with Flex](/docs/flex/admin-guide/setup/sso-configuration/azure-ad)
* [Twilio Sendgrid SSO](https://docs.sendgrid.com/ui/account-and-settings/sso)

Before proceeding with SSO Configuration make sure that you have satisfied all of the [prerequisites](/docs/iam/single-sign-on#prerequisites).

## Step 1: Create a new SSO Profile in the Twilio Admin Center

Go to Admin Center and click on the **Single Sign-On** option in the navigation bar as shown below

![Admin Center with Single Sign-On link highlighted in navigation.](https://docs-resources.prod.twilio.com/0a2ff86a2608e9cff1d2c33ecd39116a9701fa0e774527d2a5a15993b83c45b3.png)

Create a new SSO Profile by clicking the '**Create new SSO Profile** ' button. You will land on the below screen where you can copy or download the SP Metadata.

![SSO profile with Twilio metadata URLs and XML download option.](https://docs-resources.prod.twilio.com/4d1aa4309cd42fad5252290d44bf23401156e62bc47b33e3e5ddc5ebdbd21cfb.png)

Download Twilio as SP Metadata (XML file) and save this XML file so that you can find and upload it in a subsequent step.

## Step 2: Create a new Enterprise Application for your Azure Active Directory

After logging into your Azure portal go to Azure Active Directory, click on 'Add' and select '**Enterprise Application** ' from the dropdown

![Azure AD portal showing the option to add an Enterprise application.](https://docs-resources.prod.twilio.com/37af11763d17a28ec023e3ad6f2d11ca5935f4d5828af0c00d974391ed97f47b.png)

Select '**Create your own Application** ' on the next Screen.

Enter a name for identifying this new application and select the option 'Integrate any other application you don't find in the gallery (Non-gallery)'.

![Azure AD Gallery interface with options to create and name a new application.](https://docs-resources.prod.twilio.com/f0e7ec49cc818bff597ffe55e343c73fd94b87ba8086464e4ed484d67fb798ae.png)

## Step 3: Configure the Twilio as SP Metadata in the created enterprise application

Once you have created an Enterprise App, the next step is to configure this application to connect with Twilio for SSO. For this click on the '**Set up single sign on** ' link and then select '**SAML** ' as the single sign on method.

After selecting SAML, you will see a screen as shown below. This is where we will configure the Twilio as SP metadata. Click on the '**Upload metadata file** ' button as shown below and then select the XML file you downloaded in Step 1 above and upload it.

![Azure AD SAML-based sign-on page showing SAML signing certificate and setup options for Twilio-StageSSOUAT.](https://docs-resources.prod.twilio.com/65bdbce1bd52043a60f5388ce4e55fdf4b0daa4088ffb888a8d6ecb2c7970c4b.png)

Upon uploading the XML file you will see the values for Basic SAML Configuration fields populated. Hit the save button to save these values

![Azure AD SAML configuration with fields for Identifier and Reply URL.](https://docs-resources.prod.twilio.com/86c386c7ed5405b477208d64058a1cf96dfa85a28cffe6f5f1f905a99dd1aa75.png)

Next, you need to configure the Signing Option and NameID settings.

* For NameID, click edit on 'Attributes & Claims'. On the screen as shown below you'll see the Unique User Identifier(Name ID) claim. Confirm that the **value is set to the user's email address** attribute as per your directory and the format should be EmailAddress.
* It is critical to ensure that the value of the **Name ID claim matches exactly with the email address** that your users will be signing up within Twilio.

![Azure AD NameID configuration with user.mail as unique identifier.](https://docs-resources.prod.twilio.com/b9876a4291f953575f759c0cec32bf9d8a23435d2dd19ed4776a4ebd3c67f7a1.png)

* For the Signing Option, go to the SAML Signing Certificate settings and click Edit. You will see the below page. Here select the option **'Sign SAML response and assertion'**.

![Azure AD SSO configuration showing SAML signing options with 'Sign SAML response and assertion' selected.](https://docs-resources.prod.twilio.com/519c1c3f0ca5f9018fcd797bdca74691eb31279869835eace4195c13ee819dd6.png)

Once the NameID and Signing Option are configured correctly, you are done with the configurations in your IdP and can now proceed to Configure the IdP metadata into Twilio.

## **Step 4: Configure your IdP Metadata into the SSO Profile created in Twilio**

Go to the tab where you have the Twilio Admin Center opened. Confirm that you have configured the Signing Option and NameID settings in your IdP and click on Continue

![Azure SSO profile configuration with Twilio metadata and download XML option.](https://docs-resources.prod.twilio.com/aaf3dbf83a0b0d75e98c4733c8c7d1f85dcf6035b4c75de51b6c049700d68a0b.png)

In the next step, please update the friendly name of the SSO Profile to an appropriate value that you can recognize and select '**Azure ActiveDirectory** ' as the Identity Provider from the dropdown.

![SSO profile configuration with SAML 2.0 method and Azure ActiveDirectory selected as Identity Provider.](https://docs-resources.prod.twilio.com/4ef36bf13a6c38bcadda23ff3a4369681e350b44fe65eda8a739d07332d2e27f.png)

Upon selecting the Identity Provider you will see the IdP metadata fields as shown below.

![Twilio SSO setup with fields for friendly name, identity provider, Azure AD identifier, login URL, and SAML signing certificate.](https://docs-resources.prod.twilio.com/f5043f93250d34c5ee0e71a34f2fb38c06a044ca006e02deed7631628c1bfa72.png)

You will need to copy the values of Azure AD Identifier and Login URL from your Enterprise Application into the Twilio SSO Profile. You will find these values in the Setup Single Sign-On page of your Enterprise Application as shown below

![SSO-AzureAD-Copy IdP Metadata.](https://docs-resources.prod.twilio.com/364860d9e549a4e718bcb3829f0d62f18a306eb2948f336f053648c68da3109a.png)

For the SAML Signing Certificate, you will need to click on the 'Edit' button on the SAML Signing Certificate section. Upon clicking the edit button, you will see a screen as shown below. If you have to use a specific certificate you can import or create a new one. Once you have the appropriate signing certificate configured, click on the three dots at the right of that certificate and download the PEM Certificate file.

![Azure AD SAML signing certificate management with PEM download option highlighted.](https://docs-resources.prod.twilio.com/1520b520cd9f8143e6ea7e36e2108c46902bcf443a8dd0f1e36624a33084129a.png)

Open the downloaded certificate file in any text editor. It should look like the below screenshot. Copy the entire text (including the -----Begin Certificate----- and -----End Certificate----- part as well) and paste it into the Certificate field for the SSO Profile in Twilio Admin Center

![PEM file with certificate text displayed in Twilio Console.](https://docs-resources.prod.twilio.com/e3a0bcbf8a68e4dc788d8690f127bd2e10af681129560088a914c9e38e0737ae.png)

After configuring these 3 values from your Enterprise Application into the SSO Profile, click the 'Continue' button to save the SSO Profile and proceed to the next step to [test the SSO Connection](/docs/iam/single-sign-on/test-the-sso-connection).
