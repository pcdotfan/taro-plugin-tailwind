import { Component } from "react";
import "windi.css";
// import "windi-base.css";
// import "windi-components.css";
// import "windi-utilities.css";
import "./app.css";

class App extends Component {
  componentDidMount() {}

  componentDidShow() {}

  componentDidHide() {}

  componentDidCatchError() {}

  // this.props.children 是将要会渲染的页面
  render() {
    return this.props.children;
  }
}

export default App;
