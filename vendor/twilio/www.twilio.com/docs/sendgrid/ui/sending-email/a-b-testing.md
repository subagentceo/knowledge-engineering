# A/B Testing Your Single Send

> \[!NOTE]
>
> A/B Testing is available for Single Sends only. It is not currently available for emails included as part of an Automation.

Optimize the engagement of your Marketing Campaigns with A/B testing. A/B testing (sometimes also referred to by marketers as 'split testing') allows you to send different versions of your Single Sends to an initial subset of your contacts.

## Set up an A/B test

*To set up an A/B test on an existing Single Send:*

1. From the left-hand navigation, select **Marketing**, and then click **Single Sends**.
2. Locate the Single Send you want to A/B test and click on the Single Send to open it in the editor it was created in.
3. Depending on the editor used to create the Single Send, A/B testing is located on either the **Settings** tab or the **A/B Testing** tab.
4. Once you have located the A/B Testing settings, toggle the **Activate A/B Testing** switch to **ON**.

## Choose the Type of A/B Test To Run

When you are A/B testing your emails, you want to optimize for a specific metric. Determine whether you want to optimize your **Open Rates** by testing the **Subject Line**, **Click Rates** by testing the **Email Content**, or if you want to manually select the winner of an A/B test based on your analysis of the data.

> \[!NOTE]
>
> You can test up to 6 different variations for each A/B test.

* **Subject Line - Optimize Open Rates**

Select the Subject Line A/B test to optimize the [Open Rate](/docs/sendgrid/glossary/open-rate/) of your Single Send, since the subject usually is all the recipient sees until they open your email.

High open rates show the strength of a subject line. Once you find a subject line that works well, you will potentially see other engagement metrics improve as well.

* **Email Content - Optimize Click Rates**

Select the Email Content A/B test to optimize the Click Rate of your Single Send, since the recipient will not see this content unless they open your email.

High click rates mean that you have compelling content and calls to action (CTAs).

## Looking for more visibility into your email performance?

