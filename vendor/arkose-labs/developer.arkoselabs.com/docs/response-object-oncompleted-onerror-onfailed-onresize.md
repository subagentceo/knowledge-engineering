# Response Object

## Response Object

The following apply to both Arkose Detect and Arkose Protect.

* When enforcement or detection is completed, the configured `onCompleted` function is invoked with a `response` object. This applies to both Arkose Detect and Arkose Protect.

* When an error occurs in loading the detection and/or enforcement, the `onError` callback function is invoked with a response object.

* When the challenge is suppressed for enforcement or only detection is run, the `onSuppress` callback function is invoked with a `response` object.

* When a warning occurs in loading the detection and/or enforcement, the `onWarning` callback function is invoked with a `response` object.

* When a warning occurs in loading the detection and/or enforcement, the `onWarning` callback function is invoked with a `response` object.

The following only apply to our enforcement component:

* When a challenge has failed, the configured `onFailed` function is invoked with a `response` object. By "failed", we mean the user has incorrectly answered a challenge more than a configured number of times. Please contact your CSM (Customer Success Manager) or SE for additional information if needed.

* When a challenge is loaded, the configured `onResize` function is invoked with a `response` object.

* When a challenge is loaded, the `onShown` callback function is invoked with a `response` object.

The following code templates suggest how to handle each function's callback and how to pass the `response` object or its relevant fields. It is followed by a table with descriptions of the `response` object's fields.

```javascript Enforcement
onCompleted: function(response) {
  // sendToBackendServer(response.token);
},
onFailed: function(response) {
	// If using APISV & response.recoverable, provide fresh token to allow reload.
  // sendUserChallengeFailedToBackendServer(response.token);
},
onError: function(response) {
  // sendScriptLoadingErrorToBackendServer(response.error);
},
onWarning: function(response) {
	// Provide fresh APISV token so user can recover by reloading challenge.
  // sendScriptLoadingWarningToBackendServer(response.warning);
},
onResize: function(response) {
  // optionally handle sizing events as needed on the client-side with response.height and response.width data
},
onShown: function(response) {
  // optionally handle shown event as needed on the client-side
},
onSuppress: function(response) {
  // optionally handle suppressed events as needed on the client-side
}
```

```javascript Detection
onCompleted: function(response) {
  // sendToBackendServer(response.token);
},
  
onError: function(response) {
  // sendScriptLoadingErrorToBackendServer(response.error);
},
  
onWarning: function(response) {
  // sendScriptLoadingWarningToBackendServer(response.warning);
}
```

<Table align={["left","left","left","left"]}>
  <thead>
    <tr>
      <th>
        Response Object Field
      </th>

      <th>
        Type
      </th>

      <th>
        Description
      </th>

      <th>
        Used by Callbacks
      </th>
    </tr>
  </thead>

  <tbody>
    <tr>
      <td>
        `response.token`
      </td>

      <td>
        String
      </td>

      <td>
        The token you need to send to your back-end server for verification.
      </td>

      <td>
        `onCompleted`
        `onFailed`
        `onShown`
        `onSuppress`
      </td>
    </tr>

    <tr>
      <td>
        `response.error`
      </td>

      <td>
        Error object
      </td>

      <td>
        An error object containing an error code string (see next entry)
      </td>

      <td>
        `onError`
      </td>
    </tr>

    <tr>
      <td>
        `response.error.error`
      </td>

      <td>
        String
      </td>

      <td>
        An error code string representing the error that occurred when loading the challenge.
      </td>

      <td>
        `onError`
      </td>
    </tr>

    <tr>
      <td>
        `response.height`
      </td>

      <td>
        String
      </td>

      <td>
        Only applicable to our enforcement component.

        The challenge frame height size in px. e.g. "290px"
      </td>

      <td>
        `onCompleted`\
        `onResize`
        `onShown`
        `onSuppress`
      </td>
    </tr>

    <tr>
      <td>
        `response.width`
      </td>

      <td>
        String
      </td>

      <td>
        Only applicable to our enforcement component.

        The challenge frame width size in px. e.g. "302px"
      </td>

      <td>
        `onCompleted`\
        `onResize`
        `onShown`
        `onSuppress`
      </td>
    </tr>

    <tr>
      <td>
        `response.maxHeight`
      </td>

      <td>
        String
      </td>

      <td>
        Optional. Only applicable to our enforcement component.

        The maximum height of the challenge frame, in pixels (e.g. '450px').
      </td>

      <td>
        `onCompleted`\
        `onResize`
        `onShown`
        `onSuppress`
      </td>
    </tr>

    <tr>
      <td>
        `response.maxWidth`
      </td>

      <td>
        String
      </td>

      <td>
        Optional. Only applicable to our enforcement component.

        The maximum width of the challenge frame, in pixels (e.g. '400px').
      </td>

      <td>
        `onCompleted`\
        `onResize`
        `onShown`
        `onSuppress`
      </td>
    </tr>

    <tr>
      <td>
        `response.completed`
      </td>

      <td>
        Boolean
      </td>

      <td>
        Only applicable to our enforcement component.

        Indicates if the challenge is completed or not.
      </td>

      <td>
        `onCompleted`\
        `onResize`
        `onShown`
        `onSuppress`
      </td>
    </tr>

    <tr>
      <td>
        `response.suppressed`
      </td>

      <td>
        Boolean
      </td>

      <td>
        Only applicable to our enforcement component.

        Indicates if the challenge is suppressed or not.
      </td>

      <td>
        `onCompleted`\
        `onResize`
        `onShown`
        `onSuppress`
      </td>
    </tr>

    <tr>
      <td>
        `response.recoverable`
      </td>

      <td>
        Boolean
      </td>

      <td>
        Indicates if the challenge is user recoverable or not.
      </td>

      <td>
        `onCompleted`
        `onError`
        `onHide`
        `onFailed`
        `onWarning`
      </td>
    </tr>

    <tr>
      <td>
        `response.failed`
      </td>

      <td>
        Failed Object
      </td>

      <td>
        A failure object containing an error code string (see next entry)
      </td>

      <td>
        `onFailed`
      </td>
    </tr>

    <tr>
      <td>
        `response.failed.error`
      </td>

      <td>
        String
      </td>

      <td>
        A error code string  representing the failure that is sent from the challenge.
      </td>

      <td>
        `onFailed`
      </td>
    </tr>

    <tr>
      <td>
        `response.warning`
      </td>

      <td>
        Warning Object
      </td>

      <td>
        An object containing information about the warning (e.g. status, error, source).

        Please see the next three entries for details.
      </td>

      <td>
        `onWarning`
      </td>
    </tr>

    <tr>
      <td>
        `response.warning.source`
      </td>

      <td>
        Null or String
      </td>

      <td>
        Indicate the source of the warning.
      </td>

      <td>
        `onWarning`
      </td>
    </tr>

    <tr>
      <td>
        `response.warning.error`
      </td>

      <td>
        String
      </td>

      <td>
        A error code string representing the warning that is sent from the challenge.
      </td>

      <td>
        `onWarning`
      </td>
    </tr>

    <tr>
      <td>
        `response.warning.status`
      </td>

      <td>
        Number
      </td>

      <td>
        Optional.

        A status code related to the warning.
      </td>

      <td>
        `onWarning`
      </td>
    </tr>
  </tbody>
</Table>

Full list of error codes can be accessed from [Clinet-Side Error Handling](https://developer.arkoselabs.com/docs/error-handling).

<br />