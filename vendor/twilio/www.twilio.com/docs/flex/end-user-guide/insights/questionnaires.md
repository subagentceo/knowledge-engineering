# Flex Insights Quality Management

> \[!IMPORTANT]
>
> Flex Insights (also known as Historical Reporting) is currently available as a public beta release and the information contained in the Flex Insights documentation is subject to change. This means that some features are not yet implemented and others may be changed before the product is declared as generally available. Public beta products are not covered by a Twilio SLA.
>
> Any reference to "Historical Reporting", "Flex Insights API", "Flex Insights Historical Reporting", or "Flex Insights Historical Reporting API" in the Flex Insights documentation refers to Flex Insights.

The Flex Insights Assessment feature can help you evaluate a conversation or part of a conversation.

By creating questions and organizing them into questionnaires, you can build evaluation forms to be used by multiple teams and users. Administration of questions and questionnaires can be accessed via the **Assessments** tab in Flex Insights.

## Questions

A **Question** is a basic building block for quality assurance. An assessor is asked a series of questions when assessing a conversation quality, agent performance, or other aspects of a conversation.

Each question belongs to exactly one **Category**. Categories help to organize questions into larger logical units. You can use categories to segment or filter the results of an assessment.

Each question can be used in one or several **Questionnaires**. If you use the same question in multiple questionnaires, you can still analyze a score for that specific question no matter which questionnaire was used for the assessment.

### Create a New Question

To create a new question:

* Click the **New Question** button in the Assessments tab of your dashboard
* Give the question a clear title and pick a category
* Click the **Create** button

![Form for creating a new question with fields for question name and category, defaulting to Script.](https://docs-resources.prod.twilio.com/3c197dedb448f1f16eca4804e2a505f6745a1144cbe7dcd6c6d66f54fa007ad3.png)

If you create a new question while editing a questionnaire, your new question is also added to the current questionnaire.

### Create a Category

To create a new category click the **New Category** button. Give the category a name and click the **Create** button.

![Dialog box for entering a new category name with create and cancel buttons.](https://docs-resources.prod.twilio.com/25822039748d3f3da89c01d345005d2941d7fba2b0dd8b3aa70dd35e4f9546ff.png)

### Manage & Edit Questions

The pool of all available questions is available in the **All Questions** view. The All Questions screen is the best place to prepare all questions - this makes it easier to reuse questions across different questionnaires.

![Question management interface showing categories, questions, and response options.](https://docs-resources.prod.twilio.com/5cc7e30af14aef1263fa4129a60efb20daf6b71677b09b8a2513dcb704a89251.png)

Each question has a *title*, *description* and *set of possible answers*.

You can also change in which category a question is and the order in which it appears. To change the order of the questions, drag and drop a question to the place where you want it to be. You can only reorder questions in the **All Questions** screen.

When changing the title of a question the history of assessments using the question is kept and updated to the new title. This way you can reformulate the question while keeping history in reporting and analytics.

> \[!CAUTION]
>
> Do not radically change the meaning of any question already used for assessment. This can lead to very confusing reporting results.

Each Question has multiple possible answers. You can choose the possible answers by clicking the menu behind the title of a question.

To give assessors a way to opt out of answering a question via a "not applicable" response for a given conversation, check the **Enable N/A Answer** box.

![Dropdown menu with options for two or three response categories and a five-star rating.](https://docs-resources.prod.twilio.com/8d16eff8f18deae8eeb0793047d0e100af6782123aeac08fb5f4a7e166926eb2.png)

> \[!WARNING]
>
> We recommend that only one person make changes to questions and questionnaires at a time in order not to overwrite their colleagues' changes.

Saving will **not** make your changes visible to assessors. To make your changes visible for assessors click **Publish**.

> \[!NOTE]
>
> Each answer has a score value assigned.
>
> Yes / No = 100% / 0%
>
> Good / Poor = 100% / 0%
>
> Good / Acceptable / Poor = 100% / 50% / 0%
>
> Complete / Partial / Missing = 100% / 40% / 0%
>
> Good / Fair / Poor = 100% / 40% / 0%
>
> Five stars = 100% / 75% / 50% / 25% / 0%

### Edit Questions in Multiple Questionnaires

Since the same question may be used in several questionnaires, pay extra attention when modifying a question.

Changes to a question impact *all* questionnaires in which the question appears. Questions that are used in multiple questionnaires have a small warning which indicates the number of questionnaires they are used in. Click on that number to see what questionnaires contain the question:

![Dropdown showing 'Used in 3 Questionnaires' with options: Outbound QA form, Inbound QA, Compliance check outbound.](https://docs-resources.prod.twilio.com/2b15741fc11e8c8087d4822eebc7505d4998549bf07a13b0634c7abd14e101f4.png)

If you want to modify the question but do not want to influence other questionnaires or historical data, click the menu symbol on the right side of the question and click **Duplicate**.

![Questionnaire options with choices for introduction, customer request, and agent verification.](https://docs-resources.prod.twilio.com/df99e321c77d41ad0abb940024fd8d5719d1545ec9db18838f047ee63c77dd43.png)

### Delete a Question

If you'd like to completely delete a question, click on **Delete** in the question menu symbol on the right.

![delete a question.](https://docs-resources.prod.twilio.com/22f5961ab73ced336e2f13acbe2640538079004d021f27303ce028618d82f898.png)

Deleting a question will delete it from all questionnaires where it is used. However, historical records of assessments containing this question will be kept in reporting.

## Questionnaires

A questionnaire contains a subset of questions. A questionnaire helps assessors to pick which questions they want to answer during a conversation assessment. The list of all questionnaires is in the navigation on the left.

### Create a New Questionnaire

Press the **New Questionnaire** button in the top left corner to create a new questionnaire. By default, the newly created questionnaire does not contain any questions and is not saved. Choose a name and a description for your newly created questionnaire.

### Add and remove Questions to a Questionnaire

To quickly add and remove existing questions to a questionnaire click **Questions**.

Click on any question to toggle its inclusion in a questionnaire. Questions with a check mark are included in the current questionnaire.

![Questionnaire menu with sections for script, customer experience, and closing.](https://docs-resources.prod.twilio.com/cbe1c3f41e3d89ca1e80617c6650059d75bc277e771a6f29db8d54fe528c5a74.png)

Use the **Search Questions** field to find the question you need when you have a large pool of questions.

You can also add a completely new question by clicking on **New Question**. This will add a new question to your **all questions** list.

![new question.](https://docs-resources.prod.twilio.com/df6cd4c7e98752236cbb29ca87b349a4b42800f1f3ce5aa313b7f9221561d3ea.png)

### Remove a Question from a Questionnaire

You can remove a question from a questionnaire while in a specific questionnaire menu:

* Click on the menu symbol on the right side of the question
* Click **Remove** to remove the question from the current questionnaire
* Click **Remove from All Questionnaires** to remove the question from all questionnaires

![remove from a questionnaire.](https://docs-resources.prod.twilio.com/d2d778923cf29a4d0405aa9bbdadcb9ff4aa2a5fd818acc4dc0bf89b8adff0be.png)

Any assessments that include a question that has been removed will be stored - even after the question is removed from all questionnaires.

## Save and publish a Questionnaire

To save your changes click **Save All**. This will store all the edits you have done since the last time you saves.
