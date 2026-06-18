# Mail Send

> \[!NOTE]
>
> Regional Email sending in the European Union (EU) is available for [Twilio SendGrid Pro plan or above](https://sendgrid.com/en-us/pricing). EU Regional Email sending requires use of an EU IP address and EU subuser. Learn more about [sending emails with Twilio SendGrid on EU servers](https://www.twilio.com/en-us/blog/send-emails-in-eu).

## Operation overview

```json
{"path":"https://api.sendgrid.com/v3/mail/send","method":"post","servers":[{"url":"https://api.sendgrid.com","description":"for global users and subusers"},{"url":"https://api.eu.sendgrid.com","description":"for EU regional subusers"}]}
```

*The Mail Send operation allows you to send email over SendGrid's v3 Web API*

For an overview of this API, including its features and limitations, please see the [Mail Send API overview page](https://www.twilio.com/docs/sendgrid/api-reference/mail-send)

The overview page also includes links to SendGrid's Email API quickstarts and helper libraries to get you working with this endpoint even faster.

## Operation details

### Authentication

API Key

### Headers

```json
[{"in":"header","name":"Authorization","required":true,"default":"Bearer <<YOUR_API_KEY_HERE>>","schema":{"type":"string"}},{"name":"Content-Encoding","in":"header","description":"Use this header when sending a gzip compressed mail body. Mail body compression is available to some high volume accounts. Submit a [request to support](https://support.sendgrid.com/hc/en-us) to have gzip enabled on your account.","required":false,"schema":{"type":"string","enum":["gzip"],"refName":"ContentEncoding","modelName":"ContentEncoding"},"refName":"#/components/parameters/MailBodyCompression","modelName":"__components_parameters_MailBodyCompression"}]
```

### Request body

```json
{"schema":{"type":"object","required":["personalizations","from"],"properties":{"personalizations":{"type":"array","description":"An array of messages and their metadata. Each object within the `personalizations` array can be thought of as a mail envelope—it defines who should receive an individual message and how that message should be handled. See [**Personalizations**](https://sendgrid.com/docs/for-developers/sending-email/personalizations/) for more information.","uniqueItems":false,"maxItems":1000,"items":{"type":"object","required":["to"],"properties":{"from":{"title":"From Email Object","type":"object","required":["email"],"refName":"MailFrom","modelName":"MailFrom","properties":{"email":{"type":"string","format":"email","description":"The email address from which messages are sent. This address should be a verified sender in your Twilio SendGrid account. Email addresses specified in `personalizations` will override addresses set at the message level outside of the `personalizations` object."},"name":{"type":"string","description":"A name or title associated with the email address such as \"Support\" or \"Alex\"."}}},"to":{"type":"array","description":"An array of recipients to whom the email will be sent. Each object in this array must contain a recipient's email address. Each object in the array may optionally contain a recipient's name.","items":{"title":"To Email Object","type":"object","required":["email"],"refName":"MailTo","modelName":"MailTo","properties":{"email":{"type":"string","format":"email","description":"An email address to which a message is sent. Email addresses specified in `personalizations` will override addresses set at the message level outside of the `personalizations` object."},"name":{"type":"string","description":"A name or title associated with the email address such as \"Alex\"."}}}},"cc":{"type":"array","description":"An array of recipients to whom a copy of the email will be sent. Each object in this array must contain a recipient's email address. Each object in the array may optionally contain a recipient's name.","maxItems":1000,"items":{"title":"To Email Object","type":"object","required":["email"],"refName":"MailTo","modelName":"MailTo","properties":{"email":{"type":"string","format":"email","description":"An email address to which a message is sent. Email addresses specified in `personalizations` will override addresses set at the message level outside of the `personalizations` object."},"name":{"type":"string","description":"A name or title associated with the email address such as \"Alex\"."}}}},"bcc":{"type":"array","description":"An array of recipients to whom a blind carbon copy of your email will be sent. Each object in this array must contain a recipient's email address. Each object in the array may optionally contain a recipient's name.","maxItems":1000,"items":{"title":"To Email Object","type":"object","required":["email"],"refName":"MailTo","modelName":"MailTo","properties":{"email":{"type":"string","format":"email","description":"An email address to which a message is sent. Email addresses specified in `personalizations` will override addresses set at the message level outside of the `personalizations` object."},"name":{"type":"string","description":"A name or title associated with the email address such as \"Alex\"."}}}},"subject":{"type":"string","description":"The subject of your email. See line length limits specified in [RFC 2822](https://www.rfc-editor.org/rfc/rfc2822#section-2.1.1) for guidance on subject line character limits.","minLength":1},"headers":{"type":"object","description":"A collection of JSON property name and property value pairs allowing you to specify handling instructions for your email. You may not override the following headers: `x-sg-id`, `x-sg-eid`, `received`, `dkim-signature`, `Content-Type`, `Content-Transfer-Encoding`, `To`, `From`, `Subject`, `Reply-To`, `CC`, `BCC`."},"substitutions":{"type":"object","description":"A collection property names that will be substituted by their corresponding property values in the `subject`, `reply-to` and `content` portions of your message. Name and value pairs follow the pattern `\"substitution_tag\":\"value to substitute\"`. The total collective size of your substitutions may not exceed 10,000 bytes per personalization object. Substitutions allow you to insert data without using SendGrid's Dynamic Templates. This property should not be used in combination with a Dynamic Template, which can be identified by a `template_id` starting with `d-`. See [**Substitution Tags**](https://docs.sendgrid.com/for-developers/sending-email/substitution-tags) for more information.","maxProperties":10000,"additionalProperties":{"type":"string"}},"dynamic_template_data":{"type":"object","description":"A collection property names that will be substituted by their corresponding property values in the `subject`, `reply-to` and `content` portions of a SendGrid Dynamic Template. Dynamic template data is available in a template using [Handlebars](https://docs.sendgrid.com/for-developers/sending-email/using-handlebars) syntax. This property should be used in combination with a Dynamic Template, which can be identified by a `template_id` starting with `d-`. See [**How to Send an Email with Dynamic Templates**](https://docs.sendgrid.com/ui/sending-email/how-to-send-an-email-with-dynamic-templates) for more information."},"custom_args":{"type":"object","description":"Values that are specific to this personalization that will be carried along with the email and its activity data. Substitutions will not be made on custom arguments, so any string that is assigned to this property will be assumed to be the custom argument that you would like to be used. This field may not exceed 10,000 bytes.","maxProperties":10000},"send_at":{"type":"integer","description":"A [unix timestamp](https://en.wikipedia.org/wiki/Unix_time) allowing you to specify when your email should be sent. A send cannot be scheduled more than 72 hours in advance."}}}},"from":{"title":"From Email Object","type":"object","required":["email"],"refName":"MailFrom","modelName":"MailFrom","properties":{"email":{"type":"string","format":"email","description":"The email address from which messages are sent. This address should be a verified sender in your Twilio SendGrid account. Email addresses specified in `personalizations` will override addresses set at the message level outside of the `personalizations` object."},"name":{"type":"string","description":"A name or title associated with the email address such as \"Support\" or \"Alex\"."}}},"reply_to":{"title":"To Email Object","type":"object","required":["email"],"refName":"MailTo","modelName":"MailTo","properties":{"email":{"type":"string","format":"email","description":"An email address to which a message is sent. Email addresses specified in `personalizations` will override addresses set at the message level outside of the `personalizations` object."},"name":{"type":"string","description":"A name or title associated with the email address such as \"Alex\"."}}},"reply_to_list":{"type":"array","description":"An array of recipients to whom replies will be sent. Each object in this array must contain a recipient's email address. Each object in the array may optionally contain a recipient's name. You can use either the `reply_to` property or `reply_to_list` property but not both.","uniqueItems":true,"maxItems":1000,"items":{"title":"To Email Object","type":"object","required":["email"],"refName":"MailTo","modelName":"MailTo","properties":{"email":{"type":"string","format":"email","description":"An email address to which a message is sent. Email addresses specified in `personalizations` will override addresses set at the message level outside of the `personalizations` object."},"name":{"type":"string","description":"A name or title associated with the email address such as \"Alex\"."}}}},"subject":{"type":"string","description":"The global or _message level_ subject of your email. Subject lines set in personalizations objects will override this global subject line. See line length limits specified in [RFC 2822](https://www.rfc-editor.org/rfc/rfc2822#section-2.1.1) for guidance on subject line character limits.","minLength":1},"content":{"type":"array","description":"An array of objects, each containing a message body's content and [MIME type](https://developer.mozilla.org/en-US/docs/Web/HTTP/Basics_of_HTTP/MIME_types). You must specify at least one MIME type and may include multiple. To include more than one MIME type, add an object for each type to the array.","items":{"type":"object","required":["type","value"],"properties":{"type":{"type":"string","description":"The MIME type of the content assigned in the `value` property of this object (e.g., `text/plain` or `text/html`).","minLength":1},"value":{"type":"string","description":"The content of your message in the specified MIME type assigned in the `type` property of this object.","minLength":1}}}},"attachments":{"type":"array","description":"An array of objects where you can define any attachments to be included with the message. Each object contains a `content` property, which must be a Base64 encoded string of the attachment itself, and `type`, `filename`, `disposition`, and `content_id` properties that tell SendGrid how to handle the attachment.","items":{"type":"object","required":["content","filename"],"properties":{"content":{"type":"string","description":"The Base64 encoded content of the attachment.","minLength":1},"type":{"type":"string","description":"The MIME type of the content you are attaching (e.g., `image/jpeg` or `application/pdf`).","minLength":1},"filename":{"type":"string","description":"The attachment's filename, including the file extension."},"disposition":{"type":"string","default":"attachment","description":"The attachment's content-disposition specifies how you would like the attachment to be displayed. For example, `inline` results in the attached file being displayed automatically within the message while `attachment` results in the attached file requiring some action to be taken before it is displayed such as opening or downloading the file.","enum":["inline","attachment"],"refName":"Disposition","modelName":"Disposition"},"content_id":{"type":"string","description":"The attachment's content ID. The `content_id` is used when the `disposition` is set to `inline` and the attachment is an image, allowing the file to be displayed within the body of the email."}}}},"template_id":{"type":"string","description":"An email template ID. A template that contains a subject and content—either text or html—will override any subject and content values specified at the `personalizations` or message level. If a template ID begins with `d-`, it is a dynamic template and will work with the `dynamic_template_data` property. If the template ID does not begin with `d-`, it is a standard SendGrid template and will work with the `substitutions` property. See [**How to Send an Email with Dynamic Templates**](https://docs.sendgrid.com/ui/sending-email/how-to-send-an-email-with-dynamic-templates) for more information about working with templates."},"headers":{"description":"A collection of JSON property name and property value pairs allowing you to specify handling instructions for your email. You may not override the following headers: `x-sg-id`, `x-sg-eid`, `received`, `dkim-signature`, `Content-Type`, `Content-Transfer-Encoding`, `To`, `From`, `Subject`, `Reply-To`, `CC`, `BCC`.","type":"object"},"categories":{"type":"array","description":"An array of category names assigned to this message. Categories allow you to group messages by categories you define. Categories should be used sparingly to create general groups that are relevant to you. Categories are not meant to be used to track individual mail sends. For more granular categorization and tracking, use the `custom_args` property. A category name cannot exceed 255 characters. See [**Working with Categories**](https://docs.sendgrid.com/for-developers/sending-email/categories) for more information.","uniqueItems":true,"maxItems":10,"items":{"type":"string","maxLength":255}},"custom_args":{"type":"string","description":"Values that are specific to the entire send that will be carried along with the email and its activity data. Substitutions will not be made on custom arguments, so any string that is assigned to this property will be assumed to be the custom argument that you would like to be used. This parameter is overridden by `custom_args` set at the personalizations level. Total `custom_args` size may not exceed 10,000 bytes."},"send_at":{"type":"integer","description":"A [unix timestamp](https://en.wikipedia.org/wiki/Unix_time) allowing you to specify when your email should be sent. A send cannot be scheduled more than 72 hours in advance. This property may be overridden by the `send_at` property set at the personalizations level."},"batch_id":{"type":"string","description":"An ID representing a batch of emails to be sent at the same time. Including a `batch_id` in your request allows you to include this email in that batch. It also enables you to cancel or pause the delivery of that batch. See the [Scheduled Sends API](https://sendgrid.com/docs/api-reference/) for more information about scheduling your email."},"asm":{"type":"object","description":"An object allowing you to specify how to handle unsubscribes. With SendGrid, an unsubscribe is the action an email recipient takes when they opt-out of receiving your messages. A suppression is the action you take as a sender to filter or suppress an unsubscribed address from your email send. From the perspective of the recipient, your suppression is the result of their unsubscribe. See [**Suppression Groups**](https://www.twilio.com/docs/sendgrid/api-reference/suppressions-unsubscribe-groups/create-a-new-suppression-group) for more information.","required":["group_id"],"properties":{"group_id":{"type":"integer","description":"The unsubscribe group to associate with this email. See the [Suppressions API](https://docs.sendgrid.com/api-reference/suppressions/) to manage unsubscribe group IDs."},"groups_to_display":{"type":"array","description":"An array containing the unsubscribe groups that you would like to be displayed to a recipient on the unsubscribe preferences page. This page is displayed in the recipient's browser when they click the unsubscribe link in your message.","maxItems":25,"items":{"type":"integer"}}}},"ip_pool_name":{"type":"string","description":"The IP Pool that you would like to send this email from. IP Pools allow you to group your dedicated Twilio SendGrid IP addresses in order to have more control over your deliverability. See [**IP Pools**](https://docs.sendgrid.com/ui/account-and-settings/ip-pools) for more information.","minLength":2,"maxLength":64},"mail_settings":{"type":"object","description":"A collection of different mail settings that you can use to specify how you would like this email to be handled. Mail settings provide extra functionality to your mail send. See [**Mail Settings**](https://docs.sendgrid.com/ui/account-and-settings/mail) for more information.","properties":{"bypass_list_management":{"type":"object","description":"Allows you to bypass all unsubscribe groups and suppressions to ensure that the email is delivered to every single recipient. This should only be used in emergencies when it is absolutely necessary that every recipient receives your email. This filter cannot be combined with any other bypass filters. See the [the \"Bypass suppressions\" section of our **Suppressions Overview**](https://sendgrid.com/docs/ui/sending-email/index-suppressions/#bypass-suppressions) for more about bypass filters.","properties":{"enable":{"type":"boolean","description":"Indicates if this setting is enabled."}}},"bypass_spam_management":{"type":"object","description":"Allows you to bypass the spam report list to ensure that the email is delivered to recipients. Bounce and unsubscribe lists will still be checked; addresses on these other lists will not receive the message. This filter cannot be combined with the `bypass_list_management` filter. See the [the \"Bypass suppressions\" section of our **Suppressions Overview**](https://sendgrid.com/docs/ui/sending-email/index-suppressions/#bypass-suppressions) for more about bypass filters.","properties":{"enable":{"type":"boolean","description":"Indicates if this setting is enabled."}}},"bypass_bounce_management":{"type":"object","description":"Allows you to bypass the bounce list to ensure that the email is delivered to recipients. Spam report and unsubscribe lists will still be checked; addresses on these other lists will not receive the message. This filter cannot be combined with the `bypass_list_management` filter. See the [the \"Bypass suppressions\" section of our **Suppressions Overview**](https://sendgrid.com/docs/ui/sending-email/index-suppressions/#bypass-suppressions) for more about bypass filters.","properties":{"enable":{"type":"boolean","description":"Indicates if this setting is enabled."}}},"bypass_unsubscribe_management":{"type":"object","description":"Allows you to bypass the global unsubscribe list to ensure that the email is delivered to recipients. Bounce and spam report lists will still be checked; addresses on these other lists will not receive the message. This filter applies only to global unsubscribes and will not bypass group unsubscribes. This filter cannot be combined with the `bypass_list_management` filter. See the [the \"Bypass suppressions\" section of our **Suppressions Overview**](https://sendgrid.com/docs/ui/sending-email/index-suppressions/#bypass-suppressions) for more about bypass filters.","properties":{"enable":{"type":"boolean","description":"Indicates if this setting is enabled."}}},"footer":{"type":"object","description":"Inserts a custom footer at the bottom of the text and HTML bodies of your messages. Use the `html` and `text` properties to include the content of the footers to be inserted.","properties":{"enable":{"type":"boolean","description":"Indicates if this setting is enabled."},"text":{"type":"string","description":"The plain text content of your footer."},"html":{"type":"string","description":"The HTML content of your footer."}}},"sandbox_mode":{"type":"object","description":"Sandbox Mode allows you to send a test email to ensure that your request body is valid and formatted correctly.","properties":{"enable":{"type":"boolean","description":"Indicates if this setting is enabled."}}}}},"tracking_settings":{"type":"object","description":"Settings to determine how you would like to track the metrics of how your recipients interact with your email. See [**Tracking Settings**](https://docs.sendgrid.com/ui/account-and-settings/tracking) for more information.","properties":{"click_tracking":{"type":"object","description":"Allows you to track if a recipient clicked a link in your email.","properties":{"enable":{"type":"boolean","description":"Indicates if this setting is enabled."},"enable_text":{"type":"boolean","description":"Indicates if this setting should be included in the `text/plain` portion of your email."}}},"open_tracking":{"type":"object","description":"Allows you to track if the email was opened by including a single transparent pixel image in the body of the message content. When the message is opened, a request for the pixel is sent. That request indicates to Twilio SendGrid that the message was opened.","properties":{"enable":{"type":"boolean","description":"Indicates if this setting is enabled."},"substitution_tag":{"type":"string","description":"Allows you to specify a substitution tag that you can insert in the body of your email at a location that you desire. This tag will be replaced by the open tracking pixel."}}},"subscription_tracking":{"type":"object","description":"Allows you to insert a subscription management link at the bottom of the text and HTML bodies of your email. If you would like to specify the location of the link within your email, you may use the `substitution_tag` property.","properties":{"enable":{"type":"boolean","description":"Indicates if this setting is enabled."},"text":{"type":"string","description":"Text to be appended to the email with the subscription tracking link."},"html":{"type":"string","description":"HTML to be appended to the email with the subscription tracking link."},"substitution_tag":{"type":"string","description":"A tag that will be replaced with the unsubscribe URL. If this property is used, it will override both the `text` and `html` properties. The URL of the link will be placed at the substitution tag's location in the message body with no additional formatting."}}},"ganalytics":{"type":"object","description":"Allows you to enable tracking provided by Google Analytics. See [**Google Analytics and SendGrid Statistics**](https://docs.sendgrid.com/ui/analytics-and-reporting/google-analytics) for more information about this property.","properties":{"enable":{"type":"boolean","description":"Indicates if this setting is enabled."},"utm_source":{"type":"string","description":"Name of the referrer source. (e.g., Google, SomeDomain.com, or Marketing Email)"},"utm_medium":{"type":"string","description":"Name of the marketing medium. (e.g., Email)"},"utm_term":{"type":"string","description":"Used to identify any paid keywords."},"utm_content":{"type":"string","description":"Used to differentiate your campaign from advertisements."},"utm_campaign":{"type":"string","description":"The name of the campaign."}}}}}}},"examples":{"MailSendDynamicTemplate":{"description":"A Mail Send request that uses a SendGrid Dynamic Template.","value":{"personalizations":[{"to":[{"email":"alex@example.com","name":"Alex"},{"email":"bola@example.com","name":"Bola"}],"dynamic_template_data":{"subject":"Hello, Alex","customer_name":"Alex","confirmation_number":"123abc456def789hij0"}}],"from":{"email":"orders@example.com","name":"Example Order Confirmation"},"reply_to":{"email":"customer_service@example.com","name":"Example Customer Service Team"},"attachments":[{"content":"PCFET0NUWVBFIGh0bWw+CjxodG1sIGxhbmc9ImVuIj4KCiAgICA8aGVhZD4KICAgICAgICA8bWV0YSBjaGFyc2V0PSJVVEYtOCI+CiAgICAgICAgPG1ldGEgaHR0cC1lcXVpdj0iWC1VQS1Db21wYXRpYmxlIiBjb250ZW50PSJJRT1lZGdlIj4KICAgICAgICA8bWV0YSBuYW1lPSJ2aWV3cG9ydCIgY29udGVudD0id2lkdGg9ZGV2aWNlLXdpZHRoLCBpbml0aWFsLXNjYWxlPTEuMCI+CiAgICAgICAgPHRpdGxlPkRvY3VtZW50PC90aXRsZT4KICAgIDwvaGVhZD4KCiAgICA8Ym9keT4KCiAgICA8L2JvZHk+Cgo8L2h0bWw+Cg==","filename":"index.html","type":"text/html","disposition":"attachment"}],"template_id":"d-123abc456def789hij0klm123nop456qrs789tuv0xyz","categories":["cake","pie","baking"],"send_at":1617260400,"batch_id":"AsdFgHjklQweRTYuIopzXcVBNm0aSDfGHjklmZcVbNMqWert1znmOP2asDFjkl","asm":{"group_id":12345,"groups_to_display":[12345]},"ip_pool_name":"transactional email","mail_settings":{"bypass_list_management":{"enable":false},"footer":{"enable":false},"sandbox_mode":{"enable":false}},"tracking_settings":{"click_tracking":{"enable":true,"enable_text":false},"open_tracking":{"enable":true,"substitution_tag":"%open-track%"},"subscription_tracking":{"enable":false}}}},"MailSendNoTemplate":{"description":"A Mail Send request with directly included content and no template.","value":{"personalizations":[{"to":[{"email":"alex@example.com","name":"Alex"},{"email":"bola@example.com","name":"Bola"}],"cc":[{"email":"charlie@example.com","name":"Charlie"}],"bcc":[{"email":"dana@example.com","name":"Dana"}]},{"from":{"email":"sales@example.com","name":"Example Sales Team"},"to":[{"email":"ira@example.com","name":"Ira"}],"bcc":[{"email":"lee@example.com","name":"Lee"}]}],"from":{"email":"orders@example.com","name":"Example Order Confirmation"},"reply_to":{"email":"customer_service@example.com","name":"Example Customer Service Team"},"subject":"Your Example Order Confirmation","content":[{"type":"text/html","value":"<p>Hello from Twilio SendGrid!</p><p>Sending with the email service trusted by developers and marketers for <strong>time-savings</strong>, <strong>scalability</strong>, and <strong>delivery expertise</strong>.</p><p>%open-track%</p>"}],"attachments":[{"content":"PCFET0NUWVBFIGh0bWw+CjxodG1sIGxhbmc9ImVuIj4KCiAgICA8aGVhZD4KICAgICAgICA8bWV0YSBjaGFyc2V0PSJVVEYtOCI+CiAgICAgICAgPG1ldGEgaHR0cC1lcXVpdj0iWC1VQS1Db21wYXRpYmxlIiBjb250ZW50PSJJRT1lZGdlIj4KICAgICAgICA8bWV0YSBuYW1lPSJ2aWV3cG9ydCIgY29udGVudD0id2lkdGg9ZGV2aWNlLXdpZHRoLCBpbml0aWFsLXNjYWxlPTEuMCI+CiAgICAgICAgPHRpdGxlPkRvY3VtZW50PC90aXRsZT4KICAgIDwvaGVhZD4KCiAgICA8Ym9keT4KCiAgICA8L2JvZHk+Cgo8L2h0bWw+Cg==","filename":"index.html","type":"text/html","disposition":"attachment"}],"categories":["cake","pie","baking"],"send_at":1617260400,"batch_id":"AsdFgHjklQweRTYuIopzXcVBNm0aSDfGHjklmZcVbNMqWert1znmOP2asDFjkl","asm":{"group_id":12345,"groups_to_display":[12345]},"ip_pool_name":"transactional email","mail_settings":{"bypass_list_management":{"enable":false},"footer":{"enable":false},"sandbox_mode":{"enable":false}},"tracking_settings":{"click_tracking":{"enable":true,"enable_text":false},"open_tracking":{"enable":true,"substitution_tag":"%open-track%"},"subscription_tracking":{"enable":false}}}}},"encodingType":"application/json"}
```

### Responses

```json
[{"responseCode":"202","schema":{"description":"Accepted"}},{"responseCode":"400","schema":{"description":"Mail Send bad response.","content":{"application/json":{"schema":{"type":"object","example":{"errors":[{"field":"field_name","message":"error message"}]},"refName":"ErrorResponse","modelName":"ErrorResponse","properties":{"errors":{"type":"array","items":{"type":"object","properties":{"message":{"type":"string","description":"An error message."},"field":{"description":"When applicable, this property value will be the field that generated the error.","nullable":true,"type":"string"},"help":{"type":"object","description":"When applicable, this property value will be helper text or a link to documentation to help you troubleshoot the error."}}}},"id":{"type":"string","description":"When applicable, this property value will be an error ID."}}},"examples":{"Unauthorized request":{"value":{"errors":[{"message":"invalid request","field":"null"}]}}}}},"refName":"#/components/responses/PostMailSend400","modelName":"__components_responses_PostMailSend400"}},{"responseCode":"401","schema":{"description":"Mail Send unauthorized response.","content":{"application/json":{"schema":{"type":"object","example":{"errors":[{"field":"field_name","message":"error message"}]},"refName":"ErrorResponse","modelName":"ErrorResponse","properties":{"errors":{"type":"array","items":{"type":"object","properties":{"message":{"type":"string","description":"An error message."},"field":{"description":"When applicable, this property value will be the field that generated the error.","nullable":true,"type":"string"},"help":{"type":"object","description":"When applicable, this property value will be helper text or a link to documentation to help you troubleshoot the error."}}}},"id":{"type":"string","description":"When applicable, this property value will be an error ID."}}},"examples":{"Unauthorized request":{"value":{"errors":[{"message":"authorization required","field":"null"}]}}}}},"refName":"#/components/responses/PostMailSend401","modelName":"__components_responses_PostMailSend401"}},{"responseCode":"403","schema":{"description":"Mail Send forbidden response.","content":{"application/json":{"schema":{"type":"object","example":{"errors":[{"field":"field_name","message":"error message"}]},"refName":"ErrorResponse","modelName":"ErrorResponse","properties":{"errors":{"type":"array","items":{"type":"object","properties":{"message":{"type":"string","description":"An error message."},"field":{"description":"When applicable, this property value will be the field that generated the error.","nullable":true,"type":"string"},"help":{"type":"object","description":"When applicable, this property value will be helper text or a link to documentation to help you troubleshoot the error."}}}},"id":{"type":"string","description":"When applicable, this property value will be an error ID."}}},"examples":{"Unauthorized request":{"value":{"errors":[{"message":"access forbidden","field":"null"}]}}}}},"refName":"#/components/responses/PostMailSend403","modelName":"__components_responses_PostMailSend403"}},{"responseCode":"404","schema":{"description":"Mail Send not found response.","content":{"application/json":{"schema":{"type":"object","example":{"errors":[{"field":"field_name","message":"error message"}]},"refName":"ErrorResponse","modelName":"ErrorResponse","properties":{"errors":{"type":"array","items":{"type":"object","properties":{"message":{"type":"string","description":"An error message."},"field":{"description":"When applicable, this property value will be the field that generated the error.","nullable":true,"type":"string"},"help":{"type":"object","description":"When applicable, this property value will be helper text or a link to documentation to help you troubleshoot the error."}}}},"id":{"type":"string","description":"When applicable, this property value will be an error ID."}}},"examples":{"Unauthorized request":{"value":{"errors":[{"message":"not found","field":"null"}]}}}}},"refName":"#/components/responses/PostMailSend404","modelName":"__components_responses_PostMailSend404"}},{"responseCode":"405","schema":{"description":"Mail Send method not allowed response.","content":{"application/json":{"schema":{"type":"object","example":{"errors":[{"field":"field_name","message":"error message"}]},"refName":"ErrorResponse","modelName":"ErrorResponse","properties":{"errors":{"type":"array","items":{"type":"object","properties":{"message":{"type":"string","description":"An error message."},"field":{"description":"When applicable, this property value will be the field that generated the error.","nullable":true,"type":"string"},"help":{"type":"object","description":"When applicable, this property value will be helper text or a link to documentation to help you troubleshoot the error."}}}},"id":{"type":"string","description":"When applicable, this property value will be an error ID."}}},"examples":{"Unauthorized request":{"value":{"errors":[{"message":"method not allowed","field":"null"}]}}}}},"refName":"#/components/responses/PostMailSend405","modelName":"__components_responses_PostMailSend405"}},{"responseCode":"413","schema":{"description":"Mail Send content too large response.","content":{"application/json":{"schema":{"type":"object","example":{"errors":[{"field":"field_name","message":"error message"}]},"refName":"ErrorResponse","modelName":"ErrorResponse","properties":{"errors":{"type":"array","items":{"type":"object","properties":{"message":{"type":"string","description":"An error message."},"field":{"description":"When applicable, this property value will be the field that generated the error.","nullable":true,"type":"string"},"help":{"type":"object","description":"When applicable, this property value will be helper text or a link to documentation to help you troubleshoot the error."}}}},"id":{"type":"string","description":"When applicable, this property value will be an error ID."}}},"examples":{"Unauthorized request":{"value":{"errors":[{"message":"content too large","field":"null"}]}}}}},"refName":"#/components/responses/PostMailSend413","modelName":"__components_responses_PostMailSend413"}},{"responseCode":"500","schema":{"description":"Mail send internal server error response.","content":{"application/json":{"schema":{"type":"object","example":{"errors":[{"field":"field_name","message":"error message"}]},"refName":"ErrorResponse","modelName":"ErrorResponse","properties":{"errors":{"type":"array","items":{"type":"object","properties":{"message":{"type":"string","description":"An error message."},"field":{"description":"When applicable, this property value will be the field that generated the error.","nullable":true,"type":"string"},"help":{"type":"object","description":"When applicable, this property value will be helper text or a link to documentation to help you troubleshoot the error."}}}},"id":{"type":"string","description":"When applicable, this property value will be an error ID."}}},"examples":{"Unauthorized request":{"value":{"errors":[{"message":"internal server error"}]}}}}},"refName":"#/components/responses/PostMailSend500","modelName":"__components_responses_PostMailSend500"}}]
```

v3 Mail Send

```js
const client = require("@sendgrid/mail");

