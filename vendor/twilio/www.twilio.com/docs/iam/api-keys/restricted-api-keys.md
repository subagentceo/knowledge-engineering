# Restricted API keys

Use Restricted API keys for fine-grained control over access to Twilio API resources. You can create and manage Restricted API keys using the REST API [Key resource v1](/docs/iam/api-keys/key-resource-v1) or the [Twilio Console](https://console.twilio.com).

Restricted API keys allow you to grant API access to many Twilio API endpoints, including:

* [Studio](/docs/studio)
* [Voice](/docs/voice), [Conversation Intelligence (classic)](/docs/conversation-intelligence-classic), [Voice Insights](/docs/voice/voice-insights), and [SIP](/docs/voice/sip)
* [Messaging](/docs/messaging)
* [Long Codes](/docs/phone-numbers), [Regulatory Compliance](/docs/phone-numbers/regulatory/api)
* [TaskRouter](/docs/taskrouter)
* [Monitor Events](/docs/usage/monitor-events) and [Monitor Alerts](/docs/usage/monitor-alert)
* [Lookup](/docs/lookup)
* [Verify](/docs/verify)
* [Video](/docs/video)
* [Event Streams](/docs/events)
* [Usage Records](/docs/usage/api/usage-record)
* [Serverless](/docs/serverless)
* [Identity and Access Management (IAM)](/docs/iam)
* Flex: The Flex Insights Historical Reporting and Self-Signed Certificate API keys permissions are currently in private beta and not available for general use. For more information, contact your Twilio account executive.

For example, if your Programmable Voice application's testing suite makes test Voice calls, you can create a Restricted API key that permits only sending `POST` requests to [create Call Resources](/docs/voice/api/call-resource).

Or you can create Restricted API keys that provide your engineering team with access to every Voice endpoint except the Call Recording Resource endpoints.

> \[!WARNING]
>
> You can't create [Access Tokens](/docs/iam/access-tokens) for Twilio's client-side SDKs with Restricted API keys.

## Working with Restricted API keys

### Create and manage Restricted API keys

* Learn how to use the [Twilio Console to create and manage API keys](/docs/iam/api-keys/keys-in-console).
* Learn how to use the [REST API to create and manage API keys](/docs/iam/api-keys/key-resource-v1).

### Authenticate with a Restricted API key

Twilio uses the Restricted key's SID and secret as your credentials when sending API requests.

Read the [Requests to Twilio](/docs/usage/requests-to-twilio) page to learn more.

### Permissions available with Restricted API keys

> \[!WARNING]
>
> Restricted API keys have a limit of 100 permissions that can be associated with each key.

Restricted API keys allow you grant permissions for keys to access specific API endpoints.

Each permission maps to one or more endpoints/actions for each API Resource.

Click on one of the product areas below to download a PDF of the permissions/endpoint actions.

[Twilio Restricted API keys Permissions - Messaging Permissions](https://docs-resources.prod.twilio.com/documents/Twilio_Restricted_API_Keys_Permissions_-_Messaging_Permissions.pdf)

[Twilio Restricted API keys Permissions - Phone Numbers Permissions](https://docs-resources.prod.twilio.com/documents/Twilio_Restricted_API_Keys_Permissions_-_Numbers_Permissions.pdf)

[Twilio Restricted API keys Permissions - Studio Permissions](https://docs-resources.prod.twilio.com/documents/Twilio_Restricted_API_Keys_Permissions_-_Studio_Permissons.pdf)

[Twilio Restricted API keys Permissions - TaskRouter Permissions](https://docs-resources.prod.twilio.com/documents/Twilio_Restricted_API_Keys_Permissions_-_TaskRouter.pdf)

[Twilio Restricted API keys Permissions - Voice Permissions](https://docs-resources.prod.twilio.com/documents/Twilio_Restricted_API_Keys_Permissions_-_Voice_Permissions.pdf)

[Twilio Restricted API keys Permissions - Lookup Permissions](https://docs-resources.prod.twilio.com/documents/Twilio_Restricted_API_Keys_Permissions_-_Lookup_Permissions.pdf)

[Twilio Restricted API keys Permissions - Identity and Access Management (IAM) Permissions](https://docs-resources.prod.twilio.com/documents/Twilio_Restricted_API_Keys_Permissions_-_IAM_Permissons.pdf)

[Twilio Restricted API keys Permissions - Monitor Permissions](https://docs-resources.prod.twilio.com/documents/Twilio_Restricted_API_Keys_Permissions_-_Monitor_Permissons.pdf)

[Twilio Restricted API Keys Permissions - Verify Permissions](https://docs-resources.prod.twilio.com/documents/Twilio_Restricted_API_Keys_Permissions_-_Verify_Permissions.pdf)

[Twilio Restricted API Keys Permissions - Video Permissions](https://docs-resources.prod.twilio.com/documents/Twilio_Restricted_API_Keys_Permissions_-_Video_Permissions.pdf)

[Twilio Restricted API Keys Permissions - Event Streams Permissions](https://docs-resources.prod.twilio.com/documents/Twilio_Restricted_API_Keys_Permissions_-_Event_Streams_Permissions.pdf)

[Twilio Restricted API Keys Permissions - Usage Records Permissions](https://docs-resources.prod.twilio.com/documents/Twilio_Restricted_API_Keys_Permissions_-_Usage_Records_Permissions.pdf)

[Twilio Restricted API Keys Permissions - Serverless Permissions](https://docs-resources.prod.twilio.com/documents/Twilio_Restricted_API_Keys_Permissions_-_Serverless_Permissions.pdf)
