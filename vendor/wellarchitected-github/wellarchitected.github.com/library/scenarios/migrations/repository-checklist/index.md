[Content Library](/library/)

[Scenarios](/library/scenarios/)

[Migrations](/library/scenarios/migrations/)

Checklist for Repository Migrations

# Checklist for Repository Migrations

This checklist is intended to facilitate a successful migration to GitHub by providing an overview of the necessary steps involved, with a focus on migrating repositories. This checklist is a guide on **what** needs to be done for a migration as an approach for planning.

## Seeking further assistance[](#seeking-further-assistance)

### GitHub Support[](#github-support)

Visit the [GitHub Support Portal](https://support.github.com/) for a comprehensive collection of articles, tutorials, and guides on using GitHub features and services.

Can’t find what you’re looking for? You can contact GitHub Support by [opening a ticket](https://support.github.com/contact).

### GitHub Expert Services[](#github-expert-services)

GitHub’s [Expert Services Team](https://github.com/services) is here to help you architect, implement, and optimize a solution that meets your unique needs. [Contact us](https://github.com/services#services-contact) to learn more about how we can help you.

### GitHub Partners[](#github-partners)

GitHub partners with the world’s leading technology and service providers to help our customers achieve their end-to-end business objectives. Find a GitHub Partner that can help you with your specific needs [here](https://portal.github.partners/#/page/directory).

### GitHub Community[](#github-community)

Join the [GitHub Community Forum](https://github.com/orgs/community/discussions?discussions_q=label%3A%22GitHub+Well-Architected%22) to ask questions, share knowledge, and connect with other GitHub users. It’s a great place to get advice and solutions from experienced users.

## Migration Tools[](#migration-tools)

For a detailed reference based on source and destination environments, see [Migration tools comparison on GitHub Docs](https://docs.github.com/en/enterprise-cloud@latest/migrations/overview/migration-paths-to-github).

-   [**GitHub Enterprise Importer**](https://docs.github.com/en/enterprise-cloud@latest/migrations/using-github-enterprise-importer/understanding-github-enterprise-importer/about-github-enterprise-importer): Recommended for migrations to GitHub.com and GitHub Enterprise Cloud, allows for migrations of source repository content along with associated metadata, such as Pull Requests and Issues.
    -   **Important**: Learn about [limitations of GitHub Enterprise Importer on GitHub Docs](https://docs.github.com/en/migrations/using-github-enterprise-importer/migrating-between-github-products/about-migrations-between-github-products#limitations-of-github-enterprise-importer) to plan for additional considerations for your migration.
-   [**ghe-migrator**](https://docs.github.com/en/enterprise-cloud@latest/migrations/using-ghe-migrator/about-ghe-migrator): Recommended for migrations to GitHub Enterprise Server, allows for migrations of source repository content along with associated metadata.
-   **Git-based migration**: For source-only repository content migrations without metadata.

## Project Planning[](#project-planning)

Planning is crucial for a successful migration as it provides a structured framework to identify and address potential challenges, ensuring a smooth and efficient transition with minimal disruption to operations.

-   Define the project scope, objectives, and success criteria.
-   Document individuals who need to be involved or informed at different stages.
-   Identify project stakeholders and decision-makers.
-   Establish a project timeline with key milestones.
-   Assess potential risks and develop mitigation strategies.
-   Create a migration plan runbook.
-   Create a comprehensive communication plan.
-   Plan migration pace (e.g., all at once or phased).
-   Document migration schedule for each repository.
-   Identify and document the training needs for both developers and administrators.

## Assessment of Current Environment[](#assessment-of-current-environment)

Understanding the current environment is fundamental for a successful migration. A thorough assessment provides insights into the existing usage, dependencies, and potential challenges, enabling informed decision-making and minimizing disruptions during the transition.

-   Document the current organizational and team structure.
-   Document inventory structure to applications and services.
-   Document dependencies for repositories.
-   [Assess and document existing repository data like sizes, commit history, submodule usage, and Git LFS usage.](https://docs.github.com/en/migrations/overview/planning-your-migration-to-github#building-a-basic-inventory-of-the-repositories-you-want-to-migrate)
-   Document branch policies to recreate in the target environment.
-   Document the current permissions and access patterns of repositories.
-   Document all integrations and external tools in use.
-   Identify the need for reverse proxy or app gateway strategy to consume webhook and audit log data.
-   Document current usage patterns and workflows for transition planning.
-   [Design plans for policy and governance of the target environment](https://wellarchitected.github.com/library/governance/checklist/).

## Target Environment Design and Configuration[](#target-environment-design-and-configuration)

Making sure that the target GitHub Enterprise Cloud environment is set up for success is critical for a successful migration process. Learn more about GitHub Enterprise Administration and Governance on [GitHub Resources](https://resources.github.com/learn/pathways/administration-governance/essentials/administration-governance-github-enterprise-cloud/) and [Governance Design Principles](https://wellarchitected.github.com/library/governance/design-principles/).

-   Map source environment repository structures to [target organizations/repositories](https://docs.github.com/en/migrations/overview/planning-your-migration-to-github#designing-your-organization-structure-for-the-migration-destination).
-   Plan the structure of the target environment.
-   Plan for handling large files and repositories.
-   Plan for handling release tags and release artifacts.
-   Set up identity access in the target environment. See [Identity and access management](https://docs.github.com/en/enterprise-cloud@latest/admin/managing-iam/understanding-iam-for-enterprises) for more information on Enterprise identity management configuration options.
-   Configure enterprise, organization, and team structure.
-   Configure governance and policy settings.
-   Conduct security assessments on the target environment.

## Migration Testing and Preparation[](#migration-testing-and-preparation)

Thorough testing and preparation are essential for successful migrations, as they help identify and mitigate potential issues, ensuring a smooth transition and minimizing disruptions.

-   Define testing criteria and success metrics.
-   Identify migration types for each repository.
-   [Choose migration tools](#migration-tools).
-   Prepare any dependencies for migration tools, as required, such as infrastructure needs, firewall/network configurations, and authentication methods.
-   Correct any issues on existing repository data or make plans for mitigation (such as large files, commit history, metadata sizing, submodules, and Git LFS usage) based on migration method.
-   [Perform dry-run migrations to identify issues.](https://docs.github.com/en/migrations/overview/planning-your-migration-to-github#performing-a-dry-run-migration-for-every-repository)
-   Identify integration and external tools compatibility issues.
-   Configure reverse proxy or app gateway as needed for integration of webhooks and audit log data.
-   Run pilot migrations, document and address issues.
-   Configure integration and external tools with pilot migrations.
-   Communicate with pilot users and gather feedback.
-   Establish a process for handling migration failures.
-   Validate governance and policy settings for any changes needed.
-   Document readiness of the destination environment.
-   Document steps to revert in case of failure.

## Repository Migration[](#repository-migration)

Executing the migration is a critical phase that requires coordination and monitoring to ensure a smooth transition. This phase involves executing the migration plan, addressing any issues that arise, and validating the success of the migration.

-   Document issues encountered and resolutions.
-   Freeze changes in the source environment.
-   Create a dedicated migration support channel for issue resolution
-   Execute the migration plan runbook.
-   Track migration status and fix errors.
-   [Link identity attribution](https://docs.github.com/en/enterprise-cloud@latest/migrations/using-github-enterprise-importer/completing-your-migration-with-github-enterprise-importer/reclaiming-mannequins-for-github-enterprise-importer) (when using GitHub Enterprise Importer).

## Post-Migration Activities[](#post-migration-activities)

Post-migration steps are crucial for a successful transition. They involve verifying data integrity, validating functionality, and addressing any issues. Thorough testing minimizes disruptions and ensures the new environment meets requirements. Additionally, it establishes best practices for ongoing maintenance and long-term success.

-   Confirm repository visibility, permissions, and access controls.
-   Validate migrated data.
-   Convert pipelines to GitHub Actions workflows.
-   Ensure CI/CD and other integrations work.
-   Validate governance and policy settings for any changes needed.
-   Validate compliance and auditing requirements.
-   Update configurations for integrations and tools.
-   Gather developer feedback and improvement suggestions.
-   Monitor performance and usage.
-   Conduct a post-mortem for lessons learned.
-   Plan for deprecation of the source environment.

Last updated on December 10, 2025