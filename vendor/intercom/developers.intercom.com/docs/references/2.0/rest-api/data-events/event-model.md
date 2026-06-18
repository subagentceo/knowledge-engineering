# The data event model

## Event Object

```json
{
  "event_name" : "invited-friend",
  "created_at": 1389913941,
  "user_id": "342311"
}
```

```javascript
// Sufficient to send just the event name
Intercom('trackEvent', 'invited-friend');
```

```ruby
# create an event as a hash
event = {
  :event_name => "invited-friend",
  :email => current_user.email,
  :created_at => 1391691571
}
intercom.events.create event
```

```php
<?php
$event = array(
  "event_name" => "invited-friend",
  "created_at" => 1391691571,
  "user_id" => "314159"
);
$intercom->events->create($event);
?>
```

```java
Event event = new Event()
  .setEventName("invited-friend")
  .setUserID("1314159");
  .setCreatedAt(currentTimeMillis()/1000L);

Event.create(event);
```

Events are how you can submit user activity to Intercom. Once you're sending Intercom event data, you can filter your user base with those events and create Auto Messages to send whenever an event occurs. Every event is associated with an event name, the time it happened, the user that caused the event, and optionally some extra metadata. Events record the count, first and last occurrence of an event.

Events are different to [Custom Attributes](https://www.intercom.com/help/en/Your-users-data/your-users-data-in-intercom) in that events are information on what Users did and when they did it, whereas Custom Attributes represent the User's current state as seen in their profile. For example, the first time they subscribed to a paid plan, or the most recent time they changed their plan would be represented by events, whereas a User Attribute would be used to record their current plan.

Because Events are used for filtering and messaging, and event names are used directly in Intercom by your App's Admins we recommend sending high-level activity about your users that you would like to message on, rather than raw clickstream or user interface actions. For example an order action is a good candidate for an Event, versus all the clicks and actions that were taken to get to that point. We also recommend sending event names that combine a past tense verb and nouns, such as 'created-project'.

The Events API varies slightly from the rest of the APIs as follows -

- You can submit events using JavaScript using the `trackEvent` method.
- When there's an error or errors, a list structure is returned instead of a single error.


## Event Object

| Attribute | Required | Description |
|  --- | --- | --- |
| event_name | yes | The name of the event that occurred. This is presented to your App's admins when filtering and creating segments - a good event name is typically a past tense 'verb-noun' combination, to improve readability, for example `updated-plan`. |
| created_at | yes | The time the event occurred as a UTC Unix timestamp |
| user_id | yes if no email | Your identifier for the user. |
| id | yes if no email or user_id. | Your identifier for a lead or a user. |
| email | yes if no user_id | An email address for your user. An email should only be used where your application uses email to uniquely identify users |
| metadata | no | optional metadata about the event. |


The `event_name` field is processed as follows -

- Names are treated as case insensitive - 'Completed-Order' and 'completed-order' will be considered the same event for your application.
- Periods (.) and dollars ($) in event names are replaced with hyphens. e.g., 'completed.order' will be stored as 'completed-order'.


To avoid confusion we recommend submitting lower case event names that do not contain periods or dollars!

### Metadata Object

**Sending an event with metadata**

```curl
$ curl https://api.intercom.io/events \
-X POST \
-H 'Authorization:Bearer <Your access token>' \
-H "Content-Type: application/json" -d'
{
  "event_name" : "invited-friend",
  "created_at": 1389913941,
  "user_id": "314159",
  "metadata": {
     "invitee_email": "pi@example.org",
     "invite_code": "ADDAFRIEND"
  }
}'
```

```javascript
var metadata = {
  invitee_email: 'pi@example.org',
  invite_code: 'ADDAFRIEND'
};
Intercom('trackEvent', 'invited-friend', metadata);
```

```ruby
metadata = {
  :invitee_email => 'pi@example.org',
  :invite_code => 'ADDAFRIEND'
}
intercom.events.create {
  :event_name => "invited-friend",
  :email => current_user.email,
  :created_at => 1391691571,
  :metadata => metadata
}
```

```php
<?php
$metadata = array(
  "invitee_email" => "pi@example.org",
  "invite_code" => "ADDAFRIEND"
);
$intercom->events->create(array(
  "event_name" => "invited-friend",
  "created_at" => 1391691571,
  "user_id" => "314159",
  "metadata" => $metadata
));
?>
```

```java
Event event = new Event()
  .setEventName("invited-friend")
  .setUserID("314159")
  .putMetadata("invite_mail", "pi@example.org")
  .putMetadata("invite_code", "ADDAFRIEND")
  .putMetadata("found_date", currentTimeMillis()/1000L);

Event.create(event);
```

Metadata can be used to submit an event with extra key value data. Each event can contain up to **ten** metadata key values.

Some use cases for event metadata are -

- Linking an event back to a page in your website.
- Describing before and after values for a subscription plan change.
- Sending contextual information about an online order, a booking.


You can now trigger messages to your users based on event and event metadata and also include the metadata in the messages. For more information on how this works, **[learn more about event based messaging](https://www.intercom.com/help/en/articles/5180516-trigger-messages-based-on-events)**

See the section 'Metadata Types' for more information on the kinds of metadata you can send.