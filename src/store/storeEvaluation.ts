import { create } from "zustand";

import { FetchApi } from "../util/fetchApi";
const url = process.env.NEXT_PUBLIC_DB_URL;

export interface Evaluation {
  id: string;
  title: string;
  categoryId: string;
  makeEvaluation: { key: string; value: string }[];
  structure: string;
  adjustmentNumbers?: number[] | string;
}

interface StoreEvaluation {
  evaluations: Evaluation[];

  getEvaluation: () => void;
  addEvaluation: (evaluation: Evaluation) => void | { saveResult: string };
  updateEvaluation: (evaluation: Evaluation) => void | { saveResult: string };
  deleteEvaluation: (evaluationId: string) => void;
  reset: () => void;
}

export const useStoreEvaluation = create<StoreEvaluation>((set, get) => ({
  evaluations: [
    {
      id: "1",
      categoryId: "methodId01",
      title: "title01",
      makeEvaluation: [],
      structure: "methodIdmethodId",
      adjustmentNumbers: [],
    },
  ],
  getEvaluation: () => {
    (async () => {
      const res = await FetchApi.GetFetch(`/evaluation.json`);
      set({
        evaluations: res as Evaluation[],
      });
    })();
  },
  addEvaluation: (method: Evaluation) => {
    (async () => {
      try {
        const res = await FetchApi.PostFetch<Evaluation>(`${url}/addMethodAction`, method);
        if (res?.saveResult === "ok") {
          get().getEvaluation();
        }
      } catch (error) {
        console.error(error);
      }
    })();
  },
  updateEvaluation: (evaluation: Evaluation) => {
    (async () => {
      try {
        const res = await FetchApi.PutFetch<Evaluation>(`${url}/uploadMethodAction`, evaluation);
        if (res?.saveResult === "ok") {
          get().getEvaluation();
        }
      } catch (error) {
        console.error(error);
      }
    })();
  },
  deleteEvaluation: (evaluationId: string) => {
    (async () => {
      try {
        const res = await FetchApi.DeleteFetch(`${url}/deleteMethodAction`, evaluationId);
        if (res?.saveResult === "ok") {
          get().getEvaluation();
        }
      } catch (error) {
        console.error(error);
      }
    })();
  },
  reset: () => {
    set({
      evaluations: [],
    });
  },
}));
