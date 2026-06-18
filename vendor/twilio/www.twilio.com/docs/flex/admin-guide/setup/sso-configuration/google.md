# Configure Google Single Sign-On (SSO) with Twilio Flex

Google SSO (single sign-on) allows users to use their existing Google account to authorize third-party applications. This allows users to log in to applications without needing to set up a new account, or create a new set of credentials. In this guide, you will learn how to configure Google SSO with Twilio Flex.

## Prepare your Google App environment

Before we connect Google to your Flex Instance, you have to configure a few steps in the Google Admin Console to ensure your app runs smoothly.

To log in a Flex user, you must pass [three mandatory attributes](/docs/flex/admin-guide/setup/sso-configuration#mandatory-attributes) to Flex in the SAML. Google provides email as an attribute out of the box but doesn't provide the roles or full\_name attributes. You will need to configure these attributes yourself.

> \[!WARNING]
>
> All the information supplied from the Identity Provider to Twilio is stored inside Twilio TaskRouter *Worker Attributes*. Consider local regulations for storing data and only provide data relevant for Flex usage. Learn more about [Twilio's Privacy policy here](/en-us/legal/privacy).

1. Navigate to the [User Schema page](https://admin.google.com/ac/customschema) in your Google Admin Console.
2. Click on **ADD CUSTOM ATTRIBUTE**.
3. Enter "Flex Details" for **Category**.
4. Create the "Roles" and "Full Name" attributes below.

   ![Add custom fields with roles and full name options in Flex Details category.](https://docs-resources.prod.twilio.com/2a63789a38d466d3962a3885f8ee59673a6e862b8d9becf26ed9fe5490dc47bb.png)
5. Click **Add** to save your custom attributes.

Optionally, you can add more attributes to accommodate the [attributes needed by WFO (Workforce Optimization)](/docs/flex/admin-guide/setup/sso-configuration#flex-insights).

## Create a custom SAML app

SAML apps allow you to use Single Sign-On to authenticate once with a single set of credentials. You can then access different secured applications without needing to authenticate with different credentials each time.

1. Navigate to [Google Admin Console](https://admin.google.com) and click on **Apps**.
2. Click **Web and mobile apps**
3. Click on **Add app** > **Add custom SAML app**
4. Enter the **App name**, then click **Continue**.
5. Copy your `SSO URL` and `Entity ID` and save them somewhere - you'll need these later.
6. Download your Certificate.

   ![Google SSO configuration options with metadata download and certificate details.](https://docs-resources.prod.twilio.com/72cdc0304ef8c4413853550d17bb9c2401e4c2ed82c1450edb732ad55213b38b.png)
7. Click **Continue** to proceed over to the Service provider details step.

## Service Provider details

Next, we need to set up the Service Provider Details. Twilio Flex is the Service Provider in this instance.

| **Setting**     | **Value**                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                            |
| --------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| ACS URL         | **[Enhanced SSO configuration](/docs/flex/admin-guide/setup/sso-configuration#enhanced-and-legacy-sso-configuration)**: Copy this value from the **Set up your identity provider** page, which provides the specific value for your account. Your value will look similar to this: `https://login.flex.us1.twilio.com/login/callback?connection=JQxxxx`<br /><br />**[Legacy SSO configuration](/docs/flex/admin-guide/setup/sso-configuration#enhanced-and-legacy-sso-configuration)**: Make sure to replace the Account SID (ACxxxx) with your real Account SID. `https://iam.twilio.com/v1/Accounts/ACxxxx/saml2` |
| Entity ID       | **[Enhanced SSO configuration](/docs/flex/admin-guide/setup/sso-configuration#enhanced-and-legacy-sso-configuration)**: Copy this value from the **Set up your identity provider** page, which provides the specific value for your account. Your value will look similar to this: `urn:flex:JQxxxx`<br /><br />**[Legacy SSO configuration](/docs/flex/admin-guide/setup/sso-configuration#enhanced-and-legacy-sso-configuration)**: Make sure to replace the Account SID (ACxxxx) with your real Account SID. `https://iam.twilio.com/v1/Accounts/ACxxxx/saml2/metadata`                                           |
| Start URL       | `https://flex.twilio.com/<your-runtime-domain>`<br /><br />This Login Link is available on the Twilio Console [SSO configuration page](https://console.twilio.com/us1/develop/flex/users-and-access/single-sign-on).                                                                                                                                                                                                                                                                                                                                                                                                 |
| Signed Response | Checked!                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                             |
| Name ID Format  | EMAIL                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                |
| Name ID         | Basic Information > Primary Email                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                    |

![Service provider details for Google SSO configuration with ACS URL, Entity ID, and Name ID format set to EMAIL.](https://docs-resources.prod.twilio.com/7b4d31ab9d6cff75df7262c4b5159c625af57ca09e0e23195838a1ec443be332.png)

## Attribute mapping

Now we need to add attributes that will be passed from the SAML to Flex. Create the three required [attributes](/docs/flex/admin-guide/setup/sso-configuration#mandatory-attributes) (case sensitive) to pass to Flex and map them to the appropriate fields.

![Google SSO attribute mapping for email, full name, and roles with optional group membership.](https://docs-resources.prod.twilio.com/b96f4c31d7218fdeb8562e500e785d8b4a7dc03df18d19f2ea638d7622e7bb81.png)

**Note** You need to ensure that you configured the **Full Name** and **Roles** attribute from [Prepare your Google App environment](/docs/flex/admin-guide/setup/sso-configuration/google#prepare-your-google-app-environment). Otherwise, these attributes will not appear under the Google Directory attributes.

## Add the mapped roles to your Google Workspace Users

1. Navigate to [Google Admin Console](https://admin.google.com/) and click on **Users**.
2. Select a user and click on their **User information** section
3. Scroll to **Flex Details**, the category name you set for the custom attributes during Step 4 in [Prepare your Google App environment](/docs/flex/admin-guide/setup/sso-configuration/google#prepare-your-google-app-environment).
4. Click on the edit icon and add your roles. The current options are `agent`, `admin`, and `supervisor`.

## Complete the setup

Now that you've configured your app, you must:

1. Verify your domain if you haven't already. See [Verify domain ownership](https://support.google.com/a/topic/9196?hl=en\&ref_topic=3540977).
2. Enable your SAML app. See the **Turn on your SAML app** section on [Set up your own custom SAML application.](https://support.google.com/a/answer/6087519?hl=en)

## Configure Flex with your Google SSO settings

Grab the URLs you copied from Step 5 in [Create a custom SAML app](/docs/flex/admin-guide/setup/sso-configuration/google#create-a-custom-saml-app), and configure SSO in Flex Console on the [**Single sign-on (SSO)** page](https://console.twilio.com/us1/develop/flex/users-and-access/single-sign-on). Be sure that the Twilio SSO URL field matches the value you provided in Google for ACS URL.

| **Setting**              | **Value**                                                                                                                                                                                                               |
| ------------------------ | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Friendly Name            | Anything you want                                                                                                                                                                                                       |
| x.509 Certificate        | Open the .pem file you [downloaded above](#create-a-custom-saml-app) in your favorite text editor and copy/paste the *entire* contents of the file including all dashes.                                                |
| Identity Provider Issuer | Google's Entity ID ([see above](#create-a-custom-saml-app))                                                                                                                                                             |
| Single Sign-On URL       | Google's SSO URL ([see above](#create-a-custom-saml-app))                                                                                                                                                               |
| Default Redirect URL     | `https://flex.twilio.com/<your runtime domain>`<br /><br />This Login Link is available at the top of the active [SSO configuration page](https://console.twilio.com/us1/develop/flex/users-and-access/single-sign-on). |
| Trusted domains          | Add any trusted domains that can be used for login requests. Your **Default Redirect URL** is automatically included.                                                                                                   |
| Login using popup        | Optional. When selected, the login page for your identity provider appears in a dedicated popup window. If you are loading Flex within the iframe of another application, you may need to select this option.           |

## Additional SSO configuration

Our [Configuring SSO](/docs/flex/admin-guide/setup/sso-configuration) page has additional details on how to initiate login from your Identity Provider, how to login to a self-hosted domain, and details on attributes that can be defined for each identity.

## Testing Google SSO

Navigate to the Google SSO IdP URL ([see above](#create-a-custom-saml-app)) in incognito mode, login, and you should be redirected to Flex.

Congratulations! You now know how to configure Google SSO with Twilio Flex. You can now authenticate yourself into Twilio Flex using your Google account.
