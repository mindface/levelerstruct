import Image from "next/image";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { ProcessItem } from "../store/storeProcess";
import { useStoreMethod, Method } from "../store/storeMethod";
import { useStoreConnect } from "../store/storeConnect";
import xSmall from "../images/x-small.svg";
import { MethodDialog } from "./MethodDialog";

type Props = {
  type: string;
  rate?: number;
  processItems: ProcessItem[];
  detailChange?: (methodId:string, value:string) => void
  deleteChange?: (index:number) => void
}

export function ProcessCards(props: Props) {
  const router = useRouter();
  const { type, processItems, detailChange, deleteChange, rate } = props;
  const [makeProcess, setMakeProcess] = useState<ProcessItem[]>([]);
  const [makebrnachs, setMakebrnachs] = useState<{id: number,processItem:ProcessItem[]}[]>([]);
  const { methods, getMethod } = useStoreMethod((store) => ({
    methods: store.methods,
    getMethod: store.getMethod,
  }));
  const { setConnectMethod } = useStoreConnect((store) => ({
    setConnectMethod: store.setConnectMethod
  }));

  const detailChangeAction = detailChange ?? (() => {});
  const deleteChangeAction = deleteChange ?? (() => {});
  
  useEffect(() => {
    setMakeProcess(processItems);
  }, [processItems]);

  useEffect(() => {
    if(methods.length) {
      getMethod();
    }
  }, []);

  const setMethod = (methodId: string) => {
    let method:(Method | object) = {};
    (methods ?? []).forEach((item) => {
      if(item.methodId === methodId) {
        method = item;
      }
    });
    return method as Method;
  }

  const movePage = (methodId: string) => {
    document.body.removeAttribute("style");
    methods.forEach((item) => {
      if(item.methodId === methodId) {
        const res = setConnectMethod(item);
        if(res === "end") {
          router.push("/connection");
        }
      }
    });
  }

  const brnachAction = (item: ProcessItem) => {
    const tags = item.tagger;
    const list: Method[] = [];
    methods.forEach((method) => {
      if(tags?.indexOf(method.tagger) > -1) {
        list.push(method);
      }
    });
    return list;
  }

  const alliesMethod = (method: Method, processId: number) => {
    const list = makeProcess.map((item,index) => {
      if(index === processId) {
        return {
          executionId: "",
          title: method.title ?? "",
          detail: method.detail ?? "",
          methodId: method.methodId ?? "",
          structure: method.structure ?? "",
          tagger: method.tagger ?? "",
          adjustmentNumbers: method.adjustmentNumbers ?? [],
        };
      }
      return item;
    });
    setMakebrnachs([...makebrnachs,{id:makebrnachs.length+1,processItem: list}]);
  }

  const resutSettings = (items: ProcessItem[]) => {
    const number = makeProcess.length;
    let counter = 0;
    items.forEach((item) => {
      (item.adjustmentNumbers as number[])?.forEach((addItem:number) => {
        counter = counter + addItem;
      })
    })
    return counter;
  }

  return (
    <div>
      <div className="select-method over-scroll flex-nw scroll-shadow">
        <div className="minh150 flex-nw p-1" style={{ minWidth: `${makeProcess.length * 320}px` }}>
          {makeProcess.map((item, index) => (
            <div key={`${item.methodId}-${index}`} className="method-card max320 box-shadow p-1 positionbase">
              {type === "edit" && <span
                className="close cursor box-shadow"
                onClick={() => deleteChangeAction(index)}
              >
                <Image src={xSmall} alt="" />
              </span>}
              <MethodDialog item={setMethod(item.methodId)} />
              <div className="fields">
                <div className="field pb-1">
                  手法タイトル : {item.title}
                  { type !== "connection" && <button className="btn f-small" onClick={() => movePage(item.methodId)}>move</button>}
                </div>
                { type !== "connection" && <div className="field pb-1">
                  <div className="similar-method positionbase cursol-absolute-view p-1">
                    <span className="background-sub-color d-inline p-1 f-small" onClick={() => brnachAction(item)}>
                      比較プロット作成 
                    </span>
                    <div className="over-scroll hover-absolute-view maxh90 box-shadow">
                      <ul className="list background-white">
                        {brnachAction(item).map((brnachItem,k) => {
                          return (<li key={`brnachItem${k}`} className="p-1" onClick={() => alliesMethod(brnachItem,index)}><div className="">{brnachItem.title}</div></li>);
                        })}
                      </ul>
                    </div>
                  </div>
                </div>}
                <div className="field pb-1">
                  調整範囲 - <br />
                  { type === "view" &&
                    <div className="detail">
                      {item.detail}
                    </div>}
                  { type === "edit" &&
                    <textarea
                      className="textarea"
                      cols={10}
                      defaultValue={item.detail}
                      onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) => {
                        detailChangeAction(item.methodId,e.target.value);
                      }}
                    />}
                </div>
                <div className="field pb-1">
                  {(item.adjustmentNumbers as number[])?.map((adjustmentNumber:number,index:number) => {
                    return <span key={`adjustmentNumber${index}`} className="d-b p-1">{adjustmentNumber+(rate ?? 0)}</span>
                  })}
                </div>
              </div>
            </div>
          ))}
          <div className="result-number p-1 background-white positionTopLeft box-shadow">
            adjustmentNumbers | {resutSettings(makeProcess)}
          </div>
        </div>
      </div>
      {makebrnachs.map((brnachItem) => <div key={brnachItem.id} className="select-method over-scroll flex-nw scroll-shadow">
        <div className="minh150 flex-nw p-1" style={{ minWidth: `${makeProcess.length * 320}px` }}>
          {brnachItem.processItem.map((item, index) => (
            <div key={`processItem${index}`} className="method-card max320 box-shadow p-1 positionbase">
              {item.methodId}
              {type === "edit" && <span
                className="close cursor box-shadow"
                onClick={() => deleteChangeAction(index)}
              >
                <Image src={xSmall} alt="" />
              </span>}
              <MethodDialog item={setMethod(item.methodId)}  />
              <div className="fields">
                <div className="field pb-1">
                  手法タイトル : {item.title}
                  <button onClick={() => movePage(item.methodId)}>move</button>
                </div>
                <div className="field pb-1">
                  <div className="similar-method positionbase cursol-absolute-view p-1">
                    <button className="btn f-small" onClick={() => brnachAction(item)}>
                      比較プロット作成
                    </button>
                    <div className="over-scroll hover-absolute-view maxh90 box-shadow">
                      <ul className="list background-white">
                        {brnachAction(item).map((brnachItem) => {
                          return (<li key={brnachItem.id} className="p-1" onClick={() => alliesMethod(brnachItem,index)}><div className="">{item.title}</div></li>);
                        })}
                      </ul>
                    </div>
                  </div>
                </div>
                <div className="field pb-1">
                  調整範囲 - <br />
                  { type === "view" &&
                    <div className="detail">
                      {item.detail}
                    </div>}
                  { type === "edit" &&
                    <textarea
                      className="textarea"
                      cols={10}
                      defaultValue={item.detail}
                      onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) => {
                        detailChangeAction(item.methodId,e.target.value);
                      }}
                    />}
                </div>
              </div>
            </div>
          ))}
          <div className="result-number p-1 background-white positionTopLeft box-shadow">
            adjustmentNumbers | {resutSettings(brnachItem.processItem)}
          </div>
        </div>
      </div>)}
  </div>)
}
