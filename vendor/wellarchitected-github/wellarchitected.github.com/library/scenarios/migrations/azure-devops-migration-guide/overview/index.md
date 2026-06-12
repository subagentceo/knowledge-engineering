# Overview

Libraries

Scenarios

Migrations

Azure DevOps to GitHub Enterprise Migration Guide

Overview

# Overview

This guide is your step-by-step reference for migrating from Azure DevOps to GitHub Enterprise Cloud. Each section provides practical steps, clear recommendations, and links to helpful resources—so you can move forward with confidence.

ℹ️

Each page in this guide includes focused learning resources to support every phase of your migration journey.

## Why a Complete Migration Plan Matters

*   **Strategic alignment:** Migrations are an opportunity to review workflows, branching strategies, and team structures.
*   **Risk mitigation:** A well-structured plan helps prevent data loss, downtime, and security issues.
*   **Long-term scalability:** A successful migration prepares your organization for future growth and innovation.

## Learning resources

Start with these foundational resources about GitHub and migration:

*   **GitHub documentation**
    *   Introduction to GitHub Enterprise Cloud – Platform overview
    *   Migration fundamentals – Core concepts
*   **Microsoft Learn**
    *   GitHub Enterprise fundamentals – Platform essentials
    *   Azure DevOps integration – Integration options

## Features and interoperability

When planning a migration from Azure DevOps to GitHub, it’s important to understand the differences in features and capabilities, as well as the integration options available to maintain existing Azure DevOps services if needed.

### Key Feature Comparison

#### Repositories and Code Management

*   **Azure DevOps:** Supports Git and legacy TFVC repositories, with built-in code review tools.
*   **GitHub:** Focuses on Git repositories, with advanced code review workflows, pull requests, and governance capabilities. GitHub’s branching and merging strategies are optimized for collaborative development.
*   **Integration options:** Complete repository migration with history and metadata using GitHub Enterprise Importer.

#### Work Item Tracking

*   **Azure DevOps:** Azure Boards provides comprehensive work item tracking, sprint planning, and reporting features. It is highly configurable and integrates with other Azure DevOps services.
*   **GitHub:** GitHub Issues and Projects offer an integrated approach to work item tracking, with templates, labels, sub-issues, issue types, and milestones.
*   **Integration options:** Ability to maintain Azure Boards integration with GitHub repositories for teams that prefer Azure Boards.

#### CI/CD

*   **Azure DevOps:** Azure Pipelines offers robust CI/CD capabilities, supporting multi-platform builds and deployments.
*   **GitHub:** GitHub Actions provides a flexible and customizable automation platform for CI/CD.
*   **Integration options:** Ability to continue using Azure Pipelines with GitHub repositories while transitioning.

#### Collaboration and Community

*   **Azure DevOps:** Primarily used within organizations for private projects. While it supports public projects, the community aspect is less emphasized.
*   **GitHub:** Known for its strong community and collaborative focus. GitHub hosts millions of open-source projects and has this community at its core. Features like discussions, pull requests, and issue tracking foster collaboration among developers worldwide.
*   **Integration options:** Not applicable.

## Migration Journey Map

Your migration journey includes these steps:

1.  Project Planning – _Establish your migration strategy and timeline_
2.  Source Environment Assessment – _Analyze your current Azure DevOps setup_
3.  Target Environment Setup – _Prepare GitHub Enterprise Cloud_
4.  Migration Testing – _Test and validate your migration process_
5.  Repository Migration – _Move your code and history_
6.  Post-Migration Activities – _Review, optimize, and support ongoing improvements_

ℹ️

Start with the Project Planning guide to establish a strong foundation for your migration journey.

## Getting Started

Before you begin, review these essential resources:

Resource

Purpose

GitHub Enterprise Cloud documentation

Platform documentation

GitHub Enterprise Importer

Migration tool guide

Azure DevOps Integration

Integration options

Well-Architected Framework

Best practices

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

## Migration Checklist

This checklist provides an overview of the necessary steps for migrating from Azure DevOps to GitHub Enterprise Cloud. Detailed information is provided in each section of the guide.

### Migration Tools

Compare tools at Migration tools comparison on GitHub Docs

### GitHub Enterprise Importer (GEI)

GEI is recommended for most migrations.

#### Key Benefits

Feature

Description

History

_Maintains commit history and authorship_

PRs

_Migrates pull requests with review history_

Work Items

_Preserves links and converts to issues_

Automation

_Supports interactive and scripted migrations_

Reliability

_Provides error handling and retry mechanisms_

> Review GEI limitations on migrated data.

#### Git-based Migration

Consider this approach when:

*   You only need to migrate source code
*   Metadata migration is not required

