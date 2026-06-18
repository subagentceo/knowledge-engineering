# Substitution and Section Tags

> \[!NOTE]
>
> If you prefer to use Twilio SendGrid [Dynamic Transactional Templates](/docs/sendgrid/ui/sending-email/how-to-send-an-email-with-dynamic-templates) and [Marketing Campaigns designs](/docs/sendgrid/ui/sending-email/working-with-marketing-campaigns-email-designs/), use [Handlebars](/docs/sendgrid/for-developers/sending-email/using-handlebars).

## Simple Name Substitution

This example will show you how to create a name substitution for your emails. We will be using the tag `-name-` in this example. In this example, the tag `-name-` will get replaced with the name of the recipient.

### Email Content

```bash
Hello -name-,
```

### HTML

```html
<html>
  <head></head>
  <body>
    <p>Hello -name-,<br /></p>
  </body>
</html>
```

### X-SMTPAPI Header

```json
{
  "to": ["john@domain.com", "jane@domain.com", "matt@domain.com"],
  "sub": {
    "-name-": ["John", "Jane", "Matt"]
  }
}
```

### v3 Mail Send

```json
{
  "personalizations": [
    {
      "to": [
        {
          "email": "john@domain.com",
          "name": "John"
        }
      ],
      "subject": "Example 01",
      "substitutions": {
        "-name-": "John"
      }
    },
    {
      "to": [
        {
          "email": "jane@domain.com",
          "name": "Jane"
        }
      ],
      "subject": "Example 02",
      "substitutions": {
        "-name-": "Jane"
      }
    },
    {
      "to": [
        {
          "email": "matt@domain.com",
          "name": "Matt"
        }
      ],
      "subject": "Example 03",
      "substitutions": {
        "-name-": "Matt"
      }
    }
  ],
  "from": {
    "email": "sender@senddomain.com",
    "name": "Sender"
  },
  "reply_to": {
    "email": "sender@senddomain.com",
    "name": "Sender"
  },
  "subject": "Example",
  "content": [
    {
      "type": "text/plain",
      "value": "Hello -name-,"
    },
    {
      "type": "text/html",
      "value": "Hello -name-,"
    }
  ]
}
```

### Example Outcome

[john@domain.com](mailto:john@domain.com)

### Text

```bash
Hello John,
```

### HTML \[#html-2]

```html
<html>
  <head></head>
  <body>
    <p>Hello John,<br /></p>
  </body>
</html>
```

### Example Outcome: \[#example-outcome-2]

[jane@domain.com](mailto:jane@domain.com)

### Text \[#text-2]

```bash
Hello Jane,
```

### HTML \[#html-3]

```html
<html>
  <head></head>
  <body>
    <p>Hello Jane,<br /></p>
  </body>
</html>
```

### Example Outcome: \[#example-outcome-3]

[matt@domain.com](mailto:matt@domain.com)

### Text \[#text-3]

```bash
Hello Matt,
```

### HTML \[#html-4]

```html
<html>
  <head></head>
  <body>
    <p>Hello Matt,<br /></p>
  </body>
</html>
```

## First Name and Last Name Substitutions

This example will show you how to create a first name and last name substitution for your emails. We will be using the tags `-first_name-` and `-last_name-` in this example. In this example the tag `-first_name-` will get replaced with the first name of the recipient and the tag `-last_name-` will get replaced with the last name of the recipient.

### Text \[#text-4]

```bash
Hello -first_name-  -last_name-,
```

### HTML \[#html-5]

```html
<html>
  <head></head>
  <body>
    <p>Hello -first_name- -last_name-,<br /></p>
  </body>
</html>
```

### X-SMTPAPI Header \[#x-smtpapi-header-2]

```json
{
  "to": [
    "john.smith@domain.com",
    "jane.williams@domain.com",
    "matt.johnson@domain.com"
  ],
  "sub": {
    "-first_name-": ["John", "Jane", "Matt"],
    "-last_name-": ["Smith", "Williams", "Johnson"]
  }
}
```

