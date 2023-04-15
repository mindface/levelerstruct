import React, { useEffect, ReactNode, forwardRef, useState ,useRef, useImperativeHandle } from "react";

type Props = {
  children: ReactNode;
  type?: string;
  phase?: string;
  closeDialogAction?: () => void;
  submitAction?: () => void;
};

export interface ForwardRefHandle {
  openDialog: () => void;
  closeDialog: () => void;
}

const scrollTop = () => {
  return Math.max(window.pageXOffset, document.documentElement.scrollTop, document.body.scrollTop);
}

export const BaseDialog = forwardRef<ForwardRefHandle, Props>((props, ref) => {
  const { children, type, phase, closeDialogAction } = props;
  const [topNumber,setTopNumber] = useState(0);
  const dialog = useRef<HTMLDialogElement>(null);
  const [dialogView,setDalogView] = useState(false);

  const onScroll = () => {
    const position = scrollTop();
    if(position === 0) return;
    setTopNumber(position);
  }

  const setBodyStyle = () => {
    const addBodyStyle = `position:fixed; top: -${topNumber}px; overflow: hidden; width: 100vw;`;
    document.body.setAttribute("style",addBodyStyle);
  }
  const removeBodyStyle = () => {
    document.body.removeAttribute("style");
    window.scrollTo(0,topNumber);
  }

  const openAction = () => {
    setDalogView(true);
    setBodyStyle();
  };
  const closeAction = () => {
    setDalogView(false);
    console.log("mofjej")
    removeBodyStyle();
  };

  useImperativeHandle(ref, () => ({
    openDialog() {
      openAction();
    },
    closeDialog() {
      closeAction();
    },
  }));

  useEffect(() => {
    document.addEventListener("scroll",onScroll);
    return () => document.removeEventListener("scroll",onScroll);
  },[])

  return (
    <div className="dialog-box">
      {dialogView && <dialog open className="dialog p-2" style={{zIndex: phase ?? "1"}}>
        <div className="dialog-content maxh320 over-scroll">{children}</div>
        <div className="dialog-footer">
          { !closeDialogAction && <button
            className="btn"
            onClick={(e) => {
              e.preventDefault();
              closeAction();
            }}
          >
            close
          </button>}
        </div>
        { closeDialogAction &&
          <div className="dialog-footer">
            <button
              className="btn"
              onClick={(e) => {
                e.preventDefault();
                closeAction();
              }}
            >
              Cancel
            </button>
            <button id="confirmBtn" className="btn" value="default">
              Confirm
            </button>
          </div>}
      </dialog>}
    </div>
  );
});

BaseDialog.displayName = "BaseDialog";
