import Head from "next/head";
import "../../styles/globals.css";
import Footer from "../components/Footer";
import { store } from "../feature/store";
function MyApp({ Component, pageProps }) {

  return (
      <div className="relative">
      <Head>
        <title></title>
        <meta name="theme-color" content="#673AB6" />
        <link
          rel="shortcut icon"
          href="https://iili.io/hufgQj.th.png"
        />
      </Head>
      <Component {...pageProps} />
      <Footer />
    </div>
  );
}

export default store.withRedux(MyApp);