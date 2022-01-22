import { useRouter } from "next/router";
import Head from "next/head";
import Container from "@mui/material/Container";
import AvatarSlider from "../components/AvatorSlider/AvatarSlider";

import BasicTable from "../components/SymbolTable/BasicTable";

const Home = () => {
  const router = useRouter();

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
    </>
  );
};

export default Home;
