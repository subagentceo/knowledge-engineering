

You can access general information and metadata about a model itself from a loaded
instance of that model.

In the below examples, the LLM reference can be replaced with an
embedding model reference without requiring any other changes.

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

    model = lms.llm()

    print(model.get_info())
    ```
  </CodeBlockTab>

  <CodeBlockTab value="Python (scoped resource API)">
    ```python
    import lmstudio as lms

    with lms.Client() as client:
        model = client.llm.model()

        print(model.get_info())
    ```
  </CodeBlockTab>

  <CodeBlockTab value="Python (asynchronous API)">
    ```python
    # Note: assumes use of an async function or the "python -m asyncio" asynchronous REPL
    # Requires Python SDK version 1.5.0 or later
    import lmstudio as lms

    async with lms.AsyncClient() as client:
        model = await client.llm.model()

        print(await model.get_info())
    ```
  </CodeBlockTab>
</CodeBlockTabs>

Example output [#example-output]

```python
LlmInstanceInfo.from_dict({
  "architecture": "qwen2",
  "contextLength": 4096,
  "displayName": "Qwen2.5 7B Instruct 1M",
  "format": "gguf",
  "identifier": "qwen2.5-7b-instruct",
  "instanceReference": "lpFZPBQjhSZPrFevGyY6Leq8",
  "maxContextLength": 1010000,
  "modelKey": "qwen2.5-7b-instruct-1m",
  "paramsString": "7B",
  "path": "lmstudio-community/Qwen2.5-7B-Instruct-1M-GGUF/Qwen2.5-7B-Instruct-1M-Q4_K_M.gguf",
  "sizeBytes": 4683073888,
  "trainedForToolUse": true,
  "type": "llm",
  "vision": false
})
```
