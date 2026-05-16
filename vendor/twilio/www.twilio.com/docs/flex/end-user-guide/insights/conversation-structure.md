# Conversation Structure

> \[!IMPORTANT]
>
> Flex Insights (also known as Historical Reporting) is currently available as a public beta release and the information contained in the Flex Insights documentation is subject to change. This means that some features are not yet implemented and others may be changed before the product is declared as generally available. Public beta products are not covered by a Twilio SLA.
>
> Any reference to "Historical Reporting", "Flex Insights API", "Flex Insights Historical Reporting", or "Flex Insights Historical Reporting API" in the Flex Insights documentation refers to Flex Insights.

Understand how Flex Insights splits voice conversations into segments and how it calculates handling time. Conversations are the backbone of the Flex Insights [Analytics Data Model](/docs/flex/end-user-guide/insights/data-model).

## Structure

A `Segment` is an atom of any conversation. A segment represents an interval in time dedicated to certain phases during a `Conversation`.

`Segments` can be of different `Kinds`:

* `Queue Segment` (`Kind`=`Queue`)

  * This segment captures the time from when a customer entered the queue until they left that queue. Queue time is captured during this segment.
* `Conversation Segment` (`Kind`=`Conversation`)

  * This segment defines the time from when a customer is connected to an agent until the communication ends or they are transferred elsewhere.

A `Conversation` represents communication between one customer and any agents with whom they interact within the contact center.

A conversation where one customer speaks to one agent will be composed of (at least) two segments:

![Timeline showing queue, ring, talk, and wrap-up times for a conversation.](https://docs-resources.prod.twilio.com/df0749515b8443c2b4a4040093bebcd37a089a2d483a45227c117462bba43690.png)

In a call with one cold transfer, the conversation will typically have four segments (2 of Queue & 2 of Conversation kind segments):

![Timeline showing queue, ring, talk, and wrap-up times with transfer between segments.](https://docs-resources.prod.twilio.com/ebacc1d9217cb931e1ea4abbc93e25165283f36cf09f4cf7f6535e0277ee30a6.png)

Conversations can be further organized into `Cases`, `Projects`, `Campaigns` and `Initiatives`, which provide higher-level groupings of Conversations. For more details, check out the Flex Insights [Analytics Data Model](/docs/flex/end-user-guide/insights/data-model).

## Handling and Experience Time

`Handling Time` is the time an agent spends handling a customer task, including wrap-up work that happens after the task is completed.

* `Handling Time` - The time agents spend handling a customer task.
* `Experience Time` - The time a customer spends trying to resolve their issue, including time spent in queue and time communicating with your agents.

Depending on the communication channels involved, all handling and experience time information may not be available.

### Outbound calls

Your agents will make outbound calls when they do cold calling, warm calling, or reach out to your customers.

![Bar chart showing ring, talk, and wrap up times within handling and experience time.](https://docs-resources.prod.twilio.com/0a51db74feec766483e6f68cf8b8950856b62e4a7b7defc92b969f0b69c14c38.png)

`Handling Time` of an *Outbound Conversation* is the sum of `Ring Time`, `Talk Time` and `Wrap Up Time`.

We include `Ring Time` in the total handling time, as your agent is blocked from other activities when trying to reach customers.

If a dialer places the call, the time the dialer spends ringing is not included in `Ring Time` and therefore not included in `Handling Time`.

### Inbound Calls

When a customer calls your contact center, they can go through a sequence of steps depending on your infrastructure.

Usually, the following activities occur. A Twilio phone number is dialed and, depending on the phone number's configuration, the customer can go to an [IVR](/docs/glossary/what-is-ivr). If the customer was not able to solve their problem, they queue up to wait for an available agent. This all happens before the customer speaks with an agent.

![Timeline showing IVR, Queue, Ring, Talk, Wrap Up, Handling, and Experience times.](https://docs-resources.prod.twilio.com/c205afa15b0be264b0cb523652cb16c4c8445d20e2d01c7684bb4b5f33fe80fd.png)

`Handling Time` for *inbound conversations* does not include `Ring Time` as the agent is not blocked at the moment. `Handling Time` starts when the customer connects to an agent.

> \[!NOTE]
>
> Ring Time is part of Queue Time in Flex Insights. Queue time ends when a call is answered by an agent.

### IVR Only

**IVR Only** conversations are conversations where customers managed to solve their request using an IVR application or they were not successful and just gave up before entering a queue.

![Bar chart showing Ring Time and IVR Time with Experience Time below.](https://docs-resources.prod.twilio.com/399b86a0418b7bd01d6a5b2c70c9d0b056f8485a11e691f5c87ba19223501ea5.png)

`Handling Time` for IVR-Only conversations is always `zero`.

> \[!NOTE]
>
> Time spent in an IVR is not captured in Flex Insights by default. In order to surface IVR related metrics, you'll need to pass them through [TaskRouter events](/docs/taskrouter/how-taskrouter-works) as attributes.

### Cold (blind) transfers

If an agent cannot handle a customer request for some reason, they can forward it to another agent or a queue.

For example, a Level 1 support agent can transfer customers with very technical questions to the Level 2 support queue.

![Timeline showing queue, ring, talk, and wrap up times with a transfer between segments.](https://docs-resources.prod.twilio.com/4c692b72378aae8316aedc27243b52afde6dfe16b7325be363b19b765159b923.jpg)

A `conversation` with a transferred call normally has 4 Segments.

**Handling Time** represents how much time your agents spend handling the customer's inquiry. The Handling Time of this conversation is the sum of the Handling Times of two conversation segments (where `Kind`=`Conversation`), even when the Handling Times overlap because they are handled by two agents.
