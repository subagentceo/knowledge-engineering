# Tracing in Foundry Toolkit

Foundry Toolkit provides tracing capabilities to help you monitor and analyze the performance of your AI applications. You can trace the execution of your AI applications, including interactions with generative AI models, to gain insights into their behavior and performance.

Foundry Toolkit hosts a local HTTP and gRPC server to collect trace data. The collector server is compatible with OTLP (OpenTelemetry Protocol) and most language model SDKs either directly support OTLP or have non-Microsoft instrumentation libraries to support it. Use Foundry Toolkit to visualize the collected instrumentation data.

All frameworks or SDKs that support OTLP and follow semantic conventions for generative AI systems are supported. The following table contains common AI SDKs tested for compatibility.

Azure AI Inference

Foundry Agent Service

Anthropic

Gemini

LangChain

OpenAI SDK 3

OpenAI Agents SDK

**Python**

✅

✅

✅ (traceloop, monocle)1,2

✅ (monocle)

✅ (LangSmith, monocle)1,2

✅ (opentelemetry-python-contrib, monocle)1

✅ (Logfire, monocle)1,2

**TS/JS**

✅

✅

✅ (traceloop)1,2

❌

✅ (traceloop)1,2

✅ (traceloop)1,2

❌

> 1.  The SDKs in brackets are non-Microsoft tools that add OTLP support because the official SDKs do not support OTLP.
> 2.  These tools do not fully follow the OpenTelemetry rules for generative AI systems.
> 3.  For OpenAI SDK, only the Chat Completions API is supported. The Responses API is not supported yet.

## How to get started with tracing

1.  Open the tracing webview by selecting **Tracing** in the tree view.
    
2.  Select the **Start Collector** button to start the local OTLP trace collector server.
    
    ![Screenshot showing the Start Collector button in the Tracing webview.](/assets/docs/intelligentapps/tracing/trace_start.png)
    
3.  Enable instrumentation with a code snippet. See the Set up instrumentation section for code snippets for different languages and SDKs.
    
4.  Generate trace data by running your app.
    
5.  In the tracing webview, select the **Refresh** button to see new trace data.
    
    ![Screenshot showing the Trace List in the Tracing webview.](/assets/docs/intelligentapps/tracing/trace_list.png)
    

## Set up instrumentation

Set up tracing in your AI application to collect trace data. The following code snippets show how to set up tracing for different SDKs and languages:

The process is similar for all SDKs:

*   Add tracing to your LLM or agent app.
*   Set up the OTLP trace exporter to use the AITK local collector.

Azure AI Inference SDK - Python

**Installation:**

```
pip install opentelemetry-sdk opentelemetry-exporter-otlp-proto-http azure-ai-inference[opentelemetry]
```

**Setup:**

```
import os
os.environ["AZURE_TRACING_GEN_AI_CONTENT_RECORDING_ENABLED"] = "true"
os.environ["AZURE_SDK_TRACING_IMPLEMENTATION"] = "opentelemetry"

from opentelemetry import trace, _events
from opentelemetry.sdk.resources import Resource
from opentelemetry.sdk.trace import TracerProvider
from opentelemetry.sdk.trace.export import BatchSpanProcessor
from opentelemetry.sdk._logs import LoggerProvider
from opentelemetry.sdk._logs.export import BatchLogRecordProcessor
from opentelemetry.exporter.otlp.proto.http.trace_exporter import OTLPSpanExporter
from opentelemetry.sdk._events import EventLoggerProvider
from opentelemetry.exporter.otlp.proto.http._log_exporter import OTLPLogExporter

resource = Resource(attributes={
    "service.name": "opentelemetry-instrumentation-azure-ai-agents"
})
provider = TracerProvider(resource=resource)
otlp_exporter = OTLPSpanExporter(
    endpoint="http://localhost:4318/v1/traces",
)
processor = BatchSpanProcessor(otlp_exporter)
provider.add_span_processor(processor)
trace.set_tracer_provider(provider)

logger_provider = LoggerProvider(resource=resource)
logger_provider.add_log_record_processor(
    BatchLogRecordProcessor(OTLPLogExporter(endpoint="http://localhost:4318/v1/logs"))
)
_events.set_event_logger_provider(EventLoggerProvider(logger_provider))

from azure.ai.inference.tracing import AIInferenceInstrumentor
AIInferenceInstrumentor().instrument(True)
```
Azure AI Inference SDK - TypeScript/JavaScript

