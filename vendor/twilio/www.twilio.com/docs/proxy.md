# Proxy: One-to-one Masked Communications

> \[!IMPORTANT]
>
> Twilio's Proxy API is currently available as a Public Beta product. Some features are not yet implemented and others may be changed before the product is declared as Generally Available.
>
> Public Beta products are [not covered by a Twilio SLA](https://help.twilio.com/hc/en-us/articles/115002413087-Twilio-Beta-product-support).

Twilio Proxy simplifies the task of masking the communications between two parties (aka [masked phone numbers](/docs/glossary/what-are-masked-phone-numbers) or masked calling). Proxy automatically provides a number and associates two numbers together in order to forward messages and calls back and forth.

![Twilio proxy session connects customer and delivery driver using proxy numbers.](https://docs-resources.prod.twilio.com/f74d5bd01700c4a4c47e5f0cc86aed918984c174922cb35676b8d9837c6ba3b6.png)

With Proxy, Twilio facilitates any use case that can benefit from a temporary conversation between two parties.

*Not a developer? See the [Proxy product page](/docs/proxy).*

## Get started with Proxy

Follow our quickstart for the fastest experience adding masked phone numbers for SMS and Voice communications.

* [Proxy Quickstart](/docs/proxy/quickstart)

## Build your app

You've got an idea in mind that could employ ephemeral communications. Let us help you make it a reality.

These docs will help you turn that idea into production and show you all of the details you need to have a hit on your hands.

### Usage guides

* [Phone Number Management](/docs/proxy/understanding-phone-number-management)
* [How many Phone Numbers do I need?](/docs/proxy/phone-numbers-needed)
* [Reserved Phone Numbers](/docs/proxy/reserved-phone-numbers)
* [Out-of-Session Callback Response Guide](/docs/proxy/out-session-callback-response-guide)
* [Using the Reserved Numbers and Auto-Create functionalities to support the "online directory" scenarios](/docs/proxy/using-the-reserved-numbers-and-auto-create-functionalities-to-support-the-online-directory-scenarios)

### API reference

* [Proxy API Overview](/docs/proxy/api)
* [Proxy Webhooks](/docs/proxy/api/webhooks)
* [Proxy Phone Numbers](/docs/proxy/api/phone-number)
* [Proxy Session](/docs/proxy/api/session)

> \[!WARNING]
>
> If you choose to manage communications between your users, including voice calls, text-based messages (e.g., SMS), and chat, you may need to comply with certain laws and regulations, including those regarding obtaining consent. Additional information regarding legal compliance considerations and best practices for using Twilio to manage and record communications between your users, such as when using Twilio Proxy, can be found [here](https://help.twilio.com/hc/en-us/articles/360011435554-Best-Practices-for-Using-Twilio-to-Manage-and-Record-Communications-Between-Users).
>
> *Notice*: Twilio recommends that you consult with your legal counsel to make sure that you are complying with all applicable laws in connection with communications you record or store using Twilio.
