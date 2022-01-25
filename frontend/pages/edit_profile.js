import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useRouter } from "next/router";
import { Typography, Button } from "@mui/material";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import { edit_profile } from "../reduxs/actions/auth";
import Loader from "react-loader-spinner";
import Head from "next/head";
import Link from "next/link";
import style from "./edit_profile.module.css";
import { useForm } from "react-hook-form";
import { CHANGE_PROFILE_FALSE } from "../reduxs/actions/types";

const EditProfile = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const dispatch = useDispatch();
  const router = useRouter();
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);
  const message = useSelector((state) => state.active_reset.message);
  const edit_profile_success = useSelector(
    (state) => state.active_reset.edit_profile
  );
  const user = useSelector((state) => state.auth.user);
  const loading = useSelector((state) => state.auth.loading);
  const [image, setImage] = useState(null);

  const [formData, setFormData] = useState({
    name: "",
    introduction: "",
  });

  const { name, introduction } = formData;

  //   認証済みでなければトップページへ遷移する
  if (typeof window !== "undefined" && !isAuthenticated) {
    router.push("/");
  }

  // プロフィールの編集に成功したらプロフィール画面に遷移
  if (typeof window !== "undefined" && edit_profile_success) {
    router.push("/profile");
    dispatch({
      type: CHANGE_PROFILE_FALSE,
    });
  }

  useEffect(() => {
    if (user) {
      setFormData({
        image: user.image,
        name: user.name,
        introduction: user.introduction,
      });
    }
  }, [user]);

  // 入力
  const onChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const onSubmit = async (data) => {
    if (dispatch && dispatch !== null && dispatch !== undefined && user) {
      await dispatch(edit_profile(data.name, image, data.introduction));
    }
  };

  return (
    <>
      <Head>
        <title>プロフィール編集</title>
      </Head>
      {isAuthenticated && (
        <>
          <div className={style.m5}>
            <div className={style.container}>
              <form>
                {/* <form onSubmit={handleSubmit(onSubmit)}> */}
                <div className={style.img}>
                  <img
                    className={style.profileImage}
                    id="image"
                    name="image"
                    alt={user.name}
                    src={user.image}
                  />
                </div>
                <br />
                <input
                  type="file"
                  onChange={(e) => setImage(e.target.files[0])}
                />
                <div className={style.content}>
                  <br />
                  <Box
                    sx={{
                      width: 500,
                      maxWidth: "100%",
                    }}
                  >
                    <TextField
                      {...register("name", {
                        minLength: {
                          value: 2,
                          message: "2文字以上入力してください",
                        },
                        maxLength: {
                          value: 30,
                          message: "30文字以下で入力してください",
                        },
                      })}
                      fullWidth
                      label="username"
                      id="name"
                      name="name"
                      onChange={onChange}
                      value={name}
                    />
                    <span style={{ color: "red" }}>{errors.name?.message}</span>
                  </Box>
                  <div className={style.about}>
                    <Typography component="h3" variant="h6">
                      About Me:
                    </Typography>
                    <br />
                    <TextField
                      {...register("introduction", {
                        minLength: {
                          value: 2,
                          message: "2文字以上入力してください",
                        },
                        maxLength: {
                          value: 100,
                          message: "100文字以下で入力してください",
                        },
                      })}
                      fullWidth
                      id="introduction"
                      label="自己紹介"
                      multiline
                      rows={4}
                      name="introduction"
                      onChange={onChange}
                      value={introduction}
                    />
                    <span style={{ color: "red" }}>
                      {errors.introduction?.message}
                    </span>
                  </div>
                  {message && <span style={{ color: "red" }}>{message}</span>}
                  {loading ? (
                    <Loader
                      type="Oval"
                      color="#F59E00"
                      width={50}
                      height={50}
                    />
                  ) : (
                    <Button
                      type="submit"
                      variant="outlined"
                      color="primary"
                      fullWidth
                      onClick={handleSubmit(onSubmit)}
                    >
                      設定を保存
                    </Button>
                  )}
                </div>
              </form>
            </div>
          </div>
        </>
      )}
    </>
  );
};

export default EditProfile;
