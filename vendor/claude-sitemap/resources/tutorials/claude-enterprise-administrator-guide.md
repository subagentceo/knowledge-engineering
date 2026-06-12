# Claude Enterprise Administrator Guide

_Deployment, Configuration, and Adoption Playbook_

This guide walks you through the four phases of a successful Claude Enterprise deployment: Technical Setup, Change Management & Launch, Enablement & Training, and Scaling Adoption. It also covers Claude.ai and Claude Code access controls, configuration options, and seat management.

**Phase 1: Technical Setup**

*   Authentication & Access
*   User Provisioning Options
*   Security & Compliance
*   Claude Code Access & Seat Configuration

**Phase 2: Change Management & Launch**

*   Define Success Metrics
*   Identify & Enable Champions
*   Launch Communications

**Phase 3: Enablement & Training**

*   Self-Service Learning Resources
*   Feature-Specific Guides
*   Claude Code Training Resources
*   Internal Support Channels

**Phase 4: Scaling Adoption**

*   Expanding Across Teams
*   Measuring Impact
*   Feature Rollout & Governance
*   Sustaining Momentum

**Appendix:** Resource Directory

## Phase 1: Technical Setup

**Complete these technical configuration steps before launching Claude to your organization.**

### Authentication & Access

**Follow these steps to configure SSO:**

Claude Enterprise supports SAML 2.0 and OIDC (OpenID Connect) for single sign-on (SSO). See Setting Up SSO for detailed configuration steps.

1.  **Test SSO:** Configure with a small pilot group before broad rollout.
2.  **Enable domain capture:** Automatically route users from your domain to your workspace. See Domain Capture Setup.
3.  **Enforce SSO:** Require SSO for all access once configuration is validated.

### User Provisioning Options

Choose your provisioning method based on your organization's needs. See User Provisioning Overview for setup instructions.

1.  **SCIM (recommended):** System for Cross-domain Identity Management enables automatic sync from your identity provider (IdP). See SCIM Setup Guide.
2.  **Just-in-Time (JIT):** Users are created upon first SSO login. Simple to set up but offers less control over access.
3.  **Manual:** Admin-managed invitations via the Admin Console. Best for small, controlled pilots.

> **Example: Phased Rollout with SCIM**
> 
> Many organizations use SCIM for a phased rollout approach:
> 
> 1.  Start with a pilot group of 50-100 users synced via SCIM
> 2.  Monitor adoption and gather feedback for 2–4 weeks
> 3.  Gradually expand SCIM groups to include additional departments
> 4.  Enable organization-wide access once processes are established

### Security & Compliance

Claude Enterprise includes robust security and compliance features designed for enterprise environments:

Review security details at the Anthropic Trust Center and in the Enterprise Plan Overview.

1.  **Data retention:** Conversations are retained per your policy and exportable via the Compliance API and Audit Logs, which also provide full activity logging for security monitoring.
2.  **No model training:** Your organization's data is not used to train Claude models by default.
3.  **Role-based access:** Primary Owner, Owner, and Member roles provide granular permissions. See Member Roles Guide.

### Pre-Launch Checklist

*   Important considerations before setting up Identity Management — Important Considerations
*   SSO configured and tested — Setting Up SSO
*   User provisioning configured — Provisioning Guide
*   Security review completed with IT and information security teams
*   Data retention policies documented
*   Compliance API and Audit log access configured — Trust Center and Audit Logs
*   Set up Connectors — Information on Connectors
*   Admin roles assigned — Member Roles
*   Claude Code seat configuration completed (see next section)

### Claude Code Access & Seat Configuration

#### Understanding Claude Enterprise Seat Types for Claude Code

Claude Enterprise offers different seat types depending on your pricing model. The following table summarizes the options and their Claude Code access implications:

Pricing Model

Seat Type

Claude Code Access

Seat-Based (Legacy)

Standard

No

Seat-Based (Legacy)

Premium

Yes

Usage-Based

Chat

