# Changelog (v2.13)

For changes that have been updated across all version, see the [Unversioned changes](/docs/build-an-integration/learn-more/rest-apis/unversioned-changes) page.

## New API Endpoints

### Custom Object Instances API

We added a new API that allows you to:

- [Create or Update](https://developers.intercom.com/docs/references/rest-api/api.intercom.io/custom-object-instances/createcustomobjectinstances) a Custom Object instance
- Retrieve a Custom Object instance [by ID](https://developers.intercom.com/docs/references/rest-api/api.intercom.io/custom-object-instances/getcustomobjectinstancesbyid) or by [external ID](https://developers.intercom.com/docs/references/rest-api/api.intercom.io/custom-object-instances/getcustomobjectinstancesbyexternalid)
- Delete a Custom Object instance [by ID](https://developers.intercom.com/docs/references/rest-api/api.intercom.io/custom-object-instances/deletecustomobjectinstancesbyid) or by [external ID](https://developers.intercom.com/docs/references/rest-api/api.intercom.io/custom-object-instances/deletecustomobjectinstancesbyexternalid)


### Get Contact by External ID

With the new [get a contact by external_id](https://developers.intercom.com/docs/references/rest-api/api.intercom.io/Contacts/ShowContactByExternalId/) endpoint, you can fetch the details of a single contact by using their `external_id`. This ID is the unique identifier you set when you created the contact, so it's helpful if you don't easily have access to the Intercom provisioned ID.

details
summary
Try Getting a Contact by External ID
### Block contact API

You can now block a contact via the [Block Contact API](https://developers.intercom.com/docs/references/rest-api/api.intercom.io/contacts/blockcontact)

details
summary
Try Blocking a contact
### Delete a conversation

You can now [delete a conversation](https://developers.intercom.com/docs/references/rest-api/api.intercom.io/conversations/deleteconversation) using the ID assigned by Intercom when the conversation was created.

details
summary
Try Deleting a conversation
### Delete a ticket

You can [delete a ticket](https://developers.intercom.com/docs/references/rest-api/api.intercom.io/Tickets/deleteTicket/) using the ID assigned by Intercom when the ticket was created.

details
summary
Try Deleting a ticket
```curl
curl -i -X DELETE \
  'https://api.intercom.io/tickets/{id}' \
  -H 'Authorization: Bearer <YOUR_TOKEN_HERE>' \
  -H 'Intercom-Version: 2.13'
```

```javascript
import fetch from 'node-fetch';

async function run() {
  const id = 'YOUR_id_PARAMETER';
  const resp = await fetch(
    `https://api.intercom.io/tickets/${id}`,
    {
      method: 'DELETE',
      headers: {
        'Intercom-Version': '2.13',
        Authorization: 'Bearer <YOUR_TOKEN_HERE>'
      }
    }
  );

  const data = await resp.text();
  console.log(data);
}

run();
```

```ruby
require 'uri'
require 'net/http'
require 'openssl'

id = 'YOUR_id_PARAMETER'
url = URI('https://api.intercom.io/tickets/' + id)

http = Net::HTTP.new(url.host, url.port)
http.use_ssl = true

request = Net::HTTP::Delete.new(url)
request['Intercom-Version'] = '2.13'
request['Authorization'] = 'Bearer <YOUR_TOKEN_HERE>'

response = http.request(request)
puts response.read_body
```

```php
const id = "YOUR_id_PARAMETER";
$curl = curl_init();

curl_setopt_array($curl, [
  CURLOPT_HTTPHEADER => [
    "Authorization: Bearer <YOUR_TOKEN_HERE>",
    "Intercom-Version: 2.13"
  ],
  CURLOPT_URL => "https://api.intercom.io/tickets/" . id,
  CURLOPT_RETURNTRANSFER => true,
  CURLOPT_CUSTOMREQUEST => "DELETE",
]);

$response = curl_exec($curl);
$error = curl_error($curl);

curl_close($curl);

if ($error) {
  echo "cURL Error #:" . $error;
} else {
  echo $response;
}
```

```python
import requests

id = "YOUR_id_PARAMETER"
url = "https://api.intercom.io/tickets/" + id

headers = {
  "Intercom-Version": "2.13",
  "Authorization": "Bearer <YOUR_TOKEN_HERE>"
}

response = requests.delete(url, headers=headers)

data = response.json()
print(data)
```

## Backwards Compatible Changes

### Added ability to associate custom object instances with contacts / conversations

Permission Requirements
From now on, to access this endpoint, you need additional permissions. Please head over to the [Developer Hub](https://app.intercom.com/a/apps/_/developer-hub) app package authentication settings to configure the required permissions.

You can now create associations between custom object instances and:

- [Contacts](https://developers.intercom.com/docs/references/rest-api/api.intercom.io/contacts/updatecontact)
- [Conversations](https://developers.intercom.com/docs/references/rest-api/api.intercom.io/conversations/updateconversation)


### Additional fields in Conversations API

We added new fields to the response of the [Retrieve a conversation](https://developers.intercom.com/docs/references/rest-api/api.intercom.io/Conversations/retrieveConversation/) endpoint.

1. Response and handling time metrics
  - `assigned_team_first_response_time`
  - `assigned_team_first_response_time_in_office_hours`
  - `handling_time`
2. Email metadata (***Only** for conversation parts sent as emails.*)
  - `email_message_metadata`
3. Curent conversation state and workflow/action details
  - `state`
  - `tags`
  - `event_details`
These fields are available when the conversation part has one of the following `part_type` values:
  - `conversation_attribute_updated_by_workflow`
  - `conversation_attribute_updated_by_admin`
  - `custom_action_started`
  - `custom_action_finished`
  - `operator_workflow_event`


details
summary
See the new fields when you retrieve a conversation
### Added new field `app_package_code` to conversation_part and ticket_part response

We added a new field `app_package_code` to the `conversation_part` and `ticket_part` response objects. This field will return the code of the app package that created the conversation part or ticket part via API.

For conversations, when the part is **not** created via API, the `app_package_code` will be `null`.

For tickets, when the part is **not** created via API, the `app_package_code` field won't exist in the response.

### Skip notifications when creating, updating, or replying to a Ticket

By default, when a ticket is created, the contacts and teammates involved will [receive notifications about the ticket](https://www.intercom.com/help/en/articles/8300308-how-customers-get-notified-about-tickets) in the Help Desk, Messenger, and email. There are cases where you may not want them to receive these notifications, for instance if you are importing tickets into your Intercom workspace.

With the `skip_notifications` flag, you can now control whether the notification will be sent on a per-request basis. This will prevent you from having to turn off contacts notifications globally when making updates via the API. It will also prevent teammate notifications on desktop, mobile, and email.

This flag is available on the [create a ticket](https://developers.intercom.com/docs/references/rest-api/api.intercom.io/Tickets/createTicket/), [update a ticket](https://developers.intercom.com/docs/references/rest-api/api.intercom.io/Tickets/updateTicket/), and [reply to a ticket](https://developers.intercom.com/docs/references/rest-api/api.intercom.io/Tickets/replyTicket/) endpoints.

Here's an example of how it works. You can set it to `true` to enable it, or leave it as `false` by default.

```curl
curl -i -X POST \
  https://api.intercom.io/tickets \
  -H 'Authorization: Bearer <YOUR_TOKEN_HERE>' \
  -H 'Content-Type: application/json' \
  -H 'Intercom-Version: 2.13' \
  -d '{
    "ticket_type_id": 1,
    "contacts": [
      {
        "id": "663a200f0a29ce1b24741068"
      }
    ],
    "ticket_attributes": {
      "_default_title_": "help!",
      "_default_description_": "there is a problem"
    },
    "skip_notifications": true
  }'
```