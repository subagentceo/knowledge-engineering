

SDK methods such as `llm.respond()`, `llm.applyPromptTemplate()`, or `llm.act()`
take in a chat parameter as an input.
There are a few ways to represent a chat when using the SDK.

Option 1: Input a Single String [#option-1-input-a-single-string]

If your chat only has one single user message, you can use a single string to represent the chat.
Here is an example with the `.respond` method.

```python
prediction = llm.respond("What is the meaning of life?")
```

Option 2: Using the `Chat` Helper Class [#option-2-using-the-chat-helper-class]

For more complex tasks, it is recommended to use the `Chat` helper class.
It provides various commonly used methods to manage the chat.
Here is an example with the `Chat` class, where the initial system prompt
is supplied when initializing the chat instance, and then the initial user
message is added via the corresponding method call.

```python
chat = Chat("You are a resident AI philosopher.")
chat.add_user_message("What is the meaning of life?")

prediction = llm.respond(chat)
```

You can also quickly construct a `Chat` object using the `Chat.from_history` method.

<CodeBlockTabs defaultValue="Chat history data">
  <CodeBlockTabsList>
    <CodeBlockTabsTrigger value="Chat history data">
      Chat history data
    </CodeBlockTabsTrigger>

    <CodeBlockTabsTrigger value="Single string">
      Single string
    </CodeBlockTabsTrigger>
  </CodeBlockTabsList>

  <CodeBlockTab value="Chat history data">
    ```python
    chat = Chat.from_history({"messages": [
      { "role": "system", "content": "You are a resident AI philosopher." },
      { "role": "user", "content": "What is the meaning of life?" },
    ]})
    ```
  </CodeBlockTab>

  <CodeBlockTab value="Single string">
    ```python
    # This constructs a chat with a single user message
    chat = Chat.from_history("What is the meaning of life?")
    ```
  </CodeBlockTab>
</CodeBlockTabs>

Option 3: Providing Chat History Data Directly [#option-3-providing-chat-history-data-directly]

As the APIs that accept chat histories use `Chat.from_history` internally,
they also accept the chat history data format as a regular dictionary:

```python
prediction = llm.respond({"messages": [
  { "role": "system", "content": "You are a resident AI philosopher." },
  { "role": "user", "content": "What is the meaning of life?" },
]})
```
