# Flex Insights Assessment Reporting

> \[!IMPORTANT]
>
> Flex Insights (also known as Historical Reporting) is currently available as a public beta release and the information contained in the Flex Insights documentation is subject to change. This means that some features are not yet implemented and others may be changed before the product is declared as generally available. Public beta products are not covered by a Twilio SLA.
>
> Any reference to "Historical Reporting", "Flex Insights API", "Flex Insights Historical Reporting", or "Flex Insights Historical Reporting API" in the Flex Insights documentation refers to Flex Insights.

With [Flex Insights](/docs/flex/end-user-guide/insights), you can build reports and dashboards on top of quality assurance metrics and customer feedback. The results of [assessments](/docs/flex/end-user-guide/insights/conversation-assessments) are loaded into analytics at regular intervals together with the rest of your Flex Insights data.

This guide outlines several built-in [metrics](#assessment-metrics) and [attributes](#assessment-attributes) you can use to create insights with assessment data.

> \[!NOTE]
>
> To better understand how assessments are related to the rest of Insights' conversation-related data, see our guide to the Flex Insights [Analytics Data Model](/docs/flex/end-user-guide/insights/data-model).

## Assessment metrics

The following metrics are useful when reporting on assessments:

* **Score**: the score of a single assessment in the original scale. This metric may also contain conversation assessment, customer satisfaction, and agent reflection scores.
* **Score %**: the score of a single assessment normalized to a percentage from 0 to 100%.
* **Average Score %**: the average score of all questions. This metric reports the score normalized to percentages across all questions with the same weight.
* **Assessments**: the total number of quality assessments. This number includes the number of questions answered in total.
* **Assessed Conversations**: the number of conversations with at least one quality assessment.
* **Assessed Conversations %**: the percentage of conversations with at least one quality assessment compared to the total number of all handled conversations.

## Assessment attributes

You can slice or filter assessments metrics by attributes that are specific to assessments:

* **Metric**: the question answered by an assessor, no matter which questionnaire the person used for an assessment.
* **Answer**: the title of the answer picked by an assessor.
* **Category**: the category in which the assessed metric or question belongs.
* **Assessment Type**: the type of assessment you wish to view. To filter for conversation assessments only, select **Quality**.
* **Supervisor**: a person who assessed the conversation.
* **Report**: specifies whether the score influences reports by default. Possible values are **Yes** and **No**.

## Custom metrics

You can create custom metrics based on built-in metrics and attributes.
