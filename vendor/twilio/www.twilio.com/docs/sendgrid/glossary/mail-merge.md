# Mail merge

*Marketing*. A process that generates customized email messages from a generic template and store of contact data.

* The original document, or [*template*][], contains static text with placeholders for substitutions for data like names, addresses, emails, or other unique information.
* Most data that populates these placeholders comes from a database, spreadsheet, or CSV file.
* The column headings in a spreadsheet or field names in a database map to the template's placeholder labels.
* During the merge, the process replaces placeholders with the data from a database record or row and creates a customized email.

Mail merges can also create customized letters and documents using a word processor and spreadsheet.

## Mail merge functionality with Twilio SendGrid

To replicate this functionality in Twilio SendGrid, use the [SMTP API][].

* For marketing emails, use [Substitution Tags][] and [Custom Fields][] in [Marketing Campaigns][]
* For transactional emails, use the [transactional templates application][].

[SMTP API]: /docs/sendgrid/for-developers/sending-email/building-an-x-smtpapi-header

[Substitution Tags]: /docs/sendgrid/for-developers/sending-email/substitution-tags

[Custom Fields]: /docs/sendgrid/ui/managing-contacts/custom-fields

[Marketing Campaigns]: /docs/sendgrid/ui/managing-contacts/create-and-manage-contacts

[transactional templates application]: /docs/sendgrid/api-reference/transactional-templates/create-a-transactional-template

[*template*]: /docs/sendgrid/glossary/transactional-email-templates
