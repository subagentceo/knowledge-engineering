# Configuration Object

## Configuration Object

You configure Arkose Bot Manager by setting attribute values for the configuration object. This is done using the `setConfig` method on the Arkose object passed to the setup function, as shown here. If any of the callback functions are not invoking as expected, contact your Sales Rep or Sales Engineer. Note that there are separate examples for our detection and enforcement components.

Note that callbacks, `onShown`, `onSuppress` `onCompleted`, `onError`, `onFailed`, and `onResize`, return a `response` object, which contains information that usually needs to be further processed or presented to users by your code. See [Response Object](https://developer.arkoselabs.com/docs/response-object-oncompleted-onerror-onfailed-onresize) for more details.

```javascript Enforcement
// The Callback Function
function setupEnforcement(myEnforcement) {
  myEnforcement.setConfig({
    publicKey: '<YOUR PUBLIC KEY>',
    data: {},
    language: 'ar',
    onCompleted: (response) => {},
    onHide: () => {},
    onReady: () => {},
    onReset: () => {},
    onShow: () => {},
    onShown: (response) => {},
    onSuppress: (response) => {},
    onError: (response) => {},
    onFailed:(response) => {},
    onWarning:(response) => {},
    onResize: (response) => {},
    selector: '#my-submit-button',
    accessibilitySettings: {
      lockFocusToModal: true
    }
  });
}

```

```javascript Detection
// The Callback Function
function setupDetect(myDetect) {
  myDetect.setConfig({
    publicKey: '<YOUR PUBLIC KEY>',
    data: {},
    onCompleted: (response) => {},
    onHide: () => {},
    onReady: () => {},
    onShow: () => {},
    onSuppress: () => {},
    onError: (response) => {},
    onWarning:(response) => {},
    selector: '#my-submit-button'
    }
  });
}
```

This table shows the settable `setConfig` attributes, their types, brief description and to which product they are applicable.

<Table align={["left","left","left","left"]}>
  <thead>
    <tr>
      <th>
        Attribute
      </th>

      <th>
        Type
      </th>

      <th>
        Description
      </th>

      <th>
        Applicable Component
      </th>
    </tr>
  </thead>

  <tbody>
    <tr>
      <td>
        `publicKey`
      </td>

      <td>
        String
      </td>

      <td>
        An optional attribute that can be used to dynamically set the Arkose Lab’s Public Key if needed.
      </td>

      <td>
        Detection\
        Enforcement
      </td>
    </tr>

    <tr>
      <td>
        `data`
      </td>

      <td>
        Object
      </td>

      <td>
        Encrypted arbitrary JSON data sent to Arkose at the very start of a sessions classification. This is how Arkose Data Exchange data is sent to the API.
      </td>

      <td>
        Detection\
        Enforcement
      </td>
    </tr>

    <tr>
      <td>
        `language`
      </td>

      <td>
        String
      </td>

      <td>
        Language code. See [Supported Languages](https://developer.arkoselabs.com/docs/supported-languages-1) for our supported values.

        Browser settings control Arkose Platform's language, but can be overridden by using this setting to pass your desired language's entire **Locale ID String**.
      </td>

      <td>
        Enforcement
      </td>
    </tr>

    <tr>
      <td>
        `onCompleted(response)`
      </td>

      <td>
        Function
      </td>

      <td>
        Callback function invoked when applicable detection and/or enforcement has been successfully completed.

        A Response Object is passed to this function. See  [Response Object](https://developer.arkoselabs.com/docs/response-object-oncompleted-onerror-onfailed-onresize) for details.
      </td>

      <td>
        Detection\
        Enforcement
      </td>
    </tr>

    <tr>
      <td>
        `onHide`
      </td>

      <td>
        Function
      </td>

      <td>
        Callback function invoked when the detection and/or enforcement view is hidden. For example, this happens after detection and/or enforcement is completed. It's also triggered during enforcement if the user clicks the close button. Note that the close button **only** appears when in Lightbox mode.
      </td>

      <td>
        Detection\
        Enforcement
      </td>
    </tr>

    <tr>
      <td>
        `onReady`
      </td>

      <td>
        Function
      </td>

      <td>
        Callback function invoked when the detection or enforcement is ready. The Enforcement cannot be triggered before this event. You may want to disable the UI you are protecting until this event has been triggered.
      </td>

      <td>
        Detection\
        Enforcement
      </td>
    </tr>

    <tr>
      <td>
        `onShow`
      </td>

      <td>
        Function
      </td>

      <td>
        A callback invoked when detection and/or enforcement is loading.

        The function is also invoked when an enforcement is re-displayed (e.g. if the user closes the view and tries to continue). Note that the close button only appears when in Lightbox mode.
      </td>

      <td>
        Detection\
        Enforcement
      </td>
    </tr>

    <tr>
      <td>
        `onShown(response)`
      </td>

      <td>
        Function
      </td>

      <td>
        Only applicable to enforcement.

        A callback invoked when the  Enforcement Challenge is displayed. The `onShown` method will only be invoked the first time an Enforcement Challenge is displayed.

        A Response Object is passed to this function. See [Response Object](https://developer.arkoselabs.com/docs/response-object-oncompleted-onerror-onfailed-onresize) for details.
      </td>

      <td>
        Enforcement
      </td>
    </tr>

    <tr>
      <td>
        `onSuppress(response)`
      </td>

      <td>
        Function
      </td>

      <td>
        A callback invoked when the detection and/or enforcement is running and the Arkose Platform is analyzing the user intent.

        A Response Object is passed to this function. See [Response Object](https://developer.arkoselabs.com/docs/response-object-oncompleted-onerror-onfailed-onresize) for details.
      </td>

      <td>
        Detection\
        Enforcement
      </td>
    </tr>

    <tr>
      <td>
        `onError(response)`
      </td>

      <td>
        Function
      </td>

      <td>
        A callback invoked when an error occurs in loading of the detection and/or enforcement.

        A Response Object is passed to this function.See [Response Object](https://developer.arkoselabs.com/docs/response-object-oncompleted-onerror-onfailed-onresize) for details.
      </td>

      <td>
        Detection\
        Enforcement
      </td>
    </tr>

    <tr>
      <td>
        `onWarning(response)`
      </td>

      <td>
        Function
      </td>

      <td>
        A callback invoked when a warning occurs in generating image assets for the enforcement challenge.

        A Response Object is passed to this function.See [Response Object](https://developer.arkoselabs.com/docs/response-object-oncompleted-onerror-onfailed-onresize)  for details.
      </td>

      <td>
        Enforcement
      </td>
    </tr>

    <tr>
      <td>
        `onFailed(response)`
      </td>

      <td>
        Function
      </td>

      <td>
        Callback function invoked when a challenge has failed (the user has failed the challenge multiple times and is not allowed to continue the session).

        A Response Object is passed to this function.See [Response Object](https://developer.arkoselabs.com/docs/response-object-oncompleted-onerror-onfailed-onresize) for details.
      </td>

      <td>
        Enforcement
      </td>
    </tr>

    <tr>
      <td>
        `onResize(response)`
      </td>

      <td>
        Function
      </td>

      <td>
        A callback invoked when a sizing event occurs in the loading of the challenge.

        A Response Object is passed to this function. See [Response Object](https://developer.arkoselabs.com/docs/response-object-oncompleted-onerror-onfailed-onresize) for details.
      </td>

      <td>
        Enforcement
      </td>
    </tr>

    <tr>
      <td>
        `onReset`
      </td>

      <td>
        Function
      </td>

      <td>
        A callback invoked after the enforcement resets. Typically occurs after a challenge has been successfully answered.

        Note that your implementation should not call the `reset()` function in this callback.
      </td>

      <td>
        Enforcement
      </td>
    </tr>

    <tr>
      <td>
        `selector`
      </td>

      <td>
        String
      </td>

      <td>
        The element selector (e.g. `#my-submit-button`) for either triggering the detection to display as a modal, or where the detection will appear inline on the page. This parameter is dependent on how the **mode** parameter has been configured."
      </td>

      <td>
        Enforcement
      </td>
    </tr>

    <tr>
      <td>
        `mode`
      </td>

      <td>
        String
      </td>

      <td>
        Sets if the Enforcement Challenge will be shown as a modal or within the selected element. Allowed values are **lightbox** and **inline**, where the default is **lightbox**, which indicates display as modal.
      </td>

      <td>
        Enforcement
      </td>
    </tr>

    <tr>
      <td>
        `accessibilitySettings`
      </td>

      <td>
        Object
      </td>

      <td>
        Contains settings for accessibility that need to make changes implementing websites markup.

        `lockFocusToModal`\
        If enabled and `mode` is set to `lightbox`, `aria-hidden=true` will be added to sibling elements of the Enforcement Challenge container. This is to ensure that users employing Assistive Technology do not accidentally leave the lightbox before interacting with the challenge.

        `grabFocusToInline`\
        If enabled and `mode` is set to `inline`, focus will be set on the Enforcement Challenge once it finishes loading.
      </td>

      <td>
        Enforcement
      </td>
    </tr>

    <tr>
      <td>
        `styleTheme`
      </td>

      <td>
        String
      </td>

      <td>
        Sets theme to existing style manager built theme with the given name. If not set, the default theme is used.
      </td>

      <td>
        Enforcement
      </td>
    </tr>

    <tr>
      <td>
        `inlineRunOnTrigger`
      </td>

      <td>
        Boolean (true/false)
      </td>

      <td>
        Allows `inline` integration mode to run like `lightbox` mode so that assets can be preloaded on the page when the attribute is set to true.

        Default value is `false`.
      </td>

      <td>
        Detection\
        Enforcement
      </td>
    </tr>
  </tbody>
</Table>