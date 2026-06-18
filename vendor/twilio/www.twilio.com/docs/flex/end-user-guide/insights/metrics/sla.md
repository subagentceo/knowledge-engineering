# SLA Metrics

> \[!IMPORTANT]
>
> Flex Insights (also known as Historical Reporting) is currently available as a public beta release and the information contained in the Flex Insights documentation is subject to change. This means that some features are not yet implemented and others may be changed before the product is declared as generally available. Public beta products are not covered by a Twilio SLA.
>
> Any reference to "Historical Reporting", "Flex Insights API", "Flex Insights Historical Reporting", or "Flex Insights Historical Reporting API" in the Flex Insights documentation refers to Flex Insights.

Flex Insights Historical Reporting enables to report on SLA in multiple ways that can be combined depending on the needs of the organization.

## **High Level**

Insights provides a very basic definition of SLA by default. The SLA definition is the same for all customers and is applied across all queues, channels, etc. The reason for this is that the SLA metric is subject to updates and any custom changes would be overwritten with future updates to the built-in content.

The analytics language offers incredible flexibility in how SLA is defined in an organization or individual organizational units. Thanks to analytics language support for nested metrics, you can build up an SLA calculation and make it as unified or as specific as needed.

## **Changing SLA Preferences**

**Suitable for smaller contact centers focused on single channel and having one SLA standard.**

