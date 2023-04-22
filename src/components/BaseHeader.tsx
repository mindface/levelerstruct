import { useRef, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import logo from "../images/logo.png";
import { PhotoDialog } from "./PhotoDialog";
import { useStoreNamingDefinition } from "../store/storeNamingConvention";
import { BaseDialog, ForwardRefHandle } from "./BaseDialog";
import { FieldInput } from "./parts/FieldInput";

export function BaseHeader() {
  const element = useRef<ForwardRefHandle>(null);
  const { uiDefinitions, updateUiDefinition }  = useStoreNamingDefinition((store) => ({
    uiDefinitions: store.uiDefinitions,
    updateUiDefinition: store.updateUiDefinition,
  }));
  const [headerUi,setHeaderUi] = useState(uiDefinitions ?? []);

  const openAction = () => {
    element.current?.openDialog();
  };

  const setUiDefinitions = (changeNumber:string,value: string) => {
    const list = uiDefinitions.map((item) => {
      if(item.id === changeNumber) {
        return {...item,name:value};
      }
      return item;
    });
    setHeaderUi(list);
  }

  const updateUiDefinitions = () => {
    updateUiDefinition(headerUi);
  }

  return (
    <header className="header flex">
      <div className="logo">
        <Image src={logo} alt="list menu" />
      </div>
      <nav className="nav flex">
        <ul className="list flex">
          {headerUi.map((item, index) => (
            <li key={index} className="item">
              <Link className="link p-1" href={`/${item.path}`}>
                {item.name}
              </Link>
            </li>
          ))}
        </ul>
        <PhotoDialog />
        <button
          className="btn-icon maxvh30 positionTopRight"
          onClick={openAction}
        >
          <svg width="15" height="15" viewBox="0 0 15 15" fill="none" xmlns="http://www.w3.org/2000/svg">
            <g className="path">
              <path d="M7 3.5H15M7 11.5H15M1.5 1.5H3.5C4.05228 1.5 4.5 1.94772 4.5 2.5V4.5C4.5 5.05228 4.05228 5.5 3.5 5.5H1.5C0.947715 5.5 0.5 5.05228 0.5 4.5V2.5C0.5 1.94772 0.947715 1.5 1.5 1.5ZM1.5 9.5H3.5C4.05228 9.5 4.5 9.94772 4.5 10.5V12.5C4.5 13.0523 4.05228 13.5 3.5 13.5H1.5C0.947715 13.5 0.5 13.0523 0.5 12.5V10.5C0.5 9.94772 0.947715 9.5 1.5 9.5Z" />
            </g>
          </svg>
        </button>
      </nav>
      <BaseDialog ref={element} phase="20">
        <div className="fields p-2">
          {headerUi.map((item,index) => 
            <div key={index} className="field pb-1">
              <FieldInput
                id="headerPath"
                label="headerPathName"
                value={item.name}
                eventChange={(value: string) => {
                  setUiDefinitions(item.id, value);
                }}
              />
            </div>)}
            <div className="field pb-1">
              <button className="btn" onClick={updateUiDefinitions}>
                send uploadAction
              </button>
            </div>
        </div>
      </BaseDialog>
    </header>
  );
}
