# Voice JavaScript SDK quickstart

This quickstart shows you how to create a web application that makes a phone call from a web browser. It uses the Voice JavaScript SDK and [Twilio Functions](/docs/serverless/functions-assets/functions); our serverless hosting platform.

## Install the Twilio CLI

The Twilio CLI tool lets you manage your Twilio resources from your command line utility.

## macOS

1. [Install Homebrew](https://brew.sh/).
2. Install the Twilio CLI by running this command:
   ```bash
   brew tap twilio/brew && brew install twilio
   ```

## Windows

1. Download the [Windows installation file.](https://runtime-cli-redirect-6533.twil.io/redirect-to-github?ext=.exe)
2. Run the downloaded file and follow the instructions.

## Linux

[Install the Twilio CLI](/docs/twilio-cli/getting-started/install#linux)

## Install the Twilio CLI serverless plugin

To create and deploy Twilio Functions from the command line, install the Twilio CLI serverless plugin.

```bash
twilio plugins:install @twilio-labs/plugin-serverless
```

## Create and deploy your app

1. To create your app, run the following Twilio CLI command.
   ```bash
   twilio serverless:init quickstart-voice-javascript-sdk --template="voice-javascript-sdk"
   ```
2. Change directories with the following command:
   ```bash
   cd quickstart-voice-javascript-sdk
   ```
3. Open the `.env` file in a code editor. The file includes this line: `ADMIN_PASSWORD=default`.
4. Replace `default` with a unique password that's hard to guess.
5. Save the `.env` file.
6. Deploy your application with the following Twilio CLI command.
   ```bash
   twilio serverless:deploy
   ```
   This command creates a [Service][]. Services contain your [Functions][], [Assets][], and Environments within [Twilio Serverless][].
7. When the deployment completes, the terminal displays a response with the following.
   ```text
   Deployment Details
   Domain: quickstart-voice-javascript-sdk-6210-dev.twil.io
   ```
   Make a note of your deployment domain (for example, `quickstart-voice-javascript-sdk-6210-dev.twil.io`).

## Initialize your application

1. Open a web browser to `https://{DEPLOYMENT_DOMAIN}/admin/index.html`.\
   Replace `{DEPLOYMENT_DOMAIN}` with your deployment domain.
2. Enter the password that you added to the `.env` file in the **Password** box.
3. Click **Let me in**.
4. Click **Initialize your application for your environment**.

## Make a call

1. Under **Environmental Checks**, click the **running application** link.
2. Click **Start up the Device** and wait for the **Call** button to appear.
3. Under **Make a Call**, enter your mobile phone number in the box.
4. Click **Call**.
5. If your web browser prompts you, allow the website to use your microphone.
6. Your phone will ring with a call from your Twilio number.

## Next steps

Get a deeper understanding of the Voice JavaScript SDK by taking the following steps:

* Learn about how your app implements the Voice JavaScript SDK by reading the code in the `assets/quickstart.js` file.
* See our [Reference Components](/docs/voice/sdks/javascript/reference-components) for the Voice JavaScript SDK.
* Learn about [best practices](/docs/voice/sdks/javascript/best-practices) to follow while building with the Voice JavaScript SDK.

[Service]: /docs/serverless/functions-assets/functions/create-service

[Functions]: /docs/serverless/functions-assets/functions

[Assets]: /docs/serverless/functions-assets/assets

[Twilio Serverless]: /docs/serverless/functions-assets
