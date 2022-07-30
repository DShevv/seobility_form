import React from "react";
import "../../../styles/alert.sass";

interface IAlertProp {
  type: string;
  message: string;
  onClose: Function;
}

function Alert({ type, message, onClose }: IAlertProp) {
  return (
    <div className={`alert ${type}`}>
      <div
        className="close"
        onClick={() => {
          onClose();
        }}
      ></div>
      {message}
    </div>
  );
}

export default Alert;