### v3 Mail Send \[#v3-mail-send-2]

```json
{
  "personalizations": [
    {
      "to": [
        {
          "email": "john.smith@domain.com",
          "name": "John Smith"
        }
      ],
      "subject": "Example 01",
      "substitutions": {
        "-first_name-": "John",
        "-last_name-": "Smith"
      }
    },
    {
      "to": [
        {
          "email": "jane.williams@domain.com",
          "name": "Jane Williams"
        }
      ],
      "subject": "Example 02",
      "substitutions": {
        "-first_name-": "Jane",
        "-last_name-": "Williams"
      }
    },
    {
      "to": [
        {
          "email": "matt.johnson@domain.com",
          "name": "Matt Johnson"
        }
      ],
      "subject": "Example 03",
      "substitutions": {
        "-first_name-": "Matt",
        "-last_name-": "Johnson"
      }
    }
  ],
  "from": {
    "email": "sender@senddomain.com",
    "name": "Sender"
  },
  "reply_to": {
    "email": "sender@senddomain.com",
    "name": "Sender"
  },
  "subject": "Example",
  "content": [
    {
      "type": "text/plain",
      "value": "Hello -first_name- -last_name-,"
    },
    {
      "type": "text/html",
      "value": "Hello -first_name- -last_name-,"
    }
  ]
}
```

### Example Outcome: \[#example-outcome-4]

[john.smith@domain.com](mailto:john.smith@domain.com)

### Text \[#text-5]

```bash
Hello John Smith,
```

### HTML \[#html-6]

```html
<html>
  <head></head>
  <body>
    <p>Hello John Smith,<br /></p>
  </body>
</html>
```

### Example Outcome: \[#example-outcome-5]

[jane.williams@domain.com](mailto:jane.williams@domain.com)

### Text \[#text-6]

```bash
Hello Jane Williams,
```

### HTML \[#html-7]

```html
<html>
  <head></head>
  <body>
    <p>Hello Jane Williams,<br /></p>
  </body>
</html>
```

### Example Outcome: \[#example-outcome-6]

[matt.johnson@domain.com](mailto:matt.johnson@domain.com)

### Text \[#text-7]

```bash
Hello Matt Johnson,
```

### HTML \[#html-8]

```html
<html>
  <head></head>
  <body>
    <p>Hello Matt Johnson,<br /></p>
  </body>
</html>
```

## Simple Greeting Section with Name Substitution

> \[!CAUTION]
>
> Due to low usage, the Section Tags feature has been deprecated. It will be fully removed on 06/22/2020. Click [here](/docs/sendgrid/ui/account-and-settings/retired-mail-settings/) for more information.

This example will show you how to create a section as a greeting with a name substitution. We will be using the tags `-warm_welcome-`, `-greeting-` and `-name-` in this example. In this example, we have created a greeting using the section tag `-warm_welcome-`. The `-warm_welcome-` tag is replaced with the `-greeting-` substitution which calls the section `"Hello -name-,"`. The `-name-` tag in `"Hello -name-,"` is then replaced with the recipient's name.

### Text \[#text-8]

```bash
-warm_welcome-
```

### HTML \[#html-9]

```html
<html>
  <head></head>
  <body>
    <p>-warm_welcome-<br /></p>
  </body>
</html>
```

### X-SMTPAPI Header \[#x-smtpapi-header-3]

```json
{
  "to": ["john@domain.com", "jane@domain.com", "matt@domain.com"],
  "sub": {
    "-name-": ["John", "Jane", "Matt"],
    "-warm_welcome-": ["-greeting-", "-greeting-", "-greeting-"]
  },
  "section": {
    "-greeting-": "Hello -name-,"
  }
}
```

### v3 Mail Send \[#v3-mail-send-3]

