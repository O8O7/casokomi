import { createTheme, ThemeProvider } from "@mui/material/styles";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import Box from "@mui/material/Box";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";


import { useRouter } from "next/router";
import { verify } from "../../../reduxs/actions/auth";
import { useDispatch, useSelector } from "react-redux";
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

const Verify = () => {
  const router = useRouter();
  const dispatch = useDispatch()
  const loading = useSelector((state) => state.auth.loading);
  const isActivate = useSelector((state) => state.active_reset.activate)
  const message = useSelector((state) => state.active_reset.message)
  const { uid, token } = router.query;

  const verifyAccount = async () => {
    await dispatch(verify(uid, token));
  };

  if (typeof window !== "undefined" && isActivate) {
    router.push("/")
  }

  return (
      <>
      <Head>
        <title>メールアドレス確認</title>
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
            メールアドレスを確認
            </Typography>
            <Box
              component="form"
              noValidate
              sx={{ mt: 1 }}
            >
              {loading ? (
                <Loader type="Oval" color="#F59E00" width={50} height={50} />
              ) : (
                <Button
                  type="submit"
                  fullWidth
                  variant="contained"
                  onClick={verifyAccount}
                  sx={{ mt: 3, mb: 2 }}
                >
                  確認
                </Button>
              )}
            </Box>
          </Box>
          {message &&
            <span>{message}</span>
          }
          <Copyright sx={{ mt: 8, mb: 4 }} />
        </Container>
      </ThemeProvider>
      </>
  );
};

export default Verify;
