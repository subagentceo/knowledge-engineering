# HIPAA for Flex Insights Historical Reporting

> \[!IMPORTANT]
>
> Flex Insights (also known as Historical Reporting) is currently available as a public beta release and the information contained in the Flex Insights documentation is subject to change. This means that some features are not yet implemented and others may be changed before the product is declared as generally available. Public beta products are not covered by a Twilio SLA.
>
> Any reference to "Historical Reporting", "Flex Insights API", "Flex Insights Historical Reporting", or "Flex Insights Historical Reporting API" in the Flex Insights documentation refers to Flex Insights.

For healthcare customers, Flex Insights does not allow Protected Health Information (PHI) to be present in data that are in the Historical Reporting workspace. For HIPAA accounts, Flex Insights preemptively [removes](#removed-attributes) known Personally Identifiable Information (PII) attributes before passing events to the rest of the data pipeline.

Some [features](#affected-features-in-hipaa-accounts) are limited or not available in Historical Reporting for HIPAA-enabled accounts.

We recommend caution when using programmability to pass additional data to Flex Insights.

## Architecture

Events Filter processes individual TaskRouter events from Flex before passing them to Flex Insights infrastructure. The Event Filter keeps only a set of allowed attributes for accounts that have HIPAA enabled. All other attributes are dropped from the individual events. The filtering is applied from the moment when the account is marked as HIPAA.

![Flowchart showing data from Flex through Events Filter to Historical Reporting Workspace, removing PII.](https://docs-resources.prod.twilio.com/ebdc9e8186ab5304d77be989cd81c1a75e587bc6f7a3ac5456c6c157d94c5eca.png)

## Preserved Attributes

Attributes listed in this section are the only attributes preserved in the events passed to Flex Insights.

> \[!NOTE]
>
> The list of the preserved attributes may grow in the future. We recommend checking the current version of this document before passing additional PII or other sensitive data into attributes.

> \[!WARNING]
>
> You must ensure that no PHI data is entered into the preserved attributes.
>
> You must also ensure that no PHI data is entered for `agents`, `conversations`, and `customers` objects in the task attributes.
>
> We strongly recommend not allowing any PII into other attributes and carefully consider if it is essential for your operations.

**Preserved attributes on the root level of task attributes:** `channelSid, conversations, customers, direction, from_country, hipaa_enabled, reason, recordings, reservation_attributes, to_country`

**Preserved attributes in the conversations object:** `abandon_time, abandoned, abandoned_phase, activity, activity_time, agent_talk_time, average_response_time, campaign, case, channel, communication_channel, content, conversation_attribute_1, conversation_attribute_10, conversation_attribute_2, conversation_attribute_3, conversation_attribute_4, conversation_attribute_5, conversation_attribute_6, conversation_attribute_7, conversation_attribute_8, conversation_attribute_9, conversation_id, conversation_label_1, conversation_label_10, conversation_label_2, conversation_label_3, conversation_label_4, conversation_label_5, conversation_label_6, conversation_label_7, conversation_label_8, conversation_label_9, conversation_measure_1, conversation_measure_10, conversation_measure_2, conversation_measure_3, conversation_measure_4, conversation_measure_5, conversation_measure_6, conversation_measure_7, conversation_measure_8, conversation_measure_9, crosstalk_time, customer_talk_time, date, destination, direction, external_contact, external_id_label, first_response_time, focus_time, followed_by, handling_department_id, handling_department_name, handling_department_name_in_hierarchy, handling_team_id, handling_team_name, handling_team_name_in_hierarchy, hang_up_by, hold_time, in_business_hours, initiated_by, initiative, ivr_path, ivr_time, kind, language, longest_silence_before_agent, longest_silence_before_customer, longest_talk_by_agent, longest_talk_by_customer, media, order, outcome, preceded_by, priority, productive, queue, queue_time, recording_status, ring_time, segment_link, segment_name, segment_recording_offset, service_level, silence_time, source, talk_time, virtual, workflow, wrap_up_time`

**Preserved attributes in the customers object:** `acquisition_cost, acquisition_date, business_value, category, country, customer_attribute_1, customer_attribute_2, customer_attribute_3, customer_label_1, customer_label_2, customer_label_3, customer_link, customer_manager, gender, market_segment, organization, region, state, type, year_of_birth`

## **Removed Attributes**

Attributes that are removed are notably:

* **Customer phone**, **customer email** and **customer external ID**. Removing these attributes clears customer-identifying information that is pulled from Flex by default.
* **External Contact.** Although this attribute does not usually contain customer-related information, in the events received by Flex Insights it may appear within the same attributes as customer information.

## Affected Features in HIPAA Accounts

Customers with HIPAA enabled for Flex insights will miss several features that are not critical but may influence the user experience and ability to report on some use cases.

### Commenting and Assessment

Commenting and assessment features are available. Users should not write any PII data into free-text comments.

### Conversations Not Linked to Customer Journeys

Conversations are not linked to customer journeys by default. Each conversation behaves as if it was from a different customer. For example, it will not be possible to report on how many conversations with a customer are needed to resolve an issue.

### Segmenting Metrics by External Contact

External Contact represents the contact information of the organization.

Segmenting conversations by External Contact (`external_contact`) will not be available. This is because both the customer and the contact center phone numbers can be in the same attributes. External Contact attributes can be provided programmatically via task attributes.

External Contact must not contain any PII.

### Waveform in Conversation Screen

Waveform in [Conversation Screen](/docs/flex/end-user-guide/insights/conversation-screen) is not available. The call recordings can still be played back, however navigation within the recording would be less convenient as the segments where agents or customers speak are not visualized.
