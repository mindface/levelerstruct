import { useEffect } from "react";
import Link from "next/link";
import { useStoreMethod } from "../store/storeMethod";
import { useStoreProcess } from "../store/storeProcess";
import { useStore } from "../store/store";

const pathIds = [
  { id: 1, path: "task" },
  { id: 2, path: "process" },
  { id: 3, path: "method" },
  { id: 4, path: "selector" },
];

// const { tasks } = useStore((store) => ({
//   tasks: store.tasks,
// }));

export function BaseFlash() {
  const { process } = useStoreProcess((store) => ({
    process: store.process,
  }));
  const { methods } = useStoreMethod((store) => ({
    methods: store.methods,
  }));

  return (
    <footer className="footer p-1 background-color">
      <div className="info">
        {/* <div className="tasks">tasks | {tasks && tasks.length}</div>                 */}
        <div className="process">process | {process.length}</div>
        <div className="methods">methods | {methods.length}</div>
      </div>
      <ul className="list flex p-2">
        {pathIds.map((item, index) => (
          <li key={index} className="item">
            <Link className="link p-1" href={`/${item.path}`}>
              {item.path}
            </Link>
          </li>
        ))}
      </ul>
      <div className="logo">
        <small className="small">&copy; kkk</small>
      </div>
    </footer>
  );
}
