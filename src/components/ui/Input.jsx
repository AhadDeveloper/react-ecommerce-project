import React from "react";

const Input = React.forwardRef((props, ref) => {
  return (
    <input
      ref={ref}
      type="text"
      placeholder="Search"
      className={props.className}
    />
  );
});

export default Input;
