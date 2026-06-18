# Split Based On... widget

Studio widgets represent various parts of Twilio's functionality that you can combine in your Studio Flow to build out robust applications that don't require you to do any coding.

> \[!NOTE]
>
> New to Twilio Studio? Check out our [Getting Started guide](/docs/studio/user-guide/get-started).

The **Split Based On...** widget allows you to split your Flow and connect to specific widgets based on user conditions. Use this widget to deal with conditions like a user replying "YES" to a SMS, or pressing "1" on their keypad while on a call.

![Flowchart with reminders\_split widget splitting based on inbound body value.](https://docs-resources.prod.twilio.com/328bb26e41c9b011d26abc09bdd48363b90ca4b6711f0eb2e9dbda228a0b4112.png)

## Required configuration for Split Based On

The Split Based On... widget requires a **Variable to Test** to function properly. The Variable to Test is the value that is tested to determine what happens next in your Flow when a certain **condition** is met.

| Name             | Description                                                                                                                                                                                                                                                                                           | Example                              | Default |
| ---------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------ | ------- |
| Variable to Test | The value (or expression) that is being tested.For example, if you want to branch on message body, the Input would be the variable you stored the message in. Select a predefined variable from the drop-down, or type a dynamic variable directly with curly braces: `{{widgets.http_1.parsed.foo}}` | `{{widgets.send_msg.incoming.Body}}` | None    |

## Split Based On... Transitions

You can add transitions to the Split Based On... widget that trigger another widget in your Flow. Transitions can be triggered by a variety of conditions that you can configure. For more information on working with Studio transitions, see [working with variables](/docs/studio/user-guide#working-with-variables).

| Name              | Description                                             |
| ----------------- | ------------------------------------------------------- |
| Condition Matches | Example: "YES" for when text matches "YES"              |
| No Match          | Input does not match any of the user-defined conditions |

## Condition structure

Conditions take the form: Subject, Predicate, \[value] and can be set in the widget configuration menu in the right-side panel on the Canvas.

* `subject:` The configuration parameter defined as Input.
* `predicate:` The operator to use. For example: equals, greater than, less than and more.
* `[value]:` The value you are comparing against. Constants, variables, and expressions are supported. Value can be null for certain conditions, such as "is blank" or "has any value".

To save conditions, click **Save** at the bottom of the widget.

## Predicate definitions

Predicates are operators used by the Split Based On... widget to evaluate the given value against a comparison value and determine what transition should be used.

Studio conditions are not case-sensitive and automatically trim leading and trailing whitespace characters.

**Equal To**

The values are equivalent.

**Not Equal To**

The values are not equivalent.

**Matches Any Of**

Value is equivalent to any of the values in the given list.

**Does Not Match Any Of**

Value is not equivalent to any of the values in the given list.

**Is Blank**

Value contains only white-space characters or is blank.

**Is Not Blank**

Value contains characters that are not white-space characters.

**Regex**

Value matches the regex pattern specified. For more information on how to use regular expressions, consult a regex tutorial, such as this [external tutorial](https://medium.com/factory-mind/regex-tutorial-a-simple-cheatsheet-by-examples-649dc1c3f285).

> \[!NOTE]
>
> Omit leading and trailing slashes with the **Regex Predicate**. Matching is case insensitive, and will only match if the provided regular expression **matches the entire string**.

**Contains**

Value contains the value given. For example, `aab` contains `aa` and `A`.

**Does Not Contain**

Value does not contain the value given.

**Starts With**

Value starts with the given value. For example, ` Hoot` starts with `hoo`.

**Does Not Start With**

Value does not start with the value given.

**Less Than**

Value is less than the number provided. Operator does not perform comparisons on letters.

**Greater Than**

Value is greater than the number provided. Operator does not perform comparisons on letters.

**Is Before Time**

Value is before the time provided. Times must be in 24-hour notation (HH:MM) where single digit values are written with a leading 0.

**Is After Time**

Value is after the time provided. Times must be in 24-hour notation (HH:MM) where single digit values are written with a leading 0.

**Is Before Date**

Value is before the date provided. Dates must be in the format YYYY-MM-DD where single digit values are written with a leading 0.

**Is After Date**

Value is after the date provided. Dates must be in the format YYYY-MM-DD where single digit values are written with a leading 0.

## Predicate examples

Here are some usage examples for predicates.

| Subject                           | Subject Value | Predicate      | Value        | Output |
| --------------------------------- | ------------- | -------------- | ------------ | ------ |
| \{\{flow.data.appointment\_date}} | 2019-08-12    | Is After Date  | 2017-09-04   | True   |
| \{\{flow.data.appointment\_time}} | 17:00         | Is Before Time | 16:35        | False  |
| \{\{flow.data.reward\_points}}    | 900           | Greater Than   | 1000         | False  |
| \{\{flow.data.first\_name}}       | Twilio        | Is Blank       | N/A          | False  |
| \{\{trigger.message.Body}}        | YES           | Matches Any Of | yes,yeah,yup | True   |
| \{\{flow.data.survey\_result}}    | 6             | Regex          | \[1-5]       | False  |

## Example: SMS Reminders Flow

In the following example, we ask the user if they would like to receive reminders. Following the [Send & Wait For Reply widget](/docs/studio/widget-library/send-wait-reply) is a Split Based On... widget that evaluates the user's response.

The three conditions are:

1. The user enters **Y (YES)** when prompted.
2. The user enters **N (NO)** when prompted.
3. The user enters another value that is not Y or N **(NO MATCH)**.

| Subject                                       | Predicate | Value          | Transition         |
| --------------------------------------------- | --------- | -------------- | ------------------ |
| `{{widgets.reminders_response.inbound.Body}}` | Equals    | Y              | REMINDERS\_CONFIRM |
| `{{widgets.reminders_response.inbound.Body}}` | Equals    | N              | REMINDERS\_OPTOUT  |
| `{{widgets.reminders_response.inbound.Body}}` | Equals    | 123 (NO MATCH) | REMINDERS\_OPTOUT  |

The following screenshot shows the example SMS Reminders Flow. The **Yes** condition transitions to the [Send SMS widget](/docs/studio/widget-library/send-message) **reminders\_confirm**, and the **No** and **No Condition Matches** conditions transition to the Send SMS widget **reminders\_optout**.

![Flowchart of reminder prompt asking for yes or no, leading to opt-out or confirmation.](https://docs-resources.prod.twilio.com/14fbd5f81be93dcd3c2914d0d4f3df0e06f9e09d1877851a39abb556b71a9139.png)

## Learn more

* [Widget transitions](/docs/studio/user-guide/get-started#define-widget-transitions)
* [Tutorial: How to build an SMS Survey](/docs/studio/tutorials/how-to-conduct-a-survey)
