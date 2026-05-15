# Flex UI Components

> \[!NOTE]
>
> [Auto-Generated Documentation for the Flex UI](https://assets.flex.twilio.com/docs/releases/flex-ui/latest) is now available as a beta distribution. The auto-generated documentation is accurate and comprehensive, and so may differ from what you see in the official Flex UI documentation.

Flex UI is a library of programmable or dynamic components that expose a `Content` property and allows you to add, replace and remove any component and its children.

## Content property and add / replace / remove methods

Below you can find a list of UI components and their details, that can be overridden programmatically. This can be done by using `add`, `replace` and `remove` methods with options.

> \[!WARNING]
>
> All components must have a key declared.

### **Syntax for add/replace methods**

```javascript
Flex.Component.Content.add(<MyComponent key="demo-component"/>, {options});
Flex.Component.Content.replace(<MyComponent key="demo-component"/>, {options});
```

**Example**

Below is an example of adding a component called AnotherMuteButton to the MainHeader component, aligned to the end (here left) and placed as the first component in front of native components MuteButton and UserControls:

```javascript
Flex.MainHeader.Content.add(<AnotherMuteButton key="mute"/>, {
  sortOrder: -1,
  align: "end"
});
```

### **Syntax for remove method**

Remove method allows you to remove **immediate children** of a programmable component by their key.

```javascript
Flex.Component.Content.remove(key, {options});
```

**Example**

Below is an example of removing the AnotherMuteButton component from the MainHeader component. This component is removed by the key we set above, "mute".

```javascript
Flex.MainHeader.Content.remove("mute");
```

### **Options for add/replace/remove methods**

#### if (*Expression*)

Used in both `add` and `replace` methods to add conditions on which component is added or replaced.

**Example**

```javascript
Flex.MainHeader.Content.add(<AnotherMuteButton key="mute"/>, {
  if : props => props.task.source.taskChannelUniqueName === "custom1"
});
```

#### sortOrder (*number*)

Used in `add` method to specify the order in which the new component is placed in relation to other children of the parent component. Native children components take priority. Sort order counter starts with 0. To always place a new component at the very start or end of the order, use large numbers like -100 or 100, depending on the direction.

**Example**

```javascript
Flex.MainHeader.Content.add(<AnotherMuteButton key="mute"/>, {
  sortOrder: -1
});
```

#### align ('*start*' | '*end*')

Used in the `add` method to align new components either to the top/bottom or right/left, depending on the direction of the parent component. Possible values are:

* *start* - Aligns new component on the left or top
* *end* - aligns new component on the right or bottom

**Example**

```javascript
Flex.MainHeader.Content.add(<AnotherMuteButton key="mute"/>, {
  align: "end"
});
```

## Programmable components

Each immediate child of a component has a key (required for the `add` and `replace` methods) and a set of properties that will be inherited by its children. To find a component's `key` or explore component props, go to [Flex UI API Reference](https://assets.flex.twilio.com/docs/releases/flex-ui/latest).

### Agents Desktop View components overview

![Twilio Flex interface showing chat with Damien Smith and account details.](https://docs-resources.prod.twilio.com/bdaa6afd7eb5707c498e8a86fafd0cb8a31df5a5b3f0a97a470830077690eeeb.png)

### Teams View components overview

![Supervisor UI showing agent list, live calls, and profile details with skills and tasks.](https://docs-resources.prod.twilio.com/961eabe87847c58a1ce15c4dc276af579094bc40df438823bb98591df35bb72b.png)

## RootContainer

[View Full Component Reference >](https://assets.flex.twilio.com/docs/releases/flex-ui/latest/programmable-components/components/RootContainer/)

*Direction: Horizontal*

### MainHeader

[View Full Component Reference >](https://assets.flex.twilio.com/docs/releases/flex-ui/latest/programmable-components/components/MainHeader/)

*Direction: Horizontal*

![Header with menu icon, microphone, and user status showing Jane Martin online.](https://docs-resources.prod.twilio.com/e7b156d0c8ff18928ee29dcbae7bafac45aed9efe5dba0f93b3d7b090fa52a4e.png)

### MainContainer

[View Full Component Reference >](https://assets.flex.twilio.com/docs/releases/flex-ui/latest/programmable-components/components/MainContainer/)

*Direction: Horizontal*

![Chat interface showing conversation between Damien Smith and Robert Ryan about an order.](https://docs-resources.prod.twilio.com/6868e7563e138d103bd57a45713982810551daf358905f342b4f52466188e271.png)

### LiveCommsBar

[View Full Component Reference >](https://assets.flex.twilio.com/docs/releases/flex-ui/latest/programmable-components/components/LiveCommsBar/)

*Direction: Horizontal*

![LiveCommsBar showing call status with options to return or stop listening.](https://docs-resources.prod.twilio.com/d91ddd4e38a678da3430b805b653b6d29301661c147ce4c9687fbb43070ab0e1.png)

### NotificationsBar

*Direction: Horizontal*

Customizing the NotificationsBar is described in [Notifications Framework](/docs/flex/developer/ui/v1/notifications)

![Network issue notification with orange icon and close button.](https://docs-resources.prod.twilio.com/9af2de64d2990efffaa92b9b484cac15e52dd0b1f7ea103052fc0fa4ef34ff7f.png)

### SideNav

[View Full Component Reference >](https://assets.flex.twilio.com/docs/releases/flex-ui/latest/programmable-components/components/SideNav/)

*Direction: Vertical*

![Expanded sidenav with options: Dashboard, Task View, Admin, Supervisor, Directory, and Settings.](https://docs-resources.prod.twilio.com/de438dc7b7b3fa6eef075744308e135b52497861a9822431ab1a9000f7d95203.png)

## Agent Desktop View Components

### AgentDesktopView

[View Full Component Reference >](https://assets.flex.twilio.com/docs/releases/flex-ui/latest/programmable-components/components/AgentDesktopView/)

*Direction: Horizontal*

![Agent desktop view with account details, activity map of San Francisco, and status notifications.](https://docs-resources.prod.twilio.com/aa4638e8b0caefb55ff0a5359d1753a7788658da20667ef7937f967666b7fe31.png)

### AgentDesktopView.Panel1

[View Full Component Reference >](https://assets.flex.twilio.com/docs/releases/flex-ui/latest/programmable-components/components/Panel1/)

*Direction: Vertical*

![AgentDesktopViewPanel1-v2.](https://docs-resources.prod.twilio.com/e1bcd23d193e17acc4fe8979a54483110fbb29b788a646c4b1858c3c92a6c827.png)

### AgentDesktopView.Panel2

[View Full Component Reference >](https://assets.flex.twilio.com/docs/releases/flex-ui/latest/programmable-components/components/Panel2/)

*Direction: Vertical*

![Flex.AgentDesktopView.Panel2.](https://docs-resources.prod.twilio.com/9337266c22cbfc6c240e61ba7303b1cc5f4d98d8d3be34731e6a95063da03b66.png)

### CRMContainer

[View Full Component Reference >](https://assets.flex.twilio.com/docs/releases/flex-ui/latest/programmable-components/components/CRMContainer/)

*Direction: Vertical*

![Message stating no CRM configured with a button labeled 'How to Configure'.](https://docs-resources.prod.twilio.com/36cf9d9943434ad07c5da51c26a196b601ad7aa983010adfa3acb0d0dbb62e81.png)

### NoTasksCanvas

[View Full Component Reference >](https://assets.flex.twilio.com/docs/releases/flex-ui/latest/programmable-components/components/NoTasksCanvas/)

*Direction: Vertical*

![Status screen showing no active tasks with user James Smith set to unavailable.](https://docs-resources.prod.twilio.com/0a8bf6ad73d24c055df36772fa8481b23e3a03fec26e26627990ebdf17c1cfae.png)

### TaskListContainer

[View Full Component Reference >](https://assets.flex.twilio.com/docs/releases/flex-ui/latest/programmable-components/components/TaskListContainer/)

*Direction: Vertical*

![Task list showing names, task status, and icons for chat, phone, and Facebook.](https://docs-resources.prod.twilio.com/66af3f3795c4a930cd141fa942bfa862da609e0ac12bccd59ab40cc312c6ca8b.png)

### TaskList

[View Full Component Reference >](https://assets.flex.twilio.com/docs/releases/flex-ui/latest/programmable-components/components/TaskList/)

*Direction: Vertical*

For details on how to configure filters for the task list, see the UI configuration page.

![Task list showing communication channels and task statuses for contacts.](https://docs-resources.prod.twilio.com/b813840df62477ba30bd1210bbf1cdf2eff618f8b0632bf4b05dcc62ab7e4c62.png)

### TaskListItem

[View Full Component Reference >](https://assets.flex.twilio.com/docs/releases/flex-ui/latest/programmable-components/components/TaskListItem/)

*Direction: Vertical*

*Add / Replace / Remove and properties of the TaskListItem are described in the Task Channel Definition API.*

![Task item showing a phone icon, name, time elapsed, and task status.](https://docs-resources.prod.twilio.com/d1c933f6eb13914d5cca237e8a5d29fee1f147d6c89aca41a10f5916118a99f4.png)

### TaskListItemButtons

*Direction: Horizontal*

Add / Replace / Remove and properties of the TaskListItem are described in the Task Channel Definition API.

![Green checkmark and red cross buttons for task management.](https://docs-resources.prod.twilio.com/419c6e093484f0d57df36f6e11f5cbb80dd98c36c7376bd24868be78d2f952f3.png)

**Examples**

*Adding a button to Chat type task*

```javascript
Flex.DefaultTaskChannels.Chat.addedComponents = [{
  target: "TaskListButtons",
  component: <Flex.IconButton key="eye_button" icon="Eye" />
}];
```

*Adding a button to Chat type task when it is in* `accepted` *state*

```javascript
Flex.DefaultTaskChannels.Chat.addedComponents = [{
  target: "TaskListButtons",
  component: <Flex.IconButton key="eye_button" icon="Eye" />,
  options: { if: props.task.status === "accepted" }
}];

```

*Removing a* `reject` *button from Chat type task*

```javascript
Flex.DefaultTaskChannels.Chat.removedComponents = [{
  target: "TaskListButtons",
  key: "reject"
}];
```

### TaskCanvas

[View Full Component Reference >](https://assets.flex.twilio.com/docs/releases/flex-ui/latest/programmable-components/components/Supervisor․TaskInfoPanel/)

*Direction: Vertical*

![Taskcanvas-v2.width-500.](https://docs-resources.prod.twilio.com/ee3c226a94cc9efefaedf572376ece4b7dbcc46af6668270d07c24c51e3bba4f.png)

### TaskCanvasHeader

[View Full Component Reference >](https://assets.flex.twilio.com/docs/releases/flex-ui/latest/programmable-components/components/TaskCanvasHeader/)

*Direction: Horizontal*

![Task header showing Damien Smith live with a timer at 34 seconds.](https://docs-resources.prod.twilio.com/54dab27a0b84f806520a876857905df3445c8d7f1c18185123d99bf467c3388c.png)

### TaskCanvasTabs

[View Full Component Reference >](https://assets.flex.twilio.com/docs/releases/flex-ui/latest/programmable-components/components/TaskCanvasTabs/)

*Direction: Horizontal*

![Navigation icons for info, chat, call, and video with chat selected.](https://docs-resources.prod.twilio.com/4201af206b9979929cd4e83470570507af7386dce0a60881cce4c1eef5b1331f.png)

**Example**

*Add tabs and content*

```xml
import { Tab } from "@twilio/flex-ui"

init(flex, manager) {
  const Img = <img src="http://someimage.jpg" />;

  flex.TaskCanvasTabs.Content.add(
    <Tab icon={Img} iconActive={Img} key="my-new-tab">
      <MyNewTabComponent/>
    </Tab>
  );
}
```

### TaskInfoPanel

[View Full Component Reference >](https://assets.flex.twilio.com/docs/releases/flex-ui/latest/programmable-components/components/TaskInfoPanel/)

*Direction: Vertical*

![Customer info panel showing contact details and previous interactions for Jean Spencer.](https://docs-resources.prod.twilio.com/dc51fcf797c419f7f5f5de573796b5d5a5006d80686299860145aa446ea5480d.png)

### IncomingTaskCanvas

[View Full Component Reference >](https://assets.flex.twilio.com/docs/releases/flex-ui/latest/programmable-components/components/IncomingTaskCanvas/)

*Direction: Vertical*

![Chat request from Customer 29182 with accept and decline options.](https://docs-resources.prod.twilio.com/37e55dfb99606371d41a98644c1eee801590d733c2dc99c5d559acad4c6211ef.png)

### IncomingTaskCanvasActions

[View Full Component Reference >](https://assets.flex.twilio.com/docs/releases/flex-ui/latest/programmable-components/components/IncomingTaskCanvasActions/)

*Direction: Horizontal*

![Incoming call from queue 'Everyone' with accept and reject options.](https://docs-resources.prod.twilio.com/2d3c52e9a7c84e47b9bd5b6c163b51d6155da16e66076a2d22ce43fbe627fff8.png)

### CallCanvas

[View Full Component Reference >](https://assets.flex.twilio.com/docs/releases/flex-ui/latest/programmable-components/components/CallCanvas/)

*Direction: Vertical*

![Call interface showing a live call with one participant on hold and another listening.](https://docs-resources.prod.twilio.com/5095b5ba3197593c862eddab7bd15213863d3ca629987765a328fc6b4035815a.png)

### CallCanvasActions

[View Full Component Reference >](https://assets.flex.twilio.com/docs/releases/flex-ui/latest/programmable-components/components/CallCanvasActions/)

*Direction: Horizontal*

![CallCanvasActions.](https://docs-resources.prod.twilio.com/e84c7ce83df23a089dc80a93b60dbfa4b7314b0e9af30c1778e4140c733a263c.png)

### MessagingCanvas

[View Full Component Reference >](https://assets.flex.twilio.com/docs/releases/flex-ui/latest/programmable-components/components/MessagingCanvas/)

*Direction: Vertical*

![MessagingCanvas-v2.width-500.](https://docs-resources.prod.twilio.com/6dfb87872bf97332d076b6618ecb7b3653eb796aad9ba370d082cd93ee08b9fb.png)

### MessageList

[View Full Component Reference >](https://assets.flex.twilio.com/docs/releases/flex-ui/latest/programmable-components/components/MessageList/)

*Direction: Horizontal*

![Chat messages between Damien Smith and Robert Ryan with timestamps.](https://docs-resources.prod.twilio.com/f29485864f741f501e967404103463dba23ce76278acb17639ecadd65037b0df.png)

### MessageList.WelcomeMessage

[View Full Component Reference >](https://assets.flex.twilio.com/docs/releases/flex-ui/latest/programmable-components/components/WelcomeMessage/)

*Direction: Vertical*

![Chat started with Damien Smith.](https://docs-resources.prod.twilio.com/995f9c15a8b8ce8b2f5aed17d2a888d2a3cd72c4d4cdf20601bea62650ade501.png)

### MessageListItem

[View Full Component Reference >](https://assets.flex.twilio.com/docs/releases/flex-ui/latest/programmable-components/components/MessageListItem/)

*Direction: Vertical*

![Chat message from Damien Smith at 18:42 saying 'Incididunt ut labore et dolore magna aliqua.'.](https://docs-resources.prod.twilio.com/cf3cf18f1047a470146ebda0318fe1597d569a01363893102773e59f1eaf5c1e.png)

### MessageBubble

[View Full Component Reference >](https://assets.flex.twilio.com/docs/releases/flex-ui/latest/programmable-components/components/MessageBubble/)

*Direction: Vertical*

![Message bubble from Damien Smith at 18:42 saying 'Incididunt ut labore et dolore magna aliqua.'.](https://docs-resources.prod.twilio.com/6b0bbdd8edad08baeb1d10b933371773e85c96a9098cdc4649aafdaf7d35e544.png)

### MessageInput

[View Full Component Reference >](https://assets.flex.twilio.com/docs/releases/flex-ui/latest/programmable-components/components/MessageInput/)

*Direction: Vertical*

![Text input field with send button in Twilio Flex interface.](https://docs-resources.prod.twilio.com/a94df921f12546bd4a2e3577e7f07c13dd024b501f9d75422c2755552a7205ff.png)

### WorkerDirectory

[View Full Component Reference >](https://assets.flex.twilio.com/docs/releases/flex-ui/latest/programmable-components/components/WorkerDirectory/)

*Direction: Horizontal*

![Transfer interface with tabs for Agents and Queues, showing agent statuses and queue names.](https://docs-resources.prod.twilio.com/3fa9ff089e953067f3d1b91eaf9be655d9712096874218f6db46a1ea40cef784.png)

### WorkerDirectoryTabs

[View Full Component Reference >](https://assets.flex.twilio.com/docs/releases/flex-ui/latest/programmable-components/components/WorkerDirectoryTabs/)

*Direction: Vertical*

![WorkerDirectoryTabs.](https://docs-resources.prod.twilio.com/2711d424dd44ea1b79519fd5c5b95c7ab95c2e1897e61d67c3abb75669d48def.png)

The Worker directory contains 2 tabs by default:

* **Agents** - key `workers`
* **Queues**- key `queues`

*Example: Add new custom tab*

```javascript
Flex.WorkerDirectory.Tabs.Content.add(
  <Flex.Tab key="my-tab" label="My Tab">
        <div> "Hello World"
        </div>
  </Flex.Tab>
);
```

**Worker Directory Tabs Hidden Filters**

`WorkerDirectoryTabs` accepts 2 default props:

* `hiddenWorkerFilter`
* `hiddenQueueFilter`

These filters are applied to the list in combination with the filter applied by the user typing in the search string. You can programmatically apply a filter that is hidden from the user, i.e. the user cannot disable it. You could use this feature to pre-filter the list of available transferees an agent can search and choose from, to their team members or available agents only. In the following example, we use [live query](/docs/sync/live-query) to:

* filter the agents list to only show agents with a specific `team_name` attribute ([you can set user attributes via your SSO provider](/docs/flex/admin-guide/setup/sso-configuration))
* filter the agents list to only show agents that are in the `Available` activity
* filter the queues list to only show queues with a specific `queue_name` attribute

```javascript
// Filter Agents by Worker Attributes or activity_name
Flex.WorkerDirectoryTabs.defaultProps.hiddenWorkerFilter = 'data.attributes.team_name CONTAINS "sales"'
Flex.WorkerDirectoryTabs.defaultProps.hiddenWorkerFilter = 'data.activity_name CONTAINS "Available"'

// Filter Queues by queue_name or queue_sid
Flex.WorkerDirectoryTabs.defaultProps.hiddenQueueFilter = 'data.queue_name CONTAINS "sales"'
```

The hidden filter feature is only available in [@twilio/flex-ui@1.26.0](/docs/flex/release-notes/ui-release-notes) and later.

### ParticipantsCanvas

[View Full Component Reference >](https://assets.flex.twilio.com/docs/releases/flex-ui/latest/programmable-components/components/ParticipantsCanvas/)

*Direction: Horizontal*

ParticipantsCanvas is a responsive component and will switch between regular mode and list mode depending on the size of the container its placed in. Regular mode and list mode contain different children - ParticipantCanvas and ParticipantCanvasListItem respectively. When customizing ParticipantsCanvas children, like adding an additional button, remember to do customization to both children components

**Regular mode**

![ParticipantsCanvas.](https://docs-resources.prod.twilio.com/e1cea71a3f5bf8e4a6bfe91ba8b94003c816358ee0c0ccdefbf247de5ad674ee.png)

**List mode**

![Participant list showing call status and options to mute or remove.](https://docs-resources.prod.twilio.com/ba299937d87b656969dd5fd5e81a2a43fd6a0652bb124c9c0eb0a08e787d52ad.png)

### ParticipantCanvas

[View Full Component Reference >](https://assets.flex.twilio.com/docs/releases/flex-ui/latest/programmable-components/components/ParticipantCanvas/)

*Direction: Horizontal*

![Profile of Felix Marshall with listening status and call controls.](https://docs-resources.prod.twilio.com/00dc580e8ad653329e1965d9c8d8429efea47a493f4c90b6304106ad939ada66.png)

### ParticipantCanvasListItem

*Direction: Vertical*

![Participant Felix Marshall is listening with mute and remove options.](https://docs-resources.prod.twilio.com/ed07b2d2559024d980c69532fb9938f683c25a9b91b14237fc43c528be0583f7.png)

## Teams View Components

### WorkersDataTable

`WorkersDataTable` is a programmable component. It is a Material UI table styled to the Flex theme with data from the Insights SDK.

[View Full Component Reference >](https://assets.flex.twilio.com/docs/releases/flex-ui/latest/WorkersDataTable.html)

> \[!WARNING]
>
> As of flex-ui **v1.12.0** new exports were added to refer to workers instead of agents:
>
> * WorkersDataTable
> * WorkerListFilterSelect
> * WorkersDataTable
> * WorkersDataTableProps
> * WorkerListFilter
>
> For example, `AgentsDataTable` is now referred to as `WorkersDataTable`. However, previous exports (like `AgentsDataTable`) are kept for backwards compatibility

By default, WorkersDataTable contains the following rows:

* *Agent* - [UserCard component](https://assets.flex.twilio.com/docs/releases/flex-ui/latest/programmable-components/components/Supervisor%E2%80%A4TaskCard/)

  * `SupervisorUserCardFirstLine` - default value retrieves the full name of the worker if it exists, and the identity if not. Variables provided to the template: worker
  * `SupervisorUserCardSecondLine` - default value shows the availability of the worker. Variables provided to the template: worker
  * The first and second row are template strings with names.
* *Calls* -[TaskCardList component](https://assets.flex.twilio.com/docs/releases/flex-ui/latest/programmable-components/components/Supervisor%E2%80%A4TaskCardList/), showing tasks of the voice channel in assigned and wrapping state
* *Other tasks* - [TaskCardList component](https://assets.flex.twilio.com/docs/releases/flex-ui/latest/programmable-components/components/Supervisor%E2%80%A4TaskCardList/), showing tasks of all channels (apart from voice) in assigned and wrapping state

#### Add columns to WorkersDataTable

Columns can be added to the table programmatically. Columns cannot be removed yet (the ability to do that is coming soon). You can add columns with different types of content:

* `TaskCardList` component
* Any custom component
* String

*TaskCardList*

```javascript
import { TaskCardList, ColumnDefinition } from "@twilio/flex-ui";

Flex.WorkersDataTable.Content.add(
       <ColumnDefinition key="calls" header={"My Custom Header"} content={(items, context) => <TaskCardList tasks={items.tasks} />} />);
```

`TaskCardList` also has a filter prop which can be used here, and which is optional. If the filter prop is not set, all tasks in the list will be rendered:

```javascript
export interface TaskCardListProps {
   compareFunction?: (a: TaskData, b: TaskData) => number;
   filter?: (task: TaskData) => boolean;
   tasks: TaskData[];
}
```

*Any custom component*

```javascript
import { ColumnDefinition } from "@twilio/flex-ui";

Flex.WorkersDataTable.Content.add(<ColumnDefinition key="hello" header={"Helloxxx"} content={<div>hello</div>}/>);
```

*String*

You can use Worker attributes as follows:

```javascript
import { ColumnDefinition } from "@twilio/flex-ui";

Flex.WorkersDataTable.Content.add(<ColumnDefinition key="team" header={"Team"} content={item => item.worker.attributes.team_name}/>);
```

#### Customizing filters

By default, WorkersDataTable has 2 filters:

* **All agents**
* **Active agents** - worker with current activity state set of type `available`

Filters for the Workers Table can be programmatically changed, by defining `filters` property of `WorkersDataTable` component

**Example of creating a filter to show workers with activity "Break"**

*With configuration object*

```javascript
   componentProps: {
        WorkersDataTable: {
            filters: [
                {
                    query: 'data.activity_name == "Break"',
                    text: "Workers on break"
                }
            ]
        }
    },...
```

*With defaultProps API*

```javascript
Flex.WorkersDataTable.defaultProps.filters = [
                {
                    query: 'data.activity_name == "Break"',
                    text: "Workers on break"
                },...
            ]
```

#### Query syntax

**Query data schema**

`data` object in the query refers to TaskRouter `worker` resource. The following attributes on a worker can be used for filters query:

| **object name**              | **description**                                        | **format**       |
| ---------------------------- | ------------------------------------------------------ | ---------------- |
| data.activity\_name          | worker's current activity friendly name                | String           |
| data.attributes              | worker's attributes                                    | Key value pair   |
| data.date\_activity\_changed | date of the last activity change of the current worker | Datetime ISO8601 |
| data.friendly\_name          | worker's friendly name                                 | String           |
| data.worker\_activity\_sid   | worker's current activity sid                          | String           |
| data.worker\_sid             | worker's sid                                           | String           |
| data.workspace\_sid          | worker's workspace sid                                 | String           |

**Query operators**

`WorkersDataTable` is powered by [Twilio Sync](/docs/sync) and we use Twilio Sync Live Query for filtering of the workers. See [Live Query docs](/docs/sync/live-query) for supported query operators.

### TaskCardList

[View Full Component Reference >](https://assets.flex.twilio.com/docs/releases/flex-ui/latest/programmable-components/components/Supervisor.TaskCardList/)

*Direction: Vertical*

![Task cards showing a phone call from 07823 732 682 and a message from Alan Cooper.](https://docs-resources.prod.twilio.com/e6bc339e02f8b326597f0750ec4c6d4417e4942276ec46cb8ebc4b752424bb74.png)

### TaskCard

[View Full Component Reference >](https://assets.flex.twilio.com/docs/releases/flex-ui/latest/programmable-components/components/Supervisor․TaskCard/)

*Direction: Horizontal*

![Phone icon with number 07823 732 682 and duration 2 minutes.](https://docs-resources.prod.twilio.com/ae563fc5b092b7a7fd0dd7d4a47c6d23423bf867ca921cc2d899282f8f13f2aa.png)

### UserCard

*Direction: Horizontal*

![Profile of agent James Green, online for 6 hours.](https://docs-resources.prod.twilio.com/da47c67e007c884e68a9f89c77b16b403314b8d41d787dde40999f44d6b986a1.png)

### Supervisor.TaskCanvas

[View Full Component Reference >](https://assets.flex.twilio.com/docs/releases/flex-ui/latest/programmable-components/components/SupervisorTaskCanvas/)

*Direction: Vertical*

![Supervisor.TaskCanvas.](https://docs-resources.prod.twilio.com/01cd11b9c3a1ccff34d07819d18088943d431763c2125ff25f4cd39245830163.png)

### Supervisor.TaskCanvasHeader

[View Full Component Reference >](https://assets.flex.twilio.com/docs/releases/flex-ui/latest/programmable-components/components/Supervisor․TaskCanvasHeader/)

*Direction: Vertical*

![Supervisor.TaskCanvasHeader.](https://docs-resources.prod.twilio.com/7785519fe36894ff5ca5631daf2a078308b30c138b102e44c02a3c94913c24de.png)

### Supervisor.TaskCanvasTabs

[View Full Component Reference >](https://assets.flex.twilio.com/docs/releases/flex-ui/latest/programmable-components/components/Supervisor․TaskCanvasTabs/)

*Direction: Horizontal*

![Tabs labeled Call and Info with Info tab highlighted.](https://docs-resources.prod.twilio.com/babedb1225faa47b2594a92c41143fa265a61272856d774508380179b4135bf5.png)

Worker directory contains 2 tabs by default:

* **Overview** - key `overview`. Overview Tab has dynamic content based on the type of task

  * For standard conference based voice tasks - [ParticipantsCanvas](https://assets.flex.twilio.com/docs/releases/flex-ui/latest/programmable-components/components/ParticipantsCanvas/)
  * For messaging tasks - [MessagingCanvas](https://assets.flex.twilio.com/docs/releases/flex-ui/latest/programmable-components/components/MessagingCanvas/)
* **Info** - key `info`. Info tab Contains [SupervisorTaskInfoPanel](https://assets.flex.twilio.com/docs/releases/flex-ui/latest/programmable-components/components/Supervisor%E2%80%A4TaskInfoPanel/)

**Examples**

*Adding tabs and content*

```javascript
Flex.Supervisor.TaskCanvasTabs.Content.add(
  <Flex.Tab key="my-tab" label="My Tab">
        <div> "Hello World"
        </div>
  </Flex.Tab>
);
```

### SupervisorTaskInfoPanel

[View Full Component Reference >](https://assets.flex.twilio.com/docs/releases/flex-ui/latest/programmable-components/components/Supervisor․TaskInfoPanel/)

*Direction: Horizontal*

![Customer info panel showing contact details and previous interactions for Jean Spencer.](https://docs-resources.prod.twilio.com/dc51fcf797c419f7f5f5de573796b5d5a5006d80686299860145aa446ea5480d.png)

### WorkerCanvas

[View Full Component Reference >](https://assets.flex.twilio.com/docs/releases/flex-ui/latest/programmable-components/components/WorkerCanvas/)

*Direction: Vertical*

![Profile panel with agent details, skills, and adjustable skill levels.](https://docs-resources.prod.twilio.com/114cdda7f30bf77eb7a9189ea9eae61bb1f97c18ca76dde3c25c42a7754f5644.png)

### WorkerCanvasHeader

[View Full Component Reference >](https://assets.flex.twilio.com/docs/releases/flex-ui/latest/programmable-components/components/WorkerCanvas/#component-children)

*Direction: Vertical*

![Close button next to profile label on header.](https://docs-resources.prod.twilio.com/1a967ba0fdafacad4b36f780ada8a0dd2d3fb985d2b2dc4abe4c7d5cf9d7ea13.png)

### WorkerProfile

[View Full Component Reference >](https://assets.flex.twilio.com/docs/releases/flex-ui/latest/programmable-components/components/WorkerProfile/)

*Direction: Vertical*

![Agent details with email, team EU Sales, and manager Harry Harisson.](https://docs-resources.prod.twilio.com/8d4bbf1634a0dbd18edb3004bd834f820832626b24a21e184ee9014528580192.png)

### WorkerSkills

[View Full Component Reference >](https://assets.flex.twilio.com/docs/releases/flex-ui/latest/programmable-components/components/WorkerSkills/)

*Direction: Vertical*

![Skills settings with toggles for Sales and Tech Support, and save and reset buttons.](https://docs-resources.prod.twilio.com/9d2698a6fbfb5f9620ca3b3442150d2337ba44173e66fbec35128da2edba0f35.png)
