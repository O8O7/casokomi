import style from "./AvatarSlider.module.css";
import * as React from "react";
import Avatar from "@mui/material/Avatar";
import Stack from "@mui/material/Stack";
import styled from "@emotion/styled";

const CustomAvatar = styled(Avatar)({
  float: "left",
  margin: "auto 5px auto 0px",
});

const AvatarSlider = () => {
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
