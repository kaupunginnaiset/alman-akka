import type { NextPage } from "next";
import Head from "next/head";
import { Layout } from "../components/layout/Layout";
import { LoginPage } from "../components/pages/LoginPage";

const Login: NextPage = () => {
  return (
    <Layout>
      <Head>
        <title>Kirjaudu sisään - Alman Akka</title>
      </Head>
      <LoginPage />
    </Layout>
  );
};

export default Login;
