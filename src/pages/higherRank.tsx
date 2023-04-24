import Head from "next/head";
import { useState, useEffect } from "react";

import { HigherRankFactorization } from "../components/HigherRankFactorization";

export default function higherRank() {

  return (
    <>
      <Head>
        <title>Create plan info</title>
        <meta name="description" content="Generated by create next app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main>
        <HigherRankFactorization />
      </main>
    </>
  );
}