No

Usage-Based

Chat + Code

Yes

Usage-Based

Claude Enterprise

Yes

#### Admin Steps to Enable Claude Code

Follow these steps to enable Claude Code access for your users:

1.  **Navigate to Settings > Organization > Members** in your Claude Enterprise admin console.
2.  **For legacy seat-based plans:** Purchase Premium seats and assign them to users who need Claude Code access. Only Primary Owners/Owners can manage seat assignments.
3.  **For usage-based plans:** Assign seats to users who need Claude Code. Configure spend limits as needed (defaults to $0). See information here on setting spend limits.

#### User Authentication for Claude Code

Share the following steps with end users to connect Claude Code to their enterprise account:

*   **Install Claude Code:** Run the command below that corresponds to your operating system to install Claude Code.
    *   **macOS / Linux / WSL:** `curl -fsSL https://claude.ai/install.sh | bash`
    *   **Windows (PowerShell):** `irm https://claude.ai/install.ps1 | iex`
*   **Start Claude Code:** Type "claude" in your terminal.
*   **Select login method:** Choose "Claude account with subscription".
*   **Authenticate via Enterprise SSO** with your corporate credentials.
*   **Your seat subscription will be linked to Claude Code** automatically upon successful authentication.

> **Troubleshooting**
> 
> *   If already logged in via a different account, run `/logout` first, then `/login`
> *   Run "claude update" if not seeing the enterprise auth option
>     *   Restart terminal after updates
>     *   Console API key users switching to access via Claude Enterprise seats: Run `/logout`, then `/login` and select "Claude account with subscription"

#### Admin Monitoring for Claude Code

Monitor and manage Claude Code usage across your organization:

*   Navigate to Analytics > Claude Code to view usage analytics
*   Monitor usage across all surfaces (Claude.ai + Claude Code)

> **Important**
> 
> Claude Code access requires a Premium seat (legacy model), or a Chat + Code or Claude Enterprise seat (usage-based model). Standard and Chat-only seats do NOT include Claude Code access.
> 
> For organizations migrating from Console/API-based Claude Code access, users must re-authenticate via Enterprise SSO to link their subscription.

## Phase 2: Change Management & Launch

A successful Claude deployment requires thoughtful change management to drive adoption and demonstrate value.

### Define Success Metrics

Establish clear metrics to measure the success of your Claude deployment:

Metric Category

Metric

Target

Measurement Method

Activity

Weekly Active Users

70% of licensed seats

Admin Dashboard

Activity

Messages per User per Week

25+ messages

Usage Analytics

Activity

Feature Adoption (Projects, Artifacts)

40% of active users

Feature Analytics

Impact

Time Saved per User per Week

3+ hours

User Survey

Impact

User Satisfaction Score

4.0+ / 5.0

Quarterly Survey

Impact

Tasks Augmented by Claude

5+ per week

User Self-Report

### Identify & Enable Champions

Champions are enthusiastic early adopters who can help drive adoption across their teams:

*   Select 2–3 champions per department or team
*   Provide champions with early access and advanced training
*   Equip champions with talking points and demo guidance
*   Create a champions Slack channel or Teams group for peer support
*   Recognize and reward champion contributions to adoption

### Launch Communications

Plan a multi-channel communication strategy for your launch:

*   **Pre-Launch (2 weeks before):** Communications highlighting benefits and use cases
*   **Launch Day:** Executive announcement, getting started guide, training schedule
*   **Post-Launch (Week 1):** Tips and tricks, success stories from pilot users
*   **Ongoing:** Weekly tips, monthly newsletters, quarterly business reviews

## Phase 3: Enablement & Training

Provide comprehensive training resources to help users get the most from Claude.

### Structured Training Programs

Deploying Claude is a technical milestone, but adoption depends on whether people know how to use it effectively. A structured training program ensures users move past initial curiosity into productive, habitual use — and reduces the support burden on your IT and champion teams.

