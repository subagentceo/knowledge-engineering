# List all data events

Please note that you can only 'list' events that are less than 90 days old. Event counts and summaries will still include your events older than 90 days but you cannot 'list' these events individually if they are older than 90 days

## List all customer events

```curl
$ curl 'https://api.intercom.io/events?type=user&user_id=314159' \\\n-H 'Authorization:Bearer <Your access token>' \\\n-H 'Accept: application/json'
```

```curl
HTTP/1.1 200 OK\n\n{\n  \"type\": \"event.list\",\n  \"events\": [\n      {\n        \"event_name\" : \"ordered-item\",\n        \"created_at\": 1391691571,\n        \"user_id\" : \"314159\"\n      },\n      {\n        \"event_name\" : \"invited-friend\",\n        \"created_at\": 1389913941,\n        \"user_id\" : \"314159\",\n        \"metadata\": {\n         \"invitee_email\": \"pi@example.org\",\n         \"invite_code\": \"ADDAFRIEND\"\n         }\n      },\n     ...\n   ],\n  \"pages\": {\n    \"next\": \"https://api.intercom.io/events?type=user&intercom_user_id=55a3b&before=144474756550\"\n  }\n}\n\n# NB: Full event objects are returned
```

```ruby
intercom.events.find_all(\"type\" => \"user\", \"intercom_user_id\" => \"123abc\")
```

```php
<?php\n$events = $intercom->events->getEvents([\"user_id\" => \"20413\"]);\nforeach ($events->events as $event) {\n    print \"id:\".$event->id.\" name:\".$event->event_name.\"\\n\";\n}?>
```

```java
// Not exposed in Java client
```

The events belonging to a customer can be listed by sending a GET request to `https://api.intercom.io/events` with a user or lead identifier along with a `type` parameter. The identifier parameter can be one of `user_id`, `email` or `intercom_user_id`. The `type` parameter value must be `user`.

- `https://api.intercom.io/events?type=user&user_id={user_id}`
- `https://api.intercom.io/events?type=user&email={email}`
- `https://api.intercom.io/events?type=user&intercom_user_id={id}` (this call can be used to list leads)


The `email` parameter value should be [url encoded](http://en.wikipedia.org/wiki/Percent-encoding) when sending.

You can optionally define the result page size as well with the `per_page` parameter.

### Request Parameters

| Parameter | Required | Description |
|  --- | --- | --- |
| type | yes | The value must be `user` |
| user_id | no | The user id you have defined for the user |
| email | no | The email you have defined for the user |
| intercom_user_id | no | The Intercom defined id for the user |
| per_page | no | How many results to return per page *defaults to 50*. |
| summary | no | Boolean value. When set to true, event counts are returned grouped by event name. |


### Returns

A pageable list of events. The event list contains a `pages` object that indicates if more events exist for the customer via the `next` field, whose value is a URL that can be used to fetch the next page. If the `next` field is not present, that indicates there are no further events for the user. Clients should note that the parameters in the returned link are not assured to be the same as those sent in the request.

The event list is sorted by the created_at field and ordered descending, most recently created first.

As well as the fields that were supplied when the event was posted to Intercom (see [Event model](/docs/references/2.5/rest-api/data-events/event-model) for details) the event payload will also contain an `id` field that uniquely identifies the event and may optionally contain an `intercom_user_id` containing the Intercom defined id representing the user.

You can use the API to get counts of users, leads and companies filtered by certain criteria.

Counts are a good way to periodically obtain data for the purposes of tracking rates of change in user and company data.