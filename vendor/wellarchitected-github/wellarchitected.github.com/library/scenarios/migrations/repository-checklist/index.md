# Checklist for Repository Migrations

Libraries

Scenarios

Migrations

Checklist for Repository Migrations

# Checklist for Repository Migrations

This checklist is intended to facilitate a successful migration to GitHub by providing an overview of the necessary steps involved, with a focus on migrating repositories. This checklist is a guide on **what** needs to be done for a migration as an approach for planning.

## Seeking further assistance

### GitHub Support

Visit the GitHub Support Portal for a comprehensive collection of articles, tutorials, and guides on using GitHub features and services.

Can’t find what you’re looking for? You can contact GitHub Support by opening a ticket.

### GitHub Expert Services

GitHub’s Expert Services Team is here to help you architect, implement, and optimize a solution that meets your unique needs. Contact us to learn more about how we can help you.

### GitHub Partners

GitHub partners with the world’s leading technology and service providers to help our customers achieve their end-to-end business objectives. Find a GitHub Partner that can help you with your specific needs here.

### GitHub Community

Join the GitHub Community Forum to ask questions, share knowledge, and connect with other GitHub users. It’s a great place to get advice and solutions from experienced users.

## Migration Tools

For a detailed reference based on source and destination environments, see Migration tools comparison on GitHub Docs.

*   **GitHub Enterprise Importer**: Recommended for migrations to GitHub.com and GitHub Enterprise Cloud, allows for migrations of source repository content along with associated metadata, such as Pull Requests and Issues.
    *   **Important**: Learn about limitations of GitHub Enterprise Importer on GitHub Docs to plan for additional considerations for your migration.
*   **ghe-migrator**: Recommended for migrations to GitHub Enterprise Server, allows for migrations of source repository content along with associated metadata.
*   **Git-based migration**: For source-only repository content migrations without metadata.

## Project Planning

Planning is crucial for a successful migration as it provides a structured framework to identify and address potential challenges, ensuring a smooth and efficient transition with minimal disruption to operations.

*   Define the project scope, objectives, and success criteria.
*   Document individuals who need to be involved or informed at different stages.
*   Identify project stakeholders and decision-makers.
*   Establish a project timeline with key milestones.
*   Assess potential risks and develop mitigation strategies.
*   Create a migration plan runbook.
*   Create a comprehensive communication plan.
*   Plan migration pace (e.g., all at once or phased).
*   Document migration schedule for each repository.
*   Identify and document the training needs for both developers and administrators.

## Assessment of Current Environment

Understanding the current environment is fundamental for a successful migration. A thorough assessment provides insights into the existing usage, dependencies, and potential challenges, enabling informed decision-making and minimizing disruptions during the transition.

*   Document the current organizational and team structure.
*   Document inventory structure to applications and services.
*   Document dependencies for repositories.
*   Assess and document existing repository data like sizes, commit history, submodule usage, and Git LFS usage.
*   Document branch policies to recreate in the target environment.
*   Document the current permissions and access patterns of repositories.
*   Document all integrations and external tools in use.
*   Identify the need for reverse proxy or app gateway strategy to consume webhook and audit log data.
*   Document current usage patterns and workflows for transition planning.
*   Design plans for policy and governance of the target environment.

## Target Environment Design and Configuration

Making sure that the target GitHub Enterprise Cloud environment is set up for success is critical for a successful migration process. Learn more about GitHub Enterprise Administration and Governance on GitHub Resources and Governance Design Principles.

*   Map source environment repository structures to target organizations/repositories.
*   Plan the structure of the target environment.
*   Plan for handling large files and repositories.
*   Plan for handling release tags and release artifacts.
*   Set up identity access in the target environment. See Identity and access management for more information on Enterprise identity management configuration options.
*   Configure enterprise, organization, and team structure.
*   Configure governance and policy settings.
*   Conduct security assessments on the target environment.

## Migration Testing and Preparation

Thorough testing and preparation are essential for successful migrations, as they help identify and mitigate potential issues, ensuring a smooth transition and minimizing disruptions.

*   Define testing criteria and success metrics.
*   Identify migration types for each repository.
*   Choose migration tools.
*   Prepare any dependencies for migration tools, as required, such as infrastructure needs, firewall/network configurations, and authentication methods.
*   Correct any issues on existing repository data or make plans for mitigation (such as large files, commit history, metadata sizing, submodules, and Git LFS usage) based on migration method.
*   Perform dry-run migrations to identify issues.
*   Identify integration and external tools compatibility issues.
*   Configure reverse proxy or app gateway as needed for integration of webhooks and audit log data.
*   Run pilot migrations, document and address issues.
*   Configure integration and external tools with pilot migrations.
*   Communicate with pilot users and gather feedback.
*   Establish a process for handling migration failures.
*   Validate governance and policy settings for any changes needed.
*   Document readiness of the destination environment.
*   Document steps to revert in case of failure.

## Repository Migration

Executing the migration is a critical phase that requires coordination and monitoring to ensure a smooth transition. This phase involves executing the migration plan, addressing any issues that arise, and validating the success of the migration.

*   Document issues encountered and resolutions.
*   Freeze changes in the source environment.
*   Create a dedicated migration support channel for issue resolution
*   Execute the migration plan runbook.
*   Track migration status and fix errors.
*   Link identity attribution (when using GitHub Enterprise Importer).

## Post-Migration Activities

Post-migration steps are crucial for a successful transition. They involve verifying data integrity, validating functionality, and addressing any issues. Thorough testing minimizes disruptions and ensures the new environment meets requirements. Additionally, it establishes best practices for ongoing maintenance and long-term success.

*   Confirm repository visibility, permissions, and access controls.
*   Validate migrated data.
*   Convert pipelines to GitHub Actions workflows.
*   Ensure CI/CD and other integrations work.
*   Validate governance and policy settings for any changes needed.
*   Validate compliance and auditing requirements.
*   Update configurations for integrations and tools.
*   Gather developer feedback and improvement suggestions.
*   Monitor performance and usage.
*   Conduct a post-mortem for lessons learned.
*   Plan for deprecation of the source environment.

Overview