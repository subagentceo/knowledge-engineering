

You can access information about a loaded model using the `getInfo` method.

<CodeBlockTabs defaultValue="LLM">
  <CodeBlockTabsList>
    <CodeBlockTabsTrigger value="LLM">
      LLM
    </CodeBlockTabsTrigger>

    <CodeBlockTabsTrigger value="Embedding Model">
      Embedding Model
    </CodeBlockTabsTrigger>
  </CodeBlockTabsList>

  <CodeBlockTab value="LLM">
    ```typescript
    import { LMStudioClient } from "@lmstudio/sdk";

    const client = new LMStudioClient();
    const model = await client.llm.model();

    const modelInfo = await model.getInfo();

    console.info("Model Key", modelInfo.modelKey);
    console.info("Current Context Length", model.contextLength);
    console.info("Model Trained for Tool Use", modelInfo.trainedForToolUse);
    // etc.
    ```
  </CodeBlockTab>

  <CodeBlockTab value="Embedding Model">
    ```typescript
    import { LMStudioClient } from "@lmstudio/sdk";

    const client = new LMStudioClient();
    const model = await client.embedding.model();

    const modelInfo = await model.getInfo();

    console.info("Model Key", modelInfo.modelKey);
    console.info("Current Context Length", modelInfo.contextLength);
    // etc.
    ```
  </CodeBlockTab>
</CodeBlockTabs>
