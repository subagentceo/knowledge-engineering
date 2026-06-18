# Manage Flex-Zendesk Call Flows

Learn how to accept incoming calls from new and existing contacts and make outgoing calls from your Flex-Zendesk Integration.

> \[!WARNING]
>
> Do you still need to set up your Flex-Zendesk Integration? Check out our [guide for configuring your Zendesk instance for Flex!](/docs/flex/admin-guide/integrations/zendesk)

## Screen Pop - Incoming Engagement

### No Ticket Number or Invalid Ticket provided by the customer in Incoming Engagement

By default, a new ticket is created for every incoming engagement. To test this, you can dial your [Flex Number](https://console.twilio.com/us1/develop/phone-numbers/manage/incoming). On accepting the call, a new ticket will be created and the Zendesk screen will change to this new ticket as shown below

| ![Zendesk interface showing new ticket with Twilio Flex call in progress.](https://docs-resources.prod.twilio.com/1cfb9e7cc99751019f6bbf533a732eb887272120dbaf9f8feaabe231dd80c417.png) |
| --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |

### Ticket Number provided in the Incoming Engagement

If the call flow in your organisation collects ticket number from the customer on incoming engagement, you can use that information to screen pop the ticket to an agent when they accept the incoming task. This will require setting your Engagement flows to collect the ticket number from the Customer and passing that to Flex. Please see this guide for an example of such implementation - [IVR Flow for Collecting Ticket Number from Customer](/docs/flex/admin-guide/integrations/zendesk/customize)

With this setup, when a ticket number is provided, you should see that the relevant ticket is shown to the agent for the engagement.

| ![Zendesk unassigned tickets list with Twilio Flex status showing no active tasks.](https://docs-resources.prod.twilio.com/969973c64b2941d154266c5fe7f44adf621d80c6db5f2e8af21c6ccf14e7565a.gif) | ![Zendesk ticket interface showing call details and status as completed.](https://docs-resources.prod.twilio.com/cfe6ef8dbf54ff280eeb10004dcecb2833ad0490941418c7f86732b9918434ac.png) |
| ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |

> \[!NOTE]
>
> While the above examples are for a Voice Call, it is applicable to any other Channels setup for your Flex Instance.

## Interaction Logging

In all call flows, task metadata is logged automatically is internal note, as shown in screenshots below

| ![Zendesk ticket showing inbound call details with FlexDeskBeta integration.](https://docs-resources.prod.twilio.com/4aad4eb4e1eff72764bef1bbde8a42c9354127d8806ced0c7146c3577b256276.png) | ![Call log details for inbound voice call from GB, status completed, with caller and called numbers.](https://docs-resources.prod.twilio.com/692f8790f7d39f50af1fa8459eee3ec5de101b62435c5efcdd87ecfe36cb23e9.png) | ![Inbound voice call details with status, type, caller, and country information.](https://docs-resources.prod.twilio.com/7d26c7c0a7d9a0fdc255fe7b684e64dadf90083766ede1a385b36b823c99c61b.png) |
| ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |

## Context Switching

Your Flex Zendesk integration can seamlessly handle multi-tasking when an agent has multiple records.

From your Zendesk account, initiate multiple inbound/outbound calls, SMSes, chats, or any other communications channel configured on your Twilio Flex Project.

As you select different tasks on the Flex screen, the screen on Zendesk will change to the ticket/user, depending on your configuration. For example, if you are chatting with Joey, you will see their information until you switch over to your call with Alex, at which point you'll see their information on the screen instead.

| ![Zendesk interface showing unassigned tickets and Twilio Flex task panel.](https://docs-resources.prod.twilio.com/d88f6f623c2a305a1a9e4b34656df246b228fee90d5e16be9dc5c03d9047c935.gif) |
| ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |

## Custom Tags

You can add any custom tags identified during your customer engagement flow by adding those tags to a task attribute named `zdCustomTags` made available to you. Please see our guide on [IVR Flow for Adding Custom Tags to Zendesk Ticket.](/docs/flex/admin-guide/integrations/zendesk/customize)

Once you have implemented custom tags, you should see your tags being added to the relevant ticket as shown in the screenshot below

| ![Zendesk ticket with tags including generatedbyflex and personalised, linked to Twilio Flex call interface.](https://docs-resources.prod.twilio.com/9e23221c69390b1715a9586966441319ed380ce29ca06b05abacf9e102726f62.png) |
| -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |

> \[!WARNING]
>
> `zdCustomTags` supports multiple tags, so you can pass a list of all the tags you want to add.

## Chat Transcription

If you have enabled logging Chat Details as Internal Note, then for all text-based engagements, you will find the transcript of the Chat stored as Internal Ticket Note in a relevant Zendesk Ticket. Please see the below screenshot showing this -

| ![Twilio Flex integration in Salesforce showing no active tasks and user status as idle.](https://docs-resources.prod.twilio.com/f859e0698cc7bcf19782d77a643db2dfcc4dcb7928b5e1fa5ad01edf50ee87b9.png) | ![Zendesk ticket with Twilio Flex chat transcript discussing integration availability.](https://docs-resources.prod.twilio.com/09fe495e36f8f0f6e578e228a075992e5f49a1faf19c9443287a115a42a15ad5.png) |
| ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |

## Click-to-Dial

If a phone number is associated with the ticket originator (Customer), a widget is shown in the ticket sidebar allowing you to click and dial out.

Please see the screenshots below

| ![flexdeskbeta\_callFlow\_CtD\_App.](https://docs-resources.prod.twilio.com/83cec62bc967231ab8a5498e99f6530d2209619e3626c706d2c5d52279e62c2b.png) | ![flexdeskbeta\_callFlow\_ClickToDial.](https://docs-resources.prod.twilio.com/0953db70388c28347d03bd172ab7dbd03f9511b7204aad1f9e9ba4f93dca9ceb.png)                                                                    |
| ------------------------------------------------------------------------------------------------------------------------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| ![flexdeskbeta\_callFlow\_CtD.](https://docs-resources.prod.twilio.com/7a6c629bdf5a8051a6ab7ef2b6e4c00ee6a2efd9582d5bb1cb9a427c698d0bcb.png)      | ![Zendesk ticket showing completed and started outbound voice call details with FlexDeskBeta integration.](https://docs-resources.prod.twilio.com/0bbabb3e4df895c58ec3d5223b89496805054228ac218540b24289f43cc11aa3.png) |
