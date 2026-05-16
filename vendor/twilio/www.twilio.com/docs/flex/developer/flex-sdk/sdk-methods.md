# Flex SDK methods

The following methods are available in the Flex SDK:

### Worker methods

#### setCurrentActivity

Set the activity of the user.

```javascript
import { createClient, SetCurrentActivity } from "@twilio/flex-sdk";

async function setCurrentActivity() {
    const client = await createClient("SDK_TOKEN");
    const worker = await client.getWorker();

    // Activities are accessible via Worker.activities property (Map of activitySID to Activity)
    const activities = Array.from(worker.activities.values());
    const targetActivity = activities.find(activity => activity.name === "Available") || activities[0];

    console.log(`Setting worker activity to "${targetActivity.name}" (${targetActivity.sid})`);

    const setCurrentActivityAction = new SetCurrentActivity(targetActivity.sid);
    await client.execute(setCurrentActivityAction);
}
```

#### setAttributes

Set worker attributes.

```javascript
import { createClient } from "@twilio/flex-sdk";
import { SetAttributes } from "@twilio/flex-sdk/actions/Worker";

async function setWorkerAttributes() {
    const client = await createClient("SDK_TOKEN");
    const setAttributesAction = new SetAttributes({ key: "value" });
    await client.execute(setAttributesAction);
}
```

### Task methods

#### acceptTask

Accept a task.

**Note**: For voice tasks, you must first register a **VoiceClientEvent** listener using **AddVoiceEventListener** before calling this action. If you don't do this, accepting the task may fail or result in a missing call context.

```javascript
import { createClient } from "@twilio/flex-sdk";
import { AcceptTask } from "@twilio/flex-sdk/actions/Task";

async function acceptTask() {
    const client = await createClient("SDK_TOKEN");
    const acceptTask = new AcceptTask("WTXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX");
    const { task, reservation } = await client.execute(acceptTask);
    return { task, reservation };
}
```

#### rejectTask

Reject a task.

```javascript
import { createClient } from "@twilio/flex-sdk";
import { RejectTask } from "@twilio/flex-sdk/actions/Task";

async function rejectTask() {
    const client = await createClient("SDK_TOKEN");
    const rejectTask = new RejectTask("WTXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX");
    const { task, reservation } = await client.execute(rejectTask);
    return { task, reservation };
}
```

#### completeTask

Complete a task that's either pending or assigned. If applicable, will result in `wrapUpTask` being called.

```javascript
import { createClient } from "@twilio/flex-sdk";
import { CompleteTask } from "@twilio/flex-sdk/actions/Task";

async function completeTask() {
    const client = await createClient("SDK_TOKEN");

    const completeTask = new CompleteTask("WTXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX");
    const completedTask = await client.execute(completeTask);
    return completedTask;
}
```

#### wrapUpTask

Wrap up a task.

```javascript
import { createClient } from "@twilio/flex-sdk";
import { WrapUpTask } from "@twilio/flex-sdk/actions/Task";

async function wrapUpTask() {
    const client = await createClient("SDK_TOKEN");
    const wrapUpTask = new WrapUpTask("TSXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX");
    const { task, reservation } = await client.execute(wrapUpTask);
    return { task, reservation };
}
```

#### endTask

Clear the task. Hang up a voice call by invoking the `HangupCall` action. If there isn't a voice call to hang up, this method proceeds to invoke the `CompleteTask` or `wrapUpTask` actions, depending on the task status and the taskChannel capabilities.

```javascript
import { createClient } from "@twilio/flex-sdk";
import { EndTask } from "@twilio/flex-sdk/actions/Task";

async function endTask() {
    const client = await createClient("SDK_TOKEN");
    const endTask = new EndTask("WTXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX");
    const { task, reservation } = await client.execute(endTask);
    return { task, reservation };
}
```

#### GetTaskParticipants

Get all participants attached to a task.

