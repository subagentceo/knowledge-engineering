# How to Create a Subuser with the API

Creating a new subuser through SendGrid's API is a multi-step process. This guide will walk you through the necessary steps to create a new subuser account using only API calls.

## Establish the New Subuser (required)

With the [subuser creation API call](/docs/sendgrid/ui/account-and-settings/subusers) you will be able to establish the new subuser's account and profile settings. This call will create the new subuser account. However, it does not apply the sending IP for the account, nor does it establish a domain authentication entry or enable website/SMTP access for the subuser.

### Call Example

```bash
https://api.sendgrid.com/apiv2/customer.add.json?api_user=ryan.burrer@sendgrid.com&api_key=xxxxxx&username=newsubuser_username&website=example.com&password=newsubuser_password&confirm_password=newsubuser_password&first_name=Ryan&last_name=Burrer&address=555_anystreet&city=any_city&state=CO&zip=80203&email=example@example.com&country=US&phone=555-5555
```

**Success Message**

![JSON response with message success.](https://docs-resources.prod.twilio.com/ed41da1a8be0af8e835a126195088f4b041f79aecbf3a954f7c12bb57e8fbb8f.png)

**Failure Message**

![JSON error message with unspecified error details.](https://docs-resources.prod.twilio.com/d6b1ed121245ce44901041c4529158a906920edcf2e3186b3bfcfabd6dd83127.png)

## Assign an IP to be Used by the New Subuser (required)

Now that you have created the new subuser account, you will need to [add an IP](/docs/sendgrid/api-reference/ip-access-management) so that it can send emails. We advise that you first find an available IP for this subuser. You can do so by using the following call:

### Call Example \[#call-example-2]

```bash
https://api.sendgrid.com/apiv2/customer.ip.xml?api_user=ryan.burrer@sendgrid.com&api_key=xxxxxx&list=all
```

When defining the parameter 'list', there are a few options you can choose:

* **All** - Will list all of the IPs on your account, taken or available.
* **Free** - Will list all the free IPs on your account. For instance, if an IP is in use by a subuser or parent account then that IP will not be listed.
* **Taken** - Will list all of the IP addresses that are assigned to your parent and subuser accounts.
* **Available** - Will list all of the unassigned IP addresses for the account. If a subuser is deactivated *and* it is assigned an IP, that IP will show up on this list since that IP address is not technically in use.

**Response Example**

![List of IP addresses: 255.255.255.250, 255.255.255.251, 255.255.255.252.](https://docs-resources.prod.twilio.com/d7c4209dd771081f33c01755daeeb2c20f6a55f7e959c31d1d87f2f4f393251e.png)

After you have selected the IP that you wish to assign to your subuser account, make the API call to [append the IP address](/docs/sendgrid/api-reference/ip-access-management).

### Call Example \[#call-example-3]

```bash
https://api.sendgrid.com/apiv2/customer.sendip.json?api_user=ryan.burrer@sendgrid.com&api_key=xxxxxx&task=append&set=specify&user=newsubuser_username&ip[]=255.255.255.250&ip[]=255.255.255.255
```

When defining this call's 'set' parameter, you have a few options for appending the subuser's IP:

* **None** - removes all of the IPs on the associated account.
* **All** - applies all of the possible IPs to the account.
* **Specify** - Specify the IPs to the subuser

**Success Message**

![JSON response with message success.](https://docs-resources.prod.twilio.com/ed41da1a8be0af8e835a126195088f4b041f79aecbf3a954f7c12bb57e8fbb8f.png)

**Failure Message**

![JSON error message with unspecified error details.](https://docs-resources.prod.twilio.com/d6b1ed121245ce44901041c4529158a906920edcf2e3186b3bfcfabd6dd83127.png)

## Assign a domain authentication for the Subuser Account (optional)

After you have created the subuser account and have appended an IP address, you are now ready to assign an *existing* [authenticated domain](/docs/sendgrid/ui/account-and-settings/how-to-set-up-domain-authentication/) to the account. If you have not yet created the required records for authenticating your chosen domain then this step should be skipped.

First, you should find out what authenticated domains you have associated with your account. This call will list your available authenticated domains:

### Call Example \[#call-example-4]

```bash
https://api.sendgrid.com/apiv2/customer.whitelabel.json?api_user=ryan.burrer@sendgrid.com&api_key=xxxxxx&task=list
```

**Response Example**

![JSON showing mail and URL domains for SendGrid and example.com.](https://docs-resources.prod.twilio.com/23a49b4f432252244a9dc74fda085cbccc4f5e0beee592fe9337895adf20873a.png)

The API response above shows that email.sendgrid.com and email.example.com are both already established domain entries, and can be used by this subuser. If none are displayed then the next step in this process should be skipped.

If you have an authenticated domain entry that you wish to apply to your subuser then you will need to [append the authenticated domain entry](/docs/sendgrid/ui/account-and-settings/how-to-set-up-domain-authentication) to your subuser:

### Call Example \[#call-example-5]

```bash
https://api.sendgrid.com/apiv2/customer.whitelabel.json?api_user=ryan.burrer@sendgrid.com&api_key=xxxxxx&task=append&user=newsubuser_username&mail_domain=YOUR.ALREADY.EXISTING.AUTHENTICATED_DOMAIN
```

**Success Message**

![JSON response with message success.](https://docs-resources.prod.twilio.com/ed41da1a8be0af8e835a126195088f4b041f79aecbf3a954f7c12bb57e8fbb8f.png)

**Failure Message**

![JSON error message with unspecified error details.](https://docs-resources.prod.twilio.com/d6b1ed121245ce44901041c4529158a906920edcf2e3186b3bfcfabd6dd83127.png)

## Authenticating the Subuser to Have Website/SMTP Access (required)

The final step in creating your new subuser requires you to [activate the subuser](/docs/sendgrid/api-reference/how-to-use-the-sendgrid-v3-api) account so that they have a website and SMTP access.

### Call Example \[#call-example-6]

```bash
https://api.sendgrid.com/apiv2/customer.auth.json?api_user=ryan.burrer@sendgrid.com&api_key=xxxxxx&user=newsubuser_username&password=newsubuser_password
```

**Success Message**

![JSON response with message success.](https://docs-resources.prod.twilio.com/ed41da1a8be0af8e835a126195088f4b041f79aecbf3a954f7c12bb57e8fbb8f.png)

**Failure Message**

![JSON error message with unspecified error details.](https://docs-resources.prod.twilio.com/d6b1ed121245ce44901041c4529158a906920edcf2e3186b3bfcfabd6dd83127.png)

## Additional Resources

* [Automating Subusers](/docs/sendgrid/for-developers/sending-email/automating-subusers/)
* [Event Notification URL](/docs/sendgrid/api-reference/how-to-use-the-sendgrid-v3-api)
* [Apps](/docs/sendgrid/api-reference/how-to-use-the-sendgrid-v3-api)
* [Account Limits](/docs/sendgrid/api-reference/how-to-use-the-sendgrid-v3-api)
