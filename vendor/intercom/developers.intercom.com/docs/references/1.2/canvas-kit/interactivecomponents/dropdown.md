# Dropdown

A dropdown component is used to capture a choice from the teammate or end user. It requires a collection of dropdown options, which represent the possible choices.

```json
{  type: "dropdown",  id: "industry",  label: "Choose your industry",  value: "banking",  save_state: "unsaved",  disabled: true,  options: [    {      type: "option",      id: "banking",      text: "Banking"    }, {      type: "option",      id: "tech",      text: "Technology",      disabled: true    }  ],}
```

## Dropdown

| Parameter | Possible Values | Required | Function |
|  --- | --- | --- | --- |
| id | Any string | Yes | Unique identifier for the component within this card. Dropdown components are submitted in a hash, with this id used as the key and the id of the chosen option as the value. |
| label | Any string | No | The text shown above the input. |
| options | Array | Yes | The list of options. A minimum of 2 options is required, and no more than 11 are allowed. More on the Options array is below. |
| value | Any string | No | The default value of the option. |
| save_state | unsaved (default)savedfailed | No | The defined state of the inputted value to render a specific style. |
| disabled | false (default)true | No | Styles as complete and prevents further editing or interaction. |


> 📘 Saved States
A `save_state` of `saved` renders the input in a style which indicates a successfully submitted value, and prevents further editing or interaction with the input. It's the only `save_state` that changes the function and blocks any further interaction.


## Options

| Parameter | Possible Values | Required | Function |
|  --- | --- | --- | --- |
| id | Any string | Yes | Unique identifier for the option. Dropdown components are submitted in a hash, with this id used as the key and the id of the chosen option as the value. |
| text | Any string | Yes | The text shown within this option. |
| disabled | false (default)true | No | Styles as complete and prevents further editing or interaction. |


## Card View

![](/assets/81aa9ec-dropdown_card_view.6a43eeda013a4f191e6a1c2d2bb21b29d0e58012d52f0be5417d6244a498bbf4.71a4f21c.png)

## Frame View

![](/assets/ea166fc-dropdown_frame_view.2dce7d9de78c5e2d879169db09284c7185149c8327ac61181bcc889b2a56896a.71a4f21c.png)