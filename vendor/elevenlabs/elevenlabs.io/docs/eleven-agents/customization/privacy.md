> This is a page from the ElevenLabs documentation. For a complete page index, fetch https://elevenlabs.io/docs/llms.txt. For the full documentation in a single file, fetch https://elevenlabs.io/docs/llms-full.txt.

# Privacy

Privacy settings give you fine-grained control over your data. You can manage both call audio recordings and conversation data retention to meet your compliance and privacy requirements.

Configure how long conversation transcripts and audio recordings are retained.

Control whether call audio recordings are retained.

Automatically redact sensitive entities from stored conversation history.

## Retention

Retention settings control the duration for which conversation transcripts and audio recordings are stored.

For detailed instructions, see our [Retention](/docs/eleven-agents/customization/privacy/retention) page.

## Audio Saving

Audio Saving settings determine if call audio recordings are stored. Adjust this feature based on your privacy and data retention needs.

For detailed instructions, see our [Audio Saving](/docs/eleven-agents/customization/privacy/audio-saving) page.

## Conversation History Redaction

Conversation history redaction detects and removes sensitive information from your conversation data before it is stored. Detected entities are replaced with placeholders in transcripts and with a bleep sound in audio recordings. This feature is available to enterprise clients only.

For detailed instructions, see our [Conversation History Redaction](/docs/eleven-agents/customization/privacy/conversation-history-redaction) page.

## Recommended Privacy Configurations

Disable audio saving and set retention to 0 days for immediate deletion of data.

Enable audio saving for critical interactions while setting a moderate retention period.

Enable audio saving and configure retention settings to adhere to regulatory requirements such
as GDPR and HIPAA. For HIPAA compliance, we recommend enabling audio saving and setting a
retention period of at least 6 years. For GDPR, retention periods should align with your data
processing purposes.