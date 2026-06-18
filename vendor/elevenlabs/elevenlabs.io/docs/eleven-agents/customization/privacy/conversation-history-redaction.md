> This is a page from the ElevenLabs documentation. For a complete page index, fetch https://elevenlabs.io/docs/llms.txt. For the full documentation in a single file, fetch https://elevenlabs.io/docs/llms-full.txt.

# Conversation history redaction

Conversation history redaction detects and removes sensitive information from your conversation data before it is stored, thereby minimising exposure of sensitive entities while preserving useful conversation logs for review and analysis.

This feature is available to enterprise clients only. Contact
[sales](https://elevenlabs.io/contact-sales) for access.

Conversation history redaction significantly reduces sensitive entity exposure, but as with any
detection service operating on dynamic user data, the detection rate is not 100%. Therefore,
enabling this feature alone **does not guarantee compliance** with strict regulations such as
[HIPAA](/docs/eleven-agents/legal/hipaa). For full compliance, enable [Zero Retention
Mode](/docs/eleven-api/resources/zero-retention-mode).

## Overview

When a conversation ends, a post-processing step scans the transcript and audio for sensitive entities. Any detected entities are redacted before the conversation data is stored:

* **Transcripts and analysis**: Entity instances are replaced with `[ENTITY_NAME]` (e.g. `[NAME]`, `[EMAIL_ADDRESS]`).
* **Audio**: Entity instances are replaced with a bleep sound.
* **Webhooks**: Transcript and audio webhooks also contain redacted data.

Because post-processing runs after the conversation ends, there will be a short delay before the
conversation appears in your history.

## Configuration

Redaction settings are located in the **Privacy** section at the bottom of your agent's **Advanced** tab.

The redaction configuration has two fields:

| Field      | Type           | Description                                                                                     |
| ---------- | -------------- | ----------------------------------------------------------------------------------------------- |
| `enabled`  | `boolean`      | Whether to redact sensitive entities from the conversation history.                             |
| `entities` | `list[string]` | List of entity types to redact. See [supported entities](#supported-entities) for valid values. |

## How redaction works

### Placeholder format

Each redacted entity is replaced with its type name in uppercase brackets. For example, if `email_address` is configured, an email like `john@example.com` in the transcript becomes `[EMAIL_ADDRESS]`.

### Parent and child entities

Entities follow a hierarchy using dot notation. You can configure redaction at any level:

* **Parent entity** (e.g. `name`): Redacts all child entities under it. All matches use the parent placeholder — for example, both given names and family names are replaced with `[NAME]`.
* **Child entity** (e.g. `name.name_given`): Redacts only that specific type, using its own placeholder `[NAME_GIVEN]`.

If you pass both a parent entity and one of its children, the child entry is ignored since the parent already covers it.

### Example

Configuring `["name", "email_address", "financial_id.payment_card.payment_card_number"]` will:

* Replace all names (given, family, other) with `[NAME]`
* Replace email addresses with `[EMAIL_ADDRESS]`
* Replace payment card numbers with `[PAYMENT_CARD_NUMBER]`

## Supported entities

### Name

| Entity             | Description                                                                                   |
| ------------------ | --------------------------------------------------------------------------------------------- |
| `name`             | All name types (given, family, other).                                                        |
| `name.name_given`  | Names given to an individual, usually at birth. Often first/middle names in Western cultures. |
| `name.name_family` | Names indicating a person's family or community. Often a last name in Western cultures.       |
| `name.name_other`  | Titles, suffixes, nicknames, partial names, initials, and other name components.              |

### Contact

| Entity           | Description                                                                |
| ---------------- | -------------------------------------------------------------------------- |
| `email_address`  | Email addresses in any format, including spelled-out versions.             |
| `contact_number` | Fax, telephone, or mobile numbers in any domestic or international format. |

### Personal information

| Entity               | Description                                                               |
| -------------------- | ------------------------------------------------------------------------- |
| `dob`                | Dates explicitly identified as birth dates.                               |
| `age`                | Numbers associated with an individual's age.                              |
| `religious_belief`   | Terms indicating religious affiliation or belief.                         |
| `political_opinion`  | Terms referring to political party affiliation, movement, or ideology.    |
| `sexual_orientation` | Terms indicating sexual orientation.                                      |
| `ethnicity_race`     | Terms indicating nationality, ethnicity, race, or cultural origin.        |
| `marital_status`     | Terms indicating marital status.                                          |
| `occupation`         | Job titles or professions.                                                |
| `physical_attribute` | Distinctive bodily attributes including height, weight, and descriptions. |
| `language`           | Names of natural languages.                                               |

### Credentials

| Entity     | Description                                                           |
| ---------- | --------------------------------------------------------------------- |
| `username` | Usernames, login names, or handles.                                   |
| `password` | Account passwords, PINs, passcodes, access keys, or security answers. |

### Web

| Entity | Description                  |
| ------ | ---------------------------- |
| `url`  | Internet addresses and URLs. |

### Organization

| Entity         | Description                                                   |
| -------------- | ------------------------------------------------------------- |
| `organization` | Names of organizations or departments within an organization. |

### Financial identifiers

| Entity                                                   | Description                                                                                               |
| -------------------------------------------------------- | --------------------------------------------------------------------------------------------------------- |
| `financial_id`                                           | All financial identifier types below.                                                                     |
| `financial_id.payment_card`                              | All payment card fields below.                                                                            |
| `financial_id.payment_card.payment_card_number`          | Payment card numbers / primary account numbers (PAN).                                                     |
| `financial_id.payment_card.payment_card_expiration_date` | Payment card expiration dates.                                                                            |
| `financial_id.payment_card.payment_card_cvv`             | 3-4 digit card verification values.                                                                       |
| `financial_id.bank_account`                              | All bank account fields below.                                                                            |
| `financial_id.bank_account.bank_account_number`          | Bank account numbers including IBANs.                                                                     |
| `financial_id.bank_account.bank_routing_number`          | Bank routing numbers (ABA routing transit numbers).                                                       |
| `financial_id.bank_account.swift_bic_code`               | SWIFT/BIC codes for international bank identification.                                                    |
| `financial_id.financial_id_other`                        | Other financial identifiers such as sort codes, BSB numbers, CLABE, cryptocurrency wallet addresses, etc. |

### Location

| Entity                          | Description                                                                 |
| ------------------------------- | --------------------------------------------------------------------------- |
| `location`                      | All location types below.                                                   |
| `location.location_address`     | Street addresses without city, state, or postal code components.            |
| `location.location_city`        | Municipality names, including villages, towns, and cities.                  |
| `location.location_postal_code` | Postal codes and zip codes.                                                 |
| `location.location_coordinate`  | Geographic positions using latitude, longitude, and/or elevation.           |
| `location.location_state`       | State, province, territory, or prefecture names.                            |
| `location.location_country`     | Country names.                                                              |
| `location.location_other`       | Landmarks, neighborhoods, counties, boroughs, regions, and other locations. |

### Date

| Entity          | Description                                                                      |
| --------------- | -------------------------------------------------------------------------------- |
| `date`          | Specific calendar dates, including days of the week, months, or years.           |
| `date_interval` | Broader time periods including date ranges, months, seasons, years, and decades. |

### Unique identifiers

| Entity                                                       | Description                                                                                                            |
| ------------------------------------------------------------ | ---------------------------------------------------------------------------------------------------------------------- |
| `unique_id`                                                  | All unique identifier types below.                                                                                     |
| `unique_id.government_issued_id`                             | Government-issued identifiers such as SSNs, passport numbers, driver's license numbers, and international equivalents. |
| `unique_id.account_number`                                   | Customer account or membership identification numbers.                                                                 |
| `unique_id.vehicle_id`                                       | Vehicle identification numbers (VINs), serial numbers, and license plate numbers.                                      |
| `unique_id.healthcare_number`                                | All healthcare number types below.                                                                                     |
| `unique_id.healthcare_number.medical_record_number`          | Unique codes or IDs assigned to patients by healthcare providers.                                                      |
| `unique_id.healthcare_number.health_plan_beneficiary_number` | IDs assigned by health insurance companies or government health programs.                                              |
| `unique_id.device_id`                                        | Device identifiers such as MAC addresses, IMEI numbers, and serial numbers.                                            |
| `unique_id.unique_id_other`                                  | Other unique identifiers such as tax IDs and tracking numbers.                                                         |

### Medical

| Entity                        | Description                                                                                    |
| ----------------------------- | ---------------------------------------------------------------------------------------------- |
| `medical`                     | All medical types below.                                                                       |
| `medical.medical_condition`   | Diseases, injuries, symptoms, diagnoses, disorders, and chronic conditions.                    |
| `medical.medication`          | Prescriptions, vitamins, supplements, drugs, dosages, and pharmaceutical products.             |
| `medical.medical_procedure`   | Surgeries, treatments, interventions, and therapies.                                           |
| `medical.medical_measurement` | Vitals, lab results, blood type, test results, and measurements tied to a specific individual. |
| `medical.medical_other`       | Allergies, medical devices, and other health-related information.                              |

## Best practices

* **Only enable the entities you need.** The detection rate improves when fewer entity types are configured. Narrowing the set of entities reduces ambiguity and leads to more accurate detection.
* **Refer to the examples and descriptions.** Use the examples beside the entities in the entity selection sheet and the descriptions above or tooltips in the sheet to understand what each entity redacts.

## Comparison with Zero Retention Mode

Conversation history redaction and [Zero Retention Mode](/docs/eleven-api/resources/zero-retention-mode) both protect sensitive data, but they work differently and suit different needs.

|                                                     | **Conversation history redaction**                                              | **[Zero Retention Mode](/docs/eleven-api/resources/zero-retention-mode)**                                     |
| --------------------------------------------------- | ------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------- |
| How it works                                        | Detects and replaces specific entity types in stored data                       | Discards all conversation data — nothing is stored or logged                                                  |
| Detection coverage                                  | High but not 100%                                                               | 100% — entire audio and transcript are discarded                                                              |
| [HIPAA](/docs/eleven-agents/legal/hipaa) compliance | Not guaranteed on its own                                                       | Can enable [HIPAA](/docs/eleven-agents/legal/hipaa) compliance                                                |
| Conversation history access                         | Available to workspace users and ElevenLabs admins in conversation history page | Must set up a HTTP endpoint to receive [post-call webhooks](/docs/eleven-agents/workflows/post-call-webhooks) |
| Debugging                                           | Conversations can be reviewed and debugged                                      | No stored data to review                                                                                      |
| Webhook payloads                                    | Redacted                                                                        | Not stored — must retrieve via your own endpoint                                                              |
| ElevenLabs admin access                             | Admins may access internal logs containing unredacted data                      | Admins cannot access conversation data                                                                        |

## Frequently asked questions

If an error occurs during entity detection, the system falls back to [Zero Retention
Mode](/docs/eleven-api/resources/zero-retention-mode) behavior, where no conversation data is
stored.

No. Redaction applies to stored conversation history visible to you. ElevenLabs may still have
access to conversation data through internal logs. To prevent this, enable [Zero Retention
Mode](/docs/eleven-api/resources/zero-retention-mode).

When redaction is enabled, a post-processing step runs after each conversation to detect and
redact entities. This introduces a short delay before the conversation appears in your history.

Yes. This feature is in early stages, and more flexible configuration options will be supported in
the future.

**Limits internal exposure:** Conversation history redaction ensures that anyone in your workspace cannot see sensitive entities in the conversation history.

**Demonstrates best-effort data handling:** Clients and auditors view redaction as a positive
signal that your organization takes reasonable steps to protect sensitive information while
retaining conversation data for monitoring and improvement.

**Preserves debugging access:** Unlike Zero Retention Mode, redaction keeps conversation history
available for review, allowing your team to monitor agent performance, investigate issues, and
iterate without sacrificing privacy controls entirely.

Yes. When both are enabled, conversation data is not stored, but your [post-call transcript and
audio webhooks](/docs/eleven-agents/workflows/post-call-webhooks) will have sensitive entities
redacted from them.