**Installation:**

```
npm install @azure/opentelemetry-instrumentation-azure-sdk @opentelemetry/api @opentelemetry/exporter-trace-otlp-proto @opentelemetry/instrumentation @opentelemetry/resources @opentelemetry/sdk-trace-node
```

**Setup:**

```
const { context } = require('@opentelemetry/api');
const { resourceFromAttributes } = require('@opentelemetry/resources');
const {
  NodeTracerProvider,
  SimpleSpanProcessor
} = require('@opentelemetry/sdk-trace-node');
const { OTLPTraceExporter } = require('@opentelemetry/exporter-trace-otlp-proto');

const exporter = new OTLPTraceExporter({
  url: 'http://localhost:4318/v1/traces'
});
const provider = new NodeTracerProvider({
  resource: resourceFromAttributes({
    'service.name': 'opentelemetry-instrumentation-azure-ai-inference'
  }),
  spanProcessors: [new SimpleSpanProcessor(exporter)]
});
provider.register();

const { registerInstrumentations } = require('@opentelemetry/instrumentation');
const {
  createAzureSdkInstrumentation
} = require('@azure/opentelemetry-instrumentation-azure-sdk');

registerInstrumentations({
  instrumentations: [createAzureSdkInstrumentation()]
});
```
Foundry Agent Service - Python

**Installation:**

```
pip install opentelemetry-sdk opentelemetry-exporter-otlp-proto-http azure-ai-inference[opentelemetry]
```

**Setup:**

```
import os
os.environ["AZURE_TRACING_GEN_AI_CONTENT_RECORDING_ENABLED"] = "true"
os.environ["AZURE_SDK_TRACING_IMPLEMENTATION"] = "opentelemetry"

from opentelemetry import trace, _events
from opentelemetry.sdk.resources import Resource
from opentelemetry.sdk.trace import TracerProvider
from opentelemetry.sdk.trace.export import BatchSpanProcessor
from opentelemetry.sdk._logs import LoggerProvider
from opentelemetry.sdk._logs.export import BatchLogRecordProcessor
from opentelemetry.exporter.otlp.proto.http.trace_exporter import OTLPSpanExporter
from opentelemetry.sdk._events import EventLoggerProvider
from opentelemetry.exporter.otlp.proto.http._log_exporter import OTLPLogExporter

resource = Resource(attributes={
    "service.name": "opentelemetry-instrumentation-azure-ai-agents"
})
provider = TracerProvider(resource=resource)
otlp_exporter = OTLPSpanExporter(
    endpoint="http://localhost:4318/v1/traces",
)
processor = BatchSpanProcessor(otlp_exporter)
provider.add_span_processor(processor)
trace.set_tracer_provider(provider)

logger_provider = LoggerProvider(resource=resource)
logger_provider.add_log_record_processor(
    BatchLogRecordProcessor(OTLPLogExporter(endpoint="http://localhost:4318/v1/logs"))
)
_events.set_event_logger_provider(EventLoggerProvider(logger_provider))

from azure.ai.agents.telemetry import AIAgentsInstrumentor
AIAgentsInstrumentor().instrument(True)
```
Foundry Agent Service - TypeScript/JavaScript

**Installation:**

```
npm install @azure/opentelemetry-instrumentation-azure-sdk @opentelemetry/api @opentelemetry/exporter-trace-otlp-proto @opentelemetry/instrumentation @opentelemetry/resources @opentelemetry/sdk-trace-node
```

**Setup:**

