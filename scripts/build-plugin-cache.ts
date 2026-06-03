/**
 * @cite vendor/anthropics/code.claude.com/docs/en/plugins-reference.md
 * @cite src/lib/cache-control.ts
 *
 * Builds dist/plugin-cache.json — a compact cached manifest of all plugins and
 * session skills available in this workspace. Injected as a prompt-cached system
 * prompt block to give the orchestrator zero-token-cost tool discovery per turn.
 */
import { readFileSync, writeFileSync, mkdirSync, readdirSync, existsSync } from "node:fs";
import { resolve, dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const root = resolve(__dirname, "..");

interface SkillEntry {
  id: string;
  name: string;
}

interface PluginEntry {
  id: string;
  name: string;
  desc: string;
  kw: string[];
  n: { skills: number; agents: number; mcp: number };
  skills?: SkillEntry[];
}

export interface PluginCache {
  v: number;
  generated_at: string;
  plugins: PluginEntry[];
  session_skills: SkillEntry[];
  coding_tools: {
    gh_cli: string[];
    git: string[];
    graphql: string[];
  };
}

function parseFrontmatter(content: string): { name?: string; description?: string } {
  const match = content.match(/^---\n([\s\S]*?)\n---/);
  if (!match) return {};
  const fm: Record<string, string> = {};
  let current = "";
  for (const line of match[1].split("\n")) {
    if (/^\s+/.test(line) && current) {
      fm[current] = (fm[current] ?? "") + " " + line.trim();
    } else {
      const kv = line.match(/^([\w-]+):\s*(.*)/);
      if (kv) { current = kv[1]; fm[current] = kv[2].trim(); }
    }
  }
  return {
    name: fm["name"],
    description: fm["description"]?.replace(/^>\s*/, "").replace(/\s+/g, " ").trim(),
  };
}

const plugins: PluginEntry[] = [];

// ── Course plugins (src/course-plugins/) ──────────────────────────────────────
const coursePluginsDir = join(root, "src/course-plugins");
const marketplaceJsonPath = join(coursePluginsDir, ".claude-plugin/marketplace.json");
if (existsSync(marketplaceJsonPath)) {
  const marketplaceJson = JSON.parse(readFileSync(marketplaceJsonPath, "utf8")) as {
    plugins: { name: string; displayName: string; source: string; description?: string }[];
  };
  for (const plugin of marketplaceJson.plugins) {
    const pluginDir = join(coursePluginsDir, plugin.source.replace(/^\.\//, ""));
    const skillsDir = join(pluginDir, "skills");
    const skills: SkillEntry[] = [];
    if (existsSync(skillsDir)) {
      for (const skillName of readdirSync(skillsDir)) {
        const skillFile = join(skillsDir, skillName, "SKILL.md");
        if (existsSync(skillFile)) {
          const { name } = parseFrontmatter(readFileSync(skillFile, "utf8"));
          skills.push({ id: skillName, name: name ?? skillName });
        }
      }
    }
    plugins.push({
      id: `${plugin.name}@course-plugins`,
      name: plugin.displayName,
      desc: (plugin.description ?? "").slice(0, 120),
      kw: [],
      n: { skills: skills.length, agents: 0, mcp: 0 },
      skills,
    });
  }
}

// ── Declared plugins from .claude/plugins.json ────────────────────────────────
const pluginsJsonPath = join(root, ".claude/plugins.json");
const existingIds = new Set(plugins.map(p => p.id));
if (existsSync(pluginsJsonPath)) {
  const pluginsJson = JSON.parse(readFileSync(pluginsJsonPath, "utf8")) as {
    install: { kind: string; name: string; marketplace?: string; comment?: string }[];
  };
  for (const install of pluginsJson.install) {
    if (install.kind !== "plugin" && install.kind !== "skill") continue;
    const id = `${install.name}@${install.marketplace ?? "installed"}`;
    if (existingIds.has(id)) continue;
    plugins.push({
      id,
      name: install.name,
      desc: (install.comment ?? "").slice(0, 120),
      kw: [],
      n: { skills: 0, agents: 0, mcp: 0 },
    });
    existingIds.add(id);
  }
}

// ── Session skills from .claude/skills/ ───────────────────────────────────────
const sessionSkillsDir = join(root, ".claude/skills");
const sessionSkills: SkillEntry[] = [];
if (existsSync(sessionSkillsDir)) {
  for (const skillName of readdirSync(sessionSkillsDir)) {
    const skillFile = join(sessionSkillsDir, skillName, "SKILL.md");
    if (existsSync(skillFile)) {
      const { name } = parseFrontmatter(readFileSync(skillFile, "utf8"));
      sessionSkills.push({ id: skillName, name: name ?? skillName });
    }
  }
}

const cache: PluginCache = {
  v: 1,
  generated_at: new Date().toISOString(),
  plugins,
  session_skills: sessionSkills,
  coding_tools: {
    gh_cli: [
      "gh pr list --state open",
      "gh pr create --title '' --body ''",
      "gh pr view <number>",
      "gh pr merge <number> --auto --rebase",
      "gh pr close <number> && gh pr reopen <number>",
      "gh pr update-branch <number>",
      "gh issue list --state open",
      "gh issue create --title '' --body ''",
      "gh run list --repo {owner}/{repo}",
      "gh run view <run-id> --log-failed",
    ],
    git: [
      "git log --oneline -20",
      "git diff HEAD",
      "git diff --staged",
      "git status",
      "git add <file>",
      "git commit -m '...(O<N>)'",
      "git push -u origin <branch>",
      "git fetch origin <branch>",
      "git branch -a",
      "git stash && git stash pop",
    ],
    graphql: [
      "gh api graphql -f query='{ viewer { login } }'",
      "gh api graphql -f query='{ repository(owner:\"o\",name:\"r\") { pullRequests(states:OPEN,first:20) { nodes { number title } } } }'",
      "gh api graphql -f query='{ organization(login:\"o\") { repositories(first:50) { nodes { name } } } }'",
      "gh api repos/{owner}/{repo}/branches/{branch}/protection",
    ],
  },
};

mkdirSync(join(root, "dist"), { recursive: true });
writeFileSync(join(root, "dist/plugin-cache.json"), JSON.stringify(cache));

const sizeKB = (JSON.stringify(cache).length / 1024).toFixed(1);
process.stdout.write(
  `[build:plugin-cache] ${plugins.length} plugins + ${sessionSkills.length} session skills → dist/plugin-cache.json (${sizeKB} KB)\n`,
);
