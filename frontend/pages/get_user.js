import { useSelector } from "react-redux";
import { useRouter } from "next/router";
import Head from "next/head";
import Link from "next/link";
import useSWR from "swr";

import { Typography, Button } from "@mui/material";
import style from "./Profile.module.css";

const fetcher = (...args) => fetch(...args).then((res) => res.json());

export default function Profile() {
  const router = useRouter();
  const { user_id } = router.query;
  const user = useSelector((state) => state.auth.user);
  const { data, error } = useSWR(
    `${process.env.NEXT_PUBLIC_API_URL}/api/auth/user/${user_id}/`,
    fetcher
  );

  if (error) return <div>Failed to load</div>;
  if (!data) return <div>Loading...</div>;

  return (
    <>
      <Head>
        <title>プロフィール</title>
      </Head>
      <div className={style.m5}>
        <div className={style.container}>
          <div className={style.img}>
            <img
              className={style.profileImage}
              alt={data.name}
              src={data.image}
            />
          </div>
          <div className={style.content}>
            <Typography component="h1" variant="h4">
              {data.name}
            </Typography>
            <div className={style.about}>
              <Typography component="h3" variant="h6">
                About Me:
              </Typography>
              <p>{data.introduction}</p>
            </div>
            {user && data.id === user.id && (
              <Button variant="outlined" color="primary" fullWidth>
                <Link href="/edit_profile">
                  <a>プロフィール設定</a>
                </Link>
              </Button>
            )}
          </div>
        </div>
      </div>
    </>
  );
}
