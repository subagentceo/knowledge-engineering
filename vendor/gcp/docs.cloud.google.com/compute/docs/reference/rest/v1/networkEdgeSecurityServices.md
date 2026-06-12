# REST Resource: networkEdgeSecurityServices

    
    
      
    

    
      
      Stay organized with collections
    
    
      
      Save and categorize content based on your preferences.

*   Home
*   Documentation
*   Compute
*   Compute Engine
*   APIs & Reference

Send feedback

# REST Resource: networkEdgeSecurityServices Stay organized with collections Save and categorize content based on your preferences.

*   Resource: NetworkEdgeSecurityService
    *   JSON representation
*   Methods

## Resource: NetworkEdgeSecurityService

Represents a Google Cloud Armor network edge security service resource.

JSON representation

{
  "kind": string,
  "id": string,
  "creationTimestamp": string,
  "name": string,
  "description": string,
  "selfLink": string,
  "selfLinkWithId": string,
  "region": string,
  "fingerprint": string,
  "securityPolicy": string
}

 

Fields

`kind`

`string`

Output only. Type of the resource. Always `compute#networkEdgeSecurityService` for NetworkEdgeSecurityServices

`id`

`string (uint64 format)`

Output only. The unique identifier for the resource. This identifier is defined by the server.

`creationTimestamp`

`string`

Output only. Creation timestamp in RFC3339 text format.

`name`

`string`

Name of the resource. Provided by the client when the resource is created. The name must be 1-63 characters long, and comply with RFC1035. Specifically, the name must be 1-63 characters long and match the regular expression `[a-z]([-a-z0-9]*[a-z0-9])?` which means the first character must be a lowercase letter, and all following characters must be a dash, lowercase letter, or digit, except the last character, which cannot be a dash.

`description`

`string`

An optional description of this resource. Provide this property when you create the resource.

`selfLink`

`string`

Output only. Server-defined URL for the resource.

`selfLinkWithId`

`string`

Output only. Server-defined URL for this resource with the resource id.

`region`

`string`

Output only. URL of the region where the resource resides. You must specify this field as part of the HTTP request URL. It is not settable as a field in the request body.

`fingerprint`

`string (bytes format)`

Fingerprint of this resource. A hash of the contents stored in this object. This field is used in optimistic locking. This field will be ignored when inserting a NetworkEdgeSecurityService. An up-to-date fingerprint must be provided in order to update the `NetworkEdgeSecurityService`, otherwise the request will fail with error `412 conditionNotMet`.

To see the latest fingerprint, make a `get()` request to retrieve a NetworkEdgeSecurityService.

A base64-encoded string.

`securityPolicy`

`string`

The resource URL for the network edge security service associated with this network edge security service.

 

## Methods

### aggregatedList

Retrieves the list of all NetworkEdgeSecurityService resources available to the specified project.

### delete

Deletes the specified service.

### get

Gets a specified NetworkEdgeSecurityService.

### insert

Creates a new service in the specified project using the data included in the request.

### patch

Patches the specified policy with the data included in the request.

Send feedback