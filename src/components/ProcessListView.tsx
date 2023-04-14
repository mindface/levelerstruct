import { useEffect } from "react";
import { ProcessListMenu } from "./ProcessListMenu";
import { useStoreProcess } from "../store/storeProcess";

export function ProcessListView() {
  const { process, getProcess } = useStoreProcess((store) => ({
    process: store.process,
    getProcess: store.getProcess,
  }));

  useEffect(() => {
    getProcess();
  }, []);

  return (
    <div className="content content-edit">
      <div className="caption flex-nw p-1">
        <div className="check"></div>
        <div className="title">タイトル - プロセスリスト</div>
        <div className="action"></div>
      </div>
      <ul className="list p-1">
        {process.map((item) => (
          <li key={item.id} className="item divthinhover flex-nw p-1">
            <div className="check">
              <input type="checkbox" name="" id="" />
            </div>
            <div className="title">{item.title}</div>
            <div className="action">
              <ProcessListMenu type="process" item={item} />
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}
