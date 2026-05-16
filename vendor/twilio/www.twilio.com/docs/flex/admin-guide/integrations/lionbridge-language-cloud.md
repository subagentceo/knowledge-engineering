# Integrate Flex with Lionbridge Language Cloud

Lionbridge Language Cloud is a real-time language translation solution which enables your agents to send SMS, Chat or WhatsApp messages in their native language, and have consumers read them and send return messages in their native language. With Lionbridge for Flex, agents and consumers can always understand and communicate with one another, regardless of the languages they speak.

## Overview

Using a database of over 110 languages, Lionbridge Language Cloud automatically detects customer's language and translates it to the agent's language based on the agent's profile in Flex.

Lionbridge's patented language consistency features allow control over brand, company, product and industry-related language. Potentially offensive language can be detected and excluded from translation. Lionbridge Language Cloud is also optimized for chat and customer support use cases.

## Features

* Customer-Controlled, On-Brand Translations. Incorporate all key company, brand, product and industry terms into translations to ensure effective, consistent, on-brand communications with foreign-language-speaking consumers, regardless of the language they speak.
* Privacy and security certifications (ISO 27001 and 27701, UK Cyber Essentials Plus, Tisax, Microsoft SSPA)
* Translated content is not stored
* Sensitive information - e.g., SS #'s, phone numbers, emails - identified, tokenized and not translated
* Redundant machine translation ("MT") systems to ensure "always on" real-time translation capability

## Prerequisites

