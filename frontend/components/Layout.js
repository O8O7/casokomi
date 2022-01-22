import Head from "next/head";
import Header from "./Header/Header";

const Layout = (props) => {
  return (
    <>
      <Head>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>

      <Header title="仮想コミ!" />
      <div className="max-w-7x1 mx-auto px-8 py-6">{props.children}</div>
    </>
  );
};

export default Layout;
