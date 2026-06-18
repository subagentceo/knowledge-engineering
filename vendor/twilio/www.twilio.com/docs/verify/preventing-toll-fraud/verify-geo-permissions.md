# Verify Geo Permissions

Verify Geographic (Geo) Permissions allows you to control the Verification traffic to a destination country for SMS and Voice channels. Keeping permissions disabled for countries you don't use helps reduce the risk of bad actors exploiting your application by artificially inflating traffic through [SMS pumping](/docs/glossary/what-is-sms-pumping-fraud) or [toll fraud](/docs/glossary/what-is-toll-fraud). See [Preventing Fraud in Verify](/docs/verify/preventing-toll-fraud) for more information.

You can access the Verify Geo Permissions page in your Twilio Console by navigating to [Twilio Console > Verify > Settings > Geo permissions](https://console.twilio.com/us1/develop/verify/settings/geopermissions).

> \[!WARNING]
>
> Permissions saved on this page will take immediate effect.
>
> Phone numbers you've added to your [safe list](https://www.twilio.com/docs/verify/api/safe-list) are not blocked by Geo permissions.

![Verify geographic permissions with options to monitor or disable traffic for fraud prevention.](https://docs-resources.prod.twilio.com/39325bf8d007886ce8fc262f9b651f62ae147f323e138fe86209f8b83997ea31.png)

Individual countries can be searched by name or country code by typing in the search box. You can also apply batch settings to set Geo Permissions for all countries within a continent.

There are three permissions options that can be selected:

* Disable all traffic
* Allow all traffic
* Monitor all traffic for blocking fraud (SMS only)

## Disable traffic

To disable sending Verifications to a destination country, set each channel for that country to **Disable all traffic** and select **Save geographic permissions**. All Verifications sent to that country will be blocked except numbers you've added to your [safe list](https://www.twilio.com/docs/verify/api/safe-list).

## Allow traffic

To enable sending Verifications to a destination country, set each channel for that country to **Allow all traffic** and select **Save geographic permissions**. All Verifications sent to that country will be allowed.

## Monitor traffic for blocking fraud (SMS only)

Another option for the SMS channel is to allow sending Verifications to a destination country with monitoring from [Verify Fraud Guard](/docs/verify/preventing-toll-fraud/sms-fraud-guard). This means that Fraud Guard will block most fraudulent Verifications from being sent while still allowing all other traffic.

First, you'll need to setup Fraud Guard by selecting **Setup Fraud Guard** and enabling it for your Service. Then set the SMS channel for a destination country to **Monitor all traffic for blocking fraud** and select **Save geographic permissions**.

## Track Geo Permissions changes

Any changes made to Verify Geo Permissions can be programmatically tracked with the [Monitor Event Resource API](/docs/usage/monitor-events).
