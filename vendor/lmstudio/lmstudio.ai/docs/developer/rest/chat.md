

<DocsHStack>
  <DocsHStackLeft>
    `POST /api/v1/chat`

    **Request body**

    <DocsParamsTable data="-%20name%3A%20model%0A%20%20type%3A%20string%0A%20%20optional%3A%20false%0A%20%20description%3A%20Unique%20identifier%20for%20the%20model%20to%20use.%0A-%20name%3A%20input%0A%20%20type%3A%20string%20%7C%20array%3Cobject%3E%0A%20%20optional%3A%20false%0A%20%20description%3A%20Message%20to%20send%20to%20the%20model.%0A%20%20children%3A%0A%20%20%20%20-%20name%3A%20Input%20text%0A%20%20%20%20%20%20unstyledName%3A%20true%0A%20%20%20%20%20%20type%3A%20string%0A%20%20%20%20%20%20description%3A%20Text%20content%20of%20the%20message.%0A%20%20%20%20-%20name%3A%20Input%20object%0A%20%20%20%20%20%20unstyledName%3A%20true%0A%20%20%20%20%20%20type%3A%20object%0A%20%20%20%20%20%20description%3A%20Object%20representing%20a%20message%20with%20additional%20metadata.%0A%20%20%20%20%20%20children%3A%0A%20%20%20%20%20%20%20%20-%20name%3A%20Text%20Input%0A%20%20%20%20%20%20%20%20%20%20type%3A%20object%0A%20%20%20%20%20%20%20%20%20%20optional%3A%20true%0A%20%20%20%20%20%20%20%20%20%20description%3A%20Text%20input%20to%20provide%20user%20messages%0A%20%20%20%20%20%20%20%20%20%20children%3A%0A%20%20%20%20%20%20%20%20%20%20%20%20-%20name%3A%20type%0A%20%20%20%20%20%20%20%20%20%20%20%20%20%20type%3A%20'%22message%22'%0A%20%20%20%20%20%20%20%20%20%20%20%20%20%20optional%3A%20false%0A%20%20%20%20%20%20%20%20%20%20%20%20%20%20description%3A%20Type%20of%20input%20item.%0A%20%20%20%20%20%20%20%20%20%20%20%20-%20name%3A%20content%0A%20%20%20%20%20%20%20%20%20%20%20%20%20%20type%3A%20string%0A%20%20%20%20%20%20%20%20%20%20%20%20%20%20description%3A%20Text%20content%20of%20the%20message.%0A%20%20%20%20%20%20%20%20%20%20%20%20%20%20optional%3A%20false%0A%20%20%20%20%20%20%20%20-%20name%3A%20Image%20Input%0A%20%20%20%20%20%20%20%20%20%20type%3A%20object%0A%20%20%20%20%20%20%20%20%20%20optional%3A%20true%0A%20%20%20%20%20%20%20%20%20%20description%3A%20Image%20input%20to%20provide%20user%20messages%0A%20%20%20%20%20%20%20%20%20%20children%3A%0A%20%20%20%20%20%20%20%20%20%20%20%20-%20name%3A%20type%0A%20%20%20%20%20%20%20%20%20%20%20%20%20%20type%3A%20'%22image%22'%0A%20%20%20%20%20%20%20%20%20%20%20%20%20%20optional%3A%20false%0A%20%20%20%20%20%20%20%20%20%20%20%20%20%20description%3A%20Type%20of%20input%20item.%0A%20%20%20%20%20%20%20%20%20%20%20%20-%20name%3A%20data_url%0A%20%20%20%20%20%20%20%20%20%20%20%20%20%20type%3A%20string%0A%20%20%20%20%20%20%20%20%20%20%20%20%20%20description%3A%20Image%20data%20as%20a%20base64-encoded%20data%20URL.%0A%20%20%20%20%20%20%20%20%20%20%20%20%20%20optional%3A%20false%0A-%20name%3A%20system_prompt%0A%20%20type%3A%20string%0A%20%20optional%3A%20true%0A%20%20description%3A%20System%20message%20that%20sets%20model%20behavior%20or%20instructions.%0A-%20name%3A%20integrations%0A%20%20type%3A%20array%3Cstring%20%7C%20object%3E%0A%20%20optional%3A%20true%0A%20%20description%3A%20List%20of%20integrations%20(plugins%2C%20ephemeral%20MCP%20servers%2C%20etc...)%20to%20enable%20for%20this%20request.%0A%20%20children%3A%0A%20%20%20%20-%20name%3A%20Plugin%20id%0A%20%20%20%20%20%20unstyledName%3A%20true%0A%20%20%20%20%20%20type%3A%20string%0A%20%20%20%20%20%20description%3A%20Unique%20identifier%20of%20a%20plugin%20to%20use.%20Plugins%20contain%20%60mcp.json%60%20installed%20MCP%20servers%20(id%20%60mcp%2F%3Cserver_label%3E%60).%20Shorthand%20for%20plugin%20object%20with%20no%20custom%20configuration.%0A%20%20%20%20-%20name%3A%20Plugin%0A%20%20%20%20%20%20unstyledName%3A%20true%0A%20%20%20%20%20%20type%3A%20object%0A%20%20%20%20%20%20description%3A%20Specification%20of%20a%20plugin%20to%20use.%20Plugins%20contain%20%60mcp.json%60%20installed%20MCP%20servers%20(id%20%60mcp%2F%3Cserver_label%3E%60).%0A%20%20%20%20%20%20children%3A%0A%20%20%20%20%20%20%20%20-%20name%3A%20type%0A%20%20%20%20%20%20%20%20%20%20type%3A%20'%22plugin%22'%0A%20%20%20%20%20%20%20%20%20%20optional%3A%20false%0A%20%20%20%20%20%20%20%20%20%20description%3A%20Type%20of%20integration.%0A%20%20%20%20%20%20%20%20-%20name%3A%20id%0A%20%20%20%20%20%20%20%20%20%20type%3A%20string%0A%20%20%20%20%20%20%20%20%20%20optional%3A%20false%0A%20%20%20%20%20%20%20%20%20%20description%3A%20Unique%20identifier%20of%20the%20plugin.%0A%20%20%20%20%20%20%20%20-%20name%3A%20allowed_tools%0A%20%20%20%20%20%20%20%20%20%20type%3A%20array%3Cstring%3E%0A%20%20%20%20%20%20%20%20%20%20optional%3A%20true%0A%20%20%20%20%20%20%20%20%20%20description%3A%20List%20of%20tool%20names%20the%20model%20can%20call%20from%20this%20plugin.%20If%20not%20provided%2C%20all%20tools%20from%20the%20plugin%20are%20allowed.%0A%20%20%20%20-%20name%3A%20Ephemeral%20MCP%20server%20specification%0A%20%20%20%20%20%20unstyledName%3A%20true%0A%20%20%20%20%20%20type%3A%20object%0A%20%20%20%20%20%20description%3A%20Specification%20of%20an%20ephemeral%20MCP%20server.%20Allows%20defining%20MCP%20servers%20on-the-fly%20without%20needing%20to%20pre-configure%20them%20in%20your%20%60mcp.json%60.%0A%20%20%20%20%20%20children%3A%0A%20%20%20%20%20%20%20%20-%20name%3A%20type%0A%20%20%20%20%20%20%20%20%20%20type%3A%20'%22ephemeral_mcp%22'%0A%20%20%20%20%20%20%20%20%20%20optional%3A%20false%0A%20%20%20%20%20%20%20%20%20%20description%3A%20Type%20of%20integration.%0A%20%20%20%20%20%20%20%20-%20name%3A%20server_label%0A%20%20%20%20%20%20%20%20%20%20type%3A%20string%0A%20%20%20%20%20%20%20%20%20%20optional%3A%20false%0A%20%20%20%20%20%20%20%20%20%20description%3A%20Label%20to%20identify%20the%20MCP%20server.%0A%20%20%20%20%20%20%20%20-%20name%3A%20server_url%0A%20%20%20%20%20%20%20%20%20%20type%3A%20string%0A%20%20%20%20%20%20%20%20%20%20optional%3A%20false%0A%20%20%20%20%20%20%20%20%20%20description%3A%20URL%20of%20the%20MCP%20server.%0A%20%20%20%20%20%20%20%20-%20name%3A%20allowed_tools%0A%20%20%20%20%20%20%20%20%20%20type%3A%20array%3Cstring%3E%0A%20%20%20%20%20%20%20%20%20%20optional%3A%20true%0A%20%20%20%20%20%20%20%20%20%20description%3A%20List%20of%20tool%20names%20the%20model%20can%20call%20from%20this%20server.%20If%20not%20provided%2C%20all%20tools%20from%20the%20server%20are%20allowed.%0A%20%20%20%20%20%20%20%20-%20name%3A%20headers%0A%20%20%20%20%20%20%20%20%20%20type%3A%20object%0A%20%20%20%20%20%20%20%20%20%20optional%3A%20true%0A%20%20%20%20%20%20%20%20%20%20description%3A%20Custom%20HTTP%20headers%20to%20send%20with%20requests%20to%20the%20server.%0A-%20name%3A%20stream%0A%20%20type%3A%20boolean%0A%20%20optional%3A%20true%0A%20%20description%3A%20Whether%20to%20stream%20partial%20outputs%20via%20SSE.%20Default%20%60false%60.%20See%20%5Bstreaming%20events%5D(%2Fdocs%2Fdeveloper%2Frest%2Fstreaming-events)%20for%20more%20information.%0A-%20name%3A%20temperature%0A%20%20type%3A%20number%0A%20%20optional%3A%20true%0A%20%20description%3A%20Randomness%20in%20token%20selection.%200%20is%20deterministic%2C%20higher%20values%20increase%20creativity%20%5B0%2C1%5D.%0A-%20name%3A%20top_p%0A%20%20type%3A%20number%0A%20%20optional%3A%20true%0A%20%20description%3A%20Minimum%20cumulative%20probability%20for%20the%20possible%20next%20tokens%20%5B0%2C1%5D.%0A-%20name%3A%20top_k%0A%20%20type%3A%20integer%0A%20%20optional%3A%20true%0A%20%20description%3A%20Limits%20next%20token%20selection%20to%20top-k%20most%20probable%20tokens.%0A-%20name%3A%20min_p%0A%20%20type%3A%20number%0A%20%20optional%3A%20true%0A%20%20description%3A%20Minimum%20base%20probability%20for%20a%20token%20to%20be%20selected%20for%20output%20%5B0%2C1%5D.%0A-%20name%3A%20repeat_penalty%0A%20%20type%3A%20number%0A%20%20optional%3A%20true%0A%20%20description%3A%20Penalty%20for%20repeating%20token%20sequences.%201%20is%20no%20penalty%2C%20higher%20values%20discourage%20repetition.%0A-%20name%3A%20max_output_tokens%0A%20%20type%3A%20integer%0A%20%20optional%3A%20true%0A%20%20description%3A%20Maximum%20number%20of%20tokens%20to%20generate.%0A-%20name%3A%20reasoning%0A%20%20type%3A%20'%22off%22%20%7C%20%22low%22%20%7C%20%22medium%22%20%7C%20%22high%22%20%7C%20%22on%22'%0A%20%20optional%3A%20true%0A%20%20description%3A%20Reasoning%20setting.%20Will%20error%20if%20the%20model%20being%20used%20does%20not%20support%20the%20reasoning%20setting%20using.%20Defaults%20to%20the%20automatically%20chosen%20setting%20for%20the%20model.%0A-%20name%3A%20context_length%0A%20%20type%3A%20integer%0A%20%20optional%3A%20true%0A%20%20description%3A%20Number%20of%20tokens%20to%20consider%20as%20context.%20Higher%20values%20recommended%20for%20MCP%20usage.%0A-%20name%3A%20store%0A%20%20type%3A%20boolean%0A%20%20optional%3A%20true%0A%20%20description%3A%20Whether%20to%20store%20the%20chat.%20If%20set%2C%20response%20will%20return%20a%20%60%22response_id%22%60%20field.%20Default%20%60true%60.%0A-%20name%3A%20previous_response_id%0A%20%20type%3A%20string%0A%20%20optional%3A%20true%0A%20%20description%3A%20Identifier%20of%20existing%20response%20to%20append%20to.%20Must%20start%20with%20%60%22resp_%22%60." />
  </DocsHStackLeft>

  <DocsHStackRight>
    <CodeBlockTabs defaultValue="Request with MCP">
      <CodeBlockTabsList>
        <CodeBlockTabsTrigger value="Request with MCP">
          Request with MCP
        </CodeBlockTabsTrigger>

        <CodeBlockTabsTrigger value="Request with Images">
          Request with Images
        </CodeBlockTabsTrigger>
      </CodeBlockTabsList>

      <CodeBlockTab value="Request with MCP">
        ```bash
        curl http://localhost:1234/api/v1/chat \
          -H "Authorization: Bearer $LM_API_TOKEN" \
          -H "Content-Type: application/json" \
          -d '{
            "model": "ibm/granite-4-micro",
            "input": "Tell me the top trending model on hugging face and navigate to https://lmstudio.ai",
            "integrations": [
              {
                "type": "ephemeral_mcp",
                "server_label": "huggingface",
                "server_url": "https://huggingface.co/mcp",
                "allowed_tools": [
                  "model_search"
                ]
              },
              {
                "type": "plugin",
                "id": "mcp/playwright",
                "allowed_tools": [
                  "browser_navigate"
                ]
              }
            ],
            "context_length": 8000,
            "temperature": 0
          }'
        ```
      </CodeBlockTab>

      <CodeBlockTab value="Request with Images">
        ```bash
        # Image is a small red square encoded as a base64 data URL
        curl http://localhost:1234/api/v1/chat \
          -H "Authorization: Bearer $LM_API_TOKEN" \
          -H "Content-Type: application/json" \
          -d '{
            "model": "qwen/qwen3-vl-4b",
            "input": [
              {
                "type": "text",
                "content": "Describe this image in two sentences"
              },
              {
                "type": "image",
                "data_url": "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAoAAAAKCAYAAACNMs+9AAAAFUlEQVR42mP8z8BQz0AEYBxVSF+FABJADveWkH6oAAAAAElFTkSuQmCC"
              }
            ],
            "context_length": 2048,
            "temperature": 0
          }'
        ```
      </CodeBlockTab>
    </CodeBlockTabs>
  </DocsHStackRight>
