# Track Subscriptions

By default clients connecting to a Room subscribe to all tracks published
and as such all participants can see and hear all other participants. The Track
Subscription API allows you to change this behavior and manage a Room's communication
topology via the REST API. There are many possibilities; for example one
participant could be set up as a silent observer, or the Room could be
arranged so that all participants are only subscribed to the video and audio of
a single presenter. Specifically, the API allows you to:

* Define a Participant's Track subscribe rules.
* Enumerate a Participant's subscribed Tracks.

> \[!WARNING]
>
> Use the Track Subscription API to set up the subscription rules once per Room. Although it's possible to change the subscriptions rules at any time during the lifetime of the Room, you should use the Video Client SDK for precise control over the tracks a participant subscribes to. In addition, you can dynamically switch on or off the tracks a participant has subscribed to using the [`clientTrackSwitchOffControl`](/docs/video/tutorials/using-bandwidth-profile-api#understanding-clienttrackswitchoffcontrol) feature of the Network Bandwidth Profile API.

## Communication Topologies in Rooms \[#topologies-gr]

Twilio Rooms media communications work though a publish/subscribe model
that relies on the following principles:

* When a participant publishes an audio, video or data track such track is
  assigned a SID and the client SDK starts sending the media bitstream to Twilio.
* When a participant subscribes to a track, Twilio clones and forwards the
  track bitstream to that participant.

This document describes how the Track Subscription API can be used for
setting which participants subscribe to which tracks. Some possible
subscription models developers can implement using this API are the following:

* Subscribe-to-all: each participant subscribes to all the published tracks.
  This is the default in Rooms. It is commonly used in collaboration
  applications where participants communicate with all the rest.
* Subscribe-to-one: participants subscribe only to a presenter's tracks.
  This is often used in single-presenter webinars where viewers cannot contribute
  to the presentation.
* Subscribe-to-some: where participants subscribe to the tracks published by a
  set of speakers. It is common in collaborative presentations or in
  presentations where viewers can temporarily become presenters.
* Whisperers: some participants (i.e. the whisperers) subscribe to all, but can
  only be listened/viewed by some. Whisperers are common to train and supervise
  video contact center agents.
* etc.

