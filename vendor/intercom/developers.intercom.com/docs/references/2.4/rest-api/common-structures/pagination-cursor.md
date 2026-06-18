# Pagination (Cursor)

We're starting to adopt a cursor-based approach to pagination for certain list resources.

This currently only applies when listing [Contacts](/docs/references/2.4/rest-api/contacts/contacts-model).

## Example Initial Request

### cURL (Initial Request)

```curl
$ curl https://api.intercom.io/contacts?per_page=5 \\\n-H 'Authorization:Bearer <Your access token>' \\\n-H 'Accept:application/json'
```

### Initial Request

You can initially specify how many items `per_page` you want to fetch.

| Parameter | Type | Description |
|  --- | --- | --- |
| per_page | Integer | The number of items returned in a single response.  Default is 50.  Max is 150. |


## Example Initial Pages Object

### JSON

```json
{\n  \"pages\": {\n    \"type\": \"pages\",\n    \"next\": {\n      \"page\": 4,\n      \"starting_after\": \"1HaSB+xrOyyMXAkS/c1RteCL7BzOzTvYjmjakgTergIH31eoe2v4/sbLsJWP\\nIncfQLD3ouPkZlCwJ86F\\n\"\n    },\n    \"page\": 3,\n    \"per_page\": 5,\n    \"total_pages\": 10\n   }\n}
```

### Response

In order to iterate through pages, you must parse the query response. A query with multiple response pages will include a `next` key in the `pages` object. When a `next` value is provided, the `starting_after` value must be sent back in a new request in order to iterate to the next page.

| Parameter | Type | Description |
|  --- | --- | --- |
| starting_after | String | The cursor used for pagination in order to fetch the next page of results. |


> 🚧 Paginating through all results
This method of pagination is used to iterate through a result set until all results have been fetched, not to directly go to page X of the results. This is not possible.


## Example Subsequent Requests

### cURL (Subsequent Requests)

```json
$ curl https://api.intercom.io/contacts?starting_after=\"1HaSB+xrOyyMXAkS/c1RteCL7BzOzTvYjmjakgTergIH31eoe2v4/sbLsJWP\\nIncfQLD3ouPkZlCwJ86F\\n\" \\\n-H 'Authorization:Bearer <Your access token>' \\\n-H 'Accept:application/json'\n
```