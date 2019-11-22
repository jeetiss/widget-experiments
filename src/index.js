import WatchedValue from "./utils/w-v";

import { Hello, Counter, Tabs } from "./components";

let root = document.querySelector("#root");

let gl = WatchedValue(10);

let tabs = new Tabs(root, [
  ["Hello World", element => new Hello(element)],
  ["Counter", element => new Counter(element)],
  ["Global Counter", element => new Counter(element, gl)]
]);

tabs.mount();

gl.subscribe(value => console.log(value))
