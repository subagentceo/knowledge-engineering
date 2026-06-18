# Verify Silent Network Auth Technical Overview

> \[!NOTE]
>
> Verify Silent Network Auth (SNA) is currently in the beta release stage, [talk to an expert](https://interactive.twilio.com/silent-network-auth-sales-1?_ga=2.37177440.1944479737.1659912854-303184958.1630969149) to request access to this feature.

## Test SNA Today

[Get Started](/docs/verify/verify-sna-live-test-number)

Skip the 2-4 week wait for carrier approvals and get directly to testing SNA with your own mobile number using the new [Live Test Number](/docs/verify/verify-sna-live-test-number) feature.

## Sequence diagram

The API for Verify Silent Network Auth (SNA) is the same Verify API used for sending SMS one-time passwords (OTPs), involving REST calls to the [Verifications](/docs/verify/api/verification#start-new-verification-with-silent-network-auth) and [Verifications Check](/docs/verify/api/verification-check) resources (sample code provided).

As the sequence diagram shows below, a common scenario of phone number verification in a mobile app involves interactions between the end-user, customer developer, customer mobile frontend, customer backend, the Verify API for SNA, and the underlying carrier (MNO) that is ultimately checking if the end-user provided phone number matches the phone number to the SIM on the mobile frontend's device.

![Flowchart of phone number verification in a mobile app using Verify API for SNA, detailing steps from account signup to verification status.](https://docs-resources.prod.twilio.com/c72145307d27d4246e861abd233b05ec50c1ba84a559a2108e41c866f3456cb7.png)

## Desktop or PC implementation

For SNA to work, a mobile device with a SIM needs to directly invoke the SNA URL to complete the authentication flow between Twilio and the mobile carrier. See our [API Reference documentation](/docs/verify/api/verification#send-post-request-to-response-property-snaurl) for more details on performing this step.

If an end user is using a desktop computer, the SNA URL must be transmitted to their mobile device so it can be invoked over the carrier network. Alternatively, you can choose to implement SNA for your mobile applications and use another channel such as SMS for your desktop applications.

There are two methods for how to approach a desktop SNA implementation:

1. Provide a QR code that opens a mobile app or mobile browser
2. Send an SMS with a mobile browser link

### QR code method

* End user has already confirmed ownership of a phone number, usually during the account sign-up process.
* A QR code is displayed on the desktop computer with a prompt to scan the code using their mobile device in order to confirm phone number possession.
* End user scans the QR code using their camera app and either a **mobile app** or **mobile browser** opens.
* *If the QR code opens a* ***mobile app***, an authentication screen is displayed with a button that will invoke the SNA URL. If the app is not downloaded, it will redirect to the Play Store or iTunes. When the button is selected, SNA confirms phone number possession. WiFi does not need to be disabled by the user during this process, but the mobile app should override WiFi and use the carrier data connection when invoking the SNA URL.
* *If the QR code opens a* ***mobile browser***, a mobile browser page is displayed with a button that will invoke the SNA URL. End user is instructed to turn off WiFi in order to authenticate. When the button is selected, SNA confirms phone number possession.
* A few seconds later, the mobile device shows that authentication is complete and the desktop session can be resumed.
* End user is automatically logged into the desktop session based on server-to-server confirmation.

### SMS method

* An input is displayed on the end user's desktop computer with a prompt to enter their phone number and send an SMS message to their mobile device to confirm phone number possession.
* End user receives an SMS with instructions to select the included URL to continue the authentication process.
* URL is selected and a mobile browser page opens with a button that will invoke the SNA URL. End user is instructed to turn off WiFi in order to authenticate. When the button is selected, SNA confirms phone number possession.
* A few seconds later, the mobile device shows that authentication is complete and the desktop session can be resumed.
* End user is automatically logged into the desktop session based on server-to-server confirmation.
