# Flex

## Flex

Flex is a digital engagement center for sales and customer support teams that gives companies control over how they communicate with customers and prospects across all channels, and at every stage of the customer journey.

Flex integrates with your existing solutions to drive revenue by:

* Providing your contact center with channels and integrations that reduce friction and drive repeat sales
* Enabling high-touch, contextual direct sales interactions
* Facilitating relationship management as an in-app digital concierge

[Get started](/docs/flex/quickstart/getting-started-plugin)

[Build with the Flex SDK](/docs/flex/developer/flex-sdk/getting-started)

## Tutorial

```jsx !sample
import React from 'react';
import { withTaskContext } from '@twilio/flex-ui';

const TaskSIDText = {
  color: "#FFF"
};

class CustomCRM extends React.Component {
  render() {
    const { task } = this.props;
    return <div style={TaskSIDText}>
      <p>Access agent task data</p>
      <p>Task SID: <span style={{ fontWeight: 'bold' }}>{task ? task.sid : 'No task selected'}</span></p>
    </div>;
  }
}
```

1. Twilio sets up the foundation for your contact center
2. You customize your Flex instance with the workflows, channels, and systems that matter to your business
3. Gain operational insight and quickly deploy updates

Tutorial code output: "Deploy and manage your new contact center!"

## Developer documentation

Learn how to add channels, create engagement workflows and intelligent routing, and gain operational insights. As a developer, Flex enables you to customize and deploy your contact center with tools like the programmable Flex UI, the Plugin Builder, the Flex SDK, and Flex Insights.

### Build your contact center

Start building with Flex

* [Developer docs overview](/docs/flex/developer)
* [Build a Plugin](/docs/flex/quickstart/getting-started-plugin)
* [Build with the Flex SDK](/docs/flex/developer/flex-sdk/getting-started)
* [The Flex UI](/docs/flex/developer/ui)

## Administrator guide

Learn how to set up and administer your Flex contact center. Learn about Flex core concepts and the different steps involved in setting up and managing your Flex instance.

### Core concepts

* [Numbers](/docs/flex/admin-guide/core-concepts/numbers)
* [Voice](/docs/flex/admin-guide/core-concepts/voice)
* [Twilio Runtime](/docs/flex/admin-guide/core-concepts/studio-flows-functions-assets-twiml)
* [Conversations](/docs/flex/admin-guide/core-concepts/conversations)
* [Chat and Messaging](/docs/flex/admin-guide/core-concepts/chat-and-messaging)
* [Routing](/docs/flex/admin-guide/core-concepts/routing)
* [Flex UI](/docs/flex/admin-guide/core-concepts/flex-ui)
* [Flex SDK](/docs/flex/developer/flex-sdk)

### AI features

* [AI overview](/docs/flex/ai)
* [Unified Profiles in Flex](/docs/flex/admin-guide/setup/unified-profiles)
* [Agent Copilot](/docs/flex/admin-guide/setup/copilot)

## End user guides

Explore how common use cases work in Flex. Whether you're starting an outbound call, initiating a warm transfer, or monitoring agent activity, the end user guides will provide you and your agents the context you need to get the most out of Flex's existing architecture.

### Dialpad and calls

* [Make an outbound call](/docs/flex/end-user-guide/dialpad-use)
* [Initiate a warm transfer](/docs/flex/end-user-guide/warm-transfer)
* [Check an audio device's health](/docs/flex/end-user-guide/initial-audio-device-check)

### Insights and analytics

* [Get visibility into inbound tasks in your contact center](/docs/flex/end-user-guide/real-time-reporting/real-time-queues-view)
* [Monitor agent activity](/docs/flex/end-user-guide/real-time-reporting/monitor-agent-activity)
* [Focus on a specific agent or a subset of agents](/docs/flex/end-user-guide/team-view-filters)

## Related Products

### TaskRouter

Handle routing in your contact center.

[Product Docs](/docs/taskrouter)

### SIP Trunking

Provide global connectivity for VoIP infrastructure, deployable in minutes.

[Product Docs](/docs/sip-trunking)

### Studio

Quickly deploy IVRs and Chatbots using a visual editor.

[Product Docs](/docs/studio)

### Bring your own carrier

Connect your existing PSTN carrier to Twilio's programmable platform.

[Product Docs](/docs/voice/bring-your-own-carrier-byoc)

### Agent-assisted payments

Enable agents to collect PCI-compliant payments on the phone.

[Product Docs](/docs/voice/twiml/pay)
