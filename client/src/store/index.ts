// // @ts-nocheck
// // @ts-ignore
// // @ts-enable
import { createStore } from "redux";
import { composeWithDevTools } from "redux-devtools-extension";
import { rootReducers } from "./reducers";

export const store = createStore(rootReducers, composeWithDevTools());
