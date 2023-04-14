import { create } from "zustand";

import { FetchApi } from "../util/fetchApi";
const url = process.env.NEXT_PUBLIC_DB_URL;

export interface Image {
  id: string;
  imagePath: string;
}

interface StoreImage {
  images: Image[];

  getImages: () => void;
  addImage: (process: Image) => void | { saveResult: string };
  updateImage: (images: Image) => void | { saveResult: string };
  deleteImage: (imageId: string) => void;
  reset: () => void;
}

export const useStoreImage = create<StoreImage>((set, get) => ({
  images: [],
  getImages: () => {
    (async () => {
      const res = await FetchApi.GetFetch(`${url}/uploadStructure`);
      let list = res as Image[];
      set({
        images: list,
      });
    })();
  },
  addImage: (process: Image) => {
    (async () => {
      try {
        const res = await FetchApi.PostFetch<Image>(`${url}/addProcessAction`, process);
        return res;
      } catch (error) {
        console.error(error);
      }
    })();
  },
  updateImage: (process: Image) => {
    (async () => {
      try {
        const res = await FetchApi.PutFetch<Image>(`${url}/uploadProcessAction`, process);
        return res;
      } catch (error) {
        console.error(error);
      }
    })();
  },
  deleteImage: (fileName: string) => {
    (async () => {
      try {
        const res = await FetchApi.DeleteFetch(`${url}/deleteImageAction`, fileName, "fileName");
        return res;
      } catch (error) {
        console.error(error);
      }
    })();
  },
  reset: () => {
    set({
      images: [],
    });
  },
}));
