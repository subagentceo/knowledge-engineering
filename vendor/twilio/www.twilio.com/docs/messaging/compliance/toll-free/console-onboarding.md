# Toll-free verification console onboarding guide

Twilio toll-free numbers can't send SMS messages to the United States and Canada until you've completed toll-free verification and Twilio approved your verification. You can submit your toll-free phone number for messaging verification directly from the Twilio Console and review the verification status for any of the toll-free numbers in your Twilio Account.

[See this support article](https://help.twilio.com/hc/en-us/articles/5377174717595-Toll-Free-Message-Verification-for-US-Canada) to learn more about toll-free verification requirements.

> \[!NOTE]
>
> If you're a **527 political organization** and you're registering for political election campaigns, you must obtain a Campaign Verify token before submitting toll-free verification through the Console. The Console workflow will prompt you to provide this token during the verification process. Read the [Campaign Verify section](/docs/messaging/compliance/toll-free/compliance-embeddable-onboarding#campaign-verify-for-political-messaging) for details.

## Prerequisites

To complete toll-free verification, you need a paid Twilio Account (not in trial). See the [Upgrade your account](/docs/usage/trials#upgrade-your-account) documentation for more information about upgrading your account.

## Purchase a Twilio toll-free number

> \[!WARNING]
>
> Many countries require Regulatory Compliance information for Phone Number ownership. Requests to provision phone numbers with these regulations will be required to select or add the required documentation after clicking Buy in Console. To see which countries and phone number types are affected by these requirements, see our [Phone Number Regulations](https://www.twilio.com/en-us/guidelines/regulatory) site.

To purchase a toll-free number:

## Twilio console

> \[!WARNING]
>
> Before purchasing a toll-free number, you must set up either a Primary Compliance Profile or Secondary Compliance Profile. To learn more about compliance profiles, see the [Trust Hub](/docs/trust-hub/profiles) documentation.

1. Sign in to the Console, navigate to **Products & Services > Numbers & Senders** and click the **Phone Numbers** tab.
2. Click **Set up a new phone number**.
3. Complete the fields on the **Basic information** page. *You must select that you're a **Business / Nonprofit / Sole Proprietor** to see toll-free numbers.*
4. Click **Next**.
5. Select and buy a phone number on the **Select number** page.
   1. (Optional) Apply filters to limit results and click **Search**.
   2. Click **Select** next to the number, then click **Next**.
   3. On the **Review and buy number** page, review your selection and click **Purchase**.

After your phone number has been successfully provisioned, Twilio charges your account for the full monthly price of the phone number.

## Legacy console

1. Go to the [Buy a Number page in the legacy Console](https://www.twilio.com/console/phone-numbers/search).
2. Click **Show Advanced Search**.
3. Enter the criteria for the phone number you need, and then click **Search**.

* **Country:** Select the country you want from the menu.
* **Number** (Optional): Enter any prefix and number strings you want to start the phone number.
* **Capabilities**: Select your service needs for this number.
* **Type**: Select Toll-Free.
* **Address Requirement**: Select the address requirement options you need.

4. Twilio displays some phone numbers that meet your search criteria. Click **Buy** to purchase a phone number for your current account or sub-account.

After your phone number has been successfully provisioned, Twilio charges your account for the full monthly price of the phone number.

## Submit information for verification

To submit your information for verification:

## Twilio console

1. Navigate to **Numbers & senders** and select **Numbers & senders**.
2. On the **Phone Numbers** tab, select the phone number you purchased.
3. Complete steps under **Finish setting up your number**, which might include:
   * Messaging configuration:
     * (**US numbers only**) Compliance steps for [A2P 10DLC](/docs/messaging/compliance/a2p-10dlc), [toll-free verification](https://help.twilio.com/articles/5377174717595-Toll-Free-Message-Verification-for-US-Canada), or Regulatory Compliance.
       Government regulations require compliance profile and registration approval before you can send messages to recipients in some countries. For tips and examples to complete A2P 10DLC registration, see step 3a in the [A2P 10DLC registration
       application quickstart](/docs/messaging/compliance/a2p-10dlc/quickstart#apply-for-a2p-10dlc-registration). You can also finish this configuration later on the [Numbers and Senders](/docs/numbers-and-senders) page.
     * [Messaging Service](/docs/messaging/services/) setup to simplify high-volume message sending. Twilio requires a Messaging Service for phone numbers subject
       to A2P 10DLC. To use some features, such as [Sticky Sender](/docs/glossary/what-is-a-sticky-sender)
       and [Geomatch](https://help.twilio.com/articles/223181268-What-is-Geomatch-and-how-does-it-work-), you must set up a Messaging Service.
   * Voice configuration:
     * *Availability of the following features varies by country, check the linked documentation for details*.
     * [SHAKEN/STIR](/docs/voice/trusted-calling-with-shakenstir/) registration to help boost your call answer rates.
     * [Voice Integrity](/docs/voice/spam-monitoring-with-voiceintegrity/) registration to ensure your numbers aren't mislabeled as spam.
     * [Branded Calling](/docs/voice/branded-calling) registration to brand your outbound calls with your business name, call reason, and logo.
     * [CNAM](/docs/voice/brand-your-calls-using-cnam/) registration
       to help boost your call pickup rates by displaying your business name on the recipient's caller ID.

## Legacy console

> \[!WARNING]
>
> If you are an ISV, make sure that your [Primary Business Profile](/docs/trust-hub#what-is-a-business-profile) is approved before submitting toll-free verification requests for your secondary customers.

The specific verification process might differ depending on your existing [Customer Profiles](/docs/trust-hub/trusthub-rest-api/console-create-a-primary-customer-profile).

1. Go to the [Active Numbers page in the Console](https://twilio.com/console/phone-numbers). Any unverified toll-free number you own shows a warning with a link to the verification section in the Console. To get to the verification page for a toll-free number:
2. Click the phone number.
3. Go to the **Regulatory Information** tab.
4. Click **Verify this toll free number**.

If you have an existing Customer Profile:

1. Select a profile, review your details, and click **Continue to messaging use case**.
2. Enter information about your business case, agree to the terms of service, then click **Send information for verification**.

If you need to create a Customer Profile:

1. Enter your business and contact information, then click **Continue to business location**.
2. Enter an address for your business, then click **Continue to messaging use case**.
3. Enter information about your busines case, agree to the terms of service, then click **Send information for verification**.

## Review verification status

To review the verification status of a toll-free number in the Twilio console, go to [Trust Hub > Trust Hub](https://1console.twilio.com/go?to=/account/__account__/us1/trusthub/compliance-registrations) and select the **Registrations** tab.

To review the verification status of a toll-free number in the legacy console, go to [Phone Numbers > Manage > Active numbers](https://console.twilio.com/us1/develop/phone-numbers/manage/incoming). Once there, select the toll-free phone number that you would like to review and click **Regulatory Information**.

Below are the possible verification statuses for a toll-free number:

| Submission Status        | What's happening                                                                                                                                                                                                                                                                                                                                                                                  | Toll-Free phone number traffic                                                                                                                                                                                         |
| ------------------------ | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Not verified             | Twilio's systems are processing the request. Verification Ops hasn't yet received it for review.                                                                                                                                                                                                                                                                                                  | The toll-free phone number is `Restricted`.                                                                                                                                                                            |
| Verification in progress | Verification Ops have accepted the submission and it's in their queue.                                                                                                                                                                                                                                                                                                                            | The toll-free phone number is `Pending`.                                                                                                                                                                               |
| Approved                 | Verification Ops approved the submission.                                                                                                                                                                                                                                                                                                                                                         | The toll-free phone number is `Verified`.                                                                                                                                                                              |
| Rejected                 | Verification Ops rejected the submission. If the submission is re-submittable, you have seven days to resubmit it for priority review. After seven days, the toll-free phone number remains `Restricted` until you resubmit verification. See [Why Was My Toll-Free Verification Rejected?](https://help.twilio.com/articles/9321443984155) to learn more about rejection reasons and what to do. | If re-submittable, the toll-free phone number is `Pending`. If not re-submittable, the toll-free phone number is `Blocked`. If seven days have passed since the rejection, the toll-free phone number is `Restricted`. |

See [Toll-Free Message Verification for US/Canada](https://help.twilio.com/hc/en-us/articles/5377174717595-Toll-Free-Message-Verification-for-US-Canada#h_01GTCNPTVZFNCK8FFNYRDD2TZR) for more information.

> \[!WARNING]
>
> If you are an ISV submitting verification requests on behalf of multiple customers, or if you are submitting verification requests for multiple toll-free numbers on your own behalf, consider using Twilio [Event Streams](/docs/events) to subscribe to events related to your toll-free verification requests. See [the Toll-Free Verification API reference](/docs/messaging/compliance/toll-free/api-onboarding#webhooks--event-streams) for more information. Subscribing to Event Streams doesn't require API calls.

## Edit and resubmit a rejected toll-free verification

You can submit a rejected toll-free verification if it's eligible for resubmission.

To learn about which rejections are ineligible for resubmission, refer to the following Help Center articles:

* [Forbidden message categories](https://help.twilio.com/articles/360045004974-Forbidden-Message-Categories-in-the-US-and-Canada-Short-Code-Toll-Free-and-Long-Code)
* [Toll-Free best practices](https://help.twilio.com/articles/360038172934-Information-and-best-practices-for-using-Toll-Free-SMS-and-MMS-in-the-US-and-Canada)

## Twilio console

1. Go to [Trust Hub > Trust Hub](https://1console.twilio.com/go?to=/account/__account__/us1/trusthub/compliance-registrations) and select the **Registrations** tab.
2. Select **Edit & resubmit** for the rejected toll-free verification you'd like to update.
3. Complete the **Registration details** wizard.

## Legacy console

To see the rejection reason for a number and to see if you can resubmit it:

1. Click the number in the [Active numbers](https://console.twilio.com/us1/develop/phone-numbers/manage/incoming) section of the Console, then click the **Regulatory Information** tab.
2. If the number is eligible for resubmission, you'll see a **Make corrections and resubmit** button, with a message that tells you the number of days you have left to resubmit (for example, "6 days left"). If you resubmit your verification request within this window, your request will go into a priority queue for review. You can still submit outside of this window, but the resubmission will go into the same queue as new toll-free verification requests.
3. Click the **Make corrections and resubmit** button to see the reason Twilio rejected your verification and correct the information. At the bottom of the window, you must agree to the Terms of Service and then you can click **Send Information for verification**.

If the number isn't eligible for resubmission, you'll see a button that says **Review rejection details**. See [Why Was My Toll-Free Verification Rejected?](https://help.twilio.com/articles/9321443984155) to learn more about rejection reasons and how to fix them.

## Delete a toll-free verification

You can delete your toll-free verification requests directly from the Console if it's in the `Pending`, `Approved`, or `Rejected` statuses. Deleting a toll-free messaging verification request doesn't release the toll-free number from your Twilio Account. However, releasing the toll-free number from your Twilio Account will delete the toll-free messaging verification.

To delete the verification in the Twilio console, go to [Trust Hub > Trust Hub](https://1console.twilio.com/go?to=/account/__account__/us1/trusthub/compliance-registrations) and select the **Registrations** tab. Select the More information icon for the registration you'd like to delete, then click **Delete**. On the dialog, click **Delete** to confirm that you'd like Twilio to delete your brand registration.

To delete the verification in the legacy console, go to [Phone Numbers > Manage > Active numbers](https://console.twilio.com/us1/develop/phone-numbers/manage/incoming) in the Console and select the toll-free phone number. Then, go to the **Regulatory Information** tab and click **Delete verification**. Confirm that you want to delete the toll-free verification. This is a destructive action and it can't be undone.

> \[!NOTE]
>
> Deleting and resubmitting a verification request puts the new verification request in the back of the review queue. If a previous submission was eligible for resubmission, use the resubmit flow rather than deleting and recreating a verification request.

See below to learn more about when you can and can't use this delete feature:

| Verification status       | Action                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                   |
| ------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Restricted (Not verified) | Deletion isn't available.                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                |
| Verification in progress  | Delete this verification request to stop this verification and submit a new one. Do this if you need to correct information about the messaging use case, opt-in flow, or business information such as a website URL. Other issues should not impede verification and do not require deletion and resubmission.                                                                                                                                                                                                                                          |
| Approved                  | Delete an approved verification request if you want to change the messaging use case and/or opt-in flow for that verified toll-free number. Then resubmit the verification for the number with the new information. No deletion and resubmission is required if you're only making minor changes to your use of the toll-free number for messaging, such as the message content.                                                                                                                                                                         |
| Rejected                  | If Twilio rejected a previous submission with the note "not eligible for resubmission", deleting that verification request is the **only** way to resubmit the same toll-free number for verification. Only do so if you have a clear understanding of what you need to correct (for example, a mistyped or incorrect website URL, or an incomplete use case or opt-in description). See [Why Was My Toll-Free Verification Rejected?](https://help.twilio.com/articles/9321443984155) for more information about rejection reasons and how to fix them. |
