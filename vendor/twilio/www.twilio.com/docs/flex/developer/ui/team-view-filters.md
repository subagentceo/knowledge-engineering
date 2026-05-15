# Advanced Team View Filters

Team View Filters allow supervisors to search or filter their agents by name or activity. You can also use custom, programmatically defined filter criteria, like teams or skills. This page describes the main concepts involved in customizing Team View Filters, and includes some sample code you can use to get started with the feature. For more information about using Team View Filters, check out the [End User Guide](/docs/flex/end-user-guide/team-view-filters)!

> \[!WARNING]
>
> This feature is in pilot between [version 1.18](/docs/flex/release-notes/ui-release-notes#v-1180) and [version 1.26.3](/docs/flex/release-notes/ui-release-notes) of the Flex UI. You can enable team view filters on the [pre-release features page](https://flex.twilio.com/admin/features) within Flex Admin. This feature is enabled by default for [version 1.27.0](/docs/flex/release-notes/ui-release-notes) and upper.

## Key Concepts

Flex uses the following objects and components to generate Team View Filters:

### TeamFiltersPanel

The portion of the Flex UI that shows the Team Filters. It is a child component of the Supervisor UI. By default, Flex allows you to filter by agent Activity, but you can add custom filters to the panel by modifying the defaultProps, like so:

```javascript
Flex.TeamsView.defaultProps.filters = [
    Flex.TeamsView.activitiesFilter,
    // ... custom filters here
];

```

### FilterDefinition

A *FilterDefinition* is a structure that tells Flex how to render the new filter label and field, and what to query the field value against. Each field will add a new condition to the [Sync query](/docs/sync/live-query) that will render the agents (or workers) list to the UI. A FilterDefinition has the following structure:

```javascript
interface FilterDefinition {
   id: string;
   title: React.ReactChild;
   fieldName: string;
   type?: FiltersListItemType;
   options?: Array;
   customStructure?: CustomFilterItemStructure;
   condition?: string;
}

```

| **Field**         | **Description**                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                             |
| ----------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `id`              | ***Required.*** A string representing the subject of your query. This identifies the values to filter for in the Flex app state based on your specified attribute or field. For example, "data.attributes.full\_name" or "data.activity\_name".                                                                                                                                                                                                                                                                                             |
| `title`           | ***Required.*** A string that is rendered as the filter display name on the Filters side panel. For example, "Names".                                                                                                                                                                                                                                                                                                                                                                                                                       |
| `fieldName`       | ***Required.*** A string representing the *input name* passed to the predefined filters. For example, "full\_name".                                                                                                                                                                                                                                                                                                                                                                                                                         |
| `type`            | Required if `customStructure` isn't defined. Currently only supports "multiValue". This renders a list of checkboxes for each *option* you provide.                                                                                                                                                                                                                                                                                                                                                                                         |
| `options`         | Required if type is "multiValue". An array of [filter definition options](/en-us) used for rendering the checkbox fields, their values, their labels, and whether they are selected by default.                                                                                                                                                                                                                                                                                                                                             |
| `customStructure` | Required if `type` isn't set. An object of type [CustomFilterItemStructure](/docs/flex/developer/ui/team-view-filters) used for rendering custom fields. This lets you add your own custom fields.                                                                                                                                                                                                                                                                                                                                          |
| `condition`       | An optional parameter that represents the query comparison operator such as `IN`, `NOT_IN`, `CONTAINS`. See [Query Operators](/docs/sync/live-query#query-operators) to learn about other possible condition values. <br /><br />This represents the condition to be used in building the query. For instance, `data.activity_name IN ["available"]` or `data.attributes.full_name CONTAINS "John"`. In the latter example, "data.attributes.full\_name" is the `id`, "CONTAINS" is the `condition`, and "John" is the value to filter for. |

### FilterDefinitionOption

Describes the available options which can be used as a filter. For example, if you wanted to filter by agent languages, you could create an option for each language spoken in your contact center.

```javascript
interface FilterDefinitionOption {
   value: string;
   label: string;
   default?: boolean;
}
```

| **Field** | **Description**                                                                                                                                                                                                                                                                        |
| --------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `value`   | Value of the filter option. When using `IN` or `NOT_IN` to build your query and you are providing an array of options, you need to omit the first and the last instances of double quotes in your string. See example in [Add a multivalue field](#add-a-multivalue-field)<br /><br /> |
| `label`   | Friendly name of the option.                                                                                                                                                                                                                                                           |
| `default` | A Boolean value indicating whether the filter option should be selected by default.                                                                                                                                                                                                    |

### CustomFilterItemStructure

To add a custom field and label to a filter, you'll need an object with a *select* field or an *input* field passed to the `CustomFilterItemStructure`.

```javascript
interface CustomFilterItemStructure {
   field: React.ReactElement;
   label: React.ReactElement;
}

```

`field` is a React element that should render an input usable by the final customer. It inherits a few custom props from Flex.

| **Field**      | **Description**                                                                                                                                                                 |
| -------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| name           | The field name set in the FilterDefinition.                                                                                                                                     |
| `handleChange` | A function that gets invoked on this custom field change event. It requires the new value of the filter to be passed as an argument, either as an array of strings or a string. |
| `options`      | The same options passed in the FilterDefinition, if provided.                                                                                                                   |
| `currentValue` | The current value of the filter. It can either be an array of strings or a string, depending on what the `props.handleChange` function receives once invoked.                   |

**label** is another React element that serves as the label of the filter. It should indicate the content of the filter when the accordion item is closed. It receives the following properties:

| Field          | Description                                                                                                            |
| -------------- | ---------------------------------------------------------------------------------------------------------------------- |
| `currentValue` | The current value of the filter.                                                                                       |
| `activeOption` | is the options array that is provided and returns the entire selected option. It will contain `currentValue` as value. |

### FilterDefinitionFactory

The filters array also accepts FiltersDefinitionFactories, which are functions that return a FilterDefinition. You can write a FilterDefinitionFactory that fetches data from the app state and dynamically renders values or options of a field.

Your factory must accept two arguments:

| **Argument** | **Description**                                                                                                                                        |
| ------------ | ------------------------------------------------------------------------------------------------------------------------------------------------------ |
| appState     | The entire Flex Redux state. Use this to access information about activities, session, and more details about the current state of your Flex instance. |
| ownProps     | The props received by the TeamFiltersPanel.                                                                                                            |

## Customizing your Filters

The **TeamFiltersPanel** includes `activitiesFilter` by default. To add a new filter to the **TeamsFiltersPanel**, you can overwrite the `defaultProps.filters` property with a new array of filter definitions before rendering your Flex instance.

This array can contain both FilterDefinitions and FilterDefinition factories. In this example, we are reading the default activity filter as the first item of the array.

```javascript
Flex.TeamsView.defaultProps.filters = [
   Flex.TeamsView.activitiesFilter,
   yourFilterDefinitionHere,
   your2ndFilterDefinitionHere,
   your3rdFilterDefinitionHere,
];

```

### Add a custom input field

Initially, the FilterDefinition has one predefined type, which will output checkboxes: *MultiValue.* With custom input fields, you can add a different type of input, like a custom text input field.

![Twilio Flex interface showing agent filter options and team status.](https://docs-resources.prod.twilio.com/6f31887e974b65695df40aa599a595fc59211bd4fc1c51c8980760967bac8d28.jpg)

*An example of a custom input field, name, where you can type and filter by names based on the condition that you specify*

The following file describes the HTML for your custom field, as well as the JavaScript associated with its behavior. In this sample, the filter functionality is extended in the extendFilters function

```js title="Add a custom filter"
import React from "react";
import { TeamsView } from "@twilio/flex-ui";

// Define an Input component; returns an input HTML element with logic to handle changes when users enter input
const Input = ({ handleChange, currentValue = "", fieldName }) => {
    const _handleChange = (e) => {
        e.preventDefault();
        handleChange(e.target.value);
    };return (
       <input
           className="CustomInput"
           type="text"
           onChange={_handleChange}
           value={currentValue}
           name={fieldName}
       />
   )
};

// Define the label that supervisors will see when using our custom filter
const CustomLabel = ({ currentValue }) => (
    <>{currentValue && currentValue.length ? `Containing "${currentValue}"` : "Any"}</>
);

// Define a new filter that uses the custom field
const nameFilter = {
    id: "data.attributes.full_name",
    fieldName: "full_name",
    title: "Names",
    customStructure: {
        field: <Input />,
        label: <CustomLabel />,
    },
    condition: "CONTAINS"
};

// Export a function to be invoked in plugin's main entry-point
export const extendFilter = (manager) => {
    manager.updateConfig({
        componentProps: {
            TeamsView: {
                filters:[
                    TeamsView.activitiesFilter,
                    nameFilter,
                ]
            }
        }
    })
};
```

### Add a multivalue field

The following example will filter by agents located in any of the options specified in the `value` field:

```javascript
import React from "react";
import { TeamsView } from "@twilio/flex-ui";
import { FiltersListItemType } from "@twilio/flex-ui";

// Define a new filter that uses the custom field

const teamFilter = {
    fieldName: "team_location",
    title: 'Team',
    id: 'data.attributes.squad',
    type: FiltersListItemType.multiValue,
    options: [
        { label: 'Canada', value: 'CAN-1", "CAN-2", "ARC'}
    ],
    condition: 'IN',
};

// Export a function to be invoked in plugin's main entry-point
export const extendFilter = (manager) => {
    manager.updateConfig({
        componentProps: {
            TeamsView: {
                filters: [
                    TeamsView.activitiesFilter,
                    teamFilter,
                ]
            }
        }
    })
};
```

### Use a filter definition factory

You can use a filter definition factory to dynamically render the options of the predefined checkboxes fields. For example, you could render the activities that are currently available on in the Flex Redux store.

```js title="Create a Filter Definition Factory Function"
import React from "react";

import { FiltersListItemType } from "@twilio/flex-ui";

const customActivityFilter = (appState, teamFiltersPanelProps) => {
    const activitiesArray = Array.from(appState.worker.activities.values());

    const activities = (activitiesArray).map((activity) => ({
        value: activity.name,
        label: activity.name,
        default: !!activity.available,
    }));

    return {
        id: "data.activity_name",
        fieldName: "custom_activity_name",
        type: FiltersListItemType.multiValue,
        title: "Activities",
        options: activities
    };
};

// Export a function to be invoked in plugin's main entry-point
export const extendFilter = (manager) => {
    manager.updateConfig({
        componentProps: {
            TeamsView: {
                filters: [
                    customActivityFilter,
                ]
            }
        }
    })
};
```

### Use a custom filter structure with a filter definition factory

You can use custom filter input components and filter definition factories together. The following code sample dynamically renders the options of a *select* field from the current Redux store.

```js title="Combine Filter Definition Factor and Custom Filters"
import React from "react";

// Create your custom field
const CustomField = ({ handleChange, currentValue, fieldName, options }) => {
    const _handleChange = (e) => {
        e.preventDefault();
        handleChange(e.target.value);
    };

    return (
        <select
            className="CustomInput"
            onChange={_handleChange}
            value={currentValue}
            name={fieldName}
        >
            <option value="" key="default">All activities</option>
            {options.map(opt => (
                <option value={opt.value} key={opt.value}>{opt.label}</option>
            ))}
        </select>
    )
};

// Define the label that will be displayed when filter is active
const CustomLabel = ({ currentValue }) => (
    <>{currentValue || "All activities"}</>
);

// Define the available properties upon which to filter based on application state
const customActivityFilter = (appState, teamFiltersPanelProps) => {

    const activitiesArray = Array.from(appState.worker.activities.values());

    const activities = (activitiesArray).map((activity) => ({
        value: activity.name,
        label: activity.name,
        default: !!activity.available,
    }));

    return {
        id: "data.activity_name",
        fieldName: "custom_activity_name",
        title: "Activities",
        customStructure: {
            label: <CustomLabel />,
            field: <CustomField />,
        },
        options: activities
    };
};

// Add new filter to TeamFiltersPanel in the Flex UI
export const extendFilter = (manager) => {
    manager.updateConfig({
        componentProps: {
            TeamsView: {
                filters: [
                    customActivityFilter,
                ]
            }
        }
    })
};
```

## Enable your new filter

Once you've configured your filter(s), you can enable them in Flex manager from within the base Plugin file. In this example, the `extendFilters` function is imported and passed to the Flex Manager.

```js title="Extend Filters with a Plugin"
import Flex from '@twilio/flex-ui';
import { FlexPlugin } from 'flex-plugin';
import { extendFilter } from "./CustomFilters";

const PLUGIN_NAME = 'SamplePlugin';

export default class SamplePlugin extends FlexPlugin {
  constructor() {
    super(PLUGIN_NAME);
  }

  /**
   *
   * @param flex
   * @param {Manager} manager
   */
  init(flex, manager) {
      extendFilter(manager);
  }
}
```

## Self-Hosted Flex

The following code samples demonstrate writing and calling the same `extendFilters` functions, but in the context of self-hosted Flex.

```js title="Define a Custom Filter (Self-Hosted)"
import React from "react";
import Flex from "@twilio/flex-ui";

// Define an Input component; returns a simple input HTML element with logic to handle changes when users enter input
const Input = ({ handleChange, currentValue = "", fieldName }) => {
   const _handleChange = (e) => {
       e.preventDefault();
       handleChange(e.target.value);
   };

   return (
       <input
           className="CustomInput"
           type="text"
           onChange={_handleChange}
           value={currentValue}
           name={fieldName}
       />
   )
};

// Define the label that supervisors will see when using our custom filter
const CustomLabel = ({ currentValue }) => (
  <>{currentValue && currentValue.length ? `Containing "${currentValue}"` : "Any"}</>
);


// Define a new filter that uses the custom field
const nameFilter = {
   id: "data.attributes.full_name",
   fieldName: "full_name",
   title: "Names",
   customStructure: {
       field: <Input />,
       label: <CustomLabel />,
   },
   condition: "CONTAINS"
};

// Add the filter to the list of filters in the TeamFiltersPanel
export const extendFilter = () => {
   Flex.TeamsView.defaultProps.filters = [
       Flex.TeamsView.activitiesFilter,
       nameFilter,
   ];
};
```

```js title="Create a Filter Definition Factory (Self-Hosted)"
import React from "react";
import Flex from "@twilio/flex-ui";
​
const customActivityFilter = (appState, teamFiltersPanelProps) => {
   const activitiesArray = Array.from(appState.worker.activities.values());
​
   const activities = (activitiesArray).map((activity) => ({
       value: activity.name,
       label: activity.name,
       default: !!activity.available,
   }));
​
   return {
       id: "data.activity_name",
       fieldName: "custom_activity_name",
       type: Flex.FiltersListItemType.multiValue,
       title: "Activities",
       options: activities
   };
};
​
​
export const extendFilter = () => {
    Flex.TeamsView.defaultProps.filters = [
        customActivityFilter,
    ];
};
```

```js title="Combine Filter Definition Factories and Custom Input (Self-Hosted)"
import React from "react";
import Flex from "@twilio/flex-ui";

// Create your custom field
const CustomField = ({ handleChange, currentValue, fieldName, options }) => {
   const _handleChange = (e) => {
       e.preventDefault();
       handleChange(e.target.value);
   };

   return (
       <select
           className="CustomInput"
           onChange={_handleChange}
           value={currentValue}
           name={fieldName}
       >
           <option value="" key="default">All activities</option>
           {options.map(opt => (
               <option value={opt.value} key={opt.value}>{opt.label}</option>
           ))}
       </select>
   )
};

// Define the label that will be displayed when filter is active
const CustomLabel = ({ currentValue }) => (
  <>{currentValue || "All activities"}</>
);

// Define the available properties upon which to filter based on application state
const customActivityFilter = (appState, teamFiltersPanelProps) => {

   const activitiesArray = Array.from(appState.worker.activities.values());

   const activities = (activitiesArray).map((activity) => ({
       value: activity.name,
       label: activity.name,
       default: !!activity.available,
   }));

   return {
       id: "data.activity_name",
       fieldName: "custom_activity_name",
       title: "Activities",
       customStructure: {
           label: <CustomLabel />,
           field: <CustomField />,
       },
       options: activities
   };
};

// Add new filter to TeamFiltersPanel in the Flex UI
export const extendFilter = () => {
   Flex.TeamsView.defaultProps.filters = [
       customActivityFilter,
   ];
};
```

```js title="Extend Filters in Self-Hosted Flex"
import { extendFilter } from "./CustomFilters";

export function run(config) {
   const container = document.getElementById("container");

   return Flex
       .progress("#container")
       .provideLoginInfo(config, "#container")
       .then(() => Flex.Manager.create(config))
       .then(manager => {

           // Extending the filter functionality
           extendFilter();

           ReactDOM.render(
               <Flex.ContextProvider manager={manager}>
                   <Flex.RootContainer />
               </Flex.ContextProvider>,
               container
           );
       })
       .catch((e) => {
           console.log("Failed to run Flex", e);
       });
}
```

## Hidden Filter

> \[!WARNING]
>
> The hidden filter feature is only available in [@twilio/flex-ui@1.21.0](/docs/flex/release-notes/ui-release-notes#v-1210) and later.

You can programmatically apply a filter that is hidden from the user, i.e. the user cannot disable it. You could use this feature to restrict supervisors to seeing only their team members on the page. However, note that this is not a security feature. Supervisors still have access to all agent activity using the underlying APIs.

In the following example, we use [live query](/docs/sync/live-query) to set up Team View to only show agents with a specific `team_name` attribute ([you can set user attributes via your SSO provider](/docs/flex/admin-guide/setup/sso-configuration)):

```javascript
Flex.TeamsView.defaultProps.hiddenFilter = 'data.attributes.team_name CONTAINS "sales"'
```
