# TaskRouter.js v1: Constructing JWTs: Managing access policies for client side requests

To interact with the JS SDK, you have to generate JWTs from your server code as a means of authorizing which resources the client side application can access. On the server side, you can then authenticate a request by checking that the signature of the JWT is signed by the `AuthToken` of the provided `AccountSid`.

JWTs provide a mechanism for authenticating and authorizing your application's API request without exposing your AuthToken on the client side.

## JWT format

JWTs consist of three hashed sections:

* Header
* Payload
* Signature

### Header \[#jwt-header]

The first part of the JWT token is the header, which contains these parts:

```json
{
  "typ": "JWT",
  "alg": "HS256"
}
```

This identifies the code as a JWT and shows that the hashing algorithm used is HS256.

### Signature

The third and final part of the JSON Web Token is the signature, which is made up of a hash of the following components:

* Header
* Payload
* Secret

In formula terms this is:

```javascript
hash((hash(header) + hash(payload)), 'secret')
```

The secret is your AuthToken.

### Payload

The payload of the JWT is what defines the access policies for resources.

#### Access policy object

Access policy objects are a set of rules that can be applied to an HTTP REST request to authorize whether the request is allowed to access the API resources. The policy defines which resources and sub-resources are the request is allowed to access, what parameters are expected and allowed, and whether or not the resources and sub-resources are outright forbidden. Access policies are represented as JSON objects.

The access policy object is a JSON object with the following fields.

