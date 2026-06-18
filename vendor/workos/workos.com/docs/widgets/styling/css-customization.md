# CSS Customization

Widgets can be styled using plain CSS using namespaced class and data-attribute selectors.

While optional, we recommend starting with the `layout.css` stylesheet from Radix Themes, as well as the `base.css` stylesheet from WorkOS Widgets. These styles provide a base level of functional styling without opinionated design choices.

#### CSS imports

## Universal selectors

Elements in Widgets are accessible via CSS class selectors prefixed with `woswidgets-`.

| Selector             | Description                                         |
| :------------------- | :-------------------------------------------------- |
| `.woswidgets-root`   | The root element for the Widgets provider           |
| `.woswidgets-widget` | A selector used on the root element for all Widgets |

## Element selectors

### Avatar

| Selector             | Description                 |
| :------------------- | :-------------------------- |
| `.woswidgets-avatar` | Targets all avatar elements |

### Badge

| Selector            | Description                |
| :------------------ | :------------------------- |
| `.woswidgets-badge` | Targets all badge elements |

### Button

| Selector                          | Description                 |
| :-------------------------------- | :-------------------------- |
| `.woswidgets-button`              | Targets all button elements |
| `.woswidgets-button--primary`     | Targets primary buttons     |
| `.woswidgets-button--secondary`   | Targets secondary buttons   |
| `.woswidgets-button--destructive` | Targets destructive buttons |

### Dialog

| Selector                     | Description                              |
| :--------------------------- | :--------------------------------------- |
| `.woswidgets-dialog`         | Targets all dialog elements              |
| `.woswidgets-dialog-overlay` | Targets the overlay for a dialog element |

### Dropdown

| Selector               | Description                   |
| :--------------------- | :---------------------------- |
| `.woswidgets-dropdown` | Targets all dropdown elements |

### Icon Button

| Selector                  | Description                      |
| :------------------------ | :------------------------------- |
| `.woswidgets-button`      | Targets all button elements      |
| `.woswidgets-icon-button` | Targets all icon button elements |

### Label

| Selector            | Description                |
| :------------------ | :------------------------- |
| `.woswidgets-label` | Targets all label elements |

### Menu Item

| Selector                             | Description                    |
| :----------------------------------- | :----------------------------- |
| `.woswidgets-menu-item`              | Targets all menu item elements |
| `.woswidgets-menu-item--destructive` | Targets destructive menu items |

### Select

| Selector                      | Description                                      |
| :---------------------------- | :----------------------------------------------- |
| `.woswidgets-select`          | Targets all select elements                      |
| `.woswidgets-select-dropdown` | Targets dropdown elements belonging to a select  |
| `.woswidgets-select-item`     | Targets menu item elements belonging to a select |

### Skeleton

| Selector               | Description                   |
| :--------------------- | :---------------------------- |
| `.woswidgets-skeleton` | Targets all skeleton elements |

### Text Field

| Selector                 | Description                     |
| :----------------------- | :------------------------------ |
| `.woswidgets-text-field` | Targets all text field elements |
