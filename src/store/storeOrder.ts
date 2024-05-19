import { create } from "zustand";

import { FetchApi } from "../util/fetchApi";
const url = process.env.NEXT_PUBLIC_DB_URL;

// どこかで数値を保持させる。
export interface Order {
  id: string;
  methodId: string;
  title: string;
  detail: string;
  structure: string;
  tagger: string;
  adjustmentNumbers?: number[] | string;
}

interface StoreOrder {
  methods: Order[];

  getMethod: () => void;
  addMethod: (method: Order) => void | { saveResult: string };
  updateMethod: (method: Order) => void | { saveResult: string };
  deleteMethod: (methodId: string) => void;
  reset: () => void;
}

export const useStoreMethod = create<StoreOrder>((set, get) => ({
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
      const list = (res as Order[]).map((item) => {
        return { ...item, adjustmentNumbers: JSON.parse(item.adjustmentNumbers as string) ?? [] };
      });
      set({
        methods: list as Order[],
      });
    })();
  },
  addMethod: (method: Order) => {
    (async () => {
      try {
        const res = await FetchApi.PostFetch<Order>(`${url}/addMethodAction`, method);
        if (res?.saveResult === "ok") {
          get().getMethod();
        }
      } catch (error) {
        console.error(error);
      }
    })();
  },
  updateMethod: (method: Order) => {
    (async () => {
      try {
        const res = await FetchApi.PutFetch<Order>(`${url}/uploadMethodAction`, method);
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
