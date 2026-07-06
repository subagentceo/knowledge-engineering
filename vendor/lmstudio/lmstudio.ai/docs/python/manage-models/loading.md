

AI models are huge. It can take a while to load them into memory. LM Studio's SDK allows you to precisely control this process.

**Model namespaces:**

* LLMs are accessed through the `client.llm` namespace
* Embedding models are accessed through the `client.embedding` namespace
* `lmstudio.llm` is equivalent to `client.llm.model` on the default client
* `lmstudio.embedding_model` is equivalent to `client.embedding.model` on the default client

**Most commonly:**

* Use `.model()` to get any currently loaded model
* Use `.model("model-key")` to use a specific model

**Advanced (manual model management):**

* Use `.load_new_instance("model-key")` to load a new instance of a model
* Use `.unload("model-key")` or `model_handle.unload()` to unload a model from memory

Get the Current Model with `.model()` [#get-the-current-model-with-model]

If you already have a model loaded in LM Studio (either via the GUI or `lms load`),
you can use it by calling `.model()` without any arguments.

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
    ```
  </CodeBlockTab>

  <CodeBlockTab value="Python (scoped resource API)">
    ```python
    import lmstudio as lms

    with lms.Client() as client:
        model = client.llm.model()
    ```
  </CodeBlockTab>

  <CodeBlockTab value="Python (asynchronous API)">
    ```python
    # Note: assumes use of an async function or the "python -m asyncio" asynchronous REPL
    # Requires Python SDK version 1.5.0 or later
    import lmstudio as lms

    async with lms.AsyncClient() as client:
        model = await client.llm.model()
    ```
  </CodeBlockTab>
</CodeBlockTabs>

Get a Specific Model with `.model("model-key")` [#get-a-specific-model-with-modelmodel-key]

If you want to use a specific model, you can provide the model key as an argument to `.model()`.

Get if Loaded, or Load if not [#get-if-loaded-or-load-if-not]

Calling `.model("model-key")` will load the model if it's not already loaded, or return the existing instance if it is.

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

    model = lms.llm("qwen/qwen3-4b-2507")
    ```
  </CodeBlockTab>

  <CodeBlockTab value="Python (scoped resource API)">
    ```python
    import lmstudio as lms

    with lms.Client() as client:
        model = client.llm.model("qwen/qwen3-4b-2507")
    ```
  </CodeBlockTab>

  <CodeBlockTab value="Python (asynchronous API)">
    ```python
    # Note: assumes use of an async function or the "python -m asyncio" asynchronous REPL
    # Requires Python SDK version 1.5.0 or later
    import lmstudio as lms

    async with lms.AsyncClient() as client:
        model = await client.llm.model("qwen/qwen3-4b-2507")
    ```
  </CodeBlockTab>
</CodeBlockTabs>

Load a New Instance of a Model with `.load_new_instance()` [#load-a-new-instance-of-a-model-with-load_new_instance]

Use `load_new_instance()` to load a new instance of a model, even if one already exists.
This allows you to have multiple instances of the same or different models loaded at the same time.

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

    client = lms.get_default_client()
    model = client.llm.load_new_instance("qwen/qwen3-4b-2507")
    another_model = client.llm.load_new_instance("qwen/qwen3-4b-2507", "my-second-model")
    ```
  </CodeBlockTab>

  <CodeBlockTab value="Python (scoped resource API)">
    ```python
    import lmstudio as lms

    with lms.Client() as client:
        model = client.llm.load_new_instance("qwen/qwen3-4b-2507")
        another_model = client.llm.load_new_instance("qwen/qwen3-4b-2507", "my-second-model")
    ```
  </CodeBlockTab>

  <CodeBlockTab value="Python (asynchronous API)">
    ```python
    # Note: assumes use of an async function or the "python -m asyncio" asynchronous REPL
    # Requires Python SDK version 1.5.0 or later
    import lmstudio as lms

    async with lms.AsyncClient() as client:
        model = await client.llm.load_new_instance("qwen/qwen3-4b-2507")
        another_model = await client.llm.load_new_instance("qwen/qwen3-4b-2507", "my-second-model")
    ```
  </CodeBlockTab>
</CodeBlockTabs>

Note about Instance Identifiers [#note-about-instance-identifiers]

If you provide an instance identifier that already exists, the server will throw an error.
So if you don't really care, it's safer to not provide an identifier, in which case
the server will generate one for you. You can always check in the server tab in LM Studio, too!

Unload a Model from Memory with `.unload()` [#unload-a-model-from-memory-with-unload]

Once you no longer need a model, you can unload it by simply calling `unload()` on its handle.

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
    model.unload()
    ```
  </CodeBlockTab>

  <CodeBlockTab value="Python (scoped resource API)">
    ```python
    import lmstudio as lms

    with lms.Client() as client:
        model = client.llm.model()
        model.unload()
    ```
  </CodeBlockTab>

  <CodeBlockTab value="Python (asynchronous API)">
    ```python
    # Note: assumes use of an async function or the "python -m asyncio" asynchronous REPL
    # Requires Python SDK version 1.5.0 or later
    import lmstudio as lms

    async with lms.AsyncClient() as client:
        model = await client.llm.model()
        await model.unload()
    ```
  </CodeBlockTab>
</CodeBlockTabs>

Set Custom Load Config Parameters [#set-custom-load-config-parameters]

You can also specify the same load-time configuration options when loading a model, such as Context Length and GPU offload.

See [load-time configuration](../llm-prediction/parameters) for more.

Set an Auto Unload Timer (TTL) [#set-an-auto-unload-timer-ttl]

You can specify a *time to live* for a model you load, which is the idle time (in seconds)
after the last request until the model unloads. See [Idle TTL](/docs/app/api/ttl-and-auto-evict) for more on this.

<Callout type="success" title="Pro Tip">
  If you specify a TTL to `model()`, it will only apply if `model()` loads
  a new instance, and will *not* retroactively change the TTL of an existing instance.
</Callout>

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

    model = lms.llm("qwen/qwen3-4b-2507", ttl=3600)
    ```
  </CodeBlockTab>

  <CodeBlockTab value="Python (scoped resource API)">
    ```python
    import lmstudio as lms

    with lms.Client() as client:
        model = client.llm.model("qwen/qwen3-4b-2507", ttl=3600)
    ```
  </CodeBlockTab>

  <CodeBlockTab value="Python (asynchronous API)">
    ```python
    # Note: assumes use of an async function or the "python -m asyncio" asynchronous REPL
    # Requires Python SDK version 1.5.0 or later
    import lmstudio as lms

    async with lms.AsyncClient() as client:
        model = await client.llm.model("qwen/qwen3-4b-2507", ttl=3600)
    ```
  </CodeBlockTab>
</CodeBlockTabs>
