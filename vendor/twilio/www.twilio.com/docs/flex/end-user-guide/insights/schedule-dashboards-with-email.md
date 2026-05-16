# Schedule Flex Insights Dashboards with Email

> \[!IMPORTANT]
>
> Flex Insights (also known as Historical Reporting) is currently available as a public beta release and the information contained in the Flex Insights documentation is subject to change. This means that some features are not yet implemented and others may be changed before the product is declared as generally available. Public beta products are not covered by a Twilio SLA.
>
> Any reference to "Historical Reporting", "Flex Insights API", "Flex Insights Historical Reporting", or "Flex Insights Historical Reporting API" in the Flex Insights documentation refers to Flex Insights.

Having [Flex Insights](/docs/flex/end-user-guide/insights) dashboards in front of you is a great way to stay aligned and make data-driven decisions with your team. To make sure that you're keeping everyone in the loop, you can send regularly-updated dashboards via email. Every week (or every day) can start with having the right data when you need it.

## Schedule dashboards by email

Use scheduled emails to receive information from your contact center without logging in. All Insights users can schedule automatic emailing of a dashboard to themselves and others from the [Analytics Portal](https://analytics.ytica.com).

Flex Insights dashboards are delivered as a PDF attachment. Any filters and permissions applied at the time of scheduling are also applied to your generated emails. This means that email recipients receive the exact same version of the dashboard and its data that the email scheduler sees.

Email recipients can unsubscribe themselves from schedules via the unsubscribe link in the email.

Editors can review and delete these schedules under **Manage > Emailing Dashboards**.

**Steps:**

1. Navigate to the dashboard that you want to email. Optionally, [add filters](/docs/flex/admin-guide/setup/sso-configuration/insights-user-roles).
2. Click the clock icon in the top right corner:

![Scheduled view icon highlighted in green on toolbar.](https://docs-resources.prod.twilio.com/9fbbef63959e2446e121d9b19b3078ccb0bc98a64da4f663764bdc7c582c2587.png)

3. Choose the dashboard tabs to email and the mailing schedule. Optionally, you can define a custom email subject and message or add additional recipients. You can send scheduled emails with dashboards to your teammates and colleagues (up to 10 users) even when they don't have a Flex account. This provides valuable insight into your customer service operations to anybody in your company.

![Email dashboard scheduling report for handling time sent weekly on Monday at 08:30 AM CEST.](https://docs-resources.prod.twilio.com/73831608f97300a00769352cb8d9a4463636e83cff6ce0b7ee884d550f1bd470.png)

4. Click **Schedule**. \
   The Analytics Portal will automatically generate emails as scheduled.

## Share reports and dashboards with scheduled emails

Set up automatic emailing of dashboards and reports to share a snapshot of project data as an email attachment.

> \[!WARNING]
>
> The [editor role](/docs/flex/admin-guide/setup/sso-configuration/insights-user-roles) is required to use this functionality.

*You can only share this information with other members of your project.*

You can attach multiple dashboards and reports to a single email. The filename of each attached report and dashboard contains a date- and timestamp so you know when it was generated.

The following options are available for the attachment format:

* **Dashboards** can be shared only as `PDF`.
* **Reports** can be shared as `PDF`, `XLSX`, `CSV`, or as an `inline message`.\
  All reports must be sent in the same format.

Generated emails contain an 'unsubscribe' link in the footer. Users who unsubscribe from a scheduled email are listed in its configuration in the Analytics Portal.

**Steps:**

1. Log in to Flex, open Analytics Portal, and go to **Manage** → **Emailing Dashboards**.
2. Click **Schedule New Email**.
3. Fill in the fields to configure the scheduled email, and click **Save**.\
   The email is scheduled. The Analytics platform will send the emails as scheduled.

From the Emailing Dashboards tab, you can also:

* View or modify the configuration of an existing scheduled email
* Duplicate a scheduled email
* Delete a scheduled email

> \[!WARNING]
>
> When sending reports as XLSX, you can select the option to keep attribute cells merged or unmerged. You can also include active filters in the file. These options are similar to the export options and you can find more information in section XLSX in [Export File Types](https://help.gooddata.com/display/doc/Export+File+Types).
