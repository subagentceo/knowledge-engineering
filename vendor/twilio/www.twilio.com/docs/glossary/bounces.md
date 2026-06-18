# Bounced email messages

*Email Deliverability*. A permanent rejection of messages sent from your IP address.

The recipient server might return an email message for a few reasons:

* The recipient's address is invalid.
* The domain name doesn't exist.
* The recipient is unknown.

Once Twilio adds an email to the bounce list, it drops any future requests to this email address.

## Types of bounces

Bounces occur either before (*synchronous*) or after (*asynchronous*) the message gets delivered.

### Asynchronous bounce

An *asynchronous bounce* occurs when Twilio Email accepts a message for delivery, but that message reported as a bounce later. Asynchronous bounces are also known as *out-of-band* or *non-conversational bounces*. Consider any message that results in an asynchronous bounce as undeliverable. When this happens, a message might have *both* a delivery and a bounce event. This might result in anomalous campaign statistics.

With an asynchronous bounce, the email address that sent the original message receives a Delivery Status Notification (DSN) or Non-Delivery Report (NDR). These responses detail what made the message undeliverable. Senders might receive these responses minutes or hours after the recipient system accepted the message.

This behavior records the failure after the message transmits.

### Synchronous bounce

A *synchronous* or *conversational bounce* occurs when the remote inbox provider rejects the message during the initial delivery attempt and provides bounce codes. The code indicates the reason for the rejection. A delivery event doesn't occur with a synchronous bounce.

When asynchronous bounces occurs, events lack some contextual detail. This means the message ID and IP address might be unavailable.

Most bounces are synchronous and occur more often in corporate or small business domains. They might occur with greater frequency for business-to-business (B2B) senders. Most major inbox providers only generate synchronous bounces.

## Additional entries

* [Block](/docs/glossary/blocks/)
* [Spam](/docs/glossary/spam/)
* [Spam Filter](/docs/glossary/spam-filter/)
* [Spam Reports](/docs/glossary/spam-reports/)
* [Spam Trap](/docs/glossary/spam-traps/)
