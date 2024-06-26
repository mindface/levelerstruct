import Head from "next/head";

import { ImageMakerDefinition } from "../components/ImageMakerDefinition";
import { getPath } from "../util/lib";

export default function MovieReaderDefinition() {
  return (
    <>
      <Head>
        <title>{getPath()}</title>
        <meta name="description" content="Generated by create next app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main>
        <div className="btn-area">asdfg</div>
        <ImageMakerDefinition />
      </main>
    </>
  );
}
