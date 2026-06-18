# The export job model

You can use the API to export **message delivery and engagement data** for all outbound content sent in a given timeframe, including Emails, Posts, Custom Bots, Surveys, Tours, and Series. The exported data tells you who received each message, when they received it, and how they engaged with it — including opens, clicks, replies, completions, dismissals, unsubscribes, and bounces. This does not export raw message or conversation content.

This data is valuable for analysing the performance of your Intercom messages and for joining message engagement data with user data external to Intercom to attribute performance. [More on the feature is here](https://www.intercom.com/help/onboard-and-engage-customers/see-how-your-messages-are-doing/export-your-message-data).

You should perform three operations in order to retrieve your message data:

- [Create an export job where you set the timeframe for the messages you want to export](#creating-an-export-job)
- [Check the status of your export job](#retrieve-a-job-status)
- [Download the message data once the export job has been completed](#retrieve-the-exported-data)


### Export Job Object

| Key | Value | Description |
|  --- | --- | --- |
| job_identfier | string | The identifier for your job. |
| status | `pending`, `in_progress`, `failed`, `completed`, `no_data`, | The current state of your job. |
| download_expires_at | date | The time after which you will not be able to access the data. |
| download_url | URL | The location where you can download your data. |


Export limit size
If your export job exceeds 10 millions rows in size then we will only return the first 10 millions rows. In other words, we cannot export any job greater than 10 million rows