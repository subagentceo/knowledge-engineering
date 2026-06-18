# Output formatting and filtering

All CLI command output is sent to `stdout`, and can be customized in terms of output values as well as format.

## Default output format

By default, any output is formatted in a human-readable, columnar format like so:

```bash
$ twilio phone-numbers:list
SID                                 Phone Number  Friendly Name
PNxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx  +1209242XXXX  SIP testing
PNxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx  +1646887XXXX  Congress hotline
PNxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx  +1209337XXXX  DAVID'S SECRET CRUSH
```

## Specify output values

Many `list` commands will allow you to specify a `--properties` option defining which columns you'd like to display. For example, to display only the Phone Number and SMS URL columns, you would pass `--properties "phoneNumber, smsUrl"`.

```bash
$ twilio phone-numbers:list --properties 'phoneNumber, smsUrl'
Phone Number  SMS URL
+1209242XXXX  https://very-secret.ngrok.io/sms
+1646887XXXX  https://handler.twilio.com/twiml/EHxxxx
+1209337XXXX
```

Column names must match the camelCased [JSON][] property names in the Twilio API for the resource. For example, you can find the possible column values for phone numbers by looking at the [Incoming Phone Number API Reference][].

> \[!NOTE]
>
> The default list of properties varies by command, and is subject to change with each release.

## JSON output format

Append the `-o json` flag to a command to change the output format to JSON. When you choose JSON, the command will send the *entire API response* to `stdout` as JSON.

You can then pipe this output to tools like [jq][] to parse the JSON as necessary.

For example:

```bash
# Fetch all incoming phone numbers as json, and display as an array
# that only contains each sid and phone number.
$ twilio phone-numbers:list -o json \
    | jq '.[] | {sid, phoneNumber, smsUrl, voiceUrl}'

{
  "sid": "PNxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx",
  "phoneNumber": "+1209242XXXX",
  "smsUrl": "https://very-secret.ngrok.io/sms",
  "voiceUrl": "https://very-secret.ngrok.io/answer"
}
{
  "sid": "PNxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx",
  "phoneNumber": "+1646887XXXX",
  "smsUrl": "https://handler.twilio.com/twiml/EHxxxx",
  "voiceUrl": "https://demo.twilio.com/welcome/voice/"
}
{
  "sid": "PNxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx",
  "phoneNumber": "+1209337XXXX",
  "smsUrl": "",
  "voiceUrl": ""
}
```

> \[!WARNING]
>
> The `--properties` flag does not modify command output when combined with `-o json`.
>
> For example, `twilio phone-numbers:list -o json --properties sid | jq .` will return the entire, unmodified JSON response, not an array of objects containing `sid`.

## Tab separated values output format

To change the output format to tab separated values (TSV), add `-o tsv` to a command.

This format is useful for loading information into spreadsheets, or for other machine processing. Like the default, columnar output format, you can use the `--properties` option to specify which columns you would like included.

```bash
$ twilio phone-numbers:list -o tsv
sid   phoneNumber  friendlyName
PNxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx    +1209242XXXX    SIP testing
PNxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx    +1646887XXXX    Congress hotline
PNxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx    +1209337XXXX    DAVID'S SECRET CRUSH
```

[jq]: https://jqlang.org

[JSON]: https://www.json.org

[Incoming Phone Number API Reference]: /docs/phone-numbers/api/incomingphonenumber-resource#incomingphonenumber-properties
