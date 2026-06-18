# Accepted content types for media

This document describes the MIME types and size limits Twilio accepts when you send media through the Programmable Messaging API over MMS, RCS, or WhatsApp.

To [send a media message](/docs/messaging/tutorials/how-to-send-sms-messages), include the `MediaUrl` parameter in your request to the Programmable Messaging API. Twilio issues `GET` and `HEAD` requests to the `MediaUrl` to validate the file's `Content-Type` header. If the header value does not match the actual media type, Twilio rejects the request.

## Media size limits

When you send an outbound message, the combined size of the message and its media must stay below the channel's maximum limit. Twilio returns an error if any file—or the collection of files—exceeds that limit.

* MMS: **5 MB**
* RCS: **16 MB**\
  If an RCS message falls back to MMS, Twilio rejects bodies larger than the MMS limit (5 MB).
* WhatsApp: **16 MB**

## Include the `Content-Disposition` header

Add a `Content-Disposition` header so recipients see the correct file name:

```http
Content-Disposition: inline; filename="<EXPECTED_FILENAME>.<EXTENSION>"
```

## Media file-name guidelines

* Don't use spaces.
* Keep file names to 20 characters or less.
* Avoid most special characters, such as `~ ! @ # $ % ^ & * ( ) [ ] { }`.

