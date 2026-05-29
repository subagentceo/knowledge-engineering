# The API access flow

Never call the Anthropic API directly from a client app — that would leak the API key. Flow: client sends text to your server → server calls the Anthropic API via SDK (Python, TypeScript/JavaScript, Go, Ruby) or plain HTTP → model generates → API returns generated text + usage counts + `stop_reason` → server relays to client. Required request inputs: API key, model name, `messages` list, and `max_tokens`.

Under the hood generation is tokenize → embed → contextualize → generate next-token-by-probability, stopping when `max_tokens` is hit or an end-of-sequence token is produced.

## Setup

`pip install anthropic python-dotenv`, store the key in a `.env` file as `ANTHROPIC_API_KEY="..."` (git-ignored), load it with python-dotenv, create the client and a `model` variable.

`max_tokens` is a safety cap on length, not a target. A user message is `{"role": "user", "content": "..."}`; assistant messages hold model output.
