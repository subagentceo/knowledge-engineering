# Citations

Add `"citations": {"enabled": true}` and a `"title"` field to a source document/text. Works with PDFs and plain text. Responses become text blocks, some carrying a `citations` array: `citation_page_location` (PDF — index/title/start+end page/cited text) or `citation_char_location` (plain text — character position). Enables hover popups showing exact source so users can verify Claude's claims.
