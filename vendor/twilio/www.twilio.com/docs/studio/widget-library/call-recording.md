# Call Recording widget

Studio widgets represent various parts of Twilio's functionality that you can combine in your Studio Flow to build out robust applications that don't require you to do any coding.

> \[!NOTE]
>
> New to Twilio Studio? Check out our [Getting Started guide](/docs/studio/user-guide/get-started).

The Call Recording widget allows you to switch Voice Call Recording ON or OFF at any point during a call flow.

![RecordCall widget showing call recording status as On with Success and Failed paths.](https://docs-resources.prod.twilio.com/e5e51392f0afcef016b4b33e3322a23ff513d355a28de542efaf1914c9a4fbc6.png)

> \[!WARNING]
>
> The Call Recording widget can only be used for Incoming Calls and must be placed after an initial Say/Play or Gather widget. Be sure to announce to the caller that the call is being recorded, if your local laws require it.

## Required configuration for Call Recording

The Call Recording widget requires specification on whether the Recording should be switched on or off.

| Name        | Description                                                                                        | Default |
| ----------- | -------------------------------------------------------------------------------------------------- | ------- |
| Record Call | A toggle button (Boolean) to allow users to Toggle Call Recording to On or Off within a Call Flow. | `False` |

> \[!WARNING]
>
> These options are not for pausing and resuming a Video Recording — they are specifically meant for Start and Stop actions. Please read [Legal Considerations with Recording Voice and Video Communications](https://help.twilio.com/hc/en-us/articles/360011522553-Legal-Considerations-with-Recording-Voice-and-Video-Communications).

## Optional configuration for Call Recording

The Call Recording widget also accepts a number of configuration options that you can use to declare **recording Status Callback URL,** **Recording Channels**, and **trim behavior** for the request initiated by this widget.

| Name                             | Description                                                                                                                                                                                                         | Default     |
| -------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ----------- |
| Recording Status Callback URL    | The URL we should call using the recording\_status\_callback\_method on each recording event specified in recording\_status\_callback\_event.                                                                       | empty       |
| Recording Status Callback Method | The HTTP method we should use to call recording\_status\_callback. Can be `GET` or `POST`                                                                                                                           | `POST`      |
| Recording Status Event           | The recording status events on which we should call the recording\_status\_callback URL. Can be `in-progress`, `completed`, and `absent`. Separate multiple event values with space.                                | `completed` |
| Recording Channels               | The number of channels used in the recording. Can be `mono` or `dual`. `mono` records all parties of the call into one channel. `dual` records each party of a 2-party call into separate channels.                 | dual        |
| Trim                             | Whether to trim any leading and trailing silence in the recording. Can be `trim-silence` or `do-not-trim`. `trim-silence` trims the silence from the beginning and end of the recording and `do-not-trim` does not. | do-not-trim |

> \[!NOTE]
>
> Learn more about [RecordingStatusCallback parameters](/docs/voice/api/recording#recordingstatuscallback).

## Call Recording transitions

These events trigger transitions from this widget to another widget in your Flow. For more information on working with Studio transitions, [see this guide](/docs/studio/user-guide/get-started#define-widget-transitions).

| Name    | Description                                  |
| ------- | -------------------------------------------- |
| Success | The call recording was successfully toggled. |
| Failed  | Could not toggle call recording.             |

## Call Recording variables

When the Call Recording widget executes, it will have stored the following variables for use throughout your Studio Flow (where `MY_WIDGET_NAME` is the name of your actual widget). For more information, see [Use Variables in your Studio Flow](/docs/studio/user-guide/get-started#use-variables-in-your-studio-flow).

Find definitions and examples for these variables at the [Recording](/docs/voice/api/recording#recording-properties) page.

| Name                      | Liquid template language                         |
| ------------------------- | ------------------------------------------------ |
| Account SID               | \{\{widgets.MY\_WIDGET\_NAME.AccountSid}}        |
| API Version               | \{\{widgets.MY\_WIDGET\_NAME.ApiVersion}}        |
| Call SID                  | \{\{widgets.MY\_WIDGET\_NAME.CallSid}}           |
| Channels                  | \{\{widgets.MY\_WIDGET\_NAME.Channels}}          |
| Conference SID            | \{\{widgets.MY\_WIDGET\_NAME.ConferenceSid}}     |
| Date Created              | \{\{widgets.MY\_WIDGET\_NAME.DateCreated}}       |
| Date Updated              | \{\{widgets.MY\_WIDGET\_NAME.DateUpdated}}       |
| Duration                  | \{\{widgets.MY\_WIDGET\_NAME.Duration}}          |
| Encryption Details        | \{\{widgets.MY\_WIDGET\_NAME.EncryptionDetails}} |
| Error Code                | \{\{widgets.MY\_WIDGET\_NAME.ErrorCode}}         |
| Price                     | \{\{widgets.MY\_WIDGET\_NAME.Price}}             |
| Price Unit                | \{\{widgets.MY\_WIDGET\_NAME.PriceUnit}}         |
| Recording SID             | \{\{widgets.MY\_WIDGET\_NAME.Sid}}               |
| Recording Uri             | \{\{widgets.MY\_WIDGET\_NAME.Uri}}               |
| Source of Recording Start | \{\{widgets.MY\_WIDGET\_NAME.Source}}            |
| Start Time                | \{\{widgets.MY\_WIDGET\_NAME.StartTime}}         |
| Status                    | \{\{widgets.MY\_WIDGET\_NAME.Status}}            |

## Example: Client feedback

In this Flow, a client will be notified that their call will be recorded. The call recording will then proceed and, if successful, will ask the client what their experience was like. After the client stops talking, the recording will be stopped. The specified Recording Status Callback URL for the widget will handle all events of the recording.

![Twilio Studio flow with call recording, feedback gathering, and offline message handling.](https://docs-resources.prod.twilio.com/f8ca5effa4a02a8b205b1c4768e418d648a70af063e4b567a621c4d8b86a5e2e.png)

## Learn more

Now that you know the basics of the Call Recording widget, learn more about [Recordings](/docs/voice/api/recording).

Let's build something amazing.
