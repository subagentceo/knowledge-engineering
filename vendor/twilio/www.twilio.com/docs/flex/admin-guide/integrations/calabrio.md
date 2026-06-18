# Integrate Flex with Calabrio ONE WFM

Calabrio ONE is a workforce optimization solution that offers workforce management, quality management, and analytics products and features. Twilio Flex integrates with Calabrio ONE to provide an effortless transfer of data between the two systems to enable intelligent business planning and operations.

![Calabrio One interface showing chat transcript, audio analysis, and screen capture.](https://docs-resources.prod.twilio.com/f01c5b7c79d206a3cacea3588b752272c1301abfcae426ba4e43d7092b5c206d.jpg)

This guide lists the prerequisites and all tasks that are required to complete the integration setup. However, detailed instructions for tasks marked with an asterisk are available through the [Calabrio Success Center](https://success.calabrio.com/).

> \[!NOTE]
>
> This guide was created in December 2020. Please refer to the [Calabrio ONE
> Release
> Notes](https://success.calabrio.com/s/article/User-Documentation-User-Guides)
> for information on changes made to the Calabrio ONE WFM solution that may
> affect the content or images in this guide.

## Prerequisites

* You must upgrade your Flex project and select a paid pricing plan. This allows you to enable Flex Insights, which is required to provide Calabrio WFM with historical data from your Flex contact center. To learn more, see [Getting Started with Flex Insights](/docs/flex/end-user-guide/insights/getting-started).
* You must have a Calabrio ONE WFM account.
* You must contact the Flex Integrations Support Team ([flex-integrations@twilio.com](mailto:flex-integrations@twilio.com)) to enable the Calabrio ONE WFM Integration tile so that it is available within the **Flex** > **Admin** > **Integrations** page.

## Configure the Calabrio ONE WFM Integration in Flex

Configuring the Calabrio ONE WFM integration in Flex enables Calabrio ONE WFM to receive historical and near real-time data that are used for forecasting and real-time adherence. This means that by completing this task, you provide Calabrio ONE WFM access to your Flex Insights reports.

1. From the Twilio Console, select **Flex** > **Launch Flex**.\
   The **Admin** page appears.
2. Click **Integrations**.
3. On the Calabrio ONE WFM configuration card, select **Configure**.
4. Under **Configuration**, edit the **URL** and click **Apply**.
5. Under **Status**, use the toggle to enable the Real-Time Feed.

## Setup

The Twilio Flex and Calabrio ONE integration uses the following protocols to transfer data:

* **Historical data feed**: The integration with Twilio Flex Insights allows Calabrio to regularly access and consume data sets that include agent performance and queue statistics.
* **Real-time adherence feed**: The near real-time event stream provides Calabrio agent (worker) status and activity updates. For example, when agents become available to receive calls or set their status to Break.
* **TaskRouter integration**: TaskRouter REST APIs enable the worker (user) and queue sync that provides Calabrio with agent attributes and task queue values. The TaskRouter integration also allows Calabrio to import call recordings from Twilio Flex.

![Diagram showing integration between Twilio Flex and Calabrio ONE, detailing data sync and metrics flow.](https://docs-resources.prod.twilio.com/ee0ace58f0e8302231fb926b82de528cbb79b4ac77f83ceccb15c8ded7f94f43.png)

## Products and features

The Twilio Flex and Calabrio ONE integration offers the following products and features:

* **Calabrio Workforce Management (WFM)**
  * **Forecasting:** Calabrio uses imported historical data from Flex to create short and long-term forecasts for your contact center. Supervisors can leverage this data for agent scheduling, staffing, and budget estimation.
    ![Calabrio agent schedules for March 7, showing coverage and service levels.](https://docs-resources.prod.twilio.com/0201823181a635fa3cc009dd50d200ba95154b90752313e37ae2c625eccbcb9b.png)
  * **Real-Time Adherence:** The near real-time transfer of events allows supervisors to monitor agent adherence to schedules and other company mandates.
  * ![Calabrio dashboard showing agent adherence and late work metrics for Stockholm locations.](https://docs-resources.prod.twilio.com/3a981e0e9bafc289e1b939b4751cb5c959485f1474a11f232fd9c7991feaeefd.png)
* **Calabrio Quality Management (QM)**
  * **Automated recording and reporting**: Supervisors can actively review call and screen recordings to understand customer interactions and evaluate agent performance. The Hold Metrics Plugin extends reporting capabilities by capturing timestamps for when customers are placed on hold.
    ![Calabrio Quality Management.](https://docs-resources.prod.twilio.com/6b27dd317052db16fa87d89d6217fdfb03076614263db9470cae636b5aecf4be.png)
  * **Automated Recording and Reporting:** Supervisors can actively review call and screen recordings to understand customer interactions and evaluate agent performance. The Hold Metrics Plugin extends reporting capabilities by capturing timestamps for when customers are placed on hold.

    ![Calabrio Quality Management interface showing contact transcript, sentiment analysis, and evaluation form.](https://docs-resources.prod.twilio.com/6b27dd317052db16fa87d89d6217fdfb03076614263db9470cae636b5aecf4be.png)
* **Calabrio Analytics**

  * **Speech, Text, and Desktop Analytics:** The Analytics dashboard provides advanced insights for your Flex contact center and agent workforce.

    ![Calabrio dashboard showing phrase trends, brand awareness, sales opportunities, application usage, and website interaction data.](https://docs-resources.prod.twilio.com/c9e578f43720e0dfddc1c041c94ffd947a3b4bc8faa7c8448f118ec1aa62834b.png)

## Next steps

To learn more about supported features and how you can get started, contact Calabrio Sales at +1 (855) 784-2807.
