# Dashboards Programmability

> \[!IMPORTANT]
>
> Flex Insights (also known as Historical Reporting) is currently available as a public beta release and the information contained in the Flex Insights documentation is subject to change. This means that some features are not yet implemented and others may be changed before the product is declared as generally available. Public beta products are not covered by a Twilio SLA.
>
> Any reference to "Historical Reporting", "Flex Insights API", "Flex Insights Historical Reporting", or "Flex Insights Historical Reporting API" in the Flex Insights documentation refers to Flex Insights.

> \[!NOTE]
>
> A developer proxy is needed for local development. Learn more about
> [Local Development](/docs/flex/developer/insights/custom-domain).

Starting version 1.27, Flex allows users to programmatically configure the Dashboards navigation. Currently setting a filter for the Dashboards is supported.

> \[!WARNING]
>
> This feature is for **convenience use only** and **cannot** **be**
> **considered a security feature**. Even with filtering enabled, agents are
> technically still able to access the whole list of the dashboards they have
> permissions to view.

## Terminology

To explain how the filtering works, it is important to establish some terms and explain how the navigation works.

We currently support 2 different kinds of dashboards:

1. The **Project Dashboards**, which group sets of **Tabs,** which you can select to display a dashboard,
2. and **Analytical Dashboards**, which by themselves are the dashboards.

## Sidebar navigation

The Sidebar is used to list all the dashboards and tabs. On top, there is a dropdown, which allows you to select between **All Dashboards**, **My Dashboards** and also allows you to select a specific **Project Dashboard.**

![Dashboard menu with options like Agents, Productivity Charts, and Control Center.](https://docs-resources.prod.twilio.com/8e7d1fd6294430e72987689514b89fd78ba101db30bb264bd2d9989003427932.png)

When **All Dashboards** are selected, the list will display all the Analytical Dashboards first and then every Project Dashboard along with its tabs.

When a specific Project Dashboard is selected, the list will only display its underlying tabs.

## DashboardsSidebar component

This component has 2 default props that can be overridden:

* `dashboardsFilter: (dashboard) => boolean`
* `dashboardTabFilter: (tab, dashboard) => boolean`

These props are available under the following namespace: `Flex.Insights.DashboardsSidebar.defaultProps`.

### dashboardsFilter

The `dashboardsFilter` determines which dashboards will be available in the dropdown at the top of the sidebar and as part of the navigation. The return value from the function dictates if the particular Dashboard will be displayed or hidden.

The function takes `dashboard` as an argument. This can be **either an Analytical Dashboard or a Project Dashboard**.

If `false` is returned for a **Project Dashboard**, it will disappear from **both** the dropdown and from the navigation - if "All Dashboards" is selected, **along with all of its tabs**. If you want to hide only some of the tabs, use the `dashboardTabFilter` prop.

If `false` is returned for an **Analytical Dashboard**, it will be hidden from the top of the navigation, when "All Dashboards" is selected.

The `dashboard` argument has the following shape:

```typescript
identifier: string;
category?: string;
link?: string;
title?: string;
author?: string;
tabs?: Array<{
    title: string;
    identifier: string;
}>;
widgets?: string[];
```

#### Example

In this example, let's say you want to hide a dashboard named "Control Center":

```javascript
Flex.Insights.DashboardsSidebar.defaultProps.dashboardsFilter = (dashboard) =>
  dashboard.title !== "Control Center";
```

### dashboardTabFilter

Sometimes you might not want to hide the whole Project Dashboard, but only some of its tabs. That's when this function comes in handy.

The function takes `tab` and a `dashboard` as its arguments. Each Project Dashboard tab is checked against this filter and the return value for that tab determines if the tab should be displayed or not. The `dashboard` argument is the Project Dashboard which the tab is part of. This allows you to decide not only based on the tab title itself, but also **by the properties of the dashboard**, as displayed in the example below.

The `tab` argument has the following shape:

```typescript
title: string;
identifier: string;
```

#### Example \[#example-2]

Let's say you want to hide a tab named **Conversations** which is part of the **Control Center** dashboard:

```javascript
Flex.Insights.DashboardsSidebar.defaultProps.dashboardTabFilter = (
  tab,
  dashboard
) => tab.title !== "Conversations" && dashboard.title !== "Control Center";
```

It might, however, be a better idea to filter directly by ID. To find out ID for any dashboard, you can follow [this guide](/docs/flex/developer/insights/insights-dashboards-embedding). The ID in the URL corresponds with the `tab.identifier` key.

**Note**: Setting a `dashboardTabFilter` has no effect on Analytical Dashboards.
