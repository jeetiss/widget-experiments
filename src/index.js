import WatchedValue from "./utils/w-v";

import { Hello, Counter, Tabs, BindedInput } from "./components";

let root = document.querySelector("#root");

let gl = WatchedValue(10);
let locale = WatchedValue({ header: "Привет Мир" });

let tabs = new Tabs(
  {
    tabs: [
      ["Hello World", element => new Hello({}, element)],
      ["Counter", element => new Counter({ locale }, element)],
      [
        "Global Counter",
        element => new Counter({ locale, value: gl }, element)
      ],
      ["Input", element => new BindedInput({}, element)]
    ]
  },
  root
);

tabs.mount();

gl.subscribe(value => console.log(value));
