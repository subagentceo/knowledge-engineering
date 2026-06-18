# Verify SNA Live Test Number

## Overview

The Verify Silent Network Auth (SNA) Live Test Number feature allows developers to quickly test and experience Silent Network Authentication using their own mobile number, without first obtaining carrier approvals that can take 2-4 weeks.

## Limitations

* Developers can currently test their mobile numbers on supported carriers in these countries: United States, United Kingdom, France, Spain, and Germany. Once your Twilio account is enabled to use SNA, you can [access this list of Live Test Number supported carriers](/docs/verify/verify-sna-live-test-number-supported-carriers) within each country. Note that the page will appear broken unless you are logged in to an account that has SNA enabled.
* Note that the countries/carriers available for Live Test Number is a subset of what is available once your company is approved via the 2-4 week carrier approval process.
* If your mobile number isn't in one of the supported countries, you can use a third-party mobile device testing service like [Headspin](https://www.headspin.io/) to obtain one. See our [Verify SNA Headspin Testing Guide](/docs/verify/verify-silent-network-auth-headspin-testing-guide) for more details.
* The latest versions of Safari and Chrome browsers automatically convert HTTP requests into HTTPS on mobile devices when opening the one-time Live Test Number URL. You can adjust this behavior by turning on HTTP for [Safari](https://discussions.apple.com/thread/255914488?sortBy=rank) or turning off secure connections in [Chrome](https://support.google.com/chrome/answer/10468685?hl=en\&co=GENIE.Platform%3DiOS\&oco=0#zippy=%2Cturn-on-always-use-secure-connections). For example, if you test an SNA URL in the U.S. using Safari on an iPhone, the SNA transaction will succeed because supported carriers offer dedicated HTTPS data connections. However, the same test might fail in another region, such as the U.K., if the carrier uses an HTTP connection for cellular data at any point during the SNA flow.
* [The general limitations of Verify SNA also apply](/docs/verify/sna).

## Get started

**Step 1:** [Sign-up](https://www.twilio.com/try-twilio) for a Twilio account.

**Step 2:** [Request access](https://docs.google.com/forms/d/e/1FAIpQLSeEtqZ5bNs27DcTGnG1mx11-ZQUztNlw8nkskVlFRFwkf7xMA/viewform) to the API and Live Test Number feature. If there are no issues, access will be granted within 24 business hours.

**Step 3:** [Log in](https://www.twilio.com/login) to your Twilio account.

**Step 4:** Open the [SNA Live Test Number](https://console.twilio.com/us1/develop/verify/settings/sna) page in the Twilio Console. Navigate to **Develop** → **Verify** → **Settings** → **SNA live test number**.

**Step 5:** Confirm that the mobile number you wish to test is on one of our Live Test Number [supported carriers](/docs/verify/verify-sna-live-test-number-supported-carriers). You must be logged in to your account and have access to SNA to view the supported carriers list, otherwise the page will appear broken.

**Step 6:** On the SNA Live Test Number page in Console, add your mobile number and give consent.

![Form to register a mobile number for SNA live testing with country selection and confirmation message.](https://docs-resources.prod.twilio.com/d0d0fd11027d3ab3d047420fc5dcca1c4d82639395fefd9582850711f244a287.png)

**Step 7:** Your number is now ready for testing! Continue by following our SNA [testing guide](/docs/verify/sna-testing-guide).
