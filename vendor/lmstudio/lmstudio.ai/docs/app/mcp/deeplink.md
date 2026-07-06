

You can install MCP servers in LM Studio with one click using a deeplink.

Starting with version 0.3.17 (10), LM Studio can act as an MCP host. Learn more about it [here](../mcp).

***

Generate your own MCP install link [#generate-your-own-mcp-install-link]

Enter your MCP JSON entry to generate a deeplink for the `Add to LM Studio` button.

<DocsMcpDeepLinkGenerator />

Try an example [#try-an-example]

Try to copy and paste the following into the link generator above.

```json
{
  "hf-mcp-server": {
    "url": "https://huggingface.co/mcp",
    "headers": {
      "Authorization": "Bearer <YOUR_HF_TOKEN>"
    }
  }
}
```

Deeplink format [#deeplink-format]

```bash
lmstudio://add_mcp?name=hf-mcp-server&config=eyJ1cmwiOiJodHRwczovL2h1Z2dpbmdmYWNlLmNvL21jcCIsImhlYWRlcnMiOnsiQXV0aG9yaXphdGlvbiI6IkJlYXJlciA8WU9VUl9IRl9UT0tFTj4ifX0%3D
```

Parameters [#parameters]

<DocsParamsTable data="-%20name%3A%20%22lmstudio%3A%2F%2F%22%0A%20%20type%3A%20%22protocol%22%0A%20%20description%3A%20%22The%20protocol%20scheme%20to%20open%20LM%20Studio%22%0A-%20name%3A%20%22add_mcp%22%0A%20%20type%3A%20%22path%22%0A%20%20description%3A%20%22The%20action%20to%20install%20an%20MCP%20server%22%0A-%20name%3A%20%22name%22%0A%20%20type%3A%20%22query%20parameter%22%0A%20%20description%3A%20%22The%20name%20of%20the%20MCP%20server%20to%20install%22%0A-%20name%3A%20%22config%22%0A%20%20type%3A%20%22query%20parameter%22%0A%20%20description%3A%20%22Base64%20encoded%20JSON%20configuration%20for%20the%20MCP%20server%22" />
