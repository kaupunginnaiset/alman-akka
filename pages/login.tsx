import type { NextPage } from "next";
import Head from "next/head";
import { Layout } from "../components/layout/Layout";
import { Loginpage } from "../components/pages/Loginpage";

const Login: NextPage = () => {
  return (
    <Layout>
      <Head>
        <title>Tapahtumat - Alman Akka</title>
      </Head>
      <Loginpage />
    </Layout>
  );
};

export default Login;
