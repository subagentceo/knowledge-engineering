# Errors

While interacting with the Twilio SendGrid API, you could receive the following list of errors. Each error returns an HTTP `400` status.

## Personalizations errors

To learn how to use `personalizations`, see the Twilio [Personalizations documentation][].

### `personalizations`

| Error message                                                                                                                                                                                             | Details                                                                                                       |
| --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------- |
| The personalization block is limited to 1000 personalizations per API request. You have provided \[n] personalizations. Please consider splitting this into multiple requests and resending your request. | Limits the individual personalizations objects per request to 1,000.                                          |
| You must have at least one personalization.                                                                                                                                                               | Include at least one recipient email address.                                                                 |
| There is a limit of 1000 total recipients (to + cc + bcc) per request.                                                                                                                                    | Limits the total number of email recipients (`to`, `cc`, and `bcc`) to 1,000.                                 |
| Each `to` object must at least have an email address and may also contain a name. e.g. `{"email": "example@example.com"}` or `{"email": "example@example.com", "name": "Example Recipient"}`              | Include one valid recipient email address for each recipient of your email includes but don't require a name. |
| Each unique email address in the `personalizations` array should only be included once. You have included email address more than once.                                                                   | Prevents delivery of the same email to one recipient multiple times.                                          |
| The to parameter is required for all personalization objects.                                                                                                                                             | Requires one `to` email object with a valid email address in the `personalizations` array.                    |

### `personalizations.bcc`

| Error message                                                                                                                                                                                                                                         | Details                                                                                                                              |
| ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------ |
| The `bcc` array, when used, must at least have an `email` parameter with a valid email address and it may also contain a `name` parameter. e.g. `{"email": "example@example.com"}` or `{"email": "example@example.com", "name": "Example Recipient"}` | Include one valid recipient email address for each blind carbon copy of your email. Recipient addresses don't require a name.        |
| Each recipient object must at least have an email address and may also contain a name. e.g. `{"email": "example@example.com"}` or `{"email": "example@example.com", "name": "Example Recipient"}`                                                     | Provide every recipient listed in the `personalizations.bcc` array in the form of an email object including one valid email address. |
| Each unique email address in the personalization block should only be included once. You have included email address more than once.                                                                                                                  | Prevents delivery of the same email to one recipient multiple times.                                                                 |

### `personalizations.cc`

| Error message                                                                                                                                                                                                                                         | Details                                                                                                                             |
| ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------- |
| The `bcc` array, when used, must at least have an `email` parameter with a valid email address and it may also contain a `name` parameter. e.g. `{"email": "example@example.com"}` or `{"email": "example@example.com", "name": "Example Recipient"}` | Include one valid recipient email address in each carbon copy of your email. Recipient addresses don't require a name.              |
| Each recipient object must at least have an email address and may also contain a name. e.g. `{"email": "example@example.com"}` or `{"email": "example@example.com", "name": "Example Recipient"}`                                                     | Provide every recipient listed in the `personalizations.cc` array in the form of an email object including one valid email address. |
| Each unique email address in the personalization block should only be included once. You have included email address more than once.                                                                                                                  | Prevents delivery of the same email to one recipient multiple times.                                                                |

### `personalizations.custom_args`

| Error message                                                                                                          | Details                                                                                                                                                                                                       |
| ---------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| All values of custom arguments object must be strings                                                                  | Limits the data type of custom arguments to strings. Custom arguments can't be integer, array, or Boolean data types.                                                                                         |
| `custom_args` can't be empty.                                                                                          | Include at least one value for the `custom_args` parameter. If you don't want to use any custom arguments, omit the `custom_arg` parameter from your request.                                                 |
| The combined size of both global and personalization custom arguments may not exceed 50,000 bytes per personalization. | Merges `personalizations[x].custom_args` with `custom_args` message level. This overrides any conflicting keys. Total size of the merged custom arguments for each personalization can't exceed 50,000 bytes. |

To learn more about how to use custom arguments, see \[Unique Arguments documentation]\[].

### `personalizations.headers`

| Error message                                                   | Details                                                                                                                                                                                    |
| --------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| All values of the headers object must be strings.               | Limits the data type of each header value to strings. Headers can't be integer, array, or Boolean data types.                                                                              |
| The headers can't contain duplicate keys.                       | Requires a unique header key.                                                                                                                                                              |
| Header keys can't contain non-ASCII characters or empty spaces. | Limits the name for header key label to ASCII characters.                                                                                                                                  |
| Header can't be one of the reserved keys.                       | Reserves terms for header keys labels: `x-sg-id`, `x-sg-eid`, `received`, `dkim-signature`, `Content-Type`, `Content-Transfer-Encoding`, `To`, `From`, `Subject`, `Reply-To`, `CC`, `BCC`. |

