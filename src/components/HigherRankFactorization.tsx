import { useEffect, useRef, useState, DragEvent } from "react";
import { useStore, Task } from "../store/store";
import { FieldInput } from "./parts/FieldInput";
import { ProcessCards } from "./ProcessCards";
import { useStoreProcess, Process } from "../store/storeProcess"
import { BaseDialog, ForwardRefHandle } from "./BaseDialog";

interface ClusterTask extends Task {
  textLabel: string;
  limitPeriod: string;
  categoryRatioWithinPlan: string;
  similarCategoryRatio: string;
  processItem: Process[]
}

type ClusterTaskKey = "textLabel" | "limitPeriod" | "categoryRatioWithinPlan" | "similarCategoryRatio" 

export function HigherRankFactorization() {
  const { tasks, getTask } = useStore((store) => ({
    tasks: store.tasks,
    getTask: store.getTask,
    addTask: store.addTask,
    updateTask: store.updateTask,
  }));
  const { process, getProcess } = useStoreProcess((store) => ({
    process: store.process,
    getProcess: store.getProcess,
  }));

  const [conceptualizations,setConceptualizations] = useState<ClusterTask[]>([]);
  const [conceptualizationsPlan,setConceptualizationsPlan] = useState<ClusterTask[]>([]);
  const [viewSwitch,setViewSwitch] = useState(false);
  const element = useRef<ForwardRefHandle>(null);

  useEffect(() => {
    getTask();
    getProcess();
  },[]);

  useEffect(() => {
    const list:ClusterTask[] = [];
    tasks.forEach((item) => {
      const setItem = process.filter((processItem) => processItem.id === item.useProcessId );
      list.push({
        ...item,
        textLabel: "",
        limitPeriod: "",
        categoryRatioWithinPlan: "",
        similarCategoryRatio: "",
        processItem: setItem
      });
    });
    setConceptualizations(list);
  },[tasks]);

  const purposeRate = (item: Task) => {
    return (item.purposeAchieved/item.runNumber) * 100 
  }

  const conceptualizationSettings = (id: string) => {
    conceptualizations.forEach((item,index) => {
      if(id === String(index)){
        setConceptualizationsPlan([...conceptualizationsPlan,item])
      }
    });
  }

  const updateConceptualization = (item:ClusterTask,value:string,type: ClusterTaskKey) => {
    const list = conceptualizations.map((setItem) => {
      if(setItem.id === item.id) {
        return {...setItem, [type]: value}
      }
      return setItem;
    });
    setConceptualizations(list);
  }


  const onDraggable = (e: DragEvent<HTMLDivElement>) => {
    const num = e.currentTarget?.dataset?.info ?? "0";
    conceptualizationSettings(num);
  }

  const resetConceptualizationAction = () => {
    setConceptualizationsPlan([]);
  }

  const viewSwitchAction = () => {
    setViewSwitch(!viewSwitch);
  }

  return (
    <div className={viewSwitch ? "factorization struct" : "factorization"}>
      <h3 className="title p-1">エリア情報での言語情報を手段規定
        <span className="btn" onClick={viewSwitchAction}>{viewSwitch ? "構造化":"調整"}</span>
      </h3>
      <div className="flex p-1">
        {conceptualizations.map((item,index) => 
          <div
            key={item.id}
            className="max180 p-2"
            data-info={index}
            draggable={true}
            onDragEnd={(e) => {
              onDraggable(e)
            }}
          >
            <p className="pb-1">{item.title}</p>
            <p className="pb-1"> (実行数){item.runNumber} | (達成数){item.purposeAchieved}</p>
            <p className="pb-1">達成比率 | {purposeRate(item)}%</p>
            <div className="actions">
              <FieldInput
                type="range"
                id={`similarCategoryRatio${index}`}
                label="類似カテゴリ実装比率"
                value={item.similarCategoryRatio}
                className="input-range"
                eventChange={(value: string) => {
                  updateConceptualization(item,value,"similarCategoryRatio");
                }}
                viewValue={true}
              />
              <FieldInput
                type="date"
                id={`limitPeriod${index}`}
                label="実装終了期間"
                value={item.similarCategoryRatio}
                eventChange={(value: string) => {
                  updateConceptualization(item,value,"limitPeriod");
                }}
              />
            </div>
          </div>)}
      </div>
      <div className={viewSwitch ? "planning-settings" : "planning-settings flex" }>
        <div className="planning-info">
          <FieldInput
            id={`limitPe`}
            label="タスクをまとめた情報構造定義"
            eventChange={(value: string) => {
            }}
          />
        </div>
        { viewSwitch && <>ここにドロップ <button className="btn" onClick={resetConceptualizationAction}>リセット</button></> }
        <div className="draggable-area">
          <div
            draggable
            className={
              viewSwitch ? 
              "draggable-box minh150 background-sub-color flex p-1":
              "draggable-box minh150 p-1"
            }
          >
            {conceptualizationsPlan.map((item: ClusterTask,index:number) => <div key={`${item.id}-${index}`} className={viewSwitch ? "" : "flex"}>
              <div className="max180 p-1">
                <h3 className="title pb-1">{item.title}</h3>
                <div className="detail pb-1">{item.detail}</div>
              </div>
              { !viewSwitch &&
                <div className="p-1">
                  <p>プロセス情報</p>
                  <BaseDialog
                    ref={element}
                    phase="20"
                    openBtnView={true}
                  >
                    <ProcessCards type="view" processItems={item?.processItem[0]?.processdata ?? []} />
                  </BaseDialog>
                </div>
                }
              </div>)}
          </div>
        </div>
      </div>
      タスク結果を言語マネジメント因子にする<br />
      前後関係を調整する可視化する情報に対する補助情報にする<br />
      各セクションごとに検証での評価と結果に対する評価を規定して定義する
    </div>
  );
}
