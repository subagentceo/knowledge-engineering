# Time of Day Routing for TaskRouter

TaskRouter supports time of day expressions that can be used in the Workflow in both Filter and Target Worker Expressions. When evaluating the expressions TaskRouter will fill in the attributes with appropriate values and continues to evaluate the entire expression.

The supported time of day expressions are as follows:

## taskrouter.currentTime

This attribute contains current time as an integer in HHMM format with the time represented in 24hr clock in UTC.

Use the following expression to check if the current time is between 8 AM UTC to 6:30 PM UTC,

```sql
taskrouter.currentTime > 0800 AND taskrouter.currentTime < 1830
```

## taskrouter.currentHour

This attribute contains the current hour as string in `HH` format, with the hour represented in 24-hour time notation in UTC.

Use the following expression to check if the current hour is between 8 AM UTC to 6 PM UTC,

```sql
taskrouter.currentHour > 8 AND taskrouter.currentHour < 18
```

## taskrouter.currentMin

This attribute contains current minute with time represented in UTC format.

```sql
taskrouter.currentMin > 10 AND taskrouter.currentMin < 50
```

## taskrouter.dayOfWeek

This attribute contains the day of the week as string in time represented in UTC format.

| Day of the Week | taskrouter.dayOfWeek |
| --------------- | -------------------- |
| Monday          | Mon                  |
| Tuesday         | Tue                  |
| Wednesday       | Wed                  |
| Thursday        | Thu                  |
| Friday          | Fri                  |
| Saturday        | Sat                  |
| Sunday          | Sun                  |

## Example

In this example we are checking for different open and closing hours based on day of the week and if place tasks into appropriate queues

```json
{
    "task_routing": {
        "filters": [
            {
                "targets": [
                    {
                        "queue": "WQ57cab415732dec475f600c75eab44cc9"
                    }
                ],
                "filter_friendly_name": "MyFilterName",
                "expression": "(taskrouter.dayOfWeek IN ['Mon', 'Tue', 'THU'] 
                                AND taskrouter.currentTime > 800 
                                AND taskrouter.currentTime < 1730) 
                            OR 
                                (taskrouter.dayOfWeek IN ['Wed', 'Fri'] 
                                AND taskrouter.currentTime > 900 
                                AND taskrouter.currentTime < 1830) 
                            OR 
                                (taskrouter.dayOfWeek = 'Sat' 
                                AND taskrouter.currentTime > 1100 
                                AND taskrouter.currentTime < 1530)"
            }
        ],
        "default_filter": {
            "queue": "WQ78e472fe73068cf03c533099dbaa453b"
        }
    }
}
```
