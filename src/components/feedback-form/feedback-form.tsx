import React, { FormEvent, useEffect, useState } from "react";
import "../../styles/feedback-form.sass";
import Validator from "../../utils/validation";
import Input from "../common/Input/Input";
import { IDataError, IformData } from "../../types/types";
import Button from "../common/Button/Button";

function FeedbackForm() {
  const [formData, setFormData] = useState<IformData>({
    fullname: "",
    email: "",
    phone: "",
    date: "",
    message: "",
  });
  const [errors, setErrors] = useState<IDataError>({
    fullname: { result: false, message: "" },
    email: { result: false, message: "" },
    phone: { result: false, message: "" },
    date: { result: false, message: "" },
    message: { result: false, message: "" },
  });

  useEffect(() => {
    console.log(formData);
  }, [formData]);

  useEffect(() => {
    console.log(errors);
  }, [errors]);

  const isInValidData = (): boolean => {
    const res: IDataError = {} as IDataError;
    res.fullname = Validator.fullnameIsInvalid(formData.fullname);
    res.email = Validator.emailIsInvalid(formData.email);
    res.phone = Validator.phoneIsInvalid(formData.phone);
    res.date = Validator.dateIsInvalid(formData.date);
    res.message = Validator.messageIsInvalid(formData.message);

    setErrors({ ...res });
    for (const [, value] of Object.entries(res)) {
      if (value.result) {
        return true;
      }
    }
    return false;
  };

  const onSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    console.log(isInValidData());
  };

  return (
    <form
      onSubmit={onSubmit}
      className="feedback"
      noValidate
      autoComplete="off"
    >
      <div className="feedback__title">Leave us feedback</div>
      <div className="feedback__fields">
        <Input
          isError={errors.fullname}
          className="feedback__text-field"
          type="text"
          placeholder="Full name"
          field="fullname"
          changeData={setFormData}
          validator={{
            onChange: Validator.fullnameOnChange,
            isValid: Validator.fullnameIsInvalid,
          }}
        />
        <Input
          isError={errors.email}
          className="feedback__text-field"
          type="text"
          placeholder="Email"
          field="email"
          changeData={setFormData}
          validator={{
            onChange: Validator.emailOnChange,
            isValid: Validator.emailIsInvalid,
          }}
        />
        <Input
          isError={errors.phone}
          className="feedback__text-field"
          type="tel"
          placeholder="Phone number"
          validator={{
            onChange: Validator.phoneOnChange,
            isValid: Validator.phoneIsInvalid,
          }}
          field="phone"
          changeData={setFormData}
        />
        <Input
          isError={errors.date}
          className="feedback__text-field"
          type="date"
          field={"date"}
          changeData={setFormData}
          validator={{ isValid: Validator.dateIsInvalid }}
          min="1922-07-29"
          max="2017-07-29"
        />
        <Input
          isError={errors.message}
          className="feedback__text-field"
          type="textfield"
          placeholder="Message"
          field={"message"}
          changeData={setFormData}
          validator={{ isValid: Validator.messageIsInvalid }}
        />
      </div>
      <Button classname="feedback__submit">Submit</Button>
    </form>
  );
}

export default FeedbackForm;
