# Verify vs. Authy

> \[!WARNING]
>
> As of November 2022, Twilio no longer provides support for Authy SMS/Voice-only customers. Customers who were also using Authy TOTP or Push prior to March 1, 2023 are still supported. The Authy API is now closed to new customers and will be fully deprecated in the future.
>
> For new development, we encourage you to use the [Verify v2 API](/docs/verify/api).
>
> Existing customers will not be impacted at this time until Authy API has reached End of Life. For more information about migration, see [Migrating from Authy to Verify for SMS](https://www.twilio.com/blog/migrate-authy-to-verify).

The Verify API is a consolidated version of earlier versions of our phone verification and 2FA APIs.

We strongly encourage you to use the [Verify API](/docs/verify/api) for all new development.

| **Product**                            | **Description**                                                                                                                                                                                                                                                                                                                                                                                                              |
| -------------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| [Verify API](/docs/verify/api)         | Phone, email, and device-based verification, multichannel support for two-factor authentication (2FA), passwordless login. Includes channels such as [SMS](/docs/verify/api/verification), [Voice](/docs/verify/api/verification), [Email](/docs/verify/email), [TOTP](/docs/verify/totp), [Push and Silent Device Approval](/docs/verify/push), [WhatsApp](/docs/verify/whatsapp), [Silent Network Auth](/docs/verify/sna). |
| [Verify v1 API](/docs/verify/api/v1)   | Older version of the Verify API that is no longer accepting new customers. This API will eventually be fully deprecated. Please use Verify for new use cases.                                                                                                                                                                                                                                                                |
| [Authy API](/docs/authy/api)           | Older version of the Verify API that is no longer accepting new customers. This API will eventually be fully deprecated. Please use Verify for new use cases.                                                                                                                                                                                                                                                                |
| [Twilio Authy App](https://authy.com/) | Free consumer application for TOTP.                                                                                                                                                                                                                                                                                                                                                                                          |

## Get started with Verify

* [Verify API reference](/docs/verify/api)
* [Serverless phone verification](https://www.twilio.com/blog/serverless-phone-verification)
* [Verify Quickstarts (C#, Python, Node.js, Ruby, Java, PHP)](/docs/verify/quickstarts)
* \[Code exchange] [One-time passcode verification](https://www.twilio.com/code-exchange/one-time-passcode-verification-otp)
* \[Code exchange] [Verify TOTP](https://www.twilio.com/code-exchange/verify-totp)

## FAQ

**Is the Authy API going away?**

Yes. Authy API has reached End of Support. It is closed to new customers and existing customers will not be impacted until the API reaches End of Life and is fully deprecated.

**How does this affect the Twilio Authy apps? Will they be supported by Verify?**

We are committed to maintaining the Twilio [Authy mobile apps](https://authy.com/) for existing Authy API customers and as a consumer 2FA application. That said, the Twilio Authy mobile apps will not be supported by Verify Push.

**Will other channels be supported by Verify?**

Please see Verify's current channel list [here](/docs/verify/authentication-channels) and [reach out](https://www.twilio.com/en-us/help/sales) if you have other specific channel requests.

## More questions?

[Get in touch](https://www.twilio.com/en-us/help/sales) to discuss your application needs and how to use Twilio for account security.
