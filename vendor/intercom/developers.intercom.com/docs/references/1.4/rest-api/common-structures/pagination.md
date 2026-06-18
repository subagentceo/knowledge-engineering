# Pagination

Some list resources in the API are paginated by default to allow clients to traverse data over multiple requests. Their responses may contain a `pages` object that contains pagination links a client can use to traverse the data without having to construct a query. The link relations for the `pages` field are as follows -

| Parameter | Description |
|  --- | --- |
| next | A link to the next page of results. A response that does not contain a `next` link does not have further data to fetch. |
| prev | A link to the previous page of results. |
| first | A link to the first page of results. |
| last | A link to the last page of results. |