```javascript
import { createClient } from "@twilio/flex-sdk";
import { GetTaskParticipants } from "@twilio/flex-sdk/actions/Task";

async function getTaskParticipants() {
    const client = await createClient("SDK_TOKEN");
    const getTaskParticipants = new GetTaskParticipants("WTXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX");
    const participants = await client.execute(getTaskParticipants);
    return participants;
}
```

#### AddTaskParticipantListener

Add a task participant event listener.

```javascript
import { createClient } from "@twilio/flex-sdk";
import { AddTaskParticipantListener } from "@twilio/flex-sdk/actions/Task";

async function addTaskParticipantListener() {
    const client = await createClient("SDK_TOKEN");

    const addTaskParticipantListener = new AddTaskParticipantListener(
        "WTxxx",
        "participantAdded",
        (task, participant) => {
            console.log(`Participant added: ${participant.sid} to task ${task.sid}`);
        }
    );
    const { unsubscribe } = await client.execute(addTaskParticipantListener);
    return unsubscribe;
}
```

#### setTaskAttributes

Update task attributes.

```javascript
import { createClient } from "@twilio/flex-sdk";
import { SetTaskAttributes } from "@twilio/flex-sdk/actions/Task";

async function setTaskAttributes() {
    const client = await createClient("SDK_TOKEN");
    const setTaskAttributesAction = new SetTaskAttributes(
        "WTXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX",
        { key: "value" }
    );
    const updatedTask = await client.execute(setTaskAttributesAction);
    return updatedTask;
}
```

### Voice methods

#### startOutboundCall

Start an outbound voice call.

```javascript
import { createClient, Reservation } from "@twilio/flex-sdk";
import { StartOutboundCall, StartOutboundCallOptions } from "@twilio/flex-sdk/actions/Voice";

async function startOutboundCall() {
    const client = await createClient("SDK_TOKEN");
    const reservationCanceledHandler = (reservation: Reservation) => {
        console.log(
            `Reservation canceled with reason https://www.twilio.com/docs/api/errors/${reservation.canceledReasonCode}`
        );
        reservation.off("canceled", reservationCanceledHandler);
    };
    const startOutboundCallOptions: StartOutboundCallOptions = {
        reservationEventListeners: {
            canceled: reservationCanceledHandler
        }
    };
    const startOutboundCallAction = new StartOutboundCall("+15555555555", startOutboundCallOptions);
    const call = await client.execute(startOutboundCallAction);
}
```

#### addVoiceEventListener

Add a voice event listener to the client.

```javascript
import { createClient } from "@twilio/flex-sdk";
import { AddVoiceEventListener, VoiceClientEvent } from "@twilio/flex-sdk/actions/Voice";

const client = await createClient("SDK_TOKEN");

const addVoiceEventListener = new AddVoiceEventListener(VoiceClientEvent.Incoming, (call) => {
  // Handle incoming call
});
const { unsubscribe } = await client.execute(addVoiceEventListener);

// call unsubscribe if defined to remove the listener when needed
unsubscribe();
```

#### monitorCall

Monitor a provided ongoing call of another agent.

```javascript
import { createClient } from "@twilio/flex-sdk";
import { MonitorCall } from "@twilio/flex-sdk/actions/Voice";

async function example() {
  const client = await createClient("SDK_TOKEN");
  const monitorCall = new MonitorCall("WTXXXXXXXXXXXXXXXXXXXXXXXXX", "WRXXXXXXXXXXXXXXXXXXXXXXXXX");
  const call = await client.execute(monitorCall);
}
```

#### VoiceCall.mute

Mute current call.

```javascript
import { createClient, StartOutboundCall } from "@twilio/flex-sdk";

const client = await createClient("SDK_TOKEN");
const startOutboundCall = new StartOutboundCall("+1XXX", { fromNumber: "+1XXX", workflowSid: "WWXXX", taskQueueSid: "WQXXX"});

const voiceCall = await client.execute(startOutboundCall);
voiceCall.mute();

