# The Permissions Model (Approvals)

## The mode selector (approvals)

When you pick a folder you automatically authorize Claude to read and write in it. For actions inside, Cowork has two permission modes you choose per task:

- **Ask before acting (default).** Claude pauses for your okay before each action that touches the outside world — sending an email, posting a message, sharing a file. Best for new tools, unfamiliar files, or anything you want to watch closely.
- **Act without asking.** Claude doesn't pause for those. Faster but riskier — only switch to it when you're actively supervising and working with trusted files and sites.

**Constant in both modes:** Claude always asks before permanently deleting a file, and that prompt **can't be skipped. No exceptions.**

You also control (same as Chat): **connectors/MCPs** (which Claude can reach and how often each asks), and **web access** (your org admin can turn web search off; you can limit which sites Claude in Chrome visits). Assess how much you trust a connector or website before extending access beyond defaults.

The point: you can hand Claude a substantial piece of work knowing it won't take an action that surprises you. That's what "delegating, not just chatting" feels like — and it only works because the permissions model is doing real work in the background.