```
const { context } = require('@opentelemetry/api');
const { resourceFromAttributes } = require('@opentelemetry/resources');
const {
  NodeTracerProvider,
  SimpleSpanProcessor
} = require('@opentelemetry/sdk-trace-node');
const { OTLPTraceExporter } = require('@opentelemetry/exporter-trace-otlp-proto');

const exporter = new OTLPTraceExporter({
  url: 'http://localhost:4318/v1/traces'
});
const provider = new NodeTracerProvider({
  resource: resourceFromAttributes({
    'service.name': 'opentelemetry-instrumentation-azure-ai-inference'
  }),
  spanProcessors: [new SimpleSpanProcessor(exporter)]
});
provider.register();

const { registerInstrumentations } = require('@opentelemetry/instrumentation');
const {
  createAzureSdkInstrumentation
} = require('@azure/opentelemetry-instrumentation-azure-sdk');

registerInstrumentations({
  instrumentations: [createAzureSdkInstrumentation()]
});
```
Anthropic - Python

### OpenTelemetry

**Installation:**

```
pip install opentelemetry-sdk opentelemetry-exporter-otlp-proto-http opentelemetry-instrumentation-anthropic
```

**Setup:**

```
from opentelemetry import trace, _events
from opentelemetry.sdk.resources import Resource
from opentelemetry.sdk.trace import TracerProvider
from opentelemetry.sdk.trace.export import BatchSpanProcessor
from opentelemetry.sdk._logs import LoggerProvider
from opentelemetry.sdk._logs.export import BatchLogRecordProcessor
from opentelemetry.exporter.otlp.proto.http.trace_exporter import OTLPSpanExporter
from opentelemetry.sdk._events import EventLoggerProvider
from opentelemetry.exporter.otlp.proto.http._log_exporter import OTLPLogExporter

resource = Resource(attributes={
    "service.name": "opentelemetry-instrumentation-anthropic-traceloop"
})
provider = TracerProvider(resource=resource)
otlp_exporter = OTLPSpanExporter(
    endpoint="http://localhost:4318/v1/traces",
)
processor = BatchSpanProcessor(otlp_exporter)
provider.add_span_processor(processor)
trace.set_tracer_provider(provider)

logger_provider = LoggerProvider(resource=resource)
logger_provider.add_log_record_processor(
    BatchLogRecordProcessor(OTLPLogExporter(endpoint="http://localhost:4318/v1/logs"))
)
_events.set_event_logger_provider(EventLoggerProvider(logger_provider))

from opentelemetry.instrumentation.anthropic import AnthropicInstrumentor
AnthropicInstrumentor().instrument()
```

### Monocle

**Installation:**

```
pip install opentelemetry-sdk opentelemetry-exporter-otlp-proto-http monocle_apptrace
```

**Setup:**

```
from opentelemetry.sdk.trace.export import BatchSpanProcessor
from opentelemetry.exporter.otlp.proto.http.trace_exporter import OTLPSpanExporter

# Import monocle_apptrace
from monocle_apptrace import setup_monocle_telemetry

# Setup Monocle telemetry with OTLP span exporter for traces
setup_monocle_telemetry(
    workflow_name="opentelemetry-instrumentation-anthropic",
    span_processors=[
        BatchSpanProcessor(
            OTLPSpanExporter(endpoint="http://localhost:4318/v1/traces")
        )
    ]
)
```
Anthropic - TypeScript/JavaScript

**Installation:**

```
npm install @traceloop/node-server-sdk
```

**Setup:**

```
const { initialize } = require('@traceloop/node-server-sdk');
const { trace } = require('@opentelemetry/api');

initialize({
  appName: 'opentelemetry-instrumentation-anthropic-traceloop',
  baseUrl: 'http://localhost:4318',
  disableBatch: true
});
```
Google Gemini - Python

### OpenTelemetry

**Installation:**

```
pip install opentelemetry-sdk opentelemetry-exporter-otlp-proto-http opentelemetry-instrumentation-google-genai
```

**Setup:**

