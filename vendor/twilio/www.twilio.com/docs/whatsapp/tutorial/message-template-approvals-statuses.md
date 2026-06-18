# Message template approvals and statuses

This article describes the WhatsApp template approval process and covers best practices for improving approval rates. To learn more about message templates, see [Message templates](/docs/whatsapp/key-concepts#message-templates) and [Send WhatsApp notification messages with templates](/docs/whatsapp/tutorial/send-whatsapp-notification-messages-templates).

## Message template approval criteria

WhatsApp generally rejects a template for one of the following reasons:

1. The format is incorrect (for example, misplaced or malformed placeholders).
2. The content violates WhatsApp's Terms of Service, Commerce Policy, or Business Policy, or is considered abusive.
3. The template is too generic and includes placeholders that could be used for abuse.

Because placeholders can resolve to many words, WhatsApp does not allow a placeholder at the beginning or end of the message. Such placement results in automatic rejection.

### Approval period

After you submit a template, WhatsApp typically approves or rejects it within minutes through a machine-learning assisted process. Templates that cannot be triaged automatically are routed for human review and can take up to 48 hours. If a template remains in the **Pending** state for more than 48 hours, open a Twilio support ticket and include the template name.

### Template statuses

WhatsApp templates can have the following statuses:

* **Pending**: The template is under review. Review can take up to 48 hours.
* **Approved**: The template was approved and can be sent to customers.
* **Rejected**: The template was rejected during review.
* **Paused**: The template was paused because of recurring negative user feedback (for example, blocks or spam reports). Messages that use this template cannot be sent.
* **Disabled**: The template was disabled because of repeated negative feedback or a policy violation. Messages that use this template cannot be sent.

The next sections explain how to gain approval and how to resolve paused or deactivated statuses.

## Tips for creating templates

* If you are unsure how to phrase a template, submit an initial version, review the outcome, and iterate. You can create a new version and delete the old one at any time.
* When you need to reopen the 24-hour user-initiated window, reference the previous conversation thread. Example: "I'm sorry I could not respond to your concerns yesterday. If you would like to continue, reply with YES."
* A friendly tone can improve engagement. Selective use of emojis (fewer than 10 per template) may help.

### Common rejection reasons

| **Rejection reason**                                                                                                                                                        | **How to resolve**                                                                                                                         |
| --------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------ |
| A variable is at the beginning or end of the message.                                                                                                                       | Add text or punctuation before or after the variable.                                                                                      |
| Variables are adjacent to each other (for example, `{{1}}{{2}}`).                                                                                                           | Insert at least one word between variables or combine the content into a single variable.                                                  |
| Variable numbers are not sequential (for example, `{{1}}`, `{{2}}`, `{{4}}`).                                                                                               | Ensure that placeholders are sequential (`{{1}}`, `{{2}}`, `{{3}}`, …).                                                                    |
| The template contains newlines, tabs, or more than four consecutive spaces.                                                                                                 | Remove the extra whitespace. See [Meta's rules](https://developers.facebook.com/docs/whatsapp/message-templates/creation/).                |
| A call-to-action includes a direct WhatsApp link such as `https://wa.me/14154443344`.                                                                                       | Spell out the phone number without using a `wa.me` link.                                                                                   |
| The template duplicates an existing template with a different name (OTP templates are exempt).                                                                              | Modify both the template name and content before resubmitting.                                                                             |
| The content violates the [WhatsApp Commerce Policy](https://www.whatsapp.com/legal/commerce-policy/) or [Business Policy](https://www.whatsapp.com/legal/business-policy/). | Revise the content to comply with policy. For sensitive identifiers, request only partial information (for example, the last four digits). |
| The template appears related to gaming or gambling (for example, "raffle" or "win a prize").                                                                                | Replace words that could be interpreted as gaming or gambling terminology.                                                                 |
| The template is overly vague (for example, "Hi, `{{1}}`, thanks").                                                                                                          | Provide additional context so WhatsApp can understand how the template will be used.                                                       |
| The language selected does not match the template content.                                                                                                                  | Select the correct language before submitting.                                                                                             |
| The template contains more than 10 emojis.                                                                                                                                  | Reduce the number of emojis.                                                                                                               |

### Revising rejected message templates

If WhatsApp rejects a template, the Twilio Console displays a rejection code that explains why. Submit a new template with a different name and delete the rejected one. WhatsApp prevents reuse of the same template name for 30 days.

WhatsApp discloses the following rejection codes:

* **TAG\_CONTENT\_MISMATCH** – The selected language or category does not match the content.
* **INVALID\_FORMAT** – The template includes incorrectly formatted placeholders or elements.

If resubmissions continue to be rejected, add more detail to clarify the template's intended use. For example: "You asked us to let you know about \[Topic]." If you believe a template was rejected in error, open a Twilio support ticket with a detailed explanation so Twilio can request a review from WhatsApp.

## Examples of approved and rejected templates

### Approved

* `👋 Welcome {{1}}. What company do you work for?`
* `Your {{1}} appointment is coming up on {{2}}. Have a nice day.`
* `Your {{1}} appointment is coming up on {{2}}. Reply with {{3}} or {{4}}. Thank you.`
* `Dear {{1}}: Unfortunately your pending booking did not go through.`\
  `No charges were made to your bank account.`\
  `You can try to rebook the hotel.`\
  `We apologize for the inconvenience.`

### Rejected

Templates that lack sufficient context:

* `Reminder: {{1}}`
* `{{1}} was added`
* `{{1}}, {{2}}!`

Templates considered spam:

* `I am Jenn, the virtual assistant.`
* `Hi, are you available?`
* `We will put our platform up and running soon. I would like to get to know you better by asking 5 questions.`
* `Do not worry, I will not share your answers with anyone.`

## Guidance on template categorization

### Meta's definition of template categories

Meta enforces strict definitions for **Authentication** and **Utility** templates:

* Authentication templates follow a predefined structure for one-time passwords.
* Utility templates relate to a specific, user-initiated transaction and do one of the following: confirm, suspend, or change a transaction or subscription. Since 30 October 2023, Utility also includes feedback surveys, managing user-requested opt-in, or continuing a conversation started by the user in another channel.

Any template that does not meet these definitions is categorized as **Marketing**, including any mix of Marketing and Utility content. For details, see [Meta's template guidelines](https://developers.facebook.com/docs/whatsapp/updates-to-pricing/new-template-guidelines/).

### Choose the category with Content templates

To select the category, use the [Content Editor or Content API](/docs/content). If Meta detects a misclassification, they might override the category.

### Guidance for Marketing templates

> \[!NOTE]
>
> To achieve higher marketing delivery rates and improved optimizations, you can enable Marketing Messages API on your account. To get started, sign the Marketing Messages API Terms of Service in your WhatsApp Business Account. You can find the option to set up Marketing Messages API in the Overview section under Alerts. Enabling Marketing Messages API can also help reduce Error 63049.

You can deliver a comparable or greater number of messages than Cloud API. Marketing Messages API provides more dynamic messaging limits, allowing high-engagement messages to reach more customers.

Marketing Messages API introduces new marketing and measurement capabilities. This includes features not available on Cloud API, such as performance benchmarks, recommendations in WhatsApp Manager, and time-to-live for marketing.

In India, WhatsApp marketing messages sent via MM API show higher engagement (such as reads) and achieve 9% more messages delivered compared to Cloud API.

### Guidance for Utility templates

Meta's categorization engine can misclassify legitimate Utility templates as Marketing. To reduce the likelihood of misclassification:

* Avoid generic placeholders such as "Important message: `{{1}}`." Spell out the expected content.
* Make it clear that the user requested the interaction. For example: "We are following up on your inquiry."
* Some keywords trigger a Marketing classification. Consider A/B testing alternative phrases.
* Utility templates may include media. You can submit a generic image for review and replace it with a specific image at send time without additional approval.
* Use a descriptive title such as `safety_alert` or `account_update` to indicate the Utility nature of the template.
