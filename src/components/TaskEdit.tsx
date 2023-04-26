import { useEffect, useState } from "react";
import { useStore, Task } from "../store/store";
import { useStoreProcess, Process } from "../store/storeProcess";
import { FieldInput } from "./parts/FieldInput";
import { ProcessSelect } from "./parts/ProcessSelect";

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
    getProcess: store.getProcess,
  }));
  const [title, setTitle] = useState("");
  const [detail, setDetail] = useState("");
  const [processId, setProcessId] = useState("");
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
      useProcessId: selectProcess?.id ?? "",
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
      useProcessId: selectProcess?.id ?? "",
    });
    removeDialog();
  };

  const selectAction = (item: Process) => {
    setSelectProcess(item);
  };

  useEffect(() => {
    if (process.length) {
      process.forEach((item) => {
        if (item.id === task?.useProcessId) selectAction(item);
      });
    }
    setTitle(task?.title ?? "");
    setDetail(task?.detail ?? "");
    setProcessId(task?.useProcessId ?? "");
    setRunNumber(task?.runNumber ?? 0);
    setPurposeAchieved(task?.purposeAchieved ?? 0);
  }, [task, process]);

  useEffect(() => {
    getProcess();
  }, []);

  return (
    <div className="content content-edit">
      <div className="fields p-2">
        <div className="field pb-1">
          <ProcessSelect
            processId={processId}
            eventChange={(item) => {
              selectAction(item);
            }}
          />
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