```
from opentelemetry import trace, _events
from opentelemetry.sdk.resources import Resource
from opentelemetry.sdk.trace import TracerProvider
from opentelemetry.sdk.trace.export import BatchSpanProcessor
from opentelemetry.sdk._logs import LoggerProvider
from opentelemetry.sdk._logs.export import BatchLogRecordProcessor
from opentelemetry.exporter.otlp.proto.http.trace_exporter import OTLPSpanExporter
from opentelemetry.sdk._events import EventLoggerProvider
from opentelemetry.exporter.otlp.proto.http._log_exporter import OTLPLogExporter

resource = Resource(attributes={
    "service.name": "opentelemetry-instrumentation-google-genai"
})
provider = TracerProvider(resource=resource)
otlp_exporter = OTLPSpanExporter(
    endpoint="http://localhost:4318/v1/traces",
)
processor = BatchSpanProcessor(otlp_exporter)
provider.add_span_processor(processor)
trace.set_tracer_provider(provider)

logger_provider = LoggerProvider(resource=resource)
logger_provider.add_log_record_processor(
    BatchLogRecordProcessor(OTLPLogExporter(endpoint="http://localhost:4318/v1/logs"))
)
_events.set_event_logger_provider(EventLoggerProvider(logger_provider))

from opentelemetry.instrumentation.google_genai import GoogleGenAiSdkInstrumentor
GoogleGenAiSdkInstrumentor().instrument(enable_content_recording=True)
```

### Monocle

**Installation:**

```
pip install opentelemetry-sdk opentelemetry-exporter-otlp-proto-http monocle_apptrace
```

**Setup:**

```
from opentelemetry.sdk.trace.export import BatchSpanProcessor
from opentelemetry.exporter.otlp.proto.http.trace_exporter import OTLPSpanExporter

# Import monocle_apptrace
from monocle_apptrace import setup_monocle_telemetry

# Setup Monocle telemetry with OTLP span exporter for traces
setup_monocle_telemetry(
    workflow_name="opentelemetry-instrumentation-google-genai",
    span_processors=[
        BatchSpanProcessor(
            OTLPSpanExporter(endpoint="http://localhost:4318/v1/traces")
        )
    ]
)
```
LangChain - Python

### LangSmith

**Installation:**

```
pip install langsmith[otel]
```

**Setup:**

```
import os
os.environ["LANGSMITH_OTEL_ENABLED"] = "true"
os.environ["LANGSMITH_TRACING"] = "true"
os.environ["OTEL_EXPORTER_OTLP_ENDPOINT"] = "http://localhost:4318"
```

### Monocle

**Installation:**

```
pip install opentelemetry-sdk opentelemetry-exporter-otlp-proto-http monocle_apptrace
```

**Setup:**

```
from opentelemetry.sdk.trace.export import BatchSpanProcessor
from opentelemetry.exporter.otlp.proto.http.trace_exporter import OTLPSpanExporter

# Import monocle_apptrace
from monocle_apptrace import setup_monocle_telemetry

# Setup Monocle telemetry with OTLP span exporter for traces
setup_monocle_telemetry(
    workflow_name="opentelemetry-instrumentation-langchain",
    span_processors=[
        BatchSpanProcessor(
            OTLPSpanExporter(endpoint="http://localhost:4318/v1/traces")
        )
    ]
)
```
LangChain - TypeScript/JavaScript

**Installation:**

```
npm install @traceloop/node-server-sdk
```

**Setup:**

```
const { initialize } = require('@traceloop/node-server-sdk');
initialize({
  appName: 'opentelemetry-instrumentation-langchain-traceloop',
  baseUrl: 'http://localhost:4318',
  disableBatch: true
});
```
OpenAI - Python

### OpenTelemetry

**Installation:**

```
pip install opentelemetry-sdk opentelemetry-exporter-otlp-proto-http opentelemetry-instrumentation-openai-v2
```

**Setup:**

