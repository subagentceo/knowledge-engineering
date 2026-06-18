# Single-Select

A single select component is used to capture a choice from the teammate or end user. It requires a collection of single select options, which represent the possible choices.

```json
{  type: "single-select",  id: "industry",  label: "Choose your industry",  value: "banking",  save_state: "unsaved",  disabled: true,  options: [    {      type: "option",      id: "banking",      text: "Banking"    },     {      type: "option",      id: "tech",      text: "Technology",      disabled: true,    }  ],  action: {    type: "submit"  },}
```

## Single-Select

| Parameter | Possible Values | Required | Function |
|  --- | --- | --- | --- |
| id | Any string | Yes | Unique identifier for the component within this card. Single select components are submitted in a hash, with this id used as the key and the id of the chosen option as the value. |
| label | Any string | No | The text shown above the input. |
| options | Array | Yes | The list of options. A minimum of 2 options is required, and no more than 11 are allowed. More on the Options array is below. |
| value | Any string | No | The default value of the option. |
| action | Action object | No | This can be a [Submit Action](/docs/references/1.1/canvas-kit/actioncomponents/submit-action), [URL Action](/docs/references/1.1/canvas-kit/actioncomponents/url-action), or [Sheets Action](/docs/references/1.1/canvas-kit/actioncomponents/sheets-action). |
| save_state | unsaved (default)savedfailed | No | The defined state of the inputted value to render a specific style. |
| disabled | false (default)true | No | Styles as complete and prevents further editing or interaction. |


> 📘 Saved States
A `save_state` of `saved` renders the input in a style which indicates a successfully submitted value, and prevents further editing or interaction with the input. It's the only `save_state` that changes the function and blocks any further interaction.


## Options

| Parameter | Possible Values | Required | Function |
|  --- | --- | --- | --- |
| id | Any string | Yes | Unique identifier for the option. Single select components are submitted in a hash, with this id used as the key and the id of the chosen option as the value. |
| text | Any string | Yes | The text shown within this option. |
| disabled | false (default)true | No | Styles as complete and prevents further editing or interaction. |


## Card View

![](/assets/6880dcf-single-select_card_view.16227584b3f532b4667a43091222d55e4e2d6c48e2b65bc517e9e79f72a054f4.71a4f21c.png)

## Frame View

![](/assets/8575a74-single-select_frame_view.101f27f3a52c6e72c52d52099d34a8777027c6428a3c693adfd022c43c3dda13.71a4f21c.png)