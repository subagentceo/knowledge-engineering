# Customize your Flex-Zendesk Integration

The setup and configuration outlined in [Create your Flex-Zendesk Integration](/docs/flex/admin-guide/integrations/zendesk) and [Manage Flex-Zendesk Call Flows](/docs/flex/admin-guide/integrations/zendesk/call-flows) describe how to get up and running with the default behavior in mind. However, you might want to customize both this integration experience as well as call flows.

> \[!NOTE]
>
> Do you still need to set up your Flex-Zendesk Integration? Check out [our guide for configuring your Zendesk instance for Flex](/docs/flex/admin-guide/integrations/zendesk)!

In this guide, we will walk through how to customize the default call flow in your Flex-Zendesk integration by

1. Creating an IVR (Interactive Voice Response) to collect a Ticket number from our caller
2. Collecting further information about the Ticket or Caller during the flow that you would want to tag the Ticket with .
3. Looking up an existing Ticket if a valid ticket id is provided, or
4. Creating a new Ticket from the caller's input if there is no pre-existing Ticket or when an invalid Ticket number is provided

To accomplish this, we'll need to do the following:

1. Create a Studio flow to introduce IVR and collect a Ticket Number from the caller
2. Pass Zendesk's Ticket Number to the Flex-Zendesk integration by using a custom Task attribute called `zd_ticket_id`
3. Pass Tags to be added to Zendesk Ticket by using a custom Task attribute called `zdCustomTags`
4. Re-configure the Flex Zendesk Integration for creation and navigation of Ticket, if not already done in the configuration stage

> \[!NOTE]
>
> Remember: Flex is a Programmable Application Platform, so you can customize Flex to any extent using the Flex Plugin Model, and those changes will be reflected in your Zendesk integration as well. The customizations in this guide refer to the enhancements in both the integration and the call flow itself.

## IVR Flow for Collecting Ticket Number from Customer

If the call flow in your organisation collects ticket number from the customer on incoming engagement, you can use that information to screen pop the ticket to an agent when they accept the incoming task.

To do so, from your Twilio Console, modify your [Flex Flow](https://www.twilio.com/console/studio/flows), as described below.

(1) From the Flex Flow screen, select "Voice IVR" flow

| ![Voice IVR flow highlighted in list with options to duplicate or delete.](https://docs-resources.prod.twilio.com/0033626b5da52d474a1d16e151a961dcf48f9b5b40a0ff2ce5f77c29da9d38eb.png) |
| --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |

(2) Default "Voice IVR" flow looks like the one below

| ![Flowchart showing trigger options for incoming message, call, and REST API leading to SendCallToAgent step with workflow SID.](https://docs-resources.prod.twilio.com/29de2257bb9ce88a78b9c0e425e0d4f57c3a4969a46cc06c55df026431a13d1f.png) |
| --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |

(3) Add a Gather Input on Call widget to the flow before "Send to Flex" widget, like shown below to collect ticket number from the caller. Let's name this widget "*getTicketNumber*'

| ![Flowchart showing IVR process for gathering ticket number with options for user input and call routing.](https://docs-resources.prod.twilio.com/74ab362eb5b542b813a43877abbac3d7c67a80301650607ae7df8cc6f27b0e92.png) |
| ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |

(4) Add the ticket number as a Task Attribute in the Send to Flex widget, as shown below

![Configuration panel showing attributes for sending call to agent with Zendesk ticket number.](https://docs-resources.prod.twilio.com/4a1bda88eedeae420f98b0450b3215f39a897e06adbb3bb506ced8b3075d0086.png)

|   |
| - |

(5)The task attributes in "Send to Flex" widget after modification will look like the following

```javascript
{ "type": "inbound",
  "name": "{{trigger.call.From}}" ,
  "zd_ticket_id" : "{{widgets.getTicketNumber.Digits}}" }
```

(6) If you now call your Flex Number and supply the ticket number, you should have the Ticket screen displayed instead of a new ticket. For the scenario when no ticket number is provided in the above IVR, or an invalid ticket number is provided, you would still have a new ticket number created and displayed on the screen

> \[!NOTE]
>
> While the above example shows the approach to collect Ticket number in an IVR, the same approach can be applied to any other channel. For example, you can collect Ticket Number using a Messaging Bot in any text-based channel like SMS, WhatsApp or Webchat and pass that Ticket Number as "zd\_ticket\_id" task attribute to Flex.

## IVR Flow for Adding Custom Tags to Zendesk Ticket

You can add any custom tags identified during your customer engagement flow by adding those tags to a task attribute named "**zdCustomTags**" made available to you.

(1) Modify your Studio Flex Flow to identify tags you want to add the ticket. Approach to identify tags depends on your Business Logic, and can be done either by automated lookups to your backend, CRM, external API or by explicit questions to the Customer - whatever works best for you.

An example is shown below demonstrating adding tags identified in the Studio Flow using a lookup before Send to Flex widget is called. In this example, we used the Http Studio widget viz. `"tagCustomer"` and got a list of tags in the parameter `"tags"`

| ![HTTP request configuration with widget name 'tagCustomer' and GET method.](https://docs-resources.prod.twilio.com/399fef040e839c9d3ac6f087ddb89b20436e55bb57c0b6674bed72e1022b490b.png) |
| ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |

(2) Now add these tags to "zdCustomTags" task attribute in "Send to Flex" widget as shown below

| ![Flowchart showing call handling with getTicketNumber and tagCustomer steps, including attributes configuration.](https://docs-resources.prod.twilio.com/f7e22aca0f8ab3816c98defeacc4c435488edc43f78dd15a6db73f395b272159.png) |
| ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |

(3)The task attributes in "Send to Flex" widget after modification will look like the following

```javascript
{ "type": "inbound", 
"name": "{{trigger.call.From}}" ,
"zd_ticket_id" : "{{widgets.getTicketNumber.Digits}}" , 
"zdCustomTags": "[{{widgets.tagCustomer.parsed.args.tags}} ]"
}
```

(4) If you now call your Flex Number, you should see tags attached to the relevant Ticket, like shown below

| ![Zendesk ticket with tags including generatedbyflex and personalised, linked to Twilio Flex call interface.](https://docs-resources.prod.twilio.com/9e23221c69390b1715a9586966441319ed380ce29ca06b05abacf9e102726f62.png) |
| -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |

> \[!NOTE]
>
> "**zdCustomTags**" supports multiple tags, so you can pass a list of all the tags you want to add.
