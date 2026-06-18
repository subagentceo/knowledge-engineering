> This is a page from the ElevenLabs documentation. For a complete page index, fetch https://elevenlabs.io/docs/llms.txt. For the full documentation in a single file, fetch https://elevenlabs.io/docs/llms-full.txt.

# WhatsApp tools

## Overview

You can give your agent a tool to send messages on WhatsApp, even during conversations on another channel (e.g. phone).

## Setup

Follow the instructions [here](/docs/eleven-agents/whatsapp) to import your WhatsApp business
account.

Go to the [Integrations page](https://elevenlabs.io/app/agents/integrations), click the ***Add
integration*** button, select WhatsApp and connect your account:

<img src="https://files.buildwithfern.com/https://elevenlabs.docs.buildwithfern.com/docs/e560b1b2a4345bd2fbe9519f7146b87d195268955d2b2aa2c6221629d97e4384/assets/images/agents/whatsapp/integration.png" alt="WhatsApp integration" />

Go to the [Tools page](https://elevenlabs.io/app/agents/tools), click the ***Add integration
tool*** button, select the WhatsApp integration and the ***Send Message*** tool:

<img src="https://files.buildwithfern.com/https://elevenlabs.docs.buildwithfern.com/docs/e85dcc3a3e3581250604311c516e080fb7f61f100b98b4b55be5f6071866e888/assets/images/agents/whatsapp/tool.png" alt="WhatsApp tool" />

## Using the tool

Go to [WhatsApp Manager](https://business.facebook.com/latest/whatsapp_manager/), open the
***Manage templates*** page and create a message template:

<img src="https://files.buildwithfern.com/https://elevenlabs.docs.buildwithfern.com/docs/e2d2c8bcab0b4c664261a57658627fd4368fc00e4768e4bd4c16264c59d07e16/assets/images/agents/whatsapp/template-simple.png" alt="WhatsApp message template" />

The tool currently only supports parameters in message body.

Go to your agent configuration and add the tool:

<img src="https://files.buildwithfern.com/https://elevenlabs.docs.buildwithfern.com/docs/0e078a4206030111493387ec6c9bc2235106ac3cb763d4555dd1ae7307c6d46a/assets/images/agents/whatsapp/tool-agent-config-tools.png" alt="Agent configuration: tools" />

In the system prompt, tell the agent: - when to use the tool - what template name and language
code to use - what parameters to pass

<img src="https://files.buildwithfern.com/https://elevenlabs.docs.buildwithfern.com/docs/893aa34f7bd3e01a0cbb919f08f801398de318d46e1d8d1a6c72a945193f7de9/assets/images/agents/whatsapp/tool-agent-config-prompt.png" alt="Agent configuration: prompt" />

Finally, it's time to test the tool configuration:

<img src="https://files.buildwithfern.com/https://elevenlabs.docs.buildwithfern.com/docs/47d48232a04cd47112d5637288c6225761f7f66f3016f5fc7d9cf38a34b3782d/assets/images/agents/whatsapp/tool-conversation.png" alt="Test conversation" />

<img src="https://files.buildwithfern.com/https://elevenlabs.docs.buildwithfern.com/docs/6b3809101caa5d38cf7ea761feb38f4ee316bfde4bef20e2e22eca6b14d0262f/assets/images/agents/whatsapp/tool-message-simple.png" alt="Test message received" width="300" />