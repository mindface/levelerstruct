import React, { useEffect, useState } from "react";
import { Task } from "../store/store";
import { useStoreImage, Image as IImage } from "../store/storeImage";

type Props = {
  type: string;
  item?: Task;
  removeDialog?: () => void;
};

export function ImageListView(props: Props) {
  const { images, getImages, deleteImage } = useStoreImage((store) => ({
    images: store.images,
    getImages: store.getImages,
    deleteImage: store.deleteImage
  }));
  const [listImage, setListImage] = useState<IImage[]>([]);

  const type = props.type;
  const task = props.item;
  const removeDialog = props.removeDialog ?? (() => {});

  const deleteAction = (fileName:string) => {
    if(confirm("この作業は取り消せません")) {
      deleteImage(fileName);
    }
  }

  const copyAction = (path: string) => {
    navigator.clipboard.writeText(path);
  }

  useEffect(() => {
    if((images ?? []).length) {
      setListImage(images);      
    }
  }, [images]);

  useEffect(() => {
    getImages();
  },[]);

  const reFileName = (path: string) => {
    return path.split("/").pop();
  }

  return (
    <div className="content content-edit">
      <div className="p-1">
        <div className="title">タイトル - 動画から形成画像リスト</div>
      </div>
      <ul className="list image-list flex">
        {(images ?? []).map((item) => <li key={item.id} className="item positionbase">
          <div className="actions">
            {type !== "edit" && <button
              onClick={() => deleteAction(reFileName(item.imagePath) ?? "")}
              className="btn f-small"
            >
               delete
            </button>}
            <button
              onClick={() => copyAction((item.imagePath) ?? "")}
              className="btn f-small"
            >
               copy
            </button>
          </div>
          <div className="image-box">
            <img className="img" src={item.imagePath} alt="" />
          </div>
          <p className="name p-1">{reFileName(item.imagePath)}</p>
        </li> )}
      </ul>
    </div>
  );
}
