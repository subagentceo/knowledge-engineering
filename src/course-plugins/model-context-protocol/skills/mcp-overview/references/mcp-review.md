# MCP Review — The Three Server Primitives

Pick by **who controls invocation**:

| Primitive | Controlled by | Use it to | Example |
|---|---|---|---|
| **Tools** | the model — Claude decides when to call | add capabilities to Claude | code/JS execution for a calculation |
| **Resources** | the app — your code decides when to fetch | pull data into the app for UI or prompt augmentation | Google Drive doc listing, autocomplete options |
| **Prompts** | the user — triggered by a click or slash command | predefined workflows | Claude's chat-starter buttons, `/format` |

Decision rule: need Claude capabilities → **tools**; need app data → **resources**; need a user-triggered workflow → **prompts**.
