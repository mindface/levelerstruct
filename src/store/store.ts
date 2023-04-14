import { createContext, useContext } from "react";
import { createStore, useStore as useZustandStore } from "zustand";
import { FetchApi } from "../util/fetchApi";
const url = process.env.NEXT_PUBLIC_DB_URL;

export interface Task {
  id: string;
  title: string;
  detail: string;
  runNumber: number;
  purposeAchieved: number;
  useProcessId: string;
}

interface StoreInterface {
  tasks: Task[];

  getTask: () => void;
  addTask: (task: Task) => void | { saveResult: string };
  updateTask: (task: Task) => void | { saveResult: string };
  deleteTask: (id: string) => void;
  reset: () => void;
}

const getDefaultInitialState = () => ({
  tasks: [
    {
      id: "1",
      title: "node01",
      detail: "node01",
      runNumber: 0,
      purposeAchieved: 0,
      useProcessId: "node01"
    },
  ],
});

export type StoreType = ReturnType<typeof initializeStore>;

const zustandContext = createContext<StoreType | null>(null);

export const Provider = zustandContext.Provider;

export const useStore = <T>(selector: (state: StoreInterface) => T) => {
  const store = useContext(zustandContext);
  if (!store) throw new Error("Store is missing the provider");
  return useZustandStore(store, selector);
};

export const initializeStore = (preloadedState: Partial<StoreInterface> = {}) => {
  return createStore<StoreInterface>((set, get) => ({
    ...getDefaultInitialState(),
    ...preloadedState,
  
    getTask: () => {
      (async () => {
        const res = await FetchApi.GetFetch(`${url}/getTask`);
        set({
          tasks: res as Task[],
        });
      })();
    },
    addTask: (task: Task) => {
      (async () => {
        const res = await FetchApi.PostFetch<Task>(`${url}/addTask`, task);
        if (res?.saveResult === "ok") {
          get().getTask();
        }
        return res;
      })();
    },
    updateTask: (task: Task) => {
      (async () => {
        const res = await FetchApi.PutFetch<Task>(`${url}/uploadTaskAction`, task);
        if (res?.saveResult === "ok") {
          get().getTask();
        }
      })();
    },
    deleteTask: (id: string) => {
      (async () => {
        const res = await FetchApi.DeleteFetch(`${url}/deleteTaskAction`, id);
        console.log(res);
      })();
    },
    reset: () => {},
  }));
};
