# Getting started

To get started with the Flex SDK, you'll need to use a Flex account or add Flex to your Twilio account. If you're new to Flex, see the [onboarding guide](https://www.twilio.com/docs/flex/onboarding-guide) to get started or learn more about [Flex pricing](https://www.twilio.com/docs/flex/admin-guide/what-is-twilio-flex#flex-pricing).

## Develop a Flex SDK application

Use the following steps to develop a Flex SDK application. We'll use the vite framework here, but the Flex SDK also supports TypeScript and JavaScript.

1. Create a directory for the new Flex SDK application.
2. If you haven't already installed vite, run `npm install -g vite`.
3. Run `npm create vite@latest`.
4. Follow the wizard, and choose a **vanilla** project with **TypeScript** as the programming language.
5. Navigate into the newly created project folder and install the Flex SDK.
6. Run `npm i @twilio/flex-sdk`.
7. Run `vite` with `npm run dev`. This runs the vite application with the Flex SDK installed.

### Initializing the SDK client

In order to use Flex in a code file, include the Flex SDK and initialize the client. While [we recommend using SSO](/docs/flex/developer/flex-sdk/authentication#-option-1-use-sso-to-authenticate-\(recommended\)), you can also use an auth token like the example below:

```javascript
import { createClient } from "@twilio/flex-sdk";

async function createFlexClient(tokenForWorker: string) {
    const client = await createClient(tokenForWorker, {
        logger: { level: "debug" }});
    return client;
}
```

## Embed the Flex SDK into an existing application

To embed the Flex SDK into an existing application, navigate to the project directory and execute the following command:

`npm i @twilio/flex-sdk`

This adds the Flex SDK to the project, after which you can import and initialize clients.
