import React, { FormEvent, useEffect, useState } from "react";
import "../../styles/feedback-form.sass";
import Validator from "../../utils/validation";
import Input from "../common/Input/Input";
import { IformData } from "../../types/types";
import Button from "../common/Button/Button";

function FeedbackForm() {
  const [formData, setFormData] = useState<IformData>({} as IformData);

  useEffect(() => {
    console.log(formData);
  }, [formData]);

  const dataChangeHandler = (field: string, value: any) => {
    console.log(value, field, formData);

    setFormData({ ...formData, [field]: value });
  };

  const onSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
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
          className="feedback__text-field"
          type="date"
          field={"date"}
          changeData={setFormData}
          min="1922-07-29"
          max="2017-07-29"
        />
        <Input
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
