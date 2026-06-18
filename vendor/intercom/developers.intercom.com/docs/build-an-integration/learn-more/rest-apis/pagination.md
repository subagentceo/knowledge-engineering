# Pagination

Intercom APIs for [listing](#pagination-for-list-apis) and [searching](#pagination-for-search-apis) resources offer cursor-based pagination. This is available so that when you are requesting a large amount of data — like many conversations with all of their parts — you can receive and process them in smaller chunks.

### How Cursor Based Pagination Works

Intercom uses a pointer that will refer to a specific record based on the limit that you set by the number of pages that you specify per request.

When returned in an object, the pointer will look something like `'WzXXXXXXXXXXXXXX'`. You can then use the pointer from the response in order to make the subsequent request for the next batch of data.

The pagination formatting in the request differs slightly between the two categories of APIs, but the responses work the same.

## Pagination for List APIs

List API Code Examples
For code samples of how you can utilize pagination for APIs that list resources, see the [List APIs pagination guide](/docs/build-an-integration/learn-more/rest-apis/pagination-cursor).

### Example List Conversations Request

In this example, let's say you want to [list all the conversations](https://developers.intercom.com/docs/references/rest-api/api.intercom.io/Conversations/listConversations/) in your workspace, but you want to get them in batches of 5. This is what the request would look like.

```curl
$ curl https://api.intercom.io/conversations?per_page=5 \
-H 'Authorization:Bearer <Your access token>' \
-H 'Accept:application/json'
```

You manually set the `per_page` value to 5 as query parameter, but if you left it empty it would default to 20. Each API has its own default `per_page` setting specified in the reference docs. You can change `per_page` to whatever you'd like, but the max amount for any API is 150.

| Parameter | Type | Description |
|  --- | --- | --- |
| `per_page` | Integer | The number of items returned in a single response. Default is 20, max is 150. |


### Example List Conversations Response

The response will have a `pages` object, which contains all of the pagination resources including the `page` of data that you are currently on, the `total_pages` that exist based on `per_page` set, and the `next` object, which contains the `starting_after` cursor pointer.

```json
{
  "pages": {
    "type": "pages",
    "next": {
      "page": 2,
      "starting_after": "WzE3MDc5MzAwODEwMDAsMTMxLDJd"
    },
    "page": 1,
    "per_page": "5",
    "total_pages": 4
  },
  "total_count": 17,
  "conversations": [...],
}
```

You can see in this example there are 17 total conversations in this workspace. Since we requested 5 conversations objects per page, there are 4 pages total.

To get to the next page of results, you need to parse the query response and send another response, this time including the `starting_after` parameter set to equal the cursor string that was provided in the response — in this case, `"WzE3MDc5MzAwODEwMDAsMTMxLDJd"`.

| Parameter | Type | Description |
|  --- | --- | --- |
| `starting_after` | String | The cursor used for pagination in order to fetch the next page of results. |


### Example List Conversations Next Request with `starting_after`

Paginating through all results
This method of pagination is used to iterate through a result set until all results have been fetched, not to directly go to page `X` of the results. This is not possible.

If you want to get the next page of data in the batch, you must make a new request with the `starting_after` parameter equal to the cursor pointer string.

Using the example above, it would look like this:

```json
$ curl https://api.intercom.io/conversations?per_page=5&starting_after="WzE3MDc5MzAwODEwMDAsMTMxLDJd" \
-H 'Authorization:Bearer <Your access token>' \
-H 'Accept:application/json'
```

Now the pages object in the response will be updated with the new `starting_after` cursor pointer. You can repeat this process until there is no longer a `next` object in the response.

```json
{
  "pages": {
    "type": "pages",
    "next": {
      "page": 3,
      "starting_after": "WzE3MDc5MjMzNjQwMDAsNTgsM10="
    },
    "page": 2,
    "per_page": "5",
    "total_pages": 4
  },
}
```

If you'd like to see how this works with a working code example, see the [List APIs pagination guide](/docs/build-an-integration/learn-more/rest-apis/pagination-cursor).

## Pagination for Search APIs

Search API Code Examples
For code samples of how you can utilize pagination for APIs that search resources, see the [Search APIs pagination guide](/docs/build-an-integration/learn-more/rest-apis/pagination-sorting-search).

## Example Search Conversations Request

In this example, let's say you want to [search for all the conversations](https://developers.intercom.com/docs/references/rest-api/api.intercom.io/Conversations/listConversations/) in your workspace that were created in the past 3 months in batches of 10. This is what the request would look like.

```curl
curl -i -X POST \
  https://api.intercom.io/conversations/search \
  -H 'Authorization: Bearer <your-access-token>' \
  -H 'Content-Type: application/json' \
  -H 'Intercom-Version: 2.10' \
  -d '{
    "query": {
      "operator": "AND",
      "value": [
        {
          "field": "created_at",
          "operator": ">",
          "value": "1693782000"
        }
      ]
    },
    "pagination": {
      "per_page": 10
    }
  }'
```

For this request you are using 10 items per page, but if you left it empty it would default to 20. Like the list APIs, search APIs have their own `per_page` default setting and the max amount for any API is 150. Unlike the list APIs, the `per_page` parameter is nested inside of a `pagination` object. You must format it this way in the request for it to work.

| Parameter | Type | Description |
|  --- | --- | --- |
| `pagination` | Object | The pagination object. |
| `per_page` | Integer | The number of items returned in a single response. Default is 20, max is 150. |


### Example Search Conversations Response

The response will have a `pages` object, which contains all of the pagination resources including the `page` of data that you are currently on, the `total_pages` that exist based on `per_page` set, and the `next` object, which contains the `starting_after` cursor pointer.

```json
{
  "pages": {
    "type": "pages",
    "next": {
      "page": 2,
      "starting_after": "WzE3MDk2NTMxODUwMDAsMTkwLDJd"
    },
    "page": 1,
    "per_page": 10,
    "total_pages": 8
  },
  "total_count": 72,
  "conversations": [...],
}
```

You can see in this example there are 72 total conversations that fall within these search parameters. Since we requested 10 conversations objects per page, there are 8 pages total.

To get to the next page of results, you need to parse the query response and send another response, this time including the `starting_after` parameter set to equal the cursor string that was provided in the response — in this case, `"WzE3MDk2NTMxODUwMDAsMTkwLDJd"`.

| Parameter | Type | Description |
|  --- | --- | --- |
| `starting_after` | String | The cursor used for pagination in order to fetch the next page of results. |


### Example Search Conversations Next Request with `starting_after`

Search context state
The `starting_after` context is stateless. Consequently, if items are updated between 2 paginated queries, this can lead to duplicate or missed records.
For example, if a query is sorting results by number of sessions and an item is updated from 1 session to 2 sessions during the pagination, they may be listed on page 1 of the results, but also on page 2.

If you want to get the next page of data in the batch, you must make a new request with the `starting_after` parameter equal to the cursor pointer string.

Using the example above, it would look like this:

```curl
curl -i -X POST \
  https://api.intercom.io/conversations/search \
  -H 'Authorization: Bearer <your-access-token>' \
  -H 'Content-Type: application/json' \
  -H 'Intercom-Version: 2.10' \
  -d '{
    "query": {
      "operator": "AND",
      "value": [
        {
          "field": "created_at",
          "operator": ">",
          "value": "1693782000"
        }
      ]
    },
    "pagination": {
      "per_page": 10,
      "starting_after": "WzE3MDk2NTMxODUwMDAsMTkwLDJd"
    }
  }'
```

Now the pages object in the response will be updated with the new `starting_after` cursor pointer. You can repeat this process until there is no longer a `next` object in the response.

```json
{
  "pages": {
    "type": "pages",
    "next": {
      "page": 3,
      "starting_after": "WzE3MDk2NTMxMjgwMDAsMTgwLDNd"
    },
    "page": 2,
    "per_page": "10",
    "total_pages": 8
  },
  "total_count": 72,
  "conversations": [...],
}
```

### Example Search Conversations with Sorting

Search APIs can also sort query results by using the following parameters within the `sort` object:

| Parameter | Required? | Description |
|  --- | --- | --- |
| field | Yes | Any searchable attribute (available on the Simple Query "Allowed fields"). |
| order | No | Either "ascending" or "descending" - default to "descending" if none is provided. |


Default sort order
If no sort pattern is provided, the query will use the default sorting parameter `"last_request_at"` with a descending value (e.g. listing most recent active items first).

If you add it to the example request, it would look like the below. The response object would show the conversation objects in ascending order.

```curl
curl -i -X POST \
  https://api.intercom.io/conversations/search \
  -H 'Authorization: Bearer <your-access-token>' \
  -H 'Content-Type: application/json' \
  -H 'Intercom-Version: 2.10' \
  -d '{
    "query": {
      "operator": "AND",
      "value": [
        {
          "field": "created_at",
          "operator": ">",
          "value": "1693782000"
        }
      ]
    },
    "pagination": {
      "per_page": 10,
      "starting_after": "WzE3MDk2NTMxODUwMDAsMTkwLDJd"
    },
    "sort": {
      "field": "name",
      "order": "ascending"
    } 
  }'
```

If you'd like to see how this works with a working code example, see the [List APIs pagination guide](/docs/build-an-integration/learn-more/rest-apis/pagination-cursor).