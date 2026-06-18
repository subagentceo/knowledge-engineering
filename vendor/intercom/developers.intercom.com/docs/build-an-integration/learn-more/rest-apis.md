# About our REST API

Our REST API is a core building block of the Intercom Platform. You can use it to retrieve and update information from your own Intercom account, or to integrate Intercom into your own product. It's completely up to you and your custom use case.

## Regional Hosting

Intercom workspaces can be hosted in three distinct regions - US, EU and Australia. If you call `api.intercom.io`, we'll attempt to route your request to the correct region, but if you would prefer to specify the region where you expect the data to be stored, you can do so using the endpoints below. These replace the start of the URIs for each REST API endpoint, to connect to the specific regions. For example, to call the `/me` endpoint for a workspace stored in the EU, you would call `https://api.eu.intercom.io/me` instead of `https://api.intercom.io/me`.

| Regional Hosting Location | REST Endpoint to use |
|  --- | --- |
| US | `https://api.intercom.io/` |
| Europe | `https://api.eu.intercom.io` |
| Australia | `https://api.au.intercom.io` |


## Common Approaches

The API uses common approaches for the following:

| Function | Description |
|  --- | --- |
| [Data](/docs/build-an-integration/learn-more/object-model) | API data is [JSON](http://www.json.org/) encoded with UTF-8. API JSON is either a single object or a list of objects. |
| [Errors](https://developers.intercom.com/docs/references/rest-api/errors/http-responses) | 4xx and 5xx responses returning JSON with error codes. |
| [Rate Limiting](https://developers.intercom.com/docs/references/rest-api/errors/rate-limiting/) | Controls how many requests can be made in a time window. |
| [HTTP](/docs/build-an-integration/learn-more/rest-apis/use-of-http) | Methods are used in accordance with HTTP (GET POST and DELETE are the primary methods used) and resources are identified using URIs. All API requests are sent over HTTPS. |