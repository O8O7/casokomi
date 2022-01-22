import { useRouter } from "next/router";
import { verify } from "../../reduxs/actions/auth";
import { useSelector } from "react-redux";

const Verify = () => {
  const router = useRouter();
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated)
  const { uid, token } = router.query;

  // window.addEventListener

  const verifyAccount = () => {
    verify(uid, token);
  };

  if (isAuthenticated) {
    router.push("/")
  }

  return (
      <>
        <h1>メールアドレスを確認</h1>
        <button onClick={verifyAccount}>確認</button>
      </>
  );
};

export default Verify;