*   **All-Staff 101 Sessions:** Workshops (30–60 min) covering the basics — navigating the interface, writing effective prompts, and using core features like Projects and Artifacts. Run at launch and repeat for new hire cohorts.
*   **Department-Level Enablement:** Targeted sessions built around each team's actual workflows, with an executive sponsor to signal leadership support. Partner with team leads to identify high-value use cases and provide ready-to-use prompt templates. Schedule a follow-up 2–4 weeks later to address questions from real usage.
*   **Office Hours:** Weekly or biweekly drop-in sessions where users bring real work and get hands-on help from champions. Especially valuable in the first 30–60 days.
*   **LMS Integration:** If your organization uses an LMS, package Claude training into trackable courses to monitor enablement coverage and tie completion to access or feature rollout milestones.

### Self-Service Learning Resources

Direct users to these Anthropic-provided learning resources:

*   Anthropic Academy — Interactive courses covering Claude fundamentals, prompt engineering, and advanced features
*   Use Case Library — Curated examples of Claude applications across different business functions
*   Help Center — Comprehensive documentation and FAQs on Claude Enterprise
*   Docs Site — Comprehensive support for Claude Code and API use

### Feature-Specific Guides

Ensure users understand key enterprise features:

**Projects****:** Organize conversations by topic, client, or workflow. Projects maintain context across conversations and can be shared with team members.

**Artifacts****:** Create and iterate on documents, code, analyses, and visualizations within conversations. Artifacts can be exported and shared.

**Skills****:** Skills are folders of instructions, scripts, and resources that Claude loads dynamically to improve performance on specialized tasks.

**Enterprise Search****:** Connect internal knowledge bases and documents to Claude for organization-specific answers. Supports various file formats and integrations.

### Claude Code Training Resources

Provide these resources to help users get started with Claude Code:

*   Quick Start Guide
*   Claude Code Walkthrough
*   Mastering Claude Code in 30 minutes
*   Claude Code — DeepLearning.ai Short Course
*   Claude Code Best Practices
*   Building and Prototyping with Claude Code

### Internal Support Channels

Establish ongoing support infrastructure for your Claude users:

*   Dedicated Slack/Teams channel for Claude questions and tips
*   Weekly office hours with champions or power users
*   IT helpdesk integration for access and technical issues
*   Monthly user group meetings to share best practices
*   Dedicated Claude Code support channel for developer-specific questions

## Phase 4: Scaling Adoption

After initial deployment, focus on expanding usage, building internal ownership, and demonstrating sustained value across the organization.

### Expanding Across Teams

Prioritize teams with strong use case fit and willing champions. For each new team:

*   Conduct a brief needs assessment to identify high-value workflows
*   Provision seats (including Claude Code for developer teams) and deliver tailored onboarding
*   Appoint a local champion to drive adoption and share early wins across the organization

### Measuring Impact

Shift from tracking activity metrics to demonstrating business value. Focus on outcomes that matter to leadership:

*   Track adoption (active users, department penetration, feature usage) via the Admin dashboards and API
*   Measure productivity gains (hours saved, tasks augmented) through periodic user surveys
*   Pair quantitative data with qualitative examples – short case studies from team leads illustrating real impact
*   Establish a regular reporting cadence (e.g., quarterly business reviews) to keep stakeholders informed

### Feature Rollout & Governance

Introduce advanced capabilities gradually so teams can build confidence without feeling overwhelmed. A natural progression might move from core features (Projects, Artifacts, Connectors) to intelligence features (Enterprise Search, Research) to integrations (Claude Code, Skills) and finally to automation (Cowork, custom connectors).

As usage grows, revisit your governance posture:

*   Review data retention policies, audit log cadences, and project visibility defaults
*   Maintain an allowlist of approved connectors and extensions, routing new requests through your standard IT governance process
*   Configure usage guardrails to manage consumption as the user base expands

### Sustaining Momentum

Long-term success depends on building internal ownership and feedback loops:

