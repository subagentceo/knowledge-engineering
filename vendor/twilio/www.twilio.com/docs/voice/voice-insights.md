# Voice Insights

## Voice Insights Overview

Voice Insights provides call quality analytics and aggregation tools for investigating Twilio calls and conferences. Sensors in the Twilio Voice SDKs and on Twilio media gateways gather call metrics and events and send them to the Voice Insights platform for analysis and aggregation.

After aggregation, Twilio Console presents these [Call Insights](#call-insights) and [Conference Insights](#conference-insights) through reporting dashboards and detailed summaries that highlight aspects of call and conference behavior. To access Voice Insights in Twilio Console, go to **Monitor** > **Insights** > **[Voice](https://1console.twilio.com/go?to=/account/__account__/us1/insights/voice)**. You can also find it in the [legacy Console](https://www.twilio.com/console/voice/insights).

Voice Insights for Twilio Voice SDKs allows you to react to call quality events directly in your Twilio SDK code. For a reference of related Voice SDK events, please see **[Details: Voice Insights SDK Events](/docs/voice/voice-insights/api/call/details-sdk-call-quality-events)**.

> \[!NOTE]
>
> Voice Insights data is available for calls or conferences made within the last 30 days.

**[Voice Insights Advanced Features](/docs/voice/voice-insights/advanced-features)** provide you with valuable additional analytical capabilities to investigate call and conference quality issues by

* exploring time-series data of metrics and event streams in the Twilio Console,
* programmatically accessing, via the [Voice Insights REST API](/docs/voice/voice-insights/api) or [Voice Insights Event Streams](/docs/voice/voice-insights/event-streams),

  * call summaries, call metrics, call insights events and call annotations, or
  * conference summaries and conference participant summaries.

> \[!NOTE]
>
> Advanced Features are available at an additional cost to regular call charges. Please, see our [Voice Pricing pages for Voice Insights pay-as-you-go and committed pricing information](https://www.twilio.com/en-us/voice/pricing/us).

Voice Insights is available for all calls and conferences made using

* one of the Twilio Voice SDKs:

  * [**Voice JavaScript SDK**](/docs/voice/sdks/javascript) (v1.3+),
  * [**Voice iOS SDK**](/docs/voice/sdks/ios) (v3.0+), or
  * [**Voice Android SDK**](/docs/voice/sdks/android) (v3.0+),
* the [**Programmable Voice APIs**](/docs/voice/api), or
* [**Elastic SIP Trunking**](/docs/sip-trunking).

## Call Insights

Call Insights provides multiple ways to use call metadata which allow you to see call parameters, investigate call metrics and event timelines, and understand detected quality issues.

The following table contains a reference to the documentation for features broken down by Console, [Voice Insights Event Stream](/docs/voice/voice-insights/event-streams) and [Call Insights REST API](/docs/voice/voice-insights/api/call). Where applicable for a feature, the table indicates whether [Voice Insights Advanced Features](/docs/voice/voice-insights/advanced-features) must be activated to use all or part of it.

| **Feature**                                                                                                                                  | **Description**                                                                                                                                                                                                                                                                                                                                                                |
| -------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| ***Console***                                                                                                                                |                                                                                                                                                                                                                                                                                                                                                                                |
| **[Call Insights Dashboard](/docs/voice/voice-insights/call-insights-dashboard)**                                                            | Use the Call Insights Dashboard as a powerful account-level aggregation tool to analyze trends in call volume and length as well as issues with connectivity and audio quality. Apply flexible filters to refine the analysis and dynamically update data visualizations and call logs.                                                                                        |
| **[Subaccount Call Insights Dashboard](/docs/voice/voice-insights/subaccount-call-insights-dashboard)**                                      | If you have a parent account with subaccounts, use the Subaccount Call Insights Dashboard to compare call volume and length across subaccounts. Gain insights into which of your subaccounts are outliers in terms of call quality performance.                                                                                                                                |
| **[Call Summary](/docs/voice/voice-insights/call-summary)**                                                                                  | Use the Call Summary to see call metadata, connection parameters, and quality indicators in a single cumulative view for a call placed on the Twilio platform. *Activate Voice Insights Advanced Features to view time-series data of metrics and event streams as part of the Call Summary.*                                                                                  |
| **[Voice Insights IDA (Intelligence Discovery AI Assistant)](/docs/voice/voice-insights/voice-insights-intelligent-discovery-ai-assistant)** | Voice Insights IDA is an AI-driven assistant enabling you to interact with your voice data using natural language. The Assistant helps you troubleshoot Voice-related issues, including deliverability (connection rate), answer rate, networking related and other behavioral issues such as silent calls. *Activate* *Voice Insights Advanced Features to use this feature*. |
| ***Event Stream***                                                                                                                           |                                                                                                                                                                                                                                                                                                                                                                                |
| **[Call Insights Event Stream](/docs/voice/voice-insights/event-streams/call-insights-events)**                                              | Subscribe to the Call Insights Event Stream to consume call summaries, call metrics, as well as call progress and Voice SDK insights events. *Activate* *Voice Insights Advanced Features to use this feature.*                                                                                                                                                                |
| ***REST API***                                                                                                                               |                                                                                                                                                                                                                                                                                                                                                                                |
| **[Call Summary Resource](/docs/voice/voice-insights/api/call/call-summary-resource)** (single Call Summary)                                 | Get a call summary for a single call. *Activate* *Voice Insights Advanced Features to use this feature.*                                                                                                                                                                                                                                                                       |
| **[Call Summaries Resource](/docs/voice/voice-insights/api/call/call-summaries-resource)** (list of Call Summaries)                          | Get a list of call summaries for multiple calls. *Activate* *Voice Insights Advanced Features to use this feature.*                                                                                                                                                                                                                                                            |
| **[Call Insights Event Resource](/docs/voice/voice-insights/api/call/call-events-resource)**                                                 | Get call progress and quality-related Voice SDK events data for a specific call. *Activate* *Voice Insights Advanced Features to use this feature.*                                                                                                                                                                                                                            |
| **[Call Metric Resource](/docs/voice/voice-insights/api/call/call-metrics-resource)**                                                        | Get quality-related metrics for a specific call. *Activate* *Voice Insights Advanced Features to use this feature.*                                                                                                                                                                                                                                                            |
| [**Call Annotation Resource**](/docs/voice/voice-insights/api/call/call-annotation-resource)                                                 | Annotate calls to provide subjective experience details. Get the annotations for a specific call. *Activate* *Voice Insights Advanced Features to use this feature.*                                                                                                                                                                                                           |
| **[Voice Insights Settings Resource](/docs/voice/voice-insights/api/call/voice-insights-settings-resource)**                                 | Control Voice Insights Advanced Features and Voice Trace status for an account. *This REST API resource can be used to programmatically activate or deactivate* *Voice Insights Advanced Features.*                                                                                                                                                                            |

## Conference Insights

Conference Insights provides multiple ways to use conference metadata which allow you to see conference parameters, investigate participant event timelines, and understand detected quality issues.

The following table contains a reference to the documentation for Conference Insights features broken down by Console, [Voice Insights Event Stream](/docs/voice/voice-insights/event-streams) and [Conference Insights REST API](/docs/voice/voice-insights/api/conference). Where applicable for a feature, the table indicates whether [Voice Insights Advanced Features](/docs/voice/voice-insights/advanced-features) must be activated to use all or part of it.

| **Feature**                                                                                                           | **Description**                                                                                                                                                                                                                                                                           |
| --------------------------------------------------------------------------------------------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| ***Console***                                                                                                         |                                                                                                                                                                                                                                                                                           |
| [**Conference Insights Dashboard**](/docs/voice/voice-insights/conference-insights-dashboard)                         | Use the Conference Insights Dashboard to take an account-level look at key performance indicators and trends in conference volume, length, and quality warnings. Explore aggregated conference participant behavior and region configuration issues.                                      |
| **[Conference and Participant Summary](/docs/voice/voice-insights/conference-participant-summary)**                   | Use the Conference and Participant Summary to view metadata, quality issues and participant event timelines for a specific conference. Explore detected participant behavior issues. *Activate* *Voice Insights Advanced Features to display quality issues in the Participant Timeline.* |
| ***Event Stream***                                                                                                    |                                                                                                                                                                                                                                                                                           |
| **[Conference Insights Event Stream](/docs/voice/voice-insights/event-streams/conference-insights-event)**            | Subscribe to the Conference Insights Event Stream to consume conference summaries and conference participant summaries. *Activate* *Voice Insights Advanced Features to use this feature.*                                                                                                |
| ***REST API***                                                                                                        |                                                                                                                                                                                                                                                                                           |
| **[Conference Summary Resource](/docs/voice/voice-insights/api/conference/conference-summary-resource)**              | Get conference summaries with events and metadata. *Activate* *Voice Insights Advanced Features to use this feature.*                                                                                                                                                                     |
| [**Conference Participant Summary Resource**](/docs/voice/voice-insights/api/conference/participant-summary-resource) | Get conference participant summaries with events and metadata for individual participants. *Activate* *Voice Insights Advanced Features to use this feature.*                                                                                                                             |

## Voice Insights - Trust & Engagement Insights

[Trust & Engagement Insights](/docs/voice/voice-insights/voice-insights-trust-engagement-insights) helps you monitor and improve the trust, compliance, and performance factors that determine whether outbound calls are delivered and answered. By analyzing calling patterns and customer behaviors, the dashboard surfaces the metrics that influence reach and pickup, predicts when each customer is most likely to answer, and evaluates the return on investment (ROI) of Trust Products such as branded calling.

*Activate* *Voice Insights Advanced Features to use this feature.*

## Voice Insights - Reports API

[Reports API](/docs/voice/voice-insights/api/reports-api) offers scalable, aggregated voice metrics and reports at both account and phone number levels, designed to convert data into actionable business insights with just a single API call.
Accelerate decision-making with a low-code, cost-effective solution that requires minimal technical resources, providing immediate, actionable insights to enhance business performance with just a single API call.

*Activate* *Voice Insights Advanced Features to use this feature.*

## Voice Insights - Conversation Relay Insights

[Conversation Relay Insights](/docs/voice/voice-insights/conversation-relay-insights-dashboard) helps you monitor and improve the performance, reliability, and customer experience of AI-driven voice conversations built on [Twilio Conversation Relay](/docs/voice/conversationrelay). By analyzing end-to-end conversational signals—-like latency, interruptions, and handling time-—the dashboard highlights what's degrading the experience and where failures or friction are emerging. This centralized visibility allows teams to quickly validate deployments, pinpoint bottlenecks, and systematically deliver faster, more natural conversations.

*Activate* *Voice Insights Advanced Features to use this feature.*

## Further Information

To obtain further information about Voice Insights please explore:

* **[Frequently Asked Questions](/docs/voice/voice-insights/frequently-asked-questions)**, or
* our *free* self-paced [Online Course for Voice Insights Fundamentals](https://www.twiliotraining.com/store/827341-voice-insights-fundamentals) on the **Twilio Training** platform.
