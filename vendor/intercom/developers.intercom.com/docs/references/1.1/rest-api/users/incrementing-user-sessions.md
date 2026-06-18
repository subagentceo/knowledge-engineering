# Incrementing User Sessions

To indicate the update is part of an active session pass `new_session: true` when you update the user. The API will then follow the rules for web sessions outlined in our [session docs](https://www.intercom.com/help/en/Your-users-data/how-is-a-session-defined) to decide whether the session count should be updated for the user.