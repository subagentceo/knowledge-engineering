# VpcAccess

    
    
      
    

    
      
      Stay organized with collections
    
    
      
      Save and categorize content based on your preferences.

*   Home
*   Documentation
*   Application hosting
*   Cloud Run
*   Reference

Send feedback

# VpcAccess Stay organized with collections Save and categorize content based on your preferences.

*   JSON representation
*   VpcEgress
*   NetworkInterface
    *   JSON representation

VPC Access settings. For more information on sending traffic to a VPC network, visit https://cloud.google.com/run/docs/configuring/connecting-vpc.

JSON representation

{
  "connector": string,
  "egress": enum (`VpcEgress`),
  "networkInterfaces": [
    {
      object (`NetworkInterface`)
    }
  ]
}

 

Fields

`connector`

`string`

VPC Access connector name. Format: `projects/{project}/locations/{location}/connectors/{connector}`, where `{project}` can be project id or number. For more information on sending traffic to a VPC network via a connector, visit https://cloud.google.com/run/docs/configuring/vpc-connectors.

`egress`

``enum (`VpcEgress`)``

Optional. Traffic VPC egress settings. If not provided, it defaults to PRIVATE_RANGES_ONLY.

`networkInterfaces[]`

``object (`NetworkInterface`)``

Optional. Direct VPC egress settings. Currently only single network interface is supported.

## VpcEgress

Egress options for VPC access.

 

Enums

`VPC_EGRESS_UNSPECIFIED`

Unspecified

`ALL_TRAFFIC`

All outbound traffic is routed through the VPC connector.

`PRIVATE_RANGES_ONLY`

Only private IP ranges are routed through the VPC connector.

## NetworkInterface

Direct VPC egress settings.

JSON representation

{
  "network": string,
  "subnetwork": string,
  "tags": [
    string
  ]
}

 

Fields

`network`

`string`

Optional. The VPC network that the Cloud Run resource will be able to send traffic to. At least one of network or subnetwork must be specified. If both network and subnetwork are specified, the given VPC subnetwork must belong to the given VPC network. If network is not specified, it will be looked up from the subnetwork.

`subnetwork`

`string`

Optional. The VPC subnetwork that the Cloud Run resource will get IPs from. At least one of network or subnetwork must be specified. If both network and subnetwork are specified, the given VPC subnetwork must belong to the given VPC network. If subnetwork is not specified, the subnetwork with the same name with the network will be used.

`tags[]`

`string`

Optional. Network tags applied to this Cloud Run resource.

Send feedback