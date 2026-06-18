# Button

A button component is used to take an action by clicking a button. This can either:

* [Trigger a submit request to be sent](/docs/references/1.4/canvas-kit/actioncomponents/submit-action)  Inbox Messenger
* [Open a link in a new page](/docs/references/1.4/canvas-kit/actioncomponents/url-action)  Inbox Messenger
* [Open a sheet](/docs/references/1.4/canvas-kit/actioncomponents/sheets-action)  Messenger


## Parameters

| Parameter | Possible Values | Required | Description |
|  --- | --- | --- | --- |
| type | `button` | Yes | The type of component you are rendering. |
| id | Any string | Yes | A unique identifier for the component. |
| label | Any string | Yes | The text that will be rendered inside the button. |
| action | Action Object | Yes | This can be a [Submit Action](/docs/references/1.4/canvas-kit/actioncomponents/submit-action), [URL Action](/docs/references/1.4/canvas-kit/actioncomponents/url-action), or [Sheets Action](/docs/references/1.4/canvas-kit/actioncomponents/sheets-action). |
| style | `primary``secondary``link` | No | Styles the button.Default is `primary`. |
| disabled | `false``true` | No | Styles the button and prevents the action.Default is `false`. |


## Preview

div
iframe
This browser cannot load our Canvas Kit Builder. Please use another browser.