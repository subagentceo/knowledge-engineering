# Integrate Flex with Puzzel WFM

[Puzzel WFM](https://www.puzzel.com/products/workforce-management) provides a cloud-based platform that enables forecasting, scheduling, and adherence monitoring for your entire Twilio Flex contact center workforce. The solution is specifically designed to increase agent retention, reduce administrative overheads, and increase productivity. Puzzel WFM can be set up in just days and is fully integrated with Twilio Flex.

![Puzzel WFM interface showing forecasting and scheduling dashboards.](https://docs-resources.prod.twilio.com/72f35128c0113218e2776ddf8a0c02cb2d6222fb17fb713399baab35d7d0ad82.jpg)

![Puzzel WFM Scheduling.](https://docs-resources.prod.twilio.com/72f35128c0113218e2776ddf8a0c02cb2d6222fb17fb713399baab35d7d0ad82.jpg)

This guide lists the prerequisites and all tasks that are required to complete the integration setup. However, detailed instructions for tasks marked with an asterisk are available through the [Puzzel Help Centre](https://help.puzzel.com/product-documents/user-guide/puzzel-wfm/the-puzzel-wfm-16-point-process-to-success).

> \[!NOTE]
>
> This guide was created in January 2021. Please refer to the [Puzzel Release
> Notes](https://help.puzzel.com/release-notes?field_components_target_id=7) for
> information on changes made to the Puzzel WFM solution that may affect the
> content or images in this guide.

## Terminology

The following Puzzel WFM terms are useful when completing this guide:

* **Campaign**: feature that is used to group and schedule agents who share the same Skills or Skill Sets. Campaigns can represent departments, services that you offer, or other company entities.
* **Full Time Equivalent (FTE)**: number of hours that comprise a full-time work week for an employee in your contact center.
* **Site**: location of the contact center. Contact centers can have multiple sites.
* **Custom Activity Types**: activities that you create in Puzzel WFM to map to the TaskRouter activities in your Flex Workspace. Mapping activities is required for Real-Time Adherence. You do not need to create custom activities for the pre-populated [TaskRouter activities](/docs/taskrouter/api/activity) "Offline", "Available", and "Break".
* **Realtime Source**: source that allows you to map activities in Flex to activities in Puzzel WFM. These sources enable the real-time adherence feature.
* **Skills**: queues that an agent can handle.
* **Skill Set**: group of Skills that an agent can handle.
* **Patience**: amount of time in seconds that an average customer will wait before they hang up.
* **Alias**: feature that allows you to map a TaskRouter TaskQueue to a Queue in Puzzel WFM if the queue has a different name across systems. You can also use Alias to merge multiple queues into one forecast queue. For example, if you have three separate queues ("Australia", "New Zealand", "UK") and you want to create a forecast that includes all three queues, you can create one queue ("International") and assign the three individual queues as Aliases for that one queue.
* **Team Leader**: equivalent term for Supervisor in Flex.

## Prerequisites

* You must upgrade your Flex project and select a paid pricing plan. This allows you to enable Flex Insights, which is required to provide Puzzel WFM with historical data from your Flex contact center. For more information, see [Getting Started with Flex Insights](/docs/flex/end-user-guide/insights/getting-started).
* You must have a [Puzzel WFM account](https://www.puzzel.com/uk/workforce-management-solution/) with access to the Planner Portal.
* You must contact the Flex Integrations Support Team ([flex-integrations@twilio.com](mailto:flex-integrations@twilio.com)) to enable the Puzzel WFM Integration tile so that it is available within the ***Flex → Admin → Integrations*** page mentioned below.

## Configure the Puzzel WFM Integration in Flex

Configuring the Puzzel WFM integration in Flex enables Puzzel WFM to receive historical and near real-time data that are used for forecasting and real-time adherence. This means that by completing this task, you provide Puzzel WFM access to your Flex Insights reports.

1. From the Twilio Console, select **Flex** > **Launch Flex**. The **Admin** page appears.
2. On the Puzzel WFM configuration card, select **Configure**.
3. Under **Configuration**, edit the **URL** and click **Apply**.
4. Under **Status**, use the toggle to enable the Real-Time Feed.

## Configure Puzzel WFM

> \[!NOTE]
>
> Detailed instructions for tasks marked with an asterisk are available through
> the [Puzzel Help
> Centre](https://help.puzzel.com/product-documents/user-guide/puzzel-wfm/the-puzzel-wfm-16-point-process-to-success).

Puzzle WFM offers three portals: Agent, Supervisor, and Planner. You must complete the following tasks using the Planner portal:

1. [Create Campaigns](https://planner.wfm.puzzel.com/loggedin/settings/editor/campaignandsites/campaign)\* **Note:** You must set the **Opening Hours**.

   ![Settings page for creating a sales campaign with timezone, FTE, and concurrent chats options.](https://docs-resources.prod.twilio.com/7c678d27f96533d6df08adbb82b4605c740c52289ea53043acd09dcd91ac5860.png)
2. [Create Sites](https://planner.wfm.puzzel.com/loggedin/settings/editor/campaignandsites/site)\*

   ![Site settings for HQ with options for time zone, seats, shift times, and working days.](https://docs-resources.prod.twilio.com/7664198c5ac6e337fc6ebc5037a8ca4ff4c0420fc42578ea796ed07d5a66ff39.png)
3. [Create Custom Activity Types](https://planner.wfm.puzzel.com/loggedin/settings/editor/shiftsandactivities/customactivities)\* **Note:** You must create the custom activity "Unavailable" to map to the pre-populated TaskRouter activity "Unavailable" in your Flex Workspace. Use the image below for guidance when creating this activity. You map the activity in Step 4.

   ![Form for creating an unavailable activity type with options for OOA, absence, adherence, agent portal, and active status.](https://docs-resources.prod.twilio.com/7ad722346ef18b3941e51b8c03fbe3b81e4ca2b3901ff8780af6d91eb1560b02.png)
4. [Create a Realtime Source and Map Activities](https://planner.wfm.puzzel.com/loggedin/settings/editor/adherence/realtimesources):

   1. From **Settings** > **Adherence** > **Realtime Sources**, click the **plus sign** to create a new source.
   2. For **Source Name**, input your Flex Project Account SID, then select **Create**.
   3. Select the **ellipsis** next to the source you created and click **Activity Mapping**.

      ![Puzzel WFM settings page showing Realtime Sources under Adherence.](https://docs-resources.prod.twilio.com/5128704234a79707767974540c701e0c5dba8bcb86b931903f024daf128d6cdb.png)
   4. Click the **plus sign** to map a TaskRouter activity from your Flex Workspace to an activity in Puzzel WFM. Complete the required fields then select **Update**. \
      **Notes:** At minimum, you must map the following pre-populated TaskRouter activities: **Offline**, **Available**, **Unavailable**, **Break**.\
      The image below shows how to map the custom activity "Unavailable" that you created in Step 3 to the pre-populated TaskRouter activity "Unavailable" in your Flex Workspace:

      ![Form for updating mapping with event code 'Unavailable' and activity type options.](https://docs-resources.prod.twilio.com/2e831e0bfed32f1023c18ba153ed87c3e9c2d6826336a9df4e4251f1d500faeb.png)

      \
      The image below shows the mapping of the pre-populated TaskRouter activities in your Flex Workspace:

      ![Activity mapping showing statuses: Available, Break, Offline, Unavailable with mapped reasons.](https://docs-resources.prod.twilio.com/b9196aa244fafe6c164a972e960c59fe7a6bcefe896c9c58e41eb47b8691f92c.png)
5. [Create Skills & Skill Sets](https://planner.wfm.puzzel.com/loggedin/settings/editor/queuesandskills/skills)\*

   ![Settings page showing skills list with Sales West, Sales East, and International Sales.](https://docs-resources.prod.twilio.com/49fac715035fbfb1907a9e9b249de6d6e2f3a97ace284d24ba40d77d0124e2d0.png)

   \
   The following example shows a Skill Set that has two Skills assigned to it:

   ![Skill set form for Domestic Sales with assigned skills Sales East and Sales West.](https://docs-resources.prod.twilio.com/d5937d1d3133a8bc6cf0fc577b44e74dda68946c5e42dbdfaecf1c565010b428.png)
6. [Create Forecast Queues](https://planner.wfm.puzzel.com/loggedin/settings/editor/queuesandskills/queues)\* **Notes:** Ensure that you assign an **Alias** to any Queue that has a different name across systems. For example:

   ![Sales East Phone queue settings with service level and goals.](https://docs-resources.prod.twilio.com/e0079419938c7d9bf8d73054863967c3fc108494fa4b1efd28692a9aaf23eb70.png)

   If a TaskRouter TaskQueue receives tasks from different TaskChannels, you must create a Queue in Puzzel WFM for each channel type. For example, "Sales East - Phone" and "Sales East - Chat". Example list of Forecast Queues:

   ![Forecast Queues panel showing sales campaigns by region and media type.](https://docs-resources.prod.twilio.com/60710e97f993eb81dddb97c20a1720a4031cd5293d0c7f09d72fbe011a088ad9.png)
7. [Activate and Assign Campaigns to Queues](https://planner.wfm.puzzel.com/loggedin/settings/editor/queuesandskills/queues):

   1. Select the **ellipsis** next to the queue that you created and click **Activate / Assign Campaign**.
   2. Complete the required fields then select **Assign**.
8. [Import Team Leaders (Supervisors)](https://planner.wfm.puzzel.com/loggedin/people/agents):

   1. From **People** > **Agents**, select the **plus sign** in the bottom-right corner. Click the **Import Agents** icon.
   2. Choose a **Date Format** and import a CSV file that includes the required fields listed in the table below. The right column in the table shows how these fields *may* be mapped to [Worker properties](/docs/taskrouter/api/worker) in Twilio.

      | **Required Fields**             | **Potential Mapping to Worker Properties** |
      | ------------------------------- | ------------------------------------------ |
      | `agentId`                       | Worker SID                                 |
      | `forename`                      | Part of Worker attribute `"full_name"`     |
      | `surname`                       | Part of Worker attribute `"full_name"`     |
      | `Site`                          | N/A                                        |
      | `holidayAllocation`             | N/A                                        |
      | `holidayAllocationRolloverDate` | N/A                                        |
      | `emailWork`                     | Worker attribute `"email"`                 |
      | `username`                      | Worker attribute `"client"`                |

      **Note:** If you include the fields `Campaign` and `Site` and provide values for these fields, you do not have to manually assign Team Leaders to a Campaign or a Site. [Sample File](https://docs-resources.prod.twilio.com/documents/agents-export.csv).
   3. Review the imported data then select **Next**. Puzzle WFM validates the file.
   4. Select **Complete**.\
      **Note**: You can also manually add Team Leaders in Puzzel WFM. Detailed instructions are available through the [Puzzel Help Centre](https://help.puzzel.com/product-documents/user-guide/puzzel-wfm/clientadmin-portal/people/agent-screen-single-agent-edit).
9. [Create Teams](https://planner.wfm.puzzel.com/loggedin/settings/editor/teams)\*

   ![Teams settings showing Enterprise and SMB Sales with team leaders.](https://docs-resources.prod.twilio.com/cca7d43acc4784a5422a9ba1a56c819d9ff25be579b6427e58ba525871b18f95.png)
10. [Import Agents](https://planner.wfm.puzzel.com/loggedin/people/agents):

    1. From **People** > **Agents**, select the **plus sign** in the bottom-right corner. Click the **Import Agents** icon.
    2. Choose a **Date Format** and import a CSV file that includes the following required fields:

       * `agentId`
       * `Forename`
       * `Surname`
       * `Campaign`
       * `Team`
       * `Site`
       * `minHours`
       * `maxHours`
       * `holidayAllocation`
       * `holidayAllocationRolloverDate`
       * `emailWork`
       * `Username`
    3. Review the imported data then select **Next**. Puzzle WFM validates the file.
    4. Select **Complete**. **Note:** If you have already created Campaigns (Step 1), Sites (Step 2), and Teams (Step 9) and you include the fields `Campaign`, `Site`, and `Team` (and provide values for these fields) when you import agents, the agents are automatically assigned to the defined Campaign, Site, and Team.**Note**: You can also manually add Team Leaders in Puzzel WFM. Detailed instructions are available through the [Puzzel Help Centre](https://help.puzzel.com/product-documents/user-guide/puzzel-wfm/clientadmin-portal/people/agent-screen-single-agent-edit).
11. [Import Historical Information](https://planner.wfm.puzzel.com/loggedin/forecasting/importcalllogs)\* **Note:** You must complete this step once for each campaign. [Sample File](https://docs-resources.prod.twilio.com/documents/Historical_Import_Example_v1.txt)
12. [Import Holiday/Vacation Allocations](https://planner.wfm.puzzel.com/loggedin/settings/editor/campaignandsites/campaignallocation)\* **Note:** You must complete this step once for each campaign. [Sample File](https://docs-resources.prod.twilio.com/documents/Vacation_Import_Example_v1.csv)
13. [Create Shifts](https://planner.wfm.puzzel.com/loggedin/settings/editor/shiftsandactivities/shifts)\* **Note:** When working with rotational shifts, use the **Effective Date** field to specify when the rotation should begin.\
    Example Week Overview of shifts created to define a full-time work week:

    ![Puzzel WFM week overview showing shifts for full-time flex weeks, including start and finish times, duration, and paid hours.](https://docs-resources.prod.twilio.com/c40176ee701995815f5ca0df266a4e64a4d456d63c2661e386fe6751ffafdaa6.png)

    \
    Example of Activities implemented to define shift specifics (Ex: Lunch):

    ![Puzzel WFM interface showing a weekly schedule with shifts and activities.](https://docs-resources.prod.twilio.com/b0a39dadbf920519ce7482f7884a1446c5a27928ef460b0152257062afd4e7bb.png)
14. [Assign Shifts to Agents](https://planner.wfm.puzzel.com/loggedin/people/shiftassignment)\* **Note:** We suggest that you do not provide values for **Add Rotation**.

    ![Shift assignment interface showing full-time flex options for agents and teams.](https://docs-resources.prod.twilio.com/4414799be33aaf038ffb3fe390dba36a243963e6702a75547e8cab0e9775950f.png)
15. [Assign Skill Sets to Agents](https://planner.wfm.puzzel.com/loggedin/people/agents)\*

    ![Puzzel WFM interface showing skill set assignment to agents with details for Tayjub Berry.](https://docs-resources.prod.twilio.com/6ca255c6ba1cad54458bf50d3cc479746e238739d1ace6471578a87f5bab33eb.png)
16. [Create Forecasts](https://planner.wfm.puzzel.com/loggedin/forecasting/forecast).\*\
    Example of Step 1:

    ![Forecasting interface showing step 1, instance details with selected queues and active instance toggle.](https://docs-resources.prod.twilio.com/e58d8c358239cdfef83e86a0a8fd3491e7ccd9a53db037aed2f06353239d138f.png)

    \
    Example of Step 2:

    ![Puzzel WFM Step 2: Select target week for sales forecasting with calendar view.](https://docs-resources.prod.twilio.com/8442f419a6141f782338385cdd2751856d8668fdac2c5a344fedaa909aa93a5b.png)

    \
    Example of Step 3:

    ![Puzzel WFM Step 3, select source week for forecasting with calendar and queue details.](https://docs-resources.prod.twilio.com/ddb0bbd51742fc49a4d179484c8ba90c92b4c540aeab6b4d70bd6babe597b685.png)

    \
    Example Forecast:

    ![Puzzel WFM forecast graph showing CV and AHT trends over time.](https://docs-resources.prod.twilio.com/ffacb355b1f2989a904544fa9bc6deb776f4f55715037de11c07a54dfecc1f9f.png)

    \
    **Note:** You can manually adjust the forecast if necessary.
17. [Create Schedules](https://planner.wfm.puzzel.com/loggedin/scheduling/createschedule).\* **Note:** Running a schedule may take some time.

    ![Puzzel WFM scheduling calendar for January 2021 showing sales forecast status.](https://docs-resources.prod.twilio.com/f86590dca28d1da706b0b5607f6b522e41300cb6484567ec36a9e521698caab9.png)
18. [Edit Schedules and Add Activities](https://planner.wfm.puzzel.com/loggedin/scheduling/schedule).\*

    ![Puzzel WFM scheduling interface showing service levels and agent activities.](https://docs-resources.prod.twilio.com/be715ee214033faf5fdd4fbcbde272c12ee039c92ef26f7c63f316e5fe73e236.png)
19. [Publish Schedules](https://planner.wfm.puzzel.com/loggedin/scheduling/createschedule).\*

    ![Puzzel WFM schedule calendar for January 2021 with status indicators.](https://docs-resources.prod.twilio.com/ceca08307cf9f014c4777b25b8f6872a7426af73702541315d74ecd66141bf4f.png)

The Flex and Puzzel WFM Integration is complete.

> \[!NOTE]
>
> For more information or assistance with Puzzel WFM, visit the [Puzzel Help
> Centre](https://help.puzzel.com/) and select the **Support** tab on the right.
