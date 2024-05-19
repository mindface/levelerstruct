import { useEffect, useRef, useState } from "react";
import { FieldInput } from "./parts/FieldInput";
import { useStoreConnect } from "../store/storeConnect";
import { useStoreProcess } from "../store/storeProcess";
import type { Process } from "../store/storeProcess";
import { DraggableDiv } from "./parts/DraggableDiv";
import { ProcessCards } from "./ProcessCards";

import { fabric } from "fabric";

export function InfoStructureFormation() {
  const [bgUrl, setBgUrl] = useState("");
  const [renderRates, setRenderRates] = useState<{ id: number; rate: string }[]>([]);
  const [fabricCanvas, setFabricCanvas] = useState(new fabric.Canvas(""));
  // const fabricElement = useRef(new fabric.Canvas(''));

  const structureArea = useRef<HTMLDivElement>(null);
  const writeCanvas = useRef<HTMLCanvasElement>(null);
  const { connects, workerInfo, connectMethod, getWorker } = useStoreConnect((store) => ({
    connects: store.connects,
    workerInfo: store.workerInfo,
    connectMethod: store.connectMethod,
    getWorker: store.getWorker,
  }));
  const { process, getProcess } = useStoreProcess((store) => ({
    process: store.process,
    getProcess: store.getProcess,
  }));

  const [makeStructureComparisons, setStructureComparisons] = useState<Process[]>([]);

  useEffect(() => {
    getProcess();
  }, [getProcess]);

  const imgDownload = () => {
    const a = document.createElement("a");
    const hrefData = writeCanvas.current?.toDataURL("image/png");
    // const l = document.getElementById("canvas") as HTMLCanvasElement;
    // const hrefData = l?.toDataURL('image/png');
    if (!hrefData) return;
    a.href = hrefData;
    a.download = "canvas.png";
    a.click();
  };

  const setRenderRateAction = (index: number, value: string) => {
    const list = renderRates.map((item) => {
      if (item.id === index) {
        return { id: index, rate: value };
      }
      return item;
    });
    setRenderRates(list);
  };

  const addProcess = (item: Process) => {
    setStructureComparisons([...makeStructureComparisons, item]);
  };

  return (
    <div className="content">
      <div className="select-background-area">
        <FieldInput
          id="execution"
          label="背景URL"
          value={bgUrl}
          eventChange={(value: string) => setBgUrl(value)}
        />
      </div>
      <div className="select-process">
        <div className="process-box cursol-absolute-view positionbase d-inline max420 p-1">
          <span className="d-block btn">sccroll</span>
          <ul className="list hover-absolute-view maxh320 over-scroll background-white box-shadow">
            {(process ?? []).map((item) => (
              <li
                key={item.id}
                className="item divhover cursor p-1"
                onClick={() => addProcess(item)}
              >
                {item.title}
              </li>
            ))}
          </ul>
        </div>
      </div>
      <div className="structure-area positionbase minh320" ref={structureArea}>
        {bgUrl !== "" && <img className="img" src={bgUrl} />}
        {(makeStructureComparisons ?? []).map((item, index) => (
          <DraggableDiv
            key={index}
            type="grab"
            containerRect={{
              left: structureArea.current?.getBoundingClientRect().left ?? 0,
              top: structureArea.current?.getBoundingClientRect().top ?? 0,
              width: structureArea.current?.getBoundingClientRect().width ?? 0,
              height: structureArea.current?.getBoundingClientRect().height ?? 0,
            }}
          >
            <div className="cursol-absolute-view positionbase">
              {item.title}
              <div className="hover-absolute-view background-white">
                <ProcessCards type="view" processItems={item?.processdata} />
              </div>
            </div>
          </DraggableDiv>
        ))}
      </div>
    </div>
  );
}
