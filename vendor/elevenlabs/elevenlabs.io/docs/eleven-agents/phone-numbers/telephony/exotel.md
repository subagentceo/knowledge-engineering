> This is a page from the ElevenLabs documentation. For a complete page index, fetch https://elevenlabs.io/docs/llms.txt. For the full documentation in a single file, fetch https://elevenlabs.io/docs/llms-full.txt.

# Exotel integration

## Overview

This guide explains how to connect your Exotel phone numbers directly to ElevenAgents. This integration allows you to use your existing Exotel numbers and infrastructure while leveraging ElevenLabs' advanced voice AI capabilities, for both inbound and outbound calls.

## How the integration works

The Exotel integration uses two Exotel surfaces:

1. **Voicebot applet (inbound + outbound media)**: An ExoML applet on Exotel that opens a WebSocket to ElevenLabs and streams the call's audio in both directions.
2. **Connect API (outbound dialing)**: For outbound calls, ElevenLabs calls Exotel's `Calls/connect.json` endpoint using your API Key and API Token. Exotel dials the destination and, when the leg is answered, routes the audio through the same Voicebot applet to ElevenLabs.

For **inbound** calls, Exotel routes incoming calls to the Voicebot applet you assign to the phone number, which opens the WebSocket to ElevenLabs.

For **outbound** calls, ElevenLabs initiates the call via the Connect API and Exotel bridges the call back through the Voicebot applet.

## Requirements

Before setting up the Exotel integration, ensure you have:

