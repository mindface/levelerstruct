import { useEffect, useCallback, useState } from "react";
import { useStoreNamingDefinition } from "../store/storeNamingConvention";
import { useStoreEvaluation } from "../store/storeEvaluation";
import { useStore } from "../store/store";
import { useStoreMethod } from "../store/storeMethod";
import { useStoreProcess } from "../store/storeProcess";
import { ControlDialog } from "./ControlDialog";

export interface DetailInfoList {
  id: string;
  name: string;
  structure: string;
  total: number;
}

export function ControlView() {
  const { uiDefinitions, updateUiDefinition } = useStoreNamingDefinition((store) => ({
    uiDefinitions: store.uiDefinitions,
    updateUiDefinition: store.updateUiDefinition,
  }));
  const [headerUi, setHeaderUi] = useState(uiDefinitions ?? []);
  const [detailInfoList, setDetailInfoList] = useState<DetailInfoList[]>([]);
  const { tasks, getTask } = useStore((store) => ({
    tasks: store.tasks,
    getTask: store.getTask,
  }));
  const { process, getProcess } = useStoreProcess((store) => ({
    process: store.process,
    getProcess: store.getProcess,
  }));
  const { methods, getMethod } = useStoreMethod((store) => ({
    methods: store.methods,
    getMethod: store.getMethod,
  }));
  const { evaluations, getEvaluation } = useStoreEvaluation((store) => ({
    evaluations: store.evaluations,
    getEvaluation: store.getEvaluation,
  }));

  const setEvaluationItem = (id: string) => {
    const setItem = evaluations.filter((item) => {
      if (id === item.categoryId) {
        return item;
      }
    });
    return (
      <div className="box">
        <div className="item">{setItem[0]?.title ?? ""}</div>
        <div className="item">{setItem[0]?.categoryId ?? ""}</div>
        <div className="item">{setItem[0]?.structure ?? ""}</div>
      </div>
    );
  };

  const list = useCallback(() => {
    return headerUi.map((item, index) => {
      return { ...item, id: index.toString() };
    });
  }, [uiDefinitions]);

  useEffect(() => {
    getTask();
    getProcess();
    getMethod();
    getEvaluation();
  }, []);

  useEffect(() => {
    const list = headerUi.map((item, index) => {
      if (item.name === "task") return { ...item, total: (tasks ?? []).length };
      if (item.name === "process") return { ...item, total: (process ?? []).length };
      if (item.name === "method") return { ...item, total: (methods ?? []).length };
      return { ...item, total: 0 };
    });
    setDetailInfoList(list);
  }, [tasks, process, methods]);

  return (
    <div className="control-menu">
      <div className="content flex">
        {detailInfoList?.map((item, index) => (
          <div key={index} className="wtach-card max320 p-2">
            <div className="p-1 name">{item.name}</div>
            <div className="p-1 structure">{item.structure}</div>
            <p>{item.total}</p>
            {setEvaluationItem(item.name)}
            <ControlDialog item={item} />
          </div>
        ))}
      </div>
    </div>
  );
}
