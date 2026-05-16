---
title: "Set Up Your Organization"
description: "Learn how to set up a Sentry organization account, so you can start fixing errors right away."
url: https://docs.sentry.io/organization/getting-started/
---

# Set Up Your Organization

In this guide, we'll provide the recommended checklist for setting up your [Sentry organization account](https://sentry.io) so you can get started with Sentry error monitoring.

If you'd prefer a TL;DR, download our ["Admin Quick Reference Guide"](https://docs.sentry.io/pdfs/Admin-quick-reference-guide.pdf)

We understand that some of you are running enterprise organizations, while others of you are hobbyists just coding for fun. Below, we've linked where you should get started, depending on your situation.

* You're configuring Sentry for a large organization? [Start at step 1](https://docs.sentry.io/organization/getting-started.md#1-enable-single-sign-on-access)
* You're working on an application with a small team? [Start step 2](https://docs.sentry.io/organization/getting-started.md#2-set-up-teams)
* You're a hobbyist or working on an app alone? [Start at step 3](https://docs.sentry.io/organization/getting-started.md#3-configure-integrations)

Of course, you're welcome to go through all the steps, even if you're a team of one.

## [1. Enable Single Sign-On Access](https://docs.sentry.io/organization/getting-started.md#1-enable-single-sign-on-access)

