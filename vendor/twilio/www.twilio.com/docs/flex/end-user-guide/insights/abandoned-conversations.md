# Track Abandoned Conversations in Flex Insights

> \[!IMPORTANT]
>
> Flex Insights (also known as Historical Reporting) is currently available as a public beta release and the information contained in the Flex Insights documentation is subject to change. This means that some features are not yet implemented and others may be changed before the product is declared as generally available. Public beta products are not covered by a Twilio SLA.
>
> Any reference to "Historical Reporting", "Flex Insights API", "Flex Insights Historical Reporting", or "Flex Insights Historical Reporting API" in the Flex Insights documentation refers to Flex Insights.

Abandoned conversations are those where a customer did not talk to an agent because the customer disconnected while waiting in a queue.

Abandoned conversations may occur because the customer hung up or disconnected due to technical issues (for example, a lost signal while calling from a mobile device). Abandons can happen either in a queue that a customer enters from an IVR or during a transfer to another queue. Abandoned conversations do not include calls disconnected at any point during the IVR flow.

## Abandoned Metrics

Below you can find a list of built-in metrics you can start using for abandoned contacts analysis.

### Abandoned Conversations

`Abandoned Conversations` is the number of conversations in which customers and agents have not been connected with each other.

```sql
SELECT IFNULL(COUNT(Conversation,Segment), 0) 
WHERE Abandoned = Yes AND Abandoned Phase <> Voicemail
```

### Abandoned Conversations %

`Abandoned Conversations %` is the ratio of `Abandoned Conversations` to total offered conversations:

```sql
SELECT Abandoned Conversations / Conversations including Abandoned
```

### Abandoned Segments

`Abandoned Segments` reflects the number of segments in which customers and agents have not been connected with each other. This metric is useful if you have calls with transfers, and abandons may happen during a transfer to another queue. In this situation you'll be looking at abandons on the level of segments, which will help you measure abandons for specific queues.

> \[!NOTE]
>
> Wondering what's the difference between **Segment** and **Conversation**? Please check out the [Conversation Structure](/docs/flex/end-user-guide/insights/conversation-structure) article.

```sql
SELECT IFNULL(COUNT (Segment), 0) 
WHERE Abandoned = Yes AND Kind = Queue AND Abandoned Phase <> Voicemail
```

### Abandoned Segments %

`Abandoned Segments %` is the ratio of `Abandoned Segments` to total offered segments:

```sql
SELECT Abandoned Segments / Segments including Abandoned
```

### Abandon Time

`Abandon time` captures the time a customer waited in a queue before hanging up. The abandon timer begins the moment the customer enters the queue, or at the end of the previous segment when transferring to another queue. Abandon time equals `Queue time` in the case of abandoned conversations.

```sql
SELECT Abandon Time
```

## Abandoned Attributes

You can use the following attributes in Insights to segment numeric metrics:

### Abandoned

You can identify abandoned conversations and segments by the `Abandoned` attribute. `Abandoned` may have the following values:

#### Inbound

Inbound abandoned conversations are those where a customer tried to call you but you were not able to handle them:

* **No** - The customer was connected to an agent.
* **Yes** - The customer gave up while waiting for an agent and they did not ask for a callback nor leave a voice mail. This includes customers who hung up during voicemail, before leaving a message after the beep sound.
* **Follow-Up** - The customer either left voicemail or asked for a callback. NOTE: call flows involving voicemail and callbacks are not supported by Insights at this time.

#### Outbound

Outbound abandoned conversations are those where an agent or a dialer tried to connect to a customer:

* **No** - The agent successfully reached a customer.
* **Yes** - The agent gave up when trying to reach a customer.

Reaching a voicemail means that the call was not abandoned.

### Abandoned Phase

For more details around abandoned conversations, you can set up custom logic to assign `Abandoned Phase` values.

* **Short Queue** - The customer abandoned the conversation in a queue within a short timeframe.

Filtering out short abandoned calls is useful for excluding unintended dials to your center or for any case where the customer decides to hang up immediately. You can either pass this phase programmatically via TaskRouter events or eliminate short abandons directly in your reporting using [custom metrics](/docs/flex/end-user-guide/insights/custom-metrics).

* **Queue** (Default) - The customer abandoned the conversation while waiting in a queue.
* **Ringing** - The customer abandoned the conversation while the phone was ringing (either while dialing an agent or a customer).
* **Voicemail** - The customer abandoned the conversation in voicemail. You can use the **Abandoned** attribute to understand whether the customer left a message or not.
* **Callback Request** - The conversation was abandoned by the customer after requesting a callback. A **Callback Request** always sets the **Abandoned** value to **Follow-Up**.

'Queue' is the default and only value that Flex Insights automatically populates for Abandoned Phase in an abandoned conversation. Any other value must be set programmatically via Task Router. Read here [how to enhance your Conversation Data](/docs/flex/developer/insights/enhance-integration).
