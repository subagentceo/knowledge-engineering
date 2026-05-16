[Content Library](/library/)

[Overview](/library/overview/)

Release notes

# Release notes

Find general updates here on new content, feature enhancements, and improvements that help teams architect and optimize deployments of the tools that support their development communities.

## 2026 Q2[](#2026-q2)

-   **New Content: [Governing agents in GitHub Enterprise](/library/governance/recommendations/governing-agents/)** - Published governance and policy guidance for managing GitHub Copilot agents across the enterprise, covering policy configuration, security boundaries, MCP server governance, and audit pipelines
-   **New Content: [Essentials of governance and administration with GitHub Enterprise](/library/governance/recommendations/governance-administration-essentials/)** - Published a comprehensive guide for enterprise governance and administration fundamentals, covering GitHub structural components, user access models, org architecture strategies, policy baselines, and operational topics such as integrations, roles, and audit logging
-   **New Content: [Managing AI credits](/library/governance/recommendations/managing-ai-credits/)** - Published a FinOps-oriented guide for governing AI credit consumption across GitHub Enterprise, covering layered budgets design, cost attribution, usage guidance, and an operating cadence
-   **Deprecated: Managing GitHub Copilot Premium Request Units (PRUs)** - Retired the PRU enterprise admin playbook, replaced by the managing AI credits guidance

## 2026 Q1[](#2026-q1)

-   **New Content: [Managing dependency threats](/library/application-security/recommendations/managing-dependency-threats/)** - Published a comprehensive guide for defending against supply chain attacks and managing dependency risks, covering layered defenses from lockfiles and dependency review to attestation verification and package confusion mitigation
-   **New Content: [Expanding Enterprise Custom Agents context](/library/architecture/recommendations/expanding-enterprise-custom-agents-context/)** - Published architecture guidance for extending GitHub Copilot custom agents with enterprise knowledge, including strategies for context enrichment, secure integration patterns, and scaling agent capabilities across the organization
-   **New Content: [Implementing polyrepo engineering](/library/architecture/recommendations/implementing-polyrepo-engineering/)** - Published a design guide for coordinating engineering across multiple repositories, including manifest-driven integration, change set management, reusable workflow versioning, and release governance patterns
-   **Update: [NIST SSDF implementation](/library/scenarios/nist-ssdf-implementation/)** - Expanded the NIST Secure Software Development Framework scenario with updated guidance on security configurations, repository rulesets, and practical implementation steps across all SSDF practice areas
-   **Update: [Securing GitHub Actions workflows](/library/application-security/recommendations/actions-security/)** - Enhanced the Actions security recommendation with detailed OIDC claims guidance, immutable subject identifiers, repository ruleset examples, and refined best practices for secure workflow patterns
-   **Update: [Application Security design principles](/library/application-security/design-principles/)** - Added a security-by-design approach and developer workspace security considerations to the Application Security pillar’s design principles
-   **Update: [Anti-patterns](/library/scenarios/anti-patterns/)** - Added guidance on avoiding PII detection with secret scanning custom patterns, highlighting why repurposing secret scanning for personally identifiable information creates compliance risk and alert fatigue

## 2025 Q4[](#2025-q4)

-   **New Content: [Actions Runner Controller (ARC) best practices](/library/architecture/recommendations/deploying-actions-runner-controller/)** - Published an opinionated guidance for operating ARC on Kubernetes, including recommendations for runner images, configuration, observability, and security trade-offs
-   **New Content: [Securing developer workspace](/library/application-security/recommendations/securing-developer-workspace/)** - Published an design guidance for hardening developer workspaces, including identity and authorization, workspace isolation, and signed commit practices
-   **Update: [Securing GitHub Actions workflows](/library/application-security/recommendations/actions-security/)** - Added opinionated guidance for OIDC, repository rulesets, and safer workflow patterns, with specific recommendations for public repository security

## 2025 Q3[](#2025-q3)

