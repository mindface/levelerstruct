import { Process, ProcessItem } from "../store/storeProcess";
import { Task } from "../store/store";
import { Method } from "../store/storeMethod";
import { NextRouter, useRouter } from "next/router";
type Item = Process | Task | Method;

interface PremiseInfo {
  urlCategory: string;
  eventAction: React.MouseEvent;
  setItem: Item;
}

export const tagView = (tags: string) => {
  if (!tags) return;
  const list = tags.split(",");
  return list.map((item, index) => {
    return (
      <span key={index} className="tag mr-1">
        {item}
      </span>
    );
  });
};

// ヒューリィスティクスの規定
export const setPageActionInfo = (item: PremiseInfo) => {
  const type = item.urlCategory.replace("/", "");
  localStorage.setItem("itemType", type);
  localStorage.setItem(`${type}Id`, type);
  localStorage.setItem(`current${type}`, JSON.stringify(item.setItem));
};

export const getPageActionInfo = () => {
  const type = localStorage.getItem("itemType");
  const id = localStorage.getItem(`${type}Id`);
  const current = localStorage.getItem(`current${type}`);
  const currentJson = current ? JSON.parse(current) : null;
  return { type, id, currentJson };
};

function preciseAdd(a: number, b: number) {
  var x = Math.pow(10, Math.max(decimalPlaces(a), decimalPlaces(b)));
  return (Math.round(a * x) + Math.round(b * x)) / x;
}

function decimalPlaces(num: number) {
  const match = ("" + num).match(/(?:\.(\d+))?(?:[eE]([+-]?\d+))?$/);
  if (!match) return 0;
  return Math.max(0, (match[1] ? match[1].length : 0) - (match[2] ? +match[2] : 0));
}

export const averageMethodItem = (item: Method | ProcessItem) => {
  let aj = 0;
  if (!item?.adjustmentNumbers) return 0;
  const list = (item ?? []).adjustmentNumbers as number[];
  list.forEach((num) => {
    if (typeof num === "number") {
      aj = preciseAdd(aj, num);
    }
  });
  const average = aj / (list?.length ?? 1);
  return !Number.isNaN(average) ? average : 0;
};

const diffItem = () => {};

export const getPath = (router_?: NextRouter) => {
  const router = useRouter();
  return `${router?.pathname.replace("/", "")}`;
};
