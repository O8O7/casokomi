import {
  ACTIVATION_SUCCESS,
  ACTIVATION_FAIL,
  EDIT_PROFILE_SUCCESS,
  EDIT_PROFILE_FAIL,
  CHANGE_PROFILE_FALSE,
} from "../actions/types";

const initialState = {
  activate: null,
  edit_profile: false,
  message: null,
  res_data: null,
};

export default function (state = initialState, action) {
  const { type, payload } = action;

  switch (type) {
    case ACTIVATION_FAIL:
      return {
        // // ...state,
        // activate: null,
        // edit_profile: false,
        message: "メールアドレス確認に失敗しました。再度登録をお願いします。",
        // res_data: null,
      };
    case ACTIVATION_SUCCESS:
      return {
        // ...state,
        activate: true,
        // edit_profile: false,
        message: "メールアドレスを確認しました。",
        // res_data: null,
      };
    case EDIT_PROFILE_SUCCESS:
      return {
        // ...state,
        // activate: null,
        edit_profile: true,
        message: "プロフィール編集に成功しました",
        // res_data: null,
      };
    case EDIT_PROFILE_FAIL:
      return {
        // activate: null,
        // edit_profile: false,
        edit_profile: false,
        message: null,
      };
    case CHANGE_PROFILE_FALSE:
      return {
        // activate: null,
        // edit_profile: false,
        edit_profile: false,
      };
    default:
      return state;
  }
}
