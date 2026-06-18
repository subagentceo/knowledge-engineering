# Dropdown

A dropdown component is used to capture a choice from up to 10 options that you provide.

When submitted, the dropdown choices are returned in a hash with the id from the dropdown component used as the key and the id from the chosen option as the value.

```json
{
  "dropdown-1-id": "option-1-id"
}
```

## Dropdown Parameters

| Parameter | Possible Values | Required | Function |
|  --- | --- | --- | --- |
| type | `dropdown` | Yes | The type of component you are rendering. |
| id | Any string | Yes | A unique identifier for the component. |
| options | Array (See Below) | Yes | The list of options.Can provide 2 to 10. |
| label | Any string | No | The text shown above the dropdown. |
| value | The `id` of an option | No | The option that is selected by default. |
| save_state | `unsaved` `saved` `failed` | No | Styles all options and prevents the action.Default is `false`.Will be overriden if save_state is `saved`. |
| disabled | `false` `true` | No | Styles all options and prevents the action.Default is `false`.Will be overriden if `save_state` is saved. |


## Option Parameters

| Parameter | Possible Values | Required | Function |
|  --- | --- | --- | --- |
| type | `option` | Yes | The type of component you are rendering. |
| id | Any string | Yes | A unique identifier for the option. |
| text | Any string | Yes | The text shown within this option. |
| disabled | `false` `true` | No | Styles the option and prevents the action.Default is `false`. |


## Preview

div
iframe
This browser cannot load our Canvas Kit Builder. Please use another browser.