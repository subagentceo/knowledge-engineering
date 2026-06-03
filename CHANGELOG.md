# Changelog

All notable changes to this project are tracked here. This file is maintained
automatically by [release-please](https://github.com/googleapis/release-please)
from [Conventional Commits](https://www.conventionalcommits.org/) on `main`.

## [0.5.0](https://github.com/subagentceo/knowledge-engineering/compare/knowledge-engineering-v0.4.0...knowledge-engineering-v0.5.0) (2026-06-03)


### Features

* **apps:** canonical api-core, compliance-api, admin-api packages + Fivetran ERD alignment (O2) ([43422bb](https://github.com/subagentceo/knowledge-engineering/commit/43422bbd68bb9b0feeaa9384df4e3bdd6f428c1b))
* **consensus:** majority-quorum D1 consensus engine + KG lane wire (O18) ([18722d8](https://github.com/subagentceo/knowledge-engineering/commit/18722d8e5f494b9ed5da7c7674a48fb0c2198e63))
* **db:** bump AlloyDB Omni to PG18 (gcr.io) + graceful password skip (O1) ([c127fcc](https://github.com/subagentceo/knowledge-engineering/commit/c127fcc64cc90777be1c9115da25d37d7c9fb185))
* **hooks:** UserPromptSubmit structured-prompt formatter hook + skill v0.3 (O2) ([b5a234c](https://github.com/subagentceo/knowledge-engineering/commit/b5a234c15c7c04ff1cb47fb3e0234727b8a2aaa0))
* **kg-api:** redis-om + redisvl + mcp-redis deps + RedisCache layer (O2) ([fd4e585](https://github.com/subagentceo/knowledge-engineering/commit/fd4e58542f6a05c3bfb9fa045e267e67eeeaaa6b))
* **kg-api:** scaffold Python KG backend — FastAPI + FastMCP Code Mode + AlloyDB (O1) ([a174d19](https://github.com/subagentceo/knowledge-engineering/commit/a174d19285205e1d06cfdfcde6aaaf109c20f4f5))
* **mailbox:** D1-backed adapter + fanout + mailbox_events table (O19) ([a6edbd3](https://github.com/subagentceo/knowledge-engineering/commit/a6edbd3b0643b4548ffbc796338054fe1dce0068))
* **orchestration:** ke-loop-orchestrator seed + V040_LOOP_TASKS registry (O1) ([b14656c](https://github.com/subagentceo/knowledge-engineering/commit/b14656c40a366b49766fa38796de6785dc62dc28))
* **outcomes:** register 2026-06-03 O3-O13 + loop-improvements prompt + CLAUDE.md PR discipline (O1) ([e859d43](https://github.com/subagentceo/knowledge-engineering/commit/e859d43fc38a4dacde6d16cf4f88319dfd918672))
* **platform-engineering:** OPE1 plugin.json schema+coverage test (O1) ([48a804b](https://github.com/subagentceo/knowledge-engineering/commit/48a804be0dc3c17e2e375e220e8a8b56c9847e74)), closes [#175](https://github.com/subagentceo/knowledge-engineering/issues/175)
* **plugins:** add redis/agent-skills marketplace + redis-development plugin (O1) ([a490777](https://github.com/subagentceo/knowledge-engineering/commit/a4907774a2c5803a25b826dfdea7e1a5188f4218))
* **routines:** ke-coworker-data CCR routine config + tests (O16) ([f113118](https://github.com/subagentceo/knowledge-engineering/commit/f11311877a073f5f0e088a3f72cd1d72c64da8e0))
* **routines:** ke-coworker-prompt CCR routine config + tests (O3) ([3c0f0e7](https://github.com/subagentceo/knowledge-engineering/commit/3c0f0e7fa091184090b3bc5567a8dea22e4bdaca))
* **routines:** ke-coworker-verifier CCR routine config + tests (O20) ([ae3308a](https://github.com/subagentceo/knowledge-engineering/commit/ae3308a5badf499d28c472ca817eb53d44705c6b))
* **routines:** ke-loop-orchestrator CCR routine config + tests (O1) ([eaca0d3](https://github.com/subagentceo/knowledge-engineering/commit/eaca0d3dd5e94360e425ccaaf8ad1342866c659e))
* **scripts:** container toolkit audit + ralf-loop (O2) ([f82674b](https://github.com/subagentceo/knowledge-engineering/commit/f82674bf37680c7d92e15f4ce6d5862296743be1))


### Bug Fixes

* **ci:** exempt claude/ branches from branch-guard topology check (O1) ([af91492](https://github.com/subagentceo/knowledge-engineering/commit/af914920a9fb5eba00822fa95cb56b7b95136ba4))
* **ci:** fire cost-gate on labeled event so skip-cost-gate takes effect (O1) ([97e4522](https://github.com/subagentceo/knowledge-engineering/commit/97e4522a74eb6a5bafe039087bcbcb609d583122))


### Documentation

* **operator:** Docker Desktop deterministic-management runbook (O1) ([6ba54f3](https://github.com/subagentceo/knowledge-engineering/commit/6ba54f31dd1a71be2df1562b2f863382ce8f3fc4))


### Chores

* **gitignore:** extend pycache exclusion to apps/**/__pycache__ (O2) ([6ccd906](https://github.com/subagentceo/knowledge-engineering/commit/6ccd906d69ab2f29346a449dadbfa302a643dee9))
* **gitignore:** include audit_container_results.jsonl rule (O2) ([00919bf](https://github.com/subagentceo/knowledge-engineering/commit/00919bfedbb383fa74d779ad55f6f260c822ef86))
* **gitignore:** untrack apps/**/__pycache__ + audit artifact (O2) ([cc32e92](https://github.com/subagentceo/knowledge-engineering/commit/cc32e92354fd7fe6f6c4915b4a61b956ddd16ffe))
* **heartbeat:** loop tick 2026-06-03-T2 — OAUTO17 rescue survey (O14) ([218e1b6](https://github.com/subagentceo/knowledge-engineering/commit/218e1b680b14e0abaddbc54253822a9f14105fb3))
* **heartbeat:** loop tick 2026-06-03-T3 — PR backlog rescue + pending.md refresh (O15) ([4687119](https://github.com/subagentceo/knowledge-engineering/commit/468711988ce0eb1ca0b2352dcba753a72a451007))
* **heartbeat:** loop tick 2026-06-03-T5 — v0.5.0-O1 CCR routine + OAUTO17 drain (O16) ([fcabd5c](https://github.com/subagentceo/knowledge-engineering/commit/fcabd5cec491d1a5335ab9b123218d00e610c1d8))
* **heartbeat:** loop tick 2026-06-03-T6 — v0.5.0-O2 CCR routine landed (O16) ([b9b3fcb](https://github.com/subagentceo/knowledge-engineering/commit/b9b3fcbe679a1bc7ea139c3f0bb1974071264ca5))
* **heartbeat:** loop tick 2026-06-03-T7 — v0.5.0-O3 CCR routine merged (O17) ([e5ce02e](https://github.com/subagentceo/knowledge-engineering/commit/e5ce02e1c71b44111294eca6c96e9eaf5654314f))
* **heartbeat:** record PR [#330](https://github.com/subagentceo/knowledge-engineering/issues/330) merge — OPE1 test [#175](https://github.com/subagentceo/knowledge-engineering/issues/175) closed (O2) ([ab549d9](https://github.com/subagentceo/knowledge-engineering/commit/ab549d93cebee8892434efd2b33b90b4eb82e5c7))
* **mailbox:** append coworker-feature-dev v0.5.0-O1 outcome (O16) ([a5aaca8](https://github.com/subagentceo/knowledge-engineering/commit/a5aaca8830b50cb010908956dc26b86565a4621d))
* **mailbox:** T3 tick_end outcome — OAUTO17 rescue + pending.md refresh (O15) ([4a66cfd](https://github.com/subagentceo/knowledge-engineering/commit/4a66cfda61168b5ffb5f6c1a59af5e92a2e37f32))
* **outcomes:** mark O15 achieved — PR [#346](https://github.com/subagentceo/knowledge-engineering/issues/346) merged (O16) ([70a4b86](https://github.com/subagentceo/knowledge-engineering/commit/70a4b865b4d4b6b4860fa2bb37394a002a55bdf6))
* **outcomes:** register OPE1 outcome O2 in session log (O2) ([d320369](https://github.com/subagentceo/knowledge-engineering/commit/d320369d792adf6080a8f4d30966f06caee545a8)), closes [#175](https://github.com/subagentceo/knowledge-engineering/issues/175)

## [0.4.0](https://github.com/subagentceo/knowledge-engineering/compare/knowledge-engineering-v0.3.0...knowledge-engineering-v0.4.0) (2026-06-03)


### Features

* **batch:** Batches API client + tests — submit/poll/collect (O1) ([6b4ce25](https://github.com/subagentceo/knowledge-engineering/commit/6b4ce2597a3892147ae59d568cd7ba4f4f8052ba))
* **branch:** canonical &lt;user&gt;/KENG-NNNN-desc topology + generator/validator (O1) ([4de1870](https://github.com/subagentceo/knowledge-engineering/commit/4de1870f7a6ea944549b0137f49cd5b279c7deb3))
* **ci:** add agent cost gate + remove neon CI + subagent-dashboard Swift models (O2) ([92b2399](https://github.com/subagentceo/knowledge-engineering/commit/92b2399ad846a4d4b39491fde12300c7c94f2b71))
* **comms:** Slack comms lane — mailbox_outcome mirror to #agent-ops (O1) ([894a958](https://github.com/subagentceo/knowledge-engineering/commit/894a958c36fd7ca9d87939577aeb7095ddb1ccb7))
* **corpus-viewer:** complete CorpusSource resolution to kill hardcoded liveRoot (O1) ([69d7ad6](https://github.com/subagentceo/knowledge-engineering/commit/69d7ad66a1adcb2e0ca19c3b69efbb806f376f0e))
* **corpus-viewer:** iOS platform + CorpusSource live/bundled resolution (O1) ([55ba9a8](https://github.com/subagentceo/knowledge-engineering/commit/55ba9a81a12184ee476e8ae6b8c8f28c72b9be16))
* **cost:** full parity models for Console /cost + /usage/cache + /usage (O1) ([798f906](https://github.com/subagentceo/knowledge-engineering/commit/798f9060fac84589c8c49cf0a0e786ecd8bc6ccc))
* **cost:** org-scoped OTel + canonical metric names parity with Console /cost /usage /analytics (O1) ([6ba2920](https://github.com/subagentceo/knowledge-engineering/commit/6ba29201b3c8841cb315dd0be50e668657336123))
* **dashboard:** wire CostMetricsView + Prometheus poller + OTel stack + prompt v2 (O1) ([efc36b2](https://github.com/subagentceo/knowledge-engineering/commit/efc36b2d007f98bd95b8cb959606de38e4f380a5))
* **db:** add AlloyDB Omni client mirroring neon-client (O1) ([007e196](https://github.com/subagentceo/knowledge-engineering/commit/007e196b3a4dec7731ff169b9e6d142448d1f35a))
* **db:** AlloyDB-local per-PR branching to replace Neon branch-per-PR (O1) ([05c905f](https://github.com/subagentceo/knowledge-engineering/commit/05c905fd7e7d41c5824f7f6636d9629e65a45219))
* **knowledge-graph:** D1-backed MCP knowledge graph lane (O1) ([40311ea](https://github.com/subagentceo/knowledge-engineering/commit/40311eaa1e775518d0763932d216b777dacba1a5))
* **mailbox:** agent-to-agent mailbox MCP lane + Zod types (O1) ([a561cb3](https://github.com/subagentceo/knowledge-engineering/commit/a561cb34ed850f1500a68c5385ce1e89fc9c6d43))
* **mailbox:** SQLite/D1 storage adapter with JSONL fallback (O1) ([c520a3c](https://github.com/subagentceo/knowledge-engineering/commit/c520a3c906386615ae22d36c66bb47f1a55f47ac))
* **mailbox:** tests + telemetry bridge (O1) ([86f441e](https://github.com/subagentceo/knowledge-engineering/commit/86f441e7def50b1c3b6299de9ea59fc241b9de53))
* **mcp:** telemetry lane + SDK client + Swift MCP consumer dogfooding cost poller (O1) ([3a4bad7](https://github.com/subagentceo/knowledge-engineering/commit/3a4bad7f5fa99587cdc919470ce1dd46fee178e8))
* **outcomes:** Zod-typed session outcome registry + tests for 2026-06-02 (O1) ([a16eb2a](https://github.com/subagentceo/knowledge-engineering/commit/a16eb2acba1ea6c677e223a70cba8689c9e76917))
* **parity:** codify Managed-Agents cloud-sandbox toolchain parity + doctor (O1) ([8b8a550](https://github.com/subagentceo/knowledge-engineering/commit/8b8a5507c22ca4d41aea022df54eda1bf4b99d62))
* **redis:** DragonflyDB Redis-wire client + redis-py smoke + citation (O1) ([a8fa4dd](https://github.com/subagentceo/knowledge-engineering/commit/a8fa4dd02fa5962dfef051a7f7fbda6aaab80eb2))
* **rovo:** Rovo tool-catalog API + zod/pydantic/TS contract (O1) ([a10725f](https://github.com/subagentceo/knowledge-engineering/commit/a10725f25638f2eac8b08e1d7f2e8d2c9749e63a))
* **skills:** add skills infrastructure — llms-crud v0.2, read-reference-managed-agents v3, structured-prompt-evaluator/formatter, eval-tool, chat-in-the-web (O3) ([19c5f2b](https://github.com/subagentceo/knowledge-engineering/commit/19c5f2bd8f35a9d0e5b43a717b0840514a00d88e))
* **subagents:** CF Worker scaffolds for v0.4.0 managed subagents O1-O6 (O1) ([9c99297](https://github.com/subagentceo/knowledge-engineering/commit/9c99297c763cdc91adf0c38e282a2fb4e7af7f27))
* **team:** agent-team orchestrator surface — zod+pydantic sub-agent models + SwiftUI agent-view app (O1) ([c3ce4e8](https://github.com/subagentceo/knowledge-engineering/commit/c3ce4e83332aaa359d6b416b49118a2f6b474e32))


### Bug Fixes

* **batch:** assertOAuthOnly gate + batchId path-traversal guard (O1) ([d1c6101](https://github.com/subagentceo/knowledge-engineering/commit/d1c61010f793cb71a3f1f703e7e1a74daabfa0cf))
* **ci:** OAUTO17 — close/reopen BLOCKED PRs missing branch-guard after App-rebase (O1) ([6818e26](https://github.com/subagentceo/knowledge-engineering/commit/6818e26c81adc5bd95a0b394e5779e8d307cdad4))
* **citations:** replace non-canonical [@cite](https://github.com/cite) paths in mailbox.test.ts (O1) ([ba484e9](https://github.com/subagentceo/knowledge-engineering/commit/ba484e9c9f407727b1c8d92667c4ad5e9cde8e56))
* **citations:** use canonical vendor/seeds [@cite](https://github.com/cite) paths in comms test (O3) ([b0e436b](https://github.com/subagentceo/knowledge-engineering/commit/b0e436b82d10549dfef884d5c99fd066c73feebf))
* **citations:** use canonical vendor/seeds [@cite](https://github.com/cite) paths in kg test (O2) ([f4dec2e](https://github.com/subagentceo/knowledge-engineering/commit/f4dec2e37258054c169ce8f8e143fd30be4067fc))
* **ci:** update verify:mcp expected tool count to 31; add skip-cost-gate label bypass (O1) ([2ca7120](https://github.com/subagentceo/knowledge-engineering/commit/2ca71207b8b64b23b5d2ae989e33c0b79f89cfdf))
* **cost:** replace Admin API polling with Agent SDK native OTel telemetry (O1) ([1bacdd4](https://github.com/subagentceo/knowledge-engineering/commit/1bacdd41366b7b21bef3402449f84a501430c518))
* **db:** guard templateDb identifier against DDL injection (O1) ([e6fddf8](https://github.com/subagentceo/knowledge-engineering/commit/e6fddf888fbc42cb0c8e7aace7d2544fc9ee7231))
* **db:** use assertThrows helper instead of bare assert.throws in alloydb-branch test (O2) ([4679696](https://github.com/subagentceo/knowledge-engineering/commit/4679696943851e85f19460aae0ceabedd4ecd6db))
* **deps:** add pg + @types/pg (alloydb-client imports them, missing on main) (O1) ([8964d4f](https://github.com/subagentceo/knowledge-engineering/commit/8964d4f0d800f6f7723db24278a4442413d11b20))
* **mailbox-store:** dynamic node:sqlite load for Node 20 CI compat (O1) ([aabc22d](https://github.com/subagentceo/knowledge-engineering/commit/aabc22d02eaa959076c1d681350af4809900a62e))
* **test:** cite vendor env-vars.md, not sibling source, in oauth token test (O1) ([5c56345](https://github.com/subagentceo/knowledge-engineering/commit/5c5634512a6e11961720bf3e012638429af5a3bf))
* **test:** delete orphaned neon-branch.test.ts after workflow removal (O1) ([e057bd7](https://github.com/subagentceo/knowledge-engineering/commit/e057bd75cbcf57c1a4c6c3c144e06e4cfe46a695))
* **test:** drop sibling-source [@cite](https://github.com/cite) in schema + todo-state tests (O1) ([94f94de](https://github.com/subagentceo/knowledge-engineering/commit/94f94dec91791bfc8f7f10052d029b3dbce4e865))
* **tsc:** extract cost-types to src/sdk — resolve cross-rootDir + exactOptionalPropertyTypes (O1) ([15d67a0](https://github.com/subagentceo/knowledge-engineering/commit/15d67a029253cd7f92d541b85e8561609bbc72d8))
* **verify:** update expected tool count to 35 for comms lane (O3) ([30052fc](https://github.com/subagentceo/knowledge-engineering/commit/30052fc0d0e4ca8c5c318260f5c36036feb640a7))
* **verify:** update expected tool count to 39 for kg lane (O2) ([190efd8](https://github.com/subagentceo/knowledge-engineering/commit/190efd80406a699619559fe8a202c6cfc610ac66))


### Documentation

* **adr:** OMA1 multi-agent infrastructure + loop patterns + heartbeat (O1) ([51a2183](https://github.com/subagentceo/knowledge-engineering/commit/51a21836578156e3b451819dc3bfac2c276d7862))
* **vendor:** decompose claude.com product webpages into tracked mirrors (O1) ([3008578](https://github.com/subagentceo/knowledge-engineering/commit/3008578466bfb6ead4721be006dee97c27dc31b4))


### Chores

* **batch:** trigger CI resync after skip-cost-gate label added (O1) ([ad9fd24](https://github.com/subagentceo/knowledge-engineering/commit/ad9fd2406bde3133b6cf349dd3ea3cf9f520d775))
* **data:** harvest changelog 2.1.159-2.1.161 admonitions (O1) ([1f835fd](https://github.com/subagentceo/knowledge-engineering/commit/1f835fda4072ac4006241f7edae442162ac424c9))
* **db:** drop stray scratch file from alloydb-branch (O1) ([70e069f](https://github.com/subagentceo/knowledge-engineering/commit/70e069f4a7c8197820cadcfab6a74b691916d25b))
* **gitignore:** ignore .claude/worktrees/ agent isolation runtime dir (O1) ([b847c3b](https://github.com/subagentceo/knowledge-engineering/commit/b847c3b30e7e17f5aebdbdedcb2a7432e0af65d9))
* **gitignore:** ignore local screenshots/ + webpages/ scratch (O1) ([d2efec5](https://github.com/subagentceo/knowledge-engineering/commit/d2efec56f85245361b780708892d84988784f2e3))
* **heartbeat:** record PR [#325](https://github.com/subagentceo/knowledge-engineering/issues/325) merge — Phase 11.B complete (O1) ([37f4e3b](https://github.com/subagentceo/knowledge-engineering/commit/37f4e3b160581a20227a5fbbd56d53e0bc2efbf0))
* **mailbox-store:** trailing newline to retrigger CI (O1) ([11a7b3f](https://github.com/subagentceo/knowledge-engineering/commit/11a7b3faefa142cf25c1d0fd1f3b78082859f98e))
* **mailbox:** seed orchestrator mailbox with session 2026-06-02 outcomes (O1) ([2b351b9](https://github.com/subagentceo/knowledge-engineering/commit/2b351b92431bd543b648f85b0da7ac730b75a496))
* **otel:** enable Claude Code telemetry env in project settings (O1) ([643c283](https://github.com/subagentceo/knowledge-engineering/commit/643c2831b0a7a3217e481c2d8e0f91b75e324f33))
* **outcomes:** 2026-06-03 loop tick outcome registry + heartbeat (O1) ([94c2066](https://github.com/subagentceo/knowledge-engineering/commit/94c2066c98fdae182eb6b77d522738eed470efd4)), closes [#42](https://github.com/subagentceo/knowledge-engineering/issues/42)
* **outcomes:** add O10 mailbox lane + O11 outcome registry to session registry (O1) ([5c18172](https://github.com/subagentceo/knowledge-engineering/commit/5c18172e4c6c39f650f7e957859f4348326a3a85))
* **settings:** allowlist routine Bash + save Rovo/orchestrator blueprint reference (O1) ([f7f3748](https://github.com/subagentceo/knowledge-engineering/commit/f7f3748a9007eecfa99aae2dff3e089fdc205cb3))
* **settings:** allowlist routine Bash commands to prevent parallel-call cancellation (O1) ([817b298](https://github.com/subagentceo/knowledge-engineering/commit/817b298cfe0d088ace089507feb541dff66a28f3))
* **settings:** broaden Bash allowlist to stop parallel-tool-call cancellation (O1) ([f4c8443](https://github.com/subagentceo/knowledge-engineering/commit/f4c844352c7543a07048d9990cb5fb34923c246b))
* **vendor:** update changelog mirror to claude-code 2.1.161 (O1) ([3516195](https://github.com/subagentceo/knowledge-engineering/commit/351619537d8f057ae2a67aa748313e6b5db51ade))

## [0.3.0](https://github.com/subagentceo/knowledge-engineering/compare/knowledge-engineering-v0.2.0...knowledge-engineering-v0.3.0) (2026-05-30)


### Features

* **agent:** add claude-knowledge-agent — Zod-type-safe SDK subagent over claude -p (O1) ([6e7f4f7](https://github.com/subagentceo/knowledge-engineering/commit/6e7f4f710d6aca708c73a8b749902e1d90d3777f))
* **agent:** add corpus-viewer subagent build chassis + Swift app scaffold (O1) ([fbdc784](https://github.com/subagentceo/knowledge-engineering/commit/fbdc78439c7d8c6b06335e79c71aaab8a608eb0f))
* **agent:** knowledge-work Lane abstraction grounded in knowledge-work-plugins + skill-scripts (O1) ([dfbcd9d](https://github.com/subagentceo/knowledge-engineering/commit/dfbcd9d09b6f5765dd894b84f349160f337284d7))
* **agent:** steerKnowledgeLoop — DAG-driven claude -p loop with verifier-fail retry + budget gate (O1) ([1685dec](https://github.com/subagentceo/knowledge-engineering/commit/1685dec29cd2ddc376f5c22a12e479af9fb90f5a))
* **courses:** course-plugins marketplace + enterprise-mirror tooling + PTC doc (OKE1) ([4c4321d](https://github.com/subagentceo/knowledge-engineering/commit/4c4321d085c9a9b17439d028dfdb699c424f27a3))
* **cowork:** Python cowork lane — PEP-723 Atlassian PM script + pydantic models mirroring zod (O1) ([801c6cb](https://github.com/subagentceo/knowledge-engineering/commit/801c6cb8b31c2ba5d041472a28720afa8e45fd92))
* **env:** version-controlled non-secret env for CLI + web sessions (OKE3) ([724f56c](https://github.com/subagentceo/knowledge-engineering/commit/724f56c7eb2741ac34313d43cbfbdfbf8ec045da))
* **ops:** enterprise-wide Claude CI/CD kill switch script (OCICD1) ([67fa9d7](https://github.com/subagentceo/knowledge-engineering/commit/67fa9d73b778e3441981f1a7e5e47a4979490de7))
* **ops:** managed-settings template granting enterprise-wide reach (OCICD1) ([ea4fd2a](https://github.com/subagentceo/knowledge-engineering/commit/ea4fd2a17715d853a1501a6fcae172be8fe4b576))
* **ops:** OSV-clean-main auto-fixer + diagnose-first pr-healer protocol (OPM2, OPM6) ([f4bec30](https://github.com/subagentceo/knowledge-engineering/commit/f4bec308b3419d5c14a9e81b1f97470afb414807))
* **preflight:** local gate-preflight mirroring main ruleset (OPM1) ([addd132](https://github.com/subagentceo/knowledge-engineering/commit/addd132b18dcdf54c34eb8189e2b646063f46b64))
* **schemas:** zod model for open PRs, drafts, orphan branches (OI2) ([b2e79cd](https://github.com/subagentceo/knowledge-engineering/commit/b2e79cdba2e91523871f1fe2c7c82bf322742cf6))
* **skill:** add /format-markdown skill (CommonMark/GFM via prettier) (OKE3) ([0d4f59c](https://github.com/subagentceo/knowledge-engineering/commit/0d4f59c11cf03da0d9939a2b350acc7106ea23d6))
* **tooling:** HTML/TS/JS LSP servers + MCP PDF server for doc mirroring (OKE2) ([41f168d](https://github.com/subagentceo/knowledge-engineering/commit/41f168d029e1e577b1e71b0e4a6e2396b4cc4691))


### Bug Fixes

* **courses:** harden enterprise-mirror tooling + course hooks from review (OKE1) ([6068d8e](https://github.com/subagentceo/knowledge-engineering/commit/6068d8e092bcf5be3fbf7bbfcc77c6d2230ce85d))
* **cowork:** use real Jira project key SCRUM (was placeholder KE) (O1) ([60bc996](https://github.com/subagentceo/knowledge-engineering/commit/60bc9963666c5b87a1f498d2bfa2c995352c726a))
* **crawl:** recover PDFs behind flattened anchor links + add www-cdn host (OKE3) ([88f4f0f](https://github.com/subagentceo/knowledge-engineering/commit/88f4f0f24b0cd17765db023f6ed48018a0048609))
* **verify-tdd:** re-assert [@tdd](https://github.com/tdd) on branch-modified tests + conflict-safe doc (OPM5) ([1782b87](https://github.com/subagentceo/knowledge-engineering/commit/1782b87f6c07e451c3d035f8d247cec25e257380))


### Documentation

* **agent:** ground self-steering §2 in real knowledge-work-plugins domains + skill-scripts (O1) ([3341057](https://github.com/subagentceo/knowledge-engineering/commit/3341057ff40f781472d674a6da3a3637e6e5c527))
* **agent:** self-steering abstraction layer design — plugins/lanes/python/vscode (O1) ([6d87016](https://github.com/subagentceo/knowledge-engineering/commit/6d870162b2cef0aac67bbe0d47778a669423ae74))
* **architecture:** ERD + multi-session component map (pydantic+zod shared contract) (O1) ([0f9e44b](https://github.com/subagentceo/knowledge-engineering/commit/0f9e44b2afbeb9568527d5d727a2271aeda81438))
* **vendor:** decompose Anthropic economic-research PDFs + rich analyses (OKE3) ([a83b061](https://github.com/subagentceo/knowledge-engineering/commit/a83b0610518c506147f879729f7a98d11cacbb49))


### Chores

* **deps:** add prettier devDependency for CommonMark/GFM md formatting (OKE3) ([283156f](https://github.com/subagentceo/knowledge-engineering/commit/283156f419f416e00c248013cfd881523ca69076))
* **md:** CommonMark/GFM-format all PR markdown via prettier (OKE3) ([a8d0240](https://github.com/subagentceo/knowledge-engineering/commit/a8d0240fb7b95bba3eb412d0a4c894c566957962))
* **md:** CommonMark/GFM-format econ analyses + env runbook via prettier (OKE3) ([e65b53a](https://github.com/subagentceo/knowledge-engineering/commit/e65b53a78423d57353618b8015374b9ba0c9b133))
* **vendor:** refresh anthropics/claude-sitemap/anthropic-sitemap + prettier-normalize (O1) ([860ea85](https://github.com/subagentceo/knowledge-engineering/commit/860ea853e3609d1f8fd558a5ad2ff18849301e7e))

## [0.2.0](https://github.com/subagentceo/knowledge-engineering/compare/knowledge-engineering-v0.1.0...knowledge-engineering-v0.2.0) (2026-05-29)


### Features

* **adr:** platform-engineering LSP+Monitors+3m cadence (OPE9) ([#184](https://github.com/subagentceo/knowledge-engineering/issues/184)) ([9f1e59d](https://github.com/subagentceo/knowledge-engineering/commit/9f1e59d7a3cfba511d1a143e61fa74326f45dd3d))
* **agent:** color-code demo — 8-color flag-gated TodoTracker icons (O6) ([#56](https://github.com/subagentceo/knowledge-engineering/issues/56)) ([69574d7](https://github.com/subagentceo/knowledge-engineering/commit/69574d71e6d62c8a4f178806135a2e4b942ef1a1))
* **agent:** crawl-curator sub-agent (Phase 10; closes [#14](https://github.com/subagentceo/knowledge-engineering/issues/14)) ([#29](https://github.com/subagentceo/knowledge-engineering/issues/29)) ([ff0dfde](https://github.com/subagentceo/knowledge-engineering/commit/ff0dfde467e0a349c87920da007d7d308dd757ec))
* **anthropics-crawl:** html_index_sources for build-with-claude + test-and-evaluate subtrees (OVS6) ([#224](https://github.com/subagentceo/knowledge-engineering/issues/224)) ([40a4bf8](https://github.com/subagentceo/knowledge-engineering/commit/40a4bf888b2ff4026f4690b39c88806f4305bde5))
* **audit:** reproducible sitemap coverage measurement (OBLOGS3) ([b1d554e](https://github.com/subagentceo/knowledge-engineering/commit/b1d554ebafcbc619e24b6034257878d1531e5ac7))
* **autonomy:** Claude-driven merge — operator NOT in merge loop (OAUTONOMY1) ([72435c8](https://github.com/subagentceo/knowledge-engineering/commit/72435c8fe845ae8907e4155608216c2caa9c617f))
* **cf-secrets-store:** autonomous bootstrap; reduce Phase 8 ops 4→1 ([4c48906](https://github.com/subagentceo/knowledge-engineering/commit/4c48906ab503cb3ea4817e7ee75fbd7680c37cec))
* **ci:** validate-skill-frontmatter workflow + org/repo settings ADR (OGS1) ([#177](https://github.com/subagentceo/knowledge-engineering/issues/177)) ([13cbeb5](https://github.com/subagentceo/knowledge-engineering/commit/13cbeb5cf3a82068f2e923cf753b39800dc715f0))
* **ci:** verify, OSV-Scanner, Neon branching, Cloudflare preview, Copilot, auto-merge workflows ([af20ec4](https://github.com/subagentceo/knowledge-engineering/commit/af20ec4d7cb22dc04e08ac1d38009851a90749c5))
* **claude-api:** reference the bundled claude-api skill in platform-engineering plugin (OAPI1) ([#223](https://github.com/subagentceo/knowledge-engineering/issues/223)) ([d4d357c](https://github.com/subagentceo/knowledge-engineering/commit/d4d357ccbc67cc85075ac074acc58466e6a49546))
* **claude-support:** Phase E — support.claude.com mirror (341 EN articles) ([#141](https://github.com/subagentceo/knowledge-engineering/issues/141)) ([5da6ae7](https://github.com/subagentceo/knowledge-engineering/commit/5da6ae71355d9adad359648d78c378f04e448eee))
* **cloud-env:** AlloyDB Omni + Redis bootstrap via SessionStart hook (OKWP2) ([4551994](https://github.com/subagentceo/knowledge-engineering/commit/45519941851672a243eb147e38f1cdc05b7e9551))
* **codemode:** gen:servers + servers/ tree + search_tools (Phase 6.A) ([#26](https://github.com/subagentceo/knowledge-engineering/issues/26)) ([c54a939](https://github.com/subagentceo/knowledge-engineering/commit/c54a93969ad95160655f3af23e88c9b8b19e849c))
* **context:** Phase 18 — token counting + cache boundary + budget observability ([#95](https://github.com/subagentceo/knowledge-engineering/issues/95)) ([9f3e265](https://github.com/subagentceo/knowledge-engineering/commit/9f3e265d3fe25ff980185ea9015b13fb3ccdee1f))
* **crawl:** html_index_sources discovery + vendor/anthropic-engineering/ daily refresh (O1) ([#53](https://github.com/subagentceo/knowledge-engineering/issues/53)) ([efb9376](https://github.com/subagentceo/knowledge-engineering/commit/efb9376b5b22548e211455da43c5a5bcfc1d1445))
* **crawl:** sitemap.xml discovery + vendor/openfeature/ + cloudflare flagship (O2+O3+O4) ([#54](https://github.com/subagentceo/knowledge-engineering/issues/54)) ([dde97a1](https://github.com/subagentceo/knowledge-engineering/commit/dde97a1913c0e0004bb57531473459f5c30b4112))
* **crawl:** vendor-audit script for classifying crawl failures (OVS5) ([#227](https://github.com/subagentceo/knowledge-engineering/issues/227)) ([f8b4325](https://github.com/subagentceo/knowledge-engineering/commit/f8b43253f7e3f313670c511c3c7baa022ffde4d8))
* **deps:** install + setup + version bumps (OINST1) ([#243](https://github.com/subagentceo/knowledge-engineering/issues/243)) ([e7bf14e](https://github.com/subagentceo/knowledge-engineering/commit/e7bf14ef510a5019e9ffeb2b792cacd092c64193))
* **discover:** GH source discovery + snapshot (Phase 7.A; partially closes [#11](https://github.com/subagentceo/knowledge-engineering/issues/11)) ([#27](https://github.com/subagentceo/knowledge-engineering/issues/27)) ([1e62507](https://github.com/subagentceo/knowledge-engineering/commit/1e6250752bc3b08422d9a0da5b768db032b411a6))
* **docs-github-grounding:** green — bridge-vendor-lane grounding test (OPE8) ([#183](https://github.com/subagentceo/knowledge-engineering/issues/183)) ([0c12b70](https://github.com/subagentceo/knowledge-engineering/commit/0c12b70ab8d385ae9d359c4649c97223769c1baa))
* **docs-github:** vendor mirror via /api/article/body (OPE5) ([#180](https://github.com/subagentceo/knowledge-engineering/issues/180)) ([09548eb](https://github.com/subagentceo/knowledge-engineering/commit/09548eb7b7bf6e7c47de2d3e0ee51a7634bfc334))
* **dreams:** visions.md + heartbeat-dream skill — managed-agents dreams adoption (OMA2) ([#213](https://github.com/subagentceo/knowledge-engineering/issues/213)) ([2956e55](https://github.com/subagentceo/knowledge-engineering/commit/2956e551058e653faaf2084b2c27feb9b85c2727))
* **dsa:** scaffold data_science_and_analytics team (setup.sh + CONVENTIONS.md) ([#2](https://github.com/subagentceo/knowledge-engineering/issues/2)) ([d8eea19](https://github.com/subagentceo/knowledge-engineering/commit/d8eea1988ec24fcaa9de633d8269ce8302391c0b))
* **embeddings:** @xenova/transformers swap + /goal scaffolding (O1) ([#108](https://github.com/subagentceo/knowledge-engineering/issues/108)) ([000f1a9](https://github.com/subagentceo/knowledge-engineering/commit/000f1a9afb8a0abc256d920c9e9bf987510c6460))
* **eval:** extend blog-extract-fidelity.test.ts to cover S+R+E criteria (OBLOGE1) ([d6005f1](https://github.com/subagentceo/knowledge-engineering/commit/d6005f173bea6ba453a6cb6e7865c595816db720)), closes [#264](https://github.com/subagentceo/knowledge-engineering/issues/264)
* four-lane knowledge bridge — anthropic.com/engineering, claude.com/blog, support.claude.com, llms.txt namespaces (TypeScript, MCP SDK v2, OAuth-only) ([#1](https://github.com/subagentceo/knowledge-engineering/issues/1)) ([e758f19](https://github.com/subagentceo/knowledge-engineering/commit/e758f19590a0f169f451f2f372935795048d0455))
* **frontend:** outcomesdk.com pretext-driven single page (O7) ([#57](https://github.com/subagentceo/knowledge-engineering/issues/57)) ([b58e7ef](https://github.com/subagentceo/knowledge-engineering/commit/b58e7ef68445941cffdcc7cd2fba03366aa7210b))
* **github-automerge:** typed helper for label + enable-auto-merge (OI2) ([#147](https://github.com/subagentceo/knowledge-engineering/issues/147)) ([21c459b](https://github.com/subagentceo/knowledge-engineering/commit/21c459b86882b085ade1f845d15af6fbc19b99fd))
* **github:** setup-github-project.ts (operator-run, milestone + Project v2) ([e6679ac](https://github.com/subagentceo/knowledge-engineering/commit/e6679acdd9a2c9ea0bf6fc92a3246d54e2e522a1))
* **governance:** branch-protection setup + heartbeat dispatch + phase-gates update ([e404753](https://github.com/subagentceo/knowledge-engineering/commit/e40475311bacc08df3895e53a48c88964e4df824))
* **grade:** --batch-submit + --batch-collect (close [#42](https://github.com/subagentceo/knowledge-engineering/issues/42) phase 11.B) (O1) ([#88](https://github.com/subagentceo/knowledge-engineering/issues/88)) ([d41b033](https://github.com/subagentceo/knowledge-engineering/commit/d41b033e97ecf1b234dc642721779b1726ca5fd4))
* **grader:** --all + --batch-prepare for Anthropic Batches API (Phase 11.A) ([#30](https://github.com/subagentceo/knowledge-engineering/issues/30)) ([57fbf17](https://github.com/subagentceo/knowledge-engineering/commit/57fbf176477c742b4581f1d5d20724e5bb8e9738))
* **grader:** ODD rubric grader — Messages API + OAuth (Phase 9; closes [#13](https://github.com/subagentceo/knowledge-engineering/issues/13)) ([#28](https://github.com/subagentceo/knowledge-engineering/issues/28)) ([24b1d34](https://github.com/subagentceo/knowledge-engineering/commit/24b1d349cd358a843b5d4c7e0253a7cd39b4b5cf))
* **hygiene:** Phase G batch 2 — turbopuffer runbook + crawl-config zod schema + Copilot diligence ([#143](https://github.com/subagentceo/knowledge-engineering/issues/143)) ([b0f256f](https://github.com/subagentceo/knowledge-engineering/commit/b0f256fcbd443afae9be388434dfe9ea53e70b69))
* **infra:** scaffold Full-Stack Cloud Agent runner (Cloudflare Sandbox + Neon) ([6f0801e](https://github.com/subagentceo/knowledge-engineering/commit/6f0801ea858a4e9b3bcce4b8a293528bfb89d6e2))
* **integrate:** claude-code-action into the no-HITL dispatch model ([e62283d](https://github.com/subagentceo/knowledge-engineering/commit/e62283db459ef03560e08f2511a2e908da3ad586))
* **markdown:** Phase H — typed AST parser seeded from anthropics/swift-markdown shape ([#145](https://github.com/subagentceo/knowledge-engineering/issues/145)) ([2aafcf4](https://github.com/subagentceo/knowledge-engineering/commit/2aafcf40e1c76b23ee3b6b9ce08b88302f2eeb1e))
* **mcp:** project lane + project_git_status tool (OPROJ1) ([#150](https://github.com/subagentceo/knowledge-engineering/issues/150)) ([4073d8d](https://github.com/subagentceo/knowledge-engineering/commit/4073d8db62872ecf27c909ea0d857e582a11a389))
* **mcp:** refactor 4 lanes to mirror-first (Phase 4; closes [#8](https://github.com/subagentceo/knowledge-engineering/issues/8)) ([#24](https://github.com/subagentceo/knowledge-engineering/issues/24)) ([2f9b8fa](https://github.com/subagentceo/knowledge-engineering/commit/2f9b8fa981cd88ea33c0c06aae90e494b5ac1443))
* **mcp:** wire docker mcp gateway with platform_engineering profile (OKWP2) ([c255fd5](https://github.com/subagentceo/knowledge-engineering/commit/c255fd5657c9efa8cddb4dd4e0f109641cf056f1))
* **neon:** canonical Neon integration workflow + Phase 8 gates updated ([27f3042](https://github.com/subagentceo/knowledge-engineering/commit/27f304241a89d87c0957f1c99a5973d16a99718a))
* **neon:** vendor_pages schema + crawler dual-write + per-PR migrations (O8) ([#58](https://github.com/subagentceo/knowledge-engineering/issues/58)) ([b81842c](https://github.com/subagentceo/knowledge-engineering/commit/b81842c1410d856f1b84bbd3cdf046ef9eb1e3c4))
* **nimbleway:** outbound-allowlist + skeleton runbook + MCP server section (O8) ([#130](https://github.com/subagentceo/knowledge-engineering/issues/130)) ([323417b](https://github.com/subagentceo/knowledge-engineering/commit/323417b510e788f3ba65fba8bf94692e96d67c4d))
* **ollama-cloud:** outbound-allowlist + skeleton runbook (OCP1) ([#153](https://github.com/subagentceo/knowledge-engineering/issues/153)) ([3e231bb](https://github.com/subagentceo/knowledge-engineering/commit/3e231bb78ea1a1a6531b793b8edf3ff1a6fac154))
* **openfeature:** @openfeature/server-sdk + Cloudflare Flagship provider wiring (O5) ([#55](https://github.com/subagentceo/knowledge-engineering/issues/55)) ([49359ee](https://github.com/subagentceo/knowledge-engineering/commit/49359ee5d1399147a37dbe4172adca11a8459f7b))
* **operator-config:** 3-identity inheritance profile (alex → admin + zhoukalex) (OIDENT1) ([#245](https://github.com/subagentceo/knowledge-engineering/issues/245)) ([ae809a5](https://github.com/subagentceo/knowledge-engineering/commit/ae809a5329c4d0aab7dc85123a81efaa90e56c9c))
* **orchestrator:** Phase 19 — Claude Code features dogfood (settingSources + skills + safety hooks) ([#97](https://github.com/subagentceo/knowledge-engineering/issues/97)) ([8cebd2e](https://github.com/subagentceo/knowledge-engineering/commit/8cebd2ebb1099fa5bd88e5082046ac0bd1c29341))
* **orchestrator:** runtime cherry-picked from closed PR [#109](https://github.com/subagentceo/knowledge-engineering/issues/109) (OCP5) ([#201](https://github.com/subagentceo/knowledge-engineering/issues/201)) ([bb60efd](https://github.com/subagentceo/knowledge-engineering/commit/bb60efd011ec7a9a4c440c430a6ca0c76718d50b))
* **parallel-ai:** outbound-allowlist + skeleton runbook (cloud-session dispatch ready) (O8) ([#129](https://github.com/subagentceo/knowledge-engineering/issues/129)) ([6d44b19](https://github.com/subagentceo/knowledge-engineering/commit/6d44b19ed127b07b5c0dd9daced66cc533964fcd))
* **phase-13:** conditional GET (RFC 7232) + content-hash skip-write ([#52](https://github.com/subagentceo/knowledge-engineering/issues/52)) ([0abf4aa](https://github.com/subagentceo/knowledge-engineering/commit/0abf4aa8212b3d9ac503bfa9851defcc25db1143))
* **phase-15:** codify project management — PROJECT.md + pending.md + Cowork mapping ([#50](https://github.com/subagentceo/knowledge-engineering/issues/50)) ([a79d422](https://github.com/subagentceo/knowledge-engineering/commit/a79d422492be1e701bcfa56263a0eea733f8dc7b))
* **phase-8:** outbound allowlist + sandbox:dev script (close [#12](https://github.com/subagentceo/knowledge-engineering/issues/12) C1+C2) (O1) ([#83](https://github.com/subagentceo/knowledge-engineering/issues/83)) ([847d8c9](https://github.com/subagentceo/knowledge-engineering/commit/847d8c956d17899f59ebe3244e168588d523df11))
* **platform-engineering:** .lsp.json + monitors.json + invariant tests (OPE7) ([#182](https://github.com/subagentceo/knowledge-engineering/issues/182)) ([a0e47bd](https://github.com/subagentceo/knowledge-engineering/commit/a0e47bd8e13d8ba4ae2f5c3a2781231dce56e950))
* **platform-engineering:** 3 Code Intelligence SKILL.md (OPE6) ([#181](https://github.com/subagentceo/knowledge-engineering/issues/181)) ([0e5047c](https://github.com/subagentceo/knowledge-engineering/commit/0e5047cb5da4b57b362d878e9ed7229baa11f6a8))
* **plugin:** github-it-admin/ — 5 skills + hooks + monitor + agent + MCP (OIT2) ([#235](https://github.com/subagentceo/knowledge-engineering/issues/235)) ([a2308ae](https://github.com/subagentceo/knowledge-engineering/commit/a2308ae39808f2c7a5e8c8c7655fd02f939d654b))
* **plugin:** macos-it-admin with 5 vendor CRUD skills (OIT1) ([#232](https://github.com/subagentceo/knowledge-engineering/issues/232)) ([7091c9f](https://github.com/subagentceo/knowledge-engineering/commit/7091c9f0b1a792530ad82cb45289bcb84c1014f0))
* **plugin:** platform-engineering Claude Code plugin — install + docker + Voyage→Turbopuffer→AlloyDB + skill (OPE) ([#176](https://github.com/subagentceo/knowledge-engineering/issues/176)) ([2e11a1b](https://github.com/subagentceo/knowledge-engineering/commit/2e11a1b76895b3473193422e91cf718649e0d06b))
* **plugins:** manifest + reporter (3 marketplaces, event-listener, LSP) ([3dc71fa](https://github.com/subagentceo/knowledge-engineering/commit/3dc71fad04d3f737548f4055dd24642d12078ffc))
* **plugins:** real marketplace-plugin materializer (close [#41](https://github.com/subagentceo/knowledge-engineering/issues/41) phase 7.B) (O1) ([#86](https://github.com/subagentceo/knowledge-engineering/issues/86)) ([b396386](https://github.com/subagentceo/knowledge-engineering/commit/b396386c8ae68e55db9e49df16d9e3c06c3467de))
* **posture:** Phase A — posture XML v3 with 11 founder primitives + 11 directives ([#138](https://github.com/subagentceo/knowledge-engineering/issues/138)) ([cc71465](https://github.com/subagentceo/knowledge-engineering/commit/cc71465f39203c10fafba8312998a2509a3a7544))
* **pr-audit-template:** plugin scaffold for per-PR audit follow-ups (OAUDIT1) ([#238](https://github.com/subagentceo/knowledge-engineering/issues/238)) ([d7bdef2](https://github.com/subagentceo/knowledge-engineering/commit/d7bdef2436e43b699811f5fda5278cedfb92545c))
* **pr-event-handler:** typed classifier for github-webhook-activity payloads (OI1) ([#146](https://github.com/subagentceo/knowledge-engineering/issues/146)) ([9935071](https://github.com/subagentceo/knowledge-engineering/commit/9935071122191dd49000056c9b4412be27e12614))
* **pr-healer:** roving CI-healer skill + paste-prompt + rc:healer host (ORC2) ([3cad647](https://github.com/subagentceo/knowledge-engineering/commit/3cad6470bc21757ba3219a1acc54234bfab61bea))
* **pr-queue:** docs/pending-prs.md dashboard via gen-pr-queue.ts (OAUTO10) ([#198](https://github.com/subagentceo/knowledge-engineering/issues/198)) ([98e11e5](https://github.com/subagentceo/knowledge-engineering/commit/98e11e5d930f7d77b7ba55ba891d6a85426e25a6))
* **pr-reviewer:** roving PR-reviewer skill for READY-CLEAN auto-review (ORC3) ([#241](https://github.com/subagentceo/knowledge-engineering/issues/241)) ([cf7aa6d](https://github.com/subagentceo/knowledge-engineering/commit/cf7aa6d25988e74b2250931511904df8dd4c5958))
* **pr-task-reconcile:** skill+runbook for Q-* task→PR sync (ORC5) ([#226](https://github.com/subagentceo/knowledge-engineering/issues/226)) ([908fb91](https://github.com/subagentceo/knowledge-engineering/commit/908fb91c9ecb7812a1a737b0b048ab53cd7622cf))
* **primitive:** package-lock conflict resolution as chassis primitive (OPRIMP) ([#148](https://github.com/subagentceo/knowledge-engineering/issues/148)) ([16533ff](https://github.com/subagentceo/knowledge-engineering/commit/16533ff539caec785947b65f919751be563fa9be))
* **rc:** Remote Control adoption — ADR + npm run rc + skill + verifier (ORC1) ([#211](https://github.com/subagentceo/knowledge-engineering/issues/211)) ([0d3f22e](https://github.com/subagentceo/knowledge-engineering/commit/0d3f22ef56cfa64c2db94110bb9c3023144b8e41))
* **routines:** add feedback-digest-state.json for hourly digest routine (O6) ([#188](https://github.com/subagentceo/knowledge-engineering/issues/188)) ([2057d79](https://github.com/subagentceo/knowledge-engineering/commit/2057d79acc10015c9eb77a6acb0938ac460aaa8b))
* **routines:** ci-healer /loop routine for flake-rerun + real-escalation (O8) ([#128](https://github.com/subagentceo/knowledge-engineering/issues/128)) ([5bbe8cc](https://github.com/subagentceo/knowledge-engineering/commit/5bbe8ccf230fbdbe825655d01bfdaa4688c5f41f))
* **routines:** pr-babysitter /loop routine + first remediation (O8) ([#127](https://github.com/subagentceo/knowledge-engineering/issues/127)) ([e5a665d](https://github.com/subagentceo/knowledge-engineering/commit/e5a665ddf19de36bd9e5f3b37dc4bc2a6743e957))
* **routine:** typed zod data model for claude.ai code routines (OR1) ([#169](https://github.com/subagentceo/knowledge-engineering/issues/169)) ([9bc1569](https://github.com/subagentceo/knowledge-engineering/commit/9bc1569cfb94087ca7c9f72b8c1dfb7fc5a36b58))
* **rubric:** A2A latency + tool-call rubric + node:test eval (OA2A2) ([#258](https://github.com/subagentceo/knowledge-engineering/issues/258)) ([095dfa3](https://github.com/subagentceo/knowledge-engineering/commit/095dfa3043a74eb62b8c80c43bf856175cc12a12))
* **rubric:** evaluation matrix + heartbeat tick + conformance test (OPROC1) ([#244](https://github.com/subagentceo/knowledge-engineering/issues/244)) ([b091561](https://github.com/subagentceo/knowledge-engineering/commit/b091561c774181c0513b73a111b1c3f9d376844c))
* **schema:** add allow_urls exact-match field for bare-index URLs (OBLOGS2) ([f34439f](https://github.com/subagentceo/knowledge-engineering/commit/f34439fda2822b6deaef79a4f2c8d67a1e23bbd5))
* **scripts:** audit-neon-extensions.ts + neon-pg18 decision doc (O8) ([#126](https://github.com/subagentceo/knowledge-engineering/issues/126)) ([218d9f1](https://github.com/subagentceo/knowledge-engineering/commit/218d9f1b31c7370d57c168d615093b7a60595fa0))
* **scripts:** mint-neon-api-secret.ts leak-safe NEON_API_KEY rotation (O8) ([#125](https://github.com/subagentceo/knowledge-engineering/issues/125)) ([9fe3507](https://github.com/subagentceo/knowledge-engineering/commit/9fe3507a3efede728b29f3f99385700c2512712b))
* **secrets:** scriptable CF token rotation via long-lived minter (OSEC3) ([#231](https://github.com/subagentceo/knowledge-engineering/issues/231)) ([8299be9](https://github.com/subagentceo/knowledge-engineering/commit/8299be9dbc11f671c9566a5d6e286c5d237031cc))
* **secrets:** three-plane parity table + loud verifier + cloud-audit skill (OSEC1) ([#229](https://github.com/subagentceo/knowledge-engineering/issues/229)) ([a161cde](https://github.com/subagentceo/knowledge-engineering/commit/a161cde4b396953c5f7a94c066330362666dae86))
* **secrets:** two-tier store model + rotation runbook + 1Password-ban test (OSEC2) ([#230](https://github.com/subagentceo/knowledge-engineering/issues/230)) ([fd76f05](https://github.com/subagentceo/knowledge-engineering/commit/fd76f05ee0d512ce295a3753c3c866029d0dac6b))
* **security:** GoogleOSV-only policy + 2 security-review skills (OSL1, OGRS1, OGOS1) ([#178](https://github.com/subagentceo/knowledge-engineering/issues/178)) ([ecb6715](https://github.com/subagentceo/knowledge-engineering/commit/ecb671590c67eef76a76eee95e02320c8f5cc8dd))
* **security:** vendor/osv-scanner/ mirror + v2.3.5 → v2.3.8 + docs/security.md (O1) ([#106](https://github.com/subagentceo/knowledge-engineering/issues/106)) ([52f8f2d](https://github.com/subagentceo/knowledge-engineering/commit/52f8f2d6bf4dfd3b8736a15b0868394e9f86931e))
* **skill:** refresh-claude-oauth (OCI2) ([#171](https://github.com/subagentceo/knowledge-engineering/issues/171)) ([fed5d1a](https://github.com/subagentceo/knowledge-engineering/commit/fed5d1ad16f6d28946aaf57020b00fa4cd803a30))
* **skills:** /routines umbrella over /loop and /schedule ([9afd140](https://github.com/subagentceo/knowledge-engineering/commit/9afd140bf043fd45d7a3a4fb9873c77ce6ff1949))
* **skills:** heartbeat — cross-session orchestrator loop ([b2bb77d](https://github.com/subagentceo/knowledge-engineering/commit/b2bb77d8959688711620de1da402073281feb0f1))
* **skills:** refresh-vendors /schedule template (Phase 5; closes [#9](https://github.com/subagentceo/knowledge-engineering/issues/9)) ([#25](https://github.com/subagentceo/knowledge-engineering/issues/25)) ([277e133](https://github.com/subagentceo/knowledge-engineering/commit/277e1334eed628f0203b361631f7be221c2967e2))
* **subprocessors:** root SUBPROCESSORS.md + Turbopuffer deep citations ([#43](https://github.com/subagentceo/knowledge-engineering/issues/43)) ([23b4ba2](https://github.com/subagentceo/knowledge-engineering/commit/23b4ba2944a8e213f5eafd608bdaccc6a47c32d6))
* **tool-catalog:** typed Messages API tool registry (OJ1) ([#149](https://github.com/subagentceo/knowledge-engineering/issues/149)) ([063c366](https://github.com/subagentceo/knowledge-engineering/commit/063c366781a0ed159a07929d0cb75c4caa3cd29c))
* **turbopuffer:** client + smoke cherry-picked from closed PR [#109](https://github.com/subagentceo/knowledge-engineering/issues/109) (OCP6) ([#202](https://github.com/subagentceo/knowledge-engineering/issues/202)) ([71bd855](https://github.com/subagentceo/knowledge-engineering/commit/71bd85564bd96bad4b0e4d0cb5fa45be5aa9b452))
* **validate:** phase-gates report + validator ([d30f2e8](https://github.com/subagentceo/knowledge-engineering/commit/d30f2e80885a8da22ce8276f51c9993a41a80933))
* **vendor/claude-blog:** Phase 13.C — claude.com/blog mirror (close [#47](https://github.com/subagentceo/knowledge-engineering/issues/47)) (O1) ([#90](https://github.com/subagentceo/knowledge-engineering/issues/90)) ([e4c2f24](https://github.com/subagentceo/knowledge-engineering/commit/e4c2f24faf960237329f8eca027694c8cf9e7f0b))
* **vendor:** consolidate anthropic.com into vendor/anthropic-sitemap/ (OAS1) ([#161](https://github.com/subagentceo/knowledge-engineering/issues/161)) ([cd663ef](https://github.com/subagentceo/knowledge-engineering/commit/cd663efaab6c6a8958fca18ebe27a39a1a68d678))
* **vendor:** Phase 13.D — claude-{customers,plugins,connectors,tutorials} (close [#48](https://github.com/subagentceo/knowledge-engineering/issues/48)) (O1) ([#91](https://github.com/subagentceo/knowledge-engineering/issues/91)) ([a6b1b03](https://github.com/subagentceo/knowledge-engineering/commit/a6b1b03a84211de1b34aa697b9e44c7f48b464cf))
* **vendor:** phase 16 — verified vendor coverage from v2 catalog ([#70](https://github.com/subagentceo/knowledge-engineering/issues/70)) ([12b1929](https://github.com/subagentceo/knowledge-engineering/commit/12b19293571bcedb70a29fa12070f3bdf1598192))
* **verify:** citation-guard + verify:citations script ([b0f2984](https://github.com/subagentceo/knowledge-engineering/commit/b0f2984d555009ea100adce9ed3f2c2a2c9f48a6))
* **verify:** Phase B — c8 coverage + [@tdd](https://github.com/tdd) stage gate (TDD discipline) ([#139](https://github.com/subagentceo/knowledge-engineering/issues/139)) ([a2964c2](https://github.com/subagentceo/knowledge-engineering/commit/a2964c22b50eab5fd2abdb063277b72d26343537))
* **verify:** scripts/verify-project.ts — assert PROJECT.md sections + pending.md freshness (PlanO11) ([#84](https://github.com/subagentceo/knowledge-engineering/issues/84)) ([038caaf](https://github.com/subagentceo/knowledge-engineering/commit/038caaf2a99cbef295102b6b50fbecd1d629a5ee))
* wellarchitected vendor + GitHub-event routine runbook + control-plane ADR (OCP1, OGER1) ([#179](https://github.com/subagentceo/knowledge-engineering/issues/179)) ([c22bcdd](https://github.com/subagentceo/knowledge-engineering/commit/c22bcdd37f7a99c2a6b478863cf1316454d20672)), closes [#76](https://github.com/subagentceo/knowledge-engineering/issues/76) [#77](https://github.com/subagentceo/knowledge-engineering/issues/77)


### Bug Fixes

* **auto-rebase:** redispatch verify+osv after update-branch (OAUTO12, ORC7) ([#228](https://github.com/subagentceo/knowledge-engineering/issues/228)) ([ab090b5](https://github.com/subagentceo/knowledge-engineering/commit/ab090b563453f049217de04fd183f2cc272feecf))
* **ci:** align neon-branch.yml with Neon's official integration sample ([#61](https://github.com/subagentceo/knowledge-engineering/issues/61)) ([e77a793](https://github.com/subagentceo/knowledge-engineering/commit/e77a7932cd9b69c7557eb9eda4f321d1a20ff1e3))
* **ci:** drop --skip-git from osv-scanner scan-args (removed in v2) ([ced5415](https://github.com/subagentceo/knowledge-engineering/commit/ced541577f89ef29657faad42935b72a747d47c4))
* **ci:** set upload-sarif:false until operator enables code-scanning ([7081c30](https://github.com/subagentceo/knowledge-engineering/commit/7081c3096c4e4af8045ae0054722d2a2100c6531))
* **ci:** simplify osv-scanner scan-args; document repo auto-merge toggle ([eb7b872](https://github.com/subagentceo/knowledge-engineering/commit/eb7b8727647624cb7da7eeb88a8949f7f51761ca))
* **citations:** remove operator/ + scripts/ cites; replace A2A.md with phase-0.md (OBLOGF1) ([07e9abf](https://github.com/subagentceo/knowledge-engineering/commit/07e9abfaffaf0aa3099c2e8f9cd073129bac110e))
* **ci:** unblock verify.yml + osv-scanner.yml on PR [#4](https://github.com/subagentceo/knowledge-engineering/issues/4) ([0c3ece2](https://github.com/subagentceo/knowledge-engineering/commit/0c3ece261423cffe9a1568c0d5a2e005fe7dcc59))
* **ci:** use db_url_pooled (correct output name from neondatabase/create-branch-action@v6) ([#60](https://github.com/subagentceo/knowledge-engineering/issues/60)) ([d7b6a32](https://github.com/subagentceo/knowledge-engineering/commit/d7b6a320c7360b659be75fb3b54c120f5cd3fb61))
* **claude-action:** refactor both workflows per upstream docs (OAUTO13) ([#234](https://github.com/subagentceo/knowledge-engineering/issues/234)) ([0bdd45c](https://github.com/subagentceo/knowledge-engineering/commit/0bdd45c77fc4c4c1762a0411801d1ef8122eba24))
* **conventions:** allow internal hyphens in outcome IDs (OAUTO7) ([#194](https://github.com/subagentceo/knowledge-engineering/issues/194)) ([e599817](https://github.com/subagentceo/knowledge-engineering/commit/e599817383b5453a8344d7bee03e9a506eb83c09))
* **conventions:** grandfather pre-convention commits via --since filter (O1) ([#81](https://github.com/subagentceo/knowledge-engineering/issues/81)) ([589f0a4](https://github.com/subagentceo/knowledge-engineering/commit/589f0a44566904b6cd383590f70dff7bdfc576df))
* **crawl:** close anthropics gap — 70 → 1362 docs (multi-source llms_txt_sources) ([#44](https://github.com/subagentceo/knowledge-engineering/issues/44)) ([eec0274](https://github.com/subagentceo/knowledge-engineering/commit/eec0274b6c4410795e1412eab1d96f6521aff668))
* **crawl:** deterministic re-crawl — remove timestamps + sort URLs (OBLOGD1) ([2be7a12](https://github.com/subagentceo/knowledge-engineering/commit/2be7a128dc8ee85337f9763eeac751067020646d)), closes [#261](https://github.com/subagentceo/knowledge-engineering/issues/261)
* **crawler:** add deny_urls + drop claude-sitemap resources indexes (OVS14) ([#168](https://github.com/subagentceo/knowledge-engineering/issues/168)) ([ec85703](https://github.com/subagentceo/knowledge-engineering/commit/ec85703b7770f93950b62b4274f7fc762e7fd2c3))
* **crawler:** isUnchanged also requires destination file present (OAUTO3) ([#197](https://github.com/subagentceo/knowledge-engineering/issues/197)) ([4b7d7ab](https://github.com/subagentceo/knowledge-engineering/commit/4b7d7abfe9fa7d39bbe852690933874065c9972b))
* **crawler:** page_cap=0 sentinel + relative-URL resolution ([#67](https://github.com/subagentceo/knowledge-engineering/issues/67)) ([38210b1](https://github.com/subagentceo/knowledge-engineering/commit/38210b174713431fa8486811c6db2c84df95d323))
* **crawl:** match claude.com Copy-as-markdown fidelity (OBLOGF1) ([0919bff](https://github.com/subagentceo/knowledge-engineering/commit/0919bffdc7537b80a73779a2432cdee05d0a40d0)), closes [#260](https://github.com/subagentceo/knowledge-engineering/issues/260)
* **deps:** bump qs 6.15.2 + ws 8.21.0 to clear OSV-blocking advisories (OSVFIX1) ([024549e](https://github.com/subagentceo/knowledge-engineering/commit/024549eb7710c17a907f8ae956027864b12f254a))
* **deps:** override transitive @anthropic-ai/sdk to fixed range (GHSA-p7fg-763f-g4gf) ([3a24875](https://github.com/subagentceo/knowledge-engineering/commit/3a2487569d5c9eb18824f1ee227f24c5d4234355))
* **elevenlabs:** hard-reset checksums+tree → 60 .mdx files crawl (OVS3) ([#186](https://github.com/subagentceo/knowledge-engineering/issues/186)) ([8202d7f](https://github.com/subagentceo/knowledge-engineering/commit/8202d7f27c41562487da0eb8fd07407a3f43136c))
* **gcp-crawl:** allow_prefixes covers &lt;topic&gt;/docs/ topology (OVS4) ([#203](https://github.com/subagentceo/knowledge-engineering/issues/203)) ([30b6428](https://github.com/subagentceo/knowledge-engineering/commit/30b64281194b1563543783a0baf1f8ffe7ec4962))
* **governance:** drop unsupported ruleset param + use allowed_merge_methods (O8) ([#135](https://github.com/subagentceo/knowledge-engineering/issues/135)) ([d8909bb](https://github.com/subagentceo/knowledge-engineering/commit/d8909bb5cf408826dd1f0fd33d1e0f6272a304fd))
* **mcp-vendor:** walkMd includes .mdx so elevenlabs is greppable (OVS3-FU) ([#187](https://github.com/subagentceo/knowledge-engineering/issues/187)) ([e1c4960](https://github.com/subagentceo/knowledge-engineering/commit/e1c49603215af61fa607bad31b89fb3c340a1417))
* **neon:** retry on WebSocket cold-start race in migrate-neon ([#69](https://github.com/subagentceo/knowledge-engineering/issues/69)) ([75681a3](https://github.com/subagentceo/knowledge-engineering/commit/75681a3d41d50f030a93432c0cd62682f19661ea))
* **neon:** wire ws constructor — actual root cause of WebSocket failures ([#72](https://github.com/subagentceo/knowledge-engineering/issues/72)) ([3855a1d](https://github.com/subagentceo/knowledge-engineering/commit/3855a1d8dc06893dcdd581fda40a7625bff3c529))
* **osv-scanner:** scan-pr runs on workflow_dispatch so redispatch satisfies the gate (OAUTO14) ([#237](https://github.com/subagentceo/knowledge-engineering/issues/237)) ([7339321](https://github.com/subagentceo/knowledge-engineering/commit/73393214fa307318cafda30657ecd0f2bfd89ffa))
* **test:** add [@tdd](https://github.com/tdd) green tag to blog-extract-fidelity (OBLOGE1) ([f051402](https://github.com/subagentceo/knowledge-engineering/commit/f0514029a0ddefb51bceaf91c843e08040046d72))
* **tests:** add [@tdd](https://github.com/tdd) + satisfy citation-guard (OBLOGD1) ([28f36bb](https://github.com/subagentceo/knowledge-engineering/commit/28f36bb13996eac1fce9a037e0188afa2c04bb23))
* **tests:** add [@tdd](https://github.com/tdd) green tag to blog-extract-fidelity (OBLOGF1) ([79b2d95](https://github.com/subagentceo/knowledge-engineering/commit/79b2d955e18adfa347c01caaafa0d5b77233a403))
* **tests:** exempt bot PRs from conventions + accept codeql v3 or v4 (OCIFIX1) ([ccfff5c](https://github.com/subagentceo/knowledge-engineering/commit/ccfff5c5a8173ff30ffa55624ef5e59458868d28))
* **tests:** satisfy citation-guard for blog-extract-fidelity (OBLOGE1) ([62f0474](https://github.com/subagentceo/knowledge-engineering/commit/62f0474952f0ba7c2a0291d6155dc09c76af54a9))
* **tests:** update round-trip test for fetchedAt strip (OBLOGD1) ([adcf27a](https://github.com/subagentceo/knowledge-engineering/commit/adcf27ae335956d598b090beebd1fd9427cb9c1e))
* **vendor/claude-tutorials:** sitemap-based discovery yields 118 pages (O1) ([#98](https://github.com/subagentceo/knowledge-engineering/issues/98)) ([be5ff59](https://github.com/subagentceo/knowledge-engineering/commit/be5ff59470283b2cb6430b9654354c573dc5c7ec))
* **vendor/sift:** broaden allowlist to sift.com + crawl 100 pages (close [#39](https://github.com/subagentceo/knowledge-engineering/issues/39) follow-up) (O1) ([#87](https://github.com/subagentceo/knowledge-engineering/issues/87)) ([686b553](https://github.com/subagentceo/knowledge-engineering/commit/686b553473015aebabd165761976b6a49e2816ce))
* **vendor:** empty/broken mirrors — sentry, twilio, elevenlabs, gcp (OVS1-4) ([#163](https://github.com/subagentceo/knowledge-engineering/issues/163)) ([02965ab](https://github.com/subagentceo/knowledge-engineering/commit/02965ab8f3034e85b6223b8a3064454bb68a8213))
* **vendor:** parallel-web + openfeature content quality (OVS9-10) ([#165](https://github.com/subagentceo/knowledge-engineering/issues/165)) ([41c7b76](https://github.com/subagentceo/knowledge-engineering/commit/41c7b76ebf264de2867b0a0fe046755a20c6ff25))
* **vendor:** plugin-page nav dump + anthropic PDF lane (OVS12-13, spot-check followups) ([#167](https://github.com/subagentceo/knowledge-engineering/issues/167)) ([3de1d13](https://github.com/subagentceo/knowledge-engineering/commit/3de1d1363463dda46cc3e5999200bb0c3ff6c5f5))
* **vendor:** selector + transform tuning for arkose-labs, sift, osv-scanner, intercom (OVS5-8) ([#164](https://github.com/subagentceo/knowledge-engineering/issues/164)) ([91e8fad](https://github.com/subagentceo/knowledge-engineering/commit/91e8fadf408e90d6d099ade06a6b24ddfa65f64c))


### Documentation

* add PRODUCTRD.md positioning the repo as a starter chassis for solo AI founders ([4938028](https://github.com/subagentceo/knowledge-engineering/commit/4938028101fe3ea13b7078f44152e72a7fff23a4))
* **adr:** adopt managed-agents strategies — dreams, outcomes, multi-session (OMA1) ([#206](https://github.com/subagentceo/knowledge-engineering/issues/206)) ([e42bec1](https://github.com/subagentceo/knowledge-engineering/commit/e42bec16a9da7bbd2a4a58d746574800e4e3a7bd))
* **adr:** adopt Messages API + thinking + tools strategies (OMSG1) ([#208](https://github.com/subagentceo/knowledge-engineering/issues/208)) ([40be6e6](https://github.com/subagentceo/knowledge-engineering/commit/40be6e684ab9abe9554f428e3c90377cc5dbd826))
* **adr:** glossary alignment — chassis terms vs Anthropic glossary (OREF1) ([#216](https://github.com/subagentceo/knowledge-engineering/issues/216)) ([8ca1ed3](https://github.com/subagentceo/knowledge-engineering/commit/8ca1ed3d87572e99f07a65d949b05dc5139c0667))
* **adr:** guardrails audit — consistency/jailbreak/prompt-leak (OBP2) ([#221](https://github.com/subagentceo/knowledge-engineering/issues/221)) ([99f2a29](https://github.com/subagentceo/knowledge-engineering/commit/99f2a29b7f02d887352b5495fac61303133ff4b2))
* **adr:** managed-agents github-pattern mapping to chassis routines (OMA3) ([#214](https://github.com/subagentceo/knowledge-engineering/issues/214)) ([1c00cae](https://github.com/subagentceo/knowledge-engineering/commit/1c00cae0a724da021dfcaea0d2907bc935f75f8c))
* **adr:** managed-agents memory mapping to chassis stores (OMA5) ([#215](https://github.com/subagentceo/knowledge-engineering/issues/215)) ([e75f0a0](https://github.com/subagentceo/knowledge-engineering/commit/e75f0a084f0447d1dc1473133b3e5c961493446b))
* **adr:** merge-train serialization — strict checks + auto-rebase (OAUTO8) ([#199](https://github.com/subagentceo/knowledge-engineering/issues/199)) ([803afd4](https://github.com/subagentceo/knowledge-engineering/commit/803afd4fc2b148f4fef0675cc55f0bc44878b63a))
* **adr:** NOT-ADOPT MA files — chassis vendor/ + git is more debuggable (OMA4) ([#217](https://github.com/subagentceo/knowledge-engineering/issues/217)) ([93ffa19](https://github.com/subagentceo/knowledge-engineering/commit/93ffa196ea717571111c2ffa375429dbbc234206))
* **adr:** orchestrator plugin strategy — monitoring + builder layer (OPLUG2) ([121dde7](https://github.com/subagentceo/knowledge-engineering/commit/121dde70eb697eb14b4085d77df6ea8aad5957d3))
* **adr:** per-invocation docker --context for concurrent-agent safety (OCTX1) ([5fc9fcc](https://github.com/subagentceo/knowledge-engineering/commit/5fc9fcc4270e700ed617b31f5920d51479a38603))
* **adr:** reduce-hallucinations audit + 5 chassis-side deltas (OBP1) ([#220](https://github.com/subagentceo/knowledge-engineering/issues/220)) ([7503a96](https://github.com/subagentceo/knowledge-engineering/commit/7503a9696dc295595d1832862c13294cce194023))
* **architecture:** operator posture, account ledger, cloud-agents section ([44fcf86](https://github.com/subagentceo/knowledge-engineering/commit/44fcf86d68c017ade0798437a5c8f64ed34f3a51))
* **citations:** spotify-confidence SDK ecosystem inventory (O1) ([#77](https://github.com/subagentceo/knowledge-engineering/issues/77)) ([4205021](https://github.com/subagentceo/knowledge-engineering/commit/42050218ea4fcb3a4c724aeecd53ffe9cd81af1a))
* **claude-md:** link load-bearing ADRs into See also (OCP2) ([#185](https://github.com/subagentceo/knowledge-engineering/issues/185)) ([a93e1bf](https://github.com/subagentceo/knowledge-engineering/commit/a93e1bf5199032443445c203fe0d783b8904f449))
* **claude:** add agent-to-agent writing-style directive + session handoff (OA2A1) ([#254](https://github.com/subagentceo/knowledge-engineering/issues/254)) ([2efda2d](https://github.com/subagentceo/knowledge-engineering/commit/2efda2d01ec8f7f9e408d4264db5b22d5344ae3b))
* **closeout:** session summary + Phase 12 rubric metadata ([#31](https://github.com/subagentceo/knowledge-engineering/issues/31)) ([7524364](https://github.com/subagentceo/knowledge-engineering/commit/7524364693eedcd1422ee109465682f4064956d7))
* **conventions:** outcome-driven Conventional-Commits + PR-issue linkage (O1+O2+O3) ([#76](https://github.com/subagentceo/knowledge-engineering/issues/76)) ([304e231](https://github.com/subagentceo/knowledge-engineering/commit/304e23112d04bf5d1eff1a8c895f70c89f9289d3))
* **followup:** AlloyDB Omni decomp + agent-skills ecosystem research ([#173](https://github.com/subagentceo/knowledge-engineering/issues/173)) ([3a78389](https://github.com/subagentceo/knowledge-engineering/commit/3a78389206c304b7b14a025e7ea76c1294355433))
* **followup:** merge-velocity + AI-workflow audit (OAUTO0) ([#189](https://github.com/subagentceo/knowledge-engineering/issues/189)) ([f7912bc](https://github.com/subagentceo/knowledge-engineering/commit/f7912bcd51b661b8080e04a166b879db014d7913))
* **gates:** mark 'Allow auto-merge' operator action DONE ([#18](https://github.com/subagentceo/knowledge-engineering/issues/18)) ([442bbea](https://github.com/subagentceo/knowledge-engineering/commit/442bbea30082fb75aec22bf5163ca9d245fa0d48))
* **handoffs:** m2m seed for managed-agents-on-cloudflare-miniflare (OMACF0) ([#249](https://github.com/subagentceo/knowledge-engineering/issues/249)) ([bcbd587](https://github.com/subagentceo/knowledge-engineering/commit/bcbd58724b261992e3e9f0ea2f8a5293b23d4573))
* **handoff:** update with OAUTONOMY1 contract + outcome-ID registry (OHANDOFF1) ([157bd80](https://github.com/subagentceo/knowledge-engineering/commit/157bd80c4edb29d8d683739e0480b3e5298f359f))
* **operator:** version-control 3 canary reference files (OOPSREF1) ([12a4553](https://github.com/subagentceo/knowledge-engineering/commit/12a4553dbde27e18a07b730c8a1ef63adec36564))
* **orchestrator:** 3 paste-prompts for vendor bootstrap dispatch (OCP3) ([#247](https://github.com/subagentceo/knowledge-engineering/issues/247)) ([318f8d8](https://github.com/subagentceo/knowledge-engineering/commit/318f8d803e6a5c747f28edc2a646999c76b1b5ae))
* **orchestrator:** 5 subagent prompts for ci-fixer/citation/runbook/smoke/vendor (OCP4) ([#250](https://github.com/subagentceo/knowledge-engineering/issues/250)) ([a992f9e](https://github.com/subagentceo/knowledge-engineering/commit/a992f9e36e2c57b289417abadc45c098bab19987))
* **orchestrator:** 8 paste-prompts + subagent prompts cherry-picked from [#109](https://github.com/subagentceo/knowledge-engineering/issues/109) (OCP3+OCP4) ([#155](https://github.com/subagentceo/knowledge-engineering/issues/155)) ([92617cc](https://github.com/subagentceo/knowledge-engineering/commit/92617ccfa13c0429d73afad1bf160b9d60c7a35f))
* **phase-14:** CLAUDE.md + DEVELOPER.md (close [#49](https://github.com/subagentceo/knowledge-engineering/issues/49) final piece) (O1+O2) ([#92](https://github.com/subagentceo/knowledge-engineering/issues/92)) ([aa14f90](https://github.com/subagentceo/knowledge-engineering/commit/aa14f90cebba2b254563a4eab9af748da3dc33e8))
* **phase-14:** decompose Neon MCP + multi-platform Claude rollout ([#62](https://github.com/subagentceo/knowledge-engineering/issues/62)) ([edc871c](https://github.com/subagentceo/knowledge-engineering/commit/edc871c4f5ec91ed23e77a9a3e430c0f31defc78))
* **phase-14:** refresh README.md for current chassis state (O1) ([#99](https://github.com/subagentceo/knowledge-engineering/issues/99)) ([05a38a0](https://github.com/subagentceo/knowledge-engineering/commit/05a38a085a56a2be8ee1d9fcc9c084fa2073d0f8)), closes [#49](https://github.com/subagentceo/knowledge-engineering/issues/49)
* **phase-14:** RUNBOOK.md + CONTRIBUTING.md + cwc-awareness seed (close [#49](https://github.com/subagentceo/knowledge-engineering/issues/49) partial) (O1) ([#89](https://github.com/subagentceo/knowledge-engineering/issues/89)) ([7b54520](https://github.com/subagentceo/knowledge-engineering/commit/7b545204eb50035eadfe9c919a3d6740527db486))
* **phase-1:** closeout — mark all 4 criteria DONE; Phase 2 ready ([#21](https://github.com/subagentceo/knowledge-engineering/issues/21)) ([6dd40f3](https://github.com/subagentceo/knowledge-engineering/commit/6dd40f32207c5459409a80af70e772979e2f145f))
* **plans:** 2026-05-15 continuation plan (PlanO10) ([#85](https://github.com/subagentceo/knowledge-engineering/issues/85)) ([c254f64](https://github.com/subagentceo/knowledge-engineering/commit/c254f64cc076c20f26f7851b0ae2a22fbebf2a4d))
* **plans:** Boris Cherny posture refactor plan — 7 phases A–G (O1) ([#137](https://github.com/subagentceo/knowledge-engineering/issues/137)) ([19e461a](https://github.com/subagentceo/knowledge-engineering/commit/19e461ab3b5af1b195546c7ce71bdc90bf26711a))
* **playbook:** CLI-only unblock workarounds — bypass Claude-in-Chrome (O1) ([#107](https://github.com/subagentceo/knowledge-engineering/issues/107)) ([6bb78a2](https://github.com/subagentceo/knowledge-engineering/commit/6bb78a2059c2db229e3e44a49da8245576371ac1))
* **playbook:** unblock-sequence — sequenced operator runbook for 10 open issues (O1) ([#101](https://github.com/subagentceo/knowledge-engineering/issues/101)) ([1bd6523](https://github.com/subagentceo/knowledge-engineering/commit/1bd65236c543a1f3e68e7d20c6570a4eebb33bac))
* **research:** AI Ascent 2026 playlist index + transcript-tool research (OYT1) ([#207](https://github.com/subagentceo/knowledge-engineering/issues/207)) ([65a512f](https://github.com/subagentceo/knowledge-engineering/commit/65a512ff8c7932814d1ffe019b4b18a79d87c52f))
* **rubric:** author rubrics/phase-BLOG.md for OBLOG outcome (OBLOGB1) ([37a15ad](https://github.com/subagentceo/knowledge-engineering/commit/37a15ad7173405032db3f945dff7a820d08297fc)), closes [#263](https://github.com/subagentceo/knowledge-engineering/issues/263)
* **runbook:** operator workflow for /claude-api migrate model bumps (OAPI2) ([#218](https://github.com/subagentceo/knowledge-engineering/issues/218)) ([c392657](https://github.com/subagentceo/knowledge-engineering/commit/c392657bd849bf2d2d006983b5bf5818fcaee6e1))
* **runbooks:** ci-cd-unblock.md one-shot paste-block for full CI/CD unblock (O8) ([#124](https://github.com/subagentceo/knowledge-engineering/issues/124)) ([17bf37b](https://github.com/subagentceo/knowledge-engineering/commit/17bf37be052e528a7951fdc72ad0ab5d7c49af8f))
* **runbooks:** claude-in-chrome paste-prompt runbooks (Phase 12 closeout) ([#32](https://github.com/subagentceo/knowledge-engineering/issues/32)) ([95f4c31](https://github.com/subagentceo/knowledge-engineering/commit/95f4c3186988161e1b54787d50ad4da15aa1180a))
* **runbooks:** cloud-env-vars-contract canonical inventory (OCP2) ([#154](https://github.com/subagentceo/knowledge-engineering/issues/154)) ([58f8afd](https://github.com/subagentceo/knowledge-engineering/commit/58f8afd887abfe8594d205103cc94a01a592f467))
* **runbooks:** neon secrets/vars matrix — answer operator's audit ask ([#75](https://github.com/subagentceo/knowledge-engineering/issues/75)) ([6376ee9](https://github.com/subagentceo/knowledge-engineering/commit/6376ee9916dcf31f0fb5ff31a128a18d4976ffe8))
* **security:** OSV-Scanner is the chosen vuln gate; close [#36](https://github.com/subagentceo/knowledge-engineering/issues/36) as won't-fix (O1) ([#105](https://github.com/subagentceo/knowledge-engineering/issues/105)) ([ebe8bd7](https://github.com/subagentceo/knowledge-engineering/commit/ebe8bd718a5b541126a77ffe89904fcf0c6326ab))
* **sessions:** journal for 2026-05-17/18 secrets + plugin dogfood (OCP3) ([#236](https://github.com/subagentceo/knowledge-engineering/issues/236)) ([5659180](https://github.com/subagentceo/knowledge-engineering/commit/56591809061a2f85c35c16f80ac4f23225ec9682))
* **snapshots:** stable tag — Phase 13.B+ closeout + Web platform context ([#59](https://github.com/subagentceo/knowledge-engineering/issues/59)) ([eec648a](https://github.com/subagentceo/knowledge-engineering/commit/eec648ae0db0c55dcd5bc3d4d05e650be71151d7))
* sync references to post-consolidation vendor layout (ODOC1) ([#162](https://github.com/subagentceo/knowledge-engineering/issues/162)) ([262f54b](https://github.com/subagentceo/knowledge-engineering/commit/262f54b145df52d4e12ad7ec37c1b62b730001ae))


### Chores

* **ci:** disable Copilot PR feedback + add cloud-bringup decomposition (O1) ([#136](https://github.com/subagentceo/knowledge-engineering/issues/136)) ([44fd1fc](https://github.com/subagentceo/knowledge-engineering/commit/44fd1fcf785a709afa90b52aecf303039892dea9))
* **citations:** ingest batch-processing.md (pull + extract) ([029dbb7](https://github.com/subagentceo/knowledge-engineering/commit/029dbb7f1a0f29bce0a5ed950e6858a420230490))
* **citations:** ingest build-a-tool-using-agent.md (pull + extract) ([53efcb8](https://github.com/subagentceo/knowledge-engineering/commit/53efcb889d0c9d65bef5d91191455ef8a32b2a5f))
* **citations:** ingest code-execution-tool.md (pull + extract) ([0b651d9](https://github.com/subagentceo/knowledge-engineering/commit/0b651d9a23aabb438b2c28481ef283b4506a3f10))
* **citations:** ingest commands.md (pull + extract) ([38bc731](https://github.com/subagentceo/knowledge-engineering/commit/38bc731704acfb61b0908102ff2314b22491cab5))
* **citations:** ingest connectors-building.md (pull + extract) ([31e17ac](https://github.com/subagentceo/knowledge-engineering/commit/31e17ac9d7c169d74907f2ecc7c350cf366f7eab))
* **citations:** ingest define-outcomes.md (pull + extract) ([2c4de80](https://github.com/subagentceo/knowledge-engineering/commit/2c4de80c60376b59950bca08cb28c3c1d170c532))
* **citations:** ingest dreams.md (pull + extract) ([adcae22](https://github.com/subagentceo/knowledge-engineering/commit/adcae2293d182ac2f69727ac7e4241879149019a))
* **citations:** ingest embeddings.md (pull + extract) ([cc66463](https://github.com/subagentceo/knowledge-engineering/commit/cc66463549e62961cdd3fd1a44abeb329c216e9b))
* **citations:** ingest memory.md (pull + extract) ([24016fb](https://github.com/subagentceo/knowledge-engineering/commit/24016fb509bfc72b8303b43a7e38855855594e57))
* **citations:** ingest multi-agent.md (pull + extract) ([092229e](https://github.com/subagentceo/knowledge-engineering/commit/092229e7a8d26cbdd3c62e72f7f2561a9fa7e327))
* **citations:** ingest programmatic-tool-calling.md (pull + extract) ([0700cbe](https://github.com/subagentceo/knowledge-engineering/commit/0700cbe3e63eb1927659940f20bc70646f2e083a))
* **citations:** ingest slash-commands.md (pull + extract) ([3603bf9](https://github.com/subagentceo/knowledge-engineering/commit/3603bf94a2e8644c3d61aff5dd86368dec867a15))
* **citations:** pull cloudflare-sandbox-neon-branching.md ([94afcac](https://github.com/subagentceo/knowledge-engineering/commit/94afcac36efaf2ca8bd2b7363d3a85f5434e2bfe))
* **claude:** untrack .claude/scheduled_tasks.lock + add to .gitignore (OLOCK1) ([#252](https://github.com/subagentceo/knowledge-engineering/issues/252)) ([c04c8c6](https://github.com/subagentceo/knowledge-engineering/commit/c04c8c6773687c3b8bf1475a30338bd1a6dae800))
* **crawl:** expand allow_prefixes per sitemap audit (OBLOGS1) ([1d184b4](https://github.com/subagentceo/knowledge-engineering/commit/1d184b45b08312735a6552a1582da85e20e783f9))
* **heartbeat:** tick 12 record — session-end wrap (15 PRs, 8 issues closed) (O1) ([#93](https://github.com/subagentceo/knowledge-engineering/issues/93)) ([8a3d2d4](https://github.com/subagentceo/knowledge-engineering/commit/8a3d2d47a5570281fe1255d6cf273f99eca1628d))
* **heartbeat:** tick 13 — autonomous queue sweep wrap ([#100](https://github.com/subagentceo/knowledge-engineering/issues/100)) ([74790a0](https://github.com/subagentceo/knowledge-engineering/commit/74790a01ec61c3d478fd9e60470374ef86975559))
* **heartbeat:** tick 7 — auto-merge audit + Neon end-to-end win ([#73](https://github.com/subagentceo/knowledge-engineering/issues/73)) ([57d4842](https://github.com/subagentceo/knowledge-engineering/commit/57d4842c287a9ce95d50d1038f1bf61019603cfe))
* **heartbeat:** turn on — bootstrap seeds/memory/heartbeat/ ([#66](https://github.com/subagentceo/knowledge-engineering/issues/66)) ([7dcfa8f](https://github.com/subagentceo/knowledge-engineering/commit/7dcfa8f1a04376234a4885acba17f772dac42e5e))
* **hygiene:** Phase G batch 1 — phase-14 rubric backfill + delete copilot.yml ([#142](https://github.com/subagentceo/knowledge-engineering/issues/142)) ([f2070df](https://github.com/subagentceo/knowledge-engineering/commit/f2070df389681fdf0c3bd97149779b236720d5b0))
* **plugins:** project-scope 9 plugins for orchestrator autonomy (OPLUG1) ([36d61ab](https://github.com/subagentceo/knowledge-engineering/commit/36d61ab4b9ca4e158f13a05dfdcab8042acf0a81))
* **plugins:** rebind 9 plugins to subagentceo-overlay marketplace (OPLUG3) ([ba1e49d](https://github.com/subagentceo/knowledge-engineering/commit/ba1e49d0ad4e456aa3a9741012bda23a0d45a092))
* **rubrics:** seed phase-{0..12}.md outcome rubrics ([1acfa21](https://github.com/subagentceo/knowledge-engineering/commit/1acfa219a72c32d646dcabe3fa629e350de53294))
* **scan:** exclude third_party/ from git + OSV scans (OHYG1) ([#239](https://github.com/subagentceo/knowledge-engineering/issues/239)) ([807597f](https://github.com/subagentceo/knowledge-engineering/commit/807597f5ba04f9fa58707c522631bd1e4b6b0c03))
* **scripts:** wire verify:gates, install:plugins, setup:project ([2b52c93](https://github.com/subagentceo/knowledge-engineering/commit/2b52c9344a41e2d3f45f432fcf61e46212ff8e49))
* **seeds:** operator autonomy directive (2026-05-10 fourth turn) ([0b813cd](https://github.com/subagentceo/knowledge-engineering/commit/0b813cd14d47231008ae137bef025ed2f2f7031e))
* **seeds:** operator heartbeat directive (2026-05-10 third turn) ([d85a8d4](https://github.com/subagentceo/knowledge-engineering/commit/d85a8d42444e8f6096686d3bd9bf932a092ebb58))
* **seeds:** operator prompts (2026-05-10 + Neon followup) ([5a474ea](https://github.com/subagentceo/knowledge-engineering/commit/5a474ea1835252323d543a3c3b2969d50a6fa491))
* **seeds:** session-start posture XML ([7ff4b70](https://github.com/subagentceo/knowledge-engineering/commit/7ff4b70466762d8e7af43286f4b7e765ca601509))
* **session:** deterministic PR-task template + permission allowlist (OSESS1) ([b38d7e0](https://github.com/subagentceo/knowledge-engineering/commit/b38d7e0b638f0d3911e9be6c8a6a96c1a5ee537a))
* **settings:** union PR [#174](https://github.com/subagentceo/knowledge-engineering/issues/174)'s SessionStart hook with OPLUG1 allowlist (OSESS1, OKWP2) ([e6235cc](https://github.com/subagentceo/knowledge-engineering/commit/e6235cca8cd37ed438cf7bba2c55b3a22f1456db))
* **vendor:** phase 16.B final content — brave-search + iterable + gcp [tick 8] (O1) ([#74](https://github.com/subagentceo/knowledge-engineering/issues/74)) ([e0ace56](https://github.com/subagentceo/knowledge-engineering/commit/e0ace56447730180f9a58280b141ab0754adc710)), closes [#80](https://github.com/subagentceo/knowledge-engineering/issues/80)
* **vendor:** phase 16.B partial content re-sync — 5 of 8 vendors [tick 6] (O1) ([#71](https://github.com/subagentceo/knowledge-engineering/issues/71)) ([5d4fc35](https://github.com/subagentceo/knowledge-engineering/commit/5d4fc35baef84c9d85970826e99bd0a17512791b)), closes [#80](https://github.com/subagentceo/knowledge-engineering/issues/80)
* **vendor:** re-sync — add workos + elevenlabs, refresh 7 vendors ([#64](https://github.com/subagentceo/knowledge-engineering/issues/64)) ([b6358ab](https://github.com/subagentceo/knowledge-engineering/commit/b6358ab3c616a79be3ce85e24ac1c5f0b9e63cc4))

## [0.1.0] - 2026-05-09

### Features

- Four-lane knowledge bridge MCP server on MCP SDK v2
  (`src/mcp/bridge-server.ts`) with one lane module per source:
  - `anthropic.com/engineering` (`engineering_index`, `engineering_fetch`,
    `engineering_search`)
  - `claude.com/blog` (`blog_index`, `blog_fetch`, `blog_search`)
  - `support.claude.com` (`support_collections`, `support_collection`,
    `support_article`)
  - `llms.txt` namespaces (`llms_namespaces`, `llms_fetch`, `llms_grep`)
- Claude Agent SDK orchestrator (`src/agent/run.ts`) with one sub-agent per
  bridge; each sub-agent's tool surface is restricted to its lane.
- OAuth-only auth gate (`src/oauth/token.ts`): refuses to run if
  `ANTHROPIC_API_KEY` is set or no OAuth token is provided.
- Seed prompts in `seeds/prompts/` for the orchestrator and four bridge
  sub-agents.
- Mintlify documentation site (`docs/`) with one page per bridge plus
  reference pages for the MCP server, orchestrator, and OAuth contract.
- Session artifact (`docs/session-artifact.md`): how the original ten
  tool-family decomposition was rotated into four content-source bridges.

### Chores

- `release-please` configured for automated CHANGELOG + version bumps.
