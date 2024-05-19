import { useEffect, useState } from "react";
import { Task } from "../store/store";
import { useStoreImage, Image as IImage } from "../store/storeImage";

type Props = {
  type: string;
  item?: Task;
  removeDialog?: () => void;
};

export function ImageListView(props: Props) {
  const { type, item, removeDialog } = props;
  const { images, movies, getImages, getMovies, deleteImage } = useStoreImage((store) => ({
    images: store.images,
    movies: store.movies,
    getImages: store.getImages,
    getMovies: store.getMovies,
    deleteImage: store.deleteImage,
  }));
  const [listImage, setListImage] = useState<IImage[]>([]);
  const removeDialogAction = removeDialog ?? (() => {});

  const deleteAction = (fileName: string) => {
    if (confirm("この作業は取り消せません")) {
      deleteImage(fileName);
    }
  };

  const copyAction = (path: string) => {
    navigator.clipboard.writeText(path);
  };

  useEffect(() => {
    if ((images ?? []).length) {
      setListImage(images);
    }
  }, [images]);

  useEffect(() => {
    if (type === "viewImage") {
      getImages();
    }
    if (type === "viewMovie") {
      getMovies();
    }
  }, [type]);

  const reFileName = (path: string) => {
    return path.split("/").pop();
  };

  return (
    <div className="content content-edit">
      <div className="p-1">
        <div className="title">タイトル - 動画から形成画像リスト</div>
      </div>
      {type === "viewImage" && (
        <ul className="list image-list flex">
          {(images ?? []).map((item) => (
            <li key={item.id} className="item positionbase">
              <div className="image-box">
                <img className="img" src={item.imagePath} alt="" />
              </div>
              <div className="actions">
                <button
                  onClick={() => deleteAction(reFileName(item.imagePath) ?? "")}
                  className="btn f-small"
                >
                  {" "}
                  delete
                </button>
                <button onClick={() => copyAction(item.imagePath ?? "")} className="btn f-small">
                  copy
                </button>
              </div>
              <p className="name p-1">{reFileName(item.imagePath)}</p>
            </li>
          ))}
        </ul>
      )}
      {type === "viewMovie" && (
        <ul className="list image-list flex">
          {(movies ?? []).map((item) => (
            <li key={item.id} className="item positionbase">
              <div className="image-box">
                <video
                  className="video"
                  width={340}
                  height={180}
                  src={item.imagePath}
                  controls
                ></video>
              </div>
              <div className="actions">
                <button
                  onClick={(e) => {
                    e.preventDefault();
                    deleteAction(reFileName(item.imagePath) ?? "");
                  }}
                  className="btn f-small"
                >
                  delete
                </button>
                <button
                  onClick={(e) => {
                    e.preventDefault();
                    copyAction(item.imagePath ?? "");
                  }}
                  className="btn f-small"
                >
                  copy
                </button>
              </div>
              <p className="name p-1">{reFileName(item.imagePath)}</p>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
