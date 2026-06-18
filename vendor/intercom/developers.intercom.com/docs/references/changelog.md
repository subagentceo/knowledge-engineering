# Changelog (2.15)

For changes that have been updated across all versions, see the [Unversioned changes](/docs/build-an-integration/learn-more/rest-apis/unversioned-changes) page.

There are [breaking changes](/docs/build-an-integration/learn-more/rest-apis/api-changelog#about-breaking-changes-in-the-intercom-api) in this version, which are detailed below.

## Activity Log: `hide_csat_from_agents_setting_change` event type added

The `hide_csat_from_agents_setting_change` event type has been added to the [Activity Log](https://developers.intercom.com/docs/references/2.15/rest-api/api.intercom.io/Admins/listActivityLogs/) event types enum. This event is recorded when a workspace admin enables or disables the "Hide CSAT scores from agents" setting.

## Skip notifications when replying to a Conversation

You can now use the `skip_notifications` parameter when replying to conversations. When set to `true`, this prevents all notifications from being sent for that reply, including:

- Real-time Messenger updates
- Push notifications (mobile)
- Email notifications
- Browser push notifications


The reply will still be stored in the database and visible when users refresh or open the conversation.

This is useful for scenarios like bulk-importing conversation history where you don't want to trigger notifications.

This flag is available on the [reply to a conversation](https://developers.intercom.com/docs/references/2.15/rest-api/api.intercom.io/Conversations/replyConversation/) endpoint.

## Breaking Changes

### New ticket.resolved Webhook Topic

We've added a new `ticket.resolved` webhook topic that fires when a ticket's state transitions to resolved.

**Breaking Change Details:**

The `ticket.resolved` and `ticket.closed` webhook topics now have distinct behaviors:

- **ticket.resolved** - Fires when a ticket's state transitions to "resolved". This is a state-based event.
- **ticket.closed** - Fires when a ticket conversation is closed. This is separate from state transitions.


**API Versioning:** In API versions prior to 2.15, the `ticket.closed` webhook fired when tickets transitioned to "resolved" state. For backward compatibility, both webhooks may fire in certain scenarios when using older API versions. When using API version 2.15 or later, these webhooks have distinct behaviors as described above.

If you have existing integrations that rely on `ticket.closed` to detect resolved tickets, you should migrate to using the new `ticket.resolved` topic.

### Rename of "Abandoned" resolution_state to "negative_feedback"

The AI Agent `resolution_state` enum value `abandoned` has been renamed to `negative_feedback` for improved clarity. This represents the state when a user leaves negative feedback to the AI Agent.

**Previous value:** `abandoned`
**New value:** `negative_feedback`

### Rename of "routed_to_team" resolution_state to "escalated"

The AI Agent `resolution_state` enum value `routed_to_team` has been renamed to `escalated` for improved clarity.

**Previous value:** `routed_to_team`
**New value:** `escalated`

### New AI Agent resolution_state value: "procedure_handoff"

The AI Agent `resolution_state` enum now includes a new value `procedure_handoff`. This represents conversations where the Fin AI Agent used a procedure configured to escalate the conversation.

**New value:** `procedure_handoff`

### Conversation Webhook Serialization Alignment

Conversation webhook payloads now use the same serialization format as API responses.

**Statistics date fields now return Unix timestamps:**

The following fields in `conversation_statistics` within webhook payloads now return Unix timestamp integers instead of ISO8601 strings:

- `first_contact_reply_at`
- `first_assignment_at`
- `first_admin_reply_at`
- `first_close_at`
- `last_assignment_at`
- `last_assignment_admin_reply_at`
- `last_contact_reply_at`
- `last_admin_reply_at`
- `last_close_at`


**Body and subject fields now return plain text:**

The `body` and `subject` fields in conversation webhook payloads now return plain text instead of HTML, matching the default API response format.

### Conversation Parts: Enhanced event_details schemas

The `event_details` field on conversation parts now supports additional part types:

**New Part Types:**

- `conversation_tags_updated` - Tags added/removed from conversations
- `snoozed` - Snooze timing with human-readable duration and custom timestamps
- `priority_changed` - Priority state transitions (priority/not_priority)
- `conversation_sla_applied_by_rule` - SLA via modern Operator workflows
- `conversation_sla_applied_by_workflow` - SLA via legacy Inbox Rules
- `conversation_sla_target_missed` - SLA breach details
- `conversation_sla_paused` - SLA status at pause time
- `conversation_sla_unpaused` - SLA info when unpaused
- `conversation_sla_removed` - SLA removal info
- `conversation_attribute_updated_by_user` - User-initiated CDA updates


**Enhanced Part Types:**

- `conversation_attribute_updated_by_admin` - Now includes `previous` field to track CDA value history


## New Features

### New Webhook Topics

**conversation.company.updated**

- Fires when a company is added to or updated on a conversation
- Requires the "Read conversations" permission


**Event Details:**

- **Topic Name:** `conversation.company.updated`
- **Description:** Triggered when a company association is updated on a conversation
- **Required Scope:** Read conversations
- **Object:** Returns the full Conversation object with updated company association


**api.request.completed**

- Fires when a successful v3 API request is completed
- Requires the "Read API activity logs" permission
- Useful for monitoring and auditing API usage


### Add Company to Conversation API

You can now add a company to a conversation using the Conversations API. This allows you to associate business context with customer conversations.

### Company field added to Conversation API responses

The Conversation API now includes a `company` field in all conversation responses. This field contains the full company object associated with the conversation, making it easier to access company information without additional API calls. This field is nullable and will be populated when available.

**Example Response:**

```json
{
  "type": "conversation",
  "id": "1295",
  "company": {
    "type": "company",
    "id": "5f4d3c1c-7b1b-4d7d-a97e-6095715c6632",
    "name": "Example Company Inc.",
    "company_id": "6"
  },
  // ... other conversation fields
}
```

### Company Notes API

- Added `notes` field to all company API endpoint responses


### Contacts API: language_override field

Support for the `language_override` field has been added to both the [create contact](https://developers.intercom.com/docs/references/2.15/rest-api/api.intercom.io/Contacts/createContact/) and [update contact](https://developers.intercom.com/docs/references/2.15/rest-api/api.intercom.io/Contacts/updateContact/) endpoints in the Contacts API.

The `language_override` field allows you to set a preferred language for a contact. When set, Intercom uses this language for Fin AI and the Messenger interface, overriding the browser's language setting.

**Field details:**

- Accepts ISO 639-1 two-letter language codes (e.g., `"en"`, `"fr"`, `"de"`, `"es"`)
- Invalid language codes are automatically set to `null`


### Conversations API: conversation_rating behavior

The `conversation_rating` field in conversation responses now returns the latest completed rating (a rating with a `rating_index` value) instead of the latest rating overall. If no completed ratings exist for a conversation, the API falls back to returning the latest rating overall.

### Fin Voice API

New API endpoints for managing Fin Voice configurations and interactions.

### Workflow Export API

New API endpoints for exporting workflow configurations programmatically.

### Message ID in Email Message Metadata

Email message metadata now includes a `message_id` field for better tracking and correlation of email communications.

### Brands API

We've added a new Brands API that provides read access to workspace brands configuration.

**New Endpoints:**

- `GET /brands` - List all brands for the workspace
- `GET /brands/{id}` - Retrieve a specific brand by ID


The brand object includes `id`, `name`, `is_default` flag to identify the primary brand, associated `help_center_id`, and `default_address_settings_id` for email settings.

### Emails API

We've added a new Emails API that provides read access to sender email address settings configured in your workspace.

**New Endpoints:**

- `GET /emails` - List all email settings for the workspace
- `GET /emails/{id}` - Retrieve a specific email setting by ID


The email setting object includes `email`, `verified` status, `domain`, associated `brand_id`, `forwarding_enabled` flag, and `forwarded_email_last_received_at` timestamp.

### Help Center API Enhancements

Help Center API responses now include two new fields for custom domain support:

- `url` - The URL for the help center, if you have a custom domain then this will show the URL using the custom domain. (e.g., `https://intercom.help/mycompany`)
- `custom_domain` - Custom domain configured for the help center (e.g., `help.mycompany.com`)