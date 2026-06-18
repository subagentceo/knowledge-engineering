# Email Address Validation Overview

Email Address Validation provides detailed information on the validity of email addresses. Validating email addresses allows you to remove non-deliverable email addresses from your lists, which helps to decrease your bounce rate, clean up your subscriber list, and ultimately improve your sender reputation.

You can validate one email address at a time - best for checking addresses as they enter your customer funnel - or you can clean your existing database by bulk validating up to one million email addresses.

## Real Time

The Real Time Email Address Validation API provides real-time detailed information on the validity of email addresses. This API validates one address at a time. SendGrid provides the validation information in the response to your API request. You can use this API to:

* Indicate to users that the address they have entered into a form is invalid.
* Prevent invalid email addresses from entering your database

To get started with the Real Time API, check out the following pages:

* [Real Time Email Address Validation Overview](/docs/sendgrid/ui/managing-contacts/email-address-validation/real-time-email-address-validation-overview)
* [Real Time Email Address Validation API Reference](/docs/sendgrid/api-reference/email-address-validation/validate-an-email)

## Bulk validation

The Bulk Email Address Validation API allows you to upload a CSV or a compressed CSV file (in .zip format) to a unique URL, which SendGrid then asynchronously validates. Once complete, SendGrid sends the results in CSV format to the email address associated with the SendGrid Account.

You can use this API to help you remove invalid email addresses from your existing lists.

To get started with the Bulk API, check out the following resources:

* [Bulk Email Address Validation Overview](/docs/sendgrid/ui/managing-contacts/email-address-validation/bulk-email-address-validation-overview)
* [Bulk Email Address Validation API Reference](/docs/sendgrid/api-reference/email-address-validation/request-bulk-email-address-validation-upload-url)
