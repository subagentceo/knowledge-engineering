# AI Nutrition Facts for Agent Copilot (public beta)

> \[!IMPORTANT]
>
> Agent Copilot is currently available as a Public Beta product and the information contained in this document is subject to change. This means that some features are not yet implemented and others may be changed before the product is declared as Generally Available. Public Beta products are not covered by a SLA.

> \[!WARNING]
>
> Agent Copilot is not a HIPAA Eligible Service or PCI compliant and should not be used in Flex workflows that are subject to HIPAA or PCI. However, we offer mitigation tools such as PII redaction. To learn more, see [AI data use](/docs/flex/admin-guide/setup/copilot#ai-data-use).

## Overview

Agent Copilot uses third-party machine learning technologies. [Twilio's AI Nutrition Facts](https://nutrition-facts.ai/) provide an overview of the AI feature you're using, so you can better understand how the AI is working with your data. Agent Copilot's AI qualities are outlined in the following Nutrition Facts label. For more information and the glossary regarding the AI Nutrition Facts Label, refer to [Twilio's AI Nutrition Facts page](https://nutrition-facts.ai/).

### Customer highlights and wrap-up notes

```json
{"name":"Agent Copilot: Customer highlights and wrap-up notes","description":"Agent Copilot provides customer highlights and assists the agent during wrap-up by providing a summary of the interaction, customer sentiment, topics, subtopics, disposition codes, and language detection. Agent Copilot supports both voice and messaging channels.","modelType":"Generative","optional":true,"baseModel":"OpenAI - GPT-4o mini, Google Speech-to-Text API","aiPrivacyLevel":null,"trustLayer":{"baseModelCustomerData":{"value":false,"comments":["For summarization (incl. voice transcription), sentiment, disposition codes, customer highlights, and language detection, Agent Copilot only uses the default Base Model provided by the Model Vendors. The Base Models are not trained using Customer Data."]},"vendorModelCustomerData":{"value":false,"comments":["Customer Data is shared with the Model Vendors only to generate an Output. Customer Data is not sent to the Model Vendors to train the Base Model."]},"trainingDataAnonymized":{"value":null,"comments":null},"dataDeletion":{"value":true,"comments":null},"auditing":{"value":true,"comments":["By default, a human is in the loop. However, Customers can configure the features to be fully autonomous."]},"dataStorage":"30 days","compliance":{"loggingAndAuditTrails":{"value":true,"comments":null},"guardrails":{"value":true,"comments":null}},"inputOutputConsistency":{"value":true,"comments":null}},"linksAndResources":""}
```

### Ask Copilot and suggested responses

```json
{"name":"Agent Copilot: Ask Copilot and suggested responses","description":"Copilot can help contact center agents be effective and empathetic when they are communicating with their customers. It provides recommendations on how to respond to the customer and agents can ask follow up questions. Customers can also share their Knowledge articles with Copilot to make the response grounded to their policies and product information.","modelType":"Generative Model, Vector Search","optional":true,"baseModel":"OpenAI - OpenAI GPT-4o, GPT-4o mini","aiPrivacyLevel":1,"trustLayer":{"baseModelCustomerData":{"value":false,"comments":null},"vendorModelCustomerData":{"value":false,"comments":null},"trainingDataAnonymized":{"value":null,"comments":["No customer data is used to train the model."]},"dataDeletion":{"value":true,"comments":null},"auditing":{"value":true,"comments":null},"dataStorage":"7 days","compliance":{"loggingAndAuditTrails":{"value":true,"comments":["We display the sources that were used to curate the answer."]},"guardrails":{"value":true,"comments":null}},"inputOutputConsistency":{"value":true,"comments":null}},"linksAndResources":""}
```