*   Designate a program owner and consider forming a lightweight Center of Excellence to curate prompts, Skills, and playbooks
*   Run periodic user surveys, champion roundtables, and usage analytics reviews to surface what's working and what needs attention
*   Refresh training materials quarterly to reflect new features and lessons learned
*   Incorporate Claude onboarding into your standard new hire orientation
*   At each phase of rollout, consider a brief retrospective:
    *   What use cases emerged?
    *   What barriers remain?
    *   What should change for the next phase?

## Appendix: Resource Directory

A comprehensive directory of support, training, and enablement resources for Claude Enterprise administrators and end users.

### Getting Started

**Essential resources for new deployments and first-time users:**

*   Getting started with Claude — First steps, basic navigation, and starting your first conversation
*   What are some things I can use Claude for? — Common use cases including writing, analysis, coding, research, and creative tasks
*   What is the Enterprise plan? — Enterprise features including SSO, SCIM, audit logs, custom retention, and dedicated support
*   Release Notes — Chronological log of new features, improvements, and changes across all Claude products
*   How to get support — Contacting Anthropic support, submitting tickets, and self-service resources

### Training & Enablement

**Resources to upskill your organization on Claude:**

*   Anthropic Academy — Self-paced courses on prompt engineering, Claude features, and best practices
*   Prompt Engineering Guide — Comprehensive documentation on advanced prompt engineering techniques
*   Introduction to Prompt Design — Foundational prompt engineering principles
*   Claude Enterprise Help Center — Central hub for all Claude help articles and documentation
*   Use Case Library — Real-world examples of how organizations use Claude

### Identity & Access Management

*   Identity Management — SSO setup (SAML 2.0 / OIDC), JIT and SCIM provisioning, and IdP migration
*   Restrict access with IP allowlisting — Network-level access control by restricting Claude to approved IP ranges
*   Enforce Tenant Restrictions — Prevent users from accessing unauthorized Claude organizations from your network
*   Configuring session security settings — Session timeout, re-authentication, and session management policies

### User & Seat Management

*   Managing members on Team and Enterprise plans — Inviting, removing, and managing user roles from the admin console
*   Roles and Permissions — Owner, Admin, and Member permission levels
*   Purchasing and managing seats — Seat allocation, scaling, and license management
*   Find and join your organization — How end users discover and join their company's Claude organization
*   Migrating individual accounts to Enterprise — Migration paths and data handling when transitioning plan types
*   What happens to a user's data when removed? — Data retention and cleanup policies when removing users

### Governance & Compliance

*   Exporting organization data — Bulk data export for compliance, migration, or backup
*   Usage analytics — Dashboard for tracking adoption, usage patterns, and seat utilization
*   Audit logs — Track user activity, conversations, and admin changes
*   Custom Data Retention Controls — Configure retention windows from 1 day to indefinite
*   Compliance API — Programmatic access for DLP, eDiscovery, and regulatory needs
*   HIPAA-ready Enterprise plans — HIPAA compliance capabilities, BAA availability, and healthcare configuration
*   Business Associate Agreements (BAA) — How to request and execute a BAA with Anthropic
*   Security & Compliance Overview (Trust Center) — Certifications (SOC 2 Type II, CSA STAR), pen test reports, and compliance documentation

### Billing & Usage

*   Enterprise billing — Billing structure, invoicing, and payment options
*   Extra usage controls — Overage pricing and usage guardrails for organizational plans
*   Usage limits and best practices — Tips for staying within limits and optimizing conversation efficiency

### Admin Controls

*   Project visibility and sharing — Admin controls for project sharing policies
*   Disabling public projects — Restrict project sharing to internal-only
*   Managing user feedback settings — Configure whether user feedback is shared with Anthropic
*   Cowork for Enterprise — Enabling and configuring Cowork mode for your organization
*   Visual and interactive content controls — Admin controls for visual content generation features

### Projects & Knowledge Management

