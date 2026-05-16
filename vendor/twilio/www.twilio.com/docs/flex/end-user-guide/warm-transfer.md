# Warm transfer

With warm transfers, you can:

* Call another agent or a queue for consultation about an ongoing customer call.
* Start a conference call between another agent and a customer.
* Transfer the customer to another agent.

![Animated steps of a warm transfer from customer to Agent A, then to Agent B.](https://docs-resources.prod.twilio.com/9e282bc7ab2b48680c51a6223fdc6479a55446a48445fdb9ea210197bf400944.gif)

As outlined in the diagram above, a common warm transfer scenario involves the following steps:

1. The agent and customer are on an initial call. The agent (Agent A) decides they want to initiate a warm transfer.
2. Agent A initiates the transfer by calling an agent or a TaskRouter queue with the Flex UI.
3. Agent B answers the call. At this point, Agent A and Agent B can discuss the customer's needs without the customer hearing the conversation. The connection to Agent B is the **consult call**.
4. Once they're ready to transfer, Agent A can put Agent B on hold, remove the Customer from hold, and let them know who will be joining the call.
5. Agent A can now remove Agent B from hold. This will allow Agent A, Agent B, and the Customer to all speak at the same time.
6. Agent A can leave the call. Agent B and the Customer will continue the conversation. The warm transfer is now complete.

## Transfer directly to an agent

1. In Flex, open the transfer directory.
2. Go to **Agents**.
3. Find the agent you want to call, hover over their name, and click the **phone** button to initiate a warm transfer.

## Start a consult call to a queue

1. In Flex, open the transfer directory.
2. Go to **Queues**
3. Find the queue you want to call, hover over it, and click the **phone** button.

## Cancel a consult call

While waiting for Agent B to accept or reject the call, Agent A can click the **X** button near Agent B's name to cancel the call and get back to the customer.

## Switch between a customer call and a consult call

To switch between a customer call and a consult call, put one participant on hold and unhold the other participant using the pause button in each call.

> \[!NOTE]
>
> To allow all three participants to speak at the same time, unhold both calls using the pause buttons.

## Remove an agent from the conference call

An agent can remove another agent from the conference by clicking **Hang up** under the agent's name.

## Complete the warm transfer

To leave the call, click **Leave Call** or **Transfer**. After you leave, Agent B continues the call with the customer, and the warm transfer is complete.

If Agent B was put on hold before Agent A left, Agent B can unhold themselves and continue the conversation with the customer.

## Connect all callers

Click the pause button again to unhold any participant. When all calls have a status of *Live*, participants can talk to each other. This is also known as a *call merge*.

## Troubleshooting

If you have trouble initiating a warm transfer, make sure that:

* You're on a live, conference-based call.
* You're not currently involved in another call transfer.
* You're active in the call. Warm transfer doesn't work if you're on hold.

Finally, if you're initiating a warm transfer on a project that hasn't been used recently, you may run into [an issue with transferring to a task queue that hasn't been used in the last 30 days](/docs/flex/admin-guide/setup/voice/dialpad-limitations). In this situation, we recommend that you create an inbound Task that routes to that task queue. This will reset the queue. Then try initiating your warm transfer again.