client.setApiKey(process.env.SENDGRID_API_KEY);

const message = {
  personalizations: [
    {
      to: [
        {
          email: "alex@example.com",
          name: "Alex",
        },
        {
          email: "bola@example.com",
          name: "Bola",
        },
      ],
      cc: [
        {
          email: "charlie@example.com",
          name: "Charlie",
        },
      ],
      bcc: [
        {
          email: "dana@example.com",
          name: "Dana",
        },
      ],
    },
    {
      from: {
        email: "sales@example.com",
        name: "Example Sales Team",
      },
      to: [
        {
          email: "ira@example.com",
          name: "Ira",
        },
      ],
      bcc: [
        {
          email: "lee@example.com",
          name: "Lee",
        },
      ],
    },
  ],
  from: {
    email: "orders@example.com",
    name: "Example Order Confirmation",
  },
  replyTo: {
    email: "customer_service@example.com",
    name: "Example Customer Service Team",
  },
  subject: "Your Example Order Confirmation",
  content: [
    {
      type: "text/html",
      value:
        "<p>Hello from Twilio SendGrid!</p><p>Sending with the email service trusted by developers and marketers for <strong>time-savings</strong>, <strong>scalability</strong>, and <strong>delivery expertise</strong>.</p><p>%open-track%</p>",
    },
  ],
  attachments: [
    {
      content:
        "PCFET0NUWVBFIGh0bWw+CjxodG1sIGxhbmc9ImVuIj4KCiAgICA8aGVhZD4KICAgICAgICA8bWV0YSBjaGFyc2V0PSJVVEYtOCI+CiAgICAgICAgPG1ldGEgaHR0cC1lcXVpdj0iWC1VQS1Db21wYXRpYmxlIiBjb250ZW50PSJJRT1lZGdlIj4KICAgICAgICA8bWV0YSBuYW1lPSJ2aWV3cG9ydCIgY29udGVudD0id2lkdGg9ZGV2aWNlLXdpZHRoLCBpbml0aWFsLXNjYWxlPTEuMCI+CiAgICAgICAgPHRpdGxlPkRvY3VtZW50PC90aXRsZT4KICAgIDwvaGVhZD4KCiAgICA8Ym9keT4KCiAgICA8L2JvZHk+Cgo8L2h0bWw+Cg==",
      filename: "index.html",
      type: "text/html",
      disposition: "attachment",
    },
  ],
  categories: ["cake", "pie", "baking"],
  sendAt: 1617260400,
  batchId: "AsdFgHjklQweRTYuIopzXcVBNm0aSDfGHjklmZcVbNMqWert1znmOP2asDFjkl",
  asm: {
    groupId: 12345,
    groupsToDisplay: [12345],
  },
  ipPoolName: "transactional email",
  mailSettings: {
    bypassListManagement: {
      enable: false,
    },
    footer: {
      enable: false,
    },
    sandboxMode: {
      enable: false,
    },
  },
  trackingSettings: {
    clickTracking: {
      enable: true,
      enableText: false,
    },
    openTracking: {
      enable: true,
      substitutionTag: "%open-track%",
    },
    subscriptionTracking: {
      enable: false,
    },
  },
};

