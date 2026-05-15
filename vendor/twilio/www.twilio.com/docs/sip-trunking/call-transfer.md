# Call Transfer via SIP REFER

Call transfer enables you to move an active call from one endpoint to another. Twilio's [Elastic SIP Trunking](https://www.twilio.com/en-us/sip-trunking) product supports "blind" call transfers. This means you're now able to request a call be transferred by sending Twilio a SIP REFER message from your SIP communications infrastructure. Twilio will serve as the pivot-point and handle the call redirect thereby allowing you to free up resources in your IP communications infrastructure that are no longer needed.

Call transfers are enabled on a per-[Trunk](/docs/sip-trunking#configure-trunks) basis, this enables transfers to any SIP destination. Optionally, you may also enable call Transfers to the PSTN.

You can configure call transfers in Twilio Console or with the [Trunk resource API](/docs/sip-trunking/api/trunk-resource).

## Console

1. In Twilio Console, go to **Products & services** > **Elastic SIP Trunking** > **Manage** > **[Trunks](https://1console.twilio.com/go?to=/account/__account__/us1/sip-trunking/manage/trunks)**.
2. Select an existing Elastic SIP Trunk or create a new one.
3. Under **General settings**, enable **Call Transfers**.
4. Optional: Enable call transfers to the PSTN. You may not want to allow calls to be transferred to the PSTN given the associated billing implications of such a transfer.

Place a call on your Elastic SIP Trunk. Once established, initiate a call transfer from your phone. Twilio receives the request and transfers the call. To confirm the transfer worked as requested and see all relevant call details, go to **Products & services** > **Elastic SIP Trunking** > **Logs** > **[Calls](https://1console.twilio.com/go?to=/account/__account__/us1/sip-trunking/logs/calls)** in Console.

## Legacy Console

Log into the [legacy Twilio Console](https://console.twilio.com/us1/develop/sip-trunking/manage/trunks?frameUrl=%2Fconsole%2Fsip-trunking%2Ftrunks%3Fx-target-region%3Dus1), and navigate to an existing Elastic SIP Trunk (or create a new Elastic SIP Trunk):

1. Enable Call Transfers on that Trunk in the General Settings.
2. Optional: Enable call transfers to the PSTN on your Trunk. You may not want to allow calls to be transferred to the PSTN given the associated billing implications of such a transfer.

Place a call on your Elastic SIP Trunk. Once established, initiate a call transfer from your phone. Twilio receives the request and transfers the call. Check your Call Log in the legacy Console to confirm the transfer worked as requested and to see all relevant call details.

## **Call Transfer call flow**

### Call Transfer to another SIP endpoint

Let's start with an active Elastic SIP Trunking Call established from your PBX/SBC via Twilio to the PSTN.

![Diagram showing media path from PBX/SBC to PSTN via Elastic SIP Trunking.](https://docs-resources.prod.twilio.com/2039931a6c230d2cad58758d2155e2436a0e07b8e0f2c40c5f3b5e7ece253710.png)

The players are:

* Transferor (your PBX/SBC) - The party initiating the transfer of the Transferee to the Transfer-target.
* Transferee (Twilio/PSTN) - The party being transferred to the Transfer-target.
* Transfer-target (your PBX/SBC) - The new party being introduced to the Transferee.

![SIP REFER call flow diagram showing media path changes between transfer-target, transferor, and transferee.](https://docs-resources.prod.twilio.com/147f021a230ce0b9f30828e87841094b276155eca9bdf2f4cdd4af900e63392c.png)

Everything kicks off with the SIP REFER message from your PBX/SBC towards Twilio. Within the SIP REFER is a Refer-to header (designating a new SIP endpoint as the Transfer-target). Upon receiving the SIP REFER, Twilio returns a 202 Accepted response to your PBX/SBC. This informs you that Twilio is willing to carry out the transfer.

The original call is placed on hold (not shown in the call flow).

The SIP REFER creates a quasi-subscription between the Transferor (your PBX/SBC) and Twilio. Even though there wasn't a SIP SUBSCRIBE message sent, for the duration of the transfer, Twilio will act as if such a subscription exists.

Twilio sends a SIP INVITE to the new SIP endpoint which processes the SIP INVITE as a normal, incoming call. At this time, Twilio will send SIP NOTIFY messages to inform the Transferor of the status (100 Trying, `200 OK`) of the new call from Twilio to the new SIP endpoint.

Once the new call is answered, the Transferor will terminate the existing, held call to the original SIP endpoint.

**Note**: Early media with Call Transfers is not supported.

### Set CallerID for call transfer

You can set the caller ID for call transfer use cases in Twilio Console. In Twilio Console, go to **Products & services** > **Elastic SIP Trunking** > **Manage** > **[Trunks](https://1console.twilio.com/go?to=/account/__account__/us1/sip-trunking/manage/trunks)** and select a Trunk. You can also use the [legacy Console](https://console.twilio.com/us1/develop/sip-trunking/manage/trunks?frameUrl=%2Fconsole%2Fsip-trunking%2Ftrunks%3Fx-target-region%3Dus1). In the **General** settings, find **Call Transfer (SIP Refer)** and the **Caller ID for Transfer Target** field. The default value is `Transferee`; you can change it to `Transferor` based on your use case. You can also configure this setting using the [API](/docs/sip-trunking/api/trunk-resource#create-a-trunk-resource).

### Call Transfer to the PSTN

In order to transfer a call to the PSTN you must include your Trunking Termination Domain for example `sip:+14152908007@{my-trunk}.pstn.twilio.com` or alternatively use a Tel-URI for example `tel:+14152909007` in the Refer-To header.

Call Transfers to Emergency Services (911/933) are not supported.

## **Call Logs**

To view your Elastic SIP Trunking call logs in Twilio Console, go to **Products & services** > **Elastic SIP Trunking** > **Logs** > **[Calls](https://1console.twilio.com/go?to=/account/__account__/us1/sip-trunking/logs/calls)**. You can also open the [legacy Console call logs](https://www.twilio.com/console/sip-trunking/logs/calls). The Original Call has a Child Call that represents the new call established as a result of the requested Call Transfer.

## **Pricing**

Initiating a Call Transfer via your Elastic SIP Trunk is free, however you'll continue to be responsible for the per-minute Trunking charges to the referred-to destination on your account.

Please refer to the following tables to understand the details around Billing and Call Logs:

### Trunking Termination Billing/Logs with Call Transfers

| **Transfer Scenario**                                                 | **Parent Call Billing**                                   | **Parent Call Log** | **Child Call Billing**                                                                                                         | **Child Call Log** |
| --------------------------------------------------------------------- | --------------------------------------------------------- | ------------------- | ------------------------------------------------------------------------------------------------------------------------------ | ------------------ |
| Trunking Termination (from:A to:B)<br /><br />Transfer to SIP (to:C)  | Trunking Termination (from:A to:B) x Parent call duration | from:A to:B         | Trunking Termination (from:C to:B) x Child call duration                                                                       | from:B to:C        |
| Trunking Termination (from:A to:B)<br /><br />Transfer to PSTN (to:C) | Trunking Termination (from:A to:B) x Parent call duration | from:A to:B         | Trunking Termination (from:A to:B) x Child call duration +<br /><br />Trunking Termination (from:A to:C) x Child call duration | from:B to:C        |

### Trunking Origination Billing/Logs with Call Transfers

| **Transfer Scenario**                                                        | **Parent Call Billing**                                   | **Parent Call Log** | **Child Call Billing**                                                                                                          | **Child Call Log** |
| ---------------------------------------------------------------------------- | --------------------------------------------------------- | ------------------- | ------------------------------------------------------------------------------------------------------------------------------- | ------------------ |
| Trunking Origination (from:A to:B)<br /><br /> Transfer to Public SIP (to:C) | Trunking Origination (from:A to:B) x Parent call duration | from:A to:B         | Trunking Origination (from:A to:C) x Child call duration                                                                        | from:A to:C        |
| Trunking Origination (from:A to:B)<br /><br />Transfer to PSTN (to:C)        | Trunking Origination (from:A to:B) x Parent call duration | from:A to:B         | Trunking Origination (from:A to:B) x Child call duration +<br /><br /> Trunking Termination (from:B to:C) x Child call duration | from:A to:C        |