-   **Update: [Repository Management Enhancement](/library/governance/recommendations/managing-repositories-at-scale/)** - Updated the “Managing repositories at scale” article with opinionated guidance on adopting rulesets and custom properties to meet business objectives, including actionable strategies for governance at scale
-   **Update: [GitHub Actions Policy Updates](/library/application-security/recommendations/actions-security/)** - Updated the GitHub Actions recommendations with new policy capabilities and more prescriptive governance and security guidance for managing workflows at scale
-   **New Content: GitHub PRU Enterprise Admin Playbook** - Published an enterprise playbook for managing GitHub Copilot Premium Request Units (PRUs), including budget configuration, KPI targets, monitoring, and cost control strategies. UPDATED: Deprecated on May 2026.
-   **New Content: [Security Alert Management](/library/application-security/recommendations/prioritizing-alerts/)** - Published a scenario for prioritizing security alert remediation using GitHub’s built-in metadata and organizational context, including practical guidance on implementing GitHub’s security campaigns and vulnerability triage workflows
-   **New Content: [Champion Program](/library/collaboration/recommendations/champion-program/)** - Published a recommendation for champion programs that empower engaged employees to guide peers through AI-driven change.

## 2025 Q2[](#2025-q2)

-   **New Content: [Azure DevOps Migration Guide](/library/scenarios/migrations/azure-devops-migration-guide/)** - Published migration scenarios and playbooks for transitioning from Azure DevOps to GitHub, including phased approaches, feature comparisons, and practical guidance for translating Azure DevOps settings to GitHub equivalents
-   **New Content: [Engineering System Success Framework](/library/productivity/recommendations/engineering-system-metrics/)** - Published the Engineering System Success Framework to help organizations evaluate Copilot business value, including design principles, checklists, metrics, implementation phases, anti-patterns, and intervention strategies
-   **Site Improvements** - Introduced a new Copilot Chat Widget that provides interactive assistance for users

## 2025 Q1[](#2025-q1)

-   **New Content: [GitHub Actions Scalability](/library/collaboration/recommendations/scaling-actions-reusability/)** - Published guidance for scaling GitHub Actions reusability in enterprise environments, including best practices for workflow optimization, action management, and enterprise-wide deployment
-   **New Content: [Repository Migration Essentials](/library/scenarios/migrations/repository-checklist/)** - Introduced a generalized repository migration checklist covering pre-planning, testing, execution, and post-migration, designed to serve as a single source of truth across migration approaches
-   **Design Principle Updates** - Expanded real-world examples across pillars, including clearer guidance on pull request best practices, early vulnerability scanning, and multi-region deployment considerations
-   **Checklists 2.0** - Overhauled the assessment checklists to align with recent GitHub product updates and introduced tiers to help teams prioritize actions based on maturity
-   **Fixes & Refinements** - Improved clarity and usability with refinements to pillar content, navigation, homepage layout, and the hosting template for simpler ongoing maintenance

## 2024 Q4[](#2024-q4)

-   **General Availability (GA) and Well-Architected MVP Launch** - Transitioned from beta to GA with a fully published structure around the five pillars, including curated examples and illustrations that demonstrate practical implementations
-   **Initial Tooling & Assessment Checklists** - Provided downloadable checklists for customers to self-assess alignment with the framework and gathered early adoption feedback to inform Checklists 2.0
-   **Design Principles and Content Highlights** - Published an in-depth overview of the five pillars (Productivity, Collaboration, Application Security, Governance, and Architecture), co-authored an initial set of design principles with KPMG and our Partner Community, and added a high-level scenario for teams starting with GitHub Enterprise
-   **Early Feedback Incorporations** - Streamlined site layouts and navigation based on beta feedback, and expanded scenario guidance including scaling Git repositories and enforcing GHAS at scale

## Future Plans & Roadmap[](#future-plans--roadmap)

-   **Partner & Ecosystem Growth**: Ongoing partner showcases, workshops, and contributions will introduce new specialized assessment offerings
-   **Deeper AI Integration**: Expanding GitHub Copilot insights and AI-based recommendations to cover governance, security, and productivity checks
-   **Advanced Scenarios & Recommendations**: Adding guides on large-scale workflows, compliance-first deployments, and hybrid architectures
-   **Continuous Feedback**: Regularly soliciting community input through partner channels and real-world customer engagements to shape new content

We’re committed to continuous improvement of GitHub Well-Architected. If you have questions or feedback, please reach out to your Partner or our GitHub Support and Services teams.

Thank you for your interest in building resilient, scalable development practices!

Last updated on February 17, 2026

[Getting Started Checklist](/library/overview/getting-started-checklist/ "Getting Started Checklist")[Scenarios](/library/scenarios/ "Scenarios")