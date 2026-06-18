# Choose an email editor

The Twilio SendGrid email design experience seeks to support your unique workflow. To design and edit your email messages, Twilio provides two distinct editing experiences.

## Choose from code or visual editing options

Both editors provide similar features and results. The choice lies in how you like to work. The following sections describe each editor and their shared functionalities.

If you want to import, create, or edit custom HTML code, use the [**code editor**][code-editor]. This editor includes a rendered preview in a split screen with synchronized scrolling. It also highlights code syntax and flag any errors in the code. This editor doesn't add excess code or modify your code.

If you want *what you see is what you get* (WYSIWYG) editing, use the [**design editor**][design-editor]. This editor includes a library of pre-packaged blocks of content called *modules*. You can drag and drop these modules into your email message. To customize the content, you can edit the HTML.

> \[!WARNING]
>
> Open only one instance of a template or email message in an editor at a time. Multiple instances in different browsers or computers results in autosave conflicts. You can't roll back changes in the editors.

## Features common to both editors

Both the code and design editors share the following common features.

### Add dynamic data with Handlebars syntax

Both editors support dynamic data using [Handlebars][] syntax. [Dynamic data][handlebars-data] includes any content that personalizes a design. This can include a customer's name or order confirmation number. To ensure your dynamic values behave the way you expect, you can use test data and view the result in the editor's preview pane.

Beyond value substitution, use the Handlebars syntax in your designs to [format dates][], [iterate over lists][], and [conditionally render values][]. To learn more about Handlebars in the Twilio editors, see the [Handlebars documentation][].

### Create value placeholders with substitution tags

To generate unique content for each recipient of your email message, include substitution tags.
This can include any reserved or custom field data.

As an example, you can add a recipient's first name to the body or subject line of your email.

The data that displays where you place your substitution tags come contact data. To learn how to manage this data, see the [Marketing Campaigns Contacts][].

In addition to the following reserved fields that are available on all contacts by default, you can add your own [Custom Fields][tsg-cf] with Marketing Campaigns. When building Marketing Campaigns designs, find your **Custom Fields** in the **Tags** tab of the editors.

To learn more about managing these fields, see [Custom Fields][cf-docs].

> \[!NOTE]
>
> For contacts with no entry in a custom field, the substitution tag appears blank. To set a default value for a tag, use the following syntax:
>
> ```html
> {{insert first_name "default=Valued Customer"}}
> ```

#### Reserved substitution tags

Twilio SendGrid provides the following default substitution tags. The related data exists in each of your contacts.

#### View the Handlebars-based substitution tags

Twilio SendGrid provides the following recipient substitution tags.

| Substitution tag                | Substituted with                                                                                                                                                    |
| ------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `{{first_name}}`                | The first name of the recipient                                                                                                                                     |
| `{{last_name}}`                 | The last name of the recipient                                                                                                                                      |
| `{{email}}`                     | The email address of the recipient                                                                                                                                  |
| `{{alternate_emails}`           | Alternate emails of the recipient                                                                                                                                   |
| `{{address_line_1}}`            | The first line of the address of the recipient                                                                                                                      |
| `{{address_line_2}}`            | The second line of the address of the recipient                                                                                                                     |
| `{{city}}`                      | The city of the recipient                                                                                                                                           |
| `{{state_province_region}}`     | The region of the recipient                                                                                                                                         |
| `{{postal_code}}`               | The postal code of the recipient                                                                                                                                    |
| `{{country}}`                   | The country of the recipient                                                                                                                                        |
| `{{phone_number}}`              | The phone number of the recipient                                                                                                                                   |
| `{{whatsapp}}`                  | The WhatsApp number of the recipient                                                                                                                                |
| `{{line}}`                      | The line of the recipient                                                                                                                                           |
| `{{facebook}}`                  | The facebook of the recipient                                                                                                                                       |
| `{{unique_name}}`               | The unique name of the recipient                                                                                                                                    |
| `{{{unsubscribe}}}`             | A link to unsubscribe from any emails you send.                                                                                                                     |
| `{{{unsubscribe_preferences}}}` | A list of the recipient's unsubscribe options based on your unsubscribe groups and a link to your unsubscribe preferences page.                                     |
| `{{Weblink}}`                   | A link that opens the email on a Twilio SendGrid-hosted web page. This allows recipients to view an email when an email client fails to open or render the message. |

The Unsubscribe Module includes the following substitution tags on the **Tags** tab of the [design editor][design-editor].

| Substitution tag     | Substituted with                                                       |
| -------------------- | ---------------------------------------------------------------------- |
| `{{Sender_Name}}`    | The name of the sender selected when sending your email                |
| `{{Sender_Email}}`   | The email of the sender selected when sending your email               |
| `{{Sender_Address}}` | The address on record for the sender selected when sending your email  |
| `{{Sender_City}}`    | The city on record for the sender selected when sending your email     |
| `{{Sender_State}}`   | The state on record for the sender selected when sending your email    |
| `{{Sender_Zip}}`     | The zip code on record for the sender selected when sending your email |
| `{{Sender_Country}}` | The country on record for the sender selected when sending your email  |

