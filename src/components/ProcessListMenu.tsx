import { useRef, useState } from "react";
import Image from "next/image";
import listUnordered from "../images/list-unordered.svg";
import { BaseDialog, ForwardRefHandle } from "./BaseDialog";
import { useStoreProcess, Process } from "../store/storeProcess";
import { ProcessMake } from "./ProcessMake";
import { ProcessCards } from "./ProcessCards";

type Props = {
  type: string;
  item: Process;
};

export function ProcessListMenu(props: Props) {
  const { deleteProcess } = useStoreProcess((store) => ({
    updateProcess: store.updateProcess,
    deleteProcess: store.deleteProcess,
  }));
  const [viewId, setViewId] = useState("view");
  const element = useRef<ForwardRefHandle>(null);
  const process = props.item;

  const openAction = (viewId: string) => {
    setViewId(viewId);
    element.current?.openDialog();
  };

  const deleteAction = () => {
    if (process?.id && confirm(`この操作は取り消せません\n ${process?.title}`)) {
      deleteProcess(process?.id ?? "");
    }
  };

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
                <div className="methodId">{process.connectId}</div>
              </div>
              <div className="field pb-1">
                <h3 className="title">{process.title}</h3>
              </div>
              <div className="field pb-1">
                <div className="detail">{process.detail.replace(/\n/g, "<br />")}</div>
              </div>
              <div className="field pb-1">
                <div className="max320">
                  {process.mainImage !== "" && <img src={process.mainImage} alt="" />}
                </div>
              </div>
              <div className="field pb-1">
                {}
                <ProcessCards type={viewId} processItems={process.processdata} />
              </div>
            </div>
          </div>
        )}
        {viewId === "edit" && (
          <div className="dialog-content edit">
            <ProcessMake type={viewId} process={process} />
          </div>
        )}
      </BaseDialog>
    </div>
  );
}
