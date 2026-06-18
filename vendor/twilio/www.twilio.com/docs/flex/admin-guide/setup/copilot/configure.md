# Configure Agent Copilot (public beta)

> \[!IMPORTANT]
>
> Agent Copilot is currently available as a Public Beta product and the information contained in this document is subject to change. This means that some features are not yet implemented and others may be changed before the product is declared as Generally Available. Public Beta products are not covered by a SLA.

> \[!WARNING]
>
> Agent Copilot is not a HIPAA Eligible Service or PCI compliant and should not be used in Flex workflows that are subject to HIPAA or PCI. However, we offer mitigation tools such as PII redaction. To learn more, see [AI data use](/docs/flex/admin-guide/setup/copilot#ai-data-use).

## Prerequisites

* Paid Flex account (not a free trial account)
* [Flex UI 2.6.0 or later](https://console.twilio.com/us1/develop/flex/settings/ui-versions)

## Configure access control

Before you can turn on Agent Copilot auto-generation services, you need to configure **access control**. Access control lets you choose the queues that use all services within Agent Copilot.

1. In [Twilio Console](https://console.twilio.com/), go to **Flex** > **AI features** > **Agent Copilot**.
2. Under **Access control settings**, choose which queues you'd like to use for Agent Copilot: **No queues**, **Only selected queues**, or **All queues**.
3. Click **Save access control settings**.

## What's next

Configure the following Agent Copilot features:

* [Customer highlights](/docs/flex/admin-guide/setup/copilot/highlights)
* [Wrap-up notes](/docs/flex/admin-guide/setup/copilot/setup)
* [Transfer summary](/docs/flex/admin-guide/setup/conversations/messaging-transfers)
* [Real-time assist features](/docs/flex/admin-guide/setup/copilot/real-time-assist)
