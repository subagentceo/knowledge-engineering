

# What is the AWS for SAP MCP Server?
<a name="introduction"></a>

With AWS for SAP MCP Server ("MCP Server"), running on Amazon Bedrock AgentCore ("AgentCore"), you can give your AI agents structured, protocol-driven access to SAP S/4HANA and SAP ECC OData (Open Data Protocol) V2 services through the Model Context Protocol (MCP). The MCP Server surfaces SAP operations as discoverable MCP tools, providing you with a secure, standardized interface for AI-driven SAP interactions.

## Key capabilities
<a name="key-capabilities"></a>
+  **Service Discovery** — You can query the SAP API service catalog to find available OData services, with support for pagination and filtering by service type.
+  **Metadata Inspection** — You can fetch OData service metadata to map entity types, properties, and relationships for contextual understanding.
+  **OData Read Operations** — You can perform read queries against SAP OData entity sets, including filtering, field selection, and record count.
+  **OData Write Operations** — You can create, update, and delete entity records when explicitly enabled by the operator.
+  **Authentication** — You can configure inbound access control for connecting to the MCP Server and outbound authentication for SAP system access.
+  **Function Import Execution** — You can invoke SAP OData function imports (consult [SAP Documentation](https://help.sap.com) for feature specifics).
+  **Custom Catalog Support** — You can augment or replace the default SAP service catalog by using a user-defined catalog stored in Amazon S3.
+  **API Allowlisting** — You can use prefixes (or full API names) to allowlist one or multiple APIs to restrict the scope of MCP Server access.
+  **Service Hints** — You can provide targeted usage guidance for SAP OData services through an Amazon S3-hosted hints file, helping agents optimize interactions.

## Architecture
<a name="architecture"></a>

With the MCP Server, your AI agents (Clients) communicate through Streamable HTTP on the dedicated `/mcp` endpoint. Each interaction uses a stateless session. The server container is available through [Amazon Elastic Container Registry (Amazon ECR)](https://docs.aws.amazon.com/AmazonECR/latest/userguide/what-is-ecr.html) and is deployed in [Amazon Bedrock AgentCore Runtime](https://docs.aws.amazon.com/bedrock-agentcore/latest/devguide/agents-tools-runtime.html).

Through this Runtime, the MCP Server securely connects to SAP systems to run operations such as service discovery, metadata retrieval, CRUD (Create, Read, Update, Delete) actions, and function imports. The MCP Server integrates with the following AWS services:
+  [Amazon Bedrock AgentCore Identity](https://docs.aws.amazon.com/bedrock-agentcore/latest/devguide/identity.html) — For authenticated access through OAuth token flows.
+  AWS Secrets Manager — For secure credential storage.
+  [Amazon S3](https://docs.aws.amazon.com/AmazonS3/latest/userguide/Welcome.html) — To host custom catalogs and service hints files.

The following diagram shows the AWS for SAP MCP Server architecture:

![Architecture diagram showing AI agents communicating through Streamable HTTP through Amazon Bedrock AgentCore Runtime to SAP systems for service discovery and CRUD operations](http://docs.aws.amazon.com/mcp-sap/latest/awsforsapmcp/images/Component_Architecture2.png)


The following is a sample architecture pattern showing how you can use the AWS for SAP MCP Server with [SAP Business Technology Platform (SAP BTP)](https://www.sap.com/products/technology-platform/use-cases/api-management.html) API Management. We recommend enabling your SAP OData APIs through the SAP BTP API Management layer. The AWS for SAP MCP Server connects to those APIs securely over HTTPS with OAuth 2.0 authentication. Data transmitted to these API endpoints is encrypted in transit by using TLS.

![Architecture diagram showing AI agents communicating through Streamable HTTP through Amazon Bedrock AgentCore Runtime to SAP systems through SAP BTP API Management](http://docs.aws.amazon.com/mcp-sap/latest/awsforsapmcp/images/Component_Architecture3.png)


The following steps describe the flow:

1.  **User initiation** — A business user interacts with an MCP-compatible AI agent (for example, Amazon Quick).

1.  **Authentication initiation** — The AI agent initiates an authentication request to the AWS for SAP MCP Server, which runs on Amazon Bedrock AgentCore Runtime. The agent communicates over Streamable HTTP to discover and invoke available tools on behalf of the user.

1.  **Inbound authentication** — The inbound authorizer within Amazon Bedrock AgentCore Identity validates the token issued by the configured identity provider before allowing access to the AWS for SAP MCP Server.

1.  **Observability** — You can monitor tool invocations and server activity through the logs and metrics that AgentCore Runtime emits to Amazon CloudWatch.

1.  **Outbound authentication** — The AWS for SAP MCP Server uses outbound authentication to securely connect to SAP BTP Integration Suite API Management through OAuth 2.0.

1.  **SAP backend data access** — The SAP BTP Destination Service routes the request to SAP S/4HANA or SAP ECC to retrieve data through OData APIs.