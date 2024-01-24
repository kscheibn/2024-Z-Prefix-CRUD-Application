import { Provider } from "next-auth/client";
import Head from "next/head";
import Layout from "../components/layout/Layout";
import "../styles/globals.css";

function App({ Component, pageProps }) {
  return (
    <Provider session={pageProps.session}>
      <Head>
        <title>Item Catalog</title>
        <meta name="description" content="CRUD Application" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </Provider>
  );
}

export default App;
