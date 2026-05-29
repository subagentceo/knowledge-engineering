# Google Cloud Vertex AI: auth, region, project, and model identifiers

> Distilled from the *Claude with Google Cloud Vertex AI* course.

## Install / client
- `pip install "anthropic[vertex]"` — this is the Anthropic SDK with the Vertex extra.
- `from anthropic import AnthropicVertex`, then instantiate with **`region`** and
  **`project_id`** (the project ID comes from the Google Cloud console). `region="global"` is the
  course's default.
- Auth follows normal Google Cloud application-default credentials — no API key in the call.

## Model IDs
- Use a **model version string** (e.g. `claude-3-5-sonnet-v2@20241022`). Define it once as a
  variable and reuse it.
- No inference-profile concept — region + project on the client handle placement.
