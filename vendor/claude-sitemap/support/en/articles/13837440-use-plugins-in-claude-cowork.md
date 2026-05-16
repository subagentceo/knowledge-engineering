Plugins are available to all Claude Cowork users on paid plans (Pro, Max, Team, Enterprise).

Plugins customize how Claude works for your role, team, and company in Cowork. Each plugin bundles together skills, connectors, and sub-agents into a single package—so instead of setting up each piece individually, you get a ready-to-go setup from the first conversation.

Claude also connects to services like Google Drive, Gmail, Slack, DocuSign, and many more. Plugins can bundle the right connectors for a given workflow so you don't have to set them up individually.

**Note:** Connectors in Cowork reach external services through Anthropic's cloud, not through your local network. Even though Cowork runs on your computer, a custom connector must point to a server that's reachable over the public internet from Anthropic's IP ranges. If your organization's MCP servers are behind a firewall or on a private network, see **[Network requirements for custom connectors](https://support.claude.com/en/articles/11175166-get-started-with-custom-connectors-using-remote-mcp#h_b66e88c454)**.

---

## Browse available plugins

Cowork includes a growing library of plugins for common knowledge work—including sales, finance, legal, marketing, HR, engineering, design, operations, data analysis, and more. Each one comes pre-configured with the skills and connectors relevant to that function.

We also provide **Plugin Create**, a plugin that helps you build custom plugins from scratch.

For the full collection of Anthropic-built plugins, visit **[GitHub](https://github.com/anthropics/knowledge-work-plugins)**.

**Note:** Plugins may include local MCP servers that run on your computer with the same permissions as any other program you run. Only install plugins from sources you trust. If your organization is on an Enterprise plan, your admin may have restricted which plugins you can install, or disabled local MCP servers entirely.

---

## Install a plugin

1. Open the Claude Desktop app and switch to the “Cowork” tab.

2. Click the “Customize” menu in the left sidebar, which brings together your plugins, skills, and connectors in one place.

3. Click “Browse plugins” to open a modal where you can view all the available options.

4. Click “Install” on your selected plugin.

5. You can also upload a custom plugin file if you've built one yourself or received one from a colleague.

Plugins you add yourself are saved locally to your machine.

![](https://downloads.intercomcdn.com/i/o/lupk8zyo/2100409211/fc01614dde1a616fa31ffaa9cb04/47bacf5b-a810-45b5-a468-9769f1a58ef8?expires=1778914800&amp;signature=90e30508ef21708d3b7e303379afcd8ccb75ceb3f5a653d7865b11d440774fd1&amp;req=diEnFs1%2BlINeWPMW1HO4zZF3LR3UMvFdxakFVfq5Wwyhu8i1PpeoSbk8ow7U%0AeePspJQVucyxbK0v60k%3D%0A)

---

## Use Skills

Each plugin you install adds Skills you can use while working in Cowork. Type "/" or click the "+" button to see available Skills from your installed plugins.

![](https://downloads.intercomcdn.com/i/o/lupk8zyo/2157396844/4a790e10f5b88df770783df1d7e9/image.png?expires=1778914800&amp;signature=3f46afe21d754ef34864d7a36df1b7ce8480669779bd0911b7054e3c68751053&amp;req=diEiEcp3m4lbXfMW1HO4zf4NC%2F71gkScmKUxugP2BQuT0aILzYoV2oryTD4O%0AhAOY%2B6EPpUuY%2FLTx8Ec%3D%0A)

---

## Customize a plugin

After installing a plugin, you can tailor it to better fit your workflow:

1. While viewing an installed plugin, click “Customize” in the upper right corner.

2. This opens a new Cowork task with a prompt asking Claude to customize the plugin you chose.

3. Click “Let's go” to start working with Claude to adjust the plugin's Skills and connectors to match how you work.

---

## Build your own plugin

Want to create something from scratch? Cowork includes **Plugin Create**, a built-in plugin that walks you through the process. You can also start from any of the Anthropic-built templates and modify them.

For details on plugin structure and formatting, see the **[Plugins reference](https://code.claude.com/docs/en/plugins-reference)** in our Claude Code docs.

---

## Organization-managed plugins

If you're on a Team or Enterprise plan, an owner can distribute plugins across your organization through plugin marketplaces. These work the same as any other plugin, with a couple of differences:

- You can't edit organization-managed plugins. This keeps shared tooling consistent across your team.

- Some plugins may be auto-installed or required for you. You can uninstall auto-installed plugins if you don't need them, but required plugins can't be removed.

- Available organization plugins show up when you browse the plugin catalog, and you can install them yourself.

On Enterprise plans, your admin may customize which plugins are available to your group. This means the plugins you see in the catalog may differ from what colleagues in other groups see.

For guidance on setting up and managing plugins organization-wide, see **[Manage Cowork plugins for your organization](https://support.claude.com/en/articles/13837433-manage-cowork-plugins-for-your-organization)**.