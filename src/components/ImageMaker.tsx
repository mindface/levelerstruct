import { useState, useRef } from "react";
import { Task } from "../store/store";
import { FileUploader } from "./FileUploader";
import { FieldInput } from "./parts/FieldInput";
import { FileInput } from "./parts/FileInput";
const url = process.env.NEXT_PUBLIC_DB_URL;

type Props = {
  type: string;
  item?: Task;
  removeDialog?: () => void;
};

const videoWidth = 560;
const videoHeight = 400;

export function ImageMaker(props: Props) {
  const { type } = props;
  const [snedFileName, setSnedFileName] = useState("");
  const [fileName, setFileName] = useState("");
  const imgViewerArea = useRef<HTMLDivElement>(null);
  const video = useRef<HTMLVideoElement>(null);
  const canvas = useRef<HTMLCanvasElement>(null);

  const updateAction = () => {};
  const addAction = () => {};

  const addMovieLoadAction = (files: File[]) => {
    if (!files) return;
    const file = files![0];
    const url = URL.createObjectURL(file);
    file.name ?? setFileName((file.name as string).split(".")[0]);
    if (!video.current) return;
    video.current!.src = url;
    video.current?.addEventListener("timeupdate", (e: Event) => {
      const ctx = canvas.current?.getContext("2d");
      const w = video.current?.clientWidth;
      const h = video.current?.clientHeight;
      canvas.current!.width = w ?? 100;
      canvas.current!.height = h ?? 100;
      ctx?.drawImage(video.current!, 0, 0, w!, h!);
    });
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
          <button onClick={uploadAction}>send uploadAction</button>
        </div>
        <div className="field">
          {type === "edit" ? (
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
