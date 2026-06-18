# Event Metadata Types

## Event Metadata Types

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

```text
# The metadata key values in the example
# are treated as follows-
#
# - order_date: a Date
#    (key ends with '_date').
#
# - stripe_invoice: The identifier of the Stripe invoice
#     (has a 'stripe_invoice' key)
#
# - order_number: Rich Link
#     (contains 'url' and 'value')
#
# - price: Amount in US Dollars
#     (contains 'amount' and 'currency')
```

Metadata Objects support a few simple types that Intercom can present on your behalf -

| Type | Description | Example |
|  --- | --- | --- |
| String | The value is a JSON String | `"source":"desktop"` |
| Number | The value is a JSON Number | `"load": 3.67` |
| Date | The key ends with the String `_date` and the value is a [Unix timestamp](http://en.wikipedia.org/wiki/Unix_time), assumed to be in the [UTC](http://en.wikipedia.org/wiki/Coordinated_Universal_Time) timezone. | `"contact_date": 1392036272` |
| Link | The value is a HTTP or HTTPS URI. | `"article": "https://example.org/ab1de.html"` |
| Rich Link | The value is a JSON object that contains `url` and `value` keys. | `"article": {"url": "https://example.org/ab1de.html", "value":"the dude abides"}` |
| Stripe Data | The key is one of - 'stripe_customer', 'stripe_invoice', 'stripe_charge'. The value is a Stripe identifier. | `"stripe_customer": "cus_42424242424"` |
| Monetary Amount | The value is a JSON object that contains `amount` and `currency` keys. The `amount` key is a positive integer representing the amount in cents. The price in the example to the right denotes €349.99. | `"price": {"amount": 34999, "currency": "eur"}` |


### API Responses

- Successful responses to submitted events return `202 Accepted` with an empty body.
- Unauthorised access will be rejected with a `401 Unauthorized` or `403 Forbidden` response code.
- Events sent about users that cannot be found will return a `404 Not Found`.
- Event lists containing duplicate events will have those duplicates ignored.
- Server errors will return a `500` response code and may contain an error message in the body.