# Composition Hooks

The Twilio Composition Hooks REST API lets you automate the creation of Compositions.
A Composition Hook is a template that specifies how Room recordings
should be composed. Using this API you will be able to:

* Create and manage Composition Hooks.
* Monitor the Compositions created by Hooks.

Composition Hooks work per-account (i.e. project). Hence, when a Room is
completed, all enabled Composition Hooks in the account will be executed against
that room recordings.

This API is located beneath the following base URL:

```bash
https://video.twilio.com

```

## Contents

* [URI Schemes](#uri-schemes)
* [Composition Hook instance resource](#composition-hook-instance-resource)
  * [Resource URI](#hk-uri)
  * [Resource Properties](#hk-properties)
  * [Retrieve a Composition Hook (HTTP `GET`)](#hk-get)
  * [Update a Composition Hook (HTTP `POST`)](#hk-post)
  * [Delete a Composition Hook (HTTP `DELETE`)](#hk-delete)
* [Composition Hooks list resource](#compositions-hooks-list-resource)
  * [Resource URI](#hks-uri)
  * [Create Composition Hook (HTTP `POST`)](#hks-post)
    * [Supported `POST` parameters](#http-post-parameters)
    * [Managing Video Layouts](#managing-video-layouts)
  * [`GET` lists of Composition Hooks (HTTP `GET`)](#hks-get)
    * [Filter parameters](#hks-get-parameters)
* [Examples](#examples)
  * [Creating an audio mixing Composition Hook](#example-audio-mixing-hk)
  * [Creating a simple video mixing Composition Hook](#example-grid-mixing-hk)
  * [Creating a video mixing Composition Hook with complex layout](#example-complex-layout-hk)
  * [Getting a Composition Hook](#example-get-hk)
  * [Listing all enabled Composition Hooks](#example-list-hks)
  * [Updating a Composition Hook](#example-update-hk)
  * [Deleting a Composition Hook](#example-delete-hk)
* [Known Problems and Limitations](#known-problems-and-limitations)

## URI Schemes \[#uri-schemes]

These are the URI schemes for the Composition Hooks REST API
and the supported methods:

* `/v1/CompositionHooks`
  * `GET`: Lists Composition Hook resources.
  * `POST`: Creates new Composition Hook resources.
* `/v1/CompositionHooks/{CompositionHookSid}`
  * `GET`: Retrieves a Composition Hook instance.
  * `POST`: Updates a Composition Hook instance.
  * `DELETE`: Deletes a Composition Hook instance.

## Composition Hook instance resource \[#composition-hook-instance-resource]

The Composition Hook instance resource represents a template that specifies how Room recordings should be composed.

### Resource URI \[#hk-uri]

```bash
/v1/CompositionHooks/{CompositionHookSid}

```

### Resource Properties \[#hk-properties]

A Composition Hook Instance Resource has the following properties:

```json
{"type":"object","refName":"video.v1.composition_hook","modelName":"video_v1_composition_hook","properties":{"account_sid":{"type":"string","minLength":34,"maxLength":34,"pattern":"^AC[0-9a-fA-F]{32}$","nullable":true,"description":"The SID of the [Account](https://www.twilio.com/docs/iam/api/account) that created the CompositionHook resource."},"friendly_name":{"type":"string","nullable":true,"description":"The string that you assigned to describe the resource. Can be up to 100 characters long and must be unique within the account."},"enabled":{"type":"boolean","nullable":true,"description":"Whether the CompositionHook is active. When `true`, the CompositionHook is triggered for every completed Group Room on the account. When `false`, the CompositionHook is never triggered."},"date_created":{"type":"string","format":"date-time","nullable":true,"description":"The date and time in GMT when the resource was created specified in [ISO 8601](https://en.wikipedia.org/wiki/ISO_8601) format."},"date_updated":{"type":"string","format":"date-time","nullable":true,"description":"The date and time in GMT when the resource was last updated specified in [ISO 8601](https://en.wikipedia.org/wiki/ISO_8601) format."},"sid":{"type":"string","minLength":34,"maxLength":34,"pattern":"^HK[0-9a-fA-F]{32}$","nullable":true,"description":"The unique string that we created to identify the CompositionHook resource."},"audio_sources":{"type":"array","nullable":true,"description":"The array of track names to include in the compositions created by the composition hook. A composition triggered by the composition hook includes all audio sources specified in `audio_sources` except those specified in `audio_sources_excluded`. The track names in this property can include an asterisk as a wild card character, which matches zero or more characters in a track name. For example, `student*` includes tracks named `student` as well as `studentTeam`. Please, be aware that either video_layout or audio_sources have to be provided to get a valid creation request","x-twilio":{"pii":{"handling":"standard","deleteSla":30}},"items":{"type":"string"}},"audio_sources_excluded":{"type":"array","nullable":true,"description":"The array of track names to exclude from the compositions created by the composition hook. A composition triggered by the composition hook includes all audio sources specified in `audio_sources` except for those specified in `audio_sources_excluded`. The track names in this property can include an asterisk as a wild card character, which matches zero or more characters in a track name. For example, `student*` excludes `student` as well as `studentTeam`. This parameter can also be empty.","x-twilio":{"pii":{"handling":"standard","deleteSla":30}},"items":{"type":"string"}},"video_layout":{"nullable":true,"description":"A JSON object that describes the video layout of the composition in terms of regions as specified in the HTTP POST request that created the CompositionHook resource. See [POST Parameters](https://www.twilio.com/docs/video/api/compositions-resource#http-post-parameters) for more information. Please, be aware that either video_layout or audio_sources have to be provided to get a valid creation request","x-twilio":{"pii":{"handling":"standard","deleteSla":30}}},"resolution":{"type":"string","nullable":true,"description":"The dimensions of the video image in pixels expressed as columns (width) and rows (height). The string's format is `{width}x{height}`, such as `640x480`."},"trim":{"type":"boolean","nullable":true,"description":"Whether intervals with no media are clipped, as specified in the POST request that created the CompositionHook resource. Compositions with `trim` enabled are shorter when the Room is created and no Participant joins for a while as well as if all the Participants leave the room and join later, because those gaps will be removed. See [Specifying Video Layouts](https://www.twilio.com/docs/video/api/compositions-resource#specifying-video-layouts) for more info."},"format":{"type":"string","enum":["mp4","webm"],"description":"The container format of the media files used by the compositions created by the composition hook. If `mp4` or `webm`, `audio_sources` must have one or more tracks and/or a `video_layout` element must contain a valid `video_sources` list, otherwise an error occurs.","refName":"composition_hook_enum_format","modelName":"composition_hook_enum_format"},"status_callback":{"type":"string","format":"uri","nullable":true,"description":"The URL we call using the `status_callback_method` to send status information to your application."},"status_callback_method":{"type":"string","format":"http-method","enum":["GET","POST"],"nullable":true,"description":"The HTTP method we should use to call `status_callback`. Can be `POST` or `GET` and defaults to `POST`."},"url":{"type":"string","format":"uri","nullable":true,"description":"The absolute URL of the resource."}}}
```

### HTTP GET \[#hk-get]

Returns the single Composition Hook instance identified by `{CompositionHookSid}`.

### HTTP POST \[#hk-post]

Updates the Composition Hook instance identified by `{CompositionHookSid}`.
Be aware that partial updates are not supported. This means that when updating
you must specify all the `POST` parameters, even for properties that don't change.
Any optional parameter that is not explicitly specified will be reset
(i.e. set to its default value)

The following parameters are supported:

### Path parameters

```json
[{"name":"Sid","in":"path","description":"The SID of the CompositionHook resource to update.","schema":{"type":"string","minLength":34,"maxLength":34,"pattern":"^HK[0-9a-fA-F]{32}$"},"required":true}]
```

### Request body parameters

```json
{"schema":{"type":"object","title":"UpdateCompositionHookRequest","required":["FriendlyName"],"properties":{"FriendlyName":{"type":"string","description":"A descriptive string that you create to describe the resource. It can be up to  100 characters long and it must be unique within the account."},"Enabled":{"type":"boolean","description":"Whether the composition hook is active. When `true`, the composition hook will be triggered for every completed Group Room in the account. When `false`, the composition hook never triggers."},"VideoLayout":{"description":"A JSON object that describes the video layout of the composition hook in terms of regions. See [Specifying Video Layouts](https://www.twilio.com/docs/video/api/compositions-resource#specifying-video-layouts) for more info.","x-twilio":{"pii":{"handling":"standard","deleteSla":30}}},"AudioSources":{"type":"array","description":"An array of track names from the same group room to merge into the compositions created by the composition hook. Can include zero or more track names. A composition triggered by the composition hook includes all audio sources specified in `audio_sources` except those specified in `audio_sources_excluded`. The track names in this parameter can include an asterisk as a wild card character, which matches zero or more characters in a track name. For example, `student*` includes tracks named `student` as well as `studentTeam`.","items":{"type":"string"},"x-twilio":{"pii":{"handling":"standard","deleteSla":30}}},"AudioSourcesExcluded":{"type":"array","description":"An array of track names to exclude. A composition triggered by the composition hook includes all audio sources specified in `audio_sources` except for those specified in `audio_sources_excluded`. The track names in this parameter can include an asterisk as a wild card character, which matches zero or more characters in a track name. For example, `student*` excludes `student` as well as `studentTeam`. This parameter can also be empty.","items":{"type":"string"},"x-twilio":{"pii":{"handling":"standard","deleteSla":30}}},"Trim":{"type":"boolean","description":"Whether to clip the intervals where there is no active media in the compositions triggered by the composition hook. The default is `true`. Compositions with `trim` enabled are shorter when the Room is created and no Participant joins for a while as well as if all the Participants leave the room and join later, because those gaps will be removed. See [Specifying Video Layouts](https://www.twilio.com/docs/video/api/compositions-resource#specifying-video-layouts) for more info."},"Format":{"type":"string","enum":["mp4","webm"],"description":"The container format of the media files used by the compositions created by the composition hook. If `mp4` or `webm`, `audio_sources` must have one or more tracks and/or a `video_layout` element must contain a valid `video_sources` list, otherwise an error occurs.","refName":"composition_hook_enum_format","modelName":"composition_hook_enum_format"},"Resolution":{"type":"string","description":"A string that describes the columns (width) and rows (height) of the generated composed video in pixels. Defaults to `640x480`. \nThe string's format is `{width}x{height}` where: \n\n* 16 <= `{width}` <= 1280\n* 16 <= `{height}` <= 1280\n* `{width}` * `{height}` <= 921,600\n\nTypical values are: \n\n* HD = `1280x720`\n* PAL = `1024x576`\n* VGA = `640x480`\n* CIF = `320x240`\n\nNote that the `resolution` imposes an aspect ratio to the resulting composition. When the original video tracks are constrained by the aspect ratio, they are scaled to fit. See [Specifying Video Layouts](https://www.twilio.com/docs/video/api/compositions-resource#specifying-video-layouts) for more info."},"StatusCallback":{"type":"string","format":"uri","description":"The URL we should call using the `status_callback_method` to send status information to your application on every composition event. If not provided, status callback events will not be dispatched."},"StatusCallbackMethod":{"type":"string","format":"http-method","enum":["GET","POST"],"description":"The HTTP method we should use to call `status_callback`. Can be: `POST` or `GET` and the default is `POST`."}}},"examples":{"updateAllFields":{"value":{"lang":"json","value":"{\n  \"FriendlyName\": \"My composition hook\",\n  \"Enabled\": true,\n  \"AudioSources\": [\n    \"user*\",\n    \"moderator\"\n  ],\n  \"AudioSourcesExcluded\": [\n    \"admin\"\n  ],\n  \"VideoLayout\": \"{}\",\n  \"Trim\": true,\n  \"Format\": \"mp4\",\n  \"Resolution\": \"1280x720\",\n  \"StatusCallback\": \"http://www.example.com\",\n  \"StatusCallbackMethod\": \"POST\"\n}","meta":"","code":"{\n  \"FriendlyName\": \"My composition hook\",\n  \"Enabled\": true,\n  \"AudioSources\": [\n    \"user*\",\n    \"moderator\"\n  ],\n  \"AudioSourcesExcluded\": [\n    \"admin\"\n  ],\n  \"VideoLayout\": \"{}\",\n  \"Trim\": true,\n  \"Format\": \"mp4\",\n  \"Resolution\": \"1280x720\",\n  \"StatusCallback\": \"http://www.example.com\",\n  \"StatusCallbackMethod\": \"POST\"\n}","tokens":[["{","#C9D1D9"],"\n  ",["\"FriendlyName\"","#7EE787"],[":","#C9D1D9"]," ",["\"My composition hook\"","#A5D6FF"],[",","#C9D1D9"],"\n  ",["\"Enabled\"","#7EE787"],[":","#C9D1D9"]," ",["true","#79C0FF"],[",","#C9D1D9"],"\n  ",["\"AudioSources\"","#7EE787"],[": [","#C9D1D9"],"\n    ",["\"user*\"","#A5D6FF"],[",","#C9D1D9"],"\n    ",["\"moderator\"","#A5D6FF"],"\n  ",["],","#C9D1D9"],"\n  ",["\"AudioSourcesExcluded\"","#7EE787"],[": [","#C9D1D9"],"\n    ",["\"admin\"","#A5D6FF"],"\n  ",["],","#C9D1D9"],"\n  ",["\"VideoLayout\"","#7EE787"],[":","#C9D1D9"]," ",["\"{}\"","#A5D6FF"],[",","#C9D1D9"],"\n  ",["\"Trim\"","#7EE787"],[":","#C9D1D9"]," ",["true","#79C0FF"],[",","#C9D1D9"],"\n  ",["\"Format\"","#7EE787"],[":","#C9D1D9"]," ",["\"mp4\"","#A5D6FF"],[",","#C9D1D9"],"\n  ",["\"Resolution\"","#7EE787"],[":","#C9D1D9"]," ",["\"1280x720\"","#A5D6FF"],[",","#C9D1D9"],"\n  ",["\"StatusCallback\"","#7EE787"],[":","#C9D1D9"]," ",["\"http://www.example.com\"","#A5D6FF"],[",","#C9D1D9"],"\n  ",["\"StatusCallbackMethod\"","#7EE787"],[":","#C9D1D9"]," ",["\"POST\"","#A5D6FF"],"\n",["}","#C9D1D9"]],"annotations":[],"themeName":"github-dark","style":{"color":"#c9d1d9","background":"#0d1117"}}},"updateWithDefaults":{"value":{"lang":"json","value":"{\n  \"FriendlyName\": \"My composition hook\",\n  \"AudioSources\": [\n    \"user*\",\n    \"moderator\"\n  ],\n  \"AudioSourcesExcluded\": [\n    \"admin\"\n  ],\n  \"Format\": \"mp4\",\n  \"Resolution\": \"1280x720\"\n}","meta":"","code":"{\n  \"FriendlyName\": \"My composition hook\",\n  \"AudioSources\": [\n    \"user*\",\n    \"moderator\"\n  ],\n  \"AudioSourcesExcluded\": [\n    \"admin\"\n  ],\n  \"Format\": \"mp4\",\n  \"Resolution\": \"1280x720\"\n}","tokens":[["{","#C9D1D9"],"\n  ",["\"FriendlyName\"","#7EE787"],[":","#C9D1D9"]," ",["\"My composition hook\"","#A5D6FF"],[",","#C9D1D9"],"\n  ",["\"AudioSources\"","#7EE787"],[": [","#C9D1D9"],"\n    ",["\"user*\"","#A5D6FF"],[",","#C9D1D9"],"\n    ",["\"moderator\"","#A5D6FF"],"\n  ",["],","#C9D1D9"],"\n  ",["\"AudioSourcesExcluded\"","#7EE787"],[": [","#C9D1D9"],"\n    ",["\"admin\"","#A5D6FF"],"\n  ",["],","#C9D1D9"],"\n  ",["\"Format\"","#7EE787"],[":","#C9D1D9"]," ",["\"mp4\"","#A5D6FF"],[",","#C9D1D9"],"\n  ",["\"Resolution\"","#7EE787"],[":","#C9D1D9"]," ",["\"1280x720\"","#A5D6FF"],"\n",["}","#C9D1D9"]],"annotations":[],"themeName":"github-dark","style":{"color":"#c9d1d9","background":"#0d1117"}}}},"encodingType":"application/x-www-form-urlencoded","conditionalParameterMap":{}}
```

The return value is a `200 OK` if the request is accepted and executed successfully.
Otherwise, a `4xx` is returned with detailed information about the problem.

### HTTP DELETE \[#hk-delete]

Deletes the Composition Hook instance identified by `{CompositionHookSid}`.

The return value is a `204 NO CONTENT` if the request is accepted and executed successfully. In this case, deletion is immediate.

Otherwise, a `4xx` is returned with detailed information about the problem.

## Composition Hooks list resource \[#compositions-hooks-list-resource]

### Resource URI \[#hks-uri]

```bash
/v1/CompositionHooks

```

### HTTP POST \[#hks-post]

Creates a new Composition Hook and registers it so that Twilio can fire it
whenever a Room is completed.

The return value is a `201 CREATED` if the request is accepted and executed successfully.
Otherwise, a `4xx` is returned with detailed information about the problem.

#### Supported POST parameters \[#http-post-parameters]

The following table shows all the parameters that can be specified when
creating a new Composition Hook.

### Request body parameters

```json
{"schema":{"type":"object","title":"CreateCompositionHookRequest","required":["FriendlyName"],"properties":{"FriendlyName":{"type":"string","description":"A descriptive string that you create to describe the resource. It can be up to  100 characters long and it must be unique within the account."},"Enabled":{"type":"boolean","description":"Whether the composition hook is active. When `true`, the composition hook will be triggered for every completed Group Room in the account. When `false`, the composition hook will never be triggered."},"VideoLayout":{"description":"An object that describes the video layout of the composition hook in terms of regions. See [Specifying Video Layouts](https://www.twilio.com/docs/video/api/compositions-resource#specifying-video-layouts) for more info.","x-twilio":{"pii":{"handling":"standard","deleteSla":30}}},"AudioSources":{"type":"array","description":"An array of track names from the same group room to merge into the compositions created by the composition hook. Can include zero or more track names. A composition triggered by the composition hook includes all audio sources specified in `audio_sources` except those specified in `audio_sources_excluded`. The track names in this parameter can include an asterisk as a wild card character, which matches zero or more characters in a track name. For example, `student*` includes tracks named `student` as well as `studentTeam`.","items":{"type":"string"},"x-twilio":{"pii":{"handling":"standard","deleteSla":30}}},"AudioSourcesExcluded":{"type":"array","description":"An array of track names to exclude. A composition triggered by the composition hook includes all audio sources specified in `audio_sources` except for those specified in `audio_sources_excluded`. The track names in this parameter can include an asterisk as a wild card character, which matches zero or more characters in a track name. For example, `student*` excludes `student` as well as `studentTeam`. This parameter can also be empty.","items":{"type":"string"},"x-twilio":{"pii":{"handling":"standard","deleteSla":30}}},"Resolution":{"type":"string","description":"A string that describes the columns (width) and rows (height) of the generated composed video in pixels. Defaults to `640x480`. \nThe string's format is `{width}x{height}` where: \n\n* 16 <= `{width}` <= 1280\n* 16 <= `{height}` <= 1280\n* `{width}` * `{height}` <= 921,600\n\nTypical values are: \n\n* HD = `1280x720`\n* PAL = `1024x576`\n* VGA = `640x480`\n* CIF = `320x240`\n\nNote that the `resolution` imposes an aspect ratio to the resulting composition. When the original video tracks are constrained by the aspect ratio, they are scaled to fit. See [Specifying Video Layouts](https://www.twilio.com/docs/video/api/compositions-resource#specifying-video-layouts) for more info."},"Format":{"type":"string","enum":["mp4","webm"],"description":"The container format of the media files used by the compositions created by the composition hook. If `mp4` or `webm`, `audio_sources` must have one or more tracks and/or a `video_layout` element must contain a valid `video_sources` list, otherwise an error occurs.","refName":"composition_hook_enum_format","modelName":"composition_hook_enum_format"},"StatusCallback":{"type":"string","format":"uri","description":"The URL we should call using the `status_callback_method` to send status information to your application on every composition event. If not provided, status callback events will not be dispatched."},"StatusCallbackMethod":{"type":"string","format":"http-method","enum":["GET","POST"],"description":"The HTTP method we should use to call `status_callback`. Can be: `POST` or `GET` and the default is `POST`."},"Trim":{"type":"boolean","description":"Whether to clip the intervals where there is no active media in the Compositions triggered by the composition hook. The default is `true`. Compositions with `trim` enabled are shorter when the Room is created and no Participant joins for a while as well as if all the Participants leave the room and join later, because those gaps will be removed. See [Specifying Video Layouts](https://www.twilio.com/docs/video/api/compositions-resource#specifying-video-layouts) for more info."}}},"examples":{"create":{"value":{"lang":"json","value":"{\n  \"FriendlyName\": \"My composition hook\",\n  \"Enabled\": false,\n  \"AudioSources\": [\n    \"user*\",\n    \"moderator\"\n  ],\n  \"AudioSourcesExcluded\": [\n    \"admin\"\n  ],\n  \"VideoLayout\": \"{}\",\n  \"Trim\": true,\n  \"Format\": \"mp4\",\n  \"Resolution\": \"1280x720\",\n  \"StatusCallback\": \"http://www.example.com\",\n  \"StatusCallbackMethod\": \"POST\"\n}","meta":"","code":"{\n  \"FriendlyName\": \"My composition hook\",\n  \"Enabled\": false,\n  \"AudioSources\": [\n    \"user*\",\n    \"moderator\"\n  ],\n  \"AudioSourcesExcluded\": [\n    \"admin\"\n  ],\n  \"VideoLayout\": \"{}\",\n  \"Trim\": true,\n  \"Format\": \"mp4\",\n  \"Resolution\": \"1280x720\",\n  \"StatusCallback\": \"http://www.example.com\",\n  \"StatusCallbackMethod\": \"POST\"\n}","tokens":[["{","#C9D1D9"],"\n  ",["\"FriendlyName\"","#7EE787"],[":","#C9D1D9"]," ",["\"My composition hook\"","#A5D6FF"],[",","#C9D1D9"],"\n  ",["\"Enabled\"","#7EE787"],[":","#C9D1D9"]," ",["false","#79C0FF"],[",","#C9D1D9"],"\n  ",["\"AudioSources\"","#7EE787"],[": [","#C9D1D9"],"\n    ",["\"user*\"","#A5D6FF"],[",","#C9D1D9"],"\n    ",["\"moderator\"","#A5D6FF"],"\n  ",["],","#C9D1D9"],"\n  ",["\"AudioSourcesExcluded\"","#7EE787"],[": [","#C9D1D9"],"\n    ",["\"admin\"","#A5D6FF"],"\n  ",["],","#C9D1D9"],"\n  ",["\"VideoLayout\"","#7EE787"],[":","#C9D1D9"]," ",["\"{}\"","#A5D6FF"],[",","#C9D1D9"],"\n  ",["\"Trim\"","#7EE787"],[":","#C9D1D9"]," ",["true","#79C0FF"],[",","#C9D1D9"],"\n  ",["\"Format\"","#7EE787"],[":","#C9D1D9"]," ",["\"mp4\"","#A5D6FF"],[",","#C9D1D9"],"\n  ",["\"Resolution\"","#7EE787"],[":","#C9D1D9"]," ",["\"1280x720\"","#A5D6FF"],[",","#C9D1D9"],"\n  ",["\"StatusCallback\"","#7EE787"],[":","#C9D1D9"]," ",["\"http://www.example.com\"","#A5D6FF"],[",","#C9D1D9"],"\n  ",["\"StatusCallbackMethod\"","#7EE787"],[":","#C9D1D9"]," ",["\"POST\"","#A5D6FF"],"\n",["}","#C9D1D9"]],"annotations":[],"themeName":"github-dark","style":{"color":"#c9d1d9","background":"#0d1117"}}}},"encodingType":"application/x-www-form-urlencoded","conditionalParameterMap":{}}
```

#### Managing Video Layouts \[#managing-video-layouts]

A Composition Hook VideoLayout describes the video layout of compositions created
by that Hook. Details on how to specify such a VideoLayout can be found in the
[Specifying Video Layouts](/docs/video/api/compositions-resource#specifying-video-layouts) section on Twilio's Compositions REST API
documentation. The only aspect you may take into consideration is that, when
working with Composition Hooks, you don't have information about the specific
SIDs of tracks, recordings, and participants. Hence, you must specify layouts
basing on track names and set such names appropriately in your real-time Rooms.

#### HTTP GET \[#hks-get]

Retrieves the list Composition Hook Records belonging to the corresponding `AccountSid` with paging data.

##### Supported GET parameters \[#hks-get-parameters]

The following `GET` query string parameters allow you to limit the list returned. Note, parameters are case-sensitive

### Query parameters

```json
[{"name":"Enabled","in":"query","description":"Read only CompositionHook resources with an `enabled` value that matches this parameter.","schema":{"type":"boolean"},"examples":{"readEmpty":{"value":true},"readResults":{"value":true}}},{"name":"DateCreatedAfter","in":"query","description":"Read only CompositionHook resources created on or after this [ISO 8601](https://en.wikipedia.org/wiki/ISO_8601) datetime with time zone.","schema":{"type":"string","format":"date-time"},"examples":{"readResults":{"value":"2017-01-01T00:00:01Z"}}},{"name":"DateCreatedBefore","in":"query","description":"Read only CompositionHook resources created before this [ISO 8601](https://en.wikipedia.org/wiki/ISO_8601) datetime with time zone.","schema":{"type":"string","format":"date-time"},"examples":{"readResults":{"value":"2017-12-31T23:59:59Z"}}},{"name":"FriendlyName","in":"query","description":"Read only CompositionHook resources with friendly names that match this string. The match is not case sensitive and can include asterisk `*` characters as wildcard match.","schema":{"type":"string"},"examples":{"readResults":{"value":"*Hook*"}}},{"name":"PageSize","in":"query","description":"How many resources to return in each list page. The default is 50, and the maximum is 1000.","schema":{"type":"integer","format":"int64","minimum":1,"maximum":1000}},{"name":"Page","in":"query","description":"The page index. This value is simply for client state.","schema":{"type":"integer","minimum":0}},{"name":"PageToken","in":"query","description":"The page token. This is provided by the API.","schema":{"type":"string"}}]
```

#### HTTP DELETE

Not Supported

## Examples \[#examples]

Programming with Composition Hooks is quite similar to programming with
Compositions. Hence, in addition to the examples here below, you may also find
useful our [Recording Compositions documentation](/docs/video/api/compositions-resource#example)

### Creating an audio mixing Composition Hook \[#example-audio-mixing-hk]

In this example, we want to compose only the audio tracks of all completed Rooms. Considering that:

* Your application credentials are (`SKXXXX:your_api_key_secret`)
* You want to mix all audio tracks

The desired Composition Hook can be created with the following code:

Create a Composition Hook mixing all room audio tracks

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

client.video.compositionHooks
  .create({
    friendlyName: 'MixingAllRoomAudiosHook',
    audioSources: '*',
    statusCallback: 'http://my.server.org/callbacks',
    format: 'mp4',
  })
  .then((compositionHook) => {
    console.log('Created Composition Hook with SID=' + compositionHook.sid);
  });
```

```py
# Download the Python helper library from twilio.com/docs/python/install
import os
from twilio.rest import Client

# Find your credentials at twilio.com/console
# To set up environmental variables, see http://twil.io/secure
api_key_sid = os.environ['TWILIO_API_KEY']
api_key_secret = os.environ['TWILIO_API_KEY_SECRET']
client = Client(api_key_sid, api_key_secret)

composition_hook = client.video.composition_hooks.create(
    friendly_name = 'MixingAllRoomAudiosHook',
    audio_sources = '*',
    status_callback = 'http://my.server.org/callbacks',
    format='mp4')

print('Created Composition Hook with SID=%s' % (composition_hook.sid))
```

```cs
// Install the C# / .NET helper library from twilio.com/docs/csharp/install

using System;
using System.Collections.Generic;
using Twilio;
using Twilio.Rest.Video.V1;
using static Twilio.Rest.Video.V1.CompositionHookResource;

class Program
{
    static void Main(string[] args)
    {
        // Find your API Key SID and Secret at twilio.com/console
        // To set up environmental variables, see http://twil.io/secure
        const string apiKeySid = Environment.GetEnvironmentVariable("TWILIO_API_KEY_SID");
        const string apiKeySecret = Environment.GetEnvironmentVariable("TWILIO_API_KEY_SECRET");

        TwilioClient.Init(apiKeySid, apiKeySecret);

        var compositionHook = CompositionHookResource.Create(
          friendlyName: "MixingAllRoomAudiosHook",
          audioSources: new List<string>{"*"},
          statusCallback: new Uri('http://my.server.org/callbacks'),
          format: FormatEnum.Mp4
        );

        Console.WriteLine($"Created Composition Hook with SID: {compositionHook.Sid}");
    }
}
```

```java
// Install the Java helper library from twilio.com/docs/java/install
import com.twilio.Twilio;
import com.twilio.rest.video.v1.CompositionHook;
import com.twilio.rest.video.v1.CompositionHook.Format;

public class AudioMixingHook{

  // Find your credentials at twilio.com/console
  // To set up environment variables, see http://twil.io/secure
  public static final String ACCOUNT_SID = System.getenv("TWILIO_ACCOUNT_SID");
  public static final String API_KEY_SID = System.getenv("TWILIO_API_KEY_SID");
  public static final String API_KEY_SECRET = System.getenv("TWILIO_API_KEY_SECRET");

  public static void main( String[] args ) throws IOException{
      // Initialize the client
      Twilio.init(API_KEY_SID, API_KEY_SECRET, ACCOUNT_SID);

      CompositionHook compositionHook = CompositionHook.creator()
        					.setFriendlyName("MixingAllRoomAudiosHook")
        					.setAudioSources("*")
        					.setStatusCallback("http://my.server.org/callbacks")
        					.setFormat(Format.MP4)
        					.create();

      System.out.println("Created Composition Hook with SID=" + compositionHook.getSid());
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

$compositionHook = $client->video->compositionHooks->create(
    'MixingAllRoomAudiosHook', [
      'audioSources' => '*',
      'statusCallback' => 'http://my.server.org/callbacks',
      'format' => 'mp4'
    ]);

echo $compositionHook->sid;
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

compositionHook = @client.video.compositionHooks.create(
  friendlyName: 'MixingAllRoomAudiosHook',
  audio_sources: '*',
  status_callback: 'http://my.server.org/callbacks',
  format: 'mp4'
)

puts compositionHook.sid
```

```bash
curl -X POST 'https://video.twilio.com/v1/CompositionHooks' \
    -u 'SKXXXX:your_api_key_secret' \
    -F 'FriendlyName=MixingAllRoomAudiosHook' \
    -F 'StatusCallback=http://my.server.org/callbacks' \
    -F 'AudioSources=*' \
    -F 'Format=mp4'
```

```json
{
  "account_sid": "ACXXXX",
  "sid": "HKXXXX",
  "friendly_name": "MixingAllRoomAudiosHook",
  "enabled": true,
  "date_created": "2018-12-19T16:22:13Z",
  "date_updated": null,
  "audio_sources": [
    "*"
  ],
  "audio_sources_excluded": [],
  "video_layout": {},
  "format": "mp4",
  "trim": true,
  "url": "https://video.twilio.com/v1/CompositionHooks/HKXXXX",
  "resolution": "640x480",
  "status_callback_method": "POST",
  "status_callback": "http://my.server.org/callbacks"
}
```

### Creating a simple video mixing Composition Hook \[#example-grid-mixing-hk]

In this example, we create a Composition Hook for composing all tracks of
a Room using a grid layout for video.

Considering that:

* Your application credentials are (`SKXXXX:your_api_key_secret`)
* You want to use `mp4` as target format
* You want to use VGA resolution (`640x480`)

You can create the desired Composition Hook using the following:

Create a Composition Hook composing rooms in a grid

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

client.video.compositionHooks
  .create({
    friendlyName: 'MyFirstCompositionHook',
    audioSources: '*',
    videoLayout: {
      grid: {
        video_sources: ['*'],
      },
    },
    statusCallback: 'http://my.server.org/callbacks',
    format: 'mp4',
  })
  .then((compositionHook) => {
    console.log('Created Composition Hook with SID=' + compositionHook.sid);
  });
```

```py
# Download the Python helper library from twilio.com/docs/python/install
import os
from twilio.rest import Client

# Find your credentials at twilio.com/console
# To set up environmental variables, see http://twil.io/secure
api_key_sid = os.environ['TWILIO_API_KEY']
api_key_secret = os.environ['TWILIO_API_KEY_SECRET']
client = Client(api_key_sid, api_key_secret)

composition_hook = client.video.composition_hooks.create(
    friendly_name = 'MyFirstCompositionHook',
    audio_sources = '*',
    video_layout = {
                        'grid' : {
                            'video_sources': ['*']
                        }
                    },
    status_callback = 'http://my.server.org/callbacks',
    format='mp4')

print('Created Composition Hook with SID=%s' % (composition_hook.sid))
```

```cs
// Install the C# / .NET helper library from twilio.com/docs/csharp/install

using System;
using System.Collections.Generic;
using Twilio;
using Twilio.Rest.Video.V1;
using static Twilio.Rest.Video.V1.CompositionHookResource;

class Program
{
    static void Main(string[] args)
    {
        // Find your API Key SID and Secret at twilio.com/console
        // To set up environmental variables, see http://twil.io/secure
        const string apiKeySid = Environment.GetEnvironmentVariable("TWILIO_API_KEY_SID");
        const string apiKeySecret = Environment.GetEnvironmentVariable("TWILIO_API_KEY_SECRET");

        TwilioClient.Init(apiKeySid, apiKeySecret);

        var layout = new
        {
            grid = new
            {
                video_sources = new string[]{"*"}
            }
        };

        var compositionHook = CompositionHookResource.Create(
          friendlyName: "MyFirstCompositionHook",
          audioSources: new List<string>{"*"},
          videoLayout: layout,
          statusCallback: new Uri('http://my.server.org/callbacks'),
          format: FormatEnum.Mp4
        );

        Console.WriteLine($"Created Composition Hook with SID: {compositionHook.Sid}");
    }
}
```

```java
// Install the Java helper library from twilio.com/docs/java/install
import com.twilio.Twilio;
import com.twilio.rest.video.v1.CompositionHook;
import com.twilio.rest.video.v1.CompositionHook.Format;

import com.fasterxml.jackson.databind.ObjectMapper;

public class AudioMixingHook{

  // Find your credentials at twilio.com/console
  // To set up environment variables, see http://twil.io/secure
  public static final String ACCOUNT_SID = System.getenv("TWILIO_ACCOUNT_SID");
  public static final String API_KEY_SID = System.getenv("TWILIO_API_KEY_SID");
  public static final String API_KEY_SECRET = System.getenv("TWILIO_API_KEY_SECRET");

  public static void main( String[] args ) throws IOException{
      // Initialize the client
      Twilio.init(API_KEY_SID, API_KEY_SECRET, ACCOUNT_SID);

      final String videoLayout =
                       "{"
                     + "   \"grid\": {"
                     + "       \"video_sources\":[\"*\"]"
                     + "    }"
                     + "}";

      CompositionHook compositionHook = CompositionHook.creator()
        					.setFriendlyName("MixingAllRoomAudiosHook")
        					.setAudioSources("*")
                  .setVideoLayout(new ObjectMapper().readValue(videoLayout, HashMap.class))
        					.setStatusCallback("http://my.server.org/callbacks")
        					.setFormat(Format.MP4)
        					.create();

      System.out.println("Created Composition Hook with SID=" + compositionHook.getSid());
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

$compositionHook = $client->video->compositionHooks->create(
    'MyFirstCompositionHook', [
      'audioSources' => '*',
      'videoLayout' =>  array(
                        'grid' => array (
                          'video_sources' => array('*')
                        )
                      ),
      'statusCallback' => 'http://my.server.org/callbacks',
      'format' => 'mp4'
    ]);

echo $compositionHook->sid;
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

compositionHook = @client.video.compositionHooks.create(
  friendlyName: 'MyFirstCompositionHook',
  audio_sources: '*',
  video_layout: {
    grid: {
      video_sources: ['*']
    }
  },
  status_callback: 'http://my.server.org/callbacks',
  format: 'mp4'
)

puts compositionHook.sid
```

```bash
curl -X POST 'https://video.twilio.com/v1/CompositionHooks' \
    -u 'SKXXXX:your_api_key_secret' \
    -F 'FriendlyName=MyFirstCompositionHook' \
    -F 'StatusCallback=http://my.server.org/callbacks' \
    -F 'AudioSources=*' \
    -F 'Format=mp4' \
<<-EOF -F 'VideoLayout={
      "grid":{
        "video_sources":["*"]
      }
    }'
EOF
```

```json
{
  "account_sid": "ACXXXX",
  "sid": "HKXXXX",
  "friendly_name": "MyFirstCompositionHook",
  "enabled": true,
  "date_created": "2018-12-19T16:04:11Z",
  "date_updated": null,
  "audio_sources": [
    "*"
  ],
  "audio_sources_excluded": [],
  "video_layout": {
    "grid": {
      "z_pos": 0,
      "reuse": "show_oldest",
      "x_pos": 0,
      "max_columns": null,
      "cells_excluded": [],
      "video_sources_excluded": [],
      "height": null,
      "width": null,
      "max_rows": null,
      "y_pos": 0,
      "video_sources": [
        "*"
      ]
    }
  },
  "format": "mp4",
  "trim": true,
  "resolution": "640x480",
  "url": "https://video.twilio.com/v1/CompositionHooks/HKXXXX",
  "status_callback_method": "POST",
  "status_callback": "http://my.server.org/callbacks"
}
```

### Creating a video mixing Composition Hook with complex layout \[#example-complex-layout-hk]

In this example, we create a Composition Hook that fires a composition with PiP
(Picture-in-Picture) layout for every completed Room. Observe that, at
Hook creation time we don't know any track or recording SIDs. Due to this,
we must rely on track names. Here we assume that such names comply with
the following:

* A presenter must share a webcam track named `presenter-cam` as well as a
  screenshare track named `screen`. The presenter audio track, in turn, has
  the name `presenter-audio`.
* In addition to the presenter, the room may have a special participant whose
  audio track we want to include in the composition. When that participant is
  present, her audio track has the name `listener-audio`.

Assuming that:

* Your application credentials are (`SKXXXX:your_api_key_secret`)
* You want to use `mp4` as target format
* You want to use HD resolution (`1280x720`)

The desired Composition Hook may be created as follows:

Create a Composition Hook with complex video layout

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

client.video.compositionHooks
  .create({
    friendlyName: 'MyHookWithComplexVideoLayout',
    audioSources: ['listener-audio', 'presenter-audio'],
    videoLayout: {
      main: {
        z_pos: 1,
        video_sources: ['screen'],
      },
      pip: {
        z_pos: 2,
        x_pos: 1000,
        y_pos: 30,
        width: 240,
        height: 180,
        video_sources: ['presenter-cam'],
      },
    },
    statusCallback: 'http://my.server.org/callbacks',
    resolution: '1280x720',
    format: 'mp4',
  })
  .then((compositionHook) => {
    console.log('Created Composition Hook with SID=' + compositionHook.sid);
  });
```

```py
# Download the Python helper library from twilio.com/docs/python/install
import os
from twilio.rest import Client

# Find your credentials at twilio.com/console
# To set up environmental variables, see http://twil.io/secure
api_key_sid = os.environ['TWILIO_API_KEY']
api_key_secret = os.environ['TWILIO_API_KEY_SECRET']
client = Client(api_key_sid, api_key_secret)

composition_hook = client.video.composition_hooks.create(
    friendly_name = 'MyHookWithComplexVideoLayout',
    audio_sources = ['listener-audio', 'presenter-audio'],
    video_layout = {
                    'main' : {
                        'z_pos': 1,
                        'video_sources': ['screen']
                        },
                    'pip': {
                        'z_pos': 2,
                        'x_pos': 1000,
                        'y_pos': 30,
                        'width': 240,
                        'height': 180,
                        'video_sources': ['presenter-cam']
                    }
                   },
    status_callback = 'http://my.server.org/callbacks',
    resolution = '1280x720',
    format='mp4')

print('Created Composition Hook with SID=%s' % (composition_hook.sid))
```

```cs
// Install the C# / .NET helper library from twilio.com/docs/csharp/install

using System;
using System.Collections.Generic;
using Twilio;
using Twilio.Rest.Video.V1;
using static Twilio.Rest.Video.V1.CompositionHookResource;

class Program
{
    static void Main(string[] args)
    {
        // Find your API Key SID and Secret at twilio.com/console
        // To set up environmental variables, see http://twil.io/secure
        const string apiKeySid = Environment.GetEnvironmentVariable("TWILIO_API_KEY_SID");
        const string apiKeySecret = Environment.GetEnvironmentVariable("TWILIO_API_KEY_SECRET");

        TwilioClient.Init(apiKeySid, apiKeySecret);

        var layout = new
        {
            main = new
            {
                z_pos = 1,
                video_sources = new string[]{"screen"}
            },
            pip = new {
                z_pos = 2,
                x_pos = 1000,
                y_pos = 30,
                width = 240,
                height = 180,
                video_sources = new string[]{"presenter-cam"}
            }
        };

        var compositionHook = CompositionHookResource.Create(
          friendlyName: "MyHookWithComplexVideoLayout",
          audioSources: new List<string>{"listener-audio", "presenter-audio"},
          videoLayout: layout,
          statusCallback: new Uri('http://my.server.org/callbacks'),
          resolution: "1280x720",
          format: FormatEnum.Mp4
        );

        Console.WriteLine($"Created Composition Hook with SID: {compositionHook.Sid}");
    }
}
```

```java
// Install the Java helper library from twilio.com/docs/java/install
import com.twilio.Twilio;
import com.twilio.rest.video.v1.CompositionHook;
import com.twilio.rest.video.v1.CompositionHook.Format;

import com.fasterxml.jackson.databind.ObjectMapper;

public class ComplexLayoutHook{

  // Find your credentials at twilio.com/console
  // To set up environment variables, see http://twil.io/secure
  public static final String ACCOUNT_SID = System.getenv("TWILIO_ACCOUNT_SID");
  public static final String API_KEY_SID = System.getenv("TWILIO_API_KEY_SID");
  public static final String API_KEY_SECRET = System.getenv("TWILIO_API_KEY_SECRET");

  public static void main( String[] args ) throws IOException{
      // Initialize the client
      Twilio.init(API_KEY_SID, API_KEY_SECRET, ACCOUNT_SID);

      final String videoLayout =
                        "{"
                      + "   \"main\": {"
                      + "       \"z_pos\": 1,"
                      + "       \"video_sources\":[\"screen\"]"
                      + "    },"
                      + "   \"row\": {"
                      + "       \"z_pos\": 2,"
                      + "       \"x_pos\": 1000,"
                      + "       \"y_pos\": 30,"
                      + "       \"width\": 240,"
                      + "       \"height\": 180,"
                      + "       \"video_sources\": [\"presenter-cam\"]"
                      + "    }"
                      + "}";

      CompositionHook compositionHook = CompositionHook.creator()
        					.setFriendlyName("MixingAllRoomAudiosHook")
                  .setAudioSources(Arrays.asList("listener-audio","presenter-audio"))
                  .setVideoLayout(new ObjectMapper().readValue(videoLayout, HashMap.class))
                  .setStatusCallback("http://my.server.org/callbacks")
                  .setResolution("1280x720")
                  .setFormat(Format.MP4)
                  .create();

      System.out.println("Created Composition Hook with SID=" + compositionHook.getSid());
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

$compositionHook = $client->video->compositionHooks->create(
    'MyHookWithComplexVideoLayout', [
      'audioSources' => array('listener-audio', 'presenter-audio'),
      'videoLayout' =>  array(
                        'main' => array (
                          'z_pos' => 1,
                          'video_sources' => array('screen')
                        ),
                        'pip' => array(
                          'z_pos' => 2,
                          'x_pos' => 1000,
                          'y_pos' => 30,
                          'width' => 240,
                          'height' => 180,
                          'video_sources' => array('presenter-cam')
                        )
                      ),
      'statusCallback' => 'http://my.server.org/callbacks',
      'resolution' => '1280x720',
      'format' => 'mp4'
    ]);

echo $compositionHook->sid;
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

compositionHook = @client.video.compositionHooks.create(
  friendlyName: 'MyHookWithComplexVideoLayout',
  audio_sources: ['listener-audio','presenter-audio'],
  video_layout: {
    main: {
      z_pos: 1,
      video_sources: ['screen']
    },
    pip: {
      z_pos: 2,
      x_pos: 1000,
      y_pos: 30,
      width: 240,
      height: 180,
      video_sources: ['presenter-cam']
    }
  },
  status_callback: 'http://my.server.org/callbacks',
  resolution: '1280x720',
  format: 'mp4'
)

puts compositionHook.sid
```

```bash
curl -X POST 'https://video.twilio.com/v1/CompositionHooks' \
    -u 'SKXXXX:your_api_key_secret'
    -F 'FriendlyName=MyHookWithComplexVideoLayout' \
    -F 'StatusCallback=http://my.server.org/callbacks' \
    -F 'AudioSources=listener-audio' \
    -F 'AudioSources=presenter-audio' \
    -F 'Format=mp4' \
    -F 'Resolution=1280x720' \
<<-EOF -F 'VideoLayout={
          "main":{
            "z_pos":1,
            "video_sources":["screen"]
          },
          "pip":{
            "z_pos":2,
            "x_pos":1000,
            "y_pos":30,
            "width":240,
            "height":180,
            "video_sources":["presenter-cam"]
          }
        }'
EOF
```

```json
{
  "account_sid": "ACXXXX",
  "sid": "HKXXXX",
  "friendly_name": "MyHookWithComplexVideoLayout",
  "enabled": true,
  "date_created": "2018-12-19T16:44:10Z",
  "date_updated": null,
  "audio_sources": [
    "listener-audio",
    "presenter-audio"
  ],
  "audio_sources_excluded": [],
  "trim": true,
  "video_layout": {
    "pip": {
      "z_pos": 2,
      "reuse": "show_oldest",
      "x_pos": 1000,
      "max_columns": null,
      "cells_excluded": [],
      "video_sources_excluded": [],
      "height": 180,
      "width": 240,
      "max_rows": null,
      "y_pos": 30,
      "video_sources": [
        "presenter-cam"
      ]
    },
    "main": {
      "z_pos": 1,
      "reuse": "show_oldest",
      "x_pos": 0,
      "max_columns": null,
      "cells_excluded": [],
      "video_sources_excluded": [],
      "height": null,
      "width": null,
      "max_rows": null,
      "y_pos": 0,
      "video_sources": [
        "screen"
      ]
    }
  },
  "resolution": "1280x720",
  "format": "mp4",
  "url": "https://video.twilio.com/v1/CompositionHooks/HKXXXX",
  "status_callback_method": "POST",
  "status_callback": "http://my.server.org/callbacks"
}
```

### Getting a Composition Hook \[#example-get-hk]

For executing this example you need:

* Your application credentials (`SKXXXX:your_api_key_secret`)
* The Composition Hook Sid (`HKXXXX`)

Fetch a Composition Hook resource

```js
// NOTE: This example uses the next generation Twilio helper library - for more
// information on how to download and install this version, visit
// https://www.twilio.com/docs/libraries/node

const apiKeySid = 'SKXXXX';
const apiKeySecret = 'your_api_key_secret';
// To set up environmental variables, see http://twil.io/secure
const accountSid = process.env.TWILIO_ACCOUNT_SID;
const Twilio = require('twilio');

const client = new Twilio(apiKeySid, apiKeySecret, { accountSid: accountSid });

compositionHook = client.video
  .compositionHooks('HKXXXX')
  .fetch()
  .then((compositionHook) => {
    console.log('Read Composition Hook with SID=' + compositionHook.sid);
  });
```

```py
# Download the Python helper library from twilio.com/docs/python/install
import os
from twilio.rest import Client

# Your Account Sid and Auth Token from twilio.com/console
# To set up environmental variables, see http://twil.io/secure
api_key_sid = os.environ['TWILIO_API_KEY']
api_key_secret = os.environ['TWILIO_API_KEY_SECRET']
client = Client(api_key_sid, api_key_secret)

composition_hook = client.video\
                    .composition_hooks('HKXXXX')\
                    .fetch()

print('Read Composition Hook with SID=%s' % (composition_hook.sid))
```

```cs
// Install the C# / .NET helper library from twilio.com/docs/csharp/install

using System;
using Twilio;
using Twilio.Rest.Video.V1;
using static Twilio.Rest.Video.V1.CompositionHookResource;

class Program
{
    static void Main(string[] args)
    {
        // Find your API Key SID and Secret at twilio.com/console
        // To set up environmental variables, see http://twil.io/secure
        const string apiKeySid = Environment.GetEnvironmentVariable("TWILIO_API_KEY_SID");
        const string apiKeySecret = Environment.GetEnvironmentVariable("TWILIO_API_KEY_SECRET");

        TwilioClient.Init(apiKeySid, apiKeySecret);

        var compositionHook = CompositionHookResource.Fetch(
          pathSid: "HKXXXX"
        );

        Console.WriteLine($"Composition Hook Resource: {compositionHook.Sid}");
    }
}
```

```java
// Install the Java helper library from twilio.com/docs/java/install
import com.twilio.Twilio;
import com.twilio.rest.video.v1.CompositionHook;

public class GetCompositionHook{

  // Find your credentials at twilio.com/console
  // To set up environment variables, see http://twil.io/secure
  public static final String ACCOUNT_SID = System.getenv("TWILIO_ACCOUNT_SID");
  public static final String API_KEY_SID = System.getenv("TWILIO_API_KEY_SID");
  public static final String API_KEY_SECRET = System.getenv("TWILIO_API_KEY_SECRET");

  public static void main( String[] args ) throws IOException{
      // Initialize the client
      Twilio.init(API_KEY_SID, API_KEY_SECRET, ACCOUNT_SID);

      CompositionHook compositionHook = CompositionHook.fetcher("HKXXXX")
                .fetch();

      System.out.println("Read Composition Hook with SID=" + compositionHook.getSid());
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

$compositionHook = $client->video->compositionHooks("HKXXXX")
    ->fetch();

echo $compositionHook.sid
```

```rb
#Download the helper library from https://www.twilio.com/docs/ruby/install
require 'rubygems'
require 'twilio-ruby'

# Find your credentials at twilio.com/console
# To set up environmental variables, see http://twil.io/secure
api_key_sid = ENV['TWILIO_API_KEY']
api_key_secret = ENV['TWILIO_API_KEY_SECRET']

@client = Twilio::REST::Client.new(api_key_sid, api_key_secret)

compositionHook = @client.video.compositionHooks(HKXXXX)
   .fetch()

puts compositionHook.sid
```

```bash
curl -X GET 'https://video.twilio.com/v1/CompositionHooks/HKXXXX' \
  -u 'SKXXXX:your_api_key_secret'
```

```json
{
  "account_sid": "ACXXXX",
  "sid": "HKXXXX",
  "friendly_name": "MixingAllRoomAudiosHook",
  "enabled": true,
  "date_created": "2018-12-19T16:22:13Z",
  "date_updated": null,
  "audio_sources": [
    "*"
  ],
  "audio_sources_excluded": [],
  "video_layout": {},
  "format": "mp4",
  "trim": true,
  "url": "https://video.twilio.com/v1/CompositionHooks/HKXXXX",
  "resolution": "640x480",
  "status_callback_method": "POST",
  "status_callback": "http://my.server.org/callbacks"
}
```

### Listing all enabled Composition Hooks \[#example-list-hks]

For executing this example you need:

* Your application credentials (`SKXXXX:your_api_key_secret`)

List all enabled Composition Hooks

```js
// NOTE: This example uses the next generation Twilio helper library - for more
// information on how to download and install this version, visit
// https://www.twilio.com/docs/libraries/node

const apiKeySid = 'SKXXXX';
const apiKeySecret = 'your_api_key_secret';
// To set up environmental variables, see http://twil.io/secure
const accountSid = process.env.TWILIO_ACCOUNT_SID;
const Twilio = require('twilio');

const client = new Twilio(apiKeySid, apiKeySecret, { accountSid: accountSid });

client.video.compositionHooks
  .list({
    enabled: true,
  })
  .then((hooks) => {
    console.log('Found ' + hooks.length + ' Composition Hooks.');
    hooks.forEach(function (hook) {
      console.log('Read hook with SID=' + hook.sid);
    });
  });
```

```py
# Download the Python helper library from twilio.com/docs/python/install
import os
from twilio.rest import Client

# Your Account Sid and Auth Token from twilio.com/console
# To set up environmental variables, see http://twil.io/secure
api_key_sid = os.environ['TWILIO_API_KEY']
api_key_secret = os.environ['TWILIO_API_KEY_SECRET']
client = Client(api_key_sid, api_key_secret)

hooks = client.video\
                    .composition_hooks\
                    .list(enabled=True)

for hook in hooks:
    print('Read Composition Hook with SID=%s' % (hook.sid))
```

```cs
// Install the C# / .NET helper library from twilio.com/docs/csharp/install

using System;
using Twilio;
using Twilio.Converters;
using Twilio.Rest.Video.V1;
using static Twilio.Rest.Video.V1.CompositionHookResource;

class Program
{
    static void Main(string[] args)
    {
        // Find your API Key SID and Secret at twilio.com/console
        // To set up environmental variables, see http://twil.io/secure
        const string apiKeySid = Environment.GetEnvironmentVariable("TWILIO_API_KEY_SID");
        const string apiKeySecret = Environment.GetEnvironmentVariable("TWILIO_API_KEY_SECRET");

        TwilioClient.Init(apiKeySid, apiKeySecret);

        var hooks = CompositionHookResource.Read(
            enabled: true
        );

        foreach(var hook in hooks)
        {
           Console.WriteLine(hook.Sid);
        }

    }
}
```

```java
// Install the Java helper library from twilio.com/docs/java/install
import com.twilio.Twilio;
import com.twilio.rest.video.v1.CompositionHook;

public class ListCompositionHooks{

  // Find your credentials at twilio.com/console
  // To set up environment variables, see http://twil.io/secure
  public static final String ACCOUNT_SID = System.getenv("TWILIO_ACCOUNT_SID");
  public static final String API_KEY_SID = System.getenv("TWILIO_API_KEY_SID");
  public static final String API_KEY_SECRET = System.getenv("TWILIO_API_KEY_SECRET");

  public static void main( String[] args ) throws IOException{
      // Initialize the client
      Twilio.init(API_KEY_SID, API_KEY_SECRET, ACCOUNT_SID);

      ResourceSet<CompositionHook> hooks = CompositionHook.reader()
         		.setEnabled(true)
         		.read();

      for(CompositionHook hook : hooks){
        System.out.println("Read Composition Hook with SID=" + hook.getSid());
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

$hooks = $client->video->compositionHookss
    ->read([
      'enabled' => true
    ]);

foreach ($hooks as $hook) {
    echo $hook->sid;
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

hooks = @client.video.compositionHooks
                            .list(
                              enabled: true
                            )

hooks.each do |hook|
  puts hook.sid
end
```

```bash
curl -X GET 'https://video.twilio.com/v1/CompositionHooks' \
    -u 'SKXXXX:your_api_key_secret'
```

```json
{
  "composition_hooks": [
    {
      "trim": true,
      "video_layout": {
        "pip": {
          "z_pos": 2,
          "reuse": "show_oldest",
          "x_pos": 1000,
          "max_columns": null,
          "cells_excluded": [],
          "video_sources_excluded": [],
          "height": 180,
          "width": 240,
          "max_rows": null,
          "y_pos": 30,
          "video_sources": [
            "presenter-cam"
          ]
        },
        "main": {
          "z_pos": 1,
          "reuse": "show_oldest",
          "x_pos": 0,
          "max_columns": null,
          "cells_excluded": [],
          "video_sources_excluded": [],
          "height": null,
          "width": null,
          "max_rows": null,
          "y_pos": 0,
          "video_sources": [
            "screen"
          ]
        }
      },
      "audio_sources_excluded": [],
      "format": "mp4",
      "date_updated": null,
      "friendly_name": "MyHookWithComplexVideoLayout",
      "enabled": true,
      "account_sid": "ACXXXX",
      "url": "https://video.twilio.com/v1/CompositionHooks/HKXXXX",
      "audio_sources": [
        "listener-audio",
        "listener-video"
      ],
      "sid": "HKXXXX",
      "date_created": "2018-12-19T16:44:10Z",
      "resolution": "1280x720",
      "status_callback_method": "POST",
      "status_callback": "http://my.server.org/callbacks"
    },
    {
      "trim": true,
      "video_layout": {},
      "audio_sources_excluded": [],
      "format": "mp4",
      "date_updated": null,
      "friendly_name": "MixingAllRoomAudiosHook",
      "enabled": true,
      "account_sid": "ACXXXX",
      "url": "https://video.twilio.com/v1/CompositionHooks/HKXXXX",
      "audio_sources": [
        "*"
      ],
      "sid": "HKXXXX",
      "date_created": "2018-12-19T16:22:13Z",
      "resolution": "640x480",
      "status_callback_method": "POST",
      "status_callback": "http://my.server.org/callbacks"
    },
    {
      "trim": true,
      "video_layout": {
        "grid": {
          "z_pos": 0,
          "reuse": "show_oldest",
          "x_pos": 0,
          "max_columns": null,
          "cells_excluded": [],
          "video_sources_excluded": [],
          "height": null,
          "width": null,
          "max_rows": null,
          "y_pos": 0,
          "video_sources": [
            "*"
          ]
        }
      },
      "audio_sources_excluded": [],
      "format": "mp4",
      "date_updated": null,
      "friendly_name": "MyFirstCompositionHook2",
      "enabled": true,
      "account_sid": "ACXXXX",
      "url": "https://video.twilio.com/v1/CompositionHooks/HKXXXX",
      "audio_sources": [
        "*"
      ],
      "sid": "HKXXXX",
      "date_created": "2018-12-19T16:15:25Z",
      "resolution": "640x480",
      "status_callback_method": "POST",
      "status_callback": "http://my.server.org/callbacks"
    },
    {
      "trim": true,
      "video_layout": {
        "grid": {
          "z_pos": 0,
          "reuse": "show_oldest",
          "x_pos": 0,
          "max_columns": null,
          "cells_excluded": [],
          "video_sources_excluded": [],
          "height": null,
          "width": null,
          "max_rows": null,
          "y_pos": 0,
          "video_sources": [
            "*"
          ]
        }
      },
      "audio_sources_excluded": [],
      "format": "mp4",
      "date_updated": null,
      "friendly_name": "MyFirstCompositionHook",
      "enabled": true,
      "account_sid": "ACXXXX",
      "url": "https://video.twilio.com/v1/CompositionHooks/HKXXXX",
      "audio_sources": [
        "*"
      ],
      "sid": "HKXXXX",
      "date_created": "2018-12-19T16:04:11Z",
      "resolution": "640x480",
      "status_callback_method": "POST",
      "status_callback": "http://my.server.org/callbacks"
    },
    {
      "trim": true,
      "video_layout": {
        "grid": {
          "z_pos": 0,
          "reuse": "show_oldest",
          "x_pos": 0,
          "max_columns": null,
          "cells_excluded": [],
          "video_sources_excluded": [],
          "height": null,
          "width": null,
          "max_rows": null,
          "y_pos": 0,
          "video_sources": [
            "*"
          ]
        }
      },
      "audio_sources_excluded": [],
      "format": "mp4",
      "date_updated": "2018-12-19T15:52:08Z",
      "friendly_name": "llf-composition-hook-test",
      "enabled": false,
      "account_sid": "ACXXXX",
      "url": "https://video.twilio.com/v1/CompositionHooks/HKXXXX",
      "audio_sources": [
        "*"
      ],
      "sid": "HKXXXX",
      "date_created": "2018-12-19T15:09:41Z",
      "resolution": "640x480",
      "status_callback_method": "POST",
      "status_callback": null
    }
  ],
  "meta": {
    "page": 0,
    "page_size": 50,
    "first_page_url": "https://video.twilio.com/v1/CompositionHooks?PageSize=50&Page=0",
    "previous_page_url": null,
    "url": "https://video.twilio.com/v1/CompositionHooks?PageSize=50&Page=0",
    "next_page_url": null,
    "key": "composition_hooks"
  }
}
```

### Updating a Composition Hook \[#example-update-hk]

A very important aspect that you must remember is that *we do not support
partial updates*. This means that you must provide *all `POST` parameters*
on every update operation. In other words, any optional parameter you
don't provide will be reset (i.e. set to its default value) with the
update.

Just for illustration, the following example updates the above-created
[Grid Composition Hook](#example-grid-mixing-hk) to disable it. Observe that
we need to provide again all the properties that were set during the create
operation.

Update a Composition Hook to disable it

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

client.video.compositionHooks('HKXXXX');
update({
  friendlyName: 'MyFirstCompositionHook',
  enabled: false,
  audioSources: '*',
  videoLayout: {
    grid: {
      video_sources: ['*'],
    },
  },
  statusCallback: 'http://my.server.org/callbacks',
  format: 'mp4',
}).then((compositionHook) => {
  console.log('Updated Composition Hook with SID=' + compositionHook.sid);
});
```

```py
# Download the Python helper library from twilio.com/docs/python/install
import os
from twilio.rest import Client

# Find your credentials at twilio.com/console
# To set up environmental variables, see http://twil.io/secure
api_key_sid = os.environ['TWILIO_API_KEY']
api_key_secret = os.environ['TWILIO_API_KEY_SECRET']
client = Client(api_key_sid, api_key_secret)

composition_hook = client.video.composition_hooks('HKXXXX').update(
    friendly_name = 'MyFirstCompositionHook',
    enabled = False,
    audio_sources = '*',
    video_layout = {
                        'grid' : {
                            'video_sources': ['*']
                        }
                    },
    status_callback = 'http://my.server.org/callbacks',
    format='mp4')

print('Updated Composition Hook with SID=%s' % (composition_hook.sid))
```

```cs
// Install the C# / .NET helper library from twilio.com/docs/csharp/install

using System;
using System.Collections.Generic;
using Twilio;
using Twilio.Rest.Video.V1;
using static Twilio.Rest.Video.V1.CompositionHookResource;

class Program
{
    static void Main(string[] args)
    {
        // Find your API Key SID and Secret at twilio.com/console
        // To set up environmental variables, see http://twil.io/secure
        const string apiKeySid = Environment.GetEnvironmentVariable("TWILIO_API_KEY_SID");
        const string apiKeySecret = Environment.GetEnvironmentVariable("TWILIO_API_KEY_SECRET");

        TwilioClient.Init(apiKeySid, apiKeySecret);

        var layout = new
        {
            grid = new
            {
                video_sources = new string[]{"*"}
            }
        };

        var compositionHook = CompositionHookResource.Update(
          friendlyName: "MyFirstCompositionHook",
          enabled: false,
          audioSources: new List<string>{"*"},
          videoLayout: layout,
          statusCallback: new Uri('http://my.server.org/callbacks'),
          format: FormatEnum.Mp4,
          pathSid: "KHXXXX"
        );

        Console.WriteLine($"Updated Composition Hook with SID: {compositionHook.Sid}");
    }
}
```

```java
// Install the Java helper library from twilio.com/docs/java/install
import com.twilio.Twilio;
import com.twilio.rest.video.v1.CompositionHook;
import com.twilio.rest.video.v1.CompositionHook.Format;

import com.fasterxml.jackson.databind.ObjectMapper;

public class UpdateCompositionHook{

  // Find your credentials at twilio.com/console
  // To set up environment variables, see http://twil.io/secure
  public static final String ACCOUNT_SID = System.getenv("TWILIO_ACCOUNT_SID");
  public static final String API_KEY_SID = System.getenv("TWILIO_API_KEY_SID");
  public static final String API_KEY_SECRET = System.getenv("TWILIO_API_KEY_SECRET");

  public static void main( String[] args ) throws IOException{
      // Initialize the client
      Twilio.init(API_KEY_SID, API_KEY_SECRET, ACCOUNT_SID);

      final String videoLayout =
                       "{"
                     + "   \"grid\": {"
                     + "       \"video_sources\":[\"*\"]"
                     + "    }"
                     + "}";

      CompositionHook compositionHook = CompositionHook.updater('HKXXXX')
        					.setFriendlyName("MixingAllRoomAudiosHook")
        					.setAudioSources("*")
                  .setVideoLayout(new ObjectMapper().readValue(videoLayout, HashMap.class))
        					.setStatusCallback("http://my.server.org/callbacks")
        					.setFormat(Format.MP4)
        					.update();

      System.out.println("Updated Composition Hook with SID=" + compositionHook.getSid());
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

$compositionHook = $client->video->compositionHooks('HKXXXX')->update([
    'MyFirstCompositionHook', [
      'enabled' => false,
      'audioSources' => '*',
      'videoLayout' =>  array(
                        'grid' => array (
                          'video_sources' => array('*')
                        )
                      ),
      'statusCallback' => 'http://my.server.org/callbacks',
     'format' => 'mp4'
   ]);

echo $compositionHook->sid;
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

compositionHook = @client.video.compositionHooks('HKXXXX').update(
  friendlyName: 'MyFirstCompositionHook',
  enabled: false,
  audio_sources: '*',
  video_layout: {
    grid: {
      video_sources: ['*']
    }
  },
  status_callback: 'http://my.server.org/callbacks',
  format: 'mp4'
)

puts compositionHook.sid
```

```bash
curl -X POST 'https://video.twilio.com/v1/CompositionHooks/HKXXXX' \
    -u 'SKXXXX:your_api_key_secret'
    -F 'FriendlyName=MyFirstCompositionHook' \
    -F 'Enabled=false' \
    -F 'StatusCallback=http://my.server.org/callbacks' \
    -F 'AudioSources=*' \
    -F 'Format=mp4' \
<<-EOF -F 'VideoLayout={
      "grid":{
        "video_sources":["*"]
      }
    }'
EOF
```

```json
{
  "account_sid": "ACXXXX",
  "sid": "HKXXXX",
  "friendly_name": "MyFirstCompositionHook",
  "enabled": false,
  "date_created": "2018-12-19T16:04:11Z",
  "date_updated": "2018-12-19T16:55:21Z",
  "audio_sources": [
    "*"
  ],
  "audio_sources_excluded": [],
  "video_layout": {
    "grid": {
      "z_pos": 0,
      "reuse": "show_oldest",
      "x_pos": 0,
      "max_columns": null,
      "cells_excluded": [],
      "video_sources_excluded": [],
      "height": null,
      "width": null,
      "max_rows": null,
      "y_pos": 0,
      "video_sources": [
        "*"
      ]
    }
  },
  "format": "mp4",
  "trim": true,
  "resolution": "640x480",
  "url": "https://video.twilio.com/v1/CompositionHooks/HKXXXX",
  "status_callback_method": "POST",
  "status_callback": "http://my.server.org/callbacks"
}
```

### Deleting a Composition Hook \[#example-delete-hk]

For executing this example you need:

* Your application credentials (`SKXXXX:your_api_key_secret`)
* The Composition Hook Sid (`HKXXXX`)

Delete a Composition Hook

```js
// NOTE: This example uses the next generation Twilio helper library - for more
// information on how to download and install this version, visit
// https://www.twilio.com/docs/libraries/node

const apiKeySid = 'SKXXXX';
const apiKeySecret = 'your_api_key_secret';
// To set up environmental variables, see http://twil.io/secure
const accountSid = process.env.TWILIO_ACCOUNT_SID;
const Twilio = require('twilio');

const client = new Twilio(apiKeySid, apiKeySecret, { accountSid: accountSid });

client.video
  .compositionHooks('HKXXXX')
  .remove()
  .then((response) => {
    console.log('Composition Hook removed');
  });
```

```py
# Download the Python helper library from twilio.com/docs/python/install
import os
from twilio.rest import Client

# Your Account Sid and Auth Token from twilio.com/console
# To set up environmental variables, see http://twil.io/secure
api_key_sid = os.environ['TWILIO_API_KEY']
api_key_secret = os.environ['TWILIO_API_KEY_SECRET']
client = Client(api_key_sid, api_key_secret)

did_delete = client.video\
                    .composition_hooks('HKXXXX')\
                    .delete()

if(did_delete):
    print('Composition removed')
```

```cs
// Install the C# / .NET helper library from twilio.com/docs/csharp/install

using System;
using Twilio;
using Twilio.Rest.Video.V1;
using static Twilio.Rest.Video.V1.CompositionHookResource;

class Program
{
    static void Main(string[] args)
    {
        // Find your API Key SID and Secret at twilio.com/console
        // To set up environmental variables, see http://twil.io/secure
        const string apiKeySid = Environment.GetEnvironmentVariable("TWILIO_API_KEY_SID");
        const string apiKeySecret = Environment.GetEnvironmentVariable("TWILIO_API_KEY_SECRET");

        TwilioClient.Init(apiKeySid, apiKeySecret);

        CompositionHookResource.Delete(
          pathSid: "HKXXXX"
        );

        Console.WriteLine("Composition Hook removed");
    }
}
```

```java
// Install the Java helper library from twilio.com/docs/java/install
import com.twilio.Twilio;
import com.twilio.rest.video.v1.CompositionHook;

public class DeleteCompositionHook{

  // Find your credentials at twilio.com/console
  // To set up environment variables, see http://twil.io/secure
  public static final String ACCOUNT_SID = System.getenv("TWILIO_ACCOUNT_SID");
  public static final String API_KEY_SID = System.getenv("TWILIO_API_KEY_SID");
  public static final String API_KEY_SECRET = System.getenv("TWILIO_API_KEY_SECRET");

  public static void main( String[] args ) throws IOException{
      // Initialize the client
      Twilio.init(API_KEY_SID, API_KEY_SECRET, ACCOUNT_SID);

      boolean didDelete = CompositionHook.deleter("HKXXXX")
          .delete();

      System.out.println(didDelete);
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

$deleted = $client->video->compositionHooks("HKXXXX")
    ->delete();

echo $deleted;
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

deleted = @client.video.compositionHooks(HKXXXX)
    .delete()

puts deleted
```

```bash
curl -X DELETE 'https://video.twilio.com/v1/CompositionHooks/HKXXXX' \
  -u 'SKXXXX:your_api_key_secret'
```

```json
A successful request returns an HTTP status code 204 and an empty body
```

## Known Problems and Limitations \[#known-problems-and-limitations]

There are no known problems.
