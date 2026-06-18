

AWS FinOps Agent is in preview release and is subject to change.

# What is AWS FinOps Agent (preview)?
<a name="what-is"></a>

**Note**  
**Powered by Amazon Bedrock**: AWS FinOps Agent is built on Amazon Bedrock and includes [automated abuse detection](https://docs.aws.amazon.com/bedrock/latest/userguide/abuse-detection.html) implemented in Amazon Bedrock to enforce safety, security, and the responsible use of AI.

AWS FinOps Agent is a frontier agent that makes it easy for customers to continuously monitor costs, investigate anomalies, and surface optimization opportunities across their cloud environments.

AWS FinOps Agent provides:
+ **Event-triggered cost anomaly investigation.** Configure the agent to listen for AWS Cost Anomaly Detection events and produce a consolidated investigation report, delivered to Jira or Slack.
+ **Cost inquiry in natural language.** Ask cost questions about your workloads and get answers using your cost and usage data.
+ **Recurring cost reporting.** Schedule recurring cost reports (for example, daily, weekly, or monthly) rendered in a downloadable, presentation-ready format in HTML, PDF, or PPT.
+ **Optimization opportunities in one place.** Pull recommendations from AWS Cost Optimization Hub and AWS Compute Optimizer, and summarize them into a Jira ticket so the engineering team can pick up the work in the tool they already use.
+ **Context files and memory.** Upload organization-specific context files. The agent applies them to its answers and remembers your preferences across sessions.

For how to use each feature, see [Chatting with AWS FinOps Agent](chatting-with-finops-agent.md), [Task management](task-management.md), and [Context files and memory](context-files-and-memory.md).

## Related services
<a name="related-services"></a>

AWS FinOps Agent integrates with AWS services that you permit during the [agent creation](creating-an-agent.md) process. For the full list of IAM actions, see the [AWS FinOps Agent IAM setup guide](setting-up.md).
+ **AWS Cost Explorer**. Cost and usage data retrieval, forecasting, Savings Plans and Reserved Instance analysis.
+ **AWS Cost Anomaly Detection**. Anomaly monitoring and detection.
+ **AWS Cost Optimization Hub**. Optimization recommendations and savings estimates.
+ **AWS Compute Optimizer**. Detailed rightsizing and resource recommendations.
+ **AWS CloudTrail**. API activity logs for identifying infrastructure changes during anomaly investigations.

To get started, see [Creating an agent](creating-an-agent.md).