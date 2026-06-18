# Input

An input component is used to capture text input from the end user. You can submit the value of the input by:

- Adding an `action` to the input component (which will render an inline button)
- Using a [button component](/docs/references/2.9/canvas-kit/interactivecomponents/button) (which will submit all interactive components in the canvas)


## Parameters

| Parameter | Possible Values | Required | Description |
|  --- | --- | --- | --- |
| type | `input` | Yes | The type of component you are rendering. |
| id | Any string | Yes | A unique identifier for the component. |
| label | Any string | No | The text shown above the input. |
| placeholder | Any string | No | An example value shown inside the component when it’s empty. |
| value | Any string | No | An entered value which is already inside the component. |
| action | Action Object | No | This can be a [Submit Action](/docs/references/2.9/canvas-kit/actioncomponents/submit-action), [URL Action](/docs/references/2.9/canvas-kit/actioncomponents/url-action), or [Sheets Action](/docs/references/2.9/canvas-kit/actioncomponents/sheets-action). |
| save_state | `unsaved``saved``failed` | No | Styles the input.Default is `unsaved`.Prevent action with `saved`. |
| disabled | `false``true` | No | Styles the input and prevents the action.Default is `false`.Will be overriden if save_state is `saved`. |


## Preview

div
iframe
This browser cannot load our Canvas Kit Builder. Please use another browser.