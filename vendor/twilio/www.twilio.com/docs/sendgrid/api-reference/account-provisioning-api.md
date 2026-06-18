# Account Provisioning API Overview

The Twilio SendGrid Account Provisioning API provides a platform for Twilio SendGrid resellers to manage their customer accounts. This API is for companies that have a formal reseller partnership with Twilio SendGrid.

You can access Twilio SendGrid sub-account functionality without becoming a reseller. If you require sub-account functionality, see the Twilio SendGrid [Subusers](/docs/sendgrid/ui/account-and-settings/subusers) feature, which is available with [Pro and Premier plans](https://sendgrid.com/pricing/).

## Authentication and authorization

The Account Provisioning API uses standard Twilio Sendgrid [API Keys](/docs/sendgrid/ui/account-and-settings/api-keys) for authentication and authorization. Once onboarded as a reseller, any API keys you create will have access to the Account Provisioning API. Twilio SendGrid recommends creating an [Admin API key](/docs/sendgrid/api-reference/api-key-permissions#admin-api-key-permissions) to manage your Account Provisioning API account. An Admin key is also known as a [**Full Access** key](/docs/sendgrid/ui/account-and-settings/api-keys) in the [Twilio SendGrid user interface](https://app.sendgrid.com/settings/api_keys).

If you are new to Twilio SendGrid API keys, see the API key docs to [create an API key](/docs/sendgrid/ui/account-and-settings/api-keys#creating-an-api-key). The Twilio SendGrid v3 APIs expect the key to be passed as a Bearer Token in an Authorization header. See [**How to Use the SendGrid v3 API**](/docs/sendgrid/api-reference/how-to-use-the-sendgrid-v3-api/authentication) for instructions.

## Terminology

The following documentation refers to the owner of an Account Provisioning API account as the **reseller**. The accounts a reseller owns and manages through this API are referred to as **customer accounts**. The operations available are provided to you, the reseller, in order to manage your customer accounts.

## Common operations

The Twilio SendGrid Account Provisioning API allows you to create and manage your customers' accounts. This page provides an overview of the most common operations a reseller will perform:

* Creating a customer account.
* Understanding account state.
* Managing customer account offerings.
* Managing customer IP addresses.
* Deactivating and removing account resources.
* Authenticating customers with single sign-on (SSO).

For information about the other Account Provisioning API operations available, see the API reference documentation for each operation.

### Creating a new customer account

Creating a new customer account is done with a [single `POST` operation](/docs/sendgrid/api-reference/account-provisioning-api-account-operations/create-account) that will return the unique Twilio SendGrid account ID for the newly created account. The Create Account operation requires a JSON request body containing a `profile` object and an array of `offerings` objects.

#### Profile object

The `profile` object contains a customer's identity information such as their `first_name`, `last_name`, and `email`. The fields in the `profile` object are optional — the customer will be prompted at their first login to enter any profile information you choose not to include when creating the account. See the [API reference](/docs/sendgrid/api-reference/account-provisioning-api-account-operations/create-account) for all `profile` fields.

#### Offerings array

The `offerings` array contains offering objects that list the offering's `name`, `type`, and `quantity`. The offerings array is required, and it defines the Twilio SendGrid features or *offerings* available to the customer's account. The offerings available will depend on your agreement with Twilio SendGrid.

To retrieve a list of all the offerings that you can assign to a customer account, use the [List Offerings endpoint](/docs/sendgrid/api-reference/account-provisioning-api-offering-operations/list-offerings). Because the available offerings will change infrequently, you may wish to cache the List Offerings response rather than call the endpoint before each account creation or update. A new account may start on any email offering at any price point. Upgrades and downgrades are also available immediately after account provisioning.

#### Account creation request payload and response

The following JSON block shows a common request body used to create a new customer account.

```json
{
  "profile": {
      "first_name": "Jane",
      "last_name": "Doe",
      "company_name": "Cake or Pie Bakery",
      "company_website": "www.example.com",
      "email": "jdoe@example.com",
      "phone": "+15555555555",
      "timezone": "Asia/Tokyo"
  },
  "offerings": [
      {
          "name": "milne.ei.pro-100k.v1",
          "type": "package",
          "quantity": 1
      }
    ]
}
```

The response to a new account creation is the Twilio Sendgrid account ID. This account ID is used in all subsequent calls to the Account Provisioning API, so you should record it in your database for future use.

```json
{
  "account_id": "sg2a2bcd3ef4ab5c67d8efab91c01de2fa"
}
```

#### Creating a new customer test account

To create a new customer test account with Account Provisioning API, you must pass in a custom header as follows:

`T-Test-Account: true`

A test account will not be allocated a dedicated IP and will be limited to sending 100 email per day irrespective of the offerings used to create the account. An account not created as a test account using this custom header cannot be updated to be a test account.

### Working with account state

A customer account can be in one of five states, `activated`, `deactivated`, `suspended`, `banned`, or `indeterminate`\*. Setting the customer account state is done with a single [`PUT` operation](/docs/sendgrid/api-reference/account-provisioning-api-account-state-operations/update-account-state) using one of these states. Retrieving the customer account state is done with a single [`GET` operation](/docs/sendgrid/api-reference/account-provisioning-api-account-state-operations/get-account-state) that will return the state for the account. The following table shows the actions available to an account based on its state.

**Table of account states and immediately affected actions**

| ACCOUNT STATE | LOGIN | REQUEST MAIL | DELIVER MAIL | SUBUSERS REMOVED | DEDICATED IPS REMOVED | API KEYS DEACTIVATED |
| ------------- | ----- | ------------ | ------------ | ---------------- | --------------------- | -------------------- |
| Activated     | yes   | yes          | yes          | no               | no                    | no                   |
| Suspended     | yes   | yes          | no           | no               | no                    | no                   |
| Deactivated   | yes   | no           | no           | no               | no                    | no                   |
| Banned        | no    | no           | no           | yes              | yes                   | yes                  |

\* If you find an account in the `indeterminate` state, please [contact Twilio SendGrid support](https://support.sendgrid.com/hc/en-us) for assistance.

### Managing customer account offerings

Once a customer account is created, the most common need is to upgrade or downgrade the account to a different email package, otherwise known as an "offering." In addition to common email infrastructure offerings, your partner organization may have "add-on" offerings available including features such as Marketing Campaigns, Dedicated IP Addresses, and Expert Services.

Changing an account's offerings is done with a single [`PUT` operation](/docs/sendgrid/api-reference/account-provisioning-api-offering-operations/update-account-offerings) requiring a JSON request body that contains an `offerings` array of offering objects.

Because the update operation is a `PUT` request, you can remove offerings by omitting them from the update request. This means you must also pass the endpoint any offerings you want the account to retain — each operation overwrites the existing offerings for the account entirely. To retrieve a list of all the offerings you may assign to a customer account, use the [List Offerings endpoint](/docs/sendgrid/api-reference/account-provisioning-api-offering-operations/list-offerings). To see a list of the offerings currently assigned to an individual customer account, use the [Get Account Offerings](/docs/sendgrid/api-reference/account-provisioning-api-offering-operations/get-account-offerings) endpoint.

#### Update offerings request payload examples

##### Add package offering

```json
{
  "offerings": [
    {
      "name": "milne.ei.pro-100k.v1",
      "type": "package",
      "quantity": 1
    }
  ]
}
```

##### Update an account to have two dedicated IP addresses

```json
{
  "offerings": [
    {
      "name": "milne.ei.pro-100k.v1",
      "type": "package",
      "quantity": 1
    },
    {
      "name": "milne.x.ip.v2",
      "type": "addon",
      "quantity": 2
    }
  ]
}
```

###### Downgrade an account to one dedicated IP address

```json
{
  "offerings": [
    {
      "name": "milne.ei.pro-100k.v1",
      "type": "package",
      "quantity": 1
    },
    {
      "name": "milne.x.ip.v2",
      "type": "addon",
      "quantity": 1
    }
  ]
}
```

##### On a subsequent call, remove all dedicated IP addresses from the account

```bash
{
  "offerings": [
    {
      "name": "milne.ei.pro-100k.v1",
      "type": "package",
      "quantity": 1
    }
  ]
}
```

> \[!WARNING]
>
> When removing an IP Address offering, the Account Provisioning API will remove the most recently added IP address from the account. Generally speaking, mail is evenly distributed across all IP addresses, and this is the recommended methodology by Twilio Sendgrid support. If you would like to remove a specific IP address, please [contact support directly](https://support.sendgrid.com/hc/en-us).

#### Change offering response

The response to a change offering request is the account's resulting offerings list, which is identical to what will be returned on subsequent calls to the [Get Account Offerings endpoint](/docs/sendgrid/api-reference/account-provisioning-api-offering-operations/get-account-offerings).

### Manage customer IP addresses

The IP Provisioning API allows resellers to manage dedicated IP addresses for their customer accounts. You can add, list, and remove IP addresses as needed to support your customers' sending requirements.

This page provides an overview of the most common IP provisioning operations a reseller will perform:

* Add IP addresses to a customer account.
* List the IP addresses assigned to a customer account.
* Remove IP addresses from a customer account.

#### Add IPs to a customer account

Adding IP addresses to a customer account is done with a [single `POST` operation](/docs/sendgrid/api-reference/account-ip-provisioning-api-ip-operations/add-ips) that provisions new dedicated IP addresses and assigns them to the specified customer account. The Add IPs operation requires a JSON request body containing the number of IPs to provision and the region where they should be provisioned.

##### Request parameters

The request body contains two required fields:

* `count`: The number of IP addresses to provision. Valid values ranges from 1 to 10 per request.
* `region`: The geographic region where the IPs should be provisioned. Valid values are `us` (United States) and `eu` (Europe).

All IP addresses in a single request must be from the same region. If you need IPs in multiple regions, you must make separate API calls for each region.

##### Add IPs request payload

The following JSON object shows a request to add 2 IP addresses in the US region:

```json
{
  "count": 2,
  "region": "us"
}
```

##### Add IPs response

The response returns a `201 Created` status code along with the provisioned IP addresses and their region:

```json
{
  "ips": [
    "192.168.1.1",
    "192.168.1.2"
  ],
  "region": "us"
}
```

The returned IP addresses are immediately available for use with the customer account.

#### List customer account IPs

You can retrieve a paginated list of all IP addresses associated with a customer account using the [`GET` operation](/docs/sendgrid/api-reference/account-ip-provisioning-api-ip-operations/list-ips). The IPs are returned ordered by most recently added.

##### Pagination

The endpoint returns 10 results per request by default. You can specify up to 5,000 results per request using the `limit` query parameter. Use the `offset` parameter (set to the last IP address from the previous response) to paginate through results.

##### List IPs response

The response includes an array of IP objects, each containing the IP address and its region:

```json
{
  "result": [
    {
      "ip": "174.0.2.1",
      "region": "us"
    },
    {
      "ip": "192.0.0.1",
      "region": "eu"
    }
  ],
  "pages": {
    "last": "192.0.0.1"
  }
}
```

#### Remove IPs from a customer account

Removing IP addresses from a customer account is done with a [single `DELETE` operation](/docs/sendgrid/api-reference/account-ip-provisioning-api-ip-operations/remove-ips) that requires a JSON request body containing an array of specific IP addresses to remove.

##### Remove IPs request payload

The following JSON object shows a request to remove 2 specific IP addresses:

```json
{
  "ips": [
    "174.0.0.3",
    "192.0.0.1"
  ]
}
```

You can remove between 1 and 10 IP addresses per request. Each IP address must be specified in standard IPv4 dotted-decimal notation.

##### Remove IPs response

The response returns a `204 No Content` status code, indicating that the IP addresses have been successfully removed from the customer account.

> \[!WARNING]
>
> Removing an IP address from a customer account will immediately stop all email traffic using that IP. Ensure that you have updated your customer's sending configuration before removing IPs to avoid service disruption.

### Deactivating and removing account resources

You can deactivate a customer account using the [Update Account State](/docs/sendgrid/api-reference/account-provisioning-api-account-state-operations/update-account-state) operation to set the account state to `deactivated`.

```json
{
    "state": "deactivated"
}
```

You can remove features such as Subusers and Dedicated IP addresses from a customer account using the [Update Account Offerings](/docs/sendgrid/api-reference/account-provisioning-api-offering-operations/update-account-offerings) operation. Update the account with a free offerings payload.

#### Typical free offerings payload

```json
{
  "offerings": [
    {
      "name": "milne.ei.free-100.v1",
      "type": "package",
      "quantity": 1
    }
  ]
}
```

### Customer SSO

#### Triggering SSO

Once a customer account is created, the reseller can trigger a login to the Twilio Sendgrid UI for the customer with no password needed.

![SSO authentication flow for Account Provisioning API with customer, reseller, and SendGrid UI steps.](https://docs-resources.prod.twilio.com/2e978160da67ae69ad356142e3699eca5e29b846447adfa9dcd119b725c71b58.png)

#### Considerations

In addition to providing a seamless customer experience for accessing the Twilio Sendgrid UI, our Account Provisioning SSO also removes the need for a Sendgrid-based username and password. The reseller can manage their customers' authentication credentials without sharing any of that information with Twilio SendGrid.

The redirect generated as part of this flow contains a one-time authorization code used to log the user into the Twilio SendGrid UI. This one-time code is good 60 seconds and can be used for login once, ensuring that any type of man-in-the-middle or replay attack can be securely blocked.

SSO will authenticate the customer as an [Admin Teammate](/docs/sendgrid/ui/account-and-settings/teammates#configuring-permissions), with all the permissions to manage any aspect of the customer's account. From there, they can take all the usual steps of setting up API keys, creating additional teammates or subusers, and configuring their sender identity.

This SSO flow is limited to authentication on the base Admin Teammate. It cannot be used for SSO on a subsequently created teammate or subuser.

> \[!WARNING]
>
> The Account Provisioning API does not currently support Twilio SendGrid's SAML-based SSO offering for customer accounts. All Teammates belonging to a customer account will authenticate with a username and password managed through Twilio SendGrid.
