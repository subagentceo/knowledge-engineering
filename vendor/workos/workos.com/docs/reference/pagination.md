# Pagination

Many top-level resources have support for bulk fetches via list API methods. For instance, you can [list connections](https://workos.com/docs/reference/sso/connection/list), [list directory users](https://workos.com/docs/reference/directory-sync/directory-user/list), and [list directory groups](https://workos.com/docs/reference/directory-sync/directory-group/list). These list API methods share a common structure, taking at least these four parameters: `limit`, `order`, `after`, and `before`.

WorkOS utilizes pagination via the `after` and `before` parameters. Both parameters take an existing object ID value and return objects in either descending or ascending order by creation time.

#### Request

#### Response

### list_metadata