client
  .send(message)
  .then(() => console.log("Mail sent successfully"))
  .catch((error) => {
    console.error(error);
  });
```

```py
import os
from sendgrid import SendGridAPIClient
from sendgrid.helpers.mail import *


message = Mail()

message.to = [
    To(email="alex@example.com", name="Alex", p=0),
    To(email="bola@example.com", name="Bola", p=0),
]
message.cc = [Cc(email="charlie@example.com", name="Charlie", p=0)]
message.bcc = [Bcc(email="dana@example.com", name="Dana", p=0)]
message.from_email = From(
    email="sales@example.com", name="Example Sales Team", p=1
)
message.to = [To(email="ira@example.com", name="Ira", p=1)]
message.bcc = [Bcc(email="lee@example.com", name="Lee", p=1)]

message.from_email = From(
    email="orders@example.com", name="Example Order Confirmation"
)

message.reply_to = ReplyTo(
    email="customer_service@example.com", name="Example Customer Service Team"
)

message.subject = Subject("Your Example Order Confirmation")

message.content = [
    Content(
        mime_type="text/html",
        content="<p>Hello from Twilio SendGrid!</p><p>Sending with the email service trusted by developers and marketers for <strong>time-savings</strong>, <strong>scalability</strong>, and <strong>delivery expertise</strong>.</p><p>%open-track%</p>",
    )
]

