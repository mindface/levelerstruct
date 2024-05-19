import { useState } from "react";
import { useStoreMethod, Method } from "../store/storeMethod";

type Props = {
  type: string;
  method?: Method;
};

export function ToolsEdit(props: Props) {
  const { methods, addMethod, updateMethod } = useStoreMethod((store) => ({
    methods: store.methods,
    addMethod: store.addMethod,
    updateMethod: store.updateMethod,
    deleteMethod: store.deleteMethod,
  }));

  const method = props.method;
  const editType = props.type;
  const [title, setTitle] = useState(editType === "edit" ? method?.title ?? "" : "");
  const [methodId, setMethodId] = useState(editType === "edit" ? method?.methodId ?? "" : "");
  const [detail, setDetail] = useState(editType === "edit" ? method?.detail ?? "" : "");
  const [structure, setStructure] = useState(editType === "edit" ? method?.structure ?? "" : "");
  const [tagInput, setTagInput] = useState("");
  const [tagger, setTagger] = useState<string[]>(method ? method.tagger.split(",") ?? "" : []);
  const [adjustmentNumbersInput, setAdjustmentNumbersInput] = useState("");
  const [adjustmentNumbers, setAdjustmentNumbers] = useState<number[]>(
    () => method?.adjustmentNumbers as number[]
  );

  const addAction = () => {
    addMethod({
      id: String(methods.length + 1),
      methodId: `base`,
      title: title,
      detail: detail,
      structure: structure,
      tagger: tagger.join(",") ?? "",
      adjustmentNumbers: adjustmentNumbers,
    });
    reset();
  };

  const updateAction = () => {
    const _tagger = tagger.filter((item) => item !== "");
    updateMethod({
      id: String(methods.length + 1),
      methodId: method?.methodId ?? "",
      title: title,
      detail: detail,
      structure: structure,
      tagger: _tagger.join(",") ?? "",
      adjustmentNumbers: adjustmentNumbers,
    });
    if (editType !== "edit") {
      reset();
    }
  };

  const reset = () => {
    setTitle("");
    setMethodId("");
    setDetail("");
    setStructure("");
    setTagInput("");
    setTagger([]);
    setAdjustmentNumbersInput("");
    setAdjustmentNumbers([]);
  };

  return (
    <div className="fields">
      <div className="fields-edit p-2 ">
        <div className="field pb-1">
          タイトル :
          <input
            type="text"
            className="input"
            value={title}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => setTitle(e.target?.value)}
          />
        </div>
        <div className="field pb-1">
          MethodId :
          <input
            type="text"
            className="input"
            value={methodId}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => setMethodId(e.target?.value)}
          />
        </div>
        <div className="field pb-1">
          詳細 :
          <div className="flex">
            <div className="maxhalf50">
              <textarea
                className="textarea"
                id=""
                cols={30}
                rows={10}
                value={detail}
                onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) => setDetail(e.target?.value)}
              />
            </div>
            <div
              className="maxhalf50 pl-1 viewer"
              dangerouslySetInnerHTML={{ __html: detail.replace(/\n/g, "<br />") }}
            ></div>
          </div>
        </div>
        <div className="field pb-1">
          構造情報 :
          <div className="flex">
            <div className="maxhalf50">
              <textarea
                className="textarea"
                id=""
                cols={30}
                rows={10}
                value={structure}
                onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) =>
                  setStructure(e.target?.value)
                }
              />
            </div>
            <div
              className="maxhalf50 pl-1 viewer"
              dangerouslySetInnerHTML={{ __html: structure.replace(/\n/g, "<br />") }}
            ></div>
          </div>
        </div>
        <div className="field flex pb-1">
          タグ分類 :
          <input
            type="text"
            className="input"
            value={tagInput}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => setTagInput(e.target?.value)}
          />
          <button className="btn" onClick={() => setTagger([...tagger, tagInput])}>
            add
          </button>
          <p className="tags p-1">
            {tagger.map((item, index) => (
              <span key={`tag${index}`} className="tag d-inline mr-1">
                {item}
              </span>
            ))}
          </p>
        </div>
        <div className="field flex pb-1">
          <input
            type="number"
            className="input"
            step={0.01}
            value={adjustmentNumbersInput}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
              setAdjustmentNumbersInput(e.target?.value)
            }
          />
          <button
            className="btn"
            onClick={() =>
              setAdjustmentNumbers([...adjustmentNumbers, Number(adjustmentNumbersInput)])
            }
          >
            add
          </button>
          <p className="tags p-1">
            {(adjustmentNumbers ?? []).map((item, index) => (
              <span key={`tag${index}`} className="tag d-inline mr-1">
                {item}
              </span>
            ))}
          </p>
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
      <div className="fields-view p-2">
        <div className="field pb-1"></div>
        <div className="field pb-1"></div>
      </div>
    </div>
  );
}
