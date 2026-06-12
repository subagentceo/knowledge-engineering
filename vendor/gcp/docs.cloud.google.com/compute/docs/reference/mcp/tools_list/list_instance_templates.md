# MCP Tools Reference: compute.googleapis.com

    
    
      
    

    
      
      Stay organized with collections
    
    
      
      Save and categorize content based on your preferences.

*   Home
*   Documentation
*   Compute
*   Compute Engine
*   APIs & Reference

Send feedback

# MCP Tools Reference: compute.googleapis.com Stay organized with collections Save and categorize content based on your preferences.

## Tool: list_instance_templates

Lists Compute Engine instance templates. Details for each instance template include name, ID, description, machine type, region, and creation timestamp. Requires project as input.

The following sample demonstrate how to use `curl` to invoke the `list_instance_templates` MCP tool.

Curl Request

curl --location 'https://compute.googleapis.com/mcp' \
--header 'content-type: application/json' \
--header 'accept: application/json, text/event-stream' \
--data '{
  "method": "tools/call",
  "params": {
    "name": "list_instance_templates",
    "arguments": {
      // provide these details according to the tool's MCP specification
    }
  },
  "jsonrpc": "2.0",
  "id": 1
}'
                

## Input Schema

Request message for listing instance templates basic info.

### McpListInstanceTemplatesBasicInfoRequest

JSON representation

{
  "project": string,
  "pageSize": integer,
  "pageToken": string
}

 

Fields

`project`

`string`

Required. Project ID for this request.

`pageSize`

`integer`

Optional. The maximum number of instance templates to return.

`pageToken`

`string`

Optional. A page token received from a previous call to list instance templates.

## Output Schema

Response message for listing instance templates basic info.

### McpListInstanceTemplatesBasicInfoResponse

JSON representation

{
  "instanceTemplates": [
    {
      object (`InstanceTemplateBasicInfo`)
    }
  ],
  "nextPageToken": string
}

 

Fields

`instanceTemplates[]`

``object (`InstanceTemplateBasicInfo`)``

The list of instance templates.

`nextPageToken`

`string`

A token that can be sent as `page_token` to retrieve the next page. If this field is omitted, there are no subsequent pages.

### InstanceTemplateBasicInfo

JSON representation

{
  "name": string,
  "id": string,
  "description": string,
  "machineType": string,
  "region": string,
  "createTime": string
}

 

Fields

`name`

`string`

Name of the instance template.

`id`

`string (uint64 format)`

The unique identifier for the instance template.

`description`

`string`

Description of the instance template.

`machineType`

`string`

The machine type of the instance template.

`region`

`string`

The region of the instance template if it is a regional resource.

`createTime`

``string (`Timestamp` format)``

Creation timestamp of the instance template.

Uses RFC 3339, where generated output will always be Z-normalized and use 0, 3, 6 or 9 fractional digits. Offsets other than "Z" are also accepted. Examples: `"2014-10-02T15:01:23Z"`, `"2014-10-02T15:01:23.045123456Z"` or `"2014-10-02T15:01:23+05:30"`.

### Timestamp

JSON representation

{
  "seconds": string,
  "nanos": integer
}

 

Fields

`seconds`

`string (int64 format)`

Represents seconds of UTC time since Unix epoch 1970-01-01T00:00:00Z. Must be between -62135596800 and 253402300799 inclusive (which corresponds to 0001-01-01T00:00:00Z to 9999-12-31T23:59:59Z).

`nanos`

`integer`

Non-negative fractions of a second at nanosecond resolution. This field is the nanosecond portion of the duration, not an alternative to seconds. Negative second values with fractions must still have non-negative nanos values that count forward in time. Must be between 0 and 999,999,999 inclusive.

### Tool Annotations

Destructive Hint: ❌ | Idempotent Hint: ✅ | Read Only Hint: ✅ | Open World Hint: ❌

Send feedback