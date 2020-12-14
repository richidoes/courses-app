import { createStore, combineReducers } from "redux";

import userReducer from "./userDucks";
import togglesReducer from "./togglesDucks";

const rootReducer = combineReducers({
  toggle: togglesReducer,
  user: userReducer,
});

const store = createStore(rootReducer);

export default store;
