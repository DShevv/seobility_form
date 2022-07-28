import React, { useEffect, useState } from "react";
import "../../styles/feedback-form.sass";
import Validator from "../../utils/validation";
import Input from "../common/Input/Input";

interface IformData {
  fullname: string;
  email: string;
  phone: string;
  date: Date;
  message: string;
}

function FeedbackForm() {
  const [formData, setFormData] = useState<IformData>({
    fullname: "",
    email: "",
    phone: "",
    date: new Date(Date.now()),
    message: "",
  });

  useEffect(() => {
    console.log(formData);
  }, [formData]);

  const dataChangeHandler = (field: string, value: any) => {
    setFormData({ ...formData, [field]: value });
  };

  return (
    <form className="feedback" noValidate>
      <div className="feedback__title">Leave us feedback</div>
      <div className="feedback__fields">
        <Input
          className="feedback__text-field"
          type="text"
          placeholder="Full name"
          field="fullname"
          changeData={dataChangeHandler}
          value={formData.fullname}
          validator={Validator.fullnameOnChange}
        />
        <Input
          className="feedback__text-field"
          type="text"
          placeholder="Email"
          field="email"
          changeData={dataChangeHandler}
          value={formData.email}
          validator={Validator.emailOnChange}
        />
        <Input
          className="feedback__text-field"
          type="tel"
          placeholder="Phone number"
          value={formData.phone}
          validator={Validator.phoneOnChange}
          field="phone"
          changeData={dataChangeHandler}
        />
        <Input
          className="feedback__text-field"
          type="date"
          value={formData.date}
        />
        <Input
          className="feedback__text-field feedback__message-field "
          type="textfield"
          placeholder="Message"
          value={formData.message}
        />
      </div>
    </form>
  );
}

export default FeedbackForm;
