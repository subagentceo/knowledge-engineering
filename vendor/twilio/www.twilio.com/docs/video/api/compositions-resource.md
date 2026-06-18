# Compositions Resource

The Twilio Recording Composition API lets you transcode and
combine the individual Track Recordings stored by the
[Twilio Video Recordings API](/docs/video/api/recordings-resource).
This API relies on the following REST resources:

* The *Composition Instance Resource*: a Composition represents a media file
  created as a result of applying a set of media processing operations onto
  a number of source Recordings.
* The *Compositions List Resource* represents the list of previously created
  Compositions.

These REST resources are located beneath the following base URL:

```bash
https://video.twilio.com

```

## Contents

* [URI Schemes](#uri-schemes)
* [Composition Instance Resource](#composition-instance-resource)
  * [Resource Properties](#composition-resource-properties)
  * [Get a Composition Instance (HTTP `GET`)](#get-composition-http-get)
  * [Delete a Composition (HTTP `DELETE`)](#delete-composition-http-delete)
* [Composition Instance Media Sub-Resource](#composition-media-sub-resource)
  * [Get a Composition Media File](#get-composition-media-file-http-get)
* [Compositions List Resource](#compositions-list-resource)
  * [Create Composition (HTTP `POST`)](#create-composition-http-post)
    * [Supported `POST` Parameters](#http-post-parameters)
    * [Specifying Video Layouts](#specifying-video-layouts)
    * [Region Positioning and Size](#region-positioning-and-size)
    * [The Region as a Grid](#region-as-a-grid)
    * [Displaying Video Sources](#displaying-video-sources)
    * [Understanding Reuse](#understanding-reuse)
    * [Understanding Trim](#understanding-trim)
  * [Get lists of Compositions (HTTP `GET`)](#get-list-http-get)
    * [Filter Parameters](#get-list-query-parameters)
* [Examples](#example)
  * [Creating Transcoding Compositions](#example-transcode)
    * [Transcode a Video Recording](#example-transcode-video-recording)
    * [Transcode an Audio Recording](#example-transcode-audio-recording)
  * [Creating Compositions with Simple Layouts](#example-compose)
    * [Compose one Participant Media](#example-compose-participant)
    * [Compose one Participant Video with all Room Audios](#example-compose-participant-video-with-all-audios)
    * [Compose the Complete Room in a Grid](#example-compose-room)
    * [Compose a Specific Set of Track Recordings in a Grid](#example-compose-array)
    * [Compose a Specific Set of Track Recordings as a Sequence](#example-compose-sequence)
  * [Creating Compositions with Complex Layouts](#example-complex)
    * [Creating a PiP (Picture-in-Picture) Composition](#example-pip)
    * [Composing a Room with Natural Layouts](#example-presentation-multiple-layouts)
    * [Composing a Room with Mosaic Layout](#example-mosaic-layout)
    * [Creating a Chess-Table Layout Composition](#example-chess-table-layout)
  * [Getting Compositions](#example-get)
    * [Get a Composition Instance Resource](#example-get-composition)
    * [List a Page of Completed Compositions](#example-get-completed-compositions)
    * [List all Compositions For a given Room](#example-get-compositions-for-room)
    * [Get a Composition Media File](#example-get-composition-media-file)
  * [Deleting Compositions](#example-delete)
    * [Delete a Composition Instance](#example-delete-composition)
* [Known limitations](#known-issues)

## URI Schemes \[#uri-schemes]

These are the URI schemes for the Recording Composition REST API
and the supported methods:

* `/v1/Compositions/`
  * `GET`: List Composition resources.
  * `POST`: Create new composition resource.
* `/v1/Compositions/{CompositionSid}`
  * `GET`: Retrieve a Composition resource.
  * `DELETE`: Delete a Composition resource.
* `/v1/Compositions/{CompositionSid}/Media`
  * `GET`: Retrieve a Composition media file sub-resource.

## Composition Instance Resource \[#composition-instance-resource]

### Resource URI

```bash
/v1/Compositions/{CompositionSid}

```

### Resource Properties \[#composition-resource-properties]

A Composition Instance Resource has the following properties

```json
{"type":"object","refName":"video.v1.composition","modelName":"video_v1_composition","properties":{"account_sid":{"type":"string","minLength":34,"maxLength":34,"pattern":"^AC[0-9a-fA-F]{32}$","nullable":true,"description":"The SID of the [Account](https://www.twilio.com/docs/iam/api/account) that created the Composition resource."},"status":{"type":"string","enum":["enqueued","processing","completed","deleted","failed"],"description":"The status of the composition. Can be: `enqueued`, `processing`, `completed`, `deleted` or `failed`. `enqueued` is the initial state and indicates that the composition request has been received and is scheduled for processing; `processing` indicates the composition is being processed; `completed` indicates the composition has been completed and is available for download; `deleted` means the composition media has been deleted from the system, but its metadata is still available for 30 days; `failed` indicates the composition failed to execute the media processing task.","refName":"composition_enum_status","modelName":"composition_enum_status"},"date_created":{"type":"string","format":"date-time","nullable":true,"description":"The date and time in GMT when the resource was created specified in [ISO 8601](https://en.wikipedia.org/wiki/ISO_8601) format."},"date_completed":{"type":"string","format":"date-time","nullable":true,"description":"The date and time in GMT when the composition's media processing task finished, specified in [ISO 8601](https://en.wikipedia.org/wiki/ISO_8601) format."},"date_deleted":{"type":"string","format":"date-time","nullable":true,"description":"The date and time in GMT when the composition generated media was deleted, specified in [ISO 8601](https://en.wikipedia.org/wiki/ISO_8601) format."},"sid":{"type":"string","minLength":34,"maxLength":34,"pattern":"^CJ[0-9a-fA-F]{32}$","nullable":true,"description":"The unique string that we created to identify the Composition resource."},"room_sid":{"type":"string","minLength":34,"maxLength":34,"pattern":"^RM[0-9a-fA-F]{32}$","nullable":true,"description":"The SID of the Group Room that generated the audio and video tracks used in the composition. All media sources included in a composition must belong to the same Group Room."},"audio_sources":{"type":"array","nullable":true,"description":"The array of track names to include in the composition. The composition includes all audio sources specified in `audio_sources` except those specified in `audio_sources_excluded`. The track names in this property can include an asterisk as a wild card character, which matches zero or more characters in a track name. For example, `student*` includes tracks named `student` as well as `studentTeam`.","x-twilio":{"pii":{"handling":"standard","deleteSla":30}},"items":{"type":"string"}},"audio_sources_excluded":{"type":"array","nullable":true,"description":"The array of track names to exclude from the composition. The composition includes all audio sources specified in `audio_sources` except for those specified in `audio_sources_excluded`. The track names in this property can include an asterisk as a wild card character, which matches zero or more characters in a track name. For example, `student*` excludes `student` as well as `studentTeam`. This parameter can also be empty.","x-twilio":{"pii":{"handling":"standard","deleteSla":30}},"items":{"type":"string"}},"video_layout":{"nullable":true,"description":"An object that describes the video layout of the composition in terms of regions. See [Specifying Video Layouts](https://www.twilio.com/docs/video/api/compositions-resource#specifying-video-layouts) for more info.","x-twilio":{"pii":{"handling":"standard","deleteSla":30}}},"resolution":{"type":"string","nullable":true,"description":"The dimensions of the video image in pixels expressed as columns (width) and rows (height). The string's format is `{width}x{height}`, such as `640x480`."},"trim":{"type":"boolean","nullable":true,"description":"Whether to remove intervals with no media, as specified in the POST request that created the composition. Compositions with `trim` enabled are shorter when the Room is created and no Participant joins for a while as well as if all the Participants leave the room and join later, because those gaps will be removed. See [Specifying Video Layouts](https://www.twilio.com/docs/video/api/compositions-resource#specifying-video-layouts) for more info."},"format":{"type":"string","enum":["mp4","webm"],"description":"The container format of the composition's media files as specified in the POST request that created the Composition resource. See [POST Parameters](https://www.twilio.com/docs/video/api/compositions-resource#http-post-parameters) for more information.","refName":"composition_enum_format","modelName":"composition_enum_format"},"bitrate":{"type":"integer","default":0,"description":"The average bit rate of the composition's media."},"size":{"type":"integer","format":"int64","nullable":true,"description":"The size of the composed media file in bytes."},"duration":{"type":"integer","default":0,"description":"The duration of the composition's media file in seconds."},"media_external_location":{"type":"string","format":"uri","nullable":true,"description":"The URL of the media file associated with the composition when stored externally. See [External S3 Compositions](/docs/video/api/external-s3-compositions) for more details."},"status_callback":{"type":"string","format":"uri","nullable":true,"description":"The URL called using the `status_callback_method` to send status information on every composition event."},"status_callback_method":{"type":"string","format":"http-method","enum":["GET","POST"],"nullable":true,"description":"The HTTP method used to call `status_callback`. Can be: `POST` or `GET`, defaults to `POST`."},"url":{"type":"string","format":"uri","nullable":true,"description":"The absolute URL of the resource."},"links":{"type":"object","format":"uri-map","nullable":true,"description":"The URL of the media file associated with the composition."}}}
```

### HTTP GET \[#get-composition-http-get]

Returns the single Composition identified by `{CompositionSid}`.

### HTTP POST

Not supported.

### HTTP DELETE \[#delete-composition-http-delete]

Deletes the media file associated with the Composition identified by
`{CompositionSID}` and sets the Composition status as `deleted`.
In case the media file was stored in an external S3 bucket this request
has no effect on such file. Once a Composition has been deleted, its metadata
(i.e. it REST resource record) is kept during 30 days.

## Composition Instance Media Sub-Resource \[#composition-media-sub-resource]

### Resource URI \[#resource-uri-2]

```bash
/v1/Compositions/{CompositionSid}/Media

```

### HTTP GET \[#get-composition-media-file-http-get]

Retrieves the Composition media file through an HTTP redirection. The format of the provided media file is the one specified in the `Format` property of the Composition (see table above). By default, the redirection URL is available for 600 seconds, but this can be configured to a value between 1 and 3600 seconds via the `Ttl` request param. If the composition is not yet available, a `404` is returned.

The HTTP `GET` request accepts the following parameters

| Name               | Description                                                                                                                                                                                                                                                                                                                          |
| ------------------ | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| ContentDisposition | Optional. Sets the `Content-Disposition` header of the `redirect_to` URL. Possible values are `attachment` or `inline`. Default value `attachment%3B%20filename%3D%22CJxx.xxx%22` ([not PII](/docs/glossary/what-is-personally-identifiable-information-pii#fields-marked-not-pii))                                                  |
| Ttl                | Optional. Duration in seconds for which the `redirect_to` URL can be used to retrieve the media file. The default Ttl is 600 seconds. The minimum supported Ttl value is 1 second and the maximum supported value is 3600 seconds. ([not PII](/docs/glossary/what-is-personally-identifiable-information-pii#fields-marked-not-pii)) |

Remark that `ContentDisposition` affects the content disposition of the
redirection URL. This parameter behaves as specified in
[RFC-6266](https://tools.ietf.org/html/rfc6266#section-4.1):

* The value `attachment` indicates that browsers should prompt the user to
  store the file locally. In this case, the specification of a `filename` is
  mandatory. As shown in the table above, we use this as default and set
  `filename` to the Composition SID followed by the format extension.
  For example, for an MP4 Composition it will take the form `CJXXXX.mp4`.
* The value `inline` indicates default processing based on the media
  type. Hence, whenever the browser supports the composition format, the file
  will be played. Otherwise, the file is downloaded. Remark that when `inline` is
  used it is strongly recommended to provide a `filename` for the latter case.
  When doing so, remember that the `ContentDisposition` parameter must be
  URLEncoded. For example:

```bash
inline%3B%20filename%3D%22MyFile.mp4%22
```

### HTTP DELETE

Not supported.

### HTTP POST \[#http-post-2]

Not supported.

## Compositions List Resource \[#compositions-list-resource]

### Resource URI \[#resource-uri-3]

```bash
/v1/Compositions/

```

### HTTP POST \[#create-composition-http-post]

Creates a new Composition Instance Resource and, when appropriate, launches a media processing task. The result of this task is a composed media file that, by default,
is stored in Twilio's cloud.

Developers can create a new Composition as soon as its associated Room exists.
However, the processing task gets started only when the Room status is `Completed`.
This guarantees that all required recording sources are available.

This HTTP `POST` always returns a `201` if the request is accepted (i.e. well formed),
and a `4xx` otherwise depending on the type of error.

#### Supported POST Parameters \[#http-post-parameters]

The following table shows all the parameters that can be used when creating a
new Composition Instance Resource.

### Request body parameters

```json
{"schema":{"type":"object","title":"CreateCompositionRequest","required":["RoomSid"],"properties":{"RoomSid":{"type":"string","minLength":34,"maxLength":34,"pattern":"^RM[0-9a-fA-F]{32}$","description":"The SID of the Group Room with the media tracks to be used as composition sources."},"VideoLayout":{"description":"An object that describes the video layout of the composition in terms of regions. See [Specifying Video Layouts](https://www.twilio.com/docs/video/api/compositions-resource#specifying-video-layouts) for more info. Please, be aware that either video_layout or audio_sources have to be provided to get a valid creation request","x-twilio":{"pii":{"handling":"standard","deleteSla":30}}},"AudioSources":{"type":"array","description":"An array of track names from the same group room to merge into the new composition. Can include zero or more track names. The new composition includes all audio sources specified in `audio_sources` except for those specified in `audio_sources_excluded`. The track names in this parameter can include an asterisk as a wild card character, which will match zero or more characters in a track name. For example, `student*` includes `student` as well as `studentTeam`. Please, be aware that either video_layout or audio_sources have to be provided to get a valid creation request","items":{"type":"string"},"x-twilio":{"pii":{"handling":"standard","deleteSla":30}}},"AudioSourcesExcluded":{"type":"array","description":"An array of track names to exclude. The new composition includes all audio sources specified in `audio_sources` except for those specified in `audio_sources_excluded`. The track names in this parameter can include an asterisk as a wild card character, which will match zero or more characters in a track name. For example, `student*` excludes `student` as well as `studentTeam`. This parameter can also be empty.","items":{"type":"string"},"x-twilio":{"pii":{"handling":"standard","deleteSla":30}}},"Resolution":{"type":"string","description":"A string that describes the columns (width) and rows (height) of the generated composed video in pixels. Defaults to `640x480`. \nThe string's format is `{width}x{height}` where: \n\n* 16 <= `{width}` <= 1280\n* 16 <= `{height}` <= 1280\n* `{width}` * `{height}` <= 921,600\n\nTypical values are: \n\n* HD = `1280x720`\n* PAL = `1024x576`\n* VGA = `640x480`\n* CIF = `320x240`\n\nNote that the `resolution` imposes an aspect ratio to the resulting composition. When the original video tracks are constrained by the aspect ratio, they are scaled to fit. See [Specifying Video Layouts](https://www.twilio.com/docs/video/api/compositions-resource#specifying-video-layouts) for more info."},"Format":{"type":"string","enum":["mp4","webm"],"description":"The container format of the composition's media files as specified in the POST request that created the Composition resource. See [POST Parameters](https://www.twilio.com/docs/video/api/compositions-resource#http-post-parameters) for more information.","refName":"composition_enum_format","modelName":"composition_enum_format"},"StatusCallback":{"type":"string","format":"uri","description":"The URL we should call using the `status_callback_method` to send status information to your application on every composition event. If not provided, status callback events will not be dispatched."},"StatusCallbackMethod":{"type":"string","format":"http-method","enum":["GET","POST"],"description":"The HTTP method we should use to call `status_callback`. Can be: `POST` or `GET` and the default is `POST`."},"Trim":{"type":"boolean","description":"Whether to clip the intervals where there is no active media in the composition. The default is `true`. Compositions with `trim` enabled are shorter when the Room is created and no Participant joins for a while as well as if all the Participants leave the room and join later, because those gaps will be removed. See [Specifying Video Layouts](https://www.twilio.com/docs/video/api/compositions-resource#specifying-video-layouts) for more info."}}},"examples":{"create":{"value":{"lang":"json","value":"{\n  \"RoomSid\": \"RMaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa\",\n  \"AudioSources\": [\n    \"RTaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa\",\n    \"user*\"\n  ],\n  \"AudioSourcesExcluded\": [\n    \"RTbaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa\"\n  ],\n  \"VideoLayout\": \"{}\",\n  \"Trim\": true,\n  \"Format\": \"mp4\",\n  \"Resolution\": \"1920x1080\"\n}","meta":"","code":"{\n  \"RoomSid\": \"RMaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa\",\n  \"AudioSources\": [\n    \"RTaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa\",\n    \"user*\"\n  ],\n  \"AudioSourcesExcluded\": [\n    \"RTbaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa\"\n  ],\n  \"VideoLayout\": \"{}\",\n  \"Trim\": true,\n  \"Format\": \"mp4\",\n  \"Resolution\": \"1920x1080\"\n}","tokens":[["{","#C9D1D9"],"\n  ",["\"RoomSid\"","#7EE787"],[":","#C9D1D9"]," ",["\"RMaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa\"","#A5D6FF"],[",","#C9D1D9"],"\n  ",["\"AudioSources\"","#7EE787"],[": [","#C9D1D9"],"\n    ",["\"RTaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa\"","#A5D6FF"],[",","#C9D1D9"],"\n    ",["\"user*\"","#A5D6FF"],"\n  ",["],","#C9D1D9"],"\n  ",["\"AudioSourcesExcluded\"","#7EE787"],[": [","#C9D1D9"],"\n    ",["\"RTbaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa\"","#A5D6FF"],"\n  ",["],","#C9D1D9"],"\n  ",["\"VideoLayout\"","#7EE787"],[":","#C9D1D9"]," ",["\"{}\"","#A5D6FF"],[",","#C9D1D9"],"\n  ",["\"Trim\"","#7EE787"],[":","#C9D1D9"]," ",["true","#79C0FF"],[",","#C9D1D9"],"\n  ",["\"Format\"","#7EE787"],[":","#C9D1D9"]," ",["\"mp4\"","#A5D6FF"],[",","#C9D1D9"],"\n  ",["\"Resolution\"","#7EE787"],[":","#C9D1D9"]," ",["\"1920x1080\"","#A5D6FF"],"\n",["}","#C9D1D9"]],"annotations":[],"themeName":"github-dark","style":{"color":"#c9d1d9","background":"#0d1117"}}}},"encodingType":"application/x-www-form-urlencoded","conditionalParameterMap":{}}
```

#### Specifying Video Layouts \[#specifying-video-layouts]

Video layouts are organized in terms of regions. A region is a rectangular
area where a set of video sources are displayed following the region placement
rules. The `VideoLayout` of a Composition must contain at least one region but
it may contain many. Regions are independent meaning that the way placement
works in a region does not affect placement in other regions.

A Composition's `VideoLayout` is specified as a JSON dictionary of regions
following this scheme:

```bash
VideoLayout = {
                "a-region-name": {
                    region properties
                },

                "other-region-name": {
                  other region properties
                }

                ...
              }
```

The region properties define the size and position of the region, the video
sources to include in the region and the placement rules. Regions support
the following properties (recall that a "Yes" in the column
"Default value/mandatory" indicates a mandatory property)

| **Parameter**            | **Default value / mandatory**    | **Description**                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                    |
| ------------------------ | -------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `x_pos`                  | `0`                              | X axis value (in pixels) of the region's upper left corner relative to the upper left corner of the Composition viewport. Regions cannot overflow the Composition's area, so `x_pos` has to be a positive integer less than or equal to the difference between the Composition's width and the width of the region. If the region's width is missing from the request, it defaults to `16` pixels for this validation.                                                                                                                             |
| `y_pos`                  | `0`                              | Y axis value (in pixels) of the region's upper left corner relative to the upper left corner of the Composition viewport. Regions cannot overflow the composition's area, so `y_pos` has to be a positive integer less than or equal to the difference between the Composition's height and the height of this region. If the region's height is missing from the request, it defaults to `16` pixels for this validation.                                                                                                                         |
| `z_pos`                  | `0`                              | Z position controlling the region's visibility in case of overlaps. Regions with higher values are stacked on top of regions with lower value for visibility purposes. `z_pos` must be in the range `[-99, 99]`.                                                                                                                                                                                                                                                                                                                                   |
| `width`                  | `Composition's width` - `x_pos`  | Region's Width. It must be in the range `[16, Composition's width - x_pos]`. This constraint guarantees that the region fits into the Composition's viewport.                                                                                                                                                                                                                                                                                                                                                                                      |
| `height`                 | `Composition's height` - `y_pos` | Region's Height. It must be in the range `[16, Composition's height - y_pos]`. This constraint guarantees that the region fits into the Composition's viewport.                                                                                                                                                                                                                                                                                                                                                                                    |
| `max_columns`            | —                                | Maximum number of columns of the region's placement grid. By default, the region has as many columns as needed to layout all the specified video sources. `max_columns` must be in the range `[1, 1000]`.                                                                                                                                                                                                                                                                                                                                          |
| `max_rows`               | —                                | Maximum number of rows of the region's placement grid. By default, the region has as many rows as needed to layout all the specified video sources. `max_rows` must be in the range `[1, 1000]`.                                                                                                                                                                                                                                                                                                                                                   |
| `cells_excluded`         | —                                | A list of cell indices on the regions layout grid where no video sources can be assigned. Index of first cell (upper left) is 0. Indices grow from left to right and from top to bottom. These values must be in the range `[0, 999999]`.                                                                                                                                                                                                                                                                                                          |
| `reuse`                  | `show_oldest`                    | Defines how the region's grid cells are reused for placement purposes. Possible values are: -`none`: used cells are never reused.-`show_oldest`: a cell can only be reused when the video source it contains ends.-`show_newest`: a cell can be reused even if the video source it contains has not ended.                                                                                                                                                                                                                                         |
| `video_sources`          | Yes                              | The array of video sources that should be placed in this region. All the specified sources must belong to the same Room. It can include: -Zero or more `RecordingTrackSid`-Zero or more `MediaTrackSid`-Zero or more `ParticipantSid` -Zero or more Track names. These can be specified using wildcards (e.g. `student*`). The wildcard can be applied either at the beginning or at the end of the track name. The use of `[*]` has semantics "all if any" meaning zero or more (i.e. all) depending on whether the target room had video tracks. |
| `video_sources_excluded` | —                                | An array of video sources to exclude from this region. This region will attempt to display all sources specified in `video_sources` except for the ones specified in `video_sources_excluded`. This parameter may include: -Zero or more `RecordingTrackSid`-Zero or more `MediaTrackSid`-Zero or more `ParticipantSid` -Zero or more Track names. These can be specified using wildcards (e.g. `student*`).                                                                                                                                       |

The use of a `VideoLayout` not compliant with this specification shall cause the
corresponding `POST` request to be answered with a `4xx` code.

#### Region Positioning and Size \[#region-positioning-and-size]

The following figure illustrates how regions are positioned:

![Region Positioning and Size.](https://docs-resources.prod.twilio.com/4bc8f69d3d08ba451c5c1dc559895369de75957467d727113b2e80a0c4f2249b.png)

You may find useful to remember these rules:

* The Composition's `width` and `height` are defined through the `Resolution` parameter.
* Regions are positioned relative to the Composition top-left corner using
  `x_pos` and `y_pos`.
* Region dimensions are defined through the `width` and `height` properties.
* Regions must fit inside their Composition. This makes the following mandatory:
  * `x_pos` + `width` must not be over the Composition's `width`.
  * `y_pos` + `height` must not be over the Composition's `height`.
* In case `width` or `height`are not specified, by default the region shall occupy
  all the available remaining space on the Composition's viewport.
* When multiple regions overlap, their visibility depend on the `z_pos` property.
  Regions with higher `z_pos`  will be visible on top of regions with lower `z_pos`.

#### The Region as a Grid \[#region-as-a-grid]

The placement of `video_sources` in a region takes place through a grid (i.e. matrix)
where every cell is a container where one (and only one) video source may be
displayed at a time. Region grids are static meaning that their number of
rows and columns do not change during the Composition duration. The specific
number of rows and columns depends on the region's `max_columns` and `max_rows`
properties. There are three different situations:

![The Region as a Grid.](https://docs-resources.prod.twilio.com/f2a2fde11afaa276e01382eacd5b38f93a43c721f166c1e7f617112824324e6e.png)

**Unconstrained Grid**

In this case, neither `max_columns` nor `max_rows` are specified in the `VideoLayout`.
Twilio computes for you the grid dimensions to guarantee that all the provided
`video_sources` are displayed. Due to this, the cells in the grid will be at least
equal to the maximum number of simultaneous video sources in the Composition
(video sources are considered to be simultaneous at a given time when their
media is active at that time).
For this, we try to keep the grid as square as possible making it to grow first in columns
and then in rows so that their difference is never over 1. The following table
illustrates this:

| Maximum simultaneous video sources | Region's grid dimensions (rows x columns) |
| ---------------------------------- | ----------------------------------------- |
| 1                                  | 1x1                                       |
| 2                                  | 1x2                                       |
| 3                                  | 2x2                                       |
| 4                                  | 2x2                                       |
| 5                                  | 2x3                                       |
| 6                                  | 2x3                                       |
| 7                                  | 3x3                                       |
| 9                                  | 3x3                                       |
| 10                                 | 3x4                                       |
| 12                                 | 3x4                                       |
| 17                                 | 4x5                                       |
| 20                                 | 4x5                                       |

**Unconstrained Dimension**

In this case, only one of `max_columns` or `max_rows` is specified. The grid
dimensions are computed following the "Unconstrained Grid" algorithm (i.e. trying
to keep the grid as square as possible) but without exceeding the specified
maximum constraint. After that, the unconstrained dimension grows in order to
guarantee that all the specified video sources are displayed. The following
examples illustrate this:

| Maximum simultaneous video sources | max\_rows | max\_columns | Region's grid dimensions (rows x columns) |
| ---------------------------------- | --------- | ------------ | ----------------------------------------- |
| 1                                  | 1         | —            | 1x1                                       |
| 1                                  | —         | 1            | 1x1                                       |
| 2                                  | 1         | —            | 1x2                                       |
| 2                                  | —         | 1            | 2x1                                       |
| 3                                  | 1         | —            | 1x3                                       |
| 3                                  | —         | 1            | 3x1                                       |
| 4                                  | 2         | —            | 2x2                                       |
| 4                                  | —         | 2            | 2x2                                       |
| 5                                  | 2         | —            | 2x3                                       |
| 5                                  | —         | 2            | 3x2                                       |
| 6                                  | 2         | —            | 2x3                                       |
| 6                                  | —         | 2            | 3x2                                       |
| 7                                  | 2         | —            | 2x4                                       |
| 7                                  | —         | 2            | 4x2                                       |
| 9                                  | 2         | —            | 2x5                                       |
| 9                                  | —         | 2            | 5x2                                       |
| 12                                 | 2         | —            | 2x6                                       |
| 12                                 | —         | 2            | 6x2                                       |

**Constrained Grid**
In this case, both `max_columns` and `max_rows` are specified. The grid
dimensions are computed following the above specified algorithms but keeping
both dimensions under their limits. Due to this, the maximum number of cells
is `max_columns` \* `max_rows`. If the number of simultaneous video sources
exceeds that value, then some video sources shall not be displayed. The following
example illustrates the effect.

| Maximum simultaneous video sources | max\_rows | max\_columns | Region's grid dimensions (rows x columns) |
| ---------------------------------- | --------- | ------------ | ----------------------------------------- |
| 1                                  | 1         | 1            | 1x1                                       |
| 1                                  | 1         | 2            | 1x1                                       |
| 1                                  | 2         | 2            | 1x1                                       |
| 2                                  | 1         | 1            | 1x1 (1 source not displayed)              |
| 2                                  | 1         | 2            | 1x2                                       |
| 2                                  | 2         | 2            | 1x2                                       |
| 3                                  | 1         | 1            | 1x1 (2 sources not displayed)             |
| 3                                  | 1         | 2            | 1x2 (1 source not displayed)              |
| 3                                  | 2         | 2            | 2x2                                       |
| 4                                  | 1         | 1            | 1x1 (3 sources not displayed)             |
| 4                                  | 1         | 2            | 1x2 (2 sources not displayed)             |
| 4                                  | 2         | 2            | 2x2                                       |
| 5                                  | 1         | 1            | 1x1 (4 sources not displayed)             |
| 5                                  | 1         | 2            | 1x2 (2 sources not displayed)             |
| 5                                  | 2         | 2            | 2x2 (1 source not displayed)              |
| 9                                  | 1         | 7            | 1x7 (2 sources not displayed)             |
| 9                                  | 2         | 7            | 2x5                                       |
| 9                                  | 3         | 7            | 3x3                                       |

#### Displaying Video Sources \[#displaying-video-sources]

Video sources are displayed in region grid cells. Cells size and aspect ratio
is controlled by:

* The region pixel dimensions, as defined by the `width` and `height` parameters.
* The region grid dimensions (i.e. number of rows and columns), as introduced
  in the section above.

Hence, cells would have approximately (rounding effects not considered):

* Width equal to the region's `width` divided by the number of columns.
* Height equal to the region's `height` divided by the number of rows.

The display of the original video track sources in cells is performed using
"object-fit contain" CSS semantics. This means that the original video is
rescaled as necessary to fit into the target aspect ratio and that the
remaining areas of the cell are filled in black. The following images illustrate
how this happens

![Displaying Video Sources in Cells.](https://docs-resources.prod.twilio.com/6e73a4681a06ec0d31f0896ba173d673e17e286395e27849d3397200e40dabd6.png)

#### Understanding Reuse \[#understanding-reuse]

Video sources are assigned to cells from left-to-right and from top-to-bottom
in the region grid. However, this assignment depends on the value of the
`reuse` property. For understanding how `reuse` works, we need some definitions:

* We say a cell is **fresh** at a given time when it has not displayed any video
  source up to that time.
* We say a cell is **used** at a given time when it is displaying a video source
  at that time.
* We say a cell is **idle** at a given time when it has been used previously but
  its video source media has ended at that time.

Based on this, the possible values for `reuse` are the following:

* *`none`*: in this case, used cells are never reused again and stay idle
  until the composition ends. Newer video sources are assigned only to
  fresh cells following the left-to-right top-to-bottom order.
  In constrained grids, we may run out of fresh cells. In that case, no further
  video sources are displayed.
* *`show_oldest`*: in this case idle cells can be reused. Hence, newer video
  sources are assigned to both idle or fresh cells in left-to-right top-to-bottom
  order. In constrained grids, when running out of fresh cells, newer video
  sources will be displayed only as idle cells become available. In such
  constrained situation, this model gives display priority to older video sources
  (i.e. to the video sources starting first), which justifies its `show_oldest`
  name.
* *`show_newest`*: when this value is specified, video sources are displayed
  first in idle and fresh cells in the left-to-right top-to-bottom order. In
  constrained grids it may happen that we run out of both fresh and idle cells.
  In that case, used cells are reused so that newer video sources are displayed
  on top of older video sources. When there are several available used cells,
  the one whose media ends first is selected. As it can be understood, this model
  gives display priority to newer video sources (i.e. to video sources starting
  later), which justifies its `show_newest` name.

The difference between the different `reuse` modes can be visually appreciated
in the following figure:

![Timeline diagram showing regions with "Room timeline" labels, illustrating sequences for 1x1, 1x2 and unbounded regions.](https://docs-resources.prod.twilio.com/ea2126345557203b5e460d1256ededef974bab1a30beac0e924745bd016fe816.png)

As it can be observed, in this figure we assume a Room with 5 video tracks.
These are numbered from 0 to 4. The Room timeline shows the time intervals
(relative to the Room starting time) when such tracks are in published state.
Below it, we show a number of compositions subject to the following constraints:

* *1x1 Region Composition*: in this case, the Composition has a single region
  where `max_rows=1` and `max_columns=1`. When `reuse=none` the first track (i.e.
  the one identified as 0) takes the single fresh cell of the region for
  display. In the gaps where this track is unpublished, the cell is never reused and the
  Composition stays black (in case `Trim=false`) or terminates (in case `Trim=true`).
  If `reuse=show_newest` newer tracks have higher priority than older tracks.
  Due to this, track 1 is stacked on top of track 0 and displayed while it is
  active. Later, tracks 2, 3 and 4 take the single region cell
  as soon as their media is activated. In the case where `reuse=show_oldest`,
  the first track occupying the single region cell keeps it until it ends.
  After that, newer tracks can take it (observe how the end of track 2 allows track
  3 to be displayed and how the end of track 3 does the same with track 4.)
* *1x2 Region Composition*: now the Composition has a single region with
  two cells (`max_rows=1` and `max_columns=2`). Due to this, tracks 0 and 1 can
  be displayed simultaneously. For tracks 2, 3 and 4 their display is controlled
  by the reuse model. When `reuse=none`, tracks 0 and 1 take the two fresh cells.
  After that, no further tracks can reuse such cells and the Composition
  stays black (in case `Trim=false`) or terminates (in case `Trim=true`). If
  `reuse=show_newest` 2 and 3 can reuse the idle cells, but when 4 arrives
  it reuses the used cell with track ending first (in this case 2). When
  `reuse=show_oldest` 2 and 3 have priority and hence 4 needs to wait until an
  idle cell is made available, which takes place when 2 ends.
* *Unconstrained Region Composition*: in this case, the Composition has a
  single cell where neither `max_rows` nor `max_columns` have been specified.
  Hence, the region grid dimensions are automatically calculated to fit all
  the specified video sources. When `reuse=none`, we need 5 cells given that
  video sources can only occupy fresh cells. Due to this, the system uses a
  2x3 grid. When `reuse=show_newest` or `reuse=show_oldest` the
  required grid needs to have only 3 cells given that the maximum number of
  simultaneous tracks is 3 (i.e. what happens during the interval in which
  2, 3 and 4 are published). Hence, the system computes a 2x2 grid. Observe
  that when using unconstrained grids, both `show_newest` and `show_oldest`
  generate the same video placement for the region. This is due to the fact
  that in an unconstrained grid it is guaranteed that the number of video
  sources never exceeds the number of cells in the grid. Hence, no used cells
  need ever to be reused.

#### Understanding Trim \[#understanding-trim]

The `Trim` Composition parameter controls what happens to the composition
when there is no active media. That is, during the gaps in which neither
audio tracks nor video tracks are published. We define two types of such
gaps:

* Initial gap: Compositions have an initial gap when at the beginning of the Room
  there is no active media. The initial gap ends when the first recording included
  in the composition starts. The initial gap is always trimmed in Compositions.
* Later gap: for any other gap not being an initial gap.

Later gaps are trimmed depending on the value of the `trim` parameter.

* *trim=false*: The Composition keeps all the later gaps as black video with
  silent audio. Hence, these idle intervals with no media may appear at the end or in the middle
  of the Composition.
* *trim=true (default)*: the Composition clips all gaps where
  there is no media published. Note that when an audio track is active in the
  composition during an interval it shall not be clipped even if
  there are no active video tracks on it.

The following figure illustrates how trimmed Compositions behave in the
scenarios introduced in the section above.

![Composing different layouts in a room (trim=true).](https://docs-resources.prod.twilio.com/14c53099b4e747e703f90b4a3e6c66e2c693ec29c7d9d6ad0cdcc28d322e7888.png)

#### HTTP GET \[#get-list-http-get]

Retrieves the list Composition Instance Records belonging to the specified `AccountSid` with paging data.

##### Supported GET Parameters \[#get-list-query-parameters]

The following `GET` query string parameters allow you to limit the list returned. Note, parameters are case-sensitive.

### Query parameters

```json
[{"name":"Status","in":"query","description":"Read only Composition resources with this status. Can be: `enqueued`, `processing`, `completed`, `deleted`, or `failed`.","schema":{"type":"string","enum":["enqueued","processing","completed","deleted","failed"],"description":"The status of the composition. Can be: `enqueued`, `processing`, `completed`, `deleted` or `failed`. `enqueued` is the initial state and indicates that the composition request has been received and is scheduled for processing; `processing` indicates the composition is being processed; `completed` indicates the composition has been completed and is available for download; `deleted` means the composition media has been deleted from the system, but its metadata is still available for 30 days; `failed` indicates the composition failed to execute the media processing task.","refName":"composition_enum_status","modelName":"composition_enum_status"},"examples":{"readEnqueued":{"value":"enqueued"},"readEmpty":{"value":"completed"},"readResults":{"value":"completed"}}},{"name":"DateCreatedAfter","in":"query","description":"Read only Composition resources created on or after this [ISO 8601](https://en.wikipedia.org/wiki/ISO_8601) date-time with time zone.","schema":{"type":"string","format":"date-time"},"examples":{"readResults":{"value":"2017-01-01T00:00:01Z"}}},{"name":"DateCreatedBefore","in":"query","description":"Read only Composition resources created before this ISO 8601 date-time with time zone.","schema":{"type":"string","format":"date-time"},"examples":{"readResults":{"value":"2017-12-31T23:59:59Z"}}},{"name":"RoomSid","in":"query","description":"Read only Composition resources with this Room SID.","schema":{"type":"string","minLength":34,"maxLength":34,"pattern":"^RM[0-9a-fA-F]{32}$"},"examples":{"readResults":{"value":"RMaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa"}}},{"name":"PageSize","in":"query","description":"How many resources to return in each list page.","schema":{"type":"integer","format":"int64","minimum":1,"maximum":100,"default":50}},{"name":"Page","in":"query","description":"The page index. This value is simply for client state.","schema":{"type":"integer","minimum":0}},{"name":"PageToken","in":"query","description":"The page token. This is provided by the API.","schema":{"type":"string"}}]
```

Note: `deleted` Compositions are not returned by default. For retrieving the
deleted Compositions list you must explicitly specify `Status=deleted`.

## Examples \[#example]

### Creating Transcoding Compositions \[#example-transcode]

#### Example: Transcode a Video Recording \[#example-transcode-video-recording]

In this example we assume a Room with RoomSid=`RMXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX` where a video Track with
MediaTrackSid=`MTXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX` is published and recorded with RecordingTrackSid=`RTXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX`.
We want then to generate a Composition containing such video Track but
transcoded to the `H.264/mp4` format. Considering that:

* Your application credentials are (`SKXXXX:your_api_key_secret`)
* You want to use the default resolution (VGA = `640x480`)

You can create the desired Composition using the following:

Transcode a Video Recording

```js
// Download the helper library from https://www.twilio.com/docs/node/install
const twilio = require("twilio"); // Or, for ESM: import twilio from "twilio";

// Find your Account SID and Auth Token at twilio.com/console
// and set the environment variables. See http://twil.io/secure
const accountSid = process.env.TWILIO_ACCOUNT_SID;
const authToken = process.env.TWILIO_AUTH_TOKEN;
const client = twilio(accountSid, authToken);

async function createComposition() {
  const composition = await client.video.v1.compositions.create({
    format: "mp4",
    roomSid: "RMaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",
    statusCallback: "https://www.example.com/callbacks",
    videoLayout: {
      transcode: {
        video_sources: ["RTXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX"],
      },
    },
  });

  console.log(composition.accountSid);
}

createComposition();
```

```python
# Download the helper library from https://www.twilio.com/docs/python/install
import os
from twilio.rest import Client

# Find your Account SID and Auth Token at twilio.com/console
# and set the environment variables. See http://twil.io/secure
account_sid = os.environ["TWILIO_ACCOUNT_SID"]
auth_token = os.environ["TWILIO_AUTH_TOKEN"]
client = Client(account_sid, auth_token)

composition = client.video.v1.compositions.create(
    video_layout={
        "transcode": {"video_sources": ["RTXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX"]}
    },
    status_callback="https://www.example.com/callbacks",
    format="mp4",
    room_sid="RMaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",
)

print(composition.account_sid)
```

```csharp
// Install the C# / .NET helper library from twilio.com/docs/csharp/install

using System;
using Twilio;
using Twilio.Rest.Video.V1;
using System.Threading.Tasks;
using System.Collections.Generic;

class Program {
    public static async Task Main(string[] args) {
        // Find your Account SID and Auth Token at twilio.com/console
        // and set the environment variables. See http://twil.io/secure
        string accountSid = Environment.GetEnvironmentVariable("TWILIO_ACCOUNT_SID");
        string authToken = Environment.GetEnvironmentVariable("TWILIO_AUTH_TOKEN");

        TwilioClient.Init(accountSid, authToken);

        var composition = await CompositionResource.CreateAsync(
            videoLayout: new Dictionary<
                string,
                Object>() { { "transcode", new Dictionary<string, Object>() { { "video_sources", new List<string> { "RTXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX" } } } } },
            statusCallback: new Uri("https://www.example.com/callbacks"),
            format: CompositionResource.FormatEnum.Mp4,
            roomSid: "RMaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa");

        Console.WriteLine(composition.AccountSid);
    }
}
```

```java
// Install the Java helper library from twilio.com/docs/java/install

import java.net.URI;
import java.util.Arrays;
import java.util.HashMap;
import com.twilio.Twilio;
import com.twilio.rest.video.v1.Composition;

public class Example {
    // Find your Account SID and Auth Token at twilio.com/console
    // and set the environment variables. See http://twil.io/secure
    public static final String ACCOUNT_SID = System.getenv("TWILIO_ACCOUNT_SID");
    public static final String AUTH_TOKEN = System.getenv("TWILIO_AUTH_TOKEN");

    public static void main(String[] args) {
        Twilio.init(ACCOUNT_SID, AUTH_TOKEN);
        Composition composition =
            Composition.creator("RMaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa")
                .setVideoLayout(new HashMap<String, Object>() {
                    {
                        put("transcode", new HashMap<String, Object>() {
                            {
                                put("video_sources", Arrays.asList("RTXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX"));
                            }
                        });
                    }
                })
                .setStatusCallback(URI.create("https://www.example.com/callbacks"))
                .setFormat(Composition.Format.MP4)
                .create();

        System.out.println(composition.getAccountSid());
    }
}
```

```go
// Download the helper library from https://www.twilio.com/docs/go/install
package main

import (
	"fmt"
	"github.com/twilio/twilio-go"
	video "github.com/twilio/twilio-go/rest/video/v1"
	"os"
)

func main() {
	// Find your Account SID and Auth Token at twilio.com/console
	// and set the environment variables. See http://twil.io/secure
	// Make sure TWILIO_ACCOUNT_SID and TWILIO_AUTH_TOKEN exists in your environment
	client := twilio.NewRestClient()

	params := &video.CreateCompositionParams{}
	params.SetVideoLayout(map[string]interface{}{
		"transcode": map[string]interface{}{
			"video_sources": []string{
				"RTXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX",
			},
		},
	})
	params.SetStatusCallback("https://www.example.com/callbacks")
	params.SetFormat("mp4")
	params.SetRoomSid("RMaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa")

	resp, err := client.VideoV1.CreateComposition(params)
	if err != nil {
		fmt.Println(err.Error())
		os.Exit(1)
	} else {
		if resp.AccountSid != nil {
			fmt.Println(*resp.AccountSid)
		} else {
			fmt.Println(resp.AccountSid)
		}
	}
}
```

```php
<?php

// Update the path below to your autoload.php,
// see https://getcomposer.org/doc/01-basic-usage.md
require_once "/path/to/vendor/autoload.php";

use Twilio\Rest\Client;

// Find your Account SID and Auth Token at twilio.com/console
// and set the environment variables. See http://twil.io/secure
$sid = getenv("TWILIO_ACCOUNT_SID");
$token = getenv("TWILIO_AUTH_TOKEN");
$twilio = new Client($sid, $token);

$composition = $twilio->video->v1->compositions->create(
    "RMaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa", // RoomSid
    [
        "videoLayout" => [
            "transcode" => [
                "video_sources" => ["RTXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX"],
            ],
        ],
        "statusCallback" => "https://www.example.com/callbacks",
        "format" => "mp4",
    ]
);

print $composition->accountSid;
```

```ruby
# Download the helper library from https://www.twilio.com/docs/ruby/install
require 'twilio-ruby'

# Find your Account SID and Auth Token at twilio.com/console
# and set the environment variables. See http://twil.io/secure
account_sid = ENV['TWILIO_ACCOUNT_SID']
auth_token = ENV['TWILIO_AUTH_TOKEN']
@client = Twilio::REST::Client.new(account_sid, auth_token)

composition = @client
              .video
              .v1
              .compositions
              .create(
                video_layout: {
                  'transcode' => {
                    'video_sources' => [
                      'RTXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX'
                    ]
                  }
                },
                status_callback: 'https://www.example.com/callbacks',
                format: 'mp4',
                room_sid: 'RMaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa'
              )

puts composition.account_sid
```

```bash
# Install the twilio-cli from https://twil.io/cli

twilio api:video:v1:compositions:create \
   --video-layout "{\"transcode\":{\"video_sources\":[\"RTXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX\"]}}" \
   --status-callback https://www.example.com/callbacks \
   --format mp4 \
   --room-sid RMaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa
```

```bash
VIDEO_LAYOUT_OBJ=$(cat << EOF
{
  "transcode": {
    "video_sources": [
      "RTXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX"
    ]
  }
}
EOF
)
curl -X POST "https://video.twilio.com/v1/Compositions" \
--data-urlencode "VideoLayout=$VIDEO_LAYOUT_OBJ" \
--data-urlencode "StatusCallback=https://www.example.com/callbacks" \
--data-urlencode "Format=mp4" \
--data-urlencode "RoomSid=RMaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa" \
-u $TWILIO_ACCOUNT_SID:$TWILIO_AUTH_TOKEN
```

```json
{
  "account_sid": "ACaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",
  "status": "processing",
  "date_created": "2015-07-30T20:00:00Z",
  "date_completed": null,
  "date_deleted": null,
  "sid": "CJaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",
  "room_sid": "RMaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",
  "audio_sources": [
    "RTaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",
    "user*"
  ],
  "audio_sources_excluded": [
    "RTbaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa"
  ],
  "video_layout": {
    "transcode": {
      "video_sources": [
        "RTXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX"
      ]
    }
  },
  "trim": true,
  "format": "mp4",
  "resolution": "1920x1080",
  "bitrate": 0,
  "size": 0,
  "duration": 0,
  "media_external_location": null,
  "url": "https://video.twilio.com/v1/Compositions/CJaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",
  "status_callback": "https://www.example.com/callbacks",
  "status_callback_method": "POST",
  "links": {
    "media": "https://video.twilio.com/v1/Compositions/CJaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa/Media"
  }
}
```

#### Example: Transcode an Audio Recording \[#example-transcode-audio-recording]

In this example we assume a Room with RoomSid=`RMXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX` where an audio Track with
MediaTrackSid=`MTXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX` is publishes and recorded with RecordingTrackSid=`RTXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX`.
We want then to generate a Composition containing such audio Track but
transcoded to the `AAC/mp4` format. Considering that:

* Your application credentials are (`SKXXXX:your_api_key_secret`)

You can create the desired Composition using the following:

Transcode an Audio Recording

```js
// Download the helper library from https://www.twilio.com/docs/node/install
const twilio = require("twilio"); // Or, for ESM: import twilio from "twilio";

// Find your Account SID and Auth Token at twilio.com/console
// and set the environment variables. See http://twil.io/secure
const accountSid = process.env.TWILIO_ACCOUNT_SID;
const authToken = process.env.TWILIO_AUTH_TOKEN;
const client = twilio(accountSid, authToken);

async function createComposition() {
  const composition = await client.video.v1.compositions.create({
    audioSources: ["RTXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX"],
    format: "mp4",
    roomSid: "RMaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",
    statusCallback: "https://www.example.com/callbacks",
  });

  console.log(composition.accountSid);
}

createComposition();
```

```python
# Download the helper library from https://www.twilio.com/docs/python/install
import os
from twilio.rest import Client

# Find your Account SID and Auth Token at twilio.com/console
# and set the environment variables. See http://twil.io/secure
account_sid = os.environ["TWILIO_ACCOUNT_SID"]
auth_token = os.environ["TWILIO_AUTH_TOKEN"]
client = Client(account_sid, auth_token)

composition = client.video.v1.compositions.create(
    audio_sources=["RTXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX"],
    status_callback="https://www.example.com/callbacks",
    format="mp4",
    room_sid="RMaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",
)

print(composition.account_sid)
```

```csharp
// Install the C# / .NET helper library from twilio.com/docs/csharp/install

using System;
using Twilio;
using Twilio.Rest.Video.V1;
using System.Threading.Tasks;
using System.Collections.Generic;

class Program {
    public static async Task Main(string[] args) {
        // Find your Account SID and Auth Token at twilio.com/console
        // and set the environment variables. See http://twil.io/secure
        string accountSid = Environment.GetEnvironmentVariable("TWILIO_ACCOUNT_SID");
        string authToken = Environment.GetEnvironmentVariable("TWILIO_AUTH_TOKEN");

        TwilioClient.Init(accountSid, authToken);

        var composition = await CompositionResource.CreateAsync(
            audioSources: new List<string> { "RTXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX" },
            statusCallback: new Uri("https://www.example.com/callbacks"),
            format: CompositionResource.FormatEnum.Mp4,
            roomSid: "RMaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa");

        Console.WriteLine(composition.AccountSid);
    }
}
```

```java
// Install the Java helper library from twilio.com/docs/java/install

import java.net.URI;
import java.util.Arrays;
import com.twilio.Twilio;
import com.twilio.rest.video.v1.Composition;

public class Example {
    // Find your Account SID and Auth Token at twilio.com/console
    // and set the environment variables. See http://twil.io/secure
    public static final String ACCOUNT_SID = System.getenv("TWILIO_ACCOUNT_SID");
    public static final String AUTH_TOKEN = System.getenv("TWILIO_AUTH_TOKEN");

    public static void main(String[] args) {
        Twilio.init(ACCOUNT_SID, AUTH_TOKEN);
        Composition composition = Composition.creator("RMaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa")
                                      .setAudioSources(Arrays.asList("RTXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX"))
                                      .setStatusCallback(URI.create("https://www.example.com/callbacks"))
                                      .setFormat(Composition.Format.MP4)
                                      .create();

        System.out.println(composition.getAccountSid());
    }
}
```

```go
// Download the helper library from https://www.twilio.com/docs/go/install
package main

import (
	"fmt"
	"github.com/twilio/twilio-go"
	video "github.com/twilio/twilio-go/rest/video/v1"
	"os"
)

func main() {
	// Find your Account SID and Auth Token at twilio.com/console
	// and set the environment variables. See http://twil.io/secure
	// Make sure TWILIO_ACCOUNT_SID and TWILIO_AUTH_TOKEN exists in your environment
	client := twilio.NewRestClient()

	params := &video.CreateCompositionParams{}
	params.SetAudioSources([]string{
		"RTXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX",
	})
	params.SetStatusCallback("https://www.example.com/callbacks")
	params.SetFormat("mp4")
	params.SetRoomSid("RMaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa")

	resp, err := client.VideoV1.CreateComposition(params)
	if err != nil {
		fmt.Println(err.Error())
		os.Exit(1)
	} else {
		if resp.AccountSid != nil {
			fmt.Println(*resp.AccountSid)
		} else {
			fmt.Println(resp.AccountSid)
		}
	}
}
```

```php
<?php

// Update the path below to your autoload.php,
// see https://getcomposer.org/doc/01-basic-usage.md
require_once "/path/to/vendor/autoload.php";

use Twilio\Rest\Client;

// Find your Account SID and Auth Token at twilio.com/console
// and set the environment variables. See http://twil.io/secure
$sid = getenv("TWILIO_ACCOUNT_SID");
$token = getenv("TWILIO_AUTH_TOKEN");
$twilio = new Client($sid, $token);

$composition = $twilio->video->v1->compositions->create(
    "RMaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa", // RoomSid
    [
        "audioSources" => ["RTXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX"],
        "statusCallback" => "https://www.example.com/callbacks",
        "format" => "mp4",
    ]
);

print $composition->accountSid;
```

```ruby
# Download the helper library from https://www.twilio.com/docs/ruby/install
require 'twilio-ruby'

# Find your Account SID and Auth Token at twilio.com/console
# and set the environment variables. See http://twil.io/secure
account_sid = ENV['TWILIO_ACCOUNT_SID']
auth_token = ENV['TWILIO_AUTH_TOKEN']
@client = Twilio::REST::Client.new(account_sid, auth_token)

composition = @client
              .video
              .v1
              .compositions
              .create(
                audio_sources: [
                  'RTXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX'
                ],
                status_callback: 'https://www.example.com/callbacks',
                format: 'mp4',
                room_sid: 'RMaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa'
              )

puts composition.account_sid
```

```bash
# Install the twilio-cli from https://twil.io/cli

twilio api:video:v1:compositions:create \
   --audio-sources RTXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX \
   --status-callback https://www.example.com/callbacks \
   --format mp4 \
   --room-sid RMaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa
```

```bash
curl -X POST "https://video.twilio.com/v1/Compositions" \
--data-urlencode "AudioSources=RTXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX" \
--data-urlencode "StatusCallback=https://www.example.com/callbacks" \
--data-urlencode "Format=mp4" \
--data-urlencode "RoomSid=RMaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa" \
-u $TWILIO_ACCOUNT_SID:$TWILIO_AUTH_TOKEN
```

```json
{
  "account_sid": "ACaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",
  "status": "processing",
  "date_created": "2015-07-30T20:00:00Z",
  "date_completed": null,
  "date_deleted": null,
  "sid": "CJaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",
  "room_sid": "RMaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",
  "audio_sources": [
    "RTXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX"
  ],
  "audio_sources_excluded": [
    "RTbaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa"
  ],
  "video_layout": {
    "custom": {
      "video_sources": [
        "user*"
      ],
      "video_sources_excluded": [
        "RTcaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa"
      ],
      "reuse": "show_oldest",
      "x_pos": 100,
      "y_pos": 600,
      "z_pos": 10,
      "width": 800,
      "height": 0,
      "max_columns": 0,
      "max_rows": 0,
      "cells_excluded": [
        2,
        3
      ]
    }
  },
  "trim": true,
  "format": "mp4",
  "resolution": "1920x1080",
  "bitrate": 0,
  "size": 0,
  "duration": 0,
  "media_external_location": null,
  "url": "https://video.twilio.com/v1/Compositions/CJaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",
  "status_callback": "https://www.example.com/callbacks",
  "status_callback_method": "POST",
  "links": {
    "media": "https://video.twilio.com/v1/Compositions/CJaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa/Media"
  }
}
```

Remark that, in spite of this being an only-audio composition, it shows default
video settings in the corresponding response parameters.

### Creating Compositions with Simple Layouts \[#example-compose]

#### Example: Compose one Participant's Media \[#example-compose-participant]

In this example we assume a Room with RoomSid=`RMXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX` where a Participant with
ParticipantSid=`PAXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX` publishes both audio and video tracks to the Room. In
this Room there may be other Participants publishing audio and video without
affecting this example's result.

We want to generate a Composition showing the Participant's video Track and
having as audio the one of that Participant. Considering that:

* Your application credentials are (`SKXXXX:your_api_key_secret`)
* You want to use `mp4` as target format
* You want to use the default resolution (VGA = `640x480`)

You can create the desired Composition using the following:

Compose one Participant's Media

```js
// Download the helper library from https://www.twilio.com/docs/node/install
const twilio = require("twilio"); // Or, for ESM: import twilio from "twilio";

// Find your Account SID and Auth Token at twilio.com/console
// and set the environment variables. See http://twil.io/secure
const accountSid = process.env.TWILIO_ACCOUNT_SID;
const authToken = process.env.TWILIO_AUTH_TOKEN;
const client = twilio(accountSid, authToken);

async function createComposition() {
  const composition = await client.video.v1.compositions.create({
    audioSources: ["PAXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX"],
    format: "mp4",
    roomSid: "RMaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",
    statusCallback: "https://www.example.com/callbacks",
    videoLayout: {
      single: {
        video_sources: ["PAXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX"],
      },
    },
  });

  console.log(composition.accountSid);
}

createComposition();
```

```python
# Download the helper library from https://www.twilio.com/docs/python/install
import os
from twilio.rest import Client

# Find your Account SID and Auth Token at twilio.com/console
# and set the environment variables. See http://twil.io/secure
account_sid = os.environ["TWILIO_ACCOUNT_SID"]
auth_token = os.environ["TWILIO_AUTH_TOKEN"]
client = Client(account_sid, auth_token)

composition = client.video.v1.compositions.create(
    audio_sources=["PAXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX"],
    video_layout={
        "single": {"video_sources": ["PAXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX"]}
    },
    status_callback="https://www.example.com/callbacks",
    format="mp4",
    room_sid="RMaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",
)

print(composition.account_sid)
```

```csharp
// Install the C# / .NET helper library from twilio.com/docs/csharp/install

using System;
using Twilio;
using Twilio.Rest.Video.V1;
using System.Threading.Tasks;
using System.Collections.Generic;

class Program {
    public static async Task Main(string[] args) {
        // Find your Account SID and Auth Token at twilio.com/console
        // and set the environment variables. See http://twil.io/secure
        string accountSid = Environment.GetEnvironmentVariable("TWILIO_ACCOUNT_SID");
        string authToken = Environment.GetEnvironmentVariable("TWILIO_AUTH_TOKEN");

        TwilioClient.Init(accountSid, authToken);

        var composition = await CompositionResource.CreateAsync(
            audioSources: new List<string> { "PAXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX" },
            videoLayout: new Dictionary<
                string,
                Object>() { { "single", new Dictionary<string, Object>() { { "video_sources", new List<string> { "PAXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX" } } } } },
            statusCallback: new Uri("https://www.example.com/callbacks"),
            format: CompositionResource.FormatEnum.Mp4,
            roomSid: "RMaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa");

        Console.WriteLine(composition.AccountSid);
    }
}
```

```java
// Install the Java helper library from twilio.com/docs/java/install

import java.net.URI;
import java.util.Arrays;
import java.util.HashMap;
import com.twilio.Twilio;
import com.twilio.rest.video.v1.Composition;

public class Example {
    // Find your Account SID and Auth Token at twilio.com/console
    // and set the environment variables. See http://twil.io/secure
    public static final String ACCOUNT_SID = System.getenv("TWILIO_ACCOUNT_SID");
    public static final String AUTH_TOKEN = System.getenv("TWILIO_AUTH_TOKEN");

    public static void main(String[] args) {
        Twilio.init(ACCOUNT_SID, AUTH_TOKEN);
        Composition composition =
            Composition.creator("RMaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa")
                .setAudioSources(Arrays.asList("PAXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX"))
                .setVideoLayout(new HashMap<String, Object>() {
                    {
                        put("single", new HashMap<String, Object>() {
                            {
                                put("video_sources", Arrays.asList("PAXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX"));
                            }
                        });
                    }
                })
                .setStatusCallback(URI.create("https://www.example.com/callbacks"))
                .setFormat(Composition.Format.MP4)
                .create();

        System.out.println(composition.getAccountSid());
    }
}
```

```go
// Download the helper library from https://www.twilio.com/docs/go/install
package main

import (
	"fmt"
	"github.com/twilio/twilio-go"
	video "github.com/twilio/twilio-go/rest/video/v1"
	"os"
)

func main() {
	// Find your Account SID and Auth Token at twilio.com/console
	// and set the environment variables. See http://twil.io/secure
	// Make sure TWILIO_ACCOUNT_SID and TWILIO_AUTH_TOKEN exists in your environment
	client := twilio.NewRestClient()

	params := &video.CreateCompositionParams{}
	params.SetAudioSources([]string{
		"PAXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX",
	})
	params.SetVideoLayout(map[string]interface{}{
		"single": map[string]interface{}{
			"video_sources": []string{
				"PAXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX",
			},
		},
	})
	params.SetStatusCallback("https://www.example.com/callbacks")
	params.SetFormat("mp4")
	params.SetRoomSid("RMaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa")

	resp, err := client.VideoV1.CreateComposition(params)
	if err != nil {
		fmt.Println(err.Error())
		os.Exit(1)
	} else {
		if resp.AccountSid != nil {
			fmt.Println(*resp.AccountSid)
		} else {
			fmt.Println(resp.AccountSid)
		}
	}
}
```

```php
<?php

// Update the path below to your autoload.php,
// see https://getcomposer.org/doc/01-basic-usage.md
require_once "/path/to/vendor/autoload.php";

use Twilio\Rest\Client;

// Find your Account SID and Auth Token at twilio.com/console
// and set the environment variables. See http://twil.io/secure
$sid = getenv("TWILIO_ACCOUNT_SID");
$token = getenv("TWILIO_AUTH_TOKEN");
$twilio = new Client($sid, $token);

$composition = $twilio->video->v1->compositions->create(
    "RMaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa", // RoomSid
    [
        "audioSources" => ["PAXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX"],
        "videoLayout" => [
            "single" => [
                "video_sources" => ["PAXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX"],
            ],
        ],
        "statusCallback" => "https://www.example.com/callbacks",
        "format" => "mp4",
    ]
);

print $composition->accountSid;
```

```ruby
# Download the helper library from https://www.twilio.com/docs/ruby/install
require 'twilio-ruby'

# Find your Account SID and Auth Token at twilio.com/console
# and set the environment variables. See http://twil.io/secure
account_sid = ENV['TWILIO_ACCOUNT_SID']
auth_token = ENV['TWILIO_AUTH_TOKEN']
@client = Twilio::REST::Client.new(account_sid, auth_token)

composition = @client
              .video
              .v1
              .compositions
              .create(
                audio_sources: [
                  'PAXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX'
                ],
                video_layout: {
                  'single' => {
                    'video_sources' => [
                      'PAXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX'
                    ]
                  }
                },
                status_callback: 'https://www.example.com/callbacks',
                format: 'mp4',
                room_sid: 'RMaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa'
              )

puts composition.account_sid
```

```bash
# Install the twilio-cli from https://twil.io/cli

twilio api:video:v1:compositions:create \
   --audio-sources PAXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX \
   --video-layout "{\"single\":{\"video_sources\":[\"PAXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX\"]}}" \
   --status-callback https://www.example.com/callbacks \
   --format mp4 \
   --room-sid RMaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa
```

```bash
VIDEO_LAYOUT_OBJ=$(cat << EOF
{
  "single": {
    "video_sources": [
      "PAXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX"
    ]
  }
}
EOF
)
curl -X POST "https://video.twilio.com/v1/Compositions" \
--data-urlencode "AudioSources=PAXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX" \
--data-urlencode "VideoLayout=$VIDEO_LAYOUT_OBJ" \
--data-urlencode "StatusCallback=https://www.example.com/callbacks" \
--data-urlencode "Format=mp4" \
--data-urlencode "RoomSid=RMaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa" \
-u $TWILIO_ACCOUNT_SID:$TWILIO_AUTH_TOKEN
```

```json
{
  "account_sid": "ACaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",
  "status": "processing",
  "date_created": "2015-07-30T20:00:00Z",
  "date_completed": null,
  "date_deleted": null,
  "sid": "CJaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",
  "room_sid": "RMaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",
  "audio_sources": [
    "PAXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX"
  ],
  "audio_sources_excluded": [
    "RTbaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa"
  ],
  "video_layout": {
    "single": {
      "video_sources": [
        "PAXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX"
      ]
    }
  },
  "trim": true,
  "format": "mp4",
  "resolution": "1920x1080",
  "bitrate": 0,
  "size": 0,
  "duration": 0,
  "media_external_location": null,
  "url": "https://video.twilio.com/v1/Compositions/CJaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",
  "status_callback": "https://www.example.com/callbacks",
  "status_callback_method": "POST",
  "links": {
    "media": "https://video.twilio.com/v1/Compositions/CJaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa/Media"
  }
}
```

#### Example: Compose One Participant's Video with all Room Participants' Audios \[#example-compose-participant-video-with-all-audios]

In this example we assume a Room with RoomSid=`RMXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX` where a Participant with
ParticipantSid=`PAXXXX` publishes both audio and video Tracks. In that Room
others participant publish also their audio and video Tracks.
We want generate a Composition showing `PAXXXX` video but having as audio
the complete set of Room audio Tracks mixed. Considering that:

* Your application credentials are (`SKXXXX:your_api_key_secret`)
* You want to use `mp4` as target format
* You want to use the default resolution (VGA = `640x480`)

You can create the desired Composition using the following:

Compose One Participant's Video with all Room Participants' Audios

```js
// Download the helper library from https://www.twilio.com/docs/node/install
const twilio = require("twilio"); // Or, for ESM: import twilio from "twilio";

// Find your Account SID and Auth Token at twilio.com/console
// and set the environment variables. See http://twil.io/secure
const accountSid = process.env.TWILIO_ACCOUNT_SID;
const authToken = process.env.TWILIO_AUTH_TOKEN;
const client = twilio(accountSid, authToken);

async function createComposition() {
  const composition = await client.video.v1.compositions.create({
    audioSources: ["*"],
    format: "mp4",
    roomSid: "RMaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",
    statusCallback: "https://www.example.com/callbacks",
    videoLayout: {
      single: {
        video_sources: ["PAXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX"],
      },
    },
  });

  console.log(composition.accountSid);
}

createComposition();
```

```python
# Download the helper library from https://www.twilio.com/docs/python/install
import os
from twilio.rest import Client

# Find your Account SID and Auth Token at twilio.com/console
# and set the environment variables. See http://twil.io/secure
account_sid = os.environ["TWILIO_ACCOUNT_SID"]
auth_token = os.environ["TWILIO_AUTH_TOKEN"]
client = Client(account_sid, auth_token)

composition = client.video.v1.compositions.create(
    audio_sources=["*"],
    video_layout={
        "single": {"video_sources": ["PAXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX"]}
    },
    status_callback="https://www.example.com/callbacks",
    format="mp4",
    room_sid="RMaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",
)

print(composition.account_sid)
```

```csharp
// Install the C# / .NET helper library from twilio.com/docs/csharp/install

using System;
using Twilio;
using Twilio.Rest.Video.V1;
using System.Threading.Tasks;
using System.Collections.Generic;

class Program {
    public static async Task Main(string[] args) {
        // Find your Account SID and Auth Token at twilio.com/console
        // and set the environment variables. See http://twil.io/secure
        string accountSid = Environment.GetEnvironmentVariable("TWILIO_ACCOUNT_SID");
        string authToken = Environment.GetEnvironmentVariable("TWILIO_AUTH_TOKEN");

        TwilioClient.Init(accountSid, authToken);

        var composition = await CompositionResource.CreateAsync(
            audioSources: new List<string> { "*" },
            videoLayout: new Dictionary<
                string,
                Object>() { { "single", new Dictionary<string, Object>() { { "video_sources", new List<string> { "PAXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX" } } } } },
            statusCallback: new Uri("https://www.example.com/callbacks"),
            format: CompositionResource.FormatEnum.Mp4,
            roomSid: "RMaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa");

        Console.WriteLine(composition.AccountSid);
    }
}
```

```java
// Install the Java helper library from twilio.com/docs/java/install

import java.net.URI;
import java.util.Arrays;
import java.util.HashMap;
import com.twilio.Twilio;
import com.twilio.rest.video.v1.Composition;

public class Example {
    // Find your Account SID and Auth Token at twilio.com/console
    // and set the environment variables. See http://twil.io/secure
    public static final String ACCOUNT_SID = System.getenv("TWILIO_ACCOUNT_SID");
    public static final String AUTH_TOKEN = System.getenv("TWILIO_AUTH_TOKEN");

    public static void main(String[] args) {
        Twilio.init(ACCOUNT_SID, AUTH_TOKEN);
        Composition composition =
            Composition.creator("RMaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa")
                .setAudioSources(Arrays.asList("*"))
                .setVideoLayout(new HashMap<String, Object>() {
                    {
                        put("single", new HashMap<String, Object>() {
                            {
                                put("video_sources", Arrays.asList("PAXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX"));
                            }
                        });
                    }
                })
                .setStatusCallback(URI.create("https://www.example.com/callbacks"))
                .setFormat(Composition.Format.MP4)
                .create();

        System.out.println(composition.getAccountSid());
    }
}
```

```go
// Download the helper library from https://www.twilio.com/docs/go/install
package main

import (
	"fmt"
	"github.com/twilio/twilio-go"
	video "github.com/twilio/twilio-go/rest/video/v1"
	"os"
)

func main() {
	// Find your Account SID and Auth Token at twilio.com/console
	// and set the environment variables. See http://twil.io/secure
	// Make sure TWILIO_ACCOUNT_SID and TWILIO_AUTH_TOKEN exists in your environment
	client := twilio.NewRestClient()

	params := &video.CreateCompositionParams{}
	params.SetAudioSources([]string{
		"*",
	})
	params.SetVideoLayout(map[string]interface{}{
		"single": map[string]interface{}{
			"video_sources": []string{
				"PAXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX",
			},
		},
	})
	params.SetStatusCallback("https://www.example.com/callbacks")
	params.SetFormat("mp4")
	params.SetRoomSid("RMaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa")

	resp, err := client.VideoV1.CreateComposition(params)
	if err != nil {
		fmt.Println(err.Error())
		os.Exit(1)
	} else {
		if resp.AccountSid != nil {
			fmt.Println(*resp.AccountSid)
		} else {
			fmt.Println(resp.AccountSid)
		}
	}
}
```

```php
<?php

// Update the path below to your autoload.php,
// see https://getcomposer.org/doc/01-basic-usage.md
require_once "/path/to/vendor/autoload.php";

use Twilio\Rest\Client;

// Find your Account SID and Auth Token at twilio.com/console
// and set the environment variables. See http://twil.io/secure
$sid = getenv("TWILIO_ACCOUNT_SID");
$token = getenv("TWILIO_AUTH_TOKEN");
$twilio = new Client($sid, $token);

$composition = $twilio->video->v1->compositions->create(
    "RMaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa", // RoomSid
    [
        "audioSources" => ["*"],
        "videoLayout" => [
            "single" => [
                "video_sources" => ["PAXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX"],
            ],
        ],
        "statusCallback" => "https://www.example.com/callbacks",
        "format" => "mp4",
    ]
);

print $composition->accountSid;
```

```ruby
# Download the helper library from https://www.twilio.com/docs/ruby/install
require 'twilio-ruby'

# Find your Account SID and Auth Token at twilio.com/console
# and set the environment variables. See http://twil.io/secure
account_sid = ENV['TWILIO_ACCOUNT_SID']
auth_token = ENV['TWILIO_AUTH_TOKEN']
@client = Twilio::REST::Client.new(account_sid, auth_token)

composition = @client
              .video
              .v1
              .compositions
              .create(
                audio_sources: [
                  '*'
                ],
                video_layout: {
                  'single' => {
                    'video_sources' => [
                      'PAXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX'
                    ]
                  }
                },
                status_callback: 'https://www.example.com/callbacks',
                format: 'mp4',
                room_sid: 'RMaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa'
              )

puts composition.account_sid
```

```bash
# Install the twilio-cli from https://twil.io/cli

twilio api:video:v1:compositions:create \
   --audio-sources * \
   --video-layout "{\"single\":{\"video_sources\":[\"PAXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX\"]}}" \
   --status-callback https://www.example.com/callbacks \
   --format mp4 \
   --room-sid RMaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa
```

```bash
VIDEO_LAYOUT_OBJ=$(cat << EOF
{
  "single": {
    "video_sources": [
      "PAXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX"
    ]
  }
}
EOF
)
curl -X POST "https://video.twilio.com/v1/Compositions" \
--data-urlencode "AudioSources=*" \
--data-urlencode "VideoLayout=$VIDEO_LAYOUT_OBJ" \
--data-urlencode "StatusCallback=https://www.example.com/callbacks" \
--data-urlencode "Format=mp4" \
--data-urlencode "RoomSid=RMaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa" \
-u $TWILIO_ACCOUNT_SID:$TWILIO_AUTH_TOKEN
```

```json
{
  "account_sid": "ACaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",
  "status": "processing",
  "date_created": "2015-07-30T20:00:00Z",
  "date_completed": null,
  "date_deleted": null,
  "sid": "CJaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",
  "room_sid": "RMaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",
  "audio_sources": [
    "*"
  ],
  "audio_sources_excluded": [
    "RTbaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa"
  ],
  "video_layout": {
    "single": {
      "video_sources": [
        "PAXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX"
      ]
    }
  },
  "trim": true,
  "format": "mp4",
  "resolution": "1920x1080",
  "bitrate": 0,
  "size": 0,
  "duration": 0,
  "media_external_location": null,
  "url": "https://video.twilio.com/v1/Compositions/CJaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",
  "status_callback": "https://www.example.com/callbacks",
  "status_callback_method": "POST",
  "links": {
    "media": "https://video.twilio.com/v1/Compositions/CJaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa/Media"
  }
}
```

#### Example: Compose the Complete Room in a Grid \[#example-compose-room]

In this example we assume a Room with RoomSid=`RMXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX` where multiple
Participants publish both audio and video Tracks. We want generate a
Composition showing all the room videos in a grid, as shown in the figure
below, and with all audio tracks
mixed.

![Grid Room Composition Layout.](https://docs-resources.prod.twilio.com/b0a632295337ba815d86b02f35a474d17f509cfe03eb04eb71fb50a035540e4f.png)

Considering that:

* Your application credentials are (`SKXXXX:your_api_key_secret`)
* You want to use `mp4` as target format
* You want to use VGA resolution (`640x480`)
* You want an unconstrained grid composition with the default cell reuse
  strategy (`show_oldest`).

You can create the desired Composition using the following:

Compose the complete Room in a grid (with all Participants' audio and video)

```js
// Download the helper library from https://www.twilio.com/docs/node/install
const twilio = require("twilio"); // Or, for ESM: import twilio from "twilio";

// Find your Account SID and Auth Token at twilio.com/console
// and set the environment variables. See http://twil.io/secure
const accountSid = process.env.TWILIO_ACCOUNT_SID;
const authToken = process.env.TWILIO_AUTH_TOKEN;
const client = twilio(accountSid, authToken);

async function createComposition() {
  const composition = await client.video.v1.compositions.create({
    audioSources: ["*"],
    format: "mp4",
    roomSid: "RMaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",
    statusCallback: "https://www.example.com/callbacks",
    videoLayout: {
      grid: {
        video_sources: ["*"],
      },
    },
  });

  console.log(composition.accountSid);
}

createComposition();
```

```python
# Download the helper library from https://www.twilio.com/docs/python/install
import os
from twilio.rest import Client

# Find your Account SID and Auth Token at twilio.com/console
# and set the environment variables. See http://twil.io/secure
account_sid = os.environ["TWILIO_ACCOUNT_SID"]
auth_token = os.environ["TWILIO_AUTH_TOKEN"]
client = Client(account_sid, auth_token)

composition = client.video.v1.compositions.create(
    audio_sources=["*"],
    video_layout={"grid": {"video_sources": ["*"]}},
    status_callback="https://www.example.com/callbacks",
    format="mp4",
    room_sid="RMaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",
)

print(composition.account_sid)
```

```csharp
// Install the C# / .NET helper library from twilio.com/docs/csharp/install

using System;
using Twilio;
using Twilio.Rest.Video.V1;
using System.Threading.Tasks;
using System.Collections.Generic;

class Program {
    public static async Task Main(string[] args) {
        // Find your Account SID and Auth Token at twilio.com/console
        // and set the environment variables. See http://twil.io/secure
        string accountSid = Environment.GetEnvironmentVariable("TWILIO_ACCOUNT_SID");
        string authToken = Environment.GetEnvironmentVariable("TWILIO_AUTH_TOKEN");

        TwilioClient.Init(accountSid, authToken);

        var composition = await CompositionResource.CreateAsync(
            audioSources: new List<string> { "*" },
            videoLayout: new Dictionary<
                string,
                Object>() { { "grid", new Dictionary<string, Object>() { { "video_sources", new List<string> { "*" } } } } },
            statusCallback: new Uri("https://www.example.com/callbacks"),
            format: CompositionResource.FormatEnum.Mp4,
            roomSid: "RMaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa");

        Console.WriteLine(composition.AccountSid);
    }
}
```

```java
// Install the Java helper library from twilio.com/docs/java/install

import java.net.URI;
import java.util.Arrays;
import java.util.HashMap;
import com.twilio.Twilio;
import com.twilio.rest.video.v1.Composition;

public class Example {
    // Find your Account SID and Auth Token at twilio.com/console
    // and set the environment variables. See http://twil.io/secure
    public static final String ACCOUNT_SID = System.getenv("TWILIO_ACCOUNT_SID");
    public static final String AUTH_TOKEN = System.getenv("TWILIO_AUTH_TOKEN");

    public static void main(String[] args) {
        Twilio.init(ACCOUNT_SID, AUTH_TOKEN);
        Composition composition = Composition.creator("RMaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa")
                                      .setAudioSources(Arrays.asList("*"))
                                      .setVideoLayout(new HashMap<String, Object>() {
                                          {
                                              put("grid", new HashMap<String, Object>() {
                                                  {
                                                      put("video_sources", Arrays.asList("*"));
                                                  }
                                              });
                                          }
                                      })
                                      .setStatusCallback(URI.create("https://www.example.com/callbacks"))
                                      .setFormat(Composition.Format.MP4)
                                      .create();

        System.out.println(composition.getAccountSid());
    }
}
```

```go
// Download the helper library from https://www.twilio.com/docs/go/install
package main

import (
	"fmt"
	"github.com/twilio/twilio-go"
	video "github.com/twilio/twilio-go/rest/video/v1"
	"os"
)

func main() {
	// Find your Account SID and Auth Token at twilio.com/console
	// and set the environment variables. See http://twil.io/secure
	// Make sure TWILIO_ACCOUNT_SID and TWILIO_AUTH_TOKEN exists in your environment
	client := twilio.NewRestClient()

	params := &video.CreateCompositionParams{}
	params.SetAudioSources([]string{
		"*",
	})
	params.SetVideoLayout(map[string]interface{}{
		"grid": map[string]interface{}{
			"video_sources": []string{
				"*",
			},
		},
	})
	params.SetStatusCallback("https://www.example.com/callbacks")
	params.SetFormat("mp4")
	params.SetRoomSid("RMaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa")

	resp, err := client.VideoV1.CreateComposition(params)
	if err != nil {
		fmt.Println(err.Error())
		os.Exit(1)
	} else {
		if resp.AccountSid != nil {
			fmt.Println(*resp.AccountSid)
		} else {
			fmt.Println(resp.AccountSid)
		}
	}
}
```

```php
<?php

// Update the path below to your autoload.php,
// see https://getcomposer.org/doc/01-basic-usage.md
require_once "/path/to/vendor/autoload.php";

use Twilio\Rest\Client;

// Find your Account SID and Auth Token at twilio.com/console
// and set the environment variables. See http://twil.io/secure
$sid = getenv("TWILIO_ACCOUNT_SID");
$token = getenv("TWILIO_AUTH_TOKEN");
$twilio = new Client($sid, $token);

$composition = $twilio->video->v1->compositions->create(
    "RMaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa", // RoomSid
    [
        "audioSources" => ["*"],
        "videoLayout" => [
            "grid" => [
                "video_sources" => ["*"],
            ],
        ],
        "statusCallback" => "https://www.example.com/callbacks",
        "format" => "mp4",
    ]
);

print $composition->accountSid;
```

```ruby
# Download the helper library from https://www.twilio.com/docs/ruby/install
require 'twilio-ruby'

# Find your Account SID and Auth Token at twilio.com/console
# and set the environment variables. See http://twil.io/secure
account_sid = ENV['TWILIO_ACCOUNT_SID']
auth_token = ENV['TWILIO_AUTH_TOKEN']
@client = Twilio::REST::Client.new(account_sid, auth_token)

composition = @client
              .video
              .v1
              .compositions
              .create(
                audio_sources: [
                  '*'
                ],
                video_layout: {
                  'grid' => {
                    'video_sources' => [
                      '*'
                    ]
                  }
                },
                status_callback: 'https://www.example.com/callbacks',
                format: 'mp4',
                room_sid: 'RMaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa'
              )

puts composition.account_sid
```

```bash
# Install the twilio-cli from https://twil.io/cli

twilio api:video:v1:compositions:create \
   --audio-sources * \
   --video-layout "{\"grid\":{\"video_sources\":[\"*\"]}}" \
   --status-callback https://www.example.com/callbacks \
   --format mp4 \
   --room-sid RMaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa
```

```bash
VIDEO_LAYOUT_OBJ=$(cat << EOF
{
  "grid": {
    "video_sources": [
      "*"
    ]
  }
}
EOF
)
curl -X POST "https://video.twilio.com/v1/Compositions" \
--data-urlencode "AudioSources=*" \
--data-urlencode "VideoLayout=$VIDEO_LAYOUT_OBJ" \
--data-urlencode "StatusCallback=https://www.example.com/callbacks" \
--data-urlencode "Format=mp4" \
--data-urlencode "RoomSid=RMaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa" \
-u $TWILIO_ACCOUNT_SID:$TWILIO_AUTH_TOKEN
```

```json
{
  "account_sid": "ACaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",
  "status": "processing",
  "date_created": "2015-07-30T20:00:00Z",
  "date_completed": null,
  "date_deleted": null,
  "sid": "CJaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",
  "room_sid": "RMaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",
  "audio_sources": [
    "*"
  ],
  "audio_sources_excluded": [
    "RTbaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa"
  ],
  "video_layout": {
    "grid": {
      "video_sources": [
        "*"
      ]
    }
  },
  "trim": true,
  "format": "mp4",
  "resolution": "1920x1080",
  "bitrate": 0,
  "size": 0,
  "duration": 0,
  "media_external_location": null,
  "url": "https://video.twilio.com/v1/Compositions/CJaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",
  "status_callback": "https://www.example.com/callbacks",
  "status_callback_method": "POST",
  "links": {
    "media": "https://video.twilio.com/v1/Compositions/CJaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa/Media"
  }
}
```

#### Example: Compose a Specific Set of Track Recordings in a Grid \[#example-compose-array]

In this example we assume a Room with RoomSid=`RMXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX` where different
Participants publish their audio and video Tracks. Imagine that we have
special interest in some of these tracks that we identify in the following way:

* `RTXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX`: the RecordingTrackSid of a video Track.
* `MTXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX`: the MediaTrackSid of a video Track.
* `teacher-webcast`: the Track name of a video track.

We want to generate a composition showing the three video Tracks in a single
row and with no audio, as shown in the figure below.

![Three Tracks Composition Layout.](https://docs-resources.prod.twilio.com/c31501ed6505d7a9062f8acc578aeff539c82045e1e5983d4c70dc19e5fab8c2.png)

Considering that:

* Your application credentials are (`SKXXXX:your_api_key_secret`)
* You want to use `mp4` as target format
* You want to use the default resolution (VGA = `640x480`)

You can create the desired Composition using the following:

Compose a set of Tracks in a grid

```js
// Download the helper library from https://www.twilio.com/docs/node/install
const twilio = require("twilio"); // Or, for ESM: import twilio from "twilio";

// Find your Account SID and Auth Token at twilio.com/console
// and set the environment variables. See http://twil.io/secure
const accountSid = process.env.TWILIO_ACCOUNT_SID;
const authToken = process.env.TWILIO_AUTH_TOKEN;
const client = twilio(accountSid, authToken);

async function createComposition() {
  const composition = await client.video.v1.compositions.create({
    format: "mp4",
    roomSid: "RMaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",
    statusCallback: "https://www.example.com/callbacks",
    videoLayout: {
      grid: {
        max_rows: 1,
        video_sources: [
          "RTXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX",
          "MTXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX",
          "teacher-webcast",
        ],
      },
    },
  });

  console.log(composition.accountSid);
}

createComposition();
```

```python
# Download the helper library from https://www.twilio.com/docs/python/install
import os
from twilio.rest import Client

# Find your Account SID and Auth Token at twilio.com/console
# and set the environment variables. See http://twil.io/secure
account_sid = os.environ["TWILIO_ACCOUNT_SID"]
auth_token = os.environ["TWILIO_AUTH_TOKEN"]
client = Client(account_sid, auth_token)

composition = client.video.v1.compositions.create(
    video_layout={
        "grid": {
            "max_rows": 1,
            "video_sources": [
                "RTXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX",
                "MTXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX",
                "teacher-webcast",
            ],
        }
    },
    status_callback="https://www.example.com/callbacks",
    format="mp4",
    room_sid="RMaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",
)

print(composition.account_sid)
```

```csharp
// Install the C# / .NET helper library from twilio.com/docs/csharp/install

using System;
using Twilio;
using Twilio.Rest.Video.V1;
using System.Threading.Tasks;
using System.Collections.Generic;

class Program {
    public static async Task Main(string[] args) {
        // Find your Account SID and Auth Token at twilio.com/console
        // and set the environment variables. See http://twil.io/secure
        string accountSid = Environment.GetEnvironmentVariable("TWILIO_ACCOUNT_SID");
        string authToken = Environment.GetEnvironmentVariable("TWILIO_AUTH_TOKEN");

        TwilioClient.Init(accountSid, authToken);

        var composition = await CompositionResource.CreateAsync(
            videoLayout: new Dictionary<
                string,
                Object>() { { "grid", new Dictionary<string, Object>() { { "max_rows", 1 }, { "video_sources", new List<string> { "RTXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX", "MTXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX", "teacher-webcast" } } } } },
            statusCallback: new Uri("https://www.example.com/callbacks"),
            format: CompositionResource.FormatEnum.Mp4,
            roomSid: "RMaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa");

        Console.WriteLine(composition.AccountSid);
    }
}
```

```java
// Install the Java helper library from twilio.com/docs/java/install

import java.net.URI;
import java.util.Arrays;
import java.util.HashMap;
import com.twilio.Twilio;
import com.twilio.rest.video.v1.Composition;

public class Example {
    // Find your Account SID and Auth Token at twilio.com/console
    // and set the environment variables. See http://twil.io/secure
    public static final String ACCOUNT_SID = System.getenv("TWILIO_ACCOUNT_SID");
    public static final String AUTH_TOKEN = System.getenv("TWILIO_AUTH_TOKEN");

    public static void main(String[] args) {
        Twilio.init(ACCOUNT_SID, AUTH_TOKEN);
        Composition composition = Composition.creator("RMaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa")
                                      .setVideoLayout(new HashMap<String, Object>() {
                                          {
                                              put("grid", new HashMap<String, Object>() {
                                                  {
                                                      put("max_rows", 1);
                                                      put("video_sources",
                                                          Arrays.asList("RTXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX",
                                                              "MTXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX",
                                                              "teacher-webcast"));
                                                  }
                                              });
                                          }
                                      })
                                      .setStatusCallback(URI.create("https://www.example.com/callbacks"))
                                      .setFormat(Composition.Format.MP4)
                                      .create();

        System.out.println(composition.getAccountSid());
    }
}
```

```go
// Download the helper library from https://www.twilio.com/docs/go/install
package main

import (
	"fmt"
	"github.com/twilio/twilio-go"
	video "github.com/twilio/twilio-go/rest/video/v1"
	"os"
)

func main() {
	// Find your Account SID and Auth Token at twilio.com/console
	// and set the environment variables. See http://twil.io/secure
	// Make sure TWILIO_ACCOUNT_SID and TWILIO_AUTH_TOKEN exists in your environment
	client := twilio.NewRestClient()

	params := &video.CreateCompositionParams{}
	params.SetVideoLayout(map[string]interface{}{
		"grid": map[string]interface{}{
			"max_rows": 1,
			"video_sources": []string{
				"RTXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX",
				"MTXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX",
				"teacher-webcast",
			},
		},
	})
	params.SetStatusCallback("https://www.example.com/callbacks")
	params.SetFormat("mp4")
	params.SetRoomSid("RMaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa")

	resp, err := client.VideoV1.CreateComposition(params)
	if err != nil {
		fmt.Println(err.Error())
		os.Exit(1)
	} else {
		if resp.AccountSid != nil {
			fmt.Println(*resp.AccountSid)
		} else {
			fmt.Println(resp.AccountSid)
		}
	}
}
```

```php
<?php

// Update the path below to your autoload.php,
// see https://getcomposer.org/doc/01-basic-usage.md
require_once "/path/to/vendor/autoload.php";

use Twilio\Rest\Client;

// Find your Account SID and Auth Token at twilio.com/console
// and set the environment variables. See http://twil.io/secure
$sid = getenv("TWILIO_ACCOUNT_SID");
$token = getenv("TWILIO_AUTH_TOKEN");
$twilio = new Client($sid, $token);

$composition = $twilio->video->v1->compositions->create(
    "RMaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa", // RoomSid
    [
        "videoLayout" => [
            "grid" => [
                "max_rows" => 1,
                "video_sources" => [
                    "RTXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX",
                    "MTXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX",
                    "teacher-webcast",
                ],
            ],
        ],
        "statusCallback" => "https://www.example.com/callbacks",
        "format" => "mp4",
    ]
);

print $composition->accountSid;
```

```ruby
# Download the helper library from https://www.twilio.com/docs/ruby/install
require 'twilio-ruby'

# Find your Account SID and Auth Token at twilio.com/console
# and set the environment variables. See http://twil.io/secure
account_sid = ENV['TWILIO_ACCOUNT_SID']
auth_token = ENV['TWILIO_AUTH_TOKEN']
@client = Twilio::REST::Client.new(account_sid, auth_token)

composition = @client
              .video
              .v1
              .compositions
              .create(
                video_layout: {
                  'grid' => {
                    'max_rows' => 1,
                    'video_sources' => [
                      'RTXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX',
                      'MTXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX',
                      'teacher-webcast'
                    ]
                  }
                },
                status_callback: 'https://www.example.com/callbacks',
                format: 'mp4',
                room_sid: 'RMaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa'
              )

puts composition.account_sid
```

```bash
# Install the twilio-cli from https://twil.io/cli

twilio api:video:v1:compositions:create \
   --video-layout "{\"grid\":{\"max_rows\":1,\"video_sources\":[\"RTXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX\",\"MTXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX\",\"teacher-webcast\"]}}" \
   --status-callback https://www.example.com/callbacks \
   --format mp4 \
   --room-sid RMaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa
```

```bash
VIDEO_LAYOUT_OBJ=$(cat << EOF
{
  "grid": {
    "max_rows": 1,
    "video_sources": [
      "RTXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX",
      "MTXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX",
      "teacher-webcast"
    ]
  }
}
EOF
)
curl -X POST "https://video.twilio.com/v1/Compositions" \
--data-urlencode "VideoLayout=$VIDEO_LAYOUT_OBJ" \
--data-urlencode "StatusCallback=https://www.example.com/callbacks" \
--data-urlencode "Format=mp4" \
--data-urlencode "RoomSid=RMaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa" \
-u $TWILIO_ACCOUNT_SID:$TWILIO_AUTH_TOKEN
```

```json
{
  "account_sid": "ACaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",
  "status": "processing",
  "date_created": "2015-07-30T20:00:00Z",
  "date_completed": null,
  "date_deleted": null,
  "sid": "CJaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",
  "room_sid": "RMaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",
  "audio_sources": [
    "RTaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",
    "user*"
  ],
  "audio_sources_excluded": [
    "RTbaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa"
  ],
  "video_layout": {
    "grid": {
      "max_rows": 1,
      "video_sources": [
        "RTXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX",
        "MTXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX",
        "teacher-webcast"
      ]
    }
  },
  "trim": true,
  "format": "mp4",
  "resolution": "1920x1080",
  "bitrate": 0,
  "size": 0,
  "duration": 0,
  "media_external_location": null,
  "url": "https://video.twilio.com/v1/Compositions/CJaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",
  "status_callback": "https://www.example.com/callbacks",
  "status_callback_method": "POST",
  "links": {
    "media": "https://video.twilio.com/v1/Compositions/CJaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa/Media"
  }
}
```

#### Compose a Specific Set of Track Recordings as a Sequence \[#example-compose-sequence]

In this example we assume a Room with RoomSid=`RMXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX` where a teacher presents
lessons to their students. These lessons consist on talks and screensharing
presentations that occur in sequence. These may overlap or have idle intervals
where no media is published. The Track names of the published media comply
with the following pattern:

* For video: `teacher-video-sess-1`, `teacher-video-sess-2`, etc.
* For audio: `teacher-audio-sess-1`, `teacher-audio-sess-2`, etc.

In this context, we want to create a Compositions showing only one video
source at a time. That one must match with the video track published later by
the teacher at any time. We want the teacher's audio to be included in the
Composition. We don't want the Composition to contain the idle intervals where
the teacher is not publishing media. In this context, considering that:

* Your application credentials are (`SKXXXX:your_api_key_secret`)
* You want to use `mp4` as target format
* You want to use the default resolution (VGA = `640x480`)

You can create the desired Composition using the following:

Compose a set of Tracks as a sequence

```js
// Download the helper library from https://www.twilio.com/docs/node/install
const twilio = require("twilio"); // Or, for ESM: import twilio from "twilio";

// Find your Account SID and Auth Token at twilio.com/console
// and set the environment variables. See http://twil.io/secure
const accountSid = process.env.TWILIO_ACCOUNT_SID;
const authToken = process.env.TWILIO_AUTH_TOKEN;
const client = twilio(accountSid, authToken);

async function createComposition() {
  const composition = await client.video.v1.compositions.create({
    audioSources: ["teacher-audio-sess-*"],
    format: "mp4",
    roomSid: "RMaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",
    statusCallback: "https://www.example.com/callbacks",
    videoLayout: {
      sequence: {
        max_rows: 1,
        max_columns: 1,
        reuse: "show_newest",
        video_sources: ["teacher-video-sess-*"],
      },
    },
  });

  console.log(composition.accountSid);
}

createComposition();
```

```python
# Download the helper library from https://www.twilio.com/docs/python/install
import os
from twilio.rest import Client

# Find your Account SID and Auth Token at twilio.com/console
# and set the environment variables. See http://twil.io/secure
account_sid = os.environ["TWILIO_ACCOUNT_SID"]
auth_token = os.environ["TWILIO_AUTH_TOKEN"]
client = Client(account_sid, auth_token)

composition = client.video.v1.compositions.create(
    audio_sources=["teacher-audio-sess-*"],
    video_layout={
        "sequence": {
            "max_rows": 1,
            "max_columns": 1,
            "reuse": "show_newest",
            "video_sources": ["teacher-video-sess-*"],
        }
    },
    status_callback="https://www.example.com/callbacks",
    format="mp4",
    room_sid="RMaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",
)

print(composition.account_sid)
```

```csharp
// Install the C# / .NET helper library from twilio.com/docs/csharp/install

using System;
using Twilio;
using Twilio.Rest.Video.V1;
using System.Threading.Tasks;
using System.Collections.Generic;

class Program {
    public static async Task Main(string[] args) {
        // Find your Account SID and Auth Token at twilio.com/console
        // and set the environment variables. See http://twil.io/secure
        string accountSid = Environment.GetEnvironmentVariable("TWILIO_ACCOUNT_SID");
        string authToken = Environment.GetEnvironmentVariable("TWILIO_AUTH_TOKEN");

        TwilioClient.Init(accountSid, authToken);

        var composition = await CompositionResource.CreateAsync(
            audioSources: new List<string> { "teacher-audio-sess-*" },
            videoLayout: new Dictionary<
                string,
                Object>() { { "sequence", new Dictionary<string, Object>() { { "max_rows", 1 }, { "max_columns", 1 }, { "reuse", "show_newest" }, { "video_sources", new List<string> { "teacher-video-sess-*" } } } } },
            statusCallback: new Uri("https://www.example.com/callbacks"),
            format: CompositionResource.FormatEnum.Mp4,
            roomSid: "RMaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa");

        Console.WriteLine(composition.AccountSid);
    }
}
```

```java
// Install the Java helper library from twilio.com/docs/java/install

import java.net.URI;
import java.util.Arrays;
import java.util.HashMap;
import com.twilio.Twilio;
import com.twilio.rest.video.v1.Composition;

public class Example {
    // Find your Account SID and Auth Token at twilio.com/console
    // and set the environment variables. See http://twil.io/secure
    public static final String ACCOUNT_SID = System.getenv("TWILIO_ACCOUNT_SID");
    public static final String AUTH_TOKEN = System.getenv("TWILIO_AUTH_TOKEN");

    public static void main(String[] args) {
        Twilio.init(ACCOUNT_SID, AUTH_TOKEN);
        Composition composition = Composition.creator("RMaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa")
                                      .setAudioSources(Arrays.asList("teacher-audio-sess-*"))
                                      .setVideoLayout(new HashMap<String, Object>() {
                                          {
                                              put("sequence", new HashMap<String, Object>() {
                                                  {
                                                      put("max_rows", 1);
                                                      put("max_columns", 1);
                                                      put("reuse", "show_newest");
                                                      put("video_sources", Arrays.asList("teacher-video-sess-*"));
                                                  }
                                              });
                                          }
                                      })
                                      .setStatusCallback(URI.create("https://www.example.com/callbacks"))
                                      .setFormat(Composition.Format.MP4)
                                      .create();

        System.out.println(composition.getAccountSid());
    }
}
```

```go
// Download the helper library from https://www.twilio.com/docs/go/install
package main

import (
	"fmt"
	"github.com/twilio/twilio-go"
	video "github.com/twilio/twilio-go/rest/video/v1"
	"os"
)

func main() {
	// Find your Account SID and Auth Token at twilio.com/console
	// and set the environment variables. See http://twil.io/secure
	// Make sure TWILIO_ACCOUNT_SID and TWILIO_AUTH_TOKEN exists in your environment
	client := twilio.NewRestClient()

	params := &video.CreateCompositionParams{}
	params.SetAudioSources([]string{
		"teacher-audio-sess-*",
	})
	params.SetVideoLayout(map[string]interface{}{
		"sequence": map[string]interface{}{
			"max_rows":    1,
			"max_columns": 1,
			"reuse":       "show_newest",
			"video_sources": []string{
				"teacher-video-sess-*",
			},
		},
	})
	params.SetStatusCallback("https://www.example.com/callbacks")
	params.SetFormat("mp4")
	params.SetRoomSid("RMaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa")

	resp, err := client.VideoV1.CreateComposition(params)
	if err != nil {
		fmt.Println(err.Error())
		os.Exit(1)
	} else {
		if resp.AccountSid != nil {
			fmt.Println(*resp.AccountSid)
		} else {
			fmt.Println(resp.AccountSid)
		}
	}
}
```

```php
<?php

// Update the path below to your autoload.php,
// see https://getcomposer.org/doc/01-basic-usage.md
require_once "/path/to/vendor/autoload.php";

use Twilio\Rest\Client;

// Find your Account SID and Auth Token at twilio.com/console
// and set the environment variables. See http://twil.io/secure
$sid = getenv("TWILIO_ACCOUNT_SID");
$token = getenv("TWILIO_AUTH_TOKEN");
$twilio = new Client($sid, $token);

$composition = $twilio->video->v1->compositions->create(
    "RMaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa", // RoomSid
    [
        "audioSources" => ["teacher-audio-sess-*"],
        "videoLayout" => [
            "sequence" => [
                "max_rows" => 1,
                "max_columns" => 1,
                "reuse" => "show_newest",
                "video_sources" => ["teacher-video-sess-*"],
            ],
        ],
        "statusCallback" => "https://www.example.com/callbacks",
        "format" => "mp4",
    ]
);

print $composition->accountSid;
```

```ruby
# Download the helper library from https://www.twilio.com/docs/ruby/install
require 'twilio-ruby'

# Find your Account SID and Auth Token at twilio.com/console
# and set the environment variables. See http://twil.io/secure
account_sid = ENV['TWILIO_ACCOUNT_SID']
auth_token = ENV['TWILIO_AUTH_TOKEN']
@client = Twilio::REST::Client.new(account_sid, auth_token)

composition = @client
              .video
              .v1
              .compositions
              .create(
                audio_sources: [
                  'teacher-audio-sess-*'
                ],
                video_layout: {
                  'sequence' => {
                    'max_rows' => 1,
                    'max_columns' => 1,
                    'reuse' => 'show_newest',
                    'video_sources' => [
                      'teacher-video-sess-*'
                    ]
                  }
                },
                status_callback: 'https://www.example.com/callbacks',
                format: 'mp4',
                room_sid: 'RMaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa'
              )

puts composition.account_sid
```

```bash
# Install the twilio-cli from https://twil.io/cli

twilio api:video:v1:compositions:create \
   --audio-sources teacher-audio-sess-* \
   --video-layout "{\"sequence\":{\"max_rows\":1,\"max_columns\":1,\"reuse\":\"show_newest\",\"video_sources\":[\"teacher-video-sess-*\"]}}" \
   --status-callback https://www.example.com/callbacks \
   --format mp4 \
   --room-sid RMaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa
```

```bash
VIDEO_LAYOUT_OBJ=$(cat << EOF
{
  "sequence": {
    "max_rows": 1,
    "max_columns": 1,
    "reuse": "show_newest",
    "video_sources": [
      "teacher-video-sess-*"
    ]
  }
}
EOF
)
curl -X POST "https://video.twilio.com/v1/Compositions" \
--data-urlencode "AudioSources=teacher-audio-sess-*" \
--data-urlencode "VideoLayout=$VIDEO_LAYOUT_OBJ" \
--data-urlencode "StatusCallback=https://www.example.com/callbacks" \
--data-urlencode "Format=mp4" \
--data-urlencode "RoomSid=RMaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa" \
-u $TWILIO_ACCOUNT_SID:$TWILIO_AUTH_TOKEN
```

```json
{
  "account_sid": "ACaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",
  "status": "processing",
  "date_created": "2015-07-30T20:00:00Z",
  "date_completed": null,
  "date_deleted": null,
  "sid": "CJaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",
  "room_sid": "RMaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",
  "audio_sources": [
    "teacher-audio-sess-*"
  ],
  "audio_sources_excluded": [
    "RTbaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa"
  ],
  "video_layout": {
    "sequence": {
      "max_rows": 1,
      "max_columns": 1,
      "reuse": "show_newest",
      "video_sources": [
        "teacher-video-sess-*"
      ]
    }
  },
  "trim": true,
  "format": "mp4",
  "resolution": "1920x1080",
  "bitrate": 0,
  "size": 0,
  "duration": 0,
  "media_external_location": null,
  "url": "https://video.twilio.com/v1/Compositions/CJaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",
  "status_callback": "https://www.example.com/callbacks",
  "status_callback_method": "POST",
  "links": {
    "media": "https://video.twilio.com/v1/Compositions/CJaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa/Media"
  }
}
```

### Creating Compositions with Complex Layouts \[#example-complex]

#### Example: Creating a PiP (Picture-in-Picture) Composition \[#example-pip]

In this example we assume a Room with RoomSid=`RMXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX` where an expert
presents a topic with two audio tracks:

* One track is from his microphone and has the
  MediaTrackSid=`MTXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX`
* One acting as a background soundtrack with
  Track name =`soundtrack`

He also has two video tracks:

* A webcam video track with MediaTrackSid=`MTYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYY`
* A screensharing video Track with Track name `screen-presentation`.

In this context, we want to create a PiP Composition including the above mentioned
audio Tracks and showing:

* The video track `screen-presentation` occupying the complete Composition
  background.
* The video track `MTYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYY` in a small box located at the top-left corner of
  the Composition overlayed on top of `screen-presentation` as shown on the figure
  below.

![PiP Composition Layout.](https://docs-resources.prod.twilio.com/55df72d1d0b52b3e678711818d0f350b3c4c0e9a3dffb55893c0cc7f1a5a6301.png)

Assuming that:

* Your application credentials are (`SKXXXX:your_api_key_secret`)
* You want to use `mp4` as target format
* You want to use HD resolution (`1280x720`)

You can create the desired Composition using the following:

Creating a Picture-in-Picture Composition

```js
// Download the helper library from https://www.twilio.com/docs/node/install
const twilio = require("twilio"); // Or, for ESM: import twilio from "twilio";

// Find your Account SID and Auth Token at twilio.com/console
// and set the environment variables. See http://twil.io/secure
const accountSid = process.env.TWILIO_ACCOUNT_SID;
const authToken = process.env.TWILIO_AUTH_TOKEN;
const client = twilio(accountSid, authToken);

async function createComposition() {
  const composition = await client.video.v1.compositions.create({
    audioSources: ["MTXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX", "soundtrack"],
    format: "mp4",
    resolution: "1280x720",
    roomSid: "RMaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",
    statusCallback: "https://www.example.com/callbacks",
    videoLayout: {
      main: {
        z_pos: 1,
        video_sources: "screen-presentation",
      },
      pip: {
        z_pos: 2,
        x_pos: 1000,
        y_pos: 30,
        width: 240,
        height: 180,
        video_sources: ["MTYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYY"],
      },
    },
  });

  console.log(composition.accountSid);
}

createComposition();
```

```python
# Download the helper library from https://www.twilio.com/docs/python/install
import os
from twilio.rest import Client

# Find your Account SID and Auth Token at twilio.com/console
# and set the environment variables. See http://twil.io/secure
account_sid = os.environ["TWILIO_ACCOUNT_SID"]
auth_token = os.environ["TWILIO_AUTH_TOKEN"]
client = Client(account_sid, auth_token)

composition = client.video.v1.compositions.create(
    audio_sources=["MTXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX", "soundtrack"],
    video_layout={
        "main": {"z_pos": 1, "video_sources": "screen-presentation"},
        "pip": {
            "z_pos": 2,
            "x_pos": 1000,
            "y_pos": 30,
            "width": 240,
            "height": 180,
            "video_sources": ["MTYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYY"],
        },
    },
    status_callback="https://www.example.com/callbacks",
    resolution="1280x720",
    format="mp4",
    room_sid="RMaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",
)

print(composition.account_sid)
```

```csharp
// Install the C# / .NET helper library from twilio.com/docs/csharp/install

using System;
using Twilio;
using Twilio.Rest.Video.V1;
using System.Threading.Tasks;
using System.Collections.Generic;

class Program {
    public static async Task Main(string[] args) {
        // Find your Account SID and Auth Token at twilio.com/console
        // and set the environment variables. See http://twil.io/secure
        string accountSid = Environment.GetEnvironmentVariable("TWILIO_ACCOUNT_SID");
        string authToken = Environment.GetEnvironmentVariable("TWILIO_AUTH_TOKEN");

        TwilioClient.Init(accountSid, authToken);

        var composition =
            await CompositionResource.CreateAsync(
                audioSources: new List<
                    string> { "MTXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX", "soundtrack" },
                videoLayout: new Dictionary<string, Object>() { { "main", new Dictionary<string, Object>() { { "z_pos", 1 }, { "video_sources", "screen-presentation" } } }, { "pip", new Dictionary<string, Object>() { { "z_pos", 2 }, { "x_pos", 1000 }, { "y_pos", 30 }, { "width", 240 }, { "height", 180 }, { "video_sources", new List<string> { "MTYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYY" } } } } },
                statusCallback: new Uri("https://www.example.com/callbacks"),
                resolution: "1280x720",
                format: CompositionResource.FormatEnum.Mp4,
                roomSid: "RMaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa");

        Console.WriteLine(composition.AccountSid);
    }
}
```

```java
// Install the Java helper library from twilio.com/docs/java/install

import java.net.URI;
import java.util.Arrays;
import java.util.HashMap;
import com.twilio.Twilio;
import com.twilio.rest.video.v1.Composition;

public class Example {
    // Find your Account SID and Auth Token at twilio.com/console
    // and set the environment variables. See http://twil.io/secure
    public static final String ACCOUNT_SID = System.getenv("TWILIO_ACCOUNT_SID");
    public static final String AUTH_TOKEN = System.getenv("TWILIO_AUTH_TOKEN");

    public static void main(String[] args) {
        Twilio.init(ACCOUNT_SID, AUTH_TOKEN);
        Composition composition =
            Composition.creator("RMaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa")
                .setAudioSources(Arrays.asList("MTXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX", "soundtrack"))
                .setVideoLayout(new HashMap<String, Object>() {
                    {
                        put("main", new HashMap<String, Object>() {
                            {
                                put("z_pos", 1);
                                put("video_sources", "screen-presentation");
                            }
                        });
                        put("pip", new HashMap<String, Object>() {
                            {
                                put("z_pos", 2);
                                put("x_pos", 1000);
                                put("y_pos", 30);
                                put("width", 240);
                                put("height", 180);
                                put("video_sources", Arrays.asList("MTYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYY"));
                            }
                        });
                    }
                })
                .setStatusCallback(URI.create("https://www.example.com/callbacks"))
                .setResolution("1280x720")
                .setFormat(Composition.Format.MP4)
                .create();

        System.out.println(composition.getAccountSid());
    }
}
```

```go
// Download the helper library from https://www.twilio.com/docs/go/install
package main

import (
	"fmt"
	"github.com/twilio/twilio-go"
	video "github.com/twilio/twilio-go/rest/video/v1"
	"os"
)

func main() {
	// Find your Account SID and Auth Token at twilio.com/console
	// and set the environment variables. See http://twil.io/secure
	// Make sure TWILIO_ACCOUNT_SID and TWILIO_AUTH_TOKEN exists in your environment
	client := twilio.NewRestClient()

	params := &video.CreateCompositionParams{}
	params.SetAudioSources([]string{
		"MTXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX",
		"soundtrack",
	})
	params.SetVideoLayout(map[string]interface{}{
		"main": map[string]interface{}{
			"z_pos":         1,
			"video_sources": "screen-presentation",
		},
		"pip": map[string]interface{}{
			"z_pos":  2,
			"x_pos":  1000,
			"y_pos":  30,
			"width":  240,
			"height": 180,
			"video_sources": []string{
				"MTYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYY",
			},
		},
	})
	params.SetStatusCallback("https://www.example.com/callbacks")
	params.SetResolution("1280x720")
	params.SetFormat("mp4")
	params.SetRoomSid("RMaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa")

	resp, err := client.VideoV1.CreateComposition(params)
	if err != nil {
		fmt.Println(err.Error())
		os.Exit(1)
	} else {
		if resp.AccountSid != nil {
			fmt.Println(*resp.AccountSid)
		} else {
			fmt.Println(resp.AccountSid)
		}
	}
}
```

```php
<?php

// Update the path below to your autoload.php,
// see https://getcomposer.org/doc/01-basic-usage.md
require_once "/path/to/vendor/autoload.php";

use Twilio\Rest\Client;

// Find your Account SID and Auth Token at twilio.com/console
// and set the environment variables. See http://twil.io/secure
$sid = getenv("TWILIO_ACCOUNT_SID");
$token = getenv("TWILIO_AUTH_TOKEN");
$twilio = new Client($sid, $token);

$composition = $twilio->video->v1->compositions->create(
    "RMaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa", // RoomSid
    [
        "audioSources" => ["MTXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX", "soundtrack"],
        "videoLayout" => [
            "main" => [
                "z_pos" => 1,
                "video_sources" => "screen-presentation",
            ],
            "pip" => [
                "z_pos" => 2,
                "x_pos" => 1000,
                "y_pos" => 30,
                "width" => 240,
                "height" => 180,
                "video_sources" => ["MTYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYY"],
            ],
        ],
        "statusCallback" => "https://www.example.com/callbacks",
        "resolution" => "1280x720",
        "format" => "mp4",
    ]
);

print $composition->accountSid;
```

```ruby
# Download the helper library from https://www.twilio.com/docs/ruby/install
require 'twilio-ruby'

# Find your Account SID and Auth Token at twilio.com/console
# and set the environment variables. See http://twil.io/secure
account_sid = ENV['TWILIO_ACCOUNT_SID']
auth_token = ENV['TWILIO_AUTH_TOKEN']
@client = Twilio::REST::Client.new(account_sid, auth_token)

composition = @client
              .video
              .v1
              .compositions
              .create(
                audio_sources: [
                  'MTXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX',
                  'soundtrack'
                ],
                video_layout: {
                  'main' => {
                    'z_pos' => 1,
                    'video_sources' => 'screen-presentation'
                  },
                  'pip' => {
                    'z_pos' => 2,
                    'x_pos' => 1000,
                    'y_pos' => 30,
                    'width' => 240,
                    'height' => 180,
                    'video_sources' => [
                      'MTYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYY'
                    ]
                  }
                },
                status_callback: 'https://www.example.com/callbacks',
                resolution: '1280x720',
                format: 'mp4',
                room_sid: 'RMaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa'
              )

puts composition.account_sid
```

```bash
# Install the twilio-cli from https://twil.io/cli

twilio api:video:v1:compositions:create \
   --audio-sources MTXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX soundtrack \
   --video-layout "{\"main\":{\"z_pos\":1,\"video_sources\":\"screen-presentation\"},\"pip\":{\"z_pos\":2,\"x_pos\":1000,\"y_pos\":30,\"width\":240,\"height\":180,\"video_sources\":[\"MTYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYY\"]}}" \
   --status-callback https://www.example.com/callbacks \
   --resolution 1280x720 \
   --format mp4 \
   --room-sid RMaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa
```

```bash
VIDEO_LAYOUT_OBJ=$(cat << EOF
{
  "main": {
    "z_pos": 1,
    "video_sources": "screen-presentation"
  },
  "pip": {
    "z_pos": 2,
    "x_pos": 1000,
    "y_pos": 30,
    "width": 240,
    "height": 180,
    "video_sources": [
      "MTYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYY"
    ]
  }
}
EOF
)
curl -X POST "https://video.twilio.com/v1/Compositions" \
--data-urlencode "AudioSources=MTXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX" \
--data-urlencode "AudioSources=soundtrack" \
--data-urlencode "VideoLayout=$VIDEO_LAYOUT_OBJ" \
--data-urlencode "StatusCallback=https://www.example.com/callbacks" \
--data-urlencode "Resolution=1280x720" \
--data-urlencode "Format=mp4" \
--data-urlencode "RoomSid=RMaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa" \
-u $TWILIO_ACCOUNT_SID:$TWILIO_AUTH_TOKEN
```

```json
{
  "account_sid": "ACaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",
  "status": "processing",
  "date_created": "2015-07-30T20:00:00Z",
  "date_completed": null,
  "date_deleted": null,
  "sid": "CJaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",
  "room_sid": "RMaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",
  "audio_sources": [
    "MTXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX",
    "soundtrack"
  ],
  "audio_sources_excluded": [
    "RTbaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa"
  ],
  "video_layout": {
    "main": {
      "z_pos": 1,
      "video_sources": "screen-presentation"
    },
    "pip": {
      "z_pos": 2,
      "x_pos": 1000,
      "y_pos": 30,
      "width": 240,
      "height": 180,
      "video_sources": [
        "MTYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYY"
      ]
    }
  },
  "trim": true,
  "format": "mp4",
  "resolution": "1280x720",
  "bitrate": 0,
  "size": 0,
  "duration": 0,
  "media_external_location": null,
  "url": "https://video.twilio.com/v1/Compositions/CJaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",
  "status_callback": "https://www.example.com/callbacks",
  "status_callback_method": "POST",
  "links": {
    "media": "https://video.twilio.com/v1/Compositions/CJaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa/Media"
  }
}
```

#### Example: Composing a Room with Natural Layouts \[#example-presentation-multiple-layouts]

In this example we assume a Room with RoomSid=`RMXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX` where a lecture is
taking place. The Participants are the following:

* A teacher publishes the following Tracks:
  * A webcam video Track with name `teacher-webcam-video`.
  * An screensharing video Track with name `teacher-screen-video`.
  * An audio Track with name `teacher-audio`.
* A variable number of students publishing each the following (`i` varies from
  student to student):
  * A webcam video track with name `student-i-video`
  * An audio Track with name `student-i-audio`

In this context, imagine that we want to create the following Composition:

* Track `teacher-screen-video` must be shown as Composition background occupying
  its complete viewport. A track with such disposition is sometimes called "main".
* The rest of video tracks should be shown in a row at the bottom of the
  Composition, as shown in the figure below.
* All the audio tracks of the Room should be mixed for the Composition.

![Focus + Row Composition Layout.](https://docs-resources.prod.twilio.com/a18627b1b8c8890212b8c807e7df4e37f272459c827456525c7a6505f18f633a.png)

Assuming that:

* Your application credentials are (`SKXXXX:your_api_key_secret`)
* You want to use `mp4` as target format
* You want to use HD resolution (`1280x720`)

You can create the desired Composition using the following:

Compose a Room with main+row layout

```js
// Download the helper library from https://www.twilio.com/docs/node/install
const twilio = require("twilio"); // Or, for ESM: import twilio from "twilio";

// Find your Account SID and Auth Token at twilio.com/console
// and set the environment variables. See http://twil.io/secure
const accountSid = process.env.TWILIO_ACCOUNT_SID;
const authToken = process.env.TWILIO_AUTH_TOKEN;
const client = twilio(accountSid, authToken);

async function createComposition() {
  const composition = await client.video.v1.compositions.create({
    audioSources: ["*"],
    format: "mp4",
    resolution: "1280x720",
    roomSid: "RMaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",
    statusCallback: "https://www.example.com/callbacks",
    videoLayout: {
      main: {
        z_pos: 1,
        video_sources: ["teacher-screen-video"],
      },
      row: {
        z_pos: 2,
        x_pos: 10,
        y_pos: 530,
        width: 1260,
        height: 160,
        max_rows: 1,
        video_sources: ["*"],
        video_sources_excluded: ["teacher-screen-video"],
      },
    },
  });

  console.log(composition.accountSid);
}

createComposition();
```

```python
# Download the helper library from https://www.twilio.com/docs/python/install
import os
from twilio.rest import Client

# Find your Account SID and Auth Token at twilio.com/console
# and set the environment variables. See http://twil.io/secure
account_sid = os.environ["TWILIO_ACCOUNT_SID"]
auth_token = os.environ["TWILIO_AUTH_TOKEN"]
client = Client(account_sid, auth_token)

composition = client.video.v1.compositions.create(
    audio_sources=["*"],
    video_layout={
        "main": {"z_pos": 1, "video_sources": ["teacher-screen-video"]},
        "row": {
            "z_pos": 2,
            "x_pos": 10,
            "y_pos": 530,
            "width": 1260,
            "height": 160,
            "max_rows": 1,
            "video_sources": ["*"],
            "video_sources_excluded": ["teacher-screen-video"],
        },
    },
    status_callback="https://www.example.com/callbacks",
    resolution="1280x720",
    format="mp4",
    room_sid="RMaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",
)

print(composition.account_sid)
```

```csharp
// Install the C# / .NET helper library from twilio.com/docs/csharp/install

using System;
using Twilio;
using Twilio.Rest.Video.V1;
using System.Threading.Tasks;
using System.Collections.Generic;

class Program {
    public static async Task Main(string[] args) {
        // Find your Account SID and Auth Token at twilio.com/console
        // and set the environment variables. See http://twil.io/secure
        string accountSid = Environment.GetEnvironmentVariable("TWILIO_ACCOUNT_SID");
        string authToken = Environment.GetEnvironmentVariable("TWILIO_AUTH_TOKEN");

        TwilioClient.Init(accountSid, authToken);

        var composition = await CompositionResource.CreateAsync(
            audioSources: new List<string> { "*" },
            videoLayout: new Dictionary<string, Object>() { { "main", new Dictionary<string, Object>() { { "z_pos", 1 }, { "video_sources", new List<string> { "teacher-screen-video" } } } }, { "row", new Dictionary<string, Object>() { { "z_pos", 2 }, { "x_pos", 10 }, { "y_pos", 530 }, { "width", 1260 }, { "height", 160 }, { "max_rows", 1 }, { "video_sources", new List<string> { "*" } }, { "video_sources_excluded", new List<string> { "teacher-screen-video" } } } } },
            statusCallback: new Uri("https://www.example.com/callbacks"),
            resolution: "1280x720",
            format: CompositionResource.FormatEnum.Mp4,
            roomSid: "RMaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa");

        Console.WriteLine(composition.AccountSid);
    }
}
```

```java
// Install the Java helper library from twilio.com/docs/java/install

import java.net.URI;
import java.util.Arrays;
import java.util.HashMap;
import com.twilio.Twilio;
import com.twilio.rest.video.v1.Composition;

public class Example {
    // Find your Account SID and Auth Token at twilio.com/console
    // and set the environment variables. See http://twil.io/secure
    public static final String ACCOUNT_SID = System.getenv("TWILIO_ACCOUNT_SID");
    public static final String AUTH_TOKEN = System.getenv("TWILIO_AUTH_TOKEN");

    public static void main(String[] args) {
        Twilio.init(ACCOUNT_SID, AUTH_TOKEN);
        Composition composition =
            Composition.creator("RMaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa")
                .setAudioSources(Arrays.asList("*"))
                .setVideoLayout(new HashMap<String, Object>() {
                    {
                        put("main", new HashMap<String, Object>() {
                            {
                                put("z_pos", 1);
                                put("video_sources", Arrays.asList("teacher-screen-video"));
                            }
                        });
                        put("row", new HashMap<String, Object>() {
                            {
                                put("z_pos", 2);
                                put("x_pos", 10);
                                put("y_pos", 530);
                                put("width", 1260);
                                put("height", 160);
                                put("max_rows", 1);
                                put("video_sources", Arrays.asList("*"));
                                put("video_sources_excluded", Arrays.asList("teacher-screen-video"));
                            }
                        });
                    }
                })
                .setStatusCallback(URI.create("https://www.example.com/callbacks"))
                .setResolution("1280x720")
                .setFormat(Composition.Format.MP4)
                .create();

        System.out.println(composition.getAccountSid());
    }
}
```

```go
// Download the helper library from https://www.twilio.com/docs/go/install
package main

import (
	"fmt"
	"github.com/twilio/twilio-go"
	video "github.com/twilio/twilio-go/rest/video/v1"
	"os"
)

func main() {
	// Find your Account SID and Auth Token at twilio.com/console
	// and set the environment variables. See http://twil.io/secure
	// Make sure TWILIO_ACCOUNT_SID and TWILIO_AUTH_TOKEN exists in your environment
	client := twilio.NewRestClient()

	params := &video.CreateCompositionParams{}
	params.SetAudioSources([]string{
		"*",
	})
	params.SetVideoLayout(map[string]interface{}{
		"main": map[string]interface{}{
			"z_pos": 1,
			"video_sources": []string{
				"teacher-screen-video",
			},
		},
		"row": map[string]interface{}{
			"z_pos":    2,
			"x_pos":    10,
			"y_pos":    530,
			"width":    1260,
			"height":   160,
			"max_rows": 1,
			"video_sources": []string{
				"*",
			},
			"video_sources_excluded": []string{
				"teacher-screen-video",
			},
		},
	})
	params.SetStatusCallback("https://www.example.com/callbacks")
	params.SetResolution("1280x720")
	params.SetFormat("mp4")
	params.SetRoomSid("RMaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa")

	resp, err := client.VideoV1.CreateComposition(params)
	if err != nil {
		fmt.Println(err.Error())
		os.Exit(1)
	} else {
		if resp.AccountSid != nil {
			fmt.Println(*resp.AccountSid)
		} else {
			fmt.Println(resp.AccountSid)
		}
	}
}
```

```php
<?php

// Update the path below to your autoload.php,
// see https://getcomposer.org/doc/01-basic-usage.md
require_once "/path/to/vendor/autoload.php";

use Twilio\Rest\Client;

// Find your Account SID and Auth Token at twilio.com/console
// and set the environment variables. See http://twil.io/secure
$sid = getenv("TWILIO_ACCOUNT_SID");
$token = getenv("TWILIO_AUTH_TOKEN");
$twilio = new Client($sid, $token);

$composition = $twilio->video->v1->compositions->create(
    "RMaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa", // RoomSid
    [
        "audioSources" => ["*"],
        "videoLayout" => [
            "main" => [
                "z_pos" => 1,
                "video_sources" => ["teacher-screen-video"],
            ],
            "row" => [
                "z_pos" => 2,
                "x_pos" => 10,
                "y_pos" => 530,
                "width" => 1260,
                "height" => 160,
                "max_rows" => 1,
                "video_sources" => ["*"],
                "video_sources_excluded" => ["teacher-screen-video"],
            ],
        ],
        "statusCallback" => "https://www.example.com/callbacks",
        "resolution" => "1280x720",
        "format" => "mp4",
    ]
);

print $composition->accountSid;
```

```ruby
# Download the helper library from https://www.twilio.com/docs/ruby/install
require 'twilio-ruby'

# Find your Account SID and Auth Token at twilio.com/console
# and set the environment variables. See http://twil.io/secure
account_sid = ENV['TWILIO_ACCOUNT_SID']
auth_token = ENV['TWILIO_AUTH_TOKEN']
@client = Twilio::REST::Client.new(account_sid, auth_token)

composition = @client
              .video
              .v1
              .compositions
              .create(
                audio_sources: [
                  '*'
                ],
                video_layout: {
                  'main' => {
                    'z_pos' => 1,
                    'video_sources' => [
                      'teacher-screen-video'
                    ]
                  },
                  'row' => {
                    'z_pos' => 2,
                    'x_pos' => 10,
                    'y_pos' => 530,
                    'width' => 1260,
                    'height' => 160,
                    'max_rows' => 1,
                    'video_sources' => [
                      '*'
                    ],
                    'video_sources_excluded' => [
                      'teacher-screen-video'
                    ]
                  }
                },
                status_callback: 'https://www.example.com/callbacks',
                resolution: '1280x720',
                format: 'mp4',
                room_sid: 'RMaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa'
              )

puts composition.account_sid
```

```bash
# Install the twilio-cli from https://twil.io/cli

twilio api:video:v1:compositions:create \
   --audio-sources * \
   --video-layout "{\"main\":{\"z_pos\":1,\"video_sources\":[\"teacher-screen-video\"]},\"row\":{\"z_pos\":2,\"x_pos\":10,\"y_pos\":530,\"width\":1260,\"height\":160,\"max_rows\":1,\"video_sources\":[\"*\"],\"video_sources_excluded\":[\"teacher-screen-video\"]}}" \
   --status-callback https://www.example.com/callbacks \
   --resolution 1280x720 \
   --format mp4 \
   --room-sid RMaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa
```

```bash
VIDEO_LAYOUT_OBJ=$(cat << EOF
{
  "main": {
    "z_pos": 1,
    "video_sources": [
      "teacher-screen-video"
    ]
  },
  "row": {
    "z_pos": 2,
    "x_pos": 10,
    "y_pos": 530,
    "width": 1260,
    "height": 160,
    "max_rows": 1,
    "video_sources": [
      "*"
    ],
    "video_sources_excluded": [
      "teacher-screen-video"
    ]
  }
}
EOF
)
curl -X POST "https://video.twilio.com/v1/Compositions" \
--data-urlencode "AudioSources=*" \
--data-urlencode "VideoLayout=$VIDEO_LAYOUT_OBJ" \
--data-urlencode "StatusCallback=https://www.example.com/callbacks" \
--data-urlencode "Resolution=1280x720" \
--data-urlencode "Format=mp4" \
--data-urlencode "RoomSid=RMaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa" \
-u $TWILIO_ACCOUNT_SID:$TWILIO_AUTH_TOKEN
```

```json
{
  "account_sid": "ACaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",
  "status": "processing",
  "date_created": "2015-07-30T20:00:00Z",
  "date_completed": null,
  "date_deleted": null,
  "sid": "CJaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",
  "room_sid": "RMaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",
  "audio_sources": [
    "*"
  ],
  "audio_sources_excluded": [
    "RTbaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa"
  ],
  "video_layout": {
    "main": {
      "z_pos": 1,
      "video_sources": [
        "teacher-screen-video"
      ]
    },
    "row": {
      "z_pos": 2,
      "x_pos": 10,
      "y_pos": 530,
      "width": 1260,
      "height": 160,
      "max_rows": 1,
      "video_sources": [
        "*"
      ],
      "video_sources_excluded": [
        "teacher-screen-video"
      ]
    }
  },
  "trim": true,
  "format": "mp4",
  "resolution": "1280x720",
  "bitrate": 0,
  "size": 0,
  "duration": 0,
  "media_external_location": null,
  "url": "https://video.twilio.com/v1/Compositions/CJaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",
  "status_callback": "https://www.example.com/callbacks",
  "status_callback_method": "POST",
  "links": {
    "media": "https://video.twilio.com/v1/Compositions/CJaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa/Media"
  }
}
```

Imagine now that you want the Composition to have a slightly different layout:

* Track `teacher-screen-video` must be shown as Composition background occupying
  its complete viewport.
* Track `teacher-webcam-video` must be shown as a small window in the top-right
  corner of the Composition.
* The rest of video tracks should be shown in a column on the left with no more
  than 5 rows as shown on the figure below.
* All the audio tracks of the Room should be mixed for the Composition.

![PiP + Column Composition Layout.](https://docs-resources.prod.twilio.com/4290ab4952a417fa5455ff1dd669cec76119a7720b656d32af6be5838c3a04ec.png)

In this case, the required code would be the following:

Compose a Room using a column+PiP layout

```js
// Download the helper library from https://www.twilio.com/docs/node/install
const twilio = require("twilio"); // Or, for ESM: import twilio from "twilio";

// Find your Account SID and Auth Token at twilio.com/console
// and set the environment variables. See http://twil.io/secure
const accountSid = process.env.TWILIO_ACCOUNT_SID;
const authToken = process.env.TWILIO_AUTH_TOKEN;
const client = twilio(accountSid, authToken);

async function createComposition() {
  const composition = await client.video.v1.compositions.create({
    audioSources: ["*"],
    format: "mp4",
    resolution: "1280x720",
    roomSid: "RMaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",
    statusCallback: "https://www.example.com/callbacks",
    videoLayout: {
      main: {
        z_pos: 1,
        video_sources: ["teacher-screen-video"],
      },
      pip: {
        z_pos: 2,
        x_pos: 1000,
        y_pos: 30,
        width: 240,
        height: 180,
        video_sources: ["teacher-webcam-video"],
      },
      column: {
        z_pos: 3,
        x_pos: 40,
        y_pos: 10,
        width: 190,
        height: 700,
        max_rows: 5,
        max_columns: 1,
        reuse: "show_newest",
        video_sources: ["student-*"],
      },
    },
  });

  console.log(composition.accountSid);
}

createComposition();
```

```python
# Download the helper library from https://www.twilio.com/docs/python/install
import os
from twilio.rest import Client

# Find your Account SID and Auth Token at twilio.com/console
# and set the environment variables. See http://twil.io/secure
account_sid = os.environ["TWILIO_ACCOUNT_SID"]
auth_token = os.environ["TWILIO_AUTH_TOKEN"]
client = Client(account_sid, auth_token)

composition = client.video.v1.compositions.create(
    audio_sources=["*"],
    video_layout={
        "main": {"z_pos": 1, "video_sources": ["teacher-screen-video"]},
        "pip": {
            "z_pos": 2,
            "x_pos": 1000,
            "y_pos": 30,
            "width": 240,
            "height": 180,
            "video_sources": ["teacher-webcam-video"],
        },
        "column": {
            "z_pos": 3,
            "x_pos": 40,
            "y_pos": 10,
            "width": 190,
            "height": 700,
            "max_rows": 5,
            "max_columns": 1,
            "reuse": "show_newest",
            "video_sources": ["student-*"],
        },
    },
    status_callback="https://www.example.com/callbacks",
    resolution="1280x720",
    format="mp4",
    room_sid="RMaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",
)

print(composition.account_sid)
```

```csharp
// Install the C# / .NET helper library from twilio.com/docs/csharp/install

using System;
using Twilio;
using Twilio.Rest.Video.V1;
using System.Threading.Tasks;
using System.Collections.Generic;

class Program {
    public static async Task Main(string[] args) {
        // Find your Account SID and Auth Token at twilio.com/console
        // and set the environment variables. See http://twil.io/secure
        string accountSid = Environment.GetEnvironmentVariable("TWILIO_ACCOUNT_SID");
        string authToken = Environment.GetEnvironmentVariable("TWILIO_AUTH_TOKEN");

        TwilioClient.Init(accountSid, authToken);

        var
            composition =
                await
                    CompositionResource
                        .CreateAsync(
                            audioSources: new List<string> { "*" },
                            videoLayout: new Dictionary<string, Object>() { { "main", new Dictionary<string, Object>() { { "z_pos", 1 }, { "video_sources", new List<string> { "teacher-screen-video" } } } }, { "pip", new Dictionary<string, Object>() { { "z_pos", 2 }, { "x_pos", 1000 }, { "y_pos", 30 }, { "width", 240 }, { "height", 180 }, { "video_sources", new List<string> { "teacher-webcam-video" } } } }, { "column", new Dictionary<string, Object>() { { "z_pos", 3 }, { "x_pos", 40 }, { "y_pos", 10 }, { "width", 190 }, { "height", 700 }, { "max_rows", 5 }, { "max_columns", 1 }, { "reuse", "show_newest" }, { "video_sources", new List<string> { "student-*" } } } } },
                            statusCallback: new Uri("https://www.example.com/callbacks"),
                            resolution: "1280x720",
                            format: CompositionResource.FormatEnum.Mp4,
                            roomSid: "RMaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa");

        Console.WriteLine(composition.AccountSid);
    }
}
```

```java
// Install the Java helper library from twilio.com/docs/java/install

import java.net.URI;
import java.util.Arrays;
import java.util.HashMap;
import com.twilio.Twilio;
import com.twilio.rest.video.v1.Composition;

public class Example {
    // Find your Account SID and Auth Token at twilio.com/console
    // and set the environment variables. See http://twil.io/secure
    public static final String ACCOUNT_SID = System.getenv("TWILIO_ACCOUNT_SID");
    public static final String AUTH_TOKEN = System.getenv("TWILIO_AUTH_TOKEN");

    public static void main(String[] args) {
        Twilio.init(ACCOUNT_SID, AUTH_TOKEN);
        Composition composition = Composition.creator("RMaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa")
                                      .setAudioSources(Arrays.asList("*"))
                                      .setVideoLayout(new HashMap<String, Object>() {
                                          {
                                              put("main", new HashMap<String, Object>() {
                                                  {
                                                      put("z_pos", 1);
                                                      put("video_sources", Arrays.asList("teacher-screen-video"));
                                                  }
                                              });
                                              put("pip", new HashMap<String, Object>() {
                                                  {
                                                      put("z_pos", 2);
                                                      put("x_pos", 1000);
                                                      put("y_pos", 30);
                                                      put("width", 240);
                                                      put("height", 180);
                                                      put("video_sources", Arrays.asList("teacher-webcam-video"));
                                                  }
                                              });
                                              put("column", new HashMap<String, Object>() {
                                                  {
                                                      put("z_pos", 3);
                                                      put("x_pos", 40);
                                                      put("y_pos", 10);
                                                      put("width", 190);
                                                      put("height", 700);
                                                      put("max_rows", 5);
                                                      put("max_columns", 1);
                                                      put("reuse", "show_newest");
                                                      put("video_sources", Arrays.asList("student-*"));
                                                  }
                                              });
                                          }
                                      })
                                      .setStatusCallback(URI.create("https://www.example.com/callbacks"))
                                      .setResolution("1280x720")
                                      .setFormat(Composition.Format.MP4)
                                      .create();

        System.out.println(composition.getAccountSid());
    }
}
```

```go
// Download the helper library from https://www.twilio.com/docs/go/install
package main

import (
	"fmt"
	"github.com/twilio/twilio-go"
	video "github.com/twilio/twilio-go/rest/video/v1"
	"os"
)

func main() {
	// Find your Account SID and Auth Token at twilio.com/console
	// and set the environment variables. See http://twil.io/secure
	// Make sure TWILIO_ACCOUNT_SID and TWILIO_AUTH_TOKEN exists in your environment
	client := twilio.NewRestClient()

	params := &video.CreateCompositionParams{}
	params.SetAudioSources([]string{
		"*",
	})
	params.SetVideoLayout(map[string]interface{}{
		"main": map[string]interface{}{
			"z_pos": 1,
			"video_sources": []string{
				"teacher-screen-video",
			},
		},
		"pip": map[string]interface{}{
			"z_pos":  2,
			"x_pos":  1000,
			"y_pos":  30,
			"width":  240,
			"height": 180,
			"video_sources": []string{
				"teacher-webcam-video",
			},
		},
		"column": map[string]interface{}{
			"z_pos":       3,
			"x_pos":       40,
			"y_pos":       10,
			"width":       190,
			"height":      700,
			"max_rows":    5,
			"max_columns": 1,
			"reuse":       "show_newest",
			"video_sources": []string{
				"student-*",
			},
		},
	})
	params.SetStatusCallback("https://www.example.com/callbacks")
	params.SetResolution("1280x720")
	params.SetFormat("mp4")
	params.SetRoomSid("RMaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa")

	resp, err := client.VideoV1.CreateComposition(params)
	if err != nil {
		fmt.Println(err.Error())
		os.Exit(1)
	} else {
		if resp.AccountSid != nil {
			fmt.Println(*resp.AccountSid)
		} else {
			fmt.Println(resp.AccountSid)
		}
	}
}
```

```php
<?php

// Update the path below to your autoload.php,
// see https://getcomposer.org/doc/01-basic-usage.md
require_once "/path/to/vendor/autoload.php";

use Twilio\Rest\Client;

// Find your Account SID and Auth Token at twilio.com/console
// and set the environment variables. See http://twil.io/secure
$sid = getenv("TWILIO_ACCOUNT_SID");
$token = getenv("TWILIO_AUTH_TOKEN");
$twilio = new Client($sid, $token);

$composition = $twilio->video->v1->compositions->create(
    "RMaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa", // RoomSid
    [
        "audioSources" => ["*"],
        "videoLayout" => [
            "main" => [
                "z_pos" => 1,
                "video_sources" => ["teacher-screen-video"],
            ],
            "pip" => [
                "z_pos" => 2,
                "x_pos" => 1000,
                "y_pos" => 30,
                "width" => 240,
                "height" => 180,
                "video_sources" => ["teacher-webcam-video"],
            ],
            "column" => [
                "z_pos" => 3,
                "x_pos" => 40,
                "y_pos" => 10,
                "width" => 190,
                "height" => 700,
                "max_rows" => 5,
                "max_columns" => 1,
                "reuse" => "show_newest",
                "video_sources" => ["student-*"],
            ],
        ],
        "statusCallback" => "https://www.example.com/callbacks",
        "resolution" => "1280x720",
        "format" => "mp4",
    ]
);

print $composition->accountSid;
```

```ruby
# Download the helper library from https://www.twilio.com/docs/ruby/install
require 'twilio-ruby'

# Find your Account SID and Auth Token at twilio.com/console
# and set the environment variables. See http://twil.io/secure
account_sid = ENV['TWILIO_ACCOUNT_SID']
auth_token = ENV['TWILIO_AUTH_TOKEN']
@client = Twilio::REST::Client.new(account_sid, auth_token)

composition = @client
              .video
              .v1
              .compositions
              .create(
                audio_sources: [
                  '*'
                ],
                video_layout: {
                  'main' => {
                    'z_pos' => 1,
                    'video_sources' => [
                      'teacher-screen-video'
                    ]
                  },
                  'pip' => {
                    'z_pos' => 2,
                    'x_pos' => 1000,
                    'y_pos' => 30,
                    'width' => 240,
                    'height' => 180,
                    'video_sources' => [
                      'teacher-webcam-video'
                    ]
                  },
                  'column' => {
                    'z_pos' => 3,
                    'x_pos' => 40,
                    'y_pos' => 10,
                    'width' => 190,
                    'height' => 700,
                    'max_rows' => 5,
                    'max_columns' => 1,
                    'reuse' => 'show_newest',
                    'video_sources' => [
                      'student-*'
                    ]
                  }
                },
                status_callback: 'https://www.example.com/callbacks',
                resolution: '1280x720',
                format: 'mp4',
                room_sid: 'RMaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa'
              )

puts composition.account_sid
```

```bash
# Install the twilio-cli from https://twil.io/cli

twilio api:video:v1:compositions:create \
   --audio-sources * \
   --video-layout "{\"main\":{\"z_pos\":1,\"video_sources\":[\"teacher-screen-video\"]},\"pip\":{\"z_pos\":2,\"x_pos\":1000,\"y_pos\":30,\"width\":240,\"height\":180,\"video_sources\":[\"teacher-webcam-video\"]},\"column\":{\"z_pos\":3,\"x_pos\":40,\"y_pos\":10,\"width\":190,\"height\":700,\"max_rows\":5,\"max_columns\":1,\"reuse\":\"show_newest\",\"video_sources\":[\"student-*\"]}}" \
   --status-callback https://www.example.com/callbacks \
   --resolution 1280x720 \
   --format mp4 \
   --room-sid RMaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa
```

```bash
VIDEO_LAYOUT_OBJ=$(cat << EOF
{
  "main": {
    "z_pos": 1,
    "video_sources": [
      "teacher-screen-video"
    ]
  },
  "pip": {
    "z_pos": 2,
    "x_pos": 1000,
    "y_pos": 30,
    "width": 240,
    "height": 180,
    "video_sources": [
      "teacher-webcam-video"
    ]
  },
  "column": {
    "z_pos": 3,
    "x_pos": 40,
    "y_pos": 10,
    "width": 190,
    "height": 700,
    "max_rows": 5,
    "max_columns": 1,
    "reuse": "show_newest",
    "video_sources": [
      "student-*"
    ]
  }
}
EOF
)
curl -X POST "https://video.twilio.com/v1/Compositions" \
--data-urlencode "AudioSources=*" \
--data-urlencode "VideoLayout=$VIDEO_LAYOUT_OBJ" \
--data-urlencode "StatusCallback=https://www.example.com/callbacks" \
--data-urlencode "Resolution=1280x720" \
--data-urlencode "Format=mp4" \
--data-urlencode "RoomSid=RMaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa" \
-u $TWILIO_ACCOUNT_SID:$TWILIO_AUTH_TOKEN
```

```json
{
  "account_sid": "ACaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",
  "status": "processing",
  "date_created": "2015-07-30T20:00:00Z",
  "date_completed": null,
  "date_deleted": null,
  "sid": "CJaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",
  "room_sid": "RMaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",
  "audio_sources": [
    "*"
  ],
  "audio_sources_excluded": [
    "RTbaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa"
  ],
  "video_layout": {
    "main": {
      "z_pos": 1,
      "video_sources": [
        "teacher-screen-video"
      ]
    },
    "pip": {
      "z_pos": 2,
      "x_pos": 1000,
      "y_pos": 30,
      "width": 240,
      "height": 180,
      "video_sources": [
        "teacher-webcam-video"
      ]
    },
    "column": {
      "z_pos": 3,
      "x_pos": 40,
      "y_pos": 10,
      "width": 190,
      "height": 700,
      "max_rows": 5,
      "max_columns": 1,
      "reuse": "show_newest",
      "video_sources": [
        "student-*"
      ]
    }
  },
  "trim": true,
  "format": "mp4",
  "resolution": "1280x720",
  "bitrate": 0,
  "size": 0,
  "duration": 0,
  "media_external_location": null,
  "url": "https://video.twilio.com/v1/Compositions/CJaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",
  "status_callback": "https://www.example.com/callbacks",
  "status_callback_method": "POST",
  "links": {
    "media": "https://video.twilio.com/v1/Compositions/CJaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa/Media"
  }
}
```

#### Example: Composing a Room with Mosaic Layout \[#example-mosaic-layout]

In this example we assume a Room with RoomSid=`RMXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX` where an interview
is taking place through the following tracks:

* The interviewed publishes the following:
  * A video Track named `interviewed-video`.
  * An audio Track named `interviewed-audio`.
* A number of interviewers publishing each:
  * A video Track named `interviewer-i-video`.
  * An audio Track named `interviewed-i-audio`.
* An advisor, who can only be listened by the interviewed, publishes:
  * An audio Track named `advisor-audio`.

We want to create the following Composition:

* Track `interviewed-video` must be shown centered in the middle of the
  composition.
* The rest of video tracks should be shown around that one, as the figure
  indicates.
* All the audio tracks of the Room should be mixed for the Composition
  except for `advisor-audio` that should not be included.

![Mosaic Composition Layout.](https://docs-resources.prod.twilio.com/5e90b5458417e8befece275ab8bc400ce8cbee11701855a0ad880c37f81bd9ee.png)

Assuming that:

* Your application credentials are (`SKXXXX:your_api_key_secret`)
* You want to use `mp4` as target format
* You want to use HD resolution (`1280x720`)

You can create the desired Composition using the following:

Compose a Room with mosaic layout

```js
// Download the helper library from https://www.twilio.com/docs/node/install
const twilio = require("twilio"); // Or, for ESM: import twilio from "twilio";

// Find your Account SID and Auth Token at twilio.com/console
// and set the environment variables. See http://twil.io/secure
const accountSid = process.env.TWILIO_ACCOUNT_SID;
const authToken = process.env.TWILIO_AUTH_TOKEN;
const client = twilio(accountSid, authToken);

async function createComposition() {
  const composition = await client.video.v1.compositions.create({
    audioSources: ["*"],
    audioSourcesExcluded: ["advisor-audio"],
    format: "mp4",
    resolution: "1280x720",
    roomSid: "RMaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",
    statusCallback: "https://www.example.com/callbacks",
    videoLayout: {
      interviewed: {
        z_pos: 2,
        x_pos: 400,
        y_pos: 180,
        width: 480,
        height: 360,
        video_sources: ["interviewed-video"],
      },
      interviewers: {
        z_pos: 1,
        x_pos: 10,
        y_pos: 0,
        width: 1260,
        height: 720,
        max_rows: 3,
        max_columns: 3,
        cells_excluded: ["4"],
        reuse: "show_newest",
        video_sources: ["interviewer-*"],
      },
    },
  });

  console.log(composition.accountSid);
}

createComposition();
```

```python
# Download the helper library from https://www.twilio.com/docs/python/install
import os
from twilio.rest import Client

# Find your Account SID and Auth Token at twilio.com/console
# and set the environment variables. See http://twil.io/secure
account_sid = os.environ["TWILIO_ACCOUNT_SID"]
auth_token = os.environ["TWILIO_AUTH_TOKEN"]
client = Client(account_sid, auth_token)

composition = client.video.v1.compositions.create(
    audio_sources=["*"],
    audio_sources_excluded=["advisor-audio"],
    video_layout={
        "interviewed": {
            "z_pos": 2,
            "x_pos": 400,
            "y_pos": 180,
            "width": 480,
            "height": 360,
            "video_sources": ["interviewed-video"],
        },
        "interviewers": {
            "z_pos": 1,
            "x_pos": 10,
            "y_pos": 0,
            "width": 1260,
            "height": 720,
            "max_rows": 3,
            "max_columns": 3,
            "cells_excluded": ["4"],
            "reuse": "show_newest",
            "video_sources": ["interviewer-*"],
        },
    },
    status_callback="https://www.example.com/callbacks",
    resolution="1280x720",
    format="mp4",
    room_sid="RMaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",
)

print(composition.account_sid)
```

```csharp
// Install the C# / .NET helper library from twilio.com/docs/csharp/install

using System;
using Twilio;
using Twilio.Rest.Video.V1;
using System.Threading.Tasks;
using System.Collections.Generic;

class Program {
    public static async Task Main(string[] args) {
        // Find your Account SID and Auth Token at twilio.com/console
        // and set the environment variables. See http://twil.io/secure
        string accountSid = Environment.GetEnvironmentVariable("TWILIO_ACCOUNT_SID");
        string authToken = Environment.GetEnvironmentVariable("TWILIO_AUTH_TOKEN");

        TwilioClient.Init(accountSid, authToken);

        var composition = await CompositionResource.CreateAsync(
            audioSources: new List<string> { "*" },
            audioSourcesExcluded: new List<string> { "advisor-audio" },
            videoLayout: new Dictionary<string, Object>() { { "interviewed", new Dictionary<string, Object>() { { "z_pos", 2 }, { "x_pos", 400 }, { "y_pos", 180 }, { "width", 480 }, { "height", 360 }, { "video_sources", new List<string> { "interviewed-video" } } } }, { "interviewers", new Dictionary<string, Object>() { { "z_pos", 1 }, { "x_pos", 10 }, { "y_pos", 0 }, { "width", 1260 }, { "height", 720 }, { "max_rows", 3 }, { "max_columns", 3 }, { "cells_excluded", new List<string> { "4" } }, { "reuse", "show_newest" }, { "video_sources", new List<string> { "interviewer-*" } } } } },
            statusCallback: new Uri("https://www.example.com/callbacks"),
            resolution: "1280x720",
            format: CompositionResource.FormatEnum.Mp4,
            roomSid: "RMaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa");

        Console.WriteLine(composition.AccountSid);
    }
}
```

```java
// Install the Java helper library from twilio.com/docs/java/install

import java.net.URI;
import java.util.Arrays;
import java.util.HashMap;
import com.twilio.Twilio;
import com.twilio.rest.video.v1.Composition;

public class Example {
    // Find your Account SID and Auth Token at twilio.com/console
    // and set the environment variables. See http://twil.io/secure
    public static final String ACCOUNT_SID = System.getenv("TWILIO_ACCOUNT_SID");
    public static final String AUTH_TOKEN = System.getenv("TWILIO_AUTH_TOKEN");

    public static void main(String[] args) {
        Twilio.init(ACCOUNT_SID, AUTH_TOKEN);
        Composition composition = Composition.creator("RMaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa")
                                      .setAudioSources(Arrays.asList("*"))
                                      .setAudioSourcesExcluded(Arrays.asList("advisor-audio"))
                                      .setVideoLayout(new HashMap<String, Object>() {
                                          {
                                              put("interviewed", new HashMap<String, Object>() {
                                                  {
                                                      put("z_pos", 2);
                                                      put("x_pos", 400);
                                                      put("y_pos", 180);
                                                      put("width", 480);
                                                      put("height", 360);
                                                      put("video_sources", Arrays.asList("interviewed-video"));
                                                  }
                                              });
                                              put("interviewers", new HashMap<String, Object>() {
                                                  {
                                                      put("z_pos", 1);
                                                      put("x_pos", 10);
                                                      put("y_pos", 0);
                                                      put("width", 1260);
                                                      put("height", 720);
                                                      put("max_rows", 3);
                                                      put("max_columns", 3);
                                                      put("cells_excluded", Arrays.asList("4"));
                                                      put("reuse", "show_newest");
                                                      put("video_sources", Arrays.asList("interviewer-*"));
                                                  }
                                              });
                                          }
                                      })
                                      .setStatusCallback(URI.create("https://www.example.com/callbacks"))
                                      .setResolution("1280x720")
                                      .setFormat(Composition.Format.MP4)
                                      .create();

        System.out.println(composition.getAccountSid());
    }
}
```

```go
// Download the helper library from https://www.twilio.com/docs/go/install
package main

import (
	"fmt"
	"github.com/twilio/twilio-go"
	video "github.com/twilio/twilio-go/rest/video/v1"
	"os"
)

func main() {
	// Find your Account SID and Auth Token at twilio.com/console
	// and set the environment variables. See http://twil.io/secure
	// Make sure TWILIO_ACCOUNT_SID and TWILIO_AUTH_TOKEN exists in your environment
	client := twilio.NewRestClient()

	params := &video.CreateCompositionParams{}
	params.SetAudioSources([]string{
		"*",
	})
	params.SetAudioSourcesExcluded([]string{
		"advisor-audio",
	})
	params.SetVideoLayout(map[string]interface{}{
		"interviewed": map[string]interface{}{
			"z_pos":  2,
			"x_pos":  400,
			"y_pos":  180,
			"width":  480,
			"height": 360,
			"video_sources": []string{
				"interviewed-video",
			},
		},
		"interviewers": map[string]interface{}{
			"z_pos":       1,
			"x_pos":       10,
			"y_pos":       0,
			"width":       1260,
			"height":      720,
			"max_rows":    3,
			"max_columns": 3,
			"cells_excluded": []string{
				"4",
			},
			"reuse": "show_newest",
			"video_sources": []string{
				"interviewer-*",
			},
		},
	})
	params.SetStatusCallback("https://www.example.com/callbacks")
	params.SetResolution("1280x720")
	params.SetFormat("mp4")
	params.SetRoomSid("RMaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa")

	resp, err := client.VideoV1.CreateComposition(params)
	if err != nil {
		fmt.Println(err.Error())
		os.Exit(1)
	} else {
		if resp.AccountSid != nil {
			fmt.Println(*resp.AccountSid)
		} else {
			fmt.Println(resp.AccountSid)
		}
	}
}
```

```php
<?php

// Update the path below to your autoload.php,
// see https://getcomposer.org/doc/01-basic-usage.md
require_once "/path/to/vendor/autoload.php";

use Twilio\Rest\Client;

// Find your Account SID and Auth Token at twilio.com/console
// and set the environment variables. See http://twil.io/secure
$sid = getenv("TWILIO_ACCOUNT_SID");
$token = getenv("TWILIO_AUTH_TOKEN");
$twilio = new Client($sid, $token);

$composition = $twilio->video->v1->compositions->create(
    "RMaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa", // RoomSid
    [
        "audioSources" => ["*"],
        "audioSourcesExcluded" => ["advisor-audio"],
        "videoLayout" => [
            "interviewed" => [
                "z_pos" => 2,
                "x_pos" => 400,
                "y_pos" => 180,
                "width" => 480,
                "height" => 360,
                "video_sources" => ["interviewed-video"],
            ],
            "interviewers" => [
                "z_pos" => 1,
                "x_pos" => 10,
                "y_pos" => 0,
                "width" => 1260,
                "height" => 720,
                "max_rows" => 3,
                "max_columns" => 3,
                "cells_excluded" => ["4"],
                "reuse" => "show_newest",
                "video_sources" => ["interviewer-*"],
            ],
        ],
        "statusCallback" => "https://www.example.com/callbacks",
        "resolution" => "1280x720",
        "format" => "mp4",
    ]
);

print $composition->accountSid;
```

```ruby
# Download the helper library from https://www.twilio.com/docs/ruby/install
require 'twilio-ruby'

# Find your Account SID and Auth Token at twilio.com/console
# and set the environment variables. See http://twil.io/secure
account_sid = ENV['TWILIO_ACCOUNT_SID']
auth_token = ENV['TWILIO_AUTH_TOKEN']
@client = Twilio::REST::Client.new(account_sid, auth_token)

composition = @client
              .video
              .v1
              .compositions
              .create(
                audio_sources: [
                  '*'
                ],
                audio_sources_excluded: [
                  'advisor-audio'
                ],
                video_layout: {
                  'interviewed' => {
                    'z_pos' => 2,
                    'x_pos' => 400,
                    'y_pos' => 180,
                    'width' => 480,
                    'height' => 360,
                    'video_sources' => [
                      'interviewed-video'
                    ]
                  },
                  'interviewers' => {
                    'z_pos' => 1,
                    'x_pos' => 10,
                    'y_pos' => 0,
                    'width' => 1260,
                    'height' => 720,
                    'max_rows' => 3,
                    'max_columns' => 3,
                    'cells_excluded' => [
                      '4'
                    ],
                    'reuse' => 'show_newest',
                    'video_sources' => [
                      'interviewer-*'
                    ]
                  }
                },
                status_callback: 'https://www.example.com/callbacks',
                resolution: '1280x720',
                format: 'mp4',
                room_sid: 'RMaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa'
              )

puts composition.account_sid
```

```bash
# Install the twilio-cli from https://twil.io/cli

twilio api:video:v1:compositions:create \
   --audio-sources * \
   --audio-sources-excluded advisor-audio \
   --video-layout "{\"interviewed\":{\"z_pos\":2,\"x_pos\":400,\"y_pos\":180,\"width\":480,\"height\":360,\"video_sources\":[\"interviewed-video\"]},\"interviewers\":{\"z_pos\":1,\"x_pos\":10,\"y_pos\":0,\"width\":1260,\"height\":720,\"max_rows\":3,\"max_columns\":3,\"cells_excluded\":[\"4\"],\"reuse\":\"show_newest\",\"video_sources\":[\"interviewer-*\"]}}" \
   --status-callback https://www.example.com/callbacks \
   --resolution 1280x720 \
   --format mp4 \
   --room-sid RMaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa
```

```bash
VIDEO_LAYOUT_OBJ=$(cat << EOF
{
  "interviewed": {
    "z_pos": 2,
    "x_pos": 400,
    "y_pos": 180,
    "width": 480,
    "height": 360,
    "video_sources": [
      "interviewed-video"
    ]
  },
  "interviewers": {
    "z_pos": 1,
    "x_pos": 10,
    "y_pos": 0,
    "width": 1260,
    "height": 720,
    "max_rows": 3,
    "max_columns": 3,
    "cells_excluded": [
      "4"
    ],
    "reuse": "show_newest",
    "video_sources": [
      "interviewer-*"
    ]
  }
}
EOF
)
curl -X POST "https://video.twilio.com/v1/Compositions" \
--data-urlencode "AudioSources=*" \
--data-urlencode "AudioSourcesExcluded=advisor-audio" \
--data-urlencode "VideoLayout=$VIDEO_LAYOUT_OBJ" \
--data-urlencode "StatusCallback=https://www.example.com/callbacks" \
--data-urlencode "Resolution=1280x720" \
--data-urlencode "Format=mp4" \
--data-urlencode "RoomSid=RMaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa" \
-u $TWILIO_ACCOUNT_SID:$TWILIO_AUTH_TOKEN
```

```json
{
  "account_sid": "ACaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",
  "status": "processing",
  "date_created": "2015-07-30T20:00:00Z",
  "date_completed": null,
  "date_deleted": null,
  "sid": "CJaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",
  "room_sid": "RMaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",
  "audio_sources": [
    "*"
  ],
  "audio_sources_excluded": [
    "advisor-audio"
  ],
  "video_layout": {
    "interviewed": {
      "z_pos": 2,
      "x_pos": 400,
      "y_pos": 180,
      "width": 480,
      "height": 360,
      "video_sources": [
        "interviewed-video"
      ]
    },
    "interviewers": {
      "z_pos": 1,
      "x_pos": 10,
      "y_pos": 0,
      "width": 1260,
      "height": 720,
      "max_rows": 3,
      "max_columns": 3,
      "cells_excluded": [
        "4"
      ],
      "reuse": "show_newest",
      "video_sources": [
        "interviewer-*"
      ]
    }
  },
  "trim": true,
  "format": "mp4",
  "resolution": "1280x720",
  "bitrate": 0,
  "size": 0,
  "duration": 0,
  "media_external_location": null,
  "url": "https://video.twilio.com/v1/Compositions/CJaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",
  "status_callback": "https://www.example.com/callbacks",
  "status_callback_method": "POST",
  "links": {
    "media": "https://video.twilio.com/v1/Compositions/CJaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa/Media"
  }
}
```

#### Example: Creating a Chess-Table Layout Composition \[#example-chess-table-layout]

In this example we assume a Room with RoomSid=`RMXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX` where a number of
participants publish their audio and video tracks. For fun, we want to
create the layout depicted on the following figure.

![Chess-Table Composition Layout.](https://docs-resources.prod.twilio.com/079fbae5f52ac5863aeb8fa6cc0eb21a26352c4b6058a4f7f9acc56ecbc3ea2b.png)

Assuming that:

* Your application credentials are (`SKXXXX:your_api_key_secret`)
* You want to use `mp4` as target format
* You want to use HD resolution (`1280x720`)

You can create the desired Composition using the following:

Compose a Room with a chess-table like layout

```js
// Download the helper library from https://www.twilio.com/docs/node/install
const twilio = require("twilio"); // Or, for ESM: import twilio from "twilio";

// Find your Account SID and Auth Token at twilio.com/console
// and set the environment variables. See http://twil.io/secure
const accountSid = process.env.TWILIO_ACCOUNT_SID;
const authToken = process.env.TWILIO_AUTH_TOKEN;
const client = twilio(accountSid, authToken);

async function createComposition() {
  const composition = await client.video.v1.compositions.create({
    audioSources: ["*"],
    format: "mp4",
    resolution: "1280x720",
    roomSid: "RMaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",
    statusCallback: "https://www.example.com/callbacks",
    videoLayout: {
      chess_table: {
        x_pos: 10,
        y_pos: 0,
        width: 1260,
        height: 720,
        max_rows: 3,
        max_columns: 3,
        reuse: "show_newest",
        cells_excluded: ["1", "3", "5", "7"],
        video_sources: ["*"],
      },
    },
  });

  console.log(composition.accountSid);
}

createComposition();
```

```python
# Download the helper library from https://www.twilio.com/docs/python/install
import os
from twilio.rest import Client

# Find your Account SID and Auth Token at twilio.com/console
# and set the environment variables. See http://twil.io/secure
account_sid = os.environ["TWILIO_ACCOUNT_SID"]
auth_token = os.environ["TWILIO_AUTH_TOKEN"]
client = Client(account_sid, auth_token)

composition = client.video.v1.compositions.create(
    audio_sources=["*"],
    video_layout={
        "chess_table": {
            "x_pos": 10,
            "y_pos": 0,
            "width": 1260,
            "height": 720,
            "max_rows": 3,
            "max_columns": 3,
            "reuse": "show_newest",
            "cells_excluded": ["1", "3", "5", "7"],
            "video_sources": ["*"],
        }
    },
    status_callback="https://www.example.com/callbacks",
    resolution="1280x720",
    format="mp4",
    room_sid="RMaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",
)

print(composition.account_sid)
```

```csharp
// Install the C# / .NET helper library from twilio.com/docs/csharp/install

using System;
using Twilio;
using Twilio.Rest.Video.V1;
using System.Threading.Tasks;
using System.Collections.Generic;

class Program {
    public static async Task Main(string[] args) {
        // Find your Account SID and Auth Token at twilio.com/console
        // and set the environment variables. See http://twil.io/secure
        string accountSid = Environment.GetEnvironmentVariable("TWILIO_ACCOUNT_SID");
        string authToken = Environment.GetEnvironmentVariable("TWILIO_AUTH_TOKEN");

        TwilioClient.Init(accountSid, authToken);

        var composition = await CompositionResource.CreateAsync(
            audioSources: new List<string> { "*" },
            videoLayout: new Dictionary<string, Object>() { { "chess_table", new Dictionary<string, Object>() { { "x_pos", 10 }, { "y_pos", 0 }, { "width", 1260 }, { "height", 720 }, { "max_rows", 3 }, { "max_columns", 3 }, { "reuse", "show_newest" }, { "cells_excluded", new List<string> { "1", "3", "5", "7" } }, { "video_sources", new List<string> { "*" } } } } },
            statusCallback: new Uri("https://www.example.com/callbacks"),
            resolution: "1280x720",
            format: CompositionResource.FormatEnum.Mp4,
            roomSid: "RMaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa");

        Console.WriteLine(composition.AccountSid);
    }
}
```

```java
// Install the Java helper library from twilio.com/docs/java/install

import java.net.URI;
import java.util.Arrays;
import java.util.HashMap;
import com.twilio.Twilio;
import com.twilio.rest.video.v1.Composition;

public class Example {
    // Find your Account SID and Auth Token at twilio.com/console
    // and set the environment variables. See http://twil.io/secure
    public static final String ACCOUNT_SID = System.getenv("TWILIO_ACCOUNT_SID");
    public static final String AUTH_TOKEN = System.getenv("TWILIO_AUTH_TOKEN");

    public static void main(String[] args) {
        Twilio.init(ACCOUNT_SID, AUTH_TOKEN);
        Composition composition = Composition.creator("RMaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa")
                                      .setAudioSources(Arrays.asList("*"))
                                      .setVideoLayout(new HashMap<String, Object>() {
                                          {
                                              put("chess_table", new HashMap<String, Object>() {
                                                  {
                                                      put("x_pos", 10);
                                                      put("y_pos", 0);
                                                      put("width", 1260);
                                                      put("height", 720);
                                                      put("max_rows", 3);
                                                      put("max_columns", 3);
                                                      put("reuse", "show_newest");
                                                      put("cells_excluded", Arrays.asList("1", "3", "5", "7"));
                                                      put("video_sources", Arrays.asList("*"));
                                                  }
                                              });
                                          }
                                      })
                                      .setStatusCallback(URI.create("https://www.example.com/callbacks"))
                                      .setResolution("1280x720")
                                      .setFormat(Composition.Format.MP4)
                                      .create();

        System.out.println(composition.getAccountSid());
    }
}
```

```go
// Download the helper library from https://www.twilio.com/docs/go/install
package main

import (
	"fmt"
	"github.com/twilio/twilio-go"
	video "github.com/twilio/twilio-go/rest/video/v1"
	"os"
)

func main() {
	// Find your Account SID and Auth Token at twilio.com/console
	// and set the environment variables. See http://twil.io/secure
	// Make sure TWILIO_ACCOUNT_SID and TWILIO_AUTH_TOKEN exists in your environment
	client := twilio.NewRestClient()

	params := &video.CreateCompositionParams{}
	params.SetAudioSources([]string{
		"*",
	})
	params.SetVideoLayout(map[string]interface{}{
		"chess_table": map[string]interface{}{
			"x_pos":       10,
			"y_pos":       0,
			"width":       1260,
			"height":      720,
			"max_rows":    3,
			"max_columns": 3,
			"reuse":       "show_newest",
			"cells_excluded": []string{
				"1",
				"3",
				"5",
				"7",
			},
			"video_sources": []string{
				"*",
			},
		},
	})
	params.SetStatusCallback("https://www.example.com/callbacks")
	params.SetResolution("1280x720")
	params.SetFormat("mp4")
	params.SetRoomSid("RMaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa")

	resp, err := client.VideoV1.CreateComposition(params)
	if err != nil {
		fmt.Println(err.Error())
		os.Exit(1)
	} else {
		if resp.AccountSid != nil {
			fmt.Println(*resp.AccountSid)
		} else {
			fmt.Println(resp.AccountSid)
		}
	}
}
```

```php
<?php

// Update the path below to your autoload.php,
// see https://getcomposer.org/doc/01-basic-usage.md
require_once "/path/to/vendor/autoload.php";

use Twilio\Rest\Client;

// Find your Account SID and Auth Token at twilio.com/console
// and set the environment variables. See http://twil.io/secure
$sid = getenv("TWILIO_ACCOUNT_SID");
$token = getenv("TWILIO_AUTH_TOKEN");
$twilio = new Client($sid, $token);

$composition = $twilio->video->v1->compositions->create(
    "RMaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa", // RoomSid
    [
        "audioSources" => ["*"],
        "videoLayout" => [
            "chess_table" => [
                "x_pos" => 10,
                "y_pos" => 0,
                "width" => 1260,
                "height" => 720,
                "max_rows" => 3,
                "max_columns" => 3,
                "reuse" => "show_newest",
                "cells_excluded" => ["1", "3", "5", "7"],
                "video_sources" => ["*"],
            ],
        ],
        "statusCallback" => "https://www.example.com/callbacks",
        "resolution" => "1280x720",
        "format" => "mp4",
    ]
);

print $composition->accountSid;
```

```ruby
# Download the helper library from https://www.twilio.com/docs/ruby/install
require 'twilio-ruby'

# Find your Account SID and Auth Token at twilio.com/console
# and set the environment variables. See http://twil.io/secure
account_sid = ENV['TWILIO_ACCOUNT_SID']
auth_token = ENV['TWILIO_AUTH_TOKEN']
@client = Twilio::REST::Client.new(account_sid, auth_token)

composition = @client
              .video
              .v1
              .compositions
              .create(
                audio_sources: [
                  '*'
                ],
                video_layout: {
                  'chess_table' => {
                    'x_pos' => 10,
                    'y_pos' => 0,
                    'width' => 1260,
                    'height' => 720,
                    'max_rows' => 3,
                    'max_columns' => 3,
                    'reuse' => 'show_newest',
                    'cells_excluded' => [
                      '1',
                      '3',
                      '5',
                      '7'
                    ],
                    'video_sources' => [
                      '*'
                    ]
                  }
                },
                status_callback: 'https://www.example.com/callbacks',
                resolution: '1280x720',
                format: 'mp4',
                room_sid: 'RMaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa'
              )

puts composition.account_sid
```

```bash
# Install the twilio-cli from https://twil.io/cli

twilio api:video:v1:compositions:create \
   --audio-sources * \
   --video-layout "{\"chess_table\":{\"x_pos\":10,\"y_pos\":0,\"width\":1260,\"height\":720,\"max_rows\":3,\"max_columns\":3,\"reuse\":\"show_newest\",\"cells_excluded\":[\"1\",\"3\",\"5\",\"7\"],\"video_sources\":[\"*\"]}}" \
   --status-callback https://www.example.com/callbacks \
   --resolution 1280x720 \
   --format mp4 \
   --room-sid RMaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa
```

```bash
VIDEO_LAYOUT_OBJ=$(cat << EOF
{
  "chess_table": {
    "x_pos": 10,
    "y_pos": 0,
    "width": 1260,
    "height": 720,
    "max_rows": 3,
    "max_columns": 3,
    "reuse": "show_newest",
    "cells_excluded": [
      "1",
      "3",
      "5",
      "7"
    ],
    "video_sources": [
      "*"
    ]
  }
}
EOF
)
curl -X POST "https://video.twilio.com/v1/Compositions" \
--data-urlencode "AudioSources=*" \
--data-urlencode "VideoLayout=$VIDEO_LAYOUT_OBJ" \
--data-urlencode "StatusCallback=https://www.example.com/callbacks" \
--data-urlencode "Resolution=1280x720" \
--data-urlencode "Format=mp4" \
--data-urlencode "RoomSid=RMaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa" \
-u $TWILIO_ACCOUNT_SID:$TWILIO_AUTH_TOKEN
```

```json
{
  "account_sid": "ACaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",
  "status": "processing",
  "date_created": "2015-07-30T20:00:00Z",
  "date_completed": null,
  "date_deleted": null,
  "sid": "CJaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",
  "room_sid": "RMaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",
  "audio_sources": [
    "*"
  ],
  "audio_sources_excluded": [
    "RTbaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa"
  ],
  "video_layout": {
    "chess_table": {
      "x_pos": 10,
      "y_pos": 0,
      "width": 1260,
      "height": 720,
      "max_rows": 3,
      "max_columns": 3,
      "reuse": "show_newest",
      "cells_excluded": [
        "1",
        "3",
        "5",
        "7"
      ],
      "video_sources": [
        "*"
      ]
    }
  },
  "trim": true,
  "format": "mp4",
  "resolution": "1280x720",
  "bitrate": 0,
  "size": 0,
  "duration": 0,
  "media_external_location": null,
  "url": "https://video.twilio.com/v1/Compositions/CJaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",
  "status_callback": "https://www.example.com/callbacks",
  "status_callback_method": "POST",
  "links": {
    "media": "https://video.twilio.com/v1/Compositions/CJaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa/Media"
  }
}
```

### Getting compositions \[#example-get]

#### Example: Get a Composition Instance Resource \[#example-get-composition]

For executing this example you need:

* Your application credentials (`SKXXXX:your_api_key_secret`)
* The CompositionSid (`CJXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX`)

Get a Composition Instance Resource

```js
// Download the helper library from https://www.twilio.com/docs/node/install
const twilio = require("twilio"); // Or, for ESM: import twilio from "twilio";

// Find your Account SID and Auth Token at twilio.com/console
// and set the environment variables. See http://twil.io/secure
const accountSid = process.env.TWILIO_ACCOUNT_SID;
const authToken = process.env.TWILIO_AUTH_TOKEN;
const client = twilio(accountSid, authToken);

async function fetchComposition() {
  const composition = await client.video.v1
    .compositions("CJaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa")
    .fetch();

  console.log(composition.accountSid);
}

fetchComposition();
```

```python
# Download the helper library from https://www.twilio.com/docs/python/install
import os
from twilio.rest import Client

# Find your Account SID and Auth Token at twilio.com/console
# and set the environment variables. See http://twil.io/secure
account_sid = os.environ["TWILIO_ACCOUNT_SID"]
auth_token = os.environ["TWILIO_AUTH_TOKEN"]
client = Client(account_sid, auth_token)

composition = client.video.v1.compositions(
    "CJaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa"
).fetch()

print(composition.account_sid)
```

```csharp
// Install the C# / .NET helper library from twilio.com/docs/csharp/install

using System;
using Twilio;
using Twilio.Rest.Video.V1;
using System.Threading.Tasks;

class Program {
    public static async Task Main(string[] args) {
        // Find your Account SID and Auth Token at twilio.com/console
        // and set the environment variables. See http://twil.io/secure
        string accountSid = Environment.GetEnvironmentVariable("TWILIO_ACCOUNT_SID");
        string authToken = Environment.GetEnvironmentVariable("TWILIO_AUTH_TOKEN");

        TwilioClient.Init(accountSid, authToken);

        var composition =
            await CompositionResource.FetchAsync(pathSid: "CJaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa");

        Console.WriteLine(composition.AccountSid);
    }
}
```

```java
// Install the Java helper library from twilio.com/docs/java/install

import com.twilio.Twilio;
import com.twilio.rest.video.v1.Composition;

public class Example {
    // Find your Account SID and Auth Token at twilio.com/console
    // and set the environment variables. See http://twil.io/secure
    public static final String ACCOUNT_SID = System.getenv("TWILIO_ACCOUNT_SID");
    public static final String AUTH_TOKEN = System.getenv("TWILIO_AUTH_TOKEN");

    public static void main(String[] args) {
        Twilio.init(ACCOUNT_SID, AUTH_TOKEN);
        Composition composition = Composition.fetcher("CJaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa").fetch();

        System.out.println(composition.getAccountSid());
    }
}
```

```go
// Download the helper library from https://www.twilio.com/docs/go/install
package main

import (
	"fmt"
	"github.com/twilio/twilio-go"
	"os"
)

func main() {
	// Find your Account SID and Auth Token at twilio.com/console
	// and set the environment variables. See http://twil.io/secure
	// Make sure TWILIO_ACCOUNT_SID and TWILIO_AUTH_TOKEN exists in your environment
	client := twilio.NewRestClient()

	resp, err := client.VideoV1.FetchComposition("CJaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa")
	if err != nil {
		fmt.Println(err.Error())
		os.Exit(1)
	} else {
		if resp.AccountSid != nil {
			fmt.Println(*resp.AccountSid)
		} else {
			fmt.Println(resp.AccountSid)
		}
	}
}
```

```php
<?php

// Update the path below to your autoload.php,
// see https://getcomposer.org/doc/01-basic-usage.md
require_once "/path/to/vendor/autoload.php";

use Twilio\Rest\Client;

// Find your Account SID and Auth Token at twilio.com/console
// and set the environment variables. See http://twil.io/secure
$sid = getenv("TWILIO_ACCOUNT_SID");
$token = getenv("TWILIO_AUTH_TOKEN");
$twilio = new Client($sid, $token);

$composition = $twilio->video->v1
    ->compositions("CJaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa")
    ->fetch();

print $composition->accountSid;
```

```ruby
# Download the helper library from https://www.twilio.com/docs/ruby/install
require 'twilio-ruby'

# Find your Account SID and Auth Token at twilio.com/console
# and set the environment variables. See http://twil.io/secure
account_sid = ENV['TWILIO_ACCOUNT_SID']
auth_token = ENV['TWILIO_AUTH_TOKEN']
@client = Twilio::REST::Client.new(account_sid, auth_token)

composition = @client
              .video
              .v1
              .compositions('CJaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa')
              .fetch

puts composition.account_sid
```

```bash
# Install the twilio-cli from https://twil.io/cli

twilio api:video:v1:compositions:fetch \
   --sid CJaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa
```

```bash
curl -X GET "https://video.twilio.com/v1/Compositions/CJaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa" \
-u $TWILIO_ACCOUNT_SID:$TWILIO_AUTH_TOKEN
```

```json
{
  "account_sid": "ACaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",
  "status": "completed",
  "date_created": "2015-07-30T20:00:00Z",
  "date_completed": "2015-07-30T20:01:33Z",
  "date_deleted": null,
  "sid": "CJaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",
  "room_sid": "RMaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",
  "audio_sources": [
    "PAaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",
    "user*"
  ],
  "audio_sources_excluded": [
    "RTaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa"
  ],
  "video_layout": {
    "grid": {
      "video_sources": [
        "*"
      ],
      "video_sources_excluded": [
        "MTaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa"
      ],
      "reuse": "show_oldest",
      "x_pos": 100,
      "y_pos": 600,
      "z_pos": 10,
      "width": 0,
      "height": 0,
      "max_columns": 0,
      "max_rows": 0,
      "cells_excluded": []
    },
    "pip": {
      "video_sources": [
        "RTaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaab"
      ],
      "video_sources_excluded": [],
      "reuse": "none",
      "x_pos": 100,
      "y_pos": 600,
      "z_pos": 10,
      "width": 0,
      "height": 0,
      "max_columns": 0,
      "max_rows": 0,
      "cells_excluded": []
    }
  },
  "resolution": "1280x720",
  "format": "webm",
  "bitrate": 64,
  "size": 4,
  "duration": 6,
  "trim": true,
  "media_external_location": null,
  "url": "https://video.twilio.com/v1/Compositions/CJaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",
  "status_callback": "https://mycallbackurl.com",
  "status_callback_method": "POST",
  "links": {
    "media": "https://video.twilio.com/v1/Compositions/CJaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa/Media"
  }
}
```

#### Example: List a Page of Completed Compositions \[#example-get-completed-compositions]

For executing this example you need:

* Your application credentials (`SKXXXX:your_api_key_secret`)

List all completed Compositions

```js
// Download the helper library from https://www.twilio.com/docs/node/install
const twilio = require("twilio"); // Or, for ESM: import twilio from "twilio";

// Find your Account SID and Auth Token at twilio.com/console
// and set the environment variables. See http://twil.io/secure
const accountSid = process.env.TWILIO_ACCOUNT_SID;
const authToken = process.env.TWILIO_AUTH_TOKEN;
const client = twilio(accountSid, authToken);

async function listComposition() {
  const compositions = await client.video.v1.compositions.list({
    status: "completed",
    limit: 20,
  });

  compositions.forEach((c) => console.log(c.accountSid));
}

listComposition();
```

```python
# Download the helper library from https://www.twilio.com/docs/python/install
import os
from twilio.rest import Client

# Find your Account SID and Auth Token at twilio.com/console
# and set the environment variables. See http://twil.io/secure
account_sid = os.environ["TWILIO_ACCOUNT_SID"]
auth_token = os.environ["TWILIO_AUTH_TOKEN"]
client = Client(account_sid, auth_token)

compositions = client.video.v1.compositions.list(status="completed", limit=20)

for record in compositions:
    print(record.account_sid)
```

```csharp
// Install the C# / .NET helper library from twilio.com/docs/csharp/install

using System;
using Twilio;
using Twilio.Rest.Video.V1;
using System.Threading.Tasks;

class Program {
    public static async Task Main(string[] args) {
        // Find your Account SID and Auth Token at twilio.com/console
        // and set the environment variables. See http://twil.io/secure
        string accountSid = Environment.GetEnvironmentVariable("TWILIO_ACCOUNT_SID");
        string authToken = Environment.GetEnvironmentVariable("TWILIO_AUTH_TOKEN");

        TwilioClient.Init(accountSid, authToken);

        var compositions = await CompositionResource.ReadAsync(
            status: CompositionResource.StatusEnum.Completed, limit: 20);

        foreach (var record in compositions) {
            Console.WriteLine(record.AccountSid);
        }
    }
}
```

```java
// Install the Java helper library from twilio.com/docs/java/install

import com.twilio.Twilio;
import com.twilio.rest.video.v1.Composition;
import com.twilio.base.ResourceSet;

public class Example {
    // Find your Account SID and Auth Token at twilio.com/console
    // and set the environment variables. See http://twil.io/secure
    public static final String ACCOUNT_SID = System.getenv("TWILIO_ACCOUNT_SID");
    public static final String AUTH_TOKEN = System.getenv("TWILIO_AUTH_TOKEN");

    public static void main(String[] args) {
        Twilio.init(ACCOUNT_SID, AUTH_TOKEN);
        ResourceSet<Composition> compositions =
            Composition.reader().setStatus(Composition.Status.COMPLETED).limit(20).read();

        for (Composition record : compositions) {
            System.out.println(record.getAccountSid());
        }
    }
}
```

```go
// Download the helper library from https://www.twilio.com/docs/go/install
package main

import (
	"fmt"
	"github.com/twilio/twilio-go"
	video "github.com/twilio/twilio-go/rest/video/v1"
	"os"
)

func main() {
	// Find your Account SID and Auth Token at twilio.com/console
	// and set the environment variables. See http://twil.io/secure
	// Make sure TWILIO_ACCOUNT_SID and TWILIO_AUTH_TOKEN exists in your environment
	client := twilio.NewRestClient()

	params := &video.ListCompositionParams{}
	params.SetStatus("completed")
	params.SetLimit(20)

	resp, err := client.VideoV1.ListComposition(params)
	if err != nil {
		fmt.Println(err.Error())
		os.Exit(1)
	} else {
		for record := range resp {
			if resp[record].AccountSid != nil {
				fmt.Println(*resp[record].AccountSid)
			} else {
				fmt.Println(resp[record].AccountSid)
			}
		}
	}
}
```

```php
<?php

// Update the path below to your autoload.php,
// see https://getcomposer.org/doc/01-basic-usage.md
require_once "/path/to/vendor/autoload.php";

use Twilio\Rest\Client;

// Find your Account SID and Auth Token at twilio.com/console
// and set the environment variables. See http://twil.io/secure
$sid = getenv("TWILIO_ACCOUNT_SID");
$token = getenv("TWILIO_AUTH_TOKEN");
$twilio = new Client($sid, $token);

$compositions = $twilio->video->v1->compositions->read(
    ["status" => "completed"],
    20
);

foreach ($compositions as $record) {
    print $record->accountSid;
}
```

```ruby
# Download the helper library from https://www.twilio.com/docs/ruby/install
require 'twilio-ruby'

# Find your Account SID and Auth Token at twilio.com/console
# and set the environment variables. See http://twil.io/secure
account_sid = ENV['TWILIO_ACCOUNT_SID']
auth_token = ENV['TWILIO_AUTH_TOKEN']
@client = Twilio::REST::Client.new(account_sid, auth_token)

compositions = @client
               .video
               .v1
               .compositions
               .list(
                 status: 'completed',
                 limit: 20
               )

compositions.each do |record|
   puts record.account_sid
end
```

```bash
# Install the twilio-cli from https://twil.io/cli

twilio api:video:v1:compositions:list \
   --status completed
```

```bash
curl -X GET "https://video.twilio.com/v1/Compositions?Status=completed&PageSize=20" \
-u $TWILIO_ACCOUNT_SID:$TWILIO_AUTH_TOKEN
```

```json
{
  "compositions": [],
  "meta": {
    "page": 0,
    "page_size": 10,
    "first_page_url": "https://video.twilio.com/v1/Compositions?Status=enqueued&PageSize=10&Page=0",
    "previous_page_url": null,
    "url": "https://video.twilio.com/v1/Compositions?Status=enqueued&PageSize=10&Page=0",
    "next_page_url": null,
    "key": "compositions"
  }
}
```

#### Example: List all Compositions for a given Room \[#example-get-compositions-for-room]

For executing this example you need:

* Your application credentials (`SKXXXX:your_api_key_secret`)
* The target RoomSid (`RMXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX`)

List all Compositions for a Room SID

```js
// Download the helper library from https://www.twilio.com/docs/node/install
const twilio = require("twilio"); // Or, for ESM: import twilio from "twilio";

// Find your Account SID and Auth Token at twilio.com/console
// and set the environment variables. See http://twil.io/secure
const accountSid = process.env.TWILIO_ACCOUNT_SID;
const authToken = process.env.TWILIO_AUTH_TOKEN;
const client = twilio(accountSid, authToken);

async function listComposition() {
  const compositions = await client.video.v1.compositions.list({
    roomSid: "RMXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX",
    limit: 20,
  });

  compositions.forEach((c) => console.log(c.accountSid));
}

listComposition();
```

```python
# Download the helper library from https://www.twilio.com/docs/python/install
import os
from twilio.rest import Client

# Find your Account SID and Auth Token at twilio.com/console
# and set the environment variables. See http://twil.io/secure
account_sid = os.environ["TWILIO_ACCOUNT_SID"]
auth_token = os.environ["TWILIO_AUTH_TOKEN"]
client = Client(account_sid, auth_token)

compositions = client.video.v1.compositions.list(
    room_sid="RMXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX", limit=20
)

for record in compositions:
    print(record.account_sid)
```

```csharp
// Install the C# / .NET helper library from twilio.com/docs/csharp/install

using System;
using Twilio;
using Twilio.Rest.Video.V1;
using System.Threading.Tasks;

class Program {
    public static async Task Main(string[] args) {
        // Find your Account SID and Auth Token at twilio.com/console
        // and set the environment variables. See http://twil.io/secure
        string accountSid = Environment.GetEnvironmentVariable("TWILIO_ACCOUNT_SID");
        string authToken = Environment.GetEnvironmentVariable("TWILIO_AUTH_TOKEN");

        TwilioClient.Init(accountSid, authToken);

        var compositions = await CompositionResource.ReadAsync(
            roomSid: "RMXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX", limit: 20);

        foreach (var record in compositions) {
            Console.WriteLine(record.AccountSid);
        }
    }
}
```

```java
// Install the Java helper library from twilio.com/docs/java/install

import com.twilio.Twilio;
import com.twilio.rest.video.v1.Composition;
import com.twilio.base.ResourceSet;

public class Example {
    // Find your Account SID and Auth Token at twilio.com/console
    // and set the environment variables. See http://twil.io/secure
    public static final String ACCOUNT_SID = System.getenv("TWILIO_ACCOUNT_SID");
    public static final String AUTH_TOKEN = System.getenv("TWILIO_AUTH_TOKEN");

    public static void main(String[] args) {
        Twilio.init(ACCOUNT_SID, AUTH_TOKEN);
        ResourceSet<Composition> compositions =
            Composition.reader().setRoomSid("RMXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX").limit(20).read();

        for (Composition record : compositions) {
            System.out.println(record.getAccountSid());
        }
    }
}
```

```go
// Download the helper library from https://www.twilio.com/docs/go/install
package main

import (
	"fmt"
	"github.com/twilio/twilio-go"
	video "github.com/twilio/twilio-go/rest/video/v1"
	"os"
)

func main() {
	// Find your Account SID and Auth Token at twilio.com/console
	// and set the environment variables. See http://twil.io/secure
	// Make sure TWILIO_ACCOUNT_SID and TWILIO_AUTH_TOKEN exists in your environment
	client := twilio.NewRestClient()

	params := &video.ListCompositionParams{}
	params.SetRoomSid("RMXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX")
	params.SetLimit(20)

	resp, err := client.VideoV1.ListComposition(params)
	if err != nil {
		fmt.Println(err.Error())
		os.Exit(1)
	} else {
		for record := range resp {
			if resp[record].AccountSid != nil {
				fmt.Println(*resp[record].AccountSid)
			} else {
				fmt.Println(resp[record].AccountSid)
			}
		}
	}
}
```

```php
<?php

// Update the path below to your autoload.php,
// see https://getcomposer.org/doc/01-basic-usage.md
require_once "/path/to/vendor/autoload.php";

use Twilio\Rest\Client;

// Find your Account SID and Auth Token at twilio.com/console
// and set the environment variables. See http://twil.io/secure
$sid = getenv("TWILIO_ACCOUNT_SID");
$token = getenv("TWILIO_AUTH_TOKEN");
$twilio = new Client($sid, $token);

$compositions = $twilio->video->v1->compositions->read(
    ["roomSid" => "RMXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX"],
    20
);

foreach ($compositions as $record) {
    print $record->accountSid;
}
```

```ruby
# Download the helper library from https://www.twilio.com/docs/ruby/install
require 'twilio-ruby'

# Find your Account SID and Auth Token at twilio.com/console
# and set the environment variables. See http://twil.io/secure
account_sid = ENV['TWILIO_ACCOUNT_SID']
auth_token = ENV['TWILIO_AUTH_TOKEN']
@client = Twilio::REST::Client.new(account_sid, auth_token)

compositions = @client
               .video
               .v1
               .compositions
               .list(
                 room_sid: 'RMXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX',
                 limit: 20
               )

compositions.each do |record|
   puts record.account_sid
end
```

```bash
# Install the twilio-cli from https://twil.io/cli

twilio api:video:v1:compositions:list \
   --room-sid RMXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX
```

```bash
curl -X GET "https://video.twilio.com/v1/Compositions?RoomSid=RMXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX&PageSize=20" \
-u $TWILIO_ACCOUNT_SID:$TWILIO_AUTH_TOKEN
```

```json
{
  "compositions": [],
  "meta": {
    "page": 0,
    "page_size": 10,
    "first_page_url": "https://video.twilio.com/v1/Compositions?Status=enqueued&PageSize=10&Page=0",
    "previous_page_url": null,
    "url": "https://video.twilio.com/v1/Compositions?Status=enqueued&PageSize=10&Page=0",
    "next_page_url": null,
    "key": "compositions"
  }
}
```

#### Example: Get a Composition Media File \[#example-get-composition-media-file]

For executing this example you need:

* Your application credentials (`SKXXXX:your_api_key_secret`)
* The CompositionSid `(CJXXXX)`
* In this example we also specify a Ttl of 3600 seconds.

Get a Composition Media File

```js
const fs = require('fs');
const request = require('request');

// Download the helper library from https://www.twilio.com/docs/node/install
// Find your Account SID and Auth Token at twilio.com/console
// and set the environment variables. See http://twil.io/secure
const accountSid = process.env.TWILIO_ACCOUNT_SID;
const authToken = process.env.TWILIO_AUTH_TOKEN;
const client = require('twilio')(accountSid, authToken);

const compositionSid = 'CJXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX';
const uri =
  'https://video.twilio.com/v1/Compositions/' +
  compositionSid +
  '/Media?Ttl=3600';

client
  .request({
    method: 'GET',
    uri: uri,
  })
  .then((response) => {
    // For example, download the media to a local file
    const file = fs.createWriteStream('myFile.mp4');
    const r = request(response.body.redirect_to);
    r.on('response', (res) => {
      res.pipe(file);
    });
  })
  .catch((error) => {
    console.log('Error fetching /Media resource ' + error);
  });
```

```py
# Download the Python helper library from twilio.com/docs/python/install
import os
import json
from urllib.request import urlopen

from twilio.rest import Client

# Find your Account SID and Auth Token at twilio.com/console
# and set the environment variables. See http://twil.io/secure
account_sid = os.environ['TWILIO_ACCOUNT_SID']
auth_token = os.environ['TWILIO_AUTH_TOKEN']
client = Client(account_sid, auth_token)

composition_sid = 'CJXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX'
uri = 'https://video.twilio.com/v1/Compositions/{}/Media?Ttl=3600'.format(composition_sid)
response = client.request('GET', uri)
media_location = json.loads(response.text).get('redirect_to')

# For example, get the data and download the media to a local file
local_file = 'myFile.mp4'
with open (local_file, 'wb') as f:
    f.write(urlopen(media_location).read())
```

```cs
// Install the C# / .NET helper library from twilio.com/docs/csharp/install
using System;
using System.Threading.Tasks;
using System.Collections.Generic;
using System.IO;
using System.Net;
using System.Net.Http;
using System.Text;
using Twilio;
using Newtonsoft.Json;

class Example
{
	static async Task Main(string[] args)
	{
		// Find your Account SID and Auth Token at twilio.com/console
		// and set the environment variables. See http://twil.io/secure
		string accountSid = Environment.GetEnvironmentVariable("TWILIO_ACCOUNT_SID");
		string authToken = Environment.GetEnvironmentVariable("TWILIO_AUTH_TOKEN");

		TwilioClient.Init(accountSid, authToken);

		// Retrieve media location
		const string compositionSid = "CJXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX";
		const string uri = $"https://video.twilio.com/v1/Compositions/{compositionSid}/Media?Ttl=3600";
		var request = (HttpWebRequest)WebRequest.Create(uri);
		request.Headers.Add("Authorization", "Basic " + Convert.ToBase64String(Encoding.ASCII.GetBytes(accountSid + ":" + authToken)));
		request.AllowAutoRedirect = false;
		string responseBody = new StreamReader(request.GetResponse().GetResponseStream()).ReadToEnd();
		var mediaLocation = JsonConvert.DeserializeObject<Dictionary<string, string>>(responseBody)["redirect_to"];
    
		// For example, download the media to a local file
		var client = new HttpClient();
		var response = await client.GetAsync(mediaLocation);
		using (var stream = await response.Content.ReadAsStreamAsync())
		{
			var fileInfo = new FileInfo("myFile.mp4");
			using (var fileStream = fileInfo.OpenWrite())
			{
				await stream.CopyToAsync(fileStream);
			}
		}
	}
}
```

```java
// Install the Java helper library from twilio.com/docs/java/install
import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.twilio.http.*;
import com.twilio.rest.Domains;
import org.apache.commons.io.FileUtils;
import org.apache.http.impl.client.HttpClientBuilder;

import java.io.File;
import java.io.IOException;
import java.net.URL;

public class GetCompositionMedia {

  // Find your Account SID and Auth Token at twilio.com/console
  // and set the environment variables. See http://twil.io/secure
  public static final String ACCOUNT_SID = System.getenv("TWILIO_ACCOUNT_SID");
  public static final String AUTH_TOKEN = System.getenv("TWILIO_AUTH_TOKEN");

  public static void main( String[] args ) throws IOException{
    // Disable HttpClient follow redirect by default
    HttpClientBuilder clientBuilder = HttpClientBuilder.create();
    clientBuilder.disableRedirectHandling();
    
    // Initialize the client
    TwilioRestClient restClient = new TwilioRestClient
            .Builder(ACCOUNT_SID, AUTH_TOKEN)
            .httpClient(new NetworkHttpClient(clientBuilder))
            .build();

    // Retrieve media location
    String compositionSid = "CJXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX";
    Request request = new Request(
            HttpMethod.GET,
            Domains.VIDEO.toString(),
            "/v1/Compositions/" + compositionSid + "/Media?Ttl=3600",
            restClient.getRegion());

    Response response = restClient.request(request);

    ObjectMapper mapper = new ObjectMapper();
    JsonNode actualObj = mapper.readTree(response.getContent());
    String mediaLocation = actualObj.get("redirect_to").asText();

    // For example, download the media to a local file
    FileUtils.copyURLToFile(new URL(mediaLocation), new File("myFile.mp4"));
  }
}
```

```php
<?php
// Get the PHP helper library from https://twilio.com/docs/libraries/php
require_once '/path/to/vendor/autoload.php'; // Loads the library
use Twilio\Rest\Client;

// Find your Account SID and Auth Token at twilio.com/console
// and set the environment variables. See http://twil.io/secure
$sid = getenv("TWILIO_ACCOUNT_SID");
$token = getenv("TWILIO_AUTH_TOKEN");
$twilio = new Client($sid, $token);

$compositionSid = "CJXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX";
$uri = "https://video.twilio.com/v1/Compositions/$compositionSid/Media?Ttl=3600";
$response = $twilio->request("GET", $uri);
$mediaLocation = $response->getContent()["redirect_to"];

// For example, download media to a local file
file_put_contents("myFile.mp4", fopen($mediaLocation, 'r'));
```

```rb
# Download the helper library from https://www.twilio.com/docs/ruby/install
require 'twilio-ruby'
require 'net/http'
require 'open-uri'

# Find your Account SID and Auth Token at twilio.com/console
# and set the environment variables. See http://twil.io/secure
account_sid = ENV['TWILIO_ACCOUNT_SID']
auth_token = ENV['TWILIO_AUTH_TOKEN']

@client = Twilio::REST::Client.new(account_sid, auth_token)

composition_sid = 'CJXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX'

uri = "https://video.twilio.com/v1/Compositions/#{composition_sid}/Media?Ttl=3600"

response = @client.request("video.twilio.com", 433, 'GET', uri)

media_location = response.body['redirect_to']
# For example, write the composition media to a local file
open('myFile.mp4', "wb") do |file|
  file << open(media_location).read
end
```

```bash
curl -X GET 'https://video.twilio.com/v1/Compositions/CJXXXX/Media?Ttl=3600' \
     -u 'SKXXXX:your_api_key_secret'
```

```json
{
  "redirect_to":
  "https://com-twilio-us1-video-composition.s3.amazonaws.com/ACXXXX/CJXXXX.webm?
  X-Amz-Security-Token=XXXXX&X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Date=XXXXXXXXXXXXXXX&
  X-Amz-SignedHeaders=host&X-Amz-Expires=3600&X-Amz-Credential=XXXX&X-Amz-Signature=XXXXX"
}
```

### Deleting Compositions \[#example-delete]

#### Example: Delete a Composition Instance \[#example-delete-composition]

For executing this example you need:

* Your application credentials (`SKXXXX:your_api_key_secret`)
* The Composition SID to delete (`CJXXXX`)

Delete a Composition

```js
// Download the helper library from https://www.twilio.com/docs/node/install
const twilio = require("twilio"); // Or, for ESM: import twilio from "twilio";

// Find your Account SID and Auth Token at twilio.com/console
// and set the environment variables. See http://twil.io/secure
const accountSid = process.env.TWILIO_ACCOUNT_SID;
const authToken = process.env.TWILIO_AUTH_TOKEN;
const client = twilio(accountSid, authToken);

async function deleteComposition() {
  await client.video.v1
    .compositions("CJaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa")
    .remove();
}

deleteComposition();
```

```python
# Download the helper library from https://www.twilio.com/docs/python/install
import os
from twilio.rest import Client

# Find your Account SID and Auth Token at twilio.com/console
# and set the environment variables. See http://twil.io/secure
account_sid = os.environ["TWILIO_ACCOUNT_SID"]
auth_token = os.environ["TWILIO_AUTH_TOKEN"]
client = Client(account_sid, auth_token)

client.video.v1.compositions("CJaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa").delete()
```

```csharp
// Install the C# / .NET helper library from twilio.com/docs/csharp/install

using System;
using Twilio;
using Twilio.Rest.Video.V1;
using System.Threading.Tasks;

class Program {
    public static async Task Main(string[] args) {
        // Find your Account SID and Auth Token at twilio.com/console
        // and set the environment variables. See http://twil.io/secure
        string accountSid = Environment.GetEnvironmentVariable("TWILIO_ACCOUNT_SID");
        string authToken = Environment.GetEnvironmentVariable("TWILIO_AUTH_TOKEN");

        TwilioClient.Init(accountSid, authToken);

        await CompositionResource.DeleteAsync(pathSid: "CJaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa");
    }
}
```

```java
// Install the Java helper library from twilio.com/docs/java/install

import com.twilio.Twilio;
import com.twilio.rest.video.v1.Composition;

public class Example {
    // Find your Account SID and Auth Token at twilio.com/console
    // and set the environment variables. See http://twil.io/secure
    public static final String ACCOUNT_SID = System.getenv("TWILIO_ACCOUNT_SID");
    public static final String AUTH_TOKEN = System.getenv("TWILIO_AUTH_TOKEN");

    public static void main(String[] args) {
        Twilio.init(ACCOUNT_SID, AUTH_TOKEN);
        Composition.deleter("CJaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa").delete();
    }
}
```

```go
// Download the helper library from https://www.twilio.com/docs/go/install
package main

import (
	"fmt"
	"github.com/twilio/twilio-go"
	"os"
)

func main() {
	// Find your Account SID and Auth Token at twilio.com/console
	// and set the environment variables. See http://twil.io/secure
	// Make sure TWILIO_ACCOUNT_SID and TWILIO_AUTH_TOKEN exists in your environment
	client := twilio.NewRestClient()

	err := client.VideoV1.DeleteComposition("CJaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa")
	if err != nil {
		fmt.Println(err.Error())
		os.Exit(1)
	}
}
```

```php
<?php

// Update the path below to your autoload.php,
// see https://getcomposer.org/doc/01-basic-usage.md
require_once "/path/to/vendor/autoload.php";

use Twilio\Rest\Client;

// Find your Account SID and Auth Token at twilio.com/console
// and set the environment variables. See http://twil.io/secure
$sid = getenv("TWILIO_ACCOUNT_SID");
$token = getenv("TWILIO_AUTH_TOKEN");
$twilio = new Client($sid, $token);

$twilio->video->v1
    ->compositions("CJaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa")
    ->delete();
```

```ruby
# Download the helper library from https://www.twilio.com/docs/ruby/install
require 'twilio-ruby'

# Find your Account SID and Auth Token at twilio.com/console
# and set the environment variables. See http://twil.io/secure
account_sid = ENV['TWILIO_ACCOUNT_SID']
auth_token = ENV['TWILIO_AUTH_TOKEN']
@client = Twilio::REST::Client.new(account_sid, auth_token)

@client
  .video
  .v1
  .compositions('CJaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa')
  .delete
```

```bash
# Install the twilio-cli from https://twil.io/cli

twilio api:video:v1:compositions:remove \
   --sid CJaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa
```

```bash
curl -X DELETE "https://video.twilio.com/v1/Compositions/CJaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa" \
-u $TWILIO_ACCOUNT_SID:$TWILIO_AUTH_TOKEN
```

## Known limitations \[#known-issues]

* The time taken to process a Composition depends on the duration of the Room and the load that the Composition service is under at the time of the request. No specific delivery time is guaranteed.
* The only supported formats are MP4 and WebM.
* The maximum size of all selected Recordings for a Composition is 40 GB. For estimation of Recording's size check [this table](/docs/video/api/recordings-resource#recording-size-estimation).
* It is not allowed to delete a Composition Instance Resource with `Status=failed`. These instances will not count against your Storage capacity.
* Compositions and Compositions Hooks may fail if one or more recordings has a short duration of 2 seconds or less. We recommend removing recordings with these short durations prior to creating compositions.