message.attachment = [
    Attachment(
        file_content=FileContent(
            "PCFET0NUWVBFIGh0bWw+CjxodG1sIGxhbmc9ImVuIj4KCiAgICA8aGVhZD4KICAgICAgICA8bWV0YSBjaGFyc2V0PSJVVEYtOCI+CiAgICAgICAgPG1ldGEgaHR0cC1lcXVpdj0iWC1VQS1Db21wYXRpYmxlIiBjb250ZW50PSJJRT1lZGdlIj4KICAgICAgICA8bWV0YSBuYW1lPSJ2aWV3cG9ydCIgY29udGVudD0id2lkdGg9ZGV2aWNlLXdpZHRoLCBpbml0aWFsLXNjYWxlPTEuMCI+CiAgICAgICAgPHRpdGxlPkRvY3VtZW50PC90aXRsZT4KICAgIDwvaGVhZD4KCiAgICA8Ym9keT4KCiAgICA8L2JvZHk+Cgo8L2h0bWw+Cg=="
        ),
        file_name=FileName("index.html"),
        file_type=FileType("text/html"),
        disposition=Disposition("attachment"),
    )
]

message.category = [Category("cake"), Category("pie"), Category("baking")]

message.send_at = SendAt(1617260400)

message.batch_id = BatchId(
    "AsdFgHjklQweRTYuIopzXcVBNm0aSDfGHjklmZcVbNMqWert1znmOP2asDFjkl"
)

