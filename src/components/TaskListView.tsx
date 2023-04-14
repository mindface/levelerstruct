import { useEffect, useState } from "react";
import { TaskListMenu } from "./TaskListMenu";
import { useStore } from "../store/store";

export function TaskListView() {
  const { tasks, getTask } = useStore((store) => ({
    tasks: store.tasks,
    getTask: store.getTask,
  }));

  useEffect(() => {
    getTask();
  }, []);

  return (
    <div className="content content-edit">
      目的カテゴリ
      <div className="caption flex-nw p-1">
        <div className="check"></div>
        <div className="title">タイトル : タスクリスト</div>
        <div className="action"></div>
      </div>
      <ul className="list p-1">
        {tasks.map((item, index) => (
          <li key={index} className="item divthinhover flex-nw p-1">
            <div className="check">
              <input type="checkbox" name="" id="" />
            </div>
            <div className="title">{item.title}</div>
            <div className="action">
              <TaskListMenu type="task" item={item} />
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}
