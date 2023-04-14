import React, { useEffect, useState, useRef } from "react";
import { useStore, Task } from "../store/store";
import { useStoreProcess, Process, ProcessItem } from "../store/storeProcess";
import downSmall from "../images/down-small.svg";
import Image from "next/image";
import { FieldInput } from "./parts/FieldInput";

type Props = {
  type: string;
  item?: Task;
  removeDialog?: () => void;
};

export function TaskEdit(props: Props) {
  const { tasks, addTask, updateTask } = useStore((store) => ({
    tasks: store.tasks,
    getTask: store.getTask,
    addTask: store.addTask,
    updateTask: store.updateTask,
  }));
  const { process, getProcess } = useStoreProcess((store) => ({
    process: store.process,
    getProcess: store.getProcess
  }));
  const [title, setTitle] = useState("");
  const [detail, setDetail] = useState("");
  const [processId, setProcessId] = useState("");
  const similar = useRef("");
  const [selectMethodIds, setSelectMethodIds] = useState<string[]>([]);
  const [runNumber, setRunNumber] = useState(0);
  const [purposeAchieved, setPurposeAchieved] = useState(0);
  const [selectProcess, setSelectProcess] = useState<Process>();

  const editType = props.type;
  const task = props.item;
  const removeDialog = props.removeDialog ?? (() => {});

  const addAction = () => {
    addTask({
      id: String(tasks.length + 1),
      title: title,
      detail: detail,
      runNumber: runNumber,
      purposeAchieved: purposeAchieved,
      useProcessId: selectProcess?.id ?? ""
    });
  };

  const updateAction = () => {
    if (!task?.id) return;
    updateTask({
      id: task?.id,
      title: title,
      detail: detail,
      runNumber: runNumber,
      purposeAchieved: purposeAchieved,
      useProcessId: selectProcess?.id ?? ""
    });
    removeDialog();
  };

  const selectAction = (item: Process) => {
    setSelectProcess(item);
  }

  useEffect(() => {
    if(process.length) {
      process.forEach((item) => {
        if(item.id === task?.useProcessId) selectAction(item);
      });
    }
    setTitle(task?.title ?? "");
    setDetail(task?.detail ?? "");
    setProcessId(task?.useProcessId ?? "");
    setRunNumber(task?.runNumber ?? 0);
    setPurposeAchieved(task?.purposeAchieved ?? 0);
    const list: string[] = [];
    selectProcess?.processdata.forEach((selectItem) => {
      list.push(selectItem.methodId);
    });
    setSelectMethodIds(list);
  }, [task,process]);

  useEffect(() => {
    getProcess();
  },[]);

  const setClassSimilar = (items: ProcessItem[]) => {
    let setClass = "";
    (items ?? []).forEach((item) => {
      if(selectMethodIds.includes(item.methodId)){
        setClass = "similar ";
        similar.current = "同じ方法を利用しているプロセスがあります。";
      }
    });
    return setClass;
  };

  return (
    <div className="content content-edit">
      <div className="fields p-2">
        <div className="field pb-1">
          <div className="process-box positionbase cursol-absolute-view">
            <p className="icon-label d-inline border p-1">選択利用方法 <Image src={downSmall} alt="" /></p>
            <p className="d-inline p-1">{selectProcess?.title}</p>[{similar.current}] 右の印があります [^]
            <div className="maxh320 over-scroll process-selector box-shadow p-1 hover-absolute-view background-white">
              {process.map((item,index) => 
                <div
                  key={index}
                  className={`divhover p-1 ${setClassSimilar(item.processdata)}${item.id === processId ? "select" : ""}`}
                  onClick={() => {
                    selectAction(item);
                 }}
                >{item.title}</div>
              )}
            </div>
          </div>
        </div>
        <div className="field pb-1">
          <FieldInput
            id="title"
            label="タイトル"
            value={title}
            eventChange={(value: string) => {
              setTitle(value);
            }}
          />
        </div>
        <div className="field pb-1">
          <textarea
            className="textarea"
            id=""
            cols={30}
            rows={10}
            value={detail}
            onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) => setDetail(e.target?.value)}
          />
        </div>
        <div className="field pb-1">
          <FieldInput
            type="number"
            id="run-number"
            label="実行数"
            value={String(runNumber)}
            step={1}
            eventChange={(value: string) => {
              setRunNumber(Number(value));
            }}
          />
          <FieldInput
            type="number"
            id="purpose-achieved"
            label="目的までの時間(0.1)"
            value={String(purposeAchieved)}
            step={0.1}
            eventChange={(value: string) => {
              setPurposeAchieved(Number(value));
            }}
          />
          selectProcess : {selectProcess?.id}
        </div>
        <div className="field">
          {editType === "edit" ? (
            <button className="btn" onClick={updateAction}>
              更新
            </button>
          ) : (
            <button className="btn" onClick={addAction}>
              保存
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
