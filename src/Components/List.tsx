import React, { CSSProperties } from "react";
import { DataItem } from "../typeDefs/DataItem";
import Item from "./Item";

const ListStyles: { [key: string]: CSSProperties } = {
  container: {
    flex: 1,
  },
};

interface IProps {
  items: DataItem[];
  onLoadMore: () => void;
}

class List extends React.PureComponent<IProps> {
  public render() {
    const { items } = this.props;
    return (
      <div style={ListStyles.container}>
        {items.map((item: DataItem) => (
          <Item key={item.id} value={item.value} />
        ))}
      </div>
    );
  }
}

export default List;
