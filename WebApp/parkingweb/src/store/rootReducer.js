import { combineReducers } from "redux";
import { userReducer } from "./reducers/userReducer";
import { carReducer } from "./reducers/carReducer";
import {reducer as modal} from "redux-modal"

export default combineReducers({
    user: userReducer,
    car: carReducer,
    modal
})