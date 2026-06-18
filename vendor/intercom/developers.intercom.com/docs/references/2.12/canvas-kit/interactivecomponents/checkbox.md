# Checkbox

A checkbox component is used to capture multiple choices from as many options as you want to provide. You can submit the options by:

- Using a [button component](/docs/references/2.12/canvas-kit/interactivecomponents/button) (which will submit all interactive components in the canvas)


When a submit action takes place, the results are given in a hash with the `id` from the checkbox component used as the key and an array containing the `id` of each chosen option as the value.

## Checkbox Parameters

| Parameter | Possible Values | Required | Description |
|  --- | --- | --- | --- |
| type | `checkbox` | Yes | The type of component you are rendering. |
| id | Any string | Yes | A unique identifier for the component. |
| option | Array (See Below) | Yes | The list of options.Minimum of 1. |
| label | Any string | No | The text shown above the options. |
| value | Array containing the `id` of option's | No | The option's that are selected by default. |
| save_state | `unsaved``saved``failed` | No | Styles the input.Default is `unsaved`.Prevent action with `saved`. |
| disabled | `false``true` | No | Styles all options and prevents the action.Default is `false`.Will be overriden if save_state is `saved`. |


## Options Parameters

| Parameter | Possible Values | Required | Description |
|  --- | --- | --- | --- |
| type | `option` | Yes | The type of component you are rendering. |
| id | Any string | Yes | A unique identifier for the option. |
| text | Any string | Yes | The text shown next to the checkbox. |
| disabled | `false``true` | No | Styles the option and prevents the action.Default is `false`. |


## Preview

div
iframe
This browser cannot load our Canvas Kit Builder. Please use another browser.