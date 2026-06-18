# Branded Calling overview

Branded Calling is a Voice Trust Product that increases call transparency and trust. You can display a verified display name, company logo, and call reason on the recipients' mobile phones during outbound calls from Twilio numbers. Branded Calling helps recipients identify your calls as legitimate.

> \[!IMPORTANT]
>
> Branded Calling is available as a pilot, private beta, or public beta, depending on the [region and product type](#coverage-and-product-status). The information contained in this document is subject to change. Some features are not yet implemented and others may change before the product is declared as generally available. Pilot and beta products are not covered by the Twilio Support Terms or Twilio Service Level Agreement.
>
> See the applicable product documentation for further details regarding product status.

**Note**: Branded Calling works on *mobile phones*. For landlines, use [Caller ID Name (CNAM)](/docs/voice/brand-your-calls-using-cnam) instead.

![Mobile screen showing Owl Insurance call with logo and customer support reason.](https://docs-resources.prod.twilio.com/594a1f2e1ea01cf75dbe4b3880e67eb2d25a335cfeed8596277d39c2b46151ec.png)

## Benefits of Branded Calling

* Higher answer rates and improved Return on Investment (ROI)
* Increased customer trust and brand recognition
* Protection against fraud

## Branded Calling types

Branded Calling is available in two types based on the features you want to use:

| Type     | Features                        |
| -------- | ------------------------------- |
| Basic    | Display name                    |
| Enhanced | Display name, logo, call reason |

## Coverage and product status

US Branded Calling supports both Basic and Enhanced types, while Non-US Branded Calling supports only the Basic type.

> \[!NOTE]
>
> To enable Non-US Basic Branded Calling, contact your account manager.

| Region | Type     | Country        | Network                             | Product status |
| ------ | -------- | -------------- | ----------------------------------- | -------------- |
| US     | Basic    | United States  | T-Mobile, Verizon                   | Public beta    |
| US     | Enhanced | United States  | T-Mobile, Verizon                   | Public beta    |
| Non-US | Basic    | Canada         | Rogers Wireless, Bell Mobility      | Private beta   |
| Non-US | Basic    | Germany        | Vodafone Germany, O2                | Private beta   |
| Non-US | Basic    | United Kingdom | BT/EE, Virgin Media O2, Vodafone UK | Private beta   |
| Non-US | Basic    | Spain          | MasOrange                           | Pilot          |

**Note**: Branded Calling isn't available yet for financial and government industries on the Vodafone UK network.

## API resources

> \[!NOTE]
>
> The following API resources are available as private beta. To request access, contact your account manager.

* Use the [ProvisioningStatus resources](/docs/voice/voice-trust/api/provisioning-status) to view detailed information about phone numbers associated with a Voice Trust product, including Branded Calling.
* If you are an Independent Software Vendor (ISV), [use the Compliance resources to onboard your customers to Branded Calling](/docs/voice/branded-calling/onboard-customers-using-api).

## Next steps

* [US Basic Branded Calling](/docs/voice/branded-calling/us-basic)
* [US Enhanced Branded Calling](/docs/voice/branded-calling/us-enhanced)