```json
{
  "personalizations": [
    {
      "to": [
        {
          "email": "john@domain.com",
          "name": "John"
        }
      ],
      "subject": "Example 01",
      "substitutions": {
        "-name-": "John",
        "-warm_welcome-": "-greeting-"
      }
    },
    {
      "to": [
        {
          "email": "jane@domain.com",
          "name": "Jane"
        }
      ],
      "subject": "Example 02",
      "substitutions": {
        "-name-": "Jane",
        "-warm_welcome-": "-greeting-"
      }
    },
    {
      "to": [
        {
          "email": "matt@domain.com",
          "name": "Matt"
        }
      ],
      "subject": "Example 03",
      "substitutions": {
        "-name-": "Matt",
        "-warm_welcome-": "-greeting-"
      }
    }
  ],
  "from": {
    "email": "sender@senddomain.com",
    "name": "Sender"
  },
  "reply_to": {
    "email": "sender@senddomain.com",
    "name": "Sender"
  },
  "subject": "Example",
  "content": [
    {
      "type": "text/plain",
      "value": "-warm_welcome-"
    },
    {
      "type": "text/html",
      "value": "<html>\n  <head></head>\n  <body>\n    <p>-warm_welcome- \n    </p>\n   </body>\n</html>"
    }
  ],
  "sections": {
    "-greeting-": "Welcome -name-,"
  }
}
```

### Example Outcome: \[#example-outcome-7]

```bash
john@domain.com
```

### Text \[#text-9]

```bash
Hello John,
```

### HTML \[#html-10]

```html
<html>
  <head></head>
  <body>
    <p>Hello John,<br /></p>
  </body>
</html>
```

### Example Outcome: \[#example-outcome-8]

[jane@domain.com](mailto:jane@domain.com)

### Text \[#text-10]

```bash
Hello Jane,
```

### HTML \[#html-11]

```html
<html>
  <head></head>
  <body>
    <p>Hello Jane,<br /></p>
  </body>
</html>
```

### Example Outcome: \[#example-outcome-9]

[matt@domain.com](mailto:matt@domain.com)

### Text \[#text-11]

```bash
Hello Matt,
```

### HTML \[#html-12]

```html
<html>
  <head></head>
  <body>
    <p>Hello Matt,<br /></p>
  </body>
</html>
```

## Greeting Section with First & Last Name Substitutions

This example will show you how to create a section with first name and last name substitution for your emails. We will be using the tags `-warm_welcome-`, `-greeting-`, `-first_name-` and `-last_name-` in this example. In this example, we have created a greeting using the section tag `-warm_welcome-`. The `-warm_welcome-` tag is replaced with the `-greeting-` substitution which calls the section `"Hello -first_name- -last_name-,"`. The `-first_name-` and `-last_name-` tags in `"Hello -first_name- -last_name-,"` is then replaced with the recipients first and last names.

### Text \[#text-12]

```bash
-warm_welcome-
```

### HTML \[#html-13]

```html
<html>
  <head></head>
  <body>
    <p>-warm_welcome-<br /></p>
  </body>
</html>
```

### X-SMTPAPI Header \[#x-smtpapi-header-4]

```json
{
  "to": [
    "john.smith@domain.com",
    "jane.williams@domain.com",
    "matt.johnson@domain.com"
  ],
  "sub": {
    "-first_name-": ["John", "Jane", "Matt"],
    "-last_name-": ["Smith", "Williams", "Johnson"],
    "-warm_welcome-": ["-greeting-", "-greeting-", "-greeting-"]
  },
  "section": {
    "-greeting-": "Hello -first_name- -last_name-,"
  }
}
```

### v3 Mail Send \[#v3-mail-send-4]

