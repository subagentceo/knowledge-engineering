# Submitting Events

## Submit an Event

```curl
$ curl https://api.intercom.io/events \
-X POST \
-H 'Authorization:Bearer <Your access token>' \
-H "Content-Type: application/json" -d'
{
  "event_name" : "invited-friend",
  "created_at": 1391691571,
  "user_id" : "314159"
}'

HTTP/1.1 202 Accepted
```

```javascript
Intercom('trackEvent', 'invited-friend');
```

```ruby
intercom.events.create(event_name: "invited-friend", email: user.email, created_at: 1391691571)
```

```php
<?php
$intercom->events->create([
    "event_name" => "php-test",
    "created_at" => 1500907513,
    "user_id" => "1276"
]);
?>
```

```java
Event event = new Event()
  .setEventName("invited-friend")
  .setCreatedAt(1234L)
  .setUserID("314159");

Event.create(event);
```

You will need an Access Token that has write permissions to send Events. Once you have a key you can submit events via POST to the Events resource, which is located at `https://api.intercom.io/events`, or you can send events using one of the client libraries. When working with the HTTP API directly a client should send the event with a `Content-Type` of `application/json`.

When using the JavaScript API, [adding the code to your app](https://www.intercom.com/help/en/configuring-Intercom/tracking-user-events-in-your-app) makes the Events API available. Once added, you can submit an event using the `trackEvent` method. This will associate the event with the Lead or currently logged-in user or logged-out visitor/lead and send it to Intercom. The final parameter is a map that can be used to send optional metadata about the event.

With the Ruby client you pass a hash describing the event to `Intercom::Event.create`, or call the `track_user` method directly on the current user object (e.g. `user.track_event`).

Lead Events
When submitting events for Leads, you will need to specify the Lead's `id`.

### HTTP API Responses

- Successful responses to submitted events return `202 Accepted` with an empty body.
- Unauthorised access will be rejected with a `401 Unauthorized` or `403 Forbidden` response code.
- Events sent about users that cannot be found will return a `404 Not Found`.
- Server errors will return a `500` response code and may contain an error message in the body.