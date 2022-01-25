import { combineReducers } from "redux";
import authReducer from "./auth";
import coinReducer from "./coin";
import messageReducer from "./message";
import active_resetReducer from "./active_reset";

export default combineReducers({
  auth: authReducer,
  coin: coinReducer,
  active_reset: active_resetReducer,
  message: messageReducer,
});
