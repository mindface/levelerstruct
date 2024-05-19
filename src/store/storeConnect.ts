import { create } from "zustand";
import { Method } from "./storeMethod";
import { FetchApi } from "../util/fetchApi";
const url = process.env.NEXT_PUBLIC_DB_URL;

interface ModelInfo {
  id: string;
  mdoelId: string;
  setId: string;
}

interface WorkerInfo {
  userId: string;
  differenceInt: string;
  level: string;
  unit: string;
  experience: string;
  purposeRate: string;
  case: string;
  authorityMethod: [];
}

export interface Connect {
  id: string;
  title: string;
  detail: string;
  // connectdata: ConnectItem[];
  connectId: string;
}

interface StoreConnect {
  connects: Connect[];
  workerInfo: WorkerInfo;
  modelInfo: ModelInfo;
  connectMethod: Method;

  getConnect: () => void;
  getWorker: () => void;
  setConnectMethod: (mehtod: Method) => string;
  addConnect: (connect: Connect) => void | { saveResult: string };
  updateConnect: (connect: Connect) => void | { saveResult: string };
  deleteConnect: (connectId: string) => void;
  reset: () => void;
}

export const useStoreConnect = create<StoreConnect>((set, get) => ({
  connects: [
    {
      id: "process01",
      connectId: "node fetch 001",
      title: "node fetch title01",
      detail: "node fetch detail",
      // connectsdata: [],
    },
  ],
  workerInfo: {
    userId: "none",
    differenceInt: "0",
    level: "0",
    unit: "0",
    experience: "0",
    purposeRate: "0",
    case: "0",
    authorityMethod: [],
  },
  modelInfo: {
    id: "00",
    mdoelId: "00",
    setId: "00",
  },
  connectMethod: {
    id: "1",
    methodId: "noset",
    title: "noset",
    detail: "noset",
    structure: "noset",
    tagger: "",
  },
  getWorker: () => {
    (async () => {
      const res = await FetchApi.GetFetch("/workerInfo.json");
      const info = res as WorkerInfo;
      set({
        workerInfo: info,
      });
    })();
  },
  getModel: () => {
    (async () => {
      const res = await FetchApi.GetFetch("/modelInfo.json");
      const info = res as ModelInfo;
      set({
        modelInfo: info,
      });
    })();
  },
  setConnectMethod: (mehtod) => {
    set({
      connectMethod: mehtod,
    });
    return "end";
  },
  getConnect: () => {
    (async () => {
      const res = await FetchApi.GetFetch(`${url}/getProcess`);
      let list = res as Connect[];
      // list = list.map((n) => {
      //   return {
      //     ...n,
      //     connectsdata: JSON.parse(n.connects as unknown as string) as ProcessItem[],
      //   };
      // });
      set({
        connects: list,
      });
    })();
  },
  addConnect: (connect: Connect) => {
    (async () => {
      try {
        const res = await FetchApi.PostFetch<Connect>(`${url}/addProcessAction`, connect);
        return res;
      } catch (error) {
        console.error(error);
      }
    })();
  },
  updateConnect: (connect: Connect) => {
    (async () => {
      try {
        const res = await FetchApi.PutFetch<Connect>(`${url}/uploadProcessAction`, connect);
        return res;
      } catch (error) {
        console.error(error);
      }
    })();
  },
  deleteConnect: (connectId: string) => {
    (async () => {
      try {
        const res = await FetchApi.DeleteFetch(`${url}/deleteProcessAction`, connectId);
        console.log(res);
        return res;
      } catch (error) {
        console.error(error);
      }
    })();
  },
  reset: () => {
    set({
      connects: [],
    });
  },
}));