### Azure DevOps Integration Options

After migrating repositories to GitHub, you can maintain integration with Azure DevOps services:

#### Azure Boards Integration

*   **Work Item Linking**: Connect GitHub repositories to Azure Boards to:
    *   Link commits and pull requests to work items
    *   Update work item status from GitHub commits
    *   View GitHub development activity in Azure Boards
    *   Configure the Azure Boards app for GitHub

#### Azure Pipelines Integration

*   **Build and Deploy from GitHub**: Keep using Azure Pipelines with GitHub repositories:
    *   Use Azure Pipelines for CI/CD while migrating gradually
    *   Trigger builds from GitHub events
    *   Deploy to Azure services
    *   Connect Azure Pipelines to GitHub

### Project Planning

Find additional guidance in the Project Planning guide.

Planning is crucial for a successful migration as it provides a structured framework to identify and address potential challenges, ensuring a smooth and efficient transition with minimal disruption to operations.

*   Define the project scope, objectives, and success criteria.
*   Document individuals who need to be involved or informed at different stages.
*   Identify project stakeholders and decision-makers.
*   Establish a project timeline with key milestones.
*   Assess potential risks and develop mitigation strategies.
*   Create and maintain a migration plan runbook.
*   Create a comprehensive communication plan.
*   Plan migration pace (e.g., all at once or phased).
*   Document migration schedule for each repository.
*   Identify and document the training needs for both developers and administrators.

### Assessment of Current Environment

Find additional guidance in the Source Environment Assessment guide.

Understanding the current environment is fundamental for a successful migration. A thorough assessment provides insights into the existing usage, dependencies, and potential challenges, enabling informed decision-making and minimizing disruptions during the transition.

*   Document the current organizational and team structure.
*   Document inventory structure to applications and services.
    *   Use the `gh ado2gh inventory-report` command to generate reports about your Azure DevOps environment, including organizations, projects, repositories, and pipelines.
*   Document dependencies for repositories.
*   Assess and document existing repository data like sizes, commit history, and Git LFS usage.
*   Document branch policies to recreate in the target environment.
*   Document the current permissions and access patterns of repositories.
*   Document all integrations and external tools in use.
*   Document current usage patterns and workflows for transition planning.
*   Design plans for policy and governance of the target environment.

### Target Environment Design and Configuration

Find additional guidance in the Target Environment Setup guide.

Making sure that the target GitHub Enterprise Cloud environment is set up for success is critical for a successful migration process. Learn more about GitHub Enterprise Administration and Governance on GitHub Resources and GitHub Well Architected.

*   Administrators should plan for learning about GitHub Enterprise Cloud and its features.
    *   Microsoft Learn has options available for self-paced learning.
*   Map source environment repository structures to target organizations/repositories.
*   Plan the structure of the target environment.
*   Plan for handling large files and repositories.
*   Plan for handling release tags and release artifacts.
*   Set up identity access in the target environment.
*   Configure enterprise, organization, and team structure.
*   Configure governance and policy settings.
*   Conduct security assessments on the target environment.

### Migration Testing and Preparation

Find additional guidance in the Migration Testing guide.

Thorough testing and preparation are essential for successful migrations, as they help identify and mitigate potential issues, ensuring a smooth transition and minimizing disruptions.

*   Define testing criteria and success metrics.
*   Identify migration types for each repository.
*   Choose migration tools (GitHub Enterprise Importer is recommended).
*   Use `gh ado2gh inventory-report` data to prioritize and batch repositories for migration:
    *   Identify inactive repositories that can be archived or migrated later
    *   Group repositories by size, activity level, or complexity for efficient migration planning
    *   Identify repositories with potential migration challenges (large files, extensive history)
*   Correct any issues on existing repository data (such as large files, commit history, metadata sizing, and Git LFS usage) based on migration method.
*   Perform dry-run migrations to identify issues.
*   Identify integration and external tools compatibility issues.
*   Run pilot migrations, document and address issues.
*   Configure integration and external tools with pilot migrations.
*   Communicate with pilot users and gather feedback.
*   Establish a process for handling migration failures.
*   Validate governance and policy settings for any changes needed.
*   Document readiness of the destination environment.
*   Document steps to revert in case of failure.

### Repository Migration

Find additional guidance in the Repository Migration guide.

*   Document issues encountered and resolutions.
*   Freeze changes in the source environment.
*   Create a dedicated migration support channel for issue resolution
*   Execute the migration plan runbook.
*   Track migration status and fix errors.
*   Link identity attribution (when using GitHub Enterprise Importer).

### Post-Migration Activities

Find additional guidance in the Post-Migration Activities guide.

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

Plan