# HTTP API Source

The Segment HTTP Tracking API lets you record analytics data from any website or application. The requests hit Segment servers then Segment routes your data to your destination.

Segment has native [sources](/docs/segment/connections/sources/) for most use cases (like JavaScript and iOS) that are open-source and built for high-performance. But for unsupported use cases, [blocked event forwarding](/docs/segment/protocols/enforce/forward-blocked-events/) or when you're using [Segment-Managed Custom Domain](/docs/segment/connections/sources/custom-domain/), you may want to send data to Segment's HTTP API directly.

> \[!NOTE]
>
> If you are located in the EU and use the `https://api.segment.io/v1/` endpoint, you might not see any errors, but your events will not appear in the Segment app. For more information about regional support, see the [Source Regional support](/docs/segment/guides/regional-segment/#source-regional-support) documentation.

## Headers

> \[!WARNING]
>
> The public IP addresses of the HTTP API service are not static and may change without notice. If you are caching the resolved IP address or directly using the IP for submission, you must implement a DNS refresh at least once every 24 hours. Failing to do so may result in submission failures if the underlying IPs change. To ensure long-term reliability, Segment **strongly recommends** using the DNS hostname rather than hardcoding IPs.

### Authentication

Choose between [writeKey authentication](#writekey-authentication), [basic authentication](#basic-authentication) and [OAuth](#oauth) to authenticate requests.

#### writeKey authentication

Authenticate to the Tracking API by sending your project's **Write Key** along with a request.
The authentication writeKey should be sent as part of the body of the request. This will be encrypted over https.

```shell
  curl --location 'https://api.segment.io/v1/track' \
  --header 'Content-Type: application/json' \
  --data-raw '{
      "event": "happy-path-a3ef8a6f-0482-4694-bc4d-4afba03a0eab",
      "email": "test@example.org",
      "userId": "123",
      "writeKey": "DmBXIN4JnwqBnTqXccTF0wBnLXNQmFtk"
  }'
```

> \[!NOTE]
>
> For this auth type, you do not need to set any authentication header.

#### Basic authentication

Basic authentication uses HTTP Basic Auth, which involves a `username:password` that is base64 encoded and prepended with the string `Basic`.

In practice that means taking a Segment source **Write Key**,`'abc123'`, as the username, adding a colon, and then the password field is left empty. After base64 encoding `'abc123:'` becomes `'YWJjMTIzOg=='`; and this is passed in the authorization header like so: `'Authorization: Basic YWJjMTIzOg=='`.

> \[!NOTE]
>
> Include a colon before encoding. While encoding the write key without a colon might work due to backward compatibility, this won't always be the case.

#### OAuth

[Obtain the access token](/docs/segment/connections/oauth/) from the Authorization Server specific to the region.

Include the access token in the Authorization header as a Bearer token along with your project's write key in the payload of the request. For example, Authorization with Bearer token looks like:

```text
Authorization: Bearer <access token>
```

For example, to use the access token in the HTTP API Source, use `access_token` in the header and `write_key` in the payload. An example cURL request looks like:

```shell
  curl --location 'https://api.segment.io/v1/track' \
  --header 'Content-Type: application/json' \
  --header 'Authorization: Bearer <access token>' \
  --data-raw '{
      "event": "happy-path-a3ef8a6f-0482-4694-bc4d-4afba03a0eab",
      "email": "test@example.org",
      "messageId": "58524f3a-3b76-4eac-aa97-d88bccdf4f77",
      "userId": "123",
      "type": "track",
      "writeKey": "DmBXIN4JnwqBnTqXccTF0wBnLXNQmFtk"
  }
```

You can reuse the access token until the expiry period specified on the OAuth application.

### Content-type

To send data to Segment's HTTP API, a content-type header must be set to `'application/json'`.

## Rate limits

For each workspace, Segment recommends you to not exceed 1,000 requests per second with the HTTP API. If you exceed this, Segment reserves the right to queue any additional events and process those at a rate that doesn't exceed the limit. Requests that exceed acceptable limits may be rejected with HTTP Status Code 429. When Segment rejects the requests, the response header contains `Retry-After` and `X-RateLimit-Reset` headers, which contains the number of seconds after which you can retry the request.

To request a higher limit, contact [Segment](mailto:friends@segment.com).

For [`batch` requests](#batch), there's a limit of 500 KB
per request.

> \[!WARNING]
>
> Engage has a limit of 1,000 events per second for inbound data. Visit the [Engage Default Limits documentation](/docs/segment/engage/product-limits/) to learn more.

## Max request size

There is a maximum of `32 KB` per normal API request. The `batch` API endpoint accepts a maximum of `500 KB` per request, with a limit of `32 KB` per event in the batch. If you are sending data from a server or Analytics.js source, Segment's API responds with `400 Bad Request` if these limits are exceeded.

## Regional configuration

For Business plans with access to [Regional Segment](/docs/segment/guides/regional-segment), you can use the `host` configuration parameter to send data to the desired region:

1. Oregon (Default) — `api.segment.io/`
2. Dublin — `events.eu1.segmentapis.com/`

## Identify

Identify lets you tie a user to their actions and record traits about them. It includes a unique User ID and any optional traits you know about them.

Segment recommends calling Identify a single time when the user's account is first created, and only identifying again later when their traits change.

Example Identify call:

```text
POST https://api.segment.io/v1/identify
```

```json
{
  "userId": "019mr8mf4r",
  "traits": {
    "email": "pgibbons@example.com",
    "name": "Peter Gibbons",
    "industry": "Technology"
  },
  "context": {
    "ip": "24.5.68.47"
  },
  "timestamp": "2012-12-02T00:30:08.276Z",
  "writeKey": "YOUR_WRITE_KEY"
}
```

This call is identifying the user by their unique User ID (the one you know them by in your database) and labeling them with `email`, `name`, and `industry` traits.

| Field          |                                                      | Type   | Description                                                                                                                                                                                                                                                                                                                                                                                                                                                   |
| -------------- | ---------------------------------------------------- | ------ | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `anonymousId`  | *required; optional if `userID` is set instead*      | String | A pseudo-unique substitute for a User ID, for cases when you don't have an absolutely unique identifier. A `userId` or an `anonymousId` is required.<br /><br />  See the [Identities docs](/docs/segment/connections/spec/identify#identities) for more details.<br />                                                                                                                                                                                       |
| `context`      | *optional*                                           | Object | Dictionary of extra information that provides useful context about a message, but is not directly related to the API call like `ip` address or `locale`<br /><br />  See the [Context field docs](/docs/segment/connections/spec/common#context) for more details.<br />                                                                                                                                                                                      |
| `integrations` | *optional*                                           | Object | Dictionary of destinations to either enable or disable<br /><br />  See the [Destinations field docs](/docs/segment/connections/spec/common#integrations) for more details.<br />                                                                                                                                                                                                                                                                             |
| `timestamp`    | *optional*                                           | Date   | Timestamp when the message itself took place, defaulted to the current time by the Segment Tracking API, as a [ISO-8601](http://en.wikipedia.org/wiki/ISO_8601) format date string.<br /><br />  If the event just happened, leave it out and we'll use the server's time. If you're importing data from the past, make sure you to provide a `timestamp`.See the [Timestamps fields docs](/docs/segment/connections/spec/common#timestamps) for more detail. |
| `traits`       | *optional*                                           | Object | Free-form dictionary of traits of the user, like `email` or `name`.<br /><br />  See the [Custom traits section](/docs/segment/connections/spec/identify/#custom-traits) for a list of reserved trait names.<br />                                                                                                                                                                                                                                            |
| `userId`       | *required; optional if `anonymousID` is set instead* | String | Unique identifier for the user in your database.<br /><br />  A `userId` or an `anonymousId` is required.<br /><br />  See the [Identities docs](/docs/segment/connections/spec/identify#identities) for more details.<br />                                                                                                                                                                                                                                  |

Find details on the **identify method payload** in the [Segment Spec](/docs/segment/connections/spec/identify/).

## Track

Track lets you record the actions your users perform. Every action triggers an "event", which can also have associated properties.

You'll want to track events that are indicators of success for your site, like **Signed Up**, **Item Purchased** or **Article Bookmarked**.

To get started, try tracking just a few important events. You can always add more later.

Example Track call:

```text
POST https://api.segment.io/v1/track
```

```json
{
  "userId": "019mr8mf4r",
  "event": "Item Purchased",
  "properties": {
    "name": "Leap to Conclusions Mat",
    "revenue": 14.99
  },
  "context": {
    "ip": "24.5.68.47"
  },
  "timestamp": "2012-12-02T00:30:12.984Z",
  "writeKey": "YOUR_WRITE_KEY"
}
```

Track event properties can be anything you want to record. In this case, `name` and `revenue`.

The Track call has the following fields:

| Field          |                                                      | Type   | Description                                                                                                                                                                                                                                                                                                                                                                                                                                                   |
| -------------- | ---------------------------------------------------- | ------ | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `anonymousId`  | *required; optional if `userID` is set instead*      | String | A pseudo-unique substitute for a User ID, for cases when you don't have an absolutely unique identifier. A `userId` or an `anonymousId` is required.<br /><br />  See the [Identities docs](/docs/segment/connections/spec/identify#identities) for more details.<br />                                                                                                                                                                                       |
| `context`      | *optional*                                           | Object | Dictionary of extra information that provides useful context about a message, but is not directly related to the API call like `ip` address or `locale`<br /><br />  See the [Context field docs](/docs/segment/connections/spec/common#context) for more details.<br />                                                                                                                                                                                      |
| `event`        | *required*                                           | String | Name of the action that a user has performed.<br /><br />    See the [Event field docs](/docs/segment/connections/spec/track#event) for more details.<br />                                                                                                                                                                                                                                                                                                   |
| `integrations` | *optional*                                           | Object | Dictionary of destinations to either enable or disable<br /><br />  See the [Destinations field docs](/docs/segment/connections/spec/common#integrations) for more details.<br />                                                                                                                                                                                                                                                                             |
| `properties`   | *optional*                                           | Object | Free-form dictionary of properties of the event, like `revenue`<br /><br />    See the [Properties docs](/docs/segment/connections/spec/track#properties) for a list of reserved property names.<br />                                                                                                                                                                                                                                                        |
| `timestamp`    | *optional*                                           | Date   | Timestamp when the message itself took place, defaulted to the current time by the Segment Tracking API, as a [ISO-8601](http://en.wikipedia.org/wiki/ISO_8601) format date string.<br /><br />  If the event just happened, leave it out and we'll use the server's time. If you're importing data from the past, make sure you to provide a `timestamp`.See the [Timestamps fields docs](/docs/segment/connections/spec/common#timestamps) for more detail. |
| `userId`       | *required; optional if `anonymousID` is set instead* | String | Unique identifier for the user in your database.<br /><br />  A `userId` or an `anonymousId` is required.<br /><br />  See the [Identities docs](/docs/segment/connections/spec/identify#identities) for more details.<br />                                                                                                                                                                                                                                  |

Find details on **best practices in event naming** as well as the **Track method payload** in the [Segment Spec](/docs/segment/connections/spec/track/).

## Page

The [Page](/docs/segment/connections/spec/page/) method lets you record page views on your website, along with optional extra information about the page being viewed.

Example Page call:

```text
POST https://api.segment.io/v1/page
```

```json
{
  "userId": "019mr8mf4r",
  "name": "Tracking HTTP API",
  "timestamp": "2012-12-02T00:31:29.738Z",
  "writeKey": "YOUR_WRITE_KEY"
}
```

The Page call has the following fields:

| Field          |                                                      | Type   | Description                                                                                                                                                                                                                                                                                                                                                                                                                                                   |
| -------------- | ---------------------------------------------------- | ------ | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `anonymousId`  | *required; optional if `userID` is set instead*      | String | A pseudo-unique substitute for a User ID, for cases when you don't have an absolutely unique identifier. A `userId` or an `anonymousId` is required.<br /><br />  See the [Identities docs](/docs/segment/connections/spec/identify#identities) for more details.<br />                                                                                                                                                                                       |
| `context`      | *optional*                                           | Object | Dictionary of extra information that provides useful context about a message, but is not directly related to the API call like `ip` address or `locale`<br /><br />  See the [Context field docs](/docs/segment/connections/spec/common#context) for more details.<br />                                                                                                                                                                                      |
| `integrations` | *optional*                                           | Object | Dictionary of destinations to either enable or disable<br /><br />  See the [Destinations field docs](/docs/segment/connections/spec/common#integrations) for more details.<br />                                                                                                                                                                                                                                                                             |
| `name`         | *optional*                                           | String | Name of the page<br /><br />    For example, most sites have a "Signup" page that can be useful to tag, so you can see users as they move through your funnel.<br />                                                                                                                                                                                                                                                                                          |
| `properties`   | *optional*                                           | Object | Free-form dictionary of properties of the page, like `url` and `referrer`<br /><br />  See the [Properties field docs](/docs/segment/connections/spec/page#properties) for a list of reserved property names.                                                                                                                                                                                                                                                 |
| `timestamp`    | *optional*                                           | Date   | Timestamp when the message itself took place, defaulted to the current time by the Segment Tracking API, as a [ISO-8601](http://en.wikipedia.org/wiki/ISO_8601) format date string.<br /><br />  If the event just happened, leave it out and we'll use the server's time. If you're importing data from the past, make sure you to provide a `timestamp`.See the [Timestamps fields docs](/docs/segment/connections/spec/common#timestamps) for more detail. |
| `userId`       | *required; optional if `anonymousID` is set instead* | String | Unique identifier for the user in your database.<br /><br />  A `userId` or an `anonymousId` is required.<br /><br />  See the [Identities docs](/docs/segment/connections/spec/identify#identities) for more details.<br />                                                                                                                                                                                                                                  |

Find details on the **Page payload** in the [Segment Spec](/docs/segment/connections/spec/page/).

## Screen

The [Screen](/docs/segment/connections/spec/screen/) method let you record whenever a user sees a screen of your mobile app.

You'll want to send the Screen message whenever a user requests a page of your app.

Example Screen call:

```text
POST https://api.segment.io/v1/screen
```

```json
{
  "userId": "019mr8mf4r",
  "name": "Tracking HTTP API",
  "timestamp": "2012-12-02T00:31:29.738Z",
  "writeKey": "YOUR_WRITE_KEY"
}
```

The Screen call has the following fields:

| Field          |                                                      | Type   | Description                                                                                                                                                                                                                                                                                                                                                                                                                                                   |
| -------------- | ---------------------------------------------------- | ------ | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `anonymousId`  | *required; optional if `userID` is set instead*      | String | A pseudo-unique substitute for a User ID, for cases when you don't have an absolutely unique identifier. A `userId` or an `anonymousId` is required.<br /><br />  See the [Identities docs](/docs/segment/connections/spec/identify#identities) for more details.<br />                                                                                                                                                                                       |
| `context`      | *optional*                                           | Object | Dictionary of extra information that provides useful context about a message, but is not directly related to the API call like `ip` address or `locale`<br /><br />  See the [Context field docs](/docs/segment/connections/spec/common#context) for more details.<br />                                                                                                                                                                                      |
| `integrations` | *optional*                                           | Object | Dictionary of destinations to either enable or disable<br /><br />  See the [Destinations field docs](/docs/segment/connections/spec/common#integrations) for more details.<br />                                                                                                                                                                                                                                                                             |
| `name`         | *optional*                                           | String | Name of the screen<br /><br />  See the [Name field docs](/docs/segment/connections/spec/screen#name) for more details.<br />                                                                                                                                                                                                                                                                                                                                 |
| `properties`   | *optional*                                           | Object | Free-form dictionary of properties of the screen, like `name`<br /><br />  See the [Properties field docs](/docs/segment/connections/spec/screen#properties) for a list of reserved property names.<br />                                                                                                                                                                                                                                                     |
| `timestamp`    | *optional*                                           | Date   | Timestamp when the message itself took place, defaulted to the current time by the Segment Tracking API, as a [ISO-8601](http://en.wikipedia.org/wiki/ISO_8601) format date string.<br /><br />  If the event just happened, leave it out and we'll use the server's time. If you're importing data from the past, make sure you to provide a `timestamp`.See the [Timestamps fields docs](/docs/segment/connections/spec/common#timestamps) for more detail. |
| `userId`       | *required; optional if `anonymousID` is set instead* | String | Unique identifier for the user in your database.<br /><br />  A `userId` or an `anonymousId` is required.<br /><br />  See the [Identities docs](/docs/segment/connections/spec/identify#identities) for more details.<br />                                                                                                                                                                                                                                  |

Find details on the **Screen payload** in the [Segment Spec](/docs/segment/connections/spec/screen/).

## Group

Group lets you associate an [identified user](/docs/segment/connections/sources/catalog/libraries/server/node/#identify) with a group. A group could be a company, organization, account, project, or team. It also lets you record custom traits about the group, like industry or number of employees.

This is useful for tools like [Intercom](/docs/segment/connections/destinations/catalog/intercom/), [Preact](/docs/segment/connections/destinations/catalog/preact/) and [Totango](/docs/segment/connections/destinations/catalog/totango/), as it ties the user to a **group** of other users.

Example Group call:

```text
POST https://api.segment.io/v1/group
```

```json
{
  "userId": "019mr8mf4r",
  "groupId": "8e9df332ac",
  "traits": {
    "name": "Initech",
    "industry": "Technology",
    "employees": 420
  },
  "timestamp": "2012-12-02T00:31:38.208Z",
  "writeKey": "YOUR_WRITE_KEY"
}
```

The Group call has the following fields:

| Field          |                                                      | Type   | Description                                                                                                                                                                                                                                                                                                                                                                                                                                                   |
| -------------- | ---------------------------------------------------- | ------ | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `anonymousId`  | *required; optional if `userID` is set instead*      | String | A pseudo-unique substitute for a User ID, for cases when you don't have an absolutely unique identifier. A `userId` or an `anonymousId` is required.<br /><br />  See the [Identities docs](/docs/segment/connections/spec/identify#identities) for more details.<br />                                                                                                                                                                                       |
| `context`      | *optional*                                           | Object | Dictionary of extra information that provides useful context about a message, but is not directly related to the API call like `ip` address or `locale`<br /><br />  See the [Context field docs](/docs/segment/connections/spec/common#context) for more details.<br />                                                                                                                                                                                      |
| `groupId`      | *required*                                           | String | A unique identifier for the group in your database.<br /><br />  See the [Group ID field docs](/docs/segment/connections/spec/group#group-id) for more detail.<br />                                                                                                                                                                                                                                                                                          |
| `integrations` | *optional*                                           | Object | Dictionary of destinations to either enable or disable<br /><br />  See the [Destinations field docs](/docs/segment/connections/spec/common#integrations) for more details.<br />                                                                                                                                                                                                                                                                             |
| `timestamp`    | *optional*                                           | Date   | Timestamp when the message itself took place, defaulted to the current time by the Segment Tracking API, as a [ISO-8601](http://en.wikipedia.org/wiki/ISO_8601) format date string.<br /><br />  If the event just happened, leave it out and we'll use the server's time. If you're importing data from the past, make sure you to provide a `timestamp`.See the [Timestamps fields docs](/docs/segment/connections/spec/common#timestamps) for more detail. |
| `traits`       | *optional*                                           | Object | Free-form dictionary of traits of the group, like `email` or `name`<br /><br />  See the [Traits field docs](/docs/segment/connections/spec/group#traits) for a list of reserved trait names.<br />                                                                                                                                                                                                                                                           |
| `userId`       | *required; optional if `anonymousID` is set instead* | String | Unique identifier for the user in your database.<br /><br />  A `userId` or an `anonymousId` is required.<br /><br />  See the [Identities docs](/docs/segment/connections/spec/identify#identities) for more details.<br />                                                                                                                                                                                                                                  |

Find more details about Group including the **Group payload** in the [Segment Spec](/docs/segment/connections/spec/group/).

## Alias

Alias is how you associate one identity with another. This is an advanced method, but it is required to manage user identities successfully in *some* of Segment's destinations.

In [Mixpanel](/docs/segment/connections/destinations/catalog/mixpanel/#alias) it's used to associate an anonymous user with an identified user once they sign up. For [Kissmetrics](/docs/segment/connections/destinations/catalog/kissmetrics/#alias), if your user switches IDs, you can use 'alias' to rename the 'userId'.

Example Alias call:

```text
POST https://api.segment.io/v1/alias
```

```json
{
  "previousId": "39239-239239-239239-23923",
  "userId": "019mr8mf4r",
  "timestamp": "2012-12-02T00:31:29.738Z",
  "writeKey": "YOUR_WRITE_KEY"
}
```

The Alias call has the following fields:

| Field          |                                                      | Type   | Description                                                                                                                                                                                                                                                                                                                                                                                                                                                   |
| -------------- | ---------------------------------------------------- | ------ | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `context`      | *optional*                                           | Object | Dictionary of extra information that provides useful context about a message, but is not directly related to the API call like `ip` address or `locale`<br /><br />  See the [Context field docs](/docs/segment/connections/spec/common#context) for more details.<br />                                                                                                                                                                                      |
| `integrations` | *optional*                                           | Object | Dictionary of destinations to either enable or disable<br /><br />  See the [Destinations field docs](/docs/segment/connections/spec/common#integrations) for more details.<br />                                                                                                                                                                                                                                                                             |
| `previousId`   | *required*                                           | String | Previous unique identifier for the user<br /><br />  See the [Previous ID field docs](/docs/segment/connections/spec/alias#previous-id) for more details.<br />                                                                                                                                                                                                                                                                                               |
| `timestamp`    | *optional*                                           | Date   | Timestamp when the message itself took place, defaulted to the current time by the Segment Tracking API, as a [ISO-8601](http://en.wikipedia.org/wiki/ISO_8601) format date string.<br /><br />  If the event just happened, leave it out and we'll use the server's time. If you're importing data from the past, make sure you to provide a `timestamp`.See the [Timestamps fields docs](/docs/segment/connections/spec/common#timestamps) for more detail. |
| `userId`       | *required; optional if `anonymousID` is set instead* | String | Unique identifier for the user in your database.<br /><br />  A `userId` or an `anonymousId` is required.<br /><br />  See the [Identities docs](/docs/segment/connections/spec/identify#identities) for more details.<br />                                                                                                                                                                                                                                  |

For more details on the Alias call and payload, see the [Segment Spec](/docs/segment/connections/spec/alias/).

## Historical import

You can import historical data by adding the `timestamp` argument to any of your method calls. This can be helpful if you've just switched to Segment.

Historical imports can only be done into destinations that can accept historical timestamped data. Most analytics tools like Mixpanel, Amplitude, and Kissmetrics can handle that type of data just fine. One common destination that does not accept historical data is Google Analytics since their API cannot accept historical data.

> \[!NOTE]
>
> If you're tracking things that are happening right now, leave out the `timestamp` and Segment servers will timestamp the requests for you.

## Batch

The `batch` method lets you send a series of Identify, Group, Track, Page and Screen requests in a single batch, saving on outbound requests. Segment's server-side and mobile [sources](/docs/segment/connections/sources/) make use of this method automatically for higher performance.

There is a maximum of `500 KB
 ` per batch request and `32 KB
 ` per call.

> \[!WARNING]
>
> Segment's HTTP Tracking API accepts batch requests up to **500 KB**. To avoid errors in event creation, ensure that individual event payload sizes remain below **32 KB**.

Here's the what the `batch` request signature looks like:

```text
POST https://api.segment.io/v1/batch
```

```json
{
  "batch": [
    {
      "type": "identify",
      "userId": "019mr8mf4r",
      "traits": {
        "email": "jake@yahoo.com",
        "name": "Jake Peterson",
        "age": 26
      },
      "timestamp": "2012-12-02T00:30:08.276Z"
    },
    {
      "type": "track",
      "userId": "019mr8mf4r",
      "event": "Song Played",
      "properties": {
        "name": "Fallin for You",
        "artist": "Dierks Bentley"
      },
      "timestamp": "2012-12-02T00:30:12.984Z"
    },
    {
      "type": "identify",
      "userId": "971mj8mk7p",
      "traits": {
        "email": "cindy@example.com",
        "name": "Cindy Gonzalez",
        "age": 23
      },
      "timestamp": "2015-2-02T00:30:08.276Z"
    },
    {
      "type": "track",
      "userId": "971mj8mk7p",
      "event": "Song Played",
      "properties": {
        "name": "Get Right",
        "artist": "Jennifer Lopez"
      },
      "timestamp": "2015-2-02T00:30:12.984Z"
    }
  ],
  "writeKey": "YOUR_WRITE_KEY",
  "context": {
    "device": {
      "type": "phone",
      "name": "Apple iPhone 6"
    }
  }
}
```

| Field          |                    |                                                                                                                                                                                    | Type | Description |
| -------------- | ------------------ | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ---- | ----------- |
| `batch`        | *Array*            | An array of Identify, Group, Track, Page and Screen method calls. Each call **must** have an `type` property with a valid method name.                                             |      |             |
| `context`      | *Object, optional* | The same as [Context](/docs/segment/connections/spec/common#context) for other calls, but it will be merged with any context inside each of the items in the batch.                |      |             |
| `integrations` | *Object, optional* | The same as [Destinations](/docs/segment/connections/spec/common#integrations) for other calls, but it will be merged with any destinations inside each of the items in the batch. |      |             |

## Selecting destinations

The Alias, Group, Identify, Page and Track calls can all be passed an object of `integrations` that lets you turn certain destinations on or off. By default all destinations are enabled.

Here's an example showing an Identify call that only goes to Mixpanel and Kissmetrics:

```text
POST https://api.segment.io/v1/identify
```

```json
{
  "userId": "019mr8mf4r",
  "traits": {
    "email": "pgibbons@example.com",
    "name": "Peter Gibbons",
    "industry": "Technology"
  },
  "context": {
    "ip": "24.5.68.47"
  },
  "timestamp": "2012-12-02T00:30:08.276Z",
  "integrations": {
    "All": false,
    "Mixpanel": true,
    "Kissmetrics": true,
    "Google Analytics": false
  },
  "writeKey": "YOUR_WRITE_KEY"
}
```

`'All': false` says that no destination should be enabled unless otherwise specified. `'Mixpanel': true` turns on Mixpanel, `"Kissmetrics": true,` turns on Kissmetrics, and so on.

Destination flags are **case sensitive** and match [the destination's name in the docs](/docs/segment/connections/destinations/catalog/) (for example, "AdLearn Open Platform", "awe.sm", "MailChimp", and so on).

**Note**:

* Available at the business level, filtering track calls can be done right from the Segment UI on your source schema page. Segment recommends using the UI if possible since it's a much simpler way of managing your filters and can be updated with no code changes on your side.
* If you are on a grandfathered plan, events sent server-side that are filtered through the Segment dashboard will still count towards your API usage.

## Collecting the IP address

When sending a HTTP call from a user's device, you can collect the IP address by setting `context.direct` to `true`.

## Errors

Segment returns a `200` response for all API requests except errors caused by large payloads and JSON errors (which return `400` responses.) To debug events that return `200` responses but aren't accepted by Segment, use the Segment Debugger.

Common reasons that events are not accepted by Segment:

* **Payload is too large:** Most HTTP API routes can handle API requests that are 32 KB
  or smaller. If this limit is exceeded, Segment returns a 400 Bad Request error.
* **The `\batch` API endpoint:** This endpoint accepts a maximum of 500 KB
  per batch API request. Each batch request can only have up to 2500 events, and each batched event needs to be less than 32 KB
  . Segment returns a `200` response but rejects the event when the number of batched events exceeds the limit.
* **Identifier is not present**: The HTTP API requires that each payload has a userId and/or anonymousId. If you send events without either the userId or anonymousId, Segment's tracking API responds with an no\_user\_anon\_id error. Check the event payload and client instrumentation for more details.
* **Track event is missing name**: All Track events sent to Segment must have an `event` field.
* **Deduplication**: Segment deduplicates events using the `messageId` field, which is automatically added to all payloads coming into Segment. If you're setting up the HTTP API yourself, ensure all events have unique messageId values with fewer than 100 characters.
* **Invalid JSON**: If you send an event with invalid JSON, Segment returns a 400 Bad Request error.
* **Incorrect credentials**: Double check your credentials for your downstream destinations.
* **Destination incompatibility**: Make sure that the destination you are troubleshooting can accept server-side API calls. You can see compatibility information on the [Destination comparison by category](/docs/segment/connections/destinations/category-compare/) page and in the documentation for your specific destination.
* **Destination-specific requirements**: Check the documentation specific to the destination to see if there are other requirements for using the method and destination that you're trying to get working.

Segment welcomes feedback on API responses and error messages. [Reach out to support](https://segment.com/help/contact/) with any requests or suggestions you may have.

## Troubleshooting

### No events in my debugger

1. Double check that you've set up the library correctly.
2. Make sure that you're calling a Segment API method after the library is successfully installed: [Identify](#identify), [Track](#track), and so on.

### Experiencing `5xx` errors

If you're experiencing `5xx` errors, refresh the IP address you use to invoke Segment's HTTP API.
