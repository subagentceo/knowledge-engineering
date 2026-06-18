# Verify Countries and Regions Deliverability

> \[!NOTE]
>
> To learn about special restrictions for sending SMS, consult the issues on sending to [Singapore](/docs/verify/singapore) or [Canada](https://help.twilio.com/hc/en-us/articles/12387480513307-Why-was-my-friendly-name-not-included-in-the-Verify-SMS-).
> To use a template in China, [register the template with the account](https://help.twilio.com/articles/17024185400859).

Twilio Messaging supports all countries listed in the [International support for Alphanumeric Sender ID](https://help.twilio.com/hc/en-us/articles/223133767-International-support-for-Alphanumeric-Sender-ID) support article. This means Verify also supports these same countries plus China.

This article might not list some smaller countries and island states. These territories use the telecommunications infrastructure of other countries. To inquire about unlisted areas, [contact Sales](https://www.twilio.com/en-us/help/sales).

## Increase conversion rates

Twilio Verify provides generic senders on behalf of our customers. To increase the conversion rate of your messages, [register your own Alphanumeric Sender ID](https://help.twilio.com/articles/20153208099611-How-to-Register-an-Alphanumeric-Sender-ID) for countries marked with *Pre-Registration Required*. To begin the registration process, see [Twilio's Alphanumeric Sender ID registration page](https://console.twilio.com/us1/develop/phone-numbers/sender-ids).

## Check deliverability

To confirm that the Twilio Verify Service's geographic permissions haven't blocked delivery, check the Geo permissions tab in Twilio Console. Go to Twilio Console > **Verify** > **Settings** > [**Geo permissions**](https://console.twilio.com/us1/develop/verify/settings/geopermissions).

If you try to send Verifications to an undeliverable country, Verify returns an [Error 60605](/docs/api/errors/60605).

```bash
{
    "code": 60605,
    "message": "The destination phone number has been blocked by Verify Geo-Permissions. [COUNTRY CODE] is blocked for sms channel for all services",
    "more_info": "https://www.twilio.com/docs/errors/60605",
    "status": 403
}
```

## Additional resources

To learn more about language translation support, see [Verify Supported Languages](/docs/verify/supported-languages) .
