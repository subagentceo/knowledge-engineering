---
title: Path filtering
description: Control which files or URLs AI Search indexes by defining include and exclude path patterns.
image: https://developers.cloudflare.com/dev-products-preview.png
---

> Documentation Index  
> Fetch the complete documentation index at: https://developers.cloudflare.com/ai-search/llms.txt  
> Use this file to discover all available pages before exploring further.

[Skip to content](#%5Ftop) 

# Path filtering

Path filtering allows you to control which files or URLs are indexed by defining include and exclude patterns. Use this to limit indexing to specific content or to skip files you do not want searchable.

Path filtering works with both [website](https://developers.cloudflare.com/ai-search/configuration/data-source/website/) and [R2](https://developers.cloudflare.com/ai-search/configuration/data-source/r2/) data sources.

## Configuration

You can configure path filters when creating or editing an AI Search instance. In the dashboard, open **Path Filters** and add your include or exclude rules. You can also update path filters at any time from the **Settings** page of your instance.

When using the REST API, specify `include_items` and `exclude_items` in the `source_params` of your configuration:

| Parameter      | Type       | Limit               | Description                                              |
| -------------- | ---------- | ------------------- | -------------------------------------------------------- |
| include\_items | string\[\] | Maximum 10 patterns | Only index items matching at least one of these patterns |
| exclude\_items | string\[\] | Maximum 10 patterns | Skip items matching any of these patterns                |

Both parameters are optional. If neither is specified, all items from the data source are indexed.

## Filtering behavior

### Wildcard rules

Exclude rules take precedence over include rules. Filtering is applied in this order:

1. **Exclude check**: If the item matches any exclude pattern, it is skipped.
2. **Include check**: If include patterns are defined and the item does not match any of them, it is skipped.
3. **Index**: The item proceeds to indexing.

| Scenario                    | Behavior                                                                               |
| --------------------------- | -------------------------------------------------------------------------------------- |
| No rules defined            | All items are indexed                                                                  |
| Only exclude\_items defined | All items except those matching exclude patterns are indexed                           |
| Only include\_items defined | Only items matching at least one include pattern are indexed                           |
| Both defined                | Exclude patterns are checked first, then remaining items must match an include pattern |

### Pattern syntax

Patterns use a case-sensitive wildcard syntax based on [micromatch ↗](https://github.com/micromatch/micromatch):

| Wildcard | Meaning                                              |
| -------- | ---------------------------------------------------- |
| \*       | Matches any characters except path separators (/)    |
| \*\*     | Matches any characters including path separators (/) |

Patterns can contain:

* Letters, numbers, and underscores (`a-z`, `A-Z`, `0-9`, `_`)
* Hyphens (`-`) and dots (`.`)
* Path separators (`/`)
* URL characters (`?`, `:`, `=`, `&`, `%`)
* Wildcards (`*`, `**`)

### Indexing job status

Items skipped by filtering rules are recorded in job logs with the reason:

* Exclude match: `Skipped by rule: {pattern}`
* No include match: `Skipped by Include Rules`

You can view these in the Jobs tab of your AI Search instance to verify your filters are working as expected.

### Important notes

* **Case sensitivity:** Pattern matching is case-sensitive. `/Blog/*` does not match `/blog/post.html`.
* **Full path matching:** Patterns match the entire path or URL. Use `**` at the beginning for partial matching. For example, `docs/*` matches `docs/file.pdf` but not `site/docs/file.pdf`, while `**/docs/*` matches both.
* **Single `*` does not cross directories:** Use `**` to match across path separators. For example, `docs/*` matches `docs/file.pdf` but not `docs/sub/file.pdf`, while `docs/**` matches both.
* **Trailing slashes matter:** URLs are matched as-is without normalization. `/blog/` does not match `/blog`.

## Examples

### R2 data source

| Use case                        | Pattern                                         | Indexed                            | Skipped                           |
| ------------------------------- | ----------------------------------------------- | ---------------------------------- | --------------------------------- |
| Index only PDFs in docs         | Include: /docs/\*\*/\*.pdf                      | /docs/guide.pdf, /docs/api/ref.pdf | /docs/guide.md, /images/logo.png  |
| Exclude temp and backup files   | Exclude: \*\*/\*.tmp, \*\*/\*.bak               | /docs/guide.md                     | /data/cache.tmp, /old.bak         |
| Exclude temp and backup folders | Exclude: /temp/\*\*, /backup/\*\*               | /docs/guide.md                     | /temp/file.txt, /backup/data.json |
| Index docs but exclude drafts   | Include: /docs/\*\*, Exclude: /docs/drafts/\*\* | /docs/guide.md                     | /docs/drafts/wip.md               |

### Website data source

| Use case                      | Pattern                                                 | Indexed                                            | Skipped                                        |
| ----------------------------- | ------------------------------------------------------- | -------------------------------------------------- | ---------------------------------------------- |
| Index only blog pages         | Include: \*\*/blog/\*\*                                 | example.com/blog/post, example.com/en/blog/article | example.com/about                              |
| Exclude admin pages           | Exclude: \*\*/admin/\*\*                                | example.com/blog/post                              | example.com/admin/settings                     |
| Exclude login pages           | Exclude: \*\*/login\*                                   | example.com/blog/post                              | example.com/login, example.com/auth/login-form |
| Index docs but exclude drafts | Include: \*\*/docs/\*\*, Exclude: \*\*/docs/drafts/\*\* | example.com/docs/guide                             | example.com/docs/drafts/wip                    |

### API format

When using the API, specify patterns in `source_params`:

```

{

  "source_params": {

    "include_items": ["<PATTERN_1>", "<PATTERN_2>"],

    "exclude_items": ["<PATTERN_1>", "<PATTERN_2>"]

  }

}


```

```json
{"@context":"https://schema.org","@type":"TechArticle","@id":"https://developers.cloudflare.com/ai-search/configuration/indexing/path-filtering/#page","headline":"Path filtering · Cloudflare AI Search docs","description":"Control which files or URLs AI Search indexes by defining include and exclude path patterns.","url":"https://developers.cloudflare.com/ai-search/configuration/indexing/path-filtering/","inLanguage":"en","image":"https://developers.cloudflare.com/dev-products-preview.png","dateModified":"2026-04-20","publisher":{"@type":"Organization","name":"Cloudflare","url":"https://www.cloudflare.com/"},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"}}
{"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"item":{"@id":"/directory/","name":"Directory"}},{"@type":"ListItem","position":2,"item":{"@id":"/ai-search/","name":"AI Search"}},{"@type":"ListItem","position":3,"item":{"@id":"/ai-search/configuration/","name":"Configuration"}},{"@type":"ListItem","position":4,"item":{"@id":"/ai-search/configuration/indexing/","name":"Indexing"}},{"@type":"ListItem","position":5,"item":{"@id":"/ai-search/configuration/indexing/path-filtering/","name":"Path filtering"}}]}
```
