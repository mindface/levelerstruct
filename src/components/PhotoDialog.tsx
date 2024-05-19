import { useRef } from "react";
import { BaseDialog, ForwardRefHandle } from "./BaseDialog";
import { ImageListView } from "./ImageListView";

export function PhotoDialog() {
  const element = useRef<ForwardRefHandle>(null);

  const openAction = () => {
    element.current?.openDialog();
  };

  return (
    <div className="photo-box">
      <button className="btn-icon" onClick={openAction}>
        <svg
          width="15"
          height="15"
          viewBox="0 0 15 15"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <g className="path">
            <path
              d="M7 1.5L2 1.5M14.5 12.5L14.5 4.5C14.5 3.94772 14.0523 3.5 13.5 3.5L1.5 3.5C0.947717 3.5 0.500001 3.94772 0.500001 4.5L0.5 12.5C0.5 13.0523 0.947716 13.5 1.5 13.5L13.5 13.5C14.0523 13.5 14.5 13.0523 14.5 12.5ZM9.5 10.5C8.39543 10.5 7.5 9.60457 7.5 8.5C7.5 7.39543 8.39543 6.5 9.5 6.5C10.6046 6.5 11.5 7.39543 11.5 8.5C11.5 9.60457 10.6046 10.5 9.5 10.5Z"
              stroke="#fff"
            />
          </g>
        </svg>
      </button>
      <BaseDialog ref={element} phase="20">
        <ImageListView type="viewImage" />
      </BaseDialog>
    </div>
  );
}
