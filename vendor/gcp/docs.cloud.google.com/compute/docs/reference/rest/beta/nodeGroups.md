# REST Resource: nodeGroups

    
    
      
    

    
      
      Stay organized with collections
    
    
      
      Save and categorize content based on your preferences.

*   Home
*   Documentation
*   Compute
*   Compute Engine
*   APIs & Reference

Send feedback

# REST Resource: nodeGroups Stay organized with collections Save and categorize content based on your preferences.

*   Resource: NodeGroup
    *   JSON representation
        *   JSON representation
*   Methods

## Resource: NodeGroup

Represents a sole-tenant Node Group resource.

A sole-tenant node is a physical server that is dedicated to hosting VM instances only for your specific project. Use sole-tenant nodes to keep your instances physically separated from instances in other projects, or to group your instances together on the same host hardware. For more information, read Sole-tenant nodes.

JSON representation

{
  "kind": string,
  "id": string,
  "creationTimestamp": string,
  "name": string,
  "description": string,
  "nodeTemplate": string,
  "zone": string,
  "selfLink": string,
  "status": enum,
  "size": integer,
  "autoscalingPolicy": {
    "mode": enum,
    "minNodes": integer,
    "maxNodes": integer
  },
  "maintenancePolicy": enum,
  "locationHint": string,
  "fingerprint": string,
  "maintenanceWindow": {
    "startTime": string,
    "maintenanceDuration": {
      "seconds": string,
      "nanos": integer
    }
  },
  "shareSettings": {
    "shareType": enum,
    "projects": [
      string
    ],
    "projectMap": {
      string: {
        "projectId": string
      },
      ...
    }
  },
  "maintenanceInterval": enum
}

 

Fields

`kind`

`string`

Output only. The type of the resource. Always `compute#nodeGroup` for node group.

`id`

`string (uint64 format)`

Output only. The unique identifier for the resource. This identifier is defined by the server.

`creationTimestamp`

`string`

Output only. Creation timestamp in RFC3339 text format.

`name`

`string`

The name of the resource, provided by the client when initially creating the resource. The resource name must be 1-63 characters long, and comply with RFC1035. Specifically, the name must be 1-63 characters long and match the regular expression `[a-z]([-a-z0-9]*[a-z0-9])?` which means the first character must be a lowercase letter, and all following characters must be a dash, lowercase letter, or digit, except the last character, which cannot be a dash.

`description`

`string`

An optional description of this resource. Provide this property when you create the resource.

`nodeTemplate`

`string`

URL of the node template to create the node group from.

`zone`

`string`

Output only. The name of the zone where the node group resides, such as us-central1-a.

`selfLink`

`string`

Output only. Server-defined URL for the resource.

`status`

`enum`

`size`

`integer`

Output only. The total number of nodes in the node group.

`autoscalingPolicy`

`object`

Specifies how autoscaling should behave.

`autoscalingPolicy.mode`

`enum`

The autoscaling mode. Set to one of: `ON`, `OFF`, or `ONLY_SCALE_OUT`. For more information, see Autoscaler modes.

`autoscalingPolicy.minNodes`

`integer`

The minimum number of nodes that the group should have.

`autoscalingPolicy.maxNodes`

`integer`

The maximum number of nodes that the group should have. Must be set if autoscaling is enabled. Maximum value allowed is 100.

`maintenancePolicy`

`enum`

Specifies how to handle instances when a node in the group undergoes maintenance. Set to one of: `DEFAULT`, `RESTART_IN_PLACE`, or `MIGRATE_WITHIN_NODE_GROUP`. The default value is `DEFAULT`. For more information, see Maintenance policies.

`locationHint`

`string`

An opaque location hint used to place the Node close to other resources. This field is for use by internal tools that use the public API. The location hint here on the NodeGroup overrides any locationHint present in the NodeTemplate.

`fingerprint`

`string (bytes format)`

A base64-encoded string.

`maintenanceWindow`

`object`

`maintenanceWindow.startTime`

`string`

Start time of the window. This must be in UTC format that resolves to one of `00:00`, `04:00`, `08:00`, `12:00`, `16:00`, or `20:00`. For example, both `13:00-5` and `08:00` are valid.

`maintenanceWindow.maintenanceDuration`

`object`

Output only. A predetermined duration for the window, automatically chosen to be the smallest possible in the given scenario.

`maintenanceWindow.maintenanceDuration.seconds`

`string (int64 format)`

Span of time at a resolution of a second. Must be from 0 to 315,576,000,000 inclusive. Note: these bounds are computed from: 60 sec/min * 60 min/hr * 24 hr/day * 365.25 days/year * 10000 years

`maintenanceWindow.maintenanceDuration.nanos`

`integer`

Span of time that's a fraction of a second at nanosecond resolution. Durations less than one second are represented with a 0 `seconds` field and a positive `nanos` field. Must be from 0 to 999,999,999 inclusive.

`shareSettings`

`object`

Share-settings for the node group

`shareSettings.shareType`

`enum`

Type of sharing for this shared-reservation

`shareSettings.projects[]`

`string`

A nodeGroups.list of Project names to specify consumer projects for this shared-reservation. This is only valid when shareType's value is SPECIFIC_PROJECTS.

`shareSettings.projectMap[]`

`map (key: string, value: object)`

A map of project id and project config. This is only valid when shareType's value is SPECIFIC_PROJECTS.

`shareSettings.projectMap[].projectId`

`string`

The project ID, should be same as the key of this project config in the parent map.

`maintenanceInterval`

`enum`

Specifies the frequency of planned maintenance events. The accepted values are: `AS_NEEDED` and `RECURRENT`.

 

## Methods

### addNodes

Adds specified number of nodes to the node group.

### aggregatedList

Retrieves an aggregated list of node groups.

### delete

Deletes the specified NodeGroup resource.

### deleteNodes

Deletes specified nodes from the node group.

### get

Returns the specified NodeGroup.

### getIamPolicy

Gets the access control policy for a resource.

### insert

Creates a NodeGroup resource in the specified project using the data included in the request.

### list

Retrieves a list of node groups available to the specified project.

### listNodes

Lists nodes in the node group.

### patch

Updates the specified node group.

### performMaintenance

Perform maintenance on a subset of nodes in the node group.

### setIamPolicy

Sets the access control policy on the specified resource.

### setNodeTemplate

Updates the node template of the node group.

### simulateMaintenanceEvent

Simulates maintenance event on specified nodes from the node group.

### testIamPermissions

Returns permissions that a caller has on the specified resource.

Send feedback