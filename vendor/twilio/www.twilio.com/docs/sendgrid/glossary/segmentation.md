# Segmentation

*Marketing*. The practice of channeling email traffic based on the intent and audience of email messages.

Segmentation separates the different types of email that you send, such as marketing email and transactional email. Segmenting your email traffic improves both your engagement statistics and [deliverability][].

## Segmentation in Twilio SendGrid

To segment your traffic, use one of two options:

* [Create a subuser][] and send email with that subuser.
* Create a subuser and purchase a separate [dedicated IP address][] for sending email messages for that subuser.

To organize your dedicated IP addresses, use the Twilio SendGrid [IP Pooling feature][]. It lets you to set up separate IP pools. When sending different types of email, you can associate your email message with a specific IP Pool. By sending it through the associated dedicated IP address, the IP Pooling feature segments your traffic.

## Related resources

* [Segmenting Your Contacts][]

[Segmenting Your Contacts]: /docs/sendgrid/ui/managing-contacts/segmenting-your-contacts

[deliverability]: /docs/sendgrid/glossary/deliverability

[create a subuser]: /docs/sendgrid/ui/account-and-settings/subusers/#create-a-subuser

[dedicated IP address]: /docs/sendgrid/ui/account-and-settings/dedicated-ip-addresses

[IP Pooling feature]: /docs/sendgrid/api-reference/ip-pools/create-an-ip-pool
