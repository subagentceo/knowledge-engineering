# Verify Fraud Guard

Verify Fraud Guard uses SMS fraud detection to block suspicious messages from being sent by your Verify Service. It works by analyzing your historical SMS traffic for unusual patterns. When it detects fluctuations in SMS destination traffic or [SMS pumping fraud](/docs/glossary/what-is-sms-pumping-fraud), Fraud Guard blocks the prefix of the destination of the suspected fraud.

## Turn on fraud guard

> \[!NOTE]
>
> Fraud Guard is on by default for all Verify customers.
>
> Fraud Guard protects only the SMS channel. The Voice channel is *not* supported.
>
> Fraud Guard is supported for customers using custom verification codes in Standard or Max protection levels.

When creating a Verify Service, you will be prompted on whether you want to turn on or turn off Fraud Guard.

For an existing Service, you can turn on or turn off Fraud Guard in your Twilio Console by going to [Twilio Console > Verify > Services page](https://console.twilio.com/us1/develop/verify/services) and selecting your Service. This will open the **Service settings** page where you can select the **SMS** tab and adjust the **Enable Fraud Guard** option for that Service.

Once Fraud Guard is turned on for your Service, no further action is needed and your protection will begin immediately.

## Protection levels

You can fine tune your Service's Fraud Guard protection level from cautious to aggressive blocking to best suit your business needs.

![Service settings SMS tab with Fraud Guard options and protection levels.](https://docs-resources.prod.twilio.com/1048a282e6fb0a265ae3284d0d8e6c22eddef606aacb3551651875a1a48aebd1.png)

To adjust your protection level, go to the [Twilio Console > Verify > Services page](https://console.twilio.com/us1/develop/verify/services) and select your Service. This will open the **Service settings** page where you can select the **SMS** tab and adjust the **Protection Level**. You'll notice there's three options available: Basic, Standard, and Max.

* **Basic**: The foundational level of fraud protection with cautious blocking. It provides a good balance between blocking fraudulent activities and minimizing false positives. We recommend using this if you primarily have a domestic presence in North America which consists of low fraud risk countries.
* **Standard**: The default protection level with moderate blocking. When the degree of fraud blocking increases, it's important to note that false positives may also slightly increase (\<1%). We recommend using this mode if you have high value sign ups coming in from users all over the globe and would like to strike a balance against maximizing user conversion with minimum friction.
* **Max**: The highest level of protection with aggressive blocking. It's essential to consider that false positives may occur occasionally (\<2%). Our team is dedicated to continually optimizing the system to maintain a high level of accuracy. We recommend using this mode if you've a global presence to better protect yourself in high fraud risk countries.

## Fraud detection process

Twilio uses a baseline of expected Verification data to find outliers in behavior based traffic patterns. We combine behavioral data with known explicit fraud schemes to filter out bad behavior.

Our model is always changing and uses multiple parameters to determine fraud. Examples of things we may temporarily block could include:

* Verifications to a specific region, country or locale we know is engaging in SMS pumping
* Verifications in a country your Account has never sent SMS to previously
* Verifications with parameters and characteristics that would suggest non-human behavior

## Preventing false positives

Like any fraud prevention feature, there's a small chance our models may flag legitimate users as suspicious. We're constantly monitoring our results and adapting the fraud detection model to keep false positives extremely low.

### Safe List

You can mark known phone numbers using the **Safe List feature** so they're never blocked. This provides an additional safety net against false positives, so the numbers are never erroneously blocked by Fraud Guard or Geo permissions. Add known phone numbers to the Safe List by:

* Using the [Safe List API](/docs/verify/api/safe-list)
* Using the **Blocked Verifications** tab of [Verify Logs in Twilio Console](https://console.twilio.com/us1/monitor/logs/verify-fraud-logs) to unblock a phone number so it is never blocked in the future

We also recommend reviewing your [Verify Geo Permissions](/docs/verify/preventing-toll-fraud/verify-geo-permissions) feature to make sure that destinations outside of your business focus are turned off.

You can also take these actions if you suspect false positives:

* Fall back to a different verification method like WhatsApp or Email
* Create a separate [Verify service](/docs/verify/api/service) for your legitimate users which has Fraud Guard turned off
* Reach out to your Solutions Architect or contact [Twilio Support](https://help.twilio.com/hc/en-us?_ga=2.249795461.2075901253.1661172928-1879743973.1650468405)
* Temporarily turn off Fraud Guard in [Twilio Console](https://console.twilio.com/us1/develop/verify/services)

### Implement the RiskCheck parameter

The [RiskCheck parameter](/docs/verify/api/verification#start-new-verification) allows you to override Fraud Prevention measures during the start of verification if you are confident in the reliability of the traffic. When implementing the logic for this parameter, exercise caution to ensure an optimal customer experience while maintaining security and protection.

### Configure Fraud Guard geo permissions

[Verify Geo Permissions](/docs/verify/preventing-toll-fraud/verify-geo-permissions) empowers you to customize Fraud Guard settings on a country-by-country basis. If you come across a business-critical destination where you can manage the risk, you have the option to deactivate Fraud Guard for that specific geographic location. This capability is especially useful during significant product launches when traffic to certain destinations is paramount.

## Monitoring

When Fraud Guard detects fraud on your Verify account, you will receive an email notification informing you of the event with a link to view more in your Verify logs. We recommend checking your logs when this happens to ensure that the country prefix being blocked on your behalf is valid.

### SMS Fraud Insights dashboard

All Verify customers have access to the [Verify SMS Fraud Insights dashboard on Twilio Console](https://console.twilio.com/us1/monitor/insights/verify/verify-fraud-insights). The dashboard illustrates the impact fraud could have had without intervention. It also allows you to discover trends and insights that you can use to better optimize your product against fraud.

To view your dashboard, go to [Twilio Console](https://console.twilio.com/) and go to **Monitor** > **Insights** > **Verify** > **Fraud** which will open the **Overview** tab. There, you'll find several sections relating to your Fraud metrics.

#### Performance metrics

![Dashboard showing verification attempts, fraud blocks, cost savings, and success rate with performance and country trends.](https://docs-resources.prod.twilio.com/cd24282996461917f0583bbb99c60b34b8cd210eba96cccb231c65b67169a4f4.png)

This section displays key metrics to monitor fraud that can be exported as a CSV.

* **Allowed Verification Attempts**: The total number of verification attempts sent on the SMS channel without being blocked by Fraud Guard or Geo permissions.
* **Fraud Blocked Attempts**: The total number of SMS verification attempts blocked by Fraud Guard and Geo permissions.
* **Success Rate**: The percentage of approved verifications over the total number of verification sessions created.
* **Estimated Cost Savings (USD)**: This is the estimated amount of revenue saved by blocking the send of an outbound SMS verification attempt for a fraudulent number. This is calculated based on the destination country using the [Twilio Standard SMS Pricing Guide](https://www.twilio.com/en-us/sms/pricing/us).

#### Performance and country trends

The Performance and Country sections on the **Overview** tab display blocking and performance trends over time and by country. These visualizations show metrics such as:

* Number of blocks due to Fraud Guard versus Geo permissions.
* Conversion rate, which is the percentage of approved verifications over the total number of verification attempts.
* Percent of fraud instances, fraud blocked attempts, and estimated cost savings per country.

You can get an even more detailed country-by-country analysis by selecting the **Top countries** tab of the [Verify SMS Fraud Insights dashboard](https://console.twilio.com/us1/monitor/insights/verify/verify-fraud-insights). This page displays ranked, exportable lists of countries based on fraud rate, fraud blocked attempts, success rate vs. conversion rate, and cost savings.

![Charts showing top countries by fraud rate, blocked fraud attempts, success rate, and cost savings.](https://docs-resources.prod.twilio.com/8192a5d167f27f9f3341e614f1266a311197172d929195fd66c57875eea63fa4.png)

### Error logs

[Error 60410](/docs/api/errors/60410) will show in the Twilio error logs when an SMS delivery is blocked by Fraud Guard.

You can also view any error messages that occurred via [Verify Logs in Twilio Console](https://console.twilio.com/us1/monitor/logs/verify-fraud-logs) by opening the **Verification details page** of a Verification log. See [Viewing Logs with Twilio Console](/docs/verify/viewing-logs-with-twilio-console) for more information.
