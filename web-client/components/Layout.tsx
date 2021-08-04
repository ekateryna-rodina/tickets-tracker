import Head from "next/head";
import React, { ReactNode } from "react";
import styles from "../styles/Layout.module.scss";
import Nav from "./Nav";

interface LayoutProps {
  children: ReactNode;
}
const Layout = ({ children }: LayoutProps) => {
  return (
    <>
      <Nav />
      <div className={`${styles.container} bg-light`}>
        <Head>
          <title>InOrder App</title>
          <meta name="description" content="Bug tracking app" />
          <link rel="icon" href="/favicon.ico" />
          <link
            rel="stylesheet"
            href="https://pro.fontawesome.com/releases/v5.10.0/css/all.css"
            integrity="sha384-AYmEC3Yw5cVb3ZcuHtOA93w35dYTsvhLPVnYs9eStHfGJvOvKxVfELGroGkvsg+p"
            crossOrigin="anonymous"
          />
        </Head>
        <main className={styles.main}>{children}</main>
        {/* <footer className={styles.footer}>
          <a
            href="https://vercel.com?utm_source=create-next-app&utm_medium=default-template&utm_campaign=create-next-app"
            target="_blank"
            rel="noopener noreferrer"
          >
            Powered by{" "}
            <span className={styles.logo}>
              {/* <Image src="/vercel.svg" alt="Vercel Logo" width={72} height={16} /> */}
        {/* </span>
          </a>
        </footer>` */}
      </div>
    </>
  );
};

export default Layout;
