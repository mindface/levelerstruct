import Head from "next/head";
import { useState } from "react";

import { OrderListView } from "../components/OrderListView";
import { OrderMake } from "../components/OrderMake";
import { OrderSetting } from "../components/OrderSetting";
import { OrderHistory } from "../components/OrderHistory";
import { getPath } from "../util/lib";

export default function Order() {
  const [tab, setTab] = useState("add");

  const tabAction = (tabId: string) => {
    setTab(tabId);
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
          <button className="btn" onClick={() => tabAction("list")}>
            list
          </button>
          <button className="btn" onClick={() => tabAction("add")}>
            add order
          </button>
          <button className="btn" onClick={() => tabAction("setting")}>
            setting
          </button>
          <button className="btn" onClick={() => tabAction("history")}>
            history
          </button>
        </div>
        {tab === "list" && <OrderListView />}
        {tab === "add" && <OrderMake />}
        {tab === "setting" && <OrderSetting type={tab} />}
        {tab === "history" && <OrderHistory />}
      </main>
    </>
  );
}
