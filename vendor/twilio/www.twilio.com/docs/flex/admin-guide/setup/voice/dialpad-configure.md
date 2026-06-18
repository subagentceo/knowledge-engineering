# Configure the Flex Dialpad

## Enable the Flex Dialpad in the Twilio Console

1. Ensure that you are using v1.18.0 or greater of the Flex UI.
2. Log in to the Twilio Console and navigate to the [Flex Voice Settings page](https://console.twilio.com/us1/develop/flex/channels/voice).
3. Toggle the `Enable Dialpad` switch so that it's set to `enabled`.
4. [Configure your Dialpad defaults](/docs/flex/admin-guide/setup/voice/dialpad-configure) with a Caller ID, TaskQueue, WorkFlow, and Country for your Dialpad defaults.
5. Click `Save` to save your changes.

## Self-Hosted Flex: Upgrade the Flex-UI Node Module

If you're using self-hosted Flex, you'll also need to upgrade the [Flex UI](/docs/flex/developer/ui) to v1.18.0 to render the Flex Dialpad in your contact center. In order to use the outbound dialing capabilities in Flex, you'll need **npm install permissions** for your Flex codebase.

### Update your Flex UI Node Module

1. In your Flex Project, run the following command to install the most recent version of the Flex UI.

```bash
npm install @twilio/flex-ui@1.18.0
```

## Configuration Settings

The Flex Dialpad has various settings that you can modify. To see the defaults, log in to the Twilio Console and navigate to the [Flex Settings page](https://www.twilio.com/console/flex/settings).

### Description of Fields

| **Field Name**      | **Description**                                                                                                                                                                                                                                                                                              |
| ------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| Caller ID           | Manage which Twilio phone number you want to use as the default Caller ID for outbound calls.                                                                                                                                                                                                                |
| TaskQueue           | Manage which [TaskRouter TaskQueue](/docs/taskrouter/api/task-queue) you want to use for outbound calls. The agent must be a member of that TaskQueue. The queue will also be used for reporting in [TaskRouter Events](/docs/taskrouter/api/event) and [Flex Insights](/docs/flex/end-user-guide/insights). |
| TaskRouter Workflow | Manage which [TaskRouter Workflow](/docs/taskrouter/api/workflow) you want to use for outbound calls. The workflow will be used to determine Task Reservation Timeout and Assignment Callback URL. Routing rules will be ignored, and the task will be assigned to the agent using the Dialpad.              |
| Country             | Manage the default country code for your Dialpad. Choose a country code that will be the most useful for the majority of your agents.                                                                                                                                                                        |
