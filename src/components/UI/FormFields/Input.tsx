import React from "react";

import classes from "./Input.module.css";

const Input: React.FC<{
  errorStyling: boolean;
  id: string;
  label: string;
  type: string;
  value: string;
  min?: string;
  step?: string;
  onChange: () => void;
  onBlur: () => void;
}> = (props) => {
  // style class logic for displaying error message
  const inputControlClasses = `${classes.control} ${
    props.errorStyling ? classes.invalid : ""
  }`;

  return (
    <div className={inputControlClasses}>
      <label htmlFor={props.id}>{props.label}</label>
      {props.type === "textarea" && (
        <textarea
          id={props.id}
          value={props.value}
          onChange={props.onChange}
          onBlur={props.onBlur}
        />
      )}
      {props.type === "number" && (
        <input
          id={props.id}
          type={props.type}
          value={props.value}
          onChange={props.onChange}
          onBlur={props.onBlur}
          min={props.min}
          step={props.step}
          // max={props.max || ""}
        />
      )}
      {props.type !== "textarea" && props.type !== "number" && (
        <input
          id={props.id}
          type={props.type}
          value={props.value}
          onChange={props.onChange}
          onBlur={props.onBlur}
        />
      )}
    </div>
  );
};

export default Input;