const isMuted: boolean = voiceCall.isMuted();
console.log(`Call ${isMuted ? "is muted" : "is not muted"}`)
```

#### VoiceCall.unmute

Unmute current call.

```javascript
import { createClient, StartOutboundCall } from "@twilio/flex-sdk";

const client = await createClient("SDK_TOKEN");
const startOutboundCall = new StartOutboundCall("+1XXX", { fromNumber: "+1XXX", workflowSid: "WWXXX", taskQueueSid: "WQXXX"});

const voiceCall = await client.execute(startOutboundCall);
voiceCall.unmute();

const isMuted: boolean = voiceCall.isMuted();
console.log(`Call ${isMuted ? "is muted" : "is not muted"}`)
```

#### VoiceCall.isMuted

Checks if the current call is muted.

```javascript
import { createClient, StartOutboundCall } from "@twilio/flex-sdk";

const client = await createClient("SDK_TOKEN");
const startOutboundCall = new StartOutboundCall("+1XXX", { fromNumber: "+1XXX", workflowSid: "WWXXX", taskQueueSid: "WQXXX"});

const voiceCall = await client.execute(startOutboundCall);

const isMuted: boolean = voiceCall.isMuted();
console.log(`Call ${isMuted ? "is muted" : "is not muted"}`)
```

#### VoiceCall.call \[Member]

Instance of the call.

#### VoiceCall.device \[Member]

Instance of the device.

#### VoiceCall.disconnect

Hang up the current call.

```javascript
import { createClient, StartOutboundCall } from "@twilio/flex-sdk";

const client = await createClient("SDK_TOKEN");
const startOutboundCall = new StartOutboundCall("+1XXX", { fromNumber: "+1XXX", workflowSid: "WWXXX", taskQueueSid: "WQXXX"});

const voiceCall = await client.execute(startOutboundCall);

await voiceCall.disconnect();
```

#### VoiceCall.hold

Hold the current call.

```javascript
import { createClient, StartOutboundCall } from "@twilio/flex-sdk";

const client = await createClient("SDK_TOKEN");
const voiceCall = await client.execute(
  new StartOutboundCall("+1XXX")
);
await voiceCall.hold("holdMusicUrl", "GET");
```

#### VoiceCall.unhold

Unhold the current call.

```javascript
import { createClient, StartOutboundCall } from "@twilio/flex-sdk";

const client = await createClient("SDK_TOKEN");
const startOutboundCall = new StartOutboundCall("+1XXX", { fromNumber: "+1XXX", workflowSid: "WWXXX", taskQueueSid: "WQXXX"});

const voiceCall = await client.execute(startOutboundCall);

// Call is not on hold by default so to unhold, it is needed to hold first
await call.hold("holdMusicUrl", "GET");
await call.unhold();
```

#### VoiceCall.isOnHold

Check if the current call is on hold.

```javascript
import { createClient, StartOutboundCall } from "@twilio/flex-sdk";

const client = await createClient("SDK_TOKEN");
const startOutboundCall = new StartOutboundCall("+1XXX", { fromNumber: "+1XXX", workflowSid: "WWXXX", taskQueueSid: "WQXXX"});

const voiceCall = await client.execute(startOutboundCall);

const isOnHold: boolean = await voiceCall.isOnHold();
console.log(`Call ${isOnHold ? "is on hold" : "is not on hold"}`)
```

#### getCallByTask

Returns the VoiceCall object associated with the provided task.

```javascript
import { createClient } from "@twilio/flex-sdk";
import { GetCallByTask } from "@twilio/flex-sdk/actions/Voice";

async function getCallByTask() {
    const client = await createClient("SDK_TOKEN");
    const getCallByTask = new GetCallByTask("WTXXX");
    const voiceCall = await client.execute(getCallByTask);
    return voiceCall;
}
```

#### holdVoiceParticipant

Put a call participant on hold.

```javascript
import { createClient } from "@twilio/flex-sdk";
import { HoldVoiceParticipant } from "@twilio/flex-sdk/actions/Voice";

