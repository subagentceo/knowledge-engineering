# Canonical Name record (CNAME)

*Internet standard*. A DNS record that maps one hostname in a domain to another hostname instead of an IP address.

To map your custom hostname to the `sendgrid.net` domain, Twilio needs a CNAME record (canonical name record) that points to `sendgrid.net`. Twilio uses this CNAME for click and open tracking features. This routes those statistics to your Twilio SendGrid account. This also signs your messages, so your recipients will be able to see your CNAME.

```text {title="CNAME example"}
NAME                    TYPE   VALUE
--------------------------------------------------
clicks.example.com.     CNAME  sendgrid.net.
```

To configure [reverse DNS][rDNS] for your dedicated IP address, add a CNAME record to your DNS host.

If you have trouble validating your CNAME record, see [sender authentication troubleshooting][tb-sender-authn].

## Related entries

* [Mail Exchanger record (MX)][mx]
* [Domain Name System (DNS)][dns]
* [Fully Qualified Domain Name][fqdn]

[mx]: /docs/sendgrid/glossary/mx-record

[dns]: /docs/sendgrid/glossary/dns

[fqdn]: /docs/sendgrid/glossary/fqdn

[rDNS]: /docs/sendgrid/ui/account-and-settings/how-to-set-up-reverse-dns

[tb-sender-authn]: /docs/sendgrid/ui/account-and-settings/troubleshooting-sender-authentication
