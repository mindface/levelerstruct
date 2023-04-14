import { create } from "zustand";

import { FetchApi } from "../util/fetchApi";
const url = process.env.NEXT_PUBLIC_DB_URL;

export interface ProcessItem {
  executionId: string;
  title: string;
  detail: string;
  methodId: string;
  structure: string;
  adjustmentNumbers?: number[] | string;
  tagger: string;
}

export interface Process {
  id: string;
  title: string;
  detail: string;
  mainImage: string;
  processdata: ProcessItem[];
  connectId: string;
}

interface StoreProcess {
  process: Process[];

  getProcess: () => void;
  addProcess: (process: Process) => void | { saveResult: string };
  updateProcess: (process: Process) => void | { saveResult: string };
  deleteProcess: (processId: string) => void;
  reset: () => void;
}

export const useStoreProcess = create<StoreProcess>((set, get) => ({
  process: [
    {
      id: "process01",
      connectId: "node fetch 001",
      title: "node fetch title01",
      mainImage: "node fetch mainImage01",
      detail: "node fetch detail",
      processdata: [],
    }
  ],
  getProcess: () => {
    (async () => {
      const res = await FetchApi.GetFetch(`${url}/getProcess`);
      let list = res as Process[];
      list = (list ?? []).map((n) => {
        return {
          ...n,
          processdata: JSON.parse(n.processdata as unknown as string) as ProcessItem[],
        };
      });
      set({
        process: list,
      });
    })();
  },
  addProcess: (process: Process) => {
    (async () => {
      try {
        const res = await FetchApi.PostFetch<Process>(`${url}/addProcessAction`, process);
        return res;
      } catch (error) {
        console.error(error);
      }
    })();
  },
  updateProcess: (process: Process) => {
    (async () => {
      try {
        const res = await FetchApi.PutFetch<Process>(`${url}/uploadProcessAction`, process);
        return res;
      } catch (error) {
        console.error(error);
      }
    })();
  },
  deleteProcess: (processId: string) => {
    (async () => {
      try {
        const res = await FetchApi.DeleteFetch(`${url}/deleteProcessAction`, processId);
        return res;
      } catch (error) {
        console.error(error);
      }
    })();
  },
  reset: () => {
    set({
      process: [],
    });
  },
}));
