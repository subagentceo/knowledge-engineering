# Time zone

*Internet standard*. The geographic region that observes a uniform standard time expressed as an offset from the Coordinated Universal Time.

Within a given geographic region that runs along longitude and country borders from north to south, the same time is observed.

## Use of time zones in Twilio Email

### Twilio Console

When you create your Twilio account, you set the time zone for that account.
All times displayed in the console and for email scheduling apply this time zone.
To visualize time zones, you can use the [World Time Zone map][] or [worldtimebuddy][].

> \[!NOTE]
>
> If you set your time zone to US Central Time (UTC-06:00), all times in the Twilio Console and in your scheduled email messages show as US Central Time.

### Twilio Email API and event listings

When you use the API or look at event listings, times display as a sequence of numbers.
This is the number of seconds since midnight UTC on January 1, 1970. This specific time is known as the UNIX Epoch, and the number is called the [Unix Timestamp][].

To convert between the UNIX timestamp and a conventional date and time, use the [UNIX Timestamp Converter][] or [Epoch Converter][].

[Unix Timestamp]: https://en.wikipedia.org/wiki/Unix_time

[Epoch Converter]: https://www.epochconverter.com

[UNIX Timestamp Converter]: https://www.unixtimestamp.com

[World Time Zone map]: https://www.worldtimezone.com

[worldtimebuddy]: https://www.worldtimebuddy.com

### Email schedules

* When scheduling Marketing Emails, you can specify a timezone when you schedule the email to go out.
* If you don't specify the timezone, Twilio SendGrid uses current Pacific Time (UTC-7 or UTC-8, depending on daylight savings time).
* When viewing the campaigns, times display as "Sent on 8:35 AM UTC -0700".\
  This means that the campaign was sent at 8:35am in the "UTC -0700" timezone (aka MST or PDT) not at 8:35am minus 7 hours.
