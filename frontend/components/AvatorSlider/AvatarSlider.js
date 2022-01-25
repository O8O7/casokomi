import style from "./AvatarSlider.module.css";
import Avatar from "@mui/material/Avatar";
import styled from "@emotion/styled";
import Link from "next/link";
import useSWR from "swr";

const fetcher = (...args) => fetch(...args).then((res) => res.json());

const CustomAvatar = styled(Avatar)({
  float: "left",
  margin: "auto 5px auto 0px",
});

const AvatarSlider = () => {
  const { data, error } = useSWR(
    `${process.env.NEXT_PUBLIC_API_URL}/api/auth/random/`,
    fetcher
  );

  if (error) return <div>Failed to load</div>;
  if (!data) return <div>Loading...</div>;

  const UserListMap = () => {
    return (
      <>
        {data.map((userlist, i) => (
          <div key={"avatar_" + i}>
            <Link href={`/get_user/?user_id=${userlist.id}`}>
              <a>
                <div className={style.slide}>
                  <CustomAvatar
                    alt="Remy Sharp"
                    src={userlist.image}
                    sx={{ width: 60, height: 60 }}
                  />
                  <span className={style.ml2}>名前</span>
                  <br />
                  <span className={style.name}>{userlist.name}</span>
                </div>
              </a>
            </Link>
          </div>
        ))}
      </>
    );
  };
  return (
    <>
      <div className={style.row}>
        <div className={style.autoplaySlider}>{data && <UserListMap />}</div>
      </div>
    </>
  );
};

export default AvatarSlider;
