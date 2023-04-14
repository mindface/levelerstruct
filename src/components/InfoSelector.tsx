import { useEffect } from "react";
import { FieldInput } from "./parts/FieldInput";
import { useStoreConnect } from "../store/storeConnect"

export function InfoSelector() {
  const { connects, workerInfo, getWorker } = useStoreConnect((store) => ({
    connects: store.connects,
    workerInfo: store.workerInfo,
    getWorker: store.getWorker,
  }));

  useEffect(() => {
    getWorker();
  },[getWorker]);
 
  useEffect(() => {
    console.log(connects);
  },[connects]);

  return (
    <div className="content">
      <div className="evaluation">
        目的に対する条件の設定
        <div className="">
        userId | { workerInfo.userId }
        case | { workerInfo.case }
        </div>
      </div>
      <div className="fields p-2">
        <div className="field pb-1">
          <FieldInput
            type="number"
            id="execution"
            label="実行数"
            eventChange={(value: string) => { }}
          />
          <FieldInput
            type="number"
            id="purposeAchieved"
            label="目的達成数"
            eventChange={(value: string) => { }}
          />
          <FieldInput
            type="range"
            id="purposeAchieved"
            label="目的"
            eventChange={(value: string) => { }}
          />
        </div>
        <div className="field">
          結果モジューリング
        </div>
      </div>
    </div>
  );
}
