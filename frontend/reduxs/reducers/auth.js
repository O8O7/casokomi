import {
  LOGIN_SUCCESS,
  LOGIN_FAIL,
  USER_LOADED_SUCCESS,
  USER_LOADED_FAIL,
  AUTHENTICATED_SUCCESS,
  AUTHENTICATED_FAIL,
  PASSWORD_RESET_SUCCESS,
  PASSWORD_RESET_FAIL,
  PASSWORD_RESET_CONFIRM_SUCCESS,
  PASSWORD_RESET_CONFIRM_FAIL,
  SIGNUP_SUCCESS,
  SIGNUP_FAIL,
  LOGOUT,
  SET_AUTH_LOADING,
  REMOVE_AUTH_LOADING,
} from "../actions/types";

const initialState = {
  //   access: localStorage.getItem("access"),
  //   refresh: localStorage.getItem("refresh"),
  access: null,
  refresh: null,
  isAuthenticated: null,
  user: null,
  loading: false,
  status_code: null,
  message: null,
};

export default function (state = initialState, action) {
  const { type, payload } = action;

  switch (type) {
    case AUTHENTICATED_SUCCESS:
      return {
        ...state,
        isAuthenticated: true,
      };
    case LOGIN_SUCCESS:
      return {
        ...state,
        isAuthenticated: true,
        access: payload.access,
        refresh: payload.refresh,
        status_code: null,
        message: "ログインに成功しました",
      };
    case SIGNUP_SUCCESS:
      return {
        ...state,
        isAuthenticated: false,
        status_code: null,
        message: "メールアドレスに確認メールを送信しました",
      };
    case SIGNUP_FAIL:
      localStorage.removeItem("access");
      localStorage.removeItem("refresh");
      return {
        ...state,
        access: null,
        refresh: null,
        isAuthenticated: false,
        user: null,
        message: "登録に失敗しました",
        status_code: payload,
      };
    case USER_LOADED_SUCCESS:
      return {
        ...state,
        isAuthenticated: true,
        user: payload,
        status_code: null,
        message: null,
      };
    case AUTHENTICATED_FAIL:
      return {
        ...state,
        isAuthenticated: false,
        status_code: null,
        message: null,
      };
    case USER_LOADED_FAIL:
      return {
        ...state,
        user: null,
        status_code: null,
        message: null,
      };

    case LOGIN_FAIL:
      localStorage.removeItem("access");
      localStorage.removeItem("refresh");
      return {
        ...state,
        access: null,
        refresh: null,
        isAuthenticated: false,
        user: null,
        message: "ログインに失敗しました",
        status_code: payload,
      };

    case LOGOUT:
      localStorage.removeItem("access");
      localStorage.removeItem("refresh");
      return {
        ...state,
        access: null,
        refresh: null,
        isAuthenticated: false,
        user: null,
      };
    case PASSWORD_RESET_SUCCESS:
      return {
        ...state,
        status_code: null,
        message: "メールアドレスにリセット用メールを送信しました",
      };
    case PASSWORD_RESET_FAIL:
      return {
        ...state,
        status_code: payload,
        message: "パスワードリセットに失敗しました",
      };
    case PASSWORD_RESET_CONFIRM_SUCCESS:
      return {
        ...state,
        status_code: null,
        message: "パスワードリセットに成功しました。",
      };
    case PASSWORD_RESET_CONFIRM_FAIL:
      return {
        ...state,
        status_code: null,
        message: null,
      };
    // 読み込み中
    case SET_AUTH_LOADING:
      return {
        ...state,
        loading: true,
      };
    case REMOVE_AUTH_LOADING:
      return {
        ...state,
        loading: false,
      };
    default:
      return state;
  }
}
