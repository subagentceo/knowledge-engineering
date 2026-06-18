# Integrate Flex with Zendesk

By deploying the new Zendesk CTI Flex integration, teams using Zendesk as their ticketing system can now interact with their customers across multiple communication channels. By allowing Flex to take care of the ticket housekeeping, teams can focus on solving customer issues.

This integration is Generally Available and supports the following features:

## Features

[Twilio Flex (Zendesk Marketplace)](https://www.zendesk.com/apps/support/twilio-flex)

**Search and Screenpop:** Available across all channels. Use information gathered in the triage phase of customer interaction to automatically look up and display relevant Zendesk tickets or user records.

**Interaction logging:** Automatically log Flex interactions into a related Zendesk ticket.

**Context Switching:** Set your Zendesk Screen to change to a related Zendesk ticket or user automatically when you multitask.

**Chat Transcripts:** Automatically save Chat Transcripts for non-voice channels as Internal Ticket Comments.

**Voice Recording**: Enable Flex Voice Recording for inbound voice calls.

**Configurable Ticket and User Creation/Display**: Configure automatic ticket and/or user creation and navigation in response to Customer Engagements.

**Click to Dial\***: Let Agents place an outbound call with the click of a button.

\* This feature is currently in beta.

## Setup

### Configure the Twilio Flex Zendesk Integration

1. Start by navigating to [https://flex.twilio.com](https://flex.twilio.com) in Google Chrome.
2. Browse to [**Admin > Integrations**](https://flex.twilio.com/admin/integrations).
3. Click on the **Zendesk** card to reach the configuration screen:

   ![Zendesk integration status toggle set to enabled.](https://docs-resources.prod.twilio.com/298568f071382e21ea3802b81ba6f4c5aa8b9f4828a65c67490b42597e48eb73.png)
4. Configure your Flex Zendesk Integration according to your organisation's requirements by setting some or all of the following parameters:

| **Parameter Name**                | **Mandatory** | **Description**                                                                                                                                                                                                                                                                                                                                                                                                        |
| --------------------------------- | ------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Outbound Caller ID                | Yes\*         | This will be the `caller-Id` used for outbound calls from the Flex-Zendesk Integration (via Click to Dial) if an agent does not have a defined caller ID.<br /><br /> \*If the [Flex Dialpad](/docs/flex/admin-guide/setup/voice/dialpad) is enabled, this option is not needed. You can [configure the Dialpad](/docs/flex/admin-guide/setup/voice/dialpad-configure) to set your outbound caller ID.                 |
| Zendesk Base URL                  | Yes           | Register your Zendesk domain(s) on the [**Embed Flex as an iframe**](https://console.twilio.com/us1/develop/flex/settings/embed-as-iframe) page in the Twilio Console. For more details, refer to [Securely iframe Flex in your application](/docs/flex/admin-guide/setup/secure-iframe).                                                                                                                              |
| Workflow SID                      | No            | If you want to use a Workflow other than the default Workflow, specify its SID here. If you aren't sure what your Workflow SID is, leave this field empty.                                                                                                                                                                                                                                                             |
| Task Channel SID                  | No            | If you want to use a Task Channel other than the default voice channel, specify its SID here. If you aren't sure what your Task Channel SID is, leave this field empty.                                                                                                                                                                                                                                                |
| New ticket description            | No            | The description Flex uses for automatic ticket creation.                                                                                                                                                                                                                                                                                                                                                               |
| New ticket subject                | No            | The subject Flex uses for automatic ticket creation.                                                                                                                                                                                                                                                                                                                                                                   |
| Automatic Logging                 | No            | You can configure the task stages when task metadata should be logged as an internal note in the relevant Zendesk ticket. You can choose any, or none, of these three stages:<br /><ul><li>Task Start: Log when an agent accepts the task.</li><li>Task Switch: Log when an agent selects the task. Particularly useful in multitasking setups.</li><li>Task Complete: Log when an agent completes the task.</li></ul> |
| Log Chat details as Internal Note | No            | Select this option if you want chat transcripts for non-voice channels to be recorded as an internal note in the relevant Zendesk ticket, when applicable. If selected, the transcript of the chat is stored in Zendesk when a task is completed.                                                                                                                                                                      |
| Navigate                          | No            | Select the nature of the screenpop shown when an agent accepts or selects a task. Available options are: <br /><ul><li>Display the ticket on the agent's screen.</li><li>Display the user on the agent's screen.</li><li>Display nothing.</li></ul>You can select different behavior for cases when the end-customer has provided a valid ticket number in the input.                                                  |
| Create                            | No            | Select if and when you want a new ticket or user to be created. For cases when an invalid ticket number has been provided, or no ticket numbers are provided, you can choose to:<br /><ul><li>Create a new ticket.</li><li>Create a new user, if the end-customer is unknown.</li></ul>                                                                                                                                |

> \[!CAUTION]
>
> When enabling any of the features that result in data being transferred over from Flex to Zendesk, you should be aware that any such data will be governed by [Zendesk's privacy policy](https://www.zendesk.com/company/customers-partners/privacy-policy/?cta=privacy).
>
> You should also understand that once data has been copied to Zendesk, it's your responsibility to handle appropriately, and if necessary delete, any data copied from Twilio to Zendesk through the Flex app. This includes both data with personally identifiable information (PII) and data without PII.
>
> Please read the [Flex Zendesk Integration terms](/en-us/legal/tos) for details.

5. Turn on your Zendesk Integration using the **Status** toggle:

   ![Flex\_Zendesk\_EnableIntegration.](https://docs-resources.prod.twilio.com/6a6d7ee13d07c169857499cdc2b192752a5cea3db448c7ead029414d4531c293.png)

Your Flex configuration is now complete. Now install the Twilio Flex app in your Zendesk instance.

### Install the Twilio Flex app in your Zendesk instance

1. While you're logged in to your Zendesk instance/Domain/Org, navigate to **Zendesk Marketplace** and either search for Twilio Flex or navigate directly to the app by clicking [this URL](https://www.zendesk.com/apps/support/twilio-flex). Read the **Description** to learn more about the Twilio Flex app. When you're ready, click the **Install** button:

![Twilio\_Flex\_app\_Integration\_with\_Zendesk\_Support\_pic2.](https://docs-resources.prod.twilio.com/e744d62d64d949a125786fe303ce5ed9dfd5c700f837a0b1593c7598b59d3cdf.png)

2. Continue with each of the steps show in the following screen. Modify the parameters if you need to:

![Zendesk app installation form for Twilio Flex with URL and widget size fields.](https://docs-resources.prod.twilio.com/8ffd89a7f5f4f55d7e831f66042d19ae64a49645f19688fb5badd5d6039646a4.png)

These are the parameters that you will or may need to change:

| Parameter name     | Mandatory? | Description                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                        |
| ------------------ | ---------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| Flex URL           | Yes        | This field tells the Twilio Flex app in Zendesk where Flex is hosted. Leave it as is if you're using Hosted Flex, or if you're not sure what the correct value should be. If you're hosting Flex on your own infrastructure, you should change this to the URL of your Flex instance. The URL must contain **?path=/agent-desktop.** Otherwise, Admin users will be unable to initialize the integration correctly. [https://flex.twilio.com/**yourRuntime-Domain-3869**?path=/agent-desktop](https://flex.twilio.com/yourRuntime-Domain-3869?path=/agent-desktop) |
| Flex Widget width  | Yes        | Specify, in pixels, the width of the Flex app within your Zendesk UI. <br /><br />An important thing to consider when deciding width is that a wider Flex app is useful if you intend to use non-voice channels as it gives a better Chat Experience to your Support staff.                                                                                                                                                                                                                                                                                        |
| Flex Widget height | Yes        | Specify, in pixels, the height of the Flex app within your Zendesk UI. <br /><br />An important thing to consider when deciding height is that a taller Flex app is useful if you intend to use non-voice channels as it gives a better Chat Experience to your Support staff.                                                                                                                                                                                                                                                                                     |

> \[!NOTE]
>
> * You don't need to change anything on this screen unless you want to customize it. If you're not sure what values to enter, keep the default values.
> * If you want to restrict application access to selected roles or groups in your organization, select the restrictions that apply.

The Flex app should now be installed in your Zendesk instance. Users with permitted roles and or in permitted groups will now be able to see the Flex app when they login to their Zendesk accounts:

![flexdeskbeta\_Installed\_1.](https://docs-resources.prod.twilio.com/7b4f1c708efe745c91e65f352f335f3a2644fe388cdd410f2b7a256eea93a49b.png)

## What's next?

Now that you've integrated Flex into your Zendesk instance, learn more about customizing your integration and managing interactions with your users:

* Learn how to manage your [Flex-Zendesk call flows](/docs/flex/admin-guide/integrations/zendesk/call-flows)
* [Customize](/docs/flex/admin-guide/integrations/zendesk/customize) your Flex-Zendesk integration
* [Securely embed Flex as an iframe](/docs/flex/admin-guide/setup/secure-iframe)
