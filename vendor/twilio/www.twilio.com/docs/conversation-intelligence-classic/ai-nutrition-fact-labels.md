# AI Nutrition Fact Labels

This page covers the AI Nutrition Fact Labels for the Conversation Intelligence (classic) Base Models. These labels detail how Twilio handles customer data across the Base Models, with specific guidelines on data logging, privacy, and compliance.

## Conversation Intelligence (classic) Base Models

Twilio uses different Base Models as the foundation for creating Transcripts and executing [Language Operators](/docs/conversation-intelligence-classic/language-operators). Conversation Intelligence (classic) includes the following AI Base Models:

* Twilio's own AI Model
* OpenAI
* Azure OpenAI
* Amazon Comprehend
* Deepgram Speech-to-Text
* Google Speech-to-Text
* Amazon Transcribe
* Private AI

> \[!NOTE]
>
> Customer data is not used to train the Base Models for OpenAI, Azure OpenAI, Deepgram Speech-to-Text, Private AI, Google Speech-to-Text, or Amazon Transcribe.
>
> Twilio uses customer data to train the Twilio Base Model only if you opt in by accepting the Data Logging Terms when you create your Intelligence Service. For more information, refer to the [Twilio Conversation Intelligence (classic): Data Logging Consent Addendum](https://www.twilio.com/en-us/legal/service-country-specific-terms/intelligence-voice-data-logging). Data Logging is not available for Conversation Intelligence (classic) for Voice workflows subject to HIPAA and that have been enabled as HIPAA Projects. For accounts and subaccounts enabled as HIPAA Projects, Data Logging is automatically disabled.

## AI Nutrition Fact Labels

AI Nutrition Fact Labels give consumers and businesses a more transparent and clear view into "what's in the box" of a specific AI model. The Label explains how the AI model uses customer data for training AI models and how it handles data privacy and compliance.

The following sections show the current AI Nutrition Fact Labels for the Conversation Intelligence (classic) Base Models. Visit [Twilio AI Nutrition Facts](https://nutrition-facts.ai/) to learn more about AI Nutrition Facts and how to read these labels.

### Twilio's own AI model

```json
{"name":"Conversation Intelligence (classic) - Twilio models","description":"Twilio Automatic Speech Recognition that creates transcripts and Pre-built Language Operators that generate structured information mapping to specific data types such as agent introduction or voicemail detection.","modelType":"Predictive","optional":true,"baseModel":"Twilio","aiPrivacyLevel":4,"trustLayer":{"baseModelCustomerData":{"value":true,"comments":["If the customer enables Data Logging functionality, then the Base Model is trained with customer data."]},"vendorModelCustomerData":{"value":true,"comments":["If the customer enables Data Logging functionality, then customer data is shared with Twilio to train the Base Model."]},"trainingDataAnonymized":{"value":false,"comments":null},"dataDeletion":{"value":true,"comments":["If the customer enables Data Logging functionality, then trained data might be deleted by the customer through written request. The customer can delete non-training data at any time using the API."]},"auditing":{"value":true,"comments":["The customer views output in the Conversation Intelligence (classic) API or Transcript Viewer."]},"dataStorage":"Until the customer deletes","compliance":{"loggingAndAuditTrails":{"value":true,"comments":null},"guardrails":{"value":true,"comments":null}},"inputOutputConsistency":{"value":true,"comments":null}},"linksAndResources":"https://www.twilio.com/docs/conversation-intelligence-classic/pre-built-operators"}
```

### OpenAI GPT-4o mini

```json
{"name":"Conversation Intelligence (classic) - OpenAI","description":"Language Operators with OpenAI in Conversation Intelligence (classic). Used for Generative Custom Operators, as well as Prebuilt Operators for Summarization and Sentiment Analysis.","modelType":"Generative","optional":true,"baseModel":"OpenAI GPT-4o mini","aiPrivacyLevel":null,"trustLayer":{"baseModelCustomerData":{"value":false,"comments":null},"vendorModelCustomerData":{"value":false,"comments":["Customer data is shared with the Model Vendor for processing only. Customer data isn't used to train the Base Model."]},"trainingDataAnonymized":{"value":null,"comments":null},"dataDeletion":{"value":true,"comments":["Language Operator input and output are deleted when the customer deletes the transcript."]},"auditing":{"value":true,"comments":["The customer views output in the Conversation Intelligence (classic) API or Transcript Viewer."]},"dataStorage":"Until the customer deletes it","compliance":{"loggingAndAuditTrails":{"value":true,"comments":null},"guardrails":{"value":true,"comments":null}},"inputOutputConsistency":{"value":true,"comments":null}},"linksAndResources":"Generative Custom Operators: https://www.twilio.com/docs/conversation-intelligence-classic/generative-custom-operators, Prebuilt Operators: https://www.twilio.com/docs/conversation-intelligence-classic/pre-built-operators"}
```

### Azure OpenAI GPT-4o mini \[#azure-openai]

```json
{"name":"Conversation Intelligence (classic) - Azure OpenAI","description":"Language Operators with Azure OpenAI in Conversation Intelligence (classic). Used for Generative Custom Operators, as well as Prebuilt Operators for Summarization and Sentiment Analysis.","modelType":"Generative","optional":true,"baseModel":"Azure OpenAI GPT-4o mini","aiPrivacyLevel":null,"trustLayer":{"baseModelCustomerData":{"value":false,"comments":null},"vendorModelCustomerData":{"value":false,"comments":["Customer data is shared with the Model Vendor for processing only. Customer data isn't used to train the Base Model."]},"trainingDataAnonymized":{"value":null,"comments":null},"dataDeletion":{"value":true,"comments":["Language Operator input and output are deleted when the customer deletes the transcript."]},"auditing":{"value":true,"comments":["The customer views output in the Conversation Intelligence (classic) API or Transcript Viewer."]},"dataStorage":"Until the customer deletes it","compliance":{"loggingAndAuditTrails":{"value":true,"comments":null},"guardrails":{"value":true,"comments":null}},"inputOutputConsistency":{"value":true,"comments":null}},"linksAndResources":"Generative Custom Operators: https://www.twilio.com/docs/conversation-intelligence-classic/generative-custom-operators, Prebuilt Operators: https://www.twilio.com/docs/conversation-intelligence-classic/pre-built-operators"}
```

### Amazon Comprehend

```json
{"name":"Conversation Intelligence (classic) - Amazon Comprehend","description":"Language Operators with Amazon Comprehend in Conversation Intelligence (classic) to detect entities in your conversations such as products, quantities, or locations.","modelType":"Predictive and Generative","optional":true,"baseModel":"Amazon Comprehend","aiPrivacyLevel":null,"trustLayer":{"baseModelCustomerData":{"value":false,"comments":null},"vendorModelCustomerData":{"value":false,"comments":["Customer data is shared with the Model Vendor for processing only. Customer data isn't used to train the Base Model."]},"trainingDataAnonymized":{"value":null,"comments":null},"dataDeletion":{"value":true,"comments":["Language Operator input and output are deleted when the customer deletes the transcript."]},"auditing":{"value":true,"comments":["The customer views output in the Conversation Intelligence (classic) API or Transcript Viewer."]},"dataStorage":"Until the customer deletes it","compliance":{"loggingAndAuditTrails":{"value":true,"comments":null},"guardrails":{"value":true,"comments":null}},"inputOutputConsistency":{"value":true,"comments":null}},"linksAndResources":"https://www.twilio.com/docs/conversation-intelligence-classic/pre-built-operators"}
```

### Transcription Vendors: Deepgram, Google, and Amazon

```json
{"name":"Speech to Text Transcriptions - Programmable Voice, Twilio Video, and Conversation Intelligence (classic)","description":"Generate speech to text voice transcriptions (real-time and post-call) in Programmable Voice, Twilio Video, and Conversation Intelligence (classic).","modelType":"Generative and Predictive - Automatic Speech Recognition","optional":true,"baseModel":"Deepgram Speech-to-Text, Google Speech-to-Text, Amazon Transcribe","aiPrivacyLevel":null,"trustLayer":{"baseModelCustomerData":{"value":false,"comments":["Conversation Intelligence (classic), Programmable Voice, and Twilio Video only use the default Base Model provided by the Model Vendor. The Base Model is not trained using customer data."]},"vendorModelCustomerData":{"value":false,"comments":["Conversation Intelligence (classic), Programmable Voice, and Twilio Video only use the default Base Model provided by the Model Vendor. The Base Model is not trained using customer data."]},"trainingDataAnonymized":{"value":null,"comments":["Base Model is not trained using any customer data."]},"dataDeletion":{"value":true,"comments":["Transcriptions are deleted by the customer using the Conversation Intelligence (classic) API or when a customer account is deprovisioned."]},"auditing":{"value":true,"comments":["The customer views output in the Conversation Intelligence (classic) API or Transcript Viewer."]},"dataStorage":"Until the customer deletes","compliance":{"loggingAndAuditTrails":{"value":true,"comments":["The customer can listen to the input (recording) and view the output (transcript)."]},"guardrails":{"value":true,"comments":["The customer can listen to the input (recording) and view the output (transcript). "]}},"inputOutputConsistency":{"value":true,"comments":["The customer is responsible for human review."]}},"linksAndResources":"https://www.twilio.com/docs/conversation-intelligence-classic"}
```

### Private AI

```json
{"name":"Conversation Intelligence (classic) - PII Redaction","description":"Identify, redact, and extract PII in transcripts and recordings in Conversation Intelligence (classic).","modelType":"Predictive","optional":true,"baseModel":"Private AI","aiPrivacyLevel":null,"trustLayer":{"baseModelCustomerData":{"value":false,"comments":["Conversation Intelligence (classic) only uses the default Base Model provided by the Model Vendor. The Base Model isn't trained using customer data. "]},"vendorModelCustomerData":{"value":false,"comments":["Twilio hosts and manages its own version of the Base Model. Customer Data isn't shared with Model Vendor, it is only shared with the Twilio-hosted Base Model."]},"trainingDataAnonymized":{"value":null,"comments":["Base Model isn't trained using any customer data."]},"dataDeletion":{"value":true,"comments":["Transcripts and recordings are deleted by the customer using the Conversation Intelligence (classic) API or when a customer account is deprovisioned. "]},"auditing":{"value":true,"comments":["The customer views output in the Conversation Intelligence (classic) API or Transcript Viewer. "]},"dataStorage":"Until the customer deletes","compliance":{"loggingAndAuditTrails":{"value":true,"comments":["The customer can listen to the input (recording) or view the original unredacted version, and view the output (redacted PII)."]},"guardrails":{"value":true,"comments":["The customer can listen to the input (recording) or view the original unredacted version, and view the output (redacted PII)."]}},"inputOutputConsistency":{"value":true,"comments":["The customer is responsible for human review."]}},"linksAndResources":"https://www.twilio.com/docs/conversation-intelligence-classic"}
```
