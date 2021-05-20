import { combineReducers } from "redux"
import {loginReducer} from "./authReducers";

export default combineReducers({
    login : loginReducer
})