

# What is Amazon Nova Act?
<a name="what-is-nova-act"></a>

Amazon Nova Act is available as a new AWS service to build and manage fleets of reliable AI agents for automating production UI workflows at scale. Nova Act completes repetitive UI workflows in the browser and escalates to a human supervisor when appropriate. Nova Act also integrates with external tools through API calls, remote MCP, or agentic frameworks, such as Strand Agents (Preview). You can define workflows by combining the flexibility of natural language with Python code. Start by exploring in the web playground at [nova.amazon.com/act](https://nova.amazon.com/act), develop and debug in the Nova Act IDE extension, deploy to AWS, and monitor your workflows in the AWS Management Console, all in just a few steps.

## Nova Act terminology
<a name="nova-act-terminology"></a>

Nova Act uses the following concepts and terminology.
+  **Act:** An act() call is how you pass a natural language task to the Nova Act model. For example: `nova.act("search for 'rubber duck debugging'")`. Each act() executes the agentic loop within a session context.
+  **Step**: Each act() call consists of multiple steps. A step is one cycle of the model observing the page and taking an action. Steps run sequentially.
+  **Session**: A session represents a browser instance or API client instance. A session contains one or more act() calls that run sequentially. Multiple sessions can run in parallel within a workflow run.
+  **Workflow**: A workflow defines your agent’s end-to-end task. Workflows are comprised of act() statements and Python code that orchestrate the automation logic.
+  **Workflow run**: Each invocation of a workflow is a workflow run. A workflow can be run multiple times with different inputs, producing a begin time, end time, and result.

## When to use Nova Act
<a name="when-to-use-nova-act"></a>

Here are some common use cases for Nova Act.
+  **Data Entry:** Replace manual copy-paste and repetitive typing with agents that understand and populate complex web forms across multiple sites or portals, boosting accuracy and throughput while freeing teams from undifferentiated work. This includes updating CRM records or executing tasks in ERP systems. Nova Act agents adapt to varied layouts and complete submissions consistently ingesting structured data.
+  **Data Extraction:** Nova Act agents can navigate sites and search results, filter and locate relevant data, and extract key fields from unstructured web sources or dashboards. Ideal for gathering competitive intelligence, monitoring supplier portals, or consolidating data from industry-specific platforms that lack programmatic access or standardized data exports.
+  **Checkout Flows:** Complete purchase or booking flows autonomously across e-commerce, travel, or ticketing sites from product selection through payment completion. Your agents can search inventory, apply rules or preferences, and execute end-to-end checkout flows, including handling payments, confirmations, and validation. Perfect for testing retail experiences, managing bulk transactions, or automating recurring procurement tasks or multi-step booking flows across diverse e-commerce platforms where traditional automation breaks down due to site variations and frequent UI changes.
+  **Web QA Testing:** Accelerate release cycles with automated full user-journey validation directly in the browser. Your agents execute QA test cases intuitively and naturally navigating through UI workflows. This is ideal for teams managing detailed test scenarios and scaling coverage across web properties where maintaining traditional scripts can be resource-intensive and API testing can miss critical interface changes.

## Benefits
<a name="benefits"></a>

Experience the benefits of Nova Act:
+  **High reliability**: Nova Act achieves high reliability through vertical integration of a custom foundation model, orchestrator, browser actuator, and other tools, with end-to-end training across the full stack. This approach ensures reliable performance for browser-based automation workflows.
+  **Ease of use**: Create reliable workflows using natural language prompts, without managing orchestration logic, setting up agent loops, tool integrations, or configuring models.
+  **End-to-end developer experience**: Access a complete toolkit including a custom foundation model, web playground, Python SDK, IDE extension, CLI, AWSconsole, and Amazon Bedrock AgentCore Runtime and Browser.
+  **Production-scale deployment**: Deploy workflows to AWS with built-in monitoring, management, and infrastructure that scales with your needs.

## Availability
<a name="availability"></a>

Nova Act is supported in the following AWS Region:
+ US East (N. Virginia)

## Pricing for Nova Act
<a name="pricing-for-nova-act"></a>

For the most recent pricing information, visit the [Amazon Nova Act pricing](https://aws.amazon.com/nova/pricing/) page.