import { useEffect, useState } from "react";

interface Props {
  id: string;
  label?: string;
  value?: string;
  eventChange?: (value: string) => string;
}

type TextAreaChangeEvent = React.ChangeEvent<HTMLTextAreaElement>;

export function FieldTextarea(props: Props) {
  const { id, label, value, eventChange } = props;
  const changeAction = eventChange ?? (() => {});
  const [inputValue, setInputValue] = useState("");
  useEffect(() => {
    setInputValue(value ?? "");
  }, [value]);

  return (
    <div className="input-box">
      <label htmlFor={`textarea${id}`} className="label">
        {label && <span className="labeltext">{label}</span>}
        <textarea
          id={`textarea${id}`}
          value={inputValue}
          className="textarea"
          onChange={(e: TextAreaChangeEvent) => {
            changeAction(e.target?.value ?? "");
          }}
        />
      </label>
    </div>
  );
}
