# Register WhatsApp senders using Self Sign-up

Learn how direct customers can register a WhatsApp sender using Self Sign-up in the Twilio Console.

A WhatsApp sender is a phone number associated with a [WhatsApp Business Account (WABA)](/docs/whatsapp/tutorial/whatsapp-business-account). When you register a WhatsApp sender, you can send and receive WhatsApp messages from your business or brand using the Twilio APIs.

**Note**: If you're an [Independent Software Vendor (ISV)](https://help.twilio.com/articles/4402930862747), you must join [Meta's Tech Provider program](/docs/whatsapp/isv/tech-provider-program), complete a [technical integration](/docs/whatsapp/isv/tech-provider-program/integration-guide), and onboard your customers through the program.

## Prerequisites

* **Create and upgrade your Twilio account.**
  [Sign up for your Twilio account](https://www.twilio.com/try-twilio) and upgrade it. To upgrade your account, in the Twilio Console, click **Upgrade** at the top of the page, or go to **Admin > Account billing** and click **Upgrade account**.
* **Make sure you have administrator access to your Meta Business Portfolio**.
  Check if your company already has a Meta Business Portfolio.
  * If your company already has a Meta Business Portfolio, request administrator access with full permissions. You need administrator access to create a WhatsApp Business Account (WABA) during the Self Sign-up process.
  * If your company doesn't have a Meta Business Portfolio or you can't get administrator access to an existing one, you can create one during the Self Sign-up process. After creating the Business Portfolio, you'll need to [complete Meta business verification](#complete-meta-business-verification) before you can move into production.

## Phone number requirements

You can use either a Twilio phone number or a non-Twilio phone number to register a WhatsApp sender.

* The phone number must meet the [WhatsApp compatibility requirements](https://help.twilio.com/articles/360026678054).
* The phone number must not already be registered with WhatsApp. Learn how to [check if a phone number is registered with WhatsApp](#i-want-to-check-if-a-phone-number-is-registered-with-whatsapp) and how to [use an already registered phone number](#i-want-to-use-an-already-registered-phone-number).
* If the phone number is non-Twilio, it must be able to receive SMS or voice calls.
  * If the phone number is registered with an Interactive Voice Response (IVR) system or a computer-operated phone system, you can't receive One-Time Passwords (OTPs).
  * If the phone number is only available for outbound messages or calls, you can't use it to register a WhatsApp sender because Meta can't deliver OTPs.

## Display name requirements

The WhatsApp sender display name must comply with [Meta's display name guidelines](https://www.facebook.com/business/help/757569725593362). Meta reviews the name after registration. If Meta rejects the name, the phone number is limited to 250 business-initiated messages per 24-hour period, and Meta might disconnect the sender.

## Start WhatsApp Self Sign-up

## Console

1. In the Twilio Console, go to **Messaging > Senders > WhatsApp Senders** or navigate to [WhatsApp Senders](https://1console.twilio.com/us1/develop/sms/senders/whatsapp-senders).
2. Click **Create new sender**.

## Legacy Console

1. In the Twilio Console, go to **Messaging > Senders > WhatsApp Senders** or navigate to [WhatsApp Senders](https://console.twilio.com/us1/develop/sms/senders/whatsapp-senders).
2. Click **Create new sender**.

The **New Sender** page opens.

## Select a phone number to register

Under **1. Select a phone number to register**, select a phone number and click **Continue**. You can choose either a Twilio phone number or your own phone number (Non-Twilio phone number).

## Link WhatsApp Business Account with your number

1. Under **1. Link WhatsApp Business Account with your number**, click **Continue with Facebook**.
   This opens a Self Sign-up pop-up window.
2. Complete the steps in the Self Sign-up pop-up window.
   * Keep both the Self Sign-up pop-up and Twilio Console windows open.
   * Don't share the pop-up window URL with anyone else. The registration will fail.
   * Complete all steps in the same browser so Meta and Twilio can exchange data properly.

The following sections describe the steps in the Self Sign-up pop-up window.

### Log in to Facebook

1. In the Self Sign-up pop-up window, log in to Facebook with your credentials. If you're already logged in, click **Continue as \[your name]**.
2. Review the permissions to allow Twilio to manage your WABA, then click **Get started**.

### Fill in your business information

1. Create a new Meta Business Portfolio or select an existing one.
   When you select a Meta Business Portfolio, its associated business information is pre-filled in the form.
2. Click **Next**.

### Create or select your WhatsApp Business Account

1. Create a new WABA or select an existing one.
   > \[!WARNING]
   >
   > Don't select a WABA that's been created outside of Twilio. If you already have an approved WhatsApp Sender with another provider, create a new WABA to use specifically with Twilio.
   * If you're registering your first WhatsApp sender, create a new WABA.
   * If you're registering an additional WhatsApp sender in the same Twilio account or subaccount, you must select the same WABA you used to register your first WhatsApp sender.
     * You can see the ID of the WABA that's connected to your Twilio account in the Twilio Console window.
     * Twilio requires all WhatsApp senders in an account to be within the same WABA and maintains a one-to-one relationship between a Twilio account and a WABA.
2. Select **Create a new WhatsApp Business profile**.
3. Select **Instruct Meta to automatically identify order and lead events**.
4. Click **Next**.

### Create a WhatsApp Business profile

1. Set the following fields:

   | Field                              | Customer-Facing | Description                                                                                                                                                                                                 |
   | ---------------------------------- | --------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
   | **WhatsApp Business account name** | No              | The name of your WABA. Pre-filled if you selected an existing WABA.                                                                                                                                         |
   | **WhatsApp Business display name** | Yes             | The display name that your customers see when they receive WhatsApp messages from your business. Must comply with [Meta's display name guidelines](https://www.facebook.com/business/help/757569725593362). |
   | **Category**                       | Yes             | The category of your business displayed in your profile. You can update the category later in the Twilio Console.                                                                                           |
2. Optionally, click **Show more options** to set the following fields:
   | Field                    | Customer-Facing | Description                                                 |
   | ------------------------ | --------------- | ----------------------------------------------------------- |
   | **Business description** | Yes             | The description of your business displayed in your profile. |
   | **Website**              | Yes             | The website of your business displayed in your profile.     |

### Add your WhatsApp phone number

Meta requires you to verify ownership of each phone number before it can send or receive WhatsApp messages. Meta verifies ownership through SMS or voice call OTPs.

The registration process depends on the phone number type (Twilio or non-Twilio) and capabilities (SMS or voice) to receive the OTP for verification.

| Phone number type | Capabilities | OTP verification code delivery                                                |
| ----------------- | ------------ | ----------------------------------------------------------------------------- |
| Twilio            | SMS          | Receive the OTP verification code in the Twilio Console                       |
|                   | Voice        | Configure the phone number to receive the OTP verification code through email |
| Non-Twilio        | SMS          | Receive the OTP verification code through SMS                                 |
|                   | Voice        | Receive the OTP verification code through voice call                          |

> \[!WARNING]
>
> Don't select **Use a display name only**. This option uses a free WhatsApp-provided number (555 business number) that doesn't require verification. Twilio doesn't support WhatsApp-provided numbers at this time.

## SMS: Twilio phone numbers

1. In the Twilio Console window, under **1. Link WhatsApp Business Account**, in the **2. Copy the phone number you want to register** section, click **Copy** next to the phone number.
2. In the Self Sign-up pop-up window, on the **Add your WhatsApp phone number** page, select **Add a new phone number** and paste the phone number you copied from the Twilio Console.
3. Select **Text message** as the verification method and click **Next**.
   The Twilio Console displays the verification code.
4. In the Twilio Console window, in **3. Verify the selected number with WhatsApp**, click **Copy** next to the verification code.
5. In the Self Sign-up pop-up window, paste the verification code you copied from the Twilio Console and click **Next**.

## Voice: Twilio phone numbers

1. In a new window or tab, configure the phone number so it can receive OTP verification codes via voice call.

   ## Console

   1. Open the [Active Numbers page](https://1console.twilio.com/us1/develop/phone-numbers/manage/incoming).
   2. Click your Twilio phone number.
   3. In the **Voice Configuration** section, in the **Configure with** row, select **Webhook, TwiML Bin, Function, Studio Flow, Proxy Service**.
   4. In the **A call comes in** row, select **Webhook** and set the **URL** to `https://twimlets.com/voicemail?Email=<YOUR_EMAIL_ADDRESS>`. For example, `https://twimlets.com/voicemail?Email=support@example.com`.\
      **Note**: The [Voicemail Twimlet](https://1console.twilio.com/us1/develop/twimlets/create?twimlet=voicemail) transcribes incoming calls and sends the transcription to your email address. This allows you to receive OTPs via email.

   ## Legacy Console

   1. Open the [Active Numbers page](https://console.twilio.com/us1/develop/phone-numbers/manage/incoming).
   2. Click your Twilio phone number.
   3. In the **Voice Configuration** section, in the **Configure with** row, select **Webhook, TwiML Bin, Function, Studio Flow, Proxy Service**.
   4. In the **A call comes in** row, select **Webhook** and set the **URL** to `https://twimlets.com/voicemail?Email=<YOUR_EMAIL_ADDRESS>`. For example, `https://twimlets.com/voicemail?Email=support@example.com`.\
      **Note**: The [Voicemail Twimlet](https://console.twilio.com/us1/develop/twimlets/create?twimlet=voicemail) transcribes incoming calls and sends the transcription to your email address. This allows you to receive OTPs via email.
2. In the Twilio Console window, under **2. Link WhatsApp Business Account with your number**, in the **2. Copy the phone number you register** section, click **Copy** next to the phone number.
3. In the Self Sign-up pop-up window, on the **Add your WhatsApp phone number** page, select **Add a new phone number** and paste the phone number you copied from the Twilio Console.
4. Select **Phone call** as the verification method and click **Next**.\
   You'll receive the verification code in your email. It might take up to 10 minutes.
5. Enter the verification code received in your email and click **Next**.

## Console

1. Open the [Active Numbers page](https://1console.twilio.com/us1/develop/phone-numbers/manage/incoming).
2. Click your Twilio phone number.
3. In the **Voice Configuration** section, in the **Configure with** row, select **Webhook, TwiML Bin, Function, Studio Flow, Proxy Service**.
4. In the **A call comes in** row, select **Webhook** and set the **URL** to `https://twimlets.com/voicemail?Email=<YOUR_EMAIL_ADDRESS>`. For example, `https://twimlets.com/voicemail?Email=support@example.com`.\
   **Note**: The [Voicemail Twimlet](https://1console.twilio.com/us1/develop/twimlets/create?twimlet=voicemail) transcribes incoming calls and sends the transcription to your email address. This allows you to receive OTPs via email.

## Legacy Console

1. Open the [Active Numbers page](https://console.twilio.com/us1/develop/phone-numbers/manage/incoming).
2. Click your Twilio phone number.
3. In the **Voice Configuration** section, in the **Configure with** row, select **Webhook, TwiML Bin, Function, Studio Flow, Proxy Service**.
4. In the **A call comes in** row, select **Webhook** and set the **URL** to `https://twimlets.com/voicemail?Email=<YOUR_EMAIL_ADDRESS>`. For example, `https://twimlets.com/voicemail?Email=support@example.com`.\
   **Note**: The [Voicemail Twimlet](https://console.twilio.com/us1/develop/twimlets/create?twimlet=voicemail) transcribes incoming calls and sends the transcription to your email address. This allows you to receive OTPs via email.

## SMS: Non-Twilio phone numbers

1. Make sure your phone number meets all [requirements](#phone-number-requirements) and can receive SMS messages.
2. In the Self Sign-up pop-up window, on the **Add your WhatsApp phone number** page, select **Add a new phone number** and enter your phone number.
3. Select **Text message** as the verification method and click **Next**.
4. Enter the verification code you receive via SMS and click **Next**.

## Voice: Non-Twilio phone numbers

1. Make sure your phone number meets all [requirements](#phone-number-requirements) and can receive voice calls.
2. In the Self Sign-up pop-up window, on the **Add your WhatsApp phone number** page, select **Add a new phone number** and enter your phone number.
3. Select **Phone call** as the verification method and click **Next**.
4. Enter the verification code you receive via voice call and click **Next**.

### Review Twilio's access request

After verifying the phone number, the Self Sign-up pop-up window opens the **Review Twilio's access request** page. Review the access requests and click **Confirm**.

## Complete the registration

When you confirm the access requests, the following occurs:

* The Self Sign-up pop-up window closes.
* Twilio starts the registration process. This might take a few minutes.
* The Twilio Console window refreshes and shows the WhatsApp sender you registered.

After registration is complete, you can manage your sender by clicking **Edit Sender**:

* Set your inbound message webhooks.
* Update your WhatsApp Business profile, including your profile picture.
* Add the sender to a Messaging Service or change the Messaging Service.
* Delete the sender.

## Complete Meta business verification

> \[!NOTE]
>
> Business verification is free and isn't the same as Meta's subscription product, "Meta Verified".

If you created a new Meta Business Portfolio during the Self Sign-up process or your existing Meta Business Portfolio hasn't completed business verification, you must complete business verification on Meta before you can move into production.

When you complete business verification, you can:

* Increase your messaging limits.
* Add more than two WhatsApp senders.
* Request a [WhatsApp Official Business Account (OBA)](https://www.facebook.com/business/help/604726921052590).

To complete business verification, follow the steps in [How to verify your business on Meta](https://www.facebook.com/business/help/2058515294227817). You can check your business verification status in [Meta's Security Center](https://business.facebook.com/settings/security).

Meta's processing time for business verification varies by region and can take several weeks. Start the verification process early to avoid delays in moving into production.

**Note**: After completing Meta business verification, you might still see a notice that directs you to complete verification. If you've already completed it, you can ignore the notice.

## Register additional WhatsApp senders

To register additional WhatsApp senders, you can repeat the Self Sign-up process or use the Senders API.

> \[!NOTE]
>
> Twilio recommends using the API only when you need to onboard a large number of senders across many accounts (bulk registration). Use the WhatsApp Self Sign-up for a small number of senders.

When registering additional WhatsApp senders, keep this in mind:

* For each sender, you must select the same Meta Business Portfolio and WABA that you used for the first WhatsApp sender. Selecting a different Meta Business Portfolio or WABA will result in an error.
* You can't use multiple WABAs in one Twilio account.

## Troubleshooting

The following troubleshooting steps can help you resolve common issues when you register a WhatsApp sender.

### I want to check if a phone number is registered with WhatsApp

To check if a phone number is registered with WhatsApp, use one of the following methods:

* **Send a test message**: Open `https://wa.me/<PHONE_NUMBER>?text=hi` in a browser (include the country code without `+`, for example, `15551234`). If the number is registered, you'll receive "hi" in WhatsApp.
* **Search contacts**: In WhatsApp, tap **New Chat > New Contact** and enter the phone number. If the number is registered, you'll see "This phone number is on WhatsApp".
* **Check error logs**: Open the [Error Logs page in the Twilio Console](https://console.twilio.com/us1/monitor/logs/debugger/errors). If the number is registered, you'll see [Error 63110](/docs/api/errors/63110).

### I want to use an already registered phone number

To use a phone number that's already registered with WhatsApp:

* **If registered with WhatsApp or WhatsApp Business app**: [Delete the WhatsApp account](https://faq.whatsapp.com/2138577903196467) to make the phone number available for the WhatsApp Business Platform with Twilio.
* **If registered with another WhatsApp Business Platform**: In the [WhatsApp Manager](https://business.facebook.com/latest/whatsapp_manager/), turn off Two-Factor Authentication (2FA) for the number on the WhatsApp Business Platform and register a WhatsApp sender with the number. Contact your Solution Partner if you can't turn off 2FA by yourself.

Learn more about [migrating phone numbers and WhatsApp senders](/docs/whatsapp/migrate-numbers-and-senders). If you need further assistance, [contact Twilio Support](https://help.twilio.com/).

## Next steps

* [Register WhatsApp senders using the API](/docs/whatsapp/register-senders-using-api)
* [Migrate phone numbers and WhatsApp senders](/docs/whatsapp/migrate-numbers-and-senders)
* [Edit your WhatsApp Business Profile](/docs/whatsapp/editing-your-whatsapp-business-profile)
* [Create WhatsApp Templates with the Content Template Builder](/docs/content/create-templates-with-the-content-template-builder)