message.asm = Asm(
    group_id=GroupId(12345), groups_to_display=GroupsToDisplay([12345])
)

message.ip_pool_name = IpPoolName("transactional email")

message.mail_settings = MailSettings(
    bypass_list_management=BypassListManagement(False),
    footer_settings=FooterSettings(False),
    sandbox_mode=SandBoxMode(False),
)

message.tracking_settings = TrackingSettings(
    click_tracking=ClickTracking(enable=True, enable_text=False),
    open_tracking=OpenTracking(
        enable=True,
        substitution_tag=OpenTrackingSubstitutionTag("%open-track%"),
    ),
    subscription_tracking=SubscriptionTracking(False),
)

sendgrid_client = SendGridAPIClient(os.environ.get("SENDGRID_API_KEY"))
response = sendgrid_client.send(message)

print(response.status_code)
print(response.body)
print(response.headers)
```

```cs
using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using SendGrid;
using SendGrid.Helpers.Mail;

public class Program {
    public static async Task Main() {
        var message = new SendGridMessage();

        message.Personalizations = new List<Personalization>() {
            new Personalization() {
                Tos =
                    new List<EmailAddress>() {
                        new EmailAddress() { Email = "alex@example.com", Name = "Alex" },
                        new EmailAddress() { Email = "bola@example.com", Name = "Bola" }
                    },
                Ccs = new List<EmailAddress>() { new EmailAddress() {
                    Email = "charlie@example.com", Name = "Charlie"
                } },
                Bccs = new List<EmailAddress>() { new EmailAddress() {
                    Email = "dana@example.com", Name = "Dana"
                } }
            },
            new Personalization() {
                From =
                    new EmailAddress() { Email = "sales@example.com", Name = "Example Sales Team" },
                Tos = new List<EmailAddress>() { new EmailAddress() {
                    Email = "ira@example.com", Name = "Ira"
                } },
                Bccs = new List<EmailAddress>() { new EmailAddress() {
                    Email = "lee@example.com", Name = "Lee"
                } }
            }
        };

        message.From = new EmailAddress() {
            Email = "orders@example.com", Name = "Example Order Confirmation"
        };

        message.ReplyTo = new EmailAddress() {
            Email = "customer_service@example.com", Name = "Example Customer Service Team"
        };

        message.Subject = "Your Example Order Confirmation";

        message.Contents = new List<Content>() { new Content() {
            Type = "text/html",
            Value =
                "<p>Hello from Twilio SendGrid!</p><p>Sending with the email service trusted by developers and marketers for <strong>time-savings</strong>, <strong>scalability</strong>, and <strong>delivery expertise</strong>.</p><p>%open-track%</p>"
        } };

        message.Attachments = new List<Attachment>() { new Attachment() {
            Content =
                "PCFET0NUWVBFIGh0bWw+CjxodG1sIGxhbmc9ImVuIj4KCiAgICA8aGVhZD4KICAgICAgICA8bWV0YSBjaGFyc2V0PSJVVEYtOCI+CiAgICAgICAgPG1ldGEgaHR0cC1lcXVpdj0iWC1VQS1Db21wYXRpYmxlIiBjb250ZW50PSJJRT1lZGdlIj4KICAgICAgICA8bWV0YSBuYW1lPSJ2aWV3cG9ydCIgY29udGVudD0id2lkdGg9ZGV2aWNlLXdpZHRoLCBpbml0aWFsLXNjYWxlPTEuMCI+CiAgICAgICAgPHRpdGxlPkRvY3VtZW50PC90aXRsZT4KICAgIDwvaGVhZD4KCiAgICA8Ym9keT4KCiAgICA8L2JvZHk+Cgo8L2h0bWw+Cg==",
            Filename = "index.html",
            Type = "text/html",
            Disposition = "attachment"
        } };

        message.Categories = new List<string>() { "cake", "pie", "baking" };

        message.SendAt = 1617260400;

        message.BatchId = "AsdFgHjklQweRTYuIopzXcVBNm0aSDfGHjklmZcVbNMqWert1znmOP2asDFjkl";

        message.Asm = new ASM() { GroupId = 12345, GroupsToDisplay = new List<int>() { 12345 } };

        message.IpPoolName = "transactional email";

        message.MailSettings = new MailSettings() {
            BypassListManagement = new BypassListManagement() { Enable = false },
            FooterSettings = new FooterSettings() { Enable = false },
            SandboxMode = new SandboxMode() { Enable = false }
        };

        message.TrackingSettings = new TrackingSettings() {
            ClickTracking = new ClickTracking() { Enable = true, EnableText = false },
            OpenTracking = new OpenTracking() { Enable = true, SubstitutionTag = "%open-track%" },
            SubscriptionTracking = new SubscriptionTracking() { Enable = false }
        };

        string apiKey = Environment.GetEnvironmentVariable("SENDGRID_API_KEY");
        var client = new SendGridClient(apiKey);
        var response = await client.SendEmailAsync(message).ConfigureAwait(false);

        Console.WriteLine(response.StatusCode);
        Console.WriteLine(response.Body.ReadAsStringAsync().Result);
        Console.WriteLine(response.Headers.ToString());
    }
}
```

```java
import com.sendgrid.*;
import com.sendgrid.helpers.mail.Mail;
import com.sendgrid.helpers.mail.objects.*;
import java.io.IOException;

