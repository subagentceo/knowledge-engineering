# Conversations

Conversation are how you can communicate with users in Intercom.

To start a conversation you and your users can send messages. The API supports two ways to start a conversation -

- From a user to you, called a 'user initiated' conversation.
- From a team member to a single user called an 'admin initiated' conversation.


The API does not currently support sending admin initiated messages to multiple users, creating [auto messages](https://docs.intercom.com/intercom-s-key-features-explained/sending-messages/how-auto-messages-work) or sending from teams, but we'd be interested in hearing your usecases - please contact [team@intercom.io](mailto:team@intercom.io).

Once a message has been sent the conversation can begin! Users and Admins can reply to any conversation via the API - see the section ["Replying to a Conversation"](/docs/references/1.4/rest-api/conversations/replying-to-a-conversation) for details.

> 🚧
The Conversations API is only available to Apps with a trial or an active subscription.


Note
There may be a short delay between user creation and a user becoming available for messaging through the API. A 404 will be returned in this case, and you should retry the request after a delay.

Note
If you try to send an email to a user who has unsubscribed, we will return a 403 and the message "This user is unsubscribed from emails".