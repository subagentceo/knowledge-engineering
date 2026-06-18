# Spam Traps

*Internet Security*. Email addresses created without active owners to identify spammers and senders with poor data quality practices.

Inbox providers, filtering companies, and [blocklist][] administrators create these email addresses called *spam traps*.

Spam trap addresses don't engage with email. If you send an email to a spam trap, providers might block all emails sent from your IP addresses.

To manage spam trap networks, providers monitor email received at these addresses. On a regular basis, review your email lists for unengaged addresses and remove those addresses.

## Types of spam traps

Spam traps can be either *pristine*, *typo*, or *recycled*.

### Pristine traps or honeypots

Providers create these addresses or domains for the purpose of online anonymity. These addresses don't sign up to receive email. Pristine traps end up on mailing lists for one of two reasons:

* They appear on lists when senders purchase, rent, or scrape addresses.
* Bots add them to your email list through unsecured forms.

### Typo traps

Mistyped email addresses can be spam traps. Though not all typo addresses are spam traps, common misspellings like `gmall.com` or `yaho.com` can often be used as spam traps. Large amounts of typo traps point to issues at the point of address collection.

### Recycled traps

Actual users owned these email addresses but have since abandoned or closed the email accounts. To collect data on companies that continue to mail to unengaged users, inbox providers and other filtering companies obtain control of these addresses. Large quantities of recycled traps point to a need for list hygiene and sunset policies.

## Avoid sending email to spam traps

To protect your business reputation, use sound list-sourcing and list-maintenance practices.

* Don't use email lists containing addresses that haven't opted in to receiving your company's messages like purchased lists.
* Use double opt-in for your lists.
* When a list that uses single opt-in or notified opt-in, confirm the spelling of email addresses before adding them to your list. Consider using double opt-in instead.
* Maintain your lists by deleting unusable contacts, especially in lists where a year or more has elapsed between sending emails to contacts. Going for long periods of time without emailing a contact can cause your email to be marked as spam.
* Use list segmentation to identify contacts that haven't opened any emails for over six months. Once identified, send one last confirmation email to the contacts and delete contacts if necessary.

## Related resources

* [Spam Traps: What They Are & How to Avoid Them][spam-traps-blog].

[spam-traps-blog]: https://www.twilio.com/en-us/blog/insights/spam-traps-what-they-are-and-why-you-should-pay-attention-to-them

[blocklist]: /docs/glossary/blocklist

[segments]: /docs/glossary/segments
