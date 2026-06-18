# Spec: Screen

The Screen call lets you record whenever a user sees a screen, the mobile equivalent of Page, in your mobile app, along with any properties about the screen. Calling Page or [Screen](/docs/segment/connections/spec/screen/) in one of Segment's [sources](/docs/segment/connections/sources/) is one of the first steps to getting started with Segment.

[Segment University: The Screen Method](https://university.segment.com/introduction-to-segment/299973?reg=1\&referrer=docs)

Check out our high-level overview of the Screen method in Segment University. (Must be logged in to access.)

Here's the payload of a typical Screen call, with most [common fields](/docs/segment/connections/spec/common/) removed:

```json
{
  "type": "screen",
  "name": "Home",
  "properties": {
    "Feed Type": "private"
  }
}
```

And here's the corresponding Objective-C event that would generate the above payload:

```objc
[[SEGAnalytics sharedAnalytics] screen:@"Home"
                            properties:@{ @"Feed Type": @"private" }];
```

> \[!NOTE]
>
> Based on the library you use, the syntax in the examples might be different. You can find library-specific documentation on the [Sources Overview](/docs/segment/connections/sources/) page.

Beyond the common fields, the Screen call takes the following fields:

| Field        |            | Type   | Description                                                                                                                                                                                               |
| ------------ | ---------- | ------ | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `name`       | *optional* | String | Name of the screen<br /><br />  See the [Name field docs](/docs/segment/connections/spec/screen#name) for more details.<br />                                                                             |
| `properties` | *optional* | Object | Free-form dictionary of properties of the screen, like `name`<br /><br />  See the [Properties field docs](/docs/segment/connections/spec/screen#properties) for a list of reserved property names.<br /> |

## Example

Here's a complete example of a Screen call:

```json
{
  "anonymousId": "3a12eab0-bca7-11e4-8dfc-aa07a5b093db",
  "channel": "mobile",
  "context": {
    "ip": "8.8.8.8"
  },
  "integrations": {
    "All": true,
    "Mixpanel": false,
    "Salesforce": false
  },
  "messageId": "022bb90c-bbac-11e4-8dfc-aa07a5b093db",
  "name": "Home",
  "properties": {
    "variation": "blue signup button"
  },
  "receivedAt": "2015-02-23T22:28:55.387Z",
  "sentAt": "2015-02-23T22:28:55.111Z",
  "timestamp": "2015-02-23T22:28:55.111Z",
  "type": "screen",
  "userId": "97980cfea0067",
  "version": "1.1"
}
```

## Identities

The User ID is a unique identifier for the user performing the actions. Check out the [User ID docs](/docs/segment/connections/spec/identify#user-id) for more detail.

The Anonymous ID can be any pseudo-unique identifier, for cases where you don't know who the user is, but you still want to tie them to an event. Check out the [Anonymous ID docs](/docs/segment/connections/spec/identify#anonymous-id) for more detail.

**Note: In our browser and mobile libraries a User ID is automatically added** from the state stored by a previous [`identify`](/docs/segment/connections/spec/identify/) call, so you do not need to add it yourself. They will also automatically handle Anonymous IDs under the covers.

## Name

Each screen can be tagged with a `name`. For example, many apps have a "Signup" screen that can be useful to tag so that you can see users as they move through your funnel.

## Properties

Properties are extra pieces of information that describe the screen. They can be anything you want.

Segment has reserved some properties with semantic meanings and handles them in special ways. You should **only use reserved properties for their intended meaning**.

Reserved properties that Segment has standardized:

| Property | Type   | Description                                          |
| -------- | ------ | ---------------------------------------------------- |
| `name`   | String | Name of the screen. This is reserved for future use. |
