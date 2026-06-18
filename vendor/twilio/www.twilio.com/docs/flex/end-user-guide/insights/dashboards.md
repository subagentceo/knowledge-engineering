# Dashboards

> \[!IMPORTANT]
>
> Flex Insights (also known as Historical Reporting) is currently available as a public beta release and the information contained in the Flex Insights documentation is subject to change. This means that some features are not yet implemented and others may be changed before the product is declared as generally available. Public beta products are not covered by a Twilio SLA.
>
> Any reference to "Historical Reporting", "Flex Insights API", "Flex Insights Historical Reporting", or "Flex Insights Historical Reporting API" in the Flex Insights documentation refers to Flex Insights.

Available through the [Analytics Portal](https://analytics.ytica.com/), a **dashboard** contains the reports, embedded web content, and other objects that collectively deliver a reporting solution for a category of interest.

Make sure you're familiar with these main features and functionalities to make your reporting workflows even more effective:

* [Create and edit dashboards](#create-and-edit-dashboards)
* [Sharing and permissions](#sharing-and-permissions)
* [Tabs](#tabs)
* [Dashboard filters](#dashboard-filters)
* [Saved views](#saved-views)
* [Play conversations](#play-conversations)
* [Drill down into more detail](#drill-down)
* [Export reports](#export-reports)
* [Send yourself a dashboard via email](#send-dashboards-via-email)

## Create and edit dashboards

Flex Insights' built-in dashboards serve as a starting point to inspire you to create custom reports that suit your needs. Built-in dashboards are locked and not editable.

You can create a new dashboard by selecting **Add Dashboard** from the dashboard gear dropdown. Alternatively, you can make a copy of an existing dashboard by clicking on the **Save As** option from the gear dropdown.

> \[!WARNING]
>
> You must have the role of [Editor](/docs/flex/admin-guide/setup/sso-configuration/insights-user-roles) in order to create and edit a dashboard.

## Sharing and permissions

New dashboards are hidden by default, allowing you to experiment and develop the dashboard privately and then share it only after it is complete.

You can choose who is allowed to view and edit your dashboards. You may choose to hide a dashboard from all other users, share it with specific users, or share it with all users in a project.

Your dashboard's visibility settings are reflected in the dashboard embedded within Flex.

![Control Center for sharing permissions with selected users option highlighted.](https://docs-resources.prod.twilio.com/0df0893dba51747588e1a97944cd02f91e1309cdd9a873c6d508b288df5c2b3f.jpg)

## Tabs

A dashboard contains one or more dashboard tabs.

The following image shows the *Overview* dashboard tab of the *Control Center* dashboard:

![Dashboard showing handled conversations by date and weekday with metrics on abandonment and external contacts.](https://docs-resources.prod.twilio.com/7a45a0f7d166734bf3f539c0654a49f7759bd1fe6e9ca99c80153547b3a86d3c.png)

Other available dashboard tabs include *Inbound*, *Handling Time, Assessment, Scorecard, Scores, Productivity, Activity, Conversations,* and *Summary*.

Selected filters carry over when switching between dashboard tabs.

## Dashboard filters

A dashboard filter allows you to filter report data based on a *specified parameter value* or r\_ange of values\_.

All dashboard filters at the top of a dashboard tab:

![Control Center dashboard with filters for direction, contact, queue, team, agent, date, and time.](https://docs-resources.prod.twilio.com/4210aa96b37642da6d07f655e181bdc8ad410f47539b401552cb9c6f32560b25.png)

On the left, you commonly have different conversations attributes you can filter. On the right, there are date and time filters.

Filters are applied to *all* reports and measures on the dashboard tab unless an author of the dashboards decides otherwise.

## Saved views

You can store your dashboard filter selection by saving a custom view. Saved views help you access previous filters in just a few clicks.

To save a current view click **\*Unsaved View** > **Save current view...**, then name your view.

![Dropdown menu for saving current view with options for default view and reset filters.](https://docs-resources.prod.twilio.com/fa7ead06b7b8fbcae72c40dcc08dc9745d8aeb03d16ee150b1ec226bea477fd8.png)

## Play conversations

In order to be able to play conversations in [Player](/docs/flex/end-user-guide/insights/player) it's necessary to append recording's URL links to a task's attributes. This can be done either automatically or via custom logic/source, please refer to [an article here](/docs/flex/developer/insights/enhance-integration) for more detail.

When you have a list of conversations or segments you can click on the segment ID to listen to a call.

![Table showing call IDs, dates, times, agents, and talk times for listening to calls.](https://docs-resources.prod.twilio.com/967eb93fc318e27d15dce90dbc8603dfbd670215c5de9eee737c11a85a032ee3.png)

> \[!WARNING]
>
> When clicking on an ID of a conversation to launch the conversation player, your browser may block it as a pop-up. Please **enable pop-ups** for this domain.

## Drill down

You can click on values in different charts to open a pop-up window with a list of conversations and relevant metrics.

## Export reports

You can export your reports from the **Reports** and **Dashboards** sections to the following formats:

* PDF
* PNG
* XLSX
* CSV

To export a report:

1. Hover your mouse over a report to reveal a button with three dots next to the title
2. Click **Download As** to open the list of export options
3. Select a file type
4. Save the report to your computer

## Send dashboards via email

You can regularly send yourself (or members of your team) a PDF of your dashboard via email. You can set the frequency and delivery time of emails. Additionally, you can send this email to more people on your team. Learn more about [scheduling dashboard report emails here](/docs/flex/end-user-guide/insights/schedule-dashboards-with-email).
