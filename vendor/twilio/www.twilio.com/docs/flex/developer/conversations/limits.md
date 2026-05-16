# File Attachments and API Limits

> \[!NOTE]
>
> Flex Conversations requires Flex UI 2.0.x. If you are on Flex UI 1.x.x, refer to the [Messaging in Flex](/docs/flex/developer/messaging) pages.

## File Attachments and API Limits

For enabling file attachments on your Flex account, see "How do I enable and configure file attachments?" in the [Conversations FAQ and Troubleshooting](/docs/flex/developer/conversations/faq-and-troubleshooting) page.

| Address Type            | Number of attachments | Max File Size (bytes) | Max Total File Size (bytes) | Accepted Extensions                                                                                |
| ----------------------- | --------------------- | --------------------- | --------------------------- | -------------------------------------------------------------------------------------------------- |
| web                     | 1                     | 16777216              | 67108864                    | "jpg", "jpeg", "png", "amr", "mp3", "mp4", "pdf", "heic", "txt", "gif"                             |
| sms                     | 1                     | 2097152               | 5242880                     | "jpg", "jpeg", "png", "amr", "mp3", "mp4", "pdf", "heic"                                           |
| whatsapp                | 1                     | 16777216              | 67108864                    | "jpg", "jpeg", "png", "amr", "mp3", "mp4", "pdf", "heic", "oga"                                    |
| email                   | 10                    | 157286400             | 157286400                   | "jpg", "jpeg", "png", "amr", "mp3", "mp4", "pdf", "heic", "txt", "gif"                             |
| messenger (public beta) | 1                     | 26214400              | 26214400                    | "jpg", "jpeg", "png", "mp3", "mp4", "pdf" Rich text, voice clips, and reactions are not supported. |

> \[!NOTE]
>
> You cannot send both text and an image in the same message (applies to all Flex Conversations channels).

### Conversations API Limits

See [**Conversations Limits**](/docs/conversations-classic/conversations-limits) for a detailed list on length, media, and other limits.

### Interactions Endpoint Limits

`GET` actions are not accessible for the API endpoints.

Due to various limitations and concerns, Flex Conversations will constrain certain actions.

## Rate limits on API endpoints

The Interactions API has a limit of **20 requests per second** **per endpoint per account**. The API returns an `HTTP 429` status when rate limits are exceeded and should be handled accordingly on the customer side.

### Webchats Endpoint Limits

The Flex Webchat orchestrator currently has a rate limit of **5 requests per second** beyond which the customer can get throttled. When exceeded, the API returns an `HTTP 429`.