The built-in SLA metric has two preferences that can be adjusted by [sending a request to our support team](https://help.twilio.com). These changes apply to all conversations and are not specific for individual queues, channels or other attributes.

> \[!NOTE]
>
> These SLA preferences apply to Flex Insights Historical Reporting only. If you want to modify SLA preferences for the Real-time Queues View, see [Real-Time Queues View](/docs/flex/end-user-guide/real-time-reporting/real-time-queues-view).

Pros:

* Straightforward set up
* Does not require creating custom metrics

Cons:

* Applies the same SLA calculation across all conversations

| **Preferences**           | **Default Value (in seconds)** | **Description**                                                                                                                                                                                                            |
| ------------------------- | ------------------------------ | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| SLA Threshold             | 60                             | All conversations handled within this threshold are considered to be within SLA.<br /><br />**This is the default value only in Historical Reporting. The default value may be different for real-time queue monitoring.** |
| Short Abandoned Threshold | 5                              | Abandoned calls under this threshold do not negatively impact SLA.<br /><br />**This is the default value only in Historical Reporting. The default value may be different for real-time queue monitoring.**               |

## **Custom SLA Metrics for an Organization Unit**

**Suitable for large organizations where individual departments, teams or other organizational units want to watch SLA differently and independently on other units. Each unit can define their own way to calculate SLA.**

You can define custom SLAs for individual queues, channels or specific use cases. There are custom metrics that you can create in a business-friendly analytics language.

Pros:

* Requires only basic skills in the analytics language
* Very flexible
* Any built-in metric or attribute can be used in the SLA calculation
* Customers can provide additional metrics and attributes via TaskRouter task attributes that can be used in the SLA calculation

Cons:

* Multiple SLA definitions may exist

### **Example - Custom Metric for Outbound Dialer**

Example of custom SLA used for reporting on a custom implementation of the outbound dialer to ensure our agents handle them within legal constraints.

Sample metric in which we say that all Outbound calls initiated by a dialer are included in the calculation of SLA:

```sql
Segments Subject to Outbound SLA = SELECT Segments WHERE Direction = (Outbound) AND Initiated By = Dialer
```

Metric for segments that are within SLA:

```sql
Segments within SLA = SELECT Segments WHERE Waiting Time < 5 AND Direction = (Outbound) AND Initiated By = Dialer
```

Metric that gives the actual SLA based on the previous metrics:

```sql
Outbound SLA = SELECT Segments within SLA / Segments Subject to SLA
```

## **Custom SLA Metric for the Entire Organization**

**Suitable for large organizations where you want to monitor all departments, teams or other organizational units using a single metric.**

For convenience in reporting many customers opt for having a single SLA metric that adapts based on what conversations it gets used.

Pros:

* One metric that can be used across the entire organization
* Very flexible
* Any built-in metric or attribute can be used in the SLA calculation
* Customers can provide additional metrics and attributes via TaskRouter task attributes that can be used in the SLA calculation

Cons:

* Definition of SLA is more complex and requires collaboration across organizational units

### **Example - SLA Based on Queue and Channel**

In this example, we use different thresholds for VIP queue where our most important customers land, we use 60 seconds waiting time as a target for all calls and leave 3 minutes (180 seconds) target for any other scenario - typically other channels.

Metrics to adjust target waiting time based on the queue and the channel:

```sql
SLA Threshold = SELECT CASE 
 WHEN Queue = VIP THEN 30,
 WHEN Channel = Call THEN 60,
 ELSE 180 END
```

Metrics for adjusting short abandons based on the queue and the channel:

```sql
Short Abandoned Threshold = SELECT CASE 
 WHEN Queue = VIP THEN 5,
 WHEN Channel = Call THEN 20,
 ELSE 30 END
```

We can structure the SLA calculation, so it is easier to read and maintain. The first metric counting the segments that are subject to SLA:

```sql
Segments Subject to SLA = SELECT Segments WHERE Waiting Time > Short Abandoned Threshold OR Abandoned = No
```

Metric for segments that are within SLA:

```sql
Segments within SLA = SELECT Segments WHERE Waiting Time < SLA Threshold
```

Metric that gives the actual SLA based on the previous metrics:

```sql
SLA = SELECT Segments within SLA / Segments Subject to SLA
```

## **Programmable Management of Service Level**

Programmable Management of Service Level is the most flexible option. The option is suitable for environments where conditions for deciding whether a conversation was handled within SLA or not depends on very dynamic factors.

Pros:

* Extremely flexible
* The SLA calculation can be influenced by dynamic factors and evolve over time
* Metrics definitions in Flex Insights require limited skill and no adjustments once first defined

Cons:

* Requires programmatically set Twilio TaskRouter attributes and thus development skills
* Changes may require development

### **Pass Information in TaskRouter Attributes**

Flex Insights consumes conversation tasks attributes that may contain a wide set of information supplied by the customer programmatically. Attribute Service Level is available for customers to provide SLA-related information.

Customers programmatically set the attribute to the desired value in their implementation. The implementation can use any information at hand to decide what value to set.

```json
"task_attributes": {
  "conversations" : { 
    "service_level" : "Compliant" 
  }
}
```

The value of the attribute is not restricted and can contain any text. Example values customers use are the following:

| **Value**       | **Description**                                                                                                            |
| --------------- | -------------------------------------------------------------------------------------------------------------------------- |
| Compliant       | The conversation was handled within the service level or abandoned in a timeframe that does count as within service level. |
| Failed          | The conversation was not handled within a service level.                                                                   |
| Short Abandoned | The conversation is considered short abandoned and should not have a negative impact on SLA.                               |
| Not Applicable  | The conversation should not influence SLA in any way.                                                                      |

The above possible values are just examples. You can name the values differently or use more values for more granularity such as having multiple tiers for SLA targets.

### **Custom Metrics**

You can create custom metrics based on the Service Level attribute. These metrics can be based solely on the Service Level attribute or combine it with any other conditions.

Metric that gives the number of segments that is used as a base for SLA calculation. You can decide which categories you want to exclude:

`Segments Subject to SLA = SELECT Segments WHERE Service Level NOT IN (Not Applicable, Short Abandoned)`

Metric that gives the number of segments that are within SLA:

`Segments within SLA = SELECT Segments WHERE Service Level IN (Compliant)`

Metric that gives the actual SLA based on the previous metrics:

`SLA = SELECT Segments within SLA / Segments Subject to SLA`

### **Use of the Custom Metrics**

The custom metrics can be used as built-in metrics to create reports and dashboards using drag and drop report and dashboard builder.