![Diagram showing Twilio SFU subscribe-to-all model with tracks published to participants.](https://docs-resources.prod.twilio.com/e91fe4f1ef9d1c2d022664bd8e90f5395a3936b828bef4dc7d06d6e2d6f2c122.gif)

*By default, Rooms use a "subscribe-to-all" model. Hence, each participant
subscribes to all the tracks published to the room by the rest of participants.*

## URI Schemes \[#uri-schemes]

For the sake of simplicity, we define the Participant Resource URI as:

```bash
PARTICIPANT_URI = https://video.twilio.com/v1/Rooms/{RoomNameOrSid}/Participants/{ParticipantIdentityOrSid}
```

As children, the resources of the Track Subscription API are:

* `PARTICIPANT_URI/SubscribedTracks`
  * `GET`: Lists the Tracks subscribed by the specified Participant.
* `PARTICIPANT_URI/SubscribedTracks/{TrackSid}/`
  * `GET`: Retrieves the SubscribedTrack instance resource with information about the
    subscription of the specified Track by the specified Participant.
* `PARTICIPANT_URI/SubscribeRules`
  * `GET`: Retrieves the subscribe rules for the specified Participant.
  * `POST`: Updates the subscribe rules of the specified Participant

## The SubscribedTrack Instance Resource \[#st-resource]

A `SubscribedTrack` instance is a `Participant`'s resource that represents the
subscription such Participant has for a given Track.

### Resource URI \[#st-uri]

`PARTICIPANT_URI/SubscribedTracks/{TrackSid}/`

### Resource Properties \[#st-properties]

This resource has the following properties:

```json
{"type":"object","refName":"video.v1.room.room_participant.room_participant_subscribed_track","modelName":"video_v1_room_room_participant_room_participant_subscribed_track","properties":{"sid":{"type":"string","minLength":34,"maxLength":34,"pattern":"^MT[0-9a-fA-F]{32}$","nullable":true,"description":"The unique string that we created to identify the RoomParticipantSubscribedTrack resource."},"participant_sid":{"type":"string","minLength":34,"maxLength":34,"pattern":"^PA[0-9a-fA-F]{32}$","nullable":true,"description":"The SID of the participant that subscribes to the track."},"publisher_sid":{"type":"string","minLength":34,"maxLength":34,"pattern":"^PA[0-9a-fA-F]{32}$","nullable":true,"description":"The SID of the participant that publishes the track."},"room_sid":{"type":"string","minLength":34,"maxLength":34,"pattern":"^RM[0-9a-fA-F]{32}$","nullable":true,"description":"The SID of the room where the track is published."},"name":{"type":"string","nullable":true,"description":"The track name. Must have no more than 128 characters and be unique among the participant's published tracks."},"date_created":{"type":"string","format":"date-time","nullable":true,"description":"The date and time in GMT when the resource was created specified in [ISO 8601](https://en.wikipedia.org/wiki/ISO_8601) format."},"date_updated":{"type":"string","format":"date-time","nullable":true,"description":"The date and time in GMT when the resource was last updated specified in [ISO 8601](https://en.wikipedia.org/wiki/ISO_8601) format."},"enabled":{"type":"boolean","nullable":true,"description":"Whether the track is enabled."},"kind":{"type":"string","enum":["audio","video","data"],"description":"The track type. Can be: `audio`, `video` or `data`.","refName":"room_participant_subscribed_track_enum_kind","modelName":"room_participant_subscribed_track_enum_kind"},"url":{"type":"string","format":"uri","nullable":true,"description":"The absolute URL of the resource."}}}
```

### Get a Subscribed Track (HTTP GET) \[#get-st]

Retrieves the `SubscribedTrack` instance resource associated to the specified Participant and TrackSid.

### Other HTTP Methods

This resource does not support `POST`, `PUT` or `DELETE`. For modifying the
track subscriptions of a participant see the [SubscribeRules Resource](#sl-resource)
section below.

## The SubscribedTracks List Resource \[#stl-resource]

The `SubscribedTracks` list resource represents the subscriptions of a
given Participant in a Room.

### Resource URI \[#stl-uri]

`PARTICIPANT_URI/SubscribedTracks`

### Get a Participant's Subscribed Track List (HTTP GET) \[#get-stl]

Retrieves the list of subscribed tracks associated to the specified `Participant`
with paging data.

### Other HTTP Methods \[#other-http-methods-2]

This resource does not support `POST`, `PUT` or `DELETE`. For modifying the
track subscriptions of a participant see the [SubscribeRules Resource](#sl-resource)
section below.

## The SubscribeRules Resource \[#sl-resource]

The `SubscribeRules` resource is a singleton resource that represents the
subscribe rules that are enforced on a given Participant.

### Resource URI \[#sr-uri]

`PARTICIPANT_URI/SubscribeRules`

### Resource Properties \[#sr-properties]

This resource has the following properties:

```json
{"type":"object","refName":"video.v1.room.room_participant.room_participant_subscribe_rule","modelName":"video_v1_room_room_participant_room_participant_subscribe_rule","properties":{"participant_sid":{"type":"string","minLength":34,"maxLength":34,"pattern":"^PA[0-9a-fA-F]{32}$","nullable":true,"description":"The SID of the Participant resource for the Subscribe Rules."},"room_sid":{"type":"string","minLength":34,"maxLength":34,"pattern":"^RM[0-9a-fA-F]{32}$","nullable":true,"description":"The SID of the Room resource for the Subscribe Rules"},"rules":{"type":"array","nullable":true,"description":"A collection of Subscribe Rules that describe how to include or exclude matching tracks. See the [Specifying Subscribe Rules](https://www.twilio.com/docs/video/api/track-subscriptions#specifying-sr) section for further information.","items":{"type":"object","format":"subscribe-rule","properties":{"type":{"type":"string"},"all":{"type":"boolean"},"publisher":{"type":"string"},"track":{"type":"string"},"kind":{"type":"string"},"priority":{"type":"string"}}}},"date_created":{"type":"string","format":"date-time","nullable":true,"description":"The date and time in GMT when the resource was created specified in [ISO 8601](https://en.wikipedia.org/wiki/ISO_8601) format."},"date_updated":{"type":"string","format":"date-time","nullable":true,"description":"The date and time in GMT when the resource was last updated specified in [ISO 8601](https://en.wikipedia.org/wiki/ISO_8601) format."}}}
```

### Get a Participant's Subscribe Rules (HTTP GET) \[#sr-get]

Returns the subscribe rules of the specified Participant.

### Modify a Participant's Subscribe Rules (HTTP POST) \[#sr-post]

Updates the subscribe rules of the specified Participant. The following
parameters are supported:

### Path parameters

```json
[{"name":"RoomSid","in":"path","description":"The SID of the Room resource where the subscribe rules to update apply.","schema":{"type":"string"},"required":true},{"name":"ParticipantSid","in":"path","description":"The SID of the Participant resource to update the Subscribe Rules.","schema":{"type":"string"},"required":true}]
```

### Request body parameters

```json
{"schema":{"type":"object","title":"UpdateRoomParticipantSubscribeRuleRequest","properties":{"Rules":{"description":"A JSON-encoded array of subscribe rules. See the [Specifying Subscribe Rules](https://www.twilio.com/docs/video/api/track-subscriptions#specifying-sr) section for further information."}}},"examples":{"updateFilters":{"value":{"lang":"json","value":"{\n  \"Rules\": \"%5B%7B%22type%22%3A%22exclude%22%2C%22all%22%3A%20true%7D%5D\"\n}","meta":"","code":"{\n  \"Rules\": \"%5B%7B%22type%22%3A%22exclude%22%2C%22all%22%3A%20true%7D%5D\"\n}","tokens":[["{","#C9D1D9"],"\n  ",["\"Rules\"","#7EE787"],[":","#C9D1D9"]," ",["\"%5B%7B%22type%22%3A%22exclude%22%2C%22all%22%3A%20true%7D%5D\"","#A5D6FF"],"\n",["}","#C9D1D9"]],"annotations":[],"themeName":"github-dark","style":{"color":"#c9d1d9","background":"#0d1117"}}}},"encodingType":"application/x-www-form-urlencoded","conditionalParameterMap":{}}
```

For a deeper understanding on how subscribe rules work, see the
[Understanding Subscribe Rules](#understanding-sr) section below.

### Other HTTP Methods \[#other-http-methods-3]

This resource does not support `PUT` or `DELETE`.

## Understanding Subscribe Rules \[#understanding-sr]

Subscribe rules can be set:

* At Participant connect time. In this case they apply since the very beginning
  overriding the default "subscribe-to-all" policy. See section [Overriding the Default Rule](/docs/video/api/track-subscriptions#override-defaults) for further information.
* After the Participant is connected. In this case, they can modify
  subscriptions dynamically. See section [Modify a Participant's Subscribe Rules (HTTP `POST`)](/docs/video/api/track-subscriptions#sr-post) for further information.

### Specifying Subscribe Rules \[#specifying-sr]

A subscription rule instance is a JSON with the following structure:

```bash
{"type": rule_type, filter_name: filter_value, filter_name: filter_value, ...}
```

Where:

| Field                              | Description                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                        |
| ---------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `rule_type`                        | An identifier specifying the type of rule. Can be one of the following:-`include`: includes the tracks that match the filters into the subscription.-`exclude`: excludes the tracks that match the filters from the subscription.                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                  |
| `filter_name` and   `filter_value` | The `filter_name` must be one of the following:-`all`: the filter affects all tracks. Accepts only one value: `true` (matches all tracks)-`kind`: matches tracks of a given type. Accepts `video`, `audio` and `data` as values.-`publisher`: matches all tracks published by the Participant with the identity (case sensitive) or SID specified as value-`track`: matches tracks with the name (case sensitive) or SID specified as value. A rule containing multiple filters matches the set of tracks that comply with all of them. In other words, filters combine in a rule through a logical AND. Note also that the tracks published by a participant are never considered when evaluating such participant's filters. As a consequence, a participant cannot subscribe to her own tracks. |

Based on this, subscribe rules are specified as a JSON array containing up
to 20 rules. For example:

```bash
Rules = [
  {"type": "include", "all": true},                              //rule_1
  {"type": "exclude", "kind": "video"},                          //rule_2
  {"type": "include", "publisher": "Bob", "track": "screen"},    //rule_3
  {"type": "include", "track": "MTXXXXXXXXXXXXXXXXXXXXXXXXXXX"}, //rule_4
  ...
  rule_20
]
```

Remember that valid subscription rules comply with the following:

* The maximum number of rules that can be specified is 20.
* An empty set of rules (i.e. `[]`) is not allowed.
* A rule containing the `"all"` filter must have a value of `true`. Notice that
  this means `false` is not allowed.
* A rule having an `"all"` filter cannot have any other filters.
* A rule must contain a `"type"` field.
* If the `"kind"` filter is used, its value must be one of `audio`, `video` or `data`.
* A rule cannot contain several times the same filter (e.g. specify two different `kind`s or `publisher`s, etc.)

When invalid rules are specified, the currently active rules will not be updated
and the `POST` will be answered with an HTTP `400` error response like the following:

```bash
{
  "code": 53215,
  "message": "Invalid Subscribe Rule(s)",
  "more_info": "https://www.twilio.com/docs/errors/53215",
  "status": 400
}
```

For example, the following requests are invalid:

```bash
//Invalid because it's using an empty set
Rules = []
```

```bash
//Invalid because it uses false as value of "all"
Rules = [
  {"type":"include", "all": false}
]
```

```bash
//Invalid because it specifies a non supported kind
Rules = [
  {"type": "include", "all": true},
  {"type": "exclude", "kind": "wideo"}
]
```

```bash
//Invalid because it repeats the "kind" filter twice
Rules = [
  {"type": "include", "kind": "audio", "kind": "data"},
]
```

```bash
//Invalid because an "all" filter is not compatible with any other filter
Rules = [
  {"type": "include", "all": "true", "kind": "data"},
]
```

### Subscribe Rules Semantics \[#sr-semantics]

`SubscribeRules` are enforced by Twilio using four main principles:

1. Subscribe Rules semantics are based on [Algebra of Sets](https://en.wikipedia.org/wiki/Algebra_of_sets).
2. Subscribe Rules are stateless.
3. Subscribe Rules are enforced declaratively.
4. Subscribe Rules are initialized with a "subscribe-to-all" rule.

#### 1. Subscribe Rules Semantics are based on Algebra of Sets \[#sr-algebra]

We define the Set of Subscribed Tracks (SetST) as the set of tracks a given
participant should be subscribed to at any time. The SetST is computed by Twilio
using Algebra of Sets based on the following algorithm:

* The SetST is initialized to the empty set.
* The subscribe rules are applied to the SetST using Algebra of Sets in the
  order provided such that:
  * For any `include` rule we perform the union of the SetST with the set of
    tracks matching the rule filters.
  * For any `exclude` rule we perform the set difference of the SetST with
    the set of tracks matching by the rule filters.
* Participants are subscribed to all the tracks remaining in SetST after all
  the rules have been evaluated.

Let's illustrate this using an example. Imagine a Room
with three participants named: Alice, Bob and Carl, who publish the tacks
specified in the following table:

|                      | Alice (PTA)           | Bob (PTB)           | Carl (PTC)           |
| -------------------- | --------------------- | ------------------- | -------------------- |
| Audio Track          | `MTA_A` `alice-audio` | `MTB_A` `bob-audio` | `MTC_A` `carl-audio` |
| Video Track (cam)    | `MTA_C` `alice-cam`   | `MTB_C` `bob-cam`   | `MTC_C` `carl-cam`   |
| Video Track (screen) | `MTA_S` `screen`      | `MTB_S` `screen`    |                      |
| Data Track           |                       |                     | `MTC_D` `carl-data`  |

Notice that, for the sake of simplicity, we have assumed the following conventions:

* Track SIDs have the prefix `MT` followed by the participant initial and by a
  letter identifying the track nature (`_A` for audio, `_C` for webcam, `_S` for
  screenshare and `_D` for data).
* Track names are specified under their corresponding SIDs.

In this context, imagine that we `POST` the following rules to Alice's
`/SubscribeRules` resource:

```bash
Rules = [
  {"type": "include", "all": true},
  {"type": "exclude", "kind": "video"},
  {"type": "include", "publisher": "Bob", "track": "screen"}
]
```

Then, the algorithm will compute the tracks Alice should subscribe to in the
following way:

| Alice's rules (applied in the specified order)                                                       | Tracks in the SetST                                                      |
| ---------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------ |
| SetST is initialized to the empty set.                                                               | `[]`                                                                     |
| `{"type": "include", "all": true}` Includes all tracks (except Alice's ones.)                        | `[MTB_A,MTB_C,MTB_S,MTC_A,MTC_C,MTC_D]`                                  |
| `{"type": "exclude", "kind": "video"}` Excludes all video tracks.                                    | `[MTB_A,MTC_A,MTC_D]`                                                    |
| `{"type": "include",` `"publisher": "Bob", "track": "screen"}` Includes Bob's tracks named `screen`. | `[MTB_A,MTC_A,MTC_D,MTB_S]` Alice is finally subscribed to these Tracks. |

Still assuming the above specified Room scenario, consider the following
examples that might be interesting to understand how the subscription algorithm
works:

##### Example: Subscribe-to-all

When `POST`ing to Alice's subscribe rules the following:

```bash
Rules = [
  {"type": "include", "all": true}
]
```

Alice will subscribe to all the tracks (except for her own). Hence, the SetST will be:

```bash
[MTB_A,MTB_C,MTB_S,MTC_A,MTC_C,MTC_D]
```

This happens because:

* The SetST is initialized to the empty set `[]`
* The rule includes all the published tracks (except for her own)

##### Example: Subscribe-to-none

When `POST`ing to Alice's subscribe rules the following:

```bash
Rules = [
  {"type": "exclude", "all": true}
]
```

Alice will subscribe to no tracks:

```bash
[] //The empty set
```

This happens because:

* The SetST is initialized to the empty set `[]`
* The rules excludes all the tracks from the empty set, which is still the empty set.

##### Example: Single exclude rules

When `POST`ing to Alice's subscribe rules the following:

```bash
Rules = [
  {"type": "exclude", "kind": "video"}
]
```

Alice's subscribed tracks will be:

```bash
[] //The empty set
```

This happens because:

* The SetST is initialized to the empty set `[]`.
* The single rule excludes the video tracks from the empty set, which is still an empty set.

##### Example: include own tracks

When `POST`ing to Alice's subscribe rules the following:

```bash
Rules = [
    {"type": "include", "track": "alice-audio"}
]
```

Alice's subscribed tracks will be:

```bash
[] //The empty set
```

This happens because:

* The SetST is initialized to the empty set `[]`.
* Including a participant's own tracks will have no effect as rule filters never
  consider own published tracks. Hence the rule filter only matches the empty
  set and the union of two empty sets is still the empty set.

##### Example: Including tracks by name

When `POST`ing to Alice's subscribe rules the following:

```bash
Rules = [
  {"type": "include", "track": "screen"}
]
```

Alice's subscribed tracks will be:

```bash
[MTB_S] //Bob's screen track
```

This happens because:

* The SetST is initialized to the empty set `[]`.
* The rule includes all tracks named `screen`. There are two of them, one
  owned by Alice. As filters do not consider the participant's own tracks, then
  Alice subscribes to the union of `[MTB_S]` and the empty set. Filters containing
  participant or track names are case sensitive.

##### Example: Working with multiple filters

When `POST`ing to Carl's subscribe rules the following:

```bash
Rules = [
  {"type": "include", "all": true},
  {"type": "exclude", "publisher": "PTB", "kind": "audio"},
  {"type": "exclude", "kind": "video", "track": "screen"}
]
```

Carl's subscribed tracks will be:

```bash
[MTA_A, MTA_C, MTB_C]
```

This happens because:

* The SetST is initialized to the empty set `[]`.
* The first rule includes all tracks, except Carl's ones: `[MTA_A,MTA_C,MTA_S,MTB_A,MTB_C,MTB_S]`
* Given that filters intersect (i.e. you can read them as being connected
  through a logical AND), the second rule excludes all audio tracks published
  by Bob (we assume `PTB` is Bob's SID). That is, `MTB_A` is excluded.
* The third rule further excludes all video tracks named `screen`.
  Hence, `MTA_S` and `MTB_S` are also excluded.

##### Example: Considering rule order

When `POST`ing to Alice's subscribe rules the following:

```bash
Rules = [
  {"type": "include", "kind": "data"},
  {"type": "exclude", "publisher": "Carl"}
]
```

Alice's subscribed tracks will be:

```bash
[] //The empty set
```

This happens because:

* The SetST is initialized to the empty set `[]`.
* The first rule includes `MTC_D`
* The second rule excludes all of Carl's tracks, which removes `MTC_D` and
  results in the empty set.

However, when `POST`ing

```bash
Rules = [
  {"type": "exclude", "publisher": "Carl"},
  {"type": "include", "kind": "data"}
]
```

Alice's subscribed tracks will be:

```bash
[MTC_D]
```

This happens because:

* The SetST is initialized to the empty set `[]`.
* The first excludes Carl's tracks from the empty set, which is still the empty set.
* The third rule adds `MTC_D` to the SetST.

#### 2. Subscribe Rules are stateless \[#sr-stateless]

The Track Subscription API is stateless. This means that it has no memory of
rules or subscribed tracks. Every time a developer `POST`s a set of new subscription
rules, the previous rules are fully erased and replaced with new rules, which
are then enforced using the algorithm described in the section above.

To illustrate this, and assuming the Room scenario described above, let's
imagine that Carl wants to subscribe to all audio tracks and exclude the rest.
`POST`ing the following rules will do it:

```bash
Rules = [
  {"type": "include", "kind": "audio"}
]
```

Imagine now that Carl, while keeping his current audio subscriptions, also
wants to subscribe to Alice's screenshare. Carl could do it `POST`ing the following:

```bash
Rules = [
  {"type": "include", "kind": "audio"},
  {"type": "include", "track": "MTA_S"}
]
```

Observe that if the first rule is omitted, given the stateless nature of the
Track Subscription API, Carl would be subscribed only to `MTA_S` but not to
Alice's and Bob's audios.

If now Carl wants to stop receiving Alice's screen, but instead wants to see
Bob's webcam while still receiving all the audios, the `POST` should contain
something like this:

```bash
Rules = [
  {"type": "include", "kind": "audio"},
  {"type": "include", "track": "MTB_C"}
]
```

As you can see, each `POST` "resets" the subscribe rules making it
necessary to specify what should be included and excluded at all requests.

#### 3. Subscribe Rules are enforced declaratively \[#sr-declarative]

When developers `POST` subscribe rules to Twilio, those rules are enforced in
a dynamic way. That means that the algorithm does not only execute at `POST` time,
but it is executed every time there is change in the Room's available tracks.
Hence, once the rules have been `POST`ed, Twilio guarantees that they are enforced
at any time without requiring further developer intervention.

To illustrate this, let's imagine that the sequence of actions in our example
room is the following:

1. First Alice joins the room and publishes her 3 tracks.
2. Second Bob joins publishing his 3 tracks
3. Third Carl joins also publishing his audio and video tracks.
4. Fourth Carl publishes his data track
5. Then Bob leaves unpublishing his tracks.
6. Finally Carl also leaves.

In this scenario, imagine that the following subscribe rules are `POST`ed
to Alice's `/SubscribedTracks` just after she joins:

```bash
Rules=[
  {"type": "include", "kind": "audio"},
  {"type": "include", "track": "screen"},
  {"type": "exclude", "publisher": "Carl"},
  {"type": "include", "kind": "data"}
]
```

Just after the `POST`, Alice's subscribed tracks are:

```bash
[] //The empty set
```

This happens because Alice is alone in the room and cannot subscribe to her own
published tracks, no matter what the subscribe rules are.

Following the sequence above, now Bob connects to the Room publishing his 3
tracks. At that moment, given the declarative nature of subscribe rules, Alice's
subscribed tracks are re-evaluated to be:

```bash
[MTB_A, MTB_S]
```

Observe the above rules avoid using SIDs in the filters, we can create rules
affecting Alice's subscriptions to Bob's tracks even before Bob connects to the
room.

Next Carl joins and publishes audio and video tracks. Given that the third rule
excludes Carl's tracks, Alice's subscribed tracks stay the same:

```bash
[MTB_A, MTB_S]
```

After that, Carl publishes his Data Track. As the fourth rule is including all
tracks with kind equal to `data`, Alice's subscribed tracks evolve to:

```bash
[MTB_A, MTB_S, MTC_D]
```

At the fifth step, Bob leaves the room. Alice's subscriptions will be modified to be:

```bash
[MTC_D]
```

Last, when Carl leaves, Alice's will no be subscribed to any track any longer.

```bash
[] //The empty set
```

#### 4. Subscribe Rules are initialized with a "subscribe-to-all" rule \[#sb-default-rule]

When a participant joins a Room, Twilio automatically feeds a subscription
rule to that participant. We call it the `default_rule`:

```bash
{"type": "include", "all": true}
```

This happens automatically and only once at the time the participant connects.
Twilio does this for enforcing a default "subscribe-to-all" model. This means
that, if no further rules are provided, participants will connect to all the
published tracks, which is consistent with Rooms default behavior prior
to the existence of the Track Subscription API.

Thanks to this, Twilio guarantees backwards compatibility of all Room
applications. However, this has a drawback. To understand
why, let's use an example. Imagine that a developer wants Carl to just publish
to the room but not to subscribe to anything. In that case, the developer may
`POST` the following to Carl's rules:

```bash
Rules=[{"type":"exclude", "all": true}]
```

Indeed, this will remove the default rule with a new one enforcing a
"subscribe-to-none" model. However this `POST` can only be sent after Carl
connects. Hence, there is a race condition between the default rule, which
tries to subscribe Carl to all the tracks, and the `POST` that tries to remove all
subscriptions. This may degrade Carl's experience with some annoying
subscriptions that appear and disappear.

To avoid this, Twilio client SDK APIs allow to override the `default rule` at connect
time. Section [Overriding defaults](#override-defaults) below is devoted to
explain how.

## Managing Track Subscriptions with Twilio Client SDKs \[#mts-sdk]

### Overriding the Default Rule \[#override-defaults]

Twilio Video SDKs allows overriding the "subscribe-to-all" `default_rule`
at connect time and replace it with a "subscribe-to-none" one:

```bash
{"type": "exclude", "all": true}
```

This is achieved through the `automaticSubscription` parameter as the
following code snippets illustrate.

**JavaScript SDK (v2.0.0-beta12+ required)**

```javascript
const { connect } = require('twilio-video');
connect(token, {
  automaticSubscription: false,
  name: 'my-room'
});

```

**iOS SDK (v.2.10.0+ required)**

```swift
let connectOptions = TVIConnectOptions(token: accessToken) { (builder) in
    builder.isAutomaticSubscriptionEnabled = false
    builder.roomName = "my-room"
}
self.room = TwilioVideo.connect(with: connectOptions, delegate: self)
```

**Android SDK (v.4.1.0+ required)**

***Java***

```java
ConnectOptions connectOptions = new ConnectOptions.Builder(accessToken)
        .enableAutomaticSubscription(false)
        .roomName("my-room")
        .build();

room = Video.connect(context, connectOptions, roomListener);
```

***Kotlin***

```kotlin
val connectOptions = ConnectOptions.Builder(accessToken)
        .enableAutomaticSubscription(false)
        .roomName("my-room")
        .build()

room = Video.connect(context, connectOptions, roomListener)
```

### Managing SDK Subscribe Events \[#su-events]

Every time subscriptions change Twilio sends events to the corresponding participant
SDK. Developers must manage such events as part of their client application logic.
There are three types of events:

| Event type   | Event description                                                                                                                                                                                                                                                                                                                                   |
| ------------ | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| subscribed   | Fired when the Participant starts receiving media from a newly subscribed Track. Handling this event typically consists on rendering the received media (e.g. attaching to a video tag, etc.)                                                                                                                                                       |
| unsubscribed | Fired when the Participant unsubscribes from a previously subscribed Track. Handling this event typically consists on adapting the GUI to stop rendering the track media (e.g. detaching from a video tag, etc.)                                                                                                                                    |
| error        | Fired when the Participant should have subscribed to a Track but could not do it. This happens, for example, when the Participant does not support codecs of Tracks included by her subscribe rules. Handling this event typically requires informing the end-user and, eventually, taking the appropriate actions for minimizing the error impact. |

#### Managing Subscribe Events in JavaScript (v.1.18.0+ required)

The following code snippet illustrates how to manage subscribe events in
Twilio Video JavaScript SDK:

```javascript

const { connect } = require('twilio-video');

function subscribed(track) {
  console.log('Subscribed to RemoteTrack:', track.sid);
  //Code for starting track rendering goes here.
}

function unsubscribed(track) {
  console.log('Unsubscribed to RemoteTrack:', track.sid);
  //Code for stopping track rendering goes here.
}

function subscriptionFailed(error, publication) {
  console.log('Failed to subscribe to RemoteTrack ${publication.trackSid}:', error);
  //Code for managing subscribe errors goes here.
}

function listenToSubscriptionEvents(publication) {
  publication.on('subscribed', subscribed);
  publication.on('unsubscribed', unsubscribed);
  publication.on('subscriptionFailed', subscriptionFailed);
}

function participantConnected(participant) {
  // Listen to subscription events of already published Tracks.
  participant.tracks.forEach(listenToSubscriptionEvents);
  // Listen to subscription events of Tracks that are published later.
  room.on('trackPublished', listenToSubscriptionEvents);
}

connect('$token', { name: 'my-room' }).then(room => {
  // Listen to events from RemoteParticipants currently in the Room.
  room.participants.forEach(participantConnected);
  // Listen to  events from RemoteParticipants that will join the Room.
  room.on('participantConnected', participantConnected);
});
```

#### Managing Subscribe Events in iOS (v.2.4.0+ required) \[#se-ios]

The following code snippet illustrates how to manage subscribe events in
Twilio Video iOS SDK. For the sake of simplicity, we have only considered
subscription event from video tracks. Handlers for audio and data tracks are
equivalent but using their corresponding data types.

```swift
let options = TVIConnectOptions(token: accessToken)
room = TwilioVideo.connect(with: options, delegate: self)

func didConnect(to room: TVIRoom) {
    // Handle subscription events for connected Participants
    for remoteParticipant in room.remoteParticipants {
        remoteParticipant.delegate = self
    }
}

func room(_ room: TVIRoom, participantDidConnect participant: TVIRemoteParticipant) {
    participant.delegate = self
}

func subscribed(to videoTrack: TVIRemoteVideoTrack,
                  publication: TVIRemoteVideoTrackPublication,
              for participant: TVIRemoteParticipant) {
    print("Subscribed to video track: \(publication.trackName)")
    //Code for starting track rendering goes here.
}

func unsubscribed(from videoTrack: TVIRemoteVideoTrack,
                  publication: TVIRemoteVideoTrackPublication,
                  for participant: TVIRemoteParticipant) {
    print("Unsubscribed from video track: \(publication.trackName)")
    //Code for stopping track rendering goes here.
}

func failedToSubscribe(toVideoTrack publication: TVIRemoteVideoTrackPublication,
                       error: Error,
                       for participant: TVIRemoteParticipant) {
    let errorText = String(describing: error)
    print("Failed to subscribe to: \(publication.trackName), error: \(errorText)")
    //Code for managing subscribe errors goes here.
}
```

#### Managing Subscribe Events in Android (v.3.0.0+ required) \[#se-android]

The following code snippet illustrates how to manage subscribe events in
Twilio Video Android SDK. For the sake of simplicity, we have only considered
subscription event from video tracks. Callbacks for audio and data tracks are
similar but using their corresponding data types.

***Java***

```java
ConnectOptions connectOptions = new ConnectOptions.Builder(accessToken).build();

Room room = Video.connect(context, connectOptions, this);

@Override
public void onConnected(@NonNull Room room) {
    for (RemoteParticipant remoteParticipant : room.getRemoteParticipants()) {
        remoteParticipant.setListener(this);
    }
}

@Override
public void onParticipantConnected(@NonNull Room room,
                                    @NonNull RemoteParticipant remoteParticipant) {
    remoteParticipant.setListener(this);
}

@Override
public void onVideoTrackSubscribed(@NonNull RemoteParticipant remoteParticipant,
                                    @NonNull RemoteVideoTrackPublication remoteVideoTrackPublication,
                                    @NonNull RemoteVideoTrack remoteVideoTrack) {
    Log.i("Listener", "Subscribed to video track: " + remoteVideoTrack.getName());
    // Code for starting track rendering goes here
}

@Override
public void onVideoTrackUnsubscribed(@NonNull RemoteParticipant remoteParticipant,
                                      @NonNull RemoteVideoTrackPublication remoteVideoTrackPublication,
                                      @NonNull RemoteVideoTrack remoteVideoTrack) {
    Log.i("Listener", "Unsubscribed from video track: " + remoteVideoTrack.getName());
    // Code for stopping track rendering goes here
}

@Override
public void onVideoTrackSubscriptionFailed(@NonNull RemoteParticipant remoteParticipant,
                                            @NonNull RemoteVideoTrackPublication remoteVideoTrackPublication,
                                            @NonNull TwilioException twilioException) {
    Log.e("Listener", "Failed to subscribe to: "
            + remoteVideoTrackPublication.getTrackName() + ", error: " +
            twilioException.getMessage());
    // Code for managing subscribe errors goes here.
}
```

***Kotlin***

```kotlin
val connectOptions = ConnectOptions.Builder(accessToken).build()

val room = Video.connect(context, connectOptions, this)

override fun onConnected(room: Room) {
    for (remoteParticipant in room.remoteParticipants) {
        remoteParticipant.setListener(this)
    }
}

override fun onParticipantConnected(room: Room,
                                    remoteParticipant: RemoteParticipant) {
    remoteParticipant.setListener(this)
}

override fun onVideoTrackSubscribed(remoteParticipant: RemoteParticipant,
                                    remoteVideoTrackPublication: RemoteVideoTrackPublication,
                                    remoteVideoTrack: RemoteVideoTrack) {
    Log.i("Listener", "Subscribed to video track: ${remoteVideoTrack.name}")
    // Code for starting track rendering goes here
}

override fun onVideoTrackUnsubscribed(remoteParticipant: RemoteParticipant,
                                      remoteVideoTrackPublication: RemoteVideoTrackPublication,
                                      remoteVideoTrack: RemoteVideoTrack) {
    Log.i("Listener", "Unsubscribed from video track: ${remoteVideoTrack.name}")
    // Code for stopping track rendering goes here
}

override fun onVideoTrackSubscriptionFailed(remoteParticipant: RemoteParticipant,
                                            remoteVideoTrackPublication: RemoteVideoTrackPublication,
                                            twilioException: TwilioException) {
    Log.e("Listener", "Failed to subscribe to:" +
            "${remoteVideoTrackPublication.trackName}, error: ${twilioException.message}")
    // Code for managing subscribe errors goes here.
}
```

## Example \[#example]

### Video Contact Center: Setting Static Subscribe Rules \[#static-example]

Video contact centers are gaining popularity as an evolution of voice ones.
We use this use-case as an example on how to implement an application
with static subscribe rules: that is, rules that do change over time. A typical
contact center video room may involve the following roles:

* Agent, who assists contact center customers.
* Customer, who video calls asking for support.
* Supervisor, who trains Agents. In traditional voice contact centers this type
  of role is sometimes called a "whisperer": a participant who listens to all but
  can only be listened by the agent.

The Room communication topology for this use-case is:

* The agent should subscribe to all tracks both the one of customer and the
  ones of the supervisor.
* The customer should subscribe to the agent's audio and video. However,
  supervisor should be hidden for her.
* The supervisor should subscribe to all the tracks.

![Diagram showing communication flow between customer, agent, and supervisor via SFU in Twilio system.](https://docs-resources.prod.twilio.com/29ea9f5177584a32b7694d09aafad45636f2e1271bcb2a509e74c5cc75b6de7c.png)

*Representation of a video contact center where an agent is in helping
a customer while being at the same time whispered by a supervisor.*

In these types of scenarios where there are clearly established roles and
topologies, we recommend the following implementation approach:

* Developers should follow a fixed naming convention for their tracks. For
  example, the agent webcam track could be named `agent-video` and the customer
  audio track could be named `customer-audio`. The specific chosen names are not
  relevant. The important point is to comply with the naming convention in all
  the video calls.
* The application developer can use the above-mentioned naming convention for
  setting the appropriate subscribe rules at connect time.

Based on this recommendation, tracks published in this application will look like this:

|                      | Agent                 | Customer                  | Supervisor                |
| -------------------- | --------------------- | ------------------------- | ------------------------- |
| Audio Track          | `MTA_A` `agent-audio` | `MTC_A` `customer-audio`  | `MTS_A` `whisperer-audio` |
| Video Track (cam)    | `MTA_C` `agent-video` | `MTC_C` `customer-video`  |                           |
| Video Track (screen) |                       | `MTC_S` `customer-screen` |                           |

For the sake of simplicity, we assume the following:

* Track SIDs have the prefix `MT` followed by the participant initial and by a
  letter identifying the track nature (`_A` for audio, `_C` for webcam, `_S` for
  screenshare).
* Track names are specified under their corresponding SIDs. Due to be
  above-mentioned naming convention, all room instances keep those track names.

#### Agent's Subscribe Rules

Agents subscribe to all the tracks published by the rest of participants. Due
to this, the default "subscribe-to-all" model is enough. Hence, the application
developer does not need add any additional rule:

```bash
Use default (i.e. "subscribe-to-all").
```

#### Supervisor's Subscribe Rules

Supervisors also subscribe to all the published tracks and the default rule is
also enough for them.

```bash
Use default (i.e. "subscribe-to-all").
```

#### Customer's Subscribe Rules

Customers should just subscribe to the agent tracks. We recommend to do it in
two steps:

**Step 1: override default rule with "subscribe-to-none"**

This step avoids race conditions between the default "subscribe-to-all" rule
and `POST` setting the appropriate subscribe rules. See section
[Overriding the Default Rule](#override-defaults) for further
information.

**Step 2: `POST` the appropriate subscribe rules**

Use the following code snippet where we assume that:

* The Twilio Access Key SID and Secret are `SKXXXX:your_api_key_secret`
* The Room SID is `RMXXXX`

Subscribe Rules for Video Contact Center Customer

```js
// NOTE: This example uses the next generation Twilio helper library - for more
// information on how to download and install this version, visit
// https://www.twilio.com/docs/libraries/node

// Find your credentials at twilio.com/console
// To set up environmental variables, see http://twil.io/secure
const API_KEY_SID = process.env.TWILIO_API_KEY;
const API_KEY_SECRET = process.env.TWILIO_API_KEY_SECRET;
const ACCOUNT_SID = process.env.TWILIO_ACCOUNT_SID;

const Twilio = require('twilio');

const client = new Twilio(API_KEY_SID, API_KEY_SECRET, {
  accountSid: ACCOUNT_SID,
});

client.video
  .rooms('RMXXXX')
  .participants.get('Customer')
  .subscribeRules.update({
    rules: [
      { type: 'include', all: true },
      { type: 'exclude', publisher: 'Supervisor' },
    ],
  })
  .then((result) => {
    console.log('Subscribe Rules updated successfully');
  })
  .catch((error) => {
    console.log('Error updating rules ' + error);
  });
```

```py
# Download the Python helper library from twilio.com/docs/python/install
import os
from twilio.rest import Client
import json

# Find your credentials at twilio.com/console
# To set up environmental variables, see http://twil.io/secure
account_sid = os.environ['TWILIO_ACCOUNT_SID’]
auth_token = os.environ['TWILIO_AUTH_TOKEN’]
client = Client(account_sid, auth_token)

client.video.rooms('RMXXXX').participants.get('Customer')\
.subscribe_rules.update(
    rules = [
      {"type": "include", "all": True},
      {"type": "exclude", "publisher": "Supervisor"}
    ]
)

print('Subscribe Rules updated successfully')
```

```cs
// Install the C# / .NET helper library from twilio.com/docs/csharp/install

using System;
using System.Collections.Generic;
using Twilio;
using Twilio.Rest.Video.V1;
using static Twilio.Rest.Video.V1.Participant;

class Program
{
    static void Main(string[] args)
    {
        // Find your API Key SID and Secret at twilio.com/console
        // To set up environmental variables, see http://twil.io/secure
        const string apiKeySid = Environment.GetEnvironmentVariable("TWILIO_API_KEY_SID");
        const string apiKeySecret = Environment.GetEnvironmentVariable("TWILIO_API_KEY_SECRET");

        TwilioClient.Init(apiKeySid, apiKeySecret);

        var rules = new[]
        {
                new Dictionary<string,object>(){
                    {"type", "include"}, {"all", true} },
                new Dictionary<string, object>(){
                    {"type", "exclude"}, {"publisher", "Supervisor"}
                }
        };

        SubscribeRulesResource.Update(
            "RMXXXX",
            "Customer",
            rules);

        Console.WriteLine("Subscribe Rules updated successfully");
    }
}
```

```java
// Install the Java helper library from twilio.com/docs/java/install
import com.twilio.Twilio;
import com.twilio.rest.video.v1.room.participant.SubscribeRules;
import com.twilio.rest.video.v1.Room.Participants;

import com.fasterxml.jackson.databind.ObjectMapper;

public class UpdateRules{

  // Find your credentials at twilio.com/console
  // To set up environment variables, see http://twil.io/secure
  public static final String ACCOUNT_SID = System.getenv("TWILIO_ACCOUNT_SID");
  public static final String AUTH_TOKEN = System.getenv("TWILIO_AUTH_TOKEN”);

  public static void main( String[] args ) throws IOException{
      // Initialize the client
      Twilio.init(ACCOUNT_SID, AUTH_TOKEN);

      SubscribeRulesUpdate rules = new SubscribeRulesUpdate(Lists.newArrayList(

              SubscribeRule.builder()
              .withType(SubscribeRule.Type.INCLUDE).withAll()
              .build(),

              SubscribeRule.builder()
              .withType(SubscribeRule.Type.EXCLUDE).withPublisher("Supervisor")
              .build()
          ));

      SubscribeRules result = SubscribeRules
      .updater("RMXXXX", "Customer")
      .setRules(new ObjectMapper().convertValue(rules, Map.class))
      .update();

      System.out.println("Subscribe Rules updated successfully");



  }
}
```

```php
<?php
// Get the PHP helper library from https://twilio.com/docs/libraries/php
require_once '/path/to/vendor/autoload.php'; // Loads the library
use Twilio\Rest\Client;

// Find your credentials at twilio.com/console
// To set up environmental variables, see http://twil.io/secure
$sid = getenv('TWILIO_ACCOUNT_SID');
$token = getenv('TWILIO_AUTH_TOKEN');
$client = new Client($sid, $token);

$client->video->rooms('RMXXXX')->participants('Customer')
->subscribeRules->update(“rules” => [[“type” => “include”, “all” => true], [“type” => “exclude”, “publisher” => “Supervisor”]]);

echo 'Subscribe Rules updated successfully';
```

```rb
# Download the helper library from https://www.twilio.com/docs/ruby/install
require 'rubygems'
require 'twilio-ruby'

# Find your credentials at twilio.com/console
# To set up environmental variables, see http://twil.io/secure
api_key_sid = ENV['TWILIO_API_KEY']
api_key_secret = ENV['TWILIO_API_KEY_SECRET']

@client = Twilio::REST::Client.new(api_key_sid, api_key_secret)

@client.video.rooms('RMXXXX').participants('Customer')
.subscribe_rules.update(
  rules: [
    {"type": "include", "all": true},
    {"type": "exclude", "publisher": "Supervisor"}
  ]
)

puts 'Subscribe Rules updated successfully'
```

```bash
curl -X POST 'https://video.twilio.com/v1/Rooms/RMXXXX/Participants/Customer/SubscribeRules' \
    -u 'SKXXXX:your_api_key_secret' \
    --data Rules='[{"type": "include", "all": true},{"type": "exclude", "publisher": "Supervisor"}]' \
    -H "Content-Type: application/x-www-form-urlencoded"
```

```json
{
  "room_sid": "RMXXXX",
  "participant_sid": "PAXXXX",
  "rules": [
    {"type": "include", "all": true},
    {"type": "exclude", "publisher": "Supervisor"}
  ],
  "date_updated": "2019-04-30T20:28:00Z",
  "date_created": "2019-04-30T20:15:49Z"
}
```

### Fetching a Participant's Subscribe Rules \[#fetch-sr-example]

For executing this example the following is required:

* The Twilio Access Key SID and Secret (`SKXXXX:your_api_key_secret`)
* The Room SID or name (`RMXXXX`)
* The Participant SID or identity (`PAXXXX`)

Fetching a Participant's Subscribe Rules

```js
// NOTE: This example uses the next generation Twilio helper library - for more
// information on how to download and install this version, visit
// https://www.twilio.com/docs/libraries/node

// Find your credentials at twilio.com/console
// To set up environmental variables, see http://twil.io/secure
const API_KEY_SID = process.env.TWILIO_API_KEY;
const API_KEY_SECRET = process.env.TWILIO_API_KEY_SECRET;
const ACCOUNT_SID = process.env.TWILIO_ACCOUNT_SID;

const Twilio = require('twilio');

const client = new Twilio(API_KEY_SID, API_KEY_SECRET, {
  accountSid: ACCOUNT_SID,
});

client.video
  .rooms('RMXXXX')
  .participants.get('PAXXXX')
  .subscribeRules.fetch()
  .then((subscribeRules) => {
    subscribeRules.rules.forEach((rule) => {
      console.log('Read rule with type = ' + rule.type);
    });
  })
  .catch((error) => {
    console.log('Error fetching subscribed rules ' + error);
  });
```

```py
# Download the Python helper library from twilio.com/docs/python/install
import os
from twilio.rest import Client
import json

# Find your credentials at twilio.com/console
# To set up environmental variables, see http://twil.io/secure
api_key_sid = os.environ['TWILIO_API_KEY']
api_key_secret = os.environ['TWILIO_API_KEY_SECRET']
client = Client(api_key_sid, api_key_secret)

subscribe_rules = client.video.rooms('RMXXXX').participants.get('PAXXXX')\
.subscribe_rules.fetch()

for rule in subscribe_rules.rules:
    print('Read rule with type=%s' % (rule["type"]))
```

```cs
// Install the C# / .NET helper library from twilio.com/docs/csharp/install

using System;
using System.Collections.Generic;
using Twilio;
using static Twilio.Rest.Video.V1.Participant;

class Program
{
    static void Main(string[] args)
    {
        // Find your API Key SID and Secret at twilio.com/console
        // To set up environmental variables, see http://twil.io/secure
        const string apiKeySid = Environment.GetEnvironmentVariable("TWILIO_API_KEY_SID");
        const string apiKeySecret = Environment.GetEnvironmentVariable("TWILIO_API_KEY_SECRET");

        TwilioClient.Init(apiKeySid, apiKeySecret);

        SubscribeRulesResource subscribeRules = SubscribeRulesResource.Fetch(
          "RMXXXX",
          "PAXXXX");

        foreach(var rule in subscribeRules.Rules)
        {
            Console.WriteLine("Rule type is " + ((global::Newtonsoft.Json.Linq.JObject)rule).GetValue("type"));
        }

    }
}
```

```java
// Install the Java helper library from twilio.com/docs/java/install
import com.twilio.Twilio;
import com.twilio.rest.video.v1.room.participant.SubscribeRules;
import com.twilio.rest.video.v1.Room.Participants;
import java.util.Map;

public class FetchSubscribeRules{

  // Find your credentials at twilio.com/console
  // To set up environment variables, see http://twil.io/secure
  public static final String ACCOUNT_SID = System.getenv("TWILIO_ACCOUNT_SID");
  public static final String API_KEY_SID = System.getenv("TWILIO_API_KEY_SID");
  public static final String API_KEY_SECRET = System.getenv("TWILIO_API_KEY_SECRET");

  public static void main( String[] args ) throws IOException{
      // Initialize the client
      Twilio.init(API_KEY_SID, API_KEY_SECRET, ACCOUNT_SID);

      SubscribeRules subscribeRules = SubscribedRules.fetcher(
        "RMXXXX",
        "PAXXXX"
      ).fetch();

      for (Map<String, Object> rule : subscribeRules.getRules()) {
			     System.out.println("Read rule with type = " + rule.get("type").toString());
		  }
  }
}
```

```php
<?php
// Get the PHP helper library from https://twilio.com/docs/libraries/php
require_once '/path/to/vendor/autoload.php'; // Loads the library
use Twilio\Rest\Client;

// Find your credentials at twilio.com/console
// To set up environmental variables, see http://twil.io/secure
$apiKeySid = getenv('TWILIO_API_KEY');
$apiKeySecret = getenv('TWILIO_API_KEY_SECRET');
$client = new Client($apiKeySid, $apiKeySecret);

$subscribeRules = $client->video->rooms('RMXXXX')->participants('PAXXXX')
  ->subscribeRules->fetch();

foreach ($subscribeRules->rules as $rule) {
    echo "Read rule with type = " . $rule["type"];
}
```

```rb
# Download the helper library from https://www.twilio.com/docs/ruby/install
require 'rubygems'
require 'twilio-ruby'

# Find your credentials at twilio.com/console
# To set up environmental variables, see http://twil.io/secure
api_key_sid = ENV['TWILIO_API_KEY']
api_key_secret = ENV['TWILIO_API_KEY_SECRET']

@client = Twilio::REST::Client.new(api_key_sid, api_key_secret)

subscribe_rules = @client.video.rooms('RMXXXX').participants('PAXXXX')
.subscribe_rules.fetch()

subscribe_rules.rules.each do |rule|
  puts "Read rule with type = " +rule["type"]
end
```

```bash
curl -X GET 'https://video.twilio.com/v1/Rooms/RMXXXX/Participants/PAXXXX/SubscribeRules' \
    -u 'SKXXXX:your_api_key_secret'
```

```json
{
  "room_sid": "RMXXXX",
  "participant_sid": "PAXXXX",
  "rules": [
    {
      "all": true,
      "type": "include"
    },
    {
      "publisher": "Carl",
      "type": "exclude"
    }
  ],
  "date_updated": "2019-04-30T12:38:10Z",
  "date_created": "2019-04-30T12:25:21Z"
}
```

### Fetching a Participant's Subscribed Track List \[#fetch-stl-example]

For executing this example the following is required:

* The Twilio Access Key SID and Secret (`SKXXXX:your_api_key_secret`)
* The Room SID or name (`RMXXXX`)
* The Participant SID or identity (`PAXXXX`)

Fetching a Participant's Subscribed Track List

```js
// NOTE: This example uses the next generation Twilio helper library - for more
// information on how to download and install this version, visit
// https://www.twilio.com/docs/libraries/node

// Find your credentials at twilio.com/console
// To set up environmental variables, see http://twil.io/secure
const API_KEY_SID = process.env.TWILIO_API_KEY;
const API_KEY_SECRET = process.env.TWILIO_API_KEY_SECRET;
const ACCOUNT_SID = process.env.TWILIO_ACCOUNT_SID;

const Twilio = require('twilio');

const client = new Twilio(API_KEY_SID, API_KEY_SECRET, {
  accountSid: ACCOUNT_SID,
});

client.video
  .rooms('RMXXXX')
  .participants.get('PAXXXX')
  .subscribedTracks.list()
  .then((subscribedTracks) => {
    subscribedTracks.rules.forEach((subscribedTrack) => {
      console.log('Read subscribed track with sid = ' + subscribedTrack.sid);
    });
  })
  .catch((error) => {
    console.log('Error fetching subscribed tracks' + error);
  });
```

```py
# Download the Python helper library from twilio.com/docs/python/install
import os
from twilio.rest import Client
import json

# Find your credentials at twilio.com/console
# To set up environmental variables, see http://twil.io/secure
api_key_sid = os.environ['TWILIO_API_KEY']
api_key_secret = os.environ['TWILIO_API_KEY_SECRET']
client = Client(api_key_sid, api_key_secret)

subscribed_tracks = client.video.rooms('RMXXXX').participants.get('PAXXXX')\
        .subscribed_tracks.list()

for subscribed_track in subscribed_tracks:
    print('Read subscribed track with sid = %s' % (subscribed_track))
```

```cs
// Install the C# / .NET helper library from twilio.com/docs/csharp/install

using System;
using System.Collections.Generic;
using Twilio;
using Twilio.Rest.Video.V1;
using static Twilio.Rest.Video.V1.Participant;

class Program
{
    static void Main(string[] args)
    {
        // Find your API Key SID and Secret at twilio.com/console
        // To set up environmental variables, see http://twil.io/secure
        const string apiKeySid = Environment.GetEnvironmentVariable("TWILIO_API_KEY_SID");
        const string apiKeySecret = Environment.GetEnvironmentVariable("TWILIO_API_KEY_SECRET");

        TwilioClient.Init(apiKeySid, apiKeySecret);

        var subscribedTracks = SubscribedTrackResource.Read(
              "RMXXXX",
              "PAXXXX");

        foreach (var record in subscribedTracks){
            Console.WriteLine("Read subscribed track with sid = " + record.Sid);
        }
    }
}
```

```java
// Install the Java helper library from twilio.com/docs/java/install
import com.twilio.Twilio;
import com.twilio.rest.video.v1.room.participant.SubscribeRules;
import com.twilio.rest.video.v1.Room.Participants;
import java.util.Map;

public class FetchSubscribeRules{

  // Find your credentials at twilio.com/console
  // To set up environment variables, see http://twil.io/secure
  public static final String ACCOUNT_SID = System.getenv("TWILIO_ACCOUNT_SID");
  public static final String API_KEY_SID = System.getenv("TWILIO_API_KEY_SID");
  public static final String API_KEY_SECRET = System.getenv("TWILIO_API_KEY_SECRET");

  public static void main( String[] args ) throws IOException{
      // Initialize the client
      Twilio.init(API_KEY_SID, API_KEY_SECRET, ACCOUNT_SID);

      ResourceSet<SubscribedTrack> subscribedTracks = SubscribedTrack.reader(
				"RMXXXX",
				"PAXXXX").read();

		  for(SubscribedTrack subscribedTrack : subscribedTracks) {
			     System.out.println("Read subscribed track with sid = " + subscribedTrack.getSid());
		  }
  }
}
```

```php
<?php
// Get the PHP helper library from https://twilio.com/docs/libraries/php
require_once '/path/to/vendor/autoload.php'; // Loads the library
use Twilio\Rest\Client;

// Find your credentials at twilio.com/console
// To set up environmental variables, see http://twil.io/secure
$apiKeySid = getenv('TWILIO_API_KEY');
$apiKeySecret = getenv('TWILIO_API_KEY_SECRET');
$client = new Client($apiKeySid, $apiKeySecret);

$subscribedTracks = $client->video->rooms('RMXXXX')->participants('PAXXXX')
      ->subscribeRules->read()

foreach ($subscribedTrack as $subscribedTracks) {
    echo "Read subscribed track with sid = " . $subscribedTrack->sid;
}
```

```rb
# Download the helper library from https://www.twilio.com/docs/ruby/install
require 'rubygems'
require 'twilio-ruby'

# Find your credentials at twilio.com/console
# To set up environmental variables, see http://twil.io/secure
api_key_sid = ENV['TWILIO_API_KEY']
api_key_secret = ENV['TWILIO_API_KEY_SECRET']

@client = Twilio::REST::Client.new(api_key_sid, api_key_secret)

subscribe_tracks = @client.video.rooms('RMXXXX').participant('PAXXXX')
    .subscribe_rules.list()

subscribe_tracks.each do |subscribed_track|
  puts "Read subscribed track with sid = " + subscribed_track.sid
end
```

```bash
curl -X GET 'https://video.twilio.com/v1/Rooms/RMXXXX/Participants/PAXXXX/SubscribedTracks' \
    -u 'SKXXXX:your_api_key_secret'
```

```json
{
  "subscribed_tracks": [
    {
      "kind": "video",
      "name": "1f6f07c7-7d02-4f4c-9caa-c7fdd6817d5a",
      "date_updated": null,
      "sid": "MTXXXX",
      "enabled": true,
      "room_sid": "RMXXXX",
      "url": "https://video.twilio.com/v1/Rooms/RMXXXX/Participants/PAXXXX/SubscribedTracks/MTXXXX",
      "date_created": "2019-04-30T12:26:07Z",
      "publisher_sid": "PAXYXY",
      "participant_sid": "PAXXXX"
    },
    {
      "kind": "audio",
      "name": "4ff26a60-3447-4dd3-8281-2f83568bff50",
      "date_updated": null,
      "sid": "MTYYYY",
      "enabled": true,
      "room_sid": "RMXXXX",
      "url": "https://video.twilio.com/v1/Rooms/RMXXXX/Participants/PAXXXX/SubscribedTracks/MTYYYY",
      "date_created": "2019-04-30T12:26:07Z",
      "publisher_sid": "PAXYXY",
      "participant_sid": "PAXXXX"
    },
    {
      "kind": "video",
      "name": "e124298c-f90f-468a-ad33-d7071c058231",
      "date_updated": null,
      "sid": "MTZZZZ",
      "enabled": true,
      "room_sid": "RMXXXX",
      "url": "https://video.twilio.com/v1/Rooms/RMXXXX/Participants/PAXXXX/SubscribedTracks/MTZZZZ",
      "date_created": "2019-04-30T12:25:44Z",
      "publisher_sid": "PAYXYX",
      "participant_sid": "PAXXXX"
    },
    {
      "kind": "audio",
      "name": "ec40db11-aeb6-4d88-879a-0870aaa6c994",
      "date_updated": null,
      "sid": "MTKKKK",
      "enabled": true,
      "room_sid": "RMXXXX",
      "url": "https://video.twilio.com/v1/Rooms/RMXXXX/Participants/PAXXXX/SubscribedTracks/MTKKKK",
      "date_created": "2019-04-30T12:25:44Z",
      "publisher_sid": "PAYXYX",
      "participant_sid": "PAXXXX"
    }
  ],
  "meta": {
    "page": 0,
    "page_size": 50,
    "first_page_url": "https://video.twilio.com/v1/Rooms/RMXXXX/Participants/PAXXXX/SubscribedTracks?PageSize=50&Page=0",
    "previous_page_url": null,
    "url": "https://video.twilio.com/v1/Rooms/RMXXXX/Participants/PAXXXX/SubscribedTracks?PageSize=50&Page=0",
    "next_page_url": null,
    "key": "subscribed_tracks"
  }
}
```

### Fetching a Participant's Subscribed Track Instance \[#fetch-st-example]

For executing this example the following is required:

* The Twilio Access Key SID and Secret (`SKXXXX:your_api_key_secret`)
* The Room SID or name (`RMXXXX`)
* The Participant SID or identity (`PAXXXX`)
* The subscribed Track SID (`MTXXXX`)

Fetching a Participant's Subscribed Track Instance

```js
// NOTE: This example uses the next generation Twilio helper library - for more
// information on how to download and install this version, visit
// https://www.twilio.com/docs/libraries/node

// Find your credentials at twilio.com/console
// To set up environmental variables, see http://twil.io/secure
const API_KEY_SID = process.env.TWILIO_API_KEY;
const API_KEY_SECRET = process.env.TWILIO_API_KEY_SECRET;
const ACCOUNT_SID = process.env.TWILIO_ACCOUNT_SID;

const Twilio = require('twilio');

const client = new Twilio(API_KEY_SID, API_KEY_SECRET, {
  accountSid: ACCOUNT_SID,
});

client.video
  .rooms('RMXXXX')
  .participants.get('PAXXXX')
  .subscribedTracks.get('MTXXXX')
  .fetch()
  .then((subscription) => {
    console.log('Read track subscription with sid = ' + subscription.sid);
  })
  .catch((error) => {
    console.log('Error fetching subscribed track' + error);
  });
```

```py
# Download the Python helper library from twilio.com/docs/python/install
import os
from twilio.rest import Client
import json

# Find your credentials at twilio.com/console
# To set up environmental variables, see http://twil.io/secure
api_key_sid = os.environ['TWILIO_API_KEY']
api_key_secret = os.environ['TWILIO_API_KEY_SECRET']
client = Client(api_key_sid, api_key_secret)

subscribed_track = client.video.rooms('RMXXXX').participants.get('PAXXXX')\
        .subscribed_tracks.get('MTXXXX').fetch()

print('Read track subscribed with sid = %s' % (subscribed_track.sid))
```

```cs
// Install the C# / .NET helper library from twilio.com/docs/csharp/install

using System;
using System.Collections.Generic;
using Twilio;
using Twilio.Rest.Video.V1;
using static Twilio.Rest.Video.V1.Participant;

class Program
{
    static void Main(string[] args)
    {
        // Find your API Key SID and Secret at twilio.com/console
        // To set up environmental variables, see http://twil.io/secure
        const string apiKeySid = Environment.GetEnvironmentVariable("TWILIO_API_KEY_SID");
        const string apiKeySecret = Environment.GetEnvironmentVariable("TWILIO_API_KEY_SECRET");

        TwilioClient.Init(apiKeySid, apiKeySecret);

        SubscribedTrackResource subscription = SubscribedTrackResource.Fetch(
                "RMXXXX",
                "PAXXXX",
                "MTXXXX");

        Console.WriteLine("Read subscribed track with sid = " + subscription.Sid);
    }
}
```

```java
// Install the Java helper library from twilio.com/docs/java/install
import com.twilio.Twilio;
import com.twilio.rest.video.v1.room.participant.SubscribeRules;
import com.twilio.rest.video.v1.Room.Participants;
import java.util.Map;

public class FetchSubscribeRules{

  // Find your credentials at twilio.com/console
  // To set up environment variables, see http://twil.io/secure
  public static final String ACCOUNT_SID = System.getenv("TWILIO_ACCOUNT_SID");
  public static final String API_KEY_SID = System.getenv("TWILIO_API_KEY_SID");
  public static final String API_KEY_SECRET = System.getenv("TWILIO_API_KEY_SECRET");

  public static void main( String[] args ) throws IOException{
      // Initialize the client
      Twilio.init(API_KEY_SID, API_KEY_SECRET, ACCOUNT_SID);

      SubscribedTrack subscription = SubscribedTrack.fetcher(
				"RMXXXX",
				"PAXXXX",
				"MTXXXX").fetch();

		  System.out.println("Read track subscription with sid = " + subscription.getSid());
  }
}
```

```php
<?php
// Get the PHP helper library from https://twilio.com/docs/libraries/php
require_once '/path/to/vendor/autoload.php'; // Loads the library
use Twilio\Rest\Client;

// Find your credentials at twilio.com/console
// To set up environmental variables, see http://twil.io/secure
$apiKeySid = getenv('TWILIO_API_KEY');
$apiKeySecret = getenv('TWILIO_API_KEY_SECRET');
$client = new Client($apiKeySid, $apiKeySecret);

$subscription = $client->video->rooms('RMXXXX')->participants('PAXXXX')
      ->subscribedTracks('MTXXXX')->fetch();

echo "Read track subscription with sid = " . $subscription->sid;
```

```rb
# Download the helper library from https://www.twilio.com/docs/ruby/install
require 'rubygems'
require 'twilio-ruby'

# Find your credentials at twilio.com/console
# To set up environmental variables, see http://twil.io/secure
api_key_sid = ENV['TWILIO_API_KEY']
api_key_secret = ENV['TWILIO_API_KEY_SECRET']

@client = Twilio::REST::Client.new(api_key_sid, api_key_secret)

subscribed_track = @client.video.rooms('RMXXXX').participants('PAXXXX')
    .subscribed_tracks('MTXXXX').fetch()

puts "Read track subscription with sid = " + subscribe_track.sid
```

```bash
curl -X GET 'https://video.twilio.com/v1/Rooms/RMXXXX/Participants/PAXXXX/SubscribedTracks/MTXXXX' \
    -u 'SKXXXX:your_api_key_secret'
```

```json
{
  "kind": "video",
  "name": "1f6f07c7-7d02-4f4c-9caa-c7fdd6817d5a",
  "date_updated": null,
  "sid": "MTXXXX",
  "enabled": true,
  "room_sid": "RMXXXX",
  "url": "https://video.twilio.com/v1/Rooms/RMXXXX/Participants/PAXXXX/SubscribedTracks/MTXXXX",
  "date_created": "2019-04-30T12:26:07Z",
  "publisher_sid": "PAXYXY",
  "participant_sid": "PAXXXX"
}
```

## Known Issues \[#known-issues]

There are no current known issues.
