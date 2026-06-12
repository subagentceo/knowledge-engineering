# How Jamf's engineering team turns structured workflows into interactive tools with Cowork

Jamf manages and secures Apple devices for more than 70,000 customers worldwide. The company recently rolled out Claude Enterprise across all 16 departments. Then the engineering team found Cowork and started replacing spreadsheets and checklists with guided, reusable workflows. Nick Benyo, Software Engineer on Jamf's Enterprise AI and Automation team, sat down with Anthropic to discuss how the team is using Cowork, what surprised them about adoption, and where they see the most untapped potential. The following conversation has been edited for length and clarity.

## What made Cowork click for your team?

**Nick Benyo:** It stopped feeling like a chatbot and started feeling like a lightweight app framework. It changed how we thought about what we could build. We saw that a Claude skill could show a visible checklist tracking progress through a multi-step process, then use the ask-question feature to pause and wait for real input. And MCP integrations show up almost like a heads-up display. Each of those pieces on its own is useful, but together they give you structure, interactivity, and live context in one place. And anything you build is reusable by default. You're not writing a one-off script, you're building a tool anyone on the team can pick up and run.

## Has adoption spread beyond engineering?

**Nick Benyo:** The biggest surprise is that it's not engineers driving the broadest adoption. People across the org are using Cowork for data blending, analysis, and dashboard building. Bespoke dashboarding has been huge. Tasks that previously required a BI tool or an engineer's help, people are now doing themselves in minutes. Nobody had to teach them how to write a skill or explain what an MCP server is. The barrier to building isn't technical skill, it's just knowing what you want and making sense of what you're getting back. Once people realized that, adoption took care of itself.

## Walk us through a specific skill you've built.

**Nick Benyo:** Our engineering team has a performance review spreadsheet that covers seven areas across levels from Associate to Principal. Depending on your role, some competencies don't apply. Engineers doing self-evaluations had to navigate all of that on their own with limited guidance on what a good answer looks like. Many people found it intimidating.

We built a skill that turns that spreadsheet into a guided conversation. It asks your name, level, and role type, then builds a personalized checklist of competencies to cover. From there it works through each one: asks about a specific behavior, listens to your answer, then pushes for a concrete example. In the old process, someone might write "I do thorough code reviews" and call it done. The skill won't let you off the hook: what review, what feedback did you give, what changed because of it? If you get stuck, it can pull up your recently closed Jira tickets to jog your memory.

A typical session runs 60 to 90 minutes with a visible checklist tracking progress. At the end it generates a file you can review and paste back into the original spreadsheet and a summary report with a level assessment and development plan.

## How long did that take to build?

**Nick Benyo:** Under 45 minutes. At a previous employer, something comparable was a full team and three months of build time. You're talking about a conversational UI with branching logic, role-based filtering, Jira integration, progress tracking, and structured file export. Testing was just as fast. I told the skill to sample a few questions from each competency instead of running the full set and it adjusted on the fly. No code change, no redeployment. The test framework was up and running in a single prompt.