async function holdVoiceParticipant() {
    const client = await createClient("SDK_TOKEN");
    const holdVoiceParticipantAction = new HoldVoiceParticipant(
        "WKXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX",
        "WTXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX"
    );
    await client.execute(holdVoiceParticipantAction);
}
```

#### unholdVoiceParticipant

Unhold a call participant.

```javascript
import { createClient } from "@twilio/flex-sdk";
import { UnholdVoiceParticipant } from "@twilio/flex-sdk/actions/Voice";

const client = await createClient("SDK_TOKEN");
const unholdVoiceParticipant = new UnholdVoiceParticipant("WKXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX", "WTXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX");
await client.execute(unholdVoiceParticipant);
```

#### kickVoiceParticipant

Remove a participant from a call.

```javascript
import { createClient } from "@twilio/flex-sdk";
import { KickVoiceParticipant } from "@twilio/flex-sdk/actions/Voice";

const client = await createClient("SDK_TOKEN");
const kickVoiceParticipant = new KickVoiceParticipant("UTXXX", "WTXXX");
await client.execute(kickVoiceParticipant);
```

#### addExternalVoiceParticipant

Add a participant to a voice task.

```javascript
import { createClient } from "@twilio/flex-sdk";
import { AddExternalVoiceParticipant } from "@twilio/flex-sdk/actions/Voice";

async function addExternalVoiceParticipant() {
    const client = await createClient("SDK_TOKEN");
    const addParticipant = new AddExternalVoiceParticipant(
        "WKXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX",
        "+1234567890"
    );
    const { pendingParticipantResponse, waitForParticipantToSettle } = await client.execute(addParticipant);
    return { pendingParticipantResponse, waitForParticipantToSettle };
}
```

#### endVoiceCallForAll

End a conference for all participants in a task.

```javascript
import { createClient } from "@twilio/flex-sdk";
import { EndVoiceCallForAll } from "@twilio/flex-sdk/actions/Voice";

async function endVoiceCallForAll() {
    const client = await createClient("SDK_TOKEN");
    const endVoiceCallForAll = new EndVoiceCallForAll("WTXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX");
    const endedTask = await client.execute(endVoiceCallForAll);
    return endedTask;
}
```

#### startVoiceTaskTransfer

Transfer a provided task to a target worker.

```javascript
import { createClient } from "@twilio/flex-sdk";
import { StartVoiceTaskTransfer } from "@twilio/flex-sdk/actions/Voice";

async function transferVoiceTask() {
    const client = await createClient("SDK_TOKEN");
    const startVoiceTaskTransfer = new StartVoiceTaskTransfer("WTXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX", "WKXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX");
    const transferredTask = await client.execute(startVoiceTaskTransfer);
    return transferredTask;
}
```

#### cancelVoiceTaskTransfer

Cancel a task that was being transferred to a target worker.

```javascript
import { createClient } from "@twilio/flex-sdk";
import { CancelVoiceTaskTransfer } from "@twilio/flex-sdk/actions/Voice";

async function cancelVoiceTaskTransfer() {
    const client = await createClient("SDK_TOKEN");
    const cancelVoiceTaskTransfer = new CancelVoiceTaskTransfer("WTXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX");
    const canceledTask = await client.execute(cancelVoiceTaskTransfer);
    return canceledTask;
}
```

### Conversation methods

#### getConversationByTask

Get conversation for a task.

```javascript
import { createClient } from "@twilio/flex-sdk";
import { GetConversationByTask } from "@twilio/flex-sdk/actions/Conversation";

async function getConversationByTask() {
    const client = await createClient("SDK_TOKEN");
    const getConversationByTask = new GetConversationByTask(
        "WTXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX"
    );
    const conversation = await client.execute(getConversationByTask);
    return conversation;
}
```

#### getConversationBySid

Get a conversation by its SID.

```javascript
import { createClient } from "@twilio/flex-sdk";
import { GetConversationBySid } from "@twilio/flex-sdk/actions/Conversation";

