# Update a visitor

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

{
  "user_id": "124",
  "name": "Joe Example",
  "custom_attributes": {
    "paid_subscriber" : true,
    "monthly_spend": 155.5,
    "team_mates": 9
  }
  
  # and the rest of the Visitor model
}'
```

```ruby
visitor.name = "Joe Example"
visitor.custom_attribute[:foo] = 'bar'
intercom.visitors.save(visitor)
```

Sending a PUT request to `/visitors` and passing identifiers (user_id or id) in the body will result in an update of an existing Visitor.

### Request Body Parameters

| Argument | Type | Required? | Description |
|  --- | --- | --- | --- |
| id | String | One of | A unique identified for the visitor which is given by Intercom. |
| user_id | String | One of | A unique identified for the visitor which is given by you. |
| name | String | No | The visitor's name. |
| custom_attributes | Object | No | The custom attributes which are set for the visitor. |


### Response

This will return a [Visitor Model](/docs/references/2.5/rest-api/visitors/visitor-object) of the visitor you just updated.