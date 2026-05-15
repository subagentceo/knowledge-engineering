# Styling

WorkOS Widgets are powered by Radix Themes, which provides beautiful default styles with zero configuration. The fastest way to style your Widgets is with the [`theme` prop](https://workos.com/docs/widgets/styling/theme-customization).

This prop is provided to the `WorkOsWidgets` component rendered at the top of your application. All Widgets will inherit styles configured in the `theme` prop.

#### Theme customization

```js
function App({ children }) {
  return (
    <WorkOsWidgets
      theme={{
        appearance: 'dark',
        accentColor: 'green',
        radius: 'medium',
        fontFamily: 'Inter',
      }}
    >
      {children}
    </WorkOsWidgets>
  );
}
```

See the [theme customization guide](https://workos.com/docs/widgets/styling/theme-customization) for more details on `theme` prop.

## Using CSS

If you choose not to use the theming capabilities in Radix Themes, you can style Widgets using CSS. Individual elements in Widgets are accessible via CSS class selectors prefixed with `woswidgets-`. For example, you can add your own button styles by selecting the `woswidgets-button` class.

#### CSS customization

```css
.woswidgets-button {
  border-radius: 4px;
  color: hsl(0 0% 100%);
  background-color: hsl(272deg 81% 56%);
  background-image: linear-gradient(
    to top right,
    hsl(272deg 81% 56%),
    hsl(271deg 91% 65%)
  );
  /* ... */
}
```

See the [CSS customization guide](https://workos.com/docs/widgets/styling/css-customization) for more details on styling Widgets with CSS.
