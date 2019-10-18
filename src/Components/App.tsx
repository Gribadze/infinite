import React, { CSSProperties } from "react";
import { getItems } from "../Services/api";
import { DataItem } from "../typeDefs/DataItem";
import List from "./List";

const AppStyles: { [key: string]: CSSProperties } = {
  container: {
    backgroundColor: "silver",
    height: "100%",
    overflowY: "scroll",
    width: "300px",
  },
};

interface IProps {
  bufferPageCount: number;
}

interface IState {
  items: DataItem[];
  lastLoadedPageIndex: number;
}

class App extends React.Component<IProps, IState> {
  public container = React.createRef<HTMLDivElement>();

  constructor(props: IProps) {
    super(props);
    this.state = {
      items: [] as DataItem[],
      lastLoadedPageIndex: props.bufferPageCount - 1,
    };
  }

  public componentDidMount(): void {
    const { bufferPageCount } = this.props;
    getItems(this.calculateSize() * bufferPageCount, 0).then(
      (items: DataItem[]) =>
        this.setState({ items }),
    );
  }

  public componentDidUpdate(prevProps: IProps, prevState: IState): void {
    const { lastLoadedPageIndex } = this.state;
    const { lastLoadedPageIndex: prevPage } = prevState;
    if (lastLoadedPageIndex !== prevPage) {
      this.updateItems();
    }
  }

  public loadMoreHandler = () =>
    this.setState((state: IState) => ({
      lastLoadedPageIndex: state.lastLoadedPageIndex + 1,
    }));

  public updateItems = () => {
    const { lastLoadedPageIndex } = this.state;
    getItems(this.calculateSize(), lastLoadedPageIndex).then(
      (items: DataItem[]) =>
        this.setState((state: IState) => ({
          items: state.items.concat(items),
        })),
    );
  };

  public calculateSize = () => {
    const { current: container } = this.container;
    return container ? Math.floor(container.clientHeight / this.getItemHeight()) : 0;
  };

  public handleScroll = () => {
    if (this.needLoadMore()) {
      this.loadMoreHandler();
    }
  };

  public needLoadMore = () => {
    const { current: container } = this.container;
    const { bufferPageCount } = this.props;
    if (!container) {
      return false;
    }
    return (
      container.scrollHeight - container.scrollTop <
      this.getItemHeight() * this.calculateSize() * (bufferPageCount - 1)
    );
  };

  public getItemHeight = () => {
    return 100;
  };

  public render() {
    const { items } = this.state;
    return (
      <div
        style={AppStyles.container}
        ref={this.container}
        onScroll={this.handleScroll}
      >
        <List items={items} onLoadMore={this.loadMoreHandler} ref={(ref) => console.log(ref)}/>
      </div>
    );
  }
}

export default App;
