import React from "react";
import "./Form.css";
import FormInput from "./FormInput";
import BackgoundGreen from "../../../../UI/BackgoundGreen";
function Form() {
  return (
    <BackgoundGreen>
      <div className="form">
        <div className="form-header">
          <h1>Save time, save money!</h1>
          <p>Sign up and we'll send best deals to you</p>
        </div>
        <FormInput />
      </div>
    </BackgoundGreen>
  );
}
export default Form;
