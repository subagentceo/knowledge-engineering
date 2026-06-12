# How Zapier's marketing and engineering teams use Claude Cowork to delegate real work

Zapier connects nearly 8,000 apps for more than 3.4 million businesses, and internally, AI adoption runs deep: 97% of employees use AI in their daily work, with thousands of AI agents deployed across the company. Zapier was also one of Anthropic's earliest MCP partners.

When Claude Cowork launched, three teams picked it up quickly and pushed it in very different directions. We spoke with Head of Product Marketing Joe Stych, AI Automation Engineer Larisa Cavallaro, and Senior Manager of Influencer Marketing Matt Brown about what those workflows actually look like. The following conversation has been edited for length and clarity.

## How has Cowork changed the type of work you take on, as well as how you approach it?

**Joe Stych, Head of Product Marketing:** I can query our product database, write messaging docs, and build landing pages in the same session. That used to mean coordinating across three different teams. I delegate first-draft homepage concepting so I can share multiple positioning directions with leadership in minutes instead of days. That used to need design handoffs before anyone could even evaluate the direction.

**Matt Brown, Senior Manager of Influencer Marketing:** I delegate inbox triage: classification, drafts, archiving. I've extended that to multi-step stuff like validating YouTube descriptions and submitting creator forms. But the real shift is bigger than that. My advice to anyone starting out: stop using it for tasks you can already do in five minutes. Start bringing it the messy, technical problems you've been putting off because they felt like they needed an engineer.

**Larisa Cavallaro, AI Automation Engineer:** People treat Claude like a chatbot when it's closer to a capable teammate. The ceiling on what one person can ship has moved dramatically.

## Larisa, you pointed Cowork at Zapier's own operations. Walk us through what happened.

**Cavallaro:** I connected Cowork to our tech stack: the employee org database, Slack channels, team documentation, and Jira. Then I asked it to identify operational bottlenecks across engineering.

Claude ran 15 SQL queries synthesizing live data from six engineering systems: GitLab, Jira, Productboard, OpsLevel, Jellyfish, and incident tracking, all centralized in a Databricks warehouse that now connects 11 source systems across Zapier's entire org. It produced an interactive dashboard with a quantified breakdown of inefficiencies: team-by-team efficiency analyses, cross-functional friction points, and hidden productivity drains we hadn't surfaced on our own.

What made it especially powerful was the underlying data was rich enough to support increasingly granular follow-ups. In most AI chat tools, you'd query Slack, then query Databricks, then manually stitch the results together. Cowork can do all of that in a single pass. That's a fundamentally different kind of capability.

## Matt, you built a full influencer marketing dashboard with Cowork. How does the pipeline actually work?

**Brown:** I used Cowork to build a live influencer marketing dashboard on GitHub Pages that visualizes our reach, views, clicks, and conversions against quarterly goals.

The data architecture centers on a Zapier Table where every influencer investment is a row. Each row gets progressively enriched by multiple automated sources: a web scraper pulls current view counts, the Bitly API captures click-through data, and our Databricks warehouse supplies downstream conversion and product-upgrade metrics. A Zap transforms that table into a JSON feed consumed by the dashboard's front end.

Claude handled the end-to-end development: chart design, JavaScript and HTML code generation, layout decisions, and debugging. We worked inside a tight Cowork loop where I'd review outputs, request changes, and confirm each iteration before deployment. The result is a daily-updated, real-time visualization mapped against quarterly targets.

What started as a reporting gap is now the system guiding our investment decisions across the entire influencer program. This moves the team from retrospective reporting to forward-looking guidance, informing which channels to double down on, which content performs best, and where to reallocate budget.

## Joe, your workflow is less about building something from scratch and more about making a process repeatable. Walk us through how homepage concepting works in Cowork.

**Stych:** I connected Cowork to our homepage, a custom skill I built with our PMM guidelines, and our internal tools through Zapier MCP, so it could pull from Slack threads, Glean searches, whatever context it needed.

The workflow starts by giving Cowork two key inputs: the existing homepage as the baseline, and project-specific product marketing guidance that covers voice, positioning intent, and operating context. Those are loaded through custom skills: reusable instructions that encode how our team writes and thinks about positioning.

From there, Claude navigates to the live page in Chrome, identifies core page modules, and generates a revised homepage aligned to the new positioning. Instead of requiring a manual rewrite plus a handoff across tools, it produces an HTML mockup directly.

I can keep doing other things while it runs. In this case, the result was a shareable draft in about 15 minutes that I shared with our CMO and CEO for iteration, with enough fidelity to evaluate copy direction and page structure before deeper production work.

The skills layer is what makes this repeatable. Rather than re-prompting from scratch each time, the PMM context travels with the tool. The biggest mistake people make is treating Cowork as a conversation that ends. At the end of every working session, I ask: what should we remember from this? Claude captures it so everything compounds. Each session makes the next one smarter.