### `personalizations.send_at`

| Error message                                                                                                                                           | Details                                                                                                                              |
| ------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------ |
| The `send_at` parameter is expecting a UNIX timestamp as an integer. We will send immediately if you include a `send_at` timestamp that is in the past. | Accepts a UNIX timestamp for the scheduled send time. To send your email message when you make the API request, omit this parameter. |
| Scheduling more than 72 hours in advance is forbidden.                                                                                                  | Limits scheduled time of your email to 72 hours after your API request.                                                              |

To learn scheduling parameters, see the [API Reference][].

### `personalizations.subject`

| Error message                                                                                              | Details                                                                                                                                              |
| ---------------------------------------------------------------------------------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------- |
| The subject of your email must be a string at least one character in length.                               | Requires a subject for every email message you send with a minimum length of one character.                                                          |
| The subject is required. You can get around this requirement if you use a template with a subject defined. | Set a subject using one of three methods: use a template with a subject, define a global subject, or add a subject to every personalizations object. |

### `personalizations.substitutions`

| Error message                                                                                   | Details                                                                                                                                                     |
| ----------------------------------------------------------------------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------- |
| The substitution values must be an object of key/value pairs, where the values are all strings. | Write substitutions with the pattern `"substitution_tag": "value to substitute"`. The "substitution\_tag" data type must always be a string.                |
| You are limited to 10,000 substitutions.                                                        | Limit substitutions to a maximum of 50,000 bytes per request. Substitutions apply to the email content, the `subject` parameter, and `reply_to` parameters. |
| Substitutions are limited to 150 items per personalization block.                               | Limits each personalization block to 150 substitutions.                                                                                                     |

### `personalizations.to`

| Error message                                                                                                                                                                                                                            | Details                                                                           |
| ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | --------------------------------------------------------------------------------- |
| The `to` array must at least have an `email` parameter with a valid email address and it may also contain a `name` parameter. e.g. `{"email": "example@example.com"}` or `{"email": "example@example.com", "name": "Example Recipient"}` | Include at least one valid recipient email address, but not a corresponding name. |

To learn how to use `personalizations` to define who you want to send your email to, see the Twilio [Personalizations documentation][].

## Advanced Subscription Management errors

To learn more, see the [Unsubscribe Groups](/docs/sendgrid/ui/sending-email/create-and-manage-unsubscribe-groups) documentation.

### `asm.group_id`

Unsubscribe groups record which emails your recipients want to receive. Add the `asm.group_id` in your request to group your email with other, similar sends.

| Error message                                                                                  | Details                                                     |
| ---------------------------------------------------------------------------------------------- | ----------------------------------------------------------- |
| The ASM group ID must be an integer.                                                           | Limits the data type of `asm.group_id` to an integer value. |
| The ASM group ID must be a valid Group ID on your account. You provided `[YOUR ASM GROUP ID]`. |                                                             |

### `asm.groups_to_display`

| Error message                                                                                         |
| ----------------------------------------------------------------------------------------------------- |
| The ASM Group IDs to display must be an array of integers.                                            |
| All ASM groups to display must be valid ASM groups IDs on your account. You provided `{invalid IDs}`. |
| There is a limit of 25 unsubscribe groups that can be displayed to a user at a time.                  |

## Attachment errors

### `attachments.contents`

| Error message                                                             |
| ------------------------------------------------------------------------- |
| The attachment content must be base64 encoded.                            |
| The attachment content must be a string at least one character in length. |

### `attachments.content_id`

| Error message                                                                         | Details                                                                                                                                                 |
| ------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------- |
| The content ID of your attachment must be a string. You provided `[YOUR CONTENT ID]`. | Limits the data type of the content ID to a string value. Use the content ID as the image filename. For example, `<img src="cid:ii_139db99fdb5c3704"/>` |
| The content ID of your attachment can't contain CRLF characters.                      | Prohibits the characters `;`, `\`, `n`, or `r` in the `content_id`.                                                                                     |

### `attachments.disposition`

| Error message                                                                                                 | Details                                                                                                                                                                                                  |
| ------------------------------------------------------------------------------------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| The disposition of your attachment can be either "inline" or "attachment". You provided `[YOUR DISPOSITION]`. | Choose how you display your attachment. Use `"inline"` to display the attached file in the message. Use `"attachment"` to require an action to display the attached file like opening or downloading it. |

