# Firebase

Connect Claude Code directly to Google Firebase for seamless backend management. This plugin enables you to work with Firestore databases, manage authentication users, deploy cloud functions, configure hosting, and access storage—all without leaving your development environment.

Key capabilities include Firestore document operations (get, delete, query), user authentication management, Cloud Functions log retrieval, Cloud Messaging for sending notifications, Remote Config template management, Crashlytics issue tracking, and Realtime Database read/write operations. The plugin also provides security rules validation and project configuration tools.

**How to use:** Once installed, Claude Code gains access to Firebase tools automatically. Try prompts like "Query all users from my Firestore collection", "Show me the latest Cloud Functions logs", "Send a test notification via Cloud Messaging", "Get the Crashlytics issues from the last 24 hours", or "Deploy my Firebase hosting configuration". You can also use built-in prompts like `firebase:deploy` to deploy resources, `firebase:init` to set up services, and `crashlytics:connect` to access crash data.