#### View the HTML-based unsubscribe tags

The Unsubscribe Module includes the following substitution tags on the **Tags** tab of the [design editor][design-editor].

| Substitution tag                      | Substitutes a link to unsubscribe the recipient from    |
| ------------------------------------- | ------------------------------------------------------- |
| `<%asm_group_unsubscribe_ raw_url%>`  | Any emails you send using the chosen Unsubscribe Group. |
| `<%asm_global_unsubscribe_ raw_url%>` | All email communication.                                |
| `<%asm_preferences_ raw_url%>`        | Any email unsubscribe groups you offer.                 |

Twilio reserves these *Advanced Subscription Management* (ASM) tags for use with the Email API. *Never* use them in Marketing Campaigns.

To see how to work with substitution tags, see the related section in the [code editor][code-tags] and [design editor][design-tags] guides.

### Populate message with test data

Both editors provide a data preview feature. This means you can add the reserved and custom fields stored on a contact as well as any other variables you wish to pass into your template, such as order confirmation data. Test data provides a way to be sure that your final design will populate and render the substitutions properly.

If you wanted to collaborate on a design for example, having test data stored directly in the design means each teammate can reference the data structure used to populate substitution tags without having to dig into a code base.

To see how to work with test data, see the related section in the [code editor][code-test] and the [design editor][design-test] guides.

### Categorize single send messages

#### Warning about categories and personal information

> \[!CAUTION]
>
> Twilio stores category names as non-[*personally identifiable information* (PII)][pii]. Twilio SendGrid doesn't treat this data as PII.
>
> * Twilio can use this data for counting or other operations as Twilio SendGrid runs its systems.
> * You can't redact or remove these fields.
> * Twilio employees can view this value.
> * Twilio stores this data long-term, even after you've left the Twilio SendGrid platform.

[pii]: /docs/glossary/what-is-personally-identifiable-information-pii

To track emails based on topics you choose, assign categories to your single send message. Each single send supports only 10 categories. With categories, you can track statistics across similar Single Sends and Automations.

**For example**: Your emails might fall into two broad topics: newsletters and announcements. To track these topics across multiple email messsages, add categories like `Weekly Digest` or `Product Announcements`.

To learn how to add categories, see the [code editor][code-cat] and [design editor][design-cat] guides.

### Undo and redo functionality

Both editors provide undo and redo functionality using the undo and redo buttons in the the editor or keyboard shortcuts.

> \[!NOTE]
>
> * **Undo** : `Command` or `Control` + `Z`
> * **Redo** : `Command` or `Control` + `Shift` + `Z`

## Additional resources

* [Send an Email][]
* [A/B Testing][]
* [Campaign Statistics][]
* [Marketing Campaigns Email Designs][]

## Next steps

* [Use the code editor][code-editor]
* [Use the design editor][design-editor]

[A/B Testing]: /docs/sendgrid/ui/sending-email/a-b-testing

[Campaign Statistics]: /docs/sendgrid/ui/analytics-and-reporting/marketing-campaigns-stats

[code-cat]: /docs/sendgrid/ui/sending-email/code-editor#add-categories

[code-editor]: /docs/sendgrid/ui/sending-email/code-editor

[code-tags]: /docs/sendgrid/ui/sending-email/code-editor#use-substitution-tags

[code-test]: /docs/sendgrid/ui/sending-email/code-editor#test-data

[conditionally render values]: /docs/sendgrid/for-developers/sending-email/using-handlebars/#conditional-statements

[cf-docs]: /docs/sendgrid/ui/managing-contacts/custom-fields

[tsg-cf]: https://mc.sendgrid.com/custom-fields

[design-cat]: /docs/sendgrid/ui/sending-email/design-editor#add-categories

[design-editor]: /docs/sendgrid/ui/sending-email/design-editor

[design-tags]: /docs/sendgrid/ui/sending-email/design-editor#use-substitution-tags

[design-test]: /docs/sendgrid/ui/sending-email/design-editor#test-data

[format dates]: /docs/sendgrid/for-developers/sending-email/using-handlebars/#formatdate

[Handlebars documentation]: /docs/sendgrid/for-developers/sending-email/using-handlebars

[handlebars-data]: /docs/sendgrid/ui/sending-email/adding-dynamic-content-with-handlebars-in-marketing-campaigns

[Handlebars]: /docs/sendgrid/for-developers/sending-email/using-handlebars

[iterate over lists]: /docs/sendgrid/for-developers/sending-email/using-handlebars/#iterations

[Marketing Campaigns Contacts]: https://mc.sendgrid.com/contacts

[Marketing Campaigns Email Designs]: /docs/sendgrid/ui/sending-email/working-with-marketing-campaigns-email-designs

[Send an Email]: /docs/sendgrid/ui/sending-email/how-to-send-email-with-marketing-campaigns
