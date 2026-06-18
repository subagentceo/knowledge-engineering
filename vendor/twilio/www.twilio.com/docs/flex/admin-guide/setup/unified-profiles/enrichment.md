# Enrich profiles with Flex interaction data

## Enriched interaction events

Flex uses customer interaction data to enrich user profiles in Segment. For each customer interaction, Flex sends two enrichment events:

* [`Flex - Engagement Initiated`](#flex---engagement-initiated)
* [`Flex - Engagement Completed`](#flex---engagement-completed)

To send enrichment events, you must have the source `flex-unify-server-source` configured in your Segment workspace. This source is created when you connect a Segment workspace, and you can confirm it's configured by navigating to **Unify** > **Unify settings** > **Profile sources** in Segment.

![The Profile explorer events tab which displays enrichment events from customer interactions.](https://docs-resources.prod.twilio.com/43b6357649b97b8bab61d1384b669cf79f630a1f9cbcfd0d4163f9558cbdd11c.png)

### Flex - Engagement Initiated

Flex sends the `Flex - Engagement Initiated` event to Segment when an agent ends the call or conversation and the task enters wrap-up mode. This event has the following properties:

| Property                   | Description                                                                       |
| -------------------------- | --------------------------------------------------------------------------------- |
| `customerStartTime`        | The start time of the interaction.                                                |
| `Duration`                 | The duration of the interaction in seconds.                                       |
| `lastKnownAgentWorkerSid`  | Worker SID (WKxxxxx) for the last agent handling the interaction.                 |
| `firstKnownAgentWorkerSid` | Worker SID (WKxxxxx) for the first agent handling the interaction.                |
| `interactionSid`           | The interaction SID (KDxxxxx).                                                    |
| `channelSid`               | The channel SID (UOxxxxx).                                                        |
| `channelType`              | The channel type of the interaction. (For example, `Email`, `SMS`, or `WhatsApp`) |
| `Direction`                | Indicates whether the interaction was inbound or outbound.                        |

### Flex - Engagement Completed

Flex sends the `Flex - Engagement Completed` event to Segment when an agent completes the wrapup phase, and the task is completed. If you're using Copilot, [wrap-up notes](/docs/flex/admin-guide/setup/copilot/setup) are also available at this point.

`Flex - Engagement Completed` has the following properties:

| Property         | Description                                                                                                                                           |
| ---------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------- |
| `channelSid`     | The channel SID.                                                                                                                                      |
| `interactionSid` | The interaction SID.                                                                                                                                  |
| `codes`          | Topic and disposition code from the Agent Copilot wrap-up notes. (For example, `{"dispositionCode":"Scheduled test drive", "topic":"Used vehicles"}`) |
| `sentiment`      | The sentiment of the end-customer, as detected by Agent Copilot. (Can be `positive`, `neutral`, or `negative`)                                        |

## Enriched profile traits

After each customer interaction, the following profile traits are also updated based on the Flex-to-Segment enrichment:

* `flex_last-interaction-duration`
* `flex_last-interaction-outcome`
* `flex_last-interaction-sentiment`
* `flex_last-interaction-start-time`
* `flex_last-interaction-topics`
* `flex_last-known-agent`

Learn more about using profile enrichment data for creating [computed traits](/docs/segment/unified-profiles/create-a-workspace/#computed-traits-for-flex) in Segment.

## View enriched events and traits

You can view enriched events associated with a user profile in Segment:

1. In Segment, navigate to the Profile explorer (**Unify** > **Profile explorer**).
2. Select a user profile.
3. Click **Events**.

## Use enriched profile data for intelligent routing

You can use enriched Segment profile data for intelligent routing. With Twilio Studio's [Search for a Profile](/docs/studio/widget-library/search-for-a-profile) widget, you can look up customer profile information when handling an inbound call.

You can then configure your Studio Flow to branch out based on the values of the enriched profile traits. For example:

* If a customer's last interaction sentiment is negative, route the caller to a higher-priority queue.
* If a customer's last interaction occurred less than 24 hours ago for a specific topic, route them to the appropriate queue for follow-up.

Learn more about [intelligent routing in Studio](/docs/flex/admin-guide/setup/configure-pre-agent-workflow-with-studio#use-the-unified-profiles-studio-integration-for-intelligent-routing) where you can use real-time, enriched profile data for each customer.
