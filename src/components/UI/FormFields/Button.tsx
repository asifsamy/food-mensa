import classes from "./Button.module.css";

const Button: React.FC<{
  buttonStyle?: string;
  type?: "submit" | "button" | "reset";
  // type: string | undefined;
  onClick?: () => void;
  disabled?: boolean;
}> = (props) => {
  const STYLES = [
    "button--submit",
    "button--cancel",
    "button--reset",
    "button--edit",
    "button--delete",
  ];

  const buttonStyle =
    props.buttonStyle && STYLES.includes(props.buttonStyle)
      ? props.buttonStyle
      : STYLES[0];

  return (
    <button
      className={`${classes.button} ${classes[buttonStyle]}`}
      // className={classes.button}
      type={props.type || "button"}
      onClick={props.onClick}
      disabled={props.disabled || false}
    >
      {props.children}
    </button>
  );
};

export default Button;
