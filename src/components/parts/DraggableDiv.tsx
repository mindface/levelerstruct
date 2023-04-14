import React, { ReactNode, useState, useCallback, MouseEvent, CSSProperties } from "react";

type Props = {
  children: ReactNode;
  type?: string;
  containerRect: {
    left: number;
    top: number;
    width: number;
    height: number;
  }
}

export const DraggableDiv = (props: Props) => {
  const { children, containerRect, type } = props;
  const [position,setPosition] = useState({x:0,y:0});
  const [isDragging,setIsDragging] = useState(false);

  const onMouseDown = useCallback(() => {
    setIsDragging(true);
  },[]);  

  const onMouseUp = useCallback(() => {
    setIsDragging(false);
  },[]);

  const onMouseMove = useCallback((e:MouseEvent<HTMLDivElement>) => {
    const targetBox = {x:160,y:5};
    if(type === "grab") {
      targetBox.x = 25;
      targetBox.y = 15;
    }
    if(isDragging && containerRect.left && containerRect.top) {
      const _x = (e.clientX - (targetBox.x+containerRect?.left));
      const _y = (e.clientY - (targetBox.y+containerRect?.top));
      setPosition({ x: _x, y: _y });
    }
  },[isDragging]);

  const divStyle: CSSProperties ={
    position: "absolute",
    left: position.x,
    top: position.y,
    userSelect: "none",
    backgroundColor: "lightblue",
    padding: "8px"
  }

  if(type === "grab") {
    return (<div
      className="max320 flex-nw positionbase"
      style={divStyle}
    >
      <div
        className="btn cursor-grab"
        onMouseDown={onMouseDown}
        onMouseMove={onMouseMove}
        onMouseUp={onMouseUp}       
      >
        <svg width="15" height="15" viewBox="0 0 15 15" fill="none" xmlns="http://www.w3.org/2000/svg">
          <g className="path">
            <path fill-rule="evenodd" clip-rule="evenodd" d="M8 1.01834V0H7V1.01834C3.80973 1.26103 1.26197 3.80671 1.01898 6.99548H0V7.99548H1.01898C1.26193 11.1843 3.80902 13.7376 7 13.981V15H8V13.981C11.191 13.7376 13.7381 11.1843 13.981 7.99548H15V6.99548H13.981C13.738 3.80671 11.1903 1.26103 8 1.01834ZM8 3V6.99548H12V7.99548H8V12H7V7.99548H3V6.99548H7V3H8Z" />
          </g>
        </svg>
      </div>
      <div className="pl-1">
        {children}
      </div>
    </div>)    
  }

  return (<div
    className="max320"
    style={divStyle}
    onMouseDown={onMouseDown}
    onMouseMove={onMouseMove}
    onMouseUp={onMouseUp}
  >
     {children}
  </div>)
}
