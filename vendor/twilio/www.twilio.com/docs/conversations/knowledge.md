# Enterprise Knowledge

> \[!NOTE]
>
> Enterprise Knowledge, including the APIs, may use artificial intelligence or machine learning technologies and is subject to the terms of the [Predictive and Generative AI/ML Features Addendum](https://www.twilio.com/en-us/legal/ai-terms/predictive-generative-ai-features). For more details on AI usage and data, see the [AI Nutrition Facts](/docs/conversations/knowledge/nutrition-facts).
>
> Enterprise Knowledge is not a HIPAA Eligible Service or PCI compliant and should not be enabled in workflows that are subject to HIPAA or PCI.
>
> Conversations products are only available in the [new Twilio Console](https://1console.twilio.com). If your account hasn't been migrated, you'll be redirected to the legacy Console where these products won't appear.

## Enterprise Knowledge

Enterprise Knowledge is a centralized, searchable repository for documents, website, and raw text content. It allows AI and human agents to access accurate, approved information during customer interactions, reducing errors and ensuring responses are based on trusted sources rather than model hallucinations.

With Enterprise Knowledge, your documents, websites, and content becomes instantly accessible for agents, supporting efficient and informed conversations.

## Add a knowledge base

A knowledge base is a container for your knowledge sources which can be semantically indexed and searched upon to provide contextual information for AI and retrieval use cases. For example, FAQs, warranty policy, or product information necessary for your business needs.

You can connect knowledge bases to Twilio Agent Connect (TAC) or Conversation Intelligence (CINTEL) to provide real-time context alongside Conversation Memory.

Use the following steps to add a knowledge base:

1. In the Console, go to **Products & services** > **Enterprise Knowledge** > **Knowledge Bases**.
2. If you haven't already done so, click **Upgrade your account for full access**.
3. Click **Create knowledge base**.
4. Add a unique name and description, then click **Create knowledge base**.

After creating your knowledge base, you can select it from the Knowledge Base overview page to view and add knowledge sources.

## Add a knowledge source

A knowledge source can be data from a website, raw text, or file upload that's processed for information retrieval and AI workflows.

Use the following steps to add a knowledge source:

1. In the Console, go to **Products & services** > **Enterprise Knowledge** > **Knowledge bases**.
2. Select a Knowledge base that you'd like to add a source to, then click **Add Knowledge Source**.
3. Add a name and description for your source.
4. In the **Data type** dropdown menu, select **Website**, **Text**, or **File Upload** for your source.
   1. For a website source, add a URL, page depth, and auto-update frequency.
   2. For a text source, add a title and the raw text that you'd like to provide as knowledge for your agents.
   3. For a file upload, add a name, description, and data type from the drop down menu. Then select or drag and drop your file to upload.
5. Click **Save new source**.

After saving your source, you'll see your knowledge source displayed on the Knowledge overview page. You can also use the overview page to edit, refresh, and delete knowledge sources.