```json
{
  "personalizations": [
    {
      "to": [
        {
          "email": "john.smith@domain.com",
          "name": "John Smith"
        }
      ],
      "subject": "Example 01",
      "substitutions": {
        "-first_name-": "John",
        "-last_name-": "Smith",
        "-warm_welcome-": "-greeting-"
      }
    },
    {
      "to": [
        {
          "email": "jane.williams@domain.com",
          "name": "Jane Williams"
        }
      ],
      "subject": "Example 02",
      "substitutions": {
        "-first_name-": "Jane",
        "-last_name-": "Williams",
        "-warm_welcome-": "-greeting-"
      }
    },
    {
      "to": [
        {
          "email": "matt.johnson@domain.com",
          "name": "Matt Johnson"
        }
      ],
      "subject": "Example 03",
      "substitutions": {
        "-first_name-": "Matt",
        "-last_name-": "Johnson",
        "-warm_welcome-": "-greeting-"
      }
    }
  ],
  "from": {
    "email": "sender@senddomain.com",
    "name": "Sender"
  },
  "reply_to": {
    "email": "sender@senddomain.com",
    "name": "Sender"
  },
  "subject": "Example",
  "content": [
    {
      "type": "text/plain",
      "value": "-warm_welcome-"
    },
    {
      "type": "text/html",
      "value": "<html>\n  <head></head>\n  <body>\n    <p>-warm_welcome- \n    </p>\n   </body>\n</html>"
    }
  ],
  "sections": {
    "-greeting-": "Welcome -first_name- -last_name-,"
  }
}
```

### Example Outcome: \[#example-outcome-10]

```bash
john.smith@domain.com
```

### Text \[#text-13]

```bash
Hello John Smith,
```

### HTML \[#html-14]

```html
<html>
  <head></head>
  <body>
    <p>Hello John Smith,<br /></p>
  </body>
</html>
```

### Example Outcome: \[#example-outcome-11]

[jane.williams@domain.com](mailto:jane.williams@domain.com)

### Text \[#text-14]

```bash
Hello Jane Williams,
```

### HTML \[#html-15]

```html
<html>
  <head></head>
  <body>
    <p>Hello Jane Williams,<br /></p>
  </body>
</html>
```

### Example Outcome: \[#example-outcome-12]

[matt.johnson@domain.com](mailto:matt.johnson@domain.com)

### Text \[#text-15]

```bash
Hello Matt Johnson,
```

### HTML \[#html-16]

```html
<html>
  <head></head>
  <body>
    <p>Hello Matt Johnson,<br /></p>
  </body>
</html>
```

## Three Different Greeting Sections with First & Last Name Substitutions

This example will show you how to create three different sections, each with first name and last name substitution for your emails. We will be using the tags `-warm_welcome-`, `-greeting01-`, `-greeting02-`, `-greeting03-`, `-first_name-` and `-last_name-` in this example. In this example, we have created three different greetings using the section tag `-warm_welcome-`. The `-warm_welcome-` tag is replaced with either `-greeting01-`, `-greeting02-` or `-greeting03-` substitution. This will call one of the three sections. In each of these sections, there is the `-first_name-` and `-last_name-` tags which will get replaced with the recipients first and last names.

### Text \[#text-16]

```bash
-warm_welcome-
```

### HTML \[#html-17]

```html
<html>
  <head></head>
  <body>
    <p>-warm_welcome-<br /></p>
  </body>
</html>
```

### X-SMTPAPI Header \[#x-smtpapi-header-5]

```json
{
  "to": [
    "john.smith@domain.com",
    "jane.williams@domain.com",
    "matt.johnson@domain.com"
  ],
  "sub": {
    "-first_name-": ["John", "Jane", "Matt"],
    "-last_name-": ["Smith", "Williams", "Johnson"],
    "-warm_welcome-": ["-greeting01-", "-greeting02-", "-greeting03-"]
  },
  "section": {
    "-greeting01-": "Welcome -first_name- -last_name-,",
    "-greeting02-": "Hello -first_name- -last_name-,",
    "-greeting03-": "Dear -first_name- -last_name-,"
  }
}
```

### v3 Mail Send \[#v3-mail-send-5]

