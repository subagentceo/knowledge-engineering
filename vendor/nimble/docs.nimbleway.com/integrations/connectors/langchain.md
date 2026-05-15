> ## Documentation Index
> Fetch the complete documentation index at: https://docs.nimbleway.com/llms.txt
> Use this file to discover all available pages before exploring further.

# LangChain

> LangChain tools and retrievers for web search, content extraction, crawling, mapping, and structured data agents.

### Overview

The [`langchain-nimble`](https://pypi.org/project/langchain-nimble/) package provides production-grade LangChain integrations for the Nimble web data platform. Built on the official [`nimble_python`](https://pypi.org/project/nimble_python/) SDK, it enables developers to build RAG applications and AI agents that can search, extract, crawl, map, and retrieve structured data from anywhere on the web.

The package includes a **unified toolkit**, **five tools**, and **two retrievers**:

**NimbleToolkit** — a single entry point to configure and enable all tools.

**Tools (for AI Agents):**

* `NimbleSearchTool` — Web search with three depth levels (`lite`, `fast`, `deep`) and optional AI-generated answers
* `NimbleExtractTool` — Single-URL content extraction, returns clean markdown
* `NimbleCrawlTool` — Multi-page crawl jobs that discover and extract content across a domain (up to 10,000 pages)
* `NimbleMapTool` — URL discovery across a website by combining sitemap parsing and link crawling (up to 100,000 URLs)
* `NimbleAgentTools` — Pre-built web agents that extract structured data from specific page types (products, jobs, reviews)

**Retrievers:**

* `NimbleSearchRetriever` — Web search with depth levels, LLM answers, and filtering
* `NimbleExtractRetriever` — Direct URL content extraction

#### Key Features

* **Three search depth levels** — `lite` for quick metadata, `fast` for balanced results, `deep` for comprehensive extraction
* **Unified toolkit** — Configure all tools with a single API key and opt-in to crawl, map, and agent capabilities
* **Smart filtering** — Domain and date filtering, topic-based routing
* **Multiple parsing formats** — Plain text, markdown (default), or simplified HTML
* **Full async support** — Both sync and async operations via the `nimble_python` SDK
* **Graceful error handling** — API errors are returned as messages to the agent instead of crashing the workflow

### Quick Start

#### Installation

```bash theme={"system"}
pip install -U langchain langchain-nimble langchain-openai
```

#### Setup

Get your API credentials from [Nimble's dashboard](https://online.nimbleway.com/account-settings/api-keys) (free trial available) and set as an environment variable:

```bash theme={"system"}
export NIMBLE_API_KEY="your-api-key"
```

#### Build an AI Agent with the Nimble Toolkit

```python theme={"system"}
from langchain.agents import create_agent
from langchain_nimble import NimbleToolkit
from langchain_openai import ChatOpenAI

# Initialize toolkit — search and extract are enabled by default
toolkit = NimbleToolkit(
    include_crawl=True,
    include_map=True,
    include_agent=True,
)
tools = toolkit.get_tools()

# Create agent with all Nimble tools
agent = create_agent(
    model=ChatOpenAI(model="gpt-5"),
    tools=tools,
    system_prompt=(
        "You are a helpful research assistant with access to "
        "real-time web information. You can search the web, "
        "extract content from URLs, crawl entire sites, "
        "map site structures, and use specialized data agents."
    )
)

# Use the agent
response = agent.invoke({
    "messages": [(
        "user",
        "What are the latest developments in AI agents? "
        "Summarize key findings."
    )]
})

print(response["messages"][-1].content)
```

### Tools

#### Crawl

Submit multi-page crawl jobs that automatically discover and extract content across an entire domain. The tool handles polling internally — the agent just gets results back.

```python theme={"system"}
from langchain_nimble import NimbleCrawlTool

crawl_tool = NimbleCrawlTool()

result = crawl_tool.invoke({
    "url": "https://docs.example.com",
    "max_pages": 50
})
```

#### Map

Discover URLs on a website by combining sitemap parsing and link crawling. Useful for understanding a site's structure before targeted extraction.

```python theme={"system"}
from langchain_nimble import NimbleMapTool

map_tool = NimbleMapTool()

result = map_tool.invoke({
    "url": "https://www.example.com"
})
```

#### Agent Tools

Access pre-built web agents that extract structured data from specific page types (product pages, job listings, reviews). Three tools (`List` → `Get` → `Run`) let the LLM agent browse available extractors, inspect their schemas, and run them.

```python theme={"system"}
from langchain_nimble import NimbleToolkit

toolkit = NimbleToolkit(include_agent=True)
tools = toolkit.get_tools()
# Includes: nimble_agent_list, nimble_agent_get, nimble_agent_run
```

### RAG with Knowledge Base

Extract specific URLs as your knowledge base and use them for RAG:

```python theme={"system"}
from langchain_nimble import NimbleExtractRetriever
from langchain_openai import ChatOpenAI
from langchain_core.output_parsers import StrOutputParser
from langchain_core.prompts import ChatPromptTemplate
from langchain_core.runnables import RunnablePassthrough

# Extract your knowledge base from specific URLs
retriever = NimbleExtractRetriever(
    urls=[
        "https://python.langchain.com/docs/concepts/retrievers/",
        "https://python.langchain.com/docs/concepts/tools/",
        "https://python.langchain.com/docs/tutorials/agents/"
    ],
    output_format="markdown"
)

# Build RAG chain
llm = ChatOpenAI(model="gpt-5", temperature=0)
prompt = ChatPromptTemplate.from_template(
    """Answer based only on the provided documentation.

Documentation: {context}

Question: {question}"""
)

chain = (
    {"context": retriever | (lambda docs: "\n\n".join(doc.page_content for doc in docs)),
     "question": RunnablePassthrough()}
    | prompt
    | llm
    | StrOutputParser()
)

# Ask questions about your knowledge base
answer = chain.invoke("What are the key differences between retrievers and tools in LangChain?")
print(answer)
```

### Additional Resources

* [GitHub Repository](https://github.com/Nimbleway/langchain-nimble)
* [PyPI Package](https://pypi.org/project/langchain-nimble/)
* [Nimble Python SDK](https://docs.nimbleway.com/nimble-sdk/sdks/python)
* [Example Cookbook](https://github.com/Nimbleway/cookbook)
* [LangChain Provider Docs](https://docs.langchain.com/oss/python/integrations/providers/nimble)
