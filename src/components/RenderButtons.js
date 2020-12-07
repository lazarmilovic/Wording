import React from "react";
import Button from "./Button";

const RenderButtons = (props) => {
  return (
    <div>
      {props.arr.map((el, ind) => (
        <Button
          key={ind}
          ind={ind}
          letter={el}
          onClick={props.onClick}
          status={props.status(ind)}
        />
      ))}
    </div>
  );
};

export default RenderButtons;
