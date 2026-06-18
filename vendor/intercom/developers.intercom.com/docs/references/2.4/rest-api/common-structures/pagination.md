# Pagination

The majority of list resources in the API are paginated to allow clients to traverse data over multiple requests.

Their responses are likely to contain a `pages` object that hosts pagination links which a client can use to paginate through the data without having to construct a query. The link relations for the `pages` field are as follows.

### Pages Object

| Parameter | Description |
|  --- | --- |
| next | A link to the next page of results. A response that does not contain a `next` link does not have further data to fetch. |
| prev | A link to the previous page of results. |
| first | A link to the first page of results. |
| last | A link to the last page of results. |


What about for Contacts and Searches?
When listing any Contact objects, we will instead use a [cursor-based approach](/docs/build-an-integration/learn-more/rest-apis/pagination-cursor).

Our Search resources will instead use a [POST-based approach](/docs/build-an-integration/learn-more/rest-apis/pagination-sorting-search).