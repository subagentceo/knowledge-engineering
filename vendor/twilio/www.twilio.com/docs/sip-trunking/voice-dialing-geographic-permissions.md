# Protect your account with Voice Dialing Geographic Permissions

## Allow legitimate calls, block unwanted calls on Programmable Voice and Elastic SIP Trunking

Use Voice Dialing Geographic Permissions to enable calling 200+ countries and territories on the Twilio platform while reducing your risk from toll fraud. If you prefer to use the REST API, see the [Dialing Permissions resources](/docs/voice/api/dialing-permissions-resources). To learn about toll fraud, see [How to protect your account from toll fraud](https://www.twilio.com/blog/how-to-protect-your-account-from-toll-fraud-with-voice-dialing-geo-permissions-html).

## Set Geo Permissions in the Console

## Twilio Console

1. Open [Twilio Console](https://1console.twilio.com/) and go to [**Voice** > **Settings** > **Geo permissions**](https://1console.twilio.com/go?to=/account/__account__/us1/voice/settings/geo-permissions-settings).
2. Select a country from the list, then enable or disable calling to **Low-Risk** or **High-Risk** number ranges.
3. Select **Save** to apply your changes.

## Legacy Console

1. Log in to the [legacy Console](https://console.twilio.com/) and go to [**Voice** > **Settings** > **Geo permissions**](https://www.twilio.com/console/voice/settings/geo-permissions).
2. Select a country, then select or clear the **Low-Risk** or **High-Risk** number ranges.
3. Select **Save**.

Use the Phone Number Permission Check on the Geo Permissions page to confirm whether a specific number falls into a high-risk range.

Permissions can be enabled in each country. Each country can have up to a dozen number types and hundreds to even thousands of number ranges unique to that country. Twilio has classified the number ranges that have the highest risk of telecom fraud.

Now you can quickly enable calling to only low-risk destinations in each country while blocking calls to high-risk destinations in a few clicks.

> \[!WARNING]
>
> **Note:** Only **Owner** and **Administrator** roles can update Geographic Permissions.

Let's look at these permissions more closely

## Low-Risk Number Ranges

> \[!NOTE]
>
> These number ranges consist of all number ranges Twilio has classified as low-risk. Only turn on calling to countries you need to call. Most mobile and landline/fixed number ranges fall into this category.

## High-Risk Number Ranges

> \[!WARNING]
>
> Twilio has classified these number ranges to have high-risk of toll fraud. Most businesses never need to call these ranges so disable permissions to reduce your risk.

There are two broad categories of high-risk destinations - High-Risk for toll fraud and Special Services Number Ranges.

When the checkbox for a high-risk range is cleared, calls to those destinations are blocked, protecting your account from toll fraud.

**High-Risk for Toll Fraud** - Most businesses never need to call these destinations and we encourage you to disable calling these ranges to reduce your risk. Twilio has identified thousands of very narrow number ranges, often in mobile/landline ranges, that are used for the sole purpose of terminating calls in toll-fraud attacks. The owners of these numbers receive revenue for every minute of voice calls placed to them.

This fraud vector, also called International Revenue Sharing Fraud (IRSF), leads to $10 billion in industry-wide revenue losses annually. It is carried out across 200+ countries, across all number types, wide price ranges, and carried out by a well-coordinated team of criminals distributed around the globe. Since numbers can be bought and sold nearly instantly, Twilio updates the automatically multiple times per month, adding new high-risk ranges, and deleting ranges no longer believed to be risky. Twilio has classified these high-risk number ranges by analyzing millions of calls on the Twilio Super Network along with deep integration with anti-fraud databases. Twilio chooses to not disclose these number ranges to further protect your accounts. Twilio reserves the right to update this list without warning.

You can use the Phone Number Permission Check on the Geo Permissions page to confirm the numbers you care about are not in these ranges.

**High-Risk Special Services Number ranges** - These number ranges include premium, shared-cost and special services number types.

Fraudsters carry out abuse to these number types because they are allowed to charge a higher toll-rate because these number ranges offer special services such as psychic lines, government lines, adult or other paid-for services.

These number ranges change infrequently and Twilio allows you to view these number ranges on the Geo Permissions Console page. Twilio reserves the right to update this list without warning and there is no guarantee for the correctness and completeness of this list.

## Recommended Permissions

### Recommendations for Proof-of-concept

We recommend that you only enable calling to low-risk destinations in the countries you need to call. Calling low-risk destinations still let you verify connectivity and quality for each country your business needs to call. Use 2FA to protect against account-takeovers and keep [API keys](/docs/iam/api-keys/key-resource-v2010) private.

### Recommendations for Production

Here are some recommended guidelines for applying appropriate permissions for your customers.

When you set permissions for a customer you need to consider

1. How much do you trust the customer
2. How much do you value your customers' call completion rate
3. What countries and number ranges are required to fulfill the use-case

On one hand, you might have an anonymous trial user that should be blocked from calling all destinations known for toll-fraud.

On the other hand, for a high-valued and trusted customer that values call completion rates, you may want to grant them permissions to call anywhere, since you know they will reimburse you for any abuse on their account.

**Geo Permissions by Use-Case**

| Use-Case                                                         | Recommended Permissions                          | Fraud Vector                                                                                                              | Notes                                                                                                                                                                                     |
| ---------------------------------------------------------------- | ------------------------------------------------ | ------------------------------------------------------------------------------------------------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| 2FA, Click-to-call                                               | Low-risk destinations only                       | Abuse public webpage that allows phone number to be entered                                                               | Untrusted user, means chance for abuse is high. Consider disabling entire countries known for toll fraud unless you have a well tested rate limiter and possibly identity verification    |
| PBX                                                              | Low-risk destinations only                       | Gain access to PBX by dictionary password attack                                                                          | Special services destinations occasionally need to be called by businesses.                                                                                                               |
| Sales Dialer, Outbound Contact Center                            | Low-risk destinations only                       | Abuse trial accounts or use stolen credit cards on upgraded accounts                                                      | You may grant access to call high-risk destinations to your most trusted customers                                                                                                        |
| Instant provisioning SaaS app with free credit on trial accounts | Low-risk destinations only in selected countries | Anonymous trial signups leads to abuse. Fraud reduced when entering credit card or Trial requires talking to Sales person | Never enable high-risk permissions. Consider disabling low-risk in countries known for toll-fraud such as Latvia, Somalia, Lithuania, Guinea, Gambia,Maldives, Estonia, Zimbabwe, Tunisia |

Since Voice Dialing Geo Permissions are per subaccount, we recommend that you create a new [subaccount](/docs/iam/api/subaccounts) for each customer. As a customer advances through the trust-value continuum, you apply the most applicable permissions. When a subaccount is created, it inherits Geo Permissions from the Master Project. In the Console, you can select to disable inheritance, and the permissions in the Project account will be copied to the subaccount. Then you can apply the specific permissions appropriate for the subaccount.\
See below for the top-10 countries with the highest amount of toll-fraud.

## How do I know if my calls are being blocked by Geo Permissions?

Open the debugger in [Twilio Console](https://1console.twilio.com/go?to=/account/__account__/us1/logs/debugger/errors) or the [legacy Console](https://www.twilio.com/console/runtime/debugger?query=13227+%26+21215+%26+32205\&quickDate=720) and search for the warnings [21215](/docs/api/errors/21215), [32205](/docs/api/errors/32205), [13227](/docs/api/errors/13227), which correspond to the 3 different types of voice calls that can be blocked by Geo Permissions.

## How do I detect unusual usage in my project?

It's important to continuously monitor your usage for any unwanted abuse, particularly the usage in any subaccounts. [Usage triggers](/docs/usage/api/usage-trigger) can be used to monitor volume of calls or minutes each day. Examples of anomalous usage is 5 times more usage on a weekday compared to average usage over the last 3 weeks, or a spike of usage on a weekend or holiday when you don't expect business.

## What do I do if I notice irregular activity in my project?

If you notice any irregular activity on your project immediately reach out to our [support team](https://help.twilio.com/hc/en-us?_ga=2.190762537.32466491.1695409246-274200866.1686000451&_gl=1*upo3oz*_ga*Mjc0MjAwODY2LjE2ODYwMDA0NTE.*_ga_RRP8K4M4F3*MTY5NTQxNTQ1MS4xMzUuMS4xNjk1NDE2MTQ1LjAuMC4w), as well as your Twilio account manager. You can also suspend a sub-account in the Console or via the [REST API](/docs/iam/api/subaccounts). When an account is suspended it cannot make voice calls, send SMS, etc. Twilio can suspend all activity on a project or sub-account, or block a certain prefix while an investigation ensues. It is better to be safe and temporarily out of service, than risk high charges that can be excess of $100,000. Twilio's customers are responsible for all usage on their accounts.

## Limitations

Twilio Trial accounts can make calls to 200+ countries and territories worldwide. Trial accounts are limited to calling low-risk destinations only. Trial accounts expire after 30 days. For full details, see [Twilio trial account](/docs/usage/trials).

## The highest-risk countries for toll-fraud in world?

The following countries are the destinations leading to the largest amount of revenue loss from toll-fraud and are also the countries advertising the largest number of international premium rate numbers used for toll-fraud. There is risk associated with calling low-risk destinations in these countries since number ranges can be re-allocated for fraud before Twilio can classify as high-risk.

1. Cuba
2. Latvia
3. Somalia
4. Lithuania
5. Guinea
6. Gambia
7. Maldives
8. Estonia
9. Zimbabwe
10. Tunisia
