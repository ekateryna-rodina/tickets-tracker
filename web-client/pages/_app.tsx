import { GetStaticProps, GetStaticPropsContext } from "next";
import type { AppProps } from "next/app";
import Layout from "../components/Layout";
import "../styles/bootstrap/bootstrap.scss";
import "../styles/colors.scss";
import "../styles/globals.scss";
function MyApp({ Component, pageProps }: AppProps) {
  return (
    <Layout>
      <Component {...pageProps} />
    </Layout>
  );
}
export const getStaticProps: GetStaticProps = async (
  context: GetStaticPropsContext
) => {
  console.log("here");
  const res = await fetch(
    `https://api.unsplash.com/search/photos/?page=1&per_page=10&query=avatar&client_id=${process.env.UNSPLASH_ACCESS_KEY}`
  );
  const data = await res.json();

  if (!data) {
    return {
      notFound: true,
    };
  }

  return {
    props: { data }, // will be passed to the page component as props
  };
};
export default MyApp;
