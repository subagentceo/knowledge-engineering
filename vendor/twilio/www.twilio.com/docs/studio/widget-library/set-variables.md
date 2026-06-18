# Set Variables widget

Studio widgets represent various parts of Twilio's functionality that you can combine in your Studio Flow to build out robust applications that don't require you to do any coding.

> \[!NOTE]
>
> New to Twilio Studio? Check out our [Getting Started guide](/docs/studio/user-guide/get-started).

The **Set Variables** widget allows you to save key/value pairs as variables that are available to the global context of your Studio Flow throughout its execution, meaning that they can be used across multiple widgets within a given Flow.

![Studio Set Variables widget with key 'bar' and value 'foo'.](https://docs-resources.prod.twilio.com/7a6907a39359b7ce2497a943f8c78c2b6fdd5eafc8c87a6a6739786d08666ee0.png)

Variables you set through this widget will be accessible throughout your Flow via other widgets under the key `{{flow.variables.<key>}}`. This allows you to dynamically update your variables throughout the Flow's execution. For instance, you can use variables to increment counters or change appointment times.

## Configuration for Set Variables

The Set Variables widget must have at least one key and one value to function properly. Variables can have static values like a single number or a string, or dynamic values set via the [Liquid templating language](/docs/studio/user-guide/liquid-template-language).

| Name                 | Description                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                   | Example         | Default |
| -------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | --------------- | ------- |
| Key                  | The name of this variable                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                     | favorite\_color | N/A     |
| Value                | The value tied to the variable's key                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                          | green           | N/A     |
| Parse as JSON object | Select this option when your variable or parameter contains a JSON object. This allows the variable to be properly interpreted as a JSON object so you can reference its attributes in your flow. <br /><br /> When this box is checked, you can: <br /> - Set or pass an existing JSON object and reference its members as variables <br /> - Set a literal JSON string (Using a Liquid reference to a JSON string, or a mixture of JSON and Liquid) and access it as an object <br /><br /> Note that by default, subflow parameters are parsed as strings. | N/A             | N/A     |

Once set, your variable will be accessible in Liquid via `{{flow.variables.<key>}}`. A few notes on variables:

* Variable names are case sensitive. `Foo` is a different variable than `foo`.
* The same key may be set in different widgets. This allows you to update a value.
* The key itself cannot be a Liquid variable, but the value can be a Liquid variable
* You can define multiple key/value pairs within one Set Variables widget

For more in-depth information on working with variables in your Studio Flow, please [see this user guide](/docs/studio/user-guide/get-started#use-variables-in-your-studio-flow).

## Set Variables Transitions

These events trigger transitions from this widget to another widget in your Flow. For more information on working with Studio transitions, [see this guide](/docs/studio/user-guide/get-started#define-widget-transitions).

| Name | Description                                                                |
| ---- | -------------------------------------------------------------------------- |
| Next | Continues the execution of your Flow once the specified variables are set. |

## Example: a Flow with a variable counter

The following Flow uses the Set Variables widget to set up a counter. An incoming call triggers the Flow. When the Flow first starts, the variable `num` is created and its initial value is 0. The Flow loops until the `num` variable is equal to 3 and then exits.

The Flow also uses the [Say/Play widget](/docs/studio/widget-library/sayplay) to speak the value of the `num` variable to the caller, and the [Split Based On... widget](/docs/studio/widget-library/split-based-on) to evaluate whether the Flow should continue looping or exit, based on whether or not the counter is greater than 2.

![Twilio Studio flow with triggers, set variables, say play, and split widgets.](https://docs-resources.prod.twilio.com/1e2a51dd8af423eb01e53f7e67b93ceb46709d84ac550408de13028eaa89292e.png)

Below is the configuration for the Set Variables widget:

![Set variables configuration with widget name 'set\_variables\_1' and variable 'num' increment logic.](https://docs-resources.prod.twilio.com/1afbf9eac35fab8baf50bba0ffc35e642ea72f2b07cb9f7ff4a5346bbc2ad574.png)

The key is `num` and the value is a Liquid Templating Language expression:

```liquid
{% if flow.variables.num %}
  {{flow.variables.num | plus: 1}}
{% else %}
  0
{% endif %}
```

The expression checks to see whether the `num` variable has already been created. If it has, it then increments the value by one. If it hasn't been created yet, it sets the initial value to 0.

## Learn More

Now that you know the basics of the Set Variables widget, you may want to dig into the [Liquid Templating Language:](/docs/studio/user-guide/liquid-template-language)

* Learn [how to use Liquid with Studio](https://help.twilio.com/hc/en-us/articles/4413699936411-How-do-I-use-Liquid-with-Twilio-Studio-)

We also have step-by-step tutorials that will show you how to use and evaluate variables in Studio:

* [Build a Chatbot with Studio](/docs/studio/tutorials/how-to-build-a-chatbot)
* [Conduct an SMS Survey with Studio](/docs/studio/tutorials/how-to-conduct-a-survey)

Let's build something amazing.