[EXPERT SERVICES](https://sendgrid.com/en-us/solutions/expert-services)

Send better email with Expert Insights. Our detailed monthly reports will enable you to understand your email reputation and recipient engagement and repair issues with expert how-to steps.

## Adding Your Email Variations

Enter the different variations of your email where you would normally edit that piece of content in your Single Send.

* **Subject Line Testing**

For subject line testing, you will find multiple input boxes in the sidebar where you would normally find your subject line, one for each subject line variation.

* **Email Content Testing**

For email content testing, you will see additional tabs at the top of the content area, one for each email content variation. The number of tabs you see will depend on how many versions you have decided to test.

Make edits to each of your email content variations by selecting one of the tabs.

If you'd like to create a new variation based on any of the existing variations, select the variation you wish to clone and then click **Manage Variations** and then **Duplicate Variation**. From there, you can make any modifications to the duplicate. If you already have 6 variations, you will need to delete one before duplicating.

To delete a variation you no longer wish to keep, select the variation, click **Manage Variations** and then **Delete Variation.** When you do so, any remaining variations to the right of the deleted variation will be re-labeled and shift left. For example, if you have 3 variations and delete variation "B," variation "C" will become "B".

> \[!NOTE]
>
> To know the direct cause for the best performing variation, we recommend only making one change per variation rather than many changes. This way, you can point to a direct cause for the differences in your stats.

## Select the A/B Test Single Send Sample Size

Choose a percentage of your contact list that will participate in the A/B test. Each variation of the email will be sent to the same number of contacts within the participating portion of your list.

> \[!NOTE]
>
> The size of your sample can be up to 100% of your contact list. This may be helpful in the event that you would like to run two tests, send each test to a portion of your list, and manually select a winner.

## Determine the Winning Criteria for the A/B Test

Twilio SendGrid can automatically select the winner of a test based on either the open rate or click rate. You can also manually select a winner when neither of the automatic selections suits your needs.

* **Unique Open Rate**

Twilio SendGrid automatically selects the winning variation based on how many recipients [open](/docs/sendgrid/glossary/opens/) your email.

* **Unique Click Rate**

Twilio SendGrid automatically selects the winning version based on how many recipients [click](/docs/sendgrid/glossary/clicks/) links and engage with the content in your email.

* **Manual**

  You can evaluate the performance of all variants and manually choose a winner based on each variant's performance across multiple metrics.

## Set the A/B Test Duration

You can set your A/B test duration between 30 minutes and 24 hours.

While you can test your email variations for up to 24 hours, emails will only be sent to the subset of contacts you've chosen to participate in the A/B test during the test duration you set. The remainder of your contacts will only be sent the winning variation of your A/B test email after the test duration has completed.

> \[!NOTE]
>
> You should be mindful of your test duration, with respect to the timeliness of your Single Send content.
>
> For example, if you have a one-day sale that happens the day of your Single Send, you should set the A/B test duration to less than 24 hours so that your remaining contacts still have time to get the final email and participate in your one-day sale.

## Sending the winning A/B test variation

### Automatically selected winners

When a variation wins based on unique click rate or unique open rate, you will be notified that a winner was chosen and which variation won. SendGrid will automatically send the winning email variation to the rest of your list.

![Email subject A 'Check Now! New Features' is the winning version over B 'This Month's New Features'.](https://docs-resources.prod.twilio.com/bc1ab506f568599329f6bfb3428904b923e4222878fc3d73585c22944faa9c7a.png)

### Manually selecting a winner

There are likely times when neither the open rate nor the click rate alone best measures the success of a message. If, for example, version A had an open rate of 48% while version B had an open rate of 49%, version B would win an automatic selection based on open rate. However, if those two versions also had click rates of 45% for version A and 10% for version B, your winner based on a narrow margin in open rate would be significantly underperforming the alternative version in click rate. This is one scenario in which you could select a manual winner or re-evaluate your criteria for success.

You may also want to optimize for alternative metrics, including those that aren't tracked by Marketing Campaigns, such as conversions. Manually selecting a winner allows you to prioritize the metrics that are most important to you, including unsubscribes, spam reports, conversions, and more.

At the end of the A/B test duration, you will receive an email asking you to select the winner of your test.

*To manually select the winner*

1. Navigate to the [**Marketing Campaigns** > **Single Sends**](https://mc.sendgrid.com/single-sends) page.
2. Select the Single Send associated with the completed A/B test.
3. You will see the performance of each test variant across the following metrics
   * **Delivered**
   * **Opens**
   * **Clicks**
   * **Unique Opens**
   * **Click Through Rate**
   * **Total Click Through Rate**
   * **Unsubscribes**
   * **Spam Reports**

![Single Send A/B test stats with graph and table showing email performance metrics.](https://docs-resources.prod.twilio.com/7a3d300750c0b1642576be8694d4e4917c8a5b381db55248ef7aad8a1308d228.png)

4. Click the radio button beside a test variant to select it as the winner.
5. Click **Pick Winner**.
6. You will be presented with a modal asking you to confirm your selection. Click **Confirm** to proceed or **Cancel** to close the modal without selecting a winner.
7. After clicking **Confirm**, the winner will be sent to the remaining contacts in your list. The winner will also be labeled on the Single Sends Dashboard and the Single Sends statistics overview page.

#### Test expiration

You must select the winner of a manual A/B test within 7 days of the test completing.

You will receive an email one day before and one day after a test expires to keep you up to date about the test's status. The last date to select a test winner is also displayed on both the Single Sends index page and a Single Send's statistics summary page.

![Single Sends page showing campaigns with expired and soon to expire A/B tests highlighted.](https://docs-resources.prod.twilio.com/bee4cf872aed9915820802d1cf2d9c48a21f60eb7c8d521ba086236b3c2843cc.png)

![Email campaign stats with 'Pick Winner by Aug 30' highlighted and line graph showing metrics over a week.](https://docs-resources.prod.twilio.com/cf628eaf0280128dec31c1311df5688fa1f5428920302e9e8f8e263a7602f7e0.png)

## Additional Resources

* [Campaign Statistics](/docs/sendgrid/ui/analytics-and-reporting/marketing-campaigns-stats/)
* [Design Editor](/docs/sendgrid/ui/sending-email/editor/#the-design-editor)
* [Code Editor](/docs/sendgrid/ui/sending-email/editor/#the-code-editor)
