# Claude Security is now in public beta

Claude Security is now available in public beta to Claude Enterprise customers.

AI cybersecurity capabilities are advancing fast. Today’s models are already highly effective at finding flaws in software code; the next generation will be more capable still, and will be particularly effective at autonomously _exploiting_ these flaws. Now is the time for organizations to act to improve their security, preparing for a world in which working software exploits are much easier to discover. 

Recently, we made Claude Mythos Preview—which can match or surpass even elite human experts at both finding and exploiting software vulnerabilities—available to a number of partners as part of Project Glasswing. 

But our cybersecurity efforts go beyond Glasswing: with Claude Security, a much wider set of organizations can put our most powerful generally-available model, Claude Opus 4.7, to work across their codebases. Opus 4.7 is among the strongest models available for finding and patching software vulnerabilities, and for discovering complex, context-dependent issues that might otherwise be missed.

Claude Security—previously known as Claude Code Security—has already been tested by hundreds of organizations of all sizes in limited research preview, helping teams scan their codebases for vulnerabilities and generate targeted patches. Their feedback has shaped today’s release, which makes Claude Security available to all Enterprise customers. It comes with scheduled and targeted scans, easier integration with audit systems, and improved tracking of triaged findings. No API integration or custom agent build is required: if your organization uses Claude, you can start scanning today.

Opus 4.7’s capabilities are also being brought to cyber defenders through Claude’s integration into software tools that many enterprises already use. Our technology partners, including CrowdStrike, Microsoft Security, Palo Alto Networks, SentinelOne, TrendAI, and Wiz are embedding Opus 4.7 into their tools; in addition, services partners like Accenture, BCG, Deloitte, Infosys and PwC are now helping organizations deploy Claude-integrated security solutions.

We are entering a pivotal time for cybersecurity. AI is compressing the timeline between vulnerability discovery and exploitation. We believe the right response is to make sure defenders have access to frontier capabilities in the ways most accessible to them, through Claude directly and through our partners.

## How Claude Security works

Claude Security can be accessed directly from the Claude.ai sidebar, or at claude.ai/security. To begin, select one of your repositories (or scope to a specific directory or branch), then start a scan. 

While scanning, Claude reasons about code much like a security researcher. Rather than finding vulnerabilities by searching for known patterns, Claude seeks to understand how components interact across files and modules, traces data flows, and reads the source code. 

Once complete, Claude provides a detailed explanation of each of its findings, including its confidence that the vulnerability is real, how severe it is, its likely impact, and how it can be reproduced. It also generates instructions for a targeted patch, which users can open in Claude Code on the Web to work through the fix in context.

## What we've learned since our initial preview

Over the past two months, we’ve refined Claude Security in line with what we learned from its use in production across hundreds of enterprises. Specifically, we’ve seen that:

**Detection quality is paramount.** Teams have told us that high-confidence findings are what really accelerate security work. Claude Security's multi-stage validation pipeline independently examines each finding before it reaches an analyst, which drives down false positives, and Claude attaches a confidence rating to every result. This means that the signal that reaches the team is worth acting on.

**Time from scan to fix is the metric that matters.** Early users pointed to this consistently, with several teams going from scan to applied patch in a single sitting, instead of days of back-and-forth between security and engineering teams.

**Teams want ongoing coverage, not one-off audits.** We've added the option to schedule scans, so teams can set a regular cadence around reviewing and acting on findings.

With this release, we've also added the ability to target a scan at a particular directory within a repository, dismiss findings with documented reasons (so that future reviewers can trust prior triage decisions), export findings as CSV or Markdown for existing tracking and audit systems, and send scan results to Slack, Jira, or other tools via webhooks.

Here, organizations who’ve used Claude Security describe their experience: