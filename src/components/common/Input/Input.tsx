import React, { KeyboardEvent, useEffect, useState } from "react";
import { useDebounce } from "../../../hooks/debounce";
import { IformData, IValidOut } from "../../../types/types";

interface InputProps {
  type: string;
  field: string;
  changeData: Function;
  isError: IValidOut;
  className?: string;
  placeholder?: string;
  validator?: {
    onChange?: Function;
    isValid?: Function;
  };
  min?: string;
  max?: string;
  delay?: number;
}

function Input({
  type,
  className,
  placeholder,
  field,
  validator,
  changeData,
  min,
  max,
  isError,
}: InputProps) {
  const [data, setData] = useState("");
  const debounces = useDebounce(data, 600);
  const [error, setError] = useState<IValidOut>(isError);

  useEffect(() => {
    setError(isError);
  }, [isError]);

  useEffect(() => {
    if (
      !error.result &&
      validator?.isValid &&
      !validator?.isValid(debounces).result
    ) {
      changeData((pstate: IformData) => {
        return { ...pstate, [field]: debounces };
      });
    }
    if (!error.result && !validator?.isValid) {
      changeData((pstate: IformData) => {
        return { ...pstate, [field]: debounces };
      });
    }
    if (debounces === "") {
      changeData((pstate: IformData) => {
        return { ...pstate, [field]: debounces };
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [debounces, field, error.result]);

  useEffect(() => {
    if (debounces !== "") {
      validator?.isValid && setError({ ...validator?.isValid(debounces) });
    } else {
      !isError.result && setError({ result: false, message: "" });
    }
  }, [debounces, validator, isError.result]);

  const keyDownHandler = (event: KeyboardEvent<HTMLInputElement>) => {
    if (
      type === "tel" &&
      event.key === "Backspace" &&
      data.replace(/\D/g, "").length === 1
    ) {
      setData("");
    }
  };

  const changeHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
    event.target.value = validator?.onChange
      ? validator.onChange(event)
      : event.target.value;
    setData(event.target.value);
  };

  const changeHandlerTextArea = (
    event: React.ChangeEvent<HTMLTextAreaElement>
  ) => {
    setData(event.target.value);
  };

  if (type === "textfield") {
    return (
      <div className={className}>
        <textarea
          value={data}
          onChange={changeHandlerTextArea}
          className={`${className + "__input"} feedback__message-field ${
            error.result && "error"
          }`}
          placeholder={placeholder}
          maxLength={300}
        ></textarea>
        <div className={`feedback__error ${error.result && "visible"}`}>
          {error.message}
        </div>
      </div>
    );
  }
  return (
    <div className={className}>
      <input
        className={`${className + "__input"} ${error.result && "error"}`}
        type={type}
        placeholder={placeholder}
        onChange={changeHandler}
        value={data}
        onKeyDown={keyDownHandler}
        min={min}
        max={max}
      ></input>
      <div className={`feedback__error ${error.result && "visible"}`}>
        {error.message}
      </div>
    </div>
  );
}

export default Input;
