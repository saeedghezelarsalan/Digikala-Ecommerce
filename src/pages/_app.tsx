import Head from "next/head";
import "../../styles/globals.css";
import Footer from "../components/Footer";
import { store } from "@/feature/store";
//@ts-ignore
import {ToastContainer, toast} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';import React from "react";

function MyApp({ Component, pageProps, router }:any) {

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

        <ToastContainer
          position="top-right"
          autoClose={2500}
          style={{width: "290px"}}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
          toastStyle={{backgroundColor: "#FFC300", color: "black", fontSize: "16px"}}
        />
    </div>

  );
}

export default store.withRedux(MyApp);