# Calls per Second (CPS) — Trunking Termination

## Overview

Trunking Termination Calls per Second (CPS) refers to how many new SIP Trunking call setups are allowed in a second for Trunking Termination (outgoing traffic from your communications infrastructure to the PSTN). Twilio, by default, provides the ability for you to place 1 CPS per Trunk per Region (see [limits)](/docs/sip-trunking/scale-and-limits). Optionally, you may increase your CPS settings per Region for a monthly fee (see [pricing](https://www.twilio.com/sip-trunking/pricing#calls-per-second)).

In order to receive increased CPS, your traffic profile shall comply with the following guidelines:

* Average call duration must be greater than 30 seconds
* No more than 10% of your calls should have a call duration of less than or equal to 12 seconds
* ASR (Answer-Seizure rate) must be greater than 70%

## CPS options for Trunking Termination

There are two options for increasing Termination CPS for SIP Trunking:

* [Trunk Level CPS](/docs/sip-trunking/cps-trunk-termination#trunk-level-cps)
* [Parent account CPS](/docs/sip-trunking/cps-trunk-termination#pooled-cps)

### Trunk Level CPS

You can change your Calls Per Second (CPS) setting on each trunk in [Twilio Console](https://1console.twilio.com/go?to=/account/__account__/us1/sip-trunking/manage/trunks) or the [legacy Console](https://console.twilio.com/us1/develop/sip-trunking/manage/trunks). Select the trunk you want to edit, then go to **Termination** settings and set the per-trunk CPS to a number between 1 and 5.

It is recommended that you provision a trunk for each region with the specific CPS required.

> \[!NOTE]
>
> Increasing CPS values may occur anytime during the month, and you'll be shown prorated charges. Changes will happen immediately upon acknowledgement.

> \[!WARNING]
>
> Decreasing CPS values can only be made for the 1st day of the month. The decrease occurs automatically on the 1st day of the month, and therefore, should be scheduled in advance to avoid any delay in the decrease (i.e. if you wait until the 1st of the month, it's possible the change will not take effect until the 1st day of the following month).

> \[!WARNING]
>
> If you would like to change your CPS value greater than 5, please [reach out to our sales team](https://www.twilio.com/en-us/help/sales).

### Pooled CPS \[#pooled-cps]

Provision your Parent Account with the CPS you require for each Region. Pay per Parent Account, per Region. The CPS settings are a pooled resource used by any Trunk in the given account or corresponding sub-accounts. You can also enforce Trunk-level CPS settings in [Twilio Console](https://1console.twilio.com/go?to=/account/__account__/us1/sip-trunking/manage/trunks) or the [legacy Console](https://console.twilio.com/us1/develop/sip-trunking/manage/trunks) when Pooled CPS is enabled. This lets you over-provision CPS at the Trunk level, and you'll only be billed for the Parent Account CPS settings.

Pooled CPS is best fit for your needs if you have several trunks across multiple sub-accounts that need increased CPS, but you aren't sure what level you'll need on each of those trunks.

There are two "checkpoints" used to determine when calls will be allowed or rejected.

`(1)` Actual Calls on each Trunk vs. Trunk CPS Limits: Do actual calls on a specific Trunk exceed the CPS settings set on that Trunk for a given Region?

* `Yes` - Calls start to be rejected based on the Trunk CPS settings
* `No` - Go to next rule

`(2)` Total Actual Calls across all Trunks vs. Pooled CPS Limits: Do total actual calls across all Trunks exceed the Pooled CPS settings in a given Region?

* `Yes` - Calls start to be rejected based on the Parent account CPS settings
* `No` - All calls will go through

#### Pooled CPS example \[#pooled-cps-example]

Here's an example of how this works:

Parent Account CPS setting:

\*North America - Oregon (US2): 25 CPS

|                                  | Trunk 1                                                    | Trunk 2            | Trunk 3            | Totals                                                  |
| :------------------------------- | :--------------------------------------------------------- | :----------------- | :----------------- | :------------------------------------------------------ |
| Provisioned                      | 20 CPS                                                     | 25 CPS             | 30 CPS             | 75 provisioned across all Trunks (over-provisioned)     |
| Actual Calls                     | 30 CPS                                                     | 24 CPS             | 30 CPS             | 84 actual Terminating Calls attempted across all Trunks |
| `Rule 1 - Trunk Limits`          | Calls capped at 20 CPS                                     | All 24 CPS allowed | All 30 CPS allowed | 74 actual CPS allowed based on Trunk CPS settings       |
| `Rule 2 - Parent account Limits` | Cap calls at 25 CPS (calls from any trunk may be rejected) |                    |                    |                                                         |

## Regional CPS

Twilio has introduced ['Twilio Regions'](/docs/global-infrastructure) for isolating the data storage and processing in data centers located in specific geographic locations. For customers who have created a [`trunk`](/docs/sip-trunking/api/trunk-resource)in a Region other than Ashburn, VA (formerly referenced as us1), you will be required to use Parent account CPS to increase the CPS settings on your trunk. If you have [`self-served`](https://www.twilio.com/en-us/changelog/upgrade-your-elastic-sip-trunking-calls-second-cps-demand) an increased CPS value or spoken with Sales for CPS values greater than 5, you may need to switch from your existing Trunk Level CPS setting to the Pooled CPS model in order to service your trunks hosted in Twilio regions outside of Ashburn. Please talk to [`Sales`](https://www.twilio.com/en-us/help/sales)if you are considering purchasing increased CPS for your Regional Twilio Elastic SIP Trunks.

### Debugger Alerts

Twilio will log a [`Debugger Alert record`](/user/account/monitor/alerts) when you're CPS limits are reached, our Debugger Alert will tell you which limit was hit; either the Trunk level or Parent account CPS level.

These debugger alerts are:

* [`32001`: SIP: Trunk CPS limit exceeded](/docs/api/errors/32001)
* [`32012`: Parent account pooled Trunking CPS limit exceeded](/docs/api/errors/32012)

These may be very useful to determine if you need to increase your CPS settings. You can configure [Alert Triggers](/user/account/monitor/triggers/alert) to fire based on your preferences on any [Alert error code](/docs/api/errors); optionally, you can also send a corresponding webhook or an email notification.

If you would like to modify your Parent Account or increase more than 5 CPS for Trunk Level or decrease Trunk Level CPS, please contact sales [here.](https://www.twilio.com/en-us/help/sales)
