

Streaming events let you render chat responses incrementally over Server‑Sent Events (SSE). When you call `POST /api/v1/chat` with `stream: true`, the server emits a series of named events that you can consume. These events arrive in order and may include multiple deltas (for reasoning and message content), tool call boundaries and payloads, and any errors encountered. The stream always begins with `chat.start` and concludes with `chat.end`, which contains the aggregated result equivalent to a non‑streaming response.

List of event types that can be sent in an `/api/v1/chat` response stream:

* `chat.start`
* `model_load.start`
* `model_load.progress`
* `model_load.end`
* `prompt_processing.start`
* `prompt_processing.progress`
* `prompt_processing.end`
* `reasoning.start`
* `reasoning.delta`
* `reasoning.end`
* `tool_call.start`
* `tool_call.arguments`
* `tool_call.success`
* `tool_call.failure`
* `message.start`
* `message.delta`
* `message.end`
* `error`
* `chat.end`

Events will be streamed out in the following raw format:

```bash
event: <event type>
data: <JSON event data>
```

`chat.start` [#chatstart]

<DocsHStack>
  <DocsHStackLeft>
    An event that is emitted at the start of a chat response stream.

    <DocsParamsTable data="-%20name%3A%20model_instance_id%0A%20%20type%3A%20string%0A%20%20description%3A%20Unique%20identifier%20for%20the%20loaded%20model%20instance%20that%20will%20generate%20the%20response.%0A-%20name%3A%20type%0A%20%20type%3A%20'%22chat.start%22'%0A%20%20description%3A%20The%20type%20of%20the%20event.%20Always%20%60chat.start%60." />
  </DocsHStackLeft>

  <DocsHStackRight>
    ```json title="Example Event Data"
    {
      "type": "chat.start",
      "model_instance_id": "openai/gpt-oss-20b"
    }
    ```
  </DocsHStackRight>
</DocsHStack>

`model_load.start` [#model_loadstart]

<DocsHStack>
  <DocsHStackLeft>
    Signals the start of a model being loaded to fulfill the chat request. Will not be emitted if the requested model is already loaded.

    <DocsParamsTable data="-%20name%3A%20model_instance_id%0A%20%20type%3A%20string%0A%20%20description%3A%20Unique%20identifier%20for%20the%20model%20instance%20being%20loaded.%0A-%20name%3A%20type%0A%20%20type%3A%20'%22model_load.start%22'%0A%20%20description%3A%20The%20type%20of%20the%20event.%20Always%20%60model_load.start%60." />
  </DocsHStackLeft>

  <DocsHStackRight>
    ```json title="Example Event Data"
    {
      "type": "model_load.start",
      "model_instance_id": "openai/gpt-oss-20b"
    }
    ```
  </DocsHStackRight>
</DocsHStack>

`model_load.progress` [#model_loadprogress]

<DocsHStack>
  <DocsHStackLeft>
    Progress of the model load.

    <DocsParamsTable data="-%20name%3A%20model_instance_id%0A%20%20type%3A%20string%0A%20%20description%3A%20Unique%20identifier%20for%20the%20model%20instance%20being%20loaded.%0A-%20name%3A%20progress%0A%20%20type%3A%20number%0A%20%20description%3A%20Progress%20of%20the%20model%20load%20as%20a%20float%20between%20%600%60%20and%20%601%60.%0A-%20name%3A%20type%0A%20%20type%3A%20'%22model_load.progress%22'%0A%20%20description%3A%20The%20type%20of%20the%20event.%20Always%20%60model_load.progress%60." />
  </DocsHStackLeft>

  <DocsHStackRight>
    ```json title="Example Event Data"
    {
      "type": "model_load.progress",
      "model_instance_id": "openai/gpt-oss-20b",
      "progress": 0.65
    }
    ```
  </DocsHStackRight>
</DocsHStack>

`model_load.end` [#model_loadend]

<DocsHStack>
  <DocsHStackLeft>
    Signals a successfully completed model load.

    <DocsParamsTable data="-%20name%3A%20model_instance_id%0A%20%20type%3A%20string%0A%20%20description%3A%20Unique%20identifier%20for%20the%20model%20instance%20that%20was%20loaded.%0A-%20name%3A%20load_time_seconds%0A%20%20type%3A%20number%0A%20%20description%3A%20Time%20taken%20to%20load%20the%20model%20in%20seconds.%0A-%20name%3A%20type%0A%20%20type%3A%20'%22model_load.end%22'%0A%20%20description%3A%20The%20type%20of%20the%20event.%20Always%20%60model_load.end%60." />
  </DocsHStackLeft>

  <DocsHStackRight>
    ```json title="Example Event Data"
    {
      "type": "model_load.end",
      "model_instance_id": "openai/gpt-oss-20b",
      "load_time_seconds": 12.34
    }
    ```
  </DocsHStackRight>
</DocsHStack>

`prompt_processing.start` [#prompt_processingstart]

<DocsHStack>
  <DocsHStackLeft>
    Signals the start of the model processing a prompt.

    <DocsParamsTable data="-%20name%3A%20type%0A%20%20type%3A%20'%22prompt_processing.start%22'%0A%20%20description%3A%20The%20type%20of%20the%20event.%20Always%20%60prompt_processing.start%60." />
  </DocsHStackLeft>

  <DocsHStackRight>
    ```json title="Example Event Data"
    {
      "type": "prompt_processing.start"
    }
    ```
  </DocsHStackRight>
</DocsHStack>

`prompt_processing.progress` [#prompt_processingprogress]

<DocsHStack>
  <DocsHStackLeft>
    Progress of the model processing a prompt.

    <DocsParamsTable data="-%20name%3A%20progress%0A%20%20type%3A%20number%0A%20%20description%3A%20Progress%20of%20the%20prompt%20processing%20as%20a%20float%20between%20%600%60%20and%20%601%60.%0A-%20name%3A%20type%0A%20%20type%3A%20'%22prompt_processing.progress%22'%0A%20%20description%3A%20The%20type%20of%20the%20event.%20Always%20%60prompt_processing.progress%60." />
  </DocsHStackLeft>

  <DocsHStackRight>
    ```json title="Example Event Data"
    {
      "type": "prompt_processing.progress",
      "progress": 0.5
    }
    ```
  </DocsHStackRight>
</DocsHStack>

`prompt_processing.end` [#prompt_processingend]

<DocsHStack>
  <DocsHStackLeft>
    Signals the end of the model processing a prompt.

    <DocsParamsTable data="-%20name%3A%20type%0A%20%20type%3A%20'%22prompt_processing.end%22'%0A%20%20description%3A%20The%20type%20of%20the%20event.%20Always%20%60prompt_processing.end%60." />
  </DocsHStackLeft>

  <DocsHStackRight>
    ```json title="Example Event Data"
    {
      "type": "prompt_processing.end"
    }
    ```
  </DocsHStackRight>
</DocsHStack>

`reasoning.start` [#reasoningstart]

<DocsHStack>
  <DocsHStackLeft>
    Signals the model is starting to stream reasoning content.

    <DocsParamsTable data="-%20name%3A%20type%0A%20%20type%3A%20'%22reasoning.start%22'%0A%20%20description%3A%20The%20type%20of%20the%20event.%20Always%20%60reasoning.start%60." />
  </DocsHStackLeft>

  <DocsHStackRight>
    ```json title="Example Event Data"
    {
      "type": "reasoning.start"
    }
    ```
  </DocsHStackRight>
</DocsHStack>

`reasoning.delta` [#reasoningdelta]

<DocsHStack>
  <DocsHStackLeft>
    A chunk of reasoning content. Multiple deltas may arrive.

    <DocsParamsTable data="-%20name%3A%20content%0A%20%20type%3A%20string%0A%20%20description%3A%20Reasoning%20text%20fragment.%0A-%20name%3A%20type%0A%20%20type%3A%20'%22reasoning.delta%22'%0A%20%20description%3A%20The%20type%20of%20the%20event.%20Always%20%60reasoning.delta%60." />
  </DocsHStackLeft>

  <DocsHStackRight>
    ```json title="Example Event Data"
    {
      "type": "reasoning.delta",
      "content": "Need to"
    }
    ```
  </DocsHStackRight>
</DocsHStack>

`reasoning.end` [#reasoningend]

<DocsHStack>
  <DocsHStackLeft>
    Signals the end of the reasoning stream.

    <DocsParamsTable data="-%20name%3A%20type%0A%20%20type%3A%20'%22reasoning.end%22'%0A%20%20description%3A%20The%20type%20of%20the%20event.%20Always%20%60reasoning.end%60." />
  </DocsHStackLeft>

  <DocsHStackRight>
    ```json title="Example Event Data"
    {
      "type": "reasoning.end"
    }
    ```
  </DocsHStackRight>
</DocsHStack>

`tool_call.start` [#tool_callstart]

<DocsHStack>
  <DocsHStackLeft>
    Emitted when the model starts a tool call.

    <DocsParamsTable data="-%20name%3A%20tool%0A%20%20type%3A%20string%0A%20%20description%3A%20Name%20of%20the%20tool%20being%20called.%0A-%20name%3A%20provider_info%0A%20%20type%3A%20object%0A%20%20description%3A%20Information%20about%20the%20tool%20provider.%20Discriminated%20union%20upon%20possible%20provider%20types.%0A%20%20children%3A%0A%20%20%20%20-%20name%3A%20Plugin%20provider%20info%0A%20%20%20%20%20%20type%3A%20object%0A%20%20%20%20%20%20description%3A%20Present%20when%20the%20tool%20is%20provided%20by%20a%20plugin.%0A%20%20%20%20%20%20children%3A%0A%20%20%20%20%20%20%20%20-%20name%3A%20type%0A%20%20%20%20%20%20%20%20%20%20type%3A%20'%22plugin%22'%0A%20%20%20%20%20%20%20%20%20%20description%3A%20Provider%20type.%0A%20%20%20%20%20%20%20%20-%20name%3A%20plugin_id%0A%20%20%20%20%20%20%20%20%20%20type%3A%20string%0A%20%20%20%20%20%20%20%20%20%20description%3A%20Identifier%20of%20the%20plugin.%0A%20%20%20%20-%20name%3A%20Ephemeral%20MCP%20provider%20info%0A%20%20%20%20%20%20type%3A%20object%0A%20%20%20%20%20%20description%3A%20Present%20when%20the%20tool%20is%20provided%20by%20a%20ephemeral%20MCP%20server.%0A%20%20%20%20%20%20children%3A%0A%20%20%20%20%20%20%20%20-%20name%3A%20type%0A%20%20%20%20%20%20%20%20%20%20type%3A%20'%22ephemeral_mcp%22'%0A%20%20%20%20%20%20%20%20%20%20description%3A%20Provider%20type.%0A%20%20%20%20%20%20%20%20-%20name%3A%20server_label%0A%20%20%20%20%20%20%20%20%20%20type%3A%20string%0A%20%20%20%20%20%20%20%20%20%20description%3A%20Label%20of%20the%20MCP%20server.%0A-%20name%3A%20type%0A%20%20type%3A%20'%22tool_call.start%22'%0A%20%20description%3A%20The%20type%20of%20the%20event.%20Always%20%60tool_call.start%60." />
  </DocsHStackLeft>

  <DocsHStackRight>
    ```json title="Example Event Data"
    {
      "type": "tool_call.start",
      "tool": "model_search",
      "provider_info": {
        "type": "ephemeral_mcp",
        "server_label": "huggingface"
      }
    }
    ```
  </DocsHStackRight>
</DocsHStack>

`tool_call.arguments` [#tool_callarguments]

<DocsHStack>
  <DocsHStackLeft>
    Arguments streamed for the current tool call.

    <DocsParamsTable data="-%20name%3A%20tool%0A%20%20type%3A%20string%0A%20%20description%3A%20Name%20of%20the%20tool%20being%20called.%0A-%20name%3A%20arguments%0A%20%20type%3A%20object%0A%20%20description%3A%20Arguments%20passed%20to%20the%20tool.%20Can%20have%20any%20keys%2Fvalues%20depending%20on%20the%20tool%20definition.%0A-%20name%3A%20provider_info%0A%20%20type%3A%20object%0A%20%20description%3A%20Information%20about%20the%20tool%20provider.%20Discriminated%20union%20upon%20possible%20provider%20types.%0A%20%20children%3A%0A%20%20%20%20-%20name%3A%20Plugin%20provider%20info%0A%20%20%20%20%20%20type%3A%20object%0A%20%20%20%20%20%20description%3A%20Present%20when%20the%20tool%20is%20provided%20by%20a%20plugin.%0A%20%20%20%20%20%20children%3A%0A%20%20%20%20%20%20%20%20-%20name%3A%20type%0A%20%20%20%20%20%20%20%20%20%20type%3A%20'%22plugin%22'%0A%20%20%20%20%20%20%20%20%20%20description%3A%20Provider%20type.%0A%20%20%20%20%20%20%20%20-%20name%3A%20plugin_id%0A%20%20%20%20%20%20%20%20%20%20type%3A%20string%0A%20%20%20%20%20%20%20%20%20%20description%3A%20Identifier%20of%20the%20plugin.%0A%20%20%20%20-%20name%3A%20Ephemeral%20MCP%20provider%20info%0A%20%20%20%20%20%20type%3A%20object%0A%20%20%20%20%20%20description%3A%20Present%20when%20the%20tool%20is%20provided%20by%20a%20ephemeral%20MCP%20server.%0A%20%20%20%20%20%20children%3A%0A%20%20%20%20%20%20%20%20-%20name%3A%20type%0A%20%20%20%20%20%20%20%20%20%20type%3A%20'%22ephemeral_mcp%22'%0A%20%20%20%20%20%20%20%20%20%20description%3A%20Provider%20type.%0A%20%20%20%20%20%20%20%20-%20name%3A%20server_label%0A%20%20%20%20%20%20%20%20%20%20type%3A%20string%0A%20%20%20%20%20%20%20%20%20%20description%3A%20Label%20of%20the%20MCP%20server.%0A-%20name%3A%20type%0A%20%20type%3A%20'%22tool_call.arguments%22'%0A%20%20description%3A%20The%20type%20of%20the%20event.%20Always%20%60tool_call.arguments%60." />
  </DocsHStackLeft>

  <DocsHStackRight>
    ```json title="Example Event Data"
    {
      "type": "tool_call.arguments",
      "tool": "model_search",
      "arguments": {
        "sort": "trendingScore",
        "limit": 1
      },
      "provider_info": {
        "type": "ephemeral_mcp",
        "server_label": "huggingface"
      }
    }
    ```
  </DocsHStackRight>
</DocsHStack>

`tool_call.success` [#tool_callsuccess]

<DocsHStack>
  <DocsHStackLeft>
    Result of the tool call, along with the arguments used.

    <DocsParamsTable data="-%20name%3A%20tool%0A%20%20type%3A%20string%0A%20%20description%3A%20Name%20of%20the%20tool%20that%20was%20called.%0A-%20name%3A%20arguments%0A%20%20type%3A%20object%0A%20%20description%3A%20Arguments%20that%20were%20passed%20to%20the%20tool.%0A-%20name%3A%20output%0A%20%20type%3A%20string%0A%20%20description%3A%20Raw%20tool%20output%20string.%0A-%20name%3A%20provider_info%0A%20%20type%3A%20object%0A%20%20description%3A%20Information%20about%20the%20tool%20provider.%20Discriminated%20union%20upon%20possible%20provider%20types.%0A%20%20children%3A%0A%20%20%20%20-%20name%3A%20Plugin%20provider%20info%0A%20%20%20%20%20%20type%3A%20object%0A%20%20%20%20%20%20description%3A%20Present%20when%20the%20tool%20is%20provided%20by%20a%20plugin.%0A%20%20%20%20%20%20children%3A%0A%20%20%20%20%20%20%20%20-%20name%3A%20type%0A%20%20%20%20%20%20%20%20%20%20type%3A%20'%22plugin%22'%0A%20%20%20%20%20%20%20%20%20%20description%3A%20Provider%20type.%0A%20%20%20%20%20%20%20%20-%20name%3A%20plugin_id%0A%20%20%20%20%20%20%20%20%20%20type%3A%20string%0A%20%20%20%20%20%20%20%20%20%20description%3A%20Identifier%20of%20the%20plugin.%0A%20%20%20%20-%20name%3A%20Ephemeral%20MCP%20provider%20info%0A%20%20%20%20%20%20type%3A%20object%0A%20%20%20%20%20%20description%3A%20Present%20when%20the%20tool%20is%20provided%20by%20a%20ephemeral%20MCP%20server.%0A%20%20%20%20%20%20children%3A%0A%20%20%20%20%20%20%20%20-%20name%3A%20type%0A%20%20%20%20%20%20%20%20%20%20type%3A%20'%22ephemeral_mcp%22'%0A%20%20%20%20%20%20%20%20%20%20description%3A%20Provider%20type.%0A%20%20%20%20%20%20%20%20-%20name%3A%20server_label%0A%20%20%20%20%20%20%20%20%20%20type%3A%20string%0A%20%20%20%20%20%20%20%20%20%20description%3A%20Label%20of%20the%20MCP%20server.%0A-%20name%3A%20type%0A%20%20type%3A%20'%22tool_call.success%22'%0A%20%20description%3A%20The%20type%20of%20the%20event.%20Always%20%60tool_call.success%60." />
  </DocsHStackLeft>

  <DocsHStackRight>
    ```json title="Example Event Data"
    {
      "type": "tool_call.success",
      "tool": "model_search",
      "arguments": {
        "sort": "trendingScore",
        "limit": 1
      },
      "output": "[{\"type\":\"text\",\"text\":\"Showing first 1 models...\"}]",
      "provider_info": {
        "type": "ephemeral_mcp",
        "server_label": "huggingface"
      }
    }
    ```
  </DocsHStackRight>
</DocsHStack>

`tool_call.failure` [#tool_callfailure]

<DocsHStack>
  <DocsHStackLeft>
    Indicates that the tool call failed.

    <DocsParamsTable data="-%20name%3A%20reason%0A%20%20type%3A%20string%0A%20%20description%3A%20Reason%20for%20the%20tool%20call%20failure.%0A-%20name%3A%20metadata%0A%20%20type%3A%20object%0A%20%20description%3A%20Metadata%20about%20the%20invalid%20tool%20call.%0A%20%20children%3A%0A%20%20%20%20-%20name%3A%20type%0A%20%20%20%20%20%20type%3A%20'%22invalid_name%22%20%7C%20%22invalid_arguments%22'%0A%20%20%20%20%20%20description%3A%20Type%20of%20error%20that%20occurred.%0A%20%20%20%20-%20name%3A%20tool_name%0A%20%20%20%20%20%20type%3A%20string%0A%20%20%20%20%20%20description%3A%20Name%20of%20the%20tool%20that%20was%20attempted%20to%20be%20called.%0A%20%20%20%20-%20name%3A%20arguments%0A%20%20%20%20%20%20type%3A%20object%0A%20%20%20%20%20%20optional%3A%20true%0A%20%20%20%20%20%20description%3A%20Arguments%20that%20were%20passed%20to%20the%20tool%20(only%20present%20for%20%60invalid_arguments%60%20errors).%0A%20%20%20%20-%20name%3A%20provider_info%0A%20%20%20%20%20%20type%3A%20object%0A%20%20%20%20%20%20optional%3A%20true%0A%20%20%20%20%20%20description%3A%20Information%20about%20the%20tool%20provider%20(only%20present%20for%20%60invalid_arguments%60%20errors).%0A%20%20%20%20%20%20children%3A%0A%20%20%20%20%20%20%20%20-%20name%3A%20type%0A%20%20%20%20%20%20%20%20%20%20type%3A%20'%22plugin%22%20%7C%20%22ephemeral_mcp%22'%0A%20%20%20%20%20%20%20%20%20%20description%3A%20Provider%20type.%0A%20%20%20%20%20%20%20%20-%20name%3A%20plugin_id%0A%20%20%20%20%20%20%20%20%20%20type%3A%20string%0A%20%20%20%20%20%20%20%20%20%20optional%3A%20true%0A%20%20%20%20%20%20%20%20%20%20description%3A%20Identifier%20of%20the%20plugin%20(when%20%60type%60%20is%20%60%22plugin%22%60).%0A%20%20%20%20%20%20%20%20-%20name%3A%20server_label%0A%20%20%20%20%20%20%20%20%20%20type%3A%20string%0A%20%20%20%20%20%20%20%20%20%20optional%3A%20true%0A%20%20%20%20%20%20%20%20%20%20description%3A%20Label%20of%20the%20MCP%20server%20(when%20%60type%60%20is%20%60%22ephemeral_mcp%22%60).%0A-%20name%3A%20type%0A%20%20type%3A%20'%22tool_call.failure%22'%0A%20%20description%3A%20The%20type%20of%20the%20event.%20Always%20%60tool_call.failure%60." />
  </DocsHStackLeft>

  <DocsHStackRight>
    ```json title="Example Event Data"
    {
      "type": "tool_call.failure",
      "reason": "Cannot find tool with name open_browser.",
      "metadata": {
        "type": "invalid_name",
        "tool_name": "open_browser"
      }
    }
    ```
  </DocsHStackRight>
</DocsHStack>

`message.start` [#messagestart]

<DocsHStack>
  <DocsHStackLeft>
    Signals the model is about to stream a message.

    <DocsParamsTable data="-%20name%3A%20type%0A%20%20type%3A%20'%22message.start%22'%0A%20%20description%3A%20The%20type%20of%20the%20event.%20Always%20%60message.start%60." />
  </DocsHStackLeft>

  <DocsHStackRight>
    ```json title="Example Event Data"
    {
      "type": "message.start"
    }
    ```
  </DocsHStackRight>
</DocsHStack>

`message.delta` [#messagedelta]

<DocsHStack>
  <DocsHStackLeft>
    A chunk of message content. Multiple deltas may arrive.

    <DocsParamsTable data="-%20name%3A%20content%0A%20%20type%3A%20string%0A%20%20description%3A%20Message%20text%20fragment.%0A-%20name%3A%20type%0A%20%20type%3A%20'%22message.delta%22'%0A%20%20description%3A%20The%20type%20of%20the%20event.%20Always%20%60message.delta%60." />
  </DocsHStackLeft>

  <DocsHStackRight>
    ```json title="Example Event Data"
    {
      "type": "message.delta",
      "content": "The current"
    }
    ```
  </DocsHStackRight>
</DocsHStack>

`message.end` [#messageend]

<DocsHStack>
  <DocsHStackLeft>
    Signals the end of the message stream.

    <DocsParamsTable data="-%20name%3A%20type%0A%20%20type%3A%20'%22message.end%22'%0A%20%20description%3A%20The%20type%20of%20the%20event.%20Always%20%60message.end%60." />
  </DocsHStackLeft>

  <DocsHStackRight>
    ```json title="Example Event Data"
    {
      "type": "message.end"
    }
    ```
  </DocsHStackRight>
</DocsHStack>

`error` [#error]

<DocsHStack>
  <DocsHStackLeft>
    An error occurred during streaming. The final payload will still be sent in `chat.end` with whatever was generated.

    <DocsParamsTable data="-%20name%3A%20error%0A%20%20type%3A%20object%0A%20%20description%3A%20Error%20information.%0A%20%20children%3A%0A%20%20%20%20-%20name%3A%20type%0A%20%20%20%20%20%20type%3A%20'%22invalid_request%22%20%7C%20%22unknown%22%20%7C%20%22mcp_connection_error%22%20%7C%20%22plugin_connection_error%22%20%7C%20%22not_implemented%22%20%7C%20%22model_not_found%22%20%7C%20%22job_not_found%22%20%7C%20%22internal_error%22'%0A%20%20%20%20%20%20description%3A%20High-level%20error%20type.%0A%20%20%20%20-%20name%3A%20message%0A%20%20%20%20%20%20type%3A%20string%0A%20%20%20%20%20%20description%3A%20Human-readable%20error%20message.%0A%20%20%20%20-%20name%3A%20code%0A%20%20%20%20%20%20type%3A%20string%0A%20%20%20%20%20%20optional%3A%20true%0A%20%20%20%20%20%20description%3A%20More%20detailed%20error%20code%20(e.g.%2C%20validation%20issue%20code).%0A%20%20%20%20-%20name%3A%20param%0A%20%20%20%20%20%20type%3A%20string%0A%20%20%20%20%20%20optional%3A%20true%0A%20%20%20%20%20%20description%3A%20Parameter%20associated%20with%20the%20error%2C%20if%20applicable.%0A-%20name%3A%20type%0A%20%20type%3A%20'%22error%22'%0A%20%20description%3A%20The%20type%20of%20the%20event.%20Always%20%60error%60." />
  </DocsHStackLeft>

  <DocsHStackRight>
    ```json title="Example Event Data"
    {
      "type": "error",
      "error": {
        "type": "invalid_request",
        "message": "\"model\" is required",
        "code": "missing_required_parameter",
        "param": "model"
      }
    }
    ```
  </DocsHStackRight>
</DocsHStack>

`chat.end` [#chatend]

<DocsHStack>
  <DocsHStackLeft>
    Final event containing the full aggregated response, equivalent to the non-streaming `POST /api/v1/chat` response body.

    <DocsParamsTable data="-%20name%3A%20result%0A%20%20type%3A%20object%0A%20%20description%3A%20Final%20response%20with%20%60model_instance_id%60%2C%20%60output%60%2C%20%60stats%60%2C%20and%20optional%20%60response_id%60.%20See%20%5Bnon-streaming%20chat%20docs%5D(%2Fdocs%2Fdeveloper%2Frest%2Fchat)%20for%20more%20details.%0A-%20name%3A%20type%0A%20%20type%3A%20'%22chat.end%22'%0A%20%20description%3A%20The%20type%20of%20the%20event.%20Always%20%60chat.end%60." />
  </DocsHStackLeft>

  <DocsHStackRight>
    ```json title="Example Event Data"
    {
      "type": "chat.end",
      "result": {
        "model_instance_id": "openai/gpt-oss-20b",
        "output": [
          { "type": "reasoning", "content": "Need to call function." },
          {
            "type": "tool_call",
            "tool": "model_search",
            "arguments": { "sort": "trendingScore", "limit": 1 },
            "output": "[{\"type\":\"text\",\"text\":\"Showing first 1 models...\"}]",
            "provider_info": { "type": "ephemeral_mcp", "server_label": "huggingface" }
          },
          { "type": "message", "content": "The current top‑trending model is..." }
        ],
        "stats": {
          "input_tokens": 329,
          "total_output_tokens": 268,
          "reasoning_output_tokens": 5,
          "tokens_per_second": 43.73,
          "time_to_first_token_seconds": 0.781
        },
        "response_id": "resp_02b2017dbc06c12bfc353a2ed6c2b802f8cc682884bb5716"
      }
    }
    ```
  </DocsHStackRight>
</DocsHStack>