public class Example {
    public static void main(String[] args) throws IOException {
        try {
            SendGrid sg = new SendGrid(System.getenv("SENDGRID_API_KEY"));
            Request request = new Request();
            request.setMethod(Method.POST);
            request.setEndpoint("/mail/send");

            // Create mail
            Mail mail = new Mail();

            Personalization personalization0 = new Personalization();
            personalization0.addTo(new Email("alex@example.com", "Alex"));
            personalization0.addTo(new Email("bola@example.com", "Bola"));
            personalization0.addCc(new Email("charlie@example.com", "Charlie"));
            personalization0.addBcc(new Email("dana@example.com", "Dana"));
            mail.addPersonalization(personalization0);
            Personalization personalization1 = new Personalization();
            personalization1.setFrom(new Email("sales@example.com", "Example Sales Team"));
            personalization1.addTo(new Email("ira@example.com", "Ira"));
            personalization1.addBcc(new Email("lee@example.com", "Lee"));
            mail.addPersonalization(personalization1);

            mail.setFrom(new Email("orders@example.com", "Example Order Confirmation"));

            mail.setReplyTo(new Email("customer_service@example.com", "Example Customer Service Team"));

            mail.setSubject("Your Example Order Confirmation");

            Content content0 = new Content();
            content0.setType("text/html");
            content0.setValue(
                "<p>Hello from Twilio SendGrid!</p><p>Sending with the email service trusted by developers and marketers for <strong>time-savings</strong>, <strong>scalability</strong>, and <strong>delivery expertise</strong>.</p><p>%open-track%</p>");
            mail.addContent(content0);

            Attachments attachment0 = new Attachments();
            attachment0.setContent(
                "PCFET0NUWVBFIGh0bWw+CjxodG1sIGxhbmc9ImVuIj4KCiAgICA8aGVhZD4KICAgICAgICA8bWV0YSBjaGFyc2V0PSJVVEYtOCI+CiAgICAgICAgPG1ldGEgaHR0cC1lcXVpdj0iWC1VQS1Db21wYXRpYmxlIiBjb250ZW50PSJJRT1lZGdlIj4KICAgICAgICA8bWV0YSBuYW1lPSJ2aWV3cG9ydCIgY29udGVudD0id2lkdGg9ZGV2aWNlLXdpZHRoLCBpbml0aWFsLXNjYWxlPTEuMCI+CiAgICAgICAgPHRpdGxlPkRvY3VtZW50PC90aXRsZT4KICAgIDwvaGVhZD4KCiAgICA8Ym9keT4KCiAgICA8L2JvZHk+Cgo8L2h0bWw+Cg==");
            attachment0.setFilename("index.html");
            attachment0.setType("text/html");
            attachment0.setDisposition("attachment");
            mail.addAttachments(attachment0);

            mail.addCategory("cake");
            mail.addCategory("pie");
            mail.addCategory("baking");

            mail.setSendAt(1617260400);

            mail.setBatchId("AsdFgHjklQweRTYuIopzXcVBNm0aSDfGHjklmZcVbNMqWert1znmOP2asDFjkl");

            ASM asm = new ASM();
            asm.setGroupId(12345);
            asm.setGroupsToDisplay(new int[] {12345});
            mail.setASM(asm);

            mail.setIpPoolId("transactional email");

            MailSettings mailSettings = new MailSettings();
            Setting bypassListManagement = new Setting();
            bypassListManagement.setEnable(false);
            mailSettings.setBypassListManagement(bypassListManagement);
            FooterSetting footerSetting = new FooterSetting();
            footerSetting.setEnable(false);
            mailSettings.setFooterSetting(footerSetting);
            Setting sandBoxMode = new Setting();
            sandBoxMode.setEnable(false);
            mailSettings.setSandboxMode(sandBoxMode);
            mail.setMailSettings(mailSettings);

            TrackingSettings trackingSettings = new TrackingSettings();
            ClickTrackingSetting clickTrackingSetting = new ClickTrackingSetting();
            clickTrackingSetting.setEnable(true);
            clickTrackingSetting.setEnableText(false);
            trackingSettings.setClickTrackingSetting(clickTrackingSetting);
            OpenTrackingSetting openTrackingSetting = new OpenTrackingSetting();
            openTrackingSetting.setEnable(true);
            openTrackingSetting.setSubstitutionTag("%open-track%");
            trackingSettings.setOpenTrackingSetting(openTrackingSetting);
            SubscriptionTrackingSetting subscriptionTrackingSetting = new SubscriptionTrackingSetting();
            subscriptionTrackingSetting.setEnable(false);
            trackingSettings.setSubscriptionTrackingSetting(subscriptionTrackingSetting);
            mail.setTrackingSettings(trackingSettings);

            request.setBody(mail.build());
            Response response = sg.api(request);
            System.out.println(response.getStatusCode());
            System.out.println(response.getBody());
            System.out.println(response.getHeaders());
        } catch (IOException ex) {
            throw ex;
        }
    }
}
```

```go
package main

import (
	"fmt"
	"github.com/sendgrid/sendgrid-go"
	"github.com/sendgrid/sendgrid-go/helpers/mail"
	"log"
)

