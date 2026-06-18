# Tracking settings

## Privacy and tracking best practices

Many countries have consumer privacy laws. These laws require you to get a recipient's unambiguous consent before using technologies that track their behavior. This explains why many websites have pop-ups that ask permission to use cookies from that site. These laws consider the transparent pixels included in emails to be a behavioral tracking mechanism.

Open tracking embeds a transparent image in the emails you send. When your recipient opens their email, another server requests these images. This allows Twilio SendGrid to log "open" events.

The Marketing Campaigns service relies on open tracking and turns it on by default. If you use the Marketing Campaigns service and want to send email to recipients with privacy laws, *get the consent of your recipients before you send mail*.

## Open tracking

Open tracking adds an transparent one pixel image to the end of the email. Twilio SendGrid uses this to track email [opens][]. If the email recipient turned on images in their inbox client, the Twilio SendGrid server attempts a request for the transparent image. If this succeeds, SendGrid logs an open event. To see these events, go to **Activity**.

If you use email link branding, your branded domain serves the open tracking image.

Twilio SendGrid logs two types of opens: a *unique open* and an *open*.

* It logs a unique open the first time a given recipient opens the email only.
* It logs an open for all opens of the email in question.

To turn on open tracking, complete the following steps:

1. Go to **Settings** > [**Tracking**][tracking].
2. Click **Open Tracking**.\
   The **Open Tracking** panel displays.
3. Toggle **Setting State** to **Enabled**.
4. Click **Save**.

## Click tracking

Click tracking rewrites all the links and URLs in your emails. The links then point to either Twilio SendGrid's servers or the domain you branded your link. When customer clicks a link in the email, SendGrid can track those [clicks][]. SendGrid can track up to 1,000 links per email.

To turn on click tracking, complete the following steps:

1. Go to **Settings** > [**Tracking**][tracking].
2. Click **Click Tracking**.\
   The **Click Tracking** panel displays.
3. Click **Also enable click tracking in plain text emails**.
4. Toggle **Setting State** to **Enabled**.
5. Click **Save**.

To set up links that use your domain, see [How to set up link branding][link-branding].

## Subscription tracking

Subscription tracking adds subscription management links to the end of emails. Twilio SendGrid tracks unsubscribed recipients and prevents them from being sent any future emails from you.

You can customize the text attached to emails and customize the landing page. The links can be configured in whatever fashion suits your needs.

To turn on subscription tracking, complete the following steps:

1. Go to **Settings** > [**Tracking**][tracking].
2. Click **Subscription Tracking**. The **Subscription Tracking** panel displays.
3. In the **Replacement Tag** box, enter the template substitution tag that represents your unsubscribe URL.
   * To place the unsubscribe URL at a specific location in the template, include the tag in an anchor element.\
     **For example**: If you enter `[unsubscribe]` as the replacement tag, add `<a href="[unsubscribe]">Unsubscribe</a>` to your HTML.
   * If you leave **Replacement Tag** empty, Twilio SendGrid appends the default unsubscribe content to the end of the email.
4. In the **HTML Unsubscribe Content** box, enter the unsubscribe message for HTML versions of the email. Wrap the unsubscribe link text in `<% %>`.
5. In the **Plain Text Unsubscribe Content** box, type the unsubscribe message for text versions of your email.
   Enclose the unsubscribe link text in `<% %>`.
6. In the **SendGrid Landing Page HTML** box, type the HTML code for the page that confirms the unsubscription.
7. Toggle **Setting State** to **Enabled**.
8. Click **Save**.

## Google Analytics tracking

Google Analytics tracking adds data from Google Analytics to your emails. These parameter values identify the settings of your campaign down to each link in the email.

1. Go to **Settings** > [**Tracking**][tracking].
2. Click **Google Analytics Tracking**.\
   The **Google Analytics Tracking** panel displays.
3. Twilio SendGrid uses the recommended Google settings.\
   To override those settings, change the values in the following fields. All of these values differentiate and identify your campaign. They don't affect anything in Google Analytics functionality.
   * Type a different referrer source into the **Campaign Source** box. This could be something like `google`, `yahoo`, or `newsletter2025`.
   * Type the marketing medium into the **Campaign Medium** box. This could be something like `email`, `cpc`, or `banner`.
   * Type any paid keywords you set in your GA4 campaign into the **Campaign Term** box. This applies only to search-based campaigns.
   * Type any terms to differentiate links to the same URL in the **Campaign Content** box.
   * Type a human-readable term into the **Campaign Name** box. Choose a term that you can remember.
4. Toggle **Setting State** to **Enabled**.
5. Click **Save**.

* To learn more about Google Analytics, see [Google Analytics in Twilio SendGrid][].
* To learn more about using this app, see the [Google URL Builder][] and [Best Practices for Campaign Building][] articles.

[tracking]: https://app.sendgrid.com/settings/tracking

[opens]: /docs/sendgrid/glossary/opens

[link-branding]: /docs/sendgrid/ui/account-and-settings/how-to-set-up-link-branding

[clicks]: /docs/sendgrid/glossary/clicks

[Google Analytics in Twilio SendGrid]: /docs/sendgrid/ui/analytics-and-reporting/google-analytics

[Google URL Builder]: https://support.google.com/analytics/answer/1033867

[Best Practices for Campaign Building]: https://support.google.com/analytics/answer/1037445
