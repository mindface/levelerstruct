import create from "zustand";

import { FetchApi } from "../util/fetchApi";
const url = process.env.NEXT_PUBLIC_DB_URL;

// どこかで数値を保持させる。
export interface Method {
  id: string;
  methodId: string;
  title: string;
  detail: string;
  structure: string;
  tagger: string;
  adjustmentNumbers?: number[] | string;
}

interface StoreMethod {
  methods: Method[];

  getMethod: () => void;
  addMethod: (method: Method) => void | { saveResult: string };
  updateMethod: (method: Method) => void | { saveResult: string };
  deleteMethod: (methodId: string) => void;
  reset: () => void;
}

export const useStoreMethod = create<StoreMethod>((set, get) => ({
  methods: [
    {
      id: "1",
      methodId: "methodId01",
      title: "title01",
      detail: "methodIdmethodIdmethodId",
      structure: "methodIdmethodId",
      tagger: "",
    },
  ],
  getMethod: () => {
    (async () => {
      const res = await FetchApi.GetFetch(`${url}/getMethods`);
      const list = (res as Method[]).map((item) => {
        return { ...item, adjustmentNumbers: JSON.parse(item.adjustmentNumbers as string) ?? [] };
      });
      set({
        methods: list as Method[],
      });
    })();
  },
  addMethod: (method: Method) => {
    (async () => {
      try {
        const res = await FetchApi.PostFetch<Method>(`${url}/addMethodAction`, method);
        if (res?.saveResult === "ok") {
          get().getMethod();
        }
      } catch (error) {
        console.error(error);
      }
    })();
  },
  updateMethod: (method: Method) => {
    (async () => {
      try {
        const res = await FetchApi.PutFetch<Method>(`${url}/uploadMethodAction`, method);
        if (res?.saveResult === "ok") {
          get().getMethod();
        }
      } catch (error) {
        console.error(error);
      }
    })();
  },
  deleteMethod: (methodId: string) => {
    (async () => {
      try {
        const res = await FetchApi.DeleteFetch(`${url}/deleteMethodAction`, methodId);
        if (res?.saveResult === "ok") {
          get().getMethod();
        }
      } catch (error) {
        console.error(error);
      }
    })();
  },
  reset: () => {
    set({
      methods: [],
    });
  },
}));
