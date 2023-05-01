import React, { useRef, useEffect } from "react";

interface Props {
  value?: string;
  type?: string;
  id: string;
  label?: string;
  step?: number;
  eventChange?: (value: File[]) => void;
}

type InputChangeEvent = React.ChangeEvent<HTMLInputElement>;

export function FileInput(props: Props) {
  const { value, type, id, label, step, eventChange } = props;
  const changeAction = eventChange ?? (() => {});
  const input = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (step) {
      input.current?.setAttribute("step", String(step));
    }
  }, []);

  return (
    <div className="input-box d-inline positionbase pb-1">
      <label htmlFor={`input${id}`} className="label">
        {/* {label && <span className="labeltext d-inline pr-1">{label}</span>} */}
        <input
          ref={input}
          id={`input${id}`}
          defaultValue={value ?? ""}
          className="input file"
          type="file"
          onChange={(e: InputChangeEvent) => {
            const data = e.target as HTMLInputElement;
            const files = (data.files ?? []) as File[];
            if (files) {
              changeAction(files);
            }
          }}
        />
      </label>
    </div>
  );
}
