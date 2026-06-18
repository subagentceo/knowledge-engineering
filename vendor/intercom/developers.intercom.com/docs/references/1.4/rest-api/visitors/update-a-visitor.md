# Update a Visitor

## Example Request

```curl
$ curl https://api.intercom.io/visitors \
-X PUT \
-H 'Authorization:Bearer <Your access token>'  \
-H 'Accept: application/json' \
-H 'Content-Type: application/json' -d '
{
  "user_id": "124",
  "name": "Joe Example",
  "custom_attributes": {
    "paid_subscriber" : true,
    "monthly_spend": 155.5,
    "team_mates": 9
  }
}'
```

```curl
HTTP/1.1 200 OK

# contact response
```

```ruby
visitor.name = "Joe Example"
visitor.custom_attribute[:foo] = 'bar'
intercom.visitors.save(visitor)
```

Sending a PUT request to `/visitors` and passing identifiers (user_id or id) in the body will result in an update of an existing Visitor.

It is not possible to uniquely identify a Visitor for an update with an email address. Including an email address in the PUT request will result in converting the Visitor to a Lead.