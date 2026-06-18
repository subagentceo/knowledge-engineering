# Secure your Twilio account

Secure your Twilio Email account and establish best security practices. Unsecured accounts become likely victims of account takeovers (ATO). An ATO occurs when malicious actors utilize a vulnerability, such as an exposed API key, to gain unauthorized access to an account. With this access, the abuser can use your account to send phish, spoof, or spam to recipients and damage your reputation. While Twilio has systems in place to monitor for ATOs, senders should implement best practices to secure their account.

## Store API keys in secure ways

Once created, store your API keys securely.

* Never upload keys to GitHub.
* Store your keys in a secured vault, within `.env` files, or both.
* Check applications for accidental exposure.
* Never leave production applications in `debug` mode as this can expose keys and other secrets.

> \[!WARNING]
>
> If you expose a key to the public regardless of duration, rotate in a different key and delete the compromised one from the account.

## Rotate API keys

Rotate API keys on a regular cadence.

* Rotate keys at least once a quarter.
* Determine the best schedule for your operations and implement a regular rotation cadence.
* Delete unused keys.

## Set access controls

### IP access management

IP Access Management (IPAM) improves account access management. IPAM lets you control who can access your Email account based on the originator's IP address. Twilio rejects login requests made from IP addresses not in IPAM.

### Turn on two-factor authentication

[Two-factor authentication (2FA)][tfa] improves security through requiring authentication beyond basic usernames and passwords. Use one-time passwords (OTP) to access the account.

### Implement single sign-on

To integrate Twilio user authentication with access management platforms such as Okta and Microsoft Active Directory, use Single Sign-On (SSO). If your organization supports SSO, turn it on your Twilio accounts.

## Update open source software

To send email, many third party open source solutions integrate with Twilio. These include popular content management systems (CMS) such as WordPress, Joomla, and Drupal. If using one of these solutions, update your CMS installations and plugins regularly with the latest patches and updates. Failure to update these systems might introduce vulnerabilities where bad actors can then send unauthorized email from your account.

[tfa]: /docs/glossary/two-factor-authentication
