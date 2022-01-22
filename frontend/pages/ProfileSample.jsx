import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useRouter } from "next/router";
// import { edit_profile } from "../reduxs/actions/auth";
import Loader from "react-loader-spinner";
import Head from "next/head";

import { Chip, Typography, Button, Grid } from "@mui/material";
import style from "./ProfileSample.module.css"


export default function Profile() {
  const dispatch = useDispatch();
  const router = useRouter();
  // const edit_profile_success = useSelector(
  //   (state) => state.auth.edit_profile_success
  // );
  const user = useSelector((state) => state.auth.user);
  const loading = useSelector((state) => state.auth.loading);
  const [image, setImage] = useState(null);

  const [formData, setFormData] = useState({
    name: "",
  });

  const { name } = formData;

  useEffect(() => {
    if (user) {
      setFormData({
        name: user.name,
      });
    }
  }, [user]);

  // 入力
  const onChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // // プロフィール編集
  // const onSubmit = async (e) => {
  //   e.preventDefault();

  //   if (dispatch && dispatch !== null && dispatch !== undefined && user) {
  //     await dispatch(edit_profile(user.id, name, image));
  //   }
  // };

  return (
    <>
      <Head>
        <title>プロフィール</title>
      </Head>
    <div className={style.m5}>
      <div className={style.container}>
        <div className={style.img}>
          {/* <img
            className={style.profileImage}
            alt="Robert"
            src="https://source.unsplash.com/random"
          /> */}
          <img
            className={style.profileImage}
            alt="Robert"
            src={user.image}
          />
        </div>
        <div className={style.content}>
          <Typography component="h1" variant="h4">
            {user.name}
          </Typography>
          <p>Director</p>
          <Button variant="outlined" color="primary" fullWidth>
            Message
          </Button>
          <Grid container justify="space-between">
            <Grid item>
              <p>Project Views</p>
            </Grid>
            <Grid item>
              <p>12870</p>
            </Grid>
          </Grid>
          <Grid container justify="space-between" className={style.details}>
            <Grid item>
              <p>Appreciation</p>
            </Grid>
            <Grid item>
              <p>142</p>
            </Grid>
          </Grid>
          <div>
            <Chip
              className={style.chip}
              color="primary"
              label="Tags"
              size="small"
            />
            <Chip
              className={style.chip}
              color="primary"
              label="Tags"
              size="small"
            />
            <Chip
              className={style.chip}
              color="primary"
              label="Tags"
              size="small"
            />
            <Chip
              className={style.chip}
              color="primary"
              label="Tags"
              size="small"
            />
            <Chip
              className={style.chip}
              color="primary"
              label="Tags"
              size="small"
            />
            <Chip
              className={style.chip}
              color="primary"
              label="Tags"
              size="small"
            />
          </div>
          <div className={style.about}>
            <Typography component="h3" variant="h6">
              About Me:
            </Typography>
            <p>
              "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
              eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut
              enim ad minim veniam, quis nostrud exercitation ullamco laboris
              nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in
              reprehenderit in voluptate velit esse cillum dolore eu fugiat
              nulla pariatur. Excepteur sint occaecat cupidatat non proident,
              sunt in culpa qui officia deserunt mollit anim id est laborum."
            </p>
          </div>
        </div>
      </div>
      </div>
    </>
  );
}