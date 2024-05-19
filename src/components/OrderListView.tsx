import { useEffect } from "react";
import { ProcessListMenu } from "./ProcessListMenu";
import { useStoreProcess, Process } from "../store/storeProcess";
import { averageMethodItem } from "../util/lib";

export function OrderListView() {
  const { process, getProcess } = useStoreProcess((store) => ({
    process: store.process,
    getProcess: store.getProcess,
  }));

  useEffect(() => {
    getProcess();
  }, []);

  const viewTotalNumber = (item: Process) => {
    let aj = 0;
    item.processdata.map((processdata) => {
      aj = aj + averageMethodItem(processdata);
      // console.log(averageMethodItem(processdata))
    });
    return aj;
  };

  return (
    <div className="content content-edit">
      <div className="caption flex-nw p-1">
        <div className="check"></div>
        <div className="title">タイトル - オーダーリスト</div>
        <div className="action"></div>
      </div>
      <ul className="list p-1">
        {process.map((item) => (
          <li key={item.id} className="item divthinhover flex-nw p-1">
            <div className="check"></div>
            <div className="title">{item.title}</div>
            <div className="total">{viewTotalNumber(item)}</div>
            <div className="action">
              <ProcessListMenu type="process" item={item} />
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}
