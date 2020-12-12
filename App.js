import React from "react";
import { createStore } from "redux";
import { Provider } from "react-redux";
import { ApolloClient, ApolloProvider, InMemoryCache } from "@apollo/client";

import AppNavigation from "./navigation/AppNavigation";

const client = new ApolloClient({
  uri: `https://graphql.contentful.com/content/v1/spaces/oklsy8b0aucg`,
  credentials: "same-origin",
  cache: new InMemoryCache(),
  headers: {
    Authorization: `Bearer GjmsFf4H_w9-asK8K_guvh9XAFHkiqAWaKIdBfJyQAY`,
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
    case "OPEN_NOTIF":
      return { ...state, action: "openNotif" };
    case "CLOSE_NOTIF":
      return { ...state, action: "closeNotif" };
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
