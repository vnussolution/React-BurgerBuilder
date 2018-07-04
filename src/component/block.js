import React from "react";

const block = props => {
  console.log("++Block.js++", props);

  return (
    <div
      onClick={props.clicked}
      style={{
        textAlign: "center",
        margin: "10px auto",
        border: "1px solid gray",
        width: "80%"
      }}
    >
      <h1>{props.name}</h1>
      <h3>age: {props.age}</h3>
    </div>
  );
};

export default block;
