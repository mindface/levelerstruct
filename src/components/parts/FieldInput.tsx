import React, { useRef, useState, useEffect } from "react";

interface Props {
  value?: string;
  name?: string;
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
  const { value, name, className, type, id, label, step, min, max, viewValue, eventChange } = props;
  const changeAction = eventChange ?? (() => {});
  const input = useRef<HTMLInputElement>(null);
  const [inputValue, setInputValue] = useState("");

  useEffect(() => {
    if (step) input.current?.setAttribute("step", String(step));
    if (name) input.current?.setAttribute("name", name);
  }, []);
  useEffect(() => {
    setInputValue(value ?? "");
  }, [value]);

  return (
    <div className="input-box d-inline pt-1 pb-1">
      <label htmlFor={`input${id}`} className="label flex-nw positionbase">
        {label && <span className="labeltext d-inline">{label}</span>}
        {(type !== "number" || !type) && (
          <input
            ref={input}
            id={`input${id}`}
            defaultValue={inputValue ?? ""}
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
            defaultValue={inputValue ?? ""}
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
