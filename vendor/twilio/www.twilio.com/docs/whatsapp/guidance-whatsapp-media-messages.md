# Guidance on WhatsApp Media Messages

With the [Twilio API for WhatsApp](/docs/whatsapp), you can send images, video, text, and PDF files to create rich contextual conversations with your WhatsApp Users. This guide covers guidelines to follow when sending and receiving media messages through WhatsApp to ensure a smooth experience with your customers.

## Media Content Types

To send a [WhatsApp media message](/docs/whatsapp/tutorial/send-and-receive-media-messages-twilio-api-whatsapp), you must specify the `MediaUrl` parameter when making a request to the Twilio API for WhatsApp. Twilio checks the `content-type` header at the provided `MediaUrl` to validate the [content type](https://en.wikipedia.org/wiki/Internet_media_type) of the media file. If the `content-type` header does not match that of the media file, Twilio rejects the request.

## Message Size Limits

When you send an outbound WhatsApp message, the total message size must be under the maximum size limit for the channel. An API request with media or a collection of media larger than the size limit will fail with an error.

For a WhatsApp message, the maximum size limit is **16MB**. The size limit for images is only **5 MB**.

## Filenames and Captions

Currently, Twilio does not support setting a filename or caption for documents that are send as media messages over WhatsApp.

## Supported MIME Types

The Twilio API for WhatsApp supports sending and receiving **images, audio, PDF files, and video**. The following formats are currently supported:

* Images: JPG, JPEG, PNG, WEBP\*
* Audio: OGG\*\*, AMR, 3GP, AAC, MPEG
* Documents: PDF, DOC, DOCX, PPTX, XLSX
* Video: MP4 (with H.264 video codec and AAC audio)
* Contacts: vCard (.vcf)

\* **Note the following:**

* \*The `image/webp` MIME type is only used for WhatsApp stickers, which have additional requirements. See [support article](https://help.twilio.com/hc/en-us/articles/360017961894-Sending-and-Receiving-Media-with-WhatsApp-Messaging-on-Twilio) for more details.
* \*\*WhatsApp outbound OGG is only supported when the OGG file uses the opus audio codec. These files may have the `.ogg` or the `.opus` extension.
