# Using Enterprise Knowledge APIs

This page outlines how to authenticate and use the Enterprise Knowledge APIs.

## Authentication

Twilio supports HTTP Basic authentication. To authenticate, include the Basic Authentication header where the username:password pair is one of the following:

| Username    | Password       | Best practice                                                                                                                                            |
| ----------- | -------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------- |
| API Key     | API Key Secret | This is the recommended way to authenticate with the Twilio APIs. When a key is compromised or no longer used, revoke it to prevent unauthorized access. |
| Account SID | AuthToken      | Limit your use to local testing.                                                                                                                         |

See our [Twilio API requests](/docs/usage/requests-to-twilio) doc to learn more about using Twilio APIs.

## Add knowledge bases and sources

A **knowledge base** organizes knowledge sources into containers that can be semantically indexed and searched to provide contextual information for AI and retrieval use cases. For example, FAQs, warranty policy, or product information necessary for your business needs.

Each Twilio account can have multiple knowledge bases and each base can contain multiple sources such as documents, websites, or text content that can be used for context and information retrieval.

**Knowledge sources** represent unstructured or semi-structured data (web pages and raw text) that are processed into searchable chunks for information retrieval and AI workflows.

Create a new knowledge source from various data sources such as web content, files, or raw text. Knowledge resources are processed and indexed to enable semantic search and retrieval.

#### Best practices

Keep the following best practices in mind when working with knowledge bases and sources:

* **Access and optimize content**: Regularly evaluate your existing knowledge sources for accuracy, relevance, and coverage. Identify any gaps or outdated information that could hinder an AI or human agent's performance.
* **Simplify and structure content**: Ensure that your content is clear and concise. Use headings, bullet points, and metadata to make information straightforward to navigate for both agents and end users.
* **Prioritize high-impact content**: Focus on updating and maintaining content that is frequently accessed or critical to customer interactions. Consider using analytics to determine which knowledge entries are most valuable.

```bash
POST "https://knowledge.twilio.com/v2/ControlPlane/KnowledgeBases"
```

Request body schema for knowledge bases

| Name                             | Type   | Description                                                                                                                                                                                                                    |
| -------------------------------- | ------ | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| displayName <br />(**Required**) | string | Provides a unique and addressable name to be assigned to this knowledge base. This name is assigned by the developer and can be used in addition to the ID. It is intended to be human-readable and unique within the account. |

See the full [knowledge bases API reference](/docs/api/knowledge/v2/knowledge-bases) to learn more.

```bash
POST "https://knowledge.twilio.com/v2/KnowledgeBases/{kbId}/Knowledge"
```

Path parameters

| Name                      | Type   | Description                                                    |
| ------------------------- | ------ | -------------------------------------------------------------- |
| kbID <br />(**Required**) | string | A unique knowledge base ID using Twilio Type ID (TTID) format. |

Request body schema for knowledge sources

| Name                                            | Type                      | Description                                                                                                                                           |
| ----------------------------------------------- | ------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------- |
| name <br />(**Required**)                       | string \<= 30 characters  | The name of the knowledge source.                                                                                                                     |
| description                                     | string \<=1024 characters | A detailed description of the knowledge source and when to use it. This helps provide context about the content and its intended purpose.             |
| source <br />(**Required**)                     | string                    | Details specific to the knowledge source type. Each knowledge source type has its own set of configuration parameters and source-specific properties. |
| source.type                                     | string                    | The type of knowledge source, such as text or web.                                                                                                    |
| source.content.text *Required if source = text* | string \<=1024 characters | The raw text content to be processed.                                                                                                                 |
| source.url.web *Required if source = web*       | string \<url>             | The URL to crawl for web content.                                                                                                                     |
| source.url.web.crawlDepth                       | integer \[1-10]           | The maximum depth to crawl from the source URL.                                                                                                       |
| source.url.web.crawlPeriod                      | string                    | Default: "NEVER" Enum: "WEEKLY" "BIWEEKLY" "MONTHLY" "NEVER"<br /> Frequency of re-crawling the website for updated content.                          |

See the full [knowledge sources API reference](/docs/api/knowledge/v2/knowledge) to learn more.