In order to use the solution, first retrieve your **ACCOUNT SID** and **AUTH TOKEN** from the landing page of your Flex project in the [Twilio Console](https://www.twilio.com/console).

## Deploy the plugin

Create a plugin to store the Lionbridge integration:

```bash
curl -X POST https://flex-api.twilio.com/v1/PluginService/Plugins \
--data-urlencode "FriendlyName=Lionbridge Language Cloud" \
--data-urlencode "Description=Real-time language translation provided by Lionbridge" \
--data-urlencode "UniqueName=lionbridge" \
-u $TWILIO_ACCOUNT_SID:$TWILIO_AUTH_TOKEN
```

Using the PluginSid (FPxx) provided in the response, add a Plugin Version that links to the plugin source:

```bash
curl -X POST https://flex-api.twilio.com/v1/PluginService/Plugins/FPXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX/Versions \
--data-urlencode "Private=True" \
--data-urlencode "Version=1.0.0" \
--data-urlencode "PluginUrl=https://developers.lionbridge.com/geofluent/plugin/plugin-geofluent.js" \
-u $TWILIO_ACCOUNT_SID:$TWILIO_AUTH_TOKEN
```

Next, use the [Flex Plugins CLI](/docs/flex/developer/plugins/cli) to deploy the Lionbridge plugin alongside any other plugins you have active in your Flex application:

```bash
twilio flex:plugins:release --plugin lionbridge@1.0.0 --name "Lionbridge" --description "Adding Lionbridge integration"
```

### Provide access credentials to the plugin

First, create a service to host your access credentials. You can do this from the Twilio Console in the [Functions product](https://www.twilio.com/console/functions/overview). You can add the following function and environment variables to an existing Service if you have already created one for Flex.

![Create Service button highlighted in Twilio Functions overview page.](https://docs-resources.prod.twilio.com/e3dbe13feafe7d0a992483ee640fcefea73d87f36d3dcd89f2503f202ecb0c1a.png)

Name your service so that you'll be able to identify it later. This name will be used within the URL of the function you create.

![Service naming form with input 'lionbridge-flex' and URL preview.](https://docs-resources.prod.twilio.com/95f86889aae72933434a51a24b1377f02cddc72fbe4a49951b935a65024bb2a8.png)

Add Environment Variables for `gfAccountKey`, `gfAccountSecret`, and `gfApiUrl`. These values will be provided based on your Lionbridge account.

![Interface for adding and managing environment variables with keys and values listed.](https://docs-resources.prod.twilio.com/86a783ffef2bb44a7be4bd7de33929daf016c41f5030ce14bbd769e38c7f70b4.png)

Next, add a Dependency for the `twilio-flex-token-validator` library and set the version as **latest**.

![Dependencies tab showing Node v12 and twilio-flex-token-validator module with latest version.](https://docs-resources.prod.twilio.com/5fba5e3b9285f2938d903b967968548aafb039e831edfb92a1e3e160aab5fa74.png)

Last, add a function that will be used to access and return your environment variables. You should name your function "/get-credentials", convert the function to public access, and use the following function code. Although you are switching the function to public access, you'll be authenticating access using your Flex login credentials.

```bash
const TokenValidator = require('twilio-flex-token-validator').functionValidator;

exports.handler = TokenValidator(function(context, event, callback) {
 const accountKey = context.gfAccountKey;
 const accountSecret = context.gfAccountSecret;
 const apiUrl = context.gfApiUrl;

 // Create a custom Twilio Response
 // Set the CORS headers to allow Flex to make an HTTP request to the Twilio Function
 const response = new Twilio.Response();
 response.appendHeader('Access-Control-Allow-Origin', '*');
 response.appendHeader('Access-Control-Allow-Methods', 'OPTIONS POST GET');
 response.appendHeader('Access-Control-Allow-Headers', 'Content-Type');

 const data = {
   gfAccountKey: accountKey,
   gfAccountSecret: accountSecret,
   gfApiUrl: apiUrl
 };
 response.appendHeader('Content-Type', 'application/json');
 response.setBody(data);

 return callback(null, response)
});
```

![Twilio function editor showing code for token validation with save and cancel buttons highlighted.](https://docs-resources.prod.twilio.com/f43ef44a70382e3be2370c7201c5f764b2c1185781e9c473afc1efac80f8218f.png)

Save your function and **Deploy All** to publish everything to your Twilio account.

Now that you've set up your access function, the last step is to store a configuration variable that will let the Lionbridge plugin know where to find your access credentials. To execute the following command, you will need to have [jq](https://stedolan.github.io/jq/) installed on your machine. In this command, make sure to replace each of the following parameters with your own account details:

* **ACxxx** - your Twilio AccountSid
* **auth\_token** - your Twilio auth token
* **ACxxx** - your Twilio AccountSid (again)
* **\<your url>** - the full URL of the function you deployed, for example: `https://lionbridge-flex-0000.twil.io/get-credentials`
* **ACxxx** - your Twilio AccountSid (again)
* **auth\_token** - your Twilio auth token (again)

```bash
curl -s 'https://flex-api.twilio.com/v1/Configuration' -u ACxxx:auth_token | jq -r -c '{ attributes: .attributes } * { "account_sid": "ACxxx", "attributes": { "lionbridge": {"credentials": "<your url>"} }}' | curl -s -X POST 'https://flex-api.twilio.com/v1/Configuration' -u ACxxx:auth_token -H 'Content-Type: application/json' -d @-
```

### Set up Language Pairs for an Account

1. In the Flex Admin interface, go to the **Assignment** > **Skills** section.

   ![Twilio Flex admin view highlighting Assignment Skills section for managing contact center skills.](https://docs-resources.prod.twilio.com/0614be25b2e79796d7122391435664c09a25892999a2ebbec79626813d57cb72.png)
2. Enter the language pair in the **NAME OF SKILL** field in a *Language*\*language code format (for example, *language\*fr-fr* for French.)
3. Click **ADD NEW SKILL** to save the skill.

   ![Form to add a new skill with language options and level settings.](https://docs-resources.prod.twilio.com/92552329add5a6e6ca6864daf863db6a08de0c33b7fcae162cf80792a693d67c.png)

### Assign a Language Skill to an Agent

Once the language pair is added in the Skills section, Flex Admin must assign a language skill to each agent, as translations will not work without skill activation.

> \[!NOTE]
>
> It is recommended to assign only one language skill to an agent. All the incoming messages to the agent will be translated to the selected language.

1. In Teams view, click on any agent to open their **PROFILE** pane.

   ![Twilio Flex dashboard showing an incoming chat request from a customer with accept and decline options.](https://docs-resources.prod.twilio.com/ea7bed105206b0276063fb5a85c63a730df558dee9896397d3c14a3a3914c5b3.png)
2. In **PROFILE** pane:

   1. Select a skill from the **Add skill** drop-down list, then click plus icon to add selected skill to the agent.
   2. If an agent is an English speaker, enable the toggle **language\*en-us**. This language code will then be disabled from the **Add skill** drop-down.
3. Click **SAVE** to save agent's profile, or **RESET** to clear the selections.

   ![Profile settings showing agent status offline and language skills selection.](https://docs-resources.prod.twilio.com/af8d2f5610c430127d4ffa668df773c32ee553ee33cf364bdfe95aaca61b2651.png)

### Verify Plugin Installation

To test if the plugin was properly enabled, go to **Plugins** > **Manage** window from the Flex Admin dashboard. The Lionbridge Language Cloud plugin should have an "Enabled" status.

![Twilio Flex admin dashboard showing plugin management options.](https://docs-resources.prod.twilio.com/37c86dc6d76afb0bb27af8732ab34c6ab27a1fe8ed54ee467bde90565e1fc4f3.png)

![Lionbridge Language Cloud plugin enabled with version 0.0.2.](https://docs-resources.prod.twilio.com/01ed57da9a4c1372f1ecf957edab424c18131b8576a9aa2504f0bef9c3206d74.png)

Additionally, you should be able to see a "Translations Powered by Lionbridge" banner at the bottom of an agent chat window (see below).

### Test the Plugin

Lionbridge plugin will allow automatic translations for WebChat, SMS and WhatsApp channels.

Before initiating a translation, ensure that:

* Lionbridge plugin is enabled
* Language pairs are set up for the agent account
* Agent is assigned a language skill
* Agent activity status is Available

To test the translation, follow these steps:

1. Accept an incoming message request in Flex by clicking the green tick.

   ![Incoming call request.](https://docs-resources.prod.twilio.com/df4fe21e625e4de1cb7410839ed08a8e650112ce809e7dd9020a2468499c74c7.png)
2. If the message is sent in a language other than the agent's language, the Lionbridge plugin automatically detects customer's language and translates it into the agent's language.
3. When the agent first responds to the customer, the message is translated into the customer's language and is displayed in Flex along with an attribution message that contains the MT provider name. The agent always sees both the source language and the translated message in Flex.\
   The customer receives the first translated message in their preferred language, along with the MT provider name. The customer only sees the messages in their preferred language.

   ![Agent chat interface showing translated conversation with customer about order status and tracking.](https://docs-resources.prod.twilio.com/c5a11ccdeca4bfcc6ba45a9c0c3499f61704835d38b5df515c3eddce38c44f0e.png)

   ![Chat with customer about order status and tracking information.](https://docs-resources.prod.twilio.com/8700078d6d38467795961ce7e382baf112d3766c377a85bf82cbfd1a834833bd.png)
4. To end the interaction with the customer, the agent can click **END CHAT** to end the chat and **COMPLETE** to wrap up the interaction.

## Getting started and support contact

To learn more about the supported languages and how to get started, or to confirm the details of your Lionbridge account contact Lionbridge Sales at [GeoFluent.Support@lionbridge.com](mailto:GeoFluent.Support@lionbridge.com)
