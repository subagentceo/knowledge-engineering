# Enforce GitHub Advanced Security at Scale

Libraries

Application Security

Recommendations

Enforce GitHub Advanced Security at Scale

# Enforce GitHub Advanced Security at Scale

Greg Mohler·@callmegreg

July 3, 2024

## Scenario overview

Some enterprises want to enforce passing security tests before code is merged with a shared branch, especially for their most important applications, in order to comply with stringent regulatory requirements and industry standards.

There are important factors to consider so that the right scrutiny is proactively applied to the right repositories, and so that developer experience is not sacrificed along the way.

This article provides recommendations around enforcing GitHub Advanced Security (GHAS) at scale, leveraging other features that are native to GitHub Enterprise Cloud (GHEC) and GitHub Enterprise Server (GHES).

## Key design strategies and checklist

When enforcing GHAS at scale, it is important to consider the following key components:

1.  **Establish a branching strategy** - A consistent branching strategy across repositories will make it easier to enforce GHAS at scale.
2.  **Manage repositories with custom properties** - Repository custom properties can be used to store metadata about a repository, such as business criticality, or security and compliance requirements.
3.  **Use Security Configurations where possible** - Security Configurations are collections of enablement settings for GitHub’s security features that you can apply to any repository within your Organization.
4.  **Create Repository Rulesets for supplemental enforcement** - Repository Rulesets allow you to restrict merges to target branches, for target repositories, until a defined set of conditions are met.
5.  **Consider your desired access permissions** - Ensure that the right people have the right level of access to security alerts.
6.  **Create and monitor an exception process** - Have a clear and auditable process for granting exceptions to security scanning and remediation.

## Assumptions and preconditions

These recommendations assume that you have the following:

*   Either GitHub Enterprise Cloud (GHEC) or GitHub Enterprise Server (GHES)
*   Sufficient GitHub Advanced Security licenses for all repositories that you want to scan
*   Access to GitHub Actions

## Recommended deployment

### Establish a branching strategy

A consistent branching strategy across repositories will make it easier to enforce GHAS at scale. This is because enforcement can be implemented as a requirement before code is merged into a target branch.

One popular branching strategy is GitHub Flow, where the `main` branch is the default branch for all repositories and represents deployable, production code. Developers create feature branches off of `main` to work on new features or bug fixes. When a feature is ready for review, a Pull Request is created to merge the feature branch back into `main`.

Another common branching strategy is Git Flow, which uses `main` as the production branch and `develop` as the integration branch. Feature branches are created off of `develop` and merged back into `develop` via Pull Requests. When `develop` is ready for a release, it is merged into `main`.

### Manage repositories with custom properties

Repository custom properties can be used to store metadata about a repository, such as its business criticality, or its security and compliance requirements. This metadata can be set via API, and can be used to dynamically manage and govern repositories at scale through built-in integrations with other native GitHub features such as Security Configurations and Repository Rulesets.

ℹ️

Repository custom properties are available in GitHub Enterprise Cloud and GitHub Enterprise Server 3.13 and later.

### Use Security Configurations where possible

Security Configurations are collections of enablement settings for GitHub’s application security features that you can apply to any repository within your Organization. You can create a Security Configuration that includes the GHAS scanning features you want to enforce, and apply it to all repositories based on custom property values.

ℹ️

Security Configurations are available in GitHub Enterprise Cloud and GitHub Enterprise Server 3.15 and later.

### Create Repository Rulesets for supplemental enforcement

Depending on your requirements, you may want to enforce GHAS at scale based on a set of conditions that are not covered by Security Configurations.

Repository Rulesets allow you to restrict merges to target branches, for target repositories, until a defined set of conditions are met. You can create Rulesets that require custom workflows to pass before code can be merged, and apply them to repositories based on naming convention or custom property values.

ℹ️

Repository Rulesets are available in GitHub Enterprise Cloud and GitHub Enterprise Server 3.11 and later.

### Enforcing Secret Scanning

The recommended way to enforce secret scanning at scale is to use Security Configurations at the Organization level.

Enforcing _secret scanning_ as part of a Security Configuration will raise alerts for secrets found in the Code, Issues, Pull Requests, Discussions, and Wiki tabs of the repository.

Enforcing _push protection_ as part of a Security Configuration will stop new secrets from being pushed to repositories.

By default, anyone with `Write` access to a repository has the ability to bypass push protection. This ability can be restricted by enabling delegated bypass for push protection.

Users with `Write` access to a repository can add a `secret_scanning.yml` file to the `.github` directory of a repository to exclude certain files or filepaths from secret scanning. To prevent this file from being created across an Organization, configure a push ruleset that restricts pushes to the path `.github/secret_scanning.yml` across all repositories.

### Enforcing Dependency Scanning

Scanning existing dependencies in a repository can be enforced by enabling Dependabot within a Security Configuration. Dependabot will raise alerts when a vulnerable dependency is detected in a repository, and Security Updates will automatically create a Pull Request to update the vulnerable dependency to a non-vulnerable version.

To prevent new vulnerable dependencies from being added to target repositories, you can define a centralized reusable workflow that makes use of Dependency Review, a GitHub Action that evaluates changes to dependency manifest files, and include that workflow as a required workflow within a Repository Ruleset.

Dependency Review can be configured to fail a status check on the Pull Request, thus blocking Pull Request merges if a commit either introduces a net new vulnerability that surpasses a specific severity, or if the commit introduces a dependency with a specific software license.

