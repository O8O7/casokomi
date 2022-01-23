import style from "./AvatarSlider.module.css";
import * as React from "react";
import Avatar from "@mui/material/Avatar";
import Stack from "@mui/material/Stack";
import styled from "@emotion/styled";

import useSWR from "swr";

const fetcher = (...args) => fetch(...args).then((res) => res.json());

const CustomAvatar = styled(Avatar)({
  float: "left",
  margin: "auto 5px auto 0px",
});

const AvatarSlider = () => {
  const { data, error } = useSWR(
    `${process.env.NEXT_PUBLIC_API_URL}/api/auth/userlist/`,
    fetcher
  );

  if (error) return <div>Failed to load</div>;
  if (!data) return <div>Loading...</div>;

  const UserListMap = () => {
    return (
      <>
        {data.map((userlist) => (
          <div className={style.slide} key={userlist.name}>
            <CustomAvatar
              alt="Remy Sharp"
              src={userlist.image}
              sx={{ width: 60, height: 60 }}
            />
            <span className={style.ml2}>{userlist.name}</span>
            <br />
            <span className={style.ml2}>メンバー: 18000</span>
          </div>
        ))}
      </>
    );
  };
  return (
    <>
      <div className={style.row}>
        <div className={style.autoplaySlider}>
          <div className={style.slide}>
            <CustomAvatar
              alt="Remy Sharp"
              src="/public/default.png"
              sx={{ width: 60, height: 60 }}
            />
            <span className={style.ml2}>ジブラルタル</span>
            <br />
            <span className={style.ml2}>メンバー: 18000</span>
          </div>
          {data && <UserListMap />}
          <div className={style.slide}>
            <CustomAvatar
              alt="Remy Sharp"
              src="/public/default.png"
              sx={{ width: 60, height: 60 }}
            />
            <span className={style.ml2}>ジブラルタル</span>
            <br />
            <span className={style.ml2}>メンバー: 18000</span>
          </div>
          <div className={style.slide}>
            <CustomAvatar
              alt="Remy Sharp"
              src="/public/default.png"
              sx={{ width: 60, height: 60 }}
            />
            <span className={style.ml2}>ジブラルタル</span>
            <br />
            <span className={style.ml2}>メンバー: 18000</span>
          </div>
          <div className={style.slide}>
            <CustomAvatar
              alt="Remy Sharp"
              src="/public/default.png"
              sx={{ width: 60, height: 60 }}
            />
            <span className={style.ml2}>ジブラルタル</span>
            <br />
            <span className={style.ml2}>メンバー数</span>
          </div>
          <div className={style.slide}>
            <CustomAvatar
              alt="Remy Sharp"
              src="/public/default.png"
              sx={{ width: 60, height: 60 }}
            />
            <span className={style.ml2}>ジブラルタル</span>
            <br />
            <span className={style.ml2}>メンバー数</span>
          </div>
        </div>
      </div>
    </>
  );
};

export default AvatarSlider;
