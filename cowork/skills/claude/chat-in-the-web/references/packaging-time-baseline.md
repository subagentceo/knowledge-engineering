# Packaging-time baseline

> **Not a contract.** This file is a snapshot of the chat environment as it existed when this skill was *packaged*. It is intentionally retained so a reviewer can spot drift, but it is **not** the source of truth for any future session. The agent always re-runs the verification commands per section.


Snapshot captured: 2026-05-09T23:54:48Z

## Surface

| Field | Value |
| --- | --- |
| product | claude.ai web/mobile chat |
| model | Claude Opus 4.x |
| code_execution | enabled (bash, view, str_replace, create_file, present_files) |
| working_directory | /home/claude |
| output_directory | /mnt/user-data/outputs |

## Filesystem

```verified
$ ls -la /mnt/user-data/uploads /mnt/skills /mnt/transcripts /home/claude /mnt/user-data/outputs 2>&1 | head -40
/home/claude:
total 48
drwxr-xr-x 9 root root 4096 May  9 23:17 .
drwxr-xr-x 5 root root 4096 May  9 23:35 ..
drwxr-xr-x 6 root root 4096 May  9 23:05 .cache
drwxr-xr-x 3 root root 4096 Apr 18 18:10 .config
drwxr-xr-x 3 root root 4096 Apr 18 18:10 .local
drwxr-xr-x 3 root root 4096 Apr 18 18:12 .npm
drwxr-xr-x 5 root root 4096 Apr 18 18:12 .npm-global
-rw-r--r-- 1 root root   74 Apr 18 18:10 .npmrc
-rw-r--r-- 1 root root  215 Apr 18 18:10 .wget-hsts
-rw-r--r-- 1 root root 2975 May  9 23:10 build_manifest.py
drwxr-xr-x 2 root root 4096 May  9 23:42 out
drwxr-xr-x 3 root root 4096 May  9 23:06 refs

/mnt/skills:
total 12
drwxr-xr-x  5 root root 4096 May  9 23:05 .
drwxr-xr-x  6 root root 4096 May  9 23:05 ..
drwxr-xr-x 24 root root 1151 May  8 21:39 examples
drwxr-xr-x 10 root root  341 May  8 21:39 public
drwxr-xr-x 11 root root 4096 May  9 23:40 user

/mnt/transcripts:
total 4
drwxr-xr-x 1 claude ubuntu    0 May  9 23:51 .
drwxr-xr-x 6 root   root   4096 May  9 23:05 ..

/mnt/user-data/outputs:
total 168
drwxr-xr-x 1 claude ubuntu      0 May  9 23:51 .
drwxr-xr-x 5 root   root     4096 May  9 23:05 ..
-rw-r--r-- 1 claude ubuntu  19609 May  9 23:51 environment-disclosure-prompt.xml
-rw-r--r-- 1 claude ubuntu   2596 May  9 23:42 list-subagent-skills.skill
-rw-r--r-- 1 claude ubuntu 110428 May  9 23:17 read-reference-managed-agents.skill
-rw-r--r-- 1 claude ubuntu  31043 May  9 23:37 rss-to-kimball-postgres.skill

/mnt/user-data/uploads:
total 4
drwxr-xr-x 1 claude ubuntu    0 May  9 23:51 .
```

## Installed runtimes

```verified
python3      Python 3.12.3
node         v22.22.2
bash         GNU bash, version 5.2.21(1)-release (x86_64-pc-linux-gnu)
git          git version 2.43.0
psql         psql (PostgreSQL) 16.13 (Ubuntu 16.13-0ubuntu0.24.04.1)
redis-cli    not installed
docker       not installed
java         openjdk 21.0.10 2026-01-20
go           not installed
rustc        not installed
gcc          gcc (Ubuntu 13.3.0-6ubuntu2~24.04.1) 13.3.0
make         GNU Make 4.3
jq           not installed
curl         curl 8.5.0 (x86_64-pc-linux-gnu) libcurl/8.5.0 OpenSSL/3.0.13 zlib/1.3 brotli/1.1.0 zstd/1.5.5 libidn2/2.3.7 libpsl/0.21.2 (+libidn2/2.3.7) libssh/0.10.6/openssl/zlib nghttp2/1.59.0 librtmp/2.3 OpenLDAP/2.6.10
ripgrep      not installed
tmux         not installed
```

## Skills inventory

**public** (`/mnt/skills/public`):
- `docx`
- `file-reading`
- `frontend-design`
- `pdf-reading`
- `pdf`
- `pptx`
- `product-self-knowledge`
- `xlsx`

**examples** (`/mnt/skills/examples`):
- `algorithmic-art`
- `benepass-reimbursement`
- `brand-guidelines`
- `call-to-book`
- `cancel-unsubscribe`
- `canvas-design`
- `doc-coauthoring`
- `event-planning`
- `file-expenses`
- `file-form`
- `financial-calculator`
- `grocery-shopping`
- `hire-help`
- `internal-comms`
- `mcp-builder`
- `meal-delivery`
- `prescription-refill`
- `return-refund`
- `skill-creator`
- `slack-gif-creator`
- `theme-factory`
- `web-artifacts-builder`

**user** (`/mnt/skills/user`):
- `create-reference-managed-agents`
- `delete-reference-managed-agents`
- `github-issues-prs`
- `list-default-skills`
- `list-subagent-skills`
- `llms-crud`
- `read-reference-managed-agents`
- `rss-to-kimball-postgres`
- `update-reference-managed-agents`

