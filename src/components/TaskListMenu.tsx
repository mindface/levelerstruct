import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import listUnordered from "../images/list-unordered.svg";
import { BaseDialog, ForwardRefHandle } from "./BaseDialog";
import { TaskEdit } from "./TaskEdit";
import { ProcessCards } from "./ProcessCards";
import { useStore, Task } from "../store/store";
import { useStoreProcess } from "../store/storeProcess";

type Props = {
  type: string;
  item: Task;
};

export function TaskListMenu(props: Props) {
  const [viewId, setViewId] = useState("view");
  const processTilte = useRef("");
  const element = useRef<ForwardRefHandle>(null);
  const task = props.item;
  const { deleteTask } = useStore((store) => ({
    tasks: store.tasks,
    deleteTask: store.deleteTask,
  }));
  const { process, getProcess } = useStoreProcess((store) => ({
    process: store.process,
    getProcess: store.getProcess,
  }));

  const openAction = (viewId: string) => {
    setViewId(viewId);
    element.current?.openDialog();
  };

  const closeAction = () => {
    element.current?.closeDialog();
  };

  const deleteAction = () => {
    if (task.id) {
      deleteTask(task.id);
    }
  };

  const setProcessItems = (processId: string) => {
    if(process.length === 0) return [];
    const item = process.filter((item) => {
      if(item.id === processId) {
        return item
      }
    })[0];
    processTilte.current = item?.title;
    return item?.processdata ?? [];
  };

  useEffect(() => {
    getProcess();
  },[]);

  return (
    <div className="list-menu">
      <div className="menu-box">
        <Image src={listUnordered} alt="" />
        <div className="menu box-shadow">
          <div className="item p-1 divhover" onClick={() => openAction("view")}>
            詳細
          </div>
          <div className="item p-1 divhover" onClick={() => openAction("edit")}>
            編集
          </div>
          <div className="item p-1 divhover" onClick={() => deleteAction()}>
            削除
          </div>
        </div>
      </div>
      <BaseDialog ref={element}>
        {viewId === "view" && (
          <div className="dialog-content detail">
            <div className="fields p-2">
              <div className="field pb-1">
                <h3 className="title">{task.title}</h3>
              </div>
              <div className="field pb-1">
                <div className="detail">{task.detail}</div>
              </div>
              <div className="field pb-1">
                <div className="detail">実行数 : {task.runNumber}</div>
              </div>
              <div className="field pb-1">
                <div className="detail">達成時間{task.purposeAchieved}</div>
              </div>
              <p className="pb-1">選択手段プロセス | {processTilte.current}</p>
              <ProcessCards
                type={viewId}
                processItems={setProcessItems(task.useProcessId)}
              />
            </div>
          </div>
        )}
        {viewId === "edit" && (
          <div className="dialog-content edit">
            <TaskEdit type={viewId} item={task} removeDialog={closeAction} />
          </div>
        )}
      </BaseDialog>
    </div>
  );
}
