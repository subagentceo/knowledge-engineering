# Integrate Flex with Glance Cobrowse

Glance Cobrowse enables agents to instantly join customers in viewing your app or website. Agents can guide customer navigation, answer questions, and assist with completing transactions. You can launch a Glance Cobrowse session from the Twilio Flex platform with the click of a button — no need for the customer to download or install a screen sharing app.

![Twilio Flex interface with chat about home equity rates and Global Home Lending website.](https://docs-resources.prod.twilio.com/82791dc252ce0f1292fe82fe096fcc56ce7b852f1cb778ac85a45061a4c47a45.jpg)

Glance lets agents know when customers are present on your website and makes it easy to launch a Cobrowse session with a single click. You can also enable video to personalize the Glance Cobrowse experience.

## Prerequisites

To integrate the Glance Cobrowse Component with Flex, you need the following:

* Twilio Account and Flex Project
* Glance Account that has the Flex domain added to the allowlist.\
  To add the Flex domain to the allowlist:

  * Log in to your [Glance Account](https://www.glance.net/login/default.aspx).
  * Go to **Settings** > **Cobrowse Settings** > **CRM and Chat Integration**.
  * Enter `flex.twilio.com` to the domain and select **Add**.
* Site that is configured with the [Glance Cobrowse script tag](https://help.glance.net/glance-cobrowse/getting-started/add_tag/).\
  Ensure that you:

  * Set `data-presence`  to `api`.
  * Set `data-cookiedomain` to the URL for your website domain.

Example of the Glance Cobrowse script tag:

```javascript
<script id="glance-cobrowse" type="text/javascript"
  src="https://www.glancecdn.net/cobrowse/CobrowseJS.ashx?group={groupid}&site={production|staging}"
  data-groupid="{groupid}"
  data-site="{production|staging}"
  data-inputevents='{...}'
  data-termsurl="{terms and conditions url}"
  data-cookiedomain="{session cookie domain}"
  data-cookietype="{normal|ls|dual|secure}"
  charset="UTF-8"
  data-presence="api">
</script>
```

## Integration overview

To integrate the Glance Cobrowse Component with Flex, you must:

1. Set up authentication.
2. Install the Glance Cobrowse Component from NPM.
3. Add the Glance Cobrowse Component to the Flex interface.
4. Install Flex Webchat and add Glance.

## Set up authentication

In order to connect to Glance from Flex, you need to set up authentication. Glance uses the same user ID from the identity provider to call a [Twilio Function](/docs/serverless/functions-assets/functions) to authenticate into Glance.

Before setting up authentication, ensure that:

* You have configured SSO with an identity provider (such as [Okta](/docs/flex/admin-guide/setup/sso-configuration/okta)) for Flex.
* You have a Glance Admin account.
* If you are setting up Glance Cobrowse for multiple agents, each agent has a Glance Account.
* You have set the Partner User ID (PUID) field in Glance to match the user ID in your identity provider. Refer to Glance's [Manage Users](https://help.glance.cx/account-management/manage_users/) page for instructions to set your user ID.

To set up authentication:

1. From the Twilio Console > **Functions** > **Services**, select **Create Service.**
2. Enter a **Service Name** then select **Next**.\
   For example: `yourcompanyname-glance`. **Note:** Remember this Service Name to use it later when adding the Glance Cobrowse Component to Flex.
3. Select **Add+** > **Add Function**.\
   A new field appears.
4. Remove the default name `/path_1` and input `getloginkey`. Click enter to generate the function.
5. Click the drop-down next to **Protected** to set the visibility to **Public**.
6. In the text editor on the right, paste the code below then select **Save**.

   ```javascript
   const TokenValidator = require('twilio-flex-token-validator').functionValidator;

   exports.handler = TokenValidator(function(context, event, callback) {
      const response = new Twilio.Response();

      response.appendHeader('Access-Control-Allow-Origin', '*');
      response.appendHeader('Access-Control-Allow-Methods', 'GET', 'POST');
      response.appendHeader('Access-Control-Allow-Headers', 'Content-Type');
      response.appendHeader('Content-Type', 'application/json');

      try {
          const version = 1;
          const expires = (Math.round((new Date()).valueOf() / 1000)) + parseInt(context.GLANCE_EXPIRATION, 10);
          const keystring = context.GLANCE_GROUP_ID + event.partneruserid + version + expires;
          const CryptoJS = require('crypto-js');
          const hmac = CryptoJS.HmacSHA256(keystring, context.GLANCE_API_KEY);
          const hmacb64 = hmac.toString(CryptoJS.enc.Base64)
          const loginkey = "$" + version + "$" + expires + "$" + hmacb64.substr(0, 43).replace(/\+/g, '-').replace(/\//g, '_');

          response.setBody({
              'loginKey': loginkey,
              'groupId': context.GLANCE_GROUP_ID,
              'expiration': expires,
              'apiKey': context.GLANCE_API_KEY
          });

          response.setStatusCode(200);
          callback(null, response);
      } catch(error) {
          response.setStatusCode(404);
          callback(null, response);
      }

   });
   ```
7. In **Settings** > **Environment Variables**, add the following Environment Variables:

   * Add `GLANCE_API_KEY` and set the value to your Glance API Key. To find your Glance API Key, log in to your Glance account. Go to **Settings** > **API Key**.
   * Add `GLANCE_EXPIRATION` and set the value to a length of time (in seconds) when you want the session to expire. We recommend `3600`
   * Add `GLANCE_GROUP_ID` and set the value to the Glance group ID for your company. **Note:** The Glance group ID is a unique ID assigned to your company by Glance. You can find this in the Glance portal in the top-right corner of every page.
8. In **Settings** > **Dependencies**, add the following dependencies without a version number:

   * `twilio-flex-token-validator`
   * `crypto-js`
9. Select **Deploy All**.

## Install the Glance Cobrowse Component from NPM

You must add the Glance Cobrowse Component to either an existing or a new [Flex Plugin](/docs/flex/developer/ui-and-plugins). In your terminal, run:

```bash
npm install @glance-networks/agent-plugin
```

If you're using Yarn, run the following instead:

```bash
yarn add @glance-networks/agent-plugin
```

For more information, see the [ReadMe](https://www.npmjs.com/package/@glance-networks/agent-plugin).

## Add the Glance Cobrowse Component to Flex

After installing the Glance Cobrowse Component, choose where you want the button to display inside Flex. Learn how to customize [Flex UI Components](/docs/flex/developer/ui/components#content-property-and-add--replace--remove-methods).

Import the component inside your Flex project. In *glanceplugin.js* (**note:** the name of the plugin is autocreated when you make the file) or *.jtx* file, add the following to the first line:

```javascript
import {Glance} from @glance-networks/agent-plugin
```

Example of the Glance Cobrowse Component inside the task canvas header:

```javascript
flex.TaskCanvasHeader.Content.add(
   <Glance
          key={"your-key-name"}
          groupid={"your-group-id"}
          puid={"your-puid"}
          openlocation={"tab"}
          presence={true}
          glancebaseurl={"production"}
          visitorid={"the-task-sid"}
          debugmode={false}
          gicon={true}
          authmethod={"LOGINKEY"}
          authurl={"auth-url"}
          authheaders={{ 'Content-Type': 'application/x-www-form-urlencoded' }}
          authbody={authBodyParams}
          uiversion={2}
          customopenwindow={false}
   />, {options}
);
```

Example of the Glance Component inside the CRM Container:

**Note**: If you are opening sessions inside the iframe, you must use the CRM Container. You should not use this option if you need this panel for other content, as it will fill the contents of the entire panel with the Glance Cobrowse session.

```javascript
flex.CRMContainer.Content.replace(
   <Glance
          key={"your-key-name"}
          groupid={"your-group-id"}
          puid={"your-puid"}
          openlocation={"tab"}
          presence={true}
          glancebaseurl={"production"}
          visitorid={"the-task-sid"}
          debugmode={false}
          gicon={true}
          authmethod={"LOGINKEY"}
          authurl={"auth-url"}
          authheaders={{ 'Content-Type': 'application/x-www-form-urlencoded' }}
          authbody={authBodyParams}
          uiversion={2}
          customopenwindow={false}
   />, {options}
);
```

**Important**: In the cases above, [AgentDesktopView.Panel2](/docs/flex/developer/ui/components#agentdesktopviewpanel2) is open or closed depending on how you set the default properties.

The following table describes the properties inside the component:

| Property       | Type        | Definition                                                                                                                                                                                                                                                                                                       |
| -------------- | ----------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `authbody`     | function    | Optional. If using `authmethod=loginkey`, you can optionally pass data to your function with the POST request body.                                                                                                                                                                                              |
| `authheaders`  | object      | Optional. If using `authmethod=loginkey`, you can further customize your loginkey endpoint by passing headers to your function (for example, an Authorization header).                                                                                                                                           |
| `authmethod`   | enumeration | Optional. Valid values are `loginkey` (default) and `samlloginkey`. To use this, you must have [set up SAML with Glance](https://help.glance.net/integrations/saml).                                                                                                                                             |
| `authurl`      | string      | Required. Set the value to the URL for your login key service.                                                                                                                                                                                                                                                   |
| `custominvoke` | object      | Optional. A presence agent can invoke JavaScript functions defined on the visitor's web page by providing an object that defines the following parameters: `func` name of the function, `args` function arguments. See the [ReadMe](https://www.npmjs.com/package/@glance-networks/agent-plugin) for an example. |
| `debugmode`    | boolean     | Optional. `true` turns on console logs to assist in debugging. `false` (default) turns off console logs.                                                                                                                                                                                                         |
| `gicon`        |             | Required. Set this property to `true` if you want to show the Glance logo next to the **Join** button. If you don't set this property, or if you set it to `false`, the logo doesn't appear.                                                                                                                     |

## Install Flex Webchat and Add Glance

[Flex Webchat](/docs/flex/developer/messaging/webchat/) provides an embeddable chat widget for integrating live chat into your website. To learn more about setting up Webchat and Glance, see [Twilio Flex Webchat](https://developer.glance.cx/integrations/twilio_webchat/) in the Glance developer documentation.

### Modify the position of the Glance Cobrowse button

You may want to move the location of the Glance Cobrowse button on your website so that it does not interfere with Flex Webchat.

1. Log in to your [**Glance Account**](https://www.glance.net/login/default.aspx).
2. Go to **Settings** > **Button Customization** and add the following CSS under the **Custom CSS section**:

   ```css
   #glance_cobrowse_btn{
      left: 20px !important;
      right: auto !important;
   }
   ```

## What's next?

Learn more about Glance's other customer engagement features, like Remote Assist and Video, on their [Features page](https://help.glance.cx/glance-cobrowse/features/).
