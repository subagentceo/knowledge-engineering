# Single-Select

A single-select component is used to capture a choice from up to 10 options that you provide. You can submit the value of the select option by:

* Adding an `action` to the single-select component
* Using a [button component](/docs/references/2.2/canvas-kit/interactivecomponents/button) (which will submit all interactive components in the canvas)


When a submit action takes place, the results are given in a hash with the `id` from the single-select component used as the key and the `id` from the chosen `option` as the value.

## Single-Select Parameters

| Parameter | Possible Values | Required | Description |
|  --- | --- | --- | --- |
| type | `single-select` | Yes | The type of component you are rendering. |
| id | Any string | Yes | A unique identifier for the component. |
| options | Array (See Below) | Yes | The list of options.Can provide 2 to 10. |
| label | Any string | No | The text shown above the options. |
| value | The `id` of an option | No | The option that is selected by default. |
| save_state | `unsaved``saved``failed` | No | Styles the input.Default is `unsaved`.Prevent action with `saved`. |
| disabled | `false``true` | No | Styles all options and prevents the action.Default is `false`.Will be overriden if save_state is `saved`. |
| action | Action Object | No | This can be a [Submit Action](/docs/references/2.2/canvas-kit/actioncomponents/submit-action), [URL Action](/docs/references/2.2/canvas-kit/actioncomponents/url-action), or [Sheets Action](/docs/references/2.2/canvas-kit/actioncomponents/sheets-action). |


## Options Parameters

| Parameter | Possible Values | Required | Description |
|  --- | --- | --- | --- |
| type | `option` | Yes | The type of component you are rendering. |
| id | Any string | Yes | A unique identifier for the option. |
| text | Any string | Yes | The text shown within this option. |
| disabled | `false``true` | No | Styles the option and prevents the action.Default is `false`. |


## Preview

div
iframe
This browser cannot load our Canvas Kit Builder. Please use another browser.