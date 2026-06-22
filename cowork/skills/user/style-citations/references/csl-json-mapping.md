# CSL-JSON v1.0.2 → Citation schema mapping

Canonical spec: https://github.com/citation-style-language/schema
Full type list: https://docs.citationstyles.org/en/stable/specification.html#appendix-iii-types

## Required fields (always present)

| CSL-JSON field | Zod field | Notes |
|---|---|---|
| `id` | `id: z.string().min(1)` | Unique within document. Convention: `<firstAuthorFamily><year><slug>` |
| `type` | `type: CSLTypeSchema` | Full v1.0.2 enum (46 values) |
| `title` | `title: z.string()` | Required — no Citation without a title |

## Author / editor name

| CSL-JSON | Zod | Rule |
|---|---|---|
| `family` | `CSLNameSchema.family` | Required unless `literal` is set |
| `given` | `CSLNameSchema.given` | Optional |
| `literal` | `CSLNameSchema.literal` | For institutional authors: "Anthropic" |
| `dropping-particle` | `CSLNameSchema['dropping-particle']` | e.g. "de" in "de Souza" |
| `non-dropping-particle` | `CSLNameSchema['non-dropping-particle']` | e.g. "van" in "van Gogh" |
| `suffix` | `CSLNameSchema.suffix` | e.g. "Jr." |

Refine: one of `literal` or `family` must be present.

## Date

| CSL-JSON | Zod | Format |
|---|---|---|
| `date-parts` | `CSLDateSchema['date-parts']` | `[[year, month?, day?]]` — 1–2 element array |
| `literal` | `CSLDateSchema.literal` | Free text fallback: "Spring 2025" |
| `raw` | `CSLDateSchema.raw` | Unparsed date string |

Refine: one of `date-parts` or `literal` must be present.

## Identifier fields

| CSL-JSON | Zod | Validation |
|---|---|---|
| `URL` | `z.string().url()` | Must be valid URL |
| `DOI` | `z.string()` | Without `https://doi.org/` prefix |
| `ISBN` | `z.string()` | No format validation (varies by region) |
| `ISSN` | `z.string()` | No format validation |
| `PMID` | `z.string()` | PubMed ID |

## Container fields

`container-title` (journal/book), `collection-title`, `publisher`, `publisher-place`,
`volume`, `issue`, `page`, `edition`, `language`, `abstract`, `note`, `annote`.

All optional strings. `edition` accepts string or number.

## Fields NOT in our subset

We omit: `number-of-pages`, `number-of-volumes`, `dimensions`, `medium`,
`scale`, `source`, `event-title`, `event-place`, `archive`, `archive-place`,
`authority`, `call-number`, `section`, `version`, `genre`, `status`,
`submitted`, `original-*` family. Add as needed — the schema is extensible.
