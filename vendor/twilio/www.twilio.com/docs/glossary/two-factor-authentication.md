# Two Factor Authentication (2FA)

*Internet Security*. Use of two or more means of user identification to grant access to a system. This method of authentication is also known as multi-factor authentication (MFA), two-step verification (TFA).

[Authentication][email-auth] factors have three dimensions:

* **Retention**: [knowledge][kba], something you know, possession, something you have, or inherent, something you are.
* **Format**: hardware (physical device), software (code), and wetware (mental construct)
* **Proximity**: connected to an authenticating device or disconnected from an authenticating device

## Examples of authentication factors

| Factor                                       | Retention  | Format   | Proximity    |
| -------------------------------------------- | ---------- | -------- | ------------ |
| Authentication mobile app                    | Possession | Software | Disconnected |
| Card Verification Code (CVC)                 | Possession | Hardware | Disconnected |
| Facial recognition                           | Inherent   | Software | Connected    |
| [FIDO2][FIDO] USB key                        | Possession | Hardware | Connected    |
| Fingerprint                                  | Inherent   | Hardware | Connected    |
| Generated prompted question                  | Knowledge  | Wetware  | Connected    |
| NFC smart card                               | Possession | Hardware | Disconnected |
| Oauth                                        |            | Software | Disconnected |
| One-Time Password (OTP) token                | Possession | Hardware | Disconnected |
| Password                                     | Knowledge  | Wetware  | Disconnected |
| PIN                                          | Knowledge  | Wetware  | Disconnected |
| Predetermined prompted question              | Knowledge  | Wetware  | Disconnected |
| Time-based One-Time Password (TOTP) over SMS | Possession | Software | Disconnected |
| Voice recognition                            | Inherent   | Software | Connected    |

Two-factor authentication uses two or more of these factors.

[kba]: https://en.wikipedia.org/wiki/Knowledge-based_authentication

[FIDO]: https://fidoalliance.org

[email-auth]: /docs/email/security/domains
