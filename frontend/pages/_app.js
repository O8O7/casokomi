import Head from "next/head";
import { ThemeProvider } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import { CacheProvider } from "@emotion/react";
import createEmotionCache from "../styles/createEmotionCache";
import { Provider } from "react-redux";
import { useStore } from "../reduxs/store";
import Layout from "../components/Layout";
import { CookiesProvider } from "react-cookie";

import "/styles/globals.css";
import theme from "../styles/theme";

// Client-side cache, shared for the whole session of the user in the browser.
const clientSideEmotionCache = createEmotionCache();

function MyApp(props) {
  const { Component, emotionCache = clientSideEmotionCache, pageProps } = props;
  const store = useStore(pageProps.initialReduxState);

  return (
    <Provider store={store}>
      <CacheProvider value={emotionCache}>
        <CookiesProvider>
          <Head>
            <title>MUI5 Nextjs</title>
            <meta
              name="viewport"
              content="initial-scale=1, width=device-width"
            />
          </Head>
          <ThemeProvider theme={theme}>
            <Layout>
              <Component {...pageProps} />
            </Layout>
          </ThemeProvider>
        </CookiesProvider>
      </CacheProvider>
    </Provider>
  );
}

export default MyApp;
