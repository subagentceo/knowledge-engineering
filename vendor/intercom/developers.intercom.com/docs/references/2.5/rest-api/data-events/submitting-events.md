# Submit a data event

## Submit an Event

```curl
$ curl https://api.intercom.io/events \
-X POST \
-H 'Authorization:Bearer <Your access token>' \
-H "Content-Type: application/json" -d'
{
  "event_name" : "placed-order",
  "created_at": 1389913941,
  "user_id": "314159",
  "metadata": {
    "order_date": 1392036272,
    "stripe_invoice": "inv_3434343434",
    "order_number": {
      "value":"3434-3434",
      "url": "https://example.org/orders/3434-3434"
    },
    "price": {
      "currency":"usd",
      "amount": 2999
    }
  }
}'
```

```javascript
var more_metadata = {
  order_date: 1392036272,
  stripe_invoice: 'inv_3434343434',
  order_number: {
    value: "3434-3434",
    url: 'https://example.org/orders/3434-3434'
  },
  price: {
    currency: 'usd',
    amount: 2999
  }
};
Intercom('trackEvent', 'placed-order', more_metadata);
```

```ruby
more_metadata = {
  :order_date => Time.now.to_i,
  :stripe_invoice => 'inv_3434343434',
  :order_number => {
    :value => '3434-3434',
    :url => 'https://example.org/orders/3434-3434'
  },
  price: {
    :currency => 'usd',
    :amount => 2999
  }
}
intercom.events.create({
  :event_name => "placed-order",
  :email => current_user.email,
  :created_at => 1391691571,
  :metadata => more_metadata
})
```

```php
<?php
$metadata = ([
    "order_date" => time(),
    "stripe_invoice" => "inv_3434343434",
    "order_number" => ([
        "value" => "3434-3434",
        "url" => "https://example.org/orders/3434-3434"]),
        "price" => ([
            "currency" => "usd",
            "amount" => 2999])
]);

$intercom->events->create([
    "event_name" => "placed-order",
    "created_at" => 1500907515,
    "user_id" => "20413",
    "metadata" => $metadata
]);
?>
```

```java
Map<String,Object> order = Maps.newHashMap();
order.put("value", "3434-3434");
order.put("url", "https://example.org/orders/3434-3434");

Map<String,Object> price = Maps.newHashMap();
price.put("currency", "usd");
price.put("amount", 2999);

Map<String,Object> meta = Maps.newHashMap();
meta.put("order_date", currentTimeMillis()/1000L);
meta.put("stripe_invoice", "inv_3434343434");
meta.put("price", price);
meta.put("order_number", order);

Event event = new Event()
  .setEventName("placed-order")
  .setUserID("314159")
  .setMetadata(meta);

Event.create(event);
```

You will need an Access Token that has write permissions to send Events. Once you have a key you can submit events via POST to the Events resource, which is located at `https://api.intercom.io/events`, or you can send events using one of the client libraries. When working with the HTTP API directly a client should send the event with a `Content-Type` of `application/json`.

When using the JavaScript API, [adding the code to your app](https://www.intercom.com/help/en/configuring-Intercom/tracking-user-events-in-your-app) makes the Events API available. Once added, you can submit an event using the `trackEvent` method. This will associate the event with the Lead or currently logged-in user or logged-out visitor/lead and send it to Intercom. The final parameter is a map that can be used to send optional metadata about the event.

With the Ruby client you pass a hash describing the event to `Intercom::Event.create`, or call the `track_user` method directly on the current user object (e.g. `user.track_event`).

## Metadata Object

| Type | Description | Example |
|  --- | --- | --- |
| String | The value is a JSON String | `"source":"desktop"` |
| Number | The value is a JSON Number | `"load": 3.67` |
| Date | The key ends with the String `_date` or `_at` and the value is a [Unix timestamp](http://en.wikipedia.org/wiki/Unix_time), assumed to be in the [UTC](http://en.wikipedia.org/wiki/Coordinated_Universal_Time) timezone. | `"contact_date": 1392036272` or `"contacted_at": 1392036272` |
| Link | The value is a HTTP or HTTPS URI. | `"article": "[https://example.org/ab1de.html](https://example.org/ab1de.html)" |
| Rich Link | The value is a JSON object that contains `url` and `value` keys. | `"article": {"url": "https://example.org/ab1de.html", "value":"the dude abides"}` |
| Monetary Amount | The value is a JSON object that contains `amount` and `currency` keys. The `amount` key is a positive integer representing the amount in cents. The price in the example to the right denotes €349.99. | `"price": {"amount": 34999, "currency": "eur"}` |


**NB: For the JSON object types, please note that we do not currently support nested JSON structure.**

Lead Events
When submitting events for Leads, you will need to specify the Lead's `id`.

Metadata behaviour
We currently limit the number of tracked metadata keys to 20 per event. Once the quota is reached, we ignore any further keys we receive. The first 20 metadata keys are determined by the order in which they are sent in with the event.\n_ It is not possible to change the metadata keys once the event has been sent. A new event will need to be created with the new keys and you can archive the old one.\n_ There might be up to 24 hrs delay when you send a new metadata for an existing event.

Event de-duplication
The API may detect and ignore duplicate events. Each event is uniquely identified as a combination of the following data - the Workspace identifier, the Contact external identifier, the Data Event name and the Data Event created time. As a result, it is **strongly recommended** to send a second granularity Unix timestamp in the `created_at` field.\n\nDuplicated events are responded to using the normal `202 Accepted` code - an error is not thrown, however repeat requests will be counted against any rate limit that is in place.

### HTTP API Responses

- Successful responses to submitted events return `202 Accepted` with an empty body.
- Unauthorised access will be rejected with a `401 Unauthorized` or `403 Forbidden` response code.
- Events sent about users that cannot be found will return a `404 Not Found`.
- Event lists containing duplicate events will have those duplicates ignored.
- Server errors will return a `500` response code and may contain an error message in the body.