import React, { useRef } from "react";
import { BaseDialog, ForwardRefHandle } from "./BaseDialog";
import { Method } from "../store/storeMethod";
import { tagView } from "../util/lib";

type Props = {
  item: Method;
};

export function MethodDialog(props: Props) {
  const element = useRef<ForwardRefHandle>(null);
  const method = props.item;

  const openAction = () => {
    element.current?.openDialog();
  };

  const closeAction = () => {
    element.current?.closeDialog();
  };

  return (
    <div className="method-dialog">
      <button className="btn-icon" onClick={openAction}>
        <svg
          width="15"
          height="15"
          viewBox="0 0 15 15"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <g className="path">
            <path d="M4.5 6.99542H4V7.99542H4.5V6.99542ZM10.5 7.99542H11V6.99542H10.5V7.99542ZM4.50054 9.99347L4.00054 9.99293L3.99946 10.9929L4.49946 10.9935L4.50054 9.99347ZM10.4995 11L10.9995 11.0005L11.0005 10.0005L10.5005 10L10.4995 11ZM4.50033 3.99738L4.00033 3.99705L3.99967 4.99705L4.49967 4.99738L4.50033 3.99738ZM8.49967 5L8.99967 5.00033L9.00033 4.00033L8.50033 4L8.49967 5ZM10.5 0.5L10.8536 0.146447L10.7071 0H10.5V0.5ZM13.5 3.5H14V3.29289L13.8536 3.14645L13.5 3.5ZM4.5 7.99542H10.5V6.99542H4.5V7.99542ZM4.49946 10.9935L10.4995 11L10.5005 10L4.50054 9.99347L4.49946 10.9935ZM4.49967 4.99738L8.49967 5L8.50033 4L4.50033 3.99738L4.49967 4.99738ZM12.5 14H2.5V15H12.5V14ZM2 13.5V1.5H1V13.5H2ZM2.5 1H10.5V0H2.5V1ZM13 3.5V13.5H14V3.5H13ZM10.1464 0.853553L13.1464 3.85355L13.8536 3.14645L10.8536 0.146447L10.1464 0.853553ZM2.5 14C2.22386 14 2 13.7761 2 13.5H1C1 14.3284 1.67157 15 2.5 15V14ZM12.5 15C13.3284 15 14 14.3284 14 13.5H13C13 13.7761 12.7761 14 12.5 14V15ZM2 1.5C2 1.22386 2.22386 1 2.5 1V0C1.67157 0 1 0.671574 1 1.5H2Z" />
          </g>
        </svg>
      </button>
      <BaseDialog ref={element} phase="21">
        <div className="fields p-2">
          <div className="field pb-1">
            <div className="methodId">{method.methodId}</div>
          </div>
          <div className="field pb-1">
            <h3 className="title">{method.title}</h3>
          </div>
          <div className="field pb-1">
            <div
              className="detail viewer"
              dangerouslySetInnerHTML={{ __html: method.detail?.replace(/\n/g, "<br />") }}
            ></div>
          </div>
          <div className="field pb-1">
            <div
              className="structure viewer"
              dangerouslySetInnerHTML={{ __html: method.structure?.replace(/\n/g, "<br />") }}
            ></div>
          </div>
          <div className="field pb-1">
            <div className="tagger">{tagView(method.tagger)}</div>
          </div>
        </div>
      </BaseDialog>
    </div>
  );
}
