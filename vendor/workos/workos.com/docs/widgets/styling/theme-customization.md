# Theme Customization

## Using the `theme` prop

The `theme` prop can be used to customize the overall appearance of WorkOS Widgets.

`theme` support relies on external stylesheets from Radix Themes and WorkOS Widgets. Start by importing both stylesheets into your application.

#### CSS imports

```css
/* Provides styles for Radix Themes components and its theming API */
@import '@radix-ui/themes/styles.css';
/* Provides additional styles specific to WorkOS Widgets */
@import '@workos-inc/widgets/styles.css';
```

### `theme` properties

See the [Radix Themes API reference](https://www.radix-ui.com/themes/docs/components/theme#api-reference) for more information on theming options.

## Using the `elements` prop

Underlying components can be styled using the `elements` prop. This object is a mapping of component names to their respective Radix Theme component props.

#### Elements customization

```js
function App({ children }) {
  return (
    <WorkOsWidgets
      elements={{
        avatar: {
          size: '1',
          radius: 'full',
        },
        primaryButton: {
          color: 'amber',
          highContrast: true,
          variant: 'surface',
        },
        dialog: {
          align: 'center',
          maxHeight: '80svh',
          maxWidth: '80svw',
        },
      }}
    >
      {children}
    </WorkOsWidgets>
  );
}
```

### `elements` properties

Each element is mapped to a Radix Theme component and accepts the same props as its respective component. See the Radix Themes documentation for each component for all available props.

| Component             | Radix component                                                             |
| :-------------------- | :-------------------------------------------------------------------------- |
| `avatar`              | [`Avatar`](https://www.radix-ui.com/themes/docs/components/avatar)          |
| `badge`               | [`Badge`](https://www.radix-ui.com/themes/docs/components/badge)            |
| `primaryButton`       | [`Button`](https://www.radix-ui.com/themes/docs/components/button)          |
| `secondaryButton`     | [`Button`](https://www.radix-ui.com/themes/docs/components/button)          |
| `destructiveButton`   | [`Button`](https://www.radix-ui.com/themes/docs/components/button)          |
| `dialog`              | [`Dialog`](https://www.radix-ui.com/themes/docs/components/dialog)          |
| `dropdown`            | [`Dropdown`](https://www.radix-ui.com/themes/docs/components/dropdown)      |
| `iconButton`          | [`IconButton`](https://www.radix-ui.com/themes/docs/components/icon-button) |
| `label`               | [`Label`](https://www.radix-ui.com/themes/docs/components/label)            |
| `primaryMenuItem`     | [`MenuItem`](https://www.radix-ui.com/themes/docs/components/menu-item)     |
| `destructiveMenuItem` | [`MenuItem`](https://www.radix-ui.com/themes/docs/components/menu-item)     |
| `select`              | [`Select`](https://www.radix-ui.com/themes/docs/components/select)          |
| `skeleton`            | [`Skeleton`](https://www.radix-ui.com/themes/docs/components/skeleton)      |
| `textfield`           | [`TextField`](https://www.radix-ui.com/themes/docs/components/text-field)   |
