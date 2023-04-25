import React from "react";

interface Props {
  id: string;
  label?: string;
  eventChange?: (value: string) => string;
}

type TextAreaChangeEvent = React.ChangeEvent<HTMLTextAreaElement>;

export function FieldTextarea(props: Props) {
  const { id, label, eventChange } = props;
  const changeAction = eventChange ?? (() => {});

  return (
    <div className="input-box">
      <label htmlFor={`textarea${id}`} className="label">
        {label && <span className="labeltext">{label}</span>}
        <textarea
          id={`textarea${id}`}
          className="textarea"
          onChange={(e: TextAreaChangeEvent) => {
            changeAction(e.target?.value ?? "");
          }}
        />
      </label>
    </div>
  );
}
