# Get a phone number and send your first SMS

> \[!NOTE]
>
> This example assumes that you already have a [Twilio Account](/try-twilio), have followed the setup instructions from the [CLI Quickstart](/docs/twilio-cli/quickstart), and have a working [CLI Profile](/docs/twilio-cli/general-usage/profiles) to issue commands with.
>
> If you have all of those prerequisites, please continue!

With the Twilio CLI installed, let's see how you can quickly go from not even having a Twilio telephone number to being able to do the following, all from the command line:

* Purchase your first Twilio phone number
* Send an SMS with Twilio
* Level up your Twilio phone number to automatically respond to messages by connecting it to some TwiML
* Get a customized list of all messages sent to your phone number
* Get carrier details about one of those phone numbers

## Send your first SMS

### List available phone numbers

First, you'll need to figure out what Twilio phone numbers are available to purchase. We suggest getting a number with your local area code, but you can select any. Run the following command, substituting your own area code and [country code](https://en.wikipedia.org/wiki/ISO_3166-1_alpha-2):

```bash
twilio api:core:available-phone-numbers:local:list \
  --area-code 209 --country-code US
```

This command asks Twilio to list all Twilio phone numbers that are available for purchase. Since that's a pretty broad request, you're narrowing down the request by passing in two [command line options](https://en.wikipedia.org/wiki/Command-line_interface#Command-line_option), which filter down the range of phone numbers to only those in the 209 area code of the United States. This will result in output like this:

```bash
Phone Number  Region  ISO Country  Address Requirements
+12092645211  CA      US           none
+12095466138  CA      US           none
+12094081870  CA      US           none
+12093077478  CA      US           none
...
```

> \[!NOTE]
>
> Trying to find a Toll-Free phone number, so that you can test Twilio in the age of [A2P10DLC](/blog/a2p-10dlc-individuals-twilio-messaging)? Replace the `local` part of your CLI command with `toll-free`, and remove the `area-code` parameter, like so:
>
> ```bash
> twilio api:core:available-phone-numbers:toll-free:list \
>   --country-code=US
> ```

### Purchase an available phone number

Next, let's purchase a number. Select one of the available phone numbers from the previous results (don't forget to include the leading "+"), and run the following command but with that phone number in place of the one in this example:

```bash
twilio api:core:incoming-phone-numbers:create \
  --phone-number "+12092645211"
```

When the command is successful, you'll see similar output to this:

```bash
SID                                 Phone Number  Friendly Name
PN5358fexxxxxxxxxxxxxxxxxxxxxxxxxx  +12092645211  (209) 264-5211
```

> \[!NOTE]
>
> Save the SID value that you receive! It will be used in later examples.

### Send an SMS message

Now for the magic to really happen. Copy the following command, replace the `from` value with your Twilio phone number, and `to`'s value with your personal phone number (and the body, if you'd like). Then, run the command.

```bash
twilio api:core:messages:create \
  --to +12127363100 \
  --from +12092645211 \
  --body "Ahoy"
```

You'll see a similar table of output once the SMS is on its way:

```bash
SID        From          To            Status  Direction     Date Sent
SM980f...  +12092645211  +1209.......  queued  outbound-api  null
```

Congratulations! After a brief delay, you'll receive a text message from your Twilio phone number.

## Level up

Being able to send SMS with Twilio is just touching the surface of what you can accomplish. Sending SMS is great, but let's take this a step further and make your Twilio phone number capable of responding to incoming messages as well.

### Have your phone number respond to incoming SMS

In order for a Twilio Phone number to respond to incoming SMS, you will need to provide your phone number with [TwiML](/docs/glossary/what-is-twilio-markup-language-twiml) (XML-like instructions for how to respond) whenever a message comes in by defining a [webhook](/docs/glossary/what-is-a-webhook) (a URL that Twilio can send a request to that returns TwiML). Explaining all of that is beyond the scope of this CLI example, so please refer to the links to learn more about TwiML and webhooks.

To get your phone number responding to messages, copy the following command, substitute the value for `sid` with the SID value that you received when purchasing your number earlier, keep the `sms-url` value the same, and run the resulting command:

