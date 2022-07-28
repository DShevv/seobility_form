import React, { KeyboardEvent, useEffect, useState } from "react";

interface InputProps {
  type: string;
  className?: string;
  placeholder?: string;
  value: any;
  field?: string;
  changeData?: Function;
  validator?: Function;
}

function Input({
  type,
  className,
  placeholder,
  value,
  field,
  validator,
  changeData,
}: InputProps) {
  const [data, setData] = useState(value);

  useEffect(() => {
    changeData && changeData(field, data);
  }, [data, field]);

  const keyDownHandler = (event: KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Backspace" && data.replace(/\D/g, "").length === 1) {
      setData("");
    }
  };

  const changeHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
    event.target.value = validator ? validator(event) : "";
    setData(event.target.value);
  };

  const changeHandlerTextArea = (
    event: React.ChangeEvent<HTMLTextAreaElement>
  ) => {
    event.target.value = validator ? validator(event.target.value) : "";
    setData(event.target.value);
  };

  if (type === "textfield") {
    return (
      <textarea
        value={data}
        onChange={changeHandlerTextArea}
        className={className}
        placeholder={placeholder}
        maxLength={300}
      ></textarea>
    );
  }
  return (
    <input
      className={className}
      type={type}
      placeholder={placeholder}
      onChange={changeHandler}
      value={data}
      onKeyDown={keyDownHandler}
    ></input>
  );
}

export default Input;
