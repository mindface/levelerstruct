import Head from "next/head";
import { useState, useEffect } from "react";
import { EvaluationSetting } from "../components/EvaluationSetting";
import { EvaluationHistory } from "../components/EvaluationHistory";
import { getPath } from "../util/lib";

export default function Evaluation() {
  const [tab, setTab] = useState("setting");
  useEffect(() => {}, []);

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
          <button className="btn" onClick={() => tabAction("setting")}>
            setting
          </button>
          <button className="btn" onClick={() => tabAction("add")}>
            history
          </button>
        </div>
        {tab === "setting" && <EvaluationSetting type={tab} />}
        {tab === "view" && <EvaluationHistory />}
      </main>
    </>
  );
}
