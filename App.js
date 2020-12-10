import React from "react";
import { createStore } from "redux";
import { Provider } from "react-redux";
import { ApolloClient, ApolloProvider, InMemoryCache } from "@apollo/client";

import HomeScreen from "./screens/HomeScreen";
import AppNavigation from "./navigation/AppNavigation";

const client = new ApolloClient({
  uri: `https://graphql.contentful.com/content/v1/spaces/ldcl3ayg0mhx`,
  credentials: "same-origin",
  cache: new InMemoryCache(),
  headers: {
    Authorization: `Bearer 93f3808c25c1f5bdb95476ca8576c6eaa12b5587efb956efb242ceead7cb3840`,
  },
});

const initialState = {
  action: "",
  name: "Stranger",
  avatar:
    "https://share.getcloudapp.com/bLu0r6GN/download/avatar-default.jpg?k=7987709d&utm_source=viewer_new",
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case "CLOSE_MENU":
      return { ...state, action: "closeMenu" };
    case "OPEN_MENU":
      return { ...state, action: "openMenu" };
    case "UPDATE_NAME":
      return { ...state, name: action.name };
    case "UPDATE_AVATAR":
      return { ...state, avatar: action.avatar };
    case "OPEN_CARD":
      return { ...state, action: "openCard" };
    case "CLOSE_CARD":
      return { ...state, action: "closeCard" };
    case "OPEN_LOGIN":
      return { ...state, action: "openLogin" };
    case "CLOSE_LOGIN":
      return { ...state, action: "closeLogin" };
    default:
      return state;
  }
};

const store = createStore(reducer);

export default function App() {
  return (
    <ApolloProvider client={client}>
      <Provider store={store}>
        <AppNavigation />
      </Provider>
    </ApolloProvider>
  );
}
