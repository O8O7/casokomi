import { useSelector } from "react-redux";
import { useRouter } from "next/router";
import Head from "next/head";
import Link from "next/link";

import { Typography, Button } from "@mui/material";
import style from "./Profile.module.css";

export default function Profile() {
  const router = useRouter();
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);
  const user = useSelector((state) => state.auth.user);

  if (typeof window !== "undefined" && !isAuthenticated) {
    router.push("/");
  }

  return (
    <>
      <Head>
        <title>プロフィール</title>
      </Head>
      {isAuthenticated && (
        <div className={style.m5}>
          <div className={style.container}>
            <div className={style.img}>
              <img
                className={style.profileImage}
                alt={user.name}
                src={user.image}
              />
            </div>
            <div className={style.content}>
              <Typography component="h1" variant="h4">
                {user.name}
              </Typography>
              <div className={style.about}>
                <Typography component="h3" variant="h6">
                  About Me:
                </Typography>
                <p>{user.introduction}</p>
              </div>
              <br />
              <Button variant="outlined" color="primary" fullWidth>
                <Link href="/edit_profile">
                  <a>プロフィール設定</a>
                </Link>
              </Button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
