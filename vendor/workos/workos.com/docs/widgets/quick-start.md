# Quick Start

## Installation

First, install the `@workos-inc/widgets` package from the npm registry, along with its peer dependencies:

```bash title="Install packages"
npm install @workos-inc/widgets @radix-ui/themes @tanstack/react-query
```

WorkOS Widgets uses [Radix Themes](https://www.radix-ui.com/themes) for its UI components and style customization APIs, while [TanStack Query](https://tanstack.com/query/latest) is used for data fetching and caching. Since both libraries are often used in applications, we require them as peer dependencies to avoid duplication, version conflicts, and bloated bundles.

> Widgets can be used in any client- or server-rendered React application. See our [Widgets examples on GitHub](https://github.com/workos/widgets-examples) to see how they can be integrated in various frameworks.

## Styles

WorkOS Widgets are powered by Radix Themes, which provides beautiful default styles with zero configuration. Start by importing styles exported from both Radix Themes and WorkOS Widgets.

#### CSS imports

```css
/* Provides styles for Radix Themes components and its theming API */
@import '@radix-ui/themes/styles.css';
/* Provides additional styles specific to WorkOS Widgets */
@import '@workos-inc/widgets/styles.css';
```

> Widgets can be customized using the `theme` prop or with plain CSS. See the [styling guide](https://workos.com/docs/widgets/styling) for more details.

## Root component

The `WorkOsWidgets` component should be rendered at the top of your application. This component is responsible for managing context for data fetching and providing theme styles to all Widgets.

#### Root component

```js
function App({ children }) {
  return <WorkOsWidgets>{children}</WorkOsWidgets>;
}
```

## CORS configuration

Because WorkOS widgets issue client-side requests to WorkOS, it is necessary to configure your site as an allowed web origin. In the Applications page of the [WorkOS Dashboard](https://dashboard.workos.com/environment/applications), open your application. CORS can be configured within the Sessions tab. This will prevent CORS issues when using the widget.

![CORS configuration](https://images.workoscdn.com/images/586fb07f-6839-4c5c-95c1-e1055a5b3ace.png?auto=format\&fit=clip\&q=80)
