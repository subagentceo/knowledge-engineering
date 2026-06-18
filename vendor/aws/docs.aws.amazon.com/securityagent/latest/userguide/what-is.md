

# What is AWS Security Agent?
<a name="what-is"></a>

AWS Security Agent is a frontier agent that proactively secures your applications throughout the development lifecycle. It conducts automated security reviews tailored to your organizational requirements, builds threat models to identify how your applications could be attacked, and delivers context-aware penetration testing on demand. By continuously validating security from design to deployment, AWS Security Agent helps prevent vulnerabilities early across all your environments.

Security teams define organizational security requirements once in the AWS Console: approved authorization libraries, logging standards, and data access policies. AWS Security Agent automatically enforces these security requirements throughout development, evaluating architectural documents and code against your standards and providing specific guidance when it detects violations. This delivers consistent security enforcement for design and code reviews across all teams.

For deployment validation, AWS Security Agent transforms penetration testing from a periodic bottleneck into an on-demand capability. Security teams provide target URLs, authentication details, source code and application documentation. AWS Security Agent develops deep application understanding and executes sophisticated attack chains to discover and validate vulnerabilities, enabling teams to test whenever needed.

## Key capabilities
<a name="_key_capabilities"></a>

AWS Security Agent provides comprehensive security capabilities spanning the entire development lifecycle.

### Design security review
<a name="_design_security_review"></a>

AWS Security Agent shifts security left by providing real-time security feedback on design documents and assessing compliance with organizational security requirements before any code is written. Security teams upload documents through the web application and receive remediation guidance to prioritize findings, accelerating time-consuming manual reviews into focused analysis. By proactively embedding your security standards into every design review, you reduce late-stage architectural rework and keep pace with multiple development teams.

### Threat modeling
<a name="_threat_modeling"></a>

AWS Security Agent builds threat models of your applications to identify how they could be attacked. Provide technical design documents (scope docs) to define what the agent focuses on, source code as context for the agent to understand your existing system, or both. AWS Security Agent generates a system overview describing your application’s architecture, components, trust boundaries, data flows, and security posture, along with a set of threats classified by STRIDE category (Spoofing, Tampering, Repudiation, Information Disclosure, Denial of Service, Elevation of Privilege) with severity levels and actionable recommendations. Threat models are reusable configurations that you can re-run as your code and design evolve, enabling iterative security assessment throughout the development lifecycle.

### Code security review
<a name="_code_security_review"></a>

AWS Security Agent proactively secures applications through two complementary approaches. First, you can create code reviews in the web application to perform comprehensive scans of your full source code from GitHub, GitLab, Bitbucket, or GitHub Enterprise Server repositories or S3 buckets, identifying security vulnerabilities and validating compliance with your organizational requirements across your entire codebase. Second, you can enable automated pull request analysis for connected repositories, where AWS Security Agent reviews code changes and posts security findings directly as pull request or merge request comments. In both cases, developers receive remediation guidance, and AWS Security Agent can automatically generate pull requests or merge requests with code fixes for identified vulnerabilities. This embeds security expertise across all repositories, reducing security-related delays in the development pipeline and scaling evaluation across all codebases.

### Penetration testing
<a name="_penetration_testing"></a>

AWS Security Agent delivers on-demand penetration testing by deploying specialized AI agents to discover, validate, report and remediate security vulnerabilities through tailored multi-step attack scenarios. The agent understands your application’s context by analyzing source code and documentation to identify and exploit vulnerabilities that automated security scanning tools cannot find. It documents findings with impact analysis, reproducible attack paths, and creates pull requests with ready-to-implement code fixes, transforming periodic assessments into continuous validation that scales across all applications rather than being limited to only critical ones.

## Benefits
<a name="_benefits"></a>

### On-demand accessibility
<a name="_on_demand_accessibility"></a>

AWS Security Agent provides immediate access to security expertise. Development teams can run design reviews, threat models, code analyses, and penetration tests on-demand whenever needed, matching the pace of modern development cycles and enabling proactive security at every stage.

### Validate organizational requirements automatically
<a name="_validate_organizational_requirements_automatically"></a>

Define your organization’s security requirements once in the AWS Console. AWS Security Agent automatically validates these requirements across all applications during every design and code security review, ensuring teams address your specific requirements rather than generic checklists.

### Scale security expertise
<a name="_scale_security_expertise"></a>

AWS Security Agent scales security reviews to match development velocity by automating enforcement of organizational security requirements. Configure requirements centrally, conduct comprehensive reviews with findings analysis, and manage penetration testing scopes across your organization through the AWS Console.

### Actionable fixes for confirmed vulnerabilities
<a name="_actionable_fixes_for_confirmed_vulnerabilities"></a>

AWS Security Agent validates security findings found during penetration testing through proof-based exploitation, delivering reproducible exploit paths, comprehensive impact analysis, and creates pull requests with ready-to-implement fixes in developer-friendly language. This helps teams focus on legitimate high-impact security risks without wasting time on false positives.

### Multi and hybrid cloud support
<a name="_multi_and_hybrid_cloud_support"></a>

AWS Security Agent operates across AWS, on-premise, hybrid, multicloud, and SaaS environments, ensuring consistent security guidance and testing regardless of your infrastructure or platform choices.