```bash
twilio api:core:incoming-phone-numbers:update \
  --sid PN5358fexxxxxxxxxxxxxxxxxxxxxxxxxx \
  --sms-url "https://www.twilio.com/docs/twiml-snippet/twilio-cli"
```

Feel free to copy that URL and visit it with your browser. You should see the following TwiML:

```xml
<Response>
  <Message>Thanks for trying out twilio-cli!</Message>
</Response>
```

This is the TwiML that this webhook URL provides, and that your phone number will use to respond to any incoming messages. Go ahead and send an SMS to your Twilio phone number. You will receive the message "Thanks for trying out twilio-cli!".

If you want to customize your response, you'll need to craft your own TwiML and host it at another webhook URL. Check out the [Messaging Docs on TwiML](/docs/messaging/twiml) to learn about all of your options.

### List the messages your number has received

Assuming you or others have been sending messages to this new Twilio phone number of yours, Twilio maintains logs with information such as the phone numbers involved (both the sender and the recipient), the body of the message, the SMS' status, and more. To access this list, run the following command in your terminal:

```bash
twilio api:core:messages:list --to "+12092645211"
```

You'll receive a list like this, containing a set of predetermined columns including the SID of each message, the phone numbers involved, etc:

```bash
SID       From          To            Status    Direction  Date Sent
SM6e5...  +1206.......  +12092645211  received  inbound    Oct 12 2022 ...
SMf1a...  +1206.......  +12092645211  received  inbound    Oct 13 2022 ...
```

### Property filtering

Suppose you're only interested in the SID, what number the message came from, and would like to see the contents of each message. You can tell the Twilio CLI which specific [properties](/docs/twilio-cli/general-usage/output-formatting-and-filtering#specify-output-values) you would like to see, and omit all others, by defining the `properties` option like so:

```bash
twilio api:core:messages:list \
  --to="+12092645211" \
  --properties="sid,from,body"
```

You'll now receive a much more tailored list of results:

```bash
SID       From          Body
SM6e5...  +1206...  Hello to you, too
SMf1a...  +1206...  Are we best friends?
```

### Output formats

These tables are great for quick inspection of data, but perhaps you want these results in another format that's easier to parse with a programming language or compatible with spreadsheet software. In that case, you can also specify alternative [output formats](/docs/twilio-cli/general-usage/output-formatting-and-filtering), such as JSON or TSV with the `-o` option.

TSV output can be configured with the `--properties` option as you would expect, however, the CLI will return *all* possible data if JSON is requested. You'll need to then use a tool like [jq](https://stedolan.github.io/jq/) to do filtering. For example:

```bash
twilio phone-numbers:list -o json \
    | jq '.[] | {sid, phoneNumber, smsUrl, voiceUrl}'
```

This command will output:

```json
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

## Work with other Twilio APIs

So far these examples have just been concerned with your Twilio phone number, but the CLI allows you to work with all of Twilio's APIs! One such API is that of [Lookup](/docs/lookup/v1-api).

### Look up a phone number's carrier and caller name

Similar to how you previously interacted with Twilio's core API to get a phone number and send messages, you can also call various resources and provide options to configure your request.

Suppose your new Twilio phone number has been receiving repeat messages from a particular number, and you're curious to learn more about that number. You can call the Lookup API like so, providing the phone number as well as arguments that define your request and desired response output:

```bash
twilio api:lookups:v1:phone-numbers:fetch \
  --phone-number +12127363100 \
  --type carrier \
  --type caller-name \
  -o json
```

You will receive some JSON, such as this:

```json
[
  {
    "callerName": {
      "caller_name": null,
      "caller_type": "UNDETERMINED",
      "error_code": null
    },
    "countryCode": "US",
    "phoneNumber": "+12127363100",
    "nationalFormat": "(212) 736-3100",
    "carrier": {
      "mobile_country_code": "311",
      "mobile_network_code": "489",
      "name": "Verizon Wireless",
      "type": "mobile",
      "error_code": null
    },
    "addOns": null,
    "url": "https://lookups.sydney.us1.twilio.com/v1/PhoneNumbers/+12127363100?Type=carrier&Type=caller-name"
  }
]
```
