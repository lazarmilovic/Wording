import Button from "./Button";

const RenderSelected = (props) => {
  return (
    <div>
      {props.arr.map((el, ind) => (
        <Button status={"selected"} letter={el} key={ind} />
      ))}
    </div>
  );
};

export default RenderSelected;
