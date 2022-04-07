import type { NextPage } from "next";
import Head from "next/head";
import { Layout } from "../components/layout/Layout";
import { MyEventsPage } from "../components/pages/MyEventsPage";

const MyEvents: NextPage = () => {
  return (
    <Layout>
      <Head>
        <title>Omat tapahtumat - Alman Akka</title>
      </Head>
      <MyEventsPage />
    </Layout>
  );
};

export default MyEvents;