### `attachments.filename`

| Error message                                                  | Details                                                                          |
| -------------------------------------------------------------- | -------------------------------------------------------------------------------- |
| The filename of your attachment must be a string.              |                                                                                  |
| The filename of your attachment can't contain CRLF characters. | Prohibits the characters `;`, `,`, `n`, or `r` in `filename` of your attachment. |
| filename is required.                                          | Requires a filename for your attachment.                                         |

### `attachments.type`

| Error message                                                              | Details                                                                      |
| -------------------------------------------------------------------------- | ---------------------------------------------------------------------------- |
| The attachment type must be a string and at least one character in length. |                                                                              |
| The type can't contain ';', or CRLF characters.                            | Prohibits the characters `;`, `,`, `n`, or `r` in `type` of your attachment. |

## Batch ID errors

To generate a `batch_id`, use the [API][Create a Batch ID]. Twilio doesn't generate it for you. To learn more about batch IDs, see the [API Reference][api-schedule-send].

| Error message                   | Details                                                 |
| ------------------------------- | ------------------------------------------------------- |
| The batch\_id must be a string. | Limits the data type of the batch ID to a string value. |

## Categories errors

| Error message                                                                                 | Details                                                          |
| --------------------------------------------------------------------------------------------- | ---------------------------------------------------------------- |
| There is a limit of 10 categories for each email that is sent. You provided `[n]` categories. |                                                                  |
| Categories must be an array of strings.                                                       | Limits every category in the categories array to a string value. |
| Each category must not be longer than 255 characters. `[YOUR CATEGORY]` exceeds this limit.   | Limits the maximum length of a category to 255 characters.       |
| The categories must be a unique list, and you have included `[YOUR CATEGORY]` more than once. | Requires a unique category name for each category.               |
| Categories can not contain non-ASCII characters.                                              | Limits each category name to ASCII characters.                   |

To learn how you can use categories to organize your email analytics, see the [Categories documentation][].

## Content errors

### `content`

| Error message                                                                                                                                             | Details                                                                                                                                              |
| --------------------------------------------------------------------------------------------------------------------------------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------- |
| The `content` param is required unless you are using a transactional template and have defined a template\_ID.                                            | Requires a `content` parameter for the email message unless you use a transactional template. This prevents you from sending an empty email message. |
| There must be at least one defined content block. We typically suggest both text/plain and text/html blocks are included, but only one block is required. | Set `content.type` and value of `text/plain`, `text/html`, or both for every email you send. If included, set `text/plain` first.                    |

### `content.type`

| Error message                                                                  | Details                                                                                                                                          |
| ------------------------------------------------------------------------------ | ------------------------------------------------------------------------------------------------------------------------------------------------ |
| A content type is required, this tells email clients how to display the email. | Choose the MIME type of content of your email. Set the MIME type order to `"text/plain"`, `"text/html"`, then other desired MIME types.          |
| The content value must be a string at least one character in length.           | Requires a `content` value for the email message unless you use a transactional template. This prevents you from sending an empty email message. |
| Your content type must be a string with length of at least one character.      | Limits the content to a string value.                                                                                                            |
| Cannot contain ';', or CRLF characters.                                        | Prohibits the characters `;`, `,`, `n`, or `r` in `type` of your content.                                                                        |

### `content.value`

| Error message                                                                                                                                                                        | Details                                                                                                                                          |
| ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ | ------------------------------------------------------------------------------------------------------------------------------------------------ |
| A content value is required, this is the content of the email you are sending.                                                                                                       | Requires a `content` value for the email message unless you use a transactional template. This prevents you from sending an empty email message. |
| The content value must be a string at least one character in length.                                                                                                                 | Set the `content.value` parameter to at least one character.                                                                                     |
| Following RFC 1341, section 7.2, if either text/html or text/plain are to be sent in your email: text/plain needs to be first, followed by text/html, followed by any other content. | Set the MIME type order to `"text/plain"`, `"text/html"`, then other desired MIME types.                                                         |

## Encoding errors

| Error message            | Details                                               |
| ------------------------ | ----------------------------------------------------- |
| Invalid UTF8 in request. | Encode your payload, including attachments, as UTF-8. |

## From Address errors

