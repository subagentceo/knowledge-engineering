# Click Tracking & HTML Best Practices

> \[!NOTE]
>
> It's important to consider the privacy implications of enabling Click and Open tracking before enabling the feature. Depending on the country where your recipient resides, using this feature to track engagement may require the unambiguous consent of the recipient.

If you are experiencing issues with the click tracking setting not replacing your original links, please take a look at your link formatting. Links must be in the proper format in order for our click tracking setting to find and replace them:

* Links must be within an HTML `<a>` tag with the `href` argument within the tag.
* There must not be spaces around the `=` in the `href` attribute
* The URI must be quoted, and must be preceded by **`"http://`** or **`"https://`**.

Here are some example links that will be properly replaced by our click tracking app:

* `<a href="http://www.sendgrid.com">SendGrid</a>`
* `<a href="https://sendgrid.com">SendGrid</a>`
* `<a target="_blank" href="https://sendgrid.com">SendGrid</a>`

Note that a link shouldn't be a custom field or buried within a custom field. For example:

* `<a href="{{ birthday_url }}"></a>` will not work. Instead you should format your link like this: `<a href="http://example.com/{{ birthday_url }}"></a>`

The following links, even though they may still resolve, will not be captured or replaced by our click tracking system:

* `<a href="sendgrid.com">SendGrid</a>`
* `<a href="www.sendgrid.com">SendGrid</a>`
* `<a href= http://www.sendgrid.com>SendGrid</a>`
* `<a href = "https://sendgrid.com">SendGrid</a>`

> \[!NOTE]
>
> If you are in the habit of BASE64 encoding your email content, we will be unable to detect the encoded `<a>` tags and overwrite them, so clicks will not be tracked in this case.

Click tracking can be turned off for individual links by including the `clicktracking=off` attribute inside the anchor of an HTML link *before* the `href`. For example, `<a clicktracking=off href="http://example.com">link text</a>` would not be tracked.

If you have a Pro 100K package or higher and you have [authenticated](/docs/sendgrid/ui/account-and-settings/how-to-set-up-reverse-dns/) your sending IP address, the replaced click tracking links lie under the authenticated subdomain. Pro 100K and higher packages that have not authenticated, Essentials packages, and Free packages have click tracking links that resolve through one of SendGrid's domains (sendgrid.net, sendgrid.info, sendgrid.me, etc.).
