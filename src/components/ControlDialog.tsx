import { useRef } from "react";
import { BaseDialog, ForwardRefHandle } from "./BaseDialog";
import { FieldInput } from "./parts/FieldInput";
import { DetailInfoList } from "./ControlView";

type Props = {
  item: DetailInfoList;
};

export function ControlDialog(props: Props) {
  const element = useRef<ForwardRefHandle>(null);
  const { id, name, structure, total } = props.item;

  const openAction = () => {
    element.current?.openDialog();
  };

  return (
    <div className="photo-box">
      <button className="btn" onClick={openAction}>
        詳細
      </button>
      <BaseDialog ref={element} phase="20">
        <div className="control-row">
          <ul className="list">
            <li className="item">
              <FieldInput
                type="range"
                id={`controlView${id}`}
                label="類似カテゴリ実装比率"
                value={"0"}
                className="input-range"
                eventChange={(value: string) => {}}
                viewValue={true}
              />
            </li>
            <li className="item">
              <p data-id={total}>{total}</p>
            </li>
          </ul>
        </div>
      </BaseDialog>
    </div>
  );
}
