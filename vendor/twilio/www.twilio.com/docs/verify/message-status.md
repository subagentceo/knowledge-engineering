# Message Status Stream

## Message status events

The message status stream provides real-time information on the delivery status of messages sent from your Verify Service. By subscribing to specific message status events, you can identify and respond to issues impacting message delivery by carriers. The message status stream is equivalent to the outbound message event's stream provided by Twilio Programmable Messaging.

## Event types

You can subscribe to five message status events through Event Streams:

| Event type          | Event type string                                       | Description and timing                                                                                                                                                        |
| ------------------- | ------------------------------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Message sent        | `com.twilio.accountsecurity.verify.message.sent`        | This event fires when the messaging channel provider accepts the message for downstream processing. Delivery is not yet confirmed.                                            |
| Message delivered   | `com.twilio.accountsecurity.verify.message.delivered`   | This event fires when the channel provider confirms successful delivery to the end user.                                                                                      |
| Message read        | `com.twilio.accountsecurity.verify.message.read`        | This event fires when the messaging channel provider confirms the end user opened or read the message. Not available for the SMS channel.                                     |
| Message undelivered | `com.twilio.accountsecurity.verify.message.undelivered` | This event fires when the channel provider reports that the message could not be delivered to the end user.                                                                   |
| Message failed      | `com.twilio.accountsecurity.verify.message.failed`      | This event fires when the messaging channel provider reports that message delivery failed. The provider doesn't make further delivery attempts unless you send a new attempt. |

## Sample event payload

```json title="Delivered"
[
  {
    "specversion": "1.0",
    "type": "com.twilio.accountsecurity.verify.message.delivered",
    "source": "/v1/Accounts/ACaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa/Services/VAaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa/Verifications/VEaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",
    "id": "ea3f13068cb622aa37b0e1f6d88bed4095c7fb07f31d9aeb60f8d1800f02fe38",
    "dataschema": "https://events-schemas.twilio.com/AccountSecurity.MessageStatusEvent/1",
    "datacontenttype": "application/json",
    "time": "2026-02-17T09:20:25.336Z",
    "data": {
      "channel": "SMS",
      "verification_sid": "VEaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",
      "to": "+919999999999",
      "mcc": "272",
      "number_segments": 1,
      "created_at": "2026-02-17T09:20:25.336Z",
      "account_sid": "ACaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",
      "attempt_sid": "VLaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",
      "has_fallback": false,
      "mnc": "05",
      "is_fallback": false,
      "service_sid": "VAaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",
      "message_status": "DELIVERED",
      "tags": {
        "custom_tag": "test tag 1",
        "another_tag": "test tag 2"
      }
    }
  }
]
```

## Event resource properties

| Property           | Type      | Description                                                                                                                                                                                 |
| ------------------ | --------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `account_sid`      | `string`  | The SID of the Account that is sending the message.                                                                                                                                         |
| `service_sid`      | `string`  | The unique SID identifier of the Verify Service that is sending the message.                                                                                                                |
| `verification_sid` | `string`  | The unique SID identifier of the OTP verification to which the messages belong.                                                                                                             |
| `channel`          | `string`  | The messaging channel used to send a message. Supported channels include SMS, WhatsApp, RCS, and Voice.                                                                                     |
| `created_at`       | `string`  | The date and time that the message started to be processed in ISO 8601 format.                                                                                                              |
| `message_status`   | `string`  | The message status, which is equivalent to a delivery receipt reported to Verify by the messaging channel provider. It can be one of: `DELIVERED`, `UNDELIVERED`, `SENT`, `READ`, `FAILED`. |
| `to`               | `string`  | The destination phone number in E.164 format.                                                                                                                                               |
| `mcc`              | `string`  | The Mobile Country Code that uniquely identifies the destination country for the message.                                                                                                   |
| `mnc`              | `string`  | The Mobile Network Code which uniquely identifies the destination network for the message.                                                                                                  |
| `number_segments`  | `integer` | The number of segments used to send the message.                                                                                                                                            |
| `attempt_sid`      | `string`  | The unique SID identifier of the Verification Attempt. There is one primary message per attempt.                                                                                            |
| `has_fallback`     | `boolean` | Indicates whether an alternate channel fallback is available if the message status is `FAILED` or `UNDELIVERED`.                                                                            |
| `is_fallback`      | `boolean` | Indicates whether the message is a fallback from a previous message.                                                                                                                        |
| `tags`             | `object`  | The set of custom tags added to the message attempt when including the tags parameter in the [Start New Verification](/docs/verify/api/verification#start-new-verification) endpoint        |