```json
{
  "personalizations": [
    {
      "to": [
        {
          "email": "john.smith@domain.com",
          "name": "John Smith"
        }
      ],
      "subject": "Example 01",
      "substitutions": {
        "-first_name-": "John",
        "-last_name-": "Smith",
        "-warm_welcome-": "-greeting01-"
      }
    },
    {
      "to": [
        {
          "email": "jane.williams@domain.com",
          "name": "Jane Williams"
        }
      ],
      "subject": "Example 02",
      "substitutions": {
        "-first_name-": "Jane",
        "-last_name-": "Williams",
        "-warm_welcome-": "-greeting02-"
      }
    },
    {
      "to": [
        {
          "email": "matt.johnson@domain.com",
          "name": "Matt Johnson"
        }
      ],
      "subject": "Example 03",
      "substitutions": {
        "-first_name-": "Matt",
        "-last_name-": "Johnson",
        "-warm_welcome-": "-greeting03-"
      }
    }
  ],
  "from": {
    "email": "sender@senddomain.com",
    "name": "Sender"
  },
  "reply_to": {
    "email": "sender@senddomain.com",
    "name": "Sender"
  },
  "subject": "Example",
  "content": [
    {
      "type": "text/plain",
      "value": "-warm_welcome-"
    },
    {
      "type": "text/html",
      "value": "<html>\n  <head></head>\n  <body>\n    <p>-warm_welcome- \n    </p>\n   </body>\n</html>"
    }
  ],
  "sections": {
    "-greeting01-": "Welcome -first_name- -last_name-,",
    "-greeting02-": "Hello -first_name- -last_name-,",
    "-greeting03-": "Dear -first_name- -last_name-,"
  }
}
```

### Example Outcome: \[#example-outcome-13]

[john.smith@domain.com](mailto:john.smith@domain.com)

### Text \[#text-17]

```bash
Welcome John Smith,
```

### HTML \[#html-18]

```html
<html>
  <head></head>
  <body>
    <p>Welcome John Smith,<br /></p>
  </body>
</html>
```

### Example Outcome: \[#example-outcome-14]

[jane.williams@domain.com](mailto:jane.williams@domain.com)

### Text \[#text-18]

```bash
Hello Jane Williams,
```

### HTML \[#html-19]

```html
<html>
  <head></head>
  <body>
    <p>Hello Jane Williams,<br /></p>
  </body>
</html>
```

### Example Outcome: \[#example-outcome-15]

[matt.johnson@domain.com](mailto:matt.johnson@domain.com)

### Text \[#text-19]

```bash
Dear Matt Johnson,
```

### HTML \[#html-20]

```html
<html>
  <head></head>
  <body>
    <p>Dear Matt Johnson,<br /></p>
  </body>
</html>
```

## Three Confirmation Sections and Substitutions

This example will show you how to create three different sections for confirmation emails. We will be using the tags `-name-`, `-confirmations-`, `-confirmation_001-`, `-confirmation_002-`, `-confirmation_003-` and `-order_id-` in this example. In this example, we have created three different confirmations using the section tag `-confirmations-`. The `-confirmations-` tag is replaced with either `-confirmation_001-`, `-confirmation_002-` or `-confirmation_003-` substitution. This will call one of the three sections. In each of these sections, there is the `-order_id-` tag which will get replaced with the recipient's order id.

### Text \[#text-20]

```bash
Hello -name-,
-confirmations-
```

### HTML \[#html-21]

```html
<html>
  <head></head>
  <body>
    <p>
      Hello -name-,<br />
      -confirmations-
    </p>
  </body>
</html>
```

### X-SMTPAPI Header \[#x-smtpapi-header-6]

```json
{
  "to": ["john@domain.com", "jane@domain.com", "matt@domain.com"],
  "sub": {
    "-name-": ["John", "Jane", "Matt"],
    "-confirmations-": [
      "-confirmation_001-",
      "-confirmation_002-",
      "-confirmation_003-"
    ],
    "-order_id-": ["12345", "23456", "34567"]
  },
  "section": {
    "-confirmation_001-": "Thanks for choosing SendGrid. This email is to confirm that we have processed your order -order_id-.",
    "-confirmation_002-": "Thanks for choosing SendGrid. This email is to confirm that we have processed your order -order_id-. This invoice is to be paid by bank transfer within 7 days from the date of your monthly statement.",
    "-confirmation_003-": "Thanks for choosing SendGrid. This email is to confirm that we have processed your order -order_id-. You can download your invoice as a PDF for your records."
  }
}
```

