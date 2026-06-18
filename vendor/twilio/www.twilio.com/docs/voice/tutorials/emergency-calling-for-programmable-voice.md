# Emergency Calling for Programmable Voice

> \[!NOTE]
>
> Currently only US, Canada and UK are enabled for emergency address registration. All other countries enabled for emergency calling only can place emergency calls without a registered address.

Twilio's Emergency Calling for Programmable Voice feature enables emergency call routing to Public Safety Answering Points (PSAPs) in the US, Canada, the UK, Australia, Ireland, France, Germany, Austria, Malaysia, Thailand, Philippines, New Zealand and Italy.

**US and CA Services**

In the US and CA, Twilio supports both Enhanced 911 (E911) as well as Basic 911.

* **E911** calls are routed to the PSAP serving the address associated with the phone number that made the call. The call automatically includes the caller's Twilio phone number and corresponding address information to the 911 dispatcher answering the call.
* **Basic 911** calls are routed to the designated PSAP serving the address associated with the phone number that made the call. With Basic 911, the dispatcher answering the phone will not have access to the customer's phone number or address unless the caller provides this information verbally during the call.

Certain Twilio phone numbers will not have access to either Basic 911 or E911 services. In that case, 911 calls will be routed to a national emergency call center where a trained agent at the emergency call center will ask for the caller's name, phone number, and location. They will then transfer the caller to the appropriate local PSAP or otherwise determine the best way to provide emergency services.

> \[!NOTE]
>
> In the US and Canada, when a 911 call is placed from a phone number without a registered emergency address, Twilio will charge an emergency calling fee per 911 call to deliver it to a national emergency location center. To avoid this charge, associate a validated emergency address with your phone numbers. Associating an emergency address with a phone number incurs a monthly fee. See the [pricing page](https://www.twilio.com/en-us/sip-trunking/pricing/us) for details.

**UK Services**

Twilio supports both **999** and **112** local emergency numbers. If the local phone number has a registered emergency address, emergency calls are routed to the PSAP serving the address associated with the phone number that made the call. When an emergency call is made, the corresponding address information and caller's Twilio phone number are automatically provided to the dispatcher answering the call.

## Before calling emergency services, you must ensure that

* You call a valid emergency number from the same country as the *From* phone number (identified as the `From` parameter or in the SIP `From:` header).
* You configure the phone number's webhook URL appropriately. This is important in case the emergency responder needs to call you back.
* **US, CA or UK:** You configure the emergency address under the number's configuration page in the Console's **Phone Numbers** section.

## Associate an address with your Twilio phone number \[#configure-emergencycalling]

**US, CA and UK Only**

You can configure emergency addresses [in the Twilio Console](https://help.twilio.com/articles/15337062865563-How-to-Associate-an-Emergency-Address-to-your-Twilio-Phone-Numbers-via-Twilio-Console) as outlined below or [using the API](/docs/sip-trunking/api/emergency-calling). Emergency address association isn't available in other countries enabled for emergency calling.

> \[!NOTE]
>
> **Exception:** For Italy numbers the emergency address is registered at the time the number is purchased. You will not see this emergency registration in console and the number will show as **not compatible for emergency address**.

If this is your first time using emergency calling, you will need to add an address to your account. This address represents the physical address used to direct police, fire, medical, and other emergency response resources. In the US and CA, the address must be recognized by the Master Street Address Guide (MSAG) database. Each address created may be used for any phone number that is valid for emergency calling.

* To ensure your emergency address is valid, you must add it using the **Add emergency address** option on the phone number's configuration page.

> \[!WARNING]
>
> In the US, the MSAG address often differs from the equivalent US Postal Service address because the MSAG uses the community name (township, city, or county) where the closest responding PSAP is located. To update your MSAG address, contact your local county office.

Input your address and then click **Save & Continue**. If your address can't be validated, you may be presented with a selection of suggested alternative addresses to choose. The address you provide will then be associated with the Twilio phone number(s) you selected. If you need any assistance with address validation, contact our [support team](https://help.twilio.com).

## Unregister a Twilio phone number's emergency address \[#unregister-address]

See [How to unregister an emergency address from a Twilio phone number](https://help.twilio.com/hc/en-us/articles/6020069097115-How-to-Unregister-an-Emergency-Address-from-a-Twilio-Phone-Number).

## Change a Twilio phone number's emergency address to a new address \[#change-address]

1. [Disassociate](https://help.twilio.com/hc/en-us/articles/6020069097115-How-to-Unregister-an-Emergency-Address-from-a-Twilio-Phone-Number) the emergency address from your Twilio phone number.
2. Check the number's **Emergency Address Status** to verify that it is **unregistered**.
3. Associate a new emergency address with the number.
4. Check the number's **Emergency Address Status** to verify that it is **registered**.

## Modify a Twilio phone number's emergency address \[#modify-address]

> \[!WARNING]
>
> Emergency address changes can take time to process with the emergency address registration validators.
>
> * US & Canada: Allow 30 minutes between disassociation and re-association.
> * UK: Allow up to 72 hours between disassociation and re-association.

1. [Disassociate](https://help.twilio.com/hc/en-us/articles/6020069097115-How-to-Unregister-an-Emergency-Address-from-a-Twilio-Phone-Number) the emergency address from your Twilio number. This must be done on all numbers using this address.
2. Check the number's **Emergency Address Status** to verify that it is **unregistered**.
3. Modify the emergency address.
4. Re-associate the emergency address with the number.
5. Check the number's **Emergency Address Status** to verify that it is **registered**.

## Test Emergency Calling in the US and CA \[#test-emergencycalling]

If you want to check that your communications infrastructure was properly configured for Emergency Calling, you can make a test call by dialling **933**. You'll be connected to an automated system that will read back the Twilio phone number that you're calling from, along with the address associated with that number.

> \[!WARNING]
>
> You may need to add **933** to your dial plan in order for the call to be made.

## Placing a live emergency call

* When placing an emergency call, the `To` parameter must be the emergency number `911`, `933` or `112`, or for SIP Interfaces the `Request-URI` must be formatted as follows: `sip:911@<CompanyName>.sip.us1.twilio.com`, or `sip:933@<CompanyName>.sip.us1.twilio.com` for a test emergency call.
* Ensure that your equipment's dial plan is set up to send outbound **112**, **999**, **911**, and/or **933** calls to Twilio.

You may place a live emergency test call to verify the information that the emergency responder receives. *This must be done sparingly*. Some localities require you to schedule emergency test calls in advance and will charge penalties otherwise. You should check with your local authorities before placing any unscheduled emergency call tests.

To make a live emergency test call, follow this script:

* *Hello, this is not an emergency call. This is a test. Do you have a moment to verify my emergency information or can we schedule a later time to do so?*
* *Can you verify the address that you received for my call?* — confirm that this matches your intended emergency address.
* *Can you verify the telephone number you received for my call?* — confirm that this matches the Twilio Number that you called from.
* *Thank you for your time.*

If for any reason there is an address mismatch, file a support ticket.

## Important configuration steps

* Any emergency call must come with a valid E.164-formated `From` number.
* The emergency telephone number has to be a valid emergency number from the same country as the `From` phone number.
* Configure your [phone number's webhook URL](/docs/voice/tutorials/how-to-respond-to-incoming-phone-calls) so it is able to receive calls from the PSTN into your communications infrastructure. This is important in case your call gets disconnected and the emergency responder needs to call you back.
