# Canonical Name record (CNAME)

*Internet standard*. A DNS record that maps one hostname in a domain to another hostname instead of an IP address.

To map your custom hostname to the `sendgrid.net` domain, Twilio needs a CNAME record (canonical name record) that points to `sendgrid.net`. Twilio uses this CNAME for click and open tracking features. This routes those statistics to your Twilio Email account. This also signs your messages, so your recipients can see your CNAME.

```text {title="CNAME example"}
NAME                    TYPE   VALUE
--------------------------------------------------
clicks.example.com.     CNAME  sendgrid.net.
```

## Related entries

* [Mail Exchanger record (MX)][mx]
* [Domain Name System (DNS)][dns]
* [Fully Qualified Domain Name][fqdn]

[mx]: /docs/glossary/mx-record

[dns]: /docs/glossary/dns

[fqdn]: /docs/glossary/fqdn
