> This is a page from the ElevenLabs documentation. For a complete page index, fetch https://elevenlabs.io/docs/llms.txt. For the full documentation in a single file, fetch https://elevenlabs.io/docs/llms-full.txt.

# Searching conversations

## Overview

Conversation history includes a search bar with two modes for finding messages across all your agent conversations.

Keyword search performs full-text matching and supports the same filters as the conversation list (time range, duration, ratings, tools, languages, and more). Smart search uses semantic search to match transcript chunks by meaning — useful when you don't know the exact phrasing a caller used.

![Conversation history search field with the search mode menu
open](https://files.buildwithfern.com/https://elevenlabs.docs.buildwithfern.com/docs/5a8ee4f43638200e84fc77961ee4388ea3a32314c03a7e74ffaba6acf695ee68/assets/images/conversational-ai/smart-search-conversation-history.png)

A query that matches a conversation id pattern (e.g. `conv_…`) searches for that conversation
directly instead of running search.

## Keyword vs Smart search

| Mode         | How it matches                       | Filters                                       |
| ------------ | ------------------------------------ | --------------------------------------------- |
| Keyword      | Full-text / fuzzy on message content | All conversation filters available            |
| Smart search | Semantic similarity via embeddings   | Most filters disabled while a query is active |

The mode is stored in the URL so links are shareable and reload-safe. Default is keyword.

## API reference

* [Text search](/docs/api-reference/conversations/messages/text-search) — keyword / full-text
* [Smart search](/docs/api-reference/conversations/messages/search) — semantic search