# Notifications: list

    
    
      
    

    
      
      Stay organized with collections
    
    
      
      Save and categorize content based on your preferences.

*   Home
*   Documentation
*   Storage
*   Cloud Storage
*   Reference

Send feedback

# Notifications: list Stay organized with collections Save and categorize content based on your preferences.

Retrieves a list of Pub/Sub notification configurations for a given bucket.

## Required permissions

The authenticated user must have the `storage.buckets.get` IAM permission to use this method.

## Request

### HTTP request

GET https://storage.googleapis.com/storage/v1/b/bucket/notificationConfigs

In addition to standard query parameters, the following query parameters apply to this method.

To see an example of how to include query parameters in a request, see the JSON API Overview page.

### Parameters

Parameter name

Value

Description

**Path parameters**

`bucket`

`string`

Name of a Cloud Storage bucket.

### Request body

Do not supply a request body with this method.

## Response

If successful, this method returns a response body with the following structure:

{
  "kind": "storage#notifications",
  "items": [
    notifications Resource
  ]
}

Property name

Value

Description

Notes

`kind`

`string`

The kind of item this is. For lists of notifications, this is always `"storage#notifications"`.

`items[]`

`list`

The list of notifications.

## Try it!

Use the APIs Explorer below to call this method on live data and see the response.

Send feedback