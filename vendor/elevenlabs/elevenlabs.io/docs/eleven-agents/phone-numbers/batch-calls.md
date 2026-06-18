> This is a page from the ElevenLabs documentation. For a complete page index, fetch https://elevenlabs.io/docs/llms.txt. For the full documentation in a single file, fetch https://elevenlabs.io/docs/llms-full.txt.

# Batch calling

When conducting outbound call campaigns, ensure compliance with all relevant regulations,
including the [TCPA (Telephone Consumer Protection Act)](/docs/eleven-agents/legal/tcpa) and any
applicable state laws.

## Overview

Batch Calling enables you to initiate multiple outbound calls simultaneously using your configured ElevenLabs agents. This feature is ideal for scenarios such as sending notifications, conducting surveys, or delivering personalized messages to a large list of recipients efficiently.
This feature is available for both phone numbers added via the [native Twilio integration](/docs/eleven-agents/phone-numbers/twilio-integration/native-integration) and [SIP trunking](/docs/eleven-agents/phone-numbers/sip-trunking).

### Key features

* **Upload recipient lists**: Easily upload recipient lists in CSV or XLS format.
* **Dynamic variables**: Personalize calls by including dynamic variables (e.g., `user_name`) in your recipient list as separate columns.
* **Agent selection**: Choose the specific ElevenLabs agent to handle the calls.
* **Scheduling**: Send batches immediately or schedule them for a later time.
* **Real-time monitoring**: Track the progress of your batch calls, including overall status and individual call status.
* **Detailed reporting**: View comprehensive details of completed batch calls, including individual call recipient information.

## Concurrency

When batch calls are initiated, they automatically utilize the minimum of either 50% of your workspace's concurrency limit or 70% of your agent's concurrency limit.
This ensures that sufficient concurrent capacity remains available for other conversations, including incoming calls and calls via the widget.

## Requirements

* An ElevenLabs account with an [agent setup](https://elevenlabs.io/app/agents).
* A phone number imported

Zero Retention Mode (ZRM) cannot be enabled for batch calls. If your use case requires ZRM, you
will need to initiate calls individually rather than using the batch calling feature.

## Creating a batch call

Follow these steps to create a new batch call:

Access the [Outbound calls interface](https://elevenlabs.io/app/agents/batch-calling) from the
ElevenAgents dashboard

Click on the "Create a batch call" button. This will open the "Create a batch call" page.

<img src="https://files.buildwithfern.com/https://elevenlabs.docs.buildwithfern.com/docs/defec00e1f267346775021283bdc6038cfabcd27427dffb7cd7e5cd9382b53e0/assets/images/conversational-ai/batch-call-creation.png" alt="Create a batch call page showing fields for batch name, phone number, agent selection, recipient upload, and timing options." />

* **Batch name**: Enter a descriptive name for your batch call (e.g., "Delivery notice", "Weekly Update Notifications").
* **Phone number**: Select the phone number that will be used to make the outbound calls.
* **Select agent**: Choose the pre-configured ElevenLabs agent that will handle the conversations for this batch.

- **Upload File**: Upload your recipient list. Supported file formats are CSV and XLS.
- **Formatting**:
  * The `phone_number` column is mandatory in your uploaded file (if your agent has a `phone_number` dynamic variable that also has to be set, please rename it).
  * You can include other columns (e.g., `name`, `user_name`) which will be passed as dynamic variables to personalize the calls.
  * A template is available for download to ensure correct formatting.

The following column headers are special fields that are used to override an agent's initial
configuration:

* language
* first\_message
* system\_prompt
* voice\_id

The batch call will fail if those fields are passed but are not set to be overridable in the agent's security settings. See more
[here](/docs/eleven-agents/customization/personalization/overrides).

* **Send immediately**: The batch call will start processing as soon as you submit it. -
  **Schedule for later**: Choose a specific date, time, and timezone for the batch call to begin.

- You may "Test call" with a single recipient before submitting the entire batch. - Click "Submit
  a Batch Call" to finalize and initiate or schedule the batch.

## Managing and monitoring batch calls

Once a batch call is created, you can monitor its progress and view its details.

### Batch calling overview

The Batch Calling overview page displays a list of all your batch calls.

<img src="https://files.buildwithfern.com/https://elevenlabs.docs.buildwithfern.com/docs/a371de67085f7c63765a90dacbe2ba50b6d5cb8544cb8554233d9a39567b0994/assets/images/conversational-ai/batch-call-summary.png" alt="Batch Calling overview page listing several batch calls with their status, recipient count, and progress." />

### Viewing batch call details

Clicking on a specific batch call from the overview page will take you to its detailed view, from where you can view individual conversations.

<img src="https://files.buildwithfern.com/https://elevenlabs.docs.buildwithfern.com/docs/a9ef3ded53870849fea0c86bc9ddf9ae43ca86ba98199b988370a67d11a447ee/assets/images/conversational-ai/batch-call-completed-summary.png" alt="Batch call details page showing a summary (status, total recipients, started, progress) and a list of call recipients with phone number, dynamic variables, and status." />

## API Usage

You can also manage and initiate batch calls programmatically using the ElevenLabs API. This allows for integration into your existing workflows and applications.

* [List batch calls](/docs/api-reference/batch-calling/list) - Retrieve all batch calls in your workspace
* [Create batch call](/docs/api-reference/batch-calling/create) - Submit a new batch call with agent, phone number, and recipient list