import { combineReducers } from "redux";
import auth from "./auth";
import layout from "./layout";
import folder from "./folder";
import map from "./map";

const reducers = combineReducers({
    auth,
    layout,
    folder,
    map
})

export default reducers;