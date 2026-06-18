> This is a page from the ElevenLabs documentation. For a complete page index, fetch https://elevenlabs.io/docs/llms.txt. For the full documentation in a single file, fetch https://elevenlabs.io/docs/llms-full.txt.

# Zero Retention Mode (Enterprise)

## Background

By default, ElevenLabs retains data, in accordance with the Privacy Policy, to enhance services, troubleshoot issues, and ensure the security of ElevenLabs'systems. However, for some enterprise customers, ElevenLabs offers a "Zero Retention Mode" option for specific products. In this Zero Retention Mode, most data in requests and responses are immediately deleted once the request is completed.

ElevenLabs has agreements in place with each third-party LLM provider which expressly prohibit such providers from training their models on customer content, whether or not Zero Retention Mode is enabled.

## What is Zero Retention Mode?

Zero Retention Mode provides an additional level of security and peace of mind for especially sensitive workflows. When enabled, logging of certain data points is restricted, including:

* TTS text input
* TTS audio output
* TTD text input
* TTD audio output
* Voice Changer audio input
* Voice Changer audio output
* STT audio input
* STT text output
* ElevenLabs Agents: all input and output
* Email associated with the account generating the input in our logs

This data is related to the processing of the request, and can only be seen by the user doing the request and the volatile memory of the process serving the request. None of this data is sent at any point to a database where data is stored long term.

## Who has access to Zero Retention Mode?

Enterprise customers can use Zero Retention Mode. It is primarily intended for use by our customers in the healthcare and banking sector, and other customers who may use our services to process sensitive information.

## When can a customer use Zero Retention Mode?

Zero Retention Mode is available to select enterprise customers. However, access to this feature may be restricted if ElevenLabs determines a customer's use case to be high risk, if an account is flagged by an automated system for additional moderation or at ElevenLabs' sole discretion. In such cases, the enterprise administrator will be promptly notified of the restriction.

## How does Zero Retention Mode work?

Zero Retention Mode can be enabled in different ways depending on the product:

### API products

For API-based products, Zero Retention Mode is enabled by sending `enable_logging=false` with your requests:

* **Text to Speech**: All endpoints beginning with `/v1/text-to-speech/` and the TTS websocket connection.
* **Text to Dialogue**: All endpoints beginning with `/v1/text-to-dialogue/`.
* **Voice Changer**: All endpoints starting with `/v1/speech-to-speech/`.
* **Speech to Text**: All endpoints starting with `/v1/speech-to-text/`.

After setup, check the request history to verify Zero Retention Mode is enabled. If enabled, there should be no requests in the history.

### ElevenAgents

For ElevenAgents, Zero Retention Mode can be enabled per-agent via the agent's Privacy settings in the UI. Navigate to your agent's settings, go to **Privacy** > **Advanced**, and toggle "Zero Retention Mode" to enabled.

For detailed instructions on enabling ZRM for agents, see [Zero Retention Mode (per-agent)](/docs/agents-platform/customization/privacy/zrm).

For example, in the Text to Speech API, you can set the query parameter [enable\_logging](https://elevenlabs.io/docs/api-reference/text-to-speech#parameter-enable-logging) to a `false` value:

```python title="Python" {12}
from elevenlabs import ElevenLabs

elevenlabs = ElevenLabs(
  api_key="YOUR_API_KEY",
)

response = elevenlabs.text_to_speech.convert(
  voice_id=voice_id,
  output_format="mp3_22050_32",
  text=text,
  model_id="eleven_flash_v2",
  enable_logging=False,
)

```

```javascript title="JavaScript" {9}
import { ElevenLabsClient } from "@elevenlabs/elevenlabs-js";

const elevenlabs = new ElevenLabsClient({ apiKey: "YOUR_API_KEY" });

await elevenlabs.textToSpeech.convert(voiceId, {
  outputFormat: "mp3_44100_128",
  text: text,
  modelId: "eleven_flash_v2",
  enableLogging: false,
});
```

```bash title="cURL"
curl --request POST \
  --url 'https://api.elevenlabs.io/v1/text-to-speech/{voice_id}?enable_logging=false' \
  --header 'Content-Type: application/json'
```

## What products are configured for Zero Retention Mode?

| Product                    | Type                 | Default Retention | Eligible for Zero Retention |
| -------------------------- | -------------------- | ----------------- | --------------------------- |
| Text to Speech             | Text Input           | Enabled           | Yes                         |
|                            | Audio Output         | Enabled           | Yes                         |
| Voice Changer              | Audio Input          | Enabled           | Yes                         |
|                            | Audio Output         | Enabled           | Yes                         |
| Speech to Text             | Audio Input          | Enabled           | Yes                         |
|                            | Text Output          | Enabled           | Yes                         |
| Text to Dialogue           | Text Input           | Enabled           | Yes                         |
|                            | Audio Output         | Enabled           | Yes                         |
| Music                      | Text Input           | Enabled           | No                          |
|                            | Audio Output         | Enabled           | No                          |
| Image & Video              | All Input and Output | Enabled           | No                          |
| Instant Voice Cloning      | Audio Samples        | Enabled           | No                          |
| Professional Voice Cloning | Audio Samples        | Enabled           | No                          |
| Dubbing                    | Audio/Video Input    | Enabled           | No                          |
|                            | Audio Output         | Enabled           | No                          |
| ElevenCreative Studio      | Text Input           | Enabled           | No                          |
|                            | Audio Output         | Enabled           | No                          |
| Agents Platform            | All Input and Output | Enabled           | Yes                         |

For ElevenLabs Agents, Gemini and Claude LLMs can be used in Zero Retention Mode. MCP support is
not currently available for users on Zero Retention Mode or those requiring HIPAA compliance.

## FAQ

Troubleshooting and support for Zero Retention Mode is limited. Because of the configuration, we
will not be able to diagnose issues with TTS/STS generations. Debugging will be more difficult
as a result.

Customers by default have history preservation enabled. All customers can use the API to delete
generations at any time. This action will immediately remove the corresponding audio and text
from our database; however, debugging and moderation logs may still retain data related to the
generation.

For any retained data, we regularly back up such data to prevent data loss in the event of any
unexpected incidents. Following data deletion, database items are retained in backups for up to
30 days After this period, the data expires and is not recoverable.

All data is deleted from our systems permanently when you delete your account. This includes all
data associated with your account, such as API keys, request history, and any other data stored
in your account. We also take commercially reasonable efforts to delete debugging data related
to your account.