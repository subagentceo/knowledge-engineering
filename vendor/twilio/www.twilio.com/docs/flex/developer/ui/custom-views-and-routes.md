# Create Custom Views and Routes

Flex is built using React, so it's a single page application by default. While you can [add, replace or remove components](/docs/flex/developer/ui/components) to the Flex UI, you may find that workers need an entirely separate page to effectively get their work done in the Flex UI. Flex allows you to create these views and route workers to them.

The Flex UI uses the `react-router`, `react-router-redux` and `history` libraries for client-side routing.

## Add, Replace, or Remove a View

Flex organizes views within the `ViewCollection` dynamic component. You can manipulate Flex views in the [same manner as a dynamic component](/docs/flex/developer/ui/components).

```javascript
Flex.ViewCollection.Content.add(
  <Flex.View name="my-custom-page" key="my-custom-page-key">
    <div>My custom page</div>
  </Flex.View>
);
```

This will add a new view that's available under a path that corresponds to the `name` prop (i.e., `https://localhost:3000/my-custom-page` in this example.)

If you require more control over mounting your view, refer to the [](#mounting-a-view-to-multiple-routes)Mounting a View to Multiple Routes section.

You can also create a link to your view in the side navigation bar:

```javascript
 Flex.SideNav.Content.add(
  <Flex.SideLink
    showLabel={ true }
    icon="DefaultAvatar"
    isActive={true}
    onClick={() => { Flex.Actions.invokeAction("HistoryPush", `/my-custom-page/`); } }
    key="MyCustomPageSideLink"
  >
    My custom page
  </Flex.SideLink>
);
```

## Configuration Options

The configuration interface for routing-related functionality in Flex has the following shape:

```javascript
router?: {
  type: "browser" | "memory"; // either a web-browser address or a reference implementation
  history?: HistoryBuildOptions; // build options for a `history` NPM package
  isolate?: boolean; // isolate Flex routing from other routing, forces Flex to use memory router.
};
```

## Actions for Navigation and Routing

You can use actions to navigate to different "locations" in the Flex UI. Actions work similarly to the [HTML5 History API](https://developer.mozilla.org/en-US/docs/Web/API/History). Flex actions include:

| **Action**         | **Payload**                                                                                                                                                        | **Description**                                                                                                         |
| ------------------ | ------------------------------------------------------------------------------------------------------------------------------------------------------------------ | ----------------------------------------------------------------------------------------------------------------------- |
| *NavigateToView*   | `{ viewName: string }`                                                                                                                                             | Navigates the user to a view defined by the provided view name                                                          |
| *HistoryPush*      | URL path as a String or an Object matching the shape of the history location `({ pathname: string, search: string, hash: string, state: { [key: string]: any } })` | Adds a history entry, leading to view change or redirect                                                                |
| *HistoryReplace*   | URL path as a String or an Object matching the shape of the history location `({ pathname: string, search: string, hash: string, state: { [key: string]: any } })` | Replaces current history entry, leading to view change or redirect                                                      |
| *HistoryGo*        | `Integer`                                                                                                                                                          | Goes to a specific history entry, identified by its relative position to the current page. The current page is index 0. |
| *HistoryGoBack*    | `None`                                                                                                                                                             | Goes back to the previous history entry                                                                                 |
| *HistoryGoForward* | `None`                                                                                                                                                             | Goes forward to the next history entry                                                                                  |

## Browser and In-Memory History

Support for browser and memory history that is configurable through [the configuration object](/docs/flex/developer/ui/overview-of-flex-ui-programmability-options#configuration).

## Mounting a view to multiple routes

You may want your page's path to be separate from the `name`, or to expose multiple paths that lead to the same View. The View component has a `route` property that you can use to add an alternative route. The `route` property has a shape similar to props of `Route` component of `react-router` [package](https://reacttraining.com/react-router/core/api/Route/route-props).

```javascript
Flex.ViewCollection.Content.add(
  <Flex.View name="some-name" key="my-custom-page-key" route={{path: "/custom-route"}}>
    <div>My custom page</div>
  </Flex.View>
);
```

The custom page will be visible at the`/custom-route` and `/some-name` paths.

You can also use an array to add even more paths:

```javascript
<View key="teams" name="teams" route={{ path: ["/supervisor", "/something"] }}>
```

The view will be visible at the `/teams` `/supervisor` and `/something` paths.

## Coordinating Flex UI with your application's routing

If you are using routing libraries like `react-router-redux` or `connected-react-router`, you can sync history between your application and Flex by providing the history object that you are using for your Router as a parameter to the Flex store enhancer:

> \[!NOTE]
>
> The `router` application configuration options will have no effect when a custom `history` object is provided.

```javascript
import { createStore, combineReducers, applyMiddleware, compose } from "redux";
import { createBrowserHistory } from "history";
import { Provider } from "react-redux";
import { ConnectedRouter } from "react-router-redux";
import { Switch, Route } from "react-router";
import { configuration } from "/appConfig";
import { myReducer } from "/myReducer";

const reducers = combineReducers({
    flex: Flex.FlexReducer,
    app: myReducer
});

const history = createHistory();

const middleware = applyMiddleware();

const store = createStore(
    reducers,
    compose(
        middleware,
        Flex.applyFlexMiddleware(history)
    )
);

Flex
    .Manager.create(configuration, store)
    .then(manager => {
        ReactDOM.render(
            <Provider store={store}>
                <ConnectedRouter history={history}>
                    <Switch>
                        <Route path="/hi" component={() => {
                            setTimeout(() => { history.push("/"); }, 5000);
                            return (
                                <div>Hi! I will redirect to Flex in 5 seconds flat!</div>
                            );
                        }}></Route>
                        <Route component={() => {
                            return (<Flex.ContextProvider manager={manager}>
                                <Flex.RootContainer />
                            </Flex.ContextProvider>);
                        }}></Route>
                    </Switch>
                </ConnectedRouter>
            </Provider>,
            container
        );
    })
```

## Prepend routes

If you are using Flex alongside other applications, you may wish to prepend the Flex URL path with a prefix so that Flex routing won't interfere with other registered endpoints. For example, let's make our Flex path relative to `/foobar`. To do so, apply the following configuration settings:

```javascript
window.appConfig = {
  <...>
  router: {
    type: "browser",
    history: {
      basename: "/foobar"
    }
  }
  <...>
};
```

The `window.appConfig.router.history.basename` field tells Flex to make the Agent Desktop available under `http://example.com/foobar/agent-desktop/`.

> \[!WARNING]
>
> Implementing route prefixing creates several important side effects for other systems that interact with Flex.
>
> Your server must take the prefix into account in its own routing. The server needs a catch-all fallback route matching the prefix (`/foobar` in the above example). Otherwise, visiting `http://example.com/foobar/agent-desktop/` will return a `404`. An application's `webpack-dev-server` config that handles the route might look like the following:
>
> ```javascript
> devServer: {
>     historyApiFallback: {
>         rewrites: [{ from: /^\/foobar/, to: '/foobar/index.html' }]
>     }
> }
> ```
>
> Additionally, the prefix is only for `browser` routing and is not applicable to `memory`. Finally, make sure to adjust paths to your assets files, like configuration or CSS!

Learn more in the [history node package documentation](https://www.npmjs.com/package/history#using-a-base-url).
