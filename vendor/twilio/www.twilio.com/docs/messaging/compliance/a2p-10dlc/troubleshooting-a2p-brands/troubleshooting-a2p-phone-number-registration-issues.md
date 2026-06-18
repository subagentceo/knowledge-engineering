# Troubleshooting A2P Phone Number registration issues

A2P Brand & Campaign registration via the API consists of the following steps:

1. **Create a Customer Profile** (this will either be a Starter Profile for Sole Proprietor Brands, or a Standard Profile for Standard or LVS Brands)
2. **Create an A2P Trust Bundle**
3. **Create an A2P Brand**
4. **Create an A2P Campaign** around a single use case (each Sole Proprietor Brand can only have one Campaign, but Standard Brands can have multiple Campaigns)
5. **Add a Phone Number to the Campaign** (each Sole Proprietor Campaign can only use one Phone Number to send messages, but a Standard/LVS Campaign can have many)

The present guide addresses troubleshooting of failures that can happen in the final step, adding phone numbers to a successfully-registered Campaign. Brand and Campaign submissions can also fail at any of the previous steps. Troubleshooting Profile or Brand failures for Sole Proprietor Brands is covered in [this guide](/docs/messaging/compliance/a2p-10dlc/troubleshooting-a2p-brands/troubleshooting-sole-proprietor-brand-registration-failures); troubleshooting these for Standard or LVS Brands is covered in [this guide](/docs/messaging/compliance/a2p-10dlc/troubleshooting-a2p-brands/troubleshooting-and-rectifying-a2p-standardlvs-brands). Finally, troubleshooting failures in Campaign submissions is covered in [this guide](/docs/messaging/compliance/a2p-10dlc/troubleshooting-a2p-brands/troubleshooting-and-rectifying-a2p-campaigns-1).

It's important to understand that even after a given A2P Campaign has been approved by TCR, individual phone numbers in the Messaging Service associated with that Campaign must then be approved by the respective US carriers. This is itself an asynchronous process. Accordingly, Twilio offers a Console tool that allows you to check the current A2P registration status of all phone numbers owned by a given account (or subaccount). Phone numbers will be listed in a downloadable .csv report, indicating the A2P registration status of each number, and its associated Campaign SID and Messaging Service SID. \
This .csv report will be formatted as in the following example:

![Table showing account, campaign, messaging service, phone number, and status with entries marked as failure or pending registration.](https://docs-resources.prod.twilio.com/9cdd341d86ea959e502cc3316af1c8bac07fac56a91377a37a697f0ca2e6a6e1.png)

In this example report, the phone numbers shown are all associated with A2P Campaigns; numbers in your account with no such association would have a blank **CampaignSID** field, and their status would be UNREGISTERED. In this example, all of these numbers have a status of either PENDING\_REGISTRATION or FAILURE. The full list of possible statuses follows, together with a description and potential remediation:

* **UNREGISTERED:** This number has not been associated with a verified campaign. Register the 10DLC number by adding it to a Messaging Service associated with a verified A2P campaign. Note that for numbers added to a Messaging Service, the **MessagingServiceSid** value will not display in the report until the MS has been associated with a Campaign and that Campaign has been successfully A2P-registered. Additionally, Sole Proprietor Campaigns can only have one registered 10DLC. Additional 10DLC numbers in that Messaging Service will be in the "Unregistered" status.
* **PENDING\_REGISTRATION:** Twilio has received your request to register this number, but has not completed the necessary configurations with ecosystem partners. There's no further action required from you. It is normal for number registration to take several days depending on the amount of number registration requests we receive. You may check back at this report later to see if your number has the status of REGISTERED.
* **REGISTERED:** Your number is registered and ready to be used to send messages to the US
* **PENDING\_DEREGISTRATION:** Twilio has received your request to de-register this number, but has not completed the necessary configurations with ecosystem partners. If you've recently tried to move a number from one Campaign to another, you may see your number status changing in the sequence of Registered - Pending De-registration - Unregistered - Registered. There is no further action required from you. It is normal for number deregistration to take several days depending on the amount of number registration requests we receive. You may check back at this report later to see if your number has been successfully registered.
* **FAILURE:** An unexpected error has occurred on your number. Reach out to Twilio support after logging into console at [https://www.twilio.com/console/support/tickets/create](https://www.twilio.com/console/support/tickets/create)

To download this CSV report, go to **Phone Numbers** in the Twilio Console, then **Manage >** [**Active Numbers**](https://console.twilio.com/us1/develop/phone-numbers/manage/incoming). In the second banner on the **Active Numbers** page, you'll find a link to "**Request CSV Report**" as indicated below:

![Link to request CSV report for A2P 10DLC registration status of phone numbers.](https://docs-resources.prod.twilio.com/b0763906529cf5027184020a18c463084d35e8b1310e2f97c90b6ae4755d79bb.png)

This link will take you to a page with the following header, allowing you to request the generation of your CSV status report:

![Instructions for generating a CSV report on A2P 10DLC number registration status.](https://docs-resources.prod.twilio.com/7cf1080ad38abbdd954c9797e83a4792928190de100c93a58832e02f886037df.png)

This report can take up to 24 hours to generate, depending on your volume of numbers and accounts, but if you have only a small set of numbers it could be ready much sooner. When the report has finished generating you will receive a notification email to this effect, at the email address indicated in the box on this page (it will be the email associated with the account you are using). When you receive this email notice, return to the number registration status page (refresh if necessary) and it will display a completion banner and present a blue **Download CSV report** button, as shown:

![Report ready to download with options for CSV download or new report generation.](https://docs-resources.prod.twilio.com/22df7b8b850e85da6b2bd50e716306a974abf7c74dc6b1dd7d4736e9f6342a28.png)

## Further Troubleshooting

If your status report shows numbers in an UNREGISTERED or PENDING state that you feel should be fully registered at this point, try the following:

1. If the campaign is a Standard / Special use case, and has been registered, but the phone number experiencing issues was added to that registered Messaging Service **less than two weeks ago**, wait a few more days for the status to update as number registration may take some time.
2. If the campaign is a **Sole Proprietor** use case, these can only have one number registered for A2P, so if there were multiple numbers in the Sender pool of a preexisting MS you've selected for the New Campaign, then Twilio one number in the Messaging Service at random to register for A2P. If customers wish to specify a different number for A2P use, remove ALL numbers in the Messaging Service, and only add back the number they wish to use.
