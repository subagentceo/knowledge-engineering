> This is a page from the ElevenLabs documentation. For a complete page index, fetch https://elevenlabs.io/docs/llms.txt. For the full documentation in a single file, fetch https://elevenlabs.io/docs/llms-full.txt.

# Knowledge base dashboard

## Overview

The [knowledge base dashboard](https://elevenlabs.io/app/agents/knowledge-base) provides a centralized way to manage documents and track their usage across your AI agents. This guide explains how to navigate and use the knowledge base dashboard effectively.

![Knowledge base main interface showing list of
documents](https://files.buildwithfern.com/https://elevenlabs.docs.buildwithfern.com/docs/d0c15168af40c776865e2ef48c39234287e30eeeb2752c74083704749074924f/assets/images/conversational-ai/kb-content.png)

## Adding existing documents to agents

When configuring an agent's knowledge base, you can easily add existing documents to an agent.

1. Navigate to the agent's [configuration](https://elevenlabs.io/app/agents/)
2. Click "Add document" in the knowledge base section of the "Agent" tab.
3. The option to select from your existing knowledge base documents or upload a new document will appear.

![Interface for adding documents to an
agent](https://files.buildwithfern.com/https://elevenlabs.docs.buildwithfern.com/docs/8eda3a9e686e87705e0d1f1e82a9d01b4960a2c00f597253995b589421650995/assets/images/conversational-ai/kb-add-doc-items.png)

Documents can be reused across multiple agents, making it efficient to maintain consistent
knowledge across your workspace.

## Document dependencies

Each document in your knowledge base includes a "Agents" tab that shows which agents currently depend on that document.

![Dependent agents tab showing which agents use a
document](https://files.buildwithfern.com/https://elevenlabs.docs.buildwithfern.com/docs/6bed2a22b4ea13dc6e1048b94398c5dd438fc5fed87ca27e575c4351c83181de/assets/images/conversational-ai/kb-dependent-agents.png)

It is not possible to delete a document if any agent depends on it.