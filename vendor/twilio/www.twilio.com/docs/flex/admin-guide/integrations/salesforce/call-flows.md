# Manage Flex-Salesforce call flows

Learn how to accept incoming calls from new and existing contacts and make outgoing calls from your Flex-Salesforce integration.

> \[!NOTE]
>
> Do you still need to set up your Flex-Salesforce Integration? Check out [our guide for configuring your Salesforce instance for Flex](/docs/flex/admin-guide/integrations/salesforce)!

## Manage an incoming call from a new contact

You can create new Contact records in your Salesforce environment from an inbound call, SMS, chat, or [any other communication channel](/docs/flex/developer/messaging) configured on your Twilio Flex Project.

Once you accept the incoming call, SMS, or other channel engagement, a popup will appear that allows you to create a new Contact record.

> \[!NOTE]
>
> You can change 'Contact' to any other object in your Salesforce environment by changing the **Call Center Softphone Layout > Screen Pop** Setting. See the [Softphone layout customization guide](/docs/flex/admin-guide/integrations/salesforce/customize#configure-the-softphone-layout-for-the-case-object) for an example.

## Manage an incoming call from an existing contact

Salesforce users can be automatically redirected to existing Contact records from inbound calls, SMS messages, chats, or any other communication channel configured on your Twilio Flex Project.

Once you accept the incoming call, SMS, or other channel engagement, a screen pop will trigger to the relevant Contact record.

![Salesforce search results for Abhijit with contact details and Twilio Flex chat window.](https://docs-resources.prod.twilio.com/aade80e630bcf997affa2149fad7d9d6639c1b54fcabfce5598d115f4a44657f.png)

If multiple search results are found for a given Task attribute used in the Salesforce search string, the screen pop will show all resulting records of the search.

![Search results for existing contacts (Salesforce Classic).](https://docs-resources.prod.twilio.com/f14a1694a0fbd311db8c7c0f61eb69adcde3e9c4f8029d3b8f786ea838f953d7.png)

## Switching task contexts

Your Flex-Salesforce integration can seamlessly handle multi-tasking when an agent has multiple records.

From your Salesforce account, initiate multiple inbound or outbound calls, SMS messages, chats, or any other communications channel configured on your Twilio Flex Project.

The Salesforce screen will change to the relevant object record as you select different tasks on the Flex screen. For instance, if you are chatting with Joey, you will see their information until you switch over to your call with Alex, at which point you'll see Alex's information on the screen instead.

In Salesforce classic, this looks like:

![Salesforce Classic interface with Twilio Flex sidebar showing active call with contact Joe Doe.](https://docs-resources.prod.twilio.com/f72b1857b73d207819453da3a0fffa3ffc707169f76f78d37b50f9cc9dd6d481.gif)

In Salesforce Lightning Experience, the context switching looks like this:

![Twilio Flex interface switching context in Salesforce Lightning for contact management.](https://docs-resources.prod.twilio.com/c844af26a812ce0f4670330d20a1db0cae76c21ab6908e4f8aea9addcbcf2e84.gif)

## Click-to-dial

You can click on any phone numbers in a phone number field in your Salesforce environment to initiate an outbound call.

## Auto-logged activities

As various events flow through Flex, activities are automatically logged in Salesforce.

![Comparison of Salesforce Lightning and Classic interfaces showing activity logging features.](https://docs-resources.prod.twilio.com/da070b5a4adf23a97b276187860d486949bf88bd9b76112c4370385b0619f9dc.png)

## Maximize your Flex view

You can maximize your Flex view by popping it out of the Softphone panel. This allows you to use the Flex-Salesforce integration outside of your Salesforce browser tab or even on a second monitor.

![Use the Flex-Salesforce integration in a pop-out window.](https://docs-resources.prod.twilio.com/dc51e4a767c82c15417156cd635d24cf0775062799cfadb6f2da5777ee7d8fc1.png)
