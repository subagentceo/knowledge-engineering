# Viewing Logs with Twilio Console

You can easily view, filter, and retrieve logs relating to your Verify Service using Twilio Console. This approach requires no code and allows you to inspect and troubleshoot specific Verifications, including unblocking phone numbers manually.

To view your logs, go to [Twilio Console](https://console.twilio.com/) and navigate to **Monitor** > **Logs** > **Verify** which will open the [Verify logs](https://console.twilio.com/us1/monitor/logs/verify-logs) page on the **Verifications** tab.

## Verifications tab

![Verify logs table showing verification ID, status, service SID, channel, and country with export CSV option.](https://docs-resources.prod.twilio.com/65f06a023106151a83da367882494d3f85f542b3bebec9442561bce9141f50cd.png)

On the [Verifications tab](https://console.twilio.com/us1/monitor/logs/verify-logs), you can search for Verifications by their Verification ID, send to phone number, prefix, or email ID and filter logs by specific criteria, including:

* Service ID
* Status (One of: Pending, Approved, Canceled, Expired, Max Attempts Reached)
* Channel
* Country
* Date or Time Range

## Verification details page

Select a **Verification ID** to open its **Verification details page** and view more comprehensive information such as different actions and outcomes that happened during the Verification's lifecycle and any related error codes, if applicable.

![Twilio verification details showing approved status, delivery attempt, and success.](https://docs-resources.prod.twilio.com/c4af872fdc2a503992b38b3d7e75af4abe7050e06330886f35dcc1fa204d5b6c.png)

## Blocked Verifications tab

On the [Blocked Verifications tab](https://console.twilio.com/us1/monitor/logs/verify-fraud-logs), you can view all Verifications that have been blocked due to [Verify Fraud Guard](/docs/verify/preventing-toll-fraud/sms-fraud-guard) or [Geo permissions](/docs/verify/preventing-toll-fraud/verify-geo-permissions) prefix blocking. It has all of the same functionality as the Verifications tab with the addition of being able to manually unblock the phone number.

Unblocking a phone number will automatically add it to the [Safe List](/docs/verify/api/safe-list) so it will not be blocked in the future. We strongly recommend only unblocking user phone numbers that are verified and known to you as trustworthy.

![Twilio Verify logs showing blocked verifications with fraud status and unblock option.](https://docs-resources.prod.twilio.com/5120f3f43916469592c6953284e298d336a11d09423ecb6a1a0debf298cf39c5.png)

## Export CSV from Verify Logs

Verify offers the option for bulking exporting of Verify logs via the Console, which lets you export up to a maximum of 9,000 logs. The Export CSV option is available for exporting the logs from both [Verifications](https://console.twilio.com/us1/monitor/logs/verify-logs) and [Blocked Verifications](https://console.twilio.com/us1/monitor/logs/verify-fraud-logs) tab as well.

To export the logs, simply click on the Export CSV button on the top right of the Verify Logs page. The logs would be exported for the duration of the date/time range specified. You would be notified once the download is in process and completed by the pop-up on the Verify Logs page.

![Verify logs page showing 6 logs downloaded in the last 30 days with export CSV option.](https://docs-resources.prod.twilio.com/0ab4cb3379821b893504544d969c9a537af1ab8f56670ae4a223f4dd5c962b95.png)
