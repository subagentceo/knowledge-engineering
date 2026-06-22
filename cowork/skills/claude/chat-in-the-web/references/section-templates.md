# Section templates

Exact markdown to copy when producing each of the seven sections. Substitute `{placeholders}` with verified output. Do not reorder columns. Do not add columns. Do not collapse two sections.

The continuation marker at the bottom of each template is the literal final line of the reply.

---

## §1 surface_overview (not volatile)

No shell verification — read from this skill's metadata and the runtime "current date" line.

```markdown
## surface_overview

This is a {product} chat session running {model}. Code execution is {status}.

```verified
(no shell command — facts are read from this skill's metadata)
```

| Field | Value |
| --- | --- |
| product | claude.ai web/mobile chat |
| model | {read from the runtime "This iteration of Claude is …" line in the system prompt; never hardcode} |
| code_execution | enabled — bash, view, str_replace, create_file, present_files |
| knowledge_cutoff | {read from the runtime "knowledge cutoff" line in the system prompt} |
| current_date | {read from the runtime "current date" line in the system prompt} |
| working_directory | /home/claude |
| output_directory | /mnt/user-data/outputs |

Next: filesystem. Ask "show me the filesystem" to continue.
```

---

## §2 filesystem (not volatile, but always re-verify on first request per conversation)

```markdown
## filesystem

The session has five mount points. `/home/claude` and `/mnt/user-data/outputs` are writable; the rest are read-only.

```verified
$ ls -la /mnt/user-data/uploads /mnt/skills /mnt/transcripts /home/claude /mnt/user-data/outputs 2>&1 | head -40
{verbatim output}
```

| Path | Mount | Writable | Purpose |
| --- | --- | --- | --- |
| `/mnt/user-data/uploads` | read-only | no | files the user attached to the chat |
| `/mnt/skills/public` | read-only | no | Anthropic-shipped skills |
| `/mnt/skills/examples` | read-only | no | Anthropic example skills |
| `/mnt/skills/user` | read-only | no | this user's custom skills |
| `/mnt/transcripts` | read-only | no | conversation transcripts |
| `/home/claude` | read-write | yes | working directory; resets between tasks |
| `/mnt/user-data/outputs` | read-write | yes | final deliverables; surfaced via `present_files` |

Next: installed_runtimes. Ask "show me what's pre-installed" to continue.
```

---

## §3 installed_runtimes (volatile — re-run every turn)

```markdown
## installed_runtimes

Pre-installed languages, build tools, databases, and shell utilities. Versions verified this turn.

```verified
$ scripts/verify.sh runtimes
{verbatim output of the for-loop probe}
```

| Category | Tool | Version | Source |
| --- | --- | --- | --- |
| language | python3 | {ver} | system |
| language | node | {ver-or-"not installed"} | system |
| language | bash | {ver} | system |
| build | git | {ver} | system |
| build | gcc | {ver-or-"not installed"} | system |
| build | make | {ver-or-"not installed"} | system |
| database | psql | {ver-or-"not installed"} | system |
| database | redis-cli | {ver-or-"not installed"} | system |
| utility | jq | {ver} | system |
| utility | curl | {ver} | system |

> **Note:** sandbox state can change mid-session; this row was verified at {timestamp}. A `pip install` or `apt install` you ran earlier in this conversation will appear above; an install in another session won't.

Next: tools_and_connectors. Ask "show me the tools" to continue.
```

---

## §4 tools_and_connectors (volatile — introspect tool list this turn)

```markdown
## tools_and_connectors

Tools and connectors visible in the current turn. Hidden tools require `tool_search` to surface.

```verified
(no shell — agent introspects from the visible tool list this turn)

To re-verify: enumerate the function definitions you can call right now. They are listed in your system context under `<functions>` (or equivalent). Do not assume the bundled list below — it was correct at packaging time only.
```

| Tool | Type | When to use |
| --- | --- | --- |
| {tool-name-1} | {category} | {one-line summary} |
| {tool-name-2} | {category} | {one-line summary} |
| … | … | enumerate every tool from the current `<functions>` block; abbreviate with a final `…` row pointing to "your visible tool list" if there are more than 15 |

> **Note:** the tool list varies by session, by feature toggle, and by user plan. The packaging-time baseline at `references/packaging-time-baseline.md` lists what was present when this skill was built — diff against that for drift, but always trust the live `<functions>` block first.

Next: skills. Ask "show me the skills" to continue.
```

---

## §5 skills (not volatile)

```markdown
## skills

Skills mounted in this session, grouped by scope. The bundled `references/packaging-time-baseline.md` records what this user typically has installed.

```verified
$ scripts/verify.sh skills
{verbatim three-column TSV: scope, name, path}
```

| Scope | Skill | One-line purpose |
| --- | --- | --- |
| public | docx | Word documents |
| public | xlsx | spreadsheets |
| public | pdf | PDF read/write/fill |
| public | pptx | presentations |
| public | frontend-design | React/HTML UI scaffolding |
| public | file-reading | route uploads to the right reader |
| public | pdf-reading | read PDF content |
| public | product-self-knowledge | Claude product facts |
| examples | skill-creator | author and iterate skills |
| examples | … | see T4: /mnt/skills/examples/ for the rest |
| user | {first-user-skill} | … |
| user | {n-user-skill} | … |

Next: network_and_io. Ask "show me network and i/o" to continue.
```

---

## §6 network_and_io (volatile — re-probe every turn)

```markdown
## network_and_io

Outbound network status, retrieval-tool availability, and the upload/output directories.

```verified
$ scripts/verify.sh network
{verbatim output}
```

| Channel | Direction | Status | Notes |
| --- | --- | --- | --- |
| bash outbound | egress | {open/blocked} | curl probe to example.com returned {http_code} |
| web_search | retrieval | present | Anthropic-managed search |
| web_fetch | retrieval | present | exact-URL fetch |
| image_search | retrieval | present | inline images |
| /mnt/user-data/uploads | inbound files | {n} files | user attachments |
| /mnt/user-data/outputs | outbound files | {n} files | shown via `present_files` |
| MCP connectors | both | {n} configured | see §4 for the roster |

Next: limits_and_caveats. Ask "show me the limits" to continue.
```

---

## §7 limits_and_caveats (not volatile)

```markdown
## limits_and_caveats

Things this surface does NOT do, and important caveats about persistence and identity.

```verified
(no shell — facts are stable per session)
```

| Limit | Value | Implication |
| --- | --- | --- |
| knowledge cutoff | end of Jan 2026 | search the web for anything post-cutoff |
| sandbox lifetime | per-task | `/home/claude` resets between tasks; persist via `/mnt/user-data/outputs` |
| running services | turn-bounded | postgres / redis / docker started this turn won't be running next turn unless restarted |
| GPU | none | no CUDA, no GPU-only ML libs |
| long-running jobs | none | no cron, no background workers across turns |
| IP allowlist | none | bash outbound goes through a managed proxy |
| copyright on web_fetch | enforced | quotes ≤15 words, ≤1 quote per source |
| memory scope | project-bounded | `userMemories` only covers the current Project; switching projects is a fresh slate |

Next: (end of protocol — ask anything else to start over)
```

---

## Refusal templates

When a question lands outside the seven sections, OR a verification command fails to confirm a claim, use the exact templates from `SKILL.md` "Hard rules" section. Do not paraphrase.
