import { useEffect, useRef, useState } from "react";
import { FieldInput } from "./parts/FieldInput";
import { useStoreConnect } from "../store/storeConnect";
import { useStoreProcess, Process } from "../store/storeProcess";
import { useRouter } from "next/router";
import { tagView } from "../util/lib";
import { ProcessCards } from "./ProcessCards";

type MmakeComparisons = { id: number; rate: number; process: Process }[];
import { fabric } from "fabric";

export function InfoConnection() {
  const [runCounter, setRunCounter] = useState(0);
  const [addText, setAddText] = useState("");
  const [imagePath, setImagePath] = useState("");
  const [renderRates, setRenderRates] = useState<{ id: number; rate: string }[]>([]);
  const [fabricCanvas, setFabricCanvas] = useState(new fabric.Canvas(""));
  // const fabricElement = useRef(new fabric.Canvas(''));
  // let fabricCanvas = new fabric.Canvas('');
  const router = useRouter();
  const writeCanvas = useRef<HTMLCanvasElement>(null);
  const writeCanvasContent = useRef<HTMLDivElement>(null);
  const { connects, workerInfo, connectMethod, getWorker } = useStoreConnect((store) => ({
    connects: store.connects,
    workerInfo: store.workerInfo,
    connectMethod: store.connectMethod,
    getWorker: store.getWorker,
  }));
  const { process } = useStoreProcess((store) => ({
    process: store.process,
  }));

  const [makeComparisons, setMakeComparisons] = useState<MmakeComparisons>([]);

  const runNumberCounter = () => {
    let counter = 0;
    const list: MmakeComparisons = [];
    process.forEach((item) => {
      let comparisonsCounter = 0;
      item.processdata.forEach((d) => {
        if (d.methodId === connectMethod.methodId) {
          counter = counter + 1;
        }
        if (connectMethod.methodId === d.methodId && comparisonsCounter === 0) {
          comparisonsCounter = 1;
          list.push({ id: makeComparisons.length + 1, rate: 0, process: item });
        }
      });
    });
    setMakeComparisons(list);
    return counter;
  };

  useEffect(() => {
    getWorker();
  }, [getWorker]);

  useEffect(() => {
    setRunCounter(runNumberCounter());
  }, []);

  const addTextAction = () => {
    const text = new fabric.IText(addText, {
      left: 55,
      top: 30,
      fontFamily: "helvetica",
      fill: "#f55",
      angle: 0,
    });
    fabricCanvas.add(text);
  };

  const addRectAction = () => {
    const rect = new fabric.Rect({
      width: 100,
      height: 100,
      top: 10,
      left: 10,
      fill: "rgba(255,0,0,0.5)",
    });
    fabricCanvas.add(rect);
  };

  const addCircleAction = () => {
    const circle = new fabric.Circle({
      radius: 30,
      fill: "#f55",
      top: 100,
      left: 100,
    });
    fabricCanvas.add(circle);
  };

  const addImageAction = () => {
    fabric.Image.fromURL(
      imagePath,
      function (img) {
        img.crossOrigin = "Anonymous";
        fabricCanvas.add(img);
      },
      { crossOrigin: "anonymous" }
    );
  };

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

  useEffect(() => {
    const w = writeCanvasContent.current?.clientWidth;
    const h = writeCanvasContent.current?.clientHeight;
    const fabricCanvas = new fabric.Canvas("canvas", {
      renderOnAddRemove: true,
      width: w,
      height: 300,
    });
    setFabricCanvas(fabricCanvas);
    fabricCanvas.selection = true;
    const list = [];
    for (let index = 0; index < makeComparisons.length; index++) {
      list.push({ id: index, rate: "0" });
    }
    setRenderRates(list);
  }, []);

  useEffect(() => {
    const list = [];
    for (let index = 0; index < makeComparisons.length; index++) {
      list.push({ id: index, rate: "0" });
    }
    setRenderRates(list);
  }, [makeComparisons]);

  const setRenderRateAction = (index: number, value: string) => {
    const list = renderRates.map((item) => {
      if (item.id === index) {
        return { id: index, rate: value };
      }
      return item;
    });
    setRenderRates(list);
  };

  const setRateMakeComparisons = (index: number, value: string) => {
    const list = makeComparisons.map((item, mapIndex: number) => {
      if (index === mapIndex) {
        return { ...item, rate: Number(value) };
      }
      return item;
    });
    setMakeComparisons(list);
  };

  const totalRenderRates = () => {
    let counter = 0;
    renderRates.forEach((item) => {
      counter = counter + Number(item.rate);
    });
    return <p className="">トータル | {counter}</p>;
  };

  return (
    <div className="content">
      <div className="evaluation">
        <div className="">
          userId | {workerInfo.userId}
          case | {workerInfo.case}
        </div>
      </div>
      <div className="fields p-2">
        <div className="field pb-1">
          <p className="item pb-1">{connectMethod.methodId}</p>
          <p className="item pb-1">{connectMethod.title}</p>
          <div
            className="item pb-1"
            dangerouslySetInnerHTML={{ __html: connectMethod.detail.replace(/\n/g, "<br />") }}
          ></div>
          <p className="item pb-1">{connectMethod.structure}</p>
          <p className="item">{tagView(connectMethod.tagger)}</p>
        </div>
        <div className="field pb-1">
          <p className="disc pb-1">利用されているプロセス</p>
          {makeComparisons.map((item, index) => {
            return (
              <div key={`makeComparisons${index}`}>
                <div className="item-out p-1">
                  <FieldInput
                    type="checkbox"
                    id={`execution${index}`}
                    label="check out"
                    eventChange={(value: string) => {}}
                  />
                  <FieldInput
                    type="number"
                    id={`rate${index}`}
                    label="比率"
                    value={"0"}
                    step={0.01}
                    eventChange={(value: string) => {
                      setRenderRateAction(index, value);
                    }}
                  />
                  <div className="item pb-1">
                    <div className="max320">
                      {item.process.mainImage && <img src={item.process.mainImage} />}
                    </div>
                  </div>
                </div>
                <h3 className="title pt-1 pb-1">{item?.process.title}</h3>
                <div className="detail pb-1">{item?.process.detail}</div>
                <div className="detail pb-1">
                  <FieldInput
                    type="number"
                    id={`rateProcess${index}`}
                    label="プロセスの結果に関与する"
                    value={String(item.rate)}
                    step={0.01}
                    min={0}
                    eventChange={(value: string) => {
                      setRateMakeComparisons(index, value);
                    }}
                  />
                </div>
                <ProcessCards
                  type="connection"
                  processItems={item?.process.processdata}
                  rate={item.rate}
                />
              </div>
            );
          })}
        </div>
        <div className="field pb-1">{totalRenderRates()}</div>
        <div className="write-img" ref={writeCanvasContent}>
          <div className="btn-action">
            <span className="action-box">
              <input type="text" value={imagePath} onChange={(e) => setImagePath(e.target.value)} />
              <button onClick={addImageAction}>add Image</button>
            </span>
            <span className="action-box">
              <input type="text" value={addText} onChange={(e) => setAddText(e.target.value)} />
              <button onClick={addTextAction}>add text</button>
            </span>
            <button onClick={() => addRectAction()}>add rect</button>
            <button onClick={() => addCircleAction()}>add circle</button>
          </div>
          <canvas id="canvas" className="write-canvas" ref={writeCanvas}></canvas>
          <button onClick={() => imgDownload()}>imgDownload</button>
        </div>
        <div className="field pb-1">
          利用する手段と文字列に対する情報を、構造的にユーザーで目的に紐づける
          <FieldInput
            type="number"
            id="execution"
            label="実行数"
            value={String(runCounter)}
            eventChange={(value: string) => {}}
          />
          <FieldInput
            type="number"
            id="purposeAchieved"
            label="目的達成数"
            eventChange={(value: string) => {}}
          />
        </div>
        <div className="field">結果モジューリング</div>
      </div>
    </div>
  );
}
