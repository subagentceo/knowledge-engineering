

`lmstudio` is a library published on PyPI that allows you to use `lmstudio-python` in your own projects.
It is open source and developed on GitHub.
You can find the source code [here](https://github.com/lmstudio-ai/lmstudio-python).

Installing `lmstudio-python` [#installing-lmstudio-python]

As it is published to PyPI, `lmstudio-python` may be installed using `pip`
or your preferred project dependency manager (`pdm` and `uv` are shown, but other
Python project management tools offer similar dependency addition commands).

<CodeBlockTabs defaultValue="pip">
  <CodeBlockTabsList>
    <CodeBlockTabsTrigger value="pip">
      pip
    </CodeBlockTabsTrigger>

    <CodeBlockTabsTrigger value="pdm">
      pdm
    </CodeBlockTabsTrigger>

    <CodeBlockTabsTrigger value="uv">
      uv
    </CodeBlockTabsTrigger>
  </CodeBlockTabsList>

  <CodeBlockTab value="pip">
    ```bash
    pip install lmstudio
    ```
  </CodeBlockTab>

  <CodeBlockTab value="pdm">
    ```bash
    pdm add lmstudio
    ```
  </CodeBlockTab>

  <CodeBlockTab value="uv">
    ```bash
    uv add lmstudio
    ```
  </CodeBlockTab>
</CodeBlockTabs>

Customizing the server API host and TCP port [#customizing-the-server-api-host-and-tcp-port]

All of the examples in the documentation assume that the server API is running locally
on one of the default application ports (Note: in Python SDK versions prior to 1.5.0, the
SDK also required that the optional HTTP REST server be enabled).

The network location of the server API can be overridden by
passing a `"host:port"` string when creating the client instance.

<CodeBlockTabs defaultValue="Python (convenience API)">
  <CodeBlockTabsList>
    <CodeBlockTabsTrigger value="Python (convenience API)">
      Python (convenience API)
    </CodeBlockTabsTrigger>

    <CodeBlockTabsTrigger value="Python (scoped resource API)">
      Python (scoped resource API)
    </CodeBlockTabsTrigger>

    <CodeBlockTabsTrigger value="Python (asynchronous API)">
      Python (asynchronous API)
    </CodeBlockTabsTrigger>
  </CodeBlockTabsList>

  <CodeBlockTab value="Python (convenience API)">
    ```python
    import lmstudio as lms
    SERVER_API_HOST = "localhost:1234"

    # This must be the *first* convenience API interaction (otherwise the SDK
    # implicitly creates a client that accesses the default server API host)
    lms.configure_default_client(SERVER_API_HOST)

    # Note: the dedicated configuration API was added in lmstudio-python 1.3.0
    # For compatibility with earlier SDK versions, it is still possible to use
    # lms.get_default_client(SERVER_API_HOST) to configure the default client
    ```
  </CodeBlockTab>

  <CodeBlockTab value="Python (scoped resource API)">
    ```python
    import lmstudio as lms
    SERVER_API_HOST = "localhost:1234"

    # When using the scoped resource API, each client instance
    # can be configured to use a specific server API host
    with lms.Client(SERVER_API_HOST) as client:
        model = client.llm.model()

        for fragment in model.respond_stream("What is the meaning of life?"):
            print(fragment.content, end="", flush=True)
        print() # Advance to a new line at the end of the response
    ```
  </CodeBlockTab>

  <CodeBlockTab value="Python (asynchronous API)">
    ```python
    # Note: assumes use of an async function or the "python -m asyncio" asynchronous REPL
    # Requires Python SDK version 1.5.0 or later
    import lmstudio as lms
    SERVER_API_HOST = "localhost:1234"

    # When using the asynchronous API, each client instance
    # can be configured to use a specific server API host
    async with lms.AsyncClient(SERVER_API_HOST) as client:
        model = await client.llm.model()

        for fragment in await model.respond_stream("What is the meaning of life?"):
            print(fragment.content, end="", flush=True)
        print() # Advance to a new line at the end of the response
    ```
  </CodeBlockTab>
</CodeBlockTabs>

Checking a specified API server host is running [#checking-a-specified-api-server-host-is-running]

*Required Python SDK version*: **1.5.0**

While the most common connection pattern is to let the SDK raise an exception if it can't
connect to the specified API server host, the SDK also supports running the API check directly
without creating an SDK client instance first:

<CodeBlockTabs defaultValue="Python (synchronous API)">
  <CodeBlockTabsList>
    <CodeBlockTabsTrigger value="Python (synchronous API)">
      Python (synchronous API)
    </CodeBlockTabsTrigger>

    <CodeBlockTabsTrigger value="Python (asynchronous API)">
      Python (asynchronous API)
    </CodeBlockTabsTrigger>
  </CodeBlockTabsList>

  <CodeBlockTab value="Python (synchronous API)">
    ```python
    import lmstudio as lms
    SERVER_API_HOST = "localhost:1234"

    if lms.Client.is_valid_api_host(SERVER_API_HOST):
        print(f"An LM Studio API server instance is available at {SERVER_API_HOST}")
    else:
        print("No LM Studio API server instance found at {SERVER_API_HOST}")
    ```
  </CodeBlockTab>

  <CodeBlockTab value="Python (asynchronous API)">
    ```python
    # Note: assumes use of an async function or the "python -m asyncio" asynchronous REPL
    # Requires Python SDK version 1.5.0 or later
    import lmstudio as lms
    SERVER_API_HOST = "localhost:1234"

    if await lms.AsyncClient.is_valid_api_host(SERVER_API_HOST):
        print(f"An LM Studio API server instance is available at {SERVER_API_HOST}")
    else:
        print("No LM Studio API server instance found at {SERVER_API_HOST}")
    ```
  </CodeBlockTab>
</CodeBlockTabs>

Determining the default local API server port [#determining-the-default-local-api-server-port]

*Required Python SDK version*: **1.5.0**

When no API server host is specified, the SDK queries a number of ports on the local loopback
interface for a running API server instance. This scan is repeated for each new client instance
created. Rather than letting the SDK perform this scan implicitly, the SDK also supports running
the scan explicitly, and passing in the reported API server details when creating clients:

<CodeBlockTabs defaultValue="Python (synchronous API)">
  <CodeBlockTabsList>
    <CodeBlockTabsTrigger value="Python (synchronous API)">
      Python (synchronous API)
    </CodeBlockTabsTrigger>

    <CodeBlockTabsTrigger value="Python (asynchronous API)">
      Python (asynchronous API)
    </CodeBlockTabsTrigger>
  </CodeBlockTabsList>

  <CodeBlockTab value="Python (synchronous API)">
    ```python
    import lmstudio as lms

    api_host = lms.Client.find_default_local_api_host()
    if api_host is not None:
        print(f"An LM Studio API server instance is available at {api_host}")
      else:
        print("No LM Studio API server instance found on any of the default local ports")
    ```
  </CodeBlockTab>

  <CodeBlockTab value="Python (asynchronous API)">
    ```python
    # Note: assumes use of an async function or the "python -m asyncio" asynchronous REPL
    # Requires Python SDK version 1.5.0 or later
    import lmstudio as lms

    api_host = await lms.AsyncClient.find_default_local_api_host()
    if api_host is not None:
        print(f"An LM Studio API server instance is available at {api_host}")
      else:
        print("No LM Studio API server instance found on any of the default local ports")
    ```
  </CodeBlockTab>
</CodeBlockTabs>
