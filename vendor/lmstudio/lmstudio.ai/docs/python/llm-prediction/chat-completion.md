

Use `llm.respond(...)` to generate completions for a chat conversation.

Quick Example: Generate a Chat Response [#quick-example-generate-a-chat-response]

The following snippet shows how to obtain the AI's response to a quick chat prompt.

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
    print(model.respond("What is the meaning of life?"))
    ```
  </CodeBlockTab>

  <CodeBlockTab value="Python (scoped resource API)">
    ```python
    import lmstudio as lms

    with lms.Client() as client:
        model = client.llm.model()
        print(model.respond("What is the meaning of life?"))
    ```
  </CodeBlockTab>

  <CodeBlockTab value="Python (asynchronous API)">
    ```python
    # Note: assumes use of an async function or the "python -m asyncio" asynchronous REPL
    # Requires Python SDK version 1.5.0 or later
    import lmstudio as lms

    async with lms.AsyncClient() as client:
        model = await client.llm.model()
        print(await model.respond("What is the meaning of life?"))
    ```
  </CodeBlockTab>
</CodeBlockTabs>

Streaming a Chat Response [#streaming-a-chat-response]

The following snippet shows how to stream the AI's response to a chat prompt,
displaying text fragments as they are received (rather than waiting for the
entire response to be generated before displaying anything).

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

    for fragment in model.respond_stream("What is the meaning of life?"):
        print(fragment.content, end="", flush=True)
    print() # Advance to a new line at the end of the response
    ```
  </CodeBlockTab>

  <CodeBlockTab value="Python (scoped resource API)">
    ```python
    import lmstudio as lms

    with lms.Client() as client:
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

    async with lms.AsyncClient() as client:
        model = await client.llm.model()

        async for fragment in model.respond_stream("What is the meaning of life?"):
            print(fragment.content, end="", flush=True)
        print() # Advance to a new line at the end of the response
    ```
  </CodeBlockTab>
</CodeBlockTabs>

Cancelling a Chat Response [#cancelling-a-chat-response]

See the [Cancelling a Prediction](./cancelling-predictions) section for how to cancel a prediction in progress.

Obtain a Model [#obtain-a-model]

First, you need to get a model handle.
This can be done using the top-level `llm` convenience API,
or the `model` method in the `llm` namespace when using the scoped resource API.
For example, here is how to use Qwen2.5 7B Instruct.

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

    model = lms.llm("qwen2.5-7b-instruct")
    ```
  </CodeBlockTab>

  <CodeBlockTab value="Python (scoped resource API)">
    ```python
    import lmstudio as lms

    with lms.Client() as client:
        model = client.llm.model("qwen2.5-7b-instruct")
    ```
  </CodeBlockTab>

  <CodeBlockTab value="Python (asynchronous API)">
    ```python
    # Note: assumes use of an async function or the "python -m asyncio" asynchronous REPL
    # Requires Python SDK version 1.5.0 or later
    import lmstudio as lms

    async with lms.AsyncClient() as client:
        model = await client.llm.model("qwen2.5-7b-instruct")
    ```
  </CodeBlockTab>
</CodeBlockTabs>

There are other ways to get a model handle. See [Managing Models in Memory](./../manage-models/loading) for more info.

Manage Chat Context [#manage-chat-context]

The input to the model is referred to as the "context".
Conceptually, the model receives a multi-turn conversation as input,
and it is asked to predict the assistant's response in that conversation.

```python
import lmstudio as lms

# Create a chat with an initial system prompt.
chat = lms.Chat("You are a resident AI philosopher.")

# Build the chat context by adding messages of relevant types.
chat.add_user_message("What is the meaning of life?")
# ... continued in next example
```

See [Working with Chats](./working-with-chats) for more information on managing chat context.

<!-- , and [`Chat`](./../api-reference/chat) for API reference for the `Chat` class. -->

Generate a response [#generate-a-response]

You can ask the LLM to predict the next response in the chat context using the `respond()` method.

<CodeBlockTabs defaultValue="Non-streaming (synchronous API)">
  <CodeBlockTabsList>
    <CodeBlockTabsTrigger value="Non-streaming (synchronous API)">
      Non-streaming (synchronous API)
    </CodeBlockTabsTrigger>

    <CodeBlockTabsTrigger value="Streaming (synchronous API)">
      Streaming (synchronous API)
    </CodeBlockTabsTrigger>

    <CodeBlockTabsTrigger value="Non-streaming (asynchronous API)">
      Non-streaming (asynchronous API)
    </CodeBlockTabsTrigger>

    <CodeBlockTabsTrigger value="Streaming (asynchronous API)">
      Streaming (asynchronous API)
    </CodeBlockTabsTrigger>
  </CodeBlockTabsList>

  <CodeBlockTab value="Non-streaming (synchronous API)">
    ```python
    # The `chat` object is created in the previous step.
    result = model.respond(chat)

    print(result)
    ```
  </CodeBlockTab>

  <CodeBlockTab value="Streaming (synchronous API)">
    ```python
    # The `chat` object is created in the previous step.
    prediction_stream = model.respond_stream(chat)

    for fragment in prediction_stream:
        print(fragment.content, end="", flush=True)
    print() # Advance to a new line at the end of the response
    ```
  </CodeBlockTab>

  <CodeBlockTab value="Non-streaming (asynchronous API)">
    ```python
    # Note: assumes use of an async function or the "python -m asyncio" asynchronous REPL
    # Requires Python SDK version 1.5.0 or later
    # The `chat` object is created in the previous step.
    result = await model.respond(chat)

    print(result)
    ```
  </CodeBlockTab>

  <CodeBlockTab value="Streaming (asynchronous API)">
    ```python
    # Note: assumes use of an async function or the "python -m asyncio" asynchronous REPL
    # Requires Python SDK version 1.5.0 or later
    # The `chat` object is created in the previous step.
    prediction_stream = await model.respond_stream(chat)

    async for fragment in prediction_stream:
        print(fragment.content, end="", flush=True)
    print() # Advance to a new line at the end of the response
    ```
  </CodeBlockTab>
</CodeBlockTabs>

Customize Inferencing Parameters [#customize-inferencing-parameters]

You can pass in inferencing parameters via the `config` keyword parameter on `.respond()`.

<CodeBlockTabs defaultValue="Non-streaming (synchronous API)">
  <CodeBlockTabsList>
    <CodeBlockTabsTrigger value="Non-streaming (synchronous API)">
      Non-streaming (synchronous API)
    </CodeBlockTabsTrigger>

    <CodeBlockTabsTrigger value="Streaming (synchronous API)">
      Streaming (synchronous API)
    </CodeBlockTabsTrigger>

    <CodeBlockTabsTrigger value="Non-streaming (asynchronous API)">
      Non-streaming (asynchronous API)
    </CodeBlockTabsTrigger>

    <CodeBlockTabsTrigger value="Streaming (asynchronous API)">
      Streaming (asynchronous API)
    </CodeBlockTabsTrigger>
  </CodeBlockTabsList>

  <CodeBlockTab value="Non-streaming (synchronous API)">
    ```python
    result = model.respond(chat, config={
        "temperature": 0.6,
        "maxTokens": 50,
    })
    ```
  </CodeBlockTab>

  <CodeBlockTab value="Streaming (synchronous API)">
    ```python
    prediction_stream = model.respond_stream(chat, config={
        "temperature": 0.6,
        "maxTokens": 50,
    })
    ```
  </CodeBlockTab>

  <CodeBlockTab value="Non-streaming (asynchronous API)">
    ```python
    # Note: assumes use of an async function or the "python -m asyncio" asynchronous REPL
    # Requires Python SDK version 1.5.0 or later
    result = await model.respond(chat, config={
        "temperature": 0.6,
        "maxTokens": 50,
    })
    ```
  </CodeBlockTab>

  <CodeBlockTab value="Streaming (asynchronous API)">
    ```python
    # Note: assumes use of an async function or the "python -m asyncio" asynchronous REPL
    # Requires Python SDK version 1.5.0 or later
    prediction_stream = await model.respond_stream(chat, config={
        "temperature": 0.6,
        "maxTokens": 50,
    })
    ```
  </CodeBlockTab>
</CodeBlockTabs>

See [Configuring the Model](./parameters) for more information on what can be configured.

Print prediction stats [#print-prediction-stats]

You can also print prediction metadata, such as the model used for generation, number of generated
tokens, time to first token, and stop reason.

<CodeBlockTabs defaultValue="Non-streaming">
  <CodeBlockTabsList>
    <CodeBlockTabsTrigger value="Non-streaming">
      Non-streaming
    </CodeBlockTabsTrigger>

    <CodeBlockTabsTrigger value="Streaming">
      Streaming
    </CodeBlockTabsTrigger>
  </CodeBlockTabsList>

  <CodeBlockTab value="Non-streaming">
    ```python
    # `result` is the response from the model.
    print("Model used:", result.model_info.display_name)
    print("Predicted tokens:", result.stats.predicted_tokens_count)
    print("Time to first token (seconds):", result.stats.time_to_first_token_sec)
    print("Stop reason:", result.stats.stop_reason)
    ```
  </CodeBlockTab>

  <CodeBlockTab value="Streaming">
    ```python
    # After iterating through the prediction fragments,
    # the overall prediction result may be obtained from the stream
    result = prediction_stream.result()

    print("Model used:", result.model_info.display_name)
    print("Predicted tokens:", result.stats.predicted_tokens_count)
    print("Time to first token (seconds):", result.stats.time_to_first_token_sec)
    print("Stop reason:", result.stats.stop_reason)
    ```
  </CodeBlockTab>
</CodeBlockTabs>

Both the non-streaming and streaming result access is consistent across the synchronous and
asynchronous APIs, as `prediction_stream.result()` is a non-blocking API that raises an exception
if no result is available (either because the prediction is still running, or because the
prediction request failed). Prediction streams also offer a blocking (synchronous API) or
awaitable (asynchronous API) `prediction_stream.wait_for_result()` method that internally handles
iterating the stream to completion before returning the result.

Example: Multi-turn Chat [#example-multi-turn-chat]

```python title="chatbot.py"
import lmstudio as lms

model = lms.llm()
chat = lms.Chat("You are a task focused AI assistant")

while True:
    try:
        user_input = input("You (leave blank to exit): ")
    except EOFError:
        print()
        break
    if not user_input:
        break
    chat.add_user_message(user_input)
    prediction_stream = model.respond_stream(
        chat,
        on_message=chat.append,
    )
    print("Bot: ", end="", flush=True)
    for fragment in prediction_stream:
        print(fragment.content, end="", flush=True)
    print()
```

Progress Callbacks [#progress-callbacks]

Long prompts will often take a long time to first token, i.e. it takes the model a long time to process your prompt.
If you want to get updates on the progress of this process, you can provide a float callback to `respond`
that receives a float from 0.0-1.0 representing prompt processing progress.

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

    llm = lms.llm()

    response = llm.respond(
        "What is LM Studio?",
        on_prompt_processing_progress = (lambda progress: print(f"{progress*100}% complete")),
    )
    ```
  </CodeBlockTab>

  <CodeBlockTab value="Python (scoped resource API)">
    ```python
    import lmstudio as lms

    with lms.Client() as client:
        llm = client.llm.model()

        response = llm.respond(
            "What is LM Studio?",
            on_prompt_processing_progress = (lambda progress: print(f"{progress*100}% complete")),
        )
    ```
  </CodeBlockTab>

  <CodeBlockTab value="Python (asynchronous API)">
    ```python
    # Note: assumes use of an async function or the "python -m asyncio" asynchronous REPL
    # Requires Python SDK version 1.5.0 or later
    import lmstudio as lms

    async with lms.AsyncClient() as client:
        llm = await client.llm.model()

        response = await llm.respond(
            "What is LM Studio?",
            on_prompt_processing_progress = (lambda progress: print(f"{progress*100}% complete")),
        )
    ```
  </CodeBlockTab>
</CodeBlockTabs>

In addition to `on_prompt_processing_progress`, the other available progress callbacks are:

* `on_first_token`: called after prompt processing is complete and the first token is being emitted.
  Does not receive any arguments (use the streaming iteration API or `on_prediction_fragment`
  to process tokens as they are emitted).
* `on_prediction_fragment`: called for each prediction fragment received by the client.
  Receives the same prediction fragments as iterating over the stream iteration API.
* `on_message`: called with an assistant response message when the prediction is complete.
  Intended for appending received messages to a chat history instance.
