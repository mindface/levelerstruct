import React, { useState, useRef } from "react";
import { FileInput } from "./parts/FileInput";
const url = process.env.NEXT_PUBLIC_DB_URL;

type Props = {
  type?: string;
};

export function FileUploader(props: Props) {
  const { type } = props;
  const [snedFileName, setSnedFileName] = useState("");
  const [fileName, setFileName] = useState("");
  const [uploadFile, setUploadFile] = useState<File>();
  const imgViewerArea = useRef<HTMLDivElement>(null);
  const canvas = useRef<HTMLCanvasElement>(null);

  const addMovieLoadAction = (files: File[]) => {
    if (!files) return;
    const file = files![0];
    const w = canvas.current?.clientWidth ?? 0;
    const h = canvas.current?.clientHeight ?? 0;
    if (type === "photo") {
      const reader = new FileReader();
      const ctx = canvas.current?.getContext("2d");
      reader.onload = (ev) => {
        const image = new Image();
        if (ev.target?.result) {
          image.src = String(ev.target?.result);
        }
        image.onload = () => {
          const scaleFactor = (canvas.current?.width ?? 0) / image.width;
          ctx?.drawImage(image, 0, 0, w, image.height * scaleFactor);
        };
      };
      reader.readAsDataURL(file);
    }
    setUploadFile(file);
    file.name ?? setFileName((file.name as string).split(".")[0]);
  };

  const uploadImageAction = () => {
    (async () => {
      const formData = new FormData();
      if (!uploadFile) return;
      formData.append("image", uploadFile);
      const config = {
        method: "POST",
        // headers: {
        //   "Content-Type": "multipart/form-data"
        // },
        body: formData,
      };
      const res = await fetch(`${url}/uploadStructureAction`, config);
      res.json().then((res) => {
        console.log(res);
      });
    })();
  };

  const uploadMovieAction = () => {
    (async () => {
      const formData = new FormData();
      if (!uploadFile) return;
      formData.append("movie", uploadFile);
      const config = {
        method: "POST",
        // headers: {
        //   "Content-Type": "multipart/form-data"
        // },
        body: formData,
      };
      const res = await fetch(`${url}/uploadMovieAction`, config);
      res.json().then((res) => {
        console.log(res);
      });
    })();
  };

  return (
    <div className="content content-edit">
      <div className="fields p-2">
        <div className="field pb-1">
          <FileInput
            id="filename"
            label="filename"
            value={snedFileName}
            eventChange={(value: File[]) => {
              addMovieLoadAction(value);
            }}
          />
        </div>
        {type === "photo" && (
          <div className="field pb-1">
            <div className="canvas-viewer">
              <canvas ref={canvas}></canvas>
            </div>
          </div>
        )}
        {type === "photo" && (
          <div className="field pb-1">
            <div className="viewer" ref={imgViewerArea}></div>
          </div>
        )}
        <div className="field pb-1">
          {type === "photo" && <button onClick={uploadImageAction}>uploadImageAction</button>}
          {type === "movie" && <button onClick={uploadMovieAction}>uploadMovieAction</button>}
        </div>
      </div>
    </div>
  );
}
