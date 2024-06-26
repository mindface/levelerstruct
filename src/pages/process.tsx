import Head from "next/head";
import { useState, useEffect } from "react";

import { ProcessListView } from "../components/ProcessListView";
import { ProcessMake } from "../components/ProcessMake";
import { getPath } from "../util/lib";

export default function Process() {
  const [tab, setTab] = useState("view");
  useEffect(() => {}, []);

  const tabAction = (tabId: string) => {
    setTab(tabId);
  };

  const chnageTab = () => {
    setTab("list");
  };

  return (
    <>
      <Head>
        <title>{getPath()}</title>
        <meta name="description" content="Generated by create next app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main>
        <div className="btn-area">
          <button className="btn" onClick={() => tabAction("view")}>
            list
          </button>
          <button className="btn" onClick={() => tabAction("add")}>
            add
          </button>
        </div>
        {tab === "view" && <ProcessListView />}
        {tab === "add" && <ProcessMake type={tab} removeTab={chnageTab} />}
      </main>
    </>
  );
}
