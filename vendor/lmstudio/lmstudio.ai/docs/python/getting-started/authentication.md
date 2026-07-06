

Requires LM Studio 0.4.0 or newer. [#requires-lm-studio-040-or-newer]

LM Studio supports API Tokens for authentication, providing a secure and convenient way to access the LM Studio API.

By default, the LM Studio API runs **without enforcing authentication**. For production or shared environments, enable API Token authentication for secure access.

<Callout type="info" title="Info">
  To enable API Token authentication, create tokens and control granular permissions, check [this guide](/docs/developer/core/authentication) for more details.
</Callout>

Providing the API Token [#providing-the-api-token]

The API Token can be provided in two ways:

1. **Environment Variable (Recommended)**: Set the `LM_API_TOKEN` environment variable, and the SDK will automatically read it.
2. **Function Argument**: Pass the token directly as the `api_token` parameter.

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

    # Configure the default client with an API token
    lms.configure_default_client(api_token="your-token-here")

    model = lms.llm()
    result = model.respond("What is the meaning of life?")
    print(result)
    ```
  </CodeBlockTab>

  <CodeBlockTab value="Python (scoped resource API)">
    ```python
    import lmstudio as lms

    # Pass api_token to the Client constructor
    with lms.Client(api_token="your-token-here") as client:
        model = client.llm.model()
        result = model.respond("What is the meaning of life?")
        print(result)
    ```
  </CodeBlockTab>

  <CodeBlockTab value="Python (asynchronous API)">
    ```python
    # Note: assumes use of an async function or the "python -m asyncio" asynchronous REPL
    # Requires Python SDK version 1.5.0 or later
    import lmstudio as lms

    # Pass api_token to the AsyncClient constructor
    async with lms.AsyncClient(api_token="your-token-here") as client:
        model = await client.llm.model()
        result = await model.respond("What is the meaning of life?")
        print(result)
    ```
  </CodeBlockTab>
</CodeBlockTabs>