To configure and enforce a centralized Dependency Review workflow:

1.  Create or identify an `internal` repository that will host the centralized workflow file. Choosing `internal` will allow other `private` and `internal` repositories to use the workflow.
    
    ℹ️
    
    If you opt for a `private` repository, only other `private` repositories will be able to use the workflow.
    
2.  Update the repository’s settings to make the workflow accessible by other repositories.
3.  Under the `.github/workflows` directory of the repository, create a new workflow file that uses the actions/dependency-review Action, similar to the example below:

```yaml
# This Action will scan dependency manifest files that change as part of a Pull Request,
# surfacing known-vulnerable versions of the packages declared or updated in the PR.
name: 'Dependency Review'
on:
  pull_request:

permissions:
  contents: read
  pull-requests: write

jobs:
  dependency-review:
    runs-on: ubuntu-latest
    steps:
      - name: 'Checkout repository'
        uses: actions/checkout@v4

      - name: 'Dependency Review'
        uses: actions/dependency-review-action@v4
        # For all configuration options, see https://github.com/actions/dependency-review-action#configuration-options
        with:
          comment-summary-in-pr: on-failure
          fail-on-severity: moderate
          deny-licenses: GPL-1.0-or-later, LGPL-2.0-or-later
```

4.  Set the configuration parameters for Dependency Review (under the `with:` key) to meet your Organization’s requirements. For a full list of configuration options, see the Dependency Review Action documentation.
5.  Ensure that your Repository Ruleset is configured to require your newly defined workflow to pass before merging.

### Enforcing Code Scanning

When enforcing code scanning, there are two popular options:

1.  **Security Configurations** - Security Configurations provide an easy way to enforce Code Scanning Default Setup, which leverages CodeQL.
2.  **Required workflows with Repository Rulesets** - With Repository Rulesets, you can create centralized GitHub Actions workflows that must run and pass before code can be merged into a target branch.

With either option, it’s important to consider the programming languages used in the repositories that you’re targeting. Compiled languages (like C/C++, C#, Java, and Go) are more likely to run into code scanning errors if the scan is run without following the application’s proper build steps. Interpreted languages (like Python, Ruby, and JavaScript/TypeScript) are much less likely to run into these issues.

You can use utilities like this GitHub CLI extension to analyze the languages used across a GitHub Organization, and use that information to determine an approach that will best suit your needs.

### Access permissions

When enforcing GHAS at scale, it is important to ensure that the right people have the right level of access to security alerts. This may entail creating custom roles with specific permissions to alerts, or using the default repository roles in GitHub.

The following table illustrates access permissions to alerts for the five default repository roles in GitHub:

Repository Role

Secret scanning alert access

Dependency scanning alert access

Code scanning alert access

Read

None*

None

None

Triage

None*

None

None

Write

None*

Read + Write

Read + Write

Maintain

None*

Read + Write

Read + Write

Admin

Read + Write

Read + Write

Read + Write

_*By default, the commit author for a secret scanning alert has write access to the alert._

Separate from the default repository roles, there is a pre-defined Organization role, Security manager, which is a great option for personas who need `Read` access to all repositories in the Organization, and `Write` access to all security alerts in the Organization.

Custom roles can be created to provide more granular access to security alerts as needed. Each security alert (secret scanning, dependency scanning, and code scanning) has both a `Read` permission and a `Write` permission that can be added to a custom role.

### Creating and monitoring an exception process

There may be times when it is justified to exempt a Pull Request from security scanning, or to exempt a security alert from remediation. In these cases, it is important to have a clear and auditable process for granting these exceptions.

When configuring a Repository Ruleset, you can grant specific Teams, Roles, or GitHub Apps the ability to bypass the Ruleset. This will allow members of the exempted entity to merge code without meeting the conditions of the Ruleset in emergency situations.

When an entity bypasses the requirements of a Ruleset, an event is fired and recorded in the Enterprise’s Audit Log. Similarly, when a security alert is opened, resolved, or dismissed, an event is fired and recorded in the Audit Log.

By configuring a webhook at the Enterprise level that listens for these events, or by streaming the Enterprise Audit Log, you can take immediate action, notify relevant stakeholders, or forward the event details to a monitoring tool, like Microsoft Sentinel. For more guidance on integrating GitHub Advanced Security with Microsoft Sentinel, follow GitHub’s instructional video.

## Additional solution detail and trade-offs to consider

### Code Scanning Default Setup with Security Configurations vs. required workflows with Repository Rulesets

While using Security Configurations to enforce Code Scanning Default Setup is the easiest way to enforce code scanning at scale, it may not be the most flexible. If you need to fine-tune the CodeQL workflow, or if you want to enforce additional third-party code scanning tools, you should leverage required workflows with Repository Rulesets.

### Dynamically targeting repositories with custom properties

When applying Security Configurations based on a repository custom property, it requires a consistent process for setting and maintaining the properties, and applying configurations based on those property values. This may require additional automation, or manual processes, depending on the size of the Organization.

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

## Related links

### GitHub Documentation

For more details about GitHub’s features and services, check out GitHub Documentation.

### External Resources

*   KPMG: Security Monitoring in GitHub

Last updated on July 3, 2024

Securing GitHub Actions WorkflowsGitHub Repositories Threat Model