# Format Metrics in Flex Insights Reports

> \[!IMPORTANT]
>
> Flex Insights (also known as Historical Reporting) is currently available as a public beta release and the information contained in the Flex Insights documentation is subject to change. This means that some features are not yet implemented and others may be changed before the product is declared as generally available. Public beta products are not covered by a Twilio SLA.
>
> Any reference to "Historical Reporting", "Flex Insights API", "Flex Insights Historical Reporting", or "Flex Insights Historical Reporting API" in the Flex Insights documentation refers to Flex Insights.

Use the **Number format editor** to configure how numbers appear in your reports. You can round numbers, accommodate regional settings, add currency symbols, adjust colors, or append numbers with sets of characters.

## Access the number format editor

To access the **Number format editor**, click **Edit** in the Detail column of a metric.

![Metrics panel showing handled segments with edit option highlighted.](https://docs-resources.prod.twilio.com/8f94a0e2b1a6dd38b91e249e875aaa9ba0d89433e72860f61b659515a63a3c62.png)

Then apply formatting syntax in the custom number formats field.

![Number format editor with templates and formatted number preview.](https://docs-resources.prod.twilio.com/15e86d67bb85314f7a47d138eb94e0a5b4fef84e154f7b18ae5a562fb8d53153.png)

## Samples

You can use built-in templates for number formatting, or any of the examples below by copy-pasting this sample code directly into your number format editor:

Raw integer number:

```text
0
```

Natural integer with thousand separators such as `1,234`  or `12,345,678` :

```text
# ,##0
```

One decimal number with thousand separators (`1,234.5`):

```text
# ,##0.0
```

Two decimal number with thousand separators (`1,234.56`):

```text
# ,##0.00
```

## Large numbers

This shortens large numbers and makes them easier to read - for example, `4.6B``5.8M`, `145.4K` . Numbers below one thousand are shown as exact integers.

General purpose large number:

```text
[>=1000000000]#,,,.0B;
[>=1000000]#,,.0M;
[>=1000]#,.0K;
[>=0]#,##0;
[<=-1000000000]-#,,,.0B;
[<=-1000000]-#,,.0M;
[<=-1000]-#,.0K;
[<0]-#,##0
```

## Duration

Duration format will take a number (in seconds) and show it in hours, minutes, and seconds.\
Duration in hours will look like `1h 23:45`  or `12:34`  when shorter than one hour.

```text
[>=3600]{{{3600||#}}}h {{{60|60|00}}}:{{{|60|00}}};
[>=0]{{{60|60|00}}}:{{{|60|00}}};
[<0]-{{{60|60|00}}}:{{{|60|00}}};
```

## Percentages

Percentages convert numbers in the range `0.0`  to `1.0`  into the more natural percentage format `0%`  to `100%` . Use the below samples for the format you need.

Integer percentages:

```text
0%
```

One decimal percentages:

```text
0.0%
```

Two decimals percentages:

```text
0.00%
```

## Colors

You can use web colors to change the text and background color in your Flex Insights tables. You can use [HTML color codes](https://html-color-codes.info/) to adjust your colors.

You may wish to use the same color with the same measure to help your users quickly orient in a table. You can also combine colors with conditional formatting to change color depending on the value of a measure.

The example below shows how to set the same color for the measure text, in any situation:

```text
[color=fecdd2]0;
```

The example below shows how to change the background cell color of a measure.

```bash
[backgroundcolor=fecdd2][color=b71c1c]0;
```

## Conditional formatting

You can show different number formats depending on the value of the measure. This allows you to show positive/negative number differently or handle special cases.

To format numbers, set your conditions in square brackets followed by the format and separated by a semicolon from the next format. The first condition that matches will be used. We recommend that you include a default value at the very end.

The following example shows how to display dash when there is no value for the metric.

```text
[=null]—;
0
```

The example below shows that you can use custom text instead of the original value like the "zero" in the example below.

```text
[=null]—;
[>0]0;
[=0]zero;
(0)
```

When you use conditions for percentage measures such as `Abandoned Conversations %` or `Silence %`, use decimal numbers instead of percents, e.g., use 0 instead of 0% and 1 instead of 100%. The example below shows a condition for more than 10% and more than 5%.

```text
[>0.1]Over ten percent;
[>0.05]Over five percent;
Under five percent
```

When you use conditions for duration measures such as `Talk Time` or `Activity Time`, use seconds in the conditions.

The example below shows a condition for one hour (3600 seconds) and a condition for one minute (60 seconds).

```text
[>3600]Over one hour;
[>60]Over one minute;
Under one minute
```

For more advanced number formatting techniques, please see the following articles:

[Formatting Numbers in Reports](https://help.gooddata.com/doc/enterprise/en/dashboards-and-insights/formatting-numbers-in-insights)

[Conditional Number Formatting](https://help.gooddata.com/doc/enterprise/en/dashboards-and-insights/conditional-number-formatting)
