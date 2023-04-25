import Head from "next/head";

import { InfoStructureFormation } from "../components/InfoStructureFormation";

export default function structureFormation() {

  return (
    <>
      <Head>
        <title>Create plan info structure formation</title>
        <meta name="description" content="Generated by create next app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main>
        <InfoStructureFormation />
      </main>
    </>
  );
}
