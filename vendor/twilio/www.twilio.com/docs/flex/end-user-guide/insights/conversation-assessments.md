# Conversation Assessment

> \[!IMPORTANT]
>
> Flex Insights (also known as Historical Reporting) is currently available as a public beta release and the information contained in the Flex Insights documentation is subject to change. This means that some features are not yet implemented and others may be changed before the product is declared as generally available. Public beta products are not covered by a Twilio SLA.
>
> Any reference to "Historical Reporting", "Flex Insights API", "Flex Insights Historical Reporting", or "Flex Insights Historical Reporting API" in the Flex Insights documentation refers to Flex Insights.

Conversation assessment is essential for gaining more in-depth insight into conversations with your customers. Assessments help you understand different aspects of a discussion, from customer satisfaction to call quality and agent reflection.

> \[!NOTE]
>
> This guide will get you up and running with creating Flex Insights questionnaires and assessing calls.
>
> For more detail on managing and editing questions and questionnaires, see our detailed documentation on [Flex Insights Questionnaires](/docs/flex/end-user-guide/insights/questionnaires).
>
> For a full list of the metrics and attributes used in your assessment reports, see [Flex Insights Assessment Reporting](/docs/flex/end-user-guide/insights/assessment-reporting).

## Create questions and a questionnaire

The best way to create new questions is through the **All Questions** screen. This view allows you to prepare questions and then reuse them across questionnaires.

To create a new question via the **All Questions** view:

1. Click the **New Question** button.
2. Give your question a clear title and pick the appropriate category.

New questions will be added to the list of questions as well as the questionnaire you're working on (if a questionnaire is in progress).

To create a new questionnaire, click on the **New Questionnaire** button. Add new questions to this questionnaire by clicking on **New Question** or the **Questions** button.

* Clicking on **New Question** will create a new question and adds it to this questionnaire
* Clicking on **Questions** allows you to choose from a list of all available questions

When your question list is complete, you can save your questionnaire by clicking on the **Save All** button. This saves your changes to the underlying database, which then is reflected in all elements stored under the **Assessment** tab.

> \[!CAUTION]
>
> * Questions and questionnaires in the Flex Insights Assessment tab do not support simultaneous users editing - please make sure only one person is working on the list of questions/questionnaires at a time.
> * We do not recommend renaming existing demo questions. Instead, remove those placeholders.

When you're ready to make the assessment available for evaluation, flip the **Available for Assessment** switch and hit the **Save All** and **Publish** buttons.

**Available for Assessment**: once switched on and saved, the questionnaire will be visible in the Player and available to be used in evaluations.

**Save All**: syncs all changes to the underlying database. These changes are then reflected in all elements stored under the **Assessment** tab.

**Publish**: propagates your saved changes to the **Player** for evaluation.

## How to assess a call

Calls assessment requires [necessary permissions](/docs/flex/admin-guide/setup/sso-configuration/insights-user-roles) to evaluate calls. Only users who made an evaluation can see their results on the [player screen](/docs/flex/end-user-guide/insights/player).

1. To select a call for an evaluation, click on the conversation ID or URL: this will open the conversation in Player.

   * You can use the dashboard's *Assessment* > *Assessment Queue* or any other report to enlist conversations.
   * Make sure you have any pop-up blockers disabled for your Flex Insights application.
2. Select the questionnaire (evaluation form) from the dropdown in the Assessment panel or via the **Assess** button:

   ![Assessment interface with Quick Assessment dropdown and script rating options.](https://docs-resources.prod.twilio.com/de25b2ff0bb7259cbb1e006b1c2e35c46dc4a99a8a2fae04efd522e6ac99e8e9.png)
3. Start answering each question by selecting the answer to the right.

   * Hovering over a question will provide a more detailed description of the question
   * You can track the progress of questionnaire completion at the right upper corner within the **Assessment** panel
   * For questions that don't have an applicable answer, select **N/A**
   * Finish the questionnaire by picking a response to each question
   * Once complete, you will see the indication '**All Answered**':

     ![Quick Assessment dropdown with all questions answered.](https://docs-resources.prod.twilio.com/59329536aacf13e7342d226dc4f7520a5b9376fbd1be11417110f82a841dd223.png)
4. \[*Optional*] if you'd like to provide additional feedback on the evaluated conversation, you can use the **Comment** button.

   * Clicking on this button will open the text field, where you can type your feedback and assign the comment to one of the available categories (*Good*, *Neutral*, *Bad*, *Good for Coaching*, etc.).

## Who can maintain questionnaires and assess calls?

Questionnaire creation and editing (under the **Assessments** tab) is available to users with **wfo.full\_access** and **wfo.quality\_process\_manager** role.

The ability to make assessments (available via Player) is provided for a range of [wfo.\* roles](/docs/flex/admin-guide/setup/sso-configuration/insights-user-roles) with **Assess Calls** permission. Roles can be combined.

To learn more about creating, editing, and managing questions, see our [full guide to Flex Insights Questionnaires](/docs/flex/end-user-guide/insights/questionnaires).
