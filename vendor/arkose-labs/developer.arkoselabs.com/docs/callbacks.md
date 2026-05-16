# Callbacks

This table lists all the Client API callbacks, when each can be triggered, and which Arkose components each is relevant for (i.e. `onShow` is only triggered when an Enforcement Challenge is shown. Since our detection component does not have Enforcement Challenges, you only have to define a callback for `onShow` when using our enforcement component).

For how to associate a function definition with a callback, see [Configuration Object](https://developer.arkoselabs.com/docs/configuration-object).

<Table align={["left","left","left"]}>
  <thead>
    <tr>
      <th style={{ textAlign: "left" }}>
        Callback Name
      </th>

      <th style={{ textAlign: "left" }}>
        When Triggered
      </th>

      <th style={{ textAlign: "left" }}>
        Applicable Component
      </th>
    </tr>
  </thead>

  <tbody>
    <tr>
      <td style={{ textAlign: "left" }}>
        `onReady`
      </td>

      <td style={{ textAlign: "left" }}>
        When API is loaded and configured **OR**

        When a challenge is programmatically reset after `onReset` triggers.
      </td>

      <td style={{ textAlign: "left" }}>
        Detection
        Enforcement
      </td>
    </tr>

    <tr>
      <td style={{ textAlign: "left" }}>
        `onError`
      </td>

      <td style={{ textAlign: "left" }}>
        At any point in a session when an internal Arkose API error occurs.
      </td>

      <td style={{ textAlign: "left" }}>
        Detection
        Enforcement
      </td>
    </tr>

    <tr>
      <td style={{ textAlign: "left" }}>
        `onWarning`
      </td>

      <td style={{ textAlign: "left" }}>
        At any point in a session when an internal Arkose API warning is triggered.
      </td>

      <td style={{ textAlign: "left" }}>
        Detection
        Enforcement
      </td>
    </tr>

    <tr>
      <td style={{ textAlign: "left" }}>
        `onShow`
      </td>

      <td style={{ textAlign: "left" }}>
        When a selector is pressed, but before a challenge is shown **AND**

        When a challenge is closed but is then shown again.
      </td>

      <td style={{ textAlign: "left" }}>
        Enforcement
      </td>
    </tr>

    <tr>
      <td style={{ textAlign: "left" }}>
        `onSuppress`
      </td>

      <td style={{ textAlign: "left" }}>
        When a session is classified as not needing a challenge.
      </td>

      <td style={{ textAlign: "left" }}>
        Detection
        Enforcement
      </td>
    </tr>

    <tr>
      <td style={{ textAlign: "left" }}>
        `onShown`
      </td>

      <td style={{ textAlign: "left" }}>
        When a challenge is initially shown **AND**

        When a challenge is closed and then shown again.
      </td>

      <td style={{ textAlign: "left" }}>
        Enforcement
      </td>
    </tr>

    <tr>
      <td style={{ textAlign: "left" }}>
        `onCompleted`
      </td>

      <td style={{ textAlign: "left" }}>
        When no challenge is needed **OR**

        When a challenge is answered correctly.
      </td>

      <td style={{ textAlign: "left" }}>
        Detection
        Enforcement
      </td>
    </tr>

    <tr>
      <td style={{ textAlign: "left" }}>
        `onHide`
      </td>

      <td style={{ textAlign: "left" }}>
        When a challenge is closed using ESC or its X button **OR**

        After `onCompleted` triggers **OR**

        After `onError` triggers in Client API version earlier than 3.0.0 when session setup fails, whether a challenge was shown or not.
      </td>

      <td style={{ textAlign: "left" }}>
        Detection (second and third situations only)

        Enforcement (first, second and third situations)
      </td>
    </tr>

    <tr>
      <td style={{ textAlign: "left" }}>
        `onFailed`
      </td>

      <td style={{ textAlign: "left" }}>
        When a challenge cannot proceed due to exhausted configuration thresholds. This occurs when retry attempts are exceeded (defaults to unlimited) or PoW action is block.
      </td>

      <td style={{ textAlign: "left" }}>
        Enforcement
      </td>
    </tr>

    <tr>
      <td style={{ textAlign: "left" }}>
        `onReset`
      </td>

      <td style={{ textAlign: "left" }}>
        When a challenge is programmatically reset **OR**

        When a challenge is answered correctly.
      </td>

      <td style={{ textAlign: "left" }}>
        Enforcement
      </td>
    </tr>

    <tr>
      <td style={{ textAlign: "left" }}>
        `onResize`
      </td>

      <td style={{ textAlign: "left" }}>
        When a challenge is shown **AND**

        After `onShown` triggers.
      </td>

      <td style={{ textAlign: "left" }}>
        Enforcement
      </td>
    </tr>
  </tbody>
</Table>