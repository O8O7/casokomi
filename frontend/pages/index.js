import { useRouter } from "next/router";
import Head from "next/head";
import Container from "@mui/material/Container";
import AvatarSlider from "../components/AvatorSlider/AvatarSlider";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { load_user } from "../reduxs/actions/auth";

import BasicTable from "../components/SymbolTable/BasicTable";
import Footer from "../components/Footer/Footer";

const Home = () => {
  const router = useRouter();
  const dispatch = useDispatch();
  const user = useSelector((state) => state.auth.user);
  useEffect(() => {
    if (!user) {
      dispatch(load_user());
    }
  }, []);

  if (router.isFallback) {
    return <div className="text-center">Loading...</div>;
  }

  return (
    <>
      <Head>
        <title>仮想通貨コミュニティーサイト</title>
        <meta name="description" content="Generated by create next app" />
      </Head>
      <AvatarSlider />
      <Container>
        <BasicTable />
      </Container>
      <Footer />
    </>
  );
};

export default Home;
