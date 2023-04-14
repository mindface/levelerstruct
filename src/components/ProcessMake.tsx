import React, { useEffect, useState } from "react";
import Image from "next/image";
import { ProcessCards } from "./ProcessCards";
import { useStoreProcess, Process, ProcessItem } from "../store/storeProcess";
import { useStoreMethod, Method } from "../store/storeMethod";
import plusCircle from "../images/plus-circle.svg";
import { FieldInput } from "./parts/FieldInput";

type Props = {
  type: string;
  process?: Process;
  removeTab?: () => void;
};

type Inter = {id:string,items: ProcessItem[]}[]

export function ProcessMake(props: Props) {
  const [title, setTitle] = useState("");
  const [detail, setDetail] = useState("");
  const [connectId, setConnectId] = useState("");
  const [filterText, setFilterText] = useState("");
  const [viewTagger, setViewTagger] = useState<string[]>([]);
  const [imagePath,setImagePath] = useState("");
  const [increasedTags, setIncreasedTags] = useState<string[]>([]);
  const [filterTagger, setFilterTagger] = useState<string[]>([]);
  const [makeProcess, setMakeProcess] = useState<ProcessItem[]>([]);
  const [makeSimilarProcess, setMakeSimilarProcess] = useState<Inter>([]);
  const [listMethods, setListMethod] = useState<Method[]>([]);
  const editType = props.type;
  const _process = props.process;
  const removeTab = props.removeTab ?? (() => {});

  const { methods, getMethod } = useStoreMethod((store) => ({
    methods: store.methods,
    getMethod: store.getMethod
  }));

  const { process, getProcess, addProcess, updateProcess } = useStoreProcess((store) => ({
    process: store.process,
    getProcess: store.getProcess,
    addProcess: store.addProcess,
    updateProcess: store.updateProcess
  }));

  const addMethod = (method: Method) => {
    const item = {
      executionId: "",
      title: method.title,
      detail: "",
      methodId: method.methodId,
      structure: "",
      tagger: method.tagger,
      adjustmentNumbers: method.adjustmentNumbers,
    };
    setMakeProcess([...makeProcess, item]);
  };

  const removeMethod = (methodIndex: number) => {
    const list = makeProcess.filter((item,index) => index !== methodIndex);
    setMakeProcess(list);
  };

  const upProcessItem = (methodId: string, disc: string) => {
    const list = makeProcess.map((item: ProcessItem) => {
      if (item.methodId === methodId) {
        item.detail = disc;
      }
      return item;
    });
    setMakeProcess(list);
  };

  const addProcessAction = () => {
    addProcess({
      id: `process0${process.length + 1}`,
      title: title,
      detail: detail,
      mainImage: imagePath,
      processdata: makeProcess,
      connectId: connectId,
    });
    removeTab();
  };

  const updateProcessAction = () => {
    updateProcess({
      id: _process?.id ?? "",
      title: title,
      detail: detail,
      mainImage: imagePath,
      processdata: makeProcess,
      connectId: connectId,
    });
  };

  const selectTagger = (selectTag: string) => {
    if(!selectTag) return methods;
    if(!filterTagger.includes(selectTag)) {
      setFilterTagger([...filterTagger,selectTag]);
    }else {
      const _ = filterTagger.filter((t) => t !== selectTag);
      setFilterTagger(_);
    }
  }

  const setMethodAction = () => {
    let list:Method[] = [];
    let viewTaggers:string[] = [];
    methods.forEach((item) => {
      item.tagger.split(",").forEach((tag) => {
        if(!viewTaggers.includes(tag)) {
          viewTaggers.push(tag);
        }
      });
      if(filterTagger.join(",").indexOf(item.tagger) !== -1) {
        list.push(item);
        return;
      }
      if(item.tagger.indexOf(filterText) > 0) {
        list.push(item);
        return;
      }
    });
    if(filterText === "" && filterTagger.length === 0) {
      list = methods;
    }
    setViewTagger(viewTaggers);
    setListMethod(list);
  }

  const increasedProductionAction = () => {
    console.log(makeProcess)
    const list:Inter = [];
    makeProcess.forEach((item,k) => {
      let setId = "";
      list.push({
        id: `re${k+1}`,
        items: []
      });
      methods.forEach((method,m) => {
        if(item.tagger?.indexOf(method.tagger) > -1) {
          list[k].items.push({
              executionId: "",
              title: method.title ?? "",
              detail: method.detail ?? "",
              methodId: method.methodId ?? "",
              structure: method.structure ?? "",
              tagger: method.tagger ?? "",
              adjustmentNumbers: method.adjustmentNumbers ?? [],
            });
         }
      })
    });
    const _list: any = [];
      let __list: any = [];
      list[0].items.forEach((d,l) => {
        __list = [d];
        list[l]?.items?.forEach((item,n) => {
          if(n === 0) return;
          __list.push(item);
        });
        _list.push(__list);
      });
    // makeSimilarProcess
  }

  useEffect(() => {
    getMethod();
  },[]);

  useEffect(() => {
    if (_process) {
      setTitle(_process.title ?? "");
      setDetail(_process.detail ?? "");
      setConnectId(_process.connectId ?? "");
      setMakeProcess(_process.processdata ?? "");
      setImagePath(_process.mainImage ?? "");
    }
  }, [getMethod, _process]);

  useEffect(() => {
    setMethodAction();
  },[filterTagger,filterText,methods]);

  return (
    <div className="fields p-2">
      <div className="field pb-1">
        タイトル :
        <input
          type="text"
          className="input"
          value={title}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) => setTitle(e.target?.value)}
        />
      </div>
      <div className="field pb-1">
        コネクトID :
        <input
          type="text"
          className="input"
          value={connectId}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) => setConnectId(e.target?.value)}
        />
      </div>
      <div className="field pb-1">
        setImagePath :
        <input
          type="text"
          className="input"
          value={imagePath}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) => setImagePath(e.target?.value)}
        />
        <div className="max320">
          {imagePath !=="" && <img src={imagePath} alt="" />}
        </div>
      </div>
      <div className="field pb-1">
        <div className="add-select-method">
          <div className="d-inline input-filter positionbase cursol-absolute-view">
            <p className="p-1">セレクトタグ : </p>
            <div className="d-line p-1 mb-1 border">
              {filterTagger.map((item,index) =>  
                <span key={`filterTag${index}`} className="tag d-inline mr-1">
                  {item}
                </span>)}
            </div>
            <div className="hover-absolute-view background-white box-shadow p-1">
              {viewTagger.map((item, index) => (
                <span
                  key={`viewTag${index}`}
                  className="tag d-inline cursor mr-1"
                  onClick={() => {
                    selectTagger(item);
                  }}
                >
                  {item}
                </span>
              ))}
            </div>
          </div>
          <div className="input-filter-wrap">
            <div className="d-inline input-filter positionbase">
              <FieldInput
                id="add-select-method"
                label="項目制限"
                eventChange={(value: string) => {
                  setFilterText(value);
                }}
              />
              <div className="input-filter-view over-scroll box-shadow border">
                <div className="selects-method p-1 pb-3">
                  {listMethods.map((method,index) => (
                    <div
                      key={index}
                      className="select-card max420 positionbase cursol-absolute-view p-1"
                    >
                      <h3 className="title pb-1">{method.title}</h3>
                      <button className="btn btn-icon radius" onClick={() => addMethod(method)}>
                        <Image src={plusCircle} alt="" />
                      </button>
                      <div className="info-card hover-absolute-view box-shadow p-1">
                        {method.detail}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
        <ProcessCards
          type="edit"
          processItems={makeProcess}
          detailChange={(methodId:string,value:string) => {
            upProcessItem(methodId, value);
          }}
          deleteChange={(index:number) => {
            removeMethod(index);
          }}
        />
        <div className="similar-process-cards">
          <div className="p-2">手段をベースに類似プロセスを構築します。
            <button className="btn" onClick={increasedProductionAction}>
              join
            </button>
          </div>
          <div className="similar-view">
            {makeSimilarProcess.map((item) => <div>@@@</div>)}
          </div>
        </div>
      </div>
      <div className="field pb-1">
        <textarea
          className="textarea"
          id=""
          cols={30}
          rows={10}
          value={detail}
          onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) => setDetail(e.target?.value)}
        />
      </div>
      <div className="field">
        {editType === "edit" ? (
          <button className="btn" onClick={updateProcessAction}>
            update
          </button>
        ) : (
          <button className="btn" onClick={addProcessAction}>
            save
          </button>
        )}
      </div>
    </div>
  );
}