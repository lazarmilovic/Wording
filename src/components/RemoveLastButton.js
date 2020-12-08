const { default: Button } = require("./Button");

const RemoveLastButton = (props) => {
  return (
    <button className={`control_btn ${props.class}`} onClick={props.onClick}>
      {props.text}
    </button>
  );
};

export default RemoveLastButton;