1. An active [Exotel account](https://exotel.com/) with at least one provisioned phone number.
2. Administrator access to the Exotel dashboard at [my.exotel.com](https://my.exotel.com) (Singapore) or [my.exotel.in](https://my.exotel.in) (Mumbai).
3. An ElevenLabs account and an [agent](/docs/eleven-agents/quickstart) you want to attach the phone number to.

Exotel is currently supported on the **Singapore** (`api.exotel.com`) and **Mumbai**
(`api.in.exotel.com`) clusters. Pick the cluster your Exotel account was provisioned in. Using the
wrong region will cause authentication failures.

## Enabling Voicebot on your Exotel account

Before anything else, contact **Exotel support** and ask them to:

1. **Enable the Voicebot applet** on your account. It is gated by default and won't appear in the App Bazaar until your account has been provisioned for it.
2. **Provision the number of channels (concurrent calls)** you need. This is the cap on simultaneous Voicebot calls Exotel will let your account run. Size it for your expected peak traffic.

This step usually takes 1 to 2 business days. Start it before you begin the rest of the setup.

## ElevenLabs WebSocket endpoint

You will configure your Exotel Voicebot applet to stream audio to the following WebSocket URL.

| Environment                | WebSocket URL                                                        |
| -------------------------- | -------------------------------------------------------------------- |
| Default (US/International) | `wss://api.elevenlabs.io/v1/convai/conversation/exotel`              |
| EU Residency               | `wss://api.eu.residency.elevenlabs.io/v1/convai/conversation/exotel` |
| India Residency            | `wss://api.in.residency.elevenlabs.io/v1/convai/conversation/exotel` |

If your ElevenLabs account is on an isolated residency environment (EU or India), you must use the
corresponding residency URL. Learn more about [data
residency](/docs/overview/administration/data-residency).

## Setup on Exotel

In the Exotel dashboard, open the left-hand **Monitor** menu and click **Developer**. This opens the API credentials page where you can read the Account SID, API Key and API Token.

![Exotel sidebar: Developer](https://files.buildwithfern.com/https://elevenlabs.docs.buildwithfern.com/docs/ebe936f8cd0d1773a88bb4922a7642cf8c2f844f39eb4ee9ee04eab50ecfa6c4/assets/images/conversational-ai/exotel-developer-sidebar.png)

You will need four values:

* **Account SID**: Your Exotel account SID.
* **API Key**: The username portion of the Exotel API credentials.
* **API Token**: The password portion of the Exotel API credentials. Keep this secret.
* **Region (API subdomain)**: The cluster your Exotel account lives in. This is either `api.exotel.com` (Singapore) or `api.in.exotel.com` (Mumbai). You can confirm which one by looking at the host of any API URL shown on the Developer page.

ElevenLabs uses the API Key + API Token for HTTP Basic Auth when calling Exotel's Connect API for outbound dialing.

1. In the Exotel dashboard, open the left-hand **Manage** menu and click **App Bazaar**.

   ![Exotel sidebar: App Bazaar](https://files.buildwithfern.com/https://elevenlabs.docs.buildwithfern.com/docs/1e50c6687044e4fea1e6e636bc2db8a4a481c87eb44cdfc8019cff20bd1fe363/assets/images/conversational-ai/exotel-app-bazaar.png)

2. Click **Create / Add New Flow** and give the app a descriptive name (e.g. `ElevenLabs`), then click **OK**.

   ![Exotel: Add New Flow dialog](https://files.buildwithfern.com/https://elevenlabs.docs.buildwithfern.com/docs/928f17d1351f93e7a9bd60d92498dde8b24d350686cf273be146e9d315927704/assets/images/conversational-ai/exotel-add-new-flow.png)

3. From the applet palette on the right, drag the **Voicebot** applet onto the **Call Start** canvas.

   ![Exotel applet palette with Voicebot
   highlighted](https://files.buildwithfern.com/https://elevenlabs.docs.buildwithfern.com/docs/d19a0e66925d5931cd8f9eae7a1264b8a0e259d07736564cab4e1e894401c508/assets/images/conversational-ai/exotel-voicebot-applet.png)

4. Open the Voicebot applet's configuration and paste the ElevenLabs WebSocket URL for your residency into the **URL** field (the "Which bot you want to connect the enduser?" field):

   ```
   wss://api.elevenlabs.io/v1/convai/conversation/exotel
   ```

   If your ElevenLabs account is on EU or India residency, use the matching residency URL from the
   table above (e.g. `wss://api.in.residency.elevenlabs.io/v1/convai/conversation/exotel`) instead
   of the default `api.elevenlabs.io`.

   The rest of the Voicebot options ("Record this?", "Recording Channels", "Recording Format", "Encrypt DTMF") can stay at their defaults unless you have a specific recording or compliance need.

   ![Voicebot applet configured with the ElevenLabs WebSocket
   URL](https://files.buildwithfern.com/https://elevenlabs.docs.buildwithfern.com/docs/bb375863bb02b0908786403c080280f4561f21d887fb490050d54ff4ec211794/assets/images/conversational-ai/exotel-voicebot-configured.png)

5. **(Optional) Chain a Connect applet for human transfers.** Skip this if you don't need the agent to be able to transfer the call to a human. If you want to use the agent's **Transfer to number** tool, you must add a **Connect** applet immediately after the Voicebot applet in the flow.

   From the **Voice Applets** palette on the right, drag the **Connect** applet into the **Next → Continue to the next applet** slot of the Voicebot.

   ![Voice Applets palette with Connect
   highlighted](https://files.buildwithfern.com/https://elevenlabs.docs.buildwithfern.com/docs/1c325fc4ae992db551209b667519ffd75161b6a97ebf71ed6b751bbf26339faf/assets/images/conversational-ai/exotel-connect-applet-palette.png)

   In the Connect applet's configuration, choose **Configure parameters dynamically by providing a URL** and paste the ElevenLabs connect-applet endpoint for your residency into **Primary URL**:

   ```
   https://api.elevenlabs.io/v1/convai/exotel/connect-applet
   ```

   ![Connect applet configured with the ElevenLabs dynamic
   URL](https://files.buildwithfern.com/https://elevenlabs.docs.buildwithfern.com/docs/7ed4516ec33ea62830d9279a266ada20311741d0489fe2661dc528b8dbcbe126/assets/images/conversational-ai/exotel-connect-applet-configured.png)

   The matching residency URLs are:

   | Environment                | Connect applet URL                                                       |
   | -------------------------- | ------------------------------------------------------------------------ |
   | Default (US/International) | `https://api.elevenlabs.io/v1/convai/exotel/connect-applet`              |
   | EU Residency               | `https://api.eu.residency.elevenlabs.io/v1/convai/exotel/connect-applet` |
   | India Residency            | `https://api.in.residency.elevenlabs.io/v1/convai/exotel/connect-applet` |

   When the agent invokes its **Transfer to number** tool, ElevenLabs hands control back to Exotel
   and Exotel fetches this URL to retrieve the destination number to dial. Leave **Fallback URL**
   empty and keep all other defaults.

6. Save and publish the applet.

7. Note the **Applet ID** (sometimes called **App ID**). You'll find it in the URL of the ExoML editor (e.g. `.../exoml/start_voice/12345`) or in the App list. You will need this when importing the number into ElevenLabs.

The Voicebot applet handles both inbound and outbound legs. You only need a single applet per
account. Every phone number you import into ElevenLabs can share it.

Save and publish the ExoML flow from the previous step. Then route an Exotel phone number to it so inbound calls land on your Voicebot applet.

1. In the Exotel dashboard, open the left-hand **Manage** menu and click **ExoPhones** (just below **App Bazaar**).

   ![Exotel sidebar: ExoPhones](https://files.buildwithfern.com/https://elevenlabs.docs.buildwithfern.com/docs/30351173b2c2cfaa2ccd8d9e29e6aaba319ac3b5f2ee51d91a4f7913d3e218a4/assets/images/conversational-ai/exotel-exophones-sidebar.png)

2. If you don't already have a phone number, click **Buy a number** and purchase one in the country / area you need before continuing.

3. Find the number you want to use with your ElevenLabs agent. In its **Installed App** column, open the dropdown and select the flow you created in the previous step (e.g. **ElevenLabs**).

   ![ExoPhones: assign Installed App to a phone
   number](https://files.buildwithfern.com/https://elevenlabs.docs.buildwithfern.com/docs/5ed6b42794bb00f330dd52d50a5831622e3156955d59adb1ca64b746d1ec7d2b/assets/images/conversational-ai/exotel-exophones-install-app.png)

4. Save the configuration. Incoming calls to that number will now be routed straight into the Voicebot applet and streamed to ElevenLabs.

If the number will only be used for outbound calls, you can skip this step. Outbound calls are
dialed via the Connect API from ElevenLabs and don't depend on the **Installed App** assignment.

## Setup on ElevenLabs

In the ElevenAgents dashboard, go to the [**Phone Numbers**](https://elevenlabs.io/app/agents/phone-numbers) tab. Click **+ Import number** and select **From Exotel** from the dropdown.

![ElevenAgents: Import number dropdown with From Exotel
selected](https://files.buildwithfern.com/https://elevenlabs.docs.buildwithfern.com/docs/2a62cf9f6b63914c5688da5f58515168fa1ff39b8602f70fea7a1ff257bb6918/assets/images/conversational-ai/exotel-import-dropdown.png)

Fill in the following fields:

* **Label**: A descriptive name (e.g. `Support Line`).
* **Phone number**: The Exotel number in E.164 format (e.g. `+918048961234`).
* **Exotel Account SID**: From step 1 above.
* **Exotel API Key**: From step 1 above.
* **Exotel API Token**: From step 1 above (stored as a workspace secret).
* **Region**: Pick `Singapore (api.exotel.com)` or `Mumbai (api.in.exotel.com)` matching your Exotel cluster.
* **Voicebot Applet ID**: The App ID from step 2 above.

Click **Import** to save the number. ElevenLabs will verify the credentials against Exotel and store the API token as a workspace secret.

Once the number is imported, open it from the **Phone Numbers** list and pick the agent that should handle inbound calls in the **Assigned agent** dropdown.

Inbound calls require that the Voicebot applet is assigned to the number on Exotel's side (see the
previous section). Outbound-only setups do not need an inbound assignment.

Call your Exotel number from any phone. The call will be routed by Exotel to the Voicebot applet, which opens a WebSocket to ElevenLabs. Your agent will pick up and start the conversation.

Monitor the call in the [Calls History dashboard](https://elevenlabs.io/app/agents/history) to
verify everything is working as expected.

## Making outbound calls

Imported Exotel numbers can also initiate outbound calls. Your agent dials a phone number and starts the conversation when the recipient picks up.

From the [**Phone Numbers**](https://elevenlabs.io/app/agents/phone-numbers) tab, locate your Exotel number and click the **Outbound call** button.

In the Outbound Call modal:

1. Select the agent that will handle the conversation.
2. Enter the recipient's phone number in E.164 format.
3. Click **Send Test Call** to initiate the call.

ElevenLabs calls Exotel's Connect API with your stored credentials. Exotel dials the recipient and routes the audio back through the Voicebot applet when the call is answered.

When making outbound calls, your agent is the initiator of the conversation, so ensure your agent
has an appropriate first message configured.

To trigger outbound calls programmatically instead of from the dashboard, use the [Outbound call via Exotel](/docs/api-reference/exotel/outbound-call) endpoint. The API reference includes the request schema and ready-to-use SDK snippets.

## Agent configuration requirements

The Voicebot applet streams audio at **8 kHz PCM**. The ElevenLabs platform handles the audio format conversion automatically. You do **not** need to change your agent's TTS or input audio settings.

## Phone number formats

Phone numbers are stored in E.164 format (e.g. `+918048961234`). When importing an Indian Exotel number that you might write locally as `08048961234` or `8048961234`, enter it as `+918048961234`. ElevenLabs will reject duplicate imports of the same number in different formats.

## Call transfers

You can transfer calls from your agent back to Exotel by configuring a **Transfer to number** tool on your agent. When the tool fires, ElevenLabs ends the Voicebot leg and Exotel fetches the destination number from the chained **Connect** applet's dynamic URL, then dials the target.

For this to work you need **both**:

1. The optional **Connect applet** configured immediately after the Voicebot applet in your ExoML flow (see step 5 in [Setup on Exotel](#setup-on-exotel)).
2. The **Transfer to number** tool configured on your agent. See the [agent transfer guide](/docs/eleven-agents/customization/tools/system-tools/transfer-to-number).

Without the Connect applet in the flow, the agent's transfer attempts will fail because Exotel will have nowhere to route the call after the Voicebot ends.

## Troubleshooting

ElevenLabs received a non-200 response from Exotel's Connect API. The most common causes are:

* Wrong **Region**. Make sure the region you picked at import time matches the Exotel cluster your account lives in (`Singapore` vs `Mumbai`).
* Invalid **API Key** or **API Token**. Re-check the credentials in the Exotel **API Settings** page and re-import the number with the correct values.
* The **Account SID** does not match the API Key / Token pair.
* The destination number is not in E.164 format.

- Confirm the Voicebot applet's **URL** field matches the ElevenLabs WebSocket endpoint for your data residency exactly (including `wss://`).
- Confirm the Exotel **phone number** is routed to the ExoML app that contains the Voicebot applet (Exotel dashboard, ExoPhones, the number, Installed App).
- In ElevenLabs, confirm the phone number has an agent assigned in the **Phone Numbers** tab.

The **Voicebot Applet ID** field expects the numeric App ID from the ExoML editor URL (e.g. for `.../exoml/start_voice/12345` the ID is `12345`). Don't paste the full URL. Use only the ID.

ElevenLabs normalizes Exotel numbers to E.164 before storing them, and enforces uniqueness on `(provider, phone_number)`. If you previously imported the same number in a non-E.164 format, delete the old entry first and then re-import it in E.164 form.

## Useful links

* [Outbound call via Exotel API reference](/docs/api-reference/exotel/outbound-call)
* [Exotel API documentation](https://developer.exotel.com/api/)
* [Exotel Voicebot applet reference](https://support.exotel.com/support/solutions/articles/3000099826)
* [ElevenAgents phone numbers dashboard](https://elevenlabs.io/app/agents/phone-numbers)