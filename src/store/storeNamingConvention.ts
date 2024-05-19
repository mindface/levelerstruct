import { create } from "zustand";
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
    { id: "1", name: "task", path: "task", structure: "受注" },
    { id: "2", name: "process", path: "process", structure: "生産プロセス" },
    { id: "3", name: "method", path: "method", structure: "手段と機材" },
    {
      id: "4",
      name: "movieANDphoto",
      path: "movieANDphoto",
      structure: "作業画像と言語情報について",
    },
    { id: "5", name: "selector", path: "selector", structure: "" },
    { id: "6", name: "limitInfo", path: "limitInfo", structure: "制限した情報化" },
    { id: "7", name: "connection", path: "connection", structure: "作業と結果の紐付け" },
    { id: "8", name: "structureFormation", path: "structureFormation", structure: "" },
    { id: "9", name: "higherRank", path: "higherRank", structure: "受注情報をまとめる" },
    { id: "10", name: "evaluation", path: "evaluation", structure: "評価形成" },
    { id: "11", name: "order", path: "order", structure: "注文内容と概要" },
    { id: "12", name: "managementScreen", path: "managementScreen", structure: "" },
    { id: "13", name: "imageMakerDefinition", path: "imageMakerDefinition", structure: "" },
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
