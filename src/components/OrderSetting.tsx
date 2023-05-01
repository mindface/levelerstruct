import React, { useState } from "react";
import { useStoreMethod, Method } from "../store/storeMethod";
import { useStoreNamingDefinition } from "../store/storeNamingConvention";
import { FieldInput } from "./parts/FieldInput";

type Props = {
  type: string;
  method?: Method;
};

export function OrderSetting(props: Props) {
  const { methods, addMethod, updateMethod } = useStoreMethod((store) => ({
    methods: store.methods,
    addMethod: store.addMethod,
    updateMethod: store.updateMethod,
    deleteMethod: store.deleteMethod,
  }));
  const { uiDefinitions } = useStoreNamingDefinition((store) => ({
    uiDefinitions: store.uiDefinitions,
  }));
  const [headerUi, setHeaderUi] = useState(uiDefinitions ?? []);

  const method = props.method;
  const editType = props.type;
  const [title, setTitle] = useState("");
  const [categoryId, setCategoryId] = useState("");
  const [keyValues, setKeyValues] = useState<{ key: ""; value: "" }[]>([{ key: "", value: "" }]);
  const [structure, setStructure] = useState("");
  const [tagger, setTagger] = useState<string[]>(method ? method.tagger.split(",") ?? "" : []);
  const [adjustmentNumbersInput, setAdjustmentNumbersInput] = useState("");
  const [adjustmentNumbers, setAdjustmentNumbers] = useState<number[]>(
    () => method?.adjustmentNumbers as number[]
  );

  const addAction = () => {
    reset();
  };

  const updateAction = () => {
    const _tagger = tagger.filter((item) => item !== "");

    if (editType !== "edit") {
      reset();
    }
  };

  const addKeyValues = () => {
    setKeyValues([...keyValues, { key: "", value: "" }]);
  };

  const updateKeyValues = (index: number, value: string, type: string) => {
    const list = keyValues.map((item, _index) => {
      if (index === _index) {
        return { ...item, [type]: value };
      }
      return item;
    });
    setKeyValues(list);
  };

  const deleteKeyValues = (index: number) => {
    const list = keyValues.filter((item, _index) => index !== _index);
    setKeyValues(list);
  };

  const reset = () => {
    setTitle("");
    setTagger([]);
  };

  return (
    <div className="fields">
      <div className="fields-edit p-2 ">
        <div className="field pb-1">
          <select>
            {headerUi.map((item, index) => (
              <option key={index} value={item.name}>
                {item.name}
              </option>
            ))}
          </select>
        </div>
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
          CategoryId :
          <FieldInput
            type="number"
            id="categoryId"
            label="categoryId"
            value={""}
            eventChange={(value: string) => {}}
          />
        </div>
        <div className="field pb-1">
          <p className="add-sector">
            評価フィールドを追加 |{" "}
            <button className="btn" onClick={addKeyValues}>
              add
            </button>
          </p>
          {keyValues.map((item, index) => (
            <div key={index}>
              <div className="pr-1 d-inline">
                key :
                <FieldInput
                  id="readKey"
                  label="判別key(半角英数)"
                  value={item.key}
                  eventChange={(value: string) => {
                    updateKeyValues(index, value, "key");
                  }}
                />
              </div>
              <div className="pr-1 d-inline">
                value :
                <FieldInput
                  id="readValue"
                  label="評価文字列"
                  value={item.value}
                  eventChange={(value: string) => {
                    updateKeyValues(index, value, "value");
                  }}
                />
              </div>
              <button className="btn" onClick={() => deleteKeyValues(index)}>
                x
              </button>
            </div>
          ))}
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
                value={JSON.stringify(keyValues, null, "\t")}
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
          実行結果基準値(複数回可能) :
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
