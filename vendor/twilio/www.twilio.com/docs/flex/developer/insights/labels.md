# Label Data for Flex Insights

> \[!IMPORTANT]
>
> Flex Insights (also known as Historical Reporting) is currently available as a public beta release and the information contained in the Flex Insights documentation is subject to change. This means that some features are not yet implemented and others may be changed before the product is declared as generally available. Public beta products are not covered by a Twilio SLA.
>
> Any reference to "Historical Reporting", "Flex Insights API", "Flex Insights Historical Reporting", or "Flex Insights Historical Reporting API" in the Flex Insights documentation refers to Flex Insights.

Labels are a collection of pre-existing keys for your data that allow you to use Historical Reporting resources more efficiently. You can use up to 10 custom labels for conversations, 3 custom labels for customers and 3 custom labels for agents. In task attributes, these are named `conversation_label_x`, `customer_label_x` and `agent_label_x`, where X is a number for the attribute.

| **Label**    | **Maximum Number** | **Example**            |
| ------------ | ------------------ | ---------------------- |
| Conversation | 10                 | `conversation_label_1` |
| Customer     | 3                  | `customer_label_1`     |
| Agent        | 3                  | `agent_label_1`        |

## Context: How Historical Reporting Works

Historical Reporting has a limit of containing 2 billion unique attribute values. This includes any value used in any dataset. If the same value is using multiple times in different records or in different datasets it counts as one towards this limit. When you provide custom data to Historical Reporting you are also consuming unique values from this limit. Values stored as labels do not count towards the 2 billion unique values limit.

For attributes that contain limited set of values such as Direction, Channel, or Team, the limit is not an issue. However, attributes that contain values that are unique for many conversation or customers consume this limit much faster. Reaching this limit may lead to Flex Insights being unable to load additional data into the affected Workspace. In order to prevent this, Flex Insights may delete older data before it reaches its default retention.

Since labels don't count toward the unique attribute value limit, they're useful for capturing IDs and similar values (like CallSID, ChannelSID, or an external ID of a customer.)

## Using Labels

### Label Only for Unique Values

When using the label only, as shown in the code sample below, Flex Insights will use segment ID as the attribute value. We recommend using this for high cardinality attributes, such as IDs.

```json
{
    "conversation_label_1": "ID-123456789"
}
```

The example above is equivalent to providing this in task attributes:

```json
{
    "conversation_attribute_1": "<segment ID>",
    "conversation_label_1": "ID-123456789"
}
```

All reports segmented by `conversation_attribute_1` will show individual segments.

### Attribute Only for Categorical Values

When using the attribute only, Flex Insights will use the same value for the attribute label. We recommend using this to bucket conversations and customers into categories. The number of categories can be in thousands or millions. As long as they are not almost unique per conversations they will have limited impact on the 2 billion unique values limit.

```json
{
    "conversation_attribute_1": "Green Category"
}
```

The example above is equivalent to providing this in task attributes:

```json
{
    "conversation_attribute_1": "Green Category",
    "conversation_label_1": "Green Category"
}
```

### Attribute and Label for User Friendly Reporting

You can provide both attribute and label and Flex Insights will push these as you provide them into Flex Insights. Providing the attribute and the label are useful if the attribute value is a fairly technical text (such as category ID in your system) and you want to have more user-friendly labels in reports, instead of showing the ID. Another possible use is to have label in an alternate language.

```json
{
    "conversation_attribute_1": "Very technical representation of a category",
    "conversation_label_1": "Human readable category name"
}
```

## Limitations

* If the same label is used for multiple attribute values the label will be shown multiple times in filters.
* Labels cannot be used for segmenting reports. The report would be still segmented by the underlying attribute value. This means that if you use the same label value for multiple attribute value you will see multiple metrics with the same label in reports.

## Next Steps

* Continue [organizing your TaskRouter Data](/docs/flex/developer/insights/enhance-integration) to enhance your Insights implementation
* Learn more about the basics of [implementing a TaskRouter Workspace](/docs/taskrouter)
* Learn more about how the [Flex Insights Data Model](/docs/flex/end-user-guide/insights/data-model) meets the analytics needs of your contact center
