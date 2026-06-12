# Inside Delight.ai’s AI/ML team: Building internal tools with Claude Code

Delight.ai builds AI agents for customer support on top of Sendbird's messaging, voice, and video infrastructure, which handles 7 billion monthly conversations for enterprise companies. With Claude as its primary model, its AI concierge resolves complex, high-stakes interactions across retail, travel, B2B SaaS, and marketplaces that previously needed human escalation.

We sat down with Clara Park, a software engineer on Sendbird's AI/ML team. Using Claude Code, she builds the internal tooling that gets every customer's agent ready for production.

## Anthropic: For people who aren't familiar with Delight AI, what does the product do, and where does Claude Code fit into your team's work?

**Clara Park, Sendbird:** We deploy AI agents for companies like Mixpanel and on-demand services across retail and travel, handling high-volume conversations around subscription changes, order support, and the kinds of edge cases that used to get escalated to a human. Claude is one of the primary models powering those agents. On the AI/ML team, Claude Code is also what we use to build the internal tooling that gets every Delight AI deployment ready for production. We've essentially built our whole debugging and regression testing workflow on Claude Code. It lets us test agents at scale and catch issues before they reach customers, which we couldn't really do before.

## After Claude Code, the time to fix a production AI agent issue dropped from about a week to one or two days. Walk us through what changed.

**Park:** AI agent conversations are never perfect, and errors like wrong pricing or incorrect legal language would demand an immediate fix. After an agent goes into production, it used to take us about a week to fix issues, test, and deploy. Now it takes just one or two days max. The week was mostly manual work. Every AI engineer had their own Python notebook for generating test conversations and labeling them, which was inefficient. After we integrated everything into one tool all the engineers use, the time dropped. If we see a conversation in production with issues now, we can fix it directly.

Since adopting Claude Code in November, our weekly pull request creation and PR merge counts have roughly doubled. In early November, we had around 700 PRs created and 600 merged per week; by May, we were closer to 1.6K PRs created and 1.3K merged per week. This also aligns with our Claude Code token usage growth.