> \[!WARNING]
>
> Carrier-specific MMS size limitations for **non-image** files are documented in [this Help Center article](https://help.twilio.com/hc/en-us/articles/360018832773-Twilio-Programmable-SMS-Supported-File-Types-and-Size-Limits-for-MMS-Media-Messages).

> \[!NOTE]
>
> For RCS, text can only be combined with media as part of a rich card.

| **MIME-type category** | **MIME type**                                                                                                                                                                                        | **MMS** | **RCS** | **WhatsApp** | **Can combine with text in** |
| :--------------------- | :--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | :------ | :------ | :----------- | :--------------------------- |
| **Images**             | image/jpeg                                                                                                                                                                                           | Yes     | Yes     | Yes          | MMS, RCS, WhatsApp           |
|                        | image/jpg                                                                                                                                                                                            | Yes     | Yes     | Yes          | MMS, RCS, WhatsApp           |
|                        | image/gif                                                                                                                                                                                            | Yes     | Yes     | Yes          | MMS, RCS                     |
|                        | image/png                                                                                                                                                                                            | Yes     | Yes     | Yes          | MMS, RCS, WhatsApp           |
|                        | image/heic                                                                                                                                                                                           | Yes     | No      | Yes          | MMS                          |
|                        | image/heif                                                                                                                                                                                           | Yes     | No      | Yes          | MMS                          |
|                        | image/tiff                                                                                                                                                                                           | Yes     | No      | Yes          | MMS                          |
|                        | image/bmp                                                                                                                                                                                            | Yes     | No      | Yes          | MMS                          |
|                        | image/webp <br /> The `image/webp` type is used only for WhatsApp stickers, which have additional requirements. See the [WhatsApp FAQ](https://faq.whatsapp.com/219571822467807) for details. <br /> | No      | No      | Yes          | WhatsApp                     |
| **Video**              | video/mpeg4                                                                                                                                                                                          | Yes     | Yes     | Yes          | MMS, RCS                     |
|                        | video/mp4                                                                                                                                                                                            | Yes     | Yes     | Yes          | MMS, RCS, WhatsApp           |
|                        | video/mpeg                                                                                                                                                                                           | Yes     | Yes     | Yes          | MMS, RCS                     |
|                        | video/webm                                                                                                                                                                                           | Yes     | Yes     | Yes          | MMS, RCS                     |
|                        | video/quicktime                                                                                                                                                                                      | Yes     | No      | Yes          | MMS                          |
|                        | video/3gpp                                                                                                                                                                                           | Yes     | No      | Yes          | MMS                          |
|                        | video/3gpp2                                                                                                                                                                                          | Yes     | No      | Yes          | MMS                          |
|                        | video/3gpp-tt                                                                                                                                                                                        | Yes     | No      | Yes          | MMS                          |
|                        | video/H261                                                                                                                                                                                           | Yes     | No      | Yes          | MMS                          |
|                        | video/H263                                                                                                                                                                                           | Yes     | Yes     | Yes          | MMS, RCS                     |
|                        | video/H263-1998                                                                                                                                                                                      | Yes     | No      | Yes          | MMS                          |
|                        | video/H263-2000                                                                                                                                                                                      | Yes     | No      | Yes          | MMS                          |
|                        | video/H264                                                                                                                                                                                           | Yes     | No      | Yes          | MMS                          |
|                        | video/H265                                                                                                                                                                                           | Yes     | No      | Yes          | MMS                          |
| **Audio**              | audio/ogg                                                                                                                                                                                            | Yes     | Yes     | Yes          | MMS, WhatsApp                |
|                        | audio/mpeg                                                                                                                                                                                           | Yes     | Yes     | Yes          | MMS, WhatsApp                |
|                        | audio/mp4                                                                                                                                                                                            | Yes     | Yes     | Yes          | MMS                          |
|                        | audio/mp3                                                                                                                                                                                            | Yes     | Yes     | Yes          | MMS                          |
|                        | audio/3gpp                                                                                                                                                                                           | Yes     | Yes     | Yes          | MMS, WhatsApp                |
|                        | audio/3gpp2                                                                                                                                                                                          | Yes     | No      | Yes          | MMS                          |
|                        | audio/basic                                                                                                                                                                                          | Yes     | No      | Yes          | MMS                          |
|                        | audio/L24                                                                                                                                                                                            | Yes     | No      | Yes          | MMS                          |
|                        | audio/vnd.rn-realaudio                                                                                                                                                                               | Yes     | No      | Yes          | MMS                          |
|                        | audio/vnd.wave                                                                                                                                                                                       | Yes     | No      | Yes          | MMS                          |
|                        | audio/ac3                                                                                                                                                                                            | Yes     | No      | Yes          | MMS, WhatsApp                |
|                        | audio/webm                                                                                                                                                                                           | Yes     | No      | Yes          | MMS                          |
|                        | audio/amr-nb                                                                                                                                                                                         | Yes     | No      | Yes          | MMS                          |
|                        | audio/amr                                                                                                                                                                                            | Yes     | No      | Yes          | MMS, WhatsApp                |
| **Text**               | text/vcard                                                                                                                                                                                           | Yes     | No      | Yes          | MMS                          |
|                        | text/x-vcard                                                                                                                                                                                         | Yes     | No      | Yes          | MMS, WhatsApp                |
|                        | text/directory                                                                                                                                                                                       | Yes     | No      | Yes          | MMS                          |
|                        | text/csv                                                                                                                                                                                             | Yes     | No      | Yes          | MMS                          |
|                        | text/richtext                                                                                                                                                                                        | Yes     | No      | Yes          | MMS                          |
|                        | text/rtf                                                                                                                                                                                             | Yes     | No      | Yes          | MMS                          |
|                        | text/calendar                                                                                                                                                                                        | Yes     | No      | Yes          | MMS                          |
| **Application**        | application/pdf                                                                                                                                                                                      | Yes     | Yes     | Yes          | MMS, WhatsApp                |
|                        | application/vcard                                                                                                                                                                                    | Yes     | No      | Yes          | WhatsApp                     |
|                        | application/msword                                                                                                                                                                                   | No      | No      | Yes          | WhatsApp                     |
|                        | application/vnd.ms-excel                                                                                                                                                                             | No      | No      | Yes          | WhatsApp                     |
|                        | application/vnd.ms-powerpoint                                                                                                                                                                        | No      | No      | Yes          | WhatsApp                     |
|                        | application/vnd.openxmlformats-officedocument.presentationml.presentation                                                                                                                            | No      | No      | Yes          | WhatsApp                     |
|                        | application/vnd.openxmlformats-officedocument.spreadsheetml.sheet                                                                                                                                    | No      | No      | Yes          | WhatsApp                     |
|                        | application/vnd.openxmlformats-officedocument.wordprocessingml.document                                                                                                                              | No      | No      | Yes          | WhatsApp                     |
