# Programmable Messaging Logs

If you encounter issues with message delivery, such as duplicate messages, start debugging by viewing your Programmable Messaging Logs.

## Console

Log in to your [Twilio Console](https://1console.twilio.com/us1/monitor/logs/sms) and go to **Monitor** > **Logs** > **Messaging** in the left-side navigation menu.

## Legacy Console

Log in to your [Twilio Console](https://console.twilio.com/us1/monitor/logs/sms) and go to **Monitor** > **Logs** > **Messaging** in the left-side navigation menu.

## Logs list view

The Messaging Logs page displays a table with the following columns: date, service, direction, status, and troubleshoot links for each message.

The default view of Messaging logs lists the 50 most recent messages you've sent, starting with the most recent. You can search by Message SID, `From` and `To` phone numbers, and filter by start and end times.

Each log entry displays:

* The message creation time.
* The associated [Messaging Service](/docs/messaging/services), if applicable.
* The direction of the message (incoming, outgoing, reply).
* The `From` and `To` numbers.
* The number of segments in the message.
* The [status of the message](https://help.twilio.com/articles/223134347).
* Any attached media.

Messages with statuses other than `200` appear in yellow or red, depending on the status code.

You can start the AI Assistant by clicking the **Discover Messaging with AI** button at the top right-hand side. You can also troubleshoot individual messages and get recommendations by clicking the message-level **Troubleshoot** button.

## Individual log details view

To explore a specific message further, click the hyperlinked date in the message's log entry. This takes you to the **Message Details** page. The page displays the following information:

* **Message SID**: The unique identifier for the message.
* **Message creation time**: When the message was created.
* **To and From numbers**: The sender and recipient phone numbers.
* **Delivery Steps**: Shows the message creation time, how long Twilio queued the message, and when Twilio sent it to the carrier for delivery. These factors can help you determine where an undelivered message failed or help you investigate latency issues.
* **Errors or warnings**: Any issues encountered during delivery.
* **Request Inspector**: Displays all HTTP requests and responses made when sending or receiving the message.

## Intelligent Discovery AI Assistant

The [Intelligent Discovery AI Assistant](/docs/messaging/features/intelligent-discovery-ai-assistant) is an AI-driven tool designed to help you interact with Twilio's messaging data using natural language. This assistant helps you troubleshoot messaging-related issues such as deliverability errors by analyzing data and offering actionable recommendations.

The Assistant supports both technical and non-technical users, providing features such as:

* **Identifying messages with delivery problems**: quickly find messages that failed to deliver and understand why.
* **Providing insights**: get country-specific and phone number-specific insights that may affect message delivery.
* **Offering advanced recommendations**: receive tailored suggestions to resolve issues based on your messaging patterns.
* **Connecting with support**: seamlessly connect with a live Twilio support agent if you need further assistance.

By using the Intelligent Discovery AI Assistant, you can streamline the troubleshooting process and resolve messaging issues more efficiently. You can start the AI Assistant while on the **Message Details** page. Click the **Troubleshoot this message** button in the top-right corner or the **Troubleshoot** button near the error code.

You can also access the Intelligent Discovery AI Assistant from the Console:

## Console

Log in to your [Twilio Console](https://1console.twilio.com) and go to **Developer Tools** > **AI Assistants** in the left-side navigation menu.

## Legacy Console

Log in to your [Twilio Console](https://console.twilio.com) and go to **Developer Tools** > **AI Assistants** in the left-side navigation menu.
