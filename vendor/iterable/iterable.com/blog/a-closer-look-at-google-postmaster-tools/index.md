# A Closer Look at Google Postmaster Tools - Iterable

## A Closer Look at Google Postmaster Tools

**Published by**

March 21, 2024

![Yellow background with a blue circle int he center. In the blue circle are two, light blue arrows in a circle showing a cycle with a yellow envelope in the middle. In the yellow envelop is a white paper with a red line graph on it.](https://iterable.com/wp-content/uploads/2026/04/032124_Google-Updates_Blog-Header.png)

On March 14 Google released a very useful update to Google Postmaster Tools: a new Google Postmaster Tools dashboard that focuses on compliance with the new sending requirements.

Many of you will already be familiar with Google Postmaster Tools, which allows senders to monitor their Gmail sending reputation. For those not using GPT (Google Postmaster Tools) to monitor your sending domain’s reputation, we encourage you to configure ASAP.

In this article we will cover what Google Postmaster Tools is, how to set it up, some of its features, and what was just unveiled.

### What is Google Postmaster Tools?

Google Postmaster Tools is a free resource that gives senders direct access to feedback on how Google views their sending practices. Designed with high-volume senders in mind, this tool provides insight into your reputation, performance, and infrastructure setup, allowing you to be proactive about your deliverability. Access to this data is more critical than ever with the recently updated sender requirements.

### What’s New in Google Postmaster Tools?

Let’s now look at how to access the new dashboard and what information is available there. You can log in using your Google Postmaster tools credentials. Upon logging in, you’ll be presented with a banner notifying you of the new dashboard.

![Google Postmaster Tools banner informing of new dashboard.](https://iterable.com/wp-content/uploads/2024/03/New-Banner.png)

#### Compliance Status Dashboard

The dashboard informs you how compliant the selected domain is with the new email sender requirements as a checklist to make sure you’re compliant with the requirements.

![Google Postmaster Tools compliance status list.](https://iterable.com/wp-content/uploads/2024/03/Compliance-dashboard.png)

These requirements include:

*   SPF and DKIM authentication: Sending domain has SPF and DKIM authentication
*   From:header alignment. Does the from domain match that associated with SPF and DKIM
*   DMARC authentication: Sending domain has DMARC authentication
*   Encryption: The domain is using a TLS connection for transmitting email.
*   User-reported spam rate: Is the domain under the spam rate threshold? The current threshold is 0.3% but senders should aim to remain under 0.1%
*   DNS records: Sending domain and IPs have proper forward and reverse DNS

The two remaining requirements have a coming soon placeholder that will show compliance with:

*   **One-click unsubscribe (RFC8058)**: This applies to bulk sending and if sending over 5,000 messages a day and not transactional sending.
*   **Honor unsubscribe**: We expect this will monitor if recipients continue to receive emails after using the one-click unsubscribe

### How to Set Up Google Postmaster Tools

Let’s rewind a bit. If you’re not using Google Postmaster Tools yet, this should help you get started. Getting Google Postmaster Tools set up is pretty straightforward. As the tool is domain-based, you will need to add and authenticate your sending domains to identify your email traffic.

Visit postmaster.google.com and sign in with a Gmail or Google Workspace email address that you wish to serve as your account to manage your Postmaster Tools data.

_**Pro Tip**: If you have a team that may need access to your account and Postmaster Tools data, we recommend creating a new Gmail address for your team to share. For example: GPT@company.name.com or marketing@companyname.com._

Once inside your Postmaster Tools account, you can hit the GET STARTED button, and it will prompt you for three additional steps to complete the domain verification process.

**Step 1 of 3:**

Enter the sending domain you want to monitor in Postmaster Tools.

![Steps 1 of logging into Google Postmaster Tools: entering the domain.](https://iterable.com/wp-content/uploads/2024/03/Slide1-1.jpeg)

**Step 2 of 3:**

You will be provided a TXT record to insert into the (Domain Name System) DNS for the sending domain. After you grab the TXT record, you can hit “NOT NOW” and verify later once the TXT record is added to the DNS.

![Step 2 of Google Postmaster Tools: You'll be provided a TXT record to insert into the (Domain Name System) DNS for the sending domain](https://iterable.com/wp-content/uploads/2024/03/Slide1-2.jpeg)

**Step 3 of 3:**

Once the TXT record is added to the DNS for the sending domain, you can hit “Verify Domain.” Once the screen below pops up, simply hit the VERIFY box, and the sending domain will appear as verified in your Postmaster Tools dashboard. This is what it will look like once successfully verified (3c):

![Step 3 of Google Postmaster Tools: Verify domain ownership.](https://iterable.com/wp-content/uploads/2024/03/Slide3.jpeg)

_**Important note:** If you try to verify the TXT record before it is put into DNS correctly, you will see an error like the one below. Please have your IT/DNS team verify that the TXT record was put into place correctly._

![Important note about verifying the TXT record before it is put into DNS correctly](https://iterable.com/wp-content/uploads/2024/03/Slide2-1.jpeg)

#### How to Share Access to Google Postmaster Tools

It’s uncommon for just one person to be reviewing email deliverability and having the ability to share access with team members makes it even easier to stay on top of reputation metrics

To share access:

*   On your Postmaster Tools account, mouse over the verified domain to which you want to add your team member.
*   Click on the icon with the three dots and select Manage Users.
*   In the bottom right, click Add.
*   Enter your team member’s Google account email address in the pop-up window.

### What Data is Available Once Verified?

Configuring your domain in Google Postmaster Tools gives you access to a swath of helpful email metrics to determine how effective your email sends are. Senders are provided with several different data points displayed in different dashboards:

*   User Reported Spam rate
*   IP reputation
*   Domain reputation
*   Spam feedback loop
*   Message authentication
*   Encryption
*   Delivery errors

Below we go into a bit more detail.

#### User Reported Spam Rate

This dashboard shows how many users reported your message as spam. Complaint rates have a serious impact on your ability to get messages to their intended destination. From Spring 2024, Gmail has indicated that they will start blocking mail from senders that exceed a 0.3% complaint rate threshold.

![Line graph showing the volume of user reported spam over time](https://iterable.com/wp-content/uploads/2024/03/User-reported-spam.png)

Complaint rates are often calculated by dividing the number of emails marked as spam by the total number of emails sent. Gmail, however, calculates this differently. They compare _**the number of emails marked as spam against the total number of emails that landed in the inbox**_.

Emails delivered directly to the spam folder are not included in the User Reported Spam rate calculation. Only emails authenticated by domainkeys identified mail (DKIM) are eligible for spam-rate calculation.

Because there are no insights into the specific Gmail addresses that have reported messages as spam, brands need to consider all possible factors and all possible messages to help keep recipients from marking as spam. After all, user-reported spam can influence a brand’s domain and IP reputation.

#### Domain & IP Reputation

Domain and IP reputation gives a sense of whether Gmail’s automated spam filter will send mail to inbox or filter to the spam folder. If you have a bad domain or IP reputation, for example, there’s a higher likelihood your emails are sent to spam. Remember that spam filtering is based on thousands of signals and that domain and IP reputation are just two of them.

![Chart showing the volume of IPs in certain reputation levels. Bad being the worst, High being the best.](https://iterable.com/wp-content/uploads/2024/03/IP-Reputation.png)

![Line graph showing domain reputation.](https://iterable.com/wp-content/uploads/2024/03/Domain-Reputation.png)

**Domain & IP Classification:**

*   **BAD**: Sending history shows a high rate of spam. Emails sent by this domain will nearly always be refused by the Simple Mail Transfer Protocol (SMTP), or will be marked as spam.
*   **LOW**: This domain or IP has the reputation to regularly send a significant volume of spam. Emails sent from this domain or IP are highly prone to be marked as spam.
*   **MEDIUM**: This domain or IP has the reputation to send good emails, but is susceptible to sending spam sometimes. Most of the emails sent by this domain or IP will have a good deliverability rate unless the spam rate increases.
*   **HIGH**: This sender sends very low volumes of spam and respects Gmail’s best practices for senders. Emails sent from this domain or IP will rarely be marked as spam.

#### Feedback Loop

This dashboard will show more granular identifiers if you have signed up to Google’s Feedback Loop (FBL). It allows you to track the average feedback loop spam rate and the volume of unique identifiers available for a given day. An Identifier could be campaign ID, customername or other project ID. The information is displayed if the rate is high enough to trigger a data point.

When this metric is provided it can help pinpoint a specific mailing that recipients have been complaining about. Allowing corrective action to be taken.

![Bar and line graph showing feedback loop identifier count and feedback loop spam rate.](https://iterable.com/wp-content/uploads/2024/03/Spam-Feedbackloop.png)

This can be particularly useful in identifying if a particular campaign or message channel is impacting overall sending reputation.

#### Authentication

This dashboard shows what percentage of sender policy framework (SPF), DKIM, and domain-based message authentication, reporting, and conformance (DMARC) authentication is passing into Gmail. DMARC-specific reporting would need to be set up outside of Google Postmaster to get details other than the percentage.

This metric is important because it informs if authentication has passed or if there are any issues. If no DMARC record is published, for example, then you would see 0% for that metric. When dips occur you can then diagnose and fix any authentication problems.

![Line graph showing DKIM success rate, SPF success rate, and DMARC success rate. ](https://iterable.com/wp-content/uploads/2024/03/Authentication.png)

#### Encryption

This dashboard shows the percentage of inbound and outbound traffic that is being Transport Layer Security (TLS) encrypted into Gmail. GPT does not provide further details other than the aggregated percentages. This is important because as of December 2023, TLS is required to send emails to Gmail.

![Line graph showing the volume of TLS encrypted traffic.](https://iterable.com/wp-content/uploads/2024/03/Encryption.png)

#### Delivery Errors

If Gmail rejects any traffic (emails sent for that day by the domain) on a given day, this dashboard will show the percentage of messages rejected and a high-level reason for the rejections.

![Line graph showing the volume of rejected or temporarily failed traffic.](https://iterable.com/wp-content/uploads/2024/03/Delivery-Errors.png)

### Keeping an Eye on Compliance

Once compliant, most of these requirements will likely remain marked as compliant unless something breaks or a new infrastructure is created and not set up according to the requirements. (In this view, known status results are “Compliant” or “Needs work.”) The one exception is the user-reported spam rates, which should be monitored frequently since it can fluctuate based on sending practices.

Monitoring both Google Postmaster Tools pages—the new compliance dashboard and user- reported spam—regularly should be a part of any sender’s reputation monitoring. They should be used in conjunction with one another. For instance, you should monitor your user-reported spam rates in the original Google Postmaster Tools and compare them with the Compliance Status of the user-reported spam rate on the updated page.

_To learn more about Google Postmaster Tools or your brand’s email deliverability, ask your CSM about Iterable’s Deliverability Services. If you’re not yet an Iterable customer, schedule a demo today._

Want to take your deliverability to the next level? Download _**Email Deliverability 101: How to Reach the Inbox Every Time**_—your complete guide to building trust, boosting engagement, and ensuring your messages land where they belong.