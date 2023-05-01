import { useEffect, useState } from "react";
import { FieldInput } from "./parts/FieldInput";

export function OrderMake() {
  const [imagePath, setImagePath] = useState("");

  return (
    <div className="content content-edit">
      <div className="caption flex-nw p-1">
        <div className="check"></div>
        <div className="title">タイトル - タスクへの注文リスト</div>
        <div className="action"></div>
      </div>
      <div className="fields p-2">
        <div className="field pb-1">
          <FieldInput
            type="number"
            id="title"
            label="注文名"
            value={""}
            eventChange={(value: string) => {}}
          />
        </div>
        <div className="field pb-1">
          <FieldInput
            type="number"
            id="desiredValue"
            label="希望値"
            value={""}
            eventChange={(value: string) => {}}
          />
          <FieldInput
            id="desiredValue"
            label="以前の注文"
            value={"無"}
            eventChange={(value: string) => {}}
          />
        </div>
        <div className="field pb-1">
          <FieldInput
            type="number"
            id="quantity"
            label=""
            value={""}
            eventChange={(value: string) => {}}
          />
          <FieldInput
            type="number"
            id="quantity"
            label="品質レベル"
            value={""}
            eventChange={(value: string) => {}}
          />
        </div>
        <div className="field pb-1">
          <p>目的結果(画像) : </p>
          <div className="flex">
            <div className="pr-1">
              <FieldInput
                id="orderImage"
                label="目的画像"
                value={imagePath}
                eventChange={(value: string) => {
                  setImagePath(value);
                }}
              />
            </div>
            <div className="image-box max320">
              {imagePath !== "" && <img src={imagePath} alt="" />}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
