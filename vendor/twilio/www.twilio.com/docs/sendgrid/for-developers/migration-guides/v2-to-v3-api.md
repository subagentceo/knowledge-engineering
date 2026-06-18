# Migrate from Twilio SendGrid API v2 to v3

This guide provides a step-by-step process for migrating from SendGrid's v2 API to the v3 API. After reading this document, you will be able to successfully transition your integration to take advantage of the updated features and improved performance of the v3 API. This guide assumes you are familiar with the basics of API usage and that you have the necessary authentication and permissions set up for both versions of the SendGrid API.

## Review the v3 API documentation

Before starting the migration, familiarize yourself with the [v3 API documentation](https://docs.sendgrid.com/api-reference). The v3 API has different endpoints, request formats, and authentication methods compared to the v2 API. Understanding these differences is crucial for a successful migration.

## Update your authentication method

The v3 API uses an API key for authentication. Ensure you have [generated an API key from the SendGrid dashboard or via API](https://docs.sendgrid.com/api-reference/how-to-use-the-sendgrid-v3-api/authentication#api-keys) and update your code to use this key in the HTTP Authorization header as a Bearer token.

```http {title="v2 API Authentication Example"}
Authorization: Basic <base64-encoded-credentials>
```

or

```http
https://sendgrid.com/api/stats.get.json?api\_user=yourusername\&api\_key=yourpassword\&days=1
```

```http {title="v3 API Authentication Example"}
Authorization: Bearer <your-api-key>
```

## Map v2 endpoints to v3 endpoints

Identify all the v2 API endpoints you are currently using and find the corresponding v3 endpoints. For example, if you are using the `/api/mail.send.json` endpoint in v2, the equivalent in v3 would be `/v3/mail/send`. At the end of this migration guide, you will find a [mapping of all of the v2 and v3 API endpoints](/docs/sendgrid/for-developers/migration-guides/v2-to-v3-api#v2-to-v3-api-mapping).

For specific instructions on migrating the send email endpoint, refer to the [How To Migrate From v2 to v3 Mail Send](/docs/sendgrid/for-developers/sending-email/migrating-from-v2-to-v3-mail-send) guide.

## Update the request URLs

Change the base URL in your API requests from the v2 base URL to the v3 base URL. For example:

```bash {title="v2 API Request URL"}
https://api.sendgrid.com/apiv2 or https://api.sendgrid.com/api
```

```bash {title="v3 API Request URL"}
https://api.sendgrid.com/v3
```

## Update the request and response formats

The v3 API typically uses JSON for both request payloads and responses. Ensure that your requests are sending JSON payloads and that your code is prepared to parse JSON responses. Below are examples demonstrating how to update your request formats:

### Example: Sending an email

**v2 API cURL Request Example:**

In the v2 API, you might send an email using a cURL command like this:

```bash
curl -X POST "https://api.sendgrid.com/api/mail.send.json" \
  -d "api_user=yourusername" \
  -d "api_key=yourpassword" \
  -d "to=example@example.com" \
  -d "from=you@example.com" \
  -d "subject=Hello" \
  -d "text=Testing SendGrid"
```

This command sends a form-encoded `POST` request to the SendGrid v2 API endpoint.

**v3 API cURL Request Example:**

In the v3 API, the equivalent request using JSON would look like this:

```bash
curl -X POST "https://api.sendgrid.com/v3/mail/send" \
  -H "Authorization: Bearer <your-api-key>" \
  -H "Content-Type: application/json" \
  -d '{
    "personalizations": [
      {
        "to": [
          {
            "email": "example@example.com"
          }
        ],
        "subject": "Hello"
      }
    ],
    "from": {
      "email": "you@example.com"
    },
    "content": [
      {
        "type": "text/plain",
        "value": "Testing SendGrid"
      }
    ]
  }'
```

This command sends a JSON payload to the SendGrid v3 API endpoint, using the Bearer token for authentication.

### Example: Handling responses

For handling responses, ensure your application is set up to parse JSON responses from the v3 API. The cURL command itself will not handle responses beyond displaying them in the terminal, but you can redirect the output to a file or another application component that processes JSON.

**v3 Response Handling:**

In practice, you might capture the response like this:

```bash
curl -X GET "https://api.sendgrid.com/v3/stats?start_date=2023-01-01&end_date=2023-01-02" \
  -H "Authorization: Bearer <YOUR_API_KEY>" \
  -o response.json
```

This command retrieves email statistics for the specified date range and saves the response to a file named `response.json`. The file is saved in the current working directory where the cURL command is executed. You can review or process this file using another script or application.

These examples show how to transition from v2 to v3 requests using cURL and how to adapt to the JSON-based format of the v3 API. Always ensure your authentication and API key management practices align with Twilio SendGrid's security recommendations.

## Update the query parameters

The v3 API might use different query parameters compared to the v2 API. Update your requests to use the correct query parameters for filtering, pagination, and other functionalities as per the [v3 API documentation](https://docs.sendgrid.com/api-reference).

## Handle rate limits

Compare the [v3 API rate limits](https://docs.sendgrid.com/api-reference/how-to-use-the-sendgrid-v3-api/rate-limits) with the [v2 API rate limits](https://docs.sendgrid.com/v2-api/using_the_web_api#rate-limits). Make sure to handle rate limits appropriately in your code to avoid disruptions.

## Test your integration

Before fully switching over to the v3 API, test your updated integration thoroughly. Ensure that all functionalities are working as expected and that the data you receive from the v3 API is correct.

## Monitor and debug

After migrating to the v3 API, monitor your application closely for any issues. If you encounter any problems, use the [error messages and status codes provided by the v3 API](https://docs.sendgrid.com/api-reference/how-to-use-the-sendgrid-v3-api/errors) to debug and resolve issues.

## Update your documentation and training materials

Finally, update any internal documentation and training materials to reflect the changes made during the migration. This will help your team to understand and maintain the new integration.

Specific details may vary based on the particular features of the SendGrid v2 API you are using. Always refer to the [official SendGrid v3 API documentation](https://docs.sendgrid.com/api-reference) for the most accurate and detailed information.

## Example migration

### v2 API example

In the v2 API, retrieving statistics for a subuser looks like this:

```bash
curl -X GET "https://api.sendgrid.com/v2-api/customer_subuser_api/stats?api_user=<YOUR_SENDGRID_USERNAME>&api_key=<YOUR_SENDGRID_APIKEY>&days=1&user=<MY_SUBUSER_NAME>"
```

This request retrieves statistics for the specified subuser over the past day. The request parameters, including authentication credentials, are passed as query parameters.

### v3 API example

In the v3 API, retrieving global email statistics looks like this:

```bash
curl -X GET "https://api.sendgrid.com/v3/stats?start_date=2023-01-01&end_date=2023-01-02" \
-H "Authorization: Bearer <YOUR_API_KEY>"
```

This request retrieves global email statistics for the specified date range.

## v2 to v3 API mapping

| v2 Docs URL                                                                 | v2 API URL                                  | v3 Docs URL                                                                                                                  | v3 API URL                                                                |
| --------------------------------------------------------------------------- | ------------------------------------------- | ---------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------- |
| /v2-api                                                                     |                                             | /api-reference/how-to-use-the-sendgrid-v3-api                                                                                |                                                                           |
| /v2-api/using\_the\_web\_api                                                |                                             | /api-reference/how-to-use-the-sendgrid-v3-api                                                                                |                                                                           |
| /v2-api/filter\_settings                                                    | /api/filter.setup.json\|.xml                | /api-reference/settings-mail                                                                                                 | /v3/mail\_settings                                                        |
| /v2-api/profile                                                             |                                             | /api-reference/users-api                                                                                                     | /v3/user/profile                                                          |
| /v2-api/profile#get                                                         | /api/profile.get.json\|.xml                 | /api-reference/users-api/get-a-users-profile                                                                                 | /v3/user/profile                                                          |
| /v2-api/profile#set                                                         | /api/profile.set.json\|.xml                 | /api-reference/users-api/update-a-users-profile                                                                              | /v3/user/profile                                                          |
| /v2-api/profile#setpassword                                                 | /api/password.set.json\|.xml                | /api-reference/users-api/update-your-password                                                                                | /v3/user/profile                                                          |
| /v2-api/profile#setusername                                                 | /api/profile.setUsername.json\|.xml         | /api-reference/users-api/update-your-username                                                                                | /v3/user/username                                                         |
| /v2-api/profile#setusername                                                 | /api/profile.setEmail.json\|.xml            | /api-reference/users-api/update-your-account-email-address                                                                   | /v3/user/email                                                            |
| /v2-api/blocks                                                              |                                             | /api-reference/blocks-api                                                                                                    | /v3/suppression/blocks                                                    |
| /v2-api/blocks#get                                                          | /api/blocks.get.json\|.xml                  | /api-reference/blocks-api/retrieve-all-blocks                                                                                | /v3/suppression/blocks                                                    |
| /v2-api/blocks#delete                                                       | /api/blocks.delete.json\|.xml               | /api-reference/blocks-api/delete-a-specific-block, /api-reference/blocks-api/delete-blocks                                   | /v3/suppression/blocks/\{email}, /v3/suppression/blocks                   |
| /v2-api/blocks#count                                                        | /api/blocks.count.json\|.xml                | /api-reference/blocks-api/retrieve-all-blocks                                                                                | /v3/suppression/blocks                                                    |
| /v2-api/unsubscribes                                                        |                                             | /api-reference/suppressions-global-suppressions                                                                              | /v3/asm/suppressions/global                                               |
| /v2-api/unsubscribes#get                                                    | /api/unsubscribes.get.json\|.xml            | /api-reference/suppressions-global-suppressions/retrieve-all-global-suppressions                                             | /v3/suppression/unsubscribes                                              |
| /v2-api/unsubscribes#delete                                                 | /api/unsubscribes.delete.json\|.xml         | /api-reference/blocks-api/delete-a-specific-block, /api-reference/blocks-api/delete-blocks                                   | /v3/suppression/blocks/\{email}, /v3/suppression/blocks                   |
| /v2-api/unsubscribes#add                                                    | /api/unsubscribes.add.json\|.xml            | /api-reference/suppressions-global-suppressions/add-recipient-addresses-to-the-global-suppression-group                      | /v3/asm/suppressions/global                                               |
| /v2-api/timezone                                                            |                                             | Not Mapped                                                                                                                   |                                                                           |
| /v2-api/timezone#get                                                        | /api/timezone.get.json\|.xml                | Not Mapped                                                                                                                   |                                                                           |
| /v2-api/timezone#edit                                                       | /api/timezone.edit.json\|.xml               | Not Mapped                                                                                                                   |                                                                           |
| /v2-api/timezone#list                                                       | /api/timezone.list.json\|.xml               | Not Mapped                                                                                                                   |                                                                           |
| /v2-api/filter\_commands                                                    |                                             | ui/account-and-settings/mail                                                                                                 |                                                                           |
| /v2-api/filter\_commands#get-available                                      | /api/filter.getavailable.json\|.xml         | ui/account-and-settings/mail                                                                                                 |                                                                           |
| /v2-api/filter\_commands#activate-app                                       | /api/filter.activate.json\|.xml             | ui/account-and-settings/mail                                                                                                 |                                                                           |
| /v2-api/filter\_commands#deactivate-app                                     | /api/filter.deactivate.json\|.xml           | ui/account-and-settings/mail                                                                                                 |                                                                           |
| /v2-api/filter\_commands#setup-app                                          | /api/filter.setup.json\|.xml                | ui/account-and-settings/mail                                                                                                 |                                                                           |
| /v2-api/filter\_commands#get-app-settings                                   | /api/filter.getsettings.json\|.xml          | ui/account-and-settings/mail                                                                                                 |                                                                           |
| /v2-api/bounces                                                             |                                             | /api-reference/bounces-api                                                                                                   | /v3/suppression/bounces                                                   |
| /v2-api/bounces#get                                                         | /api/bounces.get.json\|.xml                 | /api-reference/bounces-api/retrieve-all-bounces                                                                              | /v3/suppression/bounces                                                   |
| /v2-api/bounces#delete                                                      | /api/bounces.delete.json\|.xml              | /api-reference/bounces-api/delete-a-bounce, /api-reference/bounces-api/delete-bounces                                        | /v3/suppression/bounces/\{email}, /v3/suppression/bounces                 |
| /v2-api/bounces#count                                                       | /api/bounces.count.json\|.xml               | /api-reference/bounces-api/retrieve-all-bounces                                                                              | /v3/suppression/bounces                                                   |
| /v2-api/invalid\_emails                                                     |                                             | /api-reference/invalid-e-mails-api                                                                                           | /v3/suppression/invalid\_emails                                           |
| /v2-api/invalid\_emails#get                                                 | /api/invalidemails.get.json\|.xml           | /api-reference/invalid-e-mails-api/retrieve-all-invalid-emails                                                               | /v3/suppression/invalid\_emails                                           |
| /v2-api/invalid\_emails#count                                               | /api/invalidemails.count.json\|.xml         | /api-reference/invalid-e-mails-api/retrieve-all-invalid-emails                                                               | /v3/suppression/invalid\_emails                                           |
| /v2-api/invalid\_emails#delete                                              | /api/invalidemails.delete.json\|.xml        | /api-reference/invalid-e-mails-api/delete-a-specific-invalid-email, /api-reference/invalid-e-mails-api/delete-invalid-emails | /v3/suppression/invalid\_emails/\{email}, /v3/suppression/invalid\_emails |
| /v2-api/spam\_reports                                                       |                                             | /api-reference/spam-reports-api                                                                                              | /v3/suppression/spam\_reports                                             |
| /v2-api/spam\_reports#get                                                   | /api/spamreports.get.json\|.xml             | /api-reference/spam-reports-api/retrieve-all-spam-reports                                                                    | /v3/suppression/spam\_reports                                             |
| /v2-api/spam\_reports#count                                                 | /api/spamreports.count.json\|.xml           | /api-reference/spam-reports-api/retrieve-all-spam-reports                                                                    | /v3/suppression/spam\_reports                                             |
| /v2-api/spam\_reports#delete                                                | /api/spamreports.delete.json\|.xml          | /api-reference/spam-reports-api/delete-a-specific-spam-report, /api-reference/spam-reports-api/delete-spam-reports           | /v3/suppression/spam\_reports/\{email}, /v3/suppression/spam\_reports     |
| /v2-api/customer\_subuser\_api                                              |                                             | /ui/account-and-settings/subusers                                                                                            |                                                                           |
| /v2-api/customer\_subuser\_api/apps                                         |                                             | /api-reference/settings-mail                                                                                                 |                                                                           |
| /v2-api/customer\_subuser\_api/apps#list                                    | /apiv2/customer.apps.json\|.xml             | /api-reference/settings-mail                                                                                                 |                                                                           |
| /v2-api/customer\_subuser\_api/apps#activate-app                            | /apiv2/customer.apps.json\|.xml             | /api-reference/settings-mail                                                                                                 |                                                                           |
| /v2-api/customer\_subuser\_api/apps#deactivate-app                          | /apiv2/customer.apps.json\|.xml             | /api-reference/settings-mail                                                                                                 |                                                                           |
| /v2-api/customer\_subuser\_api/apps#setup-app                               | /apiv2/customer.apps.json\|.xml             | /api-reference/settings-mail                                                                                                 |                                                                           |
| /v2-api/customer\_subuser\_api/apps#get-current-settings                    | /apiv2/customer.apps.json\|.xml             | /api-reference/settings-mail                                                                                                 |                                                                           |
| /v2-api/customer\_subuser\_api/statistics                                   |                                             | /api-reference/stats                                                                                                         | /v3/stats                                                                 |
| /v2-api/customer\_subuser\_api/statistics#retrieve-subuser-statistics       | /apiv2/customer.stats.json\|.xml            | /api-reference/stats/retrieve-global-email-statistics                                                                        | /v3/stats                                                                 |
| /v2-api/customer\_subuser\_api/statistics#retrieve-aggregate-statistics     | /apiv2/customer.stats.json\|.xml            | /api-reference/stats/retrieve-global-email-statistics                                                                        |                                                                           |
| /v2-api/customer\_subuser\_api/statistics#category-list                     | /apiv2/customer.stats.json\|.xml            | /api-reference/categories/retrieve-all-categories                                                                            | /v3/categories                                                            |
| /v2-api/customer\_subuser\_api/statistics#category-statistics               | /apiv2/customer.stats.json\|.xml            | /api-reference/categories/retrieve-email-statistics-for-categories                                                           | /v3/categories                                                            |
| /v2-api/customer\_subuser\_api/statistics#multiple-category-statistics      | /apiv2/customer.stats.json\|.xml            | /api-reference/categories/retrieve-email-statistics-for-categories                                                           | /v3/categories                                                            |
| /v2-api/customer\_subuser\_api/subuser\_spam\_reports                       |                                             | /api-reference/spam-reports-api                                                                                              | /v3/suppression/spam\_reports                                             |
| /v2-api/customer\_subuser\_api/subuser\_spam\_reports#retrieve-spam-reports | /api/user.spamreports.json\|.xml            | /api-reference/spam-reports-api/retrieve-all-spam-reports                                                                    | /v3/suppression/spam\_reports                                             |
| /v2-api/customer\_subuser\_api/subuser\_spam\_reports#delete-spam-reports   | /api/user.spamreports.json\|.xml            | /api-reference/spam-reports-api/delete-spam-reports                                                                          | /v3/suppression/spam\_reports                                             |
| /v2-api/customer\_subuser\_api/subusers                                     |                                             | /ui/account-and-settings/subusers                                                                                            | /v3/subusers                                                              |
| /v2-api/customer\_subuser\_api/subusers#create-a-subuser                    | /apiv2/customer.add.json\|.xml              | /api-reference/subusers-api/create-subuser                                                                                   | /v3/subusers                                                              |
| /v2-api/customer\_subuser\_api/subusers#delete-a-subuser                    | /apiv2/customer.delete.json\|.xml           | /api-reference/subusers-api/delete-a-subuser                                                                                 | /v3/subusers/\{subuser\_name}                                             |
| /v2-api/customer\_subuser\_api/subusers#retrieve-subusers                   | /apiv2/customer.profile.json\|.xml          | /api-reference/users-api/get-a-users-profile                                                                                 | /v3/user/profile                                                          |
| /v2-api/customer\_subuser\_api/subusers#update-subuser-username             | /apiv2/customer.profile.json\|.xml          | /api-reference/users-api/update-your-username                                                                                | /v3/user/username                                                         |
| /v2-api/customer\_subuser\_api/subusers#update-subuser-password             | /apiv2/customer.password.json\|.xml         | /api-reference/users-api/update-your-password                                                                                | /v3/user/password                                                         |
| /v2-api/customer\_subuser\_api/subusers#update-subuser-email-address        | /apiv2/customer.profile.json\|.xml          | /api-reference/users-api/update-your-account-email-address                                                                   | /v3/user/email                                                            |
| /v2-api/customer\_subuser\_api/subusers#update-subuser-profile              | /apiv2/customer.profile.json\|.xml          | /api-reference/users-api/update-a-users-profile                                                                              | /v3/user/profile                                                          |
| /v2-api/customer\_subuser\_api/subusers#disable-a-subuser                   | /apiv2/customer.disable.json\|.xml          | /api-reference/subusers-api/enabledisable-a-subuser                                                                          | /v3/subusers/\{subuser\_name}                                             |
| /v2-api/customer\_subuser\_api/subusers#enable-a-subuser                    | /apiv2/customer.enable.json\|.xml           | /api-reference/subusers-api/enabledisable-a-subuser                                                                          | /v3/subusers/\{subuser\_name}                                             |
| /v2-api/customer\_subuser\_api/subusers#disable-website-access-to-a-subuser | /apiv2/customer.website\_disable.json\|.xml | /api-reference/api-key-permissions/api-key-permissions                                                                       |                                                                           |
| /v2-api/customer\_subuser\_api/subusers#enable-website-access-to-a-subuser  | /apiv2/customer.website\_enable.json\|.xml  | /api-reference/api-key-permissions/api-key-permissions                                                                       |                                                                           |
| /v2-api/customer\_subuser\_api/subuser\_bounces                             |                                             | /api-reference/bounces-api                                                                                                   | /v3/suppression/bounces                                                   |
| /v2-api/customer\_subuser\_api/subuser\_bounces#retrieve-bounces            | /api/user.bounces.json\|.xml                | /api-reference/bounces-api/retrieve-all-bounces                                                                              | /v3/suppression/bounces                                                   |
| /v2-api/customer\_subuser\_api/subuser\_bounces#delete-bounces              | /api/user.bounces.json\|.xml                | /api-reference/bounces-api/delete-bounces                                                                                    | /v3/suppression/bounces                                                   |
| /v2-api/customer\_subuser\_api/ip\_management                               |                                             | /api-reference/ip-access-management                                                                                          | /v3/access\_settings/whitelist                                            |
| /v2-api/customer\_subuser\_api/ip\_management#list                          | /apiv2/customer.ip.json\|.xml               | /api-reference/ip-access-management/retrieve-a-list-of-currently-allowed-ips                                                 | /v3/access\_settings/whitelist                                            |
| /v2-api/customer\_subuser\_api/ip\_management#subuser-ip-list               | /apiv2/customer.sendip.json\|.xml           | /api-reference/ip-access-management/retrieve-a-list-of-currently-allowed-ips                                                 | /v3/access\_settings/whitelist                                            |
| /v2-api/customer\_subuser\_api/ip\_management#subuser-ip-assignment         | /apiv2/customer.sendip.json\|.xml           | /api-reference/ip-access-management/add-one-or-more-ips-to-the-allow-list                                                    | /v3/access\_settings/whitelist                                            |
| /v2-api/customer\_subuser\_api/subuser\_unsubscribes                        |                                             | /api-reference/suppressions-suppressions                                                                                     | /v3/asm/suppressions/global                                               |
| /v2-api/customer\_subuser\_api/subuser\_unsubscribes#retrieve-unsubscribes  | /api/user.unsubscribes.json\|.xml           | /api-reference/suppressions-suppressions/retrieve-all-suppressions                                                           | /v3/asm/suppressions/global                                               |
| /v2-api/customer\_subuser\_api/subuser\_unsubscribes#delete-unsubscribes    | /api/user.unsubscribes.json\|.xml           | /api-reference/suppressions-suppressions/delete-a-suppression-from-a-suppression-group                                       | /v3/asm/groups/\{group\_id}/suppressions/\{email}                         |
| /v2-api/customer\_subuser\_api/subuser\_unsubscribes#add-unsubscribes       | /api/user.unsubscribes.json\|.xml           | /api-reference/suppressions-suppressions/add-suppressions-to-a-suppression-group                                             | /v3/asm/groups/\{group\_id}/suppressions/\{email}                         |
| /v2-api/customer\_subuser\_api/account\_limits                              |                                             | /ui/account-and-settings/subusers                                                                                            |                                                                           |
| /v2-api/customer\_subuser\_api/account\_limits#retrieve                     | /apiv2/customer.limit.json\|.xml            | /ui/account-and-settings/subusers                                                                                            |                                                                           |
| /v2-api/customer\_subuser\_api/account\_limits#no-limit                     | /apiv2/customer.limit.json\|.xml            | /ui/account-and-settings/subusers                                                                                            |                                                                           |
| /v2-api/customer\_subuser\_api/account\_limits#recurring-reset              | /apiv2/customer.limit.json\|.xml            | /ui/account-and-settings/subusers                                                                                            |                                                                           |
| /v2-api/customer\_subuser\_api/account\_limits#total-credits                | /apiv2/customer.limit.json\|.xml            | /ui/account-and-settings/subusers                                                                                            |                                                                           |
| /v2-api/customer\_subuser\_api/account\_limits#increment-credits            | /apiv2/customer.limit.json\|.xml            | /ui/account-and-settings/subusers                                                                                            |                                                                           |
| /v2-api/customer\_subuser\_api/account\_limits#decrement-credits            | /apiv2/customer.limit.json\|.xml            | /ui/account-and-settings/subusers                                                                                            |                                                                           |
| /v2-api/customer\_subuser\_api/domain-authentication                        |                                             | /ui/account-and-settings/how-to-set-up-domain-authentication                                                                 |                                                                           |
| /v2-api/customer\_subuser\_api/domain-authentication#list                   | /apiv2/customer.whitelabel.json\|.xml       | /ui/account-and-settings/how-to-set-up-domain-authentication                                                                 |                                                                           |
| /v2-api/customer\_subuser\_api/domain-authentication#attach                 | /apiv2/customer.whitelabel.json\|.xml       | /ui/account-and-settings/how-to-set-up-domain-authentication                                                                 |                                                                           |
| /v2-api/customer\_subuser\_api/authenticate\_a\_subuser                     | /apiv2/customer.auth.json\|.xml             | Not Mapped                                                                                                                   |                                                                           |
| /v2-api/customer\_subuser\_api/invalid\_emails                              |                                             | /api-reference/invalid-e-mails-api                                                                                           | /v3/suppression/invalid\_emails                                           |
| /v2-api/customer\_subuser\_api/invalid\_emails#retrieve-invalid-emails      | /apiv2/customer.invalidemails.json\|.xml    | /api-reference/invalid-e-mails-api/retrieve-all-invalid-emails                                                               | /v3/suppression/invalid\_emails                                           |
| /v2-api/customer\_subuser\_api/invalid\_emails#delete-invalid-emails        | /apiv2/customer.invalidemails.json\|.xml    | /api-reference/invalid-e-mails-api/delete                                                                                    | /v3/suppression/invalid\_emails                                           |
| /v2-api/customer\_subuser\_api/invalid\_emails#delete-invalid-emails        | /apiv2/customer.invalidemails.json\|.xml    | /api-reference/invalid-e-mails-api/delete-invalid-emails                                                                     | /v3/suppression/invalid\_emails                                           |
| /v2-api/customer\_subuser\_api/parse\_settings                              |                                             | /api-reference/settings-inbound-parse                                                                                        | /v3/user/webhooks/parse/settings                                          |
| /v2-api/customer\_subuser\_api/parse\_settings#get-current-settings         | /apiv2/customer.parse.json\|.xml            | /api-reference/settings-inbound-parse/retrieve-all-parse-settings                                                            | /v3/user/webhooks/parse/settings                                          |
| /v2-api/customer\_subuser\_api/parse\_settings#create-new-entry             | /apiv2/customer.parse.json\|.xml            | /api-reference/settings-inbound-parse/create-a-parse-setting                                                                 | /v3/user/webhooks/parse/settings                                          |
| /v2-api/customer\_subuser\_api/parse\_settings#edit-entry                   | /apiv2/customer.parse.json\|.xml            | /api-reference/settings-inbound-parse/update-a-parse-setting                                                                 | /v3/user/webhooks/parse/settings/\{hostname}                              |
| /v2-api/customer\_subuser\_api/parse\_settings#delete-entry                 | /apiv2/customer.parse.json\|.xml            | /api-reference/settings-inbound-parse/delete-a-parse-setting                                                                 | /v3/user/webhooks/parse/settings/\{hostname}                              |
| None                                                                        | /apiv2/customer.geturl.json\|.xml           | Not Mapped                                                                                                                   | Not Available                                                             |
| None                                                                        | /apiv2/customer.list.json\|.xml             | /api-reference/subusers-api/list-all-subusers                                                                                | /v3/subusers                                                              |
| None                                                                        | /api/categories.get.json\|.xml              | /api-reference/categories/retrieve-email-statistics-for-categories                                                           | /v3/categories/stats                                                      |
| None                                                                        | /apiv2/customer.bounces.json\|.xml          | /api-reference/bounces-api                                                                                                   |                                                                           |
| None                                                                        | /apiv2/customer.unsubscribes.json\|.xml     | /api-reference/suppressions-global-suppressions                                                                              |                                                                           |
| None                                                                        | /apiv2/customer.spamreports.json\|.xml      | /api-reference/spam-reports-api                                                                                              |                                                                           |
| None                                                                        | /apiv2/customer.blocks.json\|.xml           | /api-reference/blocks-api                                                                                                    |                                                                           |
| None                                                                        | /api/parse.delete.json\|.xml                | /api-reference/settings-inbound-parse                                                                                        |                                                                           |
| None                                                                        | /api/parse.set.json\|.xml                   | /api-reference/settings-inbound-parse                                                                                        |                                                                           |
| None                                                                        | /api/category.stats.json\|.xml              | /api-reference/categories/retrieve-email-statistics-for-categories                                                           | /v3/categories/stats                                                      |
| None                                                                        | /api/stats.get.json\|.xml                   | /api-reference/stats/retrieve-global-email-statistics                                                                        | /v3/stats                                                                 |
| None                                                                        | /api/stats.getAdvanced.json\|.xml           | /api-reference/stats/retrieve-global-email-statistics                                                                        | /v3/stats                                                                 |
| None                                                                        | /api/stats.old.json\|.xml                   | /api-reference/stats/retrieve-global-email-statistics                                                                        | /v3/stats                                                                 |
| None                                                                        | /api/category.stats.csv                     | /api-reference/categories/retrieve-email-statistics-for-categories                                                           | /v3/categories/stats                                                      |
| None                                                                        | /api/category.list.json\|.xml               | /api-reference/categories/retrieve-all-categories                                                                            | /v3/categories                                                            |
| None                                                                        | /api/unsubscribes.get.csv                   | /api-reference/suppressions-global-suppressions/retrieve-all-global-suppressions                                             | /v3/suppression/unsubscribes                                              |
