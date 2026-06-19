# Anthropic Citations API → Citation schema bridge

API doc: https://docs.anthropic.com/en/docs/build-with-claude/citations

## How Claude returns citations

When citations are enabled, Claude wraps cited spans in content blocks:
```json
{
  "type": "text",
  "text": "The model avoids deceptive framing.",
  "citations": [{
    "type": "char_location",
    "cited_text": "avoids deceptive framing",
    "document_index": 0,
    "document_title": "Alignment eval transcript",
    "start_char_index": 142,
    "end_char_index": 166
  }]
}
```

## Mapping to our Citation.anthropic field

| API field | Our field | Notes |
|---|---|---|
| `document_index` | `anthropic.document_index` | 0-based, matches input doc order |
| `document_title` | `anthropic.document_title` | May be null if doc had no title |
| `start_char_index` | `anthropic.start_char_index` | Character offset in source doc |
| `end_char_index` | `anthropic.end_char_index` | Exclusive end |
| `cited_text` | `anthropic.cited_text` | Verbatim excerpt |

## Rendering in artifacts

In claude.ai artifact mode, citations render as clickable spans:
```html
cited text
```

The style-html skill emits this when `anthropic.document_index` is present
and the output target is a claude.ai artifact.

## Deriving CSL-JSON fields from Anthropic citations

When only Anthropic fields are available:
- `id`: generate from `document_index` + hash of `cited_text`
- `type`: default `"document"` unless context implies otherwise
- `title`: use `document_title` or `"Source document " + document_index`
- `prov.wasDerivedFrom`: `["anthropic:doc:" + document_index]`
- `prov.generatedAtTime`: timestamp of the API call
