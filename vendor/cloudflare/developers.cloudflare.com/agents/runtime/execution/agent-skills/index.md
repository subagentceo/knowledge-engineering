---
title: Agent Skills
description: Give an agent a catalog of on-demand instructions, resources, and scripts with agents/skills, activated by the model only when a task matches.
image: https://developers.cloudflare.com/dev-products-preview.png
---

> Documentation Index  
> Fetch the complete documentation index at: https://developers.cloudflare.com/agents/llms.txt  
> Use this file to discover all available pages before exploring further.

[Skip to content](#%5Ftop) 

# Agent Skills

Agent Skills are on-demand instructions, resources, and scripts. A skill source provides a catalog of skill names and descriptions; the agent adds that catalog to the system prompt and exposes tools the model can use when a user task matches a skill — so a large library of capabilities does not bloat every prompt.

Note

Agent Skills are experimental, and script execution in particular is early. The API may change in a future release.

The skills engine lives in `agents/skills` and is framework-agnostic, so any agent (including a plain [AIChatAgent](https://developers.cloudflare.com/agents/communication-channels/chat/chat-agents/) `onChatMessage`) can build a `SkillRegistry`. [@cloudflare/think](https://developers.cloudflare.com/agents/harnesses/think/) re-exports it as the `skills` namespace and wires `getSkills()` into the turn automatically.

## Using skills with Think

Bundled skills are usually imported with the Agents Vite plugin:

* [  JavaScript ](#tab-panel-6017)
* [  TypeScript ](#tab-panel-6018)

JavaScript

```

import { Think, skills } from "@cloudflare/think";

import bundledSkills from "agents:skills"; // resolves to ./skills next to this file


export class MyAgent extends Think {

  getSkills() {

    return [

      bundledSkills,

      skills.r2(this.env.SKILLS_BUCKET, { prefix: "skills/" }),

    ];

  }


  getSkillScriptRunner() {

    return skills.runner({

      loader: this.env.LOADER,

      workspaceInstance: this.workspace,

    });

  }

}


```

TypeScript

```

import { Think, skills } from "@cloudflare/think";

import bundledSkills from "agents:skills"; // resolves to ./skills next to this file


type Env = {

  AI: Ai;

  LOADER: WorkerLoader;

  SKILLS_BUCKET: R2Bucket;

};


export class MyAgent extends Think<Env> {

  getSkills() {

    return [

      bundledSkills,

      skills.r2(this.env.SKILLS_BUCKET, { prefix: "skills/" }),

    ];

  }


  getSkillScriptRunner() {

    return skills.runner({

      loader: this.env.LOADER,

      workspaceInstance: this.workspace,

    });

  }

}


```

`agents:skills` resolves to a `./skills` directory next to the importing file; use `agents:skills/<dir>` to point at a differently named sibling directory. The `agents:skills` import is typed by ambient declarations that ship with `agents`, so importing `Think` in the same file brings the type into scope (for a file that imports only the specifier, add `/// <reference types="agents/skills-module" />`). If you are not using the Agents Vite plugin, build a source with `skills.fromManifest(...)` instead.

Sources are applied in order; the first source to register a skill name wins, and later duplicates (or a source that fails to load) are skipped with a logged warning rather than failing the agent.

The imported directory should contain one child directory per skill:

```

src/skills/release-notes/SKILL.md

src/skills/release-notes/scripts/format-release-notes.ts

src/skills/release-notes/references/style-guide.md


```

## Skill tools

When skills are available, the agent exposes:

| Tool                  | Purpose                                                           |
| --------------------- | ----------------------------------------------------------------- |
| activate\_skill       | Load a matching skill's instructions and bundled resource list    |
| read\_skill\_resource | Read a bundled resource by { name, path } or skill-name/path      |
| run\_skill\_script    | Run a bundled script when getSkillScriptRunner() returns a runner |

Skills are not always-on system prompt text. Use `getSystemPrompt()` or a Session context block for behavior that should apply to every turn. Use skills for task-specific procedures, references, scripts, templates, and assets that should be loaded only when relevant.

## Script execution

Script execution is opt-in and requires a Worker Loader binding:

* [  wrangler.jsonc ](#tab-panel-6011)
* [  wrangler.toml ](#tab-panel-6012)

JSONC

```

{

  "worker_loaders": [{ "binding": "LOADER" }]

}


```

TOML

```

[[worker_loaders]]

binding = "LOADER"


```

`skills.runner()` is experimental and runs JavaScript, TypeScript, Python, and Bash scripts under `scripts/`. TypeScript is compiled with `@cloudflare/worker-bundler`; Python runs as Python Dynamic Workers; Bash runs through `just-bash`.

JavaScript and TypeScript scripts are function-style:

* [  JavaScript ](#tab-panel-6013)
* [  TypeScript ](#tab-panel-6014)

JavaScript

```

export default async function run(input, ctx) {

  const guide = ctx.files["references/style-guide.md"]; // bundled text resources

  const docs = await ctx.workspace.readFile("README.md"); // gated by permission

  const summary = await ctx.tools.call("summarize", { input }); // explicit tools

  await ctx.output.writeFile("notes.md", summary); // scratch artifact

  return { ok: true };

}


```

TypeScript

```

import type { SkillRunContext } from "@cloudflare/think";


export default async function run(input: unknown, ctx: SkillRunContext) {

  const guide = ctx.files["references/style-guide.md"]; // bundled text resources

  const docs = await ctx.workspace.readFile("README.md"); // gated by permission

  const summary = await ctx.tools.call("summarize", { input }); // explicit tools

  await ctx.output.writeFile("notes.md", summary); // scratch artifact

  return { ok: true };

}


```

`ctx` is `{ skill, files, workspace, tools, output }`. `ctx.files` holds bundled text resources by relative path, `ctx.workspace` is gated by the workspace permission, `ctx.tools` only exposes tools the runner was given, and `ctx.output.writeFile(name, content)` returns scratch artifacts to the model (it does not mutate the workspace). Python and Bash use the path-based contract instead: `/input.json`, `/context.json`, bundled resources under `/skill`, and `/output` for artifacts.

Passing `workspaceInstance` gives scripts read-only workspace access by default. Network access, tools, and workspace writes are opt-in. The default timeout is 30 seconds.

## Example

* [  JavaScript ](#tab-panel-6015)
* [  TypeScript ](#tab-panel-6016)

JavaScript

```

import { Think, skills } from "@cloudflare/think";


export class SkillsAgent extends Think {

  getSkills() {

    return [skills.r2(this.env.SKILLS_BUCKET, { prefix: "skills/" })];

  }

}


```

TypeScript

```

import { Think, skills } from "@cloudflare/think";


export class SkillsAgent extends Think<Env> {

  getSkills() {

    return [skills.r2(this.env.SKILLS_BUCKET, { prefix: "skills/" })];

  }

}


```

Refer to the [agent-skills example ↗](https://github.com/cloudflare/agents/tree/main/examples/agent-skills) for bundled skills, R2-backed skills, and script execution.

## Related

* [Think](https://developers.cloudflare.com/agents/harnesses/think/) — wires `getSkills()` and `getSkillScriptRunner()` into the agentic loop
* [Think tools](https://developers.cloudflare.com/agents/harnesses/think/tools/) — how skill tools merge with workspace, custom, MCP, and client tools

```json
{"@context":"https://schema.org","@type":"TechArticle","@id":"https://developers.cloudflare.com/agents/runtime/execution/agent-skills/#page","headline":"Agent Skills · Cloudflare Agents docs","description":"Give an agent a catalog of on-demand instructions, resources, and scripts with agents/skills, activated by the model only when a task matches.","url":"https://developers.cloudflare.com/agents/runtime/execution/agent-skills/","inLanguage":"en","image":"https://developers.cloudflare.com/dev-products-preview.png","dateModified":"2026-06-03","publisher":{"@type":"Organization","name":"Cloudflare","url":"https://www.cloudflare.com/"},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"}}
{"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"item":{"@id":"/directory/","name":"Directory"}},{"@type":"ListItem","position":2,"item":{"@id":"/agents/","name":"Agents"}},{"@type":"ListItem","position":3,"item":{"@id":"/agents/runtime/","name":"Runtime"}},{"@type":"ListItem","position":4,"item":{"@id":"/agents/runtime/execution/","name":"Execution"}},{"@type":"ListItem","position":5,"item":{"@id":"/agents/runtime/execution/agent-skills/","name":"Agent Skills"}}]}
```
