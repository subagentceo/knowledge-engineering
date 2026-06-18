# Unsubscribe with Subscription Tracking

Subscription tracking offers the following features:

* Adds and customizes an unsubscribe link to the bottom of your email messages.
* Creates a replacement tag that allows you to put the unsubscribe link anywhere you would like using HTML.
* Incorporates the [list-unsubscribe][] header in your email messages.

## Turn on Subscription Tracking

1. Log in to the legacy Twilio Console.
2. Go to **Settings** > **Tracking**.
3. Click **Subscription Tracking**. The **Subscription Tracking** panel appears.
4. Toggle **Setting State** to **Enabled**.
5. Click **Save**.

## Add an unsubscribe link

Complete the procedure in [Turn on Subscription Tracking][].
Twilio SendGrid adds the default unsubscribe link to the bottom of your email messages.

## Change the unsubscribe link text

1. Log in to the legacy Twilio Console.
2. Go to **Settings** > **Tracking**.
3. Click **Subscription Tracking**. The **Subscription Tracking** panel appears.

## HTML format

4. Scroll to the **HTML Unsubscribe Content** box.
5. Change the content to meet your needs. To format your content, use the formatting tools.

   ```html
   If you'd like to unsubscribe and stop receiving these emails <% click here %>.
   ```

   Place the text that links to your landing page inside the `<% %>` tags.

   In the default example, recipients click "click here" to unsubscribe.
6. Click **Save**.

## Text format

4. Scroll to the **Plain Text Unsubscribe Content** box.
5. Change the content to meet your needs. To format your content, use the formatting tools.

   ```html
   If you'd like to unsubscribe and stop receiving these emails <% click here %>.
   ```

   Place the text that links to your landing page inside the `<% %>` tags.

   In the default example, recipients click "click here" to unsubscribe.
6. Click **Save**.

## Move the unsubscribe link

To add an HTML code snippet to the body of your email message,
edit the **Replacement Tag** box within the app **Subscription** settings.

1. Log in to the legacy Twilio Console.
2. Go to **Settings** > **Tracking**.
3. Click **Subscription Tracking**. The **Subscription Tracking** panel appears.
4. Write a replacement tag within the **Replacement tag** box.
   You can then use that tag within the HTML. The unsubscribe URL replaces this tag.
5. To add your unsubscribe link to your HTML code,
   add the word `[unsubscribe]` as the hypertext reference in the anchor tag (`<a>`).

   ```html {title="Changed unsubscribe link text"}
   <p>
     To stop receiving these email messages
     <a href="[unsubscribe]">click here</a>
   </p>
   ```
6. Click **Save**.

## Edit unsubscribe landing page

A landing page serves as the target of an unsubscribe link.
To create the page that appears after a recipient clicks the unsubscribe link, complete the following steps.

1. Log in to the legacy Twilio Console.
2. Go to **Settings** > **Tracking**.
3. Click **Subscription Tracking**. The **Subscription Tracking** panel appears.
4. Edit the text inside the **SendGrid landing page** box.
5. Click **Save**.

When a recipient clicks the unsubscribe link, they get redirected to your landing page.

[list-unsubscribe]: https://www.twilio.com/en-us/blog/insights/list-unsubscribe

[Turn on Subscription Tracking]: #turn-on-subscription-tracking
