# Pagination & Sorting (Search)

When you use any Search resource, we require you to make a POST request that will not accept the common query params of GET requests. Therefore, the structure here has slight variations to our cursor-based approach.

> 📘
This currently only applies to [Searching for Contacts](/docs/references/2.2/rest-api/contacts/search-for-contacts) and [Searching for Conversations](/docs/references/2.2/rest-api/conversations/search-for-conversations).


## Pagination

## Example Request Body with Pagination for first page

```json
{\n \"query\":  {\n    \"field\": \"name\",\n    \"operator\": \"=\",\n    \"value\": \"alex\"\n  },\n  \"pagination\": {\n    \"per_page\": 5,\n  } \n}
```

You can specify how many items per page you want to fetch.

Default pagination amount
If pagination is not provided, the request defaults to 50 items.

## Example Initial Pages Object

```json
{\n  \"pages\": {\n  \"type\": \"pages\",\n  \"next\": {\n    \"page\": 4,\n    \"starting_after\": \"1HaSB+xrOyyMXAkS/c1RteCL7BzOzTvYjmjakgTergIH31eoe2v4/sbLsJWP\\nIncfQLD3ouPkZlCwJ86F\\n\"\n  },\n  \"page\": 3,\n  \"per_page\": 5,\n  \"total_pages\": 10\n  }\n}
```

In order to iterate through pages, you must parse the query response. A query with multiple response pages will include a `next` key in the `pages` hash. When a next value is provided, the `starting_after` value must be sent back in a new request to iterate to the next page.

> 🚧 Paginating through all results
This method of pagination is used to iterate through a result set until all results have been fetched, not to directly go to page X of the results. This is not possible.


## Example Request Body with Pagination for next page

```json
{\n \"query\":  {\n    \"field\": \"name\",\n    \"operator\": \"=\",\n    \"value\": \"alex\"\n  },\n  \"pagination\": {\n    \"per_page\": 5,\n    \"starting_after\": \"1HaSB+xrOyyMXAkS/c1RteCL7BzOzTvYjmjakgTergIH31eoe2v4/sbLsJWP\\nIncfQLD3ouPkZlCwJ86F\\n\"\n  } \n}\n
```

> 🚧 Warning about search context state
The `starting_after` context is stateless. Consequently, if items are updated between 2 paginated queries, this can lead to duplicate or missed records.
For example, if a query is sorting results by number of sessions and an item is updated from 1 session to 2 sessions during the pagination, they may be listed on page 1 of the results, but also on page 2.


## Sorting

## Example Request Body with Sort

```json
{
 "query":  {
    "field": "name",
    "operator": "=",
    "value": "alex"
  },
  "sort": {
    "field": "name",
    "order": "ascending"
  } 
}
```

The Search resources can also sort query results by using the following parameters within the `sort` object:

| Parameter | Required? | Description |
|  --- | --- | --- |
| field | Yes | Any searchable attribute (available on the Simple Query "Allowed fields"). |
| order | No | Either "ascending" or "descending" - default to "descending" if none is provided. |


Default sort order
If no sort pattern is provided, the query will use the default sorting parameter "last_request_at" with a descending value (e.g. listing most recent active items first).