# Emergency Calling for SIP Trunking

Twilio's Emergency Calling for SIP Trunking feature enables emergency call routing to Public Safety Answering Points (PSAPs) in the US, Canada, the UK, Australia, Ireland, France, Germany, and Austria.

In the US and CA, Twilio supports both Enhanced 911 (E911) as well as Basic 911.

**E911** calls are routed to the PSAP serving the address associated with the phone number that made the call. The call automatically includes the caller's Twilio phone number and corresponding address information to the 911 dispatcher answering the call.

**Basic 911** calls are routed to the designated PSAP serving the address associated with the phone number that made the call. With Basic 911, the dispatcher answering the phone will not have access to the customer's phone number or address unless the caller provides this information verbally during the call.

Certain Twilio phone numbers will not have access to either Basic 911 or E911 services. In that case, 911 calls will be routed to a national emergency call center. A trained agent at the emergency call center will ask for the caller's name, phone number, and location. They will then transfer the caller to the appropriate local PSAP or otherwise determine the best way to provide emergency services.

> \[!NOTE]
>
> In the US and Canada, when a 911 call is placed from a phone number without a registered emergency address, Twilio will charge an emergency calling fee per 911 call to deliver it to a national emergency location center. To avoid this charge, associate a validated emergency address with your phone numbers. Associating an emergency address with a phone number incurs a monthly fee. See the [pricing page](https://www.twilio.com/en-us/sip-trunking/pricing/us) for details.

In the UK, Twilio supports both **999** and **112** emergency numbers. If the phone number has a registered emergency address, emergency calls are routed to the PSAP serving the address associated with the phone number that made the call. When an emergency call is made, the corresponding address information and caller's Twilio phone number are automatically provided to the dispatcher answering the call.

You can configure Emergency Addresses in the Console as outlined below, or via [the API](/docs/sip-trunking/api/emergency-calling).

## Before calling emergency services

Before someone calls emergency services from your Twilio SIP Trunk, be sure that:

* The caller is dialing a valid emergency number from the *same country as the `From` phone number* (identified in the SIP `From:` header).
* You have configured your Trunk's Origination Setting appropriately. This is important in case the emergency responder needs to call you back.

You configure the emergency address under the [**Numbers**](/docs/sip-trunking#numbers) tab of your Elastic SIP Trunk, or on the number's configuration page in the Console's **Phone Numbers** section.

## Associate an Address with your Twilio Phone Number \[#configure-emergencycalling]

At the [**Numbers**](/docs/sip-trunking#numbers) tab of your Trunk, or on the phone number's configuration page, click **Add emergency address** for the number you want to register an emergency address.

If this is your first time using emergency calling, you will need to add an address to your account. This address represents the physical address used to direct police, fire, medical, and other emergency response resources. In the US and CA, the address must be recognized by the Master Street Address Guide (MSAG) database. Each address created may be used for any phone number associated with your Trunk(s).

> \[!WARNING]
>
> In the US, the MSAG address will often differ from the equivalent US Postal Service address because the MSAG uses the community name (township, city, county) from where the closest responding PSAP will come.

Input your address and then click **Save & Continue**. If your address can't be validated, you will be asked to select one of a number of suggested alternatives. The address you provide will then be associated with the Twilio phone number(s) you selected. If you need any assistance with address validation, please contact our [support team](https://help.twilio.com).

## Change a Twilio phone number's Emergency Address to a new address \[#change-address]

* Disassociate the Emergency Address from your Twilio phone number.
* Check the number's **Emergency Address Status** to verify that it is **unregistered**.
* Associate a new Emergency Address with the number.
* Check the number's **Emergency Address Status** to verify that it is **registered**.

## Modify a Twilio phone number's Emergency Address \[#modify-address]

* Disassociate the Emergency Address from your Twilio number. This must be done on all numbers using this address.
* Check the number's **Emergency Address Status** to verify that it is **unregistered**.
* Modify the Emergency Address.
* Re-associate the Emergency Address with the number.
* Check the number's **Emergency Address Status** to verify that it is **registered**.

## Test Emergency Calling in the US and CA \[#test-emergencycalling]

If you want to check that your communications infrastructure was properly configured for Emergency Calling, you can make a test call by dialling **933**. You'll be connected to an automated system that will read back the Twilio phone number that you're calling from, along with the address associated with that number.

> \[!WARNING]
>
> You may need to add **933** to your dial plan in order for the call to be made.

## Placing a live emergency call

* When placing an emergency call, the `Request-URI` must be formatted as follows: `sip:911@{your-trunk}.pstn.twilio.com`, or `sip:933@{your-trunk}.pstn.twilio.com` for a test emergency call.
* Ensure that your equipment's dial plan is set up to send outbound **112**, **999**, **911**, and/or **933** calls to Twilio.

You may place a live emergency test call to verify the information that the emergency responder receives. *This must be done sparingly*. Some localities require you to schedule emergency test calls in advance and will charge penalties otherwise. You should check with your local authorities before placing any unscheduled emergency call tests.

To make a live emergency test call, please follow this script:

* *Hello, this is not an emergency call. This is a test. Do you have a moment to verify my emergency information or can we schedule a later time to do so?*
* *Can you verify the address that you received for my call?* — confirm that this matches your intended emergency address.
* *Can you verify the telephone number you received for my call?* — confirm that this matches the Twilio Number that you called from.
* *Thank you for your time.*

If for any reason there is an address mismatch, please file a support ticket.

## Important configuration steps

* Any emergency call must come with a valid `From:` header. This means it must:
  1. Use an E.164-formatted SIP URI.
  2. Be a Twilio number that is enabled for emergency calling. More specifically, all trunk termination traffic must include the following header:
     `From: sip:+1NPANXXYYYY@your-domain.com` where `1NPANXXYYYY` has to be a Twilio phone number that is associated with the Trunk used for this call.
* The emergency telephone number has to be a valid emergency number from the same country as the From phone number.
* Configure your Elastic SIP Trunk's Origination settings appropriately so it is able to receive calls from the PSTN into your communications infrastructure. This is important in case your call gets disconnected and the emergency responder needs to call you back. Find out how you can [test your Origination settings](/docs/sip-trunking/trunk-verification#verify-origination).
* When placing an emergency call, the `Request-URI` must be formatted as follows: `sip:911@{your-trunk}.pstn.twilio.com`, or `sip:933@{your-trunk}.pstn.twilio.com` for an emergency test call.