[Single sign-on (SSO)](https://docs.sentry.io/organization/authentication/sso.md) allows your team to log in quickly, streamlines the on/off-boarding process for member accounts, and strengthens your login with secure credentials. Sentry provides out-of-the-box configuration for integrating SSO providers like [Okta](https://docs.sentry.io/organization/authentication/sso.md#okta) and [Azure Active Directory](https://docs.sentry.io/organization/authentication/sso.md#azure-active-directory) (SAML) or [Google](https://docs.sentry.io/organization/authentication/sso.md#google-business-app) and [GitHub](https://docs.sentry.io/organization/authentication/sso.md#github-organizations) (Oauth). In addition, we provide a generic configuration option for any other [SAML2 Identity Provider](https://docs.sentry.io/organization/authentication/sso/saml2.md).

Sentry also supports a subset of the specification for System for Cross-Domain Identity Management (SCIM) for [Okta](https://docs.sentry.io/organization/authentication/sso/okta-sso/okta-scim.md) and [Azure AD](https://docs.sentry.io/organization/authentication/sso/azure-sso.md#scim-integration).

## [2. Set Up Teams](https://docs.sentry.io/organization/getting-started.md#2-set-up-teams)

Now that SSO is configured and members have created their accounts, add them to their Sentry Teams. Teams are associated with your [Sentry projects](https://docs.sentry.io/organization/getting-started.md#4-create-projects), and their members receive issue notifications in addition to becoming issue assignees. We recommend creating Sentry teams that align with your internal team structure (for example, *#Frontend*, *#Ops*, *#SDK*, and so on). To add a new team, go to **Settings > Teams** and click "Create Team".

Click on a team name to open the team settings and manage its associated members and projects. Under the "Members" tab, add existing members to your team by clicking on "Add Member > \[Member Name]".

You can also invite multiple new (external) members to join your organization and team by clicking on "Add Member > Invite Member".

Learn more about different user roles in [Organization Management](https://docs.sentry.io/organization/membership.md).

## [3. Configure Integrations](https://docs.sentry.io/organization/getting-started.md#3-configure-integrations)

Sentry integrates into your existing workflows by providing out-of-the-box integrations with widely-used apps and services. To enable and configure integrations, go to **Settings > Integrations**. There are several types of integrations available, but we recommend that you immediately set up integrations for:

* [Alerting](https://docs.sentry.io/organization/getting-started.md#31-alert-notifications)
* [Source code management](https://docs.sentry.io/organization/getting-started.md#32-source-code-management)
* [Issue tracking](https://docs.sentry.io/organization/getting-started.md#33-issue-tracking)

### [Alert Notifications](https://docs.sentry.io/organization/getting-started.md#alert-notifications)

By default, Sentry will notify you about errors in your apps by email and [Slack](https://docs.sentry.io/integrations/notification-incidents/slack.md) (once you enable the integration). You can also enable team notifications in Slack so the right people in your organization always receive the alerts they need. In addition to Slack, Sentry offers several other [notification and incident integrations](https://docs.sentry.io/integrations/notification-incidents.md) to help you triage issues, including [Discord](https://docs.sentry.io/integrations/notification-incidents/discord.md), [Microsoft Teams](https://docs.sentry.io/integrations/notification-incidents/msteams.md), and [PagerDuty](https://docs.sentry.io/integrations/notification-incidents/pagerduty.md).

Learn more about setting up alerts with integrations in [Alerts](https://docs.sentry.io/product/monitors-and-alerts/alerts.md).

### [Source Code Management](https://docs.sentry.io/organization/getting-started.md#source-code-management)

When you enable an integration with your source code management (SCM) provider, Sentry will analyze your commit data to:

1. Identify **suspect commits** that likely introduced an error.

2. **Suggest assignees** who can best resolve the error, based on the suspect commits and your [codeowners file](https://docs.sentry.io/product/issues/issue-owners.md#code-owners).

3. Mark an issue as **Resolved via Commit or PR** to stop notifications about similar errors in past releases and notify you of a regression.

4. Link a Sentry issue to a new or existing issue in your integrated [issue tracking](https://docs.sentry.io/organization/getting-started.md#33-issue-tracking) solution.

Sentry has built-in SCM integrations with:

* [Azure DevOps](https://docs.sentry.io/integrations/source-code-mgmt/azure-devops.md)
* [GitHub](https://docs.sentry.io/integrations/source-code-mgmt/github.md)
* [GitLab](https://docs.sentry.io/integrations/source-code-mgmt/gitlab.md)
* [Bitbucket](https://docs.sentry.io/integrations/source-code-mgmt/bitbucket.md)

If you're using a different SCM provider or don't want Sentry to connect to your repository, check out our [Releases documentation](https://docs.sentry.io/product/releases/associate-commits.md) to learn how you can still associate commits with your release.

### [Issue Tracking](https://docs.sentry.io/organization/getting-started.md#issue-tracking)

Enabling an integration with your issue tracking solution allows you to create a new issue from within the **Issue Details** page in [sentry.io](https://sentry.io), or link to an existing one. GitHub, GitLab, and Bitbucket issues are associated with their respective SCM integrations. Sentry also integrates with [Azure DevOps](https://docs.sentry.io/integrations/source-code-mgmt/azure-devops.md), [Shortcut](https://docs.sentry.io/integrations/issue-tracking/shortcut.md), [Jira](https://docs.sentry.io/integrations/issue-tracking/jira.md), and others.

For a list of all supported integrations, check out out our [full Integrations documentation](https://docs.sentry.io/integrations.md).

You can set up automated issue management when you create alerts that route to [Azure DevOps](https://docs.sentry.io/integrations/source-code-mgmt/azure-devops.md#automatically) and [Jira](https://docs.sentry.io/integrations/issue-tracking/jira.md#automatically). External issues will be created for new Sentry issues on your behalf, and these issues will use the configured fields in your Azure DevOps or Jira workspace. For other issue tracking solutions, you can manually link Sentry issues.

Automatic issue management is available only if your organization is on a Business or Trial plan.

## [4. Create Projects](https://docs.sentry.io/organization/getting-started.md#4-create-projects)

To start monitoring errors in your app with Sentry, you'll need to initialize the SDK with a DSN key. To obtain a key, add a new Sentry project by going to **Projects** and clicking "Create Project". Give the project a name and assign the responsible [team (or teams)](https://docs.sentry.io/organization/getting-started.md#2-set-up-teams). Then, retrieve the key in your project's [Client Keys (DSN)](https://sentry.io/orgredirect/organizations/:orgslug/settings/projects/:projectId/keys/) settings.

Once the SDK is initialized, any error that occurs in your code, wherever it may be deployed and running, will be associated with that specific project.

If you haven't set up any teams to associate with your project because you skipped to step three, don't worry. Even on our free Developer plan, Sentry automatically sets up a team for you based on the name of your organization, and adds you to it.

### [What's in a Project?](https://docs.sentry.io/organization/getting-started.md#whats-in-a-project)

A *project* is a logical entity that connects the errors in your application (or a part of it) to the team members assigned to that project. The project settings determine:

* Which errors should be ingested into your Sentry account and which should be dropped, through [Inbound Filters](https://docs.sentry.io/pricing/quotas.md#inbound-data-filters)
* Who to notify, about what error, and how, using [Alert Rules](https://docs.sentry.io/product/monitors-and-alerts/alerts.md)
* Which errors should be automatically assigned to which member or team using [Ownership Rules](https://docs.sentry.io/product/issues/ownership-rules.md)
* Custom rules to fine-tune [Event Grouping](https://docs.sentry.io/concepts/data-management/event-grouping.md) into issues

Also, when you go to the **Issues** and **Discover** pages in [sentry.io](https://sentry.io), the filter at the top of the screen prioritizes the projects you're a member of by default. This way, developers are looking at information that is relevant to their work, and they see the errors that they might need to work on.

### [How Many Projects Should I Create?](https://docs.sentry.io/organization/getting-started.md#how-many-projects-should-i-create)

You could theoretically put all your errors into a single project, as this isn't limited in [sentry.io](https://sentry.io). However, setting up multiple projects to reflect your application with finer granularity helps makes errors more visible and actionable, which can have a big impact on your team's productivity.

Here are some points to consider:

* If your application's source code is managed in **multiple repositories**, create a **separate project for each repo**.
* If your app is made up of **several micro-services**, **split them into projects** accordingly.
* If you have a **monolithic codebase**, set up **separate projects for the backend and frontend**.
* Give **each language its own project**. For example, if your backend code contains NodeJS and Java components, separate those into two different projects.

## [5. Define Environments](https://docs.sentry.io/organization/getting-started.md#5-define-environments)

Depending on your development life cycle, your applications are probably deployed and running in multiple environments — *QA*, *Staging*, *Production*, and so on. Configuring the environment in your Sentry SDK will add the tag to every error event and will help you associate events with the environment in which they occurred. You can do that by creating a `SENTRY_ENVIRONMENT` environment variable or by explicitly defining it in the SDK configuration. Learn more in [Environments](https://docs.sentry.io/platform-redirect.md?next=/configuration/environments/).

Having the environment defined in your SDK will allow you to:

* Create environment-specific alert rules.
* Filter the **Issues** page based on the environment.
* Gain comparative insights, based on the environment, through queries in **Discover**.
