# Method: projects.locations.clusters.well-known.getOpenid-configuration

    
    
      
    

    
      
      Stay organized with collections
    
    
      
      Save and categorize content based on your preferences.

*   Home
*   Documentation
*   Application hosting
*   Google Kubernetes Engine (GKE)

Send feedback

# Method: projects.locations.clusters.well-known.getOpenid-configuration Stay organized with collections Save and categorize content based on your preferences.

*   HTTP request
*   Path parameters
*   Request body
*   Response body
    *   JSON representation
*   Try it!

Gets the OIDC discovery document for the cluster. See the OpenID Connect Discovery 1.0 specification for details.

### HTTP request

`GET https://container.googleapis.com/v1beta1/{parent=projects/*/locations/*/clusters/*}/.well-known/openid-configuration`

The URL uses gRPC Transcoding syntax.

### Path parameters

 

Parameters

`parent`

`string`

The cluster (project, location, cluster name) to get the discovery document for. Specified in the format `projects/*/locations/*/clusters/*`.

### Request body

The request body must be empty.

### Response body

GetOpenIDConfigResponse is an OIDC discovery document for the cluster. See the OpenID Connect Discovery 1.0 specification for details.

If successful, the response body contains data with the following structure:

JSON representation

{
  "issuer": string,
  "jwks_uri": string,
  "response_types_supported": [
    string
  ],
  "subject_types_supported": [
    string
  ],
  "id_token_signing_alg_values_supported": [
    string
  ],
  "claims_supported": [
    string
  ],
  "grant_types": [
    string
  ],
  "cacheHeader": {
    object (`HttpCacheControlResponseHeader`)
  }
}

 

Fields

`issuer`

`string`

OIDC Issuer.

`jwks_uri`

`string`

JSON Web Key uri.

`response_types_supported[]`

`string`

Supported response types.

`subject_types_supported[]`

`string`

Supported subject types.

`id_token_signing_alg_values_supported[]`

`string`

supported ID Token signing Algorithms.

`claims_supported[]`

`string`

Supported claims.

`grant_types[]`

`string`

Supported grant types.

`cacheHeader`

``object (`HttpCacheControlResponseHeader`)``

For HTTP requests, this field is automatically extracted into the Cache-Control HTTP header.

Send feedback