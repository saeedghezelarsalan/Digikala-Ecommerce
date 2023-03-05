import Head from "next/head";
import "../../styles/globals.css";
import Footer from "../components/Footer";
import { store } from "../feature/store";
import {AnimatePresence, AnimateSharedLayout} from 'framer-motion'

function MyApp({ Component, pageProps, router }) {

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
     
            <Component {...pageProps}  key={router.asPath} />
      <Footer />
    </div>

  );
}

export default store.withRedux(MyApp);