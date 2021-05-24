import { createStore, combineReducers } from "redux";
import { composeWithDevTools } from "redux-devtools-extension";
import anecdoteReducer from "../reducers/anecdoteReducer";
import notifaicationReducer from "../reducers/notificationReducer";

const reducer = combineReducers({
  anecdotes: anecdoteReducer,
  notification: notifaicationReducer,
});

const store = createStore(reducer, composeWithDevTools());

export default store;
