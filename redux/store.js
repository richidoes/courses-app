import { createStore, combineReducers, applyMiddleware } from "redux";
import thunk from "redux-thunk";

import userReducer from "./userDucks";
import togglesReducer from "./togglesDucks";

const rootReducer = combineReducers({
  toggle: togglesReducer,
  user: userReducer,
});

export const store = createStore(rootReducer, applyMiddleware(thunk));
