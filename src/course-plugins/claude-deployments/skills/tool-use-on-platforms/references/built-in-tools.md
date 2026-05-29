# Built-in tools on Bedrock vs Vertex

> Distilled from the *Claude with Amazon Bedrock* and *Claude with Google Cloud Vertex AI* courses.

- **Text editor tool** (both): Claude ships the schema, you implement the five commands (view,
  str_replace, create, insert, undo_edit). The **tool name is version-pinned and exact** — Claude
  3.7 → `str_replace_editor`; Claude 3.5 → `str_replace_based_edit_tool` (the Bedrock note stresses
  the exact string IDs).
- **Web search tool**: appears in the **Vertex** course (`type="web_search_20250305"`,
  `name="web_search"`, `max_uses`, optional `allowed_domains`); no custom implementation needed.
  Not covered in the Bedrock course.
- **Batch tool** (both): a custom "batch_tool" taking an `invocations` list, used to coax Claude
  into parallelizing otherwise-sequential tool calls.
