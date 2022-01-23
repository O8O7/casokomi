import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useRouter } from "next/router";
import { edit_profile } from "../reduxs/actions/auth";
import Loader from "react-loader-spinner";
import Head from "next/head";

const Profile = () => {
  const dispatch = useDispatch();
  const router = useRouter();
  const edit_profile_success = useSelector(
    (state) => state.auth.edit_profile_success
  );
  const user = useSelector((state) => state.auth.user);
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);
  const loading = useSelector((state) => state.auth.loading);
  const [image, setImage] = useState(null);

  if (typeof window !== "undefined" && !isAuthenticated) {
    router.push("/");
  }

  console.log(user);

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

  // プロフィール編集
  const onSubmit = async (e) => {
    e.preventDefault();

    if (dispatch && dispatch !== null && dispatch !== undefined && user) {
      await dispatch(edit_profile(user.id, name, image));
    }
  };

  // プロフィール編集成功
  if (edit_profile_success) {
    router.push("/");
  }

  return (
    <>
      <Head>
        <title>FullStackChannel | プロフィール</title>
      </Head>
      {isAuthenticated && (
        <>
          <div>プロフィール</div>
          <form onSubmit={onSubmit}>
            <div htmlFor="name">名前</div>
            <input
              type="text"
              name="name"
              placeholder="フルスタックチャンネル"
              onChange={onChange}
              value={name}
              required
            />
            <div>
              <div>プロフィール画像</div>
              <input
                type="file"
                onChange={(e) => setImage(e.target.files[0])}
              />
            </div>

            <div>
              {loading ? (
                <Loader type="Oval" color="#F59E00" width={50} height={50} />
              ) : (
                <button type="submit">送信</button>
              )}
            </div>
          </form>
        </>
      )}
    </>
  );
};

export default Profile;
