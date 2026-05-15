# Work with Components and Props

The Flex UI library contains a myriad of programmable components that allow you to customize Flex to your use case. Each programmable component exposes a static `Content` property that allows you to add to, remove or replace the component and its children.

Each immediate child of a component has a key property used by the add and replace methods as well as a set of properties that will be inherited by their own children. **Any new components added using the add or replace methods must have a key property.**

The full list of programmable components, with details of their properties can be found in the [Flex UI API Docs](https://assets.flex.twilio.com/docs/releases/flex-ui/latest/).

> \[!WARNING]
>
> Directly reusing components from the Flex UI library is discouraged. Importing and using an existing component (e.g. `MessagingCanvas`) and adding your own values for their props is not supported and may result in undesired behavior.

## **Adding Components**

**Syntax**

```javascript
Flex.Component.Content.add(<MyComponent key="demo-component"/>, {options});
```

**Example**

```javascript
Flex.MainHeader.Content.add(<AnotherMuteButton key="mute"/>, { sortOrder: -1, align: "end" });
```

`MainHeader` is the base Flex UI component that we are customizing and we are using the `add()` method to insert our custom mute button component into `MainHeader` as a child. Note, the custom mute button component contains a key prop.

Child components have access to a subset of their parent component props and the child props associated with a particular programmable component are documented in the [Flex UI API Docs](https://assets.flex.twilio.com/docs/releases/flex-ui/latest/).

## **Removing Components**

The `remove` method allows you to remove the immediate children of any programmable component using its key.

**Syntax**

```javascript
Flex.Component.Content.remove(key, {options});
```

**Example**

```javascript
Flex.MainHeader.Content.remove("mute");
```

## **Replacing Components**

The `replace` component allows you to completely replace a programmable component with your own custom component.

**Syntax**

```javascript
Flex.Component.Content.replace(<MyComponent key="demo-component"/>, {options});
```

**Example 1**

This snippet replaces the `MainHeader` component with a `MyOwnHeader` custom component.

```javascript
Flex.MainHeader.Content.replace(<MyOwnHeader key="custom-header"/>, {});
```

**Example 2**

We can customize the `TaskListItem` component to have a different background color depending on the task's channel type. The [Flex UI API Docs](https://assets.flex.twilio.com/docs/releases/flex-ui/latest/) tell us that the `TaskListItem` component has access to Task which we can then use to customize the component.

```javascript
   interface channelTypeColorMapType {
     [key: string]: string
   }
 
   const channelTypeColorMap: channelTypeColorMapType = {
     "web": "blue",
     "sms": "red",
     "voice": "pink",
     "whatsapp": "orange"
   }
 
   const StyledTaskListItem = styled.div(
     ({ channelType }: { channelType: string }) => ({
       backgroundColor: channelTypeColorMap[channelType],
       fontWeight: "bold",
       textTransform: "uppercase",
       height: "50px",
       border: "5px solid grey",
       textAlign: "center"
     })
   );
 
   const TaskListItem = (props: any) => {
     return <StyledTaskListItem channelType={props.task.channelType}>{`${props.task.channelType} Task`}</StyledTaskListItem>;
   };
 
 
   flex.TaskListItem.Content.replace(<TaskListItem key="a-key" />);
```

### Options for add/replace/remove methods

**if (*Expression*)**

Used in both `add` and `replace` methods to add conditions on which component is added or replaced.

```javascript
Flex.MainHeader.Content.add(<AnotherMuteButton key="mute"/>, {
  if : props => props.isLiveVoiceCall 
});
```

**sortOrder (*number*)**

Used in `add` method to specify the order in which the new component is placed in relation to other children of the parent component. Native children components take priority. Sort order counter starts with 0. To always place a new component at the very start or end of the order, use large numbers like -100 or 100, depending on the direction.

```javascript
Flex.MainHeader.Content.add(<AnotherMuteButton key="mute"/>, {
  sortOrder: -1
});
```

**align ('*start*' | '*end*')**

Used in the `add` method to align new components either to the top/bottom or right/left, depending on the direction of the parent component. Possible values are:

* `start` - aligns new component on the left or top
* `end` - aligns new component on the right or bottom

```javascript
Flex.MainHeader.Content.add(<AnotherMuteButton key="mute"/>, {
  align: "end"
});
```

## **addWrapper() API**

The `addWrapper` method allows you to replace a Flex component with a custom component which is able to render the original component and has access to all its original properties.

```javascript
Flex.MainHeader.Content.addWrapper(
 (OriginalComponent) => (originalProps) => {
   const updatedProps = { ...originalProps, logoUrl: "custom_url" };
   const CustomBanner = () => <div>Customer Banner</div>;
 
   return (
     <>
       <CustomBanner />
       <OriginalComponent {...updatedProps} />
     </>
   );
 }
);
```

This allows you to:

* augment the original component with additional UI elements, or replace it entirely with a component which has access to all the original props
* modify the props that the original component receives before they are applied
* add any wrappers or providers that your use case requires

The following [Components](https://assets.flex.twilio.com/docs/releases/flex-ui/latest/programmable-components/components/AgentDesktopView/) are supported:

1. AgentDesktopView
2. Panel1
3. Panel2
4. CallCanvas
5. CallCanvasActions
6. ConnectingOutboundCallCanvas
7. IncomingTaskCanvas
8. NoTasksCanvas
9. ParticipantCanvas
10. ParticipantsCanvas
11. TaskCanvas
12. TaskCanvasHeader
13. TaskCanvasTabs
14. TaskInfoPanel
15. CRMContainer
16. LiveCommsBar
17. LiveCommsBarItem
18. LiveCommsBarItemActions
19. MainContainer
20. MainHeader
21. RootContainer
22. SideNav
23. Supervisor.TaskCanvas
24. Supervisor.TaskCanvasHeader
25. Supervisor.TaskCanvasTabs
26. Supervisor.TaskInfoPanel
27. Supervisor.TaskCardList
28. Supervisor.TaskCard
29. Supervisor.TeamFiltersPanel
30. WorkerCanvas
31. WorkerSkills
32. TaskListItem
33. TaskListButtons
34. TaskListContainer
35. TeamsView
36. ViewCollection
37. WorkerDirectory
38. WorkerDirectoryTabs

> \[!NOTE]
>
> Contrary to the `add`, `remove` or `replace` methods, `addWrapper` does not have the *if*, *sortOrder,* or *align* options.

### Additional use cases

**Replace the original component with other component**

```javascript
Flex.MainHeader.Content.addWrapper((OriginalComponent) => (props) => {
   return <SomeOtherComponent {...props} />;
});
```

**Change properties passed on to the original component**

```javascript
Flex.MainHeader.Content.addWrapper((OriginalComponent) => (props) => {

 const updatedProps = { ...props, someProp: "newValue" };

 return <OriginalComponent {...updatedProps} />;

});
```

**Wrap the component inside a new component**

```javascript
Flex.MainHeader.Content.addWrapper((OriginalComponent) => (props) => {

    return (

       <SomeFancyDecorator>

            <OriginalComponent {...props} />

       </SomeFancyDecorator>

    );

});
```

**Add a Worker Directory Tabs Queue Filter**

You can programmatically apply a filter that is hidden from the user, i.e. the user cannot disable it. You could use this feature to pre-filter the list of available transferees an agent can search and choose from, to their team members or available agents only.

```javascript
Flex.WorkerDirectoryTabs.defaultProps.queueFilter = (queue) => queue.queueName.includes("HR")
```

## What's next?

* See our [API documentation](https://assets.flex.twilio.com/docs/releases/flex-ui/latest/) for Components details
* Check out our tutorial on [adding a sample component](/docs/flex/developer/ui/add-components-flex-ui) to Flex UI
* Learn how to work with [custom components](/docs/flex/developer/ui/creating-styling-custom-components)
* Add task and theme [context](/docs/flex/developer/ui/add-component-context) to components
