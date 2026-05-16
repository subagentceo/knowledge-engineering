---
title: "Dashboards"
description: "Learn how Sentry’s Dashboards give you a focused view of your application’s health, across multiple projects."
url: https://docs.sentry.io/product/dashboards/
---

# Dashboards

Sentry's [Dashboards](https://sentry.io/orgredirect/organizations/:orgslug/dashboards/) provide you with a broad overview of your application’s health by allowing you to navigate through error and performance data across multiple projects. Dashboards are made up of one or more widgets, and each widget visualizes one or more [dataset](https://docs.sentry.io/product/dashboards/widget-builder.md#choose-your-dataset). Try it out in [a Dashboards sandbox](https://sandbox.sentry.io/?scenario=dashboards\&projectSlug=react\&source=docs).

## [Global Filters](https://docs.sentry.io/product/dashboards.md#global-filters)

All widgets in the same view reflect the results of the global filters set at the top of the dashboard.

By default, projects, environments, date range, and release must be set, and will apply to all widgets in the dashboard. You can also zoom in on any time series visualizations you may want to investigate, and all of the widgets will reflect the time period that you’ve zoomed in on.

### [Custom Filters](https://docs.sentry.io/product/dashboards.md#custom-filters)

You can also add custom global filters to your dashboard by pressing the *plus* button. Each filter begins with selecting a dataset, and then adding a filter condition. You can add multiple filters to your dashboard, and they will be applied to all widgets *relating to that dataset* in the dashboard.

### [Dashboard Edit Access](https://docs.sentry.io/product/dashboards.md#dashboard-edit-access)

To restrict who can edit or delete your dashboard, go to the "Edit Access" selector. As the dashboard creator, you can limit access to specific teams by selecting the checkboxes in the Edit Access Selector and clicking Save Changes to apply the updates. Dashboard creators and organization owners always retain edit access.

## [Sentry Dashboards](https://docs.sentry.io/product/dashboards.md#sentry-dashboards)

Sentry provides out-of-the-box [dashboards](https://docs.sentry.io/product/dashboards/sentry-dashboards.md) for frontend, backend, mobile, and AI performance. These curated views give you a high-level overview of your application's health with widgets for Web Vitals, queries, outbound API requests, session health, and more. Use them to spot trends, drill into traces, and triage performance issues.

You can also use these dashboards as templates by duplicating them to create your own custom dashboards.

## [Custom Dashboards](https://docs.sentry.io/product/dashboards.md#custom-dashboards)

You can make [custom dashboards](https://docs.sentry.io/product/dashboards/custom-dashboards.md) by duplicating an existing dashboard, using [AI to generate a dashboard](https://docs.sentry.io/product/dashboards/custom-dashboards.md#ai-generated-dashboards) with natural language, or starting from scratch by pressing the **Create Dashboard** button. Custom dashboards enable you to create views tailored to your organization's needs. For example, you may want to track performance of a specific feature, or track errors by a specific team's ownership. Once in edit mode, use the same filters you use to drill into a dashboard to customize your dashboard.

## [Open Dashboard Widgets in Discover and Issues](https://docs.sentry.io/product/dashboards.md#open-dashboard-widgets-in-discover-and-issues)

Each dashboard [widget](https://docs.sentry.io/product/dashboards/widget-builder.md) has an ellipsis that opens a context menu. From here, depending on the type of data the widget shows, you can open the widget in [Discover](https://docs.sentry.io/product/explore/discover-queries.md) or [Issues](https://docs.sentry.io/product/issues.md) to get more information.

## [Widget Viewer](https://docs.sentry.io/product/dashboards.md#widget-viewer)

Dashboard widgets can be opened in an expanded widget viewer mode for further exploration. The widget viewer allows enhanced filtering, sorting, and navigation features that are not available in the basic widget card view:

* Widget tables display more rows per page, can be paginated and sorted, and allow column width adjustment
* Widget charts can be zoomed in without affecting the rest of the dashboard
* Chart visualizations display an additional table of results grouped by `title` for further insights
* Widget viewer URLs can be copied and shared for easy revisiting

Click the expand icon on the top right of any widget card to open the viewer.

## [Dashboard Revisions](https://docs.sentry.io/product/dashboards.md#dashboard-revisions)

You can view the edit history of a dashboard by pressing the clock button. The list shows previous versions of the dashboard, along with the changes that were made in that particular version.

To revert to a previous version, select it in the list and click "Revert to Selection".

Reverting a dashboard can also be undone by reverting to the previous version.

Only a limited number of revisions are retained to be reverted.

## Pages in this section

- [Custom Dashboards](https://docs.sentry.io/product/dashboards/custom-dashboards.md)
- [Widget Builder](https://docs.sentry.io/product/dashboards/widget-builder.md)
- [Widget Library](https://docs.sentry.io/product/dashboards/widget-library.md)
- [Sentry Dashboards](https://docs.sentry.io/product/dashboards/sentry-dashboards.md)
