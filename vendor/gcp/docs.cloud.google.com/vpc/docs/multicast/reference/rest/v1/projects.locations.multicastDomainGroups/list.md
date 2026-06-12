# Method: projects.locations.multicastDomainGroups.list

    
    
      
    

    
      
      Stay organized with collections
    
    
      
      Save and categorize content based on your preferences.

*   Home
*   Documentation
*   Networking
*   Virtual Private Cloud
*   Reference

Send feedback

# Method: projects.locations.multicastDomainGroups.list Stay organized with collections Save and categorize content based on your preferences.

*   HTTP request
*   Path parameters
*   Query parameters
*   Request body
*   Response body
    *   JSON representation

Lists multicast domain groups in a given project and location.

### HTTP request

`GET https://networkservices.googleapis.com/v1/{parent=projects/*/locations/*}/multicastDomainGroups`

The URL uses gRPC Transcoding syntax.

### Path parameters

 

Parameters

`parent`

`string`

Required. The parent resource for which to list multicast domain groups. Use the following format: `projects/*/locations/global`.

### Query parameters

 

Parameters

`pageSize`

`integer`

Optional. The maximum number of multicast domain groups to return per call.

`pageToken`

`string`

Optional. A page token from an earlier query, as returned in `nextPageToken`.

`filter`

`string`

Optional. A filter expression that filters the resources listed in the response. The expression must be of the form `<field> <operator> <value>` where operators: `<`, `>`, `<=`, `>=`, `!=`, `=`, `:` are supported (colon `:` represents a HAS operator which is roughly synonymous with equality). can refer to a proto or JSON field, or a synthetic field. Field names can be camelCase or snake_case.

Examples: * Filter by name: name = "RESOURCE_NAME" * Filter by labels: * Resources that have a key named `foo` labels.foo:* * Resources that have a key named `foo` whose value is `bar` labels.foo = bar

`orderBy`

`string`

Optional. A field used to sort the results by a certain order.

### Request body

The request body must be empty.

### Response body

Response message for `multicastDomainGroups.list`.

If successful, the response body contains data with the following structure:

JSON representation

{
  "multicastDomainGroups": [
    {
      object (`MulticastDomainGroup`)
    }
  ],
  "nextPageToken": string,
  "unreachable": [
    string
  ]
}

 

Fields

`multicastDomainGroups[]`

``object (`MulticastDomainGroup`)``

The list of multicast domain groups.

`nextPageToken`

`string`

A page token from an earlier query, as returned in `nextPageToken`.

`unreachable[]`

`string`

Locations that could not be reached.

Send feedback