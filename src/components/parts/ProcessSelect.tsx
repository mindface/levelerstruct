import React, { useEffect, useState, useRef } from "react";
import { useStoreProcess, Process, ProcessItem } from "../../store/storeProcess";

interface Props {
  value?: string;
  type?: string;
  processId: string;
  eventChange?: (item: Process) => void
}

export function ProcessSelect(props: Props): JSX.Element {
  const { processId, eventChange } = props;
  const [processViewId, setProcessViewId] = useState(processId ?? "");
  const { process, getProcess } = useStoreProcess((store) => ({
    process: store.process,
    getProcess: store.getProcess
  }));
  const [selectMethodIds, setSelectMethodIds] = useState<string[]>([]);
  const similar = useRef("");
  const [selectProcess, setSelectProcess] = useState<Process>();
  const eventChangeAction = eventChange ?? (() => {});

  useEffect(() => {
    let selectProcess:(Process | object)  = {};
    process.map((item) => {
      if(processId === item.id) {
        setSelectProcess(item);
        selectProcess = item;
      }
    });
    const idsList: string[] = [];
    ((selectProcess as Process)?.processdata ?? []).forEach((selectItem) => {
      idsList.push(selectItem.methodId);
    });
    setSelectMethodIds(idsList);
  },[process, processViewId]);

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
  const selectAction = (item: Process) => {
    setSelectProcess(item);
  }

  useEffect(() => {
    getProcess();
  },[]);

  return (
    <div className="process-box positionbase d-inline">
      <div className="cursol-absolute-view min280">
        <p className="icon-label flex-nw border p-1">選択利用方法 
          <svg width="15" height="15" viewBox="0 0 15 15" fill="#27b6a4" xmlns="http://www.w3.org/2000/svg">
            <path d="M7.49992 10.2072L11.707 6.00006L3.29282 6.00006L7.49992 10.2072Z" />
          </svg>
        </p>
        <p className="d-inline p-1">{selectProcess?.title}</p>[{similar.current}] 右の印があります [^]
        <div className="maxh320 over-scroll process-selector box-shadow p-1 hover-absolute-view background-white">
          {process.map((item,index) => 
            <div
              key={index}
              className={`divhover p-1 ${setClassSimilar(item.processdata)}${item.id === processId ? "select" : ""}`}
              onClick={() => {
                selectAction(item);
                eventChangeAction(item);
              }}
            >{item.title}</div>
          )}
        </div>
      </div>
    </div>
  );
}
