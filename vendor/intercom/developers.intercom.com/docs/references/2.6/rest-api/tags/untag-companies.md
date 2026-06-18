# Untag companies

## Example Request & Response

```curl
$ curl https://api.intercom.io/tags \
-X POST \
-H 'Authorization:Bearer <Your access token>' \
-H 'Accept: application/json' \
-H 'Content-Type: application/json' -d'
{
  "name": "Independent",
  "companies": [
    {
      "id" : "53427b7ecce5722303000003",
      "untag": true
    }
  ]
}
```

```curl
HTTP/1.1 200 Ok

{
  "type": "tag",
  "name": "Follow Up",
  "id": "17513"
}
```

You can untag a single or a list of companies.

### Request Body Parameters

| Parameters | Type | Required | Description |
|  --- | --- | --- | --- |
| name | String | Yes | The name of the tag which will be untagged from the. |
| companies | Object | Yes | An array of objects with the unique `id` or `company_id` of the company to be untagged, and the `untag` boolean set to `true`. |


### Response

This will return a [Tag model](/docs/references/2.6/rest-api/tags/tag-model) for the tag that was unapplied to the given company.