```
from opentelemetry import trace, _events
from opentelemetry.sdk.resources import Resource
from opentelemetry.sdk.trace import TracerProvider
from opentelemetry.sdk.trace.export import BatchSpanProcessor
from opentelemetry.sdk._logs import LoggerProvider
from opentelemetry.sdk._logs.export import BatchLogRecordProcessor
from opentelemetry.exporter.otlp.proto.http.trace_exporter import OTLPSpanExporter
from opentelemetry.sdk._events import EventLoggerProvider
from opentelemetry.exporter.otlp.proto.http._log_exporter import OTLPLogExporter
from opentelemetry.instrumentation.openai_v2 import OpenAIInstrumentor
import os

os.environ["OTEL_INSTRUMENTATION_GENAI_CAPTURE_MESSAGE_CONTENT"] = "true"

# Set up resource
resource = Resource(attributes={
    "service.name": "opentelemetry-instrumentation-openai"
})

# Create tracer provider
trace.set_tracer_provider(TracerProvider(resource=resource))

# Configure OTLP exporter
otlp_exporter = OTLPSpanExporter(
    endpoint="http://localhost:4318/v1/traces"
)

# Add span processor
trace.get_tracer_provider().add_span_processor(
    BatchSpanProcessor(otlp_exporter)
)

# Set up logger provider
logger_provider = LoggerProvider(resource=resource)
logger_provider.add_log_record_processor(
    BatchLogRecordProcessor(OTLPLogExporter(endpoint="http://localhost:4318/v1/logs"))
)
_events.set_event_logger_provider(EventLoggerProvider(logger_provider))

# Enable OpenAI instrumentation
OpenAIInstrumentor().instrument()
```

### Monocle

**Installation:**

```
pip install opentelemetry-sdk opentelemetry-exporter-otlp-proto-http monocle_apptrace
```

**Setup:**

```
from opentelemetry.sdk.trace.export import BatchSpanProcessor
from opentelemetry.exporter.otlp.proto.http.trace_exporter import OTLPSpanExporter

# Import monocle_apptrace
from monocle_apptrace import setup_monocle_telemetry

# Setup Monocle telemetry with OTLP span exporter for traces
setup_monocle_telemetry(
    workflow_name="opentelemetry-instrumentation-openai",
    span_processors=[
        BatchSpanProcessor(
            OTLPSpanExporter(endpoint="http://localhost:4318/v1/traces")
        )
    ]
)
```
OpenAI - TypeScript/JavaScript

**Installation:**

```
npm install @traceloop/instrumentation-openai @traceloop/node-server-sdk
```

**Setup:**

```
const { initialize } = require('@traceloop/node-server-sdk');
initialize({
  appName: 'opentelemetry-instrumentation-openai-traceloop',
  baseUrl: 'http://localhost:4318',
  disableBatch: true
});
```
OpenAI Agents SDK - Python

### Logfire

**Installation:**

```
pip install logfire
```

**Setup:**

```
import logfire
import os

os.environ["OTEL_EXPORTER_OTLP_TRACES_ENDPOINT"] = "http://localhost:4318/v1/traces"

logfire.configure(
    service_name="opentelemetry-instrumentation-openai-agents-logfire",
    send_to_logfire=False,
)
logfire.instrument_openai_agents()
```

### Monocle

**Installation:**

```
pip install opentelemetry-sdk opentelemetry-exporter-otlp-proto-http monocle_apptrace
```

**Setup:**

```
from opentelemetry.sdk.trace.export import BatchSpanProcessor
from opentelemetry.exporter.otlp.proto.http.trace_exporter import OTLPSpanExporter

# Import monocle_apptrace
from monocle_apptrace import setup_monocle_telemetry

# Setup Monocle telemetry with OTLP span exporter for traces
setup_monocle_telemetry(
    workflow_name="opentelemetry-instrumentation-openai-agents",
    span_processors=[
        BatchSpanProcessor(
            OTLPSpanExporter(endpoint="http://localhost:4318/v1/traces")
        )
    ]
)
```

## Example 1: set up tracing with the Azure AI Inference SDK using Opentelemetry

The following end-to-end example uses the Azure AI Inference SDK in Python and shows how to set up the tracing provider and instrumentation.

### Prerequisites

To run this example, you need the following prerequisites:

*   Visual Studio Code
*   Foundry Toolkit extension
*   Azure AI Inference SDK
*   OpenTelemetry
*   Python latest version
*   GitHub account

