# Modify Flex UI Keyboard Shortcuts

Flex UI 2.1 comes with [default keyboard shortcuts](/docs/flex/end-user-guide/keyboard-shortcuts). You can modify these shortcuts by remapping them to a different key. You can also edit properties of the default shortcuts, delete shortcuts, or add new custom shortcuts. Please be aware that when adding or remapping a shortcut, custom shortcuts will override the defaults if the same key is used. For example, if you use 1 to "return to active call", then it will override the "end currently selected task" shortcut and apply `CTRL + SHIFT + 1` to the action you've set it to. It's also recommended to ensure that custom shortcuts do not conflict with browser or operating system shortcuts (such as `CTRL + C`, `CTRL + V`) which may be present. Changes to the shortcuts are reflected in the **Keyboard Shortcuts** discovery menu in Flex. You can access it under the user menu on the top right of the Flex UI.

You can make customizations to the default shortcuts using the following Flex API functions:

* **Flex.KeyboardShortcutManager.remapShortcut()**
* **Flex.KeyboardShortcutManager.deleteShortcuts()**
* **Flex.KeyboardShortcutManager.addShortcuts()**
* **Flex.KeyboardShortcutManager.disableShortcuts()**

The keyboard shortcut mappings use the modifiers `CTRL + SHIFT` along with a `KEY`. Flex provides the following default shortcuts:

```javascript
{
   0: { action: logout, name: "Logout" },
   1: { action: endSelectedTask, name: "End Selected Task", throttle: 1000 },
   A: { action: acceptTask, name: "Accept Task" },
   R: { action: rejectTask, name: "Reject Task" },
   T: { action: selectNextTask, name: "Select Next Task" },
   Y: { action: selectPreviousTask, name: "Select Previous Task" },
   S: { action: toggleActivityMenu, name: "Toggle Activity Menu" },
   H: { action: toggleHold, name: "Toggle Hold" },
   M: { action: toggleMute, name: "Toggle Mute" },
   C: { action: returnToCall, name: "Return To Call" }
};

```

Shortcuts are constructed in the following way:

```javascript
X: { action: () => functionName(), name: "Shortcut Name", throttle: 0 }
```

| Example           | Description                                                                                                                                                                                                                            | Notes                                                                                                                                                                                                                                                                                                                                                                                                                                                                            |
| ----------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| 1                 | The key which will trigger the shortcut.                                                                                                                                                                                               | Only numbers and uppercase letters are valid.                                                                                                                                                                                                                                                                                                                                                                                                                                    |
| endSelectedTask   | The function which is triggered by the shortcut.                                                                                                                                                                                       |                                                                                                                                                                                                                                                                                                                                                                                                                                                                                  |
| End Selected Task | The name of the shortcut which will be displayed in the Keyboard Shortcuts menu and in error messages if a shortcut does not work.                                                                                                     |                                                                                                                                                                                                                                                                                                                                                                                                                                                                                  |
| 1000              | The throttle time in milliseconds which can be set to prevent the shortcut from being triggered again within the set amount of time. The user will see a notification if a shortcut is used repeatedly within the throttle limit time. | Optional - Default value is 50ms to prevent Flex from being overloaded by repeated firings, and to provide a more seamless visual experience. You can set a higher throttle for destructive actions where a user may accidentally fire a shortcut multiple times by accident.<br /><br />Only endSelectedTask has a configured throttle of 1000 ms. You can override this and the default throttle time for the other shortcuts by following the example in Remapping shortcuts. |

## Remap shortcuts

You can modify and remap a keyboard shortcut to use a different key. You can change the default shortcut key to a different one using the following function:

```javascript
Flex.KeyboardShortcutManager.remapShortcut(oldKey, newKey,
   { action: functionName(), name: "Shortcut Name", throttle: 0 }
);

```

`Flex.KeyboardShortcutManager` takes three parameters:

* **oldKey** - the letter of the key which the shortcut corresponds to (eg., "S" of the default keyboard shortcut table)
* **newKey** - the new key to assign to the shortcut (the **KeyboardEvent.key** value of the new mapping)
* *Optional:* Shortcut object - this can be passed if any modifications need to be made to the shortcut itself

### Examples

The following example will reassign the "Toggle Activity Menu" from `CTRL + SHIFT + S` (default) to `CTRL + SHIFT + K`:

```javascript
Flex.KeyboardShortcutManager.remapShortcut("S", "K");
```

The following example will reassign the "Toggle Activity Menu" from `CTRL + SHIFT + S` (default) to `CTRL + SHIFT + K`, as well as change the throttle time to `1000` ms:

```javascript
Flex.KeyboardShortcutManager.remapShortcut("S", "K", {
   action: Flex.defaultActions.toggleActivityMenu,
   name: "Toggle Activity Menu",
   throttle: 1000
});

```

## Delete default shortcuts

You can delete one or more keyboard shortcuts using the following:

```javascript
Flex.KeyboardShortcutManager.deleteShortcuts(["S"]);
```

```javascript
Flex.KeyboardShortcutManager.deleteShortcuts(["S", "A", "1"]);
```

The shortcut of whichever key or keys are passed in an array to this function will be removed. The **Keyboard Shortcuts** menu will be updated to reflect the deletion.

## Add custom shortcuts

You can add custom shortcuts to expand the functionality. The following examples show how native Flex actions or basic functionality can be integrated into shortcuts. It is also possible to write more complicated custom logic.

```javascript
import { Actions } from "@twilio/flex-ui";

const toggleDialpad = () => {
   Actions.invokeAction("ToggleOutboundDialer");
};


Flex.KeyboardShortcutManager.addShortcuts({
   5: { action: () => console.log("hello"), name: "Log hello" },
   D: { action: toggleDialpad, name: "Toggle dialpad", throttle: 100 }
});

```

At a minimum, a shortcut needs to include the letter or number it maps to, an action, and a name such as:

```javascript
5: { action: () => console.log("hello"), name: "Log hello" }
```

Optionally, you can add a custom throttle.

## Disable all shortcuts

You can disable shortcuts entirely by calling the following function:

```javascript
Flex.KeyboardShortcutManager.disableShortcuts();
```

This will remove the **Keyboard Shortcuts** menu entirely.
