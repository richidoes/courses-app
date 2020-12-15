import React from "react";

import { Provider } from "react-redux";
import { ApolloClient, ApolloProvider, InMemoryCache } from "@apollo/client";

import AppNavigation from "./navigation/AppNavigation";
import { store } from "./redux/store";

const client = new ApolloClient({
  uri: `https://graphql.contentful.com/content/v1/spaces/oklsy8b0aucg`,
  credentials: "same-origin",
  cache: new InMemoryCache(),
  headers: {
    Authorization: `Bearer GjmsFf4H_w9-asK8K_guvh9XAFHkiqAWaKIdBfJyQAY`,
  },
});

export default function App() {
  return (
    <ApolloProvider client={client}>
      <Provider store={store}>
        <AppNavigation />
      </Provider>
    </ApolloProvider>
  );
}
