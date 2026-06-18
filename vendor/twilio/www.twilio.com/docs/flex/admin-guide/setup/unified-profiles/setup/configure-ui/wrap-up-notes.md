# Wrap-up notes (Public Beta)

> \[!IMPORTANT]
>
> Agent Copilot is currently available as a Public Beta product and the information contained in this document is subject to change. This means that some features are not yet implemented and others may be changed before the product is declared as Generally Available. Public Beta products are not covered by a SLA.

> \[!WARNING]
>
> Agent Copilot is not a HIPAA Eligible Service or PCI compliant and should not be used in Flex workflows that are subject to HIPAA or PCI. However, we offer mitigation tools such as PII redaction. To learn more, see [AI data use](/docs/flex/admin-guide/setup/copilot#ai-data-use).

## Overview

Enable the wrap-up notes component to display auto-generated notes about a task. When a task ends, agents in Flex UI see an AI-generated conversation summary, predicted customer sentiment, and a selected disposition code. Agent reviewers can view and edit generated notes during task wrap-up before they are saved and submitted.

![Example of wrap-up notes in the Flex UI.](https://docs-resources.prod.twilio.com/e805e4c83facb011411d8a8a4518778f00c82cdbdf39ff229b61ed15492d5d0e.png)

Before you can enable this component, make sure you have configured [Agent Copilot](/docs/flex/admin-guide/setup/copilot/configure) and [wrap-up notes auto-generation service](/docs/flex/admin-guide/setup/copilot/setup).
