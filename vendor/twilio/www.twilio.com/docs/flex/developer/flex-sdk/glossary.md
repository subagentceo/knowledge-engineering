# Flex SDK glossary

This glossary defines key terms you'll encounter when working with the Flex SDK. These terms relate to contact center concepts, Twilio-specific entities, and common authentication patterns for developers.

> \[!NOTE]
>
> Although terms on this page are grouped by method, many terms are relevant to multiple Flex SDK methods.

## Worker terms

| Term          | Example                                   | Definition                                                                                                                               |
| ------------- | ----------------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------- |
| Activity      | `setCurrentActivity`, `setWorkerActivity` | An agent's current status (for example, `Available`, `Offline`, or `Busy`), crucial for managing agent availability in a contact center. |
| Attributes    | `setAttributes`, `setWorkerAttributes`    | Key-value pairs associated with a worker or task, often used for skill-based routing or storing contextual information.                  |
| Worker object | `getWorker`                               | The programmatic representation of a contact center agent or employee.                                                                   |

## Task terms

| Term         | Example                                             | Definition                                                                                                                              |
| ------------ | --------------------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------- |
| Task         | `acceptTask`, `rejectTask`                          | A Task represents a single unit of work an agent handles, such as an incoming call, chat message, or an email.                          |
| Wrapup       | `wrapUpTask`                                        | The time an agent spends completing post-interaction administrative work after a customer interaction ends.                             |
| Participants | `GetTaskParticipants`, `AddTaskParticipantListener` | Individuals or entities involved in a Task, such as the customer, agent, or supervisor.                                                 |
| Listener     | `AddTaskParticipantListener`                        | A procedure that listens for an event to occur (for example, a participant being added to a Task), and then executes a specific action. |

## Voice terms

| Term                       | Example                                             | Definition                                                                                                        |
| -------------------------- | --------------------------------------------------- | ----------------------------------------------------------------------------------------------------------------- |
| Outbound call              | `startOutboundCall`                                 | A call initiated by an agent or system to a customer, as opposed to an inbound call initiated by a customer.      |
| Voice event                | `addVoiceEventListener`                             | Specific occurrences related to a voice call, such as an incoming call, a call being connected, or a call ending. |
| Monitor call               | `monitorCall`                                       | A supervisory function that allows an agent or supervisor to listen in on another agent's call.                   |
| VoiceCall (object/context) | `VoiceCall.mute`, `VoiceCall.disconnect`            | The programmatic object representing an active voice call within the Flex system.                                 |
| Mute / Hold / Unhold       | `VoiceCall.mute`, `VoiceCall.hold`                  | Standard call controls for managing audio and call state.                                                         |
| Kick                       | `kickVoiceParticipant`                              | To forcibly remove a participant from an ongoing call or conference.                                              |
| External voice participant | `addExternalVoiceParticipant`                       | A person or entity outside the immediate contact center system who is added to a voice interaction.               |
| Conference                 | `endVoiceCallForAll`                                | A multi-party call involving several participants, such as an agent, customer, and external expert.               |
| Voice task transfer        | `startVoiceTaskTransfer`, `cancelVoiceTaskTransfer` | The process of moving a voice-related task from one agent or queue to another.                                    |

## Conversation terms

| Term                  | Example                                                 | Definition                                                                                                                                                                                   |
| --------------------- | ------------------------------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Conversation          | `getConversationByTask`, `pauseConversation`            | A general term in Flex for any ongoing interaction with a customer, such as a voice call, chat, SMS, or email. Conversations provide a unified view across different communication channels. |
| Conversation channel  | `pauseConversation`, `leaveConversation`                | The specific medium through which a conversation is taking place (for example, an SMS channel).                                                                                              |
| Email task            | `StartOutboundEmailTask`                                | A task type specifically for handling email interactions, often with similar lifecycle stages to voice or chat tasks.                                                                        |
| Email participant     | `AddEmailParticipant`, `removeEmailParticipant`         | An individual involved in an email conversation, usually identified by their email address.                                                                                                  |
| Paused conversations  | `getPausedConversations`                                | Conversations that are temporarily suspended but can be resumed later.                                                                                                                       |
| Conversation transfer | `startConversationTransfer`, `getConversationTransfers` | The act of re-routing an ongoing conversation to another agent, queue, or department.                                                                                                        |

## Authorization terms

| Term                    | Example                        | Definition                                                                                                                                                             |
| ----------------------- | ------------------------------ | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Login details           | `getLoginDetails`              | The specific information required to initiate a user login process. This includes authentication configuration and parameters for secure token exchange.               |
| PKCE                    |                                | An extension to the OAuth 2.0 authorization code flow that prevents interception attacks, particularly in public clients like mobile apps or single-page applications. |
| IdP (Identity Provider) |                                | A service that stores and verifies user identities, such as Google, Okta, or Auth0.                                                                                    |
| Refresh token           | `refreshToken`                 | A credential used to obtain a new access token without requiring the user to re-authenticate. This ensures continuous session security.                                |
| Token                   | `validateToken`, `updateToken` | A digital credential that grants a user or application permission to access specific resources or APIs. This can refer to different types, such as JWE tokens.         |
| Authentication config   | `getAuthenticationConfig`      | The settings and parameters required to set up an authentication flow, such as OAuth configurations.                                                                   |
| OAuth configurations    |                                | Refers to the settings for Open Authorization, an open standard for access delegation, commonly used for secure API access.                                            |
| JWE token               |                                | A type of JSON-based security token used to represent encrypted content securely.                                                                                      |
| codeVerifier / nonce    | Parameters in `exchangeToken`  | Cryptographic values used in OAuth/PKCE flows to enhance security during token exchange.                                                                               |

## SDK Client terms

| Term             | Example        | Definition                                                                                                                      |
| ---------------- | -------------- | ------------------------------------------------------------------------------------------------------------------------------- |
| Worker object    | `getWorker`    | The programmatic representation of the agent currently logged into Flex.                                                        |
| Workspace object | `getWorkspace` | The programmatic representation of the Flex contact center environment. Contains configurations for tasks, workers, and queues. |

## Static terms

| Term                       | Example             | Definition                                                                                                                             |
| -------------------------- | ------------------- | -------------------------------------------------------------------------------------------------------------------------------------- |
| FlexSDK Client instance    | `createClient`      | The main object initialized with the Flex SDK that provides access to all SDK functionality.                                           |
| Public configuration       | `getPublicConfig`   | Configuration data that is generally accessible and doesn't contain sensitive information.                                             |
| Flex configuration service |                     | The backend service that provides configuration data for Twilio Flex.                                                                  |
| Features config            | `getFeaturesConfig` | Configuration settings related to specific functionality or features within the Flex application.                                      |
| Session token              |                     | A token that represents an active user session.                                                                                        |
| Account configuration data | `getAccountConfig`  | Specific settings and data related to the Twilio account associated with the Flex instance.                                            |
| Log level                  | `setLogLevel`       | A setting that controls the verbosity and importance of messages output by the SDK (for example, `debug`, `info`, `warn`, or `error`). |
| SDK error                  | `FlexSdkError`      | An error specifically originating from the Flex SDK.                                                                                   |
| Error code                 | `ErrorCode`         | A specific identifier for a type of error, often used programmatically for error handling (for example, `ErrorCode` enum).             |
| Error severity             | `ErrorSeverity`     | The level of impact or importance of an error (for example, low, medium, or high).                                                     |
