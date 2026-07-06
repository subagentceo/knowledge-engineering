

SDK methods such as `model.respond()`, `model.applyPromptTemplate()`, or `model.act()`
takes in a chat parameter as an input. There are a few ways to represent a chat in the SDK.

Option 1: Array of Messages [#option-1-array-of-messages]

You can use an array of messages to represent a chat. Here is an example with the `.respond()` method.

<CodeBlockTabs defaultValue="Text-only">
  <CodeBlockTabsList>
    <CodeBlockTabsTrigger value="Text-only">
      Text-only
    </CodeBlockTabsTrigger>

    <CodeBlockTabsTrigger value="With Images">
      With Images
    </CodeBlockTabsTrigger>
  </CodeBlockTabsList>

  <CodeBlockTab value="Text-only">
    ```typescript
    const prediction = model.respond([
      { role: "system", content: "You are a resident AI philosopher." },
      { role: "user", content: "What is the meaning of life?" },
    ]);
    ```
  </CodeBlockTab>

  <CodeBlockTab value="With Images">
    ```typescript
    const image = await client.files.prepareImage("/path/to/image.jpg");

    const prediction = model.respond([
      { role: "system", content: "You are a state-of-art object recognition system." },
      { role: "user", content: "What is this object?", images: [image] },
    ]);
    ```
  </CodeBlockTab>
</CodeBlockTabs>

Option 2: Input a Single String [#option-2-input-a-single-string]

If your chat only has one single user message, you can use a single string to represent the chat. Here is an example with the `.respond` method.

```typescript
const prediction = model.respond("What is the meaning of life?");
```

Option 3: Using the `Chat` Helper Class [#option-3-using-the-chat-helper-class]

For more complex tasks, it is recommended to use the `Chat` helper classes. It provides various commonly used methods to manage the chat. Here is an example with the `Chat` class.

<CodeBlockTabs defaultValue="Text-only">
  <CodeBlockTabsList>
    <CodeBlockTabsTrigger value="Text-only">
      Text-only
    </CodeBlockTabsTrigger>

    <CodeBlockTabsTrigger value="With Images">
      With Images
    </CodeBlockTabsTrigger>
  </CodeBlockTabsList>

  <CodeBlockTab value="Text-only">
    ```typescript
    const chat = Chat.empty();
    chat.append("system", "You are a resident AI philosopher.");
    chat.append("user", "What is the meaning of life?");

    const prediction = model.respond(chat);
    ```
  </CodeBlockTab>

  <CodeBlockTab value="With Images">
    ```typescript
    const image = await client.files.prepareImage("/path/to/image.jpg");

    const chat = Chat.empty();
    chat.append("system", "You are a state-of-art object recognition system.");
    chat.append("user", "What is this object?", { images: [image] });

    const prediction = model.respond(chat);
    ```
  </CodeBlockTab>
</CodeBlockTabs>

You can also quickly construct a `Chat` object using the `Chat.from` method.

<CodeBlockTabs defaultValue="Array of messages">
  <CodeBlockTabsList>
    <CodeBlockTabsTrigger value="Array of messages">
      Array of messages
    </CodeBlockTabsTrigger>

    <CodeBlockTabsTrigger value="Single string">
      Single string
    </CodeBlockTabsTrigger>
  </CodeBlockTabsList>

  <CodeBlockTab value="Array of messages">
    ```typescript
    const chat = Chat.from([
      { role: "system", content: "You are a resident AI philosopher." },
      { role: "user", content: "What is the meaning of life?" },
    ]);
    ```
  </CodeBlockTab>

  <CodeBlockTab value="Single string">
    ```typescript
    // This constructs a chat with a single user message
    const chat = Chat.from("What is the meaning of life?");
    ```
  </CodeBlockTab>
</CodeBlockTabs>
