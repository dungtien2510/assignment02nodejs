import React from "react";
import "./FormInput.css";
function FormInput() {
  return (
    <div className="form-input">
      <input
        type="text"
        className="form-input__control"
        placeholder="Your Email"
      />
      <button className="form-input__btn">Subscribe</button>
    </div>
  );
}
export default FormInput;
