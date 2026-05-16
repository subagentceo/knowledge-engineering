# Use Apollo Client with Flex UI

## Overview

Flex UI uses [Apollo Client](https://www.apollographql.com/docs/react) and an `ApolloProvider` to internally communicate with Twilio's GraphQL API. This architecture allows both native and custom Flex UI components to exchange data using GraphQL.

## Use your GraphQL APIs with custom FLex UI components

Sometimes, you might want your custom Flex UI components to call a different GraphQL API, instead of Twilio's GraphQL API.

If you attempt to wrap the Flex UI RootContainer around a custom `ApolloProvider`, Flex still defaults to Twilio's GraphQL API. That's because Flex's `ApolloProvider` is already in place, and anything inside it uses Twilio's API as the default client. In this case, your customization won't work as expected.

If you want to use your own custom GraphQL service inside a Flex UI component, use the `client` option in Apollo hooks, like `useQuery`. This solution lets you specify which Apollo Client instance to use for that request. For more details, see Apollo's documentation on the [`useQuery` API](https://www.apollographql.com/docs/react/data/queries#usequery-api).

### Example: Flex UI plugin

If you're using a custom GraphQL API inside a Flex UI plugin, use the following approach. Inside your plugin component, you can create and use a custom Apollo Client.

```javascript
// MyCustomGraphQLComponent.js

import { ApolloClient, ApolloProvider, gql, InMemoryCache, useQuery } from "@apollo/client";
import * as React from "react";

const customerGraphQLClient = new ApolloClient({
    uri: 'https://my-custom-graphql-api.com/',
    cache: new InMemoryCache()
});

const CUSTOMER_QUERY = gql`
    query GetLocations {
        locations {
            id
            name
            description
        }
    }
`;

const CustomGraphQLChildComponent = () => {
    const { data, error, loading } = useQuery(CUSTOMER_QUERY);

    if (loading) {
        return <div>Loading...</div>;
    }
    if (error) {
        return <div>Error: {(error as any).message}</div>;
    }

    return (
        <div>
            <pre>data: {JSON.stringify(data, null, 2)}</pre>
        </div>
    );
};

export const MyCustomGraphQLComponent = () => (
    <ApolloProvider client={customerGraphQLClient}>
        <CustomGraphQLChildComponent />
    </ApolloProvider>
);
```

```javascript
// GraphQLComponentPlugin.js
import { FlexPlugin } from 'flex-plugin';
import React from 'react';
import { MyCustomGraphQLComponent } from './MyCustomGraphQLComponent';

const PLUGIN_NAME = 'GraphQLComponent';

export default class GraphQLComponentPlugin extends FlexPlugin {
  constructor() {
    super(PLUGIN_NAME);
  }

  /**
   * This code runs when your plugin starts 
   * Use this to modify any UI components or attach to the actions framework
   *
   * @param flex { typeof import('@twilio/flex-ui') }
   * @param manager { import('@twilio/flex-ui').Manager }
   */
  init(flex, manager) {
    flex.TaskInfoPanel.Content.add(<MyCustomGraphQLComponent' key="gql-component"/>);
  }
}

```

### Example: Self-hosted Flex UI

If you're hosting Flex UI yourself, you can define a custom Apollo Client and use it directly inside your components.

```javascript
import React from 'react';
import * as Flex from '@twilio/flex-ui';
import { ApolloClient, InMemoryCache, gql } from '@apollo/client';
import { ApolloProvider, useQuery } from '@apollo/client/react';

const customerGraphQLClient = new ApolloClient({
  uri: 'https://my-custom-graphql-api.com/',
  cache: new InMemoryCache(),
});

const CUSTOMER_QUERY = gql`
  query GetLocations {
    locations {
       id
	name
       description
    }
  }
`;

const MyCustomGraphQLComponent = () => {
  const { loading, error, data } = useQuery(CUSTOMER_QUERY, {
    client: customerGraphQLClient, // This code is required so the component queries your custom GraphQL endpoint instead of Twilio's 
  });

    if (loading) {
        return <div>Loading...</div>;
    }
    if (error) {
        return <div>Error: {(error as any).message}</div>;
    }

    return (
        <div>
            <pre>data: {JSON.stringify(data, null, 2)}</pre>
        </div>
    );
};

export const App = ({ manager }) => {
    Flex.TaskInfoPanel.Content.add(<MyCustomGraphQLComponent key="gql-component"/>);

    return (
      <ApolloProvider client={customerGraphQLClient}>
        <Flex.ContextProvider manager={manager}>
          <Flex.RootContainer />
        </Flex.ContextProvider>
      </ApolloProvider>
    );
  }
}

export default App;
```
