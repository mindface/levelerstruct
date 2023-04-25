import { useEffect } from "react";
import { MethodListMenu } from "./MethodListMenu";
import { useStoreMethod } from "../store/storeMethod";

export function ToolsListView() {
  const { methods, getMethod } = useStoreMethod((store) => ({
    methods: store.methods,
    getMethod: store.getMethod,
  }));

  useEffect(() => {
    getMethod();
  }, [getMethod]);

  return (
    <div className="content content-edit">
      <div className="caption flex-nw p-1">
        <div className="check"></div>
        <div className="title">タイトル | メソッドリスト</div>
        <div className="action"></div>
      </div>
      <ul className="list p-1">
        {(methods ?? []).map((method, index) => (
          <li key={index} className="item divhover flex-nw p-1">
            <div className="check">
              <input type="checkbox" name="" id="" />
            </div>
            <div className="title">{method.title}</div>
            <div className="action">
              <MethodListMenu type="method" item={method} />
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}
