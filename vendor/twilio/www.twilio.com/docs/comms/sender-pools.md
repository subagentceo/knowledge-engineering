# Sender Pools

## Sender Pools

Sender Pools allow you to group multiple senders, such as phone numbers, short codes, WhatsApp senders, and RCS senders into a single resource. This enables you to scale your messaging campaigns, optimize throughput, and ensure reliable delivery across channels.

Sender Pools are independent of Messaging Service sender pools. You can use Sender Pools as an additional, flexible abstraction layer for grouping senders. Unlike Messaging Services, a single sender can belong to more than one Sender Pool. Continue associating your senders with Messaging Services to meet A2P 10DLC compliance requirements in the United States.

### Find your Sender ID

Every sender (such as a phone number, RCS sender, WhatsApp sender, or email sender) is represented by a **Sender** in the Communications API. Twilio automatically creates Senders for the senders in your account. To add senders to a Sender Pool, you first need to retrieve their `sender_id`.

#### Retrieve all Senders

You can retrieve a list of all your Senders using the following API request. You can use this endpoint to retrieve `activated` Senders that can send messages:

```bash
curl -X GET 'https://comms.twilio.com/v1/Senders?status=ACTIVATED' \
--header 'Content-Type: application/json' \
-u $TWILIO_ACCOUNT_SID:$TWILIO_AUTH_TOKEN
```

This request returns a list of senders, including each `senderId`. Look for the `id` field in the response to find the `senderId` you need.

**Sample response**:

```json
{
    "senders": [
        {
            "id": "comms_sender_01h9krwprkeee8fzqspvwy6nq8",
            "displayName": "Cool Support",
            "channel": "EMAIL",
            "address": "support@coolcompany.com",
            "status": "ACTIVATED",
            "tags": {},
            "createdAt": "2022-08-24T14:15:22Z",
            "updatedAt": "2023-09-13T12:00:24Z"
        },
        {
            "id": "comms_sender_01h9krwprkeee8fzqspvwy6nq8",
            "displayName": "Cool Support",
            "channel": "SMS",
            "address": "+12034458910",
            "status": "ACTIVATED",
            "tags": {},
            "createdAt": "2022-08-24T14:15:22Z",
            "updatedAt": "2023-09-13T12:00:24Z"
        },
        {
            "id": "comms_sender_01h9krwprkeee8fzqspvwy6nq8",
            "displayName": "Cool Support",
            "channel": "RCS",
            "address": "coolsupport_x12gb_agent",
            "status": "ACTIVATED",
            "tags": {},
            "createdAt": "2022-08-24T14:15:22Z",
            "updatedAt": "2023-09-13T12:00:24Z"
        }
    ],
    "pagination": {
        "next": null,
        "self": "https://comms.twilio.com/v1/Senders"
    }
}
```

**Note**: `ACTIVATED` means the sender is approved and compliant. Use the above payload to filter for only those with this status.

For more information, see the Senders API reference.

## Create a Sender Pool

Once you have the `senderId` values for the senders you want to group, you can create a Sender Pool. Use the following API request to create a new pool:

```bash
curl -X POST 'https://comms.twilio.com/v1/SenderPools' \
--header 'Content-Type: application/json' \
--data '{
    "name": "My First Pool",
    "senders": [
        { "senderId": "comms_sender_123" },
        { "senderId": "comms_sender_456" }
    ]
}' \
-u $TWILIO_ACCOUNT_SID:$TWILIO_AUTH_TOKEN
```

## Retrieve a Sender Pool ID

```bash
curl -X GET 'https://comms.twilio.com/v1/SenderPools' \
--header 'Content-Type: application/json' \
-u $TWILIO_ACCOUNT_SID:$TWILIO_AUTH_TOKEN
```

**Sample response**:

```json
{
   "senderPools": [
       {
           "id": "comms_senderpool_01h9krwprkeee8fzqspvwy6nq8",
           "name": "string",
           "tags": {},
           "createdAt": "2019-08-24T14:15:22Z",
           "updatedAt": "2019-08-24T14:15:22Z"
       }
   ],
   "pagination": {
        "next": null,
        "self": "https://comms.twilio.com/v1/SenderPools"
   }
}
```

## Send using a Sender Pool

You can send messages using a Sender Pool by specifying the `senderPoolId` in your API request. This allows you to leverage the grouped senders for message delivery.

When you configure multiple Senders, Twilio selects one of them to deliver your message. If the sender configuration includes both an RCS sender and an SMS-capable phone number, Twilio first attempts to send the message via RCS to recipients whose devices support it.

```bash
curl -X POST 'https://comms.twilio.com/v1/Messages' \
--header 'Content-Type: application/json' \
--data '{
    "from": {
        "senderPoolId": "comms_senderpool_123"
    },
    "to": [
        {
            "address": "+19143188062",
            "channel": "PHONE"
        },
        {
            "address": "+19143188063",
            "channel": "WHATSAPP"
        }
    ],
    "content": {
        "text": "Hello, World!"
    }
}' \
-u $TWILIO_ACCOUNT_SID:$TWILIO_AUTH_TOKEN
```

## Next steps

* See the [Troubleshooting Guide](./comms/troubleshooting) for guidance on resolving common Communications API issues.
* Learn more about the [Twilio Communications API Events](./comms/events) to track message delivery, failures, and operational status in real-time.
