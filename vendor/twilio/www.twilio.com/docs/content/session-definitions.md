# Session Definitions

## User-Initiated Session

Also known as In-Session. User-Initiated Sessions are initiated by a user sending a message. After the recipient replies to a message or if the user is the first party to send a message, messages are considered in session for the next 24 hours. In session messages don't always have to have WhatsApp approval. Please see the table below for details. Additionally, using the Content API for Facebook Messenger is only available for User-Initiated Sessions.

## Business-Initiated Sessions

Also known as outbound or Out-of-Session. Business Initiated Sessions are initiated by a company sending a message without the recipient first messaging them. By default, to send outbound messages to WhatsApp users, template approval by WhatsApp is required. This is done as a separate API request via the Content API. Business Initiated Sessions are only allowed on WhatsApp currently. Some content types are not allowed to be outbound messages such as list-picker and location.

## WhatsApp Approval Requirements

|                         | **WhatsApp Session Type**                                                                        |                                                                                       |
| ----------------------- | ------------------------------------------------------------------------------------------------ | ------------------------------------------------------------------------------------- |
| **Twilio Content Type** | **User Initiated: 24 hour customer service window** (initiated by inbound message)               | **Business Initiated: Out of Session** (initiated by a business - no inbound message) |
| twilio/text             | ✅ Can reply to inbound messages                                                                  | ⚠️ Template approval required to send outbound messages                               |
| twilio/media            | ✅ Can reply to inbound messages                                                                  | ⚠️ Template approval required to send outbound messages                               |
| twilio/location         | ✅ Can reply to inbound messages                                                                  | ❌ Not supported                                                                       |
| twilio/call-to-action   | ⚠️ Template approval may be required to reply to inbound messages based on buttons types present | ⚠️ Template approval required to send outbound messages                               |
| twilio/quick-reply      | ✅ Can reply to inbound messages                                                                  | ⚠️ Template approval required to send outbound messages                               |
| twilio/list-picker      | ✅ Can reply to inbound messages                                                                  | ❌ Not supported                                                                       |
| twilio/card             | ⚠️ Template approval may be required to reply to inbound messages based on buttons types present | ⚠️ Template approval required to send outbound messages                               |
| twilio/carousel         | ⚠️ Template approval required to reply to inbound messages                                       | ⚠️ Template Approval Required to send outbound messages                               |
| twilio/catalog          | ✅ Can reply to inbound messages                                                                  | ⚠️ Template Approval Required to send outbound messages                               |
| twilio/flows            | ⚠️ Template approval required to reply to inbound messages                                       | ⚠️ Template Approval Required to send outbound messages                               |
| whatsapp/card           | ⚠️ Template approval may be required to reply to inbound messages based on buttons types present | ⚠️ Template approval required to send outbound messages                               |
| whatsapp/authentication | ⚠️ Template approval required to reply to inbound messages                                       | ⚠️ Template approval required to send outbound messages                               |
