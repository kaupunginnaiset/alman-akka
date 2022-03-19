import type { NextPage } from "next";
import Head from "next/head";
import { Layout } from "../components/layout/Layout";
import styles from "../styles/Home.module.css";

import data from "../data/";

const Home: NextPage = () => {
  return (
    <Layout>
      <Head>
        <title>Alman Akka</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <h1 className={styles.title}>Alman Akka</h1>
      <div>
        {data.map((item, index) => (
          <p key={item.id}>
            {index + 1}. {item.title}
          </p>
        ))}
      </div>
    </Layout>
  );
};

export default Home;
