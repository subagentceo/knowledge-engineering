# SMS Data Residency in EU

When you send SMS by using the Programmable Messaging API in Twilio's [Ireland (IE1) Region](/docs/global-infrastructure/understanding-twilio-regions), Twilio manages where SMS personal data is processed and stored to support EU data residency requirements.

## What is SMS personal data?

SMS personal data includes the message body and the end user's phone number. Twilio phone numbers that your application uses are not considered personal data.

| Personal data           | Outbound SMS (mobile terminated) | Inbound SMS (mobile originated) |
| ----------------------- | -------------------------------- | ------------------------------- |
| End user's phone number | To: **+33 123XXXXX**             | From: **+33 123XXXXX**          |
| Message body            | Body: **Your message**           | Body: **Their message**         |

## How is SMS personal data processed?

SMS messages are processed and stored exclusively in Twilio's IE1 region in the EU, up to the point they reach Twilio's connections with telecommunications providers. Twilio's [subprocessors](https://www.twilio.com/en-us/legal/sub-processors) also process and store data in Twilio's IE1 region.

To maintain a reliable messaging service, Twilio offers routing redundancy with connections to providers that may span multiple regions, depending on the end user's destination. In addition, please note that telecom providers may store and process data outside the EU and in accordance with their own policies and local regulations.

Support is provided via a secure 'follow-the-sun' model. While personnel in non-EU countries may access data for troubleshooting or to provide support, Twilio's privacy and security programs incorporate the necessary compliance controls, including data transfer mechanisms, audit logging and the appropriate security controls. For more information on how Twilio processes personal data, see our [Privacy Policy](https://www.twilio.com/legal/privacy).
