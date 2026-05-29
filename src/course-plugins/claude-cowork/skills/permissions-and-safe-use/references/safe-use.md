# Best Practices for Working Safely

## Your part: set up so mistakes can't reach what matters

The highest-leverage move is the folder you point Claude at — it's the boundary for read/write/(confirmed-)delete.

- **Use a dedicated working folder, not a catch-all.** Pointing at Documents/Downloads/Desktop is like letting a new colleague rummage through every file you have.
- **Back up anything irreplaceable before you start.** Claude won't delete without asking, but the cost of clicking through the wrong confirmation is the cost of the file. Keep a copy somewhere Cowork can't reach.
- **Test new workflows on copies first** (e.g. a scheduled task's first run goes against copied data).

## Write prompts that leave no room for the wrong action

- **Be specific about destructive verbs.** *"Cut the section"* / *"update the file"* are ambiguous. If the wrong reading is irrecoverable, name it: *"Remove the section from the draft, but keep the file."*
- **Name the bounds.** *"Only the 3 most recently updated files."* *"Don't message anyone — draft only."*
- **Use scheduled tasks for drafts initially** — until you trust the run, prompt it to draft for review rather than send on your behalf.

## In the moment: three checks

1. **Read the plan** once Claude lays it out — right order, right sources? Redirect if not.
2. **Watch for unexpected patterns.** Files/sites you didn't mention, or scope creeping past your ask → stop the task. *"Something feels off"* is a real signal.
3. **Approve confirmation prompts deliberately.** Most mistakes come from clicking through a dialog that wasn't quite the intended action. The dialog exists because the action matters.

## When Cowork isn't the right tool

- **Regulated workflows needing an audit trail** — Cowork activity isn't in audit logs, the Compliance API, or data exports.
- **Anything you wouldn't trust a smart, quick colleague to do unsupervised** — sending a legal doc to a counterparty, posting a public announcement, pushing a customer-facing change. Claude can prepare; you ship.
- **Highly sensitive personal data** outside the boundary your IT team has approved.
