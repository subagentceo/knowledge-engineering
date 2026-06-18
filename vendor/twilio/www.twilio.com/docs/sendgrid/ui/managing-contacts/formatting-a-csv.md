# Formatting a CSV

> \[!NOTE]
>
> These tutorials cover the latest version of Marketing Campaigns. If you're using the legacy version of Marketing Campaigns, your experience might differ. To send email with the Twilio SendGrid Email API, see the [API reference][] or the [SMTP Reference][].

[API reference]: /docs/sendgrid/api-reference

[SMTP Reference]: /docs/sendgrid/for-developers/sending-email/getting-started-smtp

To add contacts to your contact database, upload a comma-separated value (CSV) file into Marketing Campaigns.

* Save a spreadsheet as a CSV file.
* Export your contacts from most database systems as a CSV file.
* Before uploading a CSV file generated in another application, check it for issues in a plain-text editor like NotePad or TextEdit.

## General formatting rules

To upload a CSV into Marketing Campaigns, format your data using the following rules. To see an example, [download this sample CSV][].

***

email: example@example.com
first\_name: John
last\_name: Doe
address\_line\_1: 123 Neverland Lane
address\_line\_2: Suite 42
city: Denver
state\_province\_region: CO
postal\_code: 80202
country: USA
phone\_number\_id: +18778894546
&#x20;external\_id: example\_external\_id
&#x20;anonymous\_id: example\_anonymous\_id

***

### Contact info

Your CSV requires the following information about each contact:

* `email` or `phone_number_id` or `external_id` or `anonymous_id` (choose one)
* `first_name`
* `last_name`

You can use other [reserved fields][] such as `city` and `zipcode`. You can also include [custom fields][] with additional identifying information for each contact in the CSV.

**For example**: You could specify `birthday`, `occupation`, and `age` as the custom fields. The data in the custom fields aid in segmentation and content personalization.

### Header row

The first row of your CSV must include labels for each column. These labels are also called *fields*.

* These labels can only use letters, numbers, and underscores.
* Header fields don't need to be in your CSV, but must be assigned a label and defined data type during the upload process.
* If you add custom field data to your CSV, use the defined custom field label as the header label.
* One of the header fields must be the unique identifier for your contacts: `email`, `phone_number_id`, `external_id`, or `anonymous_id`.
  * Without one of the required identifier columns, Twilio SendGrid doesn't add your contact, but continues with the remainder of the upload. For this reason, the number of contacts might change between your CSV and your Marketing Campaigns list.

### Use Unicode character encoding

If your contacts list has non-English characters, encode your CSV file with [UTF-8][].

### Remove invalid and duplicate identifiers

Twilio SendGrid removes duplicate and invalid identifiers.

* Invalid identifers include email addresses with any special characters except for underscores.
* Each contact requires at least one unique identifier per contact.
* When updating a contact, include *all* of its existing identifiers.

### Numbers and text format

* When uploading your CSV, choose the correct data type as your Field type.
* Numbers data types can't include anything other than numbers or a decimal separator.\
  Twilio considers the inclusion of any other character makes the value a string.

  ```bash {title="Examples of string field types with numbers in them"}
  - US Zip Code: 80202-1713
  - Phone numbers: "(555) 555-5555" or "555.555.5555"
  - Monetary Values with the currency indicator such as $3.50 or €5.73
  ```

| Text field examples | Number field examples |
| ------------------- | --------------------- |
| $9.95               | 9.95                  |
| -100                | 100                   |
| 123.45.67.890       | 100.00                |

### Date format

Use one of the following date formats:

* `MM/DD/YYYY`
* \`MM/D/YYYY
* `M/D/YYYY`
* `M/DD/YYYY`

## Troubleshooting

When uploading a CSV to Marketing Campaigns, you might encounter the following errors. To correct the root issue, see the offered options.

### We were unable to detect an identifier column in the CSV file headers. The identifier column must always have a header of `email`, `phone_number_id`, `external_id`, or `anonymous_id`

* If you include a header labeled as one of the accepted identifiers, move it to the first position in your header row.
* Your CSV must include a header with one of the accepted identifiers.

```text {title="Bad example with incorrect identifier header label"}
Email Address,first_name,last_name
emailtesting@gmail.com,John,Doe
```

```text {title="Good example with correct identifier header label"}
email,first_name,last_name
emailtesting@gmail.com,John,Doe
```

### Some of your custom fields have not been selected

* Look for hidden characters in your CSV file.
* Select all data in your spreadsheet and copy your data to a new CSV spreadsheet. This should remove any hidden characters.

### Each custom field can only be applied to a column once. Please check your columns and try again

Your CSV can't have duplicate fields. This applies to fields with values that match your `email`, `first_name` and `last_name` fields. These reserved field names can't be edited.

* **For example**: If you have a `Name` field, it may conflict with your `first_name` reserved field.

```text {title="Bad example with ambiguous header labels"}
email,first_name,last_name,Name
emailtesting@gmail.com,John,Doe,Twilio
```

```text {title="Good example with distinct header labels"}
email,first_name,last_name,Company_Name
emailtesting@gmail.com,John,Doe,Twilio
```

### We were unable to detect any headers in your CSV file

Include header fields at the top of each column. All CSV uploads must contain the `email` header. Header fields can be blank in your CSV but must be defined later during the upload process.

```text {title="Bad example without a header row"}
emailtesting@gmail.com,John,Doe
```

```text {title="Good example with a header row"}
email,first_name,last_name
emailtesting@gmail.com,John,Doe
```

### Float type conversion error

* Categorize dashes or decimal places that are past the hundredth place as `text_fields` (-100, 123.123 are text fields, 100, 12.12 can be number fields).
* Number fields can include monetary values without the currency symbols. For example, 19.95 would be a number field, and $19.95, including the ($), would be a text field.
* As you are uploading your CSV, make sure you select the correct fields for your Field type.

| Text field examples | Number field examples |
| ------------------- | --------------------- |
| $9.95               | 9.95                  |
| -100                | 100                   |
| 123.45.67.890       | 100.00                |

### We encountered an error attempting to process your CSV file. Please ensure the file is a valid CSV file

## Additional resources

* [Contacts API][]
* [Segmenting your Contacts][]
* [Building your Contact list][]

[Building your Contact list]: /docs/sendgrid/ui/managing-contacts/building-your-contact-list

[Contacts API]: /docs/sendgrid/api-reference/contacts

[custom fields]: /docs/sendgrid/ui/managing-contacts/custom-fields

[Download this sample CSV]: /documents/contacts-upload-example-updated_2.csv

[reserved fields]: /docs/sendgrid/ui/managing-contacts/custom-fields/#reserved-fields

[Segmenting your Contacts]: /docs/sendgrid/ui/managing-contacts/segmenting-your-contacts

[UTF-8]: /docs/glossary/what-utf-8