### Set up your development environment

Use the following instructions to deploy a preconfigured development environment containing all required dependencies to run this example.

1.  Setup GitHub Personal Access Token
    
    Use the free GitHub Models as an example model.
    
    Open GitHub Developer Settings and select **Generate new token**.
    
    Important
    
    `models:read` permissions are required for the token or it will return unauthorized. The token is sent to a Microsoft service.
    
2.  Create environment variable
    
    Create an environment variable to set your token as the key for the client code using one of the following code snippets. Replace `<your-github-token-goes-here>` with your actual GitHub token.
    
    bash:
    
    ```
    export GITHUB_TOKEN="<your-github-token-goes-here>"
    ```
    
    powershell:
    
    ```
    $Env:GITHUB_TOKEN="<your-github-token-goes-here>"
    ```
    
    Windows command prompt:
    
    ```
    set GITHUB_TOKEN=<your-github-token-goes-here>
    ```
    
3.  Install Python packages
    
    The following command installs the required Python packages for tracing with Azure AI Inference SDK:
    
    ```
    pip install opentelemetry-sdk opentelemetry-exporter-otlp-proto-http azure-ai-inference[opentelemetry]
    ```
    
4.  Set up tracing
    
    1.  Create a new local directory on your computer for the project.
        
        ```
        mkdir my-tracing-app
        ```
        
    2.  Navigate to the directory you created.
        
        ```
        cd my-tracing-app
        ```
        
    3.  Open Visual Studio Code in that directory:
        
        ```
        code .
        ```
        
5.  Create the Python file
    
    1.  In the `my-tracing-app` directory, create a Python file named `main.py`.
        
        You'll add the code to set up tracing and interact with the Azure AI Inference SDK.
        
    2.  Add the following code to `main.py` and save the file:
        
        ```
        import os
        
        ### Set up for OpenTelemetry tracing ###
        os.environ["AZURE_TRACING_GEN_AI_CONTENT_RECORDING_ENABLED"] = "true"
        os.environ["AZURE_SDK_TRACING_IMPLEMENTATION"] = "opentelemetry"
        
        from opentelemetry import trace, _events
        from opentelemetry.sdk.resources import Resource
        from opentelemetry.sdk.trace import TracerProvider
        from opentelemetry.sdk.trace.export import BatchSpanProcessor
        from opentelemetry.sdk._logs import LoggerProvider
        from opentelemetry.sdk._logs.export import BatchLogRecordProcessor
        from opentelemetry.exporter.otlp.proto.http.trace_exporter import OTLPSpanExporter
        from opentelemetry.sdk._events import EventLoggerProvider
        from opentelemetry.exporter.otlp.proto.http._log_exporter import OTLPLogExporter
        
        github_token = os.environ["GITHUB_TOKEN"]
        
        resource = Resource(attributes={
            "service.name": "opentelemetry-instrumentation-azure-ai-inference"
        })
        provider = TracerProvider(resource=resource)
        otlp_exporter = OTLPSpanExporter(
            endpoint="http://localhost:4318/v1/traces",
        )
        processor = BatchSpanProcessor(otlp_exporter)
        provider.add_span_processor(processor)
        trace.set_tracer_provider(provider)
        
        logger_provider = LoggerProvider(resource=resource)
        logger_provider.add_log_record_processor(
            BatchLogRecordProcessor(OTLPLogExporter(endpoint="http://localhost:4318/v1/logs"))
        )
        _events.set_event_logger_provider(EventLoggerProvider(logger_provider))
        
        from azure.ai.inference.tracing import AIInferenceInstrumentor
        AIInferenceInstrumentor().instrument()
        ### Set up for OpenTelemetry tracing ###
        
        from azure.ai.inference import ChatCompletionsClient
        from azure.ai.inference.models import UserMessage
        from azure.ai.inference.models import TextContentItem
        from azure.core.credentials import AzureKeyCredential
        
        client = ChatCompletionsClient(
            endpoint = "https://models.inference.ai.azure.com",
            credential = AzureKeyCredential(github_token),
            api_version = "2024-08-01-preview",
        )
        
        response = client.complete(
            messages = [
                UserMessage(content = [
                    TextContentItem(text = "hi"),
                ]),
            ],
            model = "gpt-4.1",
            tools = [],
            response_format = "text",
            temperature = 1,
            top_p = 1,
        )
        
        print(response.choices[0].message.content)
        ```
        
