# On Behalf Of

## API Overview

## Twilio supported SDKs

The Twilio SendGrid Web REST API v3 provides SDKs for seven different languages.

* [C#](https://github.com/sendgrid/sendgrid-csharp)
* [Go](https://github.com/sendgrid/sendgrid-go)
* [Java](https://github.com/sendgrid/sendgrid-java)
* [Node.js](https://github.com/sendgrid/sendgrid-nodejs)
* [PHP](https://github.com/sendgrid/sendgrid-php)
* [Python](https://github.com/sendgrid/sendgrid-python)
* [Ruby](https://github.com/sendgrid/sendgrid-ruby)

The On Behalf Of header allows you to make API calls from a parent account on behalf of the parent's Subusers or customer accounts. Use this header to automate bulk updates or to administer a Subuser or account without changing the authentication in your code.

> \[!WARNING]
>
> The `on-behalf-of` header does not work with the [Mail Send API](/docs/sendgrid/api-reference/mail-send/mail-send).

## How to use on-behalf-of

On Behalf Of generates the API call as if the Subuser or customer account is making the call. When authenticating and using the `on-behalf-of` header, you must use the parent account's API key credentials.

On Behalf Of accepts either a Subuser username or customer account ID, depending on which type of sub-account structure you are administering. Subusers function like separate SendGrid sub-accounts, and they're available to all customers on [Pro and Premier plans](https://sendgrid.com/pricing). Customer accounts also act as separate sub-accounts that are managed by a parent account; however, customer accounts are available only to companies that have a formal reseller partnership with Twilio SendGrid.

See [**Subusers**](/docs/sendgrid/ui/account-and-settings/subusers) for more information about working with Subusers. See the [Account Provisioning API](/docs/sendgrid/api-reference/account-provisioning-api) for more information about managing customer accounts.

When making a call on behalf of a customer account, the property value should be "account-id" followed by the customer account's ID.

`on-behalf-of: account-id <account-id>`

When making a call on behalf of a Subuser, the property value should be the Subuser's username.

`on-behalf-of: <subuser-username>`

When making a call on behalf of a Subuser, the Base URL of the request must correspond to the Subuser's region.

**Base URL**: https://api.sendgrid.com (for global subusers)

**Base URL**: https://api.eu.sendgrid.com (for EU regional subusers)

## On Behalf Of Subuser

```bash
curl --request GET \
  --url 'https://api.sendgrid.com/v3/stats?start_date=2018-02-01&aggregated_by=day' \
  --header 'authorization: Bearer <SENDGRID_API_KEY>' \
  --header 'on-behalf-of: <subuser-username>'
```

## On Behalf Of Subuser EU Regional

```bash
curl --request GET \
  --url 'https://api.eu.sendgrid.com/v3/stats?start_date=2018-02-01&aggregated_by=day' \
  --header 'authorization: Bearer <SENDGRID_API_KEY>' \
  --header 'on-behalf-of: <subuser-username>'
```

## On Behalf Of Customer Account

```bash
curl --request GET \
  --url 'https://api.sendgrid.com/v3/stats?start_date=2018-02-01&aggregated_by=day' \
  --header 'authorization: Bearer <SENDGRID_API_KEY>' \
  --header 'on-behalf-of: account-id <account-id>'
```
