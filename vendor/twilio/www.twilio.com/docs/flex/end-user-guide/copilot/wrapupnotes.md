# Use auto-generated notes with Agent Copilot (Public Beta)

> \[!IMPORTANT]
>
> Agent Copilot is currently available as a Public Beta product and the information contained in this document is subject to change. This means that some features are not yet implemented and others may be changed before the product is declared as Generally Available. Public Beta products are not covered by a SLA.

> \[!WARNING]
>
> Agent Copilot is not a HIPAA Eligible Service or PCI compliant and should not be used in Flex workflows that are subject to HIPAA or PCI. However, we offer mitigation tools such as PII redaction. To learn more, see [AI data use](/docs/flex/admin-guide/setup/copilot#ai-data-use).

## Use auto-generated notes

* You can't leave any fields blank.
* Copy and paste any information you need into an internal system before completing a task.

1. As an agent with an open conversation task that's ready to end, click **End Chat.** A **Notes** tab appears with **Topics** (including **subtopics** and **disposition codes**), **Sentiment**, and a **Summary** of your conversation.
2. Optionally, click **Edit** to review the notes fields and make any necessary edits. Depending on permissions, you may not have access to see or edit all fields.
   ![Wrap up notes example.](https://docs-resources.prod.twilio.com/98438ecfe6be911d163588890ac23f097b26baa7387213305c2cb54599503c5c.png)
3. If you need a copy of the summary, copy and paste it to save in your internal systems.
4. Click **Update** to save your updates.
5. Click **Complete** to submit notes and complete the task.

**Note** If your Flex UI uses a custom plugin that affects the End Chat functionality, wrap-up notes may not work as shown.

## On hold and call transcription

* As an agent, when you place a call on hold, transcription for the customer is paused, but transcription for you continues. That way, internal conversations, consults, and warm transfers are included in the call transcript for reference later.
* If you put any participant on hold, transcription is paused for that participant.
* If other agents on the call are placed on hold, their conversation won't be captured.
* During cold transfers, transcriptions are paused.

## Wrap-up after the call

Once the call ends, wrap-up notes are created, and you're auto-navigated to the **Notes** tab. A call transcript generates around 10 seconds after the call ends. To access the call transcript, you can navigate to the **Transcript** tab next to **Notes**.

## View notes in customer history

All previous wrap-up notes will show in a customer's history, in the **History** tab.

![FLex UI with wrap-up notes in the customer history tab.](https://docs-resources.prod.twilio.com/884bc2489c4d13d40608b94cdadbbfd4b17c2784441dde16d664b74a77df3f7c.png)

## Notes in non-English languages

If your admin has enabled additional languages for wrap-up notes, then the **summary** and **sentiment** displays in the language of your conversation when wrapping up. The **disposition code** remains in its original language. Wrap-up notes also appear in the customer [**History** tab](/docs/flex/end-user-guide/copilot/customerprofiles) in the language you save them in.

![Wrap-up notes in Portuguese in Flex UI.](https://docs-resources.prod.twilio.com/0a08afcc130c86f695e761d2dfd94927bbac0bca25f3a7bfc0a87e666e81bdef.png)

Agent Copilot can detect [these supported languages](/docs/flex/admin-guide/setup/copilot#supported-languages). If Agent Copilot detects an unsupported or unselected language, notes may still generate but with inconsistency and reduced accuracy. An error message shows if the language isn't supported.

If your conversation includes multiple languages, Agent Copilot uses the predominant language for wrap-up notes. Regenerating the summary does not change the language.

You can see the conversation transcript in the language of your conversation in the **Transcript** tab.

## Troubleshooting notes

A generating message may briefly appear until the notes are ready. If generation takes longer than 10 seconds, you can continue waiting or **manually add notes**.

If you decide to fill out your own notes, you won't be able to view or use the auto-generated notes when they're ready.

When wrap-up notes are enabled, you must complete the required fields before completing a task. If an error occurs and notes cannot be generated or manually entered, then you can click **complete without notes**.

### Uncategorized topics

You may see the Topic as **Uncategorized** if topics aren't configured for your contact center but disposition codes are. In this case, you can still see values to choose from under **Disposition code**.