| Error message                                                                                                                                                                                                                                                     | Details                                                                                                                                                                                                     |
| ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| The from object must at least have an `email` parameter with a valid email address and may also contain a `name` parameter. e.g. `{"email": "example@example.com"}` or `{"email": "example@example.com", "name": "Example Recipient"}`                            | Include one valid recipient email address for each `From` address in your email. Recipient addresses don't require a name.                                                                                  |
| The `from` object must be provided for every email send. It is an object that requires the `email` parameter, but may also contain a `name` parameter. e.g. `{"email": "example@example.com"}` or `{"email": "example@example.com", "name": "Example Recipient"}` | Include one valid recipient email address for each `From` address in your email. Recipient addresses don't require a name. This value aids in authentication sending reputation with your recipients' ISPs. |

## Headers errors

| Error message                                                    | Details                                                                                                                                                                                    |
| ---------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| The header values must be strings.                               | Limits the data type of each header value to strings. Headers can't be integer, array, or Boolean data types.                                                                              |
| The headers can't contain duplicate keys.                        | Requires each header key to be a unique.                                                                                                                                                   |
| Header keys can't contain non-ASCII characters and empty spaces. | Limits each header key to ASCII characters.                                                                                                                                                |
| Header can not be one of the reserved keys.                      | Reserves terms for header keys labels: `x-sg-id`, `x-sg-eid`, `received`, `dkim-signature`, `Content-Type`, `Content-Transfer-Encoding`, `To`, `From`, `Subject`, `Reply-To`, `CC`, `BCC`. |

## IP pool errors

| Error message                                                                                    |
| ------------------------------------------------------------------------------------------------ |
| The name of your IP pool must be a string.                                                       |
| The IP Pool name must be a valid pool name for your account. You provided `[YOUR IP POOL NAME]`. |

## Reply to errors

| Error message                                                                                                                                                                                                                                               | Details                                                                                                                 |
| ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ----------------------------------------------------------------------------------------------------------------------- |
| The `reply_to` object, when used, must at least have an `email` parameter with a valid email address and it may also contain a `name` parameter. e.g. `{"email": "example@example.com"}` or `{"email": "example@example.com", "name": "Example Recipient"}` | Include one valid recipient email address for each carbon copy of your email. Recipient addresses don't require a name. |

## Sections errors

| Error message                       | Details                                                          |
| ----------------------------------- | ---------------------------------------------------------------- |
| The section values must be strings. | Limits your `sections` parameter values to the string data type. |

## Send at errors

| Error message                                                                                                                                           | Details                                                                                                                              |
| ------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------ |
| The `send_at` parameter is expecting a UNIX timestamp as an integer. We will send immediately if you include a `send_at` timestamp that is in the past. | Accepts a UNIX timestamp for the scheduled send time. To send your email message when you make the API request, omit this parameter. |
| Scheduling more than 72 hours in advance is forbidden.                                                                                                  | Limits scheduled time of your email to 72 hours after your API request.                                                              |

## Subject line errors

| Error message                                                                                                                                                | Details                                                                                                                                              |
| ------------------------------------------------------------------------------------------------------------------------------------------------------------ | ---------------------------------------------------------------------------------------------------------------------------------------------------- |
| The subject of your email must be a string at least one character in length.                                                                                 | Requires a subject for every email message you send with a minimum length of one character.                                                          |
| The subject is required. You can get around this requirement if you use a template with a subject defined or if every personalization has a subject defined. | Set a subject using one of three methods: use a template with a subject, define a global subject, or add a subject to every personalizations object. |

## Template errors

| Error message                                                                                    | Details                                                                                                           |
| ------------------------------------------------------------------------------------------------ | ----------------------------------------------------------------------------------------------------------------- |
| The template ID must be a string, you provided `[YOUR TEMPLATE ID]`.                             | Limits the data type of each Template ID to strings. Template IDs can't be integer, array, or Boolean data types. |
| The Template ID must be a valid template id for your account. You provided `[YOUR TEMPLATE ID]`. | Requires a template and that it includes valid content.                                                           |
| Must be a valid template.                                                                        | Requires a template and that it includes valid content.                                                           |

## Mail settings errors

### `mail_settings.bcc.email`

| Error message                                                                                                                                                                                              |
| ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| The bcc email recipient object must at least have an email address and may also contain a name. e.g. `{"email": "example@example.com"}` or `{"email": "example@example.com", "name": "Example Recipient"}` |
| You must include a recipient object when using the bcc mail setting.                                                                                                                                       |

### `mail_settings.bcc.enable`

| Error message                                   |
| ----------------------------------------------- |
| The bcc enable param should be a Boolean value. |

### `mail_settings.bypass_list_management.enable`

