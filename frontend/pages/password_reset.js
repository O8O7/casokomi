import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { createTheme, ThemeProvider } from "@mui/material/styles";

import { useForm } from "react-hook-form";
import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useRouter } from "next/router";
import { reset_password } from "../reduxs/actions/auth";
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

export default function PasswordReset() {
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
  const status_code = useSelector((state) => state.auth.status_code);

  const [formData, setFormData] = useState({
    email: "",
  });

  const { email } = formData;

  const onChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const onSubmit = async (data) => {
    if (dispatch && dispatch !== null && dispatch !== undefined) {
      await dispatch(reset_password(data.email));
    }
  };

  if (typeof window !== "undefined" && isAuthenticated) {
    router.push("/");
  }

  return (
    <>
      <Head>
        <title>パスワードリセット</title>
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
              パスワードお忘れですか？
            </Typography>
            <Box
              component="form"
              onSubmit={handleSubmit(onSubmit)}
              noValidate
              sx={{ mt: 1, width: "100%" }}
            >
              <TextField
                {...register("email", {
                  required: "*入力してください",
                  minLength: {
                    value: 8,
                    message: "8文字以上入力してください",
                  },
                  maxLength: 100,
                  pattern: {
                    value:
                      /^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/,
                    message: "@を含めた半角英数字で入力してください",
                  },
                })}
                margin="normal"
                required
                fullWidth
                id="email"
                onChange={onChange}
                value={email}
                label="Email Address"
                name="email"
                autoComplete="email"
                autoFocus
              />
              <span style={{ color: "red" }}>{errors.email?.message}</span>
              {status_code && status_code.email && (
                <span style={{ color: "red" }}>{status_code.email[0]}</span>
              )}
              {/* <FormControlLabel
                control={<Checkbox value="remember" color="primary" />}
                label="ログイン情報を保存"
              /> */}
              {message && (
                <p style={{ color: "red", marginTop: "5px", marginBottom: 0 }}>
                  {message}
                </p>
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
                  送信
                </Button>
              )}
              <Grid container>
                <Grid item xs>
                  <Link href="/login">
                    <a>ログインはこちら</a>
                  </Link>
                </Grid>
                <Grid item>
                  {/* <Link href="#" variant="body2">
                    {"新規登録はこちら"}
                  </Link> */}
                  <Link href="/register">
                    <a>新規登録はこちら</a>
                  </Link>
                </Grid>
              </Grid>
            </Box>
          </Box>
          <Copyright sx={{ mt: 8, mb: 4 }} />
        </Container>
      </ThemeProvider>
    </>
  );
}
