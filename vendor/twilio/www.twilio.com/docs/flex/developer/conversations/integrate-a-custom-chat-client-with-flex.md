# Integrate a Custom Chat Client with Flex

> \[!NOTE]
>
> Flex Conversations requires Flex UI 2.0.x. If you are on Flex UI 1.x.x, refer to the [Messaging in Flex](/docs/flex/developer/messaging) pages.

You may have already built a custom chat experience with [Twilio Conversations](/docs/conversations-classic) or you are looking to build from scratch. You can integrate these chat experiences with Flex and hand off incoming Conversation messages to your agents.

> \[!NOTE]
>
> We have an [open source demo chat application](https://github.com/twilio/twilio-webchat-react-app) available to get you started. Refer to the README file for more information about the features offered in that example application and how it works.

## Example Chat Integration with Conversations

The following diagram illustrates one potential way of integrating your Chat application with Flex:

![Flowchart showing chat integration with Flex, involving Conversations SDK, Backend App, and FlexUI 2.0.](https://docs-resources.prod.twilio.com/e92a57a72cc22f3c5630b3dd8e0c80aa6260961625d2abcc401b94c60c6dfcc8.png)

1. Your application needs to initialize the *Twilio Conversations SDK* [with an *Access Token*](/docs/conversations-classic/create-tokens) and a *Conversation SID*. These should be obtained from your backend. This is outside the scope of this guide and you can get more information from the Twilio Conversations client applications' quickstart.
2. Your backend will typically use the Twilio server-side SDK but for the purposes of this guide, we will utilize curl for our Conversations API requests:
   1. Create a Conversation using the [Twilio Conversations API](/docs/conversations-classic/api).

      ```bash
      curl -X POST https://conversations.twilio.com/v1/Conversations \
      --data-urlencode "MessagingServiceSid=MGXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX" \
      --data-urlencode "FriendlyName=My First Custom Chat Conversation" \
      -u $TWILIO_ACCOUNT_SID:$TWILIO_AUTH_TOKEN
      ```

      ```bash
      SID                                 Chat Service SID                    Friendly Name                      Date Created
      CH1cbf85a0e7c844fca4cb4d2fad880196  IScf002bd40e59480bb62024d8fa161dbb  My First Custom Chat Conversation  Feb 17 2022 17:01:06 GMT-0800
      ```
   2. Add a participant to the conversation. Use the SID of the conversation that you created in the previous step. Make sure the identity uniquely identifies your end user and avoid using personally identifiable information (PII) like names.

      ```bash
      twilio api:conversations:v1:conversations:participants:create \
          --conversation-sid=CH1cbf85a0e7c844fca4cb4d2fad880196 \
          --identity=customer
      ```

      ```bash
      SID                                 Messaging Binding
      MBb3469eabc7d040dbadc89a7876eb263f  null
      ```
   3. Add a scoped webhook with "studio" as the target using the [Conversations Webhook endpoint](/docs/conversations-classic/api/conversation-scoped-webhook-resource). With a scoped webhook set to Studio and the configuration filter set to "onMessageAdded", any message that is added to the conversation will invoke the "Incoming Conversation" trigger on the specified Studio flow.

      ```bash
      twilio api:conversations:v1:conversations:webhooks:create --target=studio --configuration.flow-sid=FWd945421fea3b172bb9c5889a22d2f410 --configuration.filters='onMessageAdded' --conversation-sid=CH1cbf85a0e7c844fca4cb4d2fad880196
      ```

      ```bash
      SID                                 Target
      WH3bd00957227d499991c9a4ce5cd303e9  studio
      ```
3. Now the Conversations SDK is initialized. Your participant can send a message.
4. Your app makes use of the Conversations SDK to send the message. For the purposes of this guide, we will use the Twilio CLI to send a message on behalf of your participant. It's important to specify the `x-twilio-webhook-enabled` property to ensure any scoped or service webhooks are invoked.

   ```bash
   twilio api:conversations:v1:conversations:messages:create --author=customer --body=hello --conversation-sid=CH1cbf85a0e7c844fca4cb4d2fad880196 --x-twilio-webhook-enabled=true 
   ```
5. When the first message is sent, it will trigger the Studio Flow you set in step 2.3.
6. The Conversations Service will find your conversation and send an "onMessageAdded" event to your Studio Flow.
7. In your flow, you need to use the **Send To Flex** widget to route your participant, "customer" in this case, to an agent on Flex. Under the hood, the **Send To Flex** widget invokes the Interactions API to create a task and have it routed. Here's an example Interactions API `POST` request that **Send To Flex** makes (you don't need to do this since Studio does it on your behalf when you set Studio as the target for "onMessageAdded"):

   ```bash
   CHANNEL=$(cat << EOF
   {
       "type": "web",
       "initiated_by": "Customer",
       "properties": {
           "media_channel_sid": "CHXXX"
           }
   }
   EOF
   )

   ROUTING=$(cat << EOF
   {
       "type": "TaskRouter",
       "properties": {
           "workspace_sid": "WSXXX",
           "workflow_sid": "WWXXX",
           "attributes": {
               "channelType": "web",
               "from": "customer"
           }
       }
   }
   EOF
   )

   curl -X POST "https://flex-api.twilio.com/v1/Interactions" \
   --data-urlencode "Channel=$CHANNEL" \
   --data-urlencode "Routing=$ROUTING" \
   -u $TWILIO_ACCOUNT_SID:$TWILIO_AUTH_TOKEN
   ```
8. The Flex agent will get a task reservation and when they accept it, they will get added to the same conversation.
