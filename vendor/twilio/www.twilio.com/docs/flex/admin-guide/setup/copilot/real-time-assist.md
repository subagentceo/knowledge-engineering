# Configure real time-assist features for Agent Copilot (public beta)

> \[!IMPORTANT]
>
> Agent Copilot is currently available as a Public Beta product and the information contained in this document is subject to change. This means that some features are not yet implemented and others may be changed before the product is declared as Generally Available. Public Beta products are not covered by a SLA.

> \[!WARNING]
>
> Agent Copilot is not a HIPAA Eligible Service or PCI compliant and should not be used in Flex workflows that are subject to HIPAA or PCI. However, we offer mitigation tools such as PII redaction. To learn more, see [AI data use](/docs/flex/admin-guide/setup/copilot#ai-data-use).

## Overview

Customer care representatives can solve customer problems in real-time with **Ask Copilot** and **Suggested responses**. These features combine generative AI with your knowledge sources and interaction context to automatically find and show agents relevant information.

### Suggested responses

During customer interactions, Agent Copilot automatically recommends a response that agents can share.

![Agent view of a suggested response in Flex UI.](https://docs-resources.prod.twilio.com/b5a0ad914efb64935c73cd3d73322667b8bdd632415b26e23d5634a7a8000c0a.png)

### Ask Copilot

As agents chat with customers, Ask Copilot lets agents manually search questions and keywords. This option is helpful if agents want more details than a suggested response offers or need to follow up with more questions.

Agent Copilot uses semantic search to interpret agent queries, so agents don't need to search with exact terms or include punctuation.

![Agent view of Ask Copilot in Flex UI.](https://docs-resources.prod.twilio.com/b71cdd81af961a29bde3a20b26df310ea0a6b199b89cf9d4a378dcddd2a7907b.png)

## Data sources

To generate responses, Agent Copilot uses data from the following:

* Uploaded knowledge sources
* Interaction context from ongoing customer interactions

### Knowledge sources

When an agent asks a question, Ask Copilot identifies the three most relevant [uploaded knowledge sources](/docs/flex/admin-guide/setup/copilot/knowledge) and only uses their content to generate a response.

To ensure agents receive accurate and helpful answers, prioritize uploading knowledge sources that are comprehensive and relevant to common customer questions.

### Interaction context

Interaction context helps inform the responses agents receive from Copilot. Copilot actively analyzes the interaction and uses data from it to provide more accurate answers.

If your security measures discourage the use of interaction data, you can turn off interaction context by channel for Ask Copilot. By default, interaction context is turned off.

## Configure Ask Copilot

### Prerequisites

* [Flex UI 2.13 or later](https://console.twilio.com/us1/develop/flex/settings/ui-versions)
* [Access control](/docs/flex/admin-guide/setup/copilot/configure) configured

### Step 1: Select channels for interaction context

If you want to turn on interaction context for Conversations or Voice channels, follow the steps below. If you only want Agent Copilot to use your uploaded knowledge sources to generate responses, you can skip this step. However, we recommend turning on both interaction context and knowledge sources for an improved experience.

1. In [Twilio Console](https://console.twilio.com/), go to **Flex** > **AI features** > **Agent Copilot**.
2. Under **Ask Copilot**, click **Configure**.
3. Under **Settings** > **Auto-generation settings** > **Interaction context**, select **Conversations** and/or **Voice** channels.
4. Click **Save auto-generation settings**.

### Step 2: Upload knowledge sources

1. Under **Settings**, click **Go to Knowledge**.
2. Click **Add source**.

To configure sources, see [Configure knowledge sources](/docs/flex/admin-guide/setup/copilot/knowledge).

### Step 3: Preview Ask Copilot component

If you want to preview what Ask Copilot looks like to agents in Flex UI, go to the [Ask Copilot page](https://console.twilio.com/us1/develop/flex/ai-features/copilot/ask-copilot), and under **Ask Copilot UI component**, click **Preview UI component**.

### Step 4: Turn on Ask Copilot service

From the [Ask Copilot page](https://console.twilio.com/us1/develop/flex/ai-features/copilot/ask-copilot), under **Ask Copilot service**, turn on **Auto-generation service**. Turning on this feature automatically turns on the component in Flex UI.

![Turn on auto-generation for Ask Copilot.](https://docs-resources.prod.twilio.com/b9789c830715993801992e3b6f872af4b1e7266f835f84a39fe6f716c30aa182.png)

## Configure suggested responses

### Prerequisites

* [Flex UI 2.13 or later](https://console.twilio.com/us1/develop/flex/settings/ui-versions)
* [Access control](/docs/flex/admin-guide/setup/copilot/configure) configured
* One or more knowledge sources uploaded

### Step 1: Select channels

Choose which channels you'd like to use suggested responses with. Agents can access Agent Copilot when they have an active task.

1. In [Twilio Console](https://console.twilio.com/), go to **Flex** > **AI features** > **Agent Copilot**.
2. Under **Suggested responses**, click **Configure**.
3. Under **Settings** > **Auto-generation settings**, select **Conversations** and/or **Voice** channels.
4. Click **Save auto-generation settings**.

### Step 2: Add a knowledge source

1. Under **Settings**, click **Go to Knowledge**.
2. Click **Add source**.

To configure sources, see [Configure knowledge sources](/docs/flex/admin-guide/setup/copilot/knowledge).

### Step 3: Preview suggested responses component

If you want to preview what suggested responses look like to agents in Flex UI, from the [Suggested responses page](https://console.twilio.com/us1/develop/flex/ai-features/copilot/suggested-responses), under **Suggested responses UI component**, click **Preview UI component**.

### Step 4: Turn on suggested responses service

From the [Suggested responses page](https://console.twilio.com/us1/develop/flex/ai-features/copilot/suggested-responses), under **Suggested responses service**, turn on **Auto-generation service**. Turning on this feature automatically turns on the component in Flex UI.
