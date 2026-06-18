# Knowledge for Agent Copilot (public beta)

> \[!IMPORTANT]
>
> Agent Copilot is currently available as a Public Beta product and the information contained in this document is subject to change. This means that some features are not yet implemented and others may be changed before the product is declared as Generally Available. Public Beta products are not covered by a SLA.

> \[!WARNING]
>
> Agent Copilot is not a HIPAA Eligible Service or PCI compliant and should not be used in Flex workflows that are subject to HIPAA or PCI. However, we offer mitigation tools such as PII redaction. To learn more, see [AI data use](/docs/flex/admin-guide/setup/copilot#ai-data-use).

## Knowledge sources

Agent Copilot uses uploaded knowledge sources to provide relevant information during customer interactions. Some examples of sources you can upload are:

* Help center or knowledge base articles
* Canned responses or support snippets
* Technical documents
* Wiki pages or playbooks

You can upload the following types of sources:

* Files
* Plain text
* Webpages
* External databases

## Types of information

To prevent unwanted information from being shared with customers, only upload material that you are comfortable sharing with customers. We recommend using sources that agents typically share with customers.

Agent Copilot does not indicate if information sources are internal only or available to your customers. If you do upload internal information, it is only available to Agent Copilot and not shared outside your company or used to train AI features.

### Supported file types

Files types supported for upload include:

* CSV
* DOC and DOCX
* JSONL
* MD and MDX
* MSG
* PDF
* PPT and PPTX
* TSV
* TXT
* XLSX

APIs from other software (like Salesforce), images, and videos are not supported.

The maximum size per file is 16 MB.

### Maintaining accuracy

To keep your source material up-to-date and accurate, we recommend establishing a regular review cadence for your source material with your stakeholders and subject matter experts. We also suggest providing your agents with details about who to contact if they find outdated or incorrect information.

## How knowledge is processed

* Each knowledge source is processed asynchronously. After processing is complete, a **completed** status shows next to the knowledge entry in the Console.
* We recommend configuring knowledge sources in off-hours so that auto-updates occur when agents aren't working.

## Configure knowledge sources

To add a knowledge source in Flex UI:

1. In [Twilio Console](https://console.twilio.com/), go to **Flex** > **AI features** > **Agent Copilot**.
2. Under **Ask Copilot** or **Suggested responses**, click **Configure**. Knowledge will upload for both features, but you will need to enable knowledge separately for each feature.
3. Under **Settings**, click **Go to Knowledge**.
4. Click **Add source**.
5. Consult the following table to complete the remaining fields.
6. Click **Add source**.
7. When a **completed** status shows, toggle on **Enabled** to turn on the knowledge source. By default, it's off.
   ![Enable knowledge source.](https://docs-resources.prod.twilio.com/b516f056867b67d84df66d9143262f2f116cfef6dfa73c4e3aca441e9090eaf6.png)
8. To finish configuration and turn on Ask Copilot or Suggested responses, complete the steps in [Real-time Assist](/docs/flex/admin-guide/setup/copilot/real-time-assist).

### Knowledge attributes

| Attribute name                              | Description                                                                                                                                                                                                                         | Example                                                                         |
| ------------------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------- |
| Name                                        | The name of your knowledge source. It should be short, distinct, and have at least five characters.                                                                                                                                 | Product FAQs                                                                    |
| Description                                 | A short summary of the source data. This description helps determine when Copilot uses this knowledge.                                                                                                                              | Use this to reference frequently asked questions about our products.            |
| Data type                                   | Supported options are: website, raw text, file upload, or external vector database.                                                                                                                                                 | file upload                                                                     |
| \[Website] URL                              | A publicly-accessible URL containing helpful information.                                                                                                                                                                           | https://example.com/faqs                                                        |
| \[Website] Page depth                       | Defines how deep Agent Copilot should scan links and import content from a website.  Each level represents an additional click from the starting page.  Agent Copilot crawls the site up to 3 levels deep, with a 500 page maximum. | 2                                                                               |
| \[Website] Auto-Update                      | The frequency of re-importing a live website. Can be never, weekly, or monthly. We recommend auto-updating monthly. Auto-updates happen based on the time of the original upload and can take a moment to complete.                 | Monthly                                                                         |
| \[Raw text] Manual text                     | Upload text directly.                                                                                                                                                                                                               | Product A: Specifications, Product B: User guide, Product C: Installation guide |
| \[File upload] File                         | The file to import.  Supported file types are: .csv, .doc, .docx, .jsonl, .md, .mdx, .msg, .pdf, .ppt, .pptx, .tsv, .txt, .xlsx.  Max file size is 16 MB.                                                                           | example.pdf                                                                     |
| \[External vector database] Provider        | Integrate with your own vector database. Only Pinecone is supported.                                                                                                                                                                | Pinecone                                                                        |
| \[External vector database] Index           | The name of the index in your external DB.                                                                                                                                                                                          | product guides                                                                  |
| \[External vector database] Namespace       | The namespace in Pinecone.                                                                                                                                                                                                          | product-faq-namespace                                                           |
| \[External vector database] Embedding model | Supported models are: text-embedding-3-large \| OpenAI, text-embedding-3-small \| OpenAI, text-embedding-ada-002 \| OpenAI, multilingual-e5-large \| Microsoft                                                                      | text-embedding-3-large \| OpenAI                                                |
| \[External vector database] API Key         | Your Pinecone API key.  Click **Connect to Pinecone** to connect your API key.                                                                                                                                                      | N/A                                                                             |

You can also [upload your knowledge sources using the Knowledge API](/docs/flex/developer/copilot/upload-source-api).

## Troubleshooting

### If Agent Copilot isn't referencing knowledge as expected

Modify the knowledge source description to include a more specific prompt about when it should be used. For example, "Use this source when the user asks *any* question about our clothing sizes."