| Key            | Description                                                 |
| -------------- | ----------------------------------------------------------- |
| account\_sid   | The account sid this access policy is acting on behalf.     |
| version        | The version of the access policy document format being used |
| friendly\_name | An optional human readable description string               |
| policies       | An array of [policy rule objects](#policy-rule-object)      |

#### Policy rule object

The `policies` array contains policy rule objects.

| Key           | Description                                                                                                                                             |
| ------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------- |
| url           | The URL pattern of the rule.                                                                                                                            |
| method        | The HTTP method this rule matches.                                                                                                                      |
| allow         | true or false. Does this rule allow access? Defaults to false.                                                                                          |
| post\_filter  | An object describing the www-form-encoded parameters and values that must be present to match this rule. If undefined, all parameters and values match. |
| query\_filter | An object describing the URL query parameters and values that must be present to match this rule. If undefined, all parameters and values match.        |

#### url

The `url` key defines a literal or pattern to match against the request's URL. This field should contain the URL without query parameters. It can be either a literal string or a string that ends in a wildcard. Literal strings must exactly match the request URL for this rule to match. There are two types of wildcard strings:

* Immediate child wildcard (URLs ending in "/\*")
* Recursive wildcard (URLs ending in "/\*\*")

**Immediate child wildcards** cause a rule to match the next step in the path, but no further.

For example:

* `https://taskrouter.twilio.com/v1/Workspaces/*`

Matches:

* `https://taskrouter.twilio.com/v1/Workspaces/WSxxx`

But not these URLs:

* `https://taskrouter.twilio.com/v1/Workspaces/`
* `https://taskrouter.twilio.com/v1/Workspaces/WSxxx/TaskQueues`

**Recursive wildcards** cause a URL to match any child URL of this path.

For example:

* `https://taskrouter.twilio.com/v1/Workspaces/WSxxx/**`

Matches:

* `https://taskrouter.twilio.com/v1/Workspaces/WSxxx/TaskQueues`
* `https://taskrouter.twilio.com/v1/Workspaces/WSxxx/TaskQueues/WQxxx`
* `https://taskrouter.twilio.com/v1/Workspaces/WSxxx/Workers/WKxxx/Statistics`
* `https://taskrouter.twilio.com/v1/Workspaces/WSxxx/Statistics`

But not:

* `https://taskrouter.twilio.com/v1/Workspaces/WSxxxx`
* `https://taskrouter.twilio.com/v1/Workspaces`

**Multiple rule matching**

* For requests that match multiple rules, the rule that is most specific takes priority.
* Longer, more specific paths take priority over less specific.
* If the paths are the same, rules with filters take priority over rules without filters.
* Directly conflicting rules are considered invalid and should be detected and rejected by the access policy parser.

#### method

The HTTP method this rule applies to: `GET`, `POST`, `DELETE`

#### allow

* Allow may have a value of `true` or `false`.
* If the matching rule has an allow value of `true`, the request is authorized.
* If the allow value is `false`, the request is explicitly rejected. The default for all rules is "false".

#### post\_filter and query\_filter

The `post_filter` and `query_filter` fields are used to match parameters provided in either the query string or `www-form-post-params`. The value is an object whose keys are the parameter names, and values are either a string literal that must be matched, or a matcher object that describes how the key is matched in more detail. Both post and query filters use the same format.

**String literal example**

```javascript
"post_filter": {
    "FriendlyName": "Alice"
}
```

This would match a request that contained a single www-form-encoded parameter FriendlyName with the value Alice.
If the request contained any other form parameters, it would not match this rule.

**Matcher object example**

```javascript
"post_filter": {
   "FriendlyName": {"required": true},
   "Status": {"required": false},
   "Foo": {"required": false, "value": "bar"}
}
```

Matcher objects allow for more complex matching rules. In the previous example, the field FriendlyName is required but will match any provided value. The field **Status** is optional, meaning this rule will match if it's provided or not. If it is provided, any value will be allowed. The field **Foo** is optional as well, but if it is provided, it must have the value `bar`.

**Matcher object**

| Key            | Description                                                                                                                       |
| -------------- | --------------------------------------------------------------------------------------------------------------------------------- |
| required       | is this param required, true or false                                                                                             |
| valueoptional. | if present, the value is a string literal that the value of the field must match. If not present, the field will match any value. |

### Standard JWT payload fields

In addition to the list of policies, you need to define the following in the payload:

* iss: The issuer of the token (AccountSid)
* exp: When the token will expire (TimeStamp in seconds since epoch)
* account\_sid: Account owner of the token
* workspace\_sid: Workspace owner of the token
* channel: The channel to receive updates on and post API requests to.

If you are defining a Worker, you will also need to define the following:

* channel: WSxxx
* worker\_sid: WKxxx

If you are defining a Workspace, you will also need to define the following:

* channel: WSxxx

## Required policies

Two required policies in your JWT include the ability to connect to a web-socket channel and post messages on that web-socket to hit the REST API. These are required since you want to authenticate and authorize the opening a websocket in the first place. Subsequent events to `GET`, `POST` or `DELETE` to other APIs also use this websocket.

For example:

```javascript
{
    "url": "https://event-bridge.twilio.com/v1/wschannels/AccountSid/Channel",
    "method": "GET",
    "allow": true
},
{
    "url": "https://event-bridge.twilio.com/v1/wschannels/AccountSid/Channel",
    "method": "POST",
    "allow": true
}
```

## Deconstructing an SDK method to Policy Object

Let's take an example using the SDK and see what this breaks down to as a policy object:

```php
<?php
$workspaceCapability = new Services_Twilio_TaskRouter_Capability($accountSid, $authToken, $workspaceSid, $workspaceSid);
$workspaceCapability->allowFetchSubresources();
$workspaceCapability->allowDeleteSubresources();
$workspaceCapability->allowUpdatesSubresources();
$workspaceToken = $workspaceCapability->generateToken();
```

The policy object would look like the following:

```javascript
{
    "url": "https://event-bridge.twilio.com/v1/wschannels/ACxxx/WSxxx",
    "method": "GET",
    "allow": true
},
{
    "url": "https://event-bridge.twilio.com/v1/wschannels/ACxxx/WSxxx",
    "method": "POST",
    "allow": true
},
{
    "url": "https://taskrouter.twilio.com/v1/Workspaces/WSxxx",
    "method": "GET",
    "allow": true
},
{
    "url": "https://taskrouter.twilio.com/v1/Workspaces/WSxxx/**",
    "method": "GET",
    "allow": true
},
{
    "url": "https://taskrouter.twilio.com/v1/Workspaces/WSxxx/**",
    "method": "POST",
    "allow": true
},
{
    "url": "https://taskrouter.twilio.com/v1/Workspaces/WSxxx/**",
    "method": "DELETE",
    "allow": true
}
```

In total, the JWT payload would decode to:

```json
{
  "version": "v1",
  "friendly_name": "WSxxx",
  "policies": [
    {
      "url": "https://event-bridge.twilio.com/v1/wschannels/ACxxx/WSxxx",
      "method": "GET",
      "allow": true
    },
    {
      "url": "https://event-bridge.twilio.com/v1/wschannels/ACxxx/WSxxx",
      "method": "POST",
      "allow": true
    },
    {
      "url": "https://taskrouter.twilio.com/v1/Workspaces/WSxxx",
      "method": "GET",
      "allow": true
    },
    {
      "url": "https://taskrouter.twilio.com/v1/Workspaces/WSxxx/**",
      "method": "GET",
      "allow": true
    },
    {
      "url": "https://taskrouter.twilio.com/v1/Workspaces/WSxxx/**",
      "method": "DELETE",
      "allow": true
    },
    {
      "url": "https://taskrouter.twilio.com/v1/Workspaces/WSxxx/**",
      "method": "POST",
      "allow": true
    }
  ],
  "iss": "ACxxx",
  "exp": 1432251317,
  "account_sid": "ACxxx",
  "channel": "WSxxx",
  "workspace_sid": "WSxxx"
}
```
