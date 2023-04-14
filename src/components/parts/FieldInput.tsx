import React, { useRef, useEffect } from "react";

interface Props {
  value?: string;
  type?: string;
  id: string;
  label?: string;
  step?: number;
  min?: number;
  max?: number;
  eventChange?: (value: string) => void
}

type InputChangeEvent = React.ChangeEvent<HTMLInputElement> 

export function FieldInput(props: Props) {
  const { value, type, id, label, step, min, max, eventChange } = props;
  const changeAction = eventChange ?? (() => {});
  const input = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if(step) input.current?.setAttribute('step',String(step));
  },[]);

  return (
    <div className="input-box pb-1">
      <label htmlFor={`input${id}`} className="label">
        {label && <span className="labeltext d-inline pr-1">{label}</span> }
        { (type === "text" || !type) && <input
          ref={input}
          id={`input${id}`}
          defaultValue={value ?? ""}
          className="input"
          type={type ?? "text"}
          onChange={(e:InputChangeEvent) => {
            changeAction(e.target?.value ?? "");
          }}
        />}
        { (type === "number") && <input
          ref={input}
          id={`input${id}`}
          defaultValue={value ?? ""}
          className="input"
          type={type ?? "text"}
          max={max}
          min={min}
          onChange={(e:InputChangeEvent) => {
            changeAction(e.target?.value ?? "");
          }}
        />}

      </label>
    </div>
  );
}