| Error message                                                        |
| -------------------------------------------------------------------- |
| The bypass list management `enable` param should be a Boolean value. |

### `mail_settings.footer.enable`

| Error message                                      |
| -------------------------------------------------- |
| The footer enable param should be a Boolean value. |

### `mail_settings.footer.html`

| Error message                                            |
| -------------------------------------------------------- |
| The text/html version of your footer should be a string. |

### `mail_settings.footer.text`

| Error message                                             |
| --------------------------------------------------------- |
| The text/plain version of your footer should be a string. |

### `mail_settings.sandbox_mode.enable`

| Error message                                            |
| -------------------------------------------------------- |
| The sandbox mode enable param should be a boolean value. |

### `mail_settings.spam_check.enable`

| Error message                                            |
| -------------------------------------------------------- |
| The spam check `enable` param should be a boolean value. |

### `mail_settings.spam_check.post_to_url`

| Error message                                                               |
| --------------------------------------------------------------------------- |
| The spam check url must be a string.                                        |
| You must include the url to post to when using the spam check mail setting. |
| The `post_to_url` parameter must start with `http://` or `https://`.        |

### `mail_settings.spam_check.threshold`

| Error message                                                                                         |
| ----------------------------------------------------------------------------------------------------- |
| The spam check threshold is between 1 and 10, with the lower numbers being the most strict filtering. |
| You must include the spam check threshold when using the spam check mail setting.                     |

## Tracking settings errors

### `tracking_settings.click_tracking.enable`

| Error message                                              |
| ---------------------------------------------------------- |
| The click tracking enable param should be a boolean value. |

### `tracking_settings.click_tracking.enable_text`

| Error message                                           |
| ------------------------------------------------------- |
| The click tracking enable text must be a boolean value. |

### `tracking_settings.ganalytics.enable`

| Error message                                              |
| ---------------------------------------------------------- |
| The Google Analytics enable param must be a boolean value. |

### `tracking_settings.ganalytics.utm_campaign`

| Error message                                              |
| ---------------------------------------------------------- |
| The Google Analytics utm\_campaign must be a string value. |

### `tracking_settings.ganalytics.utm_content`

| Error message                                             |
| --------------------------------------------------------- |
| The Google Analytics utm\_content must be a string value. |

### `tracking_settings.ganalytics.utm_medium`

| Error message                                            |
| -------------------------------------------------------- |
| The Google Analytics utm\_medium must be a string value. |

### `tracking_settings.ganalytics.utm_source`

| Error message                                            |
| -------------------------------------------------------- |
| The Google Analytics utm\_source must be a string value. |

### `tracking_settings.ganalytics.utm_term`

| Error message                                          |
| ------------------------------------------------------ |
| The Google Analytics utm\_term must be a string value. |

### `tracking_settings.open_tracking.enable`

| Error message                                             |
| --------------------------------------------------------- |
| The open tracking enable param should be a boolean value. |

### `tracking_settings.open_tracking.substitution_tag`

| Error message                                        |
| ---------------------------------------------------- |
| The open tracking substitution tag must be a string. |

### `tracking_settings.subscription_tracking.enable`

| Error message                                                       |
| ------------------------------------------------------------------- |
| The subscription tracking `enable` param should be a boolean value. |

### `tracking_settings.subscription_tracking.html`

| Error message                                                                          |
| -------------------------------------------------------------------------------------- |
| The subscription tracking unsubscribe content for text/html messages must be a string. |

### `tracking_settings.subscription_tracking.substitution_tag`

| Error message                                                      |
| ------------------------------------------------------------------ |
| The subscription tracking substitution tag must be a string value. |

### `tracking_settings.subscription_tracking.text`

| Error message                                                                           |
| --------------------------------------------------------------------------------------- |
| The subscription tracking unsubscribe content for text/plain messages must be a string. |

[API Reference]: /docs/sendgrid/for-developers/sending-email/scheduling-parameters

[api-schedule-send]: /docs/sendgrid/for-developers/sending-email/stopping-a-scheduled-send/#cancel-scheduled-sends

[Categories documentation]: /docs/sendgrid/ui/analytics-and-reporting/categories

[Create a Batch ID]: /docs/sendgrid/api-reference/cancel-scheduled-sends/create-a-batch-id

[our Unique Arguments documentation]: /docs/sendgrid/for-developers/sending-email/unique-arguments

[Personalizations documentation]: /docs/sendgrid/for-developers/sending-email/personalizations

[Unsubscribe Groups]: /docs/sendgrid/ui/sending-email/create-and-manage-unsubscribe-groups