*   What are projects? — Persistent workspaces for grouping conversations, uploading reference files, and setting custom instructions
*   Examples of projects you can create — Use case inspiration across different roles and workflows
*   RAG for projects — How Claude searches uploaded project files for grounded, accurate responses
*   Chat search and memory — Search past conversations and let Claude remember key details across sessions

### Content Creation & Artifacts

*   What are artifacts? — Interactive content blocks for code, documents, websites, and visualizations
*   Create and edit files with Claude — Generate Word docs, spreadsheets, presentations, and other file types
*   Visual and interactive content — Charts, diagrams, interactive web apps, and visual outputs
*   Uploading files to Claude — Supported file types, size limits, and best practices

### Research & Reasoning

*   Using Research — Deep research mode that searches the web and synthesizes findings into comprehensive reports
*   Web search — Real-time web search to supplement Claude's knowledge with current information
*   Extended thinking — Step-by-step reasoning for complex problems
*   When to use search vs. thinking vs. Research — Decision guide for choosing the right tool

### Skills & Customization

*   What are Skills? — Reusable instruction sets that teach Claude specialized workflows and domain expertise
*   How to create custom Skills — Build skills through natural conversation or manual configuration
*   Provisioning Skills for your organization — Deploy skills across teams and manage the organizational skills catalog

### Cowork & Desktop Agent

*   Getting started with Cowork — Desktop agent mode where Claude creates files, runs code, and automates workflows
*   Using Cowork safely — Safety guidelines and sandboxing details

### Personalization

*   Personalization features — Memory, preferred name, and options that shape Claude's responses
*   Custom styles — Create and apply response styles (concise, detailed, formal, casual, etc.)
*   Language preferences — Multilingual support and language settings

### Enterprise Search & Data

*   Using Enterprise Search — Search across connected organizational data sources within Claude

### Integration Overview

*   When to use desktop vs. web connectors — Comparison of web-based (Remote MCP) and desktop connector architectures
*   Interactive Connectors — Connectors that let Claude take actions (not just read data) in external tools

### Pre-Built Connectors

**Ready-to-use integrations with popular enterprise tools:**

*   Google Drive — Access, search, and reference Google Drive files in conversations
*   GitHub — Browse repos, review PRs, search code, and manage issues
*   Slack — Install and use the Claude Slack app in your workspace
*   Microsoft 365 — Connect Outlook, OneDrive, Teams, and other M365 services
*   Microsoft 365 Security Guide — Data handling, permissions, and security architecture for the M365 connector
*   All pre-built web connectors — Full list of available pre-built connectors using Remote MCP

### Custom Connectors

**Build your own connectors for proprietary or specialized tools:**

*   Building custom connectors — Technical guide for developing and deploying Remote MCP server connectors
*   Building desktop extensions with MCPB — MCPB tooling for installable desktop extensions

### Desktop & Browser

*   Claude Desktop — Installation, enterprise deployment (Windows/macOS via MDM), managed configuration, and extension allowlists
*   Claude in Chrome — Browser extension setup, permissions, admin controls, safety best practices, and troubleshooting

### Mobile

*   Claude Mobile Apps — iOS and Android installation, voice mode, dictation, widgets, and shortcuts

### Productivity Suites

*   Claude in Excel — AI-powered formulas, data analysis, and chart creation within Excel
*   Claude in PowerPoint — Generate and edit slide decks directly inside PowerPoint
*   Google Sheets add-on — Data analysis and formula help directly in Google Sheets

### Developer Tools

*   Claude in Xcode — Code completion, debugging, and refactoring in Apple's Xcode IDE
*   Claude in Microsoft Foundry — Access Claude models through Microsoft's AI Foundry platform

### Claude Code Setup & Configuration

*   Claude Code — Team/Enterprise setup, model configuration, security reviews, and usage analytics
*   Using Claude Code with Team or Enterprise Plan — Configuration and deployment for organizational plans
*   Claude Code Usage Analytics — Track adoption and usage across your organization
*   Claude Code Troubleshooting — Common issues, fixes, and debugging steps

