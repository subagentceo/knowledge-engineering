# Input

An input component is used to capture text input from the end user.

If you pass an action to the input component, it will render with an inline button which submits the value inside the input to the specified URL.

```json
{  "type": "input",   "id": "user_email_address",  "label": "Enter your email address",  "placeholder": "user@domain.com",  "value": "peter@intercom.io",  "save_state": "unsaved",  "disabled": "true",  "action": {    "type": "submit"  }}
```

| Parameter | Possible Values | Required | Function |
|  --- | --- | --- | --- |
| id | Any string | Yes | Unique identifier for the component within this card. |
| label | Any string | No | The text shown above the input. |
| placeholder | Any string | No | An example value shown inside the input when it’s empty. |
| value | Any string | No | The default value of the input. |
| action | Action object | No | This can be a [Submit Action](/docs/references/1.0/canvas-kit/actioncomponents/submit-action), [URL Action](/docs/references/1.0/canvas-kit/actioncomponents/url-action), or [Sheets Action](/docs/references/1.0/canvas-kit/actioncomponents/sheets-action). |
| save_state | unsaved (default)savedfailed | No | The defined state of the inputted value to render a specific style. |
| disabled | false (default)true | No | Styles as complete and prevents further editing or interaction. |


> 📘 Saved States
A `save_state` of `saved` renders the input in a style which indicates a successfully submitted value, and prevents further editing or interaction with the input. It's the only `save_state` that changes the function and blocks any further interaction.This is the same functionality as if you set the `disabled` boolean to `true`. If you set the `save_state` as `saved` but the `disabled` boolean as `false`, we'll overwrite the boolean and still show the component in this disabled state.


## Card View

![](/assets/3e9f0dc-inout_card_view.eb2fea023c94ff84a4a50a304944195fb15d9979da3ea13a61a84217f8b0b874.71a4f21c.png)

## Frame View

![](/assets/3b8de63-input_frame_view.9f4d91bd22f1c63e950d01c1bfa086089bc67d804a4ccb83d20e90aa1b72796f.71a4f21c.png)