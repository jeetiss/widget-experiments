import { createElement, useState, useEffect } from "react";
import ReactDOM from "react-dom";

const Timer = () => {
  let [time, set] = useState(0);

  useEffect(() => {
    let id = setInterval(() => {
      set(time => time + 1);
    }, 1000);

    return () => clearInterval(id);
  }, []);

  return createElement("h1", {}, ["time: ", time, " sec."]);
};

class ReactTab {
  constructor({}, element) {
    this.$element = element;
  }

  mount() {
    ReactDOM.render(createElement(Timer), this.$element);
  }

  unmount() {
    ReactDOM.unmountComponentAtNode(this.$element);
  }
}

export default ReactTab;