### Claude Code Training

*   Anthropic Academy — Claude Code in Action — Self-paced course on Claude Code workflows

### Function-Specific Guides

**Share these guides with team leads to accelerate adoption in their departments:**

*   Claude for Engineering Teams — Code review, debugging, architecture, and technical workflows
*   Claude for Marketing Teams — Content creation, campaign analysis, and brand voice
*   Claude for Sales Teams — Outreach drafting, research, and pipeline management
*   Claude for Product Management — PRDs, competitive analysis, and user research synthesis
*   Claude for Human Resources — Policy drafting, interview prep, and employee communications

### Industry Solutions

**Specialized resources and connectors for regulated and vertical industries:**

*   Claude for Financial Services — Getting started, workflows, prompting strategies, skills, and market data connectors (FactSet, S&P Global, Moody's, Morningstar, PitchBook, LSEG, Aiera, Daloopa)
*   Claude for Life Sciences — Getting started plus connectors for BioRender, PubMed, Benchling, Synapse.org, 10x Genomics, and Scholar Gateway
*   Claude for Education — Admin deployment guide, Canvas LTI integration, FERPA-compliant data controls, and end-user FAQs
*   Claude for Nonprofits — Getting started plus connectors for Benevity, Blackbaud, and Candid

### Privacy & Data Handling

*   Privacy practices — How Anthropic handles user data, model training, and privacy controls
*   Who can view my conversations? — Data visibility, access controls, and conversation privacy by plan type
*   Data ownership for teams — Data ownership policies for organizational plans
*   Data Processor vs. Controller — GDPR role clarification for Anthropic's data handling
*   Data deletion for Enterprise — Data deletion requests and processes for organizational plans
*   Data Processing Addendum (DPA) — Self-service DPA signing for GDPR compliance
*   Safeguards — Usage policy, safeguard appeals, agent guidelines, content reporting, and vulnerability reporting

### Troubleshooting

**Common issues and resolution guides:**

*   Understanding error messages — Decode common error messages and their solutions
*   Incorrect or misleading responses — Understanding hallucinations and how to get more accurate answers
*   Content filtering errors — Why outputs may be blocked and how to adjust your approach

### Video Tutorials

**Share these video walkthroughs with your team for visual, hands-on learning.**

#### Getting Started Videos

*   Getting started with Claude.ai — Interface walkthrough, first conversation, and key features
*   Intro to Artifacts — Creating and using artifacts in conversations
*   Intro to Projects — Setting up and managing projects
*   Intro to Connectors — Connecting external tools and data sources
*   Using Research — Demo of deep research capabilities

#### Feature Deep Dives

*   Connect your tools for a smarter AI companion — Setting up integrations for enhanced capabilities
*   Create and edit files to eliminate busy work — Document automation with Claude's file creation features
*   Prototype AI apps with artifacts — Building functional app prototypes using artifacts
*   Teach Claude your way of working using skills — Creating and applying skills for consistent outputs
*   Create a skill through conversation — Building skills via natural conversation
*   Claude in Chrome — Walkthrough of the Claude in Chrome extension

#### Integration Tutorials

*   Using the GitHub integration — GitHub connector setup and usage
*   Using the Google Docs integration — Working with Google Docs in Claude

#### Function & Industry Videos

*   Claude for Engineering — Code review, debugging, architecture, and technical workflows
*   Claude for Marketing — Content creation, campaign analysis, and brand voice
*   Claude for Sales — Outreach drafting, research, and pipeline management
*   Claude for Product Management — PRDs, competitive analysis, and user research synthesis
*   Claude for Human Resources — Policy drafting, interview prep, and employee communications
*   Investment Research — Market data connectors for equity research workflows
*   Analysis and Modeling — DCF modeling, comp analysis, and financial statement analysis
*   Investment Memos — Drafting investment memos and thesis documentation
*   Browse all video tutorials — Full collection of 26 video tutorials