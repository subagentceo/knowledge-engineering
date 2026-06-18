# Opt-out keywords

> \[!IMPORTANT]
>
> Twilio's Proxy API is currently available as a Public Beta product. Some features are not yet implemented and others may be changed before the product is declared as Generally Available.
>
> Public Beta products are [not covered by a Twilio SLA](https://help.twilio.com/hc/en-us/articles/115002413087-Twilio-Beta-product-support).

## How Proxy handles opt-out and opt-in keywords

By default, Twilio handles opt-out and opt-in keywords as described in [Twilio support for opt-out keywords (SMS STOP filtering) document](https://help.twilio.com/hc/en-us/articles/223134027-Twilio-support-for-opt-out-keywords-SMS-STOP-filtering-); when Twilio receives an opt-out keyword from an external sender phone number to any Twilio number, Twilio will reply with a pre-generated response and will no longer send messages from the Twilio Number to that external phone number until the sender opts back in by sending an opt-in keyword.

When using SMS with Proxy, there are special considerations and deviations from the standard handling of opt-out and opt-in keywords:

1. Proxy will not forward STOP, REVOKE, OPTOUT, UNSUBSCRIBE, END, CANCEL, QUIT, STOPALL, ARRETT, ARRET, ARRETE (opt-out) messages from either participant. Dropped messages do not trigger callbacks.
2. Proxy forwards all opt-in, help and info keywords between Participants, except UNSTOP, to ensure that potentially valid messages are not lost.
3. For any opt-in/out message not forwarded, Proxy will send a debugger notification with [Twilio code 80901](/docs/api/errors/80901).
4. Proxy does not support the [Advanced Opt Out feature](/docs/messaging/tutorials/advanced-opt-out) available with Messaging Services.
5. Unlike with a Messaging Service, opt-out keyword replies will not apply to the entire pool of phone numbers in a Proxy Service pool.
6. If you would like Proxy to respect the STOP SMS Filtering flag, [contact our support team](https://help.twilio.com) to submit a request to enable the ProxyRespectSmsStopFilterFlag account flag. Once Twilio enables this, custom opt-in/out keyword handling can be accomplished by adding the desired logic to Proxy's [InterceptCallbackUrl](/docs/proxy/api/webhooks).