</DocsHStack>

***

<DocsHStack>
  <DocsHStackLeft>
    **Response fields**

    <DocsParamsTable data="-%20name%3A%20model_instance_id%0A%20%20type%3A%20string%0A%20%20description%3A%20Unique%20identifier%20for%20the%20loaded%20model%20instance%20that%20generated%20the%20response.%0A-%20name%3A%20output%0A%20%20type%3A%20array%3Cobject%3E%0A%20%20description%3A%20Array%20of%20output%20items%20generated.%20Each%20item%20can%20be%20one%20of%20three%20types.%0A%20%20children%3A%0A%20%20%20%20-%20name%3A%20Message%0A%20%20%20%20%20%20unstyledName%3A%20true%0A%20%20%20%20%20%20type%3A%20object%0A%20%20%20%20%20%20description%3A%20A%20text%20message%20from%20the%20model.%0A%20%20%20%20%20%20children%3A%0A%20%20%20%20%20%20%20%20-%20name%3A%20type%0A%20%20%20%20%20%20%20%20%20%20type%3A%20'%22message%22'%0A%20%20%20%20%20%20%20%20%20%20description%3A%20Type%20of%20output%20item.%0A%20%20%20%20%20%20%20%20-%20name%3A%20content%0A%20%20%20%20%20%20%20%20%20%20type%3A%20string%0A%20%20%20%20%20%20%20%20%20%20description%3A%20Text%20content%20of%20the%20message.%0A%20%20%20%20-%20name%3A%20Tool%20call%0A%20%20%20%20%20%20unstyledName%3A%20true%0A%20%20%20%20%20%20type%3A%20object%0A%20%20%20%20%20%20description%3A%20A%20tool%20call%20made%20by%20the%20model.%0A%20%20%20%20%20%20children%3A%0A%20%20%20%20%20%20%20%20-%20name%3A%20type%0A%20%20%20%20%20%20%20%20%20%20type%3A%20'%22tool_call%22'%0A%20%20%20%20%20%20%20%20%20%20description%3A%20Type%20of%20output%20item.%0A%20%20%20%20%20%20%20%20-%20name%3A%20tool%0A%20%20%20%20%20%20%20%20%20%20type%3A%20string%0A%20%20%20%20%20%20%20%20%20%20description%3A%20Name%20of%20the%20tool%20called.%0A%20%20%20%20%20%20%20%20-%20name%3A%20arguments%0A%20%20%20%20%20%20%20%20%20%20type%3A%20object%0A%20%20%20%20%20%20%20%20%20%20description%3A%20Arguments%20passed%20to%20the%20tool.%20Can%20have%20any%20keys%2Fvalues%20depending%20on%20the%20tool%20definition.%0A%20%20%20%20%20%20%20%20-%20name%3A%20output%0A%20%20%20%20%20%20%20%20%20%20type%3A%20string%0A%20%20%20%20%20%20%20%20%20%20description%3A%20Result%20returned%20from%20the%20tool.%0A%20%20%20%20%20%20%20%20-%20name%3A%20provider_info%0A%20%20%20%20%20%20%20%20%20%20type%3A%20object%0A%20%20%20%20%20%20%20%20%20%20description%3A%20Information%20about%20the%20tool%20provider.%0A%20%20%20%20%20%20%20%20%20%20children%3A%0A%20%20%20%20%20%20%20%20%20%20%20%20-%20name%3A%20type%0A%20%20%20%20%20%20%20%20%20%20%20%20%20%20type%3A%20'%22plugin%22%20%7C%20%22ephemeral_mcp%22'%0A%20%20%20%20%20%20%20%20%20%20%20%20%20%20description%3A%20Provider%20type.%0A%20%20%20%20%20%20%20%20%20%20%20%20-%20name%3A%20plugin_id%0A%20%20%20%20%20%20%20%20%20%20%20%20%20%20type%3A%20string%0A%20%20%20%20%20%20%20%20%20%20%20%20%20%20optional%3A%20true%0A%20%20%20%20%20%20%20%20%20%20%20%20%20%20description%3A%20Identifier%20of%20the%20plugin%20(when%20%60type%60%20is%20%60%22plugin%22%60).%0A%20%20%20%20%20%20%20%20%20%20%20%20-%20name%3A%20server_label%0A%20%20%20%20%20%20%20%20%20%20%20%20%20%20type%3A%20string%0A%20%20%20%20%20%20%20%20%20%20%20%20%20%20optional%3A%20true%0A%20%20%20%20%20%20%20%20%20%20%20%20%20%20description%3A%20Label%20of%20the%20MCP%20server%20(when%20%60type%60%20is%20%60%22ephemeral_mcp%22%60).%0A%20%20%20%20-%20name%3A%20Reasoning%0A%20%20%20%20%20%20unstyledName%3A%20true%0A%20%20%20%20%20%20type%3A%20object%0A%20%20%20%20%20%20description%3A%20Reasoning%20content%20from%20the%20model.%0A%20%20%20%20%20%20children%3A%0A%20%20%20%20%20%20%20%20-%20name%3A%20type%0A%20%20%20%20%20%20%20%20%20%20type%3A%20'%22reasoning%22'%0A%20%20%20%20%20%20%20%20%20%20description%3A%20Type%20of%20output%20item.%0A%20%20%20%20%20%20%20%20-%20name%3A%20content%0A%20%20%20%20%20%20%20%20%20%20type%3A%20string%0A%20%20%20%20%20%20%20%20%20%20description%3A%20Text%20content%20of%20the%20reasoning.%0A%20%20%20%20-%20name%3A%20Invalid%20tool%20call%0A%20%20%20%20%20%20unstyledName%3A%20true%0A%20%20%20%20%20%20type%3A%20object%0A%20%20%20%20%20%20description%3A%20An%20invalid%20tool%20call%20made%20by%20the%20model%20-%20due%20to%20invalid%20tool%20name%20or%20tool%20arguments.%0A%20%20%20%20%20%20children%3A%0A%20%20%20%20%20%20%20%20-%20name%3A%20type%0A%20%20%20%20%20%20%20%20%20%20type%3A%20'%22invalid_tool_call%22'%0A%20%20%20%20%20%20%20%20%20%20description%3A%20Type%20of%20output%20item.%0A%20%20%20%20%20%20%20%20-%20name%3A%20reason%0A%20%20%20%20%20%20%20%20%20%20type%3A%20string%0A%20%20%20%20%20%20%20%20%20%20description%3A%20Reason%20why%20the%20tool%20call%20was%20invalid.%0A%20%20%20%20%20%20%20%20-%20name%3A%20metadata%0A%20%20%20%20%20%20%20%20%20%20type%3A%20object%0A%20%20%20%20%20%20%20%20%20%20description%3A%20Metadata%20about%20the%20invalid%20tool%20call.%0A%20%20%20%20%20%20%20%20%20%20children%3A%0A%20%20%20%20%20%20%20%20%20%20%20%20-%20name%3A%20type%0A%20%20%20%20%20%20%20%20%20%20%20%20%20%20type%3A%20'%22invalid_name%22%20%7C%20%22invalid_arguments%22'%0A%20%20%20%20%20%20%20%20%20%20%20%20%20%20description%3A%20Type%20of%20error%20that%20occurred.%0A%20%20%20%20%20%20%20%20%20%20%20%20-%20name%3A%20tool_name%0A%20%20%20%20%20%20%20%20%20%20%20%20%20%20type%3A%20string%0A%20%20%20%20%20%20%20%20%20%20%20%20%20%20description%3A%20Name%20of%20the%20tool%20that%20was%20attempted%20to%20be%20called.%0A%20%20%20%20%20%20%20%20%20%20%20%20-%20name%3A%20arguments%0A%20%20%20%20%20%20%20%20%20%20%20%20%20%20type%3A%20object%0A%20%20%20%20%20%20%20%20%20%20%20%20%20%20optional%3A%20true%0A%20%20%20%20%20%20%20%20%20%20%20%20%20%20description%3A%20Arguments%20that%20were%20passed%20to%20the%20tool%20(only%20present%20for%20%60invalid_arguments%60%20errors).%0A%20%20%20%20%20%20%20%20%20%20%20%20-%20name%3A%20provider_info%0A%20%20%20%20%20%20%20%20%20%20%20%20%20%20type%3A%20object%0A%20%20%20%20%20%20%20%20%20%20%20%20%20%20optional%3A%20true%0A%20%20%20%20%20%20%20%20%20%20%20%20%20%20description%3A%20Information%20about%20the%20tool%20provider%20(only%20present%20for%20%60invalid_arguments%60%20errors).%0A%20%20%20%20%20%20%20%20%20%20%20%20%20%20children%3A%0A%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20-%20name%3A%20type%0A%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20type%3A%20'%22plugin%22%20%7C%20%22ephemeral_mcp%22'%0A%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20description%3A%20Provider%20type.%0A%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20-%20name%3A%20plugin_id%0A%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20type%3A%20string%0A%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20optional%3A%20true%0A%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20description%3A%20Identifier%20of%20the%20plugin%20(when%20%60type%60%20is%20%60%22plugin%22%60).%0A%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20-%20name%3A%20server_label%0A%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20type%3A%20string%0A%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20optional%3A%20true%0A%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20description%3A%20Label%20of%20the%20MCP%20server%20(when%20%60type%60%20is%20%60%22ephemeral_mcp%22%60).%0A-%20name%3A%20stats%0A%20%20type%3A%20object%0A%20%20description%3A%20Token%20usage%20and%20performance%20metrics.%0A%20%20children%3A%0A%20%20%20%20-%20name%3A%20input_tokens%0A%20%20%20%20%20%20type%3A%20number%0A%20%20%20%20%20%20description%3A%20Number%20of%20input%20tokens.%20Includes%20formatting%2C%20tool%20definitions%2C%20and%20prior%20messages%20in%20the%20chat.%0A%20%20%20%20-%20name%3A%20total_output_tokens%0A%20%20%20%20%20%20type%3A%20number%0A%20%20%20%20%20%20description%3A%20Total%20number%20of%20output%20tokens%20generated.%0A%20%20%20%20-%20name%3A%20reasoning_output_tokens%0A%20%20%20%20%20%20type%3A%20number%0A%20%20%20%20%20%20description%3A%20Number%20of%20tokens%20used%20for%20reasoning.%0A%20%20%20%20-%20name%3A%20tokens_per_second%0A%20%20%20%20%20%20type%3A%20number%0A%20%20%20%20%20%20description%3A%20Generation%20speed%20in%20tokens%20per%20second.%0A%20%20%20%20-%20name%3A%20time_to_first_token_seconds%0A%20%20%20%20%20%20type%3A%20number%0A%20%20%20%20%20%20description%3A%20Time%20in%20seconds%20to%20generate%20the%20first%20token.%0A%20%20%20%20-%20name%3A%20model_load_time_seconds%0A%20%20%20%20%20%20type%3A%20number%0A%20%20%20%20%20%20optional%3A%20true%0A%20%20%20%20%20%20description%3A%20Time%20taken%20to%20load%20the%20model%20for%20this%20request%20in%20seconds.%20Present%20only%20if%20the%20model%20was%20not%20already%20loaded.%0A-%20name%3A%20response_id%0A%20%20type%3A%20string%0A%20%20optional%3A%20true%0A%20%20description%3A%20Identifier%20of%20the%20response%20for%20subsequent%20requests.%20Starts%20with%20%60%22resp_%22%60.%20Present%20when%20%60store%60%20is%20%60true%60." />
  </DocsHStackLeft>

  <DocsHStackRight>
    <CodeBlockTabs defaultValue="Request with MCP">
      <CodeBlockTabsList>
        <CodeBlockTabsTrigger value="Request with MCP">
          Request with MCP
        </CodeBlockTabsTrigger>

        <CodeBlockTabsTrigger value="Request with Images">
          Request with Images
        </CodeBlockTabsTrigger>
      </CodeBlockTabsList>

      <CodeBlockTab value="Request with MCP">
        ```json
        {
          "model_instance_id": "ibm/granite-4-micro",
          "output": [
            {
              "type": "tool_call",
              "tool": "model_search",
              "arguments": {
                "sort": "trendingScore",
                "query": "",
                "limit": 1
              },
              "output": "...",
              "provider_info": {
                "server_label": "huggingface",
                "type": "ephemeral_mcp"
              }
            },
            {
              "type": "message",
              "content": "..."
            },
            {
              "type": "tool_call",
              "tool": "browser_navigate",
              "arguments": {
                "url": "https://lmstudio.ai"
              },
              "output": "...",
              "provider_info": {
                "plugin_id": "mcp/playwright",
                "type": "plugin"
              }
            },
            {
              "type": "message",
              "content": "**Top Trending Model on Hugging Face** ... Below is a quick snapshot of what’s on the landing page ... more details on the model or LM Studio itself!"
            }
          ],
          "stats": {
            "input_tokens": 646,
            "total_output_tokens": 586,
            "reasoning_output_tokens": 0,
            "tokens_per_second": 29.753900615398926,
            "time_to_first_token_seconds": 1.088,
            "model_load_time_seconds": 2.656
          },
          "response_id": "resp_4ef013eba0def1ed23f19dde72b67974c579113f544086de"
        }
        ```
      </CodeBlockTab>

      <CodeBlockTab value="Request with Images">
        ```json
        {
          "model_instance_id": "qwen/qwen3-vl-4b",
          "output": [
            {
              "type": "message",
              "content": "This image is a solid, vibrant red square that fills the entire frame, with no discernible texture, pattern, or other elements. It presents a minimalist, uniform visual field of pure red, evoking a sense of boldness or urgency."
            }
          ],
          "stats": {
            "input_tokens": 17,
            "total_output_tokens": 50,
            "reasoning_output_tokens": 0,
            "tokens_per_second": 51.03762685242662,
            "time_to_first_token_seconds": 0.814
          },
          "response_id": "resp_0182bd7c479d7451f9a35471f9c26b34de87a7255856b9a4"
        }
        ```
      </CodeBlockTab>
    </CodeBlockTabs>
  </DocsHStackRight>
</DocsHStack>
