> This is a page from the ElevenLabs documentation. For a complete page index, fetch https://elevenlabs.io/docs/llms.txt. For the full documentation in a single file, fetch https://elevenlabs.io/docs/llms-full.txt.

# Data Collection

Data collection automatically extracts structured information from conversation transcripts using LLM-powered analysis. This enables you to capture valuable data points without manual processing, improving operational efficiency and data accuracy.

## Overview

Data collection analyzes conversation transcripts to identify and extract specific information you define. The extracted data is structured according to your specifications and made available for downstream processing and analysis.

### Supported Data Types

Data collection supports four data types to handle various information formats:

* **String**: Text-based information (names, emails, addresses)
* **Boolean**: True/false values (agreement status, eligibility)
* **Integer**: Whole numbers (quantity, age, ratings)
* **Number**: Decimal numbers (prices, percentages, measurements)

## Configuration

In the **Analysis** tab of your agent settings, navigate to the **Data collection** section.

![Setting up data collection](https://files.buildwithfern.com/https://elevenlabs.docs.buildwithfern.com/docs/1dd7120a0d0236e4b225f1054f17c13956dc5ccc7de275e600eaab9e20604634/assets/images/conversational-ai/collection.gif)

Click **Add item** to create a new data extraction rule.

Configure each item with:

* **Identifier**: Unique name for the data field (e.g., `email`, `customer_rating`)
* **Data type**: Select from string, boolean, integer, or number
* **Description**: Detailed instructions on how to extract the data from the transcript

The description field is passed to the LLM and should be as specific as possible about what to extract and how to format it.

Data collection items are limited to 40 per agent for Trial and Enterprise plans, and 25 per agent for other plans.

Extracted data appears in your conversation history, allowing you to review what information was captured from each interaction.

![Data collection results in conversation history](https://files.buildwithfern.com/https://elevenlabs.docs.buildwithfern.com/docs/beddd4acf7a431f10b6d6ac602d4ef16604e93bc51040325e185df6517ba3021/assets/images/conversational-ai/collection_result.gif)

## Best Practices

* Be explicit about the expected format (e.g., "email address in the format [user@domain.com](mailto:user@domain.com)")
* Specify what to do when information is missing or unclear
* Include examples of valid and invalid data
* Mention any validation requirements

**Contact Information:**

* `email`: "Extract the customer's email address in standard format ([user@domain.com](mailto:user@domain.com))"
* `phone_number`: "Extract the customer's phone number including area code"
* `full_name`: "Extract the customer's complete name as provided"

**Business Data:**

* `issue_category`: "Classify the customer's issue into one of: technical, billing, account, or general"
* `satisfaction_rating`: "Extract any numerical satisfaction rating given by the customer (1-10 scale)"
* `order_number`: "Extract any order or reference number mentioned by the customer"

**Behavioral Data:**

* `was_angry`: "Determine if the customer expressed anger or frustration during the call"
* `requested_callback`: "Determine if the customer requested a callback or follow-up"

When the requested data cannot be found or is ambiguous in the transcript, the extraction will return null or empty values. Consider:

* Using conditional logic in your applications to handle missing data
* Creating fallback criteria for incomplete extractions
* Training agents to consistently gather required information

## Data Type Guidelines

Use for text-based information that doesn't fit other types.

**Examples:**

* Customer names
* Email addresses
* Product categories
* Issue descriptions

**Best practices:**

* Specify expected format when relevant
* Include validation requirements
* Consider standardization needs

Use for yes/no, true/false determinations.

**Examples:**

* Customer agreement status
* Eligibility verification
* Feature requests
* Complaint indicators

**Best practices:**

* Clearly define what constitutes true vs. false
* Handle ambiguous responses
* Consider default values for unclear cases

Use for whole number values.

**Examples:**

* Customer age
* Product quantities
* Rating scores
* Number of issues

**Best practices:**

* Specify valid ranges when applicable
* Handle non-numeric responses
* Consider rounding rules if needed

Use for decimal or floating-point values.

**Examples:**

* Monetary amounts
* Percentages
* Measurements
* Calculated scores

**Best practices:**

* Specify precision requirements
* Include currency or unit context
* Handle different number formats

## Use Cases

Extract contact information, qualification criteria, and interest levels from sales conversations.

Gather structured data about customer preferences, feedback, and behavior patterns for strategic
insights.

Capture issue categories, resolution details, and satisfaction scores for operational
improvements.

Extract required disclosures, consents, and regulatory information for audit trails.

## Troubleshooting

* Verify the data exists in the conversation transcript
* Check if your extraction prompt is specific enough
* Ensure the data type matches the expected format
* Consider if the information was communicated clearly during the conversation

- Review extraction prompts for format specifications
- Add validation requirements to prompts
- Consider post-processing for data standardization
- Test with various conversation scenarios

* Each data collection rule adds processing time
* Complex extraction logic may take longer to evaluate
* Monitor extraction accuracy vs. speed requirements
* Optimize prompts for efficiency when possible

Extracted data is available through [Post-call
Webhooks](/docs/eleven-agents/workflows/post-call-webhooks) for integration with CRM systems,
databases, and analytics platforms.