func main() {
	apiKey := os.Getenv("SENDGRID_API_KEY")
	host := "https://api.sendgrid.com"
	request := sendgrid.GetRequest(apiKey, "/v3/mail/send", host)
	request.Method = "POST"
	m := mail.NewV3Mail()
	address := "orders@example.com"
	name := "Example Order Confirmation"
	e := mail.NewEmail(name, address)
	m.SetFrom(e)
	m.Subject = "Your Example Order Confirmation"
	p1 := mail.NewPersonalization()
	tos1 := []*mail.Email{
		mail.NewEmail("Alex", "alex@example.com"),
		mail.NewEmail("Bola", "bola@example.com"),
	}
	p1.AddTos(tos1...)
	ccs1 := []*mail.Email{
		mail.NewEmail("Charlie", "charlie@example.com"),
	}
	p1.AddCCs(ccs1...)
	bccs1 := []*mail.Email{
		mail.NewEmail("Dana", "dana@example.com"),
	}
	p1.AddBCCs(bccs1...)
	m.AddPersonalizations(p1)
	p2 := mail.NewPersonalization()
	tos2 := []*mail.Email{
		mail.NewEmail("Ira", "ira@example.com"),
	}
	p2.AddTos(tos2...)
	bccs2 := []*mail.Email{
		mail.NewEmail("Lee", "lee@example.com"),
	}
	p2.AddBCCs(bccs2...)
	from2 := mail.NewEmail("Example Sales Team", "sales@example.com")
	p2.AddFrom(from2)
	m.AddPersonalizations(p2)
	c1 := mail.NewContent("text/html", "<p>Hello from Twilio SendGrid!</p><p>Sending with the email service trusted by developers and marketers for <strong>time-savings</strong>, <strong>scalability</strong>, and <strong>delivery expertise</strong>.</p><p>%open-track%</p>")
	m.AddContent(c1)
	a1 := mail.NewAttachment()
	a1.SetContent("PCFET0NUWVBFIGh0bWw+CjxodG1sIGxhbmc9ImVuIj4KCiAgICA8aGVhZD4KICAgICAgICA8bWV0YSBjaGFyc2V0PSJVVEYtOCI+CiAgICAgICAgPG1ldGEgaHR0cC1lcXVpdj0iWC1VQS1Db21wYXRpYmxlIiBjb250ZW50PSJJRT1lZGdlIj4KICAgICAgICA8bWV0YSBuYW1lPSJ2aWV3cG9ydCIgY29udGVudD0id2lkdGg9ZGV2aWNlLXdpZHRoLCBpbml0aWFsLXNjYWxlPTEuMCI+CiAgICAgICAgPHRpdGxlPkRvY3VtZW50PC90aXRsZT4KICAgIDwvaGVhZD4KCiAgICA8Ym9keT4KCiAgICA8L2JvZHk+Cgo8L2h0bWw+Cg==")
	a1.SetFilename("index.html")
	a1.SetType("text/html")
	a1.SetDisposition("attachment")
	m.AddAttachment(a1)
	m.AddCategories("cake")
	m.AddCategories("pie")
	m.AddCategories("baking")
	m.SetSendAt(1617260400)
	asm := mail.NewASM()
	asm.SetGroupID(12345)
	asm.AddGroupsToDisplay(12345)
	m.SetASM(asm)
	m.SetBatchID("AsdFgHjklQweRTYuIopzXcVBNm0aSDfGHjklmZcVbNMqWert1znmOP2asDFjkl")
	mailSettings := mail.NewMailSettings()
	bypassListManagementSetting := mail.NewSetting(false)
	mailSettings.SetBypassListManagement(bypassListManagementSetting)
	footerSetting := mail.NewFooterSetting()
	footerSetting.SetEnable(false)
	mailSettings.SetFooter(footerSetting)
	sandboxModeSetting := mail.NewSetting(false)
	mailSettings.SetSandboxMode(sandboxModeSetting)
	m.SetMailSettings(mailSettings)
	trackingSettings := mail.NewTrackingSettings()
	clickTrackingSetting := mail.NewClickTrackingSetting()
	clickTrackingSetting.SetEnable(true)
	clickTrackingSetting.SetEnableText(false)
	trackingSettings.SetClickTracking(clickTrackingSetting)
	openTrackingSetting := mail.NewOpenTrackingSetting()
	openTrackingSetting.SetEnable(true)
	openTrackingSetting.SetSubstitutionTag("%open-track%")
	trackingSettings.SetOpenTracking(openTrackingSetting)
	subscriptionTrackingSetting := mail.NewSubscriptionTrackingSetting()
	subscriptionTrackingSetting.SetEnable(false)
	trackingSettings.SetSubscriptionTracking(subscriptionTrackingSetting)
	m.SetTrackingSettings(trackingSettings)
	replyToEmail := mail.NewEmail("Example Customer Service Team", "customer_service@example.com")
	m.SetReplyTo(replyToEmail)
	var Body = mail.GetRequestBody(m)
	request.Body = Body
	response, err := sendgrid.API(request)
	if err != nil {
		log.Println(err)
	} else {
		fmt.Println(response.StatusCode)
		fmt.Println(response.Body)
		fmt.Println(response.Headers)
	}
}
```

```php
<?php
// Uncomment the next line if you're using a dependency loader (such as Composer) (recommended)
// require 'vendor/autoload.php';

// Uncomment next line if you're not using a dependency loader (such as Composer)
// require_once '<PATH TO>/sendgrid-php.php';

use SendGrid\Mail\To;
use SendGrid\Mail\Cc;
use SendGrid\Mail\Bcc;
use SendGrid\Mail\From;
use SendGrid\Mail\Content;
use SendGrid\Mail\Mail;
use SendGrid\Mail\Personalization;
use SendGrid\Mail\Subject;
use SendGrid\Mail\Header;
use SendGrid\Mail\CustomArg;
use SendGrid\Mail\SendAt;
use SendGrid\Mail\Attachment;
use SendGrid\Mail\Asm;
use SendGrid\Mail\MailSettings;
use SendGrid\Mail\BccSettings;
use SendGrid\Mail\SandBoxMode;
use SendGrid\Mail\BypassListManagement;
use SendGrid\Mail\Footer;
use SendGrid\Mail\SpamCheck;
use SendGrid\Mail\TrackingSettings;
use SendGrid\Mail\ClickTracking;
use SendGrid\Mail\OpenTracking;
use SendGrid\Mail\SubscriptionTracking;
use SendGrid\Mail\Ganalytics;
use SendGrid\Mail\ReplyTo;

$apiKey = getenv("SENDGRID_API_KEY");
$sg = new \SendGrid($apiKey);

$mail = new Mail();

$personalization0 = new Personalization();
$personalization0->addTo(new To("alex@example.com", "Alex"));
$personalization0->addTo(new To("bola@example.com", "Bola"));
$personalization0->addCc(new Cc("charlie@example.com", "Charlie"));
$personalization0->addBcc(new Bcc("dana@example.com", "Dana"));
$mail->addPersonalization($personalization0);
$personalization1 = new Personalization();
$personalization1->setFrom(new From("sales@example.com", "Example Sales Team"));
$personalization1->addTo(new To("ira@example.com", "Ira"));
$personalization1->addBcc(new Bcc("lee@example.com", "Lee"));
$mail->addPersonalization($personalization1);

$mail->setFrom(new From("orders@example.com", "Example Order Confirmation"));

$mail->setReplyTo(
    new ReplyTo("customer_service@example.com", "Example Customer Service Team")
);

$mail->setSubject(new Subject("Your Example Order Confirmation"));

$mail->addContent(
    new Content(
        "text/html",
        "<p>Hello from Twilio SendGrid!</p><p>Sending with the email service trusted by developers and marketers for <strong>time-savings</strong>, <strong>scalability</strong>, and <strong>delivery expertise</strong>.</p><p>%open-track%</p>"
    )
);

$attachment0 = new Attachment();
$attachment0->setContent(
    "PCFET0NUWVBFIGh0bWw+CjxodG1sIGxhbmc9ImVuIj4KCiAgICA8aGVhZD4KICAgICAgICA8bWV0YSBjaGFyc2V0PSJVVEYtOCI+CiAgICAgICAgPG1ldGEgaHR0cC1lcXVpdj0iWC1VQS1Db21wYXRpYmxlIiBjb250ZW50PSJJRT1lZGdlIj4KICAgICAgICA8bWV0YSBuYW1lPSJ2aWV3cG9ydCIgY29udGVudD0id2lkdGg9ZGV2aWNlLXdpZHRoLCBpbml0aWFsLXNjYWxlPTEuMCI+CiAgICAgICAgPHRpdGxlPkRvY3VtZW50PC90aXRsZT4KICAgIDwvaGVhZD4KCiAgICA8Ym9keT4KCiAgICA8L2JvZHk+Cgo8L2h0bWw+Cg=="
);
$attachment0->setFilename("index.html");
$attachment0->setType("text/html");
$attachment0->setDisposition("attachment");
$mail->addAttachment($attachment0);

$mail->addCategory("cake");
$mail->addCategory("pie");
$mail->addCategory("baking");

$mail->setSendAt(new SendAt(1617260400));

$mail->setBatchId(
    "AsdFgHjklQweRTYuIopzXcVBNm0aSDfGHjklmZcVbNMqWert1znmOP2asDFjkl"
);

$asm = new ASM();
$asm->setGroupId(12345);
$asm->setGroupsToDisplay([12345]);
$mail->setASM($asm);

$mail->setIpPoolName("transactional email");

