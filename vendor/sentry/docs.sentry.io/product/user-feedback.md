---
title: "User Feedback"
description: "Learn how you can view and triage user feedback submissions."
url: https://docs.sentry.io/product/user-feedback/
---

# User Feedback

Sentry automatically detects errors thrown by your application, such as performance issues and user experience problems like rage clicks. But there are other frustrations your users may encounter (broken permission flows, broken links, typos, misleading UX, business logic flaws, and so on).

That's where Sentry's User Feedback Widget and Crash-Report Modal features come in. Setting up one or both lets you collect feedback from your end-users when they run into bugs in your application. Sentry then links that feedback to available rich debugging context, including errors, replays, and tags such as URL, allowing you to get to the root of the problem faster.

For example, using [Session Replay](https://docs.sentry.io/product/explore/session-replay.md) with the User Feedback Widget could save you time, helping you quickly understand the context of the user problem by seeing exactly what they experienced before submitting their feedback.

## [User Feedback Widget](https://docs.sentry.io/product/user-feedback.md#user-feedback-widget)

The User Feedback Widget is an out-of-the-box, persistent widget you can add anywhere on your web application. It allows users to submit feedback quickly and easily any time they encounter something that isn't working as expected. Learn more about how to install and customize it [here](https://docs.sentry.io/product/user-feedback/setup.md) and recommended best practices [here](https://docs.sentry.io/product/sentry-basics/user-feedback-basics.md).

Feedback collected via the Feedback Widget may have some or all of the following information (depending on what you mark as required and what's available from the error context):

* Description from the user
* Screenshot from the user
* User email
* Associated replay event (with up to 60 seconds of replay recording before the user submitted the feedback)
  * Learn more about how to set up Session Replay [here](https://docs.sentry.io/product/explore/session-replay/getting-started.md).
* URL of the page the user was on when they submitted the feedback
* Tags

## [Crash-Report Modal](https://docs.sentry.io/product/user-feedback.md#crash-report-modal)

Another way to collect feedback is by installing the Crash-Report Modal. This allows users to submit feedback after they experience an error via an automatic modal that pops up after an error occurs. Learn more about how to install and customize it [here](https://docs.sentry.io/platforms/javascript/user-feedback.md#crash-report-modal).

Feedback collected via the Crash-Report Modal will have the following information:

* Description from the user
* Sentry Issue preview and link to the Issue Details page
* URL of the page the user was on when they submitted the feedback
* Tags

## [User Feedback API](https://docs.sentry.io/product/user-feedback.md#user-feedback-api)

We also provide an API to send user feedback programmatically. This allows you to connect your own user interface to Sentry. For more details, see the [set up guide](https://docs.sentry.io/product/user-feedback/setup.md#supported-sdks-for-user-feedback-api).

## [Where to View User Feedback](https://docs.sentry.io/product/user-feedback.md#where-to-view-user-feedback)

Whether you choose to collect user feedback via the Feedback Widget, the Crash-Report Modal, or both, you'll be able to view it from the **User Feedback** page. The page is chronologically-organized with the most recent, unresolved feedback at the top. You can click on individual feedback to see more details all in one view, similar to your e-mail inbox. The right-hand side shows the **User Feedback Details** view, which includes the user's description and any available debugging context.

You can narrow down the results in the feedback list by using the project, environment, and date range filters.

## [AI-Powered User Feedback Summaries](https://docs.sentry.io/product/user-feedback.md#ai-powered-user-feedback-summaries)

Sentry now provides **AI-powered user feedback summaries** that automatically analyze your feedback to give you actionable insights at a glance. This at-a-glance summary can help you understand large amounts of user feedback without having to manually triage every piece of feedback, transforming overwhelming volume into actionable insights, and helping you prioritize user experience improvements.

### [How It Works](https://docs.sentry.io/product/user-feedback.md#how-it-works)

At the top of the User Feedback index, you'll see a summary highlighting your users' most common sentiments across the project(s) and date range you've selected. The summary provides a concise overview of what users are saying about your product. The summary also provides AI-generated categories that you can click to filter the feedback. The filtered list will then show contextually relevant feedback; for example, feedback related to your app's "performance".

## [Triaging User Feedback Submissions](https://docs.sentry.io/product/user-feedback.md#triaging-user-feedback-submissions)

You can either manually resolve user feedback submissions on the **User Feedback Details** view by clicking the “Resolve” button in the top-right corner, or bulk resolve by multi-selecting the feedback:

You can also assign a team member to a specific user feedback submission on the **User Feedback Details** view. If you come across user feedback that you consider spam, select the feedback(s) and click "Mark as Spam". This feedback will then be filtered out and moved to the "Spam" heading.

## [Creating or Linking External Issues From User Feedback](https://docs.sentry.io/product/user-feedback.md#creating-or-linking-external-issues-from-user-feedback)

If you have GitHub, Jira, or any other [issue tracking integration](https://sentry.io/integrations/) set up with Sentry, you can create an external issue or link an existing issue from the User Feedback page. On the **User Feedback Details** view, you should see all of your integrations appear in the header, under the project name.

Clicking on an integration name will open up a modal, which will allow you to create a new external issue or link an existing issue.

The modal will be populated with a default title ("User Feedback") and description containing the basic details of the feedback, including a link to the feedback in Sentry and the user's message. You can edit the title and description, as well as configure the issue's repository, labels, and assignee.

To create the issue, simply click the "Create Issue" button at the bottom of the modal. To link an existing issue, click on the "Link" tab in the modal, and then click "Link Issue".

## [Searching for User Feedback](https://docs.sentry.io/product/user-feedback.md#searching-for-user-feedback)

You can search by feedbacks using the search box. It can, for example, allow you to search by feedback sent on a specific page.

Example search: `url:*/payments/*`

For a list of search fields, refer to the [search documentation](https://docs.sentry.io/concepts/search/searchable-properties/user-feedback.md).

## [Spam Detection for User Feedback](https://docs.sentry.io/product/user-feedback.md#spam-detection-for-user-feedback)

If your organization has enabled Generative AI Features, Sentry will auto-detect user feedback submissions that are likely to be spam and put them in the “Spam” folder on the **User Feedback** page. This improves the quality and actionability of the feedback that are in the main list. To improve the quality of your alerts, feedback that's labeled as spam will bypass any User Feedback Alert Rules you may have configured, and you will not receive alerts for spam.

To make automatic spam detection possible, we use a Large Language Model that classifies messages. This language model is internal to Google Cloud Platform and no data is stored or persisted. This is part of our existing [sub-processor agreement](https://sentry.io/legal/dpa/#subprocessors).

If you'd like to opt out of spam detection, turn off "Enable Spam Detection" in [Settings](https://sentry.io/orgredirect/organizations/:orgslug/settings/) > Projects > \[Project Name] > User Feedback (under “Project”).

## [Getting User Feedback Alerts](https://docs.sentry.io/product/user-feedback.md#getting-user-feedback-alerts)

If you have Sentry's default issue alert ("Alert me on every new issue") turned on for the project(s) with user feedback set up, then you should automatically get alerted every time new user feedback comes in via the User Feedback Widget.

If you don't have Sentry's default issue alert turned on, follow these steps to set up alerts for every new feedback:

1. Create a [New Alert Rule](https://sentry.io/alerts/new/issue/) in Sentry.
2. Scroll to the "Set conditions" section and set the "IF" filter to `The issue's category is equal to… "Feedback"`.
3. Choose which actions to perform in the “THEN” filter.
4. Add an alert name and owner.

To get notifications when crash-report feedback comes in, make sure to turn on "Enable Crash Report Notifications" in Settings > Projects > \[Project Name] > User Feedback.

## [Automated Issue Creation for User Feedback](https://docs.sentry.io/product/user-feedback.md#automated-issue-creation-for-user-feedback)

If you'd like to automatically create an external issue (such as a GitHub or Jira issue) every time you receive user feedback, you can do so through the Alerts page in Sentry, similar to how you would create an issue alert for user feedback (illustrated in the section above).

Follow these steps to set up automated GitHub or Jira issue creation for every new feedback:

1. Create a [New Alert Rule](https://sentry.io/alerts/new/issue/) in Sentry.
2. Scroll to the "Set conditions" section and set the "IF" filter to `The issue's category is equal to… "Feedback"`.
3. Under the "THEN" filter actions, scroll to the "Create new\..." section and select the integration you'd like to use.
4. Default issue link settings, such as the repository, labels, and assignees, can be configured by clicking the "Issue Link Settings" button.
5. Add an alert name and owner.

Once this alert is configured, you should see a GitHub or Jira issue automatically created every time user feedback is submitted.

## Pages in this section

- [Set Up](https://docs.sentry.io/product/user-feedback/setup.md)
