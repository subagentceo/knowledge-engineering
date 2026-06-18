# View a Visitor

## Example ID Request

```curl
$ curl \
-s https://api.intercom.io/visitors/573479f784c5acde6a000575 \   
-H 'Authorization:Bearer <Your access token>' \
-H 'Accept:application/json'

or 

$ curl \
-s https://api.intercom.io/visitors\?user_id\=16e690c0-485a-4e87-ae98-a326e788a4f7 \
-H 'Authorization:Bearer <Your access token>' \
-H 'Accept:application/json'
```

```curl
HTTP/1.1 200 OK

{
  "type": "visitor",
  "id": "573479f784c5acde6a000575",
  "user_id": "16e690c0-485a-4e87-ae98-a326e788a4f7",
  "email": "joe@example.com",
  "name": "Joe Example",
  ...
}
# NB: Full Visitor objects are returned
```

```ruby
visitor = intercom.visitors.find(:id => "530370b477ad7120001d")
visitor = intercom.visitors.find(:user_id => "8a88a590-e1c3-41e2-a502-e0649dbf721c")
```

Visitors can be looked up individually via their `id`, or with a `user_id` parameter.
To get the visitor `user_id` from the browser you can use the [Intercom JS SDK](https://docs.intercom.io/configure-intercom-for-your-product-or-site/customize-the-intercom-messenger/the-intercom-javascript-api) following method : `Intercom('getVisitorId')`.