$mail_settings = new MailSettings();
$bypass_list_management = new BypassListManagement();
$bypass_list_management->setEnable(false);
$mail_settings->setBypassListManagement($bypass_list_management);
$footer = new Footer();
$footer->setEnable(false);
$mail_settings->setFooter($footer);
$sandbox_mode = new SandboxMode();
$sandbox_mode->setEnable(false);
$mail_settings->setSandboxMode($sandbox_mode);
$mail->setMailSettings($mail_settings);

$tracking_settings = new TrackingSettings();
$click_tracking = new ClickTracking();
$click_tracking->setEnable(true);
$click_tracking->setEnableText(false);
$tracking_settings->setClickTracking($click_tracking);
$open_tracking = new OpenTracking();
$open_tracking->setEnable(true);
$open_tracking->setSubstitutionTag("%open-track%");
$tracking_settings->setOpenTracking($open_tracking);
$subscription_tracking = new SubscriptionTracking();
$subscription_tracking->setEnable(false);
$tracking_settings->setSubscriptionTracking($subscription_tracking);
$mail->setTrackingSettings($tracking_settings);

$request_body = $mail;

try {
    $response = $sg->client
        ->mail()
        ->send()
        ->post($request_body);
    print $response->statusCode() . "\n";
    print_r($response->headers());
    print $response->body() . "\n";
} catch (Exception $ex) {
    echo "Caught exception: " . $ex->getMessage();
}
```

```rb
require 'sendgrid-ruby'
include SendGrid

sg = SendGrid::API.new(api_key: ENV['SENDGRID_API_KEY'])

mail = SendGrid::Mail.new

personalization0 = Personalization.new
personalization0.add_to(Email.new(email: 'alex@example.com', name: 'Alex'))
personalization0.add_to(Email.new(email: 'bola@example.com', name: 'Bola'))
personalization0.add_cc(Email.new(email: 'charlie@example.com', name: 'Charlie'))
personalization0.add_bcc(Email.new(email: 'dana@example.com', name: 'Dana'))
mail.add_personalization(personalization0)
personalization1 = Personalization.new
personalization1.add_from(Email.new(email: 'sales@example.com', name: 'Example Sales Team'))
personalization1.add_to(Email.new(email: 'ira@example.com', name: 'Ira'))
personalization1.add_bcc(Email.new(email: 'lee@example.com', name: 'Lee'))
mail.add_personalization(personalization1)

mail.from = Email.new(email: 'orders@example.com', name: 'Example Order Confirmation')

mail.reply_to = Email.new(email: 'customer_service@example.com', name: 'Example Customer Service Team')

mail.subject = 'Your Example Order Confirmation'

mail.add_content(Content.new(type: 'text/html', value: '<p>Hello from Twilio SendGrid!</p><p>Sending with the email service trusted by developers and marketers for <strong>time-savings</strong>, <strong>scalability</strong>, and <strong>delivery expertise</strong>.</p><p>%open-track%</p>'))

attachment0 = Attachment.new
attachment0.content = 'PCFET0NUWVBFIGh0bWw+CjxodG1sIGxhbmc9ImVuIj4KCiAgICA8aGVhZD4KICAgICAgICA8bWV0YSBjaGFyc2V0PSJVVEYtOCI+CiAgICAgICAgPG1ldGEgaHR0cC1lcXVpdj0iWC1VQS1Db21wYXRpYmxlIiBjb250ZW50PSJJRT1lZGdlIj4KICAgICAgICA8bWV0YSBuYW1lPSJ2aWV3cG9ydCIgY29udGVudD0id2lkdGg9ZGV2aWNlLXdpZHRoLCBpbml0aWFsLXNjYWxlPTEuMCI+CiAgICAgICAgPHRpdGxlPkRvY3VtZW50PC90aXRsZT4KICAgIDwvaGVhZD4KCiAgICA8Ym9keT4KCiAgICA8L2JvZHk+Cgo8L2h0bWw+Cg=='
attachment0.filename = 'index.html'
attachment0.type = 'text/html'
attachment0.disposition = 'attachment'
mail.add_attachment(attachment0)

mail.add_category(Category.new(name: 'cake'))
mail.add_category(Category.new(name: 'pie'))
mail.add_category(Category.new(name: 'baking'))

mail.send_at = 1617260400

mail.batch_id = 'AsdFgHjklQweRTYuIopzXcVBNm0aSDfGHjklmZcVbNMqWert1znmOP2asDFjkl'

mail.asm = ASM.new(group_id: 12345, groups_to_display: [12345])

mail.ip_pool_name = 'transactional email'

mail_settings = MailSettings.new
mail_settings.bypass_list_management = BypassListManagement.new(enable: false)
mail_settings.footer = Footer.new(enable: false)
mail_settings.sandbox_mode = SandBoxMode.new(enable: false)
mail.mail_settings = mail_settings

tracking_settings = TrackingSettings.new
tracking_settings.click_tracking = ClickTracking.new(enable: true, enable_text: false)
tracking_settings.open_tracking = OpenTracking.new(enable: true, substitution_tag: '%open-track%')
tracking_settings.subscription_tracking = SubscriptionTracking.new(enable: false)
mail.tracking_settings = tracking_settings

data = mail.to_json

response = sg.client.mail._('send').post(request_body: data)
puts response.status_code
puts response.headers
puts response.body
```

```bash
curl -X POST "https://api.sendgrid.com/v3/mail/send" \
--header "Content-Type: application/json" \
--data '{"personalizations": [{"to": [{"email": "alex@example.com", "name": "Alex"}, {"email": "bola@example.com", "name": "Bola"}], "cc": [{"email": "charlie@example.com", "name": "Charlie"}], "bcc": [{"email": "dana@example.com", "name": "Dana"}]}, {"from": {"email": "sales@example.com", "name": "Example Sales Team"}, "to": [{"email": "ira@example.com", "name": "Ira"}], "bcc": [{"email": "lee@example.com", "name": "Lee"}]}], "from": {"email": "orders@example.com", "name": "Example Order Confirmation"}, "reply_to": {"email": "customer_service@example.com", "name": "Example Customer Service Team"}, "subject": "Your Example Order Confirmation", "content": [{"type": "text/html", "value": "<p>Hello from Twilio SendGrid!</p><p>Sending with the email service trusted by developers and marketers for <strong>time-savings</strong>, <strong>scalability</strong>, and <strong>delivery expertise</strong>.</p><p>%open-track%</p>"}], "attachments": [{"content": "PCFET0NUWVBFIGh0bWw+CjxodG1sIGxhbmc9ImVuIj4KCiAgICA8aGVhZD4KICAgICAgICA8bWV0YSBjaGFyc2V0PSJVVEYtOCI+CiAgICAgICAgPG1ldGEgaHR0cC1lcXVpdj0iWC1VQS1Db21wYXRpYmxlIiBjb250ZW50PSJJRT1lZGdlIj4KICAgICAgICA8bWV0YSBuYW1lPSJ2aWV3cG9ydCIgY29udGVudD0id2lkdGg9ZGV2aWNlLXdpZHRoLCBpbml0aWFsLXNjYWxlPTEuMCI+CiAgICAgICAgPHRpdGxlPkRvY3VtZW50PC90aXRsZT4KICAgIDwvaGVhZD4KCiAgICA8Ym9keT4KCiAgICA8L2JvZHk+Cgo8L2h0bWw+Cg==", "filename": "index.html", "type": "text/html", "disposition": "attachment"}], "categories": ["cake", "pie", "baking"], "send_at": 1617260400, "batch_id": "AsdFgHjklQweRTYuIopzXcVBNm0aSDfGHjklmZcVbNMqWert1znmOP2asDFjkl", "asm": {"group_id": 12345, "groups_to_display": [12345]}, "ip_pool_name": "transactional email", "mail_settings": {"bypass_list_management": {"enable": false}, "footer": {"enable": false}, "sandbox_mode": {"enable": false}}, "tracking_settings": {"click_tracking": {"enable": true, "enable_text": false}, "open_tracking": {"enable": true, "substitution_tag": "%open-track%"}, "subscription_tracking": {"enable": false}}}'
```
