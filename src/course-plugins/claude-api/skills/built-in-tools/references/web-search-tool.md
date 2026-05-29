# Web search tool

No custom code — Claude runs the search itself. Schema:

```python
{ "type": "web_search_20250305", "name": "web_search",
  "max_uses": 5,                        # caps total searches, default 5
  "allowed_domains": ["nih.gov"] }      # optional: restrict to specific domains
```

Response contains text blocks (Claude's prose), tool-use blocks (the queries it ran), web-search-result blocks (title + URL of found pages), and citation blocks (the exact source text backing each statement). Render text normally, list results as references, and attach citations (domain/title/URL/quoted text). Domain restriction (e.g. nih.gov) enforces source quality.
