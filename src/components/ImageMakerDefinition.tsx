import { useState, useRef, useEffect } from "react";
import { Task } from "../store/store";
import { FileUploader } from "./FileUploader";
import { FieldInput } from "./parts/FieldInput";
import { FileInput } from "./parts/FileInput";
const url = process.env.NEXT_PUBLIC_DB_URL;
import init, { swap_color_channels } from "../wasm";

const videoWidth = 560;
const videoHeight = 340;

export function ImageMakerDefinition() {
  const [snedFileName, setSnedFileName] = useState("");
  const [fileName, setFileName] = useState("");
  const [videoCurrentTime, setVideoCurrentTime] = useState(0);
  const imgViewerArea = useRef<HTMLDivElement>(null);
  const video = useRef<HTMLVideoElement>(null);
  const canvas = useRef<HTMLCanvasElement>(null);
  const canvas2 = useRef<HTMLCanvasElement>(null);
  const updateAction = () => {};
  const addAction = () => {};

  useEffect(() => {
    init();
  }, []);

  const addMovieLoadAction = (files: File[]) => {
    if (!files) return;
    const file = files![0];
    const url = URL.createObjectURL(file);
    file.name ?? setFileName((file.name as string).split(".")[0]);
    if (!video.current) return;
    video.current!.src = url;
    let w = 0;
    let h = 0;
    const ctx = canvas.current?.getContext("2d");

    video.current?.addEventListener("loadedmetadata", () => {
      w = videoWidth;
      h = videoHeight;
      canvas.current!.width = w ?? 100;
      canvas.current!.height = h ?? 100;
    });

    video.current?.addEventListener("timeupdate", () => {
      ctx?.drawImage(video.current!, 0, 0, w!, h!);
      console.log(video.current?.currentTime);
      const data = ctx?.getImageData(0, 0, w!, h!).data as Uint8ClampedArray;
      if (data && w && h) {
        const convert = swap_color_channels(data, w ?? 0, h ?? 0);
        const convertedCanvas = new ImageData(new Uint8ClampedArray(convert), w);
        ctx?.putImageData(convertedCanvas, 0, 0, 0, 0, w, h);
      }
    });
  };

  const putCanvasAction = (video: HTMLVideoElement) => {
    const putCanvas = document.createElement("canvas");
    const ctx = putCanvas?.getContext("2d");
    if (!video) return;
    const w = 300;
    const h = 150;
    const scaleFactor = (w ?? 0) / videoWidth;
    ctx?.drawImage(video, 0, 0, w, videoHeight * scaleFactor);
    // const img = new Image();
    // img.src = canvas.current?.toDataURL() ?? "";
    // img.onload = () => {
    //   ctx.drawImage(img, 0, 0);
    // };
    imgViewerArea.current?.appendChild(putCanvas);
  };

  const putCanvasImageAction = () => {
    const ctx = canvas.current?.getContext("2d");
    if (!ctx) return;
    const img = new Image();
    img.src = canvas.current?.toDataURL() ?? "";
    img.onload = () => {
      ctx.drawImage(img, 0, 0);
    };
  };
  const moviewCurrent = () => {
    if (!video.current) return;
    const time = video.current?.currentTime;
    const timeSpan = 800;
    const timeList = [time - 2, time - 1, time, time + 1, time + 2];
    const totalTime = (timeList.length + 1) * timeSpan;
    timeList.forEach((time, index) => {
      if (time >= 0) {
        setTimeout(() => {
          video.current!.currentTime = time ?? 0;
          putCanvasAction(video.current!);
        }, timeSpan * index);
      }
    });
    setTimeout(() => {
      video.current!.currentTime = time;
    }, totalTime);
  };

  const uploadAction = () => {
    (async () => {
      const base64data = canvas.current?.toDataURL("image/png") ?? "";
      const formData = new FormData();
      if (!base64data) return;
      if (snedFileName === "") {
        alert("snedFileNameを入力してください。");
        return;
      }
      formData.append("base64data", base64data?.split(",")[1]);
      formData.append("fileName", snedFileName);
      const config = {
        method: "POST",
        // headers: {
        //   "Content-Type": "multipart/form-data"
        // },
        body: formData,
      };
      const res = await fetch(`${url}/upload64dataAction`, config);
      res.json().then((res) => {
        console.log(res);
      });
    })();
  };

  return (
    <div className="content content-edit">
      <FileUploader />
      <div className="fields p-2">
        <div className="field pb-1">
          <p>動画を画像として切り出して保存します。</p>
          <FileInput
            id="filename"
            label="filename"
            value={snedFileName}
            eventChange={(value: File[]) => {
              addMovieLoadAction(value);
            }}
          />
        </div>
        <div className="field pb-1">
          <div className="canvas-viewer">
            <canvas ref={canvas}></canvas>
            <canvas ref={canvas2}></canvas>
          </div>
        </div>
        <div className="field pb-1">
          <div className="view-content video">
            <video controls ref={video} width={videoWidth} height={videoHeight}></video>
          </div>
          <FieldInput
            id="filename"
            label="filename"
            value={snedFileName}
            eventChange={(value: string) => {
              setSnedFileName(value);
            }}
          />
        </div>
        <div className="field pb-1">
          <div className="viewer" ref={imgViewerArea}></div>
        </div>
        <div className="field pb-1">
          <button onClick={moviewCurrent}>send moviewCurrent(前後0.8秒間)</button>
          <button onClick={uploadAction}>send uploadAction</button>
        </div>
        <div className="field">
          <button className="btn" onClick={updateAction}>
            更新
          </button>
          <button className="btn" onClick={addAction}>
            保存
          </button>
        </div>
      </div>
    </div>
  );
}