6.  Run the code
    
    1.  Open a new terminal in Visual Studio Code.
        
    2.  In the terminal, run the code using the command `python main.py`.
        
7.  Check the trace data in Foundry Toolkit
    
    After you run the code and refresh the tracing webview, there's a new trace in the list.
    
    Select the trace to open the trace details webview.
    
    ![Screenshot showing selecting a trace from the Trace List in the Tracing webview.](/assets/docs/intelligentapps/tracing/trace_list.png)
    
    Check the complete execution flow of your app in the left span tree view.
    
    Select a span in the right span details view to see generative AI messages in the **Input + Output** tab.
    
    Select the **Metadata** tab to view the raw metadata.
    
    ![Screenshot showing the Trace Details view in the Tracing webview.](/assets/docs/intelligentapps/tracing/trace_details.png)
    

## Example 2: set up tracing with the OpenAI Agents SDK using Monocle

The following end-to-end example uses the OpenAI Agents SDK in Python with Monocle and shows how to set up tracing for a multi-agent travel booking system.

### Prerequisites

To run this example, you need the following prerequisites:

*   Visual Studio Code
*   Foundry Toolkit extension
*   Okahu Trace Visualizer
*   OpenAI Agents SDK
*   OpenTelemetry
*   Monocle
*   Python latest version
*   OpenAI API key

### Set up your development environment

Use the following instructions to deploy a preconfigured development environment containing all required dependencies to run this example.

1.  Create environment variable
    
    Create an environment variable for your OpenAI API key using one of the following code snippets. Replace `<your-openai-api-key>` with your actual OpenAI API key.
    
    bash:
    
    ```
    export OPENAI_API_KEY="<your-openai-api-key>"
    ```
    
    powershell:
    
    ```
    $Env:OPENAI_API_KEY="<your-openai-api-key>"
    ```
    
    Windows command prompt:
    
    ```
    set OPENAI_API_KEY=<your-openai-api-key>
    ```
    
    Alternatively, create a `.env` file in your project directory:
    
    ```
    OPENAI_API_KEY=<your-openai-api-key>
    ```
    
2.  Install Python packages
    
    Create a `requirements.txt` file with the following content:
    
    ```
    opentelemetry-sdk
    opentelemetry-exporter-otlp-proto-http
    monocle_apptrace
    openai-agents
    python-dotenv
    ```
    
    Install the packages using:
    
    ```
    pip install -r requirements.txt
    ```
    
3.  Set up tracing
    
    1.  Create a new local directory on your computer for the project.
        
        ```
        mkdir my-agents-tracing-app
        ```
        
    2.  Navigate to the directory you created.
        
        ```
        cd my-agents-tracing-app
        ```
        
    3.  Open Visual Studio Code in that directory:
        
        ```
        code .
        ```
        
