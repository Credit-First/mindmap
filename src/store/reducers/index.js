import { combineReducers } from "redux";
import auth from "./auth";
import layout from "./layout";

const reducers = combineReducers({
    auth,
    layout
})

export default reducers;