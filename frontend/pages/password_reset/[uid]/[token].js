import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import Box from "@mui/material/Box";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { useForm } from "react-hook-form";
import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useRouter } from "next/router";
import { reset_password_confirm } from "../../../reduxs/actions/auth";
import Loader from "react-loader-spinner";
import Head from "next/head";
import Link from "next/link";

function Copyright(props) {
  return (
    <Typography
      variant="body2"
      color="text.secondary"
      align="center"
      {...props}
    >
      {"Copyright © "}
      <Link color="inherit" href="https://fintechs.site/">
        Shun Sakamoto
      </Link>{" "}
      {new Date().getFullYear()}
      {"."}
    </Typography>
  );
}

const theme = createTheme();

export default function Login() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const dispatch = useDispatch();
  const router = useRouter();
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);
  const loading = useSelector((state) => state.auth.loading);
  const message = useSelector((state) => state.auth.message);
  const [formData, setFormData] = useState({
    password: "",
    re_password: "",
  });
  const { uid, token } = router.query;

  const { password, re_password } = formData;

  const onChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const onSubmit = async (data) => {
    console.log(uid, token, data.password, data.re_password);
    await dispatch(
      reset_password_confirm(uid, token, data.password, data.re_password)
    );
  };

  if (typeof window !== "undefined" && isAuthenticated) {
    router.push("/");
  }

  return (
    <>
      <Head>
        <title>パスワード再設定</title>
      </Head>
      <ThemeProvider theme={theme}>
        <Container component="main" maxWidth="xs">
          <CssBaseline />
          <Box
            sx={{
              marginTop: 8,
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
              <LockOutlinedIcon />
            </Avatar>
            <Typography component="h1" variant="h5">
              パスワード再設定
            </Typography>
            <Box
              component="form"
              onSubmit={handleSubmit(onSubmit)}
              noValidate
              sx={{ mt: 1 }}
            >
              <TextField
                {...register("password", {
                  required: "*入力してください",
                  minLength: {
                    value: 8,
                    message: "8文字以上入力してください",
                  },
                  maxLength: 100,
                })}
                margin="normal"
                fullWidth
                type="password"
                id="password"
                onChange={onChange}
                value={password}
                label="Password"
                name="password"
                autoComplete="password"
                autoFocus
              />
              <span style={{ color: "red" }}>{errors.password?.message}</span>
              <TextField
                {...register("re_password", {
                  required: "*入力してください",
                  minLength: {
                    value: 8,
                    message: "8文字以上入力してください",
                  },
                  maxLength: 100,
                  validate: {
                    value: (value) =>
                      password === value || "パスワードが一致しません",
                  },
                })}
                margin="normal"
                fullWidth
                type="password"
                onChange={onChange}
                value={re_password}
                name="re_password"
                label="Retype Password"
                id="re_password"
                autoComplete="current-password"
              />
              <span style={{ color: "red" }}>
                {errors.re_password?.message}
              </span>
              <br />
              {message && (
                <>
                  <span>{message}</span>
                  <br />
                  <Link href="/">
                    <a style={{ color: "blue" }}>ホームに戻る</a>
                  </Link>
                </>
              )}
              {loading ? (
                <Loader type="Oval" color="#F59E00" width={50} height={50} />
              ) : (
                <Button
                  type="submit"
                  fullWidth
                  variant="contained"
                  sx={{ mt: 3, mb: 2 }}
                >
                  変更
                </Button>
              )}
            </Box>
          </Box>
          <Copyright sx={{ mt: 8, mb: 4 }} />
        </Container>
      </ThemeProvider>
    </>
  );
}
