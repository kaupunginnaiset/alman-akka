import type { NextPage } from "next";
import Head from "next/head";
import { Layout } from "../components/layout/Layout";
import { Frontpage } from "../components/pages/Homepage";

const Home: NextPage = () => {
  return (
    <Layout>
      <Head>
        <title>Tapahtumat - Alman Akka</title>
      </Head>
      <Frontpage />
    </Layout>
  );
};

export default Home;
