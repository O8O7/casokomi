import axios from "axios";
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
  ACTIVATION_SUCCESS,
  ACTIVATION_FAIL,
  LOGOUT,
  SET_AUTH_LOADING,
  REMOVE_AUTH_LOADING,
  //   GET_COIN_SUCCESS,
  //   GET_COIN_FAIL,
} from "./types";

export const load_user = () => async (dispatch) => {
  dispatch({
    type: SET_AUTH_LOADING,
  });

  await axios
    .get(`${process.env.NEXT_PUBLIC_API_URL}/api/auth/users/me/`, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `JWT ${localStorage.getItem("access")}`,
        Accept: "application/json",
      },
    })
    .then((res) => {
      //  console.log(`user.id ${res.data.id}`);
      //  11
      dispatch({
        type: USER_LOADED_SUCCESS,
        payload: res.data,
      });
    })
    .catch((err) => {
      console.log(err);
      dispatch({
        type: USER_LOADED_FAIL,
      });
    });

  dispatch({
    type: REMOVE_AUTH_LOADING,
  });
};

export const checkAuthenticated = () => async (dispatch) => {
  dispatch({
    type: SET_AUTH_LOADING,
  });

  if (localStorage.getItem("access")) {
    const config = {
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
    };

    const body = JSON.stringify({ token: localStorage.getItem("access") });

    try {
      const res = await axios.post(
        `${process.env.NEXT_PUBLIC_API_URL}/api/auth/jwt/verify/`,
        body,
        config
      );

      if (res.data.code !== "token_not_valid") {
        dispatch({
          type: AUTHENTICATED_SUCCESS,
        });
      } else {
        dispatch({
          type: AUTHENTICATED_FAIL,
        });
      }
    } catch (err) {
      dispatch({
        type: AUTHENTICATED_FAIL,
      });
    }
  } else {
    dispatch({
      type: AUTHENTICATED_FAIL,
    });
  }

  dispatch({
    type: REMOVE_AUTH_LOADING,
  });
};

export const login = (email, password) => async (dispatch) => {
  dispatch({
    type: SET_AUTH_LOADING,
  });

  await axios
    .post(
      `${process.env.NEXT_PUBLIC_API_URL}/api/auth/jwt/create/`,
      {
        email: email,
        password: password,
      },
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    )
    .then((res) => {
      // console.log(res.data);
      // {refresh: 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJ0b2tlbl90e…oxMH0.WVI8h0izMORqT-Cgy72_QjJXkKwKojEvdi3ScQiNTFw', access: 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJ0b2tlbl90e…jEwfQ.a5emR25ac-foKevRYBh-ooogqnHJNEbqK8sA1CKPzvg'}access: "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJ0b2tlbl90eXBlIjoiYWNjZXNzIiwiZXhwIjoxNjQyNTAxNjI4LCJqdGkiOiI4MmM1MWQ5OGFmMjQ0YTk3OTZjNjMzZTcxMGViNDJhNiIsInVzZXJfaWQiOjEwfQ.a5emR25ac-foKevRYBh-ooogqnHJNEbqK8sA1CKPzvg"refresh: "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJ0b2tlbl90eXBlIjoicmVmcmVzaCIsImV4cCI6MTY0Mjc1NzIyOCwianRpIjoiOWI1MDI3ZmViMThkNGY4ZGFmNTljY2FjNGUwYmEwNWMiLCJ1c2VyX2lkIjoxMH0.WVI8h0izMORqT-Cgy72_QjJXkKwKojEvdi3ScQiNTFw"[[Prototype]]: Object
      localStorage.setItem("access", res.access);
      localStorage.setItem("refresh", res.refresh);
      dispatch({
        type: LOGIN_SUCCESS,
        payload: res.data,
      });
      dispatch(load_user());
    })
    .catch((err) => {
      console.log(err);
      dispatch({
        type: LOGIN_FAIL,
      });
    });

  dispatch({
    type: REMOVE_AUTH_LOADING,
  });
};

