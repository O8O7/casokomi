import { GET_COIN_SUCCESS, GET_COIN_FAIL } from "../actions/types";

const initialState = {
  coin_info: null,
  isGet: false,
};

export default function (state = initialState, action) {
  const { type, payload } = action;

  switch (type) {
    case GET_COIN_SUCCESS:
      return {
        coin_info: payload,
        isGet: true,
      };
    case GET_COIN_FAIL:
      return {
        coin_info: null,
        isGet: false,
      };
    default:
      return state;
  }
}