### v3 Mail Send \[#v3-mail-send-6]

```json
{
  "personalizations": [
    {
      "to": [
        {
          "email": "john@domain.com",
          "name": "John"
        }
      ],
      "subject": "Example 01",
      "substitutions": {
        "-name-": "John",
        "-order_id-": "12345",
        "-confirmations-": "-confirmation_001-"
      }
    },
    {
      "to": [
        {
          "email": "jane@domain.com",
          "name": "Jane"
        }
      ],
      "subject": "Example 02",
      "substitutions": {
        "-name-": "Jane",
        "-order_id-": "23456",
        "-confirmations-": "-confirmation_002-"
      }
    },
    {
      "to": [
        {
          "email": "matt@domain.com",
          "name": "Matt"
        }
      ],
      "subject": "Example 03",
      "substitutions": {
        "-name-": "Matt",
        "-order_id-": "34567",
        "-confirmations-": "-confirmation_003-"
      }
    }
  ],
  "from": {
    "email": "sender@senddomain.com",
    "name": "Sender"
  },
  "reply_to": {
    "email": "sender@senddomain.com",
    "name": "Sender"
  },
  "subject": "Example",
  "content": [
    {
      "type": "text/plain",
      "value": "Hello -name-,\n-confirmations-"
    },
    {
      "type": "text/html",
      "value": "<html>\n  <head></head>\n  <body>\n    <p>Hello -name-, \n        -confirmations-</p>\n  </body>\n</html>"
    }
  ],
  "sections": {
    "-confirmation_001-": "Thanks for choosing SendGrid. This email is to confirm that we have processed your order -order_id-.",
    "-confirmation_002-": "Thanks for choosing SendGrid. This email is to confirm that we have processed your order -order_id-. This invoice is to be paid by bank transfer within 7 days from the date of your monthly statement.",
    "-confirmation_003-": "Thanks for choosing SendGrid. This email is to confirm that we have processed your order -order_id-. You can download your invoice as a PDF for your records."
  }
}
```

### Example Outcome: \[#example-outcome-16]

[john@domain.com](mailto:john@domain.com)

### Text \[#text-21]

```bash
Welcome John,
Thanks for choosing SendGrid. This email is to confirm that we have processed your order 12345.
```

### HTML \[#html-22]

```html
<html>
  <head></head>
  <body>
    <p>
      Welcome John,<br />
      Thanks for choosing SendGrid. This email is to confirm that we have
      processed your order 12345.
    </p>
  </body>
</html>
```

### Example Outcome: \[#example-outcome-17]

```bash
jane@domain.com
```

### Text \[#text-22]

```bash
Hello Jane,
Thanks for choosing SendGrid. This email is to confirm that we have processed your order 23456. This invoice is to be paid by bank transfer within 7 days from the date of your monthly statement.
```

### HTML \[#html-23]

```html
<html>
  <head></head>
  <body>
    <p>
      Hello Jane,<br />
      Thanks for choosing SendGrid. This email is to confirm that we have
      processed your order 23456. This invoice is to be paid by bank transfer
      within 7 days from the date of your monthly statement.
    </p>
  </body>
</html>
```

### Example Outcome: \[#example-outcome-18]

[matt@domain.com](mailto:matt@domain.com)

### Text \[#text-23]

```bash
Dear Matt,
Thanks for choosing SendGrid. This email is to confirm that we have processed your order 34567. You can download your invoice as a PDF for your records.
```

### HTML \[#html-24]

```html
<html>
  <head></head>
  <body>
    <p>
      Dear Matt,<br />
      Thanks for choosing SendGrid. This email is to confirm that we have
      processed your order 34567. You can download your invoice as a PDF for
      your records.
    </p>
  </body>
</html>
```