async function runCode() {
    const client = await createClient("SDK_TOKEN");
    const getConversation = new GetConversationBySid("CHXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX");
    const conversation = await client.execute(getConversation);
    console.log("Conversation SID:", conversation.sid);

```

#### pauseConversation

Pause the conversation channel of a task.

```javascript
import { createClient } from "@twilio/flex-sdk";
import { PauseConversation } from "@twilio/flex-sdk/actions/Conversation";

async function pauseConversation() {
    const client = await createClient("SDK_TOKEN");
    const pauseConversationAction = new PauseConversation("WTXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX");
    await client.execute(pauseConversationAction);
}
```

#### leaveConvesation

Leave the conversation channel of a task.

```javascript
import { createClient } from "@twilio/flex-sdk";
import { LeaveConversation } from "@twilio/flex-sdk/actions/Conversation";

async function leaveConversation() {
    const client = await createClient("SDK_TOKEN");
    const leaveConversationAction = new LeaveConversation("WTXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX");
    await client.execute(leaveConversationAction);
}
```

#### startConversationTransfer

Transfer a conversation channel.

```javascript
import { createClient } from "@twilio/flex-sdk";
import { StartConversationTransfer } from "@twilio/flex-sdk/actions/Conversation";

async function startConversationTransfer() {
    const client = await createClient("SDK_TOKEN");
    const startConversationTransferAction = new StartConversationTransfer(
        "WTXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX",
        "WKXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX"
    );
    await client.execute(startConversationTransferAction);
}
```

#### getConversationTransfers

Get channel transfers.

```javascript
import { createClient } from "@twilio/flex-sdk";
import { GetConversationTransfers } from "@twilio/flex-sdk/actions/Conversation";

async function getConversationTransfers() {
    const client = await createClient("SDK_TOKEN");
    const getConversationTransfersAction = new GetConversationTransfers(
        "WTXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX"
    );
    const transfers = await client.execute(getConversationTransfersAction);
    return transfers;
}
```

#### conversation.sendMessage

Send a message to an existing conversation. Must be called from a conversation object which can be obtained after adding the event listener for a conversation event: `AddConversationEventListener`.

```javascript
import { createClient, AddConversationEventListener } from "@twilio/flex-sdk";

const client = await createClient("SDK_TOKEN");

const addConversationEventListener = new AddConversationEventListener("conversationAdded", (conversation) => {
  conversation.sendMessage({body: "hello world!"});
})
client.execute(addConversationEventListener)
```

#### conversation.getMessages

Get a conversation's messages.

```javascript
import { createClient, AddConversationEventListener } from "@twilio/flex-sdk";

const client = await createClient("SDK_TOKEN");

const addConversationEventListener = new AddConversationEventListener("conversationAdded", (conversation) => {
  conversation.getMessages();
})
client.execute(addConversationEventListener)
```

#### StartOutboundEmailTask

Start an outbound email task.

```javascript
import { createClient } from "@twilio/flex-sdk";
import { StartOutboundEmailTask } from "@twilio/flex-sdk/actions/Conversation";

async function startOutboundEmailTask() {
    const client = await createClient("SDK_TOKEN");
    const startOutboundEmailTask = new StartOutboundEmailTask("name@email.com");
    const { task, conversation } = await client.execute(startOutboundEmailTask);
    return { task, conversation };
}
```

#### AddEmailParticipant

Add a participant to an email task.

```javascript
import { createClient } from "@twilio/flex-sdk";
import { AddEmailParticipant, ParticipantLevel } from "@twilio/flex-sdk/actions/Conversation";

async function addEmailParticipant() {
    const client = await createClient("SDK_TOKEN");
    const addEmailParticipant = new AddEmailParticipant("WTXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX", "test.user@gmail.com", ParticipantLevel.To, { name: "Test User" });
    await client.execute(addEmailParticipant);
}
```

#### removeEmailParticipant

Remove a participant from an email task.

```javascript
import { createClient } from "@twilio/flex-sdk";
import { RemoveEmailParticipant } from "@twilio/flex-sdk/actions/Conversation";

async function removeEmailParticipant() {
    const client = await createClient("SDK_TOKEN");
    const removeEmailParticipant = new RemoveEmailParticipant(
        "WTXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX",
        "UTXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX"
    );
    const removedParticipant = await client.execute(removeEmailParticipant);
    return removedParticipant;
}
```

#### getPausedConversations

Get paused email conversations.

```javascript
import { createClient } from "@twilio/flex-sdk";
import { GetPausedConversations } from "@twilio/flex-sdk/actions/Conversation";

async function getPausedConversations() {
    const client = await createClient("SDK_TOKEN");
    const getPausedConversations = new GetPausedConversations();
    const result = await client.execute(getPausedConversations);
    return result;
}
```

#### getConversationsUser

Get a Conversations user.

```javascript
import { createClient } from "@twilio/flex-sdk";
import { GetConversationsUser } from "@twilio/flex-sdk/actions/Conversation";

async function getConversationsUser() {
    const client = await createClient("SDK_TOKEN");
    const getConversationsUser = new GetConversationsUser("user_identity");
    const user = await client.execute(getConversationsUser);
    return user;
}
```

#### resumeConversation

Resume a Conversations channel.

```javascript
import { createClient } from "@twilio/flex-sdk";
import { ResumeConversation, GetPausedConversations } from "@twilio/flex-sdk/actions/Conversation";

async function resumeConversation() {
    const client = await createClient("SDK_TOKEN");

    // Retrieves paused conversations
    const getPausedConversations = new GetPausedConversations();
    const pausedConversations = await client.execute(getPausedConversations);

    // Select the paused conversation
    const pausedConversation = pausedConversations.items[0];

    // Resume the conversation
    const resumeConversation = new ResumeConversation(pausedConversation);
    const { task, conversation } = await client.execute(resumeConversation);
    return { task, conversation };
}
```

### Supervisor methods

#### setWorkerActivity

Supervisor changing a worker status.

```javascript
import { createClient, SetWorkerActivity } from "@twilio/flex-sdk";

async function setWorkerActivity() {
    const client = await createClient("SDK_TOKEN");
    const workspace = await client.getWorkspace();
    const worker = await client.getWorker();

    // Get workers from the workspace
    const workerInfos = Array.from((await workspace.fetchWorkersInfo()).values());
    const targetWorkerInfo = workerInfos.find(workerInfo => workerInfo.name === "John Doe") || workerInfos[0];

    // Activities are accessible via Worker.activities property (Map of activitySID to Activity)
    const activities = Array.from(worker.activities.values());
    const targetActivity = activities.find(activity => activity.name === "Break") || activities[0];

    console.log(`Setting worker "${targetWorkerInfo.name}" activity to "${targetActivity.name}" (${targetActivity.sid})`);

    const setWorkerActivityAction = new SetWorkerActivity(targetWorkerInfo.sid, targetActivity.sid);
    await client.execute(setWorkerActivityAction);
}
```

#### setWorkerAttribute

Supervisor changing the worker attributes/skills.

```javascript
import { createClient } from "@twilio/flex-sdk";
import { SetWorkerAttributes } from "@twilio/flex-sdk/actions/Supervisor";

async function setWorkerAttributes() {
    const client = await createClient("SDK_TOKEN");
    const setWorkerAttributesAction = new SetWorkerAttributes(
        "WKXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX",
        { key: "value" }
    );
    await client.execute(setWorkerAttributesAction);
}
```

### Authorization methods

#### getLoginDetails

Generate PKCE codes and login URL for the client to sign in with their IdP.

```javascript
import { getLoginDetails } from "@twilio/flex-sdk";

const {
  loginUrl,
  codeChallenge,
  nonce,
  state,
  codeVerifier
} = await getLoginDetails({
     clientId: "XVOxxxxxxxxxxxxx",
     ssoProfileSid: "JQxxxxxxxxxxx",
     redirectUrl: "https://example.com/callback"
});

console.log("Login URL: ", loginUrl);
console.log("Code Challenge: ", codeChallenge);
console.log("Nonce: ", nonce);
console.log("State: ", state);
console.log("Code Verifier: ", codeVerifier);
```

#### refreshToken

Refresh token used by the SDK.

```javascript
import { refreshToken } from "@twilio/flex-sdk";

const tokenData = await refreshToken({ refreshToken: "TOKEN", ssoProfileSid: "SSO_PROFILE_SID" });
```

#### validateToken

Validate a given token.

```javascript
import { validateToken } from "@twilio/flex-sdk";

const tokenData = await validateToken("ACXXX", "TOKEN");
```

#### getAuthenticationConfig

API to retrieve the Flex OAuth configuration.

```javascript
import { getAuthenticationConfig } from "@twilio/flex-sdk";

const authConfig = await getAuthenticationConfig({
  runtimeDomain: "test-runtime-domain",
  appType: "web"
});
```

#### exchangeToken

Exchange Auth0 for Flex JWE token.

```javascript
import { exchangeToken } from "@twilio/flex-sdk";

const tokenData = await exchangeToken({
 ssoProfileSid: "SSO_PROFILE_SID",
 code: "AUTH_CODE",
 codeVerifier: "CODE_VERIFIER",
 nonce: "NONCE"
});
```

### SDK Client methods

#### updateToken

Update the token for the current session and send it to all connected services. After the token is successfully updated, the `tokenUpdated` event is emitted with both the new token and refresh token.

Use this method when you need to manually refresh the token, such as when your application receives a new token from your backend token server.

```javascript
@param token - The new authentication token
@param refreshToken - The new refresh token (optional)

@example 
Listen to token update events:

import { createClient, ClientEvent } from "@twilio/flex-sdk";

const client = await createClient("SDK_TOKEN");

//Listen for token updates
client.on(ClientEvent.TokenUpdated, (token, refreshToken) => {
   console.log(“Token updated successfully”);
// Optionally store the new token
});

// Update the token
client.updateToken(“NEW_TOKEN”, “NEW_REFRESH_TOKEN”);

updateToken(token: string, refreshToken?: string): void;

```

#### destroy

Destroy the client, removing all event listeners.

```javascript
import { createClient } from "@twilio/flex-sdk";

const client = await createClient("SDK_TOKEN");

await client.destroy();
```

#### getWorker

Return the Worker object representing the current user.

```javascript
import { createClient } from "@twilio/flex-sdk";

const client = await createClient("SDK_TOKEN");
const worker = await client.getWorker();
```

#### getWorkspace

Return the Workspace object.

```javascript
import { createClient } from "@twilio/flex-sdk";

const client = await createClient("SDK_TOKEN");
const workspace = await client.getWorkspace();
```

### Static methods

#### createClient

Create a new Flex SDK Client instance.

```javascript
import { createClient } from "@twilio/flex-sdk";

const client = await createClient("SDK_TOKEN", {
  logger: {
    level: "debug"
  }
});
```

#### getPublicConfig

Retrieve public configuration from the Flex Configuration Service.

```javascript
import { getPublicConfig } from "@twilio/flex-sdk";

const publicConfig = await getPublicConfig({ accountSid: "AC123456789009876543210" });
```

#### getFeaturesConfig

Retrieve the features config for the provided session token.

```javascript
import { getFeaturesConfig } from "@twilio/flex-sdk";

const featuresConfig = await getFeaturesConfig("token123456789009876543210");
```

#### getAccountConfig

Get account configuration data.

```javascript
import { getAccountConfig } from "@twilio/flex-sdk";

const accountConfig = await getAccountConfig("token123456789009876543210");
```

#### setLogLevel

Set the log level for the SDK.

```javascript
import { setLogLevel } from "@twilio/flex-sdk";

setLogLevel("debug");
```

#### FlexSdkError

Error thrown by the Flex SDK.

#### ErrorCode

Error code used by the Flex SDK.

#### ErrorSeverity

Error severity level.

#### Version

Current version of the SDK in use.
