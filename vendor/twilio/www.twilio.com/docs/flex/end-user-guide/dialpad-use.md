# Use the Flex Dialpad

## Make an Outbound Call

1. In the default Flex UI, you should see a dialpad icon in the top right corner of the Flex UI. Start your outbound call by clicking the outbound call icon.

![Twilio Flex interface showing call transfer button highlighted.](https://docs-resources.prod.twilio.com/39c43f8352ebf9dcde8f95d4d5e81ea942b2248ecbf975601052cc4c684ffbb2.png)

2. Enter a phone number in the field labeled *Enter a Number* in the Flex Dialpad UI.
3. Once you've entered a number, the phone icon at the bottom of the Flex Dialpad UI should light up. Click the phone icon to make the call.

## Make a Call to Another Country

1. Open the Dialer as per the instructions for making an outbound call
2. Before entering a phone number, select the flag icon to see a dropdown menu of all countries and their country codes.
3. Select the appropriate country. Continue making an outbound call as normal. You can also enter the country code in the phone number field and the flag will be preselected automatically.

## Warm Transfer

A warm transfer is when you send a call to a colleague, but provide them with some context about the call before handing off the call completely. Warm transfers help ensure that your colleague understands the customer's problem and is equipped to solve it before you end your customer interaction. Make a call with the Dialpad, and once you're ready to transfer, you can follow [the standard procedure for a warm transfer](/docs/flex/end-user-guide/warm-transfer).

To leave the call, click the "leave call" at the top or at the bottom, keeping the other agent and customer talking.

## Cold Transfer to an Agent or Queue

A cold transfer is when you send a call directly to a colleague. This is relative to a warm transfer, which involves talking to your colleague about the nature of the call before handing it off to them.

1. Make a call using the native dialer
2. While the call is in progress, click the transfer arrow icon on the bottom of the dialer interface. If the arrow is not highlighted, then no other agents are currently able to accept the transfer.

![Flex call transfer button.](https://docs-resources.prod.twilio.com/966afc62b27bfc5b49bb5344bb6f91a4ce92cf7137411663c240d5308f5d986f.png)

3. You'll see a list of agents. Hover over the person to whom you'd like to transfer the call, or switch to the "Queue" tab and select the Queue to which you'd like to transfer the call.
4. Click the transfer arrow next to the agent or Queue's name to transfer the call.

> \[!NOTE]
>
> When you cold transfer to another Agent (Agent B) and Agent B rejects or ignores the Reservation, the Task will be routed to another Agent using the Workflow that found you. The Task will use the routing conditions to find the most suitable agent to whom it can offer the task. This means it could be re-offered to any available agent who can receive tasks on that workflow, including you if you haven't taken another call or changed to an `unavailable` status.

5. The call should connect to the other agent. Your call will end and your task will now be in wrap-up state. Your colleague will stay connected to the caller and continue the conversation.
