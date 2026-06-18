# Agent Copilot: Known issues and limitations (public beta)

> \[!IMPORTANT]
>
> Agent Copilot is currently available as a Public Beta product and the information contained in this document is subject to change. This means that some features are not yet implemented and others may be changed before the product is declared as Generally Available. Public Beta products are not covered by a SLA.

> \[!WARNING]
>
> Agent Copilot is not a HIPAA Eligible Service or PCI compliant and should not be used in Flex workflows that are subject to HIPAA or PCI. However, we offer mitigation tools such as PII redaction. To learn more, see [AI data use](/docs/flex/admin-guide/setup/copilot#ai-data-use).

## Storage

* If you close the window or tab with Flex UI, your wrap-up notes won't be saved.
* If you want fast access to wrap-up notes once they're created, we recommend storing notes in your own system using a webhook. See [Agent Copilot webhook](/docs/flex/developer/copilot-webhooks) for more details.

## Flex UI

* Agent Copilot does not work with multi-tab support.
* If you're using a Flex UI version earlier than 2.8.0, you won't see the updated 2.8.x UI language detection features. However, sentiment and summary still generate in the auto-detected language.

## Customer highlights

* For outbound interactions, agents may see a slight delay in generation for customer highlights.
* With Flex UI version 2.13.x, customer highlights don't generate without the [Search for a Profile widget](/docs/studio/widget-library/search-for-a-profile). To enable customer highlights, upgrade to Flex UI 2.14.x or later, or add the Search for a Profile widget to your Studio Flow.

## Plugins

* If you use a custom plugin that affects the End Chat functionality, then wrap-up notes may not work as described.
* The Chat Transfer plugin is not fully compatible with wrap-up notes.
* The Dispositions plugin is not fully compatible with wrap-up notes.

## Changes in Console

* If agents are using wrap-up notes, and you make changes to Agent Copilot settings in Console, then agents must refresh their Flex UI for those changes to show.

## Voice channel

### Transcription

* In Flex 2.7.x and higher, agents can view transcripts. In Flex UI 2.6.x, transcripts aren't visible to agents.
* Only messages from agents and customers show in a transcript. Messages from other participant types, like a supervisor who needs to barge in or coach, aren't shown.
* If an agent refreshes Flex UI while viewing a transcript, their name no longer shows.

### Transfers

* If transferring a call, only the last agent on the call will see wrap-up notes and the call transcript. Transferring agents won't see wrap-up notes or transcripts.
* If an agent receives a transferred call, they won't see the names of earlier agents in the transcript. Instead, they'll see `Agent`, `Agent 2`, `Agent 3`, following the order of agents on the call.
* If a transferring agent refreshes Flex UI before completing a task, Flex will show the wrap-up notes tab to the agent.

### Plugins

* Agent Copilot doesn't support the plugin for Call Recording Pause And Resume. Transcription continues when recordings are paused.

### Webhook payload

* If an agent refreshes Flex UI during wrapup, the `task_sid`  won't be available in callback events. For more details on parameters, see [Wrap-up notes webhook](/docs/flex/developer/copilot-webhooks#parameters).

For the latest information on fixes, consult the Flex UI [release notes](/docs/flex/release-notes/flex-ui-release-notes-for-v2xx).
