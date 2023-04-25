import create from "zustand";

import { FetchApi } from "../util/fetchApi";
const url = process.env.NEXT_PUBLIC_DB_URL;

export interface NamingDefinition {
  id: string;
  name: string;
  title: string;
  detail: string;
  structure: string;
}

export interface UiDefinition {
  id: string;
  name: string;
  path: string;
  structure: string;
}

interface StoreNamingDefinition {
  namingDefinitions: NamingDefinition[];
  uiDefinitions: UiDefinition[];

  updateUiDefinition: (uiDefinitions: UiDefinition[]) => void | { saveResult: string };
  deleteDefinitions: (namingDefinitionId: string) => void;
  reset: () => void;
}

export const useStoreNamingDefinition = create<StoreNamingDefinition>((set, get) => ({
  namingDefinitions: [
    {
      id: "1",
      name: "title01",
      title: "title01",
      detail: "methodIdmethodIdmethodId",
      structure: "methodIdmethodId",
    },
  ],
  uiDefinitions: [
    { id: "1", name: "task", path: "task", structure: "" },
    { id: "2", name: "process", path: "process", structure: "" },
    { id: "3", name: "method", path: "method", structure: "" },
    { id: "4", name: "movieANDphoto", path: "movieANDphoto", structure: "" },
    { id: "5", name: "selector", path: "selector", structure: "" },
    { id: "6", name: "limitInfo", path: "limitInfo", structure: "" },
    { id: "7", name: "connection", path: "connection", structure: "" },
    { id: "8", name: "structureFormation", path: "structureFormation", structure: "" },
    { id: "9", name: "higherRank", path: "higherRank", structure: "" },
  ],
  updateUiDefinition: (uiDefinitions: UiDefinition[]) => {
    set({
      uiDefinitions: uiDefinitions,
    });
  },
  deleteDefinitions: (namingDefinitionId: string) => {
    (async () => {
      // try {
      //   const res = await FetchApi.DeleteFetch(`${url}/deleteMethodAction`, namingDefinitionId);
      //   if (res?.saveResult === "ok") {
      //     get().getMethod();
      //   }
      // } catch (error) {
      //   console.error(error);
      // }
    })();
  },
  reset: () => {
    set({
      namingDefinitions: [],
    });
  },
}));
