# Hold Time Metric

> \[!IMPORTANT]
>
> Flex Insights (also known as Historical Reporting) is currently available as a public beta release and the information contained in the Flex Insights documentation is subject to change. This means that some features are not yet implemented and others may be changed before the product is declared as generally available. Public beta products are not covered by a Twilio SLA.
>
> Any reference to "Historical Reporting", "Flex Insights API", "Flex Insights Historical Reporting", or "Flex Insights Historical Reporting API" in the Flex Insights documentation refers to Flex Insights.

The built-in metrics Hold Time shows the total time in seconds a customer spent on holds that started in that segment. If there are multiple hold periods in the call Hold Time is the sum of all the hold periods durations.

Built-in metrics based on Hold Time:

* **Average Hold Time.** Arithmetical average Hold Time of segments. Segments without hold have no influence on the average.
* **Median Hold Time.** Median Hold Time of segments. Segments without hold have no influence on the median.
* **Conversations with Hold.** Number of conversations that have a hold in any segment.
* **Conversations with Hold %.** Percentage of conversations that have a hold in any segment out of all handled conversations.

Users can create their own metrics on top of the base Hold Time. Users have to have editor permissions to create custom metrics.

> \[!NOTE]
>
> The Hold Time metric may appear later than other Flex Insights metrics.

## Building Reports

The hold metrics can be segmented by every attribute that makes sense for a handled segment including but not limited to:

* Agent
* Direction
* External Contact (contact center phone number for call conversations)
* Outcome
* Queue
* Team

As with any other metrics the hold time can be segmented and filtered by custom provided attribute.

## Hold Time and Talk Time

Hold Time does not have any influence on Talk Time. Hold Time may entirely or partially overlay with Talk Time. Depending on when the hold period ended. This may lead to segments that have longer Hold Time than Talk Time.

In both examples below the Hold Time for Segment 1 is 50 seconds and Talk Tim is 1 minute and 30 seconds. In both cases the Hold Time is the sum of all Hold Times for holds that started during the Segment 1:

![Timeline showing Segment 1 with 1:30 talk time and two hold times of 0:30 and 0:20.](https://docs-resources.prod.twilio.com/c6d938a07fed27729a187d19f76fbd58ac766778d788e8cf8fe6b2c51bc92352.png)

*Hold Time for Segment 1 is sum of 30 and 20 seconds as both hold periods happen during Segment 1*

![Flex Insights - Hold After Segment.](https://docs-resources.prod.twilio.com/a04caf895e924519030d8e3cb5dda116dc33df84341dc313a9730a6f15800de3.png)

*Hold Time for Segment 1 is sum of 30 and 20 seconds as both hold periods started during Segment 1*

## Conversations with Transfers and Conferences

Hold Times in conversations with transfers may have some unexpected behavior. We attribute the entire hold time period to the segment in which it started. More specifically, the hold time is attributed to the oldest segment that is still active - a segment that is not yet completed and is not in wrap up.

Depending on implementation and when the customer is unhold, Hold Time may also contain time the customer spent in a queue that follows the segment in which the customer was put on hold by an agent.

![Timeline showing Segment 1 talk time of 1:30 with hold time of 0:30, and Segment 2 talk time of 0:50 with hold time of 0:20.](https://docs-resources.prod.twilio.com/b3fe3fc1b492af635eb43f01f8f2f69f72d4e0462cd9d207460934d8f953c48c.png)

*Hold Time of Segment 1 is 50 seconds, Hold Time for Segment 2 is 20 seconds*
