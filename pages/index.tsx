import type { NextPage } from "next";
import Head from "next/head";
import styles from "../styles/Home.module.css";

import data from "../data/";

const Home: NextPage = () => {
  return (
    <div className={styles.container}>
      <Head>
        <title>Alman Akka</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>
        <h1 className={styles.title}>Alman Akka</h1>
        {data.map((item, index) => (
          <p key={item.id}>
            {index + 1}. {item.title}
          </p>
        ))}
      </main>
    </div>
  );
};

export default Home;
