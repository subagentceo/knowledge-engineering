---
name: enterprise-search:source-management
description: >-
  Manage the 25 vendor doc mirrors in vendor/: check staleness, trigger recrawl,
  add new sources. Use when: "update vendor docs", "add <vendor> to vendor/",
  "when was <vendor> last crawled", "recrawl vendors".
coworker_affinity: [engineering-coworker, data-coworker]
plugin: enterprise-search
---

<!--
  @cite vendor/                              (25 vendor doc mirrors)
  @cite CLAUDE.md                            (npm run crawl:vendors)
  @cite seeds/posture/session-start.xml      (vendor doc tooling)
-->

<source_management_protocol>
STEP 1 — READ: find vendor/ -name "*.md" | head -5 per vendor to check last-modified
STEP 2 — ASSESS: flag vendors not updated in >7 days
STEP 3 — If recrawl requested: run npm run crawl:vendor -- <name>
           (full recrawl: npm run crawl:vendors)
STEP 4 — If new vendor requested:
           a. Add vendor entry to CLAUDE.md vendor list
           b. Create vendor/<name>/ directory
           c. Run npm run crawl:vendor -- <name>
STEP 5 — Write result: { vendors_checked, stale, recrawled, added }
</source_management_protocol>

<staleness_threshold>
>7 days → flag as stale
>30 days → flag as critical, recommend recrawl before any synthesis
</staleness_threshold>
