import React, { useRef, useEffect } from "react";

interface Props {
  value?: string;
  className?: string;
  type?: string;
  id: string;
  label?: string;
  step?: number;
  min?: number;
  max?: number;

  viewValue?: boolean;
  eventChange?: (value: string) => void;
}

type InputChangeEvent = React.ChangeEvent<HTMLInputElement>;

export function FieldInput(props: Props) {
  const { value, className, type, id, label, step, min, max, viewValue, eventChange } = props;
  const changeAction = eventChange ?? (() => {});
  const input = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (step) input.current?.setAttribute("step", String(step));
  }, []);

  return (
    <div className="input-box d-inline pt-1 pb-1">
      <label htmlFor={`input${id}`} className="label flex-nw positionbase">
        {label && <span className="labeltext d-inline">{label}</span>}
        {(type !== "number" || !type) && (
          <input
            ref={input}
            id={`input${id}`}
            defaultValue={value ?? ""}
            className={`input ${className}`}
            type={type ?? "text"}
            onChange={(e: InputChangeEvent) => {
              changeAction(e.target?.value ?? "");
            }}
          />
        )}
        {type === "number" && (
          <input
            ref={input}
            id={`input${id}`}
            defaultValue={value ?? ""}
            className={`input ${className}`}
            type={type ?? "text"}
            max={max}
            min={min}
            onChange={(e: InputChangeEvent) => {
              changeAction(e.target?.value ?? "");
            }}
          />
        )}
        {viewValue && value}
      </label>
    </div>
  );
}
