import { combineReducers } from "redux";
import authReducer from "./auth";
import coinReducer from "./coin";
import messageReducer from "./message";

export default combineReducers({
  auth: authReducer,
  coin: coinReducer,
  message: messageReducer,
});