4.  Create the Python file
    
    1.  In the `my-agents-tracing-app` directory, create a Python file named `main.py`.
        
        You'll add the code to set up tracing with Monocle and interact with the OpenAI Agents SDK.
        
    2.  Add the following code to `main.py` and save the file:
        
        ```
        import os
        
        from dotenv import load_dotenv
        
        # Load environment variables from .env file
        load_dotenv()
        
        from opentelemetry.sdk.trace.export import BatchSpanProcessor
        from opentelemetry.exporter.otlp.proto.http.trace_exporter import OTLPSpanExporter
        
        # Import monocle_apptrace
        from monocle_apptrace import setup_monocle_telemetry
        
        # Setup Monocle telemetry with OTLP span exporter for traces
        setup_monocle_telemetry(
            workflow_name="opentelemetry-instrumentation-openai-agents",
            span_processors=[
                BatchSpanProcessor(
                    OTLPSpanExporter(endpoint="http://localhost:4318/v1/traces")
                )
            ]
        )
        
        from agents import Agent, Runner, function_tool
        
        # Define tool functions
        @function_tool
        def book_flight(from_airport: str, to_airport: str) -> str:
            """Book a flight between airports."""
            return f"Successfully booked a flight from {from_airport} to {to_airport} for 100 USD."
        
        @function_tool
        def book_hotel(hotel_name: str, city: str) -> str:
            """Book a hotel reservation."""
            return f"Successfully booked a stay at {hotel_name} in {city} for 50 USD."
        
        @function_tool
        def get_weather(city: str) -> str:
            """Get weather information for a city."""
            return f"The weather in {city} is sunny and 75°F."
        
        # Create specialized agents
        flight_agent = Agent(
            name="Flight Agent",
            instructions="You are a flight booking specialist. Use the book_flight tool to book flights.",
            tools=[book_flight],
        )
        
        hotel_agent = Agent(
            name="Hotel Agent",
            instructions="You are a hotel booking specialist. Use the book_hotel tool to book hotels.",
            tools=[book_hotel],
        )
        
        weather_agent = Agent(
            name="Weather Agent",
            instructions="You are a weather information specialist. Use the get_weather tool to provide weather information.",
            tools=[get_weather],
        )
        
        # Create a coordinator agent with tools
        coordinator = Agent(
            name="Travel Coordinator",
            instructions="You are a travel coordinator. Delegate flight bookings to the Flight Agent, hotel bookings to the Hotel Agent, and weather queries to the Weather Agent.",
            tools=[
                flight_agent.as_tool(
                    tool_name="flight_expert",
                    tool_description="Handles flight booking questions and requests.",
                ),
                hotel_agent.as_tool(
                    tool_name="hotel_expert",
                    tool_description="Handles hotel booking questions and requests.",
                ),
                weather_agent.as_tool(
                    tool_name="weather_expert",
                    tool_description="Handles weather information questions and requests.",
                ),
            ],
        )
        
        # Run the multi-agent workflow
        if __name__ == "__main__":
            import asyncio
        
            result = asyncio.run(
                Runner.run(
                    coordinator,
                    "Book me a flight today from SEA to SFO, then book the best hotel there and tell me the weather.",
                )
            )
            print(result.final_output)
        ```
        
5.  Run the code
    
    1.  Open a new terminal in Visual Studio Code.
        
    2.  In the terminal, run the code using the command `python main.py`.
        
6.  Check the trace data in Foundry Toolkit
    
    After you run the code and refresh the tracing webview, there's a new trace in the list.
    
    Select the trace to open the trace details webview.
    
    ![Screenshot showing selecting a trace from the Trace List in the Tracing webview.](/assets/docs/intelligentapps/tracing/trace_list_openai_agents_monocle.png)
    
    Check the complete execution flow of your app in the left span tree view, including agent invocations, tool calls, and agent delegations.
    
    Select a span in the right span details view to see generative AI messages in the **Input + Output** tab.
    
    Select the **Metadata** tab to view the raw metadata.
    
    ![Screenshot showing the Trace Details view in the Tracing webview.](/assets/docs/intelligentapps/tracing/trace_details_openai_agents_monocle.png)
    

## What you learned

In this article, you learned how to:

*   Set up tracing in your AI application using the Azure AI Inference SDK and OpenTelemetry.
*   Configure the OTLP trace exporter to send trace data to the local collector server.
*   Run your application to generate trace data and view traces in the Foundry Toolkit webview.
*   Use the tracing feature with multiple SDKs and languages, including Python and TypeScript/JavaScript, and non-Microsoft tools via OTLP.
*   Instrument various AI frameworks (Anthropic, Gemini, LangChain, OpenAI, and more) using provided code snippets.
*   Use the tracing webview UI, including the **Start Collector** and **Refresh** buttons, to manage trace data.
*   Set up your development environment, including environment variables and package installation, to enable tracing.
*   Analyze the execution flow of your app using the span tree and details view, including generative AI message flow and metadata.

10/03/2025