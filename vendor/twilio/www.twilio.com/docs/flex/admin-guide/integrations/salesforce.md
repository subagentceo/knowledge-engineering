# Integrate Flex with Salesforce

With out-of-the-box support for Salesforce Open CTI, you can now power your Salesforce environment with omnichannel communications offered by Flex. Both Salesforce Classic and Lightning Experience integrations are supported, allowing you to use Flex directly within your Salesforce instance.

In this guide, you'll learn how to configure Flex within Salesforce, configure outbound calling, enable SSO (Single Sign-On), and launch your integration.

> \[!NOTE]
>
> * Need to create a new Salesforce organization for your proof of concept? Create a Salesforce developer account at [https://developer.salesforce.com](https://developer.salesforce.com).
> * Looking to integrate other Twilio products with Salesforce? See [Twilio for Salesforce](/docs/salesforce).

## Features

The Flex Salesforce integration embeds the Flex agent user interface directly into the Salesforce application and creates a single source of truth for agents.

![Flex Salesforce integration.](https://docs-resources.prod.twilio.com/6d2c6a7c8e3143b963ed3f2092475d08b477736e4e691fc96eb4992f6f54be1f.png)

As part of the Salesforce integration, the following features are supported within Flex:

* **Native digital engagement:** supported interaction with customers on various communications APIs, such as Voice, Web Chat, SMS, and WhatsApp
* **Personalization:** route any Salesforce Object (case, lead, contact, or other custom object) and blend it with other channels
* **Programmability:** tailored look and feel of the application, possibility to code in adjustments
* **Pre-built native features:** click-to-dial, screen pop with search capabilities, context switching, activity logging, SSO integration
* **Multiple deployment scenarios:** Flex can be embedded inside of Salesforce, or Salesforce can be embedded within Flex

## Limitations

* The Copy Download Link feature doesn't work in Flex Insights when Flex is embedded within Salesforce
* When making an outbound call, ensure the relevant Salesforce record for the phone number is open before beginning the call. Otherwise, activity logs of the outbound call may not be reflected on the correct Salesforce record.

## Configure Flex

1. Open [Twilio Console](https://console.twilio.com/).
2. Go to **Flex** > **Contact center settings** > [**Integrations**](https://console.twilio.com/us1/develop/flex/settings/integrations).
3. On the Salesforce tile, click **Configure**.
4. Under **Status**, toggle the integration plugin on.
5. Under **Configuration**, click **Edit Configuration**, and set up your **Salesforce Integration** for your organization with the following parameters:

| Parameter Name                     | Description                                                                                                                                                                                                                                                                                                                     |
| ---------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **Workflow SID** (Optional)        | If you want to use a different Workflow than your default Workflow, enter the Workflow SID. If not, leave it empty. If you aren't sure what this is, then leave it empty.                                                                                                                                                       |
| **Task Channel SID** (Optional)    | If you want to use a different Task Channel than the default Voice Channel, enter the Task Channel SID here. If not, leave it empty. If you aren't sure what this is, then leave it empty.                                                                                                                                      |
| **Salesforce Base URL** (Required) | Register your Salesforce domains on the [**Embed Flex as an iframe**](https://console.twilio.com/us1/develop/flex/settings/embed-as-iframe) page in the Twilio Console. For more details, see [Securely iframe Flex in your application](/docs/flex/admin-guide/setup/secure-iframe).                                           |
| **SSO**                            | Select this option if you want to deploy the Flex-Salesforce Integration using Single Sign-On (SSO).<br /><br />Always check this option if you are operating in a production environment. <br /><br />Leave this unchecked if you are planning to test the integration using your Twilio Account or Project login credentials. |
| **Log**                            | Decide when you'd like to log a task in Salesforce: when a task starts, is completed, or switched.                                                                                                                                                                                                                              |

6. Click **Apply**.

## Install Twilio Flex CTI

1. Log in to your Salesforce instance.
2. From [Flex Console](https://flex.twilio.com), go to **Admin** > [**Integrations**](https://flex.twilio.com/admin/integrations).
3. On the Salesforce tile, click **Configure**.
4. Under **Set up your Salesforce integration**, click **Download Twilio Flex CTI connector**. The Twilio Flex CTI connector page opens in the Salesforce AppExchange.
5. Click **Get It Now** to install the Flex CTI connector in your Salesforce instance.
6. Select your installation preferences and click **Install**. Once installed, you'll see the managed package show in your **Installed Packages** page in Salesforce.

## Add Flex as a trusted URL

1. In Salesforce, go to **Setup** > **Trusted URLs** and click **New Trusted URL**.
2. Add `https://flex.twilio.com` as a URL. Check all CSP directives.
3. From this page, click the **Session Settings** link and select the following:
   * Under **Referrer URL Protection**, select **Include Referrer-Policy HTTP header**.
   * Under **Content Security Policy (CSP) Directive Rendering**, select **Adopt updated CSP directives**.
   * Under **Browser Feature Permissions**, select **Include Permissions-Policy HTTP header**.

For more details on setup, see Salesforce's [Manage Trusted URLs](https://help.salesforce.com/s/articleView?id=sf.security_trusted_urls_manage.htm\&type=5).

## Configure Twilio Flex CTI

1. In Salesforce, click the App Launcher and search for **Flex CTI**.
2. In **Twilio Flex CTI for Salesforce**, select a configuration option. If you already have a Twilio and Flex account, enter your **AccountSID**, which you can find in [Console](https://www.twilio.com/console).
   **Note** If you enter an incorrect AccountSID here, you will need to [uninstall the package](/docs/flex/admin-guide/integrations/salesforce#uninstall-twilio-flex-cti) then re-install to configure with the correct AccountSID.
   ![Setup for Twilio Flex CTI for Salesforce.](https://docs-resources.prod.twilio.com/d894627b1bb15f92e9b770d5e2fe1566ed6443d810ee6f1d07916918178d7298.png)
3. Click **Get Started**.
4. In the **Setup Wizard**, follow the steps to complete setup. You can choose steps for **Lightning** or **Classic** by selecting the tab at the top of the page.

Once setup is complete, Salesforce users in your Contact Center can see the Flex agent UI in your chosen App in Salesforce.

See the documentation for [Call Flows](/docs/flex/admin-guide/integrations/salesforce/call-flows) to take it for a spin.

## Troubleshooting

### Third-Party cookies

Agents must include third-party cookies in their browser in order for Flex to integrate smoothly with Salesforce.

If this isn't an option and third-party cookies are disabled, you must configure the Flex to use a popup for login in order to successfully log in to the Flex-Salesforce Integration:

* From the [**Single sign-on (SSO)** page](https://console.twilio.com/us1/develop/flex/users-and-access/single-sign-on) in Flex Console, enable **Login using popup** and then click **Save**.\
  When agents access Salesforce, the Flex-Salesforce Integration opens a dedicated popup window to log in through your identity provider. Once agents log in through your identity provider, Flex logs them in.\
  Note that this setting means that the Flex login always appears in a separate popup window, not just for the Flex-Salesforce Integration.

### Outbound call log

Agents must search for the Salesforce record of the relevant phone number before beginning an outbound call. This is to ensure the outbound call will be logged to the correct Salesforce record.

## Uninstall Twilio Flex CTI

To uninstall the package in Salesforce, follow Salesforce's [Uninstall a Managed Package](https://help.salesforce.com/s/articleView?id=sf.distribution_uninstalling_packages.htm\&type=5).

## Next steps

To learn more about customizing your integration and managing interactions with your users:

* Learn how to [manage your Flex-Salesforce call flows](/docs/flex/admin-guide/integrations/salesforce/call-flows)
* [Customize your Flex-Salesforce integration](/docs/flex/admin-guide/integrations/salesforce/customize)
* [Securely embed Flex as an iframe](/docs/flex/admin-guide/setup/secure-iframe)