export const login_not_set_accesstoken =
  (email, password) => async (dispatch) => {
    dispatch({
      type: SET_AUTH_LOADING,
    });

    await axios
      .post(
        `${process.env.NEXT_PUBLIC_API_URL}/api/auth/jwt/create/`,
        {
          email: email,
          password: password,
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      )
      .then((res) => {
        dispatch({
          type: LOGIN_SUCCESS,
          payload: res.data,
        });
        dispatch(load_user());
      })
      .catch((err) => {
        console.log(err);
        dispatch({
          type: LOGIN_FAIL,
        });
      });

    dispatch({
      type: REMOVE_AUTH_LOADING,
    });
  };

export const register =
  (name, email, password, re_password) => async (dispatch) => {
    dispatch({
      type: SET_AUTH_LOADING,
    });

    await axios
      .post(
        `${process.env.NEXT_PUBLIC_API_URL}/api/auth/users/`,
        {
          name: name,
          email: email,
          password: password,
          re_password: re_password,
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      )
      .then((res) => {
        console.log(res);
        dispatch({
          type: SIGNUP_SUCCESS,
          payload: res.data,
        });
      })
      .catch((err) => {
        console.log(err);
        dispatch({
          type: SIGNUP_FAIL,
        });
      });

    dispatch({
      type: REMOVE_AUTH_LOADING,
    });
  };

export const verify = (uid, token) => async (dispatch) => {
  dispatch({
    type: SET_AUTH_LOADING,
  });

  const config = {
    headers: {
      "Content-Type": "application/json",
    },
  };

  const body = JSON.stringify({ uid, token });

  try {
    await axios.post(
      `${process.env.NEXT_PUBLIC_API_URL}/api/auth/users/activation/`,
      body,
      config
    );

    dispatch({
      type: ACTIVATION_SUCCESS,
    });
  } catch (err) {
    dispatch({
      type: ACTIVATION_FAIL,
    });
  }

  dispatch({
    type: REMOVE_AUTH_LOADING,
  });
};

export const reset_password = (email) => async (dispatch) => {
  dispatch({
    type: SET_AUTH_LOADING,
  });

  const config = {
    headers: {
      "Content-Type": "application/json",
    },
  };

  const body = JSON.stringify({ email });

  try {
    await axios.post(
      `${process.env.NEXT_PUBLIC_API_URL}/api/auth/users/reset_password/`,
      body,
      config
    );

    dispatch({
      type: PASSWORD_RESET_SUCCESS,
    });
  } catch (err) {
    dispatch({
      type: PASSWORD_RESET_FAIL,
    });
  }

  dispatch({
    type: REMOVE_AUTH_LOADING,
  });
};

export const reset_password_confirm =
  (uid, token, new_password, re_new_password) => async (dispatch) => {
    dispatch({
      type: SET_AUTH_LOADING,
    });

    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };

    const body = JSON.stringify({ uid, token, new_password, re_new_password });

    try {
      await axios.post(
        `${process.env.NEXT_PUBLIC_API_URL}/api/auth/users/reset_password_confirm/`,
        body,
        config
      );

      dispatch({
        type: PASSWORD_RESET_CONFIRM_SUCCESS,
      });
    } catch (err) {
      dispatch({
        type: PASSWORD_RESET_CONFIRM_FAIL,
      });
    }

    dispatch({
      type: REMOVE_AUTH_LOADING,
    });
  };

export const logout = () => (dispatch) => {
  dispatch({
    type: LOGOUT,
  });
};

// プロフィール編集
export const edit_profile = (id, name, image) => async (dispatch) => {
  dispatch({
    type: SET_AUTH_LOADING,
  });

  const formData = new FormData();
  formData.append("name", name);
  if (image) {
    formData.append("image", image);
  }

  token = localStorage.getItem("access");
  if (token) {
    axios
      .patch(
        `${process.env.NEXT_PUBLIC_API_URL}/api/auth/users/${id}/`,
        formData,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `JWT ${token}`,
          },
        }
      )
      .then((res) => {
        console.log(res);
      })
      .catch((err) => {
        console.log(err);
      });
  }

  dispatch({
    type: REMOVE_AUTH_LOADING,
  });
};
