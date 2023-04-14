import Head from "next/head";
import type { GetServerSideProps } from "next";
import { initializeStore } from "../store/store";

export default function SSG() {
  return (
    <>
      <Head>
        <title>Create plan SSG</title>
        <meta name="description" content="Generated by create next app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main>home</main>
    </>
  );
}

export const getServerSideProps: GetServerSideProps = async () => {
  const zustandStore = initializeStore();

  return {
    props: {
      initialZustandState: JSON.parse(JSON.stringify(zustandStore.getState())),
    },
  };
};