import { useRef, useState } from "react";
import NextImage from "next/image";
import listUnordered from "../images/list-unordered.svg";
import { BaseDialog, ForwardRefHandle } from "./BaseDialog";
import { useStoreMethod, Method } from "../store/storeMethod";
import { MethodEdit } from "./MethodEdit";
import { tagView } from "../util/lib";

type Props = {
  type: string;
  item: Method;
};

export function MethodListMenu(props: Props) {
  const { deleteMethod } = useStoreMethod((store) => ({
    updateMethod: store.updateMethod,
    deleteMethod: store.deleteMethod,
  }));
  const { addMethod } = useStoreMethod((store) => ({
    addMethod: store.addMethod,
  }));
  const [viewId, setViewId] = useState("detail");
  const element = useRef<ForwardRefHandle>(null);
  const method = props.item;

  const openAction = (viewId: string) => {
    setViewId(viewId);
    element.current?.openDialog();
  };

  const deleteAction = () => {
    if (method?.methodId && confirm("この操作は取り消せません")) {
      deleteMethod(method?.methodId);
    }
  };

  const copyAction = () => {
    addMethod({
      id: "copy",
      methodId: "base",
      title: method.title,
      detail: method.detail,
      structure: method.structure,
      tagger: method.tagger,
    });
  };

  return (
    <div className="list-menu">
      <div className="menu-box">
        <NextImage src={listUnordered} alt="" unoptimized />
        <div className="menu box-shadow">
          <div className="item p-1 divhover" onClick={() => openAction("detail")}>
            詳細
          </div>
          <div className="item p-1 divhover" onClick={() => openAction("edit")}>
            編集
          </div>
          <div className="item p-1 divhover" onClick={() => deleteAction()}>
            削除
          </div>
          <div className="item p-1 divhover" onClick={() => copyAction()}>
            コピー
          </div>
        </div>
      </div>
      <BaseDialog ref={element}>
        <div className="content-inner">
          {viewId === "detail" && (
            <div className="detail">
              <div className="fields p-2">
                <div className="field pb-1">
                  <div className="methodId">{method.methodId}</div>
                </div>
                <div className="field pb-1">
                  <h3 className="title">{method.title}</h3>
                </div>
                <div className="field pb-1">
                  <div
                    className="detail viewer"
                    dangerouslySetInnerHTML={{ __html: method.detail.replace(/\n/g, "<br />") }}
                  ></div>
                </div>
                <div className="field pb-1">
                  <div
                    className="structure viewer"
                    dangerouslySetInnerHTML={{ __html: method.structure.replace(/\n/g, "<br />") }}
                  ></div>
                </div>
                <div className="field pb-1">
                  <div className="tagger">{tagView(method.tagger)}</div>
                </div>
              </div>
            </div>
          )}
          {viewId === "edit" && (
            <div className="edit">
              <MethodEdit type="edit" method={method} />
            </div>
          )}
        </div>
      </BaseDialog>
    </div>
  );
}
