# Securely embed Flex as an iframe

> \[!NOTE]
>
> Starting **March 3rd, 2021**, all **new Flex applications** are required to register their valid URLs under Twilio Flex's Allowed URLs list in order to embed Flex as an iframe.
>
> Starting **June 29th, 2021**, all Flex applications created before March 3rd, 2021 are required to register their valid URLs under Twilio Flex's Allowed URLs list in order to embed Flex as an iframe.

We are updating our [Content Security Policy](https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/Content-Security-Policy) (CSP) to be restricted to Twilio registered URLs. This also applies to [Salesforce](/docs/flex/admin-guide/integrations/salesforce) and [Zendesk](/docs/flex/admin-guide/integrations/zendesk) integrations.

Our security policy helps guard against [cross-site scripting (XSS)](https://developer.mozilla.org/en-US/docs/Glossary/Cross-site_scripting) and other content injection attacks, such as [click-jacking](https://developer.mozilla.org/en-US/docs/Web/Security/Types_of_attacks#click-jacking). Instead of always trusting what a server delivers, Twilio's policy lets you add a list of sources of trusted content. Your allowed URL(s) are added to a CSP header as a [valid frame-ancestor](https://www.w3.org/TR/CSP2/), along with a `report-uri` directive on authenticated Flex requests. This tells your browser to report an error when unregistered URLs are attempting to iframe `flex.twilio.com`.

## Embed Flex as an iframe

These instructions only apply to our hosted `flex.twilio.com` platform.

You can register your domains by accessing the [**Embed Flex as an iframe** page](https://console.twilio.com/us1/develop/flex/settings/embed-as-iframe) of your application on Twilio Console.

If you need to add more URL(s) to your Allowed URLs list, review the [URL Registration Rules](/docs/flex/admin-guide/setup/secure-iframe#url-registration-rules). To test the setting, click **Save**, and refresh your external application.

![Embed Flex as an iframe with allowed URL input and save options.](https://docs-resources.prod.twilio.com/bc7fc28c439a6e561836870e1464321887f858172cfc6daba6f1382024fcbb52.png)

If you registered the external URL correctly, you should be able to log into your Flex application. Unauthenticated requests redirect to the Flex login page.

> \[!WARNING]
>
> If you run into issues with embedding Flex as an iframe, be sure to add your Salesforce lightning URL in the Twilio Console Allowed URLs on the **Embed Flex as an iframe** page (for example: `https://<SFDCdomain>.lightning.force.com`) and turn on third-party cookies in your browser.

> \[!NOTE]
>
> Flex applications created before **March 10th, 2021** automatically populate the allowed URLs list based on your application activity. Review and confirm the allowed URLs are correct.

### URL Registration Rules

When adding your allowed URLs list, keep the following rules in mind:

| `http://contactcenter.example.com`<br /><br />`https://contactcenter.example.com`<br /><br />`http://localhost:8000` | Full URLs are required, without any trailing slashes. For local development, register `localhost:<port>` prefixed by `http` or `https` depending on your configuration. |
| -------------------------------------------------------------------------------------------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `*.example.com`                                                                                                      | Wildcards aren't supported                                                                                                                                              |
| `https://example.com/supportpage`                                                                                    | URL paths aren't supported                                                                                                                                              |
