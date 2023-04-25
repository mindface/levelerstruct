import { useRef, useState } from "react";
import { FieldInput } from "./parts/FieldInput";
import { RateItem, RateProcess, Process } from "../store/storeProcess";
import { useRouter } from "next/router";
import { BaseDialog, ForwardRefHandle } from "./BaseDialog";
import { sums } from "../wasm/wasm_imager_bg.wasm";
import { ProcessSelect } from "./parts/ProcessSelect";
import { ProcessCards } from "./ProcessCards";

export function LimitInfo() {
  const element = useRef<ForwardRefHandle>(null);
  const [imagePath, setImagePath] = useState("");
  const [rateList, setRateList] = useState<RateItem[]>([{ id: 1, rate: "0", value: "", path: "" }]);
  const [selectProcess, setSelectProcess] = useState<RateProcess>({
    id: "",
    title: "",
    detail: "",
    mainImage: "",
    processdata: [],
    reProcessdata: [],
    connectId: "",
  });

  const changeRateValue = (type: string, item: RateItem, value: string) => {
    const list = rateList.map((_item) => {
      if (item.id === _item.id) {
        return {
          ...item,
          [type]: value,
        };
      }
      return item;
    });
    setRateList(list);
  };

  const addListRateValue = (processIndex: number) => {
    let limt = false;
    const list = (selectProcess?.reProcessdata ?? []).map((item, index) => {
      if (item?.ratedata.length === 9) {
        limt = true;
      }
      if (processIndex === index) {
        item?.ratedata.push({ id: item?.ratedata.length + 1, rate: "", value: "", path: "" });
      }
      return item;
    });
    if (limt) {
      alert("10までです。");
    } else {
      setSelectProcess({ ...selectProcess, reProcessdata: list });
    }
  };

  const changeListRateValue = (
    processIndex: number,
    rateIndex: number,
    value: string,
    type: "rate" | "value" | "path"
  ) => {
    const list = (selectProcess?.reProcessdata ?? []).map((item, index) => {
      if (processIndex === index) {
        const _list = (item?.ratedata ?? []).map((item, _index) => {
          if (rateIndex === _index) {
            return { ...item, [type]: value };
          }
          return item;
        });
        return { ...item, ratedata: _list };
      }
      return item;
    });
    setSelectProcess({ ...selectProcess, reProcessdata: list });
  };

  const openAction = () => {
    element.current?.openDialog();
  };

  const selectAction = (item: Process) => {
    const list = item?.processdata.map((item) => {
      return {
        ...item,
        ratedata: [
          {
            id: 0,
            rate: "",
            value: "",
            path: "",
          },
        ],
      };
    });
    setSelectProcess({ ...item, reProcessdata: list });
  };

  return (
    <div className="content">
      <div className="evaluation-make"></div>
      <div className="process-select p-2">
        <div className="pb-1 flex-nw">
          <ProcessSelect
            processId={""}
            eventChange={(item) => {
              selectAction(item);
            }}
          />
        </div>
        <div className="process-select-view">
          <div className="select-info flex-nw">
            <div className="select-info-img maxhalf50 pr-1">
              目的の画像
              {selectProcess.mainImage && (
                <img className="img" src={selectProcess.mainImage} alt="" />
              )}
            </div>
            <div className="select-info-text maxhalf50">
              <div className="item pb-1 f-middle">{selectProcess?.title}</div>
              <div className="item pb-1">{selectProcess?.detail}</div>
            </div>
          </div>
          <div className="item pb-1">
            <ProcessCards type={"view"} processItems={selectProcess?.processdata ?? []} />
          </div>
          <div className="item pb-1 flex-nw over-scroll">
            <div
              className="minh150 flex-nw p-1"
              style={{ minWidth: `${(selectProcess?.reProcessdata ?? []).length * 320}px` }}
            >
              {(selectProcess?.reProcessdata ?? []).map((item, index) => (
                <div
                  key={`reProcessdata${item.methodId}-${index}`}
                  className="set-data-card p-1 max320 box-shadow"
                >
                  <div className="fields p-1">
                    <div className="field">
                      <div className="btn d-inline" onClick={() => addListRateValue(index)}>
                        add
                      </div>
                    </div>
                    <div className="field">
                      <div className="view-rate flex-nw">
                        {(item?.ratedata ?? []).map((item, rateIndex) => (
                          <div
                            key={`ratedata01${rateIndex}`}
                            className={`item${rateIndex} p-1`}
                            style={{ width: `${Number(item.rate) * 100}%` }}
                          >
                            {item.rate}
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                  {(item?.ratedata ?? []).map((item, rateIndex) => (
                    <div key={`ratedata02${rateIndex}`} className="">
                      <div className="fields p-1">
                        <div className="field flex-nw -flex-center">
                          <FieldInput
                            type="number"
                            id={`rate${index}-input${rateIndex}`}
                            label="比率"
                            min={0}
                            max={1}
                            step={0.01}
                            value={item.rate}
                            eventChange={(value: string) => {
                              changeListRateValue(index, rateIndex, value, "rate");
                            }}
                          />
                          <FieldInput
                            id={`value${index}-input${rateIndex}`}
                            label="項目名"
                            value={item.value}
                            eventChange={(value: string) => {
                              changeListRateValue(index, rateIndex, value, "value");
                            }}
                          />
                          <div className="btn-box cursol-absolute-view positionbase">
                            <button className="btn-icon">
                              <svg
                                width="15"
                                height="15"
                                viewBox="0 0 15 15"
                                fill="none"
                                xmlns="http://www.w3.org/2000/svg"
                              >
                                <g className="path">
                                  <path d="M10.5 3C9.67157 3 9 3.67157 9 4.5C9 5.32843 9.67157 6 10.5 6C11.3284 6 12 5.32843 12 4.5C12 3.67157 11.3284 3 10.5 3Z" />
                                  <path
                                    fillRule="evenodd"
                                    clipRule="evenodd"
                                    d="M0 1.5C0 0.671573 0.671573 0 1.5 0H13.5C14.3284 0 15 0.671573 15 1.5V13.5C15 13.6035 14.9895 13.7047 14.9695 13.8023C14.9399 13.9468 14.8896 14.0838 14.8217 14.2099C14.5685 14.6803 14.0716 15 13.5 15H1.5C0.671573 15 0 14.3284 0 13.5V1.5ZM4.84923 3.14214L4.5 2.79291L1 6.29291V1.5C1 1.22386 1.22386 1 1.5 1H13.5C13.7761 1 14 1.22386 14 1.5V10H11.7071L4.85359 3.14645C4.85215 3.145 4.85069 3.14357 4.84923 3.14214Z"
                                  />
                                </g>
                              </svg>
                            </button>
                            <div className="hover-absolute-view hover-bottom">
                              <img src={item.path} alt="" />
                              <FieldInput
                                id={`path${index}-input${rateIndex}`}
                                label="調整イメージ"
                                value={item.path}
                                eventChange={(value: string) => {
                                  changeListRateValue(index, rateIndex, value, "path");
                                }}
                              />
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                  <div className="title">{item.title}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
      <div className="fields p-2">
        <div className="field pb-1">
          <button
            onClick={() => {
              const ll = sums(12);
              console.log(ll);
            }}
          >
            sums
          </button>
          <button onClick={openAction}>select</button>
          <BaseDialog ref={element} phase="20">
            <div className="fields p-2">
              <div className="field pb-1">
                <FieldInput
                  id="headerPath"
                  label="headerPathName"
                  value={imagePath}
                  eventChange={(value: string) => {
                    setImagePath(value);
                  }}
                />
                {imagePath !== "" && <img className="img max320" src={imagePath} />}
                目的にするモデル情報
              </div>
              <div className="field pb-1">
                <button className="btn" onClick={() => {}}>
                  add
                </button>
              </div>
              {rateList.map((item, index) => (
                <div key={`rateList${item.id}`} className="">
                  <FieldInput
                    id={`text${index}`}
                    label=""
                    value={item.value}
                    eventChange={(value: string) => {
                      changeRateValue("value", item, value);
                    }}
                  />
                  <FieldInput
                    type="range"
                    id={`range${index}`}
                    label=""
                    value={item.value}
                    eventChange={(value: string) => {
                      changeRateValue("rate", item, value);
                    }}
                    step={0.1}
                  />
                </div>
              ))}
              <div className="field pb-1 "></div>
            </div>
          </BaseDialog>
        </div>
        <div className="field pb-1">
          <div className="premise-info">
            <h3 className="premise-title pb-1">前提情報</h3>
            <div className="pb-2">
              <div className="select-info pb-1">
                kokokoko [https://www.takasago-t.co.jp/index.php]
              </div>
              <div className="select-tag mr-1" onClick={() => {}}>
                電気ヒータ
              </div>
              <div className="select-tag mr-1">温度センサ</div>
              <div className="select-tag mr-1">電気炉</div>
              <div className="select-tag mr-1">恒温器</div>
              <div className="select-tag mr-1">熱風機</div>
              <div className="select-tag mr-1">熱風発生器</div>
            </div>
            <div className="pb-1">
              <div className="select-info pb-1">
                田中貴金属工業株式会社 [https://tanaka-preciousmetals.com/webexpo/metal/]
              </div>
              <div className="select-tag mr-1" onClick={() => {}}>
                ゴールド（金）
              </div>
              <div className="select-tag mr-1">シルバー（銀）</div>
              <div className="select-tag mr-1">プラチナ</div>
              <div className="select-tag mr-1">パラジウム</div>
              <div className="select-tag mr-1">ルテニウム</div>
              <div className="select-tag mr-1">ロジウム</div>
              <div className="select-tag mr-1">イリジウム</div>
              <div className="select-tag mr-1">オスミウム</div>
              <div className="select-tag mr-1">レニウム</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
