import React from "react";

interface Props {
  value: string;
}

const ItemStyles = {
  container: {
    display: "flex",
    height: "100px",
    alignItems: "center",
    justifyContent: "center"
  }
};

const Item: React.FC<Props> = (props: Props) => (
  <div style={ItemStyles.container}>{props.value}</div>
);

export default Item;
