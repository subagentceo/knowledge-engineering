We offer a set of open-source plugins that extend Claude with specialized capabilities for financial services workflows, including financial modeling, equity research, investment banking, private equity, and wealth management.

These plugins are available on all paid plans: Pro, Max, Team, and Enterprise.

You can add them as an Anthropic-built marketplace, called Financial Services, or from a public GitHub repository.

---

## What's included

The repository contains a **core plugin** and several **add-on plugins** that build on it:

- **Financial analysis** (core) — Build comparable company analyses, DCF models, LBO models, and 3-statement financials. This plugin also includes all shared MCP connectors for financial data providers. **Install this first.**

- **Investment banking** — Draft CIMs, teasers, and process letters. Build buyer lists, run merger models, and create strip profiles.

- **Equity research** — Write earnings updates and initiating coverage reports. Track catalysts and screen for new ideas.

- **Private equity** — Source and screen deals, run due diligence checklists, draft IC memos, and monitor portfolio company KPIs.

- **Wealth management** — Prep for client meetings, build financial plans, rebalance portfolios, and identify tax-loss harvesting opportunities.

The repository also includes partner-built plugins from **LSEG** and **S&P Global**, which bring their financial data and analytics directly into Claude.

---

## Add the Financial Services marketplace

### Add it for your organization

If you're an organization owner, add the marketplace once for everyone:

1. Go to **Organization settings > Plugins**.

2. Click the “Add plugins” button.

3. Select “Browse Anthropic sources.”

4. Find **Financial Services** and click "Add." The button changes to "Added."

5. Click "Done."

The marketplace then appears for everyone in your organization. To control which plugins are available and to which groups, see **[Manage plugins for your organization](https://support.claude.com/en/articles/13837433-manage-claude-cowork-plugins-for-your-organization)**.

### Add it yourself

To add the Financial Services marketplace to your personal plugins:

1. Open the **Customize** menu and go to the **Plugins** tab.

2. In the **Personal plugins** section, click the "+" button, then select "Add marketplace."

3. Click "Browse Anthropic sources," find **Financial Services**, and click "Add." Then click "Done."

To add the public GitHub repository instead, for example to customize the plugins yourself:

1. In the **Personal plugins** section, click the "+" button, then select "Add marketplace."

2. Click "Add from a repository."

3. Enter the repository URL: <https://github.com/anthropics/financial-services-plugins>

4. You'll see the financial services plugins in your marketplace.

---

## Install plugins

1. From your plugin marketplace, browse the available financial services plugins.

2. Install the **financial analysis** plugin first—this is the core plugin that provides shared tools and data connectors used by all other plugins.

3. Install any additional plugins based on your workflow needs.

Once installed, plugins activate automatically. Skills are applied when relevant, or you can invoke them by typing "/" or clicking the "+" button.

---

## Available skills

After installation, you can use skills like:

- /comps [company] — Run a comparable company analysis

- /dcf [company] — Build a DCF valuation model

- /earnings [company] [quarter] — Generate a post-earnings update report

- /one-pager [company] — Create a one-page company profile

- /ic-memo [project name] — Draft an investment committee memo

- /source [criteria] — Source deals based on criteria

- /client-review [client] — Prep for a client meeting

---

## Connectors

The financial analysis core plugin includes connectors for third-party financial data providers such as Daloopa, Morningstar, S&P Global, FactSet, Moody's, MT Newswires, Aiera, LSEG, PitchBook, Chronograph, and Egnyte.

Access to these connectors may require a separate subscription or API key from the respective provider. Contact your data provider for details.

---

## Customize plugins for your firm

These plugins are designed as starting points. You can customize them to match your firm's workflows by editing the plugin files directly:

- Add your firm's terminology, processes, and formatting standards to skill files.

- Swap or add MCP connectors to point at your specific data providers.

- Adjust workflow instructions to reflect how your team does analysis.

- Use /ppt-template to teach Claude your firm's branded PowerPoint layouts.

---

## Good to know

- Plugins are file-based (Markdown and JSON) — no code or infrastructure required to customize.

- The skills in these plugins work in chat (on the web and the Chat tab in Claude Desktop), Cowork, and Claude Code. Sub-agents run only in Cowork.

- AI-generated financial analysis should always be reviewed by qualified professionals before being used in decision-making.