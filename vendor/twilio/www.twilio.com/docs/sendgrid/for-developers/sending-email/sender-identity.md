# Sender Identity

To maintain the sender reputation and uphold legitimate sending behavior, Twilio requires verified *Sender Identities*. A Sender Identity represents your `From` email address. This address displays to your recipients as the sender of your email messages.

You can verify one or more Sender Identities using either domain authentication or single sender verification. Each verification method has its advantages and disadvantages.

To help you decide which option best fits your needs, this page explains both methods.

## Single sender verification

When you don't have access to the DNS settings for your domain, use single sender verification allows verification your Sender Identity. Complete Domain Authentication for your production mail send.

### Advantages of single sender verification

* Provides a quick method of verification when starting.
* Permits sending from a single email address that you confirmed you own.

### Disadvantages of single sender verification

* Works for testing only.
* Applies only to each individual email address you verify.

To verify one sending email address, see [single sender verification][].

## Domain authentication

> \[!NOTE]
>
> To authenticate your domain, you need editing permissions for your domain's DNS records.

Like most email service providers, Twilio recommends domain authentication. Though you can use single sender verification for testing, configure domain authentication before launching your mail send into production.

### Advantages of domain authentication

* An authenticated domain improves mail deliverability and sender reputation.
* The industry uses domain authentication as its best practice.
* You can send from any email address on your authenticated domain.
* You need to configure each domain individually.

To authenticate your domain, see [How to set up domain authentication][].

### Disadvantages of domain authentication

* Subdomains can't inherit permissions from a root domain.

[How to set up Domain Authentication]: /docs/sendgrid/ui/account-and-settings/how-to-set-up-domain-authentication

[Single Sender Verification]: /docs/sendgrid/ui/